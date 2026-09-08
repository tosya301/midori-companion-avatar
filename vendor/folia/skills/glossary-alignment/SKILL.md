---
name: glossary-alignment
description: Use when the user refers to repository-specific terms such as home view, grid, player panel, local library, online provider, Stage, OBS, visualizer mode, queue, current song, search state, or another spoken component/state name and you need to map it quickly to current files.
---

# Glossary Alignment

把口头术语先映射到当前代码的第一归属，再沿一层调用关系追实现。路径以代码为准；如果文档与代码冲突，直接指出旧映射。

## App / global state

- “主入口 / 播放器主调度 / 当前歌曲 / 主队列” -> `src/App.tsx`；入口 JSX 的区域边界在 `src/components/app/AppShell.tsx`、`Home.tsx`、`PlayerPanel.tsx`、`overlays/AppOverlays.tsx`、`dialogs/AppDialogs.tsx`。
- “当前歌曲 / 播放队列 / 状态提示” -> `currentSong` / `playQueue` / `statusMsg` in `src/App.tsx`。
- “home/player 切换 / 最后视图” -> `src/hooks/useAppNavigation.ts`（`last_app_view` 等持久化导航状态）。
- “搜索词 / 搜索结果 / 搜索来源 tab / 首页 tab” -> `src/stores/useSearchNavigationStore.ts`。
- “集合导航栈 / 当前集合” -> `src/stores/useCollectionNavigationStore.ts`。
- “设置 UI 当前页 / quick editor” -> `src/stores/useSettingsUiStore.ts` / `useThemeQuickEditorStore.ts`。

## Home / library

- “首页 / 网格首页 / 3D 首页” -> `src/components/app/Home.tsx` -> `components/app/home/buildHomeModel.ts`、`GridViewOverlayHost.tsx` -> `src/components/Grid3D.tsx` / `GridView.tsx`。
- “集合卡片 / 网格导航 / 渐进加载 / 六边形 viewport” -> `src/components/folia-grid/*`。
- “首页 collection adapter” -> `src/components/app/home/gridViewCollectionAdapters.ts`。
- “本地库首页面 / 本地 3D 网格” -> `src/components/app/home/LocalGrid3DView.tsx`、`localGrid3DModel.ts`。
- “Navidrome 首页面 / Navi 3D 网格” -> `src/components/app/home/NavidromeGrid3DView.tsx`、`useNavidromeGridLibrary.ts`。
- “在线 provider 账号 / 登录 / 切换” -> `src/components/app/home/OnlineProvider*`、`onlineProviderAccountView.ts`，状态在 `src/stores/useOnlineProviderAccountStore.ts`，账号/二维码逻辑在 `src/hooks/useOnlineProvider*.ts`。
- “本地库扫描 / 索引 / 重扫 / 播放” -> `src/hooks/useLocalLibraryCatalog.ts` -> `src/services/localLibraryCatalogService.ts`、`localLibraryCatalogInternals.ts`、`localMusicService.ts`、`src/utils/localLibraryIndex.ts`。
- “本地文件夹 / 本地歌单 / 实体编辑 / artist split” -> `src/components/local-library-entity/*` -> `src/services/localLibraryEntityMutations.ts`、`localLibraryEntityRepository.ts`。
- 旧路径 `src/components/LocalMusicView.tsx`、`src/components/local/LocalPlaylistView.tsx`、`src/components/navidrome/*` 不是当前入口。

## Search / panel / dialogs

- “搜索工作台 / 搜索结果页” -> `src/components/app/search/SearchWorkspace.tsx`、`SearchResultsList.tsx`、`SearchResultRow.tsx`；总 overlay 在 `src/components/app/overlays/AppOverlays.tsx`。
- “右侧播放器面板 / unified panel” -> app entry `src/components/app/PlayerPanel.tsx` -> `player-panel/buildPlayerPanelModel.ts`；旧的实现仍在 `src/components/UnifiedPanel.tsx`。
- “封面 / 控制 / 队列 / 本地 / Navi / FM / 账号 tab” -> `src/components/panelTab/{Cover,Controls,Queue,Local,Navi,Fm,Account}Tab.tsx`。
- “overlay 总装配” -> `src/components/app/overlays/AppOverlays.tsx` + `buildAppOverlaysModel.ts`。
- “dialog 总装配 / 设置 dialog” -> `src/components/app/dialogs/AppDialogs.tsx` + `buildAppDialogsModel.ts` / `buildSettingsDialogModel.ts`。
- “设置弹窗 / 帮助 / 选项中心” -> `src/components/modal/SettingsModal.tsx`、`UserGuideModal.tsx`；设置分区在 `src/components/modal/settings/*`。
- “本地歌词匹配 / Navi 歌词匹配” -> `src/components/modal/LyricMatchModal.tsx` / `NaviLyricMatchModal.tsx`。
- “命令面板 / 快捷命令” -> `src/components/command-palette/commandRegistry.ts`、`types.ts`、`CommandPalette.tsx`。

## Playback / external surfaces

- “播放 transport / queue / audio bridge / visualizer bridge” -> `src/hooks/usePlaybackTransportController.ts`、`usePlaybackQueueController.ts`、`usePlaybackAudioBridge.ts`、`usePlaybackVisualizerBridge.ts`。
- “在线播放 / 播放源适配 / 预取” -> `src/services/onlinePlayback.ts`、`playbackAdapters.ts`、`prefetchService.ts`。
- “播放恢复 / 在线回退 / 播放缓存” -> `src/components/app/playback/*`。
- “Stage 模式 / 外部播放器控制 / Stage session” -> `src/hooks/useStagePlaybackController.ts`、`src/utils/appStageHelpers.ts`、`src/utils/stageClientDemo.ts`、`src/utils/stagePlayerSnapshot.ts`、`electron/stageApi.cjs`。
- “Now Playing / PlayerCap” -> `src/hooks/useNowPlayingSource.ts`、`usePlayerCapSource.ts`、`src/services/nowPlayingProvider.ts`、`playerCapProvider.ts`、`src/types/playerCap.ts`。
- “OBS browser source / OBS lyrics / OBS web source” -> `src/components/obs/*`、`src/hooks/useObsBrowserSourcePublisher.ts`、`src/utils/obsBrowserSource.ts`、`src/types/obsBrowserSource.ts`。
- “Remote 控制 / 远程歌词 / 视频导出” -> `src/components/remote/*`、`src/types/remoteControl.ts`、`src/hooks/useElectronVideoExportController.ts`、`src/services/electronVideoExport.ts`。

## Online music and data

- “在线歌曲、搜索、歌词、音频、歌单、专辑、歌手、推荐、点赞、账户” -> public boundary `src/services/onlineMusic/omni.ts` + `src/types/onlineMusic.ts`。
- “网易云 provider / 酷狗 provider” -> adapter `neteaseProvider.ts` / `kugouProvider.ts`，transport `kugouTransport.ts`；普通 UI、hook、store、app service 不应直连它们。
- “provider 注册 / 账号缓存 / provider storage” -> `providerRegistry.ts`、`providerAccountCache.ts`、`providerStorage.ts`。
- “Navidrome / Subsonic” -> `src/services/navidromeService.ts` + `src/types/navidrome.ts`；它不是在线歌曲 Omni provider。
- “本地音乐 service / local playlist” -> `src/services/localMusicService.ts`、`localPlaylistService.ts`。
- “统一歌曲 / 本地歌曲 / 播放身份” -> `src/types.ts`、`src/types/appPlayback.ts`、`src/utils/appPlaybackGuards.ts`、`appPlaybackHelpers.ts`。

## Lyrics / visualizer

- “歌词解析 / 原始歌词格式” -> `src/utils/lyrics/parserCore.ts`、`src/workers/lyricsParser.worker.ts` / `metadataParser.worker.ts`；visualizer 不负责 `.lrc/.vtt/.yrc/.qrc` 解析。
- “短句 / render end / fast reveal” -> `src/utils/lyrics/renderHints.ts`。
- “CJK 语义分组 / sticky 标点 / contraction” -> `src/utils/lyrics/cjkSemanticLayout.ts`。
- “逐字 / grapheme timing” -> `src/utils/lyrics/graphemeTiming.ts`。
- “visualizer 统一入口 / 当前行 / 背景” -> `src/components/visualizer/VisualizerRenderer.tsx`、`runtime.ts`、`backgrounds/VisualizerBackgroundRenderer.tsx`。
- “visualizer shared props / tuning 类型” -> `src/components/visualizer/definition.ts`、`tuningRegistry.ts`、`src/types.ts`。
- 模式入口统一为 `src/components/visualizer/<mode>/entry.tsx`：`classic`、`cadenza`、`partita`、`fume`、`cappella`、`tilt`、`claddagh`、`monet`、`diorama`、`pendolo`、`sonnet`。
- “Partita layout / 预热” -> `src/components/visualizer/partita/VisualizerPartita.tsx` + `src/components/visualizer/partita/README.md`；共享 layout 工具仍在 `src/utils/lyrics/cjkSemanticLayout.ts`。
- “Pendolo” -> `src/components/visualizer/pendolo/VisualizerPendolo.tsx`、`pendoloTextLayout.ts`、`pendoloTimeline.ts`、`PendoloClockworkCanvas.tsx`。
- “Sonnet / Pixi” -> `src/components/visualizer/sonnet/VisualizerSonnet.tsx`、`createSonnetPixiRuntime.ts`、`sonnet*` helpers。
- “字体栈 / 字重 / 颜色混合” -> `src/utils/fontStacks.ts`、`src/components/visualizer/colorMix.ts`。

## Settings / persistence / deployment

- “外观配置导入导出” -> `src/components/modal/settings/AppearanceSettingsSubview.tsx`；配置 schema 与状态 -> `src/types.ts` / `src/stores/useSettingsUiStore.ts`。
- “播放 / 通用 / 集成 / 存储 / 桌面 / 实验室设置” -> `PlaybackSettingsSubview.tsx`、`GeneralSettingsSubview.tsx`、`IntegrationSettingsSubview.tsx`、`StorageSettingsSection.tsx`、`DesktopSettingsSubview.tsx`、`LabSettingsModal.tsx`。
- “同步 / R2 / 主题 registry” -> `src/services/sync/syncCoordinator.ts`、`syncClient.ts`、`syncRepository.ts`、`settingsSnapshot.ts`、`themeSyncRegistry.ts`。
- “IndexedDB / 主题、封面、二进制缓存” -> `src/services/db.ts`、`appDatabase.ts`、`repositories/*`、`binaryAssetStore.ts`、`coverCache.ts`、`themeCache.ts`。
- “Electron 主进程 / API bridge” -> `electron/main.cjs`、`preload.cjs`、`stageApi.cjs`、`kugouApiBridge.cjs`、`updateChannels.cjs`；Web API 源码在 `api/`、`api-ts/`。
- “Sync Server” -> `sync-server/src/app.ts`（路由/协议）、`src/node.ts`、`src/cloudflare.ts`、`src/d1-emulator.ts`；Worker 包装入口是 `worker/index.ts`。
- “Docker Web stack” -> `deploy/docker/compose.yaml`、`compose.sync.yaml`、`compose.build.yaml`、`scripts/smoke-test.sh`。

## Fast lookup rules

1. 术语带“页面 / 视图 / 弹窗 / tab”时，先找 `components/app/*`，再找具体展示组件。
2. 术语带“状态 / 导航 / 偏好 / 当前模式”时，先找 `hooks/*` 和 `stores/*`。
3. 术语带“模型 / 装配 / 派生 / 入口透传”时，先找相邻 `build*.ts` / `create*.ts`。
4. 术语带“接口 / provider / 缓存 / 导入 / 播放流程”时，先找 `services/*`；在线歌曲先读 `onlineMusic/omni.ts`。
5. 术语带“类型 / 模式枚举 / 共享结构”时，先找 `types.ts`、领域类型文件和 `visualizer/definition.ts`。
6. 找到文档里的路径后先用 `git ls-files -- <path>` 验证；不存在的路径按旧文档处理，不要继续追。

## What to avoid

- 把所有首页逻辑都归到 `Home.tsx`，忽略 `buildHomeModel`、collection adapters、grid surface 和导航 store。
- 把“右侧面板”只理解成某个 panel tab，忽略 `PlayerPanel` 和 `buildPlayerPanelModel`。
- 把 Navidrome 当作 Omni provider，或让普通在线歌曲调用绕过 `omni`。
- 把 `VisualizerMode` 当成 `App.tsx` 中的 switch；当前 registry 从每个模式的 `entry.tsx` 自动发现。
- 把当前精确播放时间当 React state；连续值由 MotionValue / ref / canvas 等运行时路径处理。
