const clamp = (v, min=0, max=1) => Math.max(min, Math.min(max, v));
const numberPattern = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
const sameArray = (a,b) => a.length===b.length && a.every((x,i)=>Math.abs(x-b[i])<0.0002);

export function rms(samples) {
  if (!samples.length) return 0;
  let sum=0; for(const x of samples) sum+=x*x;
  return Math.sqrt(sum/samples.length);
}

/** Audio energy only: this does not infer phonemes or rounded vowels. */
export class SpeechEnvelope {
  constructor({gateOpen=.012, gateClose=.008, ceiling=.16, holdMs=45, attackMs=22, releaseMs=45}={}) {
    Object.assign(this,{gateOpen,gateClose,ceiling,holdMs,attackMs,releaseMs}); this.reset();
  }
  reset(){ this.value=0; this.quietMs=0; this.gated=false; }
  update(energy,dtMs){
    const dt=clamp(dtMs,0,100);
    if(energy>=this.gateOpen){this.gated=true;this.quietMs=0;}
    else if(energy<this.gateClose){this.quietMs+=dt;if(this.quietMs>=this.holdMs)this.gated=false;}
    const raw=clamp((energy-this.gateClose)/(this.ceiling-this.gateClose));
    const target=this.gated ? Math.pow(raw,.6) : 0;
    const tau=target>this.value?this.attackMs:this.releaseMs;
    this.value+=(target-this.value)*(1-Math.exp(-dt/tau));
    if(!this.gated && this.value<.025)this.value=0;
    return this.value;
  }
}

/** Owns only the new mouth paths. Existing blink/sway SVG animations are untouched. */
export class MouthRig {
  constructor(svg,data,{respectReducedMotion=true}={}){
    this.svg=svg;this.data=data;this.poseNames=[...(data.pose_names??Object.keys(data.poses))];
    this.energyPoses=(data.energy_poses??[
      {name:'rest',level:0},{name:'small',level:.3},
      ...(data.poses.half?[{name:'half',level:.62}]:[]),{name:'open',level:1}
    ]).map(p=>({...p}));
    if(!this.poseNames.includes('rest')||new Set(this.poseNames).size!==this.poseNames.length||
      this.poseNames.some(name=>!data.poses[name]))throw new Error('Invalid mouth pose names');
    if(this.energyPoses.length<2||this.energyPoses[0].name!=='rest'||this.energyPoses[0].level!==0||
      this.energyPoses.at(-1).level!==1||new Set(this.energyPoses.map(p=>p.name)).size!==this.energyPoses.length||
      this.energyPoses.some((p,i)=>!this.poseNames.includes(p.name)||p.name==='round'||!Number.isFinite(p.level)||
        p.level<0||p.level>1||(i>0&&p.level<=this.energyPoses[i-1].level)))throw new Error('Invalid mouth energy poses');
    this.poseLevels=this.poseNames.map(name=>name==='round'?.65:this.energyPoses.find(p=>p.name===name)?.level??0);
    this.restWeights=this.poseNames.map(name=>Number(name==='rest'));
    this.clip=data.clip?svg.querySelector('#'+data.clip.path_id):null;
    if(data.clip&&!this.clip)throw new Error('Missing mouth clip');
    this.reduced=respectReducedMotion && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.layers=data.layers.map(layer=>{
      const element=svg.querySelector('#'+layer.id);
      if(!element)throw new Error('Missing mouth layer: '+layer.id);
      const states=this.poseNames.map(name=>data.poses[name][layer.key]);
      const template=states[0].d;
      const commands=template.replace(numberPattern,'#').replace(/[\s,]/g,'');
      const numbers=states.map(s=>s.d.match(numberPattern).map(Number));
      if(states.some(s=>s.d.replace(numberPattern,'#').replace(/[\s,]/g,'')!==commands))throw new Error('Mouth path topology mismatch: '+layer.key);
      return {key:layer.key,element,template,numbers,opacity:states.map(s=>s.opacity??1)};
    });
    this.weights=[...this.restWeights];this.frame=0;this.lastPose='rest';this.apply(this.weights);
  }
  apply(weights){
    if(this.reduced)weights=this.restWeights;
    for(const layer of this.layers){
      let i=0;
      const d=layer.template.replace(numberPattern,()=>{
        const value=layer.numbers.reduce((total,ns,k)=>total+ns[i]*weights[k],0);i++;
        return Number(value.toFixed(4)).toString();
      });
      layer.element.setAttribute('d',d);
      if(this.clip&&layer.key===this.data.clip.driven_by_layer)this.clip.setAttribute('d',d);
      layer.element.setAttribute('opacity',String(layer.opacity.reduce((s,x,k)=>s+x*weights[k],0)));
    }
    this.weights=[...weights];
    this.svg.dataset.mouthOpen=String(Number(weights.reduce((sum,w,i)=>sum+w*this.poseLevels[i],0).toFixed(3)));
    this.svg.dataset.mouthPose=this.reduced?'rest':this.lastPose;
  }
  cancel(){cancelAnimationFrame(this.frame);this.frame=0;}
  setPose(name,{duration=75}={}){
    const i=this.poseNames.indexOf(name);if(i<0)throw new Error('Unknown mouth pose: '+name);
    this.lastPose=name;const target=this.poseNames.map((_,j)=>i===j?1:0);this.transition(target,duration);
  }
  transition(target,duration){
    this.cancel();if(this.reduced||duration<=0){this.apply(target);return;}
    const start=[...this.weights],t0=performance.now();
    const tick=now=>{
      const p=clamp((now-t0)/duration),e=p*p*(3-2*p);
      this.apply(start.map((x,i)=>x+(target[i]-x)*e));
      if(p<1)this.frame=requestAnimationFrame(tick);else this.frame=0;
    };this.frame=requestAnimationFrame(tick);
  }
  /** Normalized, already smoothed speech energy, 0..1. ROUND requires a viseme hint. */
  setLevel(value){
    this.cancel();const level=clamp(Number(value)||0);
    const upperIndex=this.energyPoses.findIndex(p=>level<=p.level);
    const upper=this.energyPoses[upperIndex],lower=this.energyPoses[Math.max(0,upperIndex-1)];
    const blend=upper===lower?0:(level-lower.level)/(upper.level-lower.level);
    const weights=this.poseNames.map(()=>0);
    weights[this.poseNames.indexOf(lower.name)]+=1-blend;
    weights[this.poseNames.indexOf(upper.name)]+=blend;
    this.lastPose=upper.name;
    if(!sameArray(weights,this.weights))this.apply(weights);
    else this.svg.dataset.mouthPose=this.reduced?'rest':this.lastPose;
  }
  stop({duration=100}={}){this.lastPose='rest';this.transition(this.restWeights,duration);}
  dispose(){this.cancel();this.lastPose='rest';this.apply(this.restWeights);}
}

/** One instance per HTMLAudioElement lifetime. Recreate the element after dispose(). */
export class AudioLipSync extends EventTarget {
  constructor(audio,rig,{envelope={},context=null,strength=1}={}){
    super();this.audio=audio;this.rig=rig;this.context=context;this.ownsContext=!context;
    this.envelope=new SpeechEnvelope(envelope);this.strength=strength;this.analyser=null;this.source=null;
    this.samples=new Float32Array(1024);this.frame=0;this.last=0;this.destroyed=false;
    this.state='idle';this.visemes=[];this.visemeIndex=-1;this.session=0;this.listeners=[];
    this.on('play',()=>{
      const session=this.session;
      this.unlock().then(()=>{if(session===this.session&&!audio.paused&&!audio.ended&&audio.readyState>=3)this.begin();})
        .catch(error=>{if(session===this.session&&!this.destroyed){this.halt('error');this.publish('error',{message:error.message});}});
    });
    this.on('playing',()=>this.begin());
    for(const event of ['pause','ended','waiting','seeking','emptied','error','abort'])this.on(event,()=>this.halt(event));
    this.on('seeked',()=>{if(!audio.paused&&!audio.ended&&audio.readyState>=3)this.begin();});
    // "stalled" alone does not imply playback stopped: buffered audio may continue.
  }
  on(name,fn){this.audio.addEventListener(name,fn);this.listeners.push([name,fn]);}
  publish(state,detail={}){this.state=state;this.dispatchEvent(new CustomEvent('statechange',{detail:{state,...detail}}));}
  async unlock(){
    if(this.destroyed)throw new Error('AudioLipSync was disposed');
    if(!this.context)this.context=new AudioContext();
    if(!this.source){
      this.source=this.context.createMediaElementSource(this.audio);
      this.analyser=this.context.createAnalyser();this.analyser.fftSize=this.samples.length;
      this.source.connect(this.analyser);this.analyser.connect(this.context.destination);
      this.contextHandler=()=>{if(this.context.state!=='running')this.halt('suspended');else if(!this.audio.paused&&!this.audio.ended&&this.audio.readyState>=3)this.begin();};
      this.context.addEventListener('statechange',this.contextHandler);
    }
    if(this.context.state!=='running')await this.context.resume();
  }
  async play(){
    const session=++this.session;
    try{await this.unlock();if(session!==this.session||this.destroyed)return;await this.audio.play();}
    catch(error){if(session!==this.session||this.destroyed)return;this.halt('error');this.publish('error',{message:error.message});throw error;}
  }
  begin(){
    if(this.destroyed||!this.analyser||this.context.state!=='running')return;
    cancelAnimationFrame(this.frame);this.last=performance.now();this.publish('playing');
    const tick=now=>{
      if(this.destroyed||this.audio.paused||this.audio.ended||this.context.state!=='running'){this.halt('idle');return;}
      const dt=now-this.last;this.last=now;
      this.analyser.getFloatTimeDomainData(this.samples);
      const energy=rms(this.samples),level=clamp(this.envelope.update(energy,dt)*this.strength);
      if(this.visemes.length){
        // Follow playback time, never the arrival time of a TTS network event.
        const t=this.audio.currentTime;
        let i=this.visemes.length-1;while(i>=0&&this.visemes[i].time>t)i--;
        if(i!==this.visemeIndex){this.visemeIndex=i;this.rig.setPose(i>=0?this.visemes[i].pose:'rest',{duration:60});}
      }else this.rig.setLevel(level);
      this.dispatchEvent(new CustomEvent('level',{detail:{rms:energy,level,time:this.audio.currentTime}}));
      this.frame=requestAnimationFrame(tick);
    };this.frame=requestAnimationFrame(tick);
  }
  halt(reason='idle'){
    cancelAnimationFrame(this.frame);this.frame=0;this.envelope.reset();this.visemeIndex=-1;
    this.rig.stop({duration:100});this.publish(reason);
  }
  /** Remote URLs require CORS support. Same-origin and Blob URLs also work. */
  setSource(url,{visemes=[],crossOrigin='anonymous'}={}){
    this.interrupt();this.setVisemes(visemes);
    this.audio.crossOrigin=crossOrigin;this.audio.src=url;this.audio.load();
  }
  setVisemes(markers=[]){
    const copy=markers.map(m=>({time:Number(m.time),pose:m.pose}));
    if(copy.some(m=>!Number.isFinite(m.time)||m.time<0||!this.rig.poseNames.includes(m.pose)))throw new Error('Invalid viseme timestamp or pose');
    this.visemes=copy.sort((a,b)=>a.time-b.time);this.visemeIndex=-1;
  }
  interrupt(){++this.session;this.audio.pause();this.visemes=[];this.visemeIndex=-1;this.halt('interrupted');}
  async dispose(){
    if(this.destroyed)return;this.interrupt();this.destroyed=true;
    for(const [event,fn] of this.listeners)this.audio.removeEventListener(event,fn);
    if(this.contextHandler)this.context.removeEventListener('statechange',this.contextHandler);
    this.source?.disconnect();this.analyser?.disconnect();
    if(this.ownsContext&&this.context)await this.context.close();
    this.rig.dispose();
  }
}
