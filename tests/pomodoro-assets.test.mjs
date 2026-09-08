import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

const base = new URL('../assets/pomodoro/', import.meta.url);
test('public Pomodoro distribution includes fetched templates and required controls', () => {
  const integration = readFileSync(new URL('integration.mjs', base), 'utf8');
  const urls = [...integration.matchAll(/new URL\('([^']+)'/g)].map(m => new URL(m[1], base));
  assert(urls.length >= 2);
  for (const url of urls) assert(existsSync(url), `Missing runtime template: ${url.pathname}`);
  const html = readFileSync(new URL('widget.html', base), 'utf8');
  for (const id of ['clock', 'restoreClock', 'toggle', 'reset', 'time', 'ringHit']) {
    assert(html.includes(`id="${id}"`), `Missing timer control: ${id}`);
  }
});
