import {installReferenceWink} from './reference-wink.mjs';
export const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
const numbers=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;

// Same layer setup as the supplied stage.html, with no private animation clock.
export function installLatestWink(svg,rig,source){
 for(const node of source.querySelector('defs').children)svg.querySelector('defs').append(document.importNode(node,true));
 for(const side of ['left','right'])svg.querySelector('#mg4-smile-lid-shadow-'+side).append(document.importNode(source.querySelector('#mg4-lower-shadow-boost-'+side),true));
 const hair=document.createElementNS('http://www.w3.org/2000/svg','path');
 hair.id='mg4-brow-hair-color-fix-left';
 hair.setAttribute('d','M840.94 544.939 C840.94 544.939 841.335 550.85 841.335 550.85 C841.335 550.85 839.976 550.999 839.976 550.999 C839.976 550.999 839.87 544.892 839.87 544.892 Z');
 hair.setAttribute('fill','rgb(144,126,119)');svg.querySelector('#mg4-original').append(hair);
 const adapter=installReferenceWink(svg,rig,source),apply=rig.applyEyes;
 const ids=[...source.querySelectorAll('[data-native-lash-source]')].map(e=>e.getAttribute('data-native-lash-source'));
 const rows=Object.entries(rig.rows).flatMap(([side,rows])=>rows.filter(row=>ids.includes(row.id)).map(row=>({side,row})));
 // Upstream switches the rigid native tip at smile>0. Interpolate that tip
 // instead, so a partially blinking eye never jumps at tiny positive smile.
 rig.applyEyes=function(eyes){
  apply.call(this,eyes);
  for(const {side,row} of rows){
   const {open,smile}=eyes[side];if(smile<=0||smile>=1)continue;
   const rendered=row.element.getAttribute('d'),target=rendered.match(numbers).map(Number),blend=ease(smile);let i=0;
   row.element.setAttribute('d',rendered.replace(numbers,()=>{const n=i++,from=row.geometry[0][n]*open+(1-open)*(row.geometry[1][n]+(row.geometry[2][n]-row.geometry[1][n])*smile);return String(+(from+(target[n]-from)*blend).toFixed(5))}));
  }
 };
 return {uninstall(){rig.applyEyes=apply;adapter.uninstall()}};
}

// The asleep template requires its own neutral-closure cleanup, not smile eyes.
export function sleepyPainter(svg,rig){
 const paint=['left','right'].map(side=>({shadow:svg.querySelector('#mg4-smile-lid-shadow-'+side),lower:svg.querySelector('#mg4-lower-lashes-'+side)}));
 const corners=[...svg.querySelectorAll('[id^="mg4-corner-static-"]')],sourceHide=svg.querySelector('#mg4-corner-source-hide');
 if(!sourceHide||paint.some(p=>!p.shadow||!p.lower))throw Error('Incomplete sleepy cleanup layers');
 return open=>{
  rig.applyEyes({left:{open,smile:0},right:{open,smile:0}});
  const cleanup=ease((.35-open)/.35);
  for(const p of paint){p.shadow.setAttribute('opacity',String(cleanup));p.lower.setAttribute('opacity',String(1-cleanup))}
  for(const node of corners)node.setAttribute('opacity',String(1-cleanup));sourceHide.setAttribute('opacity',String(cleanup));
  rig.publish();
 };
}
