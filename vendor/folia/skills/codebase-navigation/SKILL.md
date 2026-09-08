---
name: codebase-navigation
description: Use when the repository area is unfamiliar, the user describes a feature or UI term without a file path, or you need the fastest current code location for app composition, home/library surfaces, playback, online providers, lyrics, visualizers, settings, Stage, OBS, remote control, sync, API, or deployment work.
---

# Codebase Navigation

用这份地图先定位，再读取实现。不要因为 `src/App.tsx` 是总入口就先通读它，也不要把旧 README 中的路径当成事实；先看表中的入口文件，再沿 import/call chain 追一层。

## Fast lookup

| 需求 / 术语 | 第一入口 | 下一层 |
| --- | --- | --- |
| 应用总装配、当前歌曲、主队列、播放协调 | `src/App.tsx` | `src/components/app/AppShell.tsx`、`components/app/{Home,PlayerPanel}.tsx`、`components/app/{overlays,dialogs}/*`、`hooks/usePlayback*.ts` |
| 首页、网格、集合导航 | `src/components/app/Home.tsx` | `components/app/home/buildHomeModel.ts`、`GridViewOverlayHost.tsx`、`src/Grid3D.tsx`、`src/GridView.tsx`、`src/components/folia-grid/*` |
| 首页 tab / 搜索词 / 搜索来源 / 集合栈 | `src/stores/useSearchNavigationStore.ts`、`src/stores/useCollectionNavigationStore.ts` | `src/hooks/useAppNavigation.ts`、`components/app/search/*`、`components/app/home/gridViewCollectionAdapters.ts` |
| 本地库扫描、索引、播放 | `src/hooks/useLocalLibraryCatalog.ts` | `src/services/localLibraryCatalogService.ts`、`localLibraryCatalogInternals.ts`、`localMusicService.ts`、`src/utils/localLibraryIndex.ts` |
| 本地库实体/文件夹匹配编辑 | `src/components/local-library-entity/entityEditorModel.ts` | `src/components/local-library-entity/*`、`src/services/localLibraryEntity*.ts` |
| 在线搜索、歌词、音频、歌单、账户、provider 路由 | `src/services/onlineMusic/omni.ts` | `src/types/onlineMusic.ts`、`providerRegistry.ts`、`*Provider.ts`、`*Transport.ts`、`useOnlineProvider*` |
| 播放源、队列、预取、恢复 | `src/hooks/usePlaybackQueueController.ts` / `usePlaybackTransportController.ts` | `src/services/playbackAdapters.ts`、`onlinePlayback.ts`、`prefetchService.ts`、`components/app/playback/*` |
| 歌词解析、行/词时序、CJK / grapheme | `src/utils/lyrics/parserCore.ts` | `src/utils/lyrics/{renderHints,cjkSemanticLayout,graphemeTiming}.ts`、`src/workers/*` |
| 可视化统一入口 | `src/components/visualizer/VisualizerRenderer.tsx` | `definition.ts`、`registry.tsx`、`tuningRegistry.ts`、`runtime.ts`、`VisualizerShell.tsx` |
| 某个 visualizer 模式 | `src/components/visualizer/<mode>/entry.tsx` | 同目录 `Visualizer*.tsx`、`tuning.ts` / `*SettingsPanel.tsx`；模式清单见下文 |
| 设置、视觉配置导入导出 | `src/components/modal/SettingsModal.tsx` | `src/components/modal/settings/*`、`src/stores/useSettingsUiStore.ts`、`AppearanceSettingsSubview.tsx` |
| 命令面板、快捷动作 | `src/components/command-palette/commandRegistry.ts` | `types.ts`、`CommandPalette.tsx`、`src/i18n/locales/{en,zh-CN}.ts` |
| Stage API / 外部播放器控制 | `src/hooks/useStagePlaybackController.ts` | `electron/stageApi.cjs`、`src/types/playerCap.ts`、`src/services/playerCapProvider.ts`、`src/utils/appStageHelpers.ts`、`src/utils/stageClientDemo.ts`、`src/utils/stagePlayerSnapshot.ts` |
| OBS 浏览器源 / Now Playing / PlayerCap | `src/components/obs/*` | `src/hooks/useObsBrowserSourcePublisher.ts`、`usePlayerCapSource.ts`、`src/services/nowPlayingProvider.ts`、`src/types/obsBrowserSource.ts` |
| Remote 控制、远程歌词、视频导出 | `src/components/remote/*` | `src/types/remoteControl.ts`、`src/hooks/useElectronVideoExportController.ts`、`src/services/electronVideoExport.ts` |
| IndexedDB、主题/歌曲缓存 | `src/services/db.ts` / `appDatabase.ts` | `repositories/*`、`binaryAssetStore.ts`、`coverCache.ts`、`themeCache.ts` |
| R2/同步客户端 | `src/services/sync/syncCoordinator.ts` | `syncClient.ts`、`syncRepository.ts`、`sync/settingsSnapshot.ts`、`themeSyncRegistry.ts` |
| 服务端同步 API | `sync-server/src/app.ts` | `src/node.ts`、`src/cloudflare.ts`、`src/d1-emulator.ts`、`worker/index.ts` |
| Vercel / 音乐 API bridge / Electron | `api/`、`api-ts/`、`electron/main.cjs` | `electron/{preload,stageApi,kugouApiBridge}.cjs`、`shared/*`、`deploy/docker/*` |

## Current mode and surface names

Visualizer mode directories are `classic`, `cadenza`, `partita`, `fume`, `cappella`, `tilt`, `claddagh`, `monet`, `diorama`, `pendolo`, and `sonnet`. The registry discovers `*/entry.tsx`; do not add a mode by editing a hard-coded switch in `App.tsx`.

Background entries are `common`, `latent`, `monet`, `nomand`, `sora`, and `url` under `src/components/visualizer/backgrounds/`.

Home local/Navi surfaces are `src/components/app/home/LocalGrid3DView.tsx` and `NavidromeGrid3DView.tsx`. The old paths `src/components/LocalMusicView.tsx`, `src/components/local/LocalPlaylistView.tsx`, and `src/components/navidrome/*` are not current entry points.

The app-level overlay/dialog/player boundaries are:

- `AppOverlays` + `buildAppOverlaysModel`
- `AppDialogs` + `buildAppDialogsModel` / `buildSettingsDialogModel`
- `PlayerPanel` + `buildPlayerPanelModel`
- `Home` + `buildHomeModel`

## Search protocol

1. Start with tracked paths: `git ls-files src sync-server electron api api-ts worker deploy`.
2. Search exact symbols in the first-entry files: `rg -n "symbol|term" <small-file-set>`.
3. Follow imports to one adjacent layer; prefer `build*.ts`, `create*.ts`, hooks, stores, services, and shared types over broad directory reads.
4. Before editing a path found in a document, verify it exists with `git ls-files -- <path>`.
5. For online-song work, read `skills/online-song-omni-routing/SKILL.md`; for spoken UI/state terms, read `skills/glossary-alignment/SKILL.md`.

## Boundaries

- UI structure belongs in `components`; React lifecycle and effects in `hooks`; cross-component state in `stores`; IO/cache/provider work in `services`; pure transforms in `utils`; contracts in `types`.
- Ordinary online-song callers use `src/services/onlineMusic/omni.ts`; provider adapters and transports are implementation boundaries.
- Visualizers consume parsed `LyricData`/`Line`/`Word`; format parsing stays in `src/utils/lyrics` and workers.
- `src/App.tsx` remains a legacy orchestration seam and is already large. New behavior should normally be assembled through adjacent `components/app/*`, hooks, stores, and services.

## Validation

For documentation-only changes, validate paths, symbols, package scripts, and config values with tracked-file searches. For code changes, load `testing-strategy` and run only the focused validation it selects.
