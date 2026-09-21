const exClamp = x => Math.max(0, Math.min(1, x));
const exEase = x => { x=exClamp(x); return x*x*(3-2*x); };
const exNumbers = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
const exMix = (a,b,t) => a+(b-a)*t;
const exRGB = s => s.startsWith('#') ? [1,3,5].map(i=>parseInt(s.slice(i,i+2),16)) : s.match(/\d+/g).map(Number);
function exSample(phase,times,values) {
  const i=times.findIndex(t=>phase<=t);
  if(i<=0)return values[0];
  return exMix(values[i-1],values[i],exEase((phase-times[i-1])/(times[i]-times[i-1])));
}
const exBoth = (open=1,smile=0) => ({left:{open,smile},right:{open,smile}});
function exBlend(a,b,p) {
  return Object.fromEntries(['left','right'].map(side=>[side,{
    open:exMix(a[side].open,b[side].open,p),smile:exMix(a[side].smile,b[side].smile,p)
  }]));
}

/** Eyes remain SVG paths; fixed iris artwork, glasses and refined skin never deform.
 * Use setSpeaking(true) before AudioLipSync starts, false after it halts.
 * Sides refer to the viewer. Neutral retains the original blink timing and sway.
 */
export class ExpressionRig {
  constructor(svg,mouthRig,data,{respectReducedMotion=true}={}) {
    if(!svg || !mouthRig || !data?.eyes)throw new Error('ExpressionRig needs SVG, MouthRig and expression data');
    if(!mouthRig.poseNames.includes('closedSmile')||!mouthRig.poseNames.includes('smileReference')||!mouthRig.poseNames.includes('sleepySmall'))throw new Error('Load expression mouth-rig.json before ExpressionRig');
    this.svg=svg;this.mouth=mouthRig;this.data=data;this.timing=data.timing;
    this.name='neutral';this.speaking=false;this.disposed=false;this.frame=0;
    this.origin=performance.now();this.started=this.origin;this.lastEyes=exBoth();this.lastApplied={};
    this.media=matchMedia('(prefers-reduced-motion: reduce)');this.respectReducedMotion=respectReducedMotion;
    this.reduced=respectReducedMotion&&this.media.matches;this.saved=[];this.rows={};
    this.overlays=(data.overlays??[]).map(row=>{
      const element=svg.querySelector('#'+row.id);if(!element)throw new Error('Missing expression overlay: '+row.id);
      return {...row,element,originalOpacity:element.getAttribute('opacity')};
    });
    // Validate everything before taking ownership of any SVG animation.
    for(const side of ['left','right']) {
      this.rows[side]=data.eyes[side].map(row=>{
        const element=svg.querySelector('#'+row.id);
        if(!element)throw new Error('Missing expression layer: '+row.id);
        const geometry=['open','closed','smile'].map(k=>row[k].match(exNumbers).map(Number));
        const topology=s=>s.replace(exNumbers,'#').replace(/[\s,]/g,'');
        if(geometry.some(v=>v.length!==geometry[0].length)||topology(row.open)!==topology(row.closed)||topology(row.open)!==topology(row.smile))throw new Error('Eye path topology mismatch: '+row.id);
        return {...row,element,geometry,colors:row.fill?.map(exRGB)};
      });
    }
    for(const rows of Object.values(this.rows))for(const row of rows) {
      const attributes=Object.fromEntries(['d','fill','stroke-width'].map(k=>[k,row.element.getAttribute(k)]));
      const animations=[...row.element.children].filter(e=>e.localName==='animate');
      this.saved.push({element:row.element,attributes,animations});
      animations.forEach(e=>e.remove());
    }
    this.onMotion=()=>{
      this.reduced=this.respectReducedMotion&&this.media.matches;
      if(this.respectReducedMotion)this.mouth.reduced=this.reduced;
      if(this.reduced){this.wink=null;this.transition=null;this.applyEyes(exBoth());this.mouth.stop({duration:0});}
      else this.applyMouth(240);
      this.ensureFrame();
    };
    this.media.addEventListener('change',this.onMotion);
    this.applyEyes(exBoth());this.applyMouth(0);this.ensureFrame();
  }
  assertLive(){if(this.disposed)throw new Error('ExpressionRig was disposed');}
  ensureFrame(){if(!this.frame&&!this.disposed)this.frame=requestAnimationFrame(t=>this.tick(t));}
  targetEyes(now) {
    if(this.name==='smile')return exBoth(0,1);
    if(this.name==='sleepy') {
      const t=((now-this.started)%this.timing.sleepy_cycle_ms)/this.timing.sleepy_cycle_ms;
      return exBoth(exSample(t,this.timing.sleepy_times,this.timing.sleepy_openness));
    }
    const t=((now-this.origin)%10800)/10800;
    const open=1-exSample(t,[0,2100/10800,2190/10800,2225/10800,2380/10800,7000/10800,7090/10800,7125/10800,7280/10800,1],[0,0,1,1,0,0,1,1,0,0]);
    return exBoth(open);
  }
  tick(now) {
    this.frame=0;if(this.disposed)return;
    if(this.reduced){this.publish();return;}
    let eyes;
    if(this.wink) {
      const w=this.wink,phase=(now-w.start)/this.timing.wink_ms;
      if(phase>=1) {
        this.wink=null;this.name=w.returnTo;this.started=now;
        this.transition={from:this.lastEyes,start:now,duration:360};this.applyMouth(280);
        eyes=this.lastEyes;
      } else {
        const closed=exSample(phase,this.timing.wink_times,this.timing.wink_closure);
        eyes=exBoth();eyes[w.side]={open:1-closed,smile:1};
        if(phase<.15)eyes=exBlend(w.from,eyes,exEase(phase/.15));
      }
    } else {
      eyes=this.targetEyes(now);
      if(this.transition) {
        const p=(now-this.transition.start)/this.transition.duration;
        eyes=exBlend(this.transition.from,eyes,exEase(p));
        if(p>=1)this.transition=null;
      }
    }
    this.applyEyes(eyes);this.publish();this.ensureFrame();
  }
  applyEyes(eyes) {
    for(const side of ['left','right']) {
      const {open,smile}=eyes[side],prev=this.lastApplied[side];
      if(prev&&Math.abs(prev.open-open)<.00001&&Math.abs(prev.smile-smile)<.00001)continue;
      for(const row of this.rows[side]) {
        let i=0;
        const d=row.open.replace(exNumbers,()=>{
          const v=row.geometry[0][i]*open+(1-open)*exMix(row.geometry[1][i],row.geometry[2][i],smile);i++;
          return String(+v.toFixed(4));
        });
        row.element.setAttribute('d',d);
        if(row.colors) {
          row.element.setAttribute('fill','rgb('+row.colors[0].map((v,k)=>Math.round(exMix(v,row.colors[1][k],1-open))).join(',')+')');
          row.element.setAttribute('stroke-width',String(+((row.stroke_width?.[1]??.35)*(1-open)).toFixed(4)));
        }
      }
      for(const overlay of this.overlays.filter(x=>x.side===side))overlay.element.setAttribute('opacity',String(+(overlay.reverse?1-(1-open)*smile:(1-open)*smile).toFixed(4)));
      this.lastApplied[side]={open,smile};
    }
    this.lastEyes=eyes;
  }
  applyMouth(duration=280) {
    if(this.speaking)return;
    if(this.reduced){this.mouth.stop({duration:0});return;}
    if(this.wink){this.mouth.setPose('closedSmile',{duration});return;}
    if(this.name==='neutral'){this.mouth.setPose('rest',{duration});return;}
    this.mouth.setPose(this.name==='smile'?'smileReference':'sleepySmall',{duration});
  }
  setExpression(name,{duration=this.timing.transition_ms}={}) {
    this.assertLive();if(!['neutral','smile','sleepy'].includes(name))throw new Error('Unknown expression: '+name);
    if(!Number.isFinite(duration)||duration<0)throw new Error('Invalid expression transition duration');
    this.wink=null;this.name=name;this.started=performance.now();
    this.transition=duration>0?{from:this.lastEyes,start:this.started,duration}:null;
    if(duration===0&&!this.reduced)this.applyEyes(this.targetEyes(this.started));
    this.applyMouth(duration);this.publish();this.ensureFrame();return this;
  }
  play(name,{side='right'}={}) {
    this.assertLive();if(name!=='wink')throw new Error('Unknown expression action: '+name);
    if(!['left','right'].includes(side))throw new Error('Wink side must be left or right (viewer coordinates)');
    if(this.reduced)return this;
    this.transition=null;
    this.wink={side,start:performance.now(),from:this.lastEyes,returnTo:this.wink?.returnTo??this.name};
    this.applyMouth(180);this.publish();this.ensureFrame();return this;
  }
  setSpeaking(active) {
    this.assertLive();const changed=this.speaking!==Boolean(active);this.speaking=Boolean(active);
    if(this.speaking&&changed)this.mouth.cancel(); // Give audio exclusive ownership, including pending mouth transitions.
    // AudioLipSync may halt more than once (pause + ended, interrupt + pause,
    // or media loading events). Each halt writes rest, so reassert the preset.
    if(!this.speaking)this.applyMouth(240);
    this.publish();return this;
  }
  reset(options){return this.setExpression('neutral',options);}
  getState(){return {expression:this.name,action:this.wink?'wink':null,side:this.wink?.side??null,speaking:this.speaking,reducedMotion:this.reduced,eyes:structuredClone(this.lastEyes)};}
  publish(){
    this.svg.dataset.expression=this.wink?'wink':this.name;
    this.svg.dataset.eyeOpenLeft=String(+this.lastEyes.left.open.toFixed(4));
    this.svg.dataset.eyeOpenRight=String(+this.lastEyes.right.open.toFixed(4));
    this.svg.dataset.expressionSpeaking=String(this.speaking);
  }
  dispose(){
    if(this.disposed)return;
    this.disposed=true;cancelAnimationFrame(this.frame);this.frame=0;
    this.media.removeEventListener('change',this.onMotion);
    for(const saved of this.saved) {
      for(const [k,v] of Object.entries(saved.attributes))v===null?saved.element.removeAttribute(k):saved.element.setAttribute(k,v);
      saved.animations.forEach(e=>saved.element.append(e));
    }
    for(const overlay of this.overlays)overlay.originalOpacity===null?overlay.element.removeAttribute('opacity'):overlay.element.setAttribute('opacity',overlay.originalOpacity);
    for(const k of ['expression','eyeOpenLeft','eyeOpenRight','expressionSpeaking'])delete this.svg.dataset[k];
    if(!this.speaking)this.mouth.stop({duration:0});
  }
}
