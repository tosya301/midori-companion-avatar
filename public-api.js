/** Same-origin browser writes only. Provider credentials never enter this module. */
export function publicFetch(input, init = {}) {
  const url = new URL(input, location.href);
  const headers = new Headers(init.headers || {});
  const method = String(init.method || 'GET').toUpperCase();
  if (url.origin === location.origin && url.pathname.startsWith('/api/') && !['GET', 'HEAD'].includes(method)) {
    headers.set('X-Midori-Action', 'public-ui');
  }
  return fetch(input, { ...init, headers });
}
