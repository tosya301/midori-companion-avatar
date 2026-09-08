# Folia 嵌入式本地试听 · 0.1

Midori Companion Avatar 的本地音乐试听由宿主页面播放音频、提供歌词和时钟。Folia 保留十二种视觉模式，不把本地试听伪装成 Spotify 账号播放。

## 使用入口

点击 Spotify 图标下方文字，在仍允许自动提示且未收到成功 connected 音乐状态时确认试听。音频实际开始播放、点击「不再提示」，或页面收到成功 connected 状态后，按 origin 记住不再自动弹出；暂停也算 connected，取消、Escape 或未成功播放不算。清除站点数据重置偏好，禁用存储时仅当前页面有效。

「调试信息 → 本地音乐试听」是独立的手动入口，Agent 语音接入已完成、音乐已连接或自动提示已关闭后仍可重开。试听不需要 Agent、Spotify 账号或 TTS；日文歌词从 LRCLib 联网获取，使用 Ina 原视频字幕的49句时间轴，非逐字对齐。音源、时间轴和素材权利见 [试听说明](../../assets/local-audition/README.md) 与 [素材权利说明](../../ASSET_RIGHTS.md)。

## 嵌入边界

父页面使用 `?lyricStage=1&localAudition=1` 启用宿主时钟与所提供的歌词。此标记不持久保存，不增加消息来源、网络端点、文件路径或参数权限。独立 Folia 与未带该精确标记的嵌入继续使用原有行为。所有十二种视觉模式共用舞台控制器，渲染实现保持不变。

本地试听不发起子页面的 Spotify 精确进度查询，也不执行在线自动歌词匹配。父页面同源消息校验与来源检查保持不变。Original 接收毫秒级起止时间；Folia 的 LRC 桥保留百分之一秒精度的开始时间，不传显式结束时间，沿用渲染器的停留与间奏规则。

新内容、退出来源／Context 或组件卸载时，旧解析与匹配结果失效。精确 HTTP 查询被新请求取代或销毁时会中止。普通匹配流程在供应商操作之间支持协作取消；已发出且不支持 AbortSignal 的供应商请求可能完成，但不能开始下一步匹配或替换当前歌词。本地试听不发起这些请求。

Agent 端配置音乐不会自动同步；需向 `POST /api/lyrics/state` 提交状态，再由页面读取。`connected` 表示本地显示状态，不证明真实账号授权。

## 源码与验证范围

相关实现位于 `src/hooks/useStagePlaybackController.ts`、`src/utils/localAudition.ts`、`src/services/nowPlayingProvider.ts` 与 `src/utils/lyrics/autoMatchBestLyric.ts`。对应源码、构建方式和许可见 [Folia 构建说明](../../docs/FOLIA_BUILD.md)；运行包提供 `source/folia-source.zip`。

实际验证记录见 [验证说明](../../docs/VERIFICATION.md)。模式就绪不等于每种动画都能持续满帧，也不等于完成逐字音画对齐。Folia 与修改代码按 AGPL-3.0 提供；录音、封面、歌词及角色图像不随代码许可证一揽子授权。
