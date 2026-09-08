import {createTimer,restore,settle,toggle,skip,progress,formatTime,duration,validSettings} from './timer.mjs?v=empty-title3';
import {TAU,clamp,angleAt,initialAngle,trackAngle,ringTime,parseDuration,parseRounds,fitPosition} from './geometry.mjs?v=seconds4';
export function mountTimer(root,{getDropRect,fadeMs=450}={}) {
const $=id=>root.getElementById(id);
const KEY='midori-pomodoro-state-v1', POS_KEY='midori-pomodoro-position-v1';
const HOLD_MS=450, CANCEL_DISTANCE=8, SHELL_SIZE=290;
const shell=$('clock'),face=$('face'),ring=$('ringHit');
let state;try{state=restore(localStorage.getItem(KEY),Date.now());}catch{state=createTimer();}
let editing=null,gesture=null,suppressClick=false,notice='',noticeUntil=0;
let interval=0,position=null,lastStatus='',widgetSize=SHELL_SIZE;
const HIDE_KEY='midori-pomodoro-hidden-v1';
let stowed=false,stowTimer=0,dropSerial=0,returnPosition=null;
try{const stored=JSON.parse(localStorage.getItem(HIDE_KEY));stowed=stored?.hidden===true;returnPosition=stored?.returnPosition??null;}catch{}
function persistHidden(){try{localStorage.setItem(HIDE_KEY,JSON.stringify({hidden:stowed,returnPosition}));}catch{}}
function completeStow(){clearTimeout(stowTimer);shell.hidden=true;shell.classList.remove('is-stowing');$('restoreClock').hidden=false;}
async function maybeStow(g){
  if(!getDropRect||stowed)return;
  const serial=++dropSerial,rect=shell.getBoundingClientRect();
  let target;try{target=await getDropRect();}catch{return;}
  if(serial!==dropSerial||gesture||editing||stowed||!target)return;
  if(rect.left>=target.right||rect.right<=target.left||rect.top>=target.bottom||rect.bottom<=target.top)return;
  returnPosition={x:g.startPosition.x,y:g.startPosition.y};
  stowed=true;persistHidden();shell.inert=true;root.activeElement?.blur();
  settle(state,Date.now());state.running=false;state.deadline=null;save();draw();
  shell.classList.add('is-stowing');
  // Same opacity / 7px blur / .78 saturation, 450ms ease as floating icons.
  // Unlike their respawn owner, only this clock's explicit restore button reopens it.
  stowTimer=setTimeout(completeStow,matchMedia('(prefers-reduced-motion: reduce)').matches?0:fadeMs);
}
function restoreClock(){
  if(!stowed)return;++dropSerial;clearTimeout(stowTimer);
  // Closing ends this run; reopening starts a fresh, stopped group with saved settings.
  state=createTimer(state.settings);save();stowed=false;persistHidden();
  if(Number.isFinite(returnPosition?.x)&&Number.isFinite(returnPosition?.y))place(returnPosition.x,returnPosition.y);else center();
  savePosition();shell.classList.remove('is-stowing');shell.hidden=false;shell.inert=false;$('restoreClock').hidden=true;draw();
}
$('restoreClock').addEventListener('click',restoreClock);

// Match production floating-icon glass width, not the label or link wrapper.
function minimumSize(){return 1.5*(innerWidth<=820?clamp(innerWidth*.13,46,58):clamp(innerWidth*.051,56,78));}
const modified=e=>e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;
const copyState=()=>JSON.parse(JSON.stringify(state));
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{/* Storage-disabled preview remains functional. */}}
function savePosition(){try{localStorage.setItem(POS_KEY,JSON.stringify({x:position.x,y:position.y,size:widgetSize}));}catch{}}
function bounds(){const v=window.visualViewport;return {left:v?.offsetLeft||0,top:v?.offsetTop||0,width:v?.width||innerWidth,height:v?.height||innerHeight};}
function place(x,y){widgetSize=clamp(widgetSize,minimumSize(),SHELL_SIZE);position=fitPosition(x,y,widgetSize,bounds());position.scale*=widgetSize/SHELL_SIZE;shell.style.transform=`translate(${position.x}px,${position.y}px) scale(${position.scale})`;shell.style.setProperty('--widget-scale',position.scale);}
function center(){const b=bounds();const fit=fitPosition(0,0,widgetSize,b);place(b.left+24,b.top+(b.height-fit.extent)/2);savePosition();}
function initializePosition(){try{const saved=JSON.parse(localStorage.getItem(POS_KEY));if(Number.isFinite(saved.x)&&Number.isFinite(saved.y)){if(Number.isFinite(saved.size))widgetSize=clamp(saved.size,minimumSize(),SHELL_SIZE);place(saved.x,saved.y);return;}}catch{}center();}
function announce(text){notice=text;noticeUntil=Date.now()+3500;}
function draw(){
  const before=state.phase+state.round;settle(state,Date.now());if(before!==state.phase+state.round)save();
  const moving=gesture?.active&&gesture.type==='ring';
  const running=moving?gesture.original.running:editing?editing.original.running:state.running;
  shell.dataset.phase=state.phase;shell.dataset.running=String(running);
  if(editing?.element!==$('phase'))$('phase').value=state.phase==='work'?state.settings.label:state.phase==='break'?(state.settings.breakLabel??'BREAK'):'DONE';
  if(editing?.element!==$('time'))$('time').value=formatTime(state.remainingMs);
  for(const el of [$('phase'),$('time'),$('rounds')])el.readOnly=state.phase==='done';
  $('accessibleTime').textContent=formatTime(state.remainingMs);
  if(editing?.element!==$('rounds'))$('rounds').value=`#${state.round}/${state.settings.rounds}`;
  // One remaining-time value drives both the visible ring and digits; no trailing tween.
  const fraction=progress(state),a=(1-fraction)*TAU;
  $('remaining').style.strokeDasharray=`${fraction} 1`;$('remaining').style.strokeDashoffset=String(-(1-fraction));$('remaining').style.opacity=fraction===0?'0':'1';
  $('ringHandle').setAttribute('cx',String(125+101*Math.sin(a)));$('ringHandle').setAttribute('cy',String(125-101*Math.cos(a)));
  ring.setAttribute('aria-valuemax',String(duration(state)/1000));ring.setAttribute('aria-valuenow',String(Math.ceil(state.remainingMs/1000)));ring.setAttribute('aria-valuetext',formatTime(state.remainingMs));ring.setAttribute('aria-disabled',String(state.phase==='done'));
  $('toggle').firstElementChild.textContent=running?'PAUSE':state.phase==='done'?'DONE':state.remainingMs===duration(state)?'START':'RESUME';
  $('toggle').setAttribute('aria-label',running?'暂停倒计时':'开始或继续倒计时');$('toggle').disabled=state.phase==='done';
  $('skip').textContent=state.phase==='work'?'切到休息':state.phase==='done'?'已完成':state.round===state.settings.rounds?'结束本轮':'下一轮专注';$('skip').disabled=state.phase==='done';
  const status=editing?'编辑中 · Enter 保存，Esc 撤销':moving?'沿圆环调时 · 松手后'+(gesture.original.running?'继续倒计时':'保持暂停'):gesture?.active?'拖动中 · 外壳不会越过页面边界':Date.now()<noticeUntil?notice:state.phase==='done'?'本组已完成':state.running?(state.phase==='work'?'正在专注':'休息一下'):state.remainingMs===duration(state)?'点击 START 开始'+(state.phase==='work'?'专注':'休息'):'已暂停';
  if(status!==lastStatus){$('status').textContent=status;lastStatus=status;}
}
function freezeInteraction(){settle(state,Date.now());const original=copyState();state.running=false;state.deadline=null;return original;}
function resumeInteraction(original){state.running=original.running;state.deadline=state.running?Date.now()+state.remainingMs:null;settle(state,Date.now());save();}
function beginEdit(element){
  ++dropSerial;
  if(gesture)finishGesture(false);
  if(element.readOnly)return;
  if(editing)finishEdit(true,true);
  draw();editing={element,original:freezeInteraction(),composing:false};element.setCustomValidity('');element.removeAttribute('aria-invalid');
  queueMicrotask(()=>{if(editing?.element===element)element.select();});draw();
}
function finishEdit(commit,fromBlur=false){
  if(!editing)return true;
  const edit=editing,el=edit.element;let value=el.value,error='';
  if(commit){
    if(el===$('phase')){if(value.length>32)error='标题最多 32 个字符';}
    else if(el===$('rounds')){if(!parseRounds(value,state.round))error='请输入总轮数（如 3）或当前/总轮数（如 2/3），范围 1–20';}
    else if(parseDuration(value)===null)error='请输入分钟或分:秒，例如 30 或 30:00；范围 00:00–180:00；秒数 60 及以上按 00 处理';
  }
  if(error&&!fromBlur){el.setCustomValidity(error);el.setAttribute('aria-invalid','true');el.reportValidity();return false;}
  editing=null;el.setCustomValidity('');el.removeAttribute('aria-invalid');
  if(!commit||error){state=edit.original;if(error)announce('未保存：'+error);}
  else if(el===$('phase')){state.settings[state.phase==='work'?'label':'breakLabel']=value;}
  else if(el===$('rounds')){const rounds=parseRounds(value,state.round);state.round=rounds.current;state.settings.rounds=rounds.total;}
  else {const ms=parseDuration(value);if(ms>0)state.settings[state.phase==='work'?'workMs':'breakMs']=ms;state.remainingMs=ms;}
  resumeInteraction(edit.original);draw();return true;
}
for(const el of [$('phase'),$('time'),$('rounds')]){
  el.addEventListener('focus',()=>beginEdit(el));
  el.addEventListener('input',()=>{el.setCustomValidity('');el.removeAttribute('aria-invalid');});
  el.addEventListener('compositionstart',()=>{if(editing)editing.composing=true;});
  el.addEventListener('compositionend',()=>{if(editing)editing.composing=false;});
  el.addEventListener('blur',()=>{if(editing?.element===el)finishEdit(true,true);});
  el.addEventListener('keydown',e=>{
    if(e.isComposing||editing?.composing)return;
    if(e.key==='Enter'){e.preventDefault();if(finishEdit(true))el.blur();}
    if(e.key==='Escape'){e.preventDefault();finishEdit(false);el.blur();}
  });
}
function updateRing(g,x,y){
  const rect=face.getBoundingClientRect(),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
  if(Math.hypot(x-cx,y-cy)<4)return; // A point at the center has no stable polar angle.
  const raw=angleAt(x,y,cx,cy);
  g.angle=g.lastRaw===null?initialAngle(raw,progress(state)):trackAngle(g.angle,g.lastRaw,raw);g.lastRaw=raw;
  state.remainingMs=ringTime(duration(state),g.angle);draw();
}
function moveGesture(g,x,y){
  if(g.type==='move')place(x-g.offsetX,y-g.offsetY);
  else if(g.type==='resize'){
    const b=bounds(),west=g.corner.includes('w'),north=g.corner.includes('n');
    const ax=g.startPosition.x+(west?g.startPosition.extent:0),ay=g.startPosition.y+(north?g.startPosition.extent:0);
    const max=Math.min(SHELL_SIZE,west?ax-b.left-8:b.left+b.width-8-ax,north?ay-b.top-8:b.top+b.height-8-ay);
    widgetSize=clamp(g.startPosition.extent+((west?-1:1)*(x-g.startX)+(north?-1:1)*(y-g.startY))/2,Math.min(minimumSize(),max),max);
    place(west?ax-widgetSize:ax,north?ay-widgetSize:ay);
  }else updateRing(g,x,y);
}
function startGesture(g){
  if(gesture!==g)return;
  g.active=true;shell.classList.remove('is-pending');
  if(g.type==='ring'){
    g.original=freezeInteraction();
    if(state.phase==='done'){finishGesture(false);return;}
    g.lastRaw=null;g.angle=0;shell.classList.add('is-scrubbing');
  }else shell.classList.add(g.type==='resize'?'is-resizing':'is-dragging');
  moveGesture(g,g.x,g.y);draw();
}
function finishGesture(commit){
  const g=gesture;if(!g)return;
  clearTimeout(g.timer);gesture=null;
  shell.classList.remove('is-pending','is-dragging','is-scrubbing','is-resizing');shell.removeAttribute('data-resize');
  if(g.active){
    suppressClick=true;
    if(g.type==='ring'&&g.original){if(!commit)state=g.original;resumeInteraction(g.original);}
    else if(g.type==='move'||g.type==='resize'){if(!commit){widgetSize=g.startSize;place(g.startPosition.x,g.startPosition.y);}savePosition();if(commit&&g.type==='move')void maybeStow(g);}
  }
  if(shell.hasPointerCapture(g.id))shell.releasePointerCapture(g.id);
  draw();
}
// Reveal inside the visible ring (including its stroke), not its wider scrub hitbox.
function updateControlHover(e){
  const rect=face.getBoundingClientRect(),track=root.querySelector('.track');
  const radius=track.r.baseVal.value+parseFloat(getComputedStyle(track).strokeWidth)/2;
  const x=(e.clientX-rect.left)*250/rect.width-125,y=(e.clientY-rect.top)*250/rect.height-125;
  shell.classList.toggle('is-face-hovered',!stowed&&!shell.inert&&Math.hypot(x,y)<=radius);
}
shell.addEventListener('pointerenter',updateControlHover);
shell.addEventListener('pointermove',updateControlHover);
shell.addEventListener('pointerleave',()=>shell.classList.remove('is-face-hovered'));
window.addEventListener('blur',()=>shell.classList.remove('is-face-hovered'));
shell.addEventListener('pointerdown',e=>{
  suppressClick=false;++dropSerial;
  if(stowed||shell.inert)return;
  if(gesture||e.isPrimary===false||e.button!==0||modified(e)||e.target.closest('input,button'))return;
  const handle=e.target.closest('[data-resize-corner]');const type=handle?'resize':e.target===ring?'ring':'move';if(type==='ring'&&state.phase==='done')return;
  // The click that ends inline editing must not arm a different gesture.
  if(editing){finishEdit(true,true);root.activeElement?.blur();e.preventDefault();return;}
  e.preventDefault();
  const g={id:e.pointerId,type,active:false,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,offsetX:e.clientX-position.x,offsetY:e.clientY-position.y,startPosition:{...position},startSize:widgetSize,corner:handle?.dataset.resizeCorner};
  gesture=g;shell.classList.add('is-pending');
  try{shell.setPointerCapture(e.pointerId);}catch{gesture=null;shell.classList.remove('is-pending');return;}
  if(type==='resize'){shell.dataset.resize=g.corner;startGesture(g);}else g.timer=setTimeout(()=>startGesture(g),HOLD_MS);
});
shell.addEventListener('pointermove',e=>{
  const g=gesture;if(!g||e.pointerId!==g.id)return;
  if(!g.active&&Math.hypot(e.clientX-g.startX,e.clientY-g.startY)>CANCEL_DISTANCE){finishGesture(false);return;}
  g.x=e.clientX;g.y=e.clientY;if(g.active){e.preventDefault();moveGesture(g,g.x,g.y);}
});
shell.addEventListener('pointerup',e=>{const g=gesture;if(!g||e.pointerId!==g.id)return;if(g.active)moveGesture(g,e.clientX,e.clientY);finishGesture(true);});
shell.addEventListener('pointercancel',e=>{if(gesture?.id===e.pointerId)finishGesture(false);});
shell.addEventListener('lostpointercapture',e=>{if(gesture?.id===e.pointerId)finishGesture(false);});
shell.addEventListener('contextmenu',e=>{if(!modified(e)&&!e.target.closest('input')){e.preventDefault();$('settings').click();}});
shell.addEventListener('click',e=>{if(suppressClick&&e.detail!==0){suppressClick=false;e.preventDefault();e.stopImmediatePropagation();}},{capture:true});
shell.addEventListener('keydown',e=>{
  if(editing||gesture||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.target===shell&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){
    e.preventDefault();const step=e.shiftKey?1:10;place(position.x+(e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0),position.y+(e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0));savePosition();
  }
  if(e.target===ring&&state.phase!=='done'&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
    e.preventDefault();settle(state,Date.now());const step=e.shiftKey?1000:60000;
    state.remainingMs=clamp(e.key==='Home'?0:e.key==='End'?duration(state):state.remainingMs+(['ArrowUp','ArrowRight'].includes(e.key)?step:-step),0,duration(state));
    state.deadline=state.running?Date.now()+state.remainingMs:null;settle(state,Date.now());save();draw();
  }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!e.isComposing&&!e.defaultPrevented&&gesture){e.preventDefault();finishGesture(false);}});
function beforeAction(){++dropSerial;if(gesture)finishGesture(false);if(editing)finishEdit(true,true);}
$('toggle').addEventListener('click',()=>{beforeAction();toggle(state,Date.now());save();draw();});
$('reset').addEventListener('click',()=>{beforeAction();state=createTimer(state.settings);save();draw();});
$('skip').addEventListener('click',()=>{beforeAction();skip(state,Date.now());save();draw();});
$('center').addEventListener('click',()=>{if(gesture)finishGesture(false);center();});
$('settings').addEventListener('click',()=>{beforeAction();const s=state.settings;$('label').value=s.label;$('breakLabel').value=s.breakLabel??'BREAK';$('work').value=s.workMs/60000;$('break').value=s.breakMs/60000;$('count').value=s.rounds;$('dialog').showModal();});
$('cancel').addEventListener('click',()=>$('dialog').close());
$('form').addEventListener('submit',e=>{
  e.preventDefault();const settings={label:$('label').value,breakLabel:$('breakLabel').value,workMs:Math.round(Number($('work').value)*60)*1000,breakMs:Math.round(Number($('break').value)*60)*1000,rounds:Number($('count').value)};
  if(!validSettings(settings)){announce('请填写有效标题、时长和轮数');return;}
  beforeAction();state=createTimer(settings);save();draw();$('dialog').close();
});
function resize(){if(gesture)finishGesture(false);place(position.x,position.y);savePosition();}
function cancelTransient(){++dropSerial;if(gesture)finishGesture(false);if(editing){const el=editing.element;finishEdit(false);el.blur();}}
function updateVisibility(){clearInterval(interval);if(document.hidden)cancelTransient();draw();if(!document.hidden)interval=setInterval(draw,100);}
window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);window.visualViewport?.addEventListener('scroll',resize);
window.addEventListener('blur',cancelTransient);document.addEventListener('visibilitychange',updateVisibility);
window.addEventListener('pagehide',()=>{cancelTransient();settle(state,Date.now());save();savePosition();clearInterval(interval);});window.addEventListener('pageshow',updateVisibility);
initializePosition();if(stowed){state=createTimer(state.settings);save();shell.inert=true;shell.hidden=true;$('restoreClock').hidden=false;}updateVisibility();
}
