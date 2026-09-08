function rt({ mount: o, scene: s, isVisible: w }) {
  const a = o.ownerDocument, c = a.defaultView, W = a.documentElement, g = /* @__PURE__ */ new Map(), V = [], G = "#avatar img";
  let r = null, x = 0, k = null, b = null, _ = !1;
  function d(t, i, e, n) {
    t.addEventListener(i, e, n), V.push(() => t.removeEventListener(i, e, n));
  }
  function L(t) {
    W.classList.toggle("moon-drag-hover", t === "hover"), W.classList.toggle("moon-drag-active", t === "drag");
  }
  function q() {
    return !_ && w() && s.getState().ready;
  }
  function J(t) {
    for (let i = t; i && i !== a.body; i = i.parentElement) {
      const e = c.getComputedStyle(i);
      if (e.display === "none" || e.visibility === "hidden" || Number(e.opacity) < 0.03) return !1;
    }
    return !0;
  }
  function Q(t) {
    const i = t.currentSrc || t.src;
    if (g.has(i)) return g.get(i);
    if (!t.complete || !t.naturalWidth) return null;
    const e = a.createElement("canvas"), n = 256 / Math.max(t.naturalWidth, t.naturalHeight);
    e.width = Math.max(1, Math.round(t.naturalWidth * n)), e.height = Math.max(1, Math.round(t.naturalHeight * n));
    const l = e.getContext("2d", { willReadFrequently: !0 });
    try {
      l.drawImage(t, 0, 0, e.width, e.height);
      const R = l.getImageData(0, 0, e.width, e.height).data, S = new Uint8Array(e.width * e.height);
      for (let p = 0; p < S.length; p += 1) S[p] = R[p * 4 + 3];
      const E = { alpha: S, width: e.width, height: e.height };
      return g.size >= 16 && g.delete(g.keys().next().value), g.set(i, E), E;
    } catch {
      return g.set(i, null), null;
    }
  }
  function Z(t, i) {
    for (const e of a.querySelectorAll(G)) {
      const n = e.getBoundingClientRect();
      if (t < n.left || t > n.right || i < n.top || i > n.bottom || !J(e)) continue;
      if (!e.naturalWidth || !e.naturalHeight) return !0;
      const l = c.getComputedStyle(e), R = Math.min(n.width / e.naturalWidth, n.height / e.naturalHeight);
      if (!["contain", "fill"].includes(l.objectFit)) return !0;
      const S = l.objectFit === "fill" ? n.width : e.naturalWidth * R, E = l.objectFit === "fill" ? n.height : e.naturalHeight * R, p = (t - n.left - (n.width - S) / 2) / S, B = (i - n.top - (n.height - E) / 2) / E;
      if (p < 0 || p > 1 || B < 0 || B > 1) continue;
      const f = Q(e);
      if (!f) return !0;
      const it = Math.min(f.width - 1, Math.floor(p * f.width)), nt = Math.min(f.height - 1, Math.floor(B * f.height));
      for (let j = -1; j <= 1; j += 1) for (let T = -1; T <= 1; T += 1) {
        const U = it + T, z = nt + j;
        if (U >= 0 && z >= 0 && U < f.width && z < f.height && f.alpha[z * f.width + U] > 12) return !0;
      }
    }
    return !1;
  }
  function v(t, i) {
    if (!q()) return !1;
    const e = o.getBoundingClientRect(), n = Math.min(e.width, e.height) / 2.6 * 0.992;
    if (n <= 0 || Math.hypot(t - e.left - e.width / 2, i - e.top - e.height / 2) >= n) return !1;
    const l = a.elementFromPoint(t, i);
    return !l || !(l === a.body || l === W || l.matches(".stage, .avatar-shell, #avatar") || o.contains(l)) ? !1 : !Z(t, i);
  }
  function F(t) {
    t.cancelable && t.preventDefault(), t.stopImmediatePropagation();
  }
  function h(t = !1) {
    if (r) {
      const i = r.id;
      r = null, s.endDrag(t), o.hasPointerCapture?.(i) && o.releasePointerCapture(i);
    }
    L(null);
  }
  function $(t) {
    if (!(r || t.button !== 0 || !t.isPrimary || !["mouse", "pen"].includes(t.pointerType) || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || !v(t.clientX, t.clientY)) && s.beginDrag()) {
      r = { id: t.pointerId, x: t.clientX, y: t.clientY, time: t.timeStamp };
      try {
        o.setPointerCapture(t.pointerId);
      } catch {
        h(!0);
        return;
      }
      b = null, L("drag"), F(t);
    }
  }
  function tt(t) {
    if (r) {
      if (t.pointerId !== r.id) return;
      if (!q() || !(t.buttons & 1)) {
        h(!0);
        return;
      }
      const i = o.getBoundingClientRect(), e = 2.6 / Math.max(1, Math.min(i.width, i.height)), n = Math.max(1e-3, (t.timeStamp - r.time) / 1e3);
      s.dragBy(
        (t.clientX - r.x) * e,
        (t.clientY - r.y) * e,
        n
      ), r.x = t.clientX, r.y = t.clientY, r.time = t.timeStamp, F(t);
      return;
    }
    t.pointerType === "mouse" && (k = {
      x: t.clientX,
      y: t.clientY,
      modified: t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || t.buttons !== 0
    }, x || (x = c.requestAnimationFrame(() => {
      x = 0, !r && k && L(!k.modified && v(k.x, k.y) ? "hover" : null);
    })));
  }
  function et(t) {
    if (!r || t.pointerId !== r.id) return;
    const i = t.timeStamp - r.time > 80;
    b = { x: t.clientX, y: t.clientY, until: c.performance.now() + 350 }, h(i), F(t);
  }
  return d(a, "pointerdown", $, !0), d(a, "pointermove", tt, !0), d(a, "pointerup", et, !0), d(a, "pointercancel", (t) => {
    t.pointerId === r?.id && h(!0);
  }, !0), d(o, "lostpointercapture", (t) => {
    t.pointerId === r?.id && h(!0);
  }), d(a, "click", (t) => {
    b && c.performance.now() < b.until && Math.hypot(t.clientX - b.x, t.clientY - b.y) < 4 && F(t), b = null;
  }, !0), d(c, "blur", () => h(!0)), d(a, "visibilitychange", () => {
    a.hidden && h(!0);
  }), d(a, "pointerout", (t) => {
    !t.relatedTarget && !r && L(null);
  }), {
    sync() {
      q() || h(!0);
    },
    dispose() {
      h(!0), _ = !0, x && c.cancelAnimationFrame(x);
      for (const t of V) t();
      g.clear();
    }
  };
}
const X = document.documentElement, m = document.querySelector("#nightMoonArtRenderer"), O = new URLSearchParams(location.search), A = matchMedia("(prefers-reduced-motion: reduce)");
let u = null, C = null, I = !1, Y = !1, H = !1, y = 0, K = null, D = null;
function N() {
  return X.dataset.theme === "night" && !document.hidden && !H && !["transparent", "chromakey"].includes(X.dataset.bg);
}
function P(o) {
  X.classList.toggle("moon-art-ready", o);
}
async function M() {
  if (!m || O.get("moon") === "legacy") return;
  const o = N();
  if (u) {
    o || u.setActive(!1), u.setSettings({ motion: !A.matches }), u.setActive(o), C?.sync(), m.dataset.motionState = o ? A.matches ? "static" : "animating" : "paused";
    return;
  }
  if (!o || I || Y) return;
  I = !0, m.dataset.motionState = "loading";
  const s = ++y;
  try {
    const { createMoonScene: w } = await import("./moon-scene-DjBHg4QL.js");
    if (s !== y) return;
    D = new AbortController();
    const a = await w(m, {
      signal: D.signal,
      assetBase: new URL(
        /* @vite-ignore */
        "../textures/",
        import.meta.url
      ).href,
      // Avatar-only brighter moonlight; frozen MoonShaderLab preset is untouched.
      initialSettings: { motion: !A.matches, exposure: 2.2, shading: 0.45, halo: 1.6, darkPaintRetention: 0.8075 },
      onError(c) {
        s === y && (K = String(c?.message || c), P(!1), C?.sync(), m.dataset.motionState = "fallback");
      },
      onReady() {
        s === y && (K = null, P(!0));
      }
    });
    if (s !== y) {
      a.dispose();
      return;
    }
    u = a, C = rt({ mount: m, scene: u, isVisible: N }), P(a.getState().ready);
  } catch (w) {
    if (s !== y) return;
    Y = !0, K = String(w?.message || w), m.dataset.motionState = "fallback", P(!1), console.warn("Night Moon unavailable; original illustration retained.", w);
  } finally {
    s === y && (I = !1, u && M());
  }
}
function at() {
  H = !0, y += 1, D?.abort(), D = null, I = !1, C?.dispose(), C = null, u?.dispose(), u = null, P(!1);
}
function ot() {
  H = !1, Y = !1, M();
}
m && O.get("moon") !== "legacy" && (new MutationObserver(M).observe(X, { attributes: !0, attributeFilter: ["data-theme", "data-bg"] }), document.addEventListener("visibilitychange", M), A.addEventListener("change", M), window.addEventListener("pagehide", at), window.addEventListener("pageshow", ot), window.__midoriMoonArt = {
  getState: () => ({
    loading: I,
    failed: Y,
    suspended: H,
    visible: N(),
    lastError: K,
    motionState: m.dataset.motionState || "idle",
    scene: u?.getState() ?? null
  })
}, M());
