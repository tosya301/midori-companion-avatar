import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLineLyrics, localPlaybackState } from '../assets/local-audition/model.mjs';
import { hasPlaybackTrack, resolveLyricPresentation } from '../lyrics-stage/original/lyric-presentation.mjs';

test('generic LRC parser sorts multiple timestamps and fractions without inventing words', () => {
  // Entirely synthetic test text, not song lyrics.
  assert.deepEqual(parseLineLyrics('[ar:Fixture]\n[00:02.5][00:01.123]Test B\n[00:00.01]Test A'), [
    {timeMs:10,text:'Test A'}, {timeMs:1123,text:'Test B'}, {timeMs:2500,text:'Test B'},
  ]);
  for (const value of ['',null,'no timestamps','[00:99]invalid','a'.repeat(200001)]) assert.throws(()=>parseLineLyrics(value));
});
test('audio is the local source clock, with honest local rather than Spotify connection', () => {
  const audio={duration:250.908,currentTime:42.123,paused:false,ended:false};
  const state=localPlaybackState(audio,[{timeMs:0,text:'Test line'}],'ready');
  assert.equal(state.playback.positionMs,42123);
  assert.equal(state.connection,'local');
  assert.equal(state.source,'local-audition');
  assert.equal(state.track.durationMs,250908);
  assert.equal(state.playback.isPlaying,true);
  assert.equal(localPlaybackState({...audio,paused:true},[],'ready').playback.isPlaying,false);
  assert.equal(localPlaybackState(audio,[],'loading',true).playback.state,'buffering');
  assert.equal(localPlaybackState({...audio,ended:true},[],'ready').playback.isPlaying,false);
});
test('Original accepts explicit local playback but not disconnected remote tracks', () => {
  const track={title:'Test title',artist:'Test artist'};
  const local={connection:'local',source:'local-audition',track,lyrics:{lines:[]}};
  assert(hasPlaybackTrack(local));
  assert.equal(resolveLyricPresentation(local).title,'Test title');
  assert(!hasPlaybackTrack({...local,source:'remote'}));
  assert(!hasPlaybackTrack({...local,connection:'offline'}));
  assert(hasPlaybackTrack({connection:'connected',track}));
  assert(!hasPlaybackTrack({connection:'connected',track:null}));
});
