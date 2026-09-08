export function hasPlaybackTrack(state) {
  return Boolean(state?.track && (state.connection === 'connected'
    || (state.connection === 'local' && state.source === 'local-audition')));
}

export function resolveLyricPresentation(state) {
  const lines = Array.isArray(state?.lyrics?.lines) ? state.lyrics.lines : [];
  if (lines.length > 0) return { kind: 'lyrics', lines };

  const connected = hasPlaybackTrack(state);
  return {
    kind: 'track',
    title: connected ? (state.track.title || '未知歌曲') : '等待 Spotify',
    artist: connected ? (state.track.artist || '未知歌手') : '打开 Spotify 播放音乐',
  };
}
