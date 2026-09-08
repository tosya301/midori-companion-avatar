// Host-only mouse interaction. The renderer stays below the avatar and never
// gets a full-rectangle hit overlay that could steal foreground UI operations.
export function attachMoonDrag({ mount, scene, isVisible }) {
  const doc = mount.ownerDocument;
  const win = doc.defaultView;
  const root = doc.documentElement;
  const masks = new Map();
  const removers = [];
  const imageSelector = '#avatar img';
  let pointer = null;
  let hoverFrame = 0;
  let hoverPoint = null;
  let suppressClick = null;
  let disposed = false;

  function listen(target, name, handler, options) {
    target.addEventListener(name, handler, options);
    removers.push(() => target.removeEventListener(name, handler, options));
  }
  function cursor(mode) {
    root.classList.toggle('moon-drag-hover', mode === 'hover');
    root.classList.toggle('moon-drag-active', mode === 'drag');
  }
  function enabled() {
    return !disposed && isVisible() && scene.getState().ready;
  }
  function visibleImage(image) {
    for (let el = image; el && el !== doc.body; el = el.parentElement) {
      const style = win.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.03) return false;
    }
    return true;
  }
  function alphaMask(image) {
    const key = image.currentSrc || image.src;
    if (masks.has(key)) return masks.get(key);
    if (!image.complete || !image.naturalWidth) return null;
    // Compact material-space hit masks, never a screenshot or GPU readback.
    // Cache across direction-frame swaps; cap memory even for large wardrobes.
    const canvas = doc.createElement('canvas');
    const scale = 256 / Math.max(image.naturalWidth, image.naturalHeight);
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    try {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const rgba = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const alpha = new Uint8Array(canvas.width * canvas.height);
      for (let i = 0; i < alpha.length; i += 1) alpha[i] = rgba[i * 4 + 3];
      const mask = { alpha, width: canvas.width, height: canvas.height };
      if (masks.size >= 16) masks.delete(masks.keys().next().value);
      masks.set(key, mask);
      return mask;
    } catch {
      // A future cross-origin/undecoded image must protect the avatar, not let
      // a failed alpha read become click-through. No exception leaks to input.
      masks.set(key, null);
      return null;
    }
  }
  function overForegroundPaint(x, y) {
    for (const image of doc.querySelectorAll(imageSelector)) {
      const rect = image.getBoundingClientRect();
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom || !visibleImage(image)) continue;
      if (!image.naturalWidth || !image.naturalHeight) return true;
      const style = win.getComputedStyle(image);
      const scale = Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
      // Current avatar frames use centered object-fit:contain, translate/scale.
      // Protect unknown fit modes conservatively rather than guessing their alpha.
      if (!['contain', 'fill'].includes(style.objectFit)) return true;
      const width = style.objectFit === 'fill' ? rect.width : image.naturalWidth * scale;
      const height = style.objectFit === 'fill' ? rect.height : image.naturalHeight * scale;
      const u = (x - rect.left - (rect.width - width) / 2) / width;
      const v = (y - rect.top - (rect.height - height) / 2) / height;
      if (u < 0 || u > 1 || v < 0 || v > 1) continue;
      const mask = alphaMask(image);
      if (!mask) return true;
      const px = Math.min(mask.width - 1, Math.floor(u * mask.width));
      const py = Math.min(mask.height - 1, Math.floor(v * mask.height));
      // Small conservative guard around antialiased hair/clothing edges.
      for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) {
        const mx = px + dx, my = py + dy;
        if (mx >= 0 && my >= 0 && mx < mask.width && my < mask.height
            && mask.alpha[my * mask.width + mx] > 12) return true;
      }
    }
    return false;
  }
  function hit(x, y) {
    if (!enabled()) return false;
    const rect = mount.getBoundingClientRect();
    // Same orthographic frustum as the renderer: sphere radius is minSide/2.6.
    // Stay just inside the silhouette; the halo is not a draggable surface.
    const radius = Math.min(rect.width, rect.height) / 2.6 * 0.992;
    if (radius <= 0 || Math.hypot(x - rect.left - rect.width / 2, y - rect.top - rect.height / 2) >= radius) return false;
    const top = doc.elementFromPoint(x, y);
    if (!top || !(top === doc.body || top === root || top.matches('.stage, .avatar-shell, #avatar') || mount.contains(top))) return false;
    return !overForegroundPaint(x, y);
  }
  function consume(event) {
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
  }
  function end(cancelled = false) {
    if (pointer) {
      const id = pointer.id;
      pointer = null;
      scene.endDrag(cancelled);
      if (mount.hasPointerCapture?.(id)) mount.releasePointerCapture(id);
    }
    cursor(null);
  }
  function down(event) {
    if (pointer || event.button !== 0 || !event.isPrimary || !['mouse', 'pen'].includes(event.pointerType)
        || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !hit(event.clientX, event.clientY)) return;
    if (!scene.beginDrag()) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
    try { mount.setPointerCapture(event.pointerId); } catch { end(true); return; }
    suppressClick = null;
    cursor('drag');
    consume(event);
  }
  function move(event) {
    if (pointer) {
      if (event.pointerId !== pointer.id) return;
      if (!enabled() || !(event.buttons & 1)) { end(true); return; }
      const rect = mount.getBoundingClientRect();
      const radiansPerPixel = 2.6 / Math.max(1, Math.min(rect.width, rect.height));
      const elapsed = Math.max(0.001, (event.timeStamp - pointer.time) / 1000);
      scene.dragBy((event.clientX - pointer.x) * radiansPerPixel,
        (event.clientY - pointer.y) * radiansPerPixel, elapsed);
      pointer.x = event.clientX; pointer.y = event.clientY; pointer.time = event.timeStamp;
      consume(event);
      return;
    }
    if (event.pointerType !== 'mouse') return;
    hoverPoint = { x: event.clientX, y: event.clientY,
      modified: event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.buttons !== 0 };
    if (!hoverFrame) hoverFrame = win.requestAnimationFrame(() => {
      hoverFrame = 0;
      if (!pointer && hoverPoint) cursor(!hoverPoint.modified && hit(hoverPoint.x, hoverPoint.y) ? 'hover' : null);
    });
  }
  function up(event) {
    if (!pointer || event.pointerId !== pointer.id) return;
    // Holding still before release must not fling from an old velocity sample.
    const heldStill = event.timeStamp - pointer.time > 80;
    suppressClick = { x: event.clientX, y: event.clientY, until: win.performance.now() + 350 };
    end(heldStill);
    consume(event);
  }
  listen(doc, 'pointerdown', down, true);
  listen(doc, 'pointermove', move, true);
  listen(doc, 'pointerup', up, true);
  listen(doc, 'pointercancel', event => { if (event.pointerId === pointer?.id) end(true); }, true);
  listen(mount, 'lostpointercapture', event => { if (event.pointerId === pointer?.id) end(true); });
  listen(doc, 'click', event => {
    if (suppressClick && win.performance.now() < suppressClick.until
        && Math.hypot(event.clientX - suppressClick.x, event.clientY - suppressClick.y) < 4) consume(event);
    suppressClick = null;
  }, true);
  listen(win, 'blur', () => end(true));
  listen(doc, 'visibilitychange', () => { if (doc.hidden) end(true); });
  listen(doc, 'pointerout', event => { if (!event.relatedTarget && !pointer) cursor(null); });
  return {
    sync() { if (!enabled()) end(true); },
    dispose() {
      end(true); disposed = true;
      if (hoverFrame) win.cancelAnimationFrame(hoverFrame);
      for (const remove of removers) remove();
      masks.clear();
    },
  };
}
