// Self-contained timer state. Deadlines, not accumulated setInterval ticks.
export const DEFAULTS = Object.freeze({label: 'WORK READ', breakLabel: 'BREAK', workMs: 3600000, breakMs: 300000, rounds: 1});
export function validSettings(s) {
  return s && typeof s.label === 'string' && s.label.length <= 32 &&
    (s.breakLabel === undefined || (typeof s.breakLabel === 'string' && s.breakLabel.length <= 32)) &&
    [s.workMs,s.breakMs].every(n => Number.isFinite(n) && n >= 1000 && n <= 10800000) && Number.isInteger(s.rounds) && s.rounds >= 1 && s.rounds <= 20;
}
export function createTimer(settings = DEFAULTS) {
  if (!validSettings(settings)) throw new Error('Invalid timer settings');
  return {settings:{...settings},phase:'work',round:1,running:false,remainingMs:settings.workMs,deadline:null};
}
export const duration = s => s.phase === 'work' ? s.settings.workMs : s.settings.breakMs;
function advance(s, boundary) {
  if (s.phase === 'work') s.phase = 'break';
  else if (s.round < s.settings.rounds) { s.phase = 'work'; s.round++; }
  else { s.phase = 'done'; s.running = false; s.remainingMs = 0; s.deadline = null; return; }
  s.remainingMs = duration(s); s.deadline = s.running ? boundary + s.remainingMs : null;
}
export function settle(s, now) {
  if (!s.running) return s;
  while (s.running && now >= s.deadline) advance(s, s.deadline);
  if (s.running) s.remainingMs = Math.max(0, s.deadline - now);
  return s;
}
export function toggle(s, now) {
  settle(s, now);
  if (s.phase === 'done') return s;
  s.running = !s.running;
  s.deadline = s.running ? now + s.remainingMs : null;
  return s;
}
export function skip(s, now) { settle(s, now); if (s.phase !== 'done') advance(s, now); return s; }
export function progress(s) { return s.phase === 'done' ? 0 : Math.min(1,Math.max(0,s.remainingMs / duration(s))); }
export function formatTime(ms) { const sec = Math.ceil(ms/1000); return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; }
export function restore(value, now) {
  try {
    const s = JSON.parse(value);
    if (!validSettings(s.settings) || !['work','break','done'].includes(s.phase) || !Number.isInteger(s.round) || s.round < 1 || s.round > s.settings.rounds || typeof s.running !== 'boolean' || !Number.isFinite(s.remainingMs) || s.remainingMs < 0 || (s.running && !Number.isFinite(s.deadline))) return createTimer();
    if (s.phase === 'done') { s.running = false; s.remainingMs = 0; s.deadline = null; }
    else if (s.remainingMs > duration(s)) return createTimer();
    return settle(s, now);
  } catch { return createTimer(); }
}
