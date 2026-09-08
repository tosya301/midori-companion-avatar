"""Behavioral tests; adapters are explicitly local fixtures, never paid providers."""
import base64
import contextlib
import http.client
import http.server
import importlib.util
import io
import json
import os
from pathlib import Path
import socket
import struct
import subprocess
import sys
import tempfile
import threading
import time
import unittest
from unittest import mock
import urllib.request
import wave

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import server

spec = importlib.util.spec_from_file_location('avatar_client', ROOT / 'examples' / 'avatar_client.py')
client_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(client_module)
TONE = client_module.demo_tone()
# Container-signature fixtures, NOT claimed to be playable encoded MP3/OGG/M4A.
SIGNATURE_FIXTURES = {
    'wav': TONE,
    'mp3': b'ID3\x04\x00\x00\x00\x00\x00\x00' + b'\xff\xfb\x90\x00' + b'\x00' * 100,
    'ogg': b'OggS\x00' + b'\x00' * 21 + b'\x01\x08' + b'OpusHead',
    'm4a': struct.pack('>I', 24) + b'ftypM4A ' + b'\x00\x00\x00\x00' + b'isommp42',
}


@contextlib.contextmanager
def running(root, config=None):
    httpd = server.make_server(root, port=0, config=config or server.Config())
    thread = threading.Thread(target=httpd.serve_forever, kwargs={'poll_interval': 0.02}, daemon=True)
    thread.start()
    try:
        yield httpd
    finally:
        httpd.shutdown()
        httpd.server_close()
        thread.join(timeout=2)


class AdapterFixture(http.server.BaseHTTPRequestHandler):
    calls = []
    calls_lock = threading.Lock()
    delayed = threading.Event()
    release = threading.Event()

    def log_message(self, *args):
        pass

    def do_POST(self):
        payload = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        with self.calls_lock:
            self.calls.append((self.path, payload, dict(self.headers)))
        if self.path == '/redirect':
            self.send_response(302)
            self.send_header('Location', '/sink')
            self.end_headers()
            return
        if self.path in ('/slow-chat', '/slow-tts'):
            self.delayed.set()
            self.release.wait(timeout=3)
        if 'chat' in self.path:
            data = json.dumps({'text': 'LOCAL FIXTURE RESPONSE: ' + payload['text'], 'session_id': 'fixture-session'}).encode()
            mime = 'application/json'
        elif self.path == '/invalid-audio':
            data, mime = b'not an audio container', 'audio/wav'
        else:
            data, mime = TONE, 'audio/wav'
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        try:
            self.wfile.write(data)
        except BrokenPipeError:
            pass


@contextlib.contextmanager
def adapter_fixture():
    AdapterFixture.calls = []
    AdapterFixture.delayed.clear()
    AdapterFixture.release.clear()
    httpd = http.server.ThreadingHTTPServer(('127.0.0.1', 0), AdapterFixture)
    httpd.daemon_threads = True
    thread = threading.Thread(target=httpd.serve_forever, kwargs={'poll_interval': 0.02}, daemon=True)
    thread.start()
    try:
        yield f'http://127.0.0.1:{httpd.server_port}'
    finally:
        AdapterFixture.release.set()
        httpd.shutdown()
        httpd.server_close()
        thread.join(timeout=2)


def read_event(response):
    lines = []
    while True:
        line = response.readline()
        if not line:
            raise EOFError('SSE connection closed')
        if line == b'\n':
            if lines:
                break
            continue
        if not line.startswith(b':'):
            lines.append(line.decode().rstrip('\r\n'))
    result = dict(line.split(': ', 1) for line in lines)
    result['data'] = json.loads(result['data'])
    return result


class RuntimeTests(unittest.TestCase):
    def setUp(self):
        environment = mock.patch.dict(os.environ)
        environment.start()
        os.environ.pop('MIDORI_API_TOKEN', None)
        self.addCleanup(environment.stop)
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        (self.root / 'index.html').write_text('<html>public fixture</html>')
        (self.root / 'app.js').write_text('console.log("fixture")')
        (self.root / 'assets').mkdir()
        (self.root / 'assets' / 'tone.wav').write_bytes(TONE)
        (self.root / 'config.json').write_text('{"secret":"test fixture, not a real credential"}')
        (self.root / '.env').write_text('NOT_A_REAL_KEY=fixture')
        (self.root / 'docs').mkdir()
        (self.root / 'docs' / 'notes.html').write_text('private fixture')
        self.context = running(self.root)
        self.httpd = self.context.__enter__()
        self.url = f'http://127.0.0.1:{self.httpd.server_port}'
        self.token = (self.root / '.local' / 'api-token').read_text().strip()
        self.addCleanup(self.temp.cleanup)
        self.addCleanup(self.context.__exit__, None, None, None)

    def req(self, method, path, body=None, headers=None, auth=True, port=None):
        connection = http.client.HTTPConnection('127.0.0.1', port or self.httpd.server_port, timeout=4)
        outgoing = {}
        if method != 'POST':
            body = None
        if method == 'POST':
            outgoing['Content-Type'] = 'application/json'
            if auth:
                outgoing['Authorization'] = 'Bearer ' + self.token
            body = json.dumps(body if body is not None else {}).encode() if not isinstance(body, bytes) else body
        outgoing.update(headers or {})
        connection.request(method, path, body, outgoing)
        response = connection.getresponse()
        data = response.read()
        status, response_headers = response.status, dict(response.getheaders())
        connection.close()
        if response_headers.get('Content-Type', '').startswith('application/json') and data:
            data = json.loads(data)
        return status, data, response_headers

    def events(self, cursor=None):
        connection = http.client.HTTPConnection('127.0.0.1', self.httpd.server_port, timeout=4)
        connection.request('GET', '/events', headers={'Last-Event-ID': cursor} if cursor else {})
        response = connection.getresponse()
        self.assertEqual(response.status, 200)
        self.addCleanup(connection.close)
        self.addCleanup(response.close)
        return connection, response, read_event(response)

    def test_health_capabilities_and_no_credentials(self):
        for route in ('/health', '/api/capabilities'):
            status, data, _ = self.req('GET', route)
            self.assertEqual(status, 200)
            self.assertTrue(data['ok'])
            self.assertNotIn(self.token, json.dumps(data))
        self.assertFalse(self.req('GET', '/api/capabilities')[1]['tts']['configured'])

    def test_loopback_only(self):
        with self.assertRaises(ValueError):
            server.make_server(self.root, port=0, host='0.0.0.0')

    def test_token_persists_and_is_private(self):
        self.assertEqual(server.load_token(self.root), self.token)
        self.assertGreaterEqual(len(self.token), 32)
        self.assertEqual((self.root / '.local' / 'api-token').stat().st_mode & 0o777, 0o600)
        self.assertEqual(self.req('GET', '/.local/api-token')[0], 404)
        with tempfile.TemporaryDirectory() as second:
            self.assertNotEqual(server.load_token(Path(second)), self.token)

    def test_token_symlink_refused(self):
        with tempfile.TemporaryDirectory() as folder:
            target = Path(folder)
            (target / '.local').symlink_to(self.root / '.local', target_is_directory=True)
            with self.assertRaises(ValueError):
                server.load_token(target)
        with tempfile.TemporaryDirectory() as folder:
            target = Path(folder)
            (target / '.local').mkdir()
            (target / '.local' / 'api-token').symlink_to(self.root / '.local' / 'api-token')
            with self.assertRaises(ValueError):
                server.load_token(target)

    def test_host_origin_and_browser_csrf(self):
        for headers in ({'Host': 'evil.example'}, {'Host': '127.0.0.1:1'}, {'Origin': 'null'},
                        {'Origin': 'https://evil.example'}, {'Origin': self.url + '/'},
                        {'Origin': f'http://localhost:{self.httpd.server_port}'}, {'Sec-Fetch-Site': 'cross-site'}):
            for method in ('GET', 'POST'):
                self.assertEqual(self.req(method, '/health' if method == 'GET' else '/api/message', {'text': 'test'}, headers)[0], 403)
        self.assertEqual(self.req('POST', '/api/message', {'text': 'test'}, auth=False)[0], 401)
        self.assertEqual(self.req('POST', '/api/message', {'text': 'test'}, {'X-Midori-Action': 'public-ui'}, auth=False)[0], 401)
        self.assertEqual(self.req('POST', '/api/message', {'text': 'test'}, {'Origin': self.url}, auth=False)[0], 401)
        status, data, _ = self.req('POST', '/api/message', {'text': 'UI message'},
                                   {'Origin': self.url, 'X-Midori-Action': 'public-ui'}, auth=False)
        self.assertEqual(status, 200)
        self.assertEqual(data['text'], 'UI message')

    def test_body_validation(self):
        cases = [({'Content-Type': 'text/plain'}, b'{}', 415),
                 ({}, b'{"text":"one","text":"two"}', 400),
                 ({}, b'{"text":NaN}', 400), ({}, b'[]', 400), ({}, b'\xff', 400),
                 ({'Transfer-Encoding': 'chunked'}, b'{}', 400),
                 ({'Content-Encoding': 'gzip'}, b'{}', 400),
                 ({'Content-Length': str(server.MAX_BODY + 1)}, b'', 413)]
        for headers, body, expected in cases:
            self.assertEqual(self.req('POST', '/api/message', body, headers)[0], expected)
        self.assertEqual(self.req('POST', '/api/message', {'text': 'a' * (server.MAX_TEXT + 1)})[0], 400)

    def test_traversal_sensitive_files_and_directory_listing(self):
        paths = ['/.env', '/config.json', '/server.py', '/docs/notes.html', '/.git/config', '/assets/',
                 '/assets/../config.json', '/assets/%2e%2e/config.json', '/assets/%252e%252e/config.json',
                 '/assets/%2e%2e%5cconfig.json', '/assets/%00.png', '/assets/.env', '/examples/avatar_client.py']
        for path in paths:
            for method in ('GET', 'HEAD'):
                with self.subTest(path=path, method=method):
                    self.assertEqual(self.req(method, path)[0], 404)
        self.assertEqual(self.req('GET', '/')[0], 200)
        self.assertEqual(self.req('HEAD', '/app.js')[1], b'')

    def test_static_symlink_escape_and_internal_symlink(self):
        (self.root / 'assets' / 'leak.json').symlink_to(self.root / 'config.json')
        (self.root / 'assets' / 'outside').symlink_to(self.root / 'docs', target_is_directory=True)
        for path in ('/assets/leak.json', '/assets/outside/notes.html'):
            self.assertEqual(self.req('GET', path)[0], 404)

    def test_static_media_ranges(self):
        status, data, headers = self.req('GET', '/assets/tone.wav', headers={'Range': 'bytes=0-11'})
        self.assertEqual((status, data), (206, TONE[:12]))
        self.assertEqual(headers['Content-Range'], f'bytes 0-11/{len(TONE)}')
        self.assertEqual(self.req('GET', '/assets/tone.wav', headers={'Range': 'bytes=-5'})[:2], (206, TONE[-5:]))
        self.assertEqual(self.req('GET', '/assets/tone.wav', headers={'Range': 'bytes=10-'})[:2], (206, TONE[10:]))
        for value in ('bytes=9999999-', 'bytes=1-0', 'bytes=-0', 'bytes=0-1,4-5', 'not-a-range'):
            self.assertEqual(self.req('GET', '/assets/tone.wav', headers={'Range': value})[0], 416)
        status, data, headers = self.req('HEAD', '/assets/tone.wav', headers={'Range': 'bytes=0-11'})
        self.assertEqual((status, data, headers['Content-Length']), (206, b'', '12'))

    def test_all_audio_containers_publication_and_media(self):
        for fmt, audio in SIGNATURE_FIXTURES.items():
            status, data, _ = self.req('POST', '/api/audio', {'format': fmt, 'audio_base64': base64.b64encode(audio).decode(), 'text': 'Container signature fixture', 'request_id': 'container-' + fmt})
            self.assertEqual(status, 200, data)
            for field in ('event_id', 'audio_url', 'text', 'created_at', 'source', 'emotion', 'visual_state'):
                self.assertIn(field, data)
            status, fetched, headers = self.req('GET', data['audio_url'])
            self.assertEqual((status, fetched, headers['Content-Type']), (200, audio, server.MIME[fmt]))
            self.assertEqual(self.req('HEAD', data['audio_url'])[0], 200)
            self.assertEqual(self.req('GET', data['audio_url'], headers={'Range': 'bytes=0-3'})[:2], (206, audio[:4]))

    def test_audio_rejects_invalid_base64_and_mismatched_signatures(self):
        cases = [{'format': 'wav', 'audio_base64': '%%%not-base64'},
                 {'format': 'wav', 'audio_base64': base64.b64encode(b'hello').decode()},
                 {'format': 'mp3', 'audio_base64': base64.b64encode(TONE).decode()},
                 {'format': 'exe', 'audio_base64': 'aGVsbG8='},
                 {'format': 'wav', 'audio_base64': base64.b64encode(TONE[:50]).decode()}]
        for body in cases:
            self.assertEqual(self.req('POST', '/api/audio', body)[0], 400)

    def test_idempotent_message_audio_stop_and_conflict(self):
        bodies = [('/api/message', {'text': 'Final user-visible message', 'request_id': 'message-1'}),
                  ('/api/audio', {'format': 'wav', 'audio_base64': base64.b64encode(TONE).decode(), 'request_id': 'audio-1'}),
                  ('/api/stop', {'request_id': 'stop-1'})]
        for path, body in bodies:
            first = self.req('POST', path, body)
            count = self.httpd.runtime.sequence
            second = self.req('POST', path, body)
            self.assertEqual(first[:2], second[:2])
            self.assertEqual(self.httpd.runtime.sequence, count)
        self.assertEqual(self.req('POST', '/api/message', {'text': 'different', 'request_id': 'message-1'})[0], 409)
        self.assertEqual(self.req('POST', '/api/stop', {'request_id': 'message-1'})[0], 409)

    def test_no_historical_replay_new_tabs_and_reconnect(self):
        self.req('POST', '/api/message', {'text': 'Before new tab'})
        _, response, bridge = self.events()
        self.assertEqual(bridge['event'], 'bridge')
        cursor = bridge['id']
        published = self.req('POST', '/api/message', {'text': 'Live final text', 'request_id': 'live-1'})[1]
        event = read_event(response)
        self.assertEqual((event['event'], event['data']['text']), ('message', 'Live final text'))
        self.assertEqual(event['id'], published['event_id'])
        _, replay, bridge = self.events(cursor)
        self.assertTrue(bridge['data']['ok'])
        self.assertEqual(read_event(replay)['id'], event['id'])
        _, dedupe, bridge = self.events(event['id'])
        self.req('POST', '/api/message', {'text': 'Live final text', 'request_id': 'live-1'})
        self.req('POST', '/api/message', {'text': 'Next event'})
        self.assertEqual(read_event(dedupe)['data']['text'], 'Next event')

    def test_sse_speech_and_stop_actual_server(self):
        _, response, _ = self.events()
        self.req('POST', '/api/audio', {'format': 'wav', 'audio_base64': base64.b64encode(TONE).decode(), 'text': 'Tone, not speech'})
        event = read_event(response)
        self.assertEqual(event['event'], 'speech')
        self.assertEqual(self.req('GET', event['data']['audio_url'])[1], TONE)
        self.req('POST', '/api/stop', {'request_id': 'stop-live'})
        self.assertEqual(read_event(response)['event'], 'stop')

    def test_replay_overflow_is_bounded_and_honest(self):
        old = self.httpd.runtime.cursor()
        for index in range(server.HISTORY_LIMIT + 4):
            self.httpd.runtime.publish('message', {'text': str(index)})
        self.assertEqual(len(self.httpd.runtime.events), server.HISTORY_LIMIT)
        _, response, bridge = self.events(old)
        self.assertFalse(bridge['data']['ok'])
        self.assertEqual(bridge['data']['type'], 'gap')
        self.req('POST', '/api/message', {'text': 'Live after gap'})
        self.assertEqual(read_event(response)['data']['text'], 'Live after gap')
        _, _, invalid = self.events('different-runtime:99')
        self.assertEqual(invalid['data']['type'], 'gap')

    def test_media_and_idempotency_memory_caps(self):
        rt = self.httpd.runtime
        with mock.patch.object(server, 'MEDIA_BYTES', len(TONE) * 2), mock.patch.object(server, 'IDEMPOTENCY_LIMIT', 3):
            urls = []
            for index in range(5):
                body = {'format': 'wav', 'audio_base64': base64.b64encode(TONE).decode(), 'request_id': f'cap-{index}'}
                urls.append(self.req('POST', '/api/audio', body)[1]['audio_url'])
            self.assertLessEqual(len(rt.media), 2)
            self.assertEqual(len(rt.idempotency), 3)
            self.assertEqual(self.req('GET', urls[0])[0], 404)
            self.assertEqual(self.req('GET', urls[-1])[0], 200)

    def test_unconfigured_providers_and_disabled_integrations(self):
        for route, body in (('/api/speak', {'text': 'No paid call'}), ('/api/chat/stream', {'text': 'No fake AI'})):
            status, data, _ = self.req('POST', route, body)
            self.assertEqual(status, 503)
            self.assertIn('configured', data['error'])
        self.assertIn('AGENT_INTEGRATION', self.req('POST', '/api/chat/stream', {'text': 'test'})[1]['error'])
        self.assertEqual(self.req('POST', '/api/apps/blender/launch')[0], 501)
        self.assertFalse(self.req('POST', '/api/spotify/quick-control')[1]['handled'])
        gmail = self.req('GET', '/api/gmail-unread')[1]
        self.assertTrue(gmail['ok'])
        self.assertFalse(gmail['configured'])
        self.assertEqual(gmail['count'], 0)

    def test_normalized_lyrics_and_idle_wrapper(self):
        self.assertIsNone(self.req('GET', '/api/spotify/lyrics-state')[1]['track'])
        state = {'track': {'id': 'test', 'title': 'Original fixture song', 'artist': 'Fixture', 'album': '', 'durationMs': 5000, 'coverUrl': '/assets/cover.png'},
                 'playback': {'isPlaying': True, 'positionMs': 9000, 'sampledAtMs': 1000},
                 'lyrics': {'lines': [{'timeMs': 2000, 'text': 'second'}, {'timeMs': -1, 'text': 'first'}]}}
        status, normalized, _ = self.req('POST', '/api/lyrics/state', state)
        self.assertEqual(status, 200)
        self.assertEqual(normalized['track']['artworkUrl'], '/assets/cover.png')
        self.assertEqual(normalized['lyrics']['lines'][0]['timeMs'], 0)
        self.assertEqual(normalized['playback']['positionMs'], 5000)
        self.assertEqual(self.req('GET', '/api/spotify/lyrics-state')[1], normalized)
        state['track']['coverUrl'] = 'file:///etc/passwd'
        self.assertEqual(self.req('POST', '/api/lyrics/state', state)[0], 400)
        self.assertIsNone(self.req('POST', '/api/lyrics/state', {'track': None})[1]['track'])

    def test_local_tts_fixture_and_idempotency_no_fallback(self):
        with adapter_fixture() as url:
            self.httpd.runtime.config = server.Config(tts_provider='local', tts_url=url + '/tts')
            body = {'text': 'LOCAL TTS FIXTURE: real tone, not real speech', 'request_id': 'local-tts-1'}
            first = self.req('POST', '/api/speak', body)
            self.assertEqual(first[0], 200, first[1])
            self.assertEqual(self.req('GET', first[1]['audio_url'])[1], TONE)
            self.assertEqual(self.req('POST', '/api/speak', body)[:2], first[:2])
            self.assertEqual(len(AdapterFixture.calls), 1)
            self.assertEqual(AdapterFixture.calls[0][1], {'text': body['text']})
            self.assertNotIn('Authorization', AdapterFixture.calls[0][2])
            self.httpd.runtime.config.tts_url = url + '/invalid-audio'
            self.assertNotEqual(self.req('POST', '/api/speak', {'text': 'Invalid local fixture'})[0], 200)
            self.assertEqual(len(AdapterFixture.calls), 2)

    def test_fish_explicitly_mocked_fixed_endpoint_contract(self):
        self.httpd.runtime.config = server.Config(tts_provider='fish', fish_api_key='TEST_ONLY_NOT_A_REAL_KEY', fish_reference_id='TEST_ONLY_REFERENCE')
        with mock.patch.object(server, 'provider_post', return_value=SIGNATURE_FIXTURES['mp3']) as provider:
            status, data, _ = self.req('POST', '/api/speak', {'text': 'Mock Fish contract; no paid call', 'request_id': 'fish-mock'})
            self.assertEqual(status, 200, data)
            args = provider.call_args.args
            self.assertEqual(args[0], 'https://api.fish.audio/v1/tts')
            self.assertEqual(args[1], {'text': 'Mock Fish contract; no paid call', 'reference_id': 'TEST_ONLY_REFERENCE', 'format': 'mp3'})
            self.assertEqual(args[2]['model'], 's2.1-pro')
            self.assertEqual(args[2]['Authorization'], 'Bearer TEST_ONLY_NOT_A_REAL_KEY')
            self.assertEqual(provider.call_count, 1)

    def test_outbound_redirects_refused_without_forwarding_credentials(self):
        with adapter_fixture() as url:
            with self.assertRaises(server.APIError) as error:
                server.provider_post(url + '/redirect', {'text': 'Redirect fixture'}, {'Authorization': 'Bearer TEST_ONLY_NOT_A_REAL_KEY'})
            self.assertEqual(error.exception.code, 'provider_redirect')
            self.assertEqual([entry[0] for entry in AdapterFixture.calls], ['/redirect'])

    def test_endpoint_configuration_no_remote_or_userinfo(self):
        for url in ('https://127.0.0.1/tts', 'http://evil.example/tts', 'file:///etc/passwd', 'http://user:pass@127.0.0.1/tts', 'http://127.0.0.1/tts#fragment'):
            with self.assertRaises(ValueError):
                server.Config(tts_provider='local', tts_url=url)
        self.assertEqual(server.Config(tts_url='http://localhost:8000/tts').tts_url, 'http://127.0.0.1:8000/tts')

    def test_chat_local_fixture_sse_context_and_optional_voice(self):
        with adapter_fixture() as url:
            self.httpd.runtime.config = server.Config(chat_url=url + '/chat', tts_provider='local', tts_url=url + '/tts')
            status, data, _ = self.req('POST', '/api/chat/stream', {'text': 'This is a local fixture test', 'context': {'app': 'public'}, 'request_id': 'chat-1', 'voice': True})
            self.assertEqual(status, 200)
            output = data.decode()
            self.assertIn('event: session.ready', output)
            self.assertEqual(output.count('event: assistant.completed'), 1)
            self.assertIn('LOCAL FIXTURE RESPONSE:', output)
            self.assertIn('event: voice.queued', output)
            self.assertEqual(AdapterFixture.calls[0][1]['context'], {'app': 'public'})
            self.assertEqual(self.req('POST', '/api/chat/stream', {'text': 'This is a local fixture test', 'request_id': 'chat-1'})[0], 409)
            self.assertEqual(len(AdapterFixture.calls), 2)

    def test_chat_cancel_suppresses_final_reply_and_audio(self):
        with adapter_fixture() as url:
            self.httpd.runtime.config = server.Config(chat_url=url + '/slow-chat')
            output = {}
            worker = threading.Thread(target=lambda: output.update(result=self.req('POST', '/api/chat/stream', {'text': 'LOCAL delayed fixture', 'request_id': 'cancel-me'})))
            worker.start()
            self.assertTrue(AdapterFixture.delayed.wait(timeout=2))
            status, data, _ = self.req('POST', '/api/chat/cancel', {'request_id': 'cancel-me'})
            self.assertEqual(status, 200)
            self.assertTrue(data['cancelled'])
            worker.join(timeout=2)
            self.assertFalse(worker.is_alive())
            output_text = output['result'][1].decode()
            self.assertIn('event: request.cancelled', output_text)
            self.assertNotIn('assistant.completed', output_text)
            self.assertNotIn('voice.queued', output_text)
            self.assertFalse(self.req('POST', '/api/chat/cancel', {'request_id': 'unknown'})[1]['cancelled'])

    def test_chat_adapter_failure_is_not_fake_reply(self):
        with adapter_fixture() as url:
            self.httpd.runtime.config = server.Config(chat_url=url + '/redirect')
            status, data, _ = self.req('POST', '/api/chat/stream', {'text': 'LOCAL failure fixture'})
            self.assertEqual(status, 200)
            self.assertIn(b'event: error', data)
            self.assertNotIn(b'assistant.completed', data)

    def test_cli_real_commands_and_importable_sdk(self):
        token_path = self.root / '.local' / 'api-token'
        tone_path = self.root / 'tone.wav'
        tone_path.write_bytes(TONE)
        lyrics_path = self.root / 'lyrics.json'
        lyrics_path.write_text('{"track":null}')
        commands = [['health'], ['message', 'Real CLI fixture message'], ['audio', str(tone_path), '--text', 'Real CLI tone'],
                    ['demo'], ['--demo'], ['lyrics', str(lyrics_path)], ['stop']]
        env = dict(os.environ)
        env.pop('MIDORI_API_TOKEN', None)
        for command in commands:
            result = subprocess.run([sys.executable, str(ROOT / 'examples' / 'avatar_client.py'), '--url', self.url, '--token-file', str(token_path), *command], capture_output=True, text=True, timeout=6, env=env)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(json.loads(result.stdout)['ok'])
            self.assertNotIn(self.token, result.stdout + result.stderr)
        sdk = client_module.AvatarClient(self.url, token_file=token_path)
        self.assertTrue(sdk.health()['ok'])
        self.assertEqual(sdk.message('Imported SDK fixture', 'sdk-1')['text'], 'Imported SDK fixture')
        with self.assertRaises(RuntimeError):
            sdk.speak('Unconfigured provider fixture')
        with self.assertRaises(ValueError):
            client_module.AvatarClient('https://evil.example')

    def test_demo_is_deterministic_actual_wav_not_claimed_speech(self):
        self.assertEqual(client_module.demo_tone(), client_module.demo_tone())
        with wave.open(io.BytesIO(TONE), 'rb') as wav:
            self.assertEqual((wav.getframerate(), wav.getnframes(), wav.getnchannels()), (16000, 6400, 1))
        self.assertIn('not synthesized speech', client_module.DEMO_TEXT)

    def test_exact_source_download_public_helper_and_demo_allowlist(self):
        (self.root / 'source').mkdir()
        (self.root / 'source' / 'folia-source.zip').write_bytes(b'PK\x03\x04PUBLIC_TEST_ARCHIVE')
        (self.root / 'source' / 'private.js').write_text('must not serve')
        (self.root / 'audio').mkdir()
        (self.root / 'audio' / 'demo-tone.wav').write_bytes(TONE)
        (self.root / 'audio' / 'private.wav').write_bytes(TONE)
        (self.root / 'public-api.js').write_text('// public fixture')
        (self.root / 'help.html').write_text('<h1>Public help fixture</h1>')
        (self.root / 'assets' / 'config.example.json').write_text('{}')
        for path in ('/source/folia-source.zip', '/public-api.js', '/audio/demo-tone.wav', '/help.html'):
            self.assertEqual(self.req('GET', path)[0], 200)
        for path in ('/source/', '/source/private.js', '/audio/private.wav', '/assets/config.example.json'):
            self.assertEqual(self.req('GET', path)[0], 404)

    def test_stop_cancels_slow_tts_and_status_contains_no_text(self):
        with adapter_fixture() as url:
            self.httpd.runtime.config = server.Config(tts_provider='local', tts_url=url + '/slow-tts')
            body = {'text': 'LOCAL slow tone fixture private text', 'request_id': 'slow-tts-1'}
            output = {}
            worker = threading.Thread(target=lambda: output.update(result=self.req('POST', '/api/speak', body)))
            worker.start()
            self.assertTrue(AdapterFixture.delayed.wait(timeout=2))
            headers = {'Authorization': 'Bearer ' + self.token}
            status_route = '/api/requests/slow-tts-1'
            self.assertEqual(self.req('GET', status_route)[0], 401)
            self.assertEqual(self.req('GET', status_route, headers={'Origin': self.url, 'X-Midori-Action': 'public-ui'})[0], 401)
            current = self.req('GET', status_route, headers=headers)[1]
            self.assertEqual(current['status'], 'in_progress')
            self.assertNotIn(body['text'], json.dumps(current))
            self.assertEqual(self.req('POST', '/api/speak', body)[0], 409)
            self.assertEqual(self.req('POST', '/api/stop', {'request_id': 'stop-slow'})[0], 200)
            AdapterFixture.release.set()
            worker.join(timeout=2)
            self.assertFalse(worker.is_alive())
            self.assertEqual(output['result'][0], 409)
            self.assertEqual(output['result'][1]['code'], 'stopped')
            self.assertFalse(self.httpd.runtime.media)
            self.assertEqual([event[1] for event in self.httpd.runtime.events], ['stop'])
            result = self.req('GET', status_route, headers=headers)[1]
            self.assertEqual((result['status'], result['code']), ('failed', 'stopped'))
            sdk = client_module.AvatarClient(self.url, token_file=self.root / '.local' / 'api-token')
            self.assertEqual(sdk.status('stop-slow')['status'], 'completed')
            self.assertEqual(self.req('GET', '/api/requests/missing', headers=headers)[0], 404)

    def test_stop_reconnect_barrier_does_not_replay_old_speech(self):
        old = self.httpd.runtime.cursor()
        for index in range(3):
            self.req('POST', '/api/audio', {'format': 'wav', 'audio_base64': base64.b64encode(TONE).decode()})
        self.req('POST', '/api/stop')
        _, response, bridge = self.events(old)
        self.assertEqual(bridge['event'], 'bridge')
        self.assertEqual(read_event(response)['event'], 'stop')
        self.req('POST', '/api/message', {'text': 'After barrier'})
        self.assertEqual(read_event(response)['data']['text'], 'After barrier')

    def test_environment_token_is_shared_with_client_without_disk_copy(self):
        token = 'LOCAL_TEST_TOKEN_' + 'x' * 32
        with tempfile.TemporaryDirectory() as folder, mock.patch.dict(os.environ, {'MIDORI_API_TOKEN': token}):
            root = Path(folder)
            with running(root) as httpd:
                self.assertEqual(httpd.runtime.token, token)
                self.assertFalse((root / '.local' / 'api-token').exists())
                sdk = client_module.AvatarClient(f'http://127.0.0.1:{httpd.server_port}')
                self.assertTrue(sdk.message('Environment token local fixture')['ok'])
        for invalid in ('', 'short', 'x' * 129, 'x' * 32 + '\n', 'é' * 32):
            with mock.patch.dict(os.environ, {'MIDORI_API_TOKEN': invalid}):
                with self.assertRaises(ValueError):
                    server.load_token(self.root)

    def test_json_rejects_non_utf8_surrogates_and_overflow(self):
        for body in ('{"text":"UTF16"}'.encode('utf-16'), b'{"text":"\\ud800"}',
                     b'{"text":"ok","ignored":1e999}', b'{"text":"ok","\\udfff":0}'):
            with self.subTest(body=body):
                self.assertEqual(self.req('POST', '/api/message', body)[0], 400)
        self.assertEqual(self.httpd.runtime.sequence, 0)
        self.assertEqual(self.req('POST', '/api/message', {'text': '阿绿 🌿'})[1]['text'], '阿绿 🌿')

    def test_lyrics_canonical_artwork_and_invalid_urls(self):
        state = {'track': {'title': 'fixture', 'artworkUrl': '/assets/cover.png'},
                 'playback': {}, 'lyrics': {}}
        status, data, _ = self.req('POST', '/api/lyrics/state', state)
        self.assertEqual(status, 200)
        self.assertEqual(data['track']['artworkUrl'], '/assets/cover.png')
        self.assertNotIn('coverUrl', data['track'])
        for url in ('https://[', 'https:missing-host', 'https://user:pass@example.test/a',
                    '//example.test/a', '/assets/%2e%2e/.local/api-token'):
            state['track']['artworkUrl'] = url
            self.assertEqual(self.req('POST', '/api/lyrics/state', state)[0], 400)

    def test_approved_human_sample_allowlist_is_exact(self):
        (self.root / 'audio').mkdir()
        for name in ('test-voice-human-01.wav', 'test-voice-human-02.wav', 'test-voice-human-03.wav'):
            (self.root / 'audio' / name).write_bytes(TONE)  # Routing fixture, not a human recording.
        (self.root / 'audio' / 'samples.json').write_text('[]')
        for path in ('/audio/test-voice-human-01.wav', '/audio/test-voice-human-02.wav', '/audio/samples.json'):
            self.assertEqual(self.req('GET', path)[0], 200)
            self.assertEqual(self.req('HEAD', path)[0], 200)
        self.assertEqual(self.req('GET', '/audio/test-voice-human-03.wav')[0], 404)

    def test_sdk_rejects_url_path_and_identifier_token_injection(self):
        sdk = client_module.AvatarClient(self.url, token=self.token)
        for path in ('@evil.example/', '//evil.example/', '/.local/api-token', '/api/message?token=bad'):
            with self.subTest(path=path), mock.patch.object(sdk.opener, 'open', side_effect=AssertionError('Network must not be attempted')), self.assertRaises(ValueError):
                sdk.request(path, {'text': 'must not send'})
        for rid in ('', 'with space', '../token', 'x' * 129):
            with self.assertRaises(ValueError):
                sdk.message('Invalid ID must not be replaced', rid)
            with self.assertRaises(ValueError):
                sdk.status(rid)
        for url in ('http://127.0.0.1:bad', 'http://127.0.0.1:99999'):
            with self.assertRaises(ValueError):
                client_module.AvatarClient(url)
        with self.assertRaises(ValueError):
            client_module.AvatarClient(self.url, token='bad').message('Invalid token')

    def test_raw_duplicate_headers_and_content_length_rejected(self):
        port = self.httpd.server_port
        headers = [f'Host: 127.0.0.1:{port}', 'Content-Type: application/json',
                   'Content-Length: 12', f'Authorization: Bearer {self.token}']
        cases = [('Host: evil.example', 403), (f'Origin: {self.url}\r\nOrigin: {self.url}', 403),
                 ('Content-Length: 12', 411), ('Authorization: Bearer bad', 401),
                 ('Content-Type: application/json', 415)]
        for extra, expected in cases:
            with socket.create_connection(('127.0.0.1', port), timeout=2) as connection:
                wire = 'POST /api/message HTTP/1.1\r\n' + '\r\n'.join(headers + [extra, 'Connection: close']) + '\r\n\r\n{"text":"x"}'
                connection.sendall(wire.encode())
                response = http.client.HTTPResponse(connection)
                response.begin()
                self.assertEqual(response.status, expected)
                response.read()

    def test_provider_limits_and_no_secret_reflection(self):
        with adapter_fixture() as url:
            with self.assertRaises(server.APIError) as error:
                server.provider_post(url + '/tts', {'text': 'local size test'}, limit=10)
            self.assertEqual(error.exception.code, 'provider_response')
        self.httpd.runtime.config = server.Config(tts_provider='local', tts_url='http://127.0.0.1:1/tts')
        status, body, _ = self.req('POST', '/api/speak', {'text': 'local unreachable fixture'})
        self.assertEqual(status, 502)
        self.assertEqual(body['code'], 'provider_failure')
        self.assertNotIn('127.0.0.1:1', json.dumps(body))

    def test_ttl_prunes_media_history_and_request_status(self):
        data = self.req('POST', '/api/audio', {'format': 'wav', 'audio_base64': base64.b64encode(TONE).decode(), 'request_id': 'expire-me'})[1]
        with mock.patch.object(server.time, 'monotonic', return_value=time.monotonic() + 4000):
            self.httpd.runtime.prune()
            self.assertFalse(self.httpd.runtime.events)
            self.assertEqual(self.req('GET', data['audio_url'])[0], 404)
            self.assertEqual(self.req('GET', '/api/requests/expire-me', headers={'Authorization': 'Bearer ' + self.token})[0], 404)

    def test_request_fields_cannot_override_provider_or_read_files(self):
        with mock.patch.object(server, 'provider_post', side_effect=AssertionError('No outbound call allowed')):
            status, data, _ = self.req('POST', '/api/speak', {'text': 'No configured provider',
                'url': 'https://example.invalid/tts', 'provider': 'fish', 'api_key': 'TEST_ONLY'})
            self.assertEqual((status, data['code']), (503, 'tts_not_configured'))
            for body in ({'format': 'wav', 'audio_url': 'https://example.invalid/audio.wav'},
                         {'format': 'wav', 'path': str(self.root / 'assets' / 'tone.wav')}):
                self.assertEqual(self.req('POST', '/api/audio', body)[0], 400)

    def test_provider_and_sse_concurrency_caps(self):
        self.httpd.runtime.config = server.Config(tts_provider='local', tts_url='http://127.0.0.1:1/tts')
        with contextlib.ExitStack() as stack:
            for _ in range(8):
                stack.enter_context(self.httpd.runtime.providers)
            self.assertEqual(self.req('POST', '/api/speak', {'text': 'No slot'})[0], 429)
        with contextlib.ExitStack() as stack:
            for _ in range(16):
                stack.enter_context(self.httpd.runtime.streams)
            self.assertEqual(self.req('GET', '/events')[0], 429)

    def test_chat_stop_during_voice_suppresses_late_audio(self):
        with adapter_fixture() as url:
            self.httpd.runtime.config = server.Config(chat_url=url + '/chat', tts_provider='local', tts_url=url + '/slow-tts')
            output = {}
            worker = threading.Thread(target=lambda: output.update(result=self.req('POST', '/api/chat/stream',
                {'text': 'LOCAL fixture voice stop', 'voice': True, 'request_id': 'voice-stop'})))
            worker.start()
            self.assertTrue(AdapterFixture.delayed.wait(timeout=2))
            self.assertEqual(self.req('POST', '/api/stop')[0], 200)
            AdapterFixture.release.set()
            worker.join(timeout=2)
            self.assertFalse(worker.is_alive())
            stream = output['result'][1]
            self.assertIn(b'event: assistant.completed', stream)
            self.assertIn(b'event: voice.error', stream)
            self.assertIn(b'"code": "stopped"', stream)
            self.assertNotIn(b'event: voice.queued', stream)
            self.assertFalse(self.httpd.runtime.media)

    def test_lyrics_large_integers_are_clamped_not_internal_errors(self):
        state = {'track': {'durationMs': 10 ** 400}, 'playback': {}, 'lyrics': {}}
        status, data, _ = self.req('POST', '/api/lyrics/state', state)
        self.assertEqual(status, 200)
        self.assertEqual(data['track']['durationMs'], 86400000)

    def test_idempotent_errors_do_not_retain_or_accumulate_tracebacks(self):
        body = {'text': 'No provider fixture', 'request_id': 'cached-error'}
        for _ in range(5):
            status, data, _ = self.req('POST', '/api/speak', body)
            self.assertEqual((status, data['code']), (503, 'tts_not_configured'))
            error = self.httpd.runtime.idempotency['cached-error']['error']
            self.assertIsNone(error.__traceback__)
            self.assertIsNone(error.__context__)


if __name__ == '__main__':
    unittest.main(verbosity=2)
