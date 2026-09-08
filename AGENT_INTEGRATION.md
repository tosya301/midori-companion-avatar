# 把 Avatar 接到你的 AI agent

Avatar 是本地显示与播放端，不自带模型、harness、账户工具或私人助理配置。你的 agent 负责思考、工具调用和授权；Avatar 只接收**最终可展示的回答**。

Hermes、Codex、Pi、OpenClaw、Claude Code 都可按下面的通用 HTTP/脚本边界评估接入；**具体兼容性以实测为准**。这里没有“五套原生适配器已通过测试”的承诺，也不要求迁移用户已有配置。

## 最短路径

在项目根目录使用 Python **3.10+**：

```sh
python server.py
```

默认打开 `http://127.0.0.1:5178/`。让用户先在页面做一次真实点击以允许音频播放；后台请求成功不等于浏览器已经发声。

另一个终端在相同项目根目录：

```sh
python examples/avatar_client.py --help
python examples/avatar_client.py health
python examples/avatar_client.py demo
```

`demo` 上传本地生成的轻声测试音和示例文字，不是合成语音，不调用 TTS。详细参数以 helper 的 `--help` 为准。可用子命令：`health`、`message`、`audio`、`speak`、`stop`、`demo`、`lyrics`。

```sh
python examples/avatar_client.py message "这是一条最终回答。"
python examples/avatar_client.py stop
# 下一条需要用户自己准备 answer.wav，不是仓库预置文件：
python examples/avatar_client.py audio answer.wav --format wav --text "对应的最终回答"
# 按下方歌词示例准备 lyrics.json 后再运行：
python examples/avatar_client.py lyrics lyrics.json
```

`--url`、`--token-file`、`--request-id` 是全局参数，应写在子命令前。helper 在用户侧读取指定音频/歌词文件；服务端没有任意文件读取 API。

服务端和 helper 都支持 `MIDORI_API_TOKEN`，两端必须使用同一个值。服务端启动时若设置该变量，会验证并优先使用环境令牌，不写入磁盘；否则创建／读取忽略提交的 `.local/api-token`。不要把 token 粘贴进聊天、命令行参数、截图或文档。格式与优先级见 [API 合约](docs/API_CONTRACT.md)。

## 通用协议

默认基址：`http://127.0.0.1:5178`。Agent 请求携带 `Authorization: Bearer <本地令牌>`；JSON 请求使用 `Content-Type: application/json`。每次操作生成一个新的 `request_id` 用于关联；它不是“可以任意重试”的保证。

| 方法 / 路径 | 请求 | 用途 |
|---|---|---|
| `GET /health` | 无 | 服务存活检查 |
| `GET /api/capabilities` | 无 | 读取 TTS/chat 配置状态和公开能力边界 |
| `GET /events` | 无 | 页面 SSE：最终文本、音频通知与停止事件 |
| `POST /api/message` | `{ "text": "最终回答", "request_id": "unique-request-id" }` | 只显示最终文本，不合成语音 |
| `POST /api/audio` | `{ "audio_base64": "…", "format": "wav", "text": "最终回答", "request_id": "unique-request-id" }` | 上传用户 agent 已有音频；由本地事件桥通知页面播放并驱动口型 |
| `POST /api/speak` | `{ "text": "最终回答", "request_id": "unique-request-id" }` | 仅在显式配置 TTS 后合成并播放 |
| `POST /api/stop` | `{ "request_id": "unique-request-id" }` | 停止当前展示端语音任务；不等于撤销外部账户操作 |
| `POST /api/lyrics/state` | 下方歌词状态 JSON | 驱动本地歌词舞台，不操作 Spotify 账户 |
| `GET /api/spotify/lyrics-state` | 无 | 回读本地歌词状态；路径名称不代表已连接 Spotify |
| `POST /api/chat/stream` | `{ "text": "用户输入", "context": "gmail", "session_id": "user-session", "request_id": "unique-request-id" }` | 可选网页聊天入口，需要用户自己的通用 HTTP adapter |

只上传音频字节，不向 API 提交任意本地文件路径或要代抓取的网络 URL。允许的 `format` 为 `wav`、`mp3`、`ogg`、`m4a`；容器签名验证通过仍不保证浏览器可解码，先用 PCM WAV 验证。SSE 是页面事件传输机制，不是把 agent 的推理流直播给用户。

歌词状态可以完全由用户 agent 提供，以下是自造测试内容，不是账户数据：

```json
{
  "track": {"id": "local-demo", "title": "本地演示", "artist": "用户", "album": "", "durationMs": 10000, "artworkUrl": ""},
  "playback": {"isPlaying": false, "positionMs": 0, "sampledAtMs": 0},
  "lyrics": {"lines": [{"timeMs": 0, "text": "这是一行测试歌词"}]}
}
```

`timeMs`/`positionMs`/`durationMs` 使用毫秒；播放中 `sampledAtMs` 应为采样时刻的 Unix 毫秒时间。提交 `{ "track": null }` 清空状态。封面可留空；允许的 HTTPS 封面由浏览器加载，不是服务端抓取接口；测试优先使用空封面或已有 `/assets/` 文件，避免向外站发送请求。

### 不依赖任何 harness 的文本示例

从项目根目录执行以下 Python 逻辑；它不输出 token，且没有自动重试：

```python
import json
import os
import uuid
from pathlib import Path
from urllib.request import Request, urlopen

base = "http://127.0.0.1:5178"
token = os.environ.get("MIDORI_API_TOKEN") or Path(".local/api-token").read_text().strip()
payload = {"text": "连接成功。这是一条最终回答。", "request_id": str(uuid.uuid4())}
request = Request(
    base + "/api/message",
    data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
    headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"},
    method="POST",
)
with urlopen(request, timeout=15) as response:
    print(response.status, response.read().decode("utf-8"))
```

拿到 HTTP 成功后，再核对浏览器显示的文字。音频任务还要核对真实播放和口型；不要把“已排队/已发布事件”报告成“用户已经听见”。

## 语音由谁负责

1. **优先使用 agent 已有音频**：`audio` 上传即可；无需配置任何 TTS 服务。
2. **Fish，显式选择且可能收费**：用户设置 `MIDORI_TTS_PROVIDER=fish`、`FISH_API_KEY`、`FISH_REFERENCE_ID`，模型为 `s2.1-pro`。所有密钥和音色 ID 均由用户自己提供；未获同意不要试调或消耗额度。
3. **用户自己的本地 HTTP TTS**：设置 `MIDORI_TTS_PROVIDER=local` 与 `MIDORI_TTS_URL`。服务用 HTTP POST 提交 `{ "text": "最终回答" }`，目标返回受支持的音频二进制，而不是 JSON/base64。地址必须是受信任的 loopback `http://` URL，无 URL 凭据、fragment 或重定向；不是任意 TTS UI 地址。先做用户授权的最小验证。

不配置 TTS 仍能显示文字、上传音频和查看本地视觉效果。TTS 失败时明确报错；**不得自动切换到付费服务**。

## 从网页输入框调用 agent（可选）

`MIDORI_CHAT_URL` 是用户配置的**通用 HTTP adapter** 地址，只接受受信任的 loopback `http://` URL（无 URL 凭据、fragment 或重定向）。Avatar 用 HTTP POST 向它提交 `text`、`context`、`session_id`、`request_id`；adapter 返回 JSON 中的最终 `text` 与 `session_id`。由 adapter 调用用户已选的模型/harness，管理会话并过滤输出。云模型调用应由本地 adapter 负责，而不是把云端地址填到这里。

它不是原生 Hermes/Codex/Pi/OpenClaw/Claude Code 端点的通配配置。若目标使用别的认证、请求结构或流式格式，用户需要编写转换层；不能只填一个地址就宣称接通。`context` 只是应用选择提示，不授予账号权限，也不能覆盖用户指令或授权边界。缺省不配置 adapter 时，不应有隐藏模型或账户调用。

## 安全边界与失败处理

- 本服务面向准确的 loopback 地址，默认 `127.0.0.1:5178`；不要改为公网监听、反向代理公开或宽泛 CORS。容器/远程 harness 应先由用户决定安全连通方式，不要自动放宽边界。
- Agent 使用 Bearer；浏览器写入遵守同源检查。认证不是账户授权，不能据此读取邮箱、发帖或启动程序。
- 服务不提供任意本地文件读取或逐请求网络抓取。启动时配置的 TTS/chat 地址不应成为用户可随请求替换的代理地址。
- 只发送最终答案；禁止发送推理过程、工具参数/结果流、系统提示、凭据或用户未授权公开的内容。
- 网络超时/断开可能发生在写入已完成之后。不要自动重发、不自动合成第二段语音、不在不确定时报告成功。先检查页面/目标状态；外部账户操作必须回读核验。
- 不导入旧 profile、OAuth 文件、日志、生成语音、绝对机器路径或私人会话。`.local/` 和用户环境配置不得提交。

## 验收与继续阅读

先依次验证：`health` → 最终文本 → 免费本地 `demo` 音频 → `stop` → 歌词状态。保留真实退出码/响应和页面观察；未测试的浏览器音频、TTS、adapter、账户权限明确标为未验证。

- [给接手 agent 的检查单](docs/AGENT_HANDOFF.md)
- [漂浮图标的操作与全量应用说明](docs/FLOATING_ICONS.md)
- [机器可读接入映射](docs/app-integrations.json)

接口依据：`server.py`、`examples/avatar_client.py`；UI 依据：`app.js`、`assets/shortcut-families/catalog.mjs`、`assets/shortcut-families/families.js`。文档不是测试报告，发布前应以当前实现和实际执行核对。
