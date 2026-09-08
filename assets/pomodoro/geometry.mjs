export const TAU = 2 * Math.PI;
export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
export function angleAt(x,y,cx,cy) { return (Math.atan2(y-cy,x-cx) + Math.PI/2 + TAU) % TAU; }
export function initialAngle(raw, fraction) {
  // Twelve o'clock represents either endpoint; choose the nearer current state.
  return raw < 1e-6 && fraction < .5 ? TAU : raw;
}
export function trackAngle(previous, lastRaw, raw) {
  let delta = raw - lastRaw;
  if (delta > Math.PI) delta -= TAU;
  if (delta < -Math.PI) delta += TAU;
  return clamp(previous + delta, 0, TAU);
}
export function ringTime(total, angle) { return Math.round(total * (1-clamp(angle,0,TAU)/TAU) / 1000) * 1000; }
export function parseDuration(text) {
  const v=text.trim();let seconds;
  if (/^\d{1,3}$/.test(v)) seconds=Number(v)*60;
  else if (/^\d{1,3}:\d{2,}$/.test(v)) {const [m,s]=v.split(':').map(Number);seconds=m*60+(s>=60?0:s);}
  else return null;
  return (seconds>=1 || (seconds===0 && v.includes(':'))) && seconds<=180*60 ? seconds*1000 : null;
}
export function parseRounds(text,current=1) {
  const match=/^#?(\d{1,2})(?:\/(\d{1,2}))?$/.exec(text.trim());
  if(!match)return null;
  const total=Number(match[2]??match[1]);
  const next=match[2]===undefined?Math.min(current,total):Number(match[1]);
  return total>=1&&total<=20&&next>=1&&next<=total?{current:next,total}:null;
}
export function fitPosition(x,y,size,bounds,margin=8) {
  const scale=Math.min(1,Math.max(1,bounds.width-margin*2)/size,Math.max(1,bounds.height-margin*2)/size);
  const extent=size*scale;
  return {x:clamp(x,bounds.left+margin,bounds.left+bounds.width-margin-extent),y:clamp(y,bounds.top+margin,bounds.top+bounds.height-margin-extent),scale,extent};
}
