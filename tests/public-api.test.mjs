import test from 'node:test';
import assert from 'node:assert/strict';
import { publicFetch } from '../public-api.js';

globalThis.location = { href:'http://127.0.0.1:5178/', origin:'http://127.0.0.1:5178' };
const calls=[];
globalThis.fetch = (url,init) => { calls.push({url,init});return Promise.resolve('ok'); };

test('same-origin API POST gets CSRF header without a secret',async()=>{
  const source={method:'POST',headers:{'Content-Type':'application/json','X-Midori-Action':'launch-blender'},body:'{}'};
  await publicFetch('/api/chat/stream',source);
  const call=calls.at(-1);
  assert.equal(call.init.headers.get('X-Midori-Action'),'public-ui');
  assert.equal(call.init.headers.get('Authorization'),null);
  assert.equal(call.init.body,'{}');
  assert.equal(source.headers['X-Midori-Action'],'launch-blender');
});
test('read requests and remote requests never gain a write header',async()=>{
  await publicFetch('/api/capabilities');
  assert.equal(calls.at(-1).init.headers.has('X-Midori-Action'),false);
  await publicFetch('https://example.com/api/chat',{method:'POST'});
  assert.equal(calls.at(-1).init.headers.has('X-Midori-Action'),false);
});
test('AbortSignal and caller headers preserved',async()=>{
  const control=new AbortController();
  await publicFetch('/api/chat/stream',{method:'POST',signal:control.signal,headers:{Accept:'text/event-stream'}});
  assert.equal(calls.at(-1).init.signal,control.signal);
  assert.equal(calls.at(-1).init.headers.get('Accept'),'text/event-stream');
});
