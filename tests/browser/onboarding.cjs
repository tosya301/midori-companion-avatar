// Isolated fixture proof: reused sample audio + synthetic agent event, NOT a real agent/TTS call.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'../..'), BASE=process.env.MIDORI_BASE_URL||'http://127.0.0.1:5181';
const OUT=process.env.MIDORI_TEST_OUTPUT||path.resolve(ROOT,'test-results/onboarding');fs.mkdirSync(OUT,{recursive:true});
const KEY='midori.public.agent-speech-played.v1';
const token=fs.readFileSync(path.join(ROOT,'.local/api-token'),'utf8').trim();
const report={url:BASE,fixture:'Synthetic agent event with existing sample bytes; no agent, TTS or account calls',checks:[],errors:[]};
async function post(route,body={}) { const r=await fetch(BASE+route,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({...body,request_id:crypto.randomUUID()})});const d=await r.json();assert(r.ok,JSON.stringify(d));return d; }
(async()=>{
 assert((await fetch(BASE+'/health')).ok);
 const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||chromium.executablePath(),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),p=await context.newPage();p.setDefaultTimeout(15000);
  p.on('pageerror',e=>report.errors.push(e.message));
  const completed=()=>p.evaluate(k=>localStorage.getItem(k),KEY);
  await p.goto(BASE);await p.waitForFunction(()=>!document.querySelector('#sampleSelect').disabled&&document.querySelector('#bridgeStatus').textContent.includes('online'));
  assert.match(await p.title(),/Midori Companion Avatar 0\.1/);assert.equal(await completed(),null);
  await p.screenshot({path:path.join(OUT,'before.png')});
  const controls=await p.locator('.controls button').allTextContents();
  await p.click('#unlockBtn');await p.click('#playBtn');await p.waitForFunction(()=>document.querySelector('#audio').currentTime>0.15);assert.equal(await completed(),null);await p.click('#stopBtn');
  const labels=await p.locator('#sampleSelect option').allTextContents();assert.equal(labels.length,4);
  for(const id of ['human-01','human-02','human-03']) {
   await p.selectOption('#sampleSelect',id);await p.click('#samplePlayBtn');await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>0.15);
   assert.equal(await completed(),null);if(id==='human-03'){assert.match(await p.locator('#sampleStatus').textContent(),/来源类型未注明/);report.mp3Duration=await p.locator('#audio').evaluate(e=>e.duration);}await p.click('#stopBtn');
  }
  report.checks.push('initial onboarding, demo tone and all three samples play without completion');
  const bytes=fs.readFileSync(path.join(ROOT,'audio/test-voice-human-03.mp3')).toString('base64');
  // Metadata alone, including real source names, cannot complete onboarding.
  await p.evaluate(()=>{window.fixtureOriginalPlay=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('Fixture rejected playback','NotAllowedError'));};});
  await post('/api/audio',{audio_base64:bytes,format:'mp3',audio_kind:'speech',text:'FIXTURE: rejected playback, not a real agent reply'});
  await p.waitForFunction(()=>document.querySelector('#generationStatus').textContent.includes('队列已暂停'));assert.equal(await completed(),null);
  await p.click('#stopBtn');await p.evaluate(()=>{HTMLMediaElement.prototype.play=window.fixtureOriginalPlay;});
  await p.locator('.recent-play').first().click();await p.waitForFunction(()=>document.querySelector('#audio').currentTime>0.15);assert.equal(await completed(),null);await p.click('#stopBtn');
  report.checks.push('rejected agent playback and recent-history replay cannot complete onboarding');
  for(const kind of ['unknown','test','music']) {
   await post('/api/audio',{audio_base64:bytes,format:'mp3',audio_kind:kind,text:'FIXTURE: non-speech upload'});
   await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>0.15);assert.equal(await completed(),null);await p.click('#stopBtn');
  }
  report.checks.push('unknown/test/music bridge events play but never complete onboarding');
  await post('/api/audio',{audio_base64:bytes,format:'mp3',audio_kind:'speech',text:'FIXTURE: simulated agent-origin speech, not an actual agent call'});
  await p.waitForFunction(k=>localStorage.getItem(k)==='1',KEY);await p.waitForFunction(()=>document.querySelector('#audio').currentTime>0.15);
  assert.equal(await p.locator('#publicIntro').isVisible(),false);assert.equal(await p.locator('#publicOnboarding').evaluate(e=>e.open),false);
  assert.equal(await p.locator('#publicOnboarding .sample-controls').count(),1);
  assert.deepEqual((await p.locator('.controls button').allTextContents()).slice(1),controls.slice(1));
  await p.screenshot({path:path.join(OUT,'collapsed.png')});
  await p.click('#publicDebug > summary');await p.click('#publicOnboarding > summary');assert(await p.locator('#sampleSelect').isVisible());assert(await p.locator('#publicIntro a').isVisible());
  await p.reload();await p.waitForFunction(()=>!document.querySelector('#sampleSelect').disabled);assert.equal(await completed(),'1');assert.equal(await p.locator('#publicIntro').isVisible(),false);
  await p.setViewportSize({width:390,height:844});await p.screenshot({path:path.join(OUT,'narrow.png')});
  const other=await context.newPage();const alternateOrigin=new URL(BASE);alternateOrigin.hostname=alternateOrigin.hostname==='localhost'?'127.0.0.1':'localhost';await other.goto(alternateOrigin.href);assert.equal(await other.evaluate(k=>localStorage.getItem(k),KEY),null);await other.close();
  report.checks.push('successful fixture speech collapses; native reopen, reload persistence and origin isolation verified; desktop/narrow screenshots');
  assert.deepEqual(report.errors,[]);report.labels=labels;report.ok=true;
 } finally {await browser.close();fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));}
 console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
