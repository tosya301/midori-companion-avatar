(() => {
  'use strict';
  const ship = document.querySelector('#nightSpaceship');
  if (!ship || document.querySelector('#nightAquaCat')) return;
  const scriptBase = new URL('.', document.currentScript.src);
  const cat = document.createElement('div');
  cat.id = 'nightAquaCat';
  cat.className = 'night-aqua-cat';
  cat.setAttribute('aria-hidden', 'true');
  const art = document.createElement('img');
  art.src = new URL('aqua-cat-transparent.gif', scriptBase).href;
  art.alt = '';
  art.draggable = false;
  cat.append(art);
  ship.after(cat);
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const GAP_MS = 6000;
  const OPENING_DELAY_MS = 20000;
  let openingPending = true;
  let observedTheme = document.documentElement.dataset.theme;
  // Five left-to-right sky lanes; resolve in pixels to cap angle on tall screens.
  const routes = [
    { id: 'aqua-1', from: 0.18, to: 0.18, duration: 28000 },
    { id: 'aqua-2', from: 0.43, to: 0.15, duration: 30000 },
    { id: 'aqua-3', from: 0.14, to: 0.40, duration: 31000 },
    { id: 'aqua-4', from: 0.59, to: 0.33, duration: 29000 },
    { id: 'aqua-5', from: 0.31, to: 0.53, duration: 32000 },
  ];
  let animation = null;
  let timer = 0;
  let scheduledAt = 0;
  let consumedAt = 0;
  let deck = [];
  let lastId = null;
  let preview = false;
  const enabled = () => document.documentElement.dataset.theme === 'night'
    && !['transparent', 'chromakey'].includes(document.documentElement.dataset.bg)
    && !document.hidden && !media.matches && art.complete && art.naturalWidth > 0;
  function stop() {
    clearTimeout(timer);
    timer = 0;
    scheduledAt = 0;
    animation?.cancel();
    animation = null;
    cat.dataset.motionState = 'idle';
  }
  function resolve(route) {
    const size = cat.offsetWidth;
    const margin = Math.hypot(size, cat.offsetHeight) / 2 + 16;
    const start = { x: -margin, y: innerHeight * route.from };
    const dx = innerWidth + 2 * margin;
    const dy = Math.max(-dx, Math.min(dx, innerHeight * (route.to - route.from)));
    const end = { x: start.x + dx, y: start.y + dy };
    return { ...route, start, end, angle: Math.atan2(dy, dx) * 180 / Math.PI };
  }
  function nextRoute() {
    if (!deck.length) {
      deck = [...routes];
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      if (deck[0].id === lastId) [deck[0], deck[1]] = [deck[1], deck[0]];
    }
    const route = deck.shift();
    lastId = route.id;
    return route;
  }
  function fly(route, progress = null) {
    stop();
    if (!enabled()) return null;
    const resolved = resolve(route);
    const box = cat.getBoundingClientRect();
    const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    const frame = (p, opacity) => ({ offset: p, opacity,
      transform: `translate3d(${resolved.start.x + (resolved.end.x - resolved.start.x) * p - center.x}px, ${resolved.start.y + (resolved.end.y - resolved.start.y) * p - center.y}px, 0) rotate(${resolved.angle}deg)` });
    animation = cat.animate([frame(0, 0), frame(0.04, 1), frame(0.96, 1), frame(1, 0)],
      { duration: route.duration, easing: 'linear', fill: 'both' });
    cat.dataset.routeId = route.id;
    cat.dataset.angle = String(resolved.angle);
    cat.dataset.motionState = progress === null ? 'flying' : 'preview';
    if (progress !== null) {
      animation.pause();
      animation.currentTime = route.duration * Math.max(0, Math.min(1, progress));
    } else {
      const flight = animation;
      flight.addEventListener('finish', () => { if (animation === flight) stop(); }, { once: true });
    }
    return resolved;
  }
  function sync() {
    const theme = document.documentElement.dataset.theme;
    if (theme !== observedTheme) {
      if (theme === 'night') openingPending = true;
      observedTheme = theme;
    }
    if (!enabled()) { preview = false; stop(); return; }
    if (preview) return;
    const nextAt = Number(ship.dataset.nextFlightAt) || 0;
    // The delayed opening may overlap the rocket; let an active cat finish.
    if (animation) return;
    // The rocket cycle is only a cadence anchor, not a no-overlap constraint.
    if (!nextAt) return;
    if (nextAt === consumedAt || nextAt === scheduledAt) return;
    stop();
    const shipInterval = window.__midoriNightSpaceship?.getState().intervalMs || 48000;
    const delay = Math.max(0, nextAt - shipInterval
      + (openingPending ? OPENING_DELAY_MS : GAP_MS) - Date.now());
    scheduledAt = nextAt;
    cat.dataset.motionState = 'waiting';
    timer = setTimeout(() => {
      timer = 0;
      scheduledAt = 0;
      if (!enabled()) { sync(); return; }
      consumedAt = nextAt;
      openingPending = false;
      fly(nextRoute());
    }, delay);
  }
  new MutationObserver(sync).observe(ship, { attributes: true, attributeFilter: ['data-motion-state', 'data-next-flight-at'] });
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-bg'] });
  media.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', () => { preview = false; stop(); sync(); });
  art.addEventListener('load', sync);
  art.addEventListener('error', stop);
  window.__midoriNightAquaCat = {
    getState: () => ({ motionState: cat.dataset.motionState, routeId: cat.dataset.routeId,
      gapMs: GAP_MS, openingDelayMs: OPENING_DELAY_MS, openingPending, scheduledAt, consumedAt, routes: routes.map(resolve), deck: deck.map(r => r.id) }),
    previewRoute: (id = 'aqua-1', progress = 0.5) => {
      const route = routes.find(r => r.id === id);
      if (!route) return null;
      preview = true;
      return fly(route, progress);
    },
    resume: () => { preview = false; stop(); sync(); },
  };
  sync();
})();
