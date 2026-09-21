const SVG_NS = 'http://www.w3.org/2000/svg';
const NUMBERS = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
const TOKENS = /[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
const clamp = x => Math.max(0, Math.min(1, x));
const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const mix = (a, b, t) => a + (b - a) * t;
const cubic = (a, b, c, d, t) => {
  const u = 1 - t;
  return u*u*u*a + 3*u*u*t*b + 3*u*t*t*c + t*t*t*d;
};

// These apertures are absolute M/C contours. Their first monotonically
// rightward chain is the moving upper lid; the returning chain is the lower lid.
function upperLid(d) {
  const tokens = d.match(TOKENS);
  if (tokens?.[0] !== 'M') throw new Error('Expected an absolute aperture M command');
  let point = [Number(tokens[1]), Number(tokens[2])], index = 3;
  const segments = [];
  while (index < tokens.length && tokens[index] === 'C') {
    const p = tokens.slice(index + 1, index + 7).map(Number);
    if (p.length !== 6 || !p.every(Number.isFinite)) throw new Error('Invalid aperture curve');
    if (p[4] <= point[0]) break;
    segments.push([point[0], point[1], ...p]);
    point = [p[4], p[5]];
    index += 7;
  }
  if (segments.length < 2) throw new Error('Cannot locate the aperture upper lid');
  return segments;
}

function lidY(segments, x) {
  if (x <= segments[0][0]) return segments[0][1];
  const last = segments[segments.length - 1];
  if (x >= last[6]) return last[7];
  const s = segments.find(s => x <= s[6]);
  let low = 0, high = 1;
  for (let i = 0; i < 19; i++) {
    const t = (low + high) / 2;
    if (cubic(s[0], s[2], s[4], s[6], t) < x) low = t;
    else high = t;
  }
  return cubic(s[1], s[3], s[5], s[7], (low + high) / 2);
}

function prepareShape(element, closedLid) {
  if (element.localName !== 'path') throw new Error('The reference lash group must contain paths');
  const d = element.getAttribute('d');
  if (!d || (d.match(/[a-df-z]/ig) ?? []).some(command => !'MCLZ'.includes(command))) {
    throw new Error('Reference lash paths must use absolute M/C/L/Z commands');
  }
  const values = d.match(NUMBERS).map(Number);
  if (values.length % 2) throw new Error('Unpaired coordinates in a reference lash path');
  const anchorY = values.filter((_, i) => i % 2 === 0).map(x => lidY(closedLid, x));
  const rigidAnchor = element.getAttribute('data-rigid-lash-anchor')?.split(/\s+/).map(Number);
  if (rigidAnchor && (rigidAnchor.length !== 2 || !rigidAnchor.every(Number.isFinite))) {
    throw new Error('Invalid rigid lash anchor');
  }
  return { element, d, values, anchorY, rigidAnchor };
}

function translatedPath(d, dy) {
  let index = 0;
  return d.replace(NUMBERS, value => String(+(Number(value) + (index++ % 2 ? dy : 0)).toFixed(5)));
}

function nativePath(row, {open, smile}) {
  let index = 0;
  return row.open.replace(NUMBERS, () => {
    const i = index++;
    return String(+(row.geometry[0][i] * open + (1 - open) * mix(row.geometry[1][i], row.geometry[2][i], smile)).toFixed(4));
  });
}

/**
 * Install the approved closed-smile eyelashes on an existing E9 ExpressionRig.
 * `closedSourceSvg` supplies upper lashes and precise closed-eye cleanup data.
 * Eyebrows, hair and the reconstructed spectacle rim stay on their E9 paths.
 *
 * rig.applyEyes remains the single state input, so both normal animation and
 * a paused timeline scrub work. This adapter starts no requestAnimationFrame.
 * To drive a deterministic comparison, stop the rig's scheduling separately.
 * Call uninstall() before rig.dispose() to restore the original structure.
 */
export function installReferenceWink(svg, rig, closedSourceSvg) {
  if (!svg || !rig?.applyEyes || !closedSourceSvg) {
    throw new Error('installReferenceWink needs the live SVG, E9 rig and closed reference SVG');
  }
  const document = svg.ownerDocument;
  const originalApply = rig.applyEyes;
  const hadOwnApply = Object.hasOwn(rig, 'applyEyes');
  const sides = [];
  const foldMetadata = closedSourceSvg.querySelector('#mg4-upper-fold-cleanup-data');
  const fold = foldMetadata ? JSON.parse(foldMetadata.textContent) : null;
  if (fold) {
    const paths = [...svg.querySelectorAll('path')];
    fold.rows = [{open: fold.open, closed: fold.closed, count: fold.count}, ...(fold.morphs ?? [])];
    for (const row of fold.rows) {
      row.elements = paths.filter(path => path.getAttribute('d') === row.open);
      row.from = row.open.match(NUMBERS).map(Number);
      row.to = row.closed.match(NUMBERS).map(Number);
      if (row.elements.length !== row.count || row.from.length !== row.to.length) {
        throw new Error('Eye cleanup source/protection copies must stay synchronized');
      }
    }
    for (const row of fold.fades ?? []) {
      row.elements = paths.filter(path => path.getAttribute('d') === row.d
          && (!row.parentClip || path.parentElement.getAttribute('clip-path') === row.parentClip))
        .map(element => ({element, opacity: element.getAttribute('opacity')}));
      if (row.elements.length !== row.count) throw new Error('Missing eyelash cap cleanup copies');
    }
  }
  // Validate all inputs before moving any live elements.
  for (const side of ['left', 'right']) {
    const upper = svg.querySelector(`#mg4-lashes-${side}`);
    const lower = svg.querySelector(`#mg4-lower-lashes-${side}`);
    const source = closedSourceSvg.querySelector(`#mg4-lashes-${side}`);
    const sourceLower = closedSourceSvg.querySelector(`#mg4-lower-lashes-${side}`);
    const aperture = rig.rows[side].find(row => row.id === `mg4-aperture-${side}`);
    if (!upper || !lower || !source || !aperture || sourceLower?.children.length) {
      throw new Error(`Missing or incompatible ${side} E9/reference lash groups`);
    }
    if (svg.querySelector(`[data-reference-wink-side="${side}"]`)) {
      throw new Error(`Reference wink already installed on ${side}`);
    }
    const closedLid = upperLid(aperture.smile);
    const reference = document.createElementNS(SVG_NS, 'g');
    reference.setAttribute('data-reference-wink-side', side);
    reference.setAttribute('data-reference-wink-role', 'new-upper');
    reference.setAttribute('opacity', '0');
    for (const child of source.children) reference.append(document.importNode(child, true));
    const shapes = [...reference.children].map(element => prepareShape(element, closedLid));
    for (const shape of shapes.filter(shape => shape.rigidAnchor)) {
      shape.native = rig.rows[side].find(row => row.id === shape.element.getAttribute('data-native-lash-source'));
      if (!shape.native) throw new Error('Missing native source for rigid lash');
    }
    sides.push({ side, upper, lower, aperture, closedLid, reference, shapes });
  }

  for (const row of sides) {
    row.originalUpper = [...row.upper.childNodes];
    row.originalLower = [...row.lower.childNodes];
    row.nativeUpper = document.createElementNS(SVG_NS, 'g');
    row.nativeLower = document.createElementNS(SVG_NS, 'g');
    row.nativeUpper.setAttribute('data-reference-wink-role', 'native-upper');
    row.nativeLower.setAttribute('data-reference-wink-role', 'native-lower');
    row.originalUpper.forEach(node => row.nativeUpper.append(node));
    row.originalLower.forEach(node => row.nativeLower.append(node));
    row.upper.append(row.nativeUpper, row.reference);
    row.lower.append(row.nativeLower);
  }

  let installed = true;
  function apply(eyes) {
    if (!installed) return;
    for (const row of sides) {
      const open = clamp(eyes[row.side].open);
      const smile = clamp(eyes[row.side].smile);
      // Keep the initial half of closing fully native. Then grow the new detail
      // smoothly while both contours move with the same lid, reaching its exact
      // approved closed geometry at open=0. The open opposite eye is unchanged.
      const blend = smooth(((1 - open) - 0.45) / 0.50) * smile;
      // The skin mask also references this group. A complementary alpha
      // crossfade would make the shared lash core translucent and let skin
      // paint wash it grey. Bring the moving replacement to full opacity
      // before fading its native underlay, so the common core stays opaque.
      row.nativeUpper.setAttribute('opacity', String(1 - smooth(2 * blend - 1)));
      row.nativeLower.setAttribute('opacity', String(1 - blend));
      row.reference.setAttribute('opacity', String(smooth(2 * blend)));
      const currentLid = upperLid(row.aperture.element.getAttribute('d'));
      for (const shape of row.shapes) {
        if (shape.rigidAnchor) {
          const [x, y] = shape.rigidAnchor;
          const native = shape.native;
          // Preserve the OPEN tip's angle, length and thickness. Both copies
          // share one moving anchor, so fading the old layer adds no second tip.
          const nativeY = native.geometry[0][1] * open
            + (1 - open) * mix(native.geometry[1][1], native.geometry[2][1], smile);
          const closedY = lidY(row.closedLid, x);
          const referenceY = lidY(currentLid, x) + (y - closedY) * (1 + 0.45 * open);
          const targetY = mix(nativeY, referenceY, blend);
          shape.element.setAttribute('d', open === 0 && smile === 1 ? shape.d : translatedPath(shape.d, targetY - y));
          native.element.setAttribute('d', smile > 0
            ? translatedPath(native.open, targetY - native.geometry[0][1])
            : nativePath(native, {open, smile}));
          continue;
        }
        if (blend === 0) continue;
        if (open === 0 && smile === 1) {
          shape.element.setAttribute('d', shape.d);
          continue;
        }
        // Warp every path control point, highlight and tuft by the local lid
        // displacement. The new contour never sits at its final closed Y while
        // the native contour is still moving. Slightly fuller partial-open
        // thickness follows the source's open-to-closed lash compression.
        let index = 0;
        const d = shape.d.replace(NUMBERS, () => {
          const i = index++;
          if (i % 2 === 0) return String(shape.values[i]);
          const x = shape.values[i - 1], anchor = shape.anchorY[(i - 1) / 2];
          const y = lidY(currentLid, x) + (shape.values[i] - anchor) * (1 + 0.45 * open);
          return String(+y.toFixed(4));
        });
        shape.element.setAttribute('d', d);
      }
    }
    if (fold) {
      const blend = smooth(1 - clamp(eyes.right.open)) * clamp(eyes.right.smile);
      for (const row of fold.rows) {
        let index = 0;
        const d = blend === 0 ? row.open : blend === 1 ? row.closed
          : row.open.replace(NUMBERS, () => {
            const i = index++;
            return String(+mix(row.from[i], row.to[i], blend).toFixed(5));
          });
        // The obsolete eye fragments share source paths with the frame.
        // Keep their rendered and protection copies on the same exact contour.
        for (const element of row.elements) element.setAttribute('d', d);
      }
      for (const row of fold.fades ?? []) for (const {element, opacity} of row.elements) {
        if (blend === 0 && opacity === null) element.removeAttribute('opacity');
        else element.setAttribute('opacity', blend === 0 ? opacity : String((opacity === null ? 1 : Number(opacity)) * (1 - blend)));
      }
    }
  }

  rig.applyEyes = function(eyes) {
    originalApply.call(this, eyes);
    apply(eyes);
  };
  apply(rig.lastEyes);

  return {
    apply,
    uninstall() {
      if (!installed) return;
      installed = false;
      if (hadOwnApply) rig.applyEyes = originalApply;
      else delete rig.applyEyes;
      if (fold) {
        for (const row of fold.rows) for (const element of row.elements) element.setAttribute('d', row.open);
        for (const row of fold.fades ?? []) for (const {element, opacity} of row.elements) {
          if (opacity === null) element.removeAttribute('opacity');
          else element.setAttribute('opacity', opacity);
        }
      }
      for (const row of sides) {
        for (const shape of row.shapes.filter(shape => shape.native)) {
          shape.native.element.setAttribute('d', nativePath(shape.native, rig.lastEyes[row.side]));
        }
        row.upper.replaceChildren(...row.originalUpper);
        row.lower.replaceChildren(...row.originalLower);
      }
    },
  };
}
