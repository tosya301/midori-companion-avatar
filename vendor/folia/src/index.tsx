import { Buffer } from 'buffer';
import { installGlobalVisualizerFrameRateLimiter } from './utils/frameRateLimiter';
// @ts-ignore
globalThis.Buffer = Buffer;
installGlobalVisualizerFrameRateLimiter();

// [lyric-stage patch] Local-only embed bootstrap. Query values are persisted
// before the lazy app import evaluates the settings store.
const lyricStageParams = new URLSearchParams(window.location.search);
if (lyricStageParams.get('lyricStage') === '1') {
    document.documentElement.classList.add('lyric-stage-embed');
    document.body.classList.add('lyric-stage-embed');
    // The standalone app is a PWA, but Midori's iframe must never be served
    // from an older cached bundle after transparency patches change.
    if ('serviceWorker' in navigator) {
        void navigator.serviceWorker.getRegistrations().then(registrations => (
            Promise.all(registrations
                .filter(registration => registration.scope.includes('/lyrics-stage/folia/'))
                .map(registration => registration.unregister()))
        ));
    }
    const allowedVisualizers = new Set([
        'classic', 'cadenza', 'partita', 'fume',
        'claddagh', 'cappella', 'tilt', 'monet',
        'diorama', 'pendolo', 'sonnet', 'tempera',
    ]);
    const requestedVisualizer = lyricStageParams.get('visualizer');
    localStorage.setItem('enable_now_playing_stage', 'true');
    localStorage.setItem('open_player_on_launch', 'true');
    // The hub UI is Chinese; keep the embedded settings panel consistent.
    localStorage.setItem('folia_app_language', 'zh-CN');
    localStorage.setItem('i18nextLng', 'zh-CN');
    // The embed is a visual stage, not a first-run tour: mark the current
    // build's guide as seen so an upgrade never covers the lyrics.
    localStorage.setItem('folia_last_seen_guide_version', __APP_VERSION__);
    if (requestedVisualizer && allowedVisualizers.has(requestedVisualizer)) {
        localStorage.setItem('visualizer_mode', requestedVisualizer);
    }
}

void import('./bootstrap');
