import { isLocalAuditionActive, getLocalAuditionState, rememberMusicConnection } from './assets/local-audition/player.js';

export const SPOTIFY_LYRIC_MODES = Object.freeze([
  { engine: 'original', mode: 'luminous' },
  { engine: 'original', mode: 'blueprint' },
  { engine: 'original', mode: 'cinema' },
  { engine: 'original', mode: 'pixel' },
  { engine: 'original', mode: 'cloud' },
  { engine: 'original', mode: 'mindscape' },
  { engine: 'folia', mode: 'classic' },
  { engine: 'folia', mode: 'cadenza' },
  { engine: 'folia', mode: 'partita' },
  { engine: 'folia', mode: 'tilt' },
  { engine: 'folia', mode: 'fume' },
  { engine: 'folia', mode: 'monet' },
  { engine: 'folia', mode: 'claddagh' },
  { engine: 'folia', mode: 'pendolo' },
  { engine: 'folia', mode: 'diorama' },
  { engine: 'folia', mode: 'sonnet' },
  { engine: 'folia', mode: 'cappella' },
  { engine: 'folia', mode: 'tempera' },
]);

// New full-scene mode is opt-in; preserve the existing per-track automatic selection.
const AUTOMATIC_LYRIC_MODES = SPOTIFY_LYRIC_MODES.filter(({ mode }) => mode !== 'tempera');

const POLL_PLAYING_MS = 5_000;
const POLL_NEAR_END_MS = 1_500;
const POLL_PAUSED_MS = 15_000;
const POLL_IDLE_MS = 30_000;
const LYRICS_REQUEST_TIMEOUT_MS = 10_000;
const FRAME_UNLOAD_DELAY_MS = 30_000;
const TRACK_TRANSITION_GRACE_MS = 2_500;
const TRACK_TRANSITION_POLL_MS = 500;
let emptyPlaybackSince = null;
const query = new URLSearchParams(window.location.search);
const fixtureEnabled = query.get('lyricsFixture') === '1';
const layer = document.querySelector('#spotifyLyricsLayer');
const frame = document.querySelector('#spotifyLyricsFrame');
const contextDock = document.querySelector('#midoriInputDock');
const stageMenu = document.querySelector('#spotifyLyricsMenu');
const stageMenuToggle = document.querySelector('#spotifyLyricsMenuToggle');
const stageMenuPanel = document.querySelector('#spotifyLyricsMenuPanel');
const stageMenuModes = document.querySelector('#spotifyLyricsMenuModes');
const stageMenuCurrent = document.querySelector('#spotifyLyricsMenuCurrent');
const MODE_STORAGE_KEY = 'midori.spotifyLyrics.mode';
const foliaServiceWorkerReset = 'serviceWorker' in navigator
  ? navigator.serviceWorker.getRegistrations().then((registrations) => Promise.all(
    registrations
      .filter((registration) => registration.scope.includes('/lyrics-stage/folia/'))
      .map((registration) => registration.unregister()),
  )).catch(() => [])
  : Promise.resolve([]);

function readStoredMode() {
  try {
    return window.localStorage.getItem(MODE_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function storeMode(modeKey) {
  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, modeKey);
  } catch {
    // Storage can be unavailable in privacy/capture contexts; the live selection still works.
  }
}

let pollTimer = 0;
let unloadTimer = 0;
let requestInFlight = false;
let lyricsRequest = null;
let frameReady = false;
let frameKey = '';
let currentState = null;
let currentMode = null;
let requestedMode = query.get('lyricsMode') || readStoredMode();

function hashText(value) {
  let hash = 2166136261;
  for (const char of String(value || '')) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function chooseSpotifyLyricMode(track, requestedMode = '') {
  const exact = SPOTIFY_LYRIC_MODES.find(({ engine, mode }) => `${engine}:${mode}` === requestedMode);
  if (exact) return exact;
  const shorthand = SPOTIFY_LYRIC_MODES.find(({ mode }) => mode === requestedMode);
  if (shorthand) return shorthand;
  const identity = [track?.id, track?.title, track?.artist, track?.durationMs].filter(Boolean).join('|');
  return AUTOMATIC_LYRIC_MODES[hashText(identity || 'midori') % AUTOMATIC_LYRIC_MODES.length];
}

function formatLrcTimestamp(timeMs) {
  const safeTime = Math.max(0, Math.floor(Number(timeMs) || 0));
  const minutes = Math.floor(safeTime / 60_000);
  const seconds = Math.floor((safeTime % 60_000) / 1_000);
  const centiseconds = Math.floor((safeTime % 1_000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

export function lyricLinesToLrc(lines) {
  return (Array.isArray(lines) ? lines : [])
    .filter((line) => line && String(line.text || '').trim())
    .map((line) => `[${formatLrcTimestamp(line.timeMs)}]${String(line.text).trim()}`)
    .join('\n');
}

export function stateToFoliaEvents(state) {
  const track = state?.track;
  const playback = state?.playback || {};
  const lines = state?.lyrics?.lines || [];
  const lrc = lyricLinesToLrc(lines);
  const karaokeLyric = String(state?.lyrics?.karaokeLyric || '');
  if (!track) {
    return [
      { event: 'Track', data: {} },
      { event: 'Lyric', data: {} },
      { event: 'PlayerPauseState', data: { hasSong: false, isPaused: true, seekbarCurrentPosition: 0 } },
      { event: 'PlayerProgress', data: { progress: 0 } },
    ];
  }
  const sampledAtMs = Math.max(0, Number(playback.sampledAtMs) || 0);
  const sampleAgeMs = playback.isPlaying && sampledAtMs
    ? Math.max(0, Date.now() - sampledAtMs)
    : 0;
  const durationMs = Math.max(0, Number(track.durationMs) || 0);
  const progressMs = Math.min(
    durationMs || Number.POSITIVE_INFINITY,
    Math.max(0, Number(playback.positionMs) || 0) + sampleAgeMs,
  );
  return [
    {
      event: 'Track',
      data: {
        id: track.id,
        title: track.title,
        author: track.artist,
        album: track.album,
        cover: track.artworkUrl,
        duration: Math.max(0, Number(track.durationMs) || 0) / 1000,
      },
    },
    {
      event: 'Lyric',
      data: {
        source: state?.lyrics?.source || 'lrclib',
        title: track.title,
        author: track.artist,
        duration: Math.max(0, Number(track.durationMs) || 0) / 1000,
        hasLyric: Boolean(lrc),
        hasTranslatedLyric: false,
        hasKaraokeLyric: Boolean(karaokeLyric.trim()),
        lrc,
        translatedLyric: '',
        karaokeLyric,
      },
    },
    {
      event: 'PlayerPauseState',
      data: {
        hasSong: true,
        isPaused: !playback.isPlaying,
        seekbarCurrentPosition: progressMs,
      },
    },
    {
      event: 'PlayerProgress',
      data: { progress: progressMs },
    },
  ];
}

export function spotifyLyricsPollInterval(state) {
  if (!state?.track) return POLL_IDLE_MS;
  if (!state?.playback?.isPlaying) return POLL_PAUSED_MS;
  const remaining = Math.max(
    0,
    (Number(state.track.durationMs) || 0) - (Number(state.playback.positionMs) || 0),
  );
  return remaining > 0 && remaining < 12_000 ? POLL_NEAR_END_MS : POLL_PLAYING_MS;
}

function fixtureState() {
  const fixedPosition = query.has('lyricsFixturePosition')
    ? Number(query.get('lyricsFixturePosition'))
    : Number.NaN;
  const nowPosition = Number.isFinite(fixedPosition) && fixedPosition >= 0
    ? fixedPosition
    : 1_000 + (Date.now() % 48_000);
  const fixtureLines = [
    '月光把夜色写成一封信',
    '漂浮的星星慢慢靠近',
    'We keep a little world awake',
    '在安静的房间听见潮汐',
    '風の向こうで名前を呼ぶ',
    '每一次呼吸都有光经过',
    'Hold on to this gentle orbit',
    '让歌词落在阿绿身后的天空',
    '透明的云穿过时间',
    'ここにいるよ まだ歌ってる',
    'Tonight the whole room learns to glow',
    '然后我们继续下一场冒险',
  ].map((text, index) => ({ timeMs: index * 4_000, text }));
  return {
    ok: true,
    connection: 'connected',
    playback: {
      isPlaying: true,
      state: 'playing',
      positionMs: Math.min(nowPosition, 47_500),
      sampledAtMs: Date.now(),
    },
    track: {
      id: 'midori-lyrics-fixture',
      type: 'track',
      title: 'Moonlit Companion',
      artist: 'Midori & Tim',
      album: 'Local Lyric Stage',
      durationMs: 52_000,
      artworkUrl: '',
    },
    lyrics: { status: 'ready', source: 'original-demo', lines: fixtureLines },
  };
}

function hasSpotifyContext() {
  return fixtureEnabled || contextDock?.dataset.context === 'spotify';
}

function currentTheme() {
  return document.documentElement.dataset.theme === 'night' ? 'night' : 'light';
}

function stageShouldBeActive(state) {
  return Boolean(hasSpotifyContext() && state?.track && state?.playback?.isPlaying);
}

function modeKey(mode) {
  return mode ? `${mode.engine}:${mode.mode}` : '';
}

function closeStageMenu({ restoreFocus = false } = {}) {
  if (!stageMenu || !stageMenuToggle || !stageMenuPanel) return;
  stageMenu.dataset.open = 'false';
  stageMenuToggle.setAttribute('aria-expanded', 'false');
  stageMenuPanel.hidden = true;
  if (restoreFocus) stageMenuToggle.focus();
}

function updateStageMenuSelection() {
  if (stageMenuCurrent && currentMode) {
    stageMenuCurrent.textContent = `${currentMode.engine.toUpperCase()} · ${currentMode.mode.toUpperCase()}`;
  }
  stageMenuModes?.querySelectorAll('.spotify-lyrics-menu-mode').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.modeKey === modeKey(currentMode)));
  });
}

function selectStageMode(nextModeKey) {
  const mode = chooseSpotifyLyricMode(null, nextModeKey);
  if (!mode) return;
  requestedMode = modeKey(mode);
  storeMode(requestedMode);
  closeStageMenu({ restoreFocus: true });
  if (currentState?.track) ensureSpotifyLyricsFrame(currentState, { forceMode: mode });
}

function buildStageMenu() {
  if (!stageMenuModes) return;
  const groups = ['original', 'folia'].map((engine) => {
    const section = document.createElement('section');
    section.className = 'spotify-lyrics-menu-group';
    const heading = document.createElement('h2');
    heading.className = 'spotify-lyrics-menu-heading';
    heading.textContent = engine.toUpperCase();
    const grid = document.createElement('div');
    grid.className = 'spotify-lyrics-menu-grid';
    SPOTIFY_LYRIC_MODES.filter((mode) => mode.engine === engine).forEach((mode) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'spotify-lyrics-menu-mode';
      button.dataset.modeKey = modeKey(mode);
      button.setAttribute('aria-pressed', 'false');
      button.textContent = mode.mode;
      button.addEventListener('click', () => selectStageMode(button.dataset.modeKey));
      grid.append(button);
    });
    section.append(heading, grid);
    return section;
  });
  stageMenuModes.replaceChildren(...groups);
}

function setLayerActive(active, state = currentState) {
  if (!layer) return;
  const isActive = Boolean(active);
  layer.dataset.active = String(isActive);
  layer.dataset.contextActive = String(hasSpotifyContext());
  layer.dataset.lyricsStatus = String(state?.lyrics?.status || 'idle');
  layer.setAttribute('aria-hidden', 'true');
  if (stageMenu) {
    stageMenu.hidden = false;
    stageMenu.dataset.active = String(isActive);
    stageMenu.setAttribute('aria-hidden', String(!isActive));
    if (!isActive) closeStageMenu();
  }
  if (isActive) {
    window.clearTimeout(unloadTimer);
    unloadTimer = 0;
  } else if (frameKey && !unloadTimer) {
    unloadTimer = window.setTimeout(unloadSpotifyLyricsFrame, FRAME_UNLOAD_DELAY_MS);
  }
}

function unloadSpotifyLyricsFrame() {
  unloadTimer = 0;
  if (stageShouldBeActive(currentState) || !frame) return;
  frame.src = 'about:blank';
  frameReady = false;
  frameKey = '';
  currentMode = null;
  if (layer) {
    layer.dataset.engine = '';
    layer.dataset.mode = '';
  }
}

function frameUrlFor(mode) {
  const theme = currentTheme();
  if (mode.engine === 'original') {
    return `./lyrics-stage/original/index.html?mode=${encodeURIComponent(mode.mode)}&theme=${theme}`;
  }
  return `./lyrics-stage/folia/index.html?lyricStage=1&visualizer=${encodeURIComponent(mode.mode)}${isLocalAuditionActive() ? '&localAudition=1' : ''}`;
}

function postStateToFrame() {
  if (!frameReady || !frame?.contentWindow || !currentState || !currentMode) return;
  if (currentMode.engine === 'original') {
    frame.contentWindow.postMessage(
      {
        type: 'midori-lyrics-state',
        state: currentState,
        mode: currentMode.mode,
        theme: currentTheme(),
      },
      window.location.origin,
    );
    return;
  }
  frame.contentWindow.postMessage(
    { type: 'midori-lyrics-events', events: stateToFoliaEvents(currentState) },
    window.location.origin,
  );
}

function ensureSpotifyLyricsFrame(state, { forceMode = null } = {}) {
  if (!frame || !layer || !state?.track) return;
  const mode = forceMode || chooseSpotifyLyricMode(state.track, requestedMode);
  const nextFrameKey = `${mode.engine}:${mode.mode}${isLocalAuditionActive() ? ':local-audition' : ''}`;
  currentMode = mode;
  updateStageMenuSelection();
  layer.dataset.engine = mode.engine;
  layer.dataset.mode = mode.mode;
  layer.dataset.track = String(state.track.id || state.track.title || '');
  if (nextFrameKey !== frameKey) {
    frameKey = nextFrameKey;
    frameReady = false;
    const nextFrameUrl = frameUrlFor(mode);
    if (mode.engine === 'folia') {
      frame.src = 'about:blank';
      void foliaServiceWorkerReset.then(() => {
        if (frameKey === nextFrameKey) frame.src = nextFrameUrl;
      });
    } else {
      frame.src = nextFrameUrl;
    }
  } else {
    postStateToFrame();
  }
}

function acceptLyricFrameMessage(event) {
  if (event.source !== frame?.contentWindow || event.origin !== window.location.origin) return;
  if (event.data?.type !== 'midori-lyrics-ready') return;
  if (event.data.engine !== currentMode?.engine) return;
  frameReady = true;
  postStateToFrame();
}

function applySpotifyLyricsState(state) {
  // Connect can briefly return a successful empty snapshot between tracks.
  // Hold the existing frame for a bounded recheck, not for pauses/errors/offline.
  const transientEmpty = hasSpotifyContext() && state?.connection === 'connected'
    && !state.track && stageShouldBeActive(currentState);
  if (transientEmpty) {
    const now = performance.now();
    if (emptyPlaybackSince === null) emptyPlaybackSince = now;
    if (now - emptyPlaybackSince < TRACK_TRANSITION_GRACE_MS) return;
  }
  emptyPlaybackSince = null;
  currentState = state;
  const active = stageShouldBeActive(state);
  if (active) ensureSpotifyLyricsFrame(state);
  else postStateToFrame();
  setLayerActive(active, state);
}

function scheduleSpotifyLyricsPoll(delay) {
  window.clearTimeout(pollTimer);
  pollTimer = window.setTimeout(pollSpotifyLyricsState, Math.max(250, delay));
}

async function pollSpotifyLyricsState() {
  window.clearTimeout(pollTimer);
  pollTimer = 0;
  if (isLocalAuditionActive()) {
    cancelSpotifyLyricsRequest();
    applySpotifyLyricsState(getLocalAuditionState());
    return;
  }
  if (!hasSpotifyContext()) {
    cancelSpotifyLyricsRequest();
    applySpotifyLyricsState(null);
    return;
  }
  if (requestInFlight) return;
  requestInFlight = true;
  const request = { controller: new AbortController(), timer: 0 };
  lyricsRequest = request;
  const { signal } = request.controller;
  let abort;
  const aborted = new Promise((_, reject) => {
    abort = () => reject(new DOMException('Lyrics request aborted', 'AbortError'));
    signal.addEventListener('abort', abort, { once: true });
  });
  request.timer = window.setTimeout(() => request.controller.abort(), LYRICS_REQUEST_TIMEOUT_MS);
  let delay = POLL_IDLE_MS;
  try {
    const pending = fixtureEnabled
      ? fixtureState()
      : fetch('/api/spotify/lyrics-state', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal,
      }).then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.ok) throw new Error('Spotify lyric state unavailable');
        return payload;
      });
    const state = await Promise.race([pending, aborted]);
    if (lyricsRequest !== request || signal.aborted || !hasSpotifyContext()) return;
    if (!fixtureEnabled) rememberMusicConnection(state);
    applySpotifyLyricsState(state);
    delay = emptyPlaybackSince !== null ? TRACK_TRANSITION_POLL_MS
      : fixtureEnabled ? 1_000 : spotifyLyricsPollInterval(state);
  } catch {
    if (lyricsRequest !== request || !hasSpotifyContext()) return;
    applySpotifyLyricsState({
      connection: 'error',
      playback: { isPlaying: false, state: 'error', positionMs: 0 },
      track: null,
      lyrics: { status: 'error', source: 'LRCLIB', lines: [] },
    });
  } finally {
    window.clearTimeout(request.timer);
    signal.removeEventListener('abort', abort);
    if (lyricsRequest === request) {
      lyricsRequest = null;
      requestInFlight = false;
      if (hasSpotifyContext()) scheduleSpotifyLyricsPoll(delay);
    }
  }
}

function cancelSpotifyLyricsRequest() {
  if (!lyricsRequest) return;
  const request = lyricsRequest;
  lyricsRequest = null;
  requestInFlight = false;
  window.clearTimeout(request.timer);
  request.controller.abort();
}

export function wakeSpotifyLyricsStage() {
  window.clearTimeout(pollTimer);
  pollTimer = 0;
  if (isLocalAuditionActive()) {
    cancelSpotifyLyricsRequest();
    applySpotifyLyricsState(getLocalAuditionState());
    return;
  }
  // End/stop must clear local ownership immediately, not wait for the next remote poll.
  if (currentState?.source === 'local-audition') applySpotifyLyricsState(null);
  if (hasSpotifyContext()) void pollSpotifyLyricsState();
  else {
    cancelSpotifyLyricsRequest();
    applySpotifyLyricsState(null);
  }
}

function setupSpotifyLyricsStage() {
  if (!layer || !frame || !contextDock) return;
  buildStageMenu();
  stageMenuToggle?.addEventListener('click', () => {
    if (stageMenu?.dataset.active !== 'true' || !stageMenuPanel) return;
    const nextOpen = stageMenu.dataset.open !== 'true';
    stageMenu.dataset.open = String(nextOpen);
    stageMenuToggle.setAttribute('aria-expanded', String(nextOpen));
    stageMenuPanel.hidden = !nextOpen;
  });
  document.addEventListener('pointerdown', (event) => {
    if (stageMenu?.dataset.open === 'true' && !stageMenu.contains(event.target)) closeStageMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && stageMenu?.dataset.open === 'true') {
      event.preventDefault();
      closeStageMenu({ restoreFocus: true });
    }
  });
  frame.addEventListener('load', () => {
    if (frame.src === 'about:blank') return;
    window.setTimeout(postStateToFrame, 80);
  });
  window.addEventListener('message', acceptLyricFrameMessage);
  window.addEventListener('midori:spotify-control', wakeSpotifyLyricsStage);
  window.addEventListener('midori:local-audition-state', wakeSpotifyLyricsStage);
  new MutationObserver(wakeSpotifyLyricsStage).observe(contextDock, {
    attributes: true,
    attributeFilter: ['data-context'],
  });
  new MutationObserver(() => {
    if (currentMode?.engine === 'original' && currentState) postStateToFrame();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) wakeSpotifyLyricsStage();
  });
  window.addEventListener('beforeunload', () => {
    cancelSpotifyLyricsRequest();
    window.clearTimeout(pollTimer);
    window.clearTimeout(unloadTimer);
  });
  window.__midoriSpotifyLyricsDebug = {
    modes: SPOTIFY_LYRIC_MODES,
    wake: wakeSpotifyLyricsStage,
    selectMode: selectStageMode,
    snapshot: () => ({ state: currentState, mode: currentMode, frameReady, frameKey }),
  };
  wakeSpotifyLyricsStage();
}

setupSpotifyLyricsStage();
