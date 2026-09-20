import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {ExpressionQueue, AudioSession, smileSampler, SLEEP_AFTER_MS} from '../assets/sway/v4-e9/expression-queue.mjs';
import {smileSampler as legacySampler} from '../assets/sway/v4-r4/mouth-controller.mjs';
import {createTalkingSway} from '../assets/sway/v4-e9/sway-expressions.mjs';
const base = new URL('../assets/sway/v4-e9/', import.meta.url);
const json = async name => JSON.parse(await readFile(new URL(name,base),'utf8'));
const smileData = await json('smile-keyframes.json');
const mouthData = await json('mouth-rig.json');
const expressionData = await json('expression-rig.json');
const fastSmile = seconds => (seconds % 1 >= .2 && seconds % 1 < .6) ? 1 : 0;
function harness(slot = 3, sampleSmile = fastSmile) {
  let now = 0, state;
  const events = [];
  const q = new ExpressionQueue({sampleSmile, clock:()=>now, random:()=> (slot-.5)/3,
    eyes:(name,duration)=>events.push({type:'eyes',name,duration,now}),
    wink:()=>events.push({type:'wink',now,count:q.completedSmiles}),
    render:s=>{state=s;}});
  q.start(); q.step();
  return {q,events,get now(){return now;},get state(){return state;},
    step(ms=20,input={}, keepAwake=true) {
      now += ms; if(keepAwake)q.activity(now); state=q.step({now,...input}); return state;
    },
    run(ms,input={},keepAwake=true) { for(let remaining=ms;remaining>0;) {const dt=Math.min(20,remaining); this.step(dt,input,keepAwake);remaining-=dt;} return state; },
    until(predicate,input={}) { for(let i=0;i<20000;i++) {if(predicate(state))return state;this.step(20,input);} throw Error('condition not reached'); },
  };
}

test('retained sampler matches legacy authored cadence over two full cycles',()=>{
  const a=smileSampler(smileData), b=legacySampler(smileData);
  for(let ms=0;ms<129600;ms+=17)assert.equal(a(ms/1000),b(ms/1000));
});
for(const slot of [1,2,3]) {
  test(`one native wink after completed smile ${slot}; never before smile closes`,()=>{
    const h=harness(slot);
    h.until(s=>s.phase==='enter');
    const w=h.events.filter(e=>e.type==='wink');
    assert.equal(w.length,1);assert.equal(w[0].count,slot);
    assert.equal(h.state.completedSmiles,3);assert.equal(h.state.special,'round');
    assert.ok(h.now-w[0].now>=1680);
    assert.deepEqual(h.events.filter(e=>e.type==='eyes').map(e=>e.name),['neutral','neutral']);
  });
}
test('slot 3 waits for native wink return to settle before the special',()=>{
  const h=harness(3);h.until(s=>s.phase==='wink');
  h.run(2000,{winkSettled:false});assert.equal(h.state.phase,'wink');
  h.step(20,{winkSettled:true});assert.equal(h.state.phase,'enter');
});
test('round / round / smile repeats with FULL 8000/8000/6000 plateaus plus easing',()=>{
  const h=harness();
  for(const [special,hold] of [['round',8000],['round',8000],['smile',6000],['round',8000]]) {
    h.until(s=>s.phase==='enter');assert.equal(h.state.special,special);
    h.run(400);assert.equal(h.state.phase,'enter');assert.ok(h.state.mouth.weight<1);
    h.run(20);assert.equal(h.state.phase,'hold');assert.equal(h.state.mouth.weight,1);
    h.run(hold-20);assert.equal(h.state.phase,'hold');assert.equal(h.state.mouth.weight,1);
    h.run(20);assert.equal(h.state.phase,'exit');assert.equal(h.state.mouth.weight,1);
    h.run(400);assert.equal(h.state.phase,'exit');
    h.run(20);assert.equal(h.state.phase,'normal');assert.equal(h.state.completedSmiles,0);
  }
});
test('special hold waits for the actual expression entry ease to settle',()=>{
  const h=harness();h.until(s=>s.phase==='enter');
  h.run(1000,{expressionSettled:false});assert.equal(h.state.phase,'enter');
  h.step(20,{expressionSettled:true});assert.equal(h.state.phase,'hold');assert.equal(h.state.elapsed,0);
  h.run(7980);assert.equal(h.state.phase,'hold');h.run(20);assert.equal(h.state.phase,'exit');
});
test('actual 64.8s sampler produces three original closedSmile completions before a special',()=>{
  const h=harness(2,smileSampler(smileData));let sampledClosed=false;
  h.until(s=>{if(s.phase==='normal'&&s.mouth.weight>.9){assert.equal(s.mouth.pose,'closedSmile');sampledClosed=true;}return s.phase==='enter';});
  assert.ok(sampledClosed);assert.equal(h.state.completedSmiles,3);
  assert.equal(h.events.filter(e=>e.type==='wink').length,1);
  assert.ok(h.now>=64400);assert.ok(h.now<68000);
});
test('interrupted smile earns no credit; previous completed smiles survive speech',()=>{
  const h=harness(3);h.until(s=>s.completedSmiles===1);h.until(s=>s.phase==='normal'&&s.mouth.weight===1);
  h.run(500,{speaking:true,energy:.16});assert.equal(h.state.completedSmiles,1);assert.ok(h.state.mouth.level>.8);
  h.step(20);h.run(180);assert.equal(h.state.completedSmiles,1);
  h.run(500);assert.equal(h.state.completedSmiles,2);
});
test('speech interrupts full special hold; idle resume gets a new full plateau',()=>{
  const h=harness();h.until(s=>s.phase==='hold');h.run(7900);
  h.run(1000,{speaking:true,energy:.12});assert.equal(h.state.phase,'enter');assert.equal(h.state.elapsed,0);
  h.step(20);h.run(420);assert.equal(h.state.phase,'hold');
  h.run(7980);assert.equal(h.state.phase,'hold');h.run(20);assert.equal(h.state.phase,'exit');
});
test('sleepy boundary is exactly 180000ms even when hidden; no queue catch-up',()=>{
  const h=harness();h.step(SLEEP_AFTER_MS-1,{hidden:true},false);assert.equal(h.state.sleepy,false);assert.equal(h.state.completedSmiles,0);
  h.step(1,{hidden:true},false);assert.equal(h.state.sleepy,true);assert.equal(h.state.phase,'sleepy');
  assert.equal(h.events.at(-1).name,'sleepy');
  h.step(900000,{hidden:false},false);assert.equal(h.state.sleepy,true);assert.equal(h.state.mouth.pose,'sleepySmall');
});
test('sleepy persists during voice and after ending; speech is not activity',()=>{
  const h=harness();h.step(SLEEP_AFTER_MS,{},false);
  h.run(1000,{speaking:true,energy:.16},false);assert.equal(h.state.sleepy,true);assert.ok(h.state.mouth.level>.9);
  h.step(20,{},false);assert.equal(h.state.sleepy,true);assert.equal(h.state.mouth.pose,'sleepySmall');
  assert.equal(h.events.filter(e=>e.name==='neutral').length,1);
});
test('mouse wake is neutral first and resets count, wink lottery and full special cycle',()=>{
  const h=harness(3);h.until(s=>s.specialIndex===2);h.until(s=>s.phase==='wink');
  h.step(SLEEP_AFTER_MS,{},false);assert.equal(h.state.sleepy,true);
  h.q.random=()=>0;h.q.activity(h.now);h.step(0);
  assert.equal(h.events.at(-1).name,'neutral');assert.equal(h.events.at(-1).duration,0);
  assert.equal(h.state.phase,'normal');assert.equal(h.state.completedSmiles,0);
  assert.equal(h.state.winkDone,false);assert.equal(h.state.winkSlot,1);assert.equal(h.state.specialIndex,0);
});
test('mouse activity at expiry wakes/reset even before a sleeping frame was rendered',()=>{
  const h=harness();h.q.specialIndex=2;h.step(SLEEP_AFTER_MS,{},true);
  assert.equal(h.state.sleepy,false);assert.equal(h.state.specialIndex,0);assert.equal(h.state.completedSmiles,0);
});
test('hidden/reduced/gaps never credit unseen smiles; reduced keeps sleepy state',()=>{
  for(const input of [{hidden:true},{reduced:true},{idleAllowed:false}]) {
    const h=harness();h.run(300);h.run(10000,input);assert.equal(h.state.completedSmiles,0);
    h.step(20);h.run(180);assert.equal(h.state.completedSmiles,0);
  }
  const h=harness();h.run(300);h.step(64000);assert.equal(h.state.completedSmiles,0);
  h.step(SLEEP_AFTER_MS,{reduced:true},false);assert.equal(h.state.sleepy,true);assert.equal(h.state.mouth.pose,'rest');
  h.step(20,{},false);assert.equal(h.state.mouth.pose,'sleepySmall');
});
test('queue has no effects before start or after dispose',()=>{
  let calls=0;const q=new ExpressionQueue({sampleSmile:fastSmile,render:()=>calls++,eyes:()=>calls++});
  q.step({now:0});q.activity(0);assert.equal(calls,0);q.start(0);q.step({now:0});const before=calls;
  q.dispose();q.dispose();q.step({now:999999});q.activity(999999);q.start();assert.equal(calls,before);
});
test('audio play/pause/buffering/seeking/suspended graph are held, terminal events release idle',()=>{
  const a={paused:true,ended:false,seeking:false,readyState:4};const s=new AudioSession(a);
  assert.equal(s.state().idleAllowed,true);s.event('play');a.paused=false;
  assert.equal(s.state().speaking,true);s.event('waiting');assert.deepEqual(s.state(),{speaking:false,idleAllowed:false});
  s.event('playing');a.paused=true;s.event('pause');assert.deepEqual(s.state(),{speaking:false,idleAllowed:false});
  a.seeking=true;s.event('seeking');s.event('seeked');assert.equal(s.state().idleAllowed,false);
  a.seeking=false;a.paused=false;s.event('playing');assert.deepEqual(s.state({contextRunning:false}),{speaking:false,idleAllowed:false});
  assert.deepEqual(s.state({hidden:true}),{speaking:false,idleAllowed:false});
  for(const terminal of ['ended','error','abort','emptied']) {s.event('playing');s.event(terminal);s.event('pause');assert.equal(s.state().idleAllowed,true);}
});

test('pre-existing paused audio and terminal-event precedence do not leak idle credits',()=>{
  const a={paused:true,ended:false,seeking:false,readyState:4,currentTime:2};
  const s=new AudioSession(a);assert.deepEqual(s.state(),{speaking:false,idleAllowed:false});
  s.event('ended');s.event('waiting');s.event('pause');assert.equal(s.state().idleAllowed,true);
  s.event('play');assert.equal(s.state().idleAllowed,false);
});
test('native wink may finish under speech without a second wink or premature special',()=>{
  const h=harness(3);h.until(s=>s.phase==='wink');
  h.run(3000,{speaking:true,energy:.16});assert.equal(h.state.phase,'wink');assert.equal(h.state.completedSmiles,3);
  assert.equal(h.events.filter(e=>e.type==='wink').length,1);
  h.step(20);assert.equal(h.state.phase,'enter');assert.equal(h.state.special,'round');
});
test('public-safe provenance, root calibration and packaged asset hashes',async()=>{
  const provenance=await json('provenance.json');
  const svg=await readFile(new URL('avatar.svg',base),'utf8');
  const root=svg.match(/<svg\b[^>]*>/)[0];
  const legacy=(await readFile(new URL('../v4-r4/combined.svg',base),'utf8')).match(/<svg\b[^>]*>/)[0];
  for(const k of ['width','height','viewBox'])assert.equal(root.match(new RegExp(`\\b${k}="([^"]*)"`))[1],legacy.match(new RegExp(`\\b${k}="([^"]*)"`))[1]);
  for(const row of provenance.assets) {
    const bytes=await readFile(new URL(row.file,base));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256);
    assert.doesNotMatch(bytes.toString(),/\/Users\/|\/home\/|\/mnt\//);
  }
  assert.doesNotMatch(svg,/id="mg4-idle-mouth"/);
  for(const row of [...mouthData.layers,...expressionData.eyes.left,...expressionData.eyes.right,...expressionData.overlays])assert.ok(svg.includes(`id="${row.id}"`),row.id);
});

// Minimal DOM/event/rAF harness: exercises the actual packaged MouthRig and
// ExpressionRig plus the real adapter. No production hooks or fake controller.
class Target {
  constructor(){this.listeners=new Map();}
  addEventListener(n,f){if(!this.listeners.has(n))this.listeners.set(n,new Set());this.listeners.get(n).add(f);}
  removeEventListener(n,f){this.listeners.get(n)?.delete(f);}
  emit(n,fields={}){for(const f of [...(this.listeners.get(n)??[])])f({type:n,...fields});}
  count(){return [...this.listeners.values()].reduce((n,s)=>n+s.size,0);}
}
class Node {
  constructor(){this.dataset={};this.attrs=new Map();this.children=[];}
  getAttribute(k){return this.attrs.get(k)??null;}
  setAttribute(k,v){this.attrs.set(k,String(v));}
  removeAttribute(k){this.attrs.delete(k);}
  append(n){this.children.push(n);}
}
function fakeSvg() {
  const svg=new Node();svg.localName='svg';svg.nodes=new Map();svg.paused=true;
  const get=id=>{if(!svg.nodes.has(id))svg.nodes.set(id,new Node());return svg.nodes.get(id);};
  for(const row of [...mouthData.layers,...expressionData.eyes.left,...expressionData.eyes.right,...expressionData.overlays])get(row.id);
  if(mouthData.clip)get(mouthData.clip.path_id);
  for(const row of [...expressionData.eyes.left,...expressionData.eyes.right]) {
    const node=get(row.id);node.setAttribute('d',row.open);
    const animation={localName:'animate',remove(){node.children=node.children.filter(n=>n!==animation);}};node.append(animation);
  }
  svg.querySelector=selector=>svg.nodes.get(selector.slice(1))??null;
  svg.pauseAnimations=()=>{svg.paused=true;};svg.unpauseAnimations=()=>{svg.paused=false;};return svg;
}
test('real adapter lifecycle, single writer, pointer-only wake and full cleanup',async()=>{
  const keys=['document','window','DOMParser','matchMedia','requestAnimationFrame','cancelAnimationFrame','performance','fetch'];
  const saved=new Map(keys.map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));
  let now=0,next=1,energy=.16,context=true;const frames=new Map();const media=new Target();media.matches=false;
  const document=new Target();document.hidden=false;document.createElement=()=>new Node();document.importNode=()=>fakeSvg();
  const window=new Target();
  Object.assign(globalThis,{document,window,DOMParser:class {parseFromString(){return {querySelector:()=>null,documentElement:{localName:'svg'}};}},
    matchMedia:()=>media,requestAnimationFrame:f=>{const n=next++;frames.set(n,f);return n;},cancelAnimationFrame:n=>frames.delete(n),
    performance:{now:()=>now},fetch:async url=>{const text=await readFile(url,'utf8');return {ok:true,text:async()=>text,json:async()=>JSON.parse(text)};}});
  const audio=new Target();Object.assign(audio,{paused:true,ended:false,seeking:false,readyState:4});
  const make=()=>createTalkingSway({audio,readEnergy:()=>energy,contextRunning:()=>context,boundsSrc:'green.png'});
  const advance=(ms=20)=>{now+=ms;const batch=[...frames.values()];frames.clear();for(const f of batch)f(now);};
  try {
    const stale=await make();assert.equal(frames.size,0);assert.equal(media.count(),0);assert.equal(audio.count(),0);assert.equal(document.count(),0);
    stale.dispose();stale.start();assert.equal(frames.size,0);
    const adapter=await make();const svg=adapter.element.children[0];
    assert.equal(adapter.element.id,'avatarSwayFrame');assert.equal(adapter.element.className,'avatar-frame avatar-sway-frame is-active');
    assert.equal(adapter.element.dataset.boundsSrc,'green.png');
    adapter.start();adapter.start();assert.equal(frames.size,1);assert.equal(media.count(),2);assert.equal(document.count(),3);assert.equal(audio.count(),10);
    assert.equal(svg.paused,false);
    audio.paused=false;audio.emit('play');audio.emit('playing');for(let i=0;i<10;i++)advance();
    assert.equal(svg.dataset.mouthOwner,'speech');assert.ok(Number(svg.dataset.mouthOpen)>0);
    audio.paused=true;audio.emit('pause');advance();assert.equal(svg.dataset.controllerState,'held');assert.equal(svg.dataset.mouthPose,'rest');
    for(let i=0;i<200;i++)advance();assert.equal(svg.dataset.completedSmiles,'0');
    audio.emit('ended');advance();assert.equal(svg.dataset.controllerState,'idle');
    document.hidden=true;document.emit('visibilitychange');assert.equal(svg.paused,true);
    advance(SLEEP_AFTER_MS);document.hidden=false;document.emit('visibilitychange');
    assert.equal(svg.dataset.sleepy,'true');assert.equal(svg.dataset.expression,'sleepy');assert.equal(svg.dataset.mouthPose,'sleepySmall');
    window.emit('focus');document.emit('visibilitychange');assert.equal(svg.dataset.sleepy,'true');
    audio.paused=false;audio.emit('playing');for(let i=0;i<10;i++)advance();assert.equal(svg.dataset.expression,'sleepy');assert.equal(svg.dataset.mouthOwner,'speech');
    audio.paused=true;audio.emit('ended');advance();assert.equal(svg.dataset.mouthPose,'sleepySmall');
    document.emit('pointermove',{pointerType:'touch',isTrusted:true});assert.equal(svg.dataset.sleepy,'true');
    document.emit('pointermove',{pointerType:'mouse',isTrusted:false});assert.equal(svg.dataset.sleepy,'true');
    document.emit('pointerover',{pointerType:'mouse',isTrusted:true,relatedTarget:{}});assert.equal(svg.dataset.sleepy,'true');
    document.emit('pointerover',{pointerType:'mouse',isTrusted:true,relatedTarget:null});assert.equal(svg.dataset.sleepy,'false');assert.equal(svg.dataset.expression,'neutral');assert.equal(svg.dataset.completedSmiles,'0');
    advance();assert.equal(svg.dataset.expression,'neutral');assert.equal(svg.dataset.controllerState,'idle');assert.equal(svg.dataset.mouthPose,'rest');
    assert.equal(svg.dataset.specialIndex,'0');assert.ok(['1','2','3'].includes(svg.dataset.winkAt));
    media.matches=true;media.emit('change');advance();assert.equal(svg.paused,true);assert.equal(svg.dataset.mouthPose,'rest');
    advance(SLEEP_AFTER_MS);assert.equal(svg.dataset.sleepy,'true');assert.equal(svg.dataset.expression,'sleepy');
    assert.equal(svg.dataset.eyeOpenLeft,'0.7');
    media.matches=false;media.emit('change');advance();assert.equal(svg.dataset.expression,'sleepy');assert.equal(svg.dataset.mouthPose,'sleepySmall');
    window.emit('pagehide',{persisted:true});assert.equal(frames.size,1);
    window.emit('pagehide',{persisted:false});adapter.dispose();
    assert.equal(frames.size,0);assert.equal(media.count(),0);assert.equal(audio.count(),0);assert.equal(document.count(),0);assert.equal(window.count(),0);assert.equal(svg.paused,true);
    assert.equal(svg.querySelector('#'+expressionData.eyes.left[0].id).children.length,1);
    advance();assert.equal(frames.size,0);
  } finally {for(const [k,d] of saved)d?Object.defineProperty(globalThis,k,d):delete globalThis[k];}
});
