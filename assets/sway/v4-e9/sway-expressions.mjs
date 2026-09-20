import { MouthRig } from './companion-mouth.mjs';
import { ExpressionRig } from './companion-expressions.mjs';
import { ExpressionQueue, AudioSession, smileSampler } from './expression-queue.mjs';

// Keep the packaged controllers unmodified. This rig only renders eyes; the
// scheduler is the sole mouth writer and the host adapter is the sole rAF owner.
class HostExpressionRig extends ExpressionRig {
  ensureFrame() {}
  applyMouth() {}
}
async function checked(name, json = false) {
  const response = await fetch(new URL(name, import.meta.url));
  if (!response.ok) throw new Error(`E9 asset ${name}: ${response.status}`);
  return json ? response.json() : response.text();
}

/** Prepare off-DOM; call start only after the host has won its avatar swap token.
 * Uses the host's existing audio graph. Never instantiates AudioLipSync or creates
 * a MediaElementSource/AudioContext. Idempotent start/dispose; no global API.
 */
export async function createTalkingSway({audio, readEnergy, contextRunning, boundsSrc}) {
  const [text, mouthData, expressionData, smileData] = await Promise.all([
    checked('avatar.svg'), checked('mouth-rig.json', true),
    checked('expression-rig.json', true), checked('smile-keyframes.json', true),
  ]);
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  if (doc.querySelector('parsererror') || doc.documentElement.localName !== 'svg') throw new Error('Invalid E9 SVG');
  const svg = document.importNode(doc.documentElement, true);
  svg.pauseAnimations();
  const element = document.createElement('div');
  element.id = 'avatarSwayFrame';
  element.className = 'avatar-frame avatar-sway-frame is-active';
  element.setAttribute('aria-hidden', 'true');
  element.dataset.boundsSrc = boundsSrc;
  element.append(svg);
  let started = false, disposed = false, frame = 0;
  let rig, expressions, queue, session, media, previousWeights;
  const listeners = [];
  const on = (target, name, fn) => { target.addEventListener(name, fn); listeners.push([target, name, fn]); };
  const put = (key, value) => { const s = String(value); if(svg.dataset[key] !== s) svg.dataset[key] = s; };
  function eyePreset(name, duration) {
    expressions.setExpression(name, {duration});
    if (media.matches) staticEyes();
  }
  function staticEyes() {
    const open = expressions.name === 'sleepy' ? .7 : 1;
    expressions.wink = null; expressions.transition = null;
    expressions.applyEyes({left:{open,smile:0},right:{open,smile:0}});
    expressions.publish();
  }
  function render(state) {
    const {mouth} = state;
    if ('level' in mouth) {
      rig.setLevel(mouth.level); previousWeights = null;
      put('mouthOwner', 'speech');
    } else {
      const weights = rig.poseNames.map(name => (name === 'rest' ? 1-mouth.weight : 0) + (name === mouth.pose ? mouth.weight : 0));
      if (!previousWeights || weights.some((v,i) => Math.abs(v-previousWeights[i]) > .000001)) {
        rig.cancel(); rig.lastPose = mouth.weight > 0 ? mouth.pose : 'rest'; rig.apply(weights);
        previousWeights = weights;
      }
      put('mouthOwner', state.sleepy ? 'sleepy' : state.idleAllowed ? 'idle' : 'held');
    }
    put('queuePhase', state.phase); put('completedSmiles', state.completedSmiles);
    put('winkSlot', state.winkSlot); put('winkAt', state.winkSlot); put('winkDone', state.winkDone);
    put('special', state.special); put('specialIndex', state.specialIndex); put('sleepy', state.sleepy);
    put('controllerState', state.speaking ? 'speaking' : state.sleepy ? 'sleepy' : !state.idleAllowed ? 'held'
      : state.phase === 'normal' ? 'idle' : state.phase === 'wink' ? 'wink' : state.special);
    put('reducedMotion', state.reduced);
  }
  function step(now = performance.now()) {
    if (!started || disposed) return;
    const hidden = document.hidden;
    const status = session.state({hidden, contextRunning:contextRunning()});
    if (expressions.speaking !== status.speaking) expressions.setSpeaking(status.speaking);
    // Native wink completion creates its 360ms return transition here. Queue
    // waits for that real transition, not just an estimated wall-clock deadline.
    if (!hidden) expressions.tick(now);
    queue.step({now, ...status, hidden, reduced:media.matches,
      energy:status.speaking ? readEnergy() : 0,
      winkSettled:!expressions.wink && !expressions.transition,
      expressionSettled:!expressions.transition});
  }
  function tick(now) {
    frame = 0;
    if (disposed) return;
    step(now);
    frame = requestAnimationFrame(tick);
  }
  function motion() {
    rig.reduced = media.matches; expressions.reduced = media.matches;
    previousWeights = null;
    if (media.matches) staticEyes();
    if (media.matches || document.hidden) svg.pauseAnimations(); else svg.unpauseAnimations();
    step();
  }
  function mouse(event) {
    if (!event.isTrusted || event.pointerType !== 'mouse' || document.hidden) return;
    // pointerover bubbles between children; only actual document entry counts.
    if (event.type === 'pointerover' && event.relatedTarget != null) return;
    queue.activity(performance.now());
    step();
  }
  function dispose() {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(frame); frame = 0;
    for (const [target, name, fn] of listeners) target.removeEventListener(name, fn);
    listeners.length = 0;
    queue?.dispose(); expressions?.dispose(); rig?.dispose();
    svg.pauseAnimations();
  }
  return {
    element,
    start() {
      if (started || disposed) return;
      started = true;
      try {
        media = matchMedia('(prefers-reduced-motion: reduce)');
        rig = new MouthRig(svg, mouthData);
        // Instantiation is deliberately inside start: upstream ExpressionRig
        // acquires its own media listener and temporarily detaches eye SMIL.
        expressions = new HostExpressionRig(svg, rig, expressionData, {respectReducedMotion:false});
        session = new AudioSession(audio);
        queue = new ExpressionQueue({sampleSmile:smileSampler(smileData), render,
          eyes:eyePreset, wink:() => expressions.play('wink'),
          transitionMs:expressionData.timing.transition_ms, winkMs:expressionData.timing.wink_ms});
        queue.start();
        for (const name of ['play','playing','pause','waiting','seeking','seeked','ended','error','abort','emptied']) {
          on(audio, name, () => { session.event(name); step(); });
        }
        on(document, 'pointermove', mouse); on(document, 'pointerover', mouse);
        on(document, 'visibilitychange', motion);
        on(media, 'change', motion);
        on(window, 'pagehide', event => { if (!event.persisted) dispose(); });
        motion();
        frame = requestAnimationFrame(tick);
      } catch (error) { dispose(); throw error; }
    },
    dispose,
  };
}
