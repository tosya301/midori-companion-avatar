import { MouthController, SvgMouthRenderer, smileSampler } from './mouth-controller.mjs?v=stable-owner-2';

async function checked(base, name, json = false) {
  const response = await fetch(new URL(name, base));
  if (!response.ok) throw new Error(`Sway asset ${name}: ${response.status}`);
  return json ? response.json() : response.text();
}

// Prepare off-DOM. Audio listeners/rAF only start after the host wins its swap token.
// The host owns the audio element and graph; this adapter never creates a source.
export async function createTalkingSway({ audio, readEnergy, contextRunning, boundsSrc,
  assetBase = new URL('./', import.meta.url), rendererOptions, idleExpression }) {
  const base = new URL(assetBase, document.baseURI);
  const [text, data, smile, { MouthRig }] = await Promise.all([
    checked(base, 'combined.svg'), checked(base, 'mouth-rig.json', true), checked(base, 'smile-keyframes.json', true),
    import(new URL('companion-mouth.mjs?v=r5-lil-1', base).href),
  ]);
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  if (doc.querySelector('parsererror') || doc.documentElement.localName !== 'svg') throw new Error('Invalid sway SVG');
  // Only the locally distributed, reviewed asset is loaded here (no user URL input).
  const svg = document.importNode(doc.documentElement, true);
  const element = document.createElement('div');
  element.id = 'avatarSwayFrame';
  element.className = 'avatar-frame avatar-sway-frame is-active';
  element.setAttribute('aria-hidden', 'true');
  element.dataset.boundsSrc = boundsSrc;
  element.append(svg);
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const rig = new MouthRig(svg, data);
  const renderer = new SvgMouthRenderer(svg, rig, smile, rendererOptions);
  const controller = new MouthController(renderer, { sampleSmile: smileSampler(smile), reduced: media.matches, idleExpression });
  let frame = 0, started = false, disposed = false, running = false, buffering = false, finished = false;
  const listeners = [];
  const on = (target, name, fn) => { target.addEventListener(name, fn); listeners.push([target, name, fn]); };
  const playable = () => !finished && !buffering && !document.hidden && !audio.paused
    && !audio.ended && !audio.seeking && audio.readyState >= 3 && contextRunning();
  function begin() {
    if (disposed) return;
    if (playable()) { controller.begin(performance.now()); running = true; }
  }
  function hold() {
    controller.hold(performance.now());
    running = false;
  }
  function finish() {
    finished = true;
    buffering = false;
    running = false;
    controller.finish(performance.now());
  }
  function tick(now) {
    if (disposed) return;
    const active = playable();
    if (active && !running) begin();
    else if (!active && running) hold();
    controller.idleAllowed = !document.hidden && !buffering && (audio.paused || audio.ended || finished);
    controller.step(now, active ? readEnergy() : 0);
    if (svg.dataset.controllerState !== controller.state) svg.dataset.controllerState = controller.state;
    frame = requestAnimationFrame(tick);
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    for (const [target, name, fn] of listeners) target.removeEventListener(name, fn);
    controller.dispose();
    rig.dispose();
    svg.pauseAnimations();
  }
  return {
    element,
    start() {
      if (started || disposed) return;
      started = true;
      controller.idleStart = performance.now();
      on(audio, 'playing', () => { finished = false; buffering = false; begin(); });
      on(audio, 'pause', hold);
      on(audio, 'waiting', () => { buffering = true; hold(); });
      on(audio, 'seeking', hold);
      on(audio, 'seeked', () => { buffering = false; begin(); });
      for (const name of ['ended', 'error', 'abort', 'emptied']) on(audio, name, finish);
      on(document, 'visibilitychange', () => { if (document.hidden) hold(); else begin(); });
      on(media, 'change', () => { controller.reduced = media.matches; rig.reduced = media.matches; });
      // A BFCache entry resumes its existing instance; a discarded page releases it.
      on(window, 'pagehide', event => { if (!event.persisted) dispose(); });
      begin();
      frame = requestAnimationFrame(tick);
    },
    dispose,
  };
}
