import { parseLineLyrics, applyAuditionTiming, localPlaybackState } from './model.mjs';
import { createAuditionPromptMemory, isConnectedMusicState } from './prompt-memory.mjs';

const promptMemory = createAuditionPromptMemory(() => window.localStorage);
let manualOffer = false;

const asset = (name) => new URL(name, import.meta.url).href;
const audio = new Audio(new URL('../../audio/local-audition/nai-nai-ina.ogg', import.meta.url).href);
audio.id = 'localAuditionAudio';
audio.preload = 'none';
audio.volume = 0.45;
audio.hidden = true;
document.body.append(audio);
let audioObjectUrl = '';
let active = false, buffering = false, lines = [], lyricStatus = 'idle';
let generation = 0, timer = 0, lyricRequest = null, offerRequest = null, trigger = null;
const dock = document.querySelector('#midoriInputDock');
const dialog = document.createElement('dialog');
dialog.id = 'localAuditionDialog';
dialog.className = 'audition-dialog';
dialog.setAttribute('aria-labelledby', 'auditionTitle');
dialog.setAttribute('aria-describedby', 'auditionDescription');
dialog.innerHTML = `<h2 id="auditionTitle">试听音乐与歌词特效</h2>
<p id="auditionDescription">无需连接 Agent 或音乐账号，即可播放示例歌曲，体验随音乐变化的歌词特效。</p>
<div class="audition-track"><img src="${asset('cover.jpg')}" width="112" height="63" alt="ないない视频封面"><div><strong>ないない</strong><span>Ninomae Ina’nis · Cover</span></div></div>
<p class="audition-note">日文歌词采用 Ina 原视频字幕的逐句时间轴，首次载入需要联网。当前为逐句同步，非逐字跟唱。</p>
<p id="auditionDialogError" role="status" hidden></p>
<p class="audition-note">试听成功后不再自动提示。以后可从「调试信息 → 本地音乐试听」打开。</p>
<div class="audition-actions"><button type="button" id="auditionDismiss">不再提示</button><button type="button" id="auditionCancel" autofocus>暂不试听</button><button type="button" id="auditionStart" class="audition-primary">开始试听</button></div>`;
document.body.append(dialog);
const bar = document.createElement('section');
bar.id = 'localAuditionBar';
bar.className = 'audition-bar';
bar.hidden = true;
bar.setAttribute('aria-label', '本地音乐试听');
bar.innerHTML = `<div class="audition-bar-top"><div class="audition-bar-title"><strong>ないない <span>· 本地试听</span></strong><small id="auditionStatus" role="status">准备播放</small></div><button type="button" id="auditionPause" aria-label="暂停试听">暂停</button><button type="button" id="auditionStop" aria-label="停止试听">停止</button></div>
<div class="audition-progress"><span id="auditionTime">0:00</span><input id="auditionSeek" type="range" min="0" max="251" step="0.1" value="0" aria-label="试听播放进度"><span id="auditionDuration">4:11</span></div>
<div class="audition-bar-bottom"><span>歌词：Ina 字幕逐句校准</span><button type="button" id="auditionRetry" hidden>重试歌词</button><label>音量<input id="auditionVolume" type="range" min="0" max="100" value="45" aria-label="试听音量"></label></div>`;
document.body.append(bar);
const el = (id) => document.getElementById(id);
const formatTime = (seconds) => `${Math.floor(Math.max(0, seconds || 0) / 60)}:${String(Math.floor(Math.max(0, seconds || 0) % 60)).padStart(2, '0')}`;

export const isLocalAuditionActive = () => active;
export const getLocalAuditionState = () => active ? localPlaybackState(audio, lines, lyricStatus, buffering) : null;
function emit() {
  if (active) {
    el('auditionTime').textContent = formatTime(audio.currentTime);
    el('auditionDuration').textContent = formatTime(audio.duration || 250.908);
    el('auditionSeek').max = String(audio.duration || 250.908);
    el('auditionSeek').value = String(audio.currentTime);
    el('auditionPause').textContent = audio.paused ? '继续' : '暂停';
    el('auditionPause').setAttribute('aria-label', audio.paused ? '继续试听' : '暂停试听');
    el('auditionStatus').textContent = lyricStatus === 'error' ? '歌词载入失败，可重试' : lyricStatus === 'loading' ? '正在载入歌词…' : audio.paused ? '已暂停' : buffering ? '正在缓冲…' : 'Ninomae Ina’nis · Cover';
    el('auditionRetry').hidden = lyricStatus !== 'error';
  }
  window.dispatchEvent(new Event('midori:local-audition-state'));
}

function closeDialog() {
  if (dialog.open) dialog.close();
}
dialog.addEventListener('close', () => {
  if (trigger?.isConnected && dock?.dataset.context === 'spotify') trigger.focus({ preventScroll: true });
});
el('auditionCancel').addEventListener('click', closeDialog);
el('auditionDismiss').addEventListener('click', () => {
  promptMemory.dismiss();
  closeDialog();
});
// Native modal dialog owns focus trap and Escape, without touching existing scene controls.
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog();
});

export function rememberMusicConnection(state) {
  if (!isConnectedMusicState(state)) return;
  promptMemory.dismiss();
  if (!manualOffer) {
    offerRequest?.abort(); offerRequest = null;
    closeDialog();
  }
}

export async function offerLocalAudition(button, { manual = false } = {}) {
  offerRequest?.abort();
  offerRequest = null;
  manualOffer = manual;
  if (active) { bar.hidden = false; el('auditionPause').focus(); return; }
  if (dock?.dataset.context !== 'spotify') return;
  if (!manual && promptMemory.isDismissed()) return;
  const request = new AbortController();
  offerRequest = request;
  const deadline = setTimeout(() => request.abort(), 2200);
  let connected = false;
  try {
    const response = await fetch('/api/spotify/lyrics-state', { cache: 'no-store', signal: request.signal });
    const state = await response.json();
    // A paused authenticated service remains connected; do not replace its Context entry.
    connected = response.ok && isConnectedMusicState(state);
    if (connected) rememberMusicConnection(state);
  } catch { /* Offline/unsupported integrations still have a local audition entry. */ }
  finally { clearTimeout(deadline); }
  if (offerRequest !== request || dock?.dataset.context !== 'spotify') return;
  if (!manual && (connected || promptMemory.isDismissed())) { offerRequest = null; return; }
  // Cache this fixed local demo as a Blob before confirmation. This preserves
  // synchronous gesture playback and seeking on static servers without Range.
  if (!audioObjectUrl) {
    const audioDeadline = setTimeout(() => request.abort(), 12000);
    try {
      const response = await fetch(audio.src, { signal: request.signal });
      if (!response.ok) throw new Error('Local demo unavailable');
      const blob = await response.blob();
      if (offerRequest !== request || request.signal.aborted || dock?.dataset.context !== 'spotify') return;
      audioObjectUrl = URL.createObjectURL(blob);
      audio.src = audioObjectUrl;
    } catch { /* The normal audio failure UI remains available on confirmation. */ }
    finally { clearTimeout(audioDeadline); }
  }
  if (offerRequest !== request || dock?.dataset.context !== 'spotify') return;
  if (!manual && promptMemory.isDismissed()) { offerRequest = null; return; }
  offerRequest = null;
  trigger = button;
  el('auditionDialogError').hidden = true;
  if (!dialog.open) dialog.showModal();
}

async function loadLyrics(epoch) {
  lyricRequest?.abort();
  const request = new AbortController();
  lyricRequest = request;
  lyricStatus = 'loading';
  emit();
  const deadline = setTimeout(() => request.abort(), 12000);
  try {
    // Fixed public read, initiated by the user's audition/retry click. No account, proxy or credentials.
    const [response, timingResponse] = await Promise.all([
      fetch('https://lrclib.net/api/get/12910484', {
        signal: request.signal, credentials: 'omit', referrerPolicy: 'no-referrer',
      }),
      fetch(asset('ina-timing.json'), { signal: request.signal, cache: 'no-cache' }),
    ]);
    if (!response.ok || !timingResponse.ok) throw new Error('Lyrics unavailable');
    const text = await response.text();
    if (text.length > 250000) throw new Error('Lyrics response too large');
    const result = JSON.parse(text);
    if (result.id !== 12910484 || result.artistName !== 'ReoNa' || result.trackName !== 'ないない') throw new Error('Unexpected recording');
    const timing = await timingResponse.json();
    if (timing.lyricProviderId !== result.id) throw new Error('Unexpected timing source');
    const parsed = await applyAuditionTiming(parseLineLyrics(result.syncedLyrics), timing);
    if (!active || generation !== epoch || lyricRequest !== request) return;
    lines = parsed;
    lyricStatus = 'ready';
  } catch {
    if (!active || generation !== epoch || lyricRequest !== request) return;
    lyricStatus = 'error';
  } finally {
    clearTimeout(deadline);
    if (lyricRequest === request) lyricRequest = null;
    if (active && generation === epoch) emit();
  }
}

export function stopLocalAudition() {
  ++generation;
  active = false;
  buffering = false;
  clearInterval(timer); timer = 0;
  lyricRequest?.abort(); lyricRequest = null;
  audio.pause(); audio.currentTime = 0;
  bar.hidden = true;
  emit();
}

function playbackFailure(epoch) {
  if (generation !== epoch) return;
  stopLocalAudition();
  el('auditionDialogError').textContent = '音频未能播放，请检查音源或浏览器播放权限后再试。';
  el('auditionDialogError').hidden = false;
  if (dock?.dataset.context === 'spotify' && !dialog.open) dialog.showModal();
}

el('auditionStart').addEventListener('click', () => {
  if (active || dock?.dataset.context !== 'spotify') return;
  if (document.querySelector('#audio') && !document.querySelector('#audio').paused) {
    el('auditionDialogError').textContent = '请等待当前语音结束后再试听。';
    el('auditionDialogError').hidden = false;
    return;
  }
  const epoch = ++generation;
  active = true; buffering = true;
  bar.hidden = false;
  closeDialog();
  // play() runs inside the confirmation gesture, before any lyric network await.
  const play = audio.play();
  emit();
  timer = setInterval(emit, 250);
  if (!lines.length) void loadLyrics(epoch);
  else { lyricStatus = 'ready'; emit(); }
  play.catch(() => playbackFailure(epoch));
});
el('auditionPause').addEventListener('click', () => {
  if (!active) return;
  if (!audio.paused) audio.pause();
  else { const epoch = generation; audio.play().catch(() => playbackFailure(epoch)); }
});
el('auditionStop').addEventListener('click', stopLocalAudition);
el('auditionRetry').addEventListener('click', () => { if (active) void loadLyrics(generation); });
el('auditionSeek').addEventListener('input', (event) => {
  if (active && Number.isFinite(audio.duration)) { audio.currentTime = Number(event.target.value); emit(); }
});
el('auditionVolume').addEventListener('input', (event) => { audio.volume = Number(event.target.value) / 100; });
for (const type of ['timeupdate', 'pause', 'seeked', 'durationchange']) audio.addEventListener(type, () => { if (active) emit(); });
for (const type of ['waiting', 'stalled']) audio.addEventListener(type, () => { if (active) { buffering = true; emit(); } });
audio.addEventListener('playing', () => { if (active) { promptMemory.dismiss(); buffering = false; emit(); } });
audio.addEventListener('ended', stopLocalAudition);
audio.addEventListener('error', () => { if (active) playbackFailure(generation); });
// Speech retains priority; the user can explicitly restart audition afterwards.
document.querySelector('#audio')?.addEventListener('play', () => { if (active) stopLocalAudition(); });
document.querySelector('#pauseBtn')?.addEventListener('click', stopLocalAudition);
new MutationObserver(() => {
  if (dock.dataset.context === 'spotify') return;
  offerRequest?.abort(); offerRequest = null;
  closeDialog();
  if (active) stopLocalAudition();
}).observe(dock, { attributes: true, attributeFilter: ['data-context'] });
window.addEventListener('pagehide', () => { offerRequest?.abort(); offerRequest = null; closeDialog(); stopLocalAudition(); });
