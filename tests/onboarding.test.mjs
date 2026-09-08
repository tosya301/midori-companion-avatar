import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const src = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const fn = src.match(/function isPublicAgentSpeech\(event\) \{[\s\S]*?\n\}/)[0];
const accepts = vm.runInNewContext(`(${fn})`);
const speech = {source:'public-api', audio_kind:'speech', audio_url:'/media/'+'a'.repeat(32)+'.mp3'};
test('only explicit fresh agent speech is onboarding evidence',()=>{
  assert.equal(accepts(speech),true);
  for(const patch of [{source:'builtin-test'},{source:'music-audition'},{audio_kind:'test'}, {audio_kind:'music'}, {audio_kind:'unknown'}, {audio_kind:undefined}, {replay:true},{replay_only:true},{audio_url:'./audio/demo-tone.wav'}, {audio_url:'./audio/test-voice-human-03.mp3'}, {audio_url:undefined}]) assert.equal(accepts({...speech,...patch}),false,JSON.stringify(patch));
});
test('history normalization strips in-memory onboarding evidence',()=>{
  const normalize=vm.runInNewContext(`(${src.match(/function normalizeRecentItem\(item\) \{[\s\S]*?\n\}/)[0]})`);
  assert.equal(normalize({...speech,audioUrl:speech.audio_url,onboardingSpeech:true}).onboardingSpeech,undefined);
});
