// Generic line-LRC parsing; lyrics remain with the user's selected online provider.
export function parseLineLyrics(raw) {
  if (typeof raw !== 'string' || raw.length > 200000) throw new Error('Invalid lyric payload');
  const lines = [];
  for (const line of raw.split(/\r?\n/)) {
    const stamps = [...line.matchAll(/\[(\d{1,3}):([0-5]\d)(?:[.:](\d{1,3}))?\]/g)];
    const text = line.replace(/\[[^\]]*\]/g, '').trim();
    if (!text) continue;
    for (const [, minutes, seconds, fraction = ''] of stamps) {
      const timeMs = Number(minutes) * 60000 + Number(seconds) * 1000 + Number(fraction.padEnd(3, '0'));
      lines.push({ timeMs, text });
    }
  }
  if (!lines.length || lines.length > 2000) throw new Error('No timed lyrics');
  return lines.sort((a, b) => a.timeMs - b.timeMs);
}

// The local manifest contains only caption timing and text indexes, not lyric text.
export async function applyAuditionTiming(sourceLines, timing) {
  if (timing?.schemaVersion !== 1 || timing.videoId !== 'injd7gHrIGU' ||
      timing.precision !== 'line' || sourceLines.length !== timing.sourceLineCount ||
      !Array.isArray(timing.cues) || !timing.cues.length || timing.cues.length > 2000) {
    throw new Error('Invalid audition timing');
  }
  const sourceText = JSON.stringify(sourceLines.map(line => line.text));
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(sourceText));
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  if (hash !== timing.sourceTextSha256) throw new Error('Lyric source changed; timing needs review');
  let previous = -1;
  return timing.cues.map(cue => {
    if (!Number.isInteger(cue.sourceLine) || cue.sourceLine < 0 || !sourceLines[cue.sourceLine] ||
        !Number.isInteger(cue.timeMs) || cue.timeMs <= previous ||
        !Number.isInteger(cue.endTimeMs) || cue.endTimeMs <= cue.timeMs ||
        cue.endTimeMs > timing.audioDurationMs) throw new Error('Invalid audition cue');
    previous = cue.timeMs;
    const chars = Array.from(sourceLines[cue.sourceLine].text);
    if (cue.slice && (!Array.isArray(cue.slice) || cue.slice.length !== 2 ||
        !cue.slice.every(Number.isInteger) || cue.slice[0] < 0 || cue.slice[1] > chars.length ||
        cue.slice[0] >= cue.slice[1])) throw new Error('Invalid lyric slice');
    const text = (cue.slice ? chars.slice(...cue.slice) : chars).join('').trim();
    if (!text) throw new Error('Empty audition cue');
    return { timeMs: cue.timeMs, endTimeMs: cue.endTimeMs, text };
  });
}

export function localPlaybackState(audio, lines, lyricStatus, buffering = false) {
  return {
    ok: true, source: 'local-audition', connection: 'local',
    track: { id: 'local-audition:injd7gHrIGU', type: 'track', title: 'ないない',
      artist: "Ninomae Ina’nis (Cover)", album: '本地试听 · Ina 字幕逐句时间轴',
      durationMs: Number.isFinite(audio.duration) ? Math.round(audio.duration * 1000) : 250908,
      artworkUrl: new URL('./cover.jpg', import.meta.url).href },
    playback: { isPlaying: !audio.paused && !audio.ended && !buffering,
      state: audio.ended ? 'ended' : audio.paused ? 'paused' : buffering ? 'buffering' : 'playing',
      positionMs: Math.max(0, Math.round((audio.currentTime || 0) * 1000)), sampledAtMs: Date.now() },
    lyrics: { source: '日文：LRCLIB · 时间轴：Ina 原视频字幕（逐句）', status: lyricStatus, lines },
  };
}
