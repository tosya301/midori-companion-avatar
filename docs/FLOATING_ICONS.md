# 漂浮应用：交互与接入边界

目录有 **17 个应用、5 个家族、6 个 context 标记**。大图标是网站入口，不是账户授权按钮。只有 `gmail`、`spotify`、`x`、`figma`、`youtube`、`bilibili` 的名称可选择输入上下文；其他网站应用的名称提示“尚未接入”。Blender 是禁用的本地启动占位，不会打开网站或预置可执行文件。

## 操作

- **大图标**：打开目录中的网站。Photoshop、After Effects 指向产品网页，不启动桌面软件。
- **名称**：有 context 的应用把输入框切到该上下文，供后续提交携带；不立即调用账户工具。界面文案是“下一条消息”，但当前选择不是发送后自动清空的一次性令牌。光标位于输入起点且无选区时按 Backspace 可清除；把当前应用换出家族主位也会清除它的已选 context。
- **侧箭头 → 小图标**：展开同家族候选；点击小图标与主位互换，不打开网站、不发起账户操作。顺序保存在浏览器 `localStorage` 的 `midori.shortcut-family.v1.<family>`。回复进行中不允许换位。
- **拖动**：在图标上按住 **340 ms** 后拖动；按住尚未生效前移动超过 **8 px** 会取消待拖动。名称和家族菜单不是拖拽手柄。松开后短暂抑制误点击。
- **恢复**：拖入角色保护区域后松开，图标淡出、移至安全位置再淡入，每段 **450 ms**；不是删除。普通松开则继续漂浮。
- **收起/放出**：工具栏的漂浮图标按钮隐藏或恢复整个图标层，取消拖动；不删除应用，也不清除保存的家族顺序。状态过渡标记在 **680 ms** 后清除。
- 鼠标悬停或家族菜单展开时暂停该图标漂浮；菜单支持方向键、Escape、点击外部关闭。减少动态效果设置会跳过换位飞行动画。

以上时序来源：[`app.js`](../app.js) 的 `bindSiteIconDragHandlers`、`respawnSiteIcon`、`setSiteIconsCollapsed`；家族交互来源：[`families.js`](../assets/shortcut-families/families.js) 的 `mount`、`render`、`select`。常量是实现配置，不是浏览器实测耗时。

## 全量映射

以下各节是 [`app-integrations.json`](app-integrations.json) 的稳定公开锚点；机器读取请使用 JSON，`website/context/catalog_launch` 忠实反映 [`catalog.mjs`](../assets/shortcut-families/catalog.mjs)。`adapter_required: true` 表示账户/本地应用能力仍需用户侧实现，不是等待启用某个隐藏插件。

<a id="gmail"></a>
### Gmail · `gmail`

- 现状：网站入口 + context 接缝；无账户适配器；context：`gmail`；网站：[https://mail.google.com/mail/u/0/#inbox](https://mail.google.com/mail/u/0/#inbox)。
- 用户侧接入：用户自有 Gmail API/OAuth 或已授权浏览器；先只读邮件，发送/删除另行确认。
- 安全验证：只读列出测试邮箱的一封邮件；不发信、不标记、不删除。
- 尚缺：邮箱读取、未读计数、草稿与发送适配器；禁止恢复旧私有轮询。

<a id="outlook"></a>
### Outlook · `outlook`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://outlook.live.com/mail/0/](https://outlook.live.com/mail/0/)。
- 用户侧接入：用户自有 Outlook/Microsoft Graph OAuth 或浏览器；读信与写信分开授权。
- 安全验证：只读查看测试邮箱；不发送、不修改邮件。
- 尚缺：增加显式 context 与邮箱适配器。

<a id="qq"></a>
### QQ邮箱 · `qq`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://mail.qq.com/](https://mail.qq.com/)。
- 用户侧接入：用户自有邮箱登录或邮件协议授权；不得索要主密码写入仓库。
- 安全验证：只读查看测试邮箱；不发送邮件。
- 尚缺：增加 context、邮箱协议或浏览器适配器。

<a id="spotify"></a>
### Spotify · `spotify`

- 现状：网站入口 + context 接缝；无账户适配器；context：`spotify`；网站：[https://open.spotify.com/](https://open.spotify.com/)。
- 用户侧接入：用户自有 Spotify 授权和播放设备；播放控制由用户 agent 执行，歌词显示不需要 Spotify 登录。
- 安全验证：先用自造歌词状态验证本地显示；账户适配后只读查询当前播放。
- 尚缺：账户读取/播放控制适配器；用户授权后才控制设备。

<a id="applemusic"></a>
### Apple Music · `applemusic`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://music.apple.com/](https://music.apple.com/)。
- 用户侧接入：用户自有 Apple Music/MusicKit 或浏览器能力；订阅及播放权限按用户环境验证。
- 安全验证：先只读网页；账户适配后只读查询媒体信息。
- 尚缺：增加 context 与播放状态/控制适配器。

<a id="netease"></a>
### 网易云音乐 · `netease`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://music.163.com/](https://music.163.com/)。
- 用户侧接入：用户自有网易云音乐授权浏览器或合法可用接口；明确设备控制权限。
- 安全验证：只读打开网站；不自动登录或改变播放。
- 尚缺：增加 context、曲目读取/播放控制适配器。

<a id="qqmusic"></a>
### QQ音乐 · `qqmusic`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://y.qq.com/](https://y.qq.com/)。
- 用户侧接入：用户自有 QQ音乐授权浏览器或合法可用接口；明确设备控制权限。
- 安全验证：只读打开网站；不自动登录或改变播放。
- 尚缺：增加 context、曲目读取/播放控制适配器。

<a id="x"></a>
### X · `x`

- 现状：网站入口 + context 接缝；无账户适配器；context：`x`；网站：[https://x.com/](https://x.com/)。
- 用户侧接入：用户自有 X API 或已授权浏览器；读取、发帖、私信、删除分别授权。
- 安全验证：先读取用户指定的公开帖子；不发帖、不点赞、不发私信。
- 尚缺：读取/搜索适配器；写入确认和结果核验。

<a id="xiaohongshu"></a>
### 小红书 · `xiaohongshu`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://www.xiaohongshu.com/explore](https://www.xiaohongshu.com/explore)。
- 用户侧接入：用户自有小红书浏览器登录及合规可用能力；发布、评论单独确认。
- 安全验证：只读打开公开页面；不点赞、评论或发布。
- 尚缺：增加 context 与只读内容适配器；另行实现写入安全门。

<a id="instagram"></a>
### Instagram · `instagram`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://www.instagram.com/](https://www.instagram.com/)。
- 用户侧接入：用户自有 Instagram/Meta 授权或浏览器；读取、发布与消息权限分离。
- 安全验证：只读公开页面；不关注、不发布、不发消息。
- 尚缺：增加 context 与内容/账户适配器。

<a id="figma"></a>
### Figma · `figma`

- 现状：网站入口 + context 接缝；无账户适配器；context：`figma`；网站：[https://www.figma.com/](https://www.figma.com/)。
- 用户侧接入：用户自有 Figma API/OAuth/MCP 或浏览器；用户指定文件且授予最小读取权限。
- 安全验证：读取用户授权的测试文件元数据；不改设计。
- 尚缺：文件读取/设计操作适配器；写入和导出范围确认。

<a id="blender"></a>
### Blender · `blender`

- 现状：公开版禁用本地启动；目录标记 `launch: blender`；context：无；网站：无（目录没有 href）。
- 用户侧接入：未来由用户显式提供自有 Blender 可执行文件路径和本地启动权限；不得扫描机器或预置路径。
- 安全验证：当前确认本地启动被拒绝且不创建进程；未来先核验路径和启动授权。
- 尚缺：用户自有路径配置、固定程序白名单、启动确认与不确定结果核验；公开版不提供本地启动实现。

<a id="photoshop"></a>
### Adobe Photoshop · `photoshop`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://www.adobe.com/products/photoshop.html](https://www.adobe.com/products/photoshop.html)。
- 用户侧接入：用户自有 Photoshop 安装、许可及明确的脚本/自动化接口；文件范围需授权。
- 安全验证：当前只打开产品网站；未来仅操作用户创建的临时测试文档。
- 尚缺：增加 context 与本地应用适配器；不假定桌面启动已经可用。

<a id="aftereffects"></a>
### Adobe After Effects · `aftereffects`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://www.adobe.com/products/aftereffects.html](https://www.adobe.com/products/aftereffects.html)。
- 用户侧接入：用户自有 After Effects 安装、许可及明确的脚本/自动化接口；输出路径需授权。
- 安全验证：当前只打开产品网站；未来仅检查临时测试项目，不渲染收费任务。
- 尚缺：增加 context 与本地应用适配器；渲染前确认资源与输出范围。

<a id="youtube"></a>
### YouTube · `youtube`

- 现状：网站入口 + context 接缝；无账户适配器；context：`youtube`；网站：[https://www.youtube.com/](https://www.youtube.com/)。
- 用户侧接入：用户自有 YouTube API 或浏览器；公开读取和账户写入分离，遵守嵌入限制。
- 安全验证：先只读用户指定公开视频；不评论、不订阅、不改变账户。
- 尚缺：搜索/内容读取适配器；播放器显示不代表账户工具可用。

<a id="bilibili"></a>
### Bilibili · `bilibili`

- 现状：网站入口 + context 接缝；无账户适配器；context：`bilibili`；网站：[https://www.bilibili.com/](https://www.bilibili.com/)。
- 用户侧接入：用户自有 Bilibili 授权浏览器或合法可用接口；发布、评论、删除分别确认。
- 安全验证：先只读用户指定公开视频；不投币、不点赞、不发布。
- 尚缺：内容读取/搜索适配器；账户写入确认与结果核验。

<a id="tiktok"></a>
### TikTok · `tiktok`

- 现状：仅网站入口；无 context / 账户适配器；context：无；网站：[https://www.tiktok.com/](https://www.tiktok.com/)。
- 用户侧接入：用户自有 TikTok 授权或浏览器；读取、发布与消息权限分离。
- 安全验证：只读打开公开页面；不点赞、评论或发布。
- 尚缺：增加 context 与内容/账户适配器。

## Spotify、X、Figma 与旧功能的区别

- **Spotify 可视化 ≠ Spotify 账户集成**：用户 agent 可用 `POST /api/lyrics/state` 驱动歌词舞台，不需要 Spotify 账户。曲目查询、播放/暂停、设备选择由用户自己的 agent 和授权工具负责。本接口不代取封面/歌词，也不自动控制任何账户。
- **X / Figma**：名称只提供 context。看见图标、标签或输入提示，不能推断已经读到时间线、文件或账户。先实现只读适配，再另行验证写入。
- **旧私有功能不属于公开契约**：旧 UI 中的账户提示、未读徽标、播放器或历史函数名不代表公开后端支持 Gmail、Spotify、Bilibili、X 或 Blender 的私有路由。不要恢复私有脚本、OAuth 文件、机器路径或会话历史来“补齐”功能。
- **Blender**：未来只能由用户提供自己的安装路径并授权固定程序启动；不能从此目录派生任意命令执行接口，不能内置某台机器的路径。

## 如何扩展

1. 先读 [通用接入契约](../AGENT_INTEGRATION.md)，确认最小演示可用。
2. 从 JSON 选应用，核对当前 `status` 和 `missing_work`。若 `context` 是 null，新增 UI context 也是尚未完成的工作，不要伪造已存在的 context。
3. 在用户自己的 harness/adapter 中配置账户和最小权限。先只读，在用户授权范围内验证，再加写入确认与结果回读。
4. 只把可公开给用户的最终文本或音频送给 Avatar。不要传工具调用、推理过程、令牌、私有文件内容或账户凭据。
5. 维护目录后同步 JSON，并程序校验：全部应用 ID 完整、无重复、家族分区一致、网址/context/launch 与目录相同。网站能打开不算账户功能通过。

源码审阅已覆盖目录与交互；本文不宣称外部网站可达、登录状态或任何原生账户适配器已经实测通过。
