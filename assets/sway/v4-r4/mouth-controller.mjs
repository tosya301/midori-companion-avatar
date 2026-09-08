import { SpeechEnvelope } from './companion-mouth.mjs';
const clamp=v=>Math.max(0,Math.min(1,v));
const smooth=v=>v*v*(3-2*v);
const DEFAULT_IDLE_EXPRESSION=Object.freeze({pose:'round',every:3,holdMs:8000,easeMs:200,owner:'speech'});

// Single writer for mouth state. The renderer never owns audio or body clocks.
export class MouthController {
 constructor(renderer,{sampleSmile=()=>0,reduced=false,idleExpression=DEFAULT_IDLE_EXPRESSION}={}){
  this.r=renderer;this.sampleSmile=sampleSmile;this.reduced=reduced;
  this.restWeights=[...(renderer.restWeights??renderer.weights.map((_,i)=>+(i===0)))];
  this.idleExpression=idleExpression;this.idleState=idleExpression.pose==='cat'?'idleCat':'idleRound';
  this.envelope=new SpeechEnvelope();this.state='idle';this.last=null;this.idleStart=0;this.disposed=false;
  this.idleAllowed=true;this.completedSmiles=0;this.smileSeen=false;
  renderer.setSmile(0);renderer.show('idle');
 }
 begin(now){
  if(this.disposed||['speaking','toSpeech','roundToSpeech'].includes(this.state))return;
  this.envelope.reset();this.last=now;
  this.smileSeen=false;
  if(this.state==='idleRound'&&!this.reduced){
   this.state='roundToSpeech';this.start=now;this.startWeights=[...this.r.weights];
  }else if(this.state==='idleCat'){
   this.r.apply(this.restWeights);this.r.show('speech');this.state='speaking';
  }else if(this.r.owner==='idle'&&this.r.smile>0&&!this.reduced){
   this.state='toSpeech';this.start=now;this.startSmile=this.r.smile;
  }else{this.r.show('speech');this.state='speaking';}
 }
 hold(now){if(this.state===this.idleState){this.endIdleRound(now);return;}this.close(now,'held');}
 endIdleRound(now){
  // Pause only the smile schedule; authored sway/blink clocks keep running.
  this.idleStart+=now-this.roundStart;
  this.r.apply(this.restWeights);this.r.setSmile(0);this.r.show('idle');this.state='idle';this.smileSeen=false;
 }
 finish(now){this.close(now,'recovering');}
 close(now,target){
  if(this.disposed)return;
  // Ending a speech session outranks late pause/waiting DOM events.
  if(target==='held'&&(this.state==='recovering'||(this.state==='closing'&&this.closeTarget==='recovering')))return;
  // Repeated DOM events must not keep restarting the 100ms release.
  if(this.state==='closing'){this.closeTarget=target;return;}
  if(this.state==='idle'&&target==='held')return;
  this.envelope.reset();this.state='closing';this.start=now;this.closeTarget=target;
  this.startWeights=[...this.r.weights];this.startSmile=this.r.smile;this.closingOwner=this.r.owner;
 }
 step(now,energy=0){
  if(this.disposed)return;
  const dt=this.last===null?0:Math.max(0,Math.min(100,now-this.last));this.last=now;
  if(this.reduced){this.r.apply(this.restWeights);this.r.setSmile(0);}
  if(this.state==='idle'){
   const allowed=this.idleAllowed&&!this.reduced;
   const smile=allowed?this.sampleSmile(Math.max(0,now-this.idleStart)/1000):0;
   this.r.show('idle');this.r.setSmile(smile);
   if(!allowed)this.smileSeen=false;
   else if(smile>=.5)this.smileSeen=true;
   else if(smile===0&&this.smileSeen){
    this.smileSeen=false;this.completedSmiles++;
    if(this.completedSmiles>=this.idleExpression.every){
     this.completedSmiles=0;this.roundStart=now;this.state=this.idleState;
     this.r.apply(this.restWeights);this.r.show(this.idleExpression.owner);
    }
   }
  }else if(this.state===this.idleState){
   const elapsed=now-this.roundStart,{holdMs,easeMs,owner}=this.idleExpression;
   if(this.reduced||!this.idleAllowed||elapsed>=holdMs+2*easeMs)this.endIdleRound(now);
   else{
    const w=elapsed<easeMs?smooth(clamp(elapsed/easeMs))
     :elapsed<=easeMs+holdMs?1:1-smooth(clamp((elapsed-easeMs-holdMs)/easeMs));
    // A supplied cat drawing has different path topology: switch exclusively,
    // never crossfade/stack mouths or distort it into an invented morph.
    if(owner==='speech'){
     const pose=this.r.poseWeights?.(this.idleExpression.pose)??this.restWeights.map((_,i)=>+(i===3));
     this.r.apply(this.restWeights.map((v,i)=>v+(pose[i]-v)*w));
    }
   }
  }else if(this.state==='roundToSpeech'){
   const p=this.reduced?1:clamp((now-this.start)/120),e=smooth(p);
   this.r.apply(this.startWeights.map((v,i)=>v+(this.restWeights[i]-v)*e));
   if(p===1){this.r.apply(this.restWeights);this.state='speaking';}
  }else if(this.state==='toSpeech'){
   this.envelope.update(energy,dt);
   const p=this.reduced?1:clamp((now-this.start)/120);this.r.setSmile(this.startSmile*(1-smooth(p)));
   if(p===1){this.r.apply(this.restWeights);this.r.show('speech');this.state='speaking';}
  }else if(this.state==='speaking'){
   this.r.setLevel(this.reduced?0:this.envelope.update(energy,dt));
  }else if(this.state==='closing'){
   const p=clamp((now-this.start)/100),e=smooth(p);
   if(this.closingOwner==='idle')this.r.setSmile(this.reduced?0:this.startSmile*(1-e));
   else this.r.apply(this.reduced?this.restWeights:this.startWeights.map((v,i)=>v+(this.restWeights[i]-v)*e));
   if(p===1){this.r.apply(this.restWeights);this.r.setSmile(0);this.r.show('speech');this.state=this.closeTarget;this.recoverAt=now+400;}
  }else if(this.state==='recovering'&&now>=this.recoverAt){
   this.r.setSmile(0);this.r.show('idle');this.state='idle';this.idleStart=now;this.smileSeen=false;
  }
 }
 // Preview-only positioning within the authored idle cycle; not a new expression.
 seekIdle(seconds,now){
  if(this.disposed)return;this.envelope.reset();this.r.apply(this.restWeights);this.r.show('idle');this.state='idle';this.idleStart=now-seconds*1000;this.last=now;this.step(now,0);
 }
 dispose(){if(this.disposed)return;this.disposed=true;this.envelope.reset();this.r.apply(this.restWeights);this.r.setSmile(0);this.r.show('idle');this.state='disposed';}
}

function bezier(p,[x1,y1,x2,y2]){
 const coord=(t,a,b)=>3*(1-t)*(1-t)*t*a+3*(1-t)*t*t*b+t*t*t;
 let lo=0,hi=1;for(let i=0;i<24;i++){const t=(lo+hi)/2;if(coord(t,x1,x2)<p)lo=t;else hi=t;}
 return coord((lo+hi)/2,y1,y2);
}
export function smileSampler(data){
 const a=data.mouth_paths[data.sampler_path_index??1].animation_attributes,values=a.values.split(';');
 const states=values.map(d=>d===values[0]?0:1),times=a.keyTimes.split(';').map(Number),splines=a.keySplines.split(';').map(s=>s.trim().split(/[ ,]+/).map(Number));
 const duration=parseFloat(a.dur);
 return seconds=>{
  const t=((seconds%duration)+duration)%duration/duration;
  let i=0;while(i<times.length-2&&t>=times[i+1])i++;
  if(states[i]===states[i+1])return states[i];
  return states[i]+(states[i+1]-states[i])*bezier(clamp((t-times[i])/(times[i+1]-times[i])),splines[i]);
 };
}

const nums=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
export class SvgMouthRenderer {
 constructor(svg,rig,smileData,{idleId='mg4-idle-mouth',talkId='mt-mouth-rig',catId}={}){
  this.svg=svg;this.rig=rig;this.owner='idle';this.smile=0;
  this.idle=svg.querySelector('#'+idleId);this.talk=svg.querySelector('#'+talkId);this.cat=catId?svg.querySelector('#'+catId):null;
  if(!this.idle||!this.talk||(catId&&!this.cat))throw Error('Missing exclusive mouth group');
  this.layers=smileData.mouth_paths.slice(smileData.sampler_path_index??1).map((d,i)=>{
   const values=d.animation_attributes.values.split(';'),rest=values[0],smile=values.find(v=>v!==rest);
   const a=rest.match(nums).map(Number),b=smile.match(nums).map(Number);
   if(a.length!==b.length)throw Error('Idle topology mismatch');
   const element=svg.querySelector('#'+(d.runtime_element_id??'idle-'+['lip_shadow','left_corner','cavity'][i]));
   if(!element)throw Error('Missing idle mouth layer');
   return {element,rest,smile,a,b};
  });
 }
 get weights(){return this.rig.weights;}
 get restWeights(){return this.rig.poseNames.map(name=>+(name==='rest'));}
 poseWeights(name){return this.rig.poseNames.map(pose=>+(pose===name));}
 show(owner){
  // Preserve the first render, but do not invalidate large SVG groups each idle frame.
  if(this.renderedOwner===owner)return;this.renderedOwner=owner;
  this.owner=owner;this.idle.setAttribute('visibility',owner==='idle'?'visible':'hidden');this.talk.setAttribute('visibility',owner==='speech'?'visible':'hidden');
  this.cat?.setAttribute('visibility',owner==='cat'?'visible':'hidden');this.svg.dataset.mouthOwner=owner;
 }
 setSmile(weight){
  const w=clamp(weight);if(this.renderedSmile===w)return;this.renderedSmile=w;this.smile=w;
  for(const layer of this.layers){let i=0;const d=w===0?layer.rest:w===1?layer.smile:layer.rest.replace(nums,()=>{const n=layer.a[i]+(layer.b[i]-layer.a[i])*w;i++;return Number(n.toFixed(4)).toString();});layer.element.setAttribute('d',d);}
  this.svg.dataset.smile=String(w);
 }
 setLevel(v){this.rig.setLevel(v);}
 apply(w){this.rig.cancel();this.rig.apply(w);}
}
