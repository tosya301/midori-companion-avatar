#!/usr/bin/env python3
"""Stdlib agent client. Only explicitly requested commands cause publication."""
from __future__ import annotations

import argparse
import base64
import io
import json
import math
import os
from pathlib import Path
import re
import struct
import sys
import urllib.error
import urllib.parse
import urllib.request
import uuid
import wave

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_URL = 'http://127.0.0.1:5178'
DEMO_TEXT = 'Hello from the public Midori avatar. This is an original demonstration message accompanied by a test tone, not synthesized speech.'


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        fp.close()
        raise RuntimeError('Redirect refused; the API token was not forwarded')


class AvatarClient:
    def __init__(self, base_url=DEFAULT_URL, token=None, token_file=None, timeout=45):
        parsed = urllib.parse.urlsplit(base_url)
        if (parsed.scheme != 'http' or parsed.hostname not in ('127.0.0.1', 'localhost')
                or parsed.username is not None or parsed.password is not None
                or parsed.path not in ('', '/') or parsed.query or parsed.fragment):
            raise ValueError('Avatar URL must be an HTTP loopback origin, without credentials, path, or query')
        port = parsed.port or 80  # Validate before any token-bearing network call.
        self.base_url = f'http://127.0.0.1:{port}'  # Pin localhost; bypass DNS/proxies.
        self.token = token
        self.token_file = Path(token_file) if token_file else PROJECT_ROOT / '.local' / 'api-token'
        self.timeout = timeout
        self.opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())

    def request(self, path, body=None, authenticated=False):
        routes = {'/health', '/api/capabilities', '/api/message', '/api/audio', '/api/speak',
                  '/api/stop', '/api/lyrics/state', '/api/spotify/lyrics-state', '/api/chat/cancel'}
        if not isinstance(path, str) or (path not in routes and not re.fullmatch(r'/api/requests/[A-Za-z0-9_.:-]{1,128}', path)):
            raise ValueError('Unsupported public API path')
        headers = {'Accept': 'application/json'}
        data = None
        if body is not None or authenticated:
            token = self.token if self.token is not None else os.environ.get('MIDORI_API_TOKEN')
            if token is None:
                with self.token_file.open(encoding='utf-8') as stream:
                    token = stream.read(257).strip()
            if not isinstance(token, str) or not re.fullmatch(r'[A-Za-z0-9_-]{32,128}', token):
                raise ValueError('Invalid API token')
            headers.update({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
        if body is not None:
            data = json.dumps(body, ensure_ascii=False, allow_nan=False).encode()
        req = urllib.request.Request(self.base_url + path, data=data, headers=headers, method='POST' if body is not None else 'GET')
        try:
            with self.opener.open(req, timeout=self.timeout) as response:
                raw = response.read(2 * 1024 * 1024 + 1)
                if len(raw) > 2 * 1024 * 1024:
                    raise RuntimeError('Runtime response too large')
                return json.loads(raw)
        except urllib.error.HTTPError as exc:
            try:
                payload = json.loads(exc.read(65536))
                message = payload.get('error', 'Runtime rejected request')
            except (ValueError, UnicodeError):
                message = 'Runtime rejected request'
            raise RuntimeError(f'HTTP {exc.code}: {message}') from None
        except urllib.error.URLError:
            raise RuntimeError('Cannot connect to the public runtime') from None

    @staticmethod
    def with_id(body, request_id=None):
        rid = str(uuid.uuid4()) if request_id is None else request_id
        if not isinstance(rid, str) or not re.fullmatch(r'[A-Za-z0-9_.:-]{1,128}', rid):
            raise ValueError('request_id must be 1..128 ASCII letters, digits, _, ., :, or -')
        return {**body, 'request_id': rid}

    def health(self):
        return self.request('/health')

    def status(self, request_id):
        rid = self.with_id({}, request_id)['request_id']
        return self.request('/api/requests/' + rid, authenticated=True)

    def message(self, text, request_id=None):
        return self.request('/api/message', self.with_id({'text': text}, request_id))

    def audio(self, data, format='wav', text='', request_id=None):
        return self.request('/api/audio', self.with_id({'audio_base64': base64.b64encode(data).decode(), 'format': format, 'text': text}, request_id))

    def speak(self, text, request_id=None):
        return self.request('/api/speak', self.with_id({'text': text}, request_id))

    def stop(self, request_id=None):
        return self.request('/api/stop', self.with_id({}, request_id))

    def lyrics(self, state):
        return self.request('/api/lyrics/state', state)

    def demo(self, request_id=None):
        return self.audio(demo_tone(), 'wav', DEMO_TEXT, request_id)


def demo_tone():
    """Deterministic 0.4-second, quiet 440-Hz PCM WAV; deliberately not a voice."""
    rate, count = 16000, 6400
    frames = bytearray()
    for index in range(count):
        envelope = min(1.0, index / 320, (count - 1 - index) / 320)
        value = int(2500 * envelope * math.sin(2 * math.pi * 440 * index / rate))
        frames.extend(struct.pack('<h', value))
    stream = io.BytesIO()
    with wave.open(stream, 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(rate)
        wav.writeframes(frames)
    return stream.getvalue()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default=DEFAULT_URL)
    parser.add_argument('--token-file', type=Path, help='Default: project .local/api-token; never printed')
    parser.add_argument('--request-id', help='Reuse an ID only for the exact same request')
    parser.add_argument('--demo', action='store_true', help='Alias for the demo subcommand')
    sub = parser.add_subparsers(dest='command')
    sub.add_parser('health')
    sub.add_parser('status').add_argument('id')
    for command in ('message', 'speak'):
        sub.add_parser(command).add_argument('text')
    audio = sub.add_parser('audio')
    audio.add_argument('file', type=Path)
    audio.add_argument('--format', choices=['wav', 'mp3', 'ogg', 'm4a'])
    audio.add_argument('--text', default='')
    sub.add_parser('stop')
    sub.add_parser('demo')
    lyrics = sub.add_parser('lyrics')
    lyrics.add_argument('file', type=Path, help='UTF-8 JSON normalized lyric state')
    args = parser.parse_args(argv)
    command = 'demo' if args.demo else args.command
    if not command or args.demo and args.command:
        parser.error('Choose one subcommand or --demo')
    try:
        client = AvatarClient(args.url, token_file=args.token_file)
        if command == 'health':
            result = client.health()
        elif command == 'status':
            result = client.status(args.id)
        elif command in ('message', 'speak'):
            result = getattr(client, command)(args.text, args.request_id)
        elif command == 'audio':
            if args.file.stat().st_size > 8 * 1024 * 1024:
                raise ValueError('Audio exceeds 8 MiB')
            fmt = args.format or args.file.suffix.lower().lstrip('.')
            if fmt not in ('wav', 'mp3', 'ogg', 'm4a'):
                raise ValueError('Specify --format wav|mp3|ogg|m4a')
            result = client.audio(args.file.read_bytes(), fmt, args.text, args.request_id)
        elif command == 'lyrics':
            if args.file.stat().st_size > 1024 * 1024:
                raise ValueError('Lyrics JSON exceeds 1 MiB')
            result = client.lyrics(json.loads(args.file.read_text(encoding='utf-8')))
        else:
            result = getattr(client, command)(args.request_id)
        print(json.dumps(result, ensure_ascii=False))
        return 0
    except (OSError, ValueError, RuntimeError) as exc:
        print(f'Avatar client: {exc}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
