import { families, apps, storageKey, restoreOrder, swapSlot } from './catalog.mjs';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const instances = new Map();
let active = null;
let noteTimer;
const note = document.createElement('div');
note.className = 'family-shortcut-note';
note.role = 'status';
note.hidden = true;
document.body.append(note);
function notify(text) {
  clearTimeout(noteTimer); note.textContent = text; note.hidden = false;
  noteTimer = setTimeout(() => { note.hidden = true; }, 3600);
}
const modified = e => e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

function mount(family) {
  const group = document.querySelector(`.site-icon-link[data-site="${family.root}"]`);
  const main = group.querySelector('.site-icon-target');
  const art = group.querySelector('.site-icon-glass img');
  const label = group.querySelector('.site-icon-label');
  let stored = null;
  try { stored = localStorage.getItem(storageKey(family.id)); } catch {}
  let order = restoreOrder(family, stored);
  let busy = false, generation = 0;
  let ghosts = [], motions = [], entrances = [];
  group.classList.add('shortcut-family');
  group.dataset.family = family.id;
  const toggle = document.createElement('button');
  toggle.type = 'button'; toggle.className = 'family-expander';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', `family-${family.id}-options`);
  toggle.innerHTML = '<svg viewBox="0 0 10 14" fill="none" aria-hidden="true"><path d="m3 3 4 4-4 4" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const panel = document.createElement('div');
  panel.id = `family-${family.id}-options`; panel.className = 'family-options';
  panel.setAttribute('role', 'group'); panel.setAttribute('aria-label', `切换${family.name}应用`);
  panel.hidden = true; panel.inert = true;
  if ('showPopover' in panel) panel.popover = 'manual';
  const buttons = family.apps.slice(1).map((_, i) => {
    const button = document.createElement('button'); button.type = 'button';
    button.className = 'family-option'; button.dataset.slot = String(i + 1);
    const image = new Image(); image.alt = ''; image.draggable = false;
    button.append(image);
    button.addEventListener('click', e => {
      if (modified(e)) return;
      e.preventDefault(); e.stopPropagation(); void select(i + 1);
    });
    panel.append(button); return button;
  });
  group.append(toggle, panel);

  function render() {
    const item = apps[order[0]];
    group.dataset.familyCurrent = order[0];
    art.src = item.src; art.draggable = false;
    main.setAttribute('aria-label', item.launch ? '启动本地 Blender' : `打开 ${item.fullName || item.name}`);
    main.removeAttribute('title'); label.removeAttribute('title');
    if (item.launch) {
      main.removeAttribute('href'); main.setAttribute('role', 'button'); main.tabIndex = 0;
    } else {
      main.href = item.href; main.removeAttribute('role'); main.removeAttribute('tabindex');
    }
    label.textContent = item.name;
    label.setAttribute('aria-label', item.context ? `将下一条消息设为 ${item.name} 上下文` : item.launch ? '启动本地 Blender' : `${item.fullName || item.name}：尚未接入阿绿工具`);
    label.setAttribute('aria-pressed', String(Boolean(item.context) && document.querySelector('#midoriInputDock').dataset.context === item.context));
    group.setAttribute('aria-label', item.fullName || item.name);
    buttons.forEach((button, i) => {
      const id = order[i + 1], app = apps[id];
      button.dataset.app = id; button.dataset.name = app.fullName || app.name;
      button.setAttribute('aria-label', `切换为 ${app.fullName || app.name}`);
      button.firstElementChild.src = app.src;
    });
  }
  function measure() {
    // Use untransformed layout width; rotated bounding boxes double-count tilt.
    const side = parseFloat(getComputedStyle(art).width) * .4;
    group.style.setProperty('--family-mini-art', `${side}px`);
    group.style.setProperty('--family-mini-box', `${Math.max(28, side + 8)}px`);
  }
  function place() {
    measure();
    group.style.setProperty('--family-shift-y', '0px');
    const r = group.getBoundingClientRect();
    const width = parseFloat(getComputedStyle(group).getPropertyValue('--family-mini-box')) + 12;
    group.dataset.familySide = r.right + width + 8 > innerWidth && r.left > width + 8 ? 'left' : 'right';
    if (panel.popover) {
      const box = main.getBoundingClientRect();
      const x = group.dataset.familySide === 'left' ? r.left - panel.offsetWidth - 3 : r.right + 3;
      const y = box.top + box.height / 2 - panel.offsetHeight / 2;
      panel.style.setProperty('--family-menu-x', `${Math.max(8, Math.min(innerWidth - panel.offsetWidth - 8, x))}px`);
      panel.style.setProperty('--family-menu-y', `${Math.max(8, Math.min(innerHeight - panel.offsetHeight - 8, y))}px`);
      return;
    }
    const p = panel.getBoundingClientRect();
    const shift = p.top < 8 ? 8 - p.top : p.bottom > innerHeight - 8 ? innerHeight - 8 - p.bottom : 0;
    group.style.setProperty('--family-shift-y', `${shift}px`);
  }
  function clearMotion() {
    [...motions, ...entrances].forEach(a => a.cancel()); motions = []; entrances = [];
    ghosts.forEach(g => g.remove()); ghosts = [];
    art.style.visibility = ''; buttons.forEach(b => { b.firstElementChild.style.visibility = ''; });
    panel.classList.remove('is-swapping'); busy = false; group.dataset.familyBusy = 'false';
  }
  function close({ focus = false } = {}) {
    generation++; clearMotion();
    if (panel.matches(':popover-open')) panel.hidePopover();
    panel.hidden = true; panel.inert = true; group.dataset.familyOpen = 'false';
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', `展开其他${family.name}应用`);
    group.dispatchEvent(new CustomEvent('family-state', { detail: { open: false } }));
    if (active === api) active = null;
    if (focus) toggle.focus({ preventScroll: true });
  }
  function open({ focus = false } = {}) {
    if (busy || group.classList.contains('is-dragging')) return;
    if (active && active !== api) active.close();
    clearMotion(); active = api;
    panel.hidden = false; panel.inert = false; group.dataset.familyOpen = 'true';
    if (panel.popover && !panel.matches(':popover-open')) panel.showPopover();
    toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', `收起其他${family.name}应用`);
    group.dispatchEvent(new CustomEvent('family-state', { detail: { open: true } })); place();
    if (!reduced.matches) entrances = buttons.map((button, i) => button.animate([
      { opacity: 0, transform: `translateX(${group.dataset.familySide === 'left' ? 10 : -10}px) scale(.78)` },
      { opacity: 1, transform: 'translateX(0) scale(1)' },
    ], { duration: 220, delay: i * 30, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
    if (focus) buttons[0].focus({ preventScroll: true });
  }
  function fly(src, from, to) {
    const image = new Image(); image.src = src; image.className = 'family-swap-ghost';
    Object.assign(image.style, { left: `${from.x}px`, top: `${from.y}px`, width: `${from.width}px`, height: `${from.height}px` });
    document.body.append(image); ghosts.push(image);
    if ('showPopover' in image) { image.popover = 'manual'; image.showPopover(); }
    const animation = image.animate([
      { transform: 'translate(0,0) scale(1)' },
      { transform: `translate(${to.x - from.x}px,${to.y - from.y}px) scale(${to.width / from.width},${to.height / from.height})` },
    ], { duration: 380, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
    motions.push(animation); return animation.finished.catch(() => {});
  }
  async function select(index) {
    if (busy || panel.hidden) return;
    if (window.midoriFamilyCanSwitch?.(group) === false) { notify(group.dataset.launchState === 'pending' ? '正在确认 Blender 启动结果，请稍后再切换。' : '阿绿正在回复，结束后再切换应用。'); return; }
    busy = true; group.dataset.familyBusy = 'true';
    const token = ++generation;
    const next = apps[order[index]], image = new Image(); image.src = next.src;
    let timeout;
    try {
      await Promise.race([image.decode(), new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('Image timeout')), 6000); })]);
    } catch {
      if (token === generation) { clearMotion(); notify('图标加载失败，保留当前应用，请稍后重试。'); }
      return;
    } finally { clearTimeout(timeout); }
    if (token !== generation) return;
    // Decode yields: a chat turn or Blender launch can start while the icon loads.
    // Recheck the ownership barrier immediately before changing order/context.
    if (window.midoriFamilyCanSwitch?.(group) === false) {
      clearMotion();
      notify(group.dataset.launchState === 'pending' ? '正在确认 Blender 启动结果，请稍后再切换。' : '阿绿正在回复，结束后再切换应用。');
      return;
    }
    entrances.forEach(a => a.cancel()); entrances = [];
    const previous = order[0], oldSrc = art.src;
    const from = art.getBoundingClientRect(), to = buttons[index - 1].firstElementChild.getBoundingClientRect();
    order = swapSlot(order, index); render();
    try { localStorage.setItem(storageKey(family.id), JSON.stringify(order)); } catch {}
    group.dispatchEvent(new CustomEvent('family-changed', { detail: { previous, current: order[0] } }));
    if (reduced.matches) { close({ focus: true }); return; }
    art.style.visibility = 'hidden'; buttons[index - 1].firstElementChild.style.visibility = 'hidden';
    panel.classList.add('is-swapping');
    await Promise.all([fly(next.src, to, from), fly(oldSrc, from, to)]);
    if (token !== generation) return;
    clearMotion(); await new Promise(resolve => setTimeout(resolve, 130));
    if (token === generation) close({ focus: true });
  }
  for (const control of [toggle, panel]) control.addEventListener('pointerdown', e => e.stopPropagation());
  toggle.addEventListener('click', e => {
    if (modified(e)) return;
    e.preventDefault(); e.stopPropagation(); panel.hidden ? open() : close();
  });
  toggle.addEventListener('keydown', e => {
    if (!modified(e) && ['ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); open({ focus: true }); }
  });
  panel.addEventListener('keydown', e => {
    if (!modified(e) && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault(); const i = buttons.indexOf(document.activeElement);
      buttons[(i + (e.key === 'ArrowDown' ? 1 : buttons.length - 1)) % buttons.length].focus();
    }
  });
  main.addEventListener('keydown', e => {
    if (apps[order[0]].launch && !modified(e) && ['Enter', ' '].includes(e.key)) { e.preventDefault(); main.click(); }
  });
  label.addEventListener('click', e => {
    const item = apps[order[0]];
    if (item.context || item.launch || modified(e)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    notify(`${item.fullName || item.name} 尚未接入阿绿工具；点击上方大图标打开网站。`);
  }, true);
  main.addEventListener('click', () => close());
  group.addEventListener('focusout', () => setTimeout(() => { if (!group.contains(document.activeElement)) close(); }, 0));
  new MutationObserver(() => {
    if (!panel.hidden && (group.classList.contains('is-dragging') || group.classList.contains('is-respawning'))) close();
  }).observe(group, { attributes: true, attributeFilter: ['class'] });
  new ResizeObserver(measure).observe(art);
  const api = { group, toggle, open, close, measure, getOrder: () => [...order] };
  render(); close();
  group.dispatchEvent(new CustomEvent('family-changed', { detail: { previous: family.root, current: order[0] } }));
  return api;
}
for (const family of families) instances.set(family.id, mount(family));
document.addEventListener('pointerdown', e => { if (active && !active.group.contains(e.target)) active.close(); });
document.addEventListener('keydown', e => {
  if (active && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); active.close({ focus: true }); }
}, true);
window.addEventListener('resize', () => { active?.close(); instances.forEach(instance => instance.measure()); });
window.addEventListener('blur', () => active?.close());
document.addEventListener('visibilitychange', () => { if (document.hidden) active?.close(); });
reduced.addEventListener('change', () => active?.close());
new MutationObserver(() => active?.close()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
new MutationObserver(() => active?.close()).observe(document.querySelector('#siteIconDock'), { attributes: true, attributeFilter: ['data-collapsed', 'inert', 'aria-hidden'] });
// Read-only/normal-control preview helper, not a second copy of the interaction state.
window.midoriShortcutFamilies = {
  open(id) { const item = instances.get(id); item?.open(); item?.toggle.focus({ preventScroll: true }); },
  state() { return families.map(family => ({ id: family.id, order: instances.get(family.id).getOrder() })); },
};
