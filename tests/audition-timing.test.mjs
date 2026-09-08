import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { applyAuditionTiming } from '../assets/local-audition/model.mjs';
const source = [{timeMs:10,text:'Alpha Beta'},{timeMs:20,text:'Gamma'}];
const fixture = () => ({schemaVersion:1,videoId:'injd7gHrIGU',precision:'line',sourceLineCount:2,
  sourceTextSha256:createHash('sha256').update(JSON.stringify(source.map(l=>l.text))).digest('hex'),audioDurationMs:10000,
  cues:[{sourceLine:0,slice:[0,5],timeMs:1000,endTimeMs:2300},
    {sourceLine:0,slice:[6,10],timeMs:2500,endTimeMs:2800},
    {sourceLine:1,timeMs:6000,endTimeMs:8000}]});
test('caption mapping preserves irregular per-line timing and explicit splits, never synthesizes words', async()=>{
 const result=await applyAuditionTiming(source,fixture());
 assert.deepEqual(result,[{timeMs:1000,endTimeMs:2300,text:'Alpha'},{timeMs:2500,endTimeMs:2800,text:'Beta'},{timeMs:6000,endTimeMs:8000,text:'Gamma'}]);
 assert(result.every(line=>!('words' in line)));
});
test('rejects changed provider text, broken indexes, slices and time ordering', async()=>{
 await assert.rejects(()=>applyAuditionTiming([{timeMs:10,text:'Changed'},source[1]],fixture()));
 for(const update of [{sourceLine:9},{timeMs:-1},{endTimeMs:999999},{slice:[5,2]},{slice:[0,999]}]){
  const timing=fixture();Object.assign(timing.cues[0],update);await assert.rejects(()=>applyAuditionTiming(source,timing));
 }
 const timing=fixture();timing.cues[1].timeMs=500;await assert.rejects(()=>applyAuditionTiming(source,timing));
});
test('real manifest covers 49 vocal captions, excludes title card, remains line-level and text-free',()=>{
 const t=JSON.parse(readFileSync(new URL('../assets/local-audition/ina-timing.json',import.meta.url)));
 assert.equal(t.cues.length,49);assert.equal(new Set(t.cues.map(c=>c.captionIndex)).size,49);
 assert.deepEqual(t.excludedCaptionIndices,[25]);assert(!t.cues.some(c=>c.captionIndex===25));
 assert.equal(t.cues[0].timeMs,8959);assert.equal(t.cues.at(-1).timeMs,226310);
 assert(t.cues.every(c=>!('text' in c)&&!('words' in c)));
});
