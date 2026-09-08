const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
const ROOT=path.resolve(__dirname,'../..');
const BASE=process.env.MIDORI_BASE_URL||'http://127.0.0.1:5178';
const OUT=process.env.MIDORI_TEST_OUTPUT||path.join(ROOT,'test-results/public-smoke');
fs.mkdirSync(OUT,{recursive:true});
const token=(process.env.MIDORI_API_TOKEN||fs.readFileSync(path.join(ROOT,'.local/api-token'),'utf8')).trim();
const report={url:BASE,checks:[],modes:[],lyrics:[],pageErrors:[],networkFailures:[],externalRequests:[]};
async function post(route,body){
  const response=await fetch(BASE+route,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify(body)});
  const data=await response.json();
  assert(response.ok,`${route} HTTP ${response.status}: ${JSON.stringify(data)}`);
  return data;
}
(async()=>{
  const health=await fetch(BASE+'/health');assert(health.ok);report.health=await health.json();
  const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,args:['--no-sandbox','--enable-unsafe-swiftshader']});
  try{
    const p=await browser.newPage({viewport:{width:1440,height:1000}});p.setDefaultTimeout(25000);
    p.on('pageerror',e=>report.pageErrors.push(e.message));
    p.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ERR_ABORTED'))report.networkFailures.push({url:r.url(),error:r.failure()?.errorText});});
    p.on('request',r=>{if(!r.url().startsWith(BASE)&&/^https?:/.test(r.url()))report.externalRequests.push(r.url());});
    await p.goto(BASE+'/',{waitUntil:'domcontentloaded'});
    await p.waitForFunction(()=>document.querySelector('#bridgeStatus').textContent.includes('online'));
    assert.match(await p.title(),/Midori Companion Avatar 0\.1/);
    await p.waitForFunction(()=>document.querySelector('#avatarFrame').naturalWidth>0);
    await p.screenshot({path:path.join(OUT,'desktop-light.png')});
    report.checks.push('real static page, default art and SSE bridge loaded');
    await p.click('#unlockBtn');
    await p.click('#playBtn');
    await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>0);
    const samples=await p.evaluate(async()=>{
      const samples=[];
      for(let i=0;i<18;i++){samples.push({time:document.querySelector('#audio').currentTime,meter:document.querySelector('#meterFill').style.width,mouth:document.querySelector('#mouth').className});await new Promise(r=>setTimeout(r,70));}
      return samples;
    });
    assert(samples.some(s=>parseFloat(s.meter)>5),'actual analyser RMS response');
    assert(samples.some(s=>/mouth-(half|open)/.test(s.mouth)),'actual open or half-open mouth response');
    report.audioSamples=samples;
    await p.click('#stopBtn');
    assert(await p.locator('#audio').evaluate(e=>e.paused));
    report.checks.push('real builtin WAV playback, advancing time, RMS and mouth response, stop control');

    await p.waitForFunction(()=>!document.querySelector('#sampleSelect').disabled);
    assert.deepEqual(await p.locator('#sampleSelect option').allTextContents(),['测试音-提示音','测试语音-人声01','测试语音-人声02','测试语音-人声03']);
    for(const id of ['human-01','human-02','human-03']){
      await p.selectOption('#sampleSelect',id);await p.click('#samplePlayBtn');
      await p.waitForFunction(name=>document.querySelector('#audio').src.includes(`test-voice-${name}.${name==='human-03'?'mp3':'wav'}`)&&!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>0.15,id);
      const duration=await p.locator('#audio').evaluate(e=>e.duration);assert(duration>0&&Number.isFinite(duration));
      await p.click('#stopBtn');await p.waitForTimeout(150);
    }
    report.checks.push('all three voice samples selectable and actually playable with exact labels');

    const messageId=randomUUID(),text='公开接口实测：这是一条最终回复，不是模型生成测试。';
    const first=await post('/api/message',{text,request_id:messageId});
    await p.waitForFunction(t=>document.querySelector('#midoriReply').textContent.includes(t),text);
    const repeat=await post('/api/message',{text,request_id:messageId});
    assert.equal(first.event_id,repeat.event_id,'retry returns same event');
    report.checks.push('Agent final message appears through real HTTP → SSE; same request id deduplicated');

    const data=fs.readFileSync(path.join(ROOT,'audio/demo-tone.wav')).toString('base64');
    const upload=await post('/api/audio',{audio_base64:data,format:'wav',text:'原创测试音：实际文件上传',request_id:randomUUID()});
    await p.waitForFunction(()=>document.querySelector('#audio').src.includes('/media/')&&!document.querySelector('#audio').paused);
    await p.waitForFunction(()=>document.querySelector('#audio').currentTime>0.1);
    assert((await fetch(BASE+upload.audio_url)).ok,'published audio readable');
    await post('/api/audio',{audio_base64:data,format:'wav',text:'第二条排队测试音',request_id:randomUUID()});
    await post('/api/stop',{request_id:randomUUID()});
    await p.waitForFunction(()=>document.querySelector('#audio').paused&&document.querySelector('#generationStatus').textContent.includes('已清空'));
    await p.waitForTimeout(4500);
    assert(await p.locator('#audio').evaluate(e=>e.paused),'stopped queued audio must not restart');
    report.checks.push('uploaded WAV delivered and played; stop clears playing+queued speech, no late restart');

    // Newly opened tabs must not replay prior events or restore another tab's conversation.
    const fresh=await browser.newPage({viewport:{width:1280,height:900}});
    await fresh.goto(BASE+'/',{waitUntil:'domcontentloaded'});
    await fresh.waitForFunction(()=>document.querySelector('#bridgeStatus').textContent.includes('online'));
    await fresh.click('#unlockBtn');await fresh.waitForTimeout(700);
    assert(await fresh.locator('#audio').evaluate(e=>e.paused));
    assert(!(await fresh.locator('#midoriReply').textContent()).includes(text));
    await fresh.close();report.checks.push('new tab does not replay historical SSE/audio');

    await p.fill('#midoriInput','未配置聊天时的边界测试');await p.locator('#midoriInput').press('Enter');
    await p.waitForFunction(()=>document.querySelector('#midoriInputDock').dataset.busy==='false'&&/未|配置|连接|adapter|AGENT/i.test(document.querySelector('#midoriReply').textContent));
    const chat=await p.locator('#midoriReply').textContent();
    assert.match(chat,/未|配置|连接|adapter|AGENT/i);
    assert(!(await p.locator('#midoriInput').evaluate(e=>e.readOnly)));
    report.checks.push('unconfigured chat fails honestly and unlocks input');

    await p.click('#freezeBtn');
    for(const mode of ['green','white','black','swim','classic','lil','off']){
      await p.click('#swayBtn');
      await p.waitForFunction(()=>document.querySelector('#swayBtn').getAttribute('aria-busy')==='false');
      assert.equal(await p.locator('#avatar').getAttribute('data-sway-mode'),mode);
      if(mode!=='off')assert(await p.locator('#avatarSwayFrame').evaluate(e=>{if(e.tagName==='IMG')return e.naturalWidth>0;const svg=e.querySelector(':scope > svg')||e.querySelector('object')?.contentDocument?.documentElement;return svg?.localName==='svg'&&Boolean(svg.querySelector('path,image'))&&e.getBoundingClientRect().width>0;}),`loaded SVG artwork: ${mode}`);
      report.modes.push(mode);
    }
    report.checks.push('all seven avatar states retain original cycle and loaded assets');
    // Pick classic without resetting the original switch owner.
    for(let i=0;await p.locator('#avatar').getAttribute('data-sway-mode')!=='classic';i++){
      assert(i<8);await p.click('#swayBtn');await p.waitForFunction(()=>document.querySelector('#swayBtn').getAttribute('aria-busy')==='false');
    }
    await p.focus('#swayBtn');await p.keyboard.press('ArrowDown');await p.keyboard.press('Enter');
    await p.waitForFunction(()=>document.body.classList.contains('gachikoi-active'));
    await p.waitForTimeout(500);
    await p.screenshot({path:path.join(OUT,'classic-gachi.png')});
    const gachi=await p.locator('#avatarSwayFrame').evaluate(e=>({translate:getComputedStyle(e).translate,source:e.getAttribute('src')}));
    report.classicGachi=gachi;
    await p.keyboard.press('Escape');
    await p.waitForFunction(()=>!document.body.classList.contains('gachikoi-active'));
    await p.click('#modeToggleBtn');await p.waitForTimeout(1400);
    assert.equal(await p.locator('html').getAttribute('data-theme'),'night');
    await p.screenshot({path:path.join(OUT,'desktop-night.png')});
    await p.setViewportSize({width:390,height:844});await p.waitForTimeout(600);
    await p.screenshot({path:path.join(OUT,'narrow-night.png')});
    report.checks.push('classic Gachi entry/exit and day/night/narrow rendered without runtime errors');

    await p.setViewportSize({width:1440,height:1000});
    const music=p.locator('[data-family="music"]');
    await music.locator('.family-expander').press('Enter');
    await p.locator('.family-option[data-app="applemusic"]').press('Enter');await p.waitForTimeout(650);
    assert.equal(await music.getAttribute('data-family-current'),'applemusic');
    assert.equal(await music.locator('.site-icon-target').getAttribute('href'),'https://music.apple.com/');
    await music.locator('.family-expander').press('Enter');await p.locator('.family-option[data-app="spotify"]').press('Enter');await p.waitForTimeout(650);
    const labelBox=await music.locator('.site-icon-label').boundingBox();assert(labelBox);await p.mouse.click(labelBox.x+labelBox.width/2,labelBox.y+labelBox.height/2);
    await p.waitForFunction(()=>document.querySelector('#midoriInputDock').dataset.context==='spotify');
    assert.equal(await p.locator('#midoriInputDock').getAttribute('data-context'),'spotify');
    report.checks.push('floating music family swaps website target; label selects isolated Spotify context');

    const lyrics={request_id:randomUUID(),track:{id:'public-test-original',title:'Original Test Lines',artist:'Demo',album:'Offline test',durationMs:60000,artworkUrl:''},playback:{isPlaying:true,state:'playing',positionMs:3500,sampledAtMs:Date.now()},lyrics:{status:'ready',source:'original-demo',lines:Array.from({length:12},(_,i)=>({timeMs:i*4000,text:`原创验证文字 ${i+1}`}))}};
    await post('/api/lyrics/state',lyrics);
    await p.evaluate(()=>window.__midoriSpotifyLyricsDebug.wake());
    await p.waitForFunction(()=>document.querySelector('#spotifyLyricsLayer').dataset.active==='true');
    const modes=await p.evaluate(()=>window.__midoriSpotifyLyricsDebug.modes);
    assert.equal(modes.length,18);
    for(const item of modes){
      const key=`${item.engine}:${item.mode}`;
      await p.locator('#spotifyLyricsMenuToggle').click();
      await p.locator(`[data-mode-key="${key}"]`).click();
      await p.waitForFunction(k=>window.__midoriSpotifyLyricsDebug.snapshot().frameReady&&window.__midoriSpotifyLyricsDebug.snapshot().frameKey.includes(k),key);
      await p.waitForTimeout(550);
      const child=p.frames().find(f=>f.url().includes('/lyrics-stage/'));
      assert(child,`iframe for ${key}`);
      const content=await child.evaluate(()=>({elements:document.body.querySelectorAll('*').length,canvas:document.querySelectorAll('canvas').length,text:document.body.textContent.slice(0,180)}));
      assert(content.elements>2,`rendered content for ${key}`);
      report.lyrics.push({key,...content});
      if(['original:luminous','folia:monet','folia:cappella','folia:tempera'].includes(key))await p.screenshot({path:path.join(OUT,`lyrics-${item.engine}-${item.mode}.png`)});
    }
    report.checks.push('real published original lyrics state + all 18 mode selections/iframe readiness');
    await post('/api/lyrics/state',{...lyrics,request_id:randomUUID(),playback:{...lyrics.playback,isPlaying:false,state:'paused'}});
    await p.evaluate(()=>window.__midoriSpotifyLyricsDebug.wake());
    await p.waitForFunction(()=>document.querySelector('#spotifyLyricsLayer').dataset.active==='false');
    report.checks.push('paused published clock hides lyric stage');

    const source=await fetch(BASE+'/source/folia-source.zip');assert(source.ok,'AGPL corresponding source link served');
    assert.equal(Buffer.from(await source.arrayBuffer()).subarray(0,2).toString(),'PK');
    await p.goto(BASE+'/help.html');assert.match(await p.locator('body').textContent(),/AGPL-3.0/);
    report.checks.push('help page and downloadable corresponding Folia source available');
    assert.deepEqual(report.pageErrors,[]);
    report.status='PASS';
  }finally{
    fs.writeFileSync(path.join(OUT,'verification.json'),JSON.stringify(report,null,2));
    await browser.close();
  }
  console.log(JSON.stringify({status:report.status,checks:report.checks,avatarModes:report.modes.length,lyricModes:report.lyrics.length,pageErrors:report.pageErrors,networkFailures:report.networkFailures}));
})().catch(e=>{console.error(e);process.exitCode=1});
