// Isolated native SVG document: keep the authored tree/SMIL in its own style scope.
// Only reviewed same-origin local avatar assets are passed by the host registry.
export async function createSvgDocument({src, host, timeoutMs = 12000}) {
  const element = document.createElement('div');
  element.className = 'avatar-frame avatar-sway-frame';
  element.setAttribute('aria-hidden', 'true');
  element.dataset.boundsSrc = src;
  element.style.visibility = 'hidden';
  const object = document.createElement('object');
  object.type = 'image/svg+xml'; object.tabIndex = -1;
  object.setAttribute('aria-hidden', 'true');
  // Match the SVG document's scheme: inherited Night/dark makes Chromium
  // paint an opaque white canvas even with transparent computed backgrounds.
  object.style.cssText = 'display:block;width:100%;height:100%;border:0;pointer-events:none;color-scheme:normal';
  element.append(object);
  let started = false, disposed = false, svg;
  try {
    await new Promise((resolve, reject) => {
      const cleanup = () => { clearTimeout(timer); object.removeEventListener('load', loaded); object.removeEventListener('error', failed); };
      const failed = () => { cleanup(); reject(new Error('SVG document failed to load')); };
      const loaded = () => {
        try {
          svg = object.contentDocument?.documentElement;
          if (svg?.localName !== 'svg' || svg.querySelector('parsererror')) { failed(); return; }
          cleanup(); resolve();
        } catch { failed(); }
      };
      const timer = setTimeout(failed, timeoutMs);
      object.addEventListener('load', loaded); object.addEventListener('error', failed);
      object.data = src;
      // Native documents require a connected node to load. Stage invisibly in
      // the final parent; do NOT reparent on activation (that restarts SMIL).
      host.append(element);
    });
  } catch (error) { element.remove(); object.removeAttribute('data'); throw error; }
  return {
    element,
    start() {
      if (started || disposed) return;
      started = true; element.id = 'avatarSwayFrame';
      element.classList.add('is-active'); element.style.removeProperty('visibility');
    },
    dispose() {
      if (disposed) return;
      disposed = true; svg.pauseAnimations(); object.remove(); object.removeAttribute('data');
      // The active wrapper remains the host's swap target until it replaces it.
      if (!started) element.remove();
    },
  };
}
