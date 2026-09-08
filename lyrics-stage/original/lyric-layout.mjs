// Plans how one lyric sentence is laid out inside the fixed-width stage.
// Priority order: keep the whole sentence on a single row (allowing a modest
// font shrink), then break at the lyric's own whitespace, then fall back to a
// width-balanced character split. A row is never shorter than `minRowChars`,
// so an emergency wrap can no longer strand a single character.

function bestSegmentPartition(segments, rowCount, measure) {
  let best = null;
  const lastGap = segments.length - 1;

  const chooseCuts = (startGap, cutsLeft, cuts) => {
    if (cutsLeft === 0) {
      const bounds = [0, ...cuts, segments.length];
      const rows = [];
      for (let index = 0; index < bounds.length - 1; index += 1) {
        rows.push(segments.slice(bounds[index], bounds[index + 1]).join(' '));
      }
      const maxWidth = Math.max(...rows.map((row) => measure(row)));
      if (!best || maxWidth < best.maxWidth) best = { rows, maxWidth };
      return;
    }
    for (let gap = startGap; gap <= lastGap - cutsLeft + 1; gap += 1) {
      chooseCuts(gap + 1, cutsLeft - 1, [...cuts, gap]);
    }
  };

  chooseCuts(1, rowCount - 1, []);
  return best;
}

function bestCharacterPartition(text, rowCount, measure, minRowChars) {
  const chars = Array.from(text);
  if (chars.length < rowCount * minRowChars) return null;

  const prefixWidths = [0];
  for (let index = 1; index <= chars.length; index += 1) {
    prefixWidths.push(measure(chars.slice(0, index).join('')));
  }

  let best = null;
  const chooseCuts = (start, cutsLeft, cuts) => {
    if (cutsLeft === 0) {
      const bounds = [0, ...cuts, chars.length];
      const rows = [];
      let maxWidth = 0;
      for (let index = 0; index < bounds.length - 1; index += 1) {
        const row = chars.slice(bounds[index], bounds[index + 1]).join('').trim();
        if (Array.from(row).length < minRowChars) return;
        rows.push(row);
        maxWidth = Math.max(maxWidth, prefixWidths[bounds[index + 1]] - prefixWidths[bounds[index]]);
      }
      if (!best || maxWidth < best.maxWidth) best = { rows, maxWidth };
      return;
    }
    for (let cut = start; cut <= chars.length - minRowChars * cutsLeft; cut += 1) {
      chooseCuts(cut + minRowChars, cutsLeft - 1, [...cuts, cut]);
    }
  };

  chooseCuts(minRowChars, rowCount - 1, []);
  return best;
}

export function planLyricRows({
  text,
  availableWidth,
  measure,
  minScale = 0.72,
  maxRows = 3,
  minRowChars = 2,
}) {
  const sentence = String(text ?? '').trim().replace(/\s+/g, ' ');
  if (!sentence || !(availableWidth > 0)) return { rows: [sentence], scale: 1 };

  const scaleFor = (rows) => Math.min(1, availableWidth / Math.max(...rows.map((row) => measure(row)), 1));

  const oneRowScale = scaleFor([sentence]);
  if (oneRowScale >= minScale) return { rows: [sentence], scale: oneRowScale };

  const segments = sentence.split(' ');
  let fallback = { rows: [sentence], scale: oneRowScale };

  for (let rowCount = 2; rowCount <= maxRows; rowCount += 1) {
    const bySpace = segments.length >= rowCount
      ? bestSegmentPartition(segments, rowCount, measure)
      : null;
    const byCharacter = bestCharacterPartition(sentence, rowCount, measure, minRowChars);

    for (const candidate of [bySpace, byCharacter]) {
      if (!candidate) continue;
      const scale = scaleFor(candidate.rows);
      if (scale >= minScale) return { rows: candidate.rows, scale };
    }

    const best = [bySpace, byCharacter]
      .filter(Boolean)
      .sort((left, right) => left.maxWidth - right.maxWidth)[0];
    if (best) fallback = { rows: best.rows, scale: scaleFor(best.rows) };
  }

  return fallback;
}
