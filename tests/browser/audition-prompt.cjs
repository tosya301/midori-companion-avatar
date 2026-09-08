// Music status is a synthetic fixture. Audio is the actual bundled recording.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const BASE=process.env.MIDORI_BASE_URL||'http://127.0.0.1:5178';
const OUT=process.env.MIDORI_QA_OUT||'/tmp/midori-audition-prompt-qa';
const KEY='midori.public.music-audition-dismissed.v1';
fs.mkdirSync(OUT,{recursive:true});
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||chromium.executablePath(),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 const report={checks:[],errors:[],posts:[],fixture:'Synthetic music state; real bundled audio playback; no Agent/account calls'};
 const offline={ok:true,connection:'offline',track:null,lyrics:{lines:[]}};
 const connected={ok:true,connection:'connected',track:null,playback:{isPlaying:false},lyrics:{lines:[]}};
 async function setup(initial=offline){
  const ctx=await b.newContext({viewport:{width:1440,height:1100}}),p=await ctx.newPage();
  let state=initial;
  p.on('pageerror',e=>report.errors.push(e.message));
  p.on('request',r=>{if(r.method()==='POST')report.posts.push(r.url())});
  await p.route('**/api/spotify/lyrics-state',r=>r.fulfill({json:state}));
  await p.route('**/events',r=>r.fulfill({contentType:'text/event-stream',body:': isolated test\n\n'}));
  await p.route('https://lrclib.net/**',r=>r.abort());
  await p.goto(BASE);
  await p.waitForFunction(()=>document.querySelector('#avatarFrame').naturalWidth>0);
  return {ctx,p,setState:s=>state=s};
 }
 const key=p=>p.evaluate(k=>localStorage.getItem(k),KEY);
 const label=p=>p.locator('[data-site="spotify"] .site-icon-label').click({force:true});
 const opened=p=>p.waitForFunction(()=>document.querySelector('#localAuditionDialog').open);
 const closed=async p=>{await p.waitForTimeout(300);assert.equal(await p.locator('#localAuditionDialog').evaluate(e=>e.open),false)};
 const manual=async p=>{await p.locator('#publicDebug').evaluate(e=>e.open=true);await p.click('#localAuditionOpen');await opened(p)};
 try{
  let t=await setup(),p=t.p;
  // Completing speech setup does not dismiss music onboarding.
  await p.evaluate(()=>localStorage.setItem('midori.public.agent-speech-played.v1','1'));await p.reload();
  await label(p);await opened(p);assert.equal(await key(p),null);
  await p.locator('#localAuditionDialog').screenshot({path:path.join(OUT,'prompt.png')});
  await p.click('#auditionCancel');await label(p);await opened(p);assert.equal(await key(p),null);
  await p.click('#auditionDismiss');assert.equal(await key(p),'1');await closed(p);
  await p.reload();await label(p);await closed(p);
  await manual(p);assert.equal(await p.locator('#midoriInputDock').getAttribute('data-context'),'spotify');
  await p.setViewportSize({width:390,height:844});
  const rect=await p.locator('#localAuditionDialog').boundingBox();assert(rect.x>=0&&rect.x+rect.width<=391);
  await p.locator('#localAuditionDialog').screenshot({path:path.join(OUT,'prompt-narrow.png')});
  await p.click('#auditionCancel');await t.ctx.close();
  report.checks.push('voice flag independent; cancel offers again; explicit dismissal survives reload; debug manual entry and narrow layout work');

  t=await setup();p=t.p;await label(p);await opened(p);await p.click('#auditionStart');
  await p.waitForFunction(k=>localStorage.getItem(k)==='1'&&document.querySelector('#localAuditionAudio').currentTime>.2,KEY);
  assert.equal(await p.evaluate(()=>localStorage.getItem('midori.public.agent-speech-played.v1')),null);
  await p.click('#auditionStop');await label(p);await closed(p);await p.reload();await label(p);await closed(p);
  await manual(p);await p.click('#auditionStart');await p.waitForFunction(()=>document.querySelector('#localAuditionAudio').currentTime>.2);
  await p.click('#auditionStop');await t.ctx.close();
  report.checks.push('real music playback remembers dismissal, no speech completion; stop/reload do not re-offer; manual replay still plays');

  t=await setup();p=t.p;await label(p);await opened(p);
  await p.evaluate(()=>{HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('Fixture autoplay rejection','NotAllowedError'))}});
  await p.click('#auditionStart');await p.waitForFunction(()=>!document.querySelector('#auditionDialogError').hidden);
  assert.equal(await key(p),null);await t.ctx.close();report.checks.push('rejected audio does not dismiss music prompt');

  t=await setup(connected);p=t.p;await label(p);
  await p.waitForFunction(k=>localStorage.getItem(k)==='1',KEY);await closed(p);
  await manual(p);await p.click('#auditionCancel');t.setState(offline);await p.reload();await label(p);await closed(p);
  await t.ctx.close();report.checks.push('connected paused service suppresses forever across offline/reload; manual entry bypasses connected status');

  t=await setup();p=t.p;await label(p);await opened(p);t.setState(connected);
  await p.evaluate(async()=>{const m=await import('/spotify-lyrics-stage.js');m.wakeSpotifyLyricsStage()});
  await p.waitForFunction(k=>localStorage.getItem(k)==='1',KEY);await closed(p);
  await manual(p);await p.evaluate(async()=>{const m=await import('/spotify-lyrics-stage.js');m.wakeSpotifyLyricsStage()});
  await p.waitForTimeout(400);assert.equal(await p.locator('#localAuditionDialog').evaluate(e=>e.open),true);
  await p.click('#auditionCancel');await p.locator('#publicDebug').locator('..').screenshot({path:path.join(OUT,'debug-entry.png')});
  await t.ctx.close();report.checks.push('later connected poll closes auto prompt but never closes explicitly opened manual prompt');
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.posts,[]);report.ok=true;
 }finally{await b.close();fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2))}
 console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
