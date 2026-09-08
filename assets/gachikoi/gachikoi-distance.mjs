// Local close-distance presentation. No audio/chat ownership or persistence.
export const GACHIKOI_SCALE = 1.62;
export const GACHIKOI_DROP_RATIO = 0.20; // Fraction of the fully magnified frame height.
const BOTTOM_BLEED_PX = 2; // Covers the viewport edge without chasing animated alpha.
export const LONG_PRESS_MS = 450;
export const DOCK_IDLE_MS = 10000;
const MOVE_CANCEL_PX = 8;
const ZOOM_MS = 380;
const UNICORN = `<svg class="avatar-tool-icon" data-lucide="unicorn-head" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m15.6 4.8 2.7 2.3"/><path d="M15.5 10S19 7 22 2c-6 2-10 5-10 5"/><path d="M11.5 12H11"/><path d="M5 15a4 4 0 0 0 4 4h7.8l.3.3a3 3 0 0 0 4-4.46L12 7c0-3-1-5-1-5S8 3 8 7c-4 1-6 3-6 3"/><path d="M2 4.5C4 3 6 3 6 3l2 4"/><path d="M6.14 17.8S4 19 2 22"/></svg>`;
const modified = e => e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

export function initGachikoiDistance({avatar, swayBtn, dock, voice, getFrame, getMode, setMode}) {
  const toolbar = swayBtn.closest('.avatar-toolbar');
  const shell = avatar.closest('.avatar-shell');
  const input = dock.querySelector('textarea');
  const layer = document.createElement('div');
  layer.id = 'gachikoiLayer'; layer.className = 'gachikoi-layer';
  getFrame().before(layer); layer.append(getFrame(), voice);
  const menu = document.createElement('div');
  menu.id = 'gachikoiMenu'; menu.className = 'gachikoi-menu';
  menu.setAttribute('role', 'group'); menu.setAttribute('aria-label', '近距离模式'); menu.hidden = true;
  const button = document.createElement('button');
  button.id = 'gachikoiBtn'; button.type = 'button'; button.className = 'avatar-tool-btn';
  button.setAttribute('aria-label', 'ガチ恋距離'); button.setAttribute('aria-pressed', 'false');
  button.dataset.tooltip = 'ガチ恋距離'; button.innerHTML = UNICORN;
  menu.append(button); toolbar.append(menu);
  swayBtn.setAttribute('aria-expanded', 'false');
  swayBtn.setAttribute('aria-describedby', 'gachikoiHint');
  const hint = document.createElement('span'); hint.id = 'gachikoiHint'; hint.className = 'sr-only';
  hint.textContent = '长按展开ガチ恋距離；轻摇按钮按向下箭头展开；近距中在独角兽按钮按向下箭头显隐输入框和回复。'; shell.append(hint);
  button.setAttribute('aria-describedby', 'gachikoiHint');
  button.setAttribute('aria-keyshortcuts', 'ArrowDown');

  const abort = new AbortController();
  const listen = (node, type, fn, options = {}) => node.addEventListener(type, fn, {...options, signal: abort.signal});
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = false, pending = false, entryToken = 0, disposed = false;
  let dockVisible = true, dockReturning = false, composing = false, hideTimer = 0, lastActivity = 0;
  let press = null, pressTimer = 0, suppressClick = false;
  let raf = 0, progress = 0, tween = null, lastScale = 1, lastTy = 0;
  let lastTransform = '', lastClip = '', currentMask = null, maskToken = 0;
  let calibration = null;
  const masks = new Map();
  const mix = (a, b, p) => a + (b - a) * p;
  const writeStyle = (node, property, value) => {
    if (node.style[property] !== value) node.style[property] = value;
  };

  // Sample authored CSS endpoints once, not the scaled/animated frame each tick.
  // Temporary class reads are synchronous: no intermediate state can paint.
  function readCalibration() {
    const frame = getFrame();
    if (calibration?.frame === frame) {
      frame.style.transform = calibration.restoreTransform;
      frame.style.translate = calibration.restoreTranslate;
    }
    const restoreTransform = frame.style.transform, restoreTranslate = frame.style.translate;
    const body = document.body, wasActive = body.classList.contains('gachikoi-active');
    const wasTransitioning = body.classList.contains('gachikoi-transitioning');
    const width = frame.offsetWidth, height = frame.offsetHeight;
    function sample() {
      const css = getComputedStyle(frame), matrix = new DOMMatrix(css.transform);
      const translate = css.translate === 'none' ? [] : css.translate.split(/\s+/);
      const pixels = (v, size) => (parseFloat(v) || 0) * (v?.endsWith('%') ? size / 100 : 1);
      const artScale = parseFloat(css.getPropertyValue('--gachikoi-art-scale')) || 1;
      return {scale:matrix.a, artScale, x:matrix.e + pixels(translate[0], width), y:matrix.f + pixels(translate[1], height)};
    }
    body.classList.remove('gachikoi-active', 'gachikoi-transitioning');
    const normal = sample();
    body.classList.add('gachikoi-active');
    const close = sample();
    body.classList.toggle('gachikoi-active', wasActive);
    body.classList.toggle('gachikoi-transitioning', wasTransitioning);
    const svg = getMode() === 'lil' ? frame.querySelector('svg') : null;
    const restoreArt = calibration?.frame === frame ? calibration.restoreArt : svg?.style.transform || '';
    calibration = {frame, svg, width, height, normal, close, restoreTransform, restoreTranslate, restoreArt};
    frame.style.translate = 'none';
  }
  function releaseCalibration() {
    if (!calibration) return;
    const c = calibration;
    c.frame.style.transform = c.restoreTransform;
    c.frame.style.translate = c.restoreTranslate;
    if (c.svg) c.svg.style.transform = c.restoreArt;
    calibration = null;
  }

  function positionMenu() {
    menu.style.left = `${swayBtn.offsetLeft + (swayBtn.offsetWidth - menu.offsetWidth) / 2}px`;
  }
  function showMenu(open) {
    menu.hidden = !open;
    swayBtn.setAttribute('aria-expanded', String(open));
    if (open) positionMenu();
  }
  function clearPress() { clearTimeout(pressTimer); pressTimer = 0; press = null; }
  function clearHideTimer() { clearTimeout(hideTimer); hideTimer = 0; }
  function scheduleHide() {
    clearHideTimer();
    if (!active || !dockVisible || composing) return;
    const remaining = Math.max(0, DOCK_IDLE_MS - (performance.now() - lastActivity));
    hideTimer = setTimeout(() => setDockVisible(false), remaining);
  }
  function activity() {
    if (!active || !dockVisible) return;
    lastActivity = performance.now(); scheduleHide();
  }
  function setDockVisible(visible) {
    dockVisible = !dockReturning && (!active || visible);
    dock.classList.toggle('gachikoi-dock-hidden', !dockVisible);
    dock.inert = !dockVisible;
    if (dockVisible) dock.removeAttribute('aria-hidden');
    else {
      dock.setAttribute('aria-hidden', 'true');
      if (dock.contains(document.activeElement)) document.activeElement.blur();
    }
    clearHideTimer();
    if (active && dockVisible) { lastActivity = performance.now(); scheduleHide(); }
  }

  // A small per-source mask provides visible-artwork bounds and transparent-pixel
  // hit exclusion. Never sample a full-size avatar in a hot animation loop.
  async function loadMask() {
    const token = ++maskToken, frame = getFrame();
    const src = frame.dataset.boundsSrc || frame.currentSrc || frame.src;
    currentMask = null;
    if (!src || getMode() === 'off') return;
    if (!masks.has(src)) masks.set(src, (async () => {
      const image = new Image(); image.src = src; await image.decode();
      const w = 256, h = Math.round(w * image.naturalHeight / image.naturalWidth);
      const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d', {willReadFrequently: true}); ctx.drawImage(image, 0, 0, w, h);
      const pixels = ctx.getImageData(0, 0, w, h).data;
      let bottom = 0;
      for (let y = h - 1; y >= 0; y--) {
        let painted = false;
        for (let x = 0; x < w; x++) if (pixels[(y * w + x) * 4 + 3] > 20) { painted = true; break; }
        if (painted) { bottom = (y + 1) / h; break; }
      }
      return {w, h, pixels, bottom: bottom || 1};
    })());
    try { const mask = await masks.get(src); if (!disposed && token === maskToken && getFrame() === frame) currentMask = mask; }
    catch { masks.delete(src); }
  }
  function hitArtwork(x, y) {
    const frame = getFrame();
    const art = getMode() === 'lil' ? frame.querySelector('svg') || frame : frame;
    const r = art.getBoundingClientRect();
    if (x < r.left || x >= r.right || y < r.top || y >= r.bottom) return false;
    if (!currentMask) return false;
    const mx = Math.min(currentMask.w - 1, Math.floor((x - r.left) / r.width * currentMask.w));
    const my = Math.min(currentMask.h - 1, Math.floor((y - r.top) / r.height * currentMask.h));
    return currentMask.pixels[(my * currentMask.w + mx) * 4 + 3] > 20;
  }

  function animateTo(target) {
    if (!calibration || calibration.frame !== getFrame()) readCalibration();
    tween = {from: progress, to: target, at: performance.now()};
    document.body.classList.add('gachikoi-transitioning');
    // Pin the current presentation before the first asynchronous paint.
    cancelAnimationFrame(raf); raf = 0;
    if (!document.hidden) tick(tween.at);
  }
  function tick(now) {
    raf = 0;
    if (disposed || document.hidden) return;
    if (!calibration || calibration.frame !== getFrame()) readCalibration();
    if (tween) {
      const elapsed = motion.matches ? 1 : Math.max(0, Math.min(1, (now - tween.at) / ZOOM_MS));
      const eased = 1 - (1 - elapsed) ** 3;
      progress = mix(tween.from, tween.to, eased);
      if (elapsed === 1) tween = null;
    }
    const a = avatar.getBoundingClientRect(), cropTop = dock.getBoundingClientRect().top;
    const {frame, svg, height, normal, close} = calibration;
    const viewportBottom = window.visualViewport ? visualViewport.offsetTop + visualViewport.height : innerHeight;
    const closeHeight = height * close.scale * GACHIKOI_SCALE;
    const finalTy = viewportBottom - a.bottom - GACHIKOI_SCALE * (cropTop - a.bottom)
      + BOTTOM_BLEED_PX + closeHeight * GACHIKOI_DROP_RATIO;
    const scale = mix(1, GACHIKOI_SCALE, progress), ty = finalTy * progress;
    // Interpolate the *presented* endpoints, then invert the shared voice zoom.
    // This includes normal-only calibrations and close-only pixel nudges.
    // Artwork-only tuning must not move the shared voice/bottom anchor above.
    const frameScale = mix(normal.scale, close.scale * close.artScale * GACHIKOI_SCALE, progress) / scale;
    const x = mix(normal.x, close.x * GACHIKOI_SCALE, progress) / scale;
    const y = (mix(normal.y, finalTy + close.y * GACHIKOI_SCALE, progress) - ty) / scale;
    const frameTransform = `translate(${x.toFixed(6)}px, ${y.toFixed(6)}px) scale(${frameScale.toFixed(8)})`;
    const transform = `translateY(${ty.toFixed(4)}px) scale(${scale.toFixed(6)})`;
    const clip = `inset(-100vmax -100vmax ${(a.bottom - viewportBottom).toFixed(4)}px -100vmax)`;
    if (svg && height > 0) {
      const presentedScale = mix(normal.scale, close.scale * GACHIKOI_SCALE * .8, progress);
      const artScale = presentedScale / (frameScale * scale);
      const finalBottom = viewportBottom + BOTTOM_BLEED_PX + closeHeight * .8 * (1 - (currentMask?.bottom ?? 1));
      const bottom = mix(a.bottom + normal.y, finalBottom, progress);
      const localShift = (bottom - (a.bottom + ty + scale * y)) / (frameScale * scale);
      // Non-inherited transform: no per-frame custom-property cascade through
      // the thousands of authored SVG descendants; body/blink clock stays live.
      writeStyle(svg, 'transform', `translateY(${localShift.toFixed(6)}px) scale(${artScale.toFixed(8)})`);
    }
    writeStyle(frame, 'transform', frameTransform);
    if (transform !== lastTransform) { layer.style.transform = transform; lastTransform = transform; }
    if (clip !== lastClip) { avatar.style.setProperty('--gachikoi-clip', clip); lastClip = clip; }
    lastScale = scale; lastTy = ty;
    if (!tween && !active && progress === 0) {
      layer.style.removeProperty('transform'); avatar.style.removeProperty('--gachikoi-clip');
      document.body.classList.remove('gachikoi-transitioning');
      releaseCalibration();
      lastScale = 1; lastTy = 0; lastTransform = ''; lastClip = '';
      // Reveal only after the actual return completes, not a guessed timeout.
      if (dockReturning) { dockReturning = false; setDockVisible(true); }
      return;
    }
    if (!tween) document.body.classList.remove('gachikoi-transitioning');
    raf = requestAnimationFrame(tick);
  }

  function exit() {
    entryToken++; active = false; dockReturning = true;
    document.body.classList.remove('gachikoi-active');
    button.classList.remove('is-active'); button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', 'ガチ恋距離'); button.dataset.tooltip = 'ガチ恋距離';
    setDockVisible(false); showMenu(false); animateTo(0);
  }
  async function toggle() {
    if (active || pending) { exit(); return; }
    const token = ++entryToken; pending = true; button.setAttribute('aria-busy', 'true');
    try {
      if (getMode() === 'off') await setMode('green');
      if (disposed || token !== entryToken || getMode() === 'off') return;
      await loadMask();
      if (disposed || token !== entryToken || getMode() === 'off') return;
      active = true; dockReturning = false; document.body.classList.add('gachikoi-active');
      button.classList.add('is-active'); button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', '退出ガチ恋距離'); button.dataset.tooltip = '退出ガチ恋距離';
      showMenu(true); setDockVisible(false); animateTo(1);
    } finally { pending = false; button.removeAttribute('aria-busy'); }
  }

  listen(swayBtn, 'pointerdown', e => {
    if (modified(e) || e.button !== 0) return;
    suppressClick = false; clearPress();
    press = {id: e.pointerId, x: e.clientX, y: e.clientY};
    swayBtn.setPointerCapture(e.pointerId);
    pressTimer = setTimeout(() => { suppressClick = true; showMenu(true); }, LONG_PRESS_MS);
  });
  listen(swayBtn, 'pointermove', e => {
    if (press && !suppressClick && Math.hypot(e.clientX - press.x, e.clientY - press.y) > MOVE_CANCEL_PX) {
      clearPress();
      // Pointer capture can synthesize a click back on the button after a drag.
      suppressClick = true;
    }
  });
  listen(swayBtn, 'pointerup', () => clearPress());
  listen(swayBtn, 'pointercancel', () => { clearPress(); suppressClick = false; });
  listen(swayBtn, 'lostpointercapture', clearPress);
  listen(swayBtn, 'click', e => {
    if (suppressClick && e.detail !== 0) { suppressClick = false; e.preventDefault(); e.stopImmediatePropagation(); }
  }, {capture: true});
  listen(swayBtn, 'contextmenu', e => { if (!modified(e)) e.preventDefault(); });
  listen(swayBtn, 'keydown', e => {
    if (e.key === 'ArrowDown' && !modified(e)) { e.preventDefault(); showMenu(true); button.focus({preventScroll: true}); }
  });
  listen(button, 'click', e => { if (!modified(e)) void toggle(); });
  listen(button, 'keydown', e => {
    if (!active || e.key !== 'ArrowDown' || modified(e)) return;
    e.preventDefault();
    setDockVisible(!dockVisible);
    if (dockVisible) input.focus({preventScroll: true});
  });
  listen(document, 'pointerdown', e => {
    if (!active && !pending && !menu.contains(e.target) && !swayBtn.contains(e.target)) showMenu(false);
    if (active && dockVisible && dock.contains(e.target)) activity();
  }, {capture: true});
  listen(document, 'dblclick', e => {
    if (!active || modified(e) || e.button !== 0 || !(e.target instanceof Element)) return;
    if (e.target.closest('button,a,input,textarea,select,[contenteditable],.avatar-toolbar,.control-card,.midori-input-dock,.site-icon-dock,.midori-youtube-player,.midori-bilibili-player')) return;
    if (!hitArtwork(e.clientX, e.clientY)) return;
    e.preventDefault(); setDockVisible(!dockVisible);
  });
  listen(document, 'keydown', e => {
    if (e.key !== 'Escape' || e.isComposing) return;
    // Match button-click exit: do not force focus/tooltip onto the sway control.
    if (active || pending) exit();
    else showMenu(false);
  });
  for (const type of ['input','keydown','pointerdown','wheel']) listen(dock, type, activity, {passive: true});
  listen(input, 'compositionstart', () => { composing = true; clearHideTimer(); });
  listen(input, 'compositionend', () => { composing = false; activity(); });
  listen(window, 'resize', () => { positionMenu(); if (calibration) readCalibration(); });
  const sizeObserver = new ResizeObserver(() => { if (calibration) readCalibration(); });
  sizeObserver.observe(avatar);
  listen(window, 'blur', () => { clearPress(); if (!active) showMenu(false); });
  listen(document, 'visibilitychange', () => {
    clearPress();
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else { if ((active || tween) && !raf) raf = requestAnimationFrame(tick); scheduleHide(); }
  });
  const observer = new MutationObserver(() => {
    if (getMode() === 'off') { if (active) exit(); }
    else void loadMask();
  });
  observer.observe(avatar, {attributes: true, attributeFilter: ['data-sway-mode']});
  void loadMask();

  return {
    getState: () => ({active,pending,menuOpen:!menu.hidden,dockVisible,composing,progress,scale:lastScale,ty:lastTy,mode:getMode(),maskReady:!!currentMask,maskBottom:currentMask?.bottom ?? 1}),
    dispose() {
      disposed = true; entryToken++; maskToken++; observer.disconnect(); sizeObserver.disconnect(); abort.abort();
      releaseCalibration();
      clearHideTimer(); clearPress(); cancelAnimationFrame(raf);
      document.body.classList.remove('gachikoi-active','gachikoi-transitioning');
      dock.classList.remove('gachikoi-dock-hidden'); dock.inert = false; dock.removeAttribute('aria-hidden');
      avatar.style.removeProperty('--gachikoi-clip'); layer.before(getFrame()); layer.before(voice); layer.remove();
      menu.remove(); hint.remove(); swayBtn.removeAttribute('aria-expanded'); swayBtn.removeAttribute('aria-describedby');
    }
  };
}
