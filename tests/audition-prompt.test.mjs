import test from 'node:test';
import assert from 'node:assert/strict';
import { AUDITION_PROMPT_KEY, createAuditionPromptMemory, isConnectedMusicState } from '../assets/local-audition/prompt-memory.mjs';

test('prompt choice persists across reloads with storage scoped by origin', () => {
  const values = new Map();
  const store = {getItem: k => values.get(k), setItem: (k,v) => values.set(k,v)};
  const first = createAuditionPromptMemory(() => store);
  assert.equal(first.isDismissed(), false);
  first.dismiss();
  assert.equal(values.get(AUDITION_PROMPT_KEY), '1');
  assert.equal(createAuditionPromptMemory(() => store).isDismissed(), true);
  assert.equal(createAuditionPromptMemory(() => ({getItem: () => null})).isDismissed(), false);
});
test('denied storage retains choice for current page without throwing', () => {
  const memory = createAuditionPromptMemory(() => {throw new Error('denied')});
  assert.equal(memory.isDismissed(), false);
  memory.dismiss();
  assert.equal(memory.isDismissed(), true);
});
test('only successful connected music state counts, including paused empty state', () => {
  assert.equal(isConnectedMusicState({ok:true, connection:'connected', track:null}), true);
  for (const state of [null, {}, {ok:false,connection:'connected'}, {ok:true,connection:'offline',track:{}}, {ok:true,connection:'error',track:{}}, {ok:true,connection:'local',source:'local-audition'}, {ok:true,connection:'connected',source:'local-audition'}]) {
    assert.equal(Boolean(isConnectedMusicState(state)), false);
  }
});
