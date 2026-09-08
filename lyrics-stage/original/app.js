import { resolveLyricPresentation } from './lyric-presentation.mjs';
import { planLyricRows } from './lyric-layout.mjs';

const TEMPLATES = [
  { id: 'luminous', mood: 'ATMOSPHERIC / TIDAL', a: '#72d8ff', b: '#245bff' },
  { id: 'blueprint', mood: 'GEOMETRIC / IMPACT', a: '#8ac8ff', b: '#0b3d91' },
  { id: 'cinema', mood: 'ANALOG / MELANCHOLY', a: '#e4b38b', b: '#6d233b' },
  { id: 'pixel', mood: 'KAWAII / DIGITAL', a: '#ff9fd6', b: '#7a55ff' },
  { id: 'cloud', mood: 'AIR / DIAGONAL', a: '#b5e7f2', b: '#356877' },
  { id: 'mindscape', mood: 'POSTER / INNER WORLD', a: '#f3d264', b: '#a84427' },
];
const TEMPLATE_BY_ID = new Map(TEMPLATES.map((template, index) => [template.id, { ...template, index }]));
const IDLE_STATE = {
  connection: 'offline',
  playback: { isPlaying: false, state: 'idle', positionMs: 0 },
  track: null,
  lyrics: { status: 'idle', source: 'LYRICS', lines: [] },
};
const query = new URLSearchParams(window.location.search);
const elements = {
  body: document.body,
  canvas: document.querySelector('#fxCanvas'),
  artworkField: document.querySelector('#artworkField'),
  lyricStack: document.querySelector('#lyricStack'),
  lineCounter: document.querySelector('#lineCounter'),
  templateMood: document.querySelector('#templateMood'),
  transportState: document.querySelector('#transportState'),
  progressFill: document.querySelector('#progressFill'),
  timeCurrent: document.querySelector('#timeCurrent'),
  timeDuration: document.querySelector('#timeDuration'),
};

let sourceState = IDLE_STATE;
let sourceReceivedAt = performance.now();
let sourceSampleAgeMs = 0;
let activeLineIndex = -99;
let currentTrackKey = '';
let templateIndex = 0;
let currentTemplateId = '';
let canvasWidth = 0;
let canvasHeight = 0;
let tickFrame = 0;
let effectFrame = 0;
let documentVisible = !document.hidden;
let lyricMeasurer = null;

function hashText(value) {
  let hash = 2166136261;
  for (const char of String(value || '')) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function setTemplate(templateId) {
  const entry = TEMPLATE_BY_ID.get(templateId) || TEMPLATE_BY_ID.get('luminous');
  if (entry.id === currentTemplateId) return;
  currentTemplateId = entry.id;
  templateIndex = entry.index;
  elements.body.dataset.template = entry.id;
  elements.body.style.setProperty('--accent', entry.a);
  elements.body.style.setProperty('--accent-2', entry.b);
  elements.templateMood.textContent = entry.mood;
  activeLineIndex = -99;
  elements.body.classList.remove('template-flash');
  requestAnimationFrame(() => elements.body.classList.add('template-flash'));
}

function setHostTheme(theme) {
  const hostTheme = theme === 'light' ? 'light' : 'night';
  elements.body.dataset.hostTheme = hostTheme;
  document.documentElement.dataset.hostTheme = hostTheme;
}

function playbackPosition(state) {
  const base = Number(state.playback?.positionMs) || 0;
  if (!state.playback?.isPlaying) return base;
  return Math.min(
    Number(state.track?.durationMs) || Infinity,
    base + sourceSampleAgeMs + (performance.now() - sourceReceivedAt),
  );
}

function findLineIndex(lines, positionMs) {
  let answer = -1;
  let low = 0;
  let high = lines.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (Number(lines[middle].timeMs) <= positionMs) {
      answer = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return Math.max(0, answer);
}

const CLOUD_OFFSET_SHIFT_VW = { '-1': 4, 0: 3, 1: 8 };

function ensureLyricMeasurer() {
  if (!lyricMeasurer) {
    lyricMeasurer = document.createElement('p');
    lyricMeasurer.className = 'lyric-line lyric-measure';
  }
  if (!lyricMeasurer.isConnected) elements.lyricStack.append(lyricMeasurer);
  return lyricMeasurer;
}

function buildLyricLine(text, offset) {
  const line = document.createElement('p');
  line.className = 'lyric-line';
  line.dataset.offset = String(offset);
  const stackWidth = elements.lyricStack.clientWidth;
  if (!(stackWidth > 0)) {
    line.textContent = text;
    return line;
  }

  const measurer = ensureLyricMeasurer();
  const measure = (candidate) => {
    measurer.textContent = candidate;
    return measurer.offsetWidth;
  };
  let availableWidth = stackWidth;
  const template = elements.body.dataset.template;
  if (template === 'mindscape' && offset === 0) availableWidth -= measure('『』');
  if (template === 'cloud') {
    availableWidth -= ((CLOUD_OFFSET_SHIFT_VW[offset] || 0) / 100) * window.innerWidth;
  }
  const { rows, scale } = planLyricRows({ text, availableWidth, measure });
  rows.forEach((row, rowIndex) => {
    if (rowIndex > 0) line.append(document.createElement('br'));
    const span = document.createElement('span');
    span.className = 'lyric-row';
    span.textContent = row;
    line.append(span);
  });
  if (scale < 0.999) {
    line.style.fontSize = `${parseFloat(getComputedStyle(measurer).fontSize) * scale}px`;
  }
  return line;
}

function renderLyrics(lines, index) {
  if (index === activeLineIndex) return;
  activeLineIndex = index;
  const fragments = [];
  for (let offset = -2; offset <= 2; offset += 1) {
    const line = lines[index + offset];
    if (!line) continue;
    fragments.push(buildLyricLine(String(line.text || ''), offset));
  }
  elements.lyricStack.replaceChildren(...fragments, ensureLyricMeasurer());
  elements.lineCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(lines.length).padStart(2, '0')}`;
}

function renderTrackIntro(title, artist) {
  const introKey = `track:${title}:${artist}`;
  if (activeLineIndex === introKey) return;
  activeLineIndex = introKey;
  const intro = document.createElement('p');
  intro.className = 'lyric-line track-intro';
  intro.dataset.offset = '0';
  const titleLine = document.createElement('span');
  titleLine.className = 'track-intro-title';
  titleLine.textContent = title;
  const artistLine = document.createElement('span');
  artistLine.className = 'track-intro-artist';
  artistLine.textContent = artist;
  intro.append(titleLine, artistLine);
  elements.lyricStack.replaceChildren(intro);
  elements.lineCounter.textContent = 'NOW PLAYING';
}

function formatTime(milliseconds) {
  const seconds = Math.max(0, Math.floor(Number(milliseconds || 0) / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function setArtwork(url) {
  const safeUrl = typeof url === 'string' ? url.replace(/["\\]/g, '') : '';
  if (safeUrl) {
    elements.artworkField.style.backgroundImage = `url("${safeUrl}")`;
    elements.artworkField.classList.add('has-art');
  } else {
    elements.artworkField.style.backgroundImage = '';
    elements.artworkField.classList.remove('has-art');
  }
}

function renderMetadata(state) {
  const track = state.track || {};
  const trackKey = `${track.id || ''}:${track.title || ''}:${track.artist || ''}`;
  if (trackKey !== currentTrackKey) {
    currentTrackKey = trackKey;
    activeLineIndex = -99;
    setArtwork(track.artworkUrl || '');
  }
  elements.transportState.textContent = state.playback?.isPlaying ? 'PLAY' : 'PAUSE';
  elements.timeDuration.textContent = formatTime(track.durationMs || 0);
}

function tick() {
  const state = sourceState?.connection === 'connected' && sourceState?.track ? sourceState : IDLE_STATE;
  const presentation = resolveLyricPresentation(state);
  const duration = Number(state.track?.durationMs) || 0;
  const position = playbackPosition(state);
  renderMetadata(state);
  if (presentation.kind === 'lyrics') {
    renderLyrics(presentation.lines, findLineIndex(presentation.lines, position));
  } else {
    renderTrackIntro(presentation.title, presentation.artist);
  }
  elements.progressFill.style.width = `${duration > 0 ? Math.min(100, (position / duration) * 100) : 0}%`;
  elements.timeCurrent.textContent = formatTime(position);
  tickFrame = requestAnimationFrame(tick);
}

function resizeCanvas() {
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  elements.canvas.width = Math.round(canvasWidth * ratio);
  elements.canvas.height = Math.round(canvasHeight * ratio);
  elements.canvas.style.width = `${canvasWidth}px`;
  elements.canvas.style.height = `${canvasHeight}px`;
  elements.canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawEffects(time) {
  if (!documentVisible) {
    effectFrame = 0;
    return;
  }
  const context = elements.canvas.getContext('2d');
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  const template = TEMPLATES[templateIndex];

  if (template.id === 'luminous' || template.id === 'cloud') {
    for (let index = 0; index < 5; index += 1) {
      const x = canvasWidth * (0.34 + index * 0.12) + Math.sin(time * 0.00025 + index) * 80;
      const y = canvasHeight * (0.25 + (index % 3) * 0.2) + Math.cos(time * 0.00018 + index) * 55;
      const radius = Math.min(canvasWidth, canvasHeight) * (0.16 + index * 0.02);
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `${template.a}28`);
      gradient.addColorStop(1, `${template.b}00`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  } else if (template.id === 'blueprint') {
    context.strokeStyle = `${template.a}45`;
    context.lineWidth = 1;
    const pulse = (Math.sin(time * 0.001) + 1) * 12;
    for (let index = 0; index < 5; index += 1) {
      context.beginPath();
      context.arc(canvasWidth * 0.68, canvasHeight * 0.46, 70 + index * 46 + pulse, 0, Math.PI * 2);
      context.stroke();
    }
    context.fillStyle = `${template.a}aa`;
    for (let index = 0; index < 18; index += 1) {
      const x = (hashText(`x${index}`) % canvasWidth + time * 0.04 * (index % 3 + 1)) % canvasWidth;
      const y = hashText(`y${index}`) % canvasHeight;
      context.fillRect(x, y, index % 4 === 0 ? 90 : 3, 1);
    }
  } else if (template.id === 'cinema') {
    const gradient = context.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#6d233b36');
    gradient.addColorStop(0.48, '#120d1000');
    gradient.addColorStop(1, '#2f607532');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = 'rgba(255,255,255,.045)';
    for (let index = 0; index < 180; index += 1) {
      context.fillRect(Math.random() * canvasWidth, Math.random() * canvasHeight, 1, 1);
    }
  } else if (template.id === 'pixel') {
    for (let index = 0; index < 24; index += 1) {
      const size = 8 + (index % 4) * 8;
      const x = (hashText(`px${index}`) % canvasWidth + Math.floor(time / 180) * (index % 2 ? 8 : -8)) % canvasWidth;
      const y = hashText(`py${index}`) % canvasHeight;
      context.fillStyle = index % 2 ? `${template.a}32` : `${template.b}38`;
      context.fillRect(x, y, size, size);
    }
  } else {
    context.strokeStyle = `${template.a}30`;
    context.lineWidth = 1;
    for (let index = -4; index < 12; index += 1) {
      const shift = Math.sin(time * 0.0004 + index) * 22;
      context.beginPath();
      context.moveTo(index * canvasWidth / 8 + shift, canvasHeight);
      context.lineTo(index * canvasWidth / 8 + canvasWidth * 0.32 + shift, 0);
      context.stroke();
    }
  }
  effectFrame = requestAnimationFrame(drawEffects);
}

function acceptParentState(event) {
  if (event.source !== window.parent || event.origin !== window.location.origin) return;
  if (event.data?.type !== 'midori-lyrics-state' || !event.data.state) return;
  const nextState = event.data.state;
  const playback = nextState.playback;
  const previousPlayback = sourceState.playback;
  const samePlaybackSample = nextState.track?.id === sourceState.track?.id
    && nextState.track?.title === sourceState.track?.title
    && nextState.track?.artist === sourceState.track?.artist
    && playback?.sampledAtMs === previousPlayback?.sampledAtMs
    && playback?.positionMs === previousPlayback?.positionMs
    && Boolean(playback?.isPlaying) === Boolean(previousPlayback?.isPlaying);
  // Theme/ready reposts may carry the same snapshot: keep its running clock.
  if (!samePlaybackSample) {
    sourceReceivedAt = performance.now();
    const sampledAtMs = Number(playback?.sampledAtMs);
    const sampleAgeMs = Date.now() - sampledAtMs;
    const durationMs = Number(nextState.track?.durationMs);
    // Add snapshot age once, then advance with the monotonic clock above.
    // Missing, future, or older-than-a-song timestamps use receipt time instead.
    sourceSampleAgeMs = playback?.isPlaying
      && Number.isFinite(sampledAtMs) && sampledAtMs > 0
      && Number.isFinite(durationMs) && durationMs > 0
      && sampleAgeMs >= 0 && sampleAgeMs <= durationMs
      ? sampleAgeMs : 0;
  }
  sourceState = nextState;
  if (typeof event.data.mode === 'string') setTemplate(event.data.mode);
  setHostTheme(event.data.theme);
}

window.addEventListener('message', acceptParentState);
window.addEventListener('resize', () => {
  resizeCanvas();
  window.clearTimeout(window.__midoriLyricRefitTimer);
  window.__midoriLyricRefitTimer = window.setTimeout(() => { activeLineIndex = -99; }, 160);
}, { passive: true });
document.addEventListener('visibilitychange', () => {
  documentVisible = !document.hidden;
  if (documentVisible && !effectFrame) effectFrame = requestAnimationFrame(drawEffects);
});
window.addEventListener('beforeunload', () => {
  cancelAnimationFrame(tickFrame);
  cancelAnimationFrame(effectFrame);
});

setTemplate(query.get('mode') || 'luminous');
setHostTheme(query.get('theme') || 'night');
resizeCanvas();
effectFrame = requestAnimationFrame(drawEffects);
tickFrame = requestAnimationFrame(tick);
window.parent.postMessage({ type: 'midori-lyrics-ready', engine: 'original' }, window.location.origin);
