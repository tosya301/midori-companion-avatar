import { SpeechEnvelope } from './companion-mouth.mjs';

export const SLEEP_AFTER_MS = 180000;
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const SPECIALS = ['round', 'round', 'smile'];

// Same cubic-bezier sampler as the accepted v4-r4 controller. The original
// keyframe data is retained; only the target geometry is E9's closedSmile.
export function smileSampler(data) {
  const a = data.mouth_paths[data.sampler_path_index ?? 1].animation_attributes;
  const values = a.values.split(';'), states = values.map(d => +(d !== values[0]));
  const times = a.keyTimes.split(';').map(Number);
  const splines = a.keySplines.split(';').map(s => s.trim().split(/[ ,]+/).map(Number));
  const duration = parseFloat(a.dur);
  const coord = (t, a, b) => 3 * (1-t) ** 2 * t * a + 3 * (1-t) * t*t * b + t**3;
  return seconds => {
    const t = ((seconds % duration) + duration) % duration / duration;
    let i = 0;
    while (i < times.length - 2 && t >= times[i+1]) i++;
    if (states[i] === states[i+1]) return states[i];
    const p = clamp((t-times[i])/(times[i+1]-times[i]));
    const [x1,y1,x2,y2] = splines[i];
    let lo=0, hi=1;
    for (let n=0;n<24;n++) { const m=(lo+hi)/2; if(coord(m,x1,x2)<p) lo=m; else hi=m; }
    return states[i] + (states[i+1]-states[i]) * coord((lo+hi)/2,y1,y2);
  };
}

/** Pure, explicitly stepped scheduler; no DOM, timers, listeners or global hooks.
 * now is monotonic milliseconds. Call activity() only for real in-page mouse input.
 * render receives one mouth command per step; eyes/wink are transition events.
 */
export class ExpressionQueue {
  constructor({ sampleSmile, clock = () => performance.now(), random = Math.random,
    render = () => {}, eyes = () => {}, wink = () => {}, transitionMs = 420,
    winkMs = 1320, winkReturnMs = 360 } = {}) {
    if (typeof sampleSmile !== 'function') throw new TypeError('sampleSmile required');
    Object.assign(this, {sampleSmile, clock, random, render, eyes, wink, transitionMs, winkMs, winkReturnMs});
    this.envelope = new SpeechEnvelope();
    this.started = false; this.disposed = false;
  }
  start(now = this.clock()) {
    if (this.started || this.disposed) return;
    this.started = true; this.last = now; this.lastActivity = now;
    this.sleepy = false; this.specialIndex = 0; this.wasAllowed = false;
    this.newRound(); this.eyes('neutral', 0);
  }
  newRound() {
    this.completedSmiles = 0; this.winkSlot = 1 + Math.min(2, Math.floor(clamp(this.random()) * 3));
    this.winkDone = false; this.phase = 'normal'; this.elapsed = 0;
    this.smileElapsed = 0; this.smileSeen = false; this.previousSmile = 0;
  }
  activity(now = this.clock()) {
    if (!this.started || this.disposed) return;
    const wake = this.sleepy || now - this.lastActivity >= SLEEP_AFTER_MS;
    this.lastActivity = now;
    if (wake) {
      this.sleepy = false; this.specialIndex = 0; this.newRound();
      this.last = now; this.wasAllowed = false; this.envelope.reset();
      // Neutral first, even if audio is still playing. Audio never calls activity.
      this.eyes('neutral', 0);
    }
  }
  beginSpecial() {
    this.phase = 'enter'; this.elapsed = 0;
    this.eyes(SPECIALS[this.specialIndex] === 'smile' ? 'smile' : 'neutral', this.transitionMs);
  }
  step({ now = this.clock(), speaking = false, idleAllowed = true, hidden = false,
    reduced = false, energy = 0, winkSettled = true, expressionSettled = true } = {}) {
    if (!this.started || this.disposed) return;
    const gap = Math.max(0, now - this.last); this.last = now;
    // Never replay unseen smiles after a throttled/frozen tab. Explicit visibility
    // handles ordinary hiding; this guard also handles a suspended main thread.
    const continuous = gap <= 250;
    const dt = continuous ? gap : 0;
    if (!this.sleepy && now - this.lastActivity >= SLEEP_AFTER_MS) {
      this.sleepy = true; this.phase = 'sleepy'; this.elapsed = 0;
      this.smileSeen = false; this.smileElapsed = 0;
      this.eyes('sleepy', reduced ? 0 : this.transitionMs);
    }
    if (reduced && !this.reduced && !this.sleepy) {
      this.newRound(); this.eyes('neutral', 0);
    }
    this.reduced = reduced;
    const allowed = idleAllowed && !speaking && !hidden && !reduced;
    const advance = allowed && this.wasAllowed && continuous;
    let normalWeight = 0;
    if (!this.sleepy) {
      if (this.phase === 'normal') {
        if (!allowed || !continuous) {
          // An interrupted smile cannot be credited later; restart authored cadence.
          this.smileElapsed = 0; this.smileSeen = false; this.previousSmile = 0;
        } else if (advance) {
          this.smileElapsed += dt;
          normalWeight = this.sampleSmile(this.smileElapsed / 1000);
          if (this.previousSmile === 0 && normalWeight > 0) this.smileSeen = true;
          if (normalWeight === 0 && this.smileSeen) {
            this.smileSeen = false; this.completedSmiles++;
            if (this.completedSmiles === this.winkSlot && !this.winkDone) {
              this.winkDone = true; this.phase = 'wink'; this.elapsed = 0; this.wink();
            } else if (this.completedSmiles === 3) this.beginSpecial();
          }
          this.previousSmile = normalWeight;
        }
      } else if (this.phase === 'wink') {
        // Eyes may finish a native wink during speech. Its mouth is masked by
        // audio, and the next queued action still requires actual idle time.
        if (!hidden && !reduced && continuous) this.elapsed += dt;
        if (allowed && this.elapsed >= this.winkMs + this.winkReturnMs && winkSettled) {
          this.elapsed = 0;
          if (this.completedSmiles === 3) this.beginSpecial();
          else this.phase = 'normal';
        }
      } else if (advance) {
        this.elapsed += dt;
        const hold = SPECIALS[this.specialIndex] === 'smile' ? 6000 : 8000;
        if (this.phase === 'enter' && this.elapsed >= this.transitionMs && expressionSettled) {
          // Do not steal any overshoot from the full plateau.
          this.phase = 'hold'; this.elapsed = 0;
        } else if (this.phase === 'hold' && this.elapsed >= hold) {
          this.phase = 'exit'; this.elapsed = 0; this.eyes('neutral', this.transitionMs);
        } else if (this.phase === 'exit' && this.elapsed >= this.transitionMs) {
          this.specialIndex = (this.specialIndex + 1) % SPECIALS.length;
          this.newRound();
        }
      } else if (!allowed && ['enter','hold'].includes(this.phase)) {
        // Full hold means full *visible idle* hold, not time spent speaking.
        this.phase = 'enter'; this.elapsed = 0;
      }
    }
    this.wasAllowed = allowed;
    let mouth;
    if (speaking && !hidden && !reduced) {
      mouth = {level: this.envelope.update(energy, dt)};
    } else {
      this.envelope.reset();
      if (reduced) mouth = {pose: 'rest', weight: 1};
      else if (this.sleepy) mouth = {pose: 'sleepySmall', weight: 1};
      else if (!allowed) mouth = {pose: 'rest', weight: 1};
      else if (this.phase === 'normal') mouth = {pose: 'closedSmile', weight: normalWeight};
      else if (this.phase === 'wink') mouth = {pose: 'closedSmile', weight:
        this.elapsed < this.winkMs ? ease(this.elapsed/180) : 1-ease((this.elapsed-this.winkMs)/280)};
      else mouth = {pose: SPECIALS[this.specialIndex] === 'smile' ? 'smileReference' : 'round',
        weight: this.phase === 'hold' ? 1 : this.phase === 'exit' ? 1-ease(this.elapsed/this.transitionMs) : ease(this.elapsed/this.transitionMs)};
    }
    const state = {phase:this.phase, sleepy:this.sleepy, completedSmiles:this.completedSmiles,
      winkSlot:this.winkSlot, winkDone:this.winkDone, special:SPECIALS[this.specialIndex],
      specialIndex:this.specialIndex, elapsed:this.elapsed, speaking, idleAllowed:allowed, reduced, mouth};
    this.render(state);
    return state;
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.envelope.reset();
  }
}

/** Tracks an audio session independently of paused: pause/wait/seek are held,
 * not idle. Terminal media events (or ended) release the session. */
export class AudioSession {
  constructor(audio) { this.audio = audio; this.pending = !audio.ended && (!audio.paused || audio.seeking || audio.currentTime > 0); this.buffering = false; this.finished = false; }
  event(name) {
    if (['ended','error','abort','emptied'].includes(name)) {
      this.pending = false; this.buffering = false; this.finished = true;
    } else if (name === 'play' || name === 'playing') {
      this.pending = true; this.finished = false; if(name === 'playing') this.buffering = false;
    } else if (name === 'waiting' || name === 'seeking') {
      if (!this.finished) { this.pending = true; this.buffering = true; }
    } else if (name === 'seeked') this.buffering = false;
  }
  state({hidden = false, contextRunning = true} = {}) {
    const a = this.audio;
    const speaking = !this.finished && !hidden && !this.buffering && !a.paused && !a.ended && !a.seeking && a.readyState >= 3 && contextRunning;
    const idleAllowed = !hidden && !a.seeking && !this.buffering && (this.finished || a.ended || (!this.pending && a.paused));
    return {speaking, idleAllowed};
  }
}
