// Night Moon: host owns layout/input; renderer owns the transparent globe.
import { attachMoonDrag } from './drag-input.js';
const root = document.documentElement;
const mount = document.querySelector('#nightMoonArtRenderer');
const query = new URLSearchParams(location.search);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let scene = null;
let dragInput = null;
let loading = false;
let failed = false;
let suspended = false;
let generation = 0;
let lastError = null;
let initialization = null;

function isVisible() {
  return root.dataset.theme === 'night' && !document.hidden && !suspended
    && !['transparent', 'chromakey'].includes(root.dataset.bg);
}

function showReady(ready) {
  root.classList.toggle('moon-art-ready', ready);
}

async function sync() {
  if (!mount || query.get('moon') === 'legacy') return;
  const visible = isVisible();
  if (scene) {
    // Pause before changing settings: never draw a hidden frame on theme switches.
    if (!visible) scene.setActive(false);
    scene.setSettings({ motion: !reducedMotion.matches });
    scene.setActive(visible);
    dragInput?.sync();
    mount.dataset.motionState = visible
      ? (reducedMotion.matches ? 'static' : 'animating') : 'paused';
    return;
  }
  if (!visible || loading || failed) return;
  loading = true;
  mount.dataset.motionState = 'loading';
  const token = ++generation;
  try {
    const { createMoonScene } = await import('./moon-scene.js');
    if (token !== generation) return;
    initialization = new AbortController();
    const controller = await createMoonScene(mount, {
      signal: initialization.signal,
      assetBase: new URL(/* @vite-ignore */ '../textures/', import.meta.url).href,
      // Avatar-only brighter moonlight; frozen MoonShaderLab preset is untouched.
      initialSettings: { motion: !reducedMotion.matches, exposure: 2.2, shading: 0.45, halo: 1.6, darkPaintRetention: 0.8075 },
      onError(error) {
        if (token !== generation) return;
        lastError = String(error?.message || error);
        showReady(false);
        dragInput?.sync();
        mount.dataset.motionState = 'fallback';
      },
      onReady() {
        if (token !== generation) return;
        lastError = null;
        showReady(true);
      },
    });
    if (token !== generation) { controller.dispose(); return; }
    scene = controller;
    dragInput = attachMoonDrag({ mount, scene, isVisible });
    showReady(controller.getState().ready);
  } catch (error) {
    if (token !== generation) return;
    failed = true;
    lastError = String(error?.message || error);
    mount.dataset.motionState = 'fallback';
    showReady(false);
    console.warn('Night Moon unavailable; original illustration retained.', error);
  } finally {
    if (token === generation) {
      loading = false;
      if (scene) sync();
    }
  }
}

function pageHide() {
  suspended = true;
  generation += 1;
  initialization?.abort();
  initialization = null;
  loading = false;
  dragInput?.dispose();
  dragInput = null;
  scene?.dispose();
  scene = null;
  showReady(false);
}
function pageShow() {
  suspended = false;
  failed = false;
  sync();
}

if (mount && query.get('moon') !== 'legacy') {
  const observer = new MutationObserver(sync);
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-bg'] });
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pagehide', pageHide);
  window.addEventListener('pageshow', pageShow);
  // Read-only runtime receipt; scoped drag ownership stays inside drag-input.js.
  window.__midoriMoonArt = {
    getState: () => ({ loading, failed, suspended, visible: isVisible(), lastError,
      motionState: mount.dataset.motionState || 'idle', scene: scene?.getState() ?? null }),
  };
  sync();
}
