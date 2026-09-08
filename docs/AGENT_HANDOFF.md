# 给接手 agent 的最小交接

## 目标与非目标

保留现有角色、界面、漂浮图标与本地视觉素材，把公开项目当作独立的本地显示/播放端。不要为了接入某个 harness 重写 UI 或恢复旧私人后端。

用户自己的 agent 管模型、工具、账户、授权与会话；本项目接收最终文本/音频。Hermes、Codex、Pi、OpenClaw、Claude Code 均按通用协议评估，**具体兼容性以实测为准**；没有五套已验证的原生适配器。

## 开工先读

1. [`AGENT_INTEGRATION.md`](../AGENT_INTEGRATION.md)：启动、鉴权、消息/音频/语音/停止/歌词与可选聊天契约。
2. [`server.py`](../server.py)、[`examples/avatar_client.py`](../examples/avatar_client.py)：当前实现与 CLI 参数是接口事实源，先看 `--help`，不猜参数。
3. [`app.js`](../app.js)：输入 context、事件播放、口型、停止和拖拽。
4. [`catalog.mjs`](../assets/shortcut-families/catalog.mjs)、[`families.js`](../assets/shortcut-families/families.js)：应用事实源和家族切换。
5. [`FLOATING_ICONS.md`](FLOATING_ICONS.md)、[`app-integrations.json`](app-integrations.json)：**17 应用 / 5 家族 / 6 context** 的完整接入边界。

## 先跑不花钱的闭环

在项目根目录用 Python 3.10+ 启动 `python server.py`，默认浏览器地址 `http://127.0.0.1:5178/`。首次播放前请用户点击页面解锁音频。

```sh
python examples/avatar_client.py --help
python examples/avatar_client.py health
python examples/avatar_client.py demo
python examples/avatar_client.py stop
python examples/avatar_client.py message --help
python examples/avatar_client.py audio --help
python examples/avatar_client.py lyrics --help
```

- 服务端和 helper 都支持 `MIDORI_API_TOKEN`；服务器启动时的有效环境令牌优先且不落盘，否则使用启动生成且忽略提交的 `.local/api-token`。两端必须一致；不要打印或复制进聊天。格式与优先级见 `API_CONTRACT.md`。
- 按 helper 帮助发送一条最终文本、自有 WAV 和自造歌词状态。页面内容是验证对象，不以 HTTP 200 代替视觉/听觉观察。
- 未配置 TTS/chat adapter 时应给出清楚的未配置结果，而不是启动隐藏模型、旧账户工具或付费兜底。
- Fish 或其他可能收费的测试必须先获用户同意；不要为了使 smoke test 通过而替用户开通服务。

## 接入工作怎么分层

| 用户目标 | 应改的位置/责任 | 不要误判 |
|---|---|---|
| agent 回答显示出来 | harness 的最终输出 hook → helper 或 `/api/message` | 不需要自带模型或原生插件 |
| agent 已有语音驱动角色 | 用户侧读取音频 → `/api/audio` | 不需要 Fish 凭据 |
| 服务端合成语音 | 显式配置 Fish 或兼容的本地 HTTP TTS | 不自动付费回退 |
| 网页聊天交给 agent | 用户侧通用 HTTP adapter + `MIDORI_CHAT_URL` | 任意原生 harness URL 不一定兼容 |
| 漂浮应用执行任务 | 用户侧账户/桌面适配器、最小权限、写入确认 | context/网站入口不等于账户功能 |
| Spotify 歌词可视化 | `/api/lyrics/state` | 不等于控制 Spotify 播放 |
| Blender 本地启动 | 未来用户自有路径与授权设计；当前禁用 | 没有默认安装路径或现成公开启动路由 |

无 context 的目录应用要先明确是否增加 UI context，再实现用户侧能力。X/Figma 当前只有网站/context 接缝。不要从旧函数名、徽标或播放器 UI 推断私有功能已经带入公开版。

## 验证清单（执行后才可勾选）

- [ ] Python 最低版本与启动参数核对；默认仅准确 loopback 监听。
- [ ] helper 的 health、message、audio/demo、stop、lyrics 均实际执行，保存退出码和非敏感响应。
- [ ] 首次音频手势、可听见播放、口型、停止均在真实浏览器验证；未测则明确写出。
- [ ] 无效 Bearer、跨站浏览器写入、非法文件路径/逐请求网络 URL 不被接受；不要在真实账户上做安全负例。
- [ ] 未配置 TTS/chat 的失败路径清楚；没有付费 fallback 或不确定写入自动重试。
- [ ] 全部 17 个应用的 ID/网址/context/launch 与目录逐项相等；5 家族无重复遗漏；文档/JSON 锚点与源码文件存在。
- [ ] 大图标、名称、箭头换位、按住拖动、保护区恢复、收起/放出分别验证；context 不被当成账户授权。
- [ ] 用户若选择 TTS/chat/账户适配，单独记录实际 provider、权限范围、测试动作和结果；未测试不得宣称兼容。
- [ ] 交付前确认不含用户凭据、机器路径、profile、OAuth 文件、生成语音、聊天记录或历史私有文档；不要修改第三方应用以掩盖范围问题。

这是一张待执行的验收表，不是通过记录。当前文档工作只核对目录完整性与交互源码；任何运行时测试必须由接手者记录真实结果。

## 硬边界

保持视觉层不变，除非用户明确要求。不要修改用户其他项目或配置；不要自动扫描并导入本机模型、账号或凭据。账户读取先最小权限，发信/发帖/删除/本地启动需明确授权并核验结果。输出到 Avatar 的只能是最终可展示内容，绝不包含思考、工具流、秘密或未授权私有内容。

接口不符时修正最小接缝并更新上述文档；结果不确定时先核查，不自动重试写入。交接报告只写“改了什么、实际验证了什么、仍缺什么”。
