const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const BASE=process.env.MIDORI_BASE_URL||'http://127.0.0.1:5178';
const OUT=process.env.MIDORI_QA_OUT||'/tmp/midori-public-pomodoro';fs.mkdirSync(OUT,{recursive:true});
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||chromium.executablePath(),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 const report={checks:[],pageErrors:[],timerConsoleErrors:[],timerHTTPFailures:[]};
 try{
  const ctx=await b.newContext({viewport:{width:1440,height:1000}}),p=await ctx.newPage();
  p.on('pageerror',e=>report.pageErrors.push(e.message));
  p.on('console',m=>{if(m.type()==='error'&&/pomodoro/i.test(m.text()))report.timerConsoleErrors.push(m.text())});
  p.on('response',r=>{if(r.url().includes('/pomodoro/')&&!r.ok())report.timerHTTPFailures.push({url:r.url(),status:r.status()})});
  await p.route('**/events',r=>r.fulfill({contentType:'text/event-stream',body:': isolated UI test\n\n'}));
  await p.route('**/api/gmail-unread*',r=>r.fulfill({json:{ok:false}}));
  await p.goto(BASE+'/?theme=light');
  await p.waitForFunction(()=>document.querySelector('#midoriPomodoro')?.shadowRoot?.querySelector('#clock'));
  const host=p.locator('#midoriPomodoro'),clock=host.locator('#clock'),icon=host.locator('#restoreClock');
  assert(await clock.isVisible());assert.equal(await icon.isVisible(),false);
  await clock.hover();await host.locator('#toggle').click();
  await p.waitForFunction(()=>document.querySelector('#midoriPomodoro').shadowRoot.querySelector('#time').value!=='60:00');
  await host.locator('#toggle').click();assert.equal(await clock.getAttribute('data-running'),'false');
  await host.locator('#reset').click();assert.equal(await host.locator('#time').inputValue(),'60:00');
  await p.screenshot({path:path.join(OUT,'first-open.png')});
  report.checks.push('fresh origin shows existing timer; real Start/countdown/Pause/Reset works');
  // Exact persisted hidden state fixture, as produced by closing the timer.
  await p.evaluate(()=>localStorage.setItem('midori-pomodoro-hidden-v1',JSON.stringify({hidden:true,returnPosition:null})));
  await p.reload();await icon.waitFor({state:'visible'});assert.equal(await clock.isVisible(),false);
  for(const narrow of [false,true]){
   if(narrow){await p.setViewportSize({width:390,height:844});await p.evaluate(()=>document.documentElement.dataset.theme='night')}
   const rect=await icon.boundingBox(),size=p.viewportSize();assert(rect.x>size.width-160&&rect.x+rect.width<=size.width&&rect.y>=0&&rect.y<80);
   await p.screenshot({path:path.join(OUT,narrow?'hidden-narrow.png':'hidden-desktop.png')});
  }
  await icon.click();await clock.waitFor({state:'visible'});assert.equal(await icon.isVisible(),false);assert.equal(await clock.getAttribute('data-running'),'false');
  assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('midori-pomodoro-hidden-v1')).hidden),false);
  await p.reload();await clock.waitFor({state:'visible'});
  report.checks.push('hidden state survives reload with visible top-right clock icon on desktop/night narrow; clicking restores stopped timer and persists visibility');
  assert.deepEqual(report.pageErrors,[]);assert.deepEqual(report.timerConsoleErrors,[]);assert.deepEqual(report.timerHTTPFailures,[]);report.ok=true;
 }finally{await b.close();fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2))}
 console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
