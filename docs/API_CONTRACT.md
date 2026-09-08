# Public runtime API contract (v1)

This documents `server.py`, not the private runtime. Python 3.10+ standard library only. Start from the public project with `python3 server.py`; default origin is **http://127.0.0.1:5178**. `--port` changes the port; `--host` permits only `127.0.0.1`. No account, provider, or cloud call is required for messages, uploaded audio, stop, lyrics, or the deterministic tone demo. See [AGENT_INTEGRATION.md](../AGENT_INTEGRATION.md) for agent usage.

## Authentication and HTTP rules

- All requests require exactly one `Host`, either `127.0.0.1:<actual-port>` or `localhost:<actual-port>`.
- If `Origin` is supplied, it must occur exactly once and equal `http://` plus that exact Host value (no trailing slash). `Origin: null`, a different localhost spelling, and `Sec-Fetch-Site: cross-site` are rejected with 403. There is no cross-origin CORS/preflight permission.
- Every POST requires either `Authorization: Bearer <token>` or the browser UI pair `Origin: <exact-origin>` and `X-Midori-Action: public-ui`. A custom action header alone is insufficient. The UI must send it on same-origin API POSTs only; never put the token in HTML, JavaScript, URLs, or localStorage.
- `GET /api/requests/<id>` requires Bearer authentication even for the UI. Other documented GET/HEAD routes do not require a token. This is a trusted local-user runtime, not isolation from other programs running as the same user. SSE and media are readable by local clients.
- The server reads `MIDORI_API_TOKEN` at startup if the variable exists: exactly 32–128 ASCII letters, digits, `_`, or `-`. Empty or malformed values fail startup. The environment value takes precedence and is **not written to disk**. Otherwise the server creates/reuses `<public-project>/.local/api-token` (random token, requested mode 0600; directory 0700). Symlinks and invalid/nonregular token files are refused. Filesystem ACL enforcement depends on the OS/mount; protect this folder and never package it.
- POST bodies are UTF-8 JSON objects with one `Content-Type: application/json` (parameters permitted) and one decimal `Content-Length`. Maximum body: 12 MiB / 12582912 bytes. Chunked/encoded bodies, duplicate JSON keys, invalid UTF-8, lone Unicode surrogates, nonfinite/overflow floats, and nonobject roots are rejected. Unknown JSON fields are ignored, but participate in the idempotency fingerprint.
- Strings are trimmed; text limits apply before trimming. Ordinary message/speech text is at most 20000 characters. Required text cannot normalize to empty.
- Implemented API errors use `{"ok":false,"error":"human-readable explanation","code":"machine_code"}`. Ordinary JSON responses use `application/json; charset=utf-8`. HTTP parser errors and unsupported methods may use the standard-library error format instead.
- Responses are `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Cross-Origin-Resource-Policy: same-origin`, and `X-Frame-Options: SAMEORIGIN` on handled routes. API errors close the connection. HEAD follows GET headers without a body; HEAD `/events` does not open an SSE subscription.

## Route inventory

| Method and path | Request / effect | Success |
|---|---|---|
| GET `/health` | Liveness | `{"ok":true,"runtime":"midori-public","version":1}` |
| GET `/api/capabilities` | Safe configuration flags; no keys or adapter URLs | See below |
| POST `/api/message` | Required `text`; optional `request_id` | 200, publishes `message` |
| POST `/api/audio` | Required `format`, `audio_base64`; optional `text`, `request_id` | 200, stores media and publishes `speech` |
| POST `/api/speak` | Required `text`; optional `request_id` | 200, configured TTS then `speech`; 503 if unconfigured |
| POST `/api/stop` | Object, optionally `request_id` | 200, publishes `stop`, invalidates earlier speech generation |
| GET `/api/requests/<id>` | Bearer-only status of the four preceding idempotent routes | 200 status, or 404 `unknown_request` |
| GET `/events` | SSE event subscription; optional replay cursor | Long-lived 200 SSE |
| GET/HEAD `/media/<opaque-name>.<format>` | Previously accepted/generated audio | 200, 206 for a valid byte range, 404 if expired |
| POST `/api/lyrics/state` | Normalized lyrics state below | 200, stored state itself, not an event |
| GET `/api/spotify/lyrics-state` | Read stored public lyrics state | 200, same wrapper as POST |
| POST `/api/chat/stream` | Configured local chat adapter; see below | 200 SSE, or JSON error before stream starts |
| POST `/api/chat/cancel` | `request_id` of submitted chat | `{"ok":true,"request_id":"…","cancelled":true/false}` |
| GET `/api/gmail-unread` | Disabled compatibility shim | `{"ok":true,"configured":false,"enabled":false,"count":0,"cached":false,"status":"disabled"}` |
| POST `/api/spotify/quick-control` | Disabled account-control shim | `{"ok":true,"handled":false,"reason":"Spotify account controls are not available in the public runtime"}` |
| POST `/api/apps/blender/launch` | Machine launch is disabled | 501 `disabled` |

There are **no** `/api/state`, `/api/chat`, `/api/stream`, or `/api/cancel` aliases. Unknown routes return 404. Queries are not API parameters except `last_event_id` on `/events`; never send secrets in queries.

Capabilities returns `ok:true`, `runtime:"midori-public"`, booleans `events`, `message`, `audio`, `stop`, `lyrics` (all true), `tts:{provider,configured}`, `chat:{configured}`, and `gmail:false`, `spotify_control:false`, `blender:false`. `limits` contains `audio_bytes:8388608`, `body_bytes:12582912`, `event_history:256`, `idempotency_entries:512`. A configured provider flag checks startup configuration, not provider reachability or account validity.

## Message, audio, speech, and stop

A message request is `{"text":"Final user-visible text","request_id":"turn-42-text"}`. Success has **top-level** `ok`, `request_id`, `event_id`, and `text`. It produces text only, never TTS.

Audio upload example (replace the placeholder with strict standard base64, no data-URL prefix):

```json
{"format":"wav","audio_base64":"<base64 of audio bytes>","text":"Optional final caption","request_id":"turn-42-audio"}
```

Audio accepts `wav`, `mp3`, `ogg`, or `m4a`, matching the actual container signature, maximum 8388608 decoded bytes. WAV must be readable PCM with nonempty complete frame data, 1–8 channels, and 8000–192000 Hz. Compressed formats receive container-signature checks, **not full codec decoding or a playability guarantee**. `audio_url`, local file paths, remote URLs, and provider overrides are not upload sources. The server never fetches a per-request audio URL or reads a per-request file.

Both `/api/audio` and `/api/speak` return this shape (illustrative values):

```json
{
  "ok":true,
  "request_id":"turn-42-audio",
  "event_id":"<runtime-epoch>:<sequence>",
  "audio_url":"/media/<32 lowercase hex characters>.wav",
  "text":"Optional final caption",
  "created_at":"<UTC ISO-8601 timestamp>",
  "source":"public-api",
  "emotion":"neutral",
  "visual_state":""
}
```

`audio_url` and `event_id` are **not nested**. The `speech` SSE data is that object without `ok` and `request_id`. Uploaded audio remains in memory; no audio file is written. HTTP success proves publication, not that a browser has unlocked audio, played it, or finished it. Multiple connected tabs can consume the same event.

Stop accepts `{}` or `{"request_id":"stop-42"}` and returns top-level `ok`, `request_id`, `event_id`, `reason:"requested"`. Its SSE data is `{reason,event_id}`. It clears earlier replay history and increments a speech-generation barrier: TTS already in flight before the stop cannot subsequently store/publish speech (409 `stopped`). The stop does not interrupt the provider's network request, refund a provider call, erase already stored media URLs, or cancel chat text generation. Clients must halt current audio and discard their queue when receiving `stop`. A new speech request begun after the barrier is allowed.

## Idempotency and recovery

Only POST `/api/message`, `/api/audio`, `/api/speak`, and `/api/stop` use the shared idempotency table.

- `request_id`: 1–128 ASCII letters, digits, `_`, `.`, `:`, or `-`. Omission generates a UUID. Supply your own ID **before** sending if recovery matters.
- Exact same ID, endpoint, and parsed body replays the same success object/event ID, or the same API error, without publishing or invoking the provider again. Object key order/JSON whitespace do not matter; field values, omitted versus supplied fields, and array order do.
- Same ID with a changed body or different endpoint: 409 `idempotency_conflict`. Exact same request still running: 409 `in_progress`; do not create a new ID to bypass it.
- Maximum 512 entries, completed entries expire after 3600 seconds from registration, and older completed entries may be evicted earlier to make room. All state is lost on restart. This is a **bounded retry window, not permanent exactly-once delivery**.
- GET `/api/requests/<id>` returns `ok:true`, `request_id`, `status` (`in_progress`, `completed`, or `failed`), `event_id` (null unless successful publication), `http_status` (null, 200, or stored error status), and `code` (null or stored error code). No text, audio, provider keys, or full request body is returned.
- Unknown/evicted ID returns 404 `unknown_request`; this **does not prove the request was never executed**. Status does not cover chat, lyrics, or disabled compatibility routes. A successful cached audio result may point at media that has since expired: do not regenerate potentially paid speech automatically.
- `/api/lyrics/state` replaces state each time; `request_id` is ignored there. `/api/chat/stream` instead rejects duplicate chat IDs with 409 `duplicate_request`; it does not replay replies.

## Event stream and media delivery

`GET /events` returns `text/event-stream; charset=utf-8`. Frames use `id: <epoch>:<sequence>`, `event: <kind>`, one JSON `data:` line, then a blank line. Ignore `: keepalive` comments. Supported application events:

| Event | Data |
|---|---|
| `bridge` | `{ok,type,message}`; type is `connected` or `gap` |
| `message` | `{text,event_id}` |
| `speech` | `{audio_url,text,created_at,source,emotion,visual_state,event_id}` |
| `stop` | `{reason:"requested",event_id}` |

Fresh subscriptions start at the current cursor and **do not replay old audio**. Reconnect using `Last-Event-ID`; `?last_event_id=...` is a fallback, and a nonempty header takes precedence. Valid retained cursors replay events strictly after the cursor. Client-side event-ID deduplication is still recommended.

History retains at most 256 events for at most 900 seconds. Wrong-epoch, invalid, future, or expired cursors produce a `bridge` gap and skip stale history. If a stop is the oldest retained event, an old same-runtime cursor can receive that stop barrier plus subsequent events, never pre-stop audio. A subscriber falling behind the window receives a gap too. Bridge frames have a cursor ID but no `event_id` in their JSON data.

Media is capped at 64 MiB total, 128 entries, and 1800 seconds per entry; oldest media is evicted on pressure. Limits are pruned lazily when runtime state is accessed. Media is not refreshed by reading. A single `Range: bytes=start-end`, `bytes=start-`, or `bytes=-suffix-length` returns 206 with `Content-Range`; invalid, multiple, reversed, or unsatisfiable ranges return 416 with `Content-Range: bytes */<size>`. HEAD supplies matching headers and no bytes. MIME mapping: WAV `audio/wav`, MP3 `audio/mpeg`, OGG `audio/ogg`, M4A `audio/mp4`.

## Public lyrics state

POST `/api/lyrics/state` replaces an in-memory display state; it does not connect to Spotify, start music, look up lyrics, or fetch artwork. Send `{"track":null}` (or omit `track`) to reset. Active example:

```json
{
  "track":{"id":"song-1","title":"Original song","artist":"Artist","album":"Album","durationMs":5000,"artworkUrl":"/assets/cover.png"},
  "playback":{"isPlaying":true,"positionMs":1200,"sampledAtMs":1700000000000},
  "lyrics":{"lines":[{"timeMs":0,"text":"First line"},{"timeMs":2000,"text":"Second line"}]}
}
```

For active state, `track`, `playback`, and `lyrics` must all be objects. Normalized response and subsequent GET `/api/spotify/lyrics-state` are identical:

- Top-level `ok:true`, `connection:"connected"`, `track`, `playback`, `lyrics`.
- Track strings `id`, `title`, `artist`, `album`: optional, default empty, trimmed, max 500 each. `durationMs`: default 0, clamped to 0–86400000. Output adds `type:"track"`.
- **Canonical input/output artwork field is `artworkUrl`, not `coverUrl`.** Legacy `coverUrl` is accepted only as an input fallback if `artworkUrl` is absent; output never emits `coverUrl`. Max 2048 characters, empty allowed; otherwise HTTPS with a host and no credentials/backslashes/control whitespace, or a local `/assets/` path without traversal, percent escapes, query, fragment, or backslashes. An HTTPS image, if rendered by the frontend, is a browser request; use local artwork for an offline page.
- `isPlaying`: boolean, default false. Output derives `state:"playing"` or `"paused"`. `positionMs` defaults to 0 and is clamped to duration (or 86400000 if duration is zero). `sampledAtMs` defaults to 0 and is clamped to 100000000000000; clients should supply their position-sampling wall-clock time in milliseconds.
- Numeric fields reject booleans/nonfinite values; finite numbers are clamped and converted to integers. No clock extrapolation is performed by the server.
- `lyrics.lines`: default empty, at most 2000 objects. Each has `timeMs` (default 0, clamped to 0–86400000) and `text` (default empty, max 1000 trimmed characters). At most 200000 total normalized text characters. Lines are sorted by `timeMs`. Output derives `lyrics:{status:"ready"|"empty",source:"public",lines:[...]}`.

Idle state is exactly:

```json
{"ok":true,"connection":"disabled","track":null,"playback":{"isPlaying":false,"state":"idle","positionMs":0,"sampledAtMs":0},"lyrics":{"status":"idle","source":"public","lines":[]}}
```

## Optional providers and chat stream

Configuration is startup-only; JSON requests cannot change it.

| Environment variable | Contract |
|---|---|
| `MIDORI_TTS_PROVIDER` | `none` (default), `local`, or explicitly `fish` |
| `MIDORI_TTS_URL` | Required for local TTS; trusted loopback HTTP adapter URL |
| `MIDORI_CHAT_URL` | Optional trusted loopback HTTP chat adapter URL |
| `FISH_API_KEY`, `FISH_REFERENCE_ID` | Both required when explicitly selecting Fish; server-side only |

Local adapter URLs permit hosts `127.0.0.1`, `localhost` (pinned to 127.0.0.1), or `[::1]`, scheme HTTP, no userinfo or fragment. Paths/queries are startup configuration, not user request inputs. Proxies are disabled and provider redirects are refused rather than forwarding keys. No automatic retries or fallback providers exist. Fish, when explicitly selected, posts only to `https://api.fish.audio/v1/tts` with JSON `{text,reference_id,format:"mp3"}`, `Authorization: Bearer <FISH_API_KEY>`, and `model: s2.1-pro`. This contract was tested with a mock, **not a live Fish account or paid request**.

Local TTS receives POST JSON `{"text":"…"}` and must return raw accepted audio bytes, **not** JSON/base64. No public API Bearer token or Fish key is sent to a local adapter. Response limit is 8 MiB. Unconfigured TTS returns 503 `tts_not_configured`; malformed audio fails container validation (currently 400 `invalid_request`).

Chat request fields: required `text`; optional `context` (string/object/list, default empty string, at most 32000 characters using Python's default JSON serialization), `session_id` (trimmed string, max 128, generated UUID if empty/omitted), `request_id` (same identifier grammar), and `voice` (boolean, default false). The configured adapter receives POST JSON `{text,context,session_id,request_id}` and must return a JSON object `{text,session_id?}` within 256000 response bytes; text is required and max 20000, returned session ID max 128 and nonempty. The runtime does not store conversation history; the adapter owns session context.

This is a **completion adapter carried over SSE**, not token-by-token generation. Chat SSE frames have no `id:` field and are not replayable. Successful sequence:

1. `session.ready` → `{session_id,request_id}`. May occur again if the adapter returns a different session ID.
2. `assistant.completed` → `{content,request_id}`, exactly one complete reply. This is not a `/events` message event.
3. If `voice:true`, either `voice.queued` → `{event_id,request_id}` after publishing a separate `/events` speech event, or `voice.error` → `{error,message,code,request_id}`.
4. HTTP EOF closes the stream. There is no synthetic `done` event or invented fallback reply.

Once SSE headers are sent, failures are events within HTTP 200: `error` → `{error,message,code}`, or `request.cancelled` → `{request_id}`. Before headers, unconfigured chat is JSON 503 `chat_not_configured`; invalid request/concurrency/duplicate errors use normal JSON errors. Adapter validation may report `invalid_request`; invalid JSON/object responses report `provider_response`.

POST `/api/chat/cancel` targets the supplied chat `request_id`; it returns `cancelled:true` when a record exists and is not done, otherwise false. Omission generates an unrelated ID and therefore normally returns false: always supply the original ID. Cancellation suppresses subsequent reply/voice publication when observed, but cannot retract an already emitted completion, interrupt provider I/O, or guarantee a refund. During voice generation it suppresses late audio; the stream can simply close after an already emitted completion. Use `/api/stop` to clear existing browser audio as well. Chat IDs are retained up to 128 entries / 3600 seconds from registration, with older completed entries evicted first.

Concurrency caps are 8 shared provider calls, 16 `/events` streams, and 64 accepted HTTP connections. Exhausted API/provider/SSE slots return 429; excess connections are closed before routing. Accepted sockets have a 10-second inactivity timeout. Provider reads use a 15-second socket timeout and a 30-second elapsed deadline checked between reads (one blocking read can extend that deadline). Chat waiting also checks its 30-second deadline. These are bounds, not a real-time cancellation guarantee.

## Error codes and retry policy

Common status/code pairs: 400 `invalid_request`, 401 `unauthorized`, 403 `forbidden`, 404 `not_found` / `unknown_request`, 409 `idempotency_conflict` / `in_progress` / `duplicate_request` / `stopped`, 411 or 413 or 415 `invalid_request`, 429 `invalid_request`, 500 `internal_error`, 501 `disabled`, 502 `provider_failure` / `provider_redirect` / `provider_response`, 503 `tts_not_configured` / `chat_not_configured`, 504 `provider_timeout`. Provider socket/HTTP failures are sanitized to `provider_failure`; provider response bodies, URLs, headers, and keys are not reflected. Stream errors use the same code vocabulary without changing the already-sent HTTP 200.

Never blindly retry paid speech or chat with a new ID after a timeout/disconnection. Query request status where supported; bounded-cache uncertainty is real. An expired cursor, expired media URL, and an evicted request ID are three independent conditions.

## Static-file boundary

The runtime serves allowlisted public files, never a directory listing. Root files include `index.html`, `app.js`, `styles.css`, `spotify-lyrics-stage.js`, `public-api.js`, `moon.js`, `moon-renderer.js`, `help.html`, and `favicon.ico`. Exact additional paths:

- `/audio/demo-tone.wav`
- `/audio/test-voice-human-01.wav`
- `/audio/test-voice-human-02.wav`
- `/audio/samples.json`
- `/source/folia-source.zip`

Only these audio/source paths are exceptions; other `/audio/*` and `/source/*` files are not served. An allowlist entry does not create the file: missing files return 404. Approved web/media extensions are also served under `assets`, `moon`, `lyrics-stage`, and `help`, subject to blocked path components and symlink checks. Dotfiles, configuration filenames, `.local`, `server.py`, `docs`, `node_modules`, traversal, and symlink targets are blocked. Raw source files are not served; the named distribution archive is an intentional exception and must be curated before packaging. `/help`, `/help/`, `/moon/`, and `/lyrics-stage/` map to their respective `index.html`; `/help.html` is separate.

## Stdlib helper and verification

`examples/avatar_client.py` offers `AvatarClient(base_url, token=None, token_file=None, timeout=45)` and methods `health()`, `status(request_id)`, `message(text, request_id=None)`, `audio(data, format='wav', text='', request_id=None)`, `speak(text, request_id=None)`, `stop(request_id=None)`, `lyrics(state)`, and `demo(request_id=None)`. Token precedence: explicit SDK token, then `MIDORI_API_TOKEN`, then explicit/default token file. It validates IDs/tokens and API paths, pins localhost to IPv4 loopback, disables proxies/redirects, limits JSON responses to 2 MiB, and never retries. It does not implement a chat/SSE reader. `request()` is restricted to its known JSON routes and request-status paths, not a general HTTP client.

Run examples from the public project:

```sh
python3 examples/avatar_client.py health
python3 examples/avatar_client.py --request-id turn-42 message 'Final visible message'
python3 examples/avatar_client.py audio audio/demo-tone.wav --text 'Test tone, not speech'
python3 examples/avatar_client.py --demo
python3 examples/avatar_client.py lyrics path/to/state.json
python3 examples/avatar_client.py status turn-42
python3 examples/avatar_client.py stop
python3 -m unittest discover -s tests -p 'test_public_runtime.py' -v
```

Global `--url`, `--token-file`, and `--request-id` options precede the subcommand. CLI success prints one JSON object and exits 0; handled errors go to stderr and exit 1. Demo synthesizes a deterministic quiet 0.4-second 440-Hz PCM WAV locally; it is explicitly **not synthesized speech**. Tests run isolated ephemeral loopback servers, genuine HTTP/SSE/range requests, the real CLI, local chat/TTS fixtures, and a mocked Fish boundary. Compressed-audio fixtures prove signature routing, not actual codec playback. Browser rendering, human-sample provenance, audible playback, and live provider/account functionality are separate acceptance checks.
