#!/usr/bin/env python3
"""Standalone, loopback-only Midori public runtime (Python 3.10+; stdlib only)."""
from __future__ import annotations

import argparse
import base64
import binascii
import collections
import dataclasses
import datetime as dt
import hashlib
import hmac
import http.server
import io
import json
import math
import mimetypes
import os
from pathlib import Path
import re
import secrets
import socket
import stat
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
import wave

MAX_AUDIO = 8 * 1024 * 1024
MAX_BODY = 12 * 1024 * 1024
MAX_TEXT = 20000
MEDIA_BYTES = 64 * 1024 * 1024
MEDIA_TTL = 1800
HISTORY_LIMIT = 256
HISTORY_TTL = 900
IDEMPOTENCY_LIMIT = 512
IDEMPOTENCY_TTL = 3600
PROVIDER_TIMEOUT = 15
PROVIDER_DEADLINE = 30
MIME = {'wav': 'audio/wav', 'mp3': 'audio/mpeg', 'ogg': 'audio/ogg', 'm4a': 'audio/mp4'}
STATIC_FILES = {'index.html', 'app.js', 'styles.css', 'spotify-lyrics-stage.js',
                'public-api.js', 'audio/demo-tone.wav', 'source/folia-source.zip',
                'audio/local-audition/nai-nai-ina.ogg',
                'audio/test-voice-human-01.wav', 'audio/test-voice-human-02.wav', 'audio/test-voice-human-03.mp3', 'audio/samples.json',
                'moon.js', 'moon-renderer.js', 'help.html', 'favicon.ico'}
STATIC_DIRS = {'assets', 'moon', 'lyrics-stage', 'help'}
STATIC_EXTENSIONS = {'.html', '.css', '.js', '.mjs', '.json', '.png', '.jpg', '.jpeg',
                     '.webp', '.gif', '.svg', '.ico', '.avif', '.woff', '.woff2', '.ttf',
                     '.otf', '.wav', '.mp3', '.ogg', '.m4a', '.mp4', '.webm', '.glb', '.gltf', '.bin'}
BLOCKED_PARTS = {'config', 'config.json', 'source', 'docs', 'server.py', 'node_modules', '__pycache__'}


class APIError(Exception):
    def __init__(self, status, message, code='invalid_request'):
        super().__init__(message)
        self.status, self.message, self.code = status, message, code


def text_value(value, name='text', limit=MAX_TEXT, required=True):
    if not isinstance(value, str) or len(value) > limit or (required and not value.strip()):
        raise APIError(400, f'{name} must be a {"nonempty " if required else ""}string up to {limit} characters')
    try:
        value.encode('utf-8')
    except UnicodeError:
        raise APIError(400, f'{name} must contain valid Unicode') from None
    return value.strip()


def request_id(body):
    value = body.get('request_id', str(uuid.uuid4()))
    if not isinstance(value, str) or not re.fullmatch(r'[A-Za-z0-9_.:-]{1,128}', value):
        raise APIError(400, 'request_id must be 1..128 ASCII letters, digits, _, ., :, or -')
    return value


def audio_format(data, expected=None):
    """Validate container signatures, not codecs or speech content."""
    if not data or len(data) > MAX_AUDIO:
        raise APIError(400, 'Audio must contain 1..8388608 bytes')
    found = None
    if len(data) >= 44 and data[:4] == b'RIFF' and data[8:12] == b'WAVE':
        try:
            with wave.open(io.BytesIO(data), 'rb') as wav:
                size = wav.getnframes() * wav.getnchannels() * wav.getsampwidth()
                if not (0 < size <= MAX_AUDIO and 1 <= wav.getnchannels() <= 8 and 8000 <= wav.getframerate() <= 192000):
                    raise ValueError('Unsupported WAV geometry')
                if len(wav.readframes(wav.getnframes())) != size:
                    raise ValueError('Truncated WAV')
            found = 'wav'
        except (wave.Error, EOFError, ValueError):
            raise APIError(400, 'Invalid or unsupported PCM WAV container')
    elif len(data) >= 10 and data[:3] == b'ID3' and data[3] in (2, 3, 4) and all(x < 128 for x in data[6:10]):
        tag_size = sum(data[6 + i] << (7 * (3 - i)) for i in range(4))
        if 10 + tag_size < len(data):
            found = 'mp3'
    elif len(data) >= 4 and data[0] == 255 and data[1] & 0xE0 == 0xE0 and data[1] & 6 and data[1] & 24 != 8 and data[2] >> 4 not in (0, 15) and data[2] & 12 != 12:
        found = 'mp3'
    elif len(data) >= 28 and data[:5] == b'OggS\x00':
        segments = data[26]
        if segments and len(data) >= 27 + segments + sum(data[27:27 + segments]):
            found = 'ogg'
    elif len(data) >= 24 and data[4:8] == b'ftyp':
        box_size = int.from_bytes(data[:4], 'big')
        if 16 <= box_size <= len(data) and any(brand in data[8:box_size] for brand in (b'M4A ', b'isom', b'mp41', b'mp42')):
            found = 'm4a'
    if found is None or expected is not None and found != expected:
        raise APIError(400, 'Audio signature does not match wav, mp3, ogg, or m4a format')
    return found


def local_endpoint(value, name):
    if not value:
        return ''
    parsed = urllib.parse.urlsplit(value)
    if (parsed.scheme != 'http' or parsed.hostname not in ('127.0.0.1', 'localhost', '::1')
            or parsed.username is not None or parsed.password is not None or parsed.fragment):
        raise ValueError(f'{name} must be a trusted loopback http URL without credentials or fragment')
    try:
        parsed.port
    except ValueError:
        raise ValueError(f'{name} has an invalid port') from None
    # Pin localhost to IPv4 loopback: do not depend on DNS or proxy configuration.
    if parsed.hostname == 'localhost':
        value = urllib.parse.urlunsplit(parsed._replace(netloc='127.0.0.1' + (f':{parsed.port}' if parsed.port else '')))
    return value


@dataclasses.dataclass
class Config:
    tts_provider: str = 'none'
    tts_url: str = ''
    chat_url: str = ''
    fish_api_key: str = dataclasses.field(default='', repr=False)
    fish_reference_id: str = dataclasses.field(default='', repr=False)

    def __post_init__(self):
        if self.tts_provider not in ('none', 'local', 'fish'):
            raise ValueError('MIDORI_TTS_PROVIDER must be none, local, or fish')
        self.tts_url = local_endpoint(self.tts_url, 'MIDORI_TTS_URL')
        self.chat_url = local_endpoint(self.chat_url, 'MIDORI_CHAT_URL')

    @classmethod
    def from_env(cls):
        return cls(tts_provider=os.environ.get('MIDORI_TTS_PROVIDER', 'none'),
                   tts_url=os.environ.get('MIDORI_TTS_URL', ''),
                   chat_url=os.environ.get('MIDORI_CHAT_URL', ''),
                   fish_api_key=os.environ.get('FISH_API_KEY', ''),
                   fish_reference_id=os.environ.get('FISH_REFERENCE_ID', ''))

    def tts_ready(self):
        return (self.tts_provider == 'local' and bool(self.tts_url)
                or self.tts_provider == 'fish' and bool(self.fish_api_key and self.fish_reference_id))


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        fp.close()
        raise APIError(502, 'Provider redirects are refused', 'provider_redirect')


def provider_post(url, body, headers=None, limit=MAX_AUDIO):
    """Only called with startup configuration or the fixed Fish endpoint."""
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method='POST',
                                 headers={'Content-Type': 'application/json', **(headers or {})})
    started = time.monotonic()
    try:
        with opener.open(req, timeout=PROVIDER_TIMEOUT) as response:
            output = bytearray()
            while len(output) <= limit:
                if time.monotonic() - started > PROVIDER_DEADLINE:
                    raise APIError(504, 'Provider deadline exceeded', 'provider_timeout')
                chunk = response.read1(min(65536, limit + 1 - len(output)))
                if not chunk:
                    return bytes(output)
                output.extend(chunk)
            raise APIError(502, 'Provider response exceeds size limit', 'provider_response')
    except APIError:
        raise
    except (urllib.error.URLError, OSError, TimeoutError, ValueError):
        # Never reflect provider error bodies, URLs, keys, or HTTP headers.
        raise APIError(502, 'Configured provider request failed; no automatic retry or fallback', 'provider_failure') from None


def load_token(root):
    if 'MIDORI_API_TOKEN' in os.environ:
        token = os.environ['MIDORI_API_TOKEN']
        if not re.fullmatch(r'[A-Za-z0-9_-]{32,128}', token):
            raise ValueError('MIDORI_API_TOKEN must be 32..128 ASCII letters, digits, _ or -')
        return token  # Explicit environment token is never copied to disk.
    folder = root / '.local'
    if folder.is_symlink():
        raise ValueError('.local must not be a symlink')
    folder.mkdir(mode=0o700, exist_ok=True)
    token_path = folder / 'api-token'
    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, 'O_NOFOLLOW', 0)
    token = secrets.token_urlsafe(32)
    try:
        fd = os.open(token_path, flags, 0o600)
    except FileExistsError:
        if token_path.is_symlink():
            raise ValueError('api-token must not be a symlink')
        fd = os.open(token_path, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0) | getattr(os, 'O_NONBLOCK', 0))
        with os.fdopen(fd, 'r') as stream:
            info = os.fstat(stream.fileno())
            if not stat.S_ISREG(info.st_mode) or info.st_size > 256:
                raise ValueError('Invalid token file')
            token = stream.read().strip()
        if not re.fullmatch(r'[A-Za-z0-9_-]{32,128}', token):
            raise ValueError('Invalid token file; remove it explicitly to generate a new token')
    else:
        with os.fdopen(fd, 'w') as stream:
            stream.write(token + '\n')
    return token


def idle_lyrics():
    return {'ok': True, 'connection': 'disabled', 'track': None,
            'playback': {'isPlaying': False, 'state': 'idle', 'positionMs': 0, 'sampledAtMs': 0},
            'lyrics': {'status': 'idle', 'source': 'public', 'lines': []}}


def normalized_lyrics(body):
    if body.get('track') is None:
        return idle_lyrics()
    track, playback, lyrics = (body.get(k) for k in ('track', 'playback', 'lyrics'))
    if not all(isinstance(x, dict) for x in (track, playback, lyrics)):
        raise APIError(400, 'track, playback, and lyrics must be objects')

    def number(obj, key, maximum):
        value = obj.get(key, 0)
        if isinstance(value, bool) or not isinstance(value, (int, float)) or isinstance(value, float) and not math.isfinite(value):
            raise APIError(400, f'{key} must be a finite number')
        return int(max(0, min(value, maximum)))

    normalized = {key: text_value(track.get(key, ''), key, 500, False) for key in ('id', 'title', 'artist', 'album')}
    normalized['durationMs'] = number(track, 'durationMs', 86400000)
    cover = text_value(track.get('artworkUrl', track.get('coverUrl', '')), 'artworkUrl', 2048, False)
    if cover:
        try:
            parsed = urllib.parse.urlsplit(cover)
            parsed.port  # Validate even though the runtime never fetches artwork.
            local = (cover.startswith('/assets/') and not parsed.query and not parsed.fragment
                     and '%' not in cover and '\\' not in cover
                     and all(part not in ('.', '..') for part in parsed.path.split('/')))
            remote = (parsed.scheme == 'https' and bool(parsed.hostname)
                      and parsed.username is None and parsed.password is None and '\\' not in cover)
            if not (local or remote) or any(ord(char) < 33 for char in cover):
                raise ValueError('Invalid artwork URL')
        except ValueError:
            raise APIError(400, 'artworkUrl must be HTTPS without credentials or a local /assets/ path') from None
    normalized.update(artworkUrl=cover, type='track')
    if not isinstance(playback.get('isPlaying', False), bool):
        raise APIError(400, 'isPlaying must be boolean')
    playing = playback.get('isPlaying', False)
    lines = lyrics.get('lines', [])
    if not isinstance(lines, list) or len(lines) > 2000 or any(not isinstance(line, dict) for line in lines):
        raise APIError(400, 'lyrics.lines must be a list of at most 2000 objects')
    lines = [{'timeMs': number(line, 'timeMs', 86400000), 'text': text_value(line.get('text', ''), 'line text', 1000, False)} for line in lines]
    if sum(len(line['text']) for line in lines) > 200000:
        raise APIError(400, 'Total lyrics text exceeds 200000 characters')
    lines.sort(key=lambda line: line['timeMs'])
    return {'ok': True, 'connection': 'connected', 'track': normalized,
            'playback': {'isPlaying': playing, 'state': 'playing' if playing else 'paused',
                         'positionMs': number(playback, 'positionMs', normalized['durationMs'] or 86400000),
                         'sampledAtMs': number(playback, 'sampledAtMs', 100000000000000)},
            'lyrics': {'status': 'ready' if lines else 'empty', 'source': 'public', 'lines': lines}}


class Runtime:
    def __init__(self, root, config):
        self.root, self.config = Path(root).resolve(), config
        self.token = load_token(self.root)
        self.cv = threading.Condition(threading.RLock())
        self.epoch, self.sequence, self.stop_generation = secrets.token_hex(8), 0, 0
        self.events = collections.deque(maxlen=HISTORY_LIMIT)
        self.media = collections.OrderedDict()
        self.idempotency = collections.OrderedDict()
        self.chats = collections.OrderedDict()
        self.lyrics = idle_lyrics()
        self.providers = threading.BoundedSemaphore(8)
        self.streams = threading.BoundedSemaphore(16)
        self.closed = False

    def cursor(self, sequence=None):
        return f'{self.epoch}:{self.sequence if sequence is None else sequence}'

    def prune(self):
        now = time.monotonic()
        while self.events and now - self.events[0][3] > HISTORY_TTL:
            self.events.popleft()
        while self.media and (sum(len(item[0]) for item in self.media.values()) > MEDIA_BYTES or now - next(iter(self.media.values()))[2] > MEDIA_TTL or len(self.media) > 128):
            self.media.popitem(last=False)
        for key, value in list(self.idempotency.items()):
            if value['done'] and now - value['time'] > IDEMPOTENCY_TTL:
                del self.idempotency[key]
        for key, value in list(self.chats.items()):
            if value['done'] and now - value['time'] > IDEMPOTENCY_TTL:
                del self.chats[key]

    def publish(self, kind, data):
        with self.cv:
            self.prune()
            self.sequence += 1
            data = {**data, 'event_id': self.cursor()}
            self.events.append((self.sequence, kind, data, time.monotonic()))
            self.cv.notify_all()
            return data

    def once(self, endpoint, body, action):
        rid = request_id(body)
        digest = hashlib.sha256(json.dumps(body, sort_keys=True, separators=(',', ':'), ensure_ascii=True).encode()).hexdigest()
        with self.cv:
            self.prune()
            previous = self.idempotency.get(rid)
            if previous:
                if previous['digest'] != digest or previous['endpoint'] != endpoint:
                    raise APIError(409, 'request_id was already used with a different request', 'idempotency_conflict')
                if not previous['done']:
                    raise APIError(409, 'request_id is still in progress; do not submit a new ID', 'in_progress')
                if previous.get('error'):
                    error = previous['error']
                    raise APIError(error.status, error.message, error.code)
                return previous['result']
            while len(self.idempotency) >= IDEMPOTENCY_LIMIT:
                completed = next((key for key, value in self.idempotency.items() if value['done']), None)
                if completed is None:
                    raise APIError(429, 'Too many pending requests')
                del self.idempotency[completed]
            record = {'digest': digest, 'endpoint': endpoint, 'done': False, 'time': time.monotonic()}
            self.idempotency[rid] = record
        try:
            result = {**action(), 'request_id': rid}
            with self.cv:
                record.update(done=True, result=result)
            return result
        except APIError as exc:
            with self.cv:
                # Never retain request bodies/handlers via exception tracebacks,
                # or grow a shared traceback every time a failure is replayed.
                record.update(done=True, error=APIError(exc.status, exc.message, exc.code))
            raise
        except Exception:
            with self.cv:
                record.update(done=True, error=APIError(500, 'Internal runtime error', 'internal_error'))
            raise

    def tts(self, text):
        cfg = self.config
        if not cfg.tts_ready():
            raise APIError(503, 'Speech provider is not configured. Set MIDORI_TTS_PROVIDER=local with MIDORI_TTS_URL, or explicitly select fish with FISH_API_KEY and FISH_REFERENCE_ID. Agents may POST /api/audio instead.', 'tts_not_configured')
        if not self.providers.acquire(blocking=False):
            raise APIError(429, 'Provider concurrency limit reached')
        try:
            if cfg.tts_provider == 'fish':
                data = provider_post('https://api.fish.audio/v1/tts',
                                     {'text': text, 'reference_id': cfg.fish_reference_id, 'format': 'mp3'},
                                     {'Authorization': 'Bearer ' + cfg.fish_api_key, 'model': 's2.1-pro'})
                return data, audio_format(data, 'mp3')
            data = provider_post(cfg.tts_url, {'text': text})
            return data, audio_format(data)
        finally:
            self.providers.release()

    def speech(self, data, fmt, text, generation, audio_kind='speech'):
        with self.cv:
            if generation != self.stop_generation:
                raise APIError(409, 'Speech was stopped before publication', 'stopped')
            name = uuid.uuid4().hex + '.' + fmt
            self.media[name] = (data, MIME[fmt], time.monotonic())
            self.prune()
            return self.publish('speech', {'audio_url': '/media/' + name, 'text': text,
                                          'created_at': dt.datetime.now(dt.timezone.utc).isoformat(),
                                          'source': 'public-api', 'audio_kind': audio_kind, 'emotion': 'neutral', 'visual_state': ''})

    def action(self, path, body):
        if path == '/api/message':
            return {'ok': True, **self.publish('message', {'text': text_value(body.get('text'))})}
        if path == '/api/stop':
            with self.cv:
                self.stop_generation += 1
                self.events.clear()  # Never replay queued audio from before a stop.
                return {'ok': True, **self.publish('stop', {'reason': 'requested'})}
        text = text_value(body.get('text', ''), required=path == '/api/speak')
        with self.cv:
            generation = self.stop_generation
        if path == '/api/audio':
            audio_kind = body.get('audio_kind', 'unknown')
            if audio_kind not in ('speech', 'test', 'music', 'unknown'):
                raise APIError(400, 'audio_kind must be speech, test, music, or unknown')
            fmt = body.get('format')
            if not isinstance(fmt, str) or fmt not in MIME:
                raise APIError(400, 'format must be wav, mp3, ogg, or m4a')
            encoded = body.get('audio_base64')
            if not isinstance(encoded, str) or len(encoded) > (MAX_AUDIO + 2) // 3 * 4:
                raise APIError(400, 'audio_base64 is missing or too large')
            try:
                data = base64.b64decode(encoded, validate=True)
            except (ValueError, binascii.Error):
                raise APIError(400, 'audio_base64 must be strict base64') from None
            audio_format(data, fmt)
        else:
            data, fmt = self.tts(text)
            audio_kind = 'speech'
        return {'ok': True, **self.speech(data, fmt, text, generation, audio_kind)}


class PublicServer(http.server.ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True

    def __init__(self, address, runtime):
        if address[0] != '127.0.0.1':
            raise ValueError('Public runtime only binds 127.0.0.1')
        self.runtime = runtime
        self.connections = threading.BoundedSemaphore(64)
        super().__init__(address, Handler)

    def process_request(self, request, client_address):
        if not self.connections.acquire(blocking=False):
            self.shutdown_request(request)
            return
        try:
            super().process_request(request, client_address)
        except Exception:
            self.connections.release()
            raise

    def process_request_thread(self, request, client_address):
        try:
            super().process_request_thread(request, client_address)
        finally:
            self.connections.release()

    def server_close(self):
        with self.runtime.cv:
            self.runtime.closed = True
            self.runtime.cv.notify_all()
        super().server_close()


class Handler(http.server.BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    server_version = 'MidoriPublic/1'
    sys_version = ''

    @property
    def runtime(self):
        return self.server.runtime

    def setup(self):
        super().setup()
        self.connection.settimeout(10)

    def log_message(self, *args):
        pass  # No URL, body, Authorization, or provider secret logging.

    def security(self, write=False):
        port = self.server.server_port
        hosts = self.headers.get_all('Host', [])
        if len(hosts) != 1 or hosts[0] not in (f'127.0.0.1:{port}', f'localhost:{port}'):
            raise APIError(403, 'Untrusted Host', 'forbidden')
        origins = self.headers.get_all('Origin', [])
        if len(origins) > 1 or origins and origins[0] != 'http://' + hosts[0]:
            raise APIError(403, 'Origin must exactly match this server', 'forbidden')
        if self.headers.get('Sec-Fetch-Site') == 'cross-site':
            raise APIError(403, 'Cross-site requests are not permitted', 'forbidden')
        if write:
            authorization = self.headers.get_all('Authorization', [])
            token_ok = len(authorization) == 1 and hmac.compare_digest(authorization[0].encode(), ('Bearer ' + self.runtime.token).encode())
            ui_ok = bool(origins) and self.headers.get_all('X-Midori-Action', []) == ['public-ui']
            if not (token_ok or ui_ok):
                raise APIError(401, 'Use Bearer token authentication or the same-origin public UI', 'unauthorized')

    def headers_out(self, status, content_type, length=None, extra=None):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Cross-Origin-Resource-Policy', 'same-origin')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        if length is not None:
            self.send_header('Content-Length', str(length))
        for key, value in (extra or {}).items():
            self.send_header(key, str(value))
        self.end_headers()

    def json_out(self, status, value):
        data = json.dumps(value, ensure_ascii=False, allow_nan=False).encode()
        self.headers_out(status, 'application/json; charset=utf-8', len(data))
        if self.command != 'HEAD':
            self.wfile.write(data)

    def error_out(self, exc):
        self.close_connection = True
        self.json_out(exc.status, {'ok': False, 'error': exc.message, 'code': exc.code})

    def route_path(self):
        try:
            parsed = urllib.parse.urlsplit(self.path)
        except ValueError:
            raise APIError(400, 'Invalid request path') from None
        if parsed.scheme or parsed.netloc:
            raise APIError(400, 'Only origin-form request paths are accepted')
        return parsed.path

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        try:
            self.security()
            path = self.route_path()
            if path == '/health':
                return self.json_out(200, {'ok': True, 'runtime': 'midori-public', 'version': 1})
            if path.startswith('/api/requests/'):
                authorization = self.headers.get_all('Authorization', [])
                if len(authorization) != 1 or not hmac.compare_digest(authorization[0].encode(), ('Bearer ' + self.runtime.token).encode()):
                    raise APIError(401, 'Request status requires agent Bearer authentication', 'unauthorized')
                rid = request_id({'request_id': path[len('/api/requests/'):]})
                with self.runtime.cv:
                    self.runtime.prune()
                    record = self.runtime.idempotency.get(rid)
                    if record is None:
                        raise APIError(404, 'Request unknown or evicted; this does not prove it was never executed', 'unknown_request')
                    error = record.get('error')
                    result = record.get('result', {})
                    status = {'ok': True, 'request_id': rid,
                              'status': 'in_progress' if not record['done'] else 'failed' if error else 'completed',
                              'event_id': result.get('event_id'),
                              'http_status': error.status if error else 200 if record['done'] else None,
                              'code': error.code if error else None}
                return self.json_out(200, status)
            if path == '/api/capabilities':
                cfg = self.runtime.config
                return self.json_out(200, {'ok': True, 'runtime': 'midori-public', 'events': True,
                                          'message': True, 'audio': True, 'stop': True, 'lyrics': True,
                                          'tts': {'provider': cfg.tts_provider, 'configured': bool(cfg.tts_ready())},
                                          'chat': {'configured': bool(cfg.chat_url)},
                                          'gmail': False, 'spotify_control': False, 'blender': False,
                                          'limits': {'audio_bytes': MAX_AUDIO, 'body_bytes': MAX_BODY,
                                                     'event_history': HISTORY_LIMIT, 'idempotency_entries': IDEMPOTENCY_LIMIT}})
            if path == '/api/gmail-unread':
                return self.json_out(200, {'ok': True, 'configured': False, 'enabled': False, 'count': 0, 'cached': False, 'status': 'disabled'})
            if path == '/api/spotify/lyrics-state':
                with self.runtime.cv:
                    state = self.runtime.lyrics
                return self.json_out(200, state)
            if path == '/events':
                if self.command == 'HEAD':
                    return self.headers_out(200, 'text/event-stream', 0)
                return self.events_out()
            return self.static_out(path)
        except APIError as exc:
            self.error_out(exc)
        except (BrokenPipeError, ConnectionResetError, TimeoutError):
            self.close_connection = True

    def body_json(self):
        if self.headers.get_all('Transfer-Encoding') or self.headers.get_all('Content-Encoding'):
            raise APIError(400, 'Encoded or chunked request bodies are not supported')
        types = self.headers.get_all('Content-Type', [])
        if len(types) != 1 or types[0].split(';')[0].strip().lower() != 'application/json':
            raise APIError(415, 'Content-Type must be application/json')
        lengths = self.headers.get_all('Content-Length', [])
        if len(lengths) != 1 or not re.fullmatch(r'[0-9]{1,12}', lengths[0]):
            raise APIError(411, 'A single Content-Length is required')
        length = int(lengths[0])
        if length > MAX_BODY:
            raise APIError(413, 'JSON body exceeds 12 MiB')
        try:
            raw = self.rfile.read(length)
            if len(raw) != length:
                raise APIError(400, 'Incomplete request body')
            def pairs(items):
                obj = {}
                for key, value in items:
                    if key in obj:
                        raise ValueError('duplicate key')
                    obj[key] = value
                return obj
            body = json.loads(raw.decode('utf-8'), object_pairs_hook=pairs, parse_constant=lambda _: (_ for _ in ()).throw(ValueError('nonfinite')))
            # Reject escaped lone surrogates and overflow floats before publishing.
            json.dumps(body, ensure_ascii=False, allow_nan=False).encode('utf-8')
        except (ValueError, UnicodeError, RecursionError):
            raise APIError(400, 'Body must be valid UTF-8 JSON without duplicate keys or nonfinite numbers') from None
        if not isinstance(body, dict):
            raise APIError(400, 'JSON body must be an object')
        return body

    def do_POST(self):
        try:
            self.security(write=True)
            path, body = self.route_path(), self.body_json()
            if path in ('/api/message', '/api/audio', '/api/speak', '/api/stop'):
                return self.json_out(200, self.runtime.once(path, body, lambda: self.runtime.action(path, body)))
            if path == '/api/lyrics/state':
                state = normalized_lyrics(body)
                with self.runtime.cv:
                    self.runtime.lyrics = state
                return self.json_out(200, state)
            if path == '/api/spotify/quick-control':
                return self.json_out(200, {'ok': True, 'handled': False, 'reason': 'Spotify account controls are not available in the public runtime'})
            if path == '/api/apps/blender/launch':
                raise APIError(501, 'Machine application launch is disabled in the public runtime', 'disabled')
            if path == '/api/chat/cancel':
                rid = request_id(body)
                with self.runtime.cv:
                    record = self.runtime.chats.get(rid)
                    cancelled = bool(record and not record['done'])
                    if cancelled:
                        record['cancel'].set()
                return self.json_out(200, {'ok': True, 'request_id': rid, 'cancelled': cancelled})
            if path == '/api/chat/stream':
                return self.chat_out(body)
            raise APIError(404, 'Unknown API route', 'not_found')
        except APIError as exc:
            self.error_out(exc)
        except (BrokenPipeError, ConnectionResetError, TimeoutError):
            self.close_connection = True
        except Exception:
            self.error_out(APIError(500, 'Internal runtime error', 'internal_error'))

    def sse(self, kind, data, event_id=None):
        output = (f'id: {event_id}\n' if event_id is not None else '')
        output += f'event: {kind}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n'
        self.wfile.write(output.encode())
        self.wfile.flush()

    def events_out(self):
        rt = self.runtime
        if not rt.streams.acquire(blocking=False):
            raise APIError(429, 'Too many event streams')
        try:
            supplied = self.headers.get('Last-Event-ID') or urllib.parse.parse_qs(urllib.parse.urlsplit(self.path).query).get('last_event_id', [''])[0]
            with rt.cv:
                rt.prune()
                cursor = rt.sequence
                gap = False
                if supplied:
                    match = re.fullmatch(re.escape(rt.epoch) + r':([0-9]{1,16})', supplied)
                    sequence = int(match[1]) if match else -1
                    floor = rt.events[0][0] - 1 if rt.events else rt.sequence
                    if floor <= sequence <= rt.sequence:
                        cursor = sequence
                    elif match and sequence < floor and rt.events and rt.events[0][1] == 'stop':
                        # Replay the stop barrier, never speech preceding it.
                        cursor, gap = floor, True
                    else:
                        gap = True
            self.close_connection = True
            self.headers_out(200, 'text/event-stream; charset=utf-8', extra={'Connection': 'close', 'X-Accel-Buffering': 'no'})
            self.sse('bridge', {'ok': not gap, 'type': 'gap' if gap else 'connected',
                                'message': 'Cursor expired; skipped historical audio' if gap else 'Public event bridge connected'}, rt.cursor(cursor))
            while not rt.closed:
                with rt.cv:
                    rt.prune()
                    floor = rt.events[0][0] - 1 if rt.events else rt.sequence
                    if cursor < floor:
                        if rt.events and rt.events[0][1] == 'stop':
                            cursor = floor
                            pending = list(rt.events)
                        else:
                            cursor = rt.sequence
                            pending = []
                        gap = True
                    else:
                        pending = [event for event in rt.events if event[0] > cursor]
                        gap = False
                    if not pending and not gap:
                        rt.cv.wait(timeout=1)
                if gap:
                    self.sse('bridge', {'ok': False, 'type': 'gap', 'message': 'Replay window exceeded; skipped historical audio'}, rt.cursor(cursor))
                for sequence, kind, data, _ in pending:
                    # A stop invalidates any copied-but-not-yet-sent speech batch.
                    with rt.cv:
                        valid = kind != 'speech' or any(event[0] == sequence for event in rt.events)
                    if valid:
                        self.sse(kind, data, rt.cursor(sequence))
                    cursor = sequence
                if not pending and not gap:
                    self.wfile.write(b': keepalive\n\n')
                    self.wfile.flush()
        finally:
            rt.streams.release()

    def chat_out(self, body):
        rt = self.runtime
        if not rt.config.chat_url:
            raise APIError(503, 'No chat adapter configured. Set MIDORI_CHAT_URL or connect your agent using AGENT_INTEGRATION.md and POST /api/message or /api/audio.', 'chat_not_configured')
        text = text_value(body.get('text'))
        context = body.get('context', '')
        if not isinstance(context, (str, dict, list)) or len(json.dumps(context)) > 32000:
            raise APIError(400, 'context must be a string/object/list bounded to 32000 JSON characters')
        session = text_value(body.get('session_id', ''), 'session_id', 128, False) or str(uuid.uuid4())
        rid = request_id(body)
        if 'voice' in body and not isinstance(body['voice'], bool):
            raise APIError(400, 'voice must be boolean')
        with rt.cv:
            rt.prune()
            if rid in rt.chats:
                raise APIError(409, 'Chat request_id already submitted; no automatic resubmission', 'duplicate_request')
            while len(rt.chats) >= 128:
                finished = next((key for key, value in rt.chats.items() if value['done']), None)
                if finished is None:
                    raise APIError(429, 'Too many pending chats')
                del rt.chats[finished]
            if not rt.providers.acquire(blocking=False):
                raise APIError(429, 'Provider concurrency limit reached')
            record = {'cancel': threading.Event(), 'done': False, 'time': time.monotonic()}
            rt.chats[rid] = record
            generation = rt.stop_generation
        finished, result = threading.Event(), {}

        def adapter():
            try:
                raw = provider_post(rt.config.chat_url, {'text': text, 'context': context, 'session_id': session, 'request_id': rid}, limit=256000)
                payload = json.loads(raw)
                if not isinstance(payload, dict):
                    raise ValueError('object expected')
                result['text'] = text_value(payload.get('text'))
                result['session_id'] = text_value(payload.get('session_id', session), 'session_id', 128)
            except APIError as exc:
                result['error'] = exc
            except (ValueError, UnicodeError, RecursionError):
                result['error'] = APIError(502, 'Chat adapter returned invalid JSON or text', 'provider_response')
            finally:
                rt.providers.release()
                finished.set()

        threading.Thread(target=adapter, daemon=True).start()
        self.close_connection = True
        try:
            self.headers_out(200, 'text/event-stream; charset=utf-8', extra={'Connection': 'close', 'X-Accel-Buffering': 'no'})
            self.sse('session.ready', {'session_id': session, 'request_id': rid})
            deadline = time.monotonic() + PROVIDER_DEADLINE
            while not finished.wait(0.1):
                if record['cancel'].is_set() or rt.closed:
                    self.sse('request.cancelled', {'request_id': rid})
                    return
                if time.monotonic() > deadline:
                    self.sse('error', {'error': 'Chat adapter deadline exceeded', 'message': 'Chat adapter deadline exceeded', 'code': 'provider_timeout'})
                    return
            if record['cancel'].is_set():
                self.sse('request.cancelled', {'request_id': rid})
                return
            if 'error' in result:
                exc = result['error']
                self.sse('error', {'error': exc.message, 'message': exc.message, 'code': exc.code})
                return
            if result['session_id'] != session:
                self.sse('session.ready', {'session_id': result['session_id'], 'request_id': rid})
            self.sse('assistant.completed', {'content': result['text'], 'request_id': rid})
            if body.get('voice', False):
                try:
                    data, fmt = rt.tts(result['text'])
                    if not record['cancel'].is_set():
                        speech = rt.speech(data, fmt, result['text'], generation)
                        self.sse('voice.queued', {'event_id': speech['event_id'], 'request_id': rid})
                except APIError as exc:
                    self.sse('voice.error', {'error': exc.message, 'message': exc.message, 'code': exc.code, 'request_id': rid})
        finally:
            with rt.cv:
                record['done'] = True
            # HTTP close is the final EOF; no invented assistant reply on errors.

    def static_out(self, raw_path):
        try:
            path = urllib.parse.unquote(raw_path, errors='strict')
        except (UnicodeError, ValueError):
            raise APIError(404, 'Not found', 'not_found')
        if '\\' in path or '\x00' in path or '%' in path:
            raise APIError(404, 'Not found', 'not_found')
        parts = path.lstrip('/').split('/')
        source_archive = path == '/source/folia-source.zip'
        if any(part in ('.', '..') or part.startswith('.') or part.lower().startswith('config.') or '.config.' in part.lower()
               or part.lower() in BLOCKED_PARTS and not (source_archive and part == 'source') for part in parts):
            raise APIError(404, 'Not found', 'not_found')
        if path.startswith('/media/'):
            name = path[7:]
            if not re.fullmatch(r'[0-9a-f]{32}\.(wav|mp3|ogg|m4a)', name):
                raise APIError(404, 'Not found', 'not_found')
            with self.runtime.cv:
                self.runtime.prune()
                media = self.runtime.media.get(name)
            if not media:
                raise APIError(404, 'Media expired or not found', 'not_found')
            data, content_type, _ = media
            return self.file_out(io.BytesIO(data), len(data), content_type)
        relative = path.lstrip('/') or 'index.html'
        if relative in ('help', 'help/', 'lyrics-stage/', 'moon/'):
            relative = relative.rstrip('/') + '/index.html'
        target = Path(relative)
        if relative not in STATIC_FILES and (target.parts[0] not in STATIC_DIRS or target.suffix.lower() not in STATIC_EXTENSIONS):
            raise APIError(404, 'Not found', 'not_found')
        current = self.runtime.root
        for part in target.parts:
            current = current / part
            if current.is_symlink():
                raise APIError(404, 'Not found', 'not_found')
        try:
            current.resolve().relative_to(self.runtime.root)
            fd = os.open(current, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0) | getattr(os, 'O_NONBLOCK', 0))
            with os.fdopen(fd, 'rb') as stream:
                info = os.fstat(stream.fileno())
                if not stat.S_ISREG(info.st_mode):
                    raise APIError(404, 'Not found', 'not_found')
                return self.file_out(stream, info.st_size, MIME.get(target.suffix[1:], mimetypes.guess_type(str(target))[0] or 'application/octet-stream'))
        except (OSError, ValueError):
            raise APIError(404, 'Not found', 'not_found') from None

    def file_out(self, stream, size, content_type):
        with stream:
            start, end, status = 0, size - 1, 200
            extra = {'Accept-Ranges': 'bytes'}
            requested = self.headers.get('Range')
            if requested:
                match = re.fullmatch(r'bytes=([0-9]{0,16})-([0-9]{0,16})', requested)
                valid = bool(match and any(match.groups()) and size)
                if valid:
                    a, b = match.groups()
                    if a:
                        start, end = int(a), min(int(b) if b else size - 1, size - 1)
                    else:
                        count = int(b)
                        start, end = max(0, size - count), size - 1
                        valid = count > 0
                    valid = valid and 0 <= start <= end < size
                if not valid:
                    self.headers_out(416, content_type, 0, {'Content-Range': f'bytes */{size}'})
                    return
                status = 206
                extra['Content-Range'] = f'bytes {start}-{end}/{size}'
            length = max(0, end - start + 1)
            self.headers_out(status, content_type, length, extra)
            if self.command == 'HEAD':
                return
            stream.seek(start)
            while length:
                chunk = stream.read(min(length, 65536))
                if not chunk:
                    break
                self.wfile.write(chunk)
                length -= len(chunk)


def make_server(root=None, port=5178, config=None, host='127.0.0.1'):
    if host != '127.0.0.1':
        raise ValueError('Public runtime only binds 127.0.0.1')
    return PublicServer((host, port), Runtime(root or Path(__file__).resolve().parent, config or Config.from_env()))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=5178)
    parser.add_argument('--host', choices=['127.0.0.1'], default='127.0.0.1')
    args = parser.parse_args()
    try:
        server = make_server(port=args.port, host=args.host)
    except (ValueError, OSError) as exc:
        parser.exit(2, f'Runtime startup failed: {exc}\n')
    token_source = 'MIDORI_API_TOKEN environment' if 'MIDORI_API_TOKEN' in os.environ else '.local/api-token'
    print(f'Midori public runtime: http://127.0.0.1:{server.server_port} (API token from {token_source}; never served)', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
