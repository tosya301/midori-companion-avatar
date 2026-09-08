# 本地候选版验证记录

**状态：本地交付验证通过，用于公开预览版。** 维护者于 2026-09-08 确认已取得随包全部素材的公开再分发授权；这是维护者确认，不是独立法律审查。运行时与既有视觉验收范围保持如下记录。

## 实际执行结果

- Python 公共运行时：**43 passed，0 failures**。主目录与清洁副本均执行；涵盖鉴权、同源/Host、路径与静态白名单、音频容器/Range、SSE、去重/状态查询、停止屏障、限额、过期、SDK/CLI、模拟 TTS/chat/Fish。
- 打包回归：**1 passed**。专门证明「Git 状态干净但换行转换改变字节」会被拒绝，保留原始字节后才能生成与提交一致的 ZIP，并验证不覆盖已有输出。与运行时合计 **44 项 Python 测试通过**。
- JavaScript：**4 passed，0 failures**。请求头边界，以及目录中 **17 应用 / 5 家族 / 6 context** 与接入地图、网址和源码/文档锚点的逐项一致性。
- Chromium 真实浏览器：**13 组检查通过**，页面异常 0、资源请求失败 0。完整结果见 [`qa/browser.json`](qa/browser.json)。
- 三条内置音频均真实播放；两条人声样音的名称、选择、播放时钟和 RMS 已检查，提示音的口型响应已检查。样音试听不调用 TTS。
- 实际 HTTP → SSE 最终文字显示、音频上传/播放、停止并清空、重复请求去重、新页面不重播历史，以及未配置聊天的明确失败已通过。
- 保留 **7 个立绘状态**；经典近距进出、日夜和窄屏已检查。**18 个歌词模式**均完成选择与 iframe 就绪/状态传递检查；另以固定歌词时点截图检查 Original、Monet、Cappella、Tempera，避免把转场初始空帧当作渲染验收。
- 漂浮音乐家族的换位、网站目标变化和名称选择 Spotify context 已通过；没有访问外部账户。其余应用做目录一致性核对，不宣称每项平台能力已经完成。
- Folia 既有成功证据：typecheck / build exit 0，目标单测 **711 passed / 1 skipped**。不是完整上游测试套件；失败的早期超时尝试和选取范围见 [`FOLIA_BUILD.md`](FOLIA_BUILD.md)。
- 父级重新运行源码核验脚本：**105 个部署文件、2,038 个源码 payload 文件**哈希吻合；对应源码 ZIP **2,039 个成员**、完整 CRC/成员/哈希校验通过。

## 清洁副本测试的含义

将候选文件逐字节复制到独立目录，不复制 Git、`.local`、`.env`、`secrets`、`node_modules`。服务器以清空后的环境启动，仅保留 PATH、LANG 和一个不含配置的 HOME；默认 TTS 为 none、chat 未配置，邮箱/Spotify 账号控制/Blender 启动关闭。

应用运行只使用 Python 标准库及随包静态产物，不依赖私人 profile、GPU 模型或 Node 服务。测试浏览器本身使用开发机的 Playwright/Chromium；这不算浏览器工具的完全离线安装，也不是 OS 级沙箱隔离证明。服务器与完整浏览器闭环均在该副本通过，验证后功能文件哈希未变。

## 复验入口

```sh
python -m unittest discover -s tests -p 'test_public*.py' -v
npm ci --ignore-scripts
npm test
npx playwright install chromium
python server.py
# 另一终端：
npm run test:browser
python vendor/folia/scripts/verify-source-distribution.py --archive source/folia-source.zip --artifacts
```

浏览器结果默认写入被忽略的 `test-results/public-smoke/`。端口不同时使用 `MIDORI_BASE_URL`；测试工具允许 `PLAYWRIGHT_MODULE`、`PLAYWRIGHT_CHROMIUM_EXECUTABLE` 和 `MIDORI_TEST_OUTPUT` 显式覆盖，不携带作者机器路径。

固定时间的视觉观察入口是 `node tests/browser/lyric-visual.cjs`；它生成截图和状态 JSON，不自动代替人工视觉判断。

`qa/tested-files.json` 为实际检查过的候选功能文件哈希；截图和状态记录只是该版本的观察证据。交付 ZIP 内的 `RELEASE_MANIFEST.json` 与外部 receipt/sha256 绑定最终完整文件集；恢复验证另见 ZIP 旁的 restore 记录。

## 隐私与发布边界

检查了候选文件和嵌套 Folia 源码 ZIP：未发现命中的私人绝对路径、私人标识、私钥块、配置凭据或禁入目录。唯一凭据形状命中是单测中显式 `TEST_ONLY_` 的模拟值，经源码核对记录为测试夹具。模式扫描不是所有秘密绝对不存在的数学证明。

不包含私人 Git 历史、参考录音、克隆模型、朗读历史、账户配置或生成音频缓存。随附人声仅两条维护者确认纳入的测试样音；图片/角色媒体按维护者本次授权确认保留。素材许可不覆盖未来新增素材，也不免除第三方代码许可义务，详见 `ASSET_RIGHTS.md` 和 `LICENSE_SCOPE.md`。

明确未验证：五种 harness 的分别实连、真实 Fish 云端请求、用户平台账号功能、Windows/macOS 启动器与各平台浏览器、全部上游套件及低性能设备表现。模拟供应商、静态样音播放和真实语音合成是三种不同证据，不可混称。
