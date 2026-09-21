import {MouthRig} from './companion-mouth.mjs';
import {ExpressionRig} from './companion-expressions.mjs';
import {ExpressionQueue,AudioSession,smileSampler} from '../v4-e9/expression-queue.mjs';
import {sampleSleepyCycle,sleepyCycleMs} from './sleepy-cycle.mjs';
import {installLatestWink,sleepyPainter} from './latest-eyes.mjs';
class HostEyes extends ExpressionRig {ensureFrame(){} applyMouth(){}}
async function asset(name,json=false){const r=await fetch(new URL(name,import.meta.url));if(!r.ok)throw Error(`Latest-three ${name}: ${r.status}`);return json?r.json():r.text()}
function parse(text){const doc=new DOMParser().parseFromString(text,'image/svg+xml');if(doc.querySelector('parsererror')||doc.documentElement.localName!=='svg')throw Error('Invalid latest-three SVG');const svg=document.importNode(doc.documentElement,true);svg.pauseAnimations();return svg}

// Keep the accepted queue intact. Only one complete SVG is mounted at a time:
// this preserves the supplied static smile exactly and avoids duplicate SVG IDs.
export async function createTalkingSway({audio,readEnergy,contextRunning,boundsSrc}){
 const [normalText,smileText,sleepText,referenceText,mouthData,eyeData,smileData]=await Promise.all([
  asset('milky-green-v4-talking.svg'),asset('smile.svg'),asset('asleep.svg'),asset('closed-reference.svg'),
  asset('mouth-rig.json',true),asset('expression-rig.json',true),asset('../v4-e9/smile-keyframes.json',true)]);
 const views={normal:{svg:parse(normalText)},smile:{svg:parse(smileText)},sleepy:{svg:parse(sleepText)}};
 const source=parse(referenceText),element=document.createElement('div');element.id='avatarSwayFrame';element.className='avatar-frame avatar-sway-frame is-active';element.setAttribute('aria-hidden','true');element.dataset.boundsSrc=boundsSrc;
 let active=views.normal,svg=active.svg,rig,expressions,queue,session,media,adapter,paintSleep;
 let started=false,disposed=false,frame=0,preset='neutral',sleepTime=0,lastMotion=0;
 const listeners=[];const on=(t,n,f)=>{t.addEventListener(n,f);listeners.push([t,n,f])};
 const put=(key,v)=>{v=String(v);if(svg.dataset[key]!==v)svg.dataset[key]=v};
 element.append(svg);
 function select(name){
  const next=views[name];if(next===active)return;
  const time=svg.getCurrentTime();svg.pauseAnimations();
  active=next;svg=next.svg;rig=next.mouth;next.weights=null;
  element.replaceChildren(svg);svg.pauseAnimations();svg.setCurrentTime(time);
  if(!media.matches&&!document.hidden)svg.unpauseAnimations();
 }
 function eyePreset(name,duration){
  preset=name;
  if(name==='sleepy'){sleepTime=0;expressions.setExpression('neutral',{duration:0});paintSleep(.7)}
  else expressions.setExpression(name,{duration});
 }
 function render(state){
  select(state.sleepy?'sleepy':preset==='smile'&&!expressions.transition&&!state.reduced?'smile':'normal');
  const mouth=state.mouth;
  if('level' in mouth){rig.setLevel(mouth.level);active.weights=null;put('mouthOwner','speech')}
  else{
   const weights=rig.poseNames.map(name=>(name==='rest'?1-mouth.weight:0)+(name===mouth.pose?mouth.weight:0));
   if(!active.weights||weights.some((v,i)=>Math.abs(v-active.weights[i])>.000001)){
    rig.cancel();rig.lastPose=mouth.weight>0?mouth.pose:'rest';rig.apply(weights);active.weights=weights;
   }
   put('mouthOwner',state.sleepy?'sleepy':state.idleAllowed?'idle':'held');
  }
  if(active===views.smile){put('expression','smile');put('eyeOpenLeft',0);put('eyeOpenRight',0)}
  else if(active===views.sleepy){put('expression','sleepy');put('sleepyCycleMs',sleepyCycleMs);put('sleepyCycleTime',sleepTime)}
  put('expressionSpeaking',state.speaking);put('queuePhase',state.phase);put('completedSmiles',state.completedSmiles);
  put('winkAt',state.winkSlot);put('winkSlot',state.winkSlot);put('winkDone',state.winkDone);put('special',state.special);put('specialIndex',state.specialIndex);put('sleepy',state.sleepy);
  put('controllerState',state.speaking?'speaking':state.sleepy?'sleepy':!state.idleAllowed?'held':state.phase==='normal'?'idle':state.phase==='wink'?'wink':state.special);
  put('reducedMotion',state.reduced);put('artRevision','latest-three');
 }
 function step(now=performance.now()){
  if(!started||disposed)return;
  const hidden=document.hidden,dt=Math.max(0,now-lastMotion);lastMotion=now;
  const status=session.state({hidden,contextRunning:contextRunning()});
  expressions.speaking=status.speaking;
  if(preset==='sleepy'){
   if(!hidden&&!media.matches&&dt<=250)sleepTime+=dt;
   paintSleep(media.matches?.7:sampleSleepyCycle(sleepTime).open);
  }else if(!hidden){
   if(media.matches){expressions.wink=null;expressions.transition=null;expressions.applyEyes({left:{open:1,smile:0},right:{open:1,smile:0}});expressions.publish()}
   else expressions.tick(now);
  }
  queue.step({now,...status,hidden,reduced:media.matches,energy:status.speaking?readEnergy():0,
   winkSettled:!expressions.wink&&!expressions.transition,expressionSettled:!expressions.transition});
 }
 function tick(now){frame=0;if(disposed)return;step(now);frame=requestAnimationFrame(tick)}
 function motion(){
  for(const v of Object.values(views)){v.mouth.reduced=media.matches;v.weights=null;v.svg.pauseAnimations()}
  expressions.reduced=media.matches;
  if(!media.matches&&!document.hidden)svg.unpauseAnimations();
  lastMotion=performance.now();step();
 }
 function mouse(e){if(!e.isTrusted||e.pointerType!=='mouse'||document.hidden)return;if(e.type==='pointerover'&&e.relatedTarget!=null)return;queue.activity();step()}
 function dispose(){
  if(disposed)return;disposed=true;cancelAnimationFrame(frame);listeners.forEach(([t,n,f])=>t.removeEventListener(n,f));listeners.length=0;
  queue?.dispose();adapter?.uninstall();
  for(const v of Object.values(views)){v.eyes?.dispose();v.mouth?.dispose();v.svg.pauseAnimations()}
 }
 return {element,start(){
  if(started||disposed)return;started=true;
  try{
   media=matchMedia('(prefers-reduced-motion: reduce)');
   for(const v of Object.values(views))v.mouth=new MouthRig(v.svg,mouthData,{respectReducedMotion:false});
   rig=active.mouth;
   expressions=views.normal.eyes=new HostEyes(views.normal.svg,views.normal.mouth,eyeData,{respectReducedMotion:false});
   adapter=installLatestWink(views.normal.svg,expressions,source);
   views.sleepy.eyes=new HostEyes(views.sleepy.svg,views.sleepy.mouth,eyeData,{respectReducedMotion:false});
   paintSleep=sleepyPainter(views.sleepy.svg,views.sleepy.eyes);
   session=new AudioSession(audio);queue=new ExpressionQueue({sampleSmile:smileSampler(smileData),render,eyes:eyePreset,wink:()=>expressions.play('wink'),transitionMs:eyeData.timing.transition_ms,winkMs:eyeData.timing.wink_ms});
   queue.start();
   for(const name of ['play','playing','pause','waiting','seeking','seeked','ended','error','abort','emptied'])on(audio,name,()=>{session.event(name);step()});
   on(document,'pointermove',mouse);on(document,'pointerover',mouse);on(document,'visibilitychange',motion);on(media,'change',motion);on(window,'pagehide',e=>{if(!e.persisted)dispose()});
   svg.setCurrentTime(0);motion();frame=requestAnimationFrame(tick);
  }catch(error){dispose();throw error}
 },dispose};
}
