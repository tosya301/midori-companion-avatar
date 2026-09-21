// Eye openness: 0 = fully closed, 1 = fully open. User-specified holds are 2 s.
const movement=(group,from,to,duration)=>({group,from,to,duration,hold:false});
const hold=(group,open)=>({group,from:open,to:open,duration:2000,hold:true});
export const sleepySegments=[
 movement(1,.70,.45,1600),movement(1,.45,.60,1200),hold(1,.60),
 movement(2,.60,.30,1600),movement(2,.30,.45,1200),hold(2,.45),
 movement(3,.45,0,1600),movement(3,0,.70,1200),hold(3,.70),
];
export const sleepyCycleMs=sleepySegments.reduce((sum,segment)=>sum+segment.duration,0);
export function sampleSleepyCycle(time){
 const position=((time%sleepyCycleMs)+sleepyCycleMs)%sleepyCycleMs;
 let start=0;
 for(let index=0;index<sleepySegments.length;index++){
  const segment=sleepySegments[index],end=start+segment.duration;
  if(position<end){
   const phase=(position-start)/segment.duration,ease=phase*phase*(3-2*phase);
   return {...segment,index,position,phase,remaining:end-position,open:segment.from+(segment.to-segment.from)*ease};
  }
  start=end;
 }
}
