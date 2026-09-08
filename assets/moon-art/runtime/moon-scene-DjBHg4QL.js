const wt = "srgb", Gi = "srgb-linear", zi = "linear", $e = "srgb";
const Gr = "300 es";
function xs(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function si(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function vs() {
  const i = si("canvas");
  return i.style.display = "block", i;
}
const zr = {};
function Vr(...i) {
  const e = "THREE." + i.shift();
  console.log(e, ...i);
}
function Ha(i) {
  const e = i[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = i[1];
    t && t.isStackTrace ? i[0] += " " + t.getLocation() : i[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return i;
}
function De(...i) {
  i = Ha(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...i);
  }
}
function Ye(...i) {
  i = Ha(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...i);
  }
}
function kn(...i) {
  const e = i.join(" ");
  e in zr || (zr[e] = !0, De(...i));
}
function Ms(i, e, t) {
  return new Promise(function(n, r) {
    function a() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(a, t);
          break;
        default:
          n();
      }
    }
    setTimeout(a, t);
  });
}
const Ss = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
class bn {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const r = n[e];
    if (r !== void 0) {
      const a = r.indexOf(t);
      a !== -1 && r.splice(a, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let a = 0, s = r.length; a < s; a++)
        r[a].call(this, e);
      e.target = null;
    }
  }
}
const Tt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let Hr = 1234567;
const ri = Math.PI / 180, oi = 180 / Math.PI;
function Yn() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Tt[i & 255] + Tt[i >> 8 & 255] + Tt[i >> 16 & 255] + Tt[i >> 24 & 255] + "-" + Tt[e & 255] + Tt[e >> 8 & 255] + "-" + Tt[e >> 16 & 15 | 64] + Tt[e >> 24 & 255] + "-" + Tt[t & 63 | 128] + Tt[t >> 8 & 255] + "-" + Tt[t >> 16 & 255] + Tt[t >> 24 & 255] + Tt[n & 255] + Tt[n >> 8 & 255] + Tt[n >> 16 & 255] + Tt[n >> 24 & 255]).toLowerCase();
}
function We(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Ar(i, e) {
  return (i % e + e) % e;
}
function Es(i, e, t, n, r) {
  return n + (i - e) * (r - n) / (t - e);
}
function Ts(i, e, t) {
  return i !== e ? (t - i) / (e - i) : 0;
}
function ai(i, e, t) {
  return (1 - t) * i + t * e;
}
function bs(i, e, t, n) {
  return ai(i, e, 1 - Math.exp(-t * n));
}
function ys(i, e = 1) {
  return e - Math.abs(Ar(i, e * 2) - e);
}
function As(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * (3 - 2 * i));
}
function Rs(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * i * (i * (i * 6 - 15) + 10));
}
function Cs(i, e) {
  return i + Math.floor(Math.random() * (e - i + 1));
}
function ws(i, e) {
  return i + Math.random() * (e - i);
}
function Ps(i) {
  return i * (0.5 - Math.random());
}
function Ds(i) {
  i !== void 0 && (Hr = i);
  let e = Hr += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function Ls(i) {
  return i * ri;
}
function Fs(i) {
  return i * oi;
}
function Is(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function Us(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Ns(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Os(i, e, t, n, r) {
  const a = Math.cos, s = Math.sin, o = a(t / 2), l = s(t / 2), c = a((e + n) / 2), f = s((e + n) / 2), p = a((e - n) / 2), u = s((e - n) / 2), _ = a((n - e) / 2), x = s((n - e) / 2);
  switch (r) {
    case "XYX":
      i.set(o * f, l * p, l * u, o * c);
      break;
    case "YZY":
      i.set(l * u, o * f, l * p, o * c);
      break;
    case "ZXZ":
      i.set(l * p, l * u, o * f, o * c);
      break;
    case "XZX":
      i.set(o * f, l * x, l * _, o * c);
      break;
    case "YXY":
      i.set(l * _, o * f, l * x, o * c);
      break;
    case "ZYZ":
      i.set(l * x, l * _, o * f, o * c);
      break;
    default:
      De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Hn(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function At(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
const Bs = {
  DEG2RAD: ri,
  RAD2DEG: oi,
  /**
   * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
   * (universally unique identifier).
   *
   * @static
   * @method
   * @return {string} The UUID.
   */
  generateUUID: Yn,
  /**
   * Clamps the given value between min and max.
   *
   * @static
   * @method
   * @param {number} value - The value to clamp.
   * @param {number} min - The min value.
   * @param {number} max - The max value.
   * @return {number} The clamped value.
   */
  clamp: We,
  /**
   * Computes the Euclidean modulo of the given parameters that
   * is `( ( n % m ) + m ) % m`.
   *
   * @static
   * @method
   * @param {number} n - The first parameter.
   * @param {number} m - The second parameter.
   * @return {number} The Euclidean modulo.
   */
  euclideanModulo: Ar,
  /**
   * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
   * for the given value.
   *
   * @static
   * @method
   * @param {number} x - The value to be mapped.
   * @param {number} a1 - Minimum value for range A.
   * @param {number} a2 - Maximum value for range A.
   * @param {number} b1 - Minimum value for range B.
   * @param {number} b2 - Maximum value for range B.
   * @return {number} The mapped value.
   */
  mapLinear: Es,
  /**
   * Returns the percentage in the closed interval `[0, 1]` of the given value
   * between the start and end point.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} value - A value between start and end.
   * @return {number} The interpolation factor.
   */
  inverseLerp: Ts,
  /**
   * Returns a value linearly interpolated from two known points based on the given interval -
   * `t = 0` will return `x` and `t = 1` will return `y`.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {number} The interpolated value.
   */
  lerp: ai,
  /**
   * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
   * time to maintain frame rate independent movement. For details, see
   * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
   *
   * @static
   * @method
   * @param {number} x - The current point.
   * @param {number} y - The target point.
   * @param {number} lambda - A higher lambda value will make the movement more sudden,
   * and a lower value will make the movement more gradual.
   * @param {number} dt - Delta time in seconds.
   * @return {number} The interpolated value.
   */
  damp: bs,
  /**
   * Returns a value that alternates between `0` and the given `length` parameter.
   *
   * @static
   * @method
   * @param {number} x - The value to pingpong.
   * @param {number} [length=1] - The positive value the function will pingpong to.
   * @return {number} The alternated value.
   */
  pingpong: ys,
  /**
   * Returns a value in the range `[0,1]` that represents the percentage that `x` has
   * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
   * the `min` and `max`.
   *
   * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smoothstep: As,
  /**
   * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
   * that has zero 1st and 2nd order derivatives at x=0 and x=1.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smootherstep: Rs,
  /**
   * Returns a random integer from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random integer.
   */
  randInt: Cs,
  /**
   * Returns a random float from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random float.
   */
  randFloat: ws,
  /**
   * Returns a random integer from `<-range/2, range/2>` interval.
   *
   * @static
   * @method
   * @param {number} range - Defines the value range.
   * @return {number} A random float.
   */
  randFloatSpread: Ps,
  /**
   * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
   *
   * @static
   * @method
   * @param {number} [s] - The integer seed.
   * @return {number} A random float.
   */
  seededRandom: Ds,
  /**
   * Converts degrees to radians.
   *
   * @static
   * @method
   * @param {number} degrees - A value in degrees.
   * @return {number} The converted value in radians.
   */
  degToRad: Ls,
  /**
   * Converts radians to degrees.
   *
   * @static
   * @method
   * @param {number} radians - A value in radians.
   * @return {number} The converted value in degrees.
   */
  radToDeg: Fs,
  /**
   * Returns `true` if the given number is a power of two.
   *
   * @static
   * @method
   * @param {number} value - The value to check.
   * @return {boolean} Whether the given number is a power of two or not.
   */
  isPowerOfTwo: Is,
  /**
   * Returns the smallest power of two that is greater than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The smallest power of two that is greater than or equal to the given number.
   */
  ceilPowerOfTwo: Us,
  /**
   * Returns the largest power of two that is less than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The largest power of two that is less than or equal to the given number.
   */
  floorPowerOfTwo: Ns,
  /**
   * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
   * defined by the given angles and order.
   *
   * Rotations are applied to the axes in the order specified by order:
   * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
   *
   * @static
   * @method
   * @param {Quaternion} q - The quaternion to set.
   * @param {number} a - The rotation applied to the first axis, in radians.
   * @param {number} b - The rotation applied to the second axis, in radians.
   * @param {number} c - The rotation applied to the third axis, in radians.
   * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
   */
  setQuaternionFromProperEuler: Os,
  /**
   * Normalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The float value in the range `[0,1]` to normalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The normalize value.
   */
  normalize: At,
  /**
   * Denormalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The value to denormalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The denormalize (float) value in the range `[0,1]`.
   */
  denormalize: Hn
};
class Ke {
  static {
    Ke.prototype.isVector2 = !0;
  }
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = We(this.x, e.x, t.x), this.y = We(this.y, e.y, t.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = We(this.x, e, t), this.y = We(this.y, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(We(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(We(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), a = this.x - e.x, s = this.y - e.y;
    return this.x = a * n - s * r + e.x, this.y = a * r + s * n + e.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Kn {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(e, t, n, r, a, s, o) {
    let l = n[r + 0], c = n[r + 1], f = n[r + 2], p = n[r + 3], u = a[s + 0], _ = a[s + 1], x = a[s + 2], E = a[s + 3];
    if (p !== E || l !== u || c !== _ || f !== x) {
      let m = l * u + c * _ + f * x + p * E;
      m < 0 && (u = -u, _ = -_, x = -x, E = -E, m = -m);
      let d = 1 - o;
      if (m < 0.9995) {
        const A = Math.acos(m), R = Math.sin(A);
        d = Math.sin(d * A) / R, o = Math.sin(o * A) / R, l = l * d + u * o, c = c * d + _ * o, f = f * d + x * o, p = p * d + E * o;
      } else {
        l = l * d + u * o, c = c * d + _ * o, f = f * d + x * o, p = p * d + E * o;
        const A = 1 / Math.sqrt(l * l + c * c + f * f + p * p);
        l *= A, c *= A, f *= A, p *= A;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = f, e[t + 3] = p;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(e, t, n, r, a, s) {
    const o = n[r], l = n[r + 1], c = n[r + 2], f = n[r + 3], p = a[s], u = a[s + 1], _ = a[s + 2], x = a[s + 3];
    return e[t] = o * x + f * p + l * _ - c * u, e[t + 1] = l * x + f * u + c * p - o * _, e[t + 2] = c * x + f * _ + o * u - l * p, e[t + 3] = f * x - o * p - l * u - c * _, e;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, a = e._z, s = e._order, o = Math.cos, l = Math.sin, c = o(n / 2), f = o(r / 2), p = o(a / 2), u = l(n / 2), _ = l(r / 2), x = l(a / 2);
    switch (s) {
      case "XYZ":
        this._x = u * f * p + c * _ * x, this._y = c * _ * p - u * f * x, this._z = c * f * x + u * _ * p, this._w = c * f * p - u * _ * x;
        break;
      case "YXZ":
        this._x = u * f * p + c * _ * x, this._y = c * _ * p - u * f * x, this._z = c * f * x - u * _ * p, this._w = c * f * p + u * _ * x;
        break;
      case "ZXY":
        this._x = u * f * p - c * _ * x, this._y = c * _ * p + u * f * x, this._z = c * f * x + u * _ * p, this._w = c * f * p - u * _ * x;
        break;
      case "ZYX":
        this._x = u * f * p - c * _ * x, this._y = c * _ * p + u * f * x, this._z = c * f * x - u * _ * p, this._w = c * f * p + u * _ * x;
        break;
      case "YZX":
        this._x = u * f * p + c * _ * x, this._y = c * _ * p + u * f * x, this._z = c * f * x - u * _ * p, this._w = c * f * p - u * _ * x;
        break;
      case "XZY":
        this._x = u * f * p - c * _ * x, this._y = c * _ * p - u * f * x, this._z = c * f * x + u * _ * p, this._w = c * f * p + u * _ * x;
        break;
      default:
        De("Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], a = t[8], s = t[1], o = t[5], l = t[9], c = t[2], f = t[6], p = t[10], u = n + o + p;
    if (u > 0) {
      const _ = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / _, this._x = (f - l) * _, this._y = (a - c) * _, this._z = (s - r) * _;
    } else if (n > o && n > p) {
      const _ = 2 * Math.sqrt(1 + n - o - p);
      this._w = (f - l) / _, this._x = 0.25 * _, this._y = (r + s) / _, this._z = (a + c) / _;
    } else if (o > p) {
      const _ = 2 * Math.sqrt(1 + o - n - p);
      this._w = (a - c) / _, this._x = (r + s) / _, this._y = 0.25 * _, this._z = (l + f) / _;
    } else {
      const _ = 2 * Math.sqrt(1 + p - n - o);
      this._w = (s - r) / _, this._x = (a + c) / _, this._y = (l + f) / _, this._z = 0.25 * _;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    return 2 * Math.acos(Math.abs(We(this.dot(e), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, a = e._z, s = e._w, o = t._x, l = t._y, c = t._z, f = t._w;
    return this._x = n * f + s * o + r * c - a * l, this._y = r * f + s * l + a * o - n * c, this._z = a * f + s * c + n * l - r * o, this._w = s * f - n * o - r * l - a * c, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(e, t) {
    let n = e._x, r = e._y, a = e._z, s = e._w, o = this.dot(e);
    o < 0 && (n = -n, r = -r, a = -a, s = -s, o = -o);
    let l = 1 - t;
    if (o < 0.9995) {
      const c = Math.acos(o), f = Math.sin(c);
      l = Math.sin(l * c) / f, t = Math.sin(t * c) / f, this._x = this._x * l + n * t, this._y = this._y * l + r * t, this._z = this._z * l + a * t, this._w = this._w * l + s * t, this._onChangeCallback();
    } else
      this._x = this._x * l + n * t, this._y = this._y * l + r * t, this._z = this._z * l + a * t, this._w = this._w * l + s * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), a = Math.sqrt(n);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      a * Math.sin(t),
      a * Math.cos(t)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class N {
  static {
    N.prototype.isVector3 = !0;
  }
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(e = 0, t = 0, n = 0) {
    this.x = e, this.y = t, this.z = n;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(e) {
    return this.applyQuaternion(kr.setFromEuler(e));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(e, t) {
    return this.applyQuaternion(kr.setFromAxisAngle(e, t));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements;
    return this.x = a[0] * t + a[3] * n + a[6] * r, this.y = a[1] * t + a[4] * n + a[7] * r, this.z = a[2] * t + a[5] * n + a[8] * r, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements, s = 1 / (a[3] * t + a[7] * n + a[11] * r + a[15]);
    return this.x = (a[0] * t + a[4] * n + a[8] * r + a[12]) * s, this.y = (a[1] * t + a[5] * n + a[9] * r + a[13]) * s, this.z = (a[2] * t + a[6] * n + a[10] * r + a[14]) * s, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, a = e.x, s = e.y, o = e.z, l = e.w, c = 2 * (s * r - o * n), f = 2 * (o * t - a * r), p = 2 * (a * n - s * t);
    return this.x = t + l * c + s * p - o * f, this.y = n + l * f + o * c - a * p, this.z = r + l * p + a * f - s * c, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r, this.y = a[1] * t + a[5] * n + a[9] * r, this.z = a[2] * t + a[6] * n + a[10] * r, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = We(this.x, e.x, t.x), this.y = We(this.y, e.y, t.y), this.z = We(this.z, e.z, t.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = We(this.x, e, t), this.y = We(this.y, e, t), this.z = We(this.z, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(We(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(e) {
    return this.crossVectors(this, e);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(e, t) {
    const n = e.x, r = e.y, a = e.z, s = t.x, o = t.y, l = t.z;
    return this.x = r * l - a * o, this.y = a * s - n * l, this.z = n * o - r * s, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(e) {
    return Yi.copy(this).projectOnVector(e), this.sub(Yi);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(e) {
    return this.sub(Yi.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(We(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Yi = /* @__PURE__ */ new N(), kr = /* @__PURE__ */ new Kn();
class Ue {
  static {
    Ue.prototype.isMatrix3 = !0;
  }
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(e, t, n, r, a, s, o, l, c) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, a, s, o, l, c);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(e, t, n, r, a, s, o, l, c) {
    const f = this.elements;
    return f[0] = e, f[1] = r, f[2] = o, f[3] = t, f[4] = a, f[5] = l, f[6] = n, f[7] = s, f[8] = c, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, a = this.elements, s = n[0], o = n[3], l = n[6], c = n[1], f = n[4], p = n[7], u = n[2], _ = n[5], x = n[8], E = r[0], m = r[3], d = r[6], A = r[1], R = r[4], M = r[7], y = r[2], T = r[5], C = r[8];
    return a[0] = s * E + o * A + l * y, a[3] = s * m + o * R + l * T, a[6] = s * d + o * M + l * C, a[1] = c * E + f * A + p * y, a[4] = c * m + f * R + p * T, a[7] = c * d + f * M + p * C, a[2] = u * E + _ * A + x * y, a[5] = u * m + _ * R + x * T, a[8] = u * d + _ * M + x * C, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], s = e[4], o = e[5], l = e[6], c = e[7], f = e[8];
    return t * s * f - t * o * c - n * a * f + n * o * l + r * a * c - r * s * l;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], s = e[4], o = e[5], l = e[6], c = e[7], f = e[8], p = f * s - o * c, u = o * l - f * a, _ = c * a - s * l, x = t * p + n * u + r * _;
    if (x === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const E = 1 / x;
    return e[0] = p * E, e[1] = (r * c - f * n) * E, e[2] = (o * n - r * s) * E, e[3] = u * E, e[4] = (f * t - r * l) * E, e[5] = (r * a - o * t) * E, e[6] = _ * E, e[7] = (n * l - c * t) * E, e[8] = (s * t - n * a) * E, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(e, t, n, r, a, s, o) {
    const l = Math.cos(a), c = Math.sin(a);
    return this.set(
      n * l,
      n * c,
      -n * (l * s + c * o) + s + e,
      -r * c,
      r * l,
      -r * (-c * s + l * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @deprecated
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(e, t) {
    return kn("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Ki.makeScale(e, t)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(e) {
    return kn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Ki.makeRotation(-e)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(e, t) {
    return kn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Ki.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Ki = /* @__PURE__ */ new Ue(), Wr = /* @__PURE__ */ new Ue().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), Xr = /* @__PURE__ */ new Ue().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function Gs() {
  const i = {
    enabled: !0,
    workingColorSpace: Gi,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(r, a, s) {
      return this.enabled === !1 || a === s || !a || !s || (this.spaces[a].transfer === $e && (r.r = nn(r.r), r.g = nn(r.g), r.b = nn(r.b)), this.spaces[a].primaries !== this.spaces[s].primaries && (r.applyMatrix3(this.spaces[a].toXYZ), r.applyMatrix3(this.spaces[s].fromXYZ)), this.spaces[s].transfer === $e && (r.r = Wn(r.r), r.g = Wn(r.g), r.b = Wn(r.b))), r;
    },
    workingToColorSpace: function(r, a) {
      return this.convert(r, this.workingColorSpace, a);
    },
    colorSpaceToWorking: function(r, a) {
      return this.convert(r, a, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? zi : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, a = this.workingColorSpace) {
      return r.fromArray(this.spaces[a].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    // Internal APIs
    _getMatrix: function(r, a, s) {
      return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(r, a) {
      return kn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), i.workingToColorSpace(r, a);
    },
    toWorkingColorSpace: function(r, a) {
      return kn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), i.colorSpaceToWorking(r, a);
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return i.define({
    [Gi]: {
      primaries: e,
      whitePoint: n,
      transfer: zi,
      toXYZ: Wr,
      fromXYZ: Xr,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: wt },
      outputColorSpaceConfig: { drawingBufferColorSpace: wt }
    },
    [wt]: {
      primaries: e,
      whitePoint: n,
      transfer: $e,
      toXYZ: Wr,
      fromXYZ: Xr,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: wt }
    }
  }), i;
}
const ke = /* @__PURE__ */ Gs();
function nn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Wn(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Rn;
class zs {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let n;
    if (e instanceof HTMLCanvasElement)
      n = e;
    else {
      Rn === void 0 && (Rn = si("canvas")), Rn.width = e.width, Rn.height = e.height;
      const r = Rn.getContext("2d");
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), n = Rn;
    }
    return n.toDataURL(t);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = si("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), a = r.data;
      for (let s = 0; s < a.length; s++)
        a[s] = nn(a[s] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(nn(t[n] / 255) * 255) : t[n] = nn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Vs = 0;
class Rr {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Vs++ }), this.uuid = Yn(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let a;
      if (Array.isArray(r)) {
        a = [];
        for (let s = 0, o = r.length; s < o; s++)
          r[s].isDataTexture ? a.push(Zi(r[s].image)) : a.push(Zi(r[s]));
      } else
        a = Zi(r);
      n.url = a;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Zi(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? zs.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (De("Texture: Unable to serialize Texture."), {});
}
let Hs = 0;
const $i = /* @__PURE__ */ new N();
class yt extends bn {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = yt.DEFAULT_IMAGE, t = yt.DEFAULT_MAPPING, n = 1001, r = 1001, a = 1006, s = 1008, o = 1023, l = 1009, c = yt.DEFAULT_ANISOTROPY, f = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Hs++ }), this.uuid = Yn(), this.name = "", this.source = new Rr(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = a, this.minFilter = s, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Ke(0, 0), this.repeat = new Ke(1, 1), this.center = new Ke(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ue(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = f, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize($i).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize($i).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize($i).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  /**
   * Updates the texture transformation matrix from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (n === void 0) {
        De(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      if (r === void 0) {
        De(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
yt.DEFAULT_IMAGE = null;
yt.DEFAULT_MAPPING = 300;
yt.DEFAULT_ANISOTROPY = 1;
class ct {
  static {
    ct.prototype.isVector4 = !0;
  }
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.x = e, this.y = t, this.z = n, this.w = r;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(e) {
    return this.w = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, a = this.w, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * r + s[12] * a, this.y = s[1] * t + s[5] * n + s[9] * r + s[13] * a, this.z = s[2] * t + s[6] * n + s[10] * r + s[14] * a, this.w = s[3] * t + s[7] * n + s[11] * r + s[15] * a, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, a;
    const l = e.elements, c = l[0], f = l[4], p = l[8], u = l[1], _ = l[5], x = l[9], E = l[2], m = l[6], d = l[10];
    if (Math.abs(f - u) < 0.01 && Math.abs(p - E) < 0.01 && Math.abs(x - m) < 0.01) {
      if (Math.abs(f + u) < 0.1 && Math.abs(p + E) < 0.1 && Math.abs(x + m) < 0.1 && Math.abs(c + _ + d - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const R = (c + 1) / 2, M = (_ + 1) / 2, y = (d + 1) / 2, T = (f + u) / 4, C = (p + E) / 4, g = (x + m) / 4;
      return R > M && R > y ? R < 0.01 ? (n = 0, r = 0.707106781, a = 0.707106781) : (n = Math.sqrt(R), r = T / n, a = C / n) : M > y ? M < 0.01 ? (n = 0.707106781, r = 0, a = 0.707106781) : (r = Math.sqrt(M), n = T / r, a = g / r) : y < 0.01 ? (n = 0.707106781, r = 0.707106781, a = 0) : (a = Math.sqrt(y), n = C / a, r = g / a), this.set(n, r, a, t), this;
    }
    let A = Math.sqrt((m - x) * (m - x) + (p - E) * (p - E) + (u - f) * (u - f));
    return Math.abs(A) < 1e-3 && (A = 1), this.x = (m - x) / A, this.y = (p - E) / A, this.z = (u - f) / A, this.w = Math.acos((c + _ + d - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = We(this.x, e.x, t.x), this.y = We(this.y, e.y, t.y), this.z = We(this.z, e.z, t.z), this.w = We(this.w, e.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = We(this.x, e, t), this.y = We(this.y, e, t), this.z = We(this.z, e, t), this.w = We(this.w, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(We(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class ks extends bn {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
   * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new ct(0, 0, e, t), this.scissorTest = !1, this.viewport = new ct(0, 0, e, t), this.textures = [];
    const r = { width: e, height: t, depth: n.depth }, a = new yt(r), s = n.count;
    for (let o = 0; o < s; o++)
      this.textures[o] = a.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: 1006,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(t);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let r = 0, a = this.textures.length; r < a; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const r = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new Rr(r);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Gt extends ks {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class ka extends yt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Ws extends yt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class mt {
  static {
    mt.prototype.isMatrix4 = !0;
  }
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(e, t, n, r, a, s, o, l, c, f, p, u, _, x, E, m) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, a, s, o, l, c, f, p, u, _, x, E, m);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(e, t, n, r, a, s, o, l, c, f, p, u, _, x, E, m) {
    const d = this.elements;
    return d[0] = e, d[4] = t, d[8] = n, d[12] = r, d[1] = a, d[5] = s, d[9] = o, d[13] = l, d[2] = c, d[6] = f, d[10] = p, d[14] = u, d[3] = _, d[7] = x, d[11] = E, d[15] = m, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new mt().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(e) {
    if (e.determinantAffine() === 0)
      return this.identity();
    const t = this.elements, n = e.elements, r = 1 / Cn.setFromMatrixColumn(e, 0).length(), a = 1 / Cn.setFromMatrixColumn(e, 1).length(), s = 1 / Cn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * a, t[5] = n[5] * a, t[6] = n[6] * a, t[7] = 0, t[8] = n[8] * s, t[9] = n[9] * s, t[10] = n[10] * s, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, a = e.z, s = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), f = Math.cos(a), p = Math.sin(a);
    if (e.order === "XYZ") {
      const u = s * f, _ = s * p, x = o * f, E = o * p;
      t[0] = l * f, t[4] = -l * p, t[8] = c, t[1] = _ + x * c, t[5] = u - E * c, t[9] = -o * l, t[2] = E - u * c, t[6] = x + _ * c, t[10] = s * l;
    } else if (e.order === "YXZ") {
      const u = l * f, _ = l * p, x = c * f, E = c * p;
      t[0] = u + E * o, t[4] = x * o - _, t[8] = s * c, t[1] = s * p, t[5] = s * f, t[9] = -o, t[2] = _ * o - x, t[6] = E + u * o, t[10] = s * l;
    } else if (e.order === "ZXY") {
      const u = l * f, _ = l * p, x = c * f, E = c * p;
      t[0] = u - E * o, t[4] = -s * p, t[8] = x + _ * o, t[1] = _ + x * o, t[5] = s * f, t[9] = E - u * o, t[2] = -s * c, t[6] = o, t[10] = s * l;
    } else if (e.order === "ZYX") {
      const u = s * f, _ = s * p, x = o * f, E = o * p;
      t[0] = l * f, t[4] = x * c - _, t[8] = u * c + E, t[1] = l * p, t[5] = E * c + u, t[9] = _ * c - x, t[2] = -c, t[6] = o * l, t[10] = s * l;
    } else if (e.order === "YZX") {
      const u = s * l, _ = s * c, x = o * l, E = o * c;
      t[0] = l * f, t[4] = E - u * p, t[8] = x * p + _, t[1] = p, t[5] = s * f, t[9] = -o * f, t[2] = -c * f, t[6] = _ * p + x, t[10] = u - E * p;
    } else if (e.order === "XZY") {
      const u = s * l, _ = s * c, x = o * l, E = o * c;
      t[0] = l * f, t[4] = -p, t[8] = c * f, t[1] = u * p + E, t[5] = s * f, t[9] = _ * p - x, t[2] = x * p - _, t[6] = o * f, t[10] = E * p + u;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(e) {
    return this.compose(Xs, e, qs);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(e, t, n) {
    const r = this.elements;
    return Lt.subVectors(e, t), Lt.lengthSq() === 0 && (Lt.z = 1), Lt.normalize(), ln.crossVectors(n, Lt), ln.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Lt.x += 1e-4 : Lt.z += 1e-4, Lt.normalize(), ln.crossVectors(n, Lt)), ln.normalize(), pi.crossVectors(Lt, ln), r[0] = ln.x, r[4] = pi.x, r[8] = Lt.x, r[1] = ln.y, r[5] = pi.y, r[9] = Lt.y, r[2] = ln.z, r[6] = pi.z, r[10] = Lt.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, a = this.elements, s = n[0], o = n[4], l = n[8], c = n[12], f = n[1], p = n[5], u = n[9], _ = n[13], x = n[2], E = n[6], m = n[10], d = n[14], A = n[3], R = n[7], M = n[11], y = n[15], T = r[0], C = r[4], g = r[8], b = r[12], F = r[1], P = r[5], I = r[9], $ = r[13], Y = r[2], B = r[6], k = r[10], H = r[14], Q = r[3], ee = r[7], ie = r[11], se = r[15];
    return a[0] = s * T + o * F + l * Y + c * Q, a[4] = s * C + o * P + l * B + c * ee, a[8] = s * g + o * I + l * k + c * ie, a[12] = s * b + o * $ + l * H + c * se, a[1] = f * T + p * F + u * Y + _ * Q, a[5] = f * C + p * P + u * B + _ * ee, a[9] = f * g + p * I + u * k + _ * ie, a[13] = f * b + p * $ + u * H + _ * se, a[2] = x * T + E * F + m * Y + d * Q, a[6] = x * C + E * P + m * B + d * ee, a[10] = x * g + E * I + m * k + d * ie, a[14] = x * b + E * $ + m * H + d * se, a[3] = A * T + R * F + M * Y + y * Q, a[7] = A * C + R * P + M * B + y * ee, a[11] = A * g + R * I + M * k + y * ie, a[15] = A * b + R * $ + M * H + y * se, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], a = e[12], s = e[1], o = e[5], l = e[9], c = e[13], f = e[2], p = e[6], u = e[10], _ = e[14], x = e[3], E = e[7], m = e[11], d = e[15], A = l * _ - c * u, R = o * _ - c * p, M = o * u - l * p, y = s * _ - c * f, T = s * u - l * f, C = s * p - o * f;
    return t * (E * A - m * R + d * M) - n * (x * A - m * y + d * T) + r * (x * R - E * y + d * C) - a * (x * M - E * T + m * C);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], a = e[1], s = e[5], o = e[9], l = e[2], c = e[6], f = e[10];
    return t * (s * f - o * c) - n * (a * f - o * l) + r * (a * c - s * l);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], s = e[4], o = e[5], l = e[6], c = e[7], f = e[8], p = e[9], u = e[10], _ = e[11], x = e[12], E = e[13], m = e[14], d = e[15], A = t * o - n * s, R = t * l - r * s, M = t * c - a * s, y = n * l - r * o, T = n * c - a * o, C = r * c - a * l, g = f * E - p * x, b = f * m - u * x, F = f * d - _ * x, P = p * m - u * E, I = p * d - _ * E, $ = u * d - _ * m, Y = A * $ - R * I + M * P + y * F - T * b + C * g;
    if (Y === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const B = 1 / Y;
    return e[0] = (o * $ - l * I + c * P) * B, e[1] = (r * I - n * $ - a * P) * B, e[2] = (E * C - m * T + d * y) * B, e[3] = (u * T - p * C - _ * y) * B, e[4] = (l * F - s * $ - c * b) * B, e[5] = (t * $ - r * F + a * b) * B, e[6] = (m * M - x * C - d * R) * B, e[7] = (f * C - u * M + _ * R) * B, e[8] = (s * I - o * F + c * g) * B, e[9] = (n * F - t * I - a * g) * B, e[10] = (x * T - E * M + d * A) * B, e[11] = (p * M - f * T - _ * A) * B, e[12] = (o * b - s * P - l * g) * B, e[13] = (t * P - n * b + r * g) * B, e[14] = (E * R - x * y - m * A) * B, e[15] = (f * y - p * R + u * A) * B, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, a = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= a, t[1] *= n, t[5] *= r, t[9] *= a, t[2] *= n, t[6] *= r, t[10] *= a, t[3] *= n, t[7] *= r, t[11] *= a, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), a = 1 - n, s = e.x, o = e.y, l = e.z, c = a * s, f = a * o;
    return this.set(
      c * s + n,
      c * o - r * l,
      c * l + r * o,
      0,
      c * o + r * l,
      f * o + n,
      f * l - r * s,
      0,
      c * l - r * o,
      f * l + r * s,
      a * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(e, t, n, r, a, s) {
    return this.set(
      1,
      n,
      a,
      0,
      e,
      1,
      s,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(e, t, n) {
    const r = this.elements, a = t._x, s = t._y, o = t._z, l = t._w, c = a + a, f = s + s, p = o + o, u = a * c, _ = a * f, x = a * p, E = s * f, m = s * p, d = o * p, A = l * c, R = l * f, M = l * p, y = n.x, T = n.y, C = n.z;
    return r[0] = (1 - (E + d)) * y, r[1] = (_ + M) * y, r[2] = (x - R) * y, r[3] = 0, r[4] = (_ - M) * T, r[5] = (1 - (u + d)) * T, r[6] = (m + A) * T, r[7] = 0, r[8] = (x + R) * C, r[9] = (m - A) * C, r[10] = (1 - (u + E)) * C, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(e, t, n) {
    const r = this.elements;
    e.x = r[12], e.y = r[13], e.z = r[14];
    const a = this.determinantAffine();
    if (a === 0)
      return n.set(1, 1, 1), t.identity(), this;
    let s = Cn.set(r[0], r[1], r[2]).length();
    const o = Cn.set(r[4], r[5], r[6]).length(), l = Cn.set(r[8], r[9], r[10]).length();
    a < 0 && (s = -s), zt.copy(this);
    const c = 1 / s, f = 1 / o, p = 1 / l;
    return zt.elements[0] *= c, zt.elements[1] *= c, zt.elements[2] *= c, zt.elements[4] *= f, zt.elements[5] *= f, zt.elements[6] *= f, zt.elements[8] *= p, zt.elements[9] *= p, zt.elements[10] *= p, t.setFromRotationMatrix(zt), n.x = s, n.y = o, n.z = l, this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(e, t, n, r, a, s, o = 2e3, l = !1) {
    const c = this.elements, f = 2 * a / (t - e), p = 2 * a / (n - r), u = (t + e) / (t - e), _ = (n + r) / (n - r);
    let x, E;
    if (l)
      x = a / (s - a), E = s * a / (s - a);
    else if (o === 2e3)
      x = -(s + a) / (s - a), E = -2 * s * a / (s - a);
    else if (o === 2001)
      x = -s / (s - a), E = -s * a / (s - a);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return c[0] = f, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = p, c[9] = _, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = x, c[14] = E, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(e, t, n, r, a, s, o = 2e3, l = !1) {
    const c = this.elements, f = 2 / (t - e), p = 2 / (n - r), u = -(t + e) / (t - e), _ = -(n + r) / (n - r);
    let x, E;
    if (l)
      x = 1 / (s - a), E = s / (s - a);
    else if (o === 2e3)
      x = -2 / (s - a), E = -(s + a) / (s - a);
    else if (o === 2001)
      x = -1 / (s - a), E = -a / (s - a);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return c[0] = f, c[4] = 0, c[8] = 0, c[12] = u, c[1] = 0, c[5] = p, c[9] = 0, c[13] = _, c[2] = 0, c[6] = 0, c[10] = x, c[14] = E, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const Cn = /* @__PURE__ */ new N(), zt = /* @__PURE__ */ new mt(), Xs = /* @__PURE__ */ new N(0, 0, 0), qs = /* @__PURE__ */ new N(1, 1, 1), ln = /* @__PURE__ */ new N(), pi = /* @__PURE__ */ new N(), Lt = /* @__PURE__ */ new N(), qr = /* @__PURE__ */ new mt(), Yr = /* @__PURE__ */ new Kn();
class Tn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(e = 0, t = 0, n = 0, r = Tn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, a = r[0], s = r[4], o = r[8], l = r[1], c = r[5], f = r[9], p = r[2], u = r[6], _ = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(We(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-f, _), this._z = Math.atan2(-s, a)) : (this._x = Math.atan2(u, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-We(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(o, _), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-p, a), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(We(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-p, _), this._z = Math.atan2(-s, c)) : (this._y = 0, this._z = Math.atan2(l, a));
        break;
      case "ZYX":
        this._y = Math.asin(-We(p, -1, 1)), Math.abs(p) < 0.9999999 ? (this._x = Math.atan2(u, _), this._z = Math.atan2(l, a)) : (this._x = 0, this._z = Math.atan2(-s, c));
        break;
      case "YZX":
        this._z = Math.asin(We(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-f, c), this._y = Math.atan2(-p, a)) : (this._x = 0, this._y = Math.atan2(o, _));
        break;
      case "XZY":
        this._z = Math.asin(-We(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(u, c), this._y = Math.atan2(o, a)) : (this._x = Math.atan2(-f, _), this._y = 0);
        break;
      default:
        De("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(e, t, n) {
    return qr.makeRotationFromQuaternion(e), this.setFromRotationMatrix(qr, t, n);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(e) {
    return Yr.setFromEuler(this), this.setFromQuaternion(Yr, e);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Tn.DEFAULT_ORDER = "XYZ";
class Wa {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = -1;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Ys = 0;
const Kr = /* @__PURE__ */ new N(), wn = /* @__PURE__ */ new Kn(), Jt = /* @__PURE__ */ new mt(), mi = /* @__PURE__ */ new N(), Jn = /* @__PURE__ */ new N(), Ks = /* @__PURE__ */ new N(), Zs = /* @__PURE__ */ new Kn(), Zr = /* @__PURE__ */ new N(1, 0, 0), $r = /* @__PURE__ */ new N(0, 1, 0), Jr = /* @__PURE__ */ new N(0, 0, 1), Qr = { type: "added" }, $s = { type: "removed" }, Pn = { type: "childadded", child: null }, Ji = { type: "childremoved", child: null };
class It extends bn {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Ys++ }), this.uuid = Yn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = It.DEFAULT_UP.clone();
    const e = new N(), t = new Tn(), n = new Kn(), r = new N(1, 1, 1);
    function a() {
      n.setFromEuler(t, !1);
    }
    function s() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(a), n._onChange(s), Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new mt()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Ue()
      }
    }), this.matrix = new mt(), this.matrixWorld = new mt(), this.matrixAutoUpdate = It.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Wa(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(e, t) {
    return wn.setFromAxisAngle(e, t), this.quaternion.multiply(wn), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(e, t) {
    return wn.setFromAxisAngle(e, t), this.quaternion.premultiply(wn), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(e) {
    return this.rotateOnAxis(Zr, e);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(e) {
    return this.rotateOnAxis($r, e);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(e) {
    return this.rotateOnAxis(Jr, e);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(e, t) {
    return Kr.copy(e).applyQuaternion(this.quaternion), this.position.add(Kr.multiplyScalar(t)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(e) {
    return this.translateOnAxis(Zr, e);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(e) {
    return this.translateOnAxis($r, e);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(e) {
    return this.translateOnAxis(Jr, e);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Jt.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(e, t, n) {
    e.isVector3 ? mi.copy(e) : mi.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Jn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Jt.lookAt(Jn, mi, this.up) : Jt.lookAt(mi, Jn, this.up), this.quaternion.setFromRotationMatrix(Jt), r && (Jt.extractRotation(r.matrixWorld), wn.setFromRotationMatrix(Jt), this.quaternion.premultiply(wn.invert()));
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (Ye("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Qr), Pn.child = e, this.dispatchEvent(Pn), Pn.child = null) : Ye("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent($s), Ji.child = e, this.dispatchEvent(Ji), Ji.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Jt.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Jt.multiply(e.parent.matrixWorld)), e.applyMatrix4(Jt), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Qr), Pn.child = e, this.dispatchEvent(Pn), Pn.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const s = this.children[n].getObjectByProperty(e, t);
      if (s !== void 0)
        return s;
    }
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let a = 0, s = r.length; a < s; a++)
      r[a].getObjectsByProperty(e, t, n);
    return n;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Jn, e, Ks), e;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Jn, Zs, e), e;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x, n = e.y, r = e.z, a = this.matrix.elements;
      a[12] += t - a[0] * t - a[4] * n - a[8] * r, a[13] += n - a[1] * t - a[5] * n - a[9] * r, a[14] += r - a[2] * t - a[6] * n - a[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].updateMatrixWorld(e);
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateWorldMatrix(e, t, n = !1) {
    const r = this.parent;
    if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
      const a = this.children;
      for (let s = 0, o = a.length; s < o; s++)
        a[s].updateWorldMatrix(!1, !0, n);
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function a(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = a(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, f = l.length; c < f; c++) {
            const p = l[c];
            a(e.shapes, p);
          }
        else
          a(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (a(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(a(e.materials, this.material[l]));
        r.material = o;
      } else
        r.material = a(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(a(e.animations, l));
      }
    }
    if (t) {
      const o = s(e.geometries), l = s(e.materials), c = s(e.textures), f = s(e.images), p = s(e.shapes), u = s(e.skeletons), _ = s(e.animations), x = s(e.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), f.length > 0 && (n.images = f), p.length > 0 && (n.shapes = p), u.length > 0 && (n.skeletons = u), _.length > 0 && (n.animations = _), x.length > 0 && (n.nodes = x);
    }
    return n.object = r, n;
    function s(o) {
      const l = [];
      for (const c in o) {
        const f = o[c];
        delete f.metadata, l.push(f);
      }
      return l;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot !== null ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
It.DEFAULT_UP = /* @__PURE__ */ new N(0, 1, 0);
It.DEFAULT_MATRIX_AUTO_UPDATE = !0;
It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class _i extends It {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Js = { type: "move" };
class Qi {
  /**
   * Constructs a new XR controller.
   */
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  /**
   * Returns a group representing the hand space of the XR controller.
   *
   * @return {Group} A group representing the hand space of the XR controller.
   */
  getHandSpace() {
    return this._hand === null && (this._hand = new _i(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new _i(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new N(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new N()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new _i(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new N(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new N(), this._grip.eventsEnabled = !1), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  /**
   * Updates the controller with the given input source, XR frame and reference space.
   * This updates the transformations of the groups that represent the different
   * coordinate systems of the controller.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @param {XRFrame} frame - The XR frame.
   * @param {XRReferenceSpace} referenceSpace - The reference space.
   * @return {WebXRController} A reference to this instance.
   */
  update(e, t, n) {
    let r = null, a = null, s = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        s = !0;
        for (const E of e.hand.values()) {
          const m = t.getJointPose(E, n), d = this._getHandJoint(c, E);
          m !== null && (d.matrix.fromArray(m.transform.matrix), d.matrix.decompose(d.position, d.rotation, d.scale), d.matrixWorldNeedsUpdate = !0, d.jointRadius = m.radius), d.visible = m !== null;
        }
        const f = c.joints["index-finger-tip"], p = c.joints["thumb-tip"], u = f.position.distanceTo(p.position), _ = 0.02, x = 5e-3;
        c.inputState.pinching && u > _ + x ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && u <= _ - x && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (a = t.getPose(e.gripSpace, n), a !== null && (l.matrix.fromArray(a.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, a.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(a.linearVelocity)) : l.hasLinearVelocity = !1, a.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(a.angularVelocity)) : l.hasAngularVelocity = !1, l.eventsEnabled && l.dispatchEvent({
          type: "gripUpdated",
          data: e,
          target: this
        })));
      o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && a !== null && (r = a), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Js)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = a !== null), c !== null && (c.visible = s !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new _i();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const Xa = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, cn = { h: 0, s: 0, l: 0 }, gi = { h: 0, s: 0, l: 0 };
function ji(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Ze {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(e, t = wt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, ke.colorSpaceToWorking(this, t), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(e, t, n, r = ke.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, ke.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(e, t, n, r = ke.workingColorSpace) {
    if (e = Ar(e, 1), t = We(t, 0, 1), n = We(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const a = n <= 0.5 ? n * (1 + t) : n + t - n * t, s = 2 * n - a;
      this.r = ji(s, a, e + 1 / 3), this.g = ji(s, a, e), this.b = ji(s, a, e - 1 / 3);
    }
    return ke.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(e, t = wt) {
    function n(a) {
      a !== void 0 && parseFloat(a) < 1 && De("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let a;
      const s = r[1], o = r[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (a = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(a[4]), this.setRGB(
              Math.min(255, parseInt(a[1], 10)) / 255,
              Math.min(255, parseInt(a[2], 10)) / 255,
              Math.min(255, parseInt(a[3], 10)) / 255,
              t
            );
          if (a = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(a[4]), this.setRGB(
              Math.min(100, parseInt(a[1], 10)) / 100,
              Math.min(100, parseInt(a[2], 10)) / 100,
              Math.min(100, parseInt(a[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (a = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(a[4]), this.setHSL(
              parseFloat(a[1]) / 360,
              parseFloat(a[2]) / 100,
              parseFloat(a[3]) / 100,
              t
            );
          break;
        default:
          De("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const a = r[1], s = a.length;
      if (s === 3)
        return this.setRGB(
          parseInt(a.charAt(0), 16) / 15,
          parseInt(a.charAt(1), 16) / 15,
          parseInt(a.charAt(2), 16) / 15,
          t
        );
      if (s === 6)
        return this.setHex(parseInt(a, 16), t);
      De("Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(e, t = wt) {
    const n = Xa[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : De("Color: Unknown color " + e), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(e) {
    return this.r = nn(e.r), this.g = nn(e.g), this.b = nn(e.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(e) {
    return this.r = Wn(e.r), this.g = Wn(e.g), this.b = Wn(e.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(e = wt) {
    return ke.workingToColorSpace(bt.copy(this), e), Math.round(We(bt.r * 255, 0, 255)) * 65536 + Math.round(We(bt.g * 255, 0, 255)) * 256 + Math.round(We(bt.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(e = wt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(e, t = ke.workingColorSpace) {
    ke.workingToColorSpace(bt.copy(this), t);
    const n = bt.r, r = bt.g, a = bt.b, s = Math.max(n, r, a), o = Math.min(n, r, a);
    let l, c;
    const f = (o + s) / 2;
    if (o === s)
      l = 0, c = 0;
    else {
      const p = s - o;
      switch (c = f <= 0.5 ? p / (s + o) : p / (2 - s - o), s) {
        case n:
          l = (r - a) / p + (r < a ? 6 : 0);
          break;
        case r:
          l = (a - n) / p + 2;
          break;
        case a:
          l = (n - r) / p + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = f, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(e, t = ke.workingColorSpace) {
    return ke.workingToColorSpace(bt.copy(this), t), e.r = bt.r, e.g = bt.g, e.b = bt.b, e;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(e = wt) {
    ke.workingToColorSpace(bt.copy(this), e);
    const t = bt.r, n = bt.g, r = bt.b;
    return e !== wt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(e, t, n) {
    return this.getHSL(cn), this.setHSL(cn.h + e, cn.s + t, cn.l + n);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(e, t) {
    this.getHSL(cn), e.getHSL(gi);
    const n = ai(cn.h, gi.h, t), r = ai(cn.s, gi.s, t), a = ai(cn.l, gi.l, t);
    return this.setHSL(n, r, a), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, a = e.elements;
    return this.r = a[0] * t + a[3] * n + a[6] * r, this.g = a[1] * t + a[4] * n + a[7] * r, this.b = a[2] * t + a[5] * n + a[8] * r, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const bt = /* @__PURE__ */ new Ze();
Ze.NAMES = Xa;
class Qs extends It {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Tn(), this.environmentIntensity = 1, this.environmentRotation = new Tn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
const Vt = /* @__PURE__ */ new N(), Qt = /* @__PURE__ */ new N(), er = /* @__PURE__ */ new N(), jt = /* @__PURE__ */ new N(), Dn = /* @__PURE__ */ new N(), Ln = /* @__PURE__ */ new N(), jr = /* @__PURE__ */ new N(), tr = /* @__PURE__ */ new N(), nr = /* @__PURE__ */ new N(), ir = /* @__PURE__ */ new N(), rr = /* @__PURE__ */ new ct(), ar = /* @__PURE__ */ new ct(), sr = /* @__PURE__ */ new ct();
class Wt {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(e = new N(), t = new N(), n = new N()) {
    this.a = e, this.b = t, this.c = n;
  }
  /**
   * Computes the normal vector of a triangle.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), Vt.subVectors(e, t), r.cross(Vt);
    const a = r.lengthSq();
    return a > 0 ? r.multiplyScalar(1 / Math.sqrt(a)) : r.set(0, 0, 0);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  static getBarycoord(e, t, n, r, a) {
    Vt.subVectors(r, t), Qt.subVectors(n, t), er.subVectors(e, t);
    const s = Vt.dot(Vt), o = Vt.dot(Qt), l = Vt.dot(er), c = Qt.dot(Qt), f = Qt.dot(er), p = s * c - o * o;
    if (p === 0)
      return a.set(0, 0, 0), null;
    const u = 1 / p, _ = (c * l - o * f) * u, x = (s * f - o * l) * u;
    return a.set(1 - _ - x, x, _);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, jt) === null ? !1 : jt.x >= 0 && jt.y >= 0 && jt.x + jt.y <= 1;
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} p1 - The first corner of the triangle.
   * @param {Vector3} p2 - The second corner of the triangle.
   * @param {Vector3} p3 - The third corner of the triangle.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  static getInterpolation(e, t, n, r, a, s, o, l) {
    return this.getBarycoord(e, t, n, r, jt) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(a, jt.x), l.addScaledVector(s, jt.y), l.addScaledVector(o, jt.z), l);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(e, t, n, r, a, s) {
    return rr.setScalar(0), ar.setScalar(0), sr.setScalar(0), rr.fromBufferAttribute(e, t), ar.fromBufferAttribute(e, n), sr.fromBufferAttribute(e, r), s.setScalar(0), s.addScaledVector(rr, a.x), s.addScaledVector(ar, a.y), s.addScaledVector(sr, a.z), s;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(e, t, n, r) {
    return Vt.subVectors(n, t), Qt.subVectors(e, t), Vt.cross(Qt).dot(r) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return Vt.subVectors(this.c, this.b), Qt.subVectors(this.a, this.b), Vt.cross(Qt).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(e) {
    return Wt.getNormal(this.a, this.b, this.c, e);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(e, t) {
    return Wt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(e, t, n, r, a) {
    return Wt.getInterpolation(e, this.a, this.b, this.c, t, n, r, a);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(e) {
    return Wt.containsPoint(e, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(e) {
    return Wt.isFrontFacing(this.a, this.b, this.c, e);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, a = this.c;
    let s, o;
    Dn.subVectors(r, n), Ln.subVectors(a, n), tr.subVectors(e, n);
    const l = Dn.dot(tr), c = Ln.dot(tr);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    nr.subVectors(e, r);
    const f = Dn.dot(nr), p = Ln.dot(nr);
    if (f >= 0 && p <= f)
      return t.copy(r);
    const u = l * p - f * c;
    if (u <= 0 && l >= 0 && f <= 0)
      return s = l / (l - f), t.copy(n).addScaledVector(Dn, s);
    ir.subVectors(e, a);
    const _ = Dn.dot(ir), x = Ln.dot(ir);
    if (x >= 0 && _ <= x)
      return t.copy(a);
    const E = _ * c - l * x;
    if (E <= 0 && c >= 0 && x <= 0)
      return o = c / (c - x), t.copy(n).addScaledVector(Ln, o);
    const m = f * x - _ * p;
    if (m <= 0 && p - f >= 0 && _ - x >= 0)
      return jr.subVectors(a, r), o = (p - f) / (p - f + (_ - x)), t.copy(r).addScaledVector(jr, o);
    const d = 1 / (m + E + u);
    return s = E * d, o = u * d, t.copy(n).addScaledVector(Dn, s).addScaledVector(Ln, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class li {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(e = new N(1 / 0, 1 / 0, 1 / 0), t = new N(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Ht.fromArray(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Ht.fromBufferAttribute(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(e, t) {
    const n = Ht.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * Note: To compute the correct bounding box, make sure the given 3D object
   * has an up-to-date world matrix that reflects the current transformation of its
   * ancestor nodes. Call `object.updateWorldMatrix( true, false )` beforehand if
   * you're unsure.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const a = n.getAttribute("position");
      if (t === !0 && a !== void 0 && e.isInstancedMesh !== !0)
        for (let s = 0, o = a.count; s < o; s++)
          e.isMesh === !0 ? e.getVertexPosition(s, Ht) : Ht.fromBufferAttribute(a, s), Ht.applyMatrix4(e.matrixWorld), this.expandByPoint(Ht);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), xi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), xi.copy(n.boundingBox)), xi.applyMatrix4(e.matrixWorld), this.union(xi);
    }
    const r = e.children;
    for (let a = 0, s = r.length; a < s; a++)
      this.expandByObject(r[a], t);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(e) {
    return this.clampPoint(e.center, Ht), Ht.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Qn), vi.subVectors(this.max, Qn), Fn.subVectors(e.a, Qn), In.subVectors(e.b, Qn), Un.subVectors(e.c, Qn), un.subVectors(In, Fn), fn.subVectors(Un, In), gn.subVectors(Fn, Un);
    let t = [
      0,
      -un.z,
      un.y,
      0,
      -fn.z,
      fn.y,
      0,
      -gn.z,
      gn.y,
      un.z,
      0,
      -un.x,
      fn.z,
      0,
      -fn.x,
      gn.z,
      0,
      -gn.x,
      -un.y,
      un.x,
      0,
      -fn.y,
      fn.x,
      0,
      -gn.y,
      gn.x,
      0
    ];
    return !or(t, Fn, In, Un, vi) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !or(t, Fn, In, Un, vi)) ? !1 : (Mi.crossVectors(un, fn), t = [Mi.x, Mi.y, Mi.z], or(t, Fn, In, Un, vi));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(e) {
    return this.clampPoint(e, Ht).distanceTo(e);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Ht).length() * 0.5), e;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(e) {
    return this.isEmpty() ? this : (en[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), en[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), en[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), en[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), en[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), en[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), en[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), en[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(en), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const en = [
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N()
], Ht = /* @__PURE__ */ new N(), xi = /* @__PURE__ */ new li(), Fn = /* @__PURE__ */ new N(), In = /* @__PURE__ */ new N(), Un = /* @__PURE__ */ new N(), un = /* @__PURE__ */ new N(), fn = /* @__PURE__ */ new N(), gn = /* @__PURE__ */ new N(), Qn = /* @__PURE__ */ new N(), vi = /* @__PURE__ */ new N(), Mi = /* @__PURE__ */ new N(), xn = /* @__PURE__ */ new N();
function or(i, e, t, n, r) {
  for (let a = 0, s = i.length - 3; a <= s; a += 3) {
    xn.fromArray(i, a);
    const o = r.x * Math.abs(xn.x) + r.y * Math.abs(xn.y) + r.z * Math.abs(xn.z), l = e.dot(xn), c = t.dot(xn), f = n.dot(xn);
    if (Math.max(-Math.max(l, c, f), Math.min(l, c, f)) > o)
      return !1;
  }
  return !0;
}
const xt = /* @__PURE__ */ new N(), Si = /* @__PURE__ */ new Ke();
let js = 0;
class $t extends bn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n = !1) {
    if (super(), Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: js++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(e) {
    return this.usage = e, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, a = this.itemSize; r < a; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(e) {
    return this.array.set(e), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        Si.fromBufferAttribute(this, t), Si.applyMatrix3(e), this.setXY(t, Si.x, Si.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        xt.fromBufferAttribute(this, t), xt.applyMatrix3(e), this.setXYZ(t, xt.x, xt.y, xt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      xt.fromBufferAttribute(this, t), xt.applyMatrix4(e), this.setXYZ(t, xt.x, xt.y, xt.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      xt.fromBufferAttribute(this, t), xt.applyNormalMatrix(e), this.setXYZ(t, xt.x, xt.y, xt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      xt.fromBufferAttribute(this, t), xt.transformDirection(e), this.setXYZ(t, xt.x, xt.y, xt.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Hn(n, this.array)), n;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(e, t, n) {
    return this.normalized && (n = At(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Hn(t, this.array)), t;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(e, t) {
    return this.normalized && (t = At(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Hn(t, this.array)), t;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(e, t) {
    return this.normalized && (t = At(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Hn(t, this.array)), t;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(e, t) {
    return this.normalized && (t = At(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Hn(t, this.array)), t;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(e, t) {
    return this.normalized && (t = At(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = At(t, this.array), n = At(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = At(t, this.array), n = At(n, this.array), r = At(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(e, t, n, r, a) {
    return e *= this.itemSize, this.normalized && (t = At(t, this.array), n = At(n, this.array), r = At(r, this.array), a = At(a, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = a, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
  /**
   * Disposes of the buffer attribute. Available only in {@link WebGPURenderer}.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class qa extends $t {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Ya extends $t {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class Pt extends $t {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
const eo = /* @__PURE__ */ new li(), jn = /* @__PURE__ */ new N(), lr = /* @__PURE__ */ new N();
class Vi {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(e = new N(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : eo.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let a = 0, s = e.length; a < s; a++)
      r = Math.max(r, n.distanceToSquared(e[a]));
    return this.radius = Math.sqrt(r), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(e) {
    return this.center.add(e), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    jn.subVectors(e, this.center);
    const t = jn.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(jn, r / n), this.radius += r;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (lr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(jn.copy(e.center).add(lr)), this.expandByPoint(jn.copy(e.center).sub(lr))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
let to = 0;
const Bt = /* @__PURE__ */ new mt(), cr = /* @__PURE__ */ new It(), Nn = /* @__PURE__ */ new N(), Ft = /* @__PURE__ */ new li(), ei = /* @__PURE__ */ new li(), St = /* @__PURE__ */ new N();
class Xt extends bn {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: to++ }), this.uuid = Yn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = !1;
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /**
   * Sets the given index to this geometry.
   *
   * @param {Array<number>|BufferAttribute} index - The index to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (xs(e) ? Ya : qa)(e, 1) : this.index = e, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  /**
   * Clears all groups.
   */
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const a = new Ue().getNormalMatrix(e);
      n.applyNormalMatrix(a), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(e) {
    return Bt.makeRotationFromQuaternion(e), this.applyMatrix4(Bt), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(e) {
    return Bt.makeRotationX(e), this.applyMatrix4(Bt), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(e) {
    return Bt.makeRotationY(e), this.applyMatrix4(Bt), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(e) {
    return Bt.makeRotationZ(e), this.applyMatrix4(Bt), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(e, t, n) {
    return Bt.makeTranslation(e, t, n), this.applyMatrix4(Bt), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(e, t, n) {
    return Bt.makeScale(e, t, n), this.applyMatrix4(Bt), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(e) {
    return cr.lookAt(e), cr.updateMatrix(), this.applyMatrix4(cr.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Nn).negate(), this.translate(Nn.x, Nn.y, Nn.z), this;
  }
  /**
   * Defines a geometry by creating a `position` attribute based on the given array of points. The array
   * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
   * set to `0`.
   *
   * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
   * data from the array. The length of the array must match the vertex count.
   *
   * @param {Array<Vector2>|Array<Vector3>} points - The points.
   * @return {BufferGeometry} A reference to this instance.
   */
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, a = e.length; r < a; r++) {
        const s = e[r];
        n.push(s.x, s.y, s.z || 0);
      }
      this.setAttribute("position", new Pt(n, 3));
    } else {
      const n = Math.min(e.length, t.count);
      for (let r = 0; r < n; r++) {
        const a = e[r];
        t.setXYZ(r, a.x, a.y, a.z || 0);
      }
      e.length > t.count && De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new li());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new N(-1 / 0, -1 / 0, -1 / 0),
        new N(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const a = t[n];
          Ft.setFromBufferAttribute(a), this.morphTargetsRelative ? (St.addVectors(this.boundingBox.min, Ft.min), this.boundingBox.expandByPoint(St), St.addVectors(this.boundingBox.max, Ft.max), this.boundingBox.expandByPoint(St)) : (this.boundingBox.expandByPoint(Ft.min), this.boundingBox.expandByPoint(Ft.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Vi());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new N(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Ft.setFromBufferAttribute(e), t)
        for (let a = 0, s = t.length; a < s; a++) {
          const o = t[a];
          ei.setFromBufferAttribute(o), this.morphTargetsRelative ? (St.addVectors(Ft.min, ei.min), Ft.expandByPoint(St), St.addVectors(Ft.max, ei.max), Ft.expandByPoint(St)) : (Ft.expandByPoint(ei.min), Ft.expandByPoint(ei.max));
        }
      Ft.getCenter(n);
      let r = 0;
      for (let a = 0, s = e.count; a < s; a++)
        St.fromBufferAttribute(e, a), r = Math.max(r, n.distanceToSquared(St));
      if (t)
        for (let a = 0, s = t.length; a < s; a++) {
          const o = t[a], l = this.morphTargetsRelative;
          for (let c = 0, f = o.count; c < f; c++)
            St.fromBufferAttribute(o, c), l && (Nn.fromBufferAttribute(e, c), St.add(Nn)), r = Math.max(r, n.distanceToSquared(St));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /**
   * Calculates and adds a tangent attribute to this geometry.
   *
   * The computation is only supported for indexed geometries and if position, normal, and uv attributes
   * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
   * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
   */
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, r = t.normal, a = t.uv;
    let s = this.getAttribute("tangent");
    (s === void 0 || s.count !== n.count) && (s = new $t(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", s));
    const o = [], l = [];
    for (let g = 0; g < n.count; g++)
      o[g] = new N(), l[g] = new N();
    const c = new N(), f = new N(), p = new N(), u = new Ke(), _ = new Ke(), x = new Ke(), E = new N(), m = new N();
    function d(g, b, F) {
      c.fromBufferAttribute(n, g), f.fromBufferAttribute(n, b), p.fromBufferAttribute(n, F), u.fromBufferAttribute(a, g), _.fromBufferAttribute(a, b), x.fromBufferAttribute(a, F), f.sub(c), p.sub(c), _.sub(u), x.sub(u);
      const P = 1 / (_.x * x.y - x.x * _.y);
      isFinite(P) && (E.copy(f).multiplyScalar(x.y).addScaledVector(p, -_.y).multiplyScalar(P), m.copy(p).multiplyScalar(_.x).addScaledVector(f, -x.x).multiplyScalar(P), o[g].add(E), o[b].add(E), o[F].add(E), l[g].add(m), l[b].add(m), l[F].add(m));
    }
    let A = this.groups;
    A.length === 0 && (A = [{
      start: 0,
      count: e.count
    }]);
    for (let g = 0, b = A.length; g < b; ++g) {
      const F = A[g], P = F.start, I = F.count;
      for (let $ = P, Y = P + I; $ < Y; $ += 3)
        d(
          e.getX($ + 0),
          e.getX($ + 1),
          e.getX($ + 2)
        );
    }
    const R = new N(), M = new N(), y = new N(), T = new N();
    function C(g) {
      y.fromBufferAttribute(r, g), T.copy(y);
      const b = o[g];
      R.copy(b), R.sub(y.multiplyScalar(y.dot(b))).normalize(), M.crossVectors(T, b);
      const P = M.dot(l[g]) < 0 ? -1 : 1;
      s.setXYZW(g, R.x, R.y, R.z, P);
    }
    for (let g = 0, b = A.length; g < b; ++g) {
      const F = A[g], P = F.start, I = F.count;
      for (let $ = P, Y = P + I; $ < Y; $ += 3)
        C(e.getX($ + 0)), C(e.getX($ + 1)), C(e.getX($ + 2));
    }
    this._transformed = !0;
  }
  /**
   * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
   * each vertex normal to be the average of the face normals of the faces that share that vertex.
   * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
   * to be the same as the face normal.
   */
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== t.count)
        n = new $t(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let u = 0, _ = n.count; u < _; u++)
          n.setXYZ(u, 0, 0, 0);
      const r = new N(), a = new N(), s = new N(), o = new N(), l = new N(), c = new N(), f = new N(), p = new N();
      if (e)
        for (let u = 0, _ = e.count; u < _; u += 3) {
          const x = e.getX(u + 0), E = e.getX(u + 1), m = e.getX(u + 2);
          r.fromBufferAttribute(t, x), a.fromBufferAttribute(t, E), s.fromBufferAttribute(t, m), f.subVectors(s, a), p.subVectors(r, a), f.cross(p), o.fromBufferAttribute(n, x), l.fromBufferAttribute(n, E), c.fromBufferAttribute(n, m), o.add(f), l.add(f), c.add(f), n.setXYZ(x, o.x, o.y, o.z), n.setXYZ(E, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let u = 0, _ = t.count; u < _; u += 3)
          r.fromBufferAttribute(t, u + 0), a.fromBufferAttribute(t, u + 1), s.fromBufferAttribute(t, u + 2), f.subVectors(s, a), p.subVectors(r, a), f.cross(p), n.setXYZ(u + 0, f.x, f.y, f.z), n.setXYZ(u + 1, f.x, f.y, f.z), n.setXYZ(u + 2, f.x, f.y, f.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      St.fromBufferAttribute(e, t), St.normalize(), e.setXYZ(t, St.x, St.y, St.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function e(o, l) {
      const c = o.array, f = o.itemSize, p = o.normalized, u = new c.constructor(l.length * f);
      let _ = 0, x = 0;
      for (let E = 0, m = l.length; E < m; E++) {
        o.isInterleavedBufferAttribute ? _ = l[E] * o.data.stride + o.offset : _ = l[E] * f;
        for (let d = 0; d < f; d++)
          u[x++] = c[_++];
      }
      return new $t(u, f, p);
    }
    if (this.index === null)
      return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Xt(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = e(l, n);
      t.setAttribute(o, c);
    }
    const a = this.morphAttributes;
    for (const o in a) {
      const l = [], c = a[o];
      for (let f = 0, p = c.length; f < p; f++) {
        const u = c[f], _ = e(u, n);
        l.push(_);
      }
      t.morphAttributes[o] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const s = this.groups;
    for (let o = 0, l = s.length; o < l; o++) {
      const c = s[o];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const r = {};
    let a = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], f = [];
      for (let p = 0, u = c.length; p < u; p++) {
        const _ = c[p];
        f.push(_.toJSON(e.data));
      }
      f.length > 0 && (r[l] = f, a = !0);
    }
    a && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const s = this.groups;
    s.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(s)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = o.toJSON()), e;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given geometry to this instance.
   *
   * @param {BufferGeometry} source - The geometry to copy.
   * @return {BufferGeometry} A reference to this instance.
   */
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone());
    const r = e.attributes;
    for (const c in r) {
      const f = r[c];
      this.setAttribute(c, f.clone(t));
    }
    const a = e.morphAttributes;
    for (const c in a) {
      const f = [], p = a[c];
      for (let u = 0, _ = p.length; u < _; u++)
        f.push(p[u].clone(t));
      this.morphAttributes[c] = f;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const s = e.groups;
    for (let c = 0, f = s.length; c < f; c++) {
      const p = s[c];
      this.addGroup(p.start, p.count, p.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires BufferGeometry#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
let no = 0;
class Hi extends bn {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: no++ }), this.uuid = Yn(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ze(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  /**
   * Sets the alpha value to be used when running an alpha test. The material
   * will not be rendered if the opacity is lower than this value.
   *
   * @type {number}
   * @readonly
   * @default 0
   */
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {
  }
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /**
   * This method can be used to set default values from parameter objects.
   * It is a generic implementation so it can be used with different types
   * of materials.
   *
   * @param {Object} [values] - The material values to set.
   */
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          De(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          De(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(a) {
      const s = [];
      for (const o in a) {
        const l = a[o];
        delete l.metadata, s.push(l);
      }
      return s;
    }
    if (t) {
      const a = r(e.textures), s = r(e.images);
      a.length > 0 && (n.textures = a), s.length > 0 && (n.images = s);
    }
    return n;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {Material} A reference to this material.
   */
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Ze().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let n = e.normalScale;
      Array.isArray(n) === !1 && (n = [n, n]), this.normalScale = new Ke().fromArray(n);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new Ke().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given material to this instance.
   *
   * @param {Material} source - The material to copy.
   * @return {Material} A reference to this instance.
   */
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let a = 0; a !== r; ++a)
        n[a] = t[a].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Material#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Setting this property to `true` indicates the engine the material
   * needs to be recompiled.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
const tn = /* @__PURE__ */ new N(), ur = /* @__PURE__ */ new N(), Ei = /* @__PURE__ */ new N(), dn = /* @__PURE__ */ new N(), fr = /* @__PURE__ */ new N(), Ti = /* @__PURE__ */ new N(), dr = /* @__PURE__ */ new N();
class io {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(e = new N(), t = new N(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(e) {
    return this.origin.copy(this.at(e, tn)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(e) {
    const t = tn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (tn.copy(this.origin).addScaledVector(this.direction, t), tn.distanceToSquared(e));
  }
  /**
   * Returns the squared distance between this ray and the given line segment.
   *
   * @param {Vector3} v0 - The start point of the line segment.
   * @param {Vector3} v1 - The end point of the line segment.
   * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
   * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
   * @return {number} The squared distance.
   */
  distanceSqToSegment(e, t, n, r) {
    ur.copy(e).add(t).multiplyScalar(0.5), Ei.copy(t).sub(e).normalize(), dn.copy(this.origin).sub(ur);
    const a = e.distanceTo(t) * 0.5, s = -this.direction.dot(Ei), o = dn.dot(this.direction), l = -dn.dot(Ei), c = dn.lengthSq(), f = Math.abs(1 - s * s);
    let p, u, _, x;
    if (f > 0)
      if (p = s * l - o, u = s * o - l, x = a * f, p >= 0)
        if (u >= -x)
          if (u <= x) {
            const E = 1 / f;
            p *= E, u *= E, _ = p * (p + s * u + 2 * o) + u * (s * p + u + 2 * l) + c;
          } else
            u = a, p = Math.max(0, -(s * u + o)), _ = -p * p + u * (u + 2 * l) + c;
        else
          u = -a, p = Math.max(0, -(s * u + o)), _ = -p * p + u * (u + 2 * l) + c;
      else
        u <= -x ? (p = Math.max(0, -(-s * a + o)), u = p > 0 ? -a : Math.min(Math.max(-a, -l), a), _ = -p * p + u * (u + 2 * l) + c) : u <= x ? (p = 0, u = Math.min(Math.max(-a, -l), a), _ = u * (u + 2 * l) + c) : (p = Math.max(0, -(s * a + o)), u = p > 0 ? a : Math.min(Math.max(-a, -l), a), _ = -p * p + u * (u + 2 * l) + c);
    else
      u = s > 0 ? -a : a, p = Math.max(0, -(s * u + o)), _ = -p * p + u * (u + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, p), r && r.copy(ur).addScaledVector(Ei, u), _;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(e, t) {
    tn.subVectors(e.center, this.origin);
    const n = tn.dot(this.direction), r = tn.dot(tn) - n * n, a = e.radius * e.radius;
    if (r > a) return null;
    const s = Math.sqrt(a - r), o = n - s, l = n + s;
    return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  /**
   * Intersects this ray with the given plane, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Plane} plane - The plane to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(e, t) {
    let n, r, a, s, o, l;
    const c = 1 / this.direction.x, f = 1 / this.direction.y, p = 1 / this.direction.z, u = this.origin;
    return c >= 0 ? (n = (e.min.x - u.x) * c, r = (e.max.x - u.x) * c) : (n = (e.max.x - u.x) * c, r = (e.min.x - u.x) * c), f >= 0 ? (a = (e.min.y - u.y) * f, s = (e.max.y - u.y) * f) : (a = (e.max.y - u.y) * f, s = (e.min.y - u.y) * f), n > s || a > r || ((a > n || isNaN(n)) && (n = a), (s < r || isNaN(r)) && (r = s), p >= 0 ? (o = (e.min.z - u.z) * p, l = (e.max.z - u.z) * p) : (o = (e.max.z - u.z) * p, l = (e.min.z - u.z) * p), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(e) {
    return this.intersectBox(e, tn) !== null;
  }
  /**
   * Intersects this ray with the given triangle, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Vector3} a - The first vertex of the triangle.
   * @param {Vector3} b - The second vertex of the triangle.
   * @param {Vector3} c - The third vertex of the triangle.
   * @param {boolean} backfaceCulling - Whether to use backface culling or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectTriangle(e, t, n, r, a) {
    fr.subVectors(t, e), Ti.subVectors(n, e), dr.crossVectors(fr, Ti);
    let s = this.direction.dot(dr), o;
    if (s > 0) {
      if (r) return null;
      o = 1;
    } else if (s < 0)
      o = -1, s = -s;
    else
      return null;
    dn.subVectors(this.origin, e);
    const l = o * this.direction.dot(Ti.crossVectors(dn, Ti));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(fr.cross(dn));
    if (c < 0 || l + c > s)
      return null;
    const f = -o * dn.dot(dr);
    return f < 0 ? null : this.at(f / s, a);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class Ka extends Hi {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ze(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Tn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const ea = /* @__PURE__ */ new mt(), vn = /* @__PURE__ */ new io(), bi = /* @__PURE__ */ new Vi(), ta = /* @__PURE__ */ new N(), yi = /* @__PURE__ */ new N(), Ai = /* @__PURE__ */ new N(), Ri = /* @__PURE__ */ new N(), hr = /* @__PURE__ */ new N(), Ci = /* @__PURE__ */ new N(), na = /* @__PURE__ */ new N(), wi = /* @__PURE__ */ new N();
class Ut extends It {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(e = new Xt(), t = new Ka()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let a = 0, s = r.length; a < s; a++) {
          const o = r[a].name || String(a);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = a;
        }
      }
    }
  }
  /**
   * Returns the local-space position of the vertex at the given index, taking into
   * account the current animation state of both morph targets and skinning.
   *
   * @param {number} index - The vertex index.
   * @param {Vector3} target - The target object that is used to store the method's result.
   * @return {Vector3} The vertex position in local space.
   */
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, a = n.morphAttributes.position, s = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (a && o) {
      Ci.set(0, 0, 0);
      for (let l = 0, c = a.length; l < c; l++) {
        const f = o[l], p = a[l];
        f !== 0 && (hr.fromBufferAttribute(p, e), s ? Ci.addScaledVector(hr, f) : Ci.addScaledVector(hr.sub(t), f));
      }
      t.add(Ci);
    }
    return t;
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const n = this.geometry, r = this.material, a = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), bi.copy(n.boundingSphere), bi.applyMatrix4(a), vn.copy(e.ray).recast(e.near), !(bi.containsPoint(vn.origin) === !1 && (vn.intersectSphere(bi, ta) === null || vn.origin.distanceToSquared(ta) > (e.far - e.near) ** 2)) && (ea.copy(a).invert(), vn.copy(e.ray).applyMatrix4(ea), !(n.boundingBox !== null && vn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, vn)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const a = this.geometry, s = this.material, o = a.index, l = a.attributes.position, c = a.attributes.uv, f = a.attributes.uv1, p = a.attributes.normal, u = a.groups, _ = a.drawRange;
    if (o !== null)
      if (Array.isArray(s))
        for (let x = 0, E = u.length; x < E; x++) {
          const m = u[x], d = s[m.materialIndex], A = Math.max(m.start, _.start), R = Math.min(o.count, Math.min(m.start + m.count, _.start + _.count));
          for (let M = A, y = R; M < y; M += 3) {
            const T = o.getX(M), C = o.getX(M + 1), g = o.getX(M + 2);
            r = Pi(this, d, e, n, c, f, p, T, C, g), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, _.start), E = Math.min(o.count, _.start + _.count);
        for (let m = x, d = E; m < d; m += 3) {
          const A = o.getX(m), R = o.getX(m + 1), M = o.getX(m + 2);
          r = Pi(this, s, e, n, c, f, p, A, R, M), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(s))
        for (let x = 0, E = u.length; x < E; x++) {
          const m = u[x], d = s[m.materialIndex], A = Math.max(m.start, _.start), R = Math.min(l.count, Math.min(m.start + m.count, _.start + _.count));
          for (let M = A, y = R; M < y; M += 3) {
            const T = M, C = M + 1, g = M + 2;
            r = Pi(this, d, e, n, c, f, p, T, C, g), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, _.start), E = Math.min(l.count, _.start + _.count);
        for (let m = x, d = E; m < d; m += 3) {
          const A = m, R = m + 1, M = m + 2;
          r = Pi(this, s, e, n, c, f, p, A, R, M), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
  }
}
function ro(i, e, t, n, r, a, s, o) {
  let l;
  if (e.side === 1 ? l = n.intersectTriangle(s, a, r, !0, o) : l = n.intersectTriangle(r, a, s, e.side === 0, o), l === null) return null;
  wi.copy(o), wi.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(wi);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: wi.clone(),
    object: i
  };
}
function Pi(i, e, t, n, r, a, s, o, l, c) {
  i.getVertexPosition(o, yi), i.getVertexPosition(l, Ai), i.getVertexPosition(c, Ri);
  const f = ro(i, e, t, n, yi, Ai, Ri, na);
  if (f) {
    const p = new N();
    Wt.getBarycoord(na, yi, Ai, Ri, p), r && (f.uv = Wt.getInterpolatedAttribute(r, o, l, c, p, new Ke())), a && (f.uv1 = Wt.getInterpolatedAttribute(a, o, l, c, p, new Ke())), s && (f.normal = Wt.getInterpolatedAttribute(s, o, l, c, p, new N()), f.normal.dot(n.direction) > 0 && f.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: l,
      c,
      normal: new N(),
      materialIndex: 0
    };
    Wt.getNormal(yi, Ai, Ri, u.normal), f.face = u, f.barycoord = p;
  }
  return f;
}
class ao extends yt {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = null, t = 1, n = 1, r, a, s, o, l, c = 1003, f = 1003, p, u) {
    super(null, s, o, l, c, f, r, a, p, u), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const pr = /* @__PURE__ */ new N(), so = /* @__PURE__ */ new N(), oo = /* @__PURE__ */ new Ue();
class Sn {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(e = new N(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(e, t, n) {
    const r = pr.subVectors(n, t).cross(so.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @param {boolean} [clampToLine=true] - Whether to clamp the intersection to the line segment.
   * @return {?Vector3} The intersection point. Returns `null` if no intersection is detected.
   */
  intersectLine(e, t, n = !0) {
    const r = e.delta(pr), a = this.normal.dot(r);
    if (a === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / a;
    return n === !0 && (s < 0 || s > 1) ? null : t.copy(e.start).addScaledVector(r, s);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(e, t) {
    const n = t || oo.getNormalMatrix(e), r = this.coplanarPoint(pr).applyMatrix4(e), a = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(a), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const Mn = /* @__PURE__ */ new Vi(), lo = /* @__PURE__ */ new Ke(0.5, 0.5), Di = /* @__PURE__ */ new N();
class Za {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(e = new Sn(), t = new Sn(), n = new Sn(), r = new Sn(), a = new Sn(), s = new Sn()) {
    this.planes = [e, t, n, r, a, s];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(e, t, n, r, a, s) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(a), o[5].copy(s), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  /**
   * Sets the frustum planes from the given projection matrix.
   *
   * @param {Matrix4} m - The projection matrix.
   * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
   * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
   * @return {Frustum} A reference to this frustum.
   */
  setFromProjectionMatrix(e, t = 2e3, n = !1) {
    const r = this.planes, a = e.elements, s = a[0], o = a[1], l = a[2], c = a[3], f = a[4], p = a[5], u = a[6], _ = a[7], x = a[8], E = a[9], m = a[10], d = a[11], A = a[12], R = a[13], M = a[14], y = a[15];
    if (r[0].setComponents(c - s, _ - f, d - x, y - A).normalize(), r[1].setComponents(c + s, _ + f, d + x, y + A).normalize(), r[2].setComponents(c + o, _ + p, d + E, y + R).normalize(), r[3].setComponents(c - o, _ - p, d - E, y - R).normalize(), n)
      r[4].setComponents(l, u, m, M).normalize(), r[5].setComponents(c - l, _ - u, d - m, y - M).normalize();
    else if (r[4].setComponents(c - l, _ - u, d - m, y - M).normalize(), t === 2e3)
      r[5].setComponents(c + l, _ + u, d + m, y + M).normalize();
    else if (t === 2001)
      r[5].setComponents(l, u, m, M).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  /**
   * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
   *
   * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
   *
   * @param {Object3D} object - The 3D object to test.
   * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
   */
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Mn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Mn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Mn);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(e) {
    Mn.center.set(0, 0, 0);
    const t = lo.distanceTo(e.center);
    return Mn.radius = 0.7071067811865476 + t, Mn.applyMatrix4(e.matrixWorld), this.intersectsSphere(Mn);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let a = 0; a < 6; a++)
      if (t[a].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (Di.x = r.normal.x > 0 ? e.max.x : e.min.x, Di.y = r.normal.y > 0 ? e.max.y : e.min.y, Di.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Di) < 0)
        return !1;
    }
    return !0;
  }
  /**
   * Returns `true` if the given point lies within the frustum.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the point lies within this frustum or not.
   */
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class $a extends yt {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(e = [], t = 301, n, r, a, s, o, l, c, f) {
    super(e, t, n, r, a, s, o, l, c, f), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Xn extends yt {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e, t, n = 1014, r, a, s, o = 1003, l = 1003, c, f = 1026, p = 1) {
    if (f !== 1026 && f !== 1027)
      throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const u = { width: e, height: t, depth: p };
    super(u, r, a, s, o, l, f, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new Rr(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
class co extends Xn {
  /**
   * Constructs a new cube depth texture.
   *
   * @param {number} size - The size (width and height) of each cube face.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   */
  constructor(e, t = 1014, n = 301, r, a, s = 1003, o = 1003, l, c = 1026) {
    const f = { width: e, height: e, depth: 1 }, p = [f, f, f, f, f, f];
    super(e, e, t, n, r, a, s, o, l, c), this.image = p, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  /**
   * Alias for {@link CubeDepthTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Ja extends yt {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class ci extends Xt {
  /**
   * Constructs a new box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
   * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
   * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
   */
  constructor(e = 1, t = 1, n = 1, r = 1, a = 1, s = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: a,
      depthSegments: s
    };
    const o = this;
    r = Math.floor(r), a = Math.floor(a), s = Math.floor(s);
    const l = [], c = [], f = [], p = [];
    let u = 0, _ = 0;
    x("z", "y", "x", -1, -1, n, t, e, s, a, 0), x("z", "y", "x", 1, -1, n, t, -e, s, a, 1), x("x", "z", "y", 1, 1, e, n, t, r, s, 2), x("x", "z", "y", 1, -1, e, n, -t, r, s, 3), x("x", "y", "z", 1, -1, e, t, n, r, a, 4), x("x", "y", "z", -1, -1, e, t, -n, r, a, 5), this.setIndex(l), this.setAttribute("position", new Pt(c, 3)), this.setAttribute("normal", new Pt(f, 3)), this.setAttribute("uv", new Pt(p, 2));
    function x(E, m, d, A, R, M, y, T, C, g, b) {
      const F = M / C, P = y / g, I = M / 2, $ = y / 2, Y = T / 2, B = C + 1, k = g + 1;
      let H = 0, Q = 0;
      const ee = new N();
      for (let ie = 0; ie < k; ie++) {
        const se = ie * P - $;
        for (let ge = 0; ge < B; ge++) {
          const ze = ge * F - I;
          ee[E] = ze * A, ee[m] = se * R, ee[d] = Y, c.push(ee.x, ee.y, ee.z), ee[E] = 0, ee[m] = 0, ee[d] = T > 0 ? 1 : -1, f.push(ee.x, ee.y, ee.z), p.push(ge / C), p.push(1 - ie / g), H += 1;
        }
      }
      for (let ie = 0; ie < g; ie++)
        for (let se = 0; se < C; se++) {
          const ge = u + se + B * ie, ze = u + se + B * (ie + 1), Je = u + (se + 1) + B * (ie + 1), He = u + (se + 1) + B * ie;
          l.push(ge, ze, He), l.push(ze, Je, He), Q += 6;
        }
      o.addGroup(_, Q, b), _ += Q, u += H;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(e) {
    return new ci(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
class ui extends Xt {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const a = e / 2, s = t / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, f = l + 1, p = e / o, u = t / l, _ = [], x = [], E = [], m = [];
    for (let d = 0; d < f; d++) {
      const A = d * u - s;
      for (let R = 0; R < c; R++) {
        const M = R * p - a;
        x.push(M, -A, 0), E.push(0, 0, 1), m.push(R / o), m.push(1 - d / l);
      }
    }
    for (let d = 0; d < l; d++)
      for (let A = 0; A < o; A++) {
        const R = A + c * d, M = A + c * (d + 1), y = A + 1 + c * (d + 1), T = A + 1 + c * d;
        _.push(R, M, T), _.push(M, y, T);
      }
    this.setIndex(_), this.setAttribute("position", new Pt(x, 3)), this.setAttribute("normal", new Pt(E, 3)), this.setAttribute("uv", new Pt(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(e) {
    return new ui(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class Cr extends Xt {
  /**
   * Constructs a new sphere geometry.
   *
   * @param {number} [radius=1] - The sphere radius.
   * @param {number} [widthSegments=32] - The number of horizontal segments. Minimum value is `3`.
   * @param {number} [heightSegments=16] - The number of vertical segments. Minimum value is `2`.
   * @param {number} [phiStart=0] - The horizontal starting angle in radians.
   * @param {number} [phiLength=Math.PI*2] - The horizontal sweep angle size.
   * @param {number} [thetaStart=0] - The vertical starting angle in radians.
   * @param {number} [thetaLength=Math.PI] - The vertical sweep angle size.
   */
  constructor(e = 1, t = 32, n = 16, r = 0, a = Math.PI * 2, s = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: n,
      phiStart: r,
      phiLength: a,
      thetaStart: s,
      thetaLength: o
    }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
    const l = Math.min(s + o, Math.PI);
    let c = 0;
    const f = [], p = new N(), u = new N(), _ = [], x = [], E = [], m = [];
    for (let d = 0; d <= n; d++) {
      const A = [], R = d / n, M = s + R * o, y = e * Math.cos(M), T = Math.sqrt(e * e - y * y);
      let C = 0;
      d === 0 && s === 0 ? C = 0.5 / t : d === n && l === Math.PI && (C = -0.5 / t);
      for (let g = 0; g <= t; g++) {
        const b = g / t, F = r + b * a;
        p.x = -T * Math.cos(F), p.y = y, p.z = T * Math.sin(F), x.push(p.x, p.y, p.z), u.copy(p).normalize(), E.push(u.x, u.y, u.z), m.push(b + C, 1 - R), A.push(c++);
      }
      f.push(A);
    }
    for (let d = 0; d < n; d++)
      for (let A = 0; A < t; A++) {
        const R = f[d][A + 1], M = f[d][A], y = f[d + 1][A], T = f[d + 1][A + 1];
        (d !== 0 || s > 0) && _.push(R, M, T), (d !== n - 1 || l < Math.PI) && _.push(M, y, T);
      }
    this.setIndex(_), this.setAttribute("position", new Pt(x, 3)), this.setAttribute("normal", new Pt(E, 3)), this.setAttribute("uv", new Pt(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {SphereGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Cr(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
function qn(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      if (ia(r))
        r.isRenderTargetTexture ? (De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone();
      else if (Array.isArray(r))
        if (ia(r[0])) {
          const a = [];
          for (let s = 0, o = r.length; s < o; s++)
            a[s] = r[s].clone();
          e[t][n] = a;
        } else
          e[t][n] = r.slice();
      else
        e[t][n] = r;
    }
  }
  return e;
}
function Rt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = qn(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function ia(i) {
  return i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion);
}
function uo(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Qa(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : ke.workingColorSpace;
}
const wr = { clone: qn, merge: Rt };
var fo = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ho = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Ct extends Hi {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = fo, this.fragmentShader = ho, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = qn(e.uniforms), this.uniformsGroups = uo(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const s = this.uniforms[r].value;
      s && s.isTexture ? t.uniforms[r] = {
        type: "t",
        value: s.toJSON(e).uuid
      } : s && s.isColor ? t.uniforms[r] = {
        type: "c",
        value: s.getHex()
      } : s && s.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: s.toArray()
      } : s && s.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: s.toArray()
      } : s && s.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: s.toArray()
      } : s && s.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: s.toArray()
      } : s && s.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: s.toArray()
      } : t.uniforms[r] = {
        value: s
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {ShaderMaterial} A reference to this material.
   */
  fromJSON(e, t) {
    if (super.fromJSON(e, t), e.uniforms !== void 0)
      for (const n in e.uniforms) {
        const r = e.uniforms[n];
        switch (this.uniforms[n] = {}, r.type) {
          case "t":
            this.uniforms[n].value = t[r.value] || null;
            break;
          case "c":
            this.uniforms[n].value = new Ze().setHex(r.value);
            break;
          case "v2":
            this.uniforms[n].value = new Ke().fromArray(r.value);
            break;
          case "v3":
            this.uniforms[n].value = new N().fromArray(r.value);
            break;
          case "v4":
            this.uniforms[n].value = new ct().fromArray(r.value);
            break;
          case "m3":
            this.uniforms[n].value = new Ue().fromArray(r.value);
            break;
          case "m4":
            this.uniforms[n].value = new mt().fromArray(r.value);
            break;
          default:
            this.uniforms[n].value = r.value;
        }
      }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0)
      for (const n in e.extensions)
        this.extensions[n] = e.extensions[n];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}
class ja extends Ct {
  /**
   * Constructs a new raw shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class po extends Hi {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class mo extends Hi {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const mr = {
  /**
   * Whether caching is enabled or not.
   *
   * @static
   * @type {boolean}
   * @default false
   */
  enabled: !1,
  /**
   * A dictionary that holds cached files.
   *
   * @static
   * @type {Object<string,Object>}
   */
  files: {},
  /**
   * Adds a cache entry with a key to reference the file. If this key already
   * holds a file, it is overwritten.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @param {Object} file -  The file to be cached.
   */
  add: function(i, e) {
    this.enabled !== !1 && (ra(i) || (this.files[i] = e));
  },
  /**
   * Gets the cached value for the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @return {Object|undefined} The cached file. If the key does not exist `undefined` is returned.
   */
  get: function(i) {
    if (this.enabled !== !1 && !ra(i))
      return this.files[i];
  },
  /**
   * Removes the cached file associated with the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   */
  remove: function(i) {
    delete this.files[i];
  },
  /**
   * Remove all values from the cache.
   *
   * @static
   */
  clear: function() {
    this.files = {};
  }
};
function ra(i) {
  try {
    const e = i.slice(i.indexOf(":") + 1);
    return new URL(e).protocol === "blob:";
  } catch {
    return !1;
  }
}
class _o {
  /**
   * Constructs a new loading manager.
   *
   * @param {Function} [onLoad] - Executes when all items have been loaded.
   * @param {Function} [onProgress] - Executes when single items have been loaded.
   * @param {Function} [onError] - Executes when an error occurs.
   */
  constructor(e, t, n) {
    const r = this;
    let a = !1, s = 0, o = 0, l;
    const c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(f) {
      o++, a === !1 && r.onStart !== void 0 && r.onStart(f, s, o), a = !0;
    }, this.itemEnd = function(f) {
      s++, r.onProgress !== void 0 && r.onProgress(f, s, o), s === o && (a = !1, r.onLoad !== void 0 && r.onLoad());
    }, this.itemError = function(f) {
      r.onError !== void 0 && r.onError(f);
    }, this.resolveURL = function(f) {
      return f = f.normalize("NFC"), l ? l(f) : f;
    }, this.setURLModifier = function(f) {
      return l = f, this;
    }, this.addHandler = function(f, p) {
      return c.push(f, p), this;
    }, this.removeHandler = function(f) {
      const p = c.indexOf(f);
      return p !== -1 && c.splice(p, 2), this;
    }, this.getHandler = function(f) {
      for (let p = 0, u = c.length; p < u; p += 2) {
        const _ = c[p], x = c[p + 1];
        if (_.global && (_.lastIndex = 0), _.test(f))
          return x;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  // TODO: Revert this back to a single member variable once this issue has been fixed
  // https://github.com/cloudflare/workerd/issues/3657
  /**
   * Used for aborting ongoing requests in loaders using this manager.
   *
   * @type {AbortController}
   */
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}
const go = /* @__PURE__ */ new _o();
class Pr {
  /**
   * Constructs a new loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    this.manager = e !== void 0 ? e : go, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for loading assets from the backend.
   *
   * @abstract
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {Function} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load() {
  }
  /**
   * A async version of {@link Loader#load}.
   *
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @return {Promise} A Promise that resolves when the asset has been loaded.
   */
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(r, a) {
      n.load(e, r, t, a);
    });
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for parsing the asset into three.js entities.
   *
   * @abstract
   * @param {any} data - The data to parse.
   */
  parse() {
  }
  /**
   * Sets the `crossOrigin` String to implement CORS for loading the URL
   * from a different domain that allows CORS.
   *
   * @param {string} crossOrigin - The `crossOrigin` value.
   * @return {Loader} A reference to this instance.
   */
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  /**
   * Whether the XMLHttpRequest uses credentials such as cookies, authorization
   * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
   *
   * Note: This setting has no effect if you are loading files locally or from the same domain.
   *
   * @param {boolean} value - The `withCredentials` value.
   * @return {Loader} A reference to this instance.
   */
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  /**
   * Sets the base path for the asset.
   *
   * @param {string} path - The base path.
   * @return {Loader} A reference to this instance.
   */
  setPath(e) {
    return this.path = e, this;
  }
  /**
   * Sets the base path for dependent resources like textures.
   *
   * @param {string} resourcePath - The resource path.
   * @return {Loader} A reference to this instance.
   */
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  /**
   * Sets the given request header.
   *
   * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
   * for configuring the HTTP request.
   * @return {Loader} A reference to this instance.
   */
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  /**
   * This method can be implemented in loaders for aborting ongoing requests.
   *
   * @abstract
   * @return {Loader} A reference to this instance.
   */
  abort() {
    return this;
  }
}
Pr.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const On = /* @__PURE__ */ new WeakMap();
class xo extends Pr {
  /**
   * Constructs a new image loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and passes the loaded image
   * to the `onLoad()` callback. The method also returns a new `Image` object which can
   * directly be used for texture creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Image)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Unsupported in this loader.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {Image} The image.
   */
  load(e, t, n, r) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const a = this, s = mr.get(`image:${e}`);
    if (s !== void 0) {
      if (s.complete === !0)
        a.manager.itemStart(e), setTimeout(function() {
          t && t(s), a.manager.itemEnd(e);
        }, 0);
      else {
        let p = On.get(s);
        p === void 0 && (p = [], On.set(s, p)), p.push({ onLoad: t, onError: r });
      }
      return s;
    }
    const o = si("img");
    function l() {
      f(), t && t(this);
      const p = On.get(this) || [];
      for (let u = 0; u < p.length; u++) {
        const _ = p[u];
        _.onLoad && _.onLoad(this);
      }
      On.delete(this), a.manager.itemEnd(e);
    }
    function c(p) {
      f(), r && r(p), mr.remove(`image:${e}`);
      const u = On.get(this) || [];
      for (let _ = 0; _ < u.length; _++) {
        const x = u[_];
        x.onError && x.onError(p);
      }
      On.delete(this), a.manager.itemError(e), a.manager.itemEnd(e);
    }
    function f() {
      o.removeEventListener("load", l, !1), o.removeEventListener("error", c, !1);
    }
    return o.addEventListener("load", l, !1), o.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), mr.add(`image:${e}`, o), a.manager.itemStart(e), o.src = e, o;
  }
}
class vo extends Pr {
  /**
   * Constructs a new texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and pass the fully loaded texture
   * to the `onLoad()` callback. The method also returns a new texture object which can
   * directly be used for material creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Texture)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Unsupported in this loader.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {Texture} The texture.
   */
  load(e, t, n, r) {
    const a = new yt(), s = new xo(this.manager);
    return s.setCrossOrigin(this.crossOrigin), s.setPath(this.path), s.load(e, function(o) {
      a.image = o, a.needsUpdate = !0, t !== void 0 && t(a);
    }, n, r), a;
  }
}
const Li = /* @__PURE__ */ new N(), Fi = /* @__PURE__ */ new Kn(), Yt = /* @__PURE__ */ new N();
class es extends It {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new mt(), this.projectionMatrix = new mt(), this.projectionMatrixInverse = new mt(), this.coordinateSystem = 2e3, this._reversedDepth = !1;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(Li, Fi, Yt), Yt.x === 1 && Yt.y === 1 && Yt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Li, Fi, Yt.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, n = !1) {
    super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(Li, Fi, Yt), Yt.x === 1 && Yt.y === 1 && Yt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Li, Fi, Yt.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const hn = /* @__PURE__ */ new N(), aa = /* @__PURE__ */ new Ke(), sa = /* @__PURE__ */ new Ke();
class kt extends es {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = oi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const e = Math.tan(ri * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return oi * 2 * Math.atan(
      Math.tan(ri * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(e, t, n) {
    hn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(hn.x, hn.y).multiplyScalar(-e / hn.z), hn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(hn.x, hn.y).multiplyScalar(-e / hn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, aa, sa), t.subVectors(sa, aa);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(e, t, n, r, a, s) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = a, this.view.height = s, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(ri * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, a = -0.5 * r;
    const s = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = s.fullWidth, c = s.fullHeight;
      a += s.offsetX * r / l, t -= s.offsetY * n / c, r *= s.width / l, n *= s.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (a += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(a, a + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
class ki extends es {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = -1, t = 1, n = 1, r = -1, a = 0.1, s = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = a, this.far = s, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(e, t, n, r, a, s) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = a, this.view.height = s, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let a = n - e, s = n + e, o = r + t, l = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, f = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      a += c * this.view.offsetX, s = a + c * this.view.width, o -= f * this.view.offsetY, l = o - f * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(a, s, o, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const Bn = -90, Gn = 1;
class Mo extends It {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new kt(Bn, Gn, e, t);
    r.layers = this.layers, this.add(r);
    const a = new kt(Bn, Gn, e, t);
    a.layers = this.layers, this.add(a);
    const s = new kt(Bn, Gn, e, t);
    s.layers = this.layers, this.add(s);
    const o = new kt(Bn, Gn, e, t);
    o.layers = this.layers, this.add(o);
    const l = new kt(Bn, Gn, e, t);
    l.layers = this.layers, this.add(l);
    const c = new kt(Bn, Gn, e, t);
    c.layers = this.layers, this.add(c);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, a, s, o, l] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), a.up.set(0, 0, -1), a.lookAt(0, 1, 0), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), a.up.set(0, 0, 1), a.lookAt(0, 1, 0), s.up.set(0, 0, -1), s.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [a, s, o, l, c, f] = this.children, p = e.getRenderTarget(), u = e.getActiveCubeFace(), _ = e.getActiveMipmapLevel(), x = e.xr.enabled;
    e.xr.enabled = !1;
    const E = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let m = !1;
    e.isWebGLRenderer === !0 ? m = e.state.buffers.depth.getReversed() : m = e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 1, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 2, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(n, 4, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = E, e.setRenderTarget(n, 5, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, f), e.setRenderTarget(p, u, _), e.xr.enabled = x, n.texture.needsPMREMUpdate = !0;
  }
}
class So extends kt {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}
class Eo {
  /**
   * Constructs a new timer.
   */
  constructor() {
    this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
  }
  /**
   * Connect the timer to the given document.Calling this method is not mandatory to
   * use the timer but enables the usage of the Page Visibility API to avoid large time
   * delta values.
   *
   * @param {Document} document - The document.
   */
  connect(e) {
    this._document = e, e.hidden !== void 0 && (this._pageVisibilityHandler = To.bind(this), e.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
  }
  /**
   * Disconnects the timer from the DOM and also disables the usage of the Page Visibility API.
   */
  disconnect() {
    this._pageVisibilityHandler !== null && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
  }
  /**
   * Returns the time delta in seconds.
   *
   * @return {number} The time delta in second.
   */
  getDelta() {
    return this._delta / 1e3;
  }
  /**
   * Returns the elapsed time in seconds.
   *
   * @return {number} The elapsed time in second.
   */
  getElapsed() {
    return this._elapsed / 1e3;
  }
  /**
   * Returns the timescale.
   *
   * @return {number} The timescale.
   */
  getTimescale() {
    return this._timescale;
  }
  /**
   * Sets the given timescale which scale the time delta computation
   * in `update()`.
   *
   * @param {number} timescale - The timescale to set.
   * @return {Timer} A reference to this timer.
   */
  setTimescale(e) {
    return this._timescale = e, this;
  }
  /**
   * Resets the time computation for the current simulation step.
   *
   * @return {Timer} A reference to this timer.
   */
  reset() {
    return this._currentTime = performance.now() - this._startTime, this;
  }
  /**
   * Can be used to free all internal resources. Usually called when
   * the timer instance isn't required anymore.
   */
  dispose() {
    this.disconnect();
  }
  /**
   * Updates the internal state of the timer. This method should be called
   * once per simulation step and before you perform queries against the timer
   * (e.g. via `getDelta()`).
   *
   * @param {number} timestamp - The current time in milliseconds. Can be obtained
   * from the `requestAnimationFrame` callback argument. If not provided, the current
   * time will be determined with `performance.now`.
   * @return {Timer} A reference to this timer.
   */
  update(e) {
    return this._pageVisibilityHandler !== null && this._document.hidden === !0 ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (e !== void 0 ? e : performance.now()) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
  }
}
function To() {
  this._document.hidden === !1 && this.reset();
}
class ts {
  static {
    ts.prototype.isMatrix2 = !0;
  }
  /**
   * Constructs a new 2x2 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   */
  constructor(e, t, n, r) {
    this.elements = [
      1,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r);
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix2} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 4; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(e, t, n, r) {
    const a = this.elements;
    return a[0] = e, a[2] = t, a[1] = n, a[3] = r, this;
  }
}
function oa(i, e, t, n) {
  const r = bo(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case 1021:
      return i * e;
    case 1028:
      return i * e / r.components * r.byteLength;
    case 1029:
      return i * e / r.components * r.byteLength;
    case 1030:
      return i * e * 2 / r.components * r.byteLength;
    case 1031:
      return i * e * 2 / r.components * r.byteLength;
    case 1022:
      return i * e * 3 / r.components * r.byteLength;
    case 1023:
      return i * e * 4 / r.components * r.byteLength;
    case 1033:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case 33776:
    case 33777:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case 35841:
    case 35843:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case 36196:
    case 37492:
    case 37488:
    case 37489:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 37496:
    case 37490:
    case 37491:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case 37808:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37809:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case 37810:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case 37811:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case 37812:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case 37813:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case 37814:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case 37815:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case 37816:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case 37817:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case 37818:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case 37819:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case 37820:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case 37821:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case 36283:
    case 36284:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function bo(i) {
  switch (i) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
    case 35899:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: "185"
} }));
typeof window < "u" && (window.__THREE__ ? De("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
function ns() {
  let i = null, e = !1, t = null, n = null;
  function r(a, s) {
    t(a, s), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && i !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i !== null && i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(a) {
      t = a;
    },
    setContext: function(a) {
      i = a;
    }
  };
}
function yo(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, l) {
    const c = o.array, f = o.usage, p = c.byteLength, u = i.createBuffer();
    i.bindBuffer(l, u), i.bufferData(l, c, f), o.onUploadCallback();
    let _;
    if (c instanceof Float32Array)
      _ = i.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array)
      _ = i.HALF_FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? _ = i.HALF_FLOAT : _ = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      _ = i.SHORT;
    else if (c instanceof Uint32Array)
      _ = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      _ = i.INT;
    else if (c instanceof Int8Array)
      _ = i.BYTE;
    else if (c instanceof Uint8Array)
      _ = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      _ = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: u,
      type: _,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: p
    };
  }
  function n(o, l, c) {
    const f = l.array, p = l.updateRanges;
    if (i.bindBuffer(c, o), p.length === 0)
      i.bufferSubData(c, 0, f);
    else {
      p.sort((_, x) => _.start - x.start);
      let u = 0;
      for (let _ = 1; _ < p.length; _++) {
        const x = p[u], E = p[_];
        E.start <= x.start + x.count + 1 ? x.count = Math.max(
          x.count,
          E.start + E.count - x.start
        ) : (++u, p[u] = E);
      }
      p.length = u + 1;
      for (let _ = 0, x = p.length; _ < x; _++) {
        const E = p[_];
        i.bufferSubData(
          c,
          E.start * f.BYTES_PER_ELEMENT,
          f,
          E.start,
          E.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function a(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = e.get(o);
    l && (i.deleteBuffer(l.buffer), e.delete(o));
  }
  function s(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const f = e.get(o);
      (!f || f.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = e.get(o);
    if (c === void 0)
      e.set(o, t(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: a,
    update: s
  };
}
var Ao = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Ro = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Co = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, wo = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Po = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Do = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Lo = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Fo = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Io = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, Uo = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, No = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Oo = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Bo = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Go = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, zo = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Vo = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Ho = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, ko = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Wo = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Xo = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, qo = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, Yo = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, Ko = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, Zo = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, $o = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Jo = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`, Qo = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, jo = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, el = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, tl = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, nl = "gl_FragColor = linearToOutputTexel( gl_FragColor );", il = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, rl = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, al = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, sl = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, ol = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, ll = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, cl = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, ul = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, fl = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, dl = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, hl = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, pl = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, ml = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, _l = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, gl = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`, xl = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, vl = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Ml = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Sl = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, El = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Tl = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, bl = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, yl = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Al = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Rl = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Cl = `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`, wl = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Pl = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Dl = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Ll = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Fl = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Il = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Ul = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Nl = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Ol = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Bl = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Gl = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, zl = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Vl = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Hl = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, kl = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Wl = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Xl = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, ql = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Yl = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Kl = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`, Zl = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, $l = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Jl = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Ql = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, jl = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, ec = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, tc = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, nc = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, ic = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, rc = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, ac = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, sc = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, oc = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, lc = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, cc = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, uc = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, fc = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, dc = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, hc = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, pc = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, mc = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, _c = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, gc = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, xc = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, vc = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Mc = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Sc = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Ec = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Tc = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, bc = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, yc = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Ac = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Rc = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Cc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, wc = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Pc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Dc = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Lc = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Fc = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, Ic = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Uc = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, Nc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Oc = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Bc = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Gc = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, zc = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Vc = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Hc = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, kc = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Wc = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Xc = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, qc = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Yc = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Kc = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Zc = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, $c = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Jc = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Qc = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, jc = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, eu = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, tu = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, nu = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, iu = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, ru = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, au = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Oe = {
  alphahash_fragment: Ao,
  alphahash_pars_fragment: Ro,
  alphamap_fragment: Co,
  alphamap_pars_fragment: wo,
  alphatest_fragment: Po,
  alphatest_pars_fragment: Do,
  aomap_fragment: Lo,
  aomap_pars_fragment: Fo,
  batching_pars_vertex: Io,
  batching_vertex: Uo,
  begin_vertex: No,
  beginnormal_vertex: Oo,
  bsdfs: Bo,
  iridescence_fragment: Go,
  bumpmap_pars_fragment: zo,
  clipping_planes_fragment: Vo,
  clipping_planes_pars_fragment: Ho,
  clipping_planes_pars_vertex: ko,
  clipping_planes_vertex: Wo,
  color_fragment: Xo,
  color_pars_fragment: qo,
  color_pars_vertex: Yo,
  color_vertex: Ko,
  common: Zo,
  cube_uv_reflection_fragment: $o,
  defaultnormal_vertex: Jo,
  displacementmap_pars_vertex: Qo,
  displacementmap_vertex: jo,
  emissivemap_fragment: el,
  emissivemap_pars_fragment: tl,
  colorspace_fragment: nl,
  colorspace_pars_fragment: il,
  envmap_fragment: rl,
  envmap_common_pars_fragment: al,
  envmap_pars_fragment: sl,
  envmap_pars_vertex: ol,
  envmap_physical_pars_fragment: xl,
  envmap_vertex: ll,
  fog_vertex: cl,
  fog_pars_vertex: ul,
  fog_fragment: fl,
  fog_pars_fragment: dl,
  gradientmap_pars_fragment: hl,
  lightmap_pars_fragment: pl,
  lights_lambert_fragment: ml,
  lights_lambert_pars_fragment: _l,
  lights_pars_begin: gl,
  lights_toon_fragment: vl,
  lights_toon_pars_fragment: Ml,
  lights_phong_fragment: Sl,
  lights_phong_pars_fragment: El,
  lights_physical_fragment: Tl,
  lights_physical_pars_fragment: bl,
  lights_fragment_begin: yl,
  lights_fragment_maps: Al,
  lights_fragment_end: Rl,
  lightprobes_pars_fragment: Cl,
  logdepthbuf_fragment: wl,
  logdepthbuf_pars_fragment: Pl,
  logdepthbuf_pars_vertex: Dl,
  logdepthbuf_vertex: Ll,
  map_fragment: Fl,
  map_pars_fragment: Il,
  map_particle_fragment: Ul,
  map_particle_pars_fragment: Nl,
  metalnessmap_fragment: Ol,
  metalnessmap_pars_fragment: Bl,
  morphinstance_vertex: Gl,
  morphcolor_vertex: zl,
  morphnormal_vertex: Vl,
  morphtarget_pars_vertex: Hl,
  morphtarget_vertex: kl,
  normal_fragment_begin: Wl,
  normal_fragment_maps: Xl,
  normal_pars_fragment: ql,
  normal_pars_vertex: Yl,
  normal_vertex: Kl,
  normalmap_pars_fragment: Zl,
  clearcoat_normal_fragment_begin: $l,
  clearcoat_normal_fragment_maps: Jl,
  clearcoat_pars_fragment: Ql,
  iridescence_pars_fragment: jl,
  opaque_fragment: ec,
  packing: tc,
  premultiplied_alpha_fragment: nc,
  project_vertex: ic,
  dithering_fragment: rc,
  dithering_pars_fragment: ac,
  roughnessmap_fragment: sc,
  roughnessmap_pars_fragment: oc,
  shadowmap_pars_fragment: lc,
  shadowmap_pars_vertex: cc,
  shadowmap_vertex: uc,
  shadowmask_pars_fragment: fc,
  skinbase_vertex: dc,
  skinning_pars_vertex: hc,
  skinning_vertex: pc,
  skinnormal_vertex: mc,
  specularmap_fragment: _c,
  specularmap_pars_fragment: gc,
  tonemapping_fragment: xc,
  tonemapping_pars_fragment: vc,
  transmission_fragment: Mc,
  transmission_pars_fragment: Sc,
  uv_pars_fragment: Ec,
  uv_pars_vertex: Tc,
  uv_vertex: bc,
  worldpos_vertex: yc,
  background_vert: Ac,
  background_frag: Rc,
  backgroundCube_vert: Cc,
  backgroundCube_frag: wc,
  cube_vert: Pc,
  cube_frag: Dc,
  depth_vert: Lc,
  depth_frag: Fc,
  distance_vert: Ic,
  distance_frag: Uc,
  equirect_vert: Nc,
  equirect_frag: Oc,
  linedashed_vert: Bc,
  linedashed_frag: Gc,
  meshbasic_vert: zc,
  meshbasic_frag: Vc,
  meshlambert_vert: Hc,
  meshlambert_frag: kc,
  meshmatcap_vert: Wc,
  meshmatcap_frag: Xc,
  meshnormal_vert: qc,
  meshnormal_frag: Yc,
  meshphong_vert: Kc,
  meshphong_frag: Zc,
  meshphysical_vert: $c,
  meshphysical_frag: Jc,
  meshtoon_vert: Qc,
  meshtoon_frag: jc,
  points_vert: eu,
  points_frag: tu,
  shadow_vert: nu,
  shadow_frag: iu,
  sprite_vert: ru,
  sprite_frag: au
}, pe = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ze(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ue() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ue() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ue() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Ue() },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ue() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ue() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ue() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ue() },
    normalScale: { value: /* @__PURE__ */ new Ke(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ue() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ue() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ue() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ue() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ze(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: null },
    probesMin: { value: /* @__PURE__ */ new N() },
    probesMax: { value: /* @__PURE__ */ new N() },
    probesResolution: { value: /* @__PURE__ */ new N() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ze(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ue() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ue() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ze(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ke(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ue() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ue() },
    alphaTest: { value: 0 }
  }
}, Zt = {
  basic: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.specularmap,
      pe.envmap,
      pe.aomap,
      pe.lightmap,
      pe.fog
    ]),
    vertexShader: Oe.meshbasic_vert,
    fragmentShader: Oe.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.specularmap,
      pe.envmap,
      pe.aomap,
      pe.lightmap,
      pe.emissivemap,
      pe.bumpmap,
      pe.normalmap,
      pe.displacementmap,
      pe.fog,
      pe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ze(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Oe.meshlambert_vert,
    fragmentShader: Oe.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.specularmap,
      pe.envmap,
      pe.aomap,
      pe.lightmap,
      pe.emissivemap,
      pe.bumpmap,
      pe.normalmap,
      pe.displacementmap,
      pe.fog,
      pe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ze(0) },
        specular: { value: /* @__PURE__ */ new Ze(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Oe.meshphong_vert,
    fragmentShader: Oe.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.envmap,
      pe.aomap,
      pe.lightmap,
      pe.emissivemap,
      pe.bumpmap,
      pe.normalmap,
      pe.displacementmap,
      pe.roughnessmap,
      pe.metalnessmap,
      pe.fog,
      pe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ze(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Oe.meshphysical_vert,
    fragmentShader: Oe.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.aomap,
      pe.lightmap,
      pe.emissivemap,
      pe.bumpmap,
      pe.normalmap,
      pe.displacementmap,
      pe.gradientmap,
      pe.fog,
      pe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ze(0) }
      }
    ]),
    vertexShader: Oe.meshtoon_vert,
    fragmentShader: Oe.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.bumpmap,
      pe.normalmap,
      pe.displacementmap,
      pe.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Oe.meshmatcap_vert,
    fragmentShader: Oe.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Rt([
      pe.points,
      pe.fog
    ]),
    vertexShader: Oe.points_vert,
    fragmentShader: Oe.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Oe.linedashed_vert,
    fragmentShader: Oe.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.displacementmap
    ]),
    vertexShader: Oe.depth_vert,
    fragmentShader: Oe.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.bumpmap,
      pe.normalmap,
      pe.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Oe.meshnormal_vert,
    fragmentShader: Oe.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Rt([
      pe.sprite,
      pe.fog
    ]),
    vertexShader: Oe.sprite_vert,
    fragmentShader: Oe.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ue() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Oe.background_vert,
    fragmentShader: Oe.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Ue() }
    },
    vertexShader: Oe.backgroundCube_vert,
    fragmentShader: Oe.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Oe.cube_vert,
    fragmentShader: Oe.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Oe.equirect_vert,
    fragmentShader: Oe.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Rt([
      pe.common,
      pe.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new N() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Oe.distance_vert,
    fragmentShader: Oe.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Rt([
      pe.lights,
      pe.fog,
      {
        color: { value: /* @__PURE__ */ new Ze(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Oe.shadow_vert,
    fragmentShader: Oe.shadow_frag
  }
};
Zt.physical = {
  uniforms: /* @__PURE__ */ Rt([
    Zt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Ue() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ue() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ke(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ue() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Ue() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ue() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Ze(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Ue() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ue() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Ue() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ke() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Ue() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Ze(0) },
      specularColor: { value: /* @__PURE__ */ new Ze(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Ue() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Ue() },
      anisotropyVector: { value: /* @__PURE__ */ new Ke() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Ue() }
    }
  ]),
  vertexShader: Oe.meshphysical_vert,
  fragmentShader: Oe.meshphysical_frag
};
const Ii = { r: 0, b: 0, g: 0 }, su = /* @__PURE__ */ new mt(), is = /* @__PURE__ */ new Ue();
is.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function ou(i, e, t, n, r, a) {
  const s = new Ze(0);
  let o = r === !0 ? 0 : 1, l, c, f = null, p = 0, u = null;
  function _(A) {
    let R = A.isScene === !0 ? A.background : null;
    if (R && R.isTexture) {
      const M = A.backgroundBlurriness > 0;
      R = e.get(R, M);
    }
    return R;
  }
  function x(A) {
    let R = !1;
    const M = _(A);
    M === null ? m(s, o) : M && M.isColor && (m(M, 1), R = !0);
    const y = i.xr.getEnvironmentBlendMode();
    y === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, a) : y === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || R) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function E(A, R) {
    const M = _(R);
    M && (M.isCubeTexture || M.mapping === 306) ? (c === void 0 && (c = new Ut(
      new ci(1, 1, 1),
      new Ct({
        name: "BackgroundCubeMaterial",
        uniforms: qn(Zt.backgroundCube.uniforms),
        vertexShader: Zt.backgroundCube.vertexShader,
        fragmentShader: Zt.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(y, T, C) {
      this.matrixWorld.copyPosition(C.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), n.update(c)), c.material.uniforms.envMap.value = M, c.material.uniforms.backgroundBlurriness.value = R.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = R.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(su.makeRotationFromEuler(R.backgroundRotation)).transpose(), M.isCubeTexture && M.isRenderTargetTexture === !1 && c.material.uniforms.backgroundRotation.value.premultiply(is), c.material.toneMapped = ke.getTransfer(M.colorSpace) !== $e, (f !== M || p !== M.version || u !== i.toneMapping) && (c.material.needsUpdate = !0, f = M, p = M.version, u = i.toneMapping), c.layers.enableAll(), A.unshift(c, c.geometry, c.material, 0, 0, null)) : M && M.isTexture && (l === void 0 && (l = new Ut(
      new ui(2, 2),
      new Ct({
        name: "BackgroundMaterial",
        uniforms: qn(Zt.background.uniforms),
        vertexShader: Zt.background.vertexShader,
        fragmentShader: Zt.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), n.update(l)), l.material.uniforms.t2D.value = M, l.material.uniforms.backgroundIntensity.value = R.backgroundIntensity, l.material.toneMapped = ke.getTransfer(M.colorSpace) !== $e, M.matrixAutoUpdate === !0 && M.updateMatrix(), l.material.uniforms.uvTransform.value.copy(M.matrix), (f !== M || p !== M.version || u !== i.toneMapping) && (l.material.needsUpdate = !0, f = M, p = M.version, u = i.toneMapping), l.layers.enableAll(), A.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function m(A, R) {
    A.getRGB(Ii, Qa(i)), t.buffers.color.setClear(Ii.r, Ii.g, Ii.b, R, a);
  }
  function d() {
    c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return s;
    },
    setClearColor: function(A, R = 1) {
      s.set(A), o = R, m(s, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(A) {
      o = A, m(s, o);
    },
    render: x,
    addToRenderList: E,
    dispose: d
  };
}
function lu(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = u(null);
  let a = r, s = !1;
  function o(P, I, $, Y, B) {
    let k = !1;
    const H = p(P, Y, $, I);
    a !== H && (a = H, c(a.object)), k = _(P, Y, $, B), k && x(P, Y, $, B), B !== null && e.update(B, i.ELEMENT_ARRAY_BUFFER), (k || s) && (s = !1, M(P, I, $, Y), B !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(B).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(P) {
    return i.bindVertexArray(P);
  }
  function f(P) {
    return i.deleteVertexArray(P);
  }
  function p(P, I, $, Y) {
    const B = Y.wireframe === !0;
    let k = n[I.id];
    k === void 0 && (k = {}, n[I.id] = k);
    const H = P.isInstancedMesh === !0 ? P.id : 0;
    let Q = k[H];
    Q === void 0 && (Q = {}, k[H] = Q);
    let ee = Q[$.id];
    ee === void 0 && (ee = {}, Q[$.id] = ee);
    let ie = ee[B];
    return ie === void 0 && (ie = u(l()), ee[B] = ie), ie;
  }
  function u(P) {
    const I = [], $ = [], Y = [];
    for (let B = 0; B < t; B++)
      I[B] = 0, $[B] = 0, Y[B] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: I,
      enabledAttributes: $,
      attributeDivisors: Y,
      object: P,
      attributes: {},
      index: null
    };
  }
  function _(P, I, $, Y) {
    const B = a.attributes, k = I.attributes;
    let H = 0;
    const Q = $.getAttributes();
    for (const ee in Q)
      if (Q[ee].location >= 0) {
        const se = B[ee];
        let ge = k[ee];
        if (ge === void 0 && (ee === "instanceMatrix" && P.instanceMatrix && (ge = P.instanceMatrix), ee === "instanceColor" && P.instanceColor && (ge = P.instanceColor)), se === void 0 || se.attribute !== ge || ge && se.data !== ge.data) return !0;
        H++;
      }
    return a.attributesNum !== H || a.index !== Y;
  }
  function x(P, I, $, Y) {
    const B = {}, k = I.attributes;
    let H = 0;
    const Q = $.getAttributes();
    for (const ee in Q)
      if (Q[ee].location >= 0) {
        let se = k[ee];
        se === void 0 && (ee === "instanceMatrix" && P.instanceMatrix && (se = P.instanceMatrix), ee === "instanceColor" && P.instanceColor && (se = P.instanceColor));
        const ge = {};
        ge.attribute = se, se && se.data && (ge.data = se.data), B[ee] = ge, H++;
      }
    a.attributes = B, a.attributesNum = H, a.index = Y;
  }
  function E() {
    const P = a.newAttributes;
    for (let I = 0, $ = P.length; I < $; I++)
      P[I] = 0;
  }
  function m(P) {
    d(P, 0);
  }
  function d(P, I) {
    const $ = a.newAttributes, Y = a.enabledAttributes, B = a.attributeDivisors;
    $[P] = 1, Y[P] === 0 && (i.enableVertexAttribArray(P), Y[P] = 1), B[P] !== I && (i.vertexAttribDivisor(P, I), B[P] = I);
  }
  function A() {
    const P = a.newAttributes, I = a.enabledAttributes;
    for (let $ = 0, Y = I.length; $ < Y; $++)
      I[$] !== P[$] && (i.disableVertexAttribArray($), I[$] = 0);
  }
  function R(P, I, $, Y, B, k, H) {
    H === !0 ? i.vertexAttribIPointer(P, I, $, B, k) : i.vertexAttribPointer(P, I, $, Y, B, k);
  }
  function M(P, I, $, Y) {
    E();
    const B = Y.attributes, k = $.getAttributes(), H = I.defaultAttributeValues;
    for (const Q in k) {
      const ee = k[Q];
      if (ee.location >= 0) {
        let ie = B[Q];
        if (ie === void 0 && (Q === "instanceMatrix" && P.instanceMatrix && (ie = P.instanceMatrix), Q === "instanceColor" && P.instanceColor && (ie = P.instanceColor)), ie !== void 0) {
          const se = ie.normalized, ge = ie.itemSize, ze = e.get(ie);
          if (ze === void 0) continue;
          const Je = ze.buffer, He = ze.type, J = ze.bytesPerElement, re = He === i.INT || He === i.UNSIGNED_INT || ie.gpuType === 1013;
          if (ie.isInterleavedBufferAttribute) {
            const te = ie.data, we = te.stride, Le = ie.offset;
            if (te.isInstancedInterleavedBuffer) {
              for (let Re = 0; Re < ee.locationSize; Re++)
                d(ee.location + Re, te.meshPerAttribute);
              P.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = te.meshPerAttribute * te.count);
            } else
              for (let Re = 0; Re < ee.locationSize; Re++)
                m(ee.location + Re);
            i.bindBuffer(i.ARRAY_BUFFER, Je);
            for (let Re = 0; Re < ee.locationSize; Re++)
              R(
                ee.location + Re,
                ge / ee.locationSize,
                He,
                se,
                we * J,
                (Le + ge / ee.locationSize * Re) * J,
                re
              );
          } else {
            if (ie.isInstancedBufferAttribute) {
              for (let te = 0; te < ee.locationSize; te++)
                d(ee.location + te, ie.meshPerAttribute);
              P.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = ie.meshPerAttribute * ie.count);
            } else
              for (let te = 0; te < ee.locationSize; te++)
                m(ee.location + te);
            i.bindBuffer(i.ARRAY_BUFFER, Je);
            for (let te = 0; te < ee.locationSize; te++)
              R(
                ee.location + te,
                ge / ee.locationSize,
                He,
                se,
                ge * J,
                ge / ee.locationSize * te * J,
                re
              );
          }
        } else if (H !== void 0) {
          const se = H[Q];
          if (se !== void 0)
            switch (se.length) {
              case 2:
                i.vertexAttrib2fv(ee.location, se);
                break;
              case 3:
                i.vertexAttrib3fv(ee.location, se);
                break;
              case 4:
                i.vertexAttrib4fv(ee.location, se);
                break;
              default:
                i.vertexAttrib1fv(ee.location, se);
            }
        }
      }
    }
    A();
  }
  function y() {
    b();
    for (const P in n) {
      const I = n[P];
      for (const $ in I) {
        const Y = I[$];
        for (const B in Y) {
          const k = Y[B];
          for (const H in k)
            f(k[H].object), delete k[H];
          delete Y[B];
        }
      }
      delete n[P];
    }
  }
  function T(P) {
    if (n[P.id] === void 0) return;
    const I = n[P.id];
    for (const $ in I) {
      const Y = I[$];
      for (const B in Y) {
        const k = Y[B];
        for (const H in k)
          f(k[H].object), delete k[H];
        delete Y[B];
      }
    }
    delete n[P.id];
  }
  function C(P) {
    for (const I in n) {
      const $ = n[I];
      for (const Y in $) {
        const B = $[Y];
        if (B[P.id] === void 0) continue;
        const k = B[P.id];
        for (const H in k)
          f(k[H].object), delete k[H];
        delete B[P.id];
      }
    }
  }
  function g(P) {
    for (const I in n) {
      const $ = n[I], Y = P.isInstancedMesh === !0 ? P.id : 0, B = $[Y];
      if (B !== void 0) {
        for (const k in B) {
          const H = B[k];
          for (const Q in H)
            f(H[Q].object), delete H[Q];
          delete B[k];
        }
        delete $[Y], Object.keys($).length === 0 && delete n[I];
      }
    }
  }
  function b() {
    F(), s = !0, a !== r && (a = r, c(a.object));
  }
  function F() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: b,
    resetDefaultState: F,
    dispose: y,
    releaseStatesOfGeometry: T,
    releaseStatesOfObject: g,
    releaseStatesOfProgram: C,
    initAttributes: E,
    enableAttribute: m,
    disableUnusedAttributes: A
  };
}
function cu(i, e, t) {
  let n;
  function r(l) {
    n = l;
  }
  function a(l, c) {
    i.drawArrays(n, l, c), t.update(c, n, 1);
  }
  function s(l, c, f) {
    f !== 0 && (i.drawArraysInstanced(n, l, c, f), t.update(c, n, f));
  }
  function o(l, c, f) {
    if (f === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, c, 0, f);
    let u = 0;
    for (let _ = 0; _ < f; _++)
      u += c[_];
    t.update(u, n, 1);
  }
  this.setMode = r, this.render = a, this.renderInstances = s, this.renderMultiDraw = o;
}
function uu(i, e, t, n) {
  let r;
  function a() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const C = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function s(C) {
    return !(C !== 1023 && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(C) {
    const g = C === 1016 && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(C !== 1009 && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    C !== 1015 && !g);
  }
  function l(C) {
    if (C === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      C = "mediump";
    }
    return C === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const f = l(c);
  f !== c && (De("WebGLRenderer:", c, "not supported, using", f, "instead."), c = f);
  const p = t.logarithmicDepthBuffer === !0, u = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control");
  t.reversedDepthBuffer === !0 && u === !1 && De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const _ = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), x = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), E = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), d = i.getParameter(i.MAX_VERTEX_ATTRIBS), A = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), R = i.getParameter(i.MAX_VARYING_VECTORS), M = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), y = i.getParameter(i.MAX_SAMPLES), T = i.getParameter(i.SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: a,
    getMaxPrecision: l,
    textureFormatReadable: s,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: p,
    reversedDepthBuffer: u,
    maxTextures: _,
    maxVertexTextures: x,
    maxTextureSize: E,
    maxCubemapSize: m,
    maxAttributes: d,
    maxVertexUniforms: A,
    maxVaryings: R,
    maxFragmentUniforms: M,
    maxSamples: y,
    samples: T
  };
}
function fu(i) {
  const e = this;
  let t = null, n = 0, r = !1, a = !1;
  const s = new Sn(), o = new Ue(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(p, u) {
    const _ = p.length !== 0 || u || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = u, n = p.length, _;
  }, this.beginShadows = function() {
    a = !0, f(null);
  }, this.endShadows = function() {
    a = !1;
  }, this.setGlobalState = function(p, u) {
    t = f(p, u, 0);
  }, this.setState = function(p, u, _) {
    const x = p.clippingPlanes, E = p.clipIntersection, m = p.clipShadows, d = i.get(p);
    if (!r || x === null || x.length === 0 || a && !m)
      a ? f(null) : c();
    else {
      const A = a ? 0 : n, R = A * 4;
      let M = d.clippingState || null;
      l.value = M, M = f(x, u, R, _);
      for (let y = 0; y !== R; ++y)
        M[y] = t[y];
      d.clippingState = M, this.numIntersection = E ? this.numPlanes : 0, this.numPlanes += A;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function f(p, u, _, x) {
    const E = p !== null ? p.length : 0;
    let m = null;
    if (E !== 0) {
      if (m = l.value, x !== !0 || m === null) {
        const d = _ + E * 4, A = u.matrixWorldInverse;
        o.getNormalMatrix(A), (m === null || m.length < d) && (m = new Float32Array(d));
        for (let R = 0, M = _; R !== E; ++R, M += 4)
          s.copy(p[R]).applyMatrix4(A, o), s.normal.toArray(m, M), m[M + 3] = s.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return e.numPlanes = E, e.numIntersection = 0, m;
  }
}
const pn = 4, la = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], En = 20, du = 256, ti = /* @__PURE__ */ new ki(), ca = /* @__PURE__ */ new Ze();
let _r = null, gr = 0, xr = 0, vr = !1;
const hu = /* @__PURE__ */ new N();
class ua {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety.
   *
   * @param {Scene} scene - The scene to be captured.
   * @param {number} [sigma=0] - The blur radius in radians.
   * @param {number} [near=0.1] - The near plane distance.
   * @param {number} [far=100] - The far plane distance.
   * @param {Object} [options={}] - The configuration options.
   * @param {number} [options.size=256] - The texture size of the PMREM.
   * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromScene(e, t = 0, n = 0.1, r = 100, a = {}) {
    const {
      size: s = 256,
      position: o = hu
    } = a;
    _r = this._renderer.getRenderTarget(), gr = this._renderer.getActiveCubeFace(), xr = this._renderer.getActiveMipmapLevel(), vr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(s);
    const l = this._allocateTargets();
    return l.depthBuffer = !0, this._sceneToCubeUV(e, n, r, l, o), t > 0 && this._blur(l, 0, 0, t), this._applyPMREM(l), this._cleanup(l), l;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512), as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input image size
   * is 64 x 32.
   *
   * @param {Texture} equirectangular - The equirectangular texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256, as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input cube
   * size is 16 x 16 per face.
   *
   * @param {Texture} cubemap - The cubemap texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = ha(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = da(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(_r, gr, xr), this._renderer.xr.enabled = vr, e.scissorTest = !1, zn(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), _r = this._renderer.getRenderTarget(), gr = this._renderer.getActiveCubeFace(), xr = this._renderer.getActiveMipmapLevel(), vr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: Gi,
      depthBuffer: !1
    }, r = fa(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = fa(e, t, n);
      const { _lodMax: a } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = pu(a)), this._blurMaterial = _u(a, e, t), this._ggxMaterial = mu(a, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Ut(new Xt(), e);
    this._renderer.compile(t, ti);
  }
  _sceneToCubeUV(e, t, n, r, a) {
    const l = new kt(90, 1, t, n), c = [1, -1, 1, 1, 1, 1], f = [1, 1, 1, -1, -1, -1], p = this._renderer, u = p.autoClear, _ = p.toneMapping;
    p.getClearColor(ca), p.toneMapping = 0, p.autoClear = !1, p.state.buffers.depth.getReversed() && (p.setRenderTarget(r), p.clearDepth(), p.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Ut(
      new ci(),
      new Ka({
        name: "PMREM.Background",
        side: 1,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const E = this._backgroundBox, m = E.material;
    let d = !1;
    const A = e.background;
    A ? A.isColor && (m.color.copy(A), e.background = null, d = !0) : (m.color.copy(ca), d = !0);
    for (let R = 0; R < 6; R++) {
      const M = R % 3;
      M === 0 ? (l.up.set(0, c[R], 0), l.position.set(a.x, a.y, a.z), l.lookAt(a.x + f[R], a.y, a.z)) : M === 1 ? (l.up.set(0, 0, c[R]), l.position.set(a.x, a.y, a.z), l.lookAt(a.x, a.y + f[R], a.z)) : (l.up.set(0, c[R], 0), l.position.set(a.x, a.y, a.z), l.lookAt(a.x, a.y, a.z + f[R]));
      const y = this._cubeSize;
      zn(r, M * y, R > 2 ? y : 0, y, y), p.setRenderTarget(r), d && p.render(E, l), p.render(e, l);
    }
    p.toneMapping = _, p.autoClear = u, e.background = A;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = ha()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = da());
    const a = r ? this._cubemapMaterial : this._equirectMaterial, s = this._lodMeshes[0];
    s.material = a;
    const o = a.uniforms;
    o.envMap.value = e;
    const l = this._cubeSize;
    zn(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(s, ti);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let a = 1; a < r; a++)
      this._applyGGXFilter(e, a - 1, a);
    t.autoClear = n;
  }
  /**
   * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
   * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
   * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
   * applies incremental roughness filtering to avoid over-blurring.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn - Source LOD level to read from
   * @param {number} lodOut - Target LOD level to write to
   */
  _applyGGXFilter(e, t, n) {
    const r = this._renderer, a = this._pingPongRenderTarget, s = this._ggxMaterial, o = this._lodMeshes[n];
    o.material = s;
    const l = s.uniforms, c = n / (this._lodMeshes.length - 1), f = t / (this._lodMeshes.length - 1), p = Math.sqrt(c * c - f * f), u = 0 + c * 1.25, _ = p * u, { _lodMax: x } = this, E = this._sizeLods[n], m = 3 * E * (n > x - pn ? n - x + pn : 0), d = 4 * (this._cubeSize - E);
    l.envMap.value = e.texture, l.roughness.value = _, l.mipInt.value = x - t, zn(a, m, d, 3 * E, 2 * E), r.setRenderTarget(a), r.render(o, ti), l.envMap.value = a.texture, l.roughness.value = 0, l.mipInt.value = x - n, zn(e, m, d, 3 * E, 2 * E), r.setRenderTarget(e), r.render(o, ti);
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   *
   * Used for initial scene blur in fromScene() method when sigma > 0.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   * @param {Vector3} [poleAxis]
   */
  _blur(e, t, n, r, a) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      s,
      t,
      n,
      r,
      "latitudinal",
      a
    ), this._halfBlur(
      s,
      e,
      n,
      n,
      r,
      "longitudinal",
      a
    );
  }
  _halfBlur(e, t, n, r, a, s, o) {
    const l = this._renderer, c = this._blurMaterial;
    s !== "latitudinal" && s !== "longitudinal" && Ye(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const f = 3, p = this._lodMeshes[r];
    p.material = c;
    const u = c.uniforms, _ = this._sizeLods[n] - 1, x = isFinite(a) ? Math.PI / (2 * _) : 2 * Math.PI / (2 * En - 1), E = a / x, m = isFinite(a) ? 1 + Math.floor(f * E) : En;
    m > En && De(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${En}`);
    const d = [];
    let A = 0;
    for (let C = 0; C < En; ++C) {
      const g = C / E, b = Math.exp(-g * g / 2);
      d.push(b), C === 0 ? A += b : C < m && (A += 2 * b);
    }
    for (let C = 0; C < d.length; C++)
      d[C] = d[C] / A;
    u.envMap.value = e.texture, u.samples.value = m, u.weights.value = d, u.latitudinal.value = s === "latitudinal", o && (u.poleAxis.value = o);
    const { _lodMax: R } = this;
    u.dTheta.value = x, u.mipInt.value = R - n;
    const M = this._sizeLods[r], y = 3 * M * (r > R - pn ? r - R + pn : 0), T = 4 * (this._cubeSize - M);
    zn(t, y, T, 3 * M, 2 * M), l.setRenderTarget(t), l.render(p, ti);
  }
}
function pu(i) {
  const e = [], t = [], n = [];
  let r = i;
  const a = i - pn + 1 + la.length;
  for (let s = 0; s < a; s++) {
    const o = Math.pow(2, r);
    e.push(o);
    let l = 1 / o;
    s > i - pn ? l = la[s - i + pn - 1] : s === 0 && (l = 0), t.push(l);
    const c = 1 / (o - 2), f = -c, p = 1 + c, u = [f, f, p, f, p, p, f, f, p, p, f, p], _ = 6, x = 6, E = 3, m = 2, d = 1, A = new Float32Array(E * x * _), R = new Float32Array(m * x * _), M = new Float32Array(d * x * _);
    for (let T = 0; T < _; T++) {
      const C = T % 3 * 2 / 3 - 1, g = T > 2 ? 0 : -1, b = [
        C,
        g,
        0,
        C + 2 / 3,
        g,
        0,
        C + 2 / 3,
        g + 1,
        0,
        C,
        g,
        0,
        C + 2 / 3,
        g + 1,
        0,
        C,
        g + 1,
        0
      ];
      A.set(b, E * x * T), R.set(u, m * x * T);
      const F = [T, T, T, T, T, T];
      M.set(F, d * x * T);
    }
    const y = new Xt();
    y.setAttribute("position", new $t(A, E)), y.setAttribute("uv", new $t(R, m)), y.setAttribute("faceIndex", new $t(M, d)), n.push(new Ut(y, null)), r > pn && r--;
  }
  return { lodMeshes: n, sizeLods: e, sigmas: t };
}
function fa(i, e, t) {
  const n = new Gt(i, e, t);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function zn(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function mu(i, e, t) {
  return new Ct({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: du,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: Wi(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function _u(i, e, t) {
  const n = new Float32Array(En), r = new N(0, 1, 0);
  return new Ct({
    name: "SphericalGaussianBlur",
    defines: {
      n: En,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: Wi(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function da() {
  return new Ct({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Wi(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ha() {
  return new Ct({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Wi(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Wi() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
class rs extends Gt {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new $a(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new ci(5, 5, 5), a = new Ct({
      name: "CubemapFromEquirect",
      uniforms: qn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    a.uniforms.tEquirect.value = t;
    const s = new Ut(r, a), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new Mo(1, 10, this).update(e, s), t.minFilter = o, s.geometry.dispose(), s.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(e, t = !0, n = !0, r = !0) {
    const a = e.getRenderTarget();
    for (let s = 0; s < 6; s++)
      e.setRenderTarget(this, s), e.clear(t, n, r);
    e.setRenderTarget(a);
  }
}
function gu(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n = null;
  function r(u, _ = !1) {
    return u == null ? null : _ ? s(u) : a(u);
  }
  function a(u) {
    if (u && u.isTexture) {
      const _ = u.mapping;
      if (_ === 303 || _ === 304)
        if (e.has(u)) {
          const x = e.get(u).texture;
          return o(x, u.mapping);
        } else {
          const x = u.image;
          if (x && x.height > 0) {
            const E = new rs(x.height);
            return E.fromEquirectangularTexture(i, u), e.set(u, E), u.addEventListener("dispose", c), o(E.texture, u.mapping);
          } else
            return null;
        }
    }
    return u;
  }
  function s(u) {
    if (u && u.isTexture) {
      const _ = u.mapping, x = _ === 303 || _ === 304, E = _ === 301 || _ === 302;
      if (x || E) {
        let m = t.get(u);
        const d = m !== void 0 ? m.texture.pmremVersion : 0;
        if (u.isRenderTargetTexture && u.pmremVersion !== d)
          return n === null && (n = new ua(i)), m = x ? n.fromEquirectangular(u, m) : n.fromCubemap(u, m), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), m.texture;
        if (m !== void 0)
          return m.texture;
        {
          const A = u.image;
          return x && A && A.height > 0 || E && A && l(A) ? (n === null && (n = new ua(i)), m = x ? n.fromEquirectangular(u) : n.fromCubemap(u), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), u.addEventListener("dispose", f), m.texture) : null;
        }
      }
    }
    return u;
  }
  function o(u, _) {
    return _ === 303 ? u.mapping = 301 : _ === 304 && (u.mapping = 302), u;
  }
  function l(u) {
    let _ = 0;
    const x = 6;
    for (let E = 0; E < x; E++)
      u[E] !== void 0 && _++;
    return _ === x;
  }
  function c(u) {
    const _ = u.target;
    _.removeEventListener("dispose", c);
    const x = e.get(_);
    x !== void 0 && (e.delete(_), x.dispose());
  }
  function f(u) {
    const _ = u.target;
    _.removeEventListener("dispose", f);
    const x = t.get(_);
    x !== void 0 && (t.delete(_), x.dispose());
  }
  function p() {
    e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: p
  };
}
function xu(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    const r = i.getExtension(n);
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = t(n);
      return r === null && kn("WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function vu(i, e, t, n) {
  const r = {}, a = /* @__PURE__ */ new WeakMap();
  function s(p) {
    const u = p.target;
    u.index !== null && e.remove(u.index);
    for (const x in u.attributes)
      e.remove(u.attributes[x]);
    u.removeEventListener("dispose", s), delete r[u.id];
    const _ = a.get(u);
    _ && (e.remove(_), a.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, t.memory.geometries--;
  }
  function o(p, u) {
    return r[u.id] === !0 || (u.addEventListener("dispose", s), r[u.id] = !0, t.memory.geometries++), u;
  }
  function l(p) {
    const u = p.attributes;
    for (const _ in u)
      e.update(u[_], i.ARRAY_BUFFER);
  }
  function c(p) {
    const u = [], _ = p.index, x = p.attributes.position;
    let E = 0;
    if (x === void 0)
      return;
    if (_ !== null) {
      const A = _.array;
      E = _.version;
      for (let R = 0, M = A.length; R < M; R += 3) {
        const y = A[R + 0], T = A[R + 1], C = A[R + 2];
        u.push(y, T, T, C, C, y);
      }
    } else {
      const A = x.array;
      E = x.version;
      for (let R = 0, M = A.length / 3 - 1; R < M; R += 3) {
        const y = R + 0, T = R + 1, C = R + 2;
        u.push(y, T, T, C, C, y);
      }
    }
    const m = new (x.count >= 65535 ? Ya : qa)(u, 1);
    m.version = E;
    const d = a.get(p);
    d && e.remove(d), a.set(p, m);
  }
  function f(p) {
    const u = a.get(p);
    if (u) {
      const _ = p.index;
      _ !== null && u.version < _.version && c(p);
    } else
      c(p);
    return a.get(p);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: f
  };
}
function Mu(i, e, t) {
  let n;
  function r(p) {
    n = p;
  }
  let a, s;
  function o(p) {
    a = p.type, s = p.bytesPerElement;
  }
  function l(p, u) {
    i.drawElements(n, u, a, p * s), t.update(u, n, 1);
  }
  function c(p, u, _) {
    _ !== 0 && (i.drawElementsInstanced(n, u, a, p * s, _), t.update(u, n, _));
  }
  function f(p, u, _) {
    if (_ === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, u, 0, a, p, 0, _);
    let E = 0;
    for (let m = 0; m < _; m++)
      E += u[m];
    t.update(E, n, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = f;
}
function Su(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(a, s, o) {
    switch (t.calls++, s) {
      case i.TRIANGLES:
        t.triangles += o * (a / 3);
        break;
      case i.LINES:
        t.lines += o * (a / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (a - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * a;
        break;
      case i.POINTS:
        t.points += o * a;
        break;
      default:
        Ye("WebGLInfo: Unknown draw mode:", s);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Eu(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new ct();
  function a(s, o, l) {
    const c = s.morphTargetInfluences, f = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, p = f !== void 0 ? f.length : 0;
    let u = n.get(o);
    if (u === void 0 || u.count !== p) {
      let b = function() {
        C.dispose(), n.delete(o), o.removeEventListener("dispose", b);
      };
      u !== void 0 && u.texture.dispose();
      const _ = o.morphAttributes.position !== void 0, x = o.morphAttributes.normal !== void 0, E = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], d = o.morphAttributes.normal || [], A = o.morphAttributes.color || [];
      let R = 0;
      _ === !0 && (R = 1), x === !0 && (R = 2), E === !0 && (R = 3);
      let M = o.attributes.position.count * R, y = 1;
      M > e.maxTextureSize && (y = Math.ceil(M / e.maxTextureSize), M = e.maxTextureSize);
      const T = new Float32Array(M * y * 4 * p), C = new ka(T, M, y, p);
      C.type = 1015, C.needsUpdate = !0;
      const g = R * 4;
      for (let F = 0; F < p; F++) {
        const P = m[F], I = d[F], $ = A[F], Y = M * y * 4 * F;
        for (let B = 0; B < P.count; B++) {
          const k = B * g;
          _ === !0 && (r.fromBufferAttribute(P, B), T[Y + k + 0] = r.x, T[Y + k + 1] = r.y, T[Y + k + 2] = r.z, T[Y + k + 3] = 0), x === !0 && (r.fromBufferAttribute(I, B), T[Y + k + 4] = r.x, T[Y + k + 5] = r.y, T[Y + k + 6] = r.z, T[Y + k + 7] = 0), E === !0 && (r.fromBufferAttribute($, B), T[Y + k + 8] = r.x, T[Y + k + 9] = r.y, T[Y + k + 10] = r.z, T[Y + k + 11] = $.itemSize === 4 ? r.w : 1);
        }
      }
      u = {
        count: p,
        texture: C,
        size: new Ke(M, y)
      }, n.set(o, u), o.addEventListener("dispose", b);
    }
    if (s.isInstancedMesh === !0 && s.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", s.morphTexture, t);
    else {
      let _ = 0;
      for (let E = 0; E < c.length; E++)
        _ += c[E];
      const x = o.morphTargetsRelative ? 1 : 1 - _;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", x), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", u.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", u.size);
  }
  return {
    update: a
  };
}
function Tu(i, e, t, n, r) {
  let a = /* @__PURE__ */ new WeakMap();
  function s(c) {
    const f = r.render.frame, p = c.geometry, u = e.get(c, p);
    if (a.get(u) !== f && (e.update(u), a.set(u, f)), c.isInstancedMesh && (c.hasEventListener("dispose", l) === !1 && c.addEventListener("dispose", l), a.get(c) !== f && (t.update(c.instanceMatrix, i.ARRAY_BUFFER), c.instanceColor !== null && t.update(c.instanceColor, i.ARRAY_BUFFER), a.set(c, f))), c.isSkinnedMesh) {
      const _ = c.skeleton;
      a.get(_) !== f && (_.update(), a.set(_, f));
    }
    return u;
  }
  function o() {
    a = /* @__PURE__ */ new WeakMap();
  }
  function l(c) {
    const f = c.target;
    f.removeEventListener("dispose", l), n.releaseStatesOfObject(f), t.remove(f.instanceMatrix), f.instanceColor !== null && t.remove(f.instanceColor);
  }
  return {
    update: s,
    dispose: o
  };
}
const bu = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function yu(i, e, t, n, r, a) {
  const s = new Gt(e, t, {
    type: i,
    depthBuffer: r,
    stencilBuffer: a,
    samples: n ? 4 : 0,
    depthTexture: r ? new Xn(e, t) : void 0
  }), o = new Gt(e, t, {
    type: 1016,
    depthBuffer: !1,
    stencilBuffer: !1
  }), l = new Xt();
  l.setAttribute("position", new Pt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), l.setAttribute("uv", new Pt([0, 2, 0, 0, 2, 0], 2));
  const c = new ja({
    uniforms: {
      tDiffuse: { value: null }
    },
    vertexShader: (
      /* glsl */
      `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`
    ),
    fragmentShader: (
      /* glsl */
      `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`
    ),
    depthTest: !1,
    depthWrite: !1
  }), f = new Ut(l, c), p = new ki(-1, 1, 1, -1, 0, 1);
  let u = null, _ = null, x = !1, E, m = null, d = [], A = !1;
  this.setSize = function(R, M) {
    s.setSize(R, M), o.setSize(R, M);
    for (let y = 0; y < d.length; y++) {
      const T = d[y];
      T.setSize && T.setSize(R, M);
    }
  }, this.setEffects = function(R) {
    d = R, A = d.length > 0 && d[0].isRenderPass === !0;
    const M = s.width, y = s.height;
    for (let T = 0; T < d.length; T++) {
      const C = d[T];
      C.setSize && C.setSize(M, y);
    }
  }, this.begin = function(R, M) {
    if (x || R.toneMapping === 0 && d.length === 0) return !1;
    if (m = M, M !== null) {
      const y = M.width, T = M.height;
      (s.width !== y || s.height !== T) && this.setSize(y, T);
    }
    return A === !1 && R.setRenderTarget(s), E = R.toneMapping, R.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return A;
  }, this.end = function(R, M) {
    R.toneMapping = E, x = !0;
    let y = s, T = o;
    for (let C = 0; C < d.length; C++) {
      const g = d[C];
      if (g.enabled !== !1 && (g.render(R, T, y, M), g.needsSwap !== !1)) {
        const b = y;
        y = T, T = b;
      }
    }
    if (u !== R.outputColorSpace || _ !== R.toneMapping) {
      u = R.outputColorSpace, _ = R.toneMapping, c.defines = {}, ke.getTransfer(u) === $e && (c.defines.SRGB_TRANSFER = "");
      const C = bu[_];
      C && (c.defines[C] = ""), c.needsUpdate = !0;
    }
    c.uniforms.tDiffuse.value = y.texture, R.setRenderTarget(m), R.render(f, p), m = null, x = !1;
  }, this.isCompositing = function() {
    return x;
  }, this.dispose = function() {
    s.depthTexture && s.depthTexture.dispose(), s.dispose(), o.dispose(), l.dispose(), c.dispose();
  };
}
const as = /* @__PURE__ */ new yt(), br = /* @__PURE__ */ new Xn(1, 1), ss = /* @__PURE__ */ new ka(), os = /* @__PURE__ */ new Ws(), ls = /* @__PURE__ */ new $a(), pa = [], ma = [], _a = new Float32Array(16), ga = new Float32Array(9), xa = new Float32Array(4);
function Zn(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let a = pa[r];
  if (a === void 0 && (a = new Float32Array(r), pa[r] = a), e !== 0) {
    n.toArray(a, 0);
    for (let s = 1, o = 0; s !== e; ++s)
      o += t, i[s].toArray(a, o);
  }
  return a;
}
function vt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function Mt(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Xi(i, e) {
  let t = ma[e];
  t === void 0 && (t = new Int32Array(e), ma[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function Au(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function Ru(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (vt(t, e)) return;
    i.uniform2fv(this.addr, e), Mt(t, e);
  }
}
function Cu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (vt(t, e)) return;
    i.uniform3fv(this.addr, e), Mt(t, e);
  }
}
function wu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (vt(t, e)) return;
    i.uniform4fv(this.addr, e), Mt(t, e);
  }
}
function Pu(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (vt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), Mt(t, e);
  } else {
    if (vt(t, n)) return;
    xa.set(n), i.uniformMatrix2fv(this.addr, !1, xa), Mt(t, n);
  }
}
function Du(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (vt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), Mt(t, e);
  } else {
    if (vt(t, n)) return;
    ga.set(n), i.uniformMatrix3fv(this.addr, !1, ga), Mt(t, n);
  }
}
function Lu(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (vt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), Mt(t, e);
  } else {
    if (vt(t, n)) return;
    _a.set(n), i.uniformMatrix4fv(this.addr, !1, _a), Mt(t, n);
  }
}
function Fu(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function Iu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (vt(t, e)) return;
    i.uniform2iv(this.addr, e), Mt(t, e);
  }
}
function Uu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (vt(t, e)) return;
    i.uniform3iv(this.addr, e), Mt(t, e);
  }
}
function Nu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (vt(t, e)) return;
    i.uniform4iv(this.addr, e), Mt(t, e);
  }
}
function Ou(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function Bu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (vt(t, e)) return;
    i.uniform2uiv(this.addr, e), Mt(t, e);
  }
}
function Gu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (vt(t, e)) return;
    i.uniform3uiv(this.addr, e), Mt(t, e);
  }
}
function zu(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (vt(t, e)) return;
    i.uniform4uiv(this.addr, e), Mt(t, e);
  }
}
function Vu(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let a;
  this.type === i.SAMPLER_2D_SHADOW ? (br.compareFunction = t.isReversedDepthBuffer() ? 518 : 515, a = br) : a = as, t.setTexture2D(e || a, r);
}
function Hu(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || os, r);
}
function ku(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || ls, r);
}
function Wu(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || ss, r);
}
function Xu(i) {
  switch (i) {
    case 5126:
      return Au;
    // FLOAT
    case 35664:
      return Ru;
    // _VEC2
    case 35665:
      return Cu;
    // _VEC3
    case 35666:
      return wu;
    // _VEC4
    case 35674:
      return Pu;
    // _MAT2
    case 35675:
      return Du;
    // _MAT3
    case 35676:
      return Lu;
    // _MAT4
    case 5124:
    case 35670:
      return Fu;
    // INT, BOOL
    case 35667:
    case 35671:
      return Iu;
    // _VEC2
    case 35668:
    case 35672:
      return Uu;
    // _VEC3
    case 35669:
    case 35673:
      return Nu;
    // _VEC4
    case 5125:
      return Ou;
    // UINT
    case 36294:
      return Bu;
    // _VEC2
    case 36295:
      return Gu;
    // _VEC3
    case 36296:
      return zu;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Vu;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Hu;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return ku;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Wu;
  }
}
function qu(i, e) {
  i.uniform1fv(this.addr, e);
}
function Yu(i, e) {
  const t = Zn(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Ku(i, e) {
  const t = Zn(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Zu(i, e) {
  const t = Zn(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function $u(i, e) {
  const t = Zn(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Ju(i, e) {
  const t = Zn(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function Qu(i, e) {
  const t = Zn(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function ju(i, e) {
  i.uniform1iv(this.addr, e);
}
function ef(i, e) {
  i.uniform2iv(this.addr, e);
}
function tf(i, e) {
  i.uniform3iv(this.addr, e);
}
function nf(i, e) {
  i.uniform4iv(this.addr, e);
}
function rf(i, e) {
  i.uniform1uiv(this.addr, e);
}
function af(i, e) {
  i.uniform2uiv(this.addr, e);
}
function sf(i, e) {
  i.uniform3uiv(this.addr, e);
}
function of(i, e) {
  i.uniform4uiv(this.addr, e);
}
function lf(i, e, t) {
  const n = this.cache, r = e.length, a = Xi(t, r);
  vt(n, a) || (i.uniform1iv(this.addr, a), Mt(n, a));
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? s = br : s = as;
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || s, a[o]);
}
function cf(i, e, t) {
  const n = this.cache, r = e.length, a = Xi(t, r);
  vt(n, a) || (i.uniform1iv(this.addr, a), Mt(n, a));
  for (let s = 0; s !== r; ++s)
    t.setTexture3D(e[s] || os, a[s]);
}
function uf(i, e, t) {
  const n = this.cache, r = e.length, a = Xi(t, r);
  vt(n, a) || (i.uniform1iv(this.addr, a), Mt(n, a));
  for (let s = 0; s !== r; ++s)
    t.setTextureCube(e[s] || ls, a[s]);
}
function ff(i, e, t) {
  const n = this.cache, r = e.length, a = Xi(t, r);
  vt(n, a) || (i.uniform1iv(this.addr, a), Mt(n, a));
  for (let s = 0; s !== r; ++s)
    t.setTexture2DArray(e[s] || ss, a[s]);
}
function df(i) {
  switch (i) {
    case 5126:
      return qu;
    // FLOAT
    case 35664:
      return Yu;
    // _VEC2
    case 35665:
      return Ku;
    // _VEC3
    case 35666:
      return Zu;
    // _VEC4
    case 35674:
      return $u;
    // _MAT2
    case 35675:
      return Ju;
    // _MAT3
    case 35676:
      return Qu;
    // _MAT4
    case 5124:
    case 35670:
      return ju;
    // INT, BOOL
    case 35667:
    case 35671:
      return ef;
    // _VEC2
    case 35668:
    case 35672:
      return tf;
    // _VEC3
    case 35669:
    case 35673:
      return nf;
    // _VEC4
    case 5125:
      return rf;
    // UINT
    case 36294:
      return af;
    // _VEC2
    case 36295:
      return sf;
    // _VEC3
    case 36296:
      return of;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return lf;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return cf;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return uf;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return ff;
  }
}
class hf {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Xu(t.type);
  }
}
class pf {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = df(t.type);
  }
}
class mf {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let a = 0, s = r.length; a !== s; ++a) {
      const o = r[a];
      o.setValue(e, t[o.id], n);
    }
  }
}
const Mr = /(\w+)(\])?(\[|\.)?/g;
function va(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function _f(i, e, t) {
  const n = i.name, r = n.length;
  for (Mr.lastIndex = 0; ; ) {
    const a = Mr.exec(n), s = Mr.lastIndex;
    let o = a[1];
    const l = a[2] === "]", c = a[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && s + 2 === r) {
      va(t, c === void 0 ? new hf(o, i, e) : new pf(o, i, e));
      break;
    } else {
      let p = t.map[o];
      p === void 0 && (p = new mf(o), va(t, p)), t = p;
    }
  }
}
class Bi {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const o = e.getActiveUniform(t, s), l = e.getUniformLocation(t, o.name);
      _f(o, l, this);
    }
    const r = [], a = [];
    for (const s of this.seq)
      s.type === e.SAMPLER_2D_SHADOW || s.type === e.SAMPLER_CUBE_SHADOW || s.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(s) : a.push(s);
    r.length > 0 && (this.seq = r.concat(a));
  }
  setValue(e, t, n, r) {
    const a = this.map[t];
    a !== void 0 && a.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let a = 0, s = t.length; a !== s; ++a) {
      const o = t[a], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, a = e.length; r !== a; ++r) {
      const s = e[r];
      s.id in t && n.push(s);
    }
    return n;
  }
}
function Ma(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const gf = 37297;
let xf = 0;
function vf(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), a = Math.min(e + 6, t.length);
  for (let s = r; s < a; s++) {
    const o = s + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[s]}`);
  }
  return n.join(`
`);
}
const Sa = /* @__PURE__ */ new Ue();
function Mf(i) {
  ke._getMatrix(Sa, ke.workingColorSpace, i);
  const e = `mat3( ${Sa.elements.map((t) => t.toFixed(4))} )`;
  switch (ke.getTransfer(i)) {
    case zi:
      return [e, "LinearTransferOETF"];
    case $e:
      return [e, "sRGBTransferOETF"];
    default:
      return De("WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function Ea(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), a = (i.getShaderInfoLog(e) || "").trim();
  if (n && a === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(a);
  if (s) {
    const o = parseInt(s[1]);
    return t.toUpperCase() + `

` + a + `

` + vf(i.getShaderSource(e), o);
  } else
    return a;
}
function Sf(i, e) {
  const t = Mf(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
const Ef = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function Tf(i, e) {
  const t = Ef[e];
  return t === void 0 ? (De("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + i + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const Ui = /* @__PURE__ */ new N();
function bf() {
  ke.getLuminanceCoefficients(Ui);
  const i = Ui.x.toFixed(4), e = Ui.y.toFixed(4), t = Ui.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function yf(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(ii).join(`
`);
}
function Af(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function Rf(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const a = i.getActiveAttrib(e, r), s = a.name;
    let o = 1;
    a.type === i.FLOAT_MAT2 && (o = 2), a.type === i.FLOAT_MAT3 && (o = 3), a.type === i.FLOAT_MAT4 && (o = 4), t[s] = {
      type: a.type,
      location: i.getAttribLocation(e, s),
      locationSize: o
    };
  }
  return t;
}
function ii(i) {
  return i !== "";
}
function Ta(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function ba(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Cf = /^[ \t]*#include +<([\w\d./]+)>/gm;
function yr(i) {
  return i.replace(Cf, Pf);
}
const wf = /* @__PURE__ */ new Map();
function Pf(i, e) {
  let t = Oe[e];
  if (t === void 0) {
    const n = wf.get(e);
    if (n !== void 0)
      t = Oe[n], De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("THREE.WebGLProgram: Can not resolve #include <" + e + ">");
  }
  return yr(t);
}
const Df = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ya(i) {
  return i.replace(Df, Lf);
}
function Lf(i, e, t, n) {
  let r = "";
  for (let a = parseInt(e); a < parseInt(t); a++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
  return r;
}
function Aa(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
const Ff = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function If(i) {
  return Ff[i.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const Uf = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function Nf(i) {
  return i.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Uf[i.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const Of = {
  302: "ENVMAP_MODE_REFRACTION"
};
function Bf(i) {
  return i.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : Of[i.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const Gf = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function zf(i) {
  return i.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Gf[i.combine] || "ENVMAP_BLENDING_NONE";
}
function Vf(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function Hf(i, e, t, n) {
  const r = i.getContext(), a = t.defines;
  let s = t.vertexShader, o = t.fragmentShader;
  const l = If(t), c = Nf(t), f = Bf(t), p = zf(t), u = Vf(t), _ = yf(t), x = Af(a), E = r.createProgram();
  let m, d, A = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(ii).join(`
`), m.length > 0 && (m += `
`), d = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(ii).join(`
`), d.length > 0 && (d += `
`)) : (m = [
    Aa(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + f : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexNormals ? "#define HAS_NORMAL" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(ii).join(`
`), d = [
    Aa(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + f : "",
    t.envMap ? "#define " + p : "",
    u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
    u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
    u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? Oe.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? Tf("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Oe.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Sf("linearToOutputTexel", t.outputColorSpace),
    bf(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(ii).join(`
`)), s = yr(s), s = Ta(s, t), s = ba(s, t), o = yr(o), o = Ta(o, t), o = ba(o, t), s = ya(s), o = ya(o), t.isRawShaderMaterial !== !0 && (A = `#version 300 es
`, m = [
    _,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, d = [
    "#define varying in",
    t.glslVersion === Gr ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Gr ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + d);
  const R = A + m + s, M = A + d + o, y = Ma(r, r.VERTEX_SHADER, R), T = Ma(r, r.FRAGMENT_SHADER, M);
  r.attachShader(E, y), r.attachShader(E, T), t.index0AttributeName !== void 0 ? r.bindAttribLocation(E, 0, t.index0AttributeName) : t.hasPositionAttribute === !0 && r.bindAttribLocation(E, 0, "position"), r.linkProgram(E);
  function C(P) {
    if (i.debug.checkShaderErrors) {
      const I = r.getProgramInfoLog(E) || "", $ = r.getShaderInfoLog(y) || "", Y = r.getShaderInfoLog(T) || "", B = I.trim(), k = $.trim(), H = Y.trim();
      let Q = !0, ee = !0;
      if (r.getProgramParameter(E, r.LINK_STATUS) === !1)
        if (Q = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, E, y, T);
        else {
          const ie = Ea(r, y, "vertex"), se = Ea(r, T, "fragment");
          Ye(
            "WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(E, r.VALIDATE_STATUS) + `

Material Name: ` + P.name + `
Material Type: ` + P.type + `

Program Info Log: ` + B + `
` + ie + `
` + se
          );
        }
      else B !== "" ? De("WebGLProgram: Program Info Log:", B) : (k === "" || H === "") && (ee = !1);
      ee && (P.diagnostics = {
        runnable: Q,
        programLog: B,
        vertexShader: {
          log: k,
          prefix: m
        },
        fragmentShader: {
          log: H,
          prefix: d
        }
      });
    }
    r.deleteShader(y), r.deleteShader(T), g = new Bi(r, E), b = Rf(r, E);
  }
  let g;
  this.getUniforms = function() {
    return g === void 0 && C(this), g;
  };
  let b;
  this.getAttributes = function() {
    return b === void 0 && C(this), b;
  };
  let F = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return F === !1 && (F = r.getProgramParameter(E, gf)), F;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(E), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = xf++, this.cacheKey = e, this.usedTimes = 1, this.program = E, this.vertexShader = y, this.fragmentShader = T, this;
}
let kf = 0;
class Wf {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e, t, n) {
    const r = this._getShaderCacheForMaterial(e);
    return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderStage(e) {
    return this._getShaderStage(e.vertexShader);
  }
  getFragmentShaderStage(e) {
    return this._getShaderStage(e.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Xf(e), t.set(e, n)), n;
  }
}
class Xf {
  constructor(e) {
    this.id = kf++, this.code = e, this.usedTimes = 0;
  }
}
function qf(i) {
  return i === 1030 || i === 37490 || i === 36285;
}
function Yf(i, e, t, n, r, a) {
  const s = new Wa(), o = new Wf(), l = /* @__PURE__ */ new Set(), c = [], f = /* @__PURE__ */ new Map(), p = n.logarithmicDepthBuffer;
  let u = n.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function x(g) {
    return l.add(g), g === 0 ? "uv" : `uv${g}`;
  }
  function E(g, b, F, P, I, $) {
    const Y = P.fog, B = I.geometry, k = g.isMeshStandardMaterial || g.isMeshLambertMaterial || g.isMeshPhongMaterial ? P.environment : null, H = g.isMeshStandardMaterial || g.isMeshLambertMaterial && !g.envMap || g.isMeshPhongMaterial && !g.envMap, Q = e.get(g.envMap || k, H), ee = Q && Q.mapping === 306 ? Q.image.height : null, ie = _[g.type];
    g.precision !== null && (u = n.getMaxPrecision(g.precision), u !== g.precision && De("WebGLProgram.getParameters:", g.precision, "not supported, using", u, "instead."));
    const se = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, ge = se !== void 0 ? se.length : 0;
    let ze = 0;
    B.morphAttributes.position !== void 0 && (ze = 1), B.morphAttributes.normal !== void 0 && (ze = 2), B.morphAttributes.color !== void 0 && (ze = 3);
    let Je, He, J, re;
    if (ie) {
      const q = Zt[ie];
      Je = q.vertexShader, He = q.fragmentShader;
    } else {
      Je = g.vertexShader, He = g.fragmentShader;
      const q = o.getVertexShaderStage(g), de = o.getFragmentShaderStage(g);
      o.update(g, q, de), J = q.id, re = de.id;
    }
    const te = i.getRenderTarget(), we = i.state.buffers.depth.getReversed(), Le = I.isInstancedMesh === !0, Re = I.isBatchedMesh === !0, nt = !!g.map, Fe = !!g.matcap, Xe = !!Q, Pe = !!g.aoMap, Ve = !!g.lightMap, st = !!g.bumpMap && g.wireframe === !1, ut = !!g.normalMap, _t = !!g.displacementMap, ft = !!g.emissiveMap, je = !!g.metalnessMap, it = !!g.roughnessMap, D = g.anisotropy > 0, ot = g.clearcoat > 0, Be = g.dispersion > 0, S = g.iridescence > 0, h = g.sheen > 0, U = g.transmission > 0, z = D && !!g.anisotropyMap, W = ot && !!g.clearcoatMap, ne = ot && !!g.clearcoatNormalMap, ce = ot && !!g.clearcoatRoughnessMap, X = S && !!g.iridescenceMap, K = S && !!g.iridescenceThicknessMap, oe = h && !!g.sheenColorMap, Se = h && !!g.sheenRoughnessMap, ue = !!g.specularMap, fe = !!g.specularColorMap, ye = !!g.specularIntensityMap, Ce = U && !!g.transmissionMap, Ie = U && !!g.thicknessMap, w = !!g.gradientMap, ae = !!g.alphaMap, Z = g.alphaTest > 0, le = !!g.alphaHash, he = !!g.extensions;
    let j = 0;
    g.toneMapped && (te === null || te.isXRRenderTarget === !0) && (j = i.toneMapping);
    const Ee = {
      shaderID: ie,
      shaderType: g.type,
      shaderName: g.name,
      vertexShader: Je,
      fragmentShader: He,
      defines: g.defines,
      customVertexShaderID: J,
      customFragmentShaderID: re,
      isRawShaderMaterial: g.isRawShaderMaterial === !0,
      glslVersion: g.glslVersion,
      precision: u,
      batching: Re,
      batchingColor: Re && I._colorsTexture !== null,
      instancing: Le,
      instancingColor: Le && I.instanceColor !== null,
      instancingMorph: Le && I.morphTexture !== null,
      outputColorSpace: te === null ? i.outputColorSpace : te.isXRRenderTarget === !0 ? te.texture.colorSpace : ke.workingColorSpace,
      alphaToCoverage: !!g.alphaToCoverage,
      map: nt,
      matcap: Fe,
      envMap: Xe,
      envMapMode: Xe && Q.mapping,
      envMapCubeUVHeight: ee,
      aoMap: Pe,
      lightMap: Ve,
      bumpMap: st,
      normalMap: ut,
      displacementMap: _t,
      emissiveMap: ft,
      normalMapObjectSpace: ut && g.normalMapType === 1,
      normalMapTangentSpace: ut && g.normalMapType === 0,
      packedNormalMap: ut && g.normalMapType === 0 && qf(g.normalMap.format),
      metalnessMap: je,
      roughnessMap: it,
      anisotropy: D,
      anisotropyMap: z,
      clearcoat: ot,
      clearcoatMap: W,
      clearcoatNormalMap: ne,
      clearcoatRoughnessMap: ce,
      dispersion: Be,
      iridescence: S,
      iridescenceMap: X,
      iridescenceThicknessMap: K,
      sheen: h,
      sheenColorMap: oe,
      sheenRoughnessMap: Se,
      specularMap: ue,
      specularColorMap: fe,
      specularIntensityMap: ye,
      transmission: U,
      transmissionMap: Ce,
      thicknessMap: Ie,
      gradientMap: w,
      opaque: g.transparent === !1 && g.blending === 1 && g.alphaToCoverage === !1,
      alphaMap: ae,
      alphaTest: Z,
      alphaHash: le,
      combine: g.combine,
      //
      mapUv: nt && x(g.map.channel),
      aoMapUv: Pe && x(g.aoMap.channel),
      lightMapUv: Ve && x(g.lightMap.channel),
      bumpMapUv: st && x(g.bumpMap.channel),
      normalMapUv: ut && x(g.normalMap.channel),
      displacementMapUv: _t && x(g.displacementMap.channel),
      emissiveMapUv: ft && x(g.emissiveMap.channel),
      metalnessMapUv: je && x(g.metalnessMap.channel),
      roughnessMapUv: it && x(g.roughnessMap.channel),
      anisotropyMapUv: z && x(g.anisotropyMap.channel),
      clearcoatMapUv: W && x(g.clearcoatMap.channel),
      clearcoatNormalMapUv: ne && x(g.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ce && x(g.clearcoatRoughnessMap.channel),
      iridescenceMapUv: X && x(g.iridescenceMap.channel),
      iridescenceThicknessMapUv: K && x(g.iridescenceThicknessMap.channel),
      sheenColorMapUv: oe && x(g.sheenColorMap.channel),
      sheenRoughnessMapUv: Se && x(g.sheenRoughnessMap.channel),
      specularMapUv: ue && x(g.specularMap.channel),
      specularColorMapUv: fe && x(g.specularColorMap.channel),
      specularIntensityMapUv: ye && x(g.specularIntensityMap.channel),
      transmissionMapUv: Ce && x(g.transmissionMap.channel),
      thicknessMapUv: Ie && x(g.thicknessMap.channel),
      alphaMapUv: ae && x(g.alphaMap.channel),
      //
      vertexTangents: !!B.attributes.tangent && (ut || D),
      vertexNormals: !!B.attributes.normal,
      vertexColors: g.vertexColors,
      vertexAlphas: g.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4,
      pointsUvs: I.isPoints === !0 && !!B.attributes.uv && (nt || ae),
      fog: !!Y,
      useFog: g.fog === !0,
      fogExp2: !!Y && Y.isFogExp2,
      flatShading: g.wireframe === !1 && (g.flatShading === !0 || B.attributes.normal === void 0 && ut === !1 && (g.isMeshLambertMaterial || g.isMeshPhongMaterial || g.isMeshStandardMaterial || g.isMeshPhysicalMaterial)),
      sizeAttenuation: g.sizeAttenuation === !0,
      logarithmicDepthBuffer: p,
      reversedDepthBuffer: we,
      skinning: I.isSkinnedMesh === !0,
      hasPositionAttribute: B.attributes.position !== void 0,
      morphTargets: B.morphAttributes.position !== void 0,
      morphNormals: B.morphAttributes.normal !== void 0,
      morphColors: B.morphAttributes.color !== void 0,
      morphTargetsCount: ge,
      morphTextureStride: ze,
      numDirLights: b.directional.length,
      numPointLights: b.point.length,
      numSpotLights: b.spot.length,
      numSpotLightMaps: b.spotLightMap.length,
      numRectAreaLights: b.rectArea.length,
      numHemiLights: b.hemi.length,
      numDirLightShadows: b.directionalShadowMap.length,
      numPointLightShadows: b.pointShadowMap.length,
      numSpotLightShadows: b.spotShadowMap.length,
      numSpotLightShadowsWithMaps: b.numSpotLightShadowsWithMaps,
      numLightProbes: b.numLightProbes,
      numLightProbeGrids: $.length,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: g.dithering,
      shadowMapEnabled: i.shadowMap.enabled && F.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: j,
      decodeVideoTexture: nt && g.map.isVideoTexture === !0 && ke.getTransfer(g.map.colorSpace) === $e,
      decodeVideoTextureEmissive: ft && g.emissiveMap.isVideoTexture === !0 && ke.getTransfer(g.emissiveMap.colorSpace) === $e,
      premultipliedAlpha: g.premultipliedAlpha,
      doubleSided: g.side === 2,
      flipSided: g.side === 1,
      useDepthPacking: g.depthPacking >= 0,
      depthPacking: g.depthPacking || 0,
      index0AttributeName: g.index0AttributeName,
      extensionClipCullDistance: he && g.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (he && g.extensions.multiDraw === !0 || Re) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: g.customProgramCacheKey()
    };
    return Ee.vertexUv1s = l.has(1), Ee.vertexUv2s = l.has(2), Ee.vertexUv3s = l.has(3), l.clear(), Ee;
  }
  function m(g) {
    const b = [];
    if (g.shaderID ? b.push(g.shaderID) : (b.push(g.customVertexShaderID), b.push(g.customFragmentShaderID)), g.defines !== void 0)
      for (const F in g.defines)
        b.push(F), b.push(g.defines[F]);
    return g.isRawShaderMaterial === !1 && (d(b, g), A(b, g), b.push(i.outputColorSpace)), b.push(g.customProgramCacheKey), b.join();
  }
  function d(g, b) {
    g.push(b.precision), g.push(b.outputColorSpace), g.push(b.envMapMode), g.push(b.envMapCubeUVHeight), g.push(b.mapUv), g.push(b.alphaMapUv), g.push(b.lightMapUv), g.push(b.aoMapUv), g.push(b.bumpMapUv), g.push(b.normalMapUv), g.push(b.displacementMapUv), g.push(b.emissiveMapUv), g.push(b.metalnessMapUv), g.push(b.roughnessMapUv), g.push(b.anisotropyMapUv), g.push(b.clearcoatMapUv), g.push(b.clearcoatNormalMapUv), g.push(b.clearcoatRoughnessMapUv), g.push(b.iridescenceMapUv), g.push(b.iridescenceThicknessMapUv), g.push(b.sheenColorMapUv), g.push(b.sheenRoughnessMapUv), g.push(b.specularMapUv), g.push(b.specularColorMapUv), g.push(b.specularIntensityMapUv), g.push(b.transmissionMapUv), g.push(b.thicknessMapUv), g.push(b.combine), g.push(b.fogExp2), g.push(b.sizeAttenuation), g.push(b.morphTargetsCount), g.push(b.morphAttributeCount), g.push(b.numDirLights), g.push(b.numPointLights), g.push(b.numSpotLights), g.push(b.numSpotLightMaps), g.push(b.numHemiLights), g.push(b.numRectAreaLights), g.push(b.numDirLightShadows), g.push(b.numPointLightShadows), g.push(b.numSpotLightShadows), g.push(b.numSpotLightShadowsWithMaps), g.push(b.numLightProbes), g.push(b.shadowMapType), g.push(b.toneMapping), g.push(b.numClippingPlanes), g.push(b.numClipIntersection), g.push(b.depthPacking);
  }
  function A(g, b) {
    s.disableAll(), b.instancing && s.enable(0), b.instancingColor && s.enable(1), b.instancingMorph && s.enable(2), b.matcap && s.enable(3), b.envMap && s.enable(4), b.normalMapObjectSpace && s.enable(5), b.normalMapTangentSpace && s.enable(6), b.clearcoat && s.enable(7), b.iridescence && s.enable(8), b.alphaTest && s.enable(9), b.vertexColors && s.enable(10), b.vertexAlphas && s.enable(11), b.vertexUv1s && s.enable(12), b.vertexUv2s && s.enable(13), b.vertexUv3s && s.enable(14), b.vertexTangents && s.enable(15), b.anisotropy && s.enable(16), b.alphaHash && s.enable(17), b.batching && s.enable(18), b.dispersion && s.enable(19), b.batchingColor && s.enable(20), b.gradientMap && s.enable(21), b.packedNormalMap && s.enable(22), b.vertexNormals && s.enable(23), g.push(s.mask), s.disableAll(), b.fog && s.enable(0), b.useFog && s.enable(1), b.flatShading && s.enable(2), b.logarithmicDepthBuffer && s.enable(3), b.reversedDepthBuffer && s.enable(4), b.skinning && s.enable(5), b.morphTargets && s.enable(6), b.morphNormals && s.enable(7), b.morphColors && s.enable(8), b.premultipliedAlpha && s.enable(9), b.shadowMapEnabled && s.enable(10), b.doubleSided && s.enable(11), b.flipSided && s.enable(12), b.useDepthPacking && s.enable(13), b.dithering && s.enable(14), b.transmission && s.enable(15), b.sheen && s.enable(16), b.opaque && s.enable(17), b.pointsUvs && s.enable(18), b.decodeVideoTexture && s.enable(19), b.decodeVideoTextureEmissive && s.enable(20), b.alphaToCoverage && s.enable(21), b.numLightProbeGrids > 0 && s.enable(22), b.hasPositionAttribute && s.enable(23), g.push(s.mask);
  }
  function R(g) {
    const b = _[g.type];
    let F;
    if (b) {
      const P = Zt[b];
      F = wr.clone(P.uniforms);
    } else
      F = g.uniforms;
    return F;
  }
  function M(g, b) {
    let F = f.get(b);
    return F !== void 0 ? ++F.usedTimes : (F = new Hf(i, b, g, r), c.push(F), f.set(b, F)), F;
  }
  function y(g) {
    if (--g.usedTimes === 0) {
      const b = c.indexOf(g);
      c[b] = c[c.length - 1], c.pop(), f.delete(g.cacheKey), g.destroy();
    }
  }
  function T(g) {
    o.remove(g);
  }
  function C() {
    o.dispose();
  }
  return {
    getParameters: E,
    getProgramCacheKey: m,
    getUniforms: R,
    acquireProgram: M,
    releaseProgram: y,
    releaseShaderCache: T,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: C
  };
}
function Kf() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(s) {
    return i.has(s);
  }
  function t(s) {
    let o = i.get(s);
    return o === void 0 && (o = {}, i.set(s, o)), o;
  }
  function n(s) {
    i.delete(s);
  }
  function r(s, o, l) {
    i.get(s)[o] = l;
  }
  function a() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: r,
    dispose: a
  };
}
function Zf(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.materialVariant !== e.materialVariant ? i.materialVariant - e.materialVariant : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function Ra(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Ca() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function a() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function s(u) {
    let _ = 0;
    return u.isInstancedMesh && (_ += 2), u.isSkinnedMesh && (_ += 1), _;
  }
  function o(u, _, x, E, m, d) {
    let A = i[e];
    return A === void 0 ? (A = {
      id: u.id,
      object: u,
      geometry: _,
      material: x,
      materialVariant: s(u),
      groupOrder: E,
      renderOrder: u.renderOrder,
      z: m,
      group: d
    }, i[e] = A) : (A.id = u.id, A.object = u, A.geometry = _, A.material = x, A.materialVariant = s(u), A.groupOrder = E, A.renderOrder = u.renderOrder, A.z = m, A.group = d), e++, A;
  }
  function l(u, _, x, E, m, d) {
    const A = o(u, _, x, E, m, d);
    x.transmission > 0 ? n.push(A) : x.transparent === !0 ? r.push(A) : t.push(A);
  }
  function c(u, _, x, E, m, d) {
    const A = o(u, _, x, E, m, d);
    x.transmission > 0 ? n.unshift(A) : x.transparent === !0 ? r.unshift(A) : t.unshift(A);
  }
  function f(u, _, x) {
    t.length > 1 && t.sort(u || Zf), n.length > 1 && n.sort(_ || Ra), r.length > 1 && r.sort(_ || Ra), x && (t.reverse(), n.reverse(), r.reverse());
  }
  function p() {
    for (let u = e, _ = i.length; u < _; u++) {
      const x = i[u];
      if (x.id === null) break;
      x.id = null, x.object = null, x.geometry = null, x.material = null, x.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: a,
    push: l,
    unshift: c,
    finish: p,
    sort: f
  };
}
function $f() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const a = i.get(n);
    let s;
    return a === void 0 ? (s = new Ca(), i.set(n, [s])) : r >= a.length ? (s = new Ca(), a.push(s)) : s = a[r], s;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Jf() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new N(),
            color: new Ze()
          };
          break;
        case "SpotLight":
          t = {
            position: new N(),
            direction: new N(),
            color: new Ze(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new N(),
            color: new Ze(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new N(),
            skyColor: new Ze(),
            groundColor: new Ze()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Ze(),
            position: new N(),
            halfWidth: new N(),
            halfHeight: new N()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function Qf() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ke()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ke()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ke(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let jf = 0;
function ed(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function td(i) {
  const e = new Jf(), t = Qf(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new N());
  const r = new N(), a = new mt(), s = new mt();
  function o(c) {
    let f = 0, p = 0, u = 0;
    for (let b = 0; b < 9; b++) n.probe[b].set(0, 0, 0);
    let _ = 0, x = 0, E = 0, m = 0, d = 0, A = 0, R = 0, M = 0, y = 0, T = 0, C = 0;
    c.sort(ed);
    for (let b = 0, F = c.length; b < F; b++) {
      const P = c[b], I = P.color, $ = P.intensity, Y = P.distance;
      let B = null;
      if (P.shadow && P.shadow.map && (P.shadow.map.texture.format === 1030 ? B = P.shadow.map.texture : B = P.shadow.map.depthTexture || P.shadow.map.texture), P.isAmbientLight)
        f += I.r * $, p += I.g * $, u += I.b * $;
      else if (P.isLightProbe) {
        for (let k = 0; k < 9; k++)
          n.probe[k].addScaledVector(P.sh.coefficients[k], $);
        C++;
      } else if (P.isDirectionalLight) {
        const k = e.get(P);
        if (k.color.copy(P.color).multiplyScalar(P.intensity), P.castShadow) {
          const H = P.shadow, Q = t.get(P);
          Q.shadowIntensity = H.intensity, Q.shadowBias = H.bias, Q.shadowNormalBias = H.normalBias, Q.shadowRadius = H.radius, Q.shadowMapSize = H.mapSize, n.directionalShadow[_] = Q, n.directionalShadowMap[_] = B, n.directionalShadowMatrix[_] = P.shadow.matrix, A++;
        }
        n.directional[_] = k, _++;
      } else if (P.isSpotLight) {
        const k = e.get(P);
        k.position.setFromMatrixPosition(P.matrixWorld), k.color.copy(I).multiplyScalar($), k.distance = Y, k.coneCos = Math.cos(P.angle), k.penumbraCos = Math.cos(P.angle * (1 - P.penumbra)), k.decay = P.decay, n.spot[E] = k;
        const H = P.shadow;
        if (P.map && (n.spotLightMap[y] = P.map, y++, H.updateMatrices(P), P.castShadow && T++), n.spotLightMatrix[E] = H.matrix, P.castShadow) {
          const Q = t.get(P);
          Q.shadowIntensity = H.intensity, Q.shadowBias = H.bias, Q.shadowNormalBias = H.normalBias, Q.shadowRadius = H.radius, Q.shadowMapSize = H.mapSize, n.spotShadow[E] = Q, n.spotShadowMap[E] = B, M++;
        }
        E++;
      } else if (P.isRectAreaLight) {
        const k = e.get(P);
        k.color.copy(I).multiplyScalar($), k.halfWidth.set(P.width * 0.5, 0, 0), k.halfHeight.set(0, P.height * 0.5, 0), n.rectArea[m] = k, m++;
      } else if (P.isPointLight) {
        const k = e.get(P);
        if (k.color.copy(P.color).multiplyScalar(P.intensity), k.distance = P.distance, k.decay = P.decay, P.castShadow) {
          const H = P.shadow, Q = t.get(P);
          Q.shadowIntensity = H.intensity, Q.shadowBias = H.bias, Q.shadowNormalBias = H.normalBias, Q.shadowRadius = H.radius, Q.shadowMapSize = H.mapSize, Q.shadowCameraNear = H.camera.near, Q.shadowCameraFar = H.camera.far, n.pointShadow[x] = Q, n.pointShadowMap[x] = B, n.pointShadowMatrix[x] = P.shadow.matrix, R++;
        }
        n.point[x] = k, x++;
      } else if (P.isHemisphereLight) {
        const k = e.get(P);
        k.skyColor.copy(P.color).multiplyScalar($), k.groundColor.copy(P.groundColor).multiplyScalar($), n.hemi[d] = k, d++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = pe.LTC_FLOAT_1, n.rectAreaLTC2 = pe.LTC_FLOAT_2) : (n.rectAreaLTC1 = pe.LTC_HALF_1, n.rectAreaLTC2 = pe.LTC_HALF_2)), n.ambient[0] = f, n.ambient[1] = p, n.ambient[2] = u;
    const g = n.hash;
    (g.directionalLength !== _ || g.pointLength !== x || g.spotLength !== E || g.rectAreaLength !== m || g.hemiLength !== d || g.numDirectionalShadows !== A || g.numPointShadows !== R || g.numSpotShadows !== M || g.numSpotMaps !== y || g.numLightProbes !== C) && (n.directional.length = _, n.spot.length = E, n.rectArea.length = m, n.point.length = x, n.hemi.length = d, n.directionalShadow.length = A, n.directionalShadowMap.length = A, n.pointShadow.length = R, n.pointShadowMap.length = R, n.spotShadow.length = M, n.spotShadowMap.length = M, n.directionalShadowMatrix.length = A, n.pointShadowMatrix.length = R, n.spotLightMatrix.length = M + y - T, n.spotLightMap.length = y, n.numSpotLightShadowsWithMaps = T, n.numLightProbes = C, g.directionalLength = _, g.pointLength = x, g.spotLength = E, g.rectAreaLength = m, g.hemiLength = d, g.numDirectionalShadows = A, g.numPointShadows = R, g.numSpotShadows = M, g.numSpotMaps = y, g.numLightProbes = C, n.version = jf++);
  }
  function l(c, f) {
    let p = 0, u = 0, _ = 0, x = 0, E = 0;
    const m = f.matrixWorldInverse;
    for (let d = 0, A = c.length; d < A; d++) {
      const R = c[d];
      if (R.isDirectionalLight) {
        const M = n.directional[p];
        M.direction.setFromMatrixPosition(R.matrixWorld), r.setFromMatrixPosition(R.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), p++;
      } else if (R.isSpotLight) {
        const M = n.spot[_];
        M.position.setFromMatrixPosition(R.matrixWorld), M.position.applyMatrix4(m), M.direction.setFromMatrixPosition(R.matrixWorld), r.setFromMatrixPosition(R.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), _++;
      } else if (R.isRectAreaLight) {
        const M = n.rectArea[x];
        M.position.setFromMatrixPosition(R.matrixWorld), M.position.applyMatrix4(m), s.identity(), a.copy(R.matrixWorld), a.premultiply(m), s.extractRotation(a), M.halfWidth.set(R.width * 0.5, 0, 0), M.halfHeight.set(0, R.height * 0.5, 0), M.halfWidth.applyMatrix4(s), M.halfHeight.applyMatrix4(s), x++;
      } else if (R.isPointLight) {
        const M = n.point[u];
        M.position.setFromMatrixPosition(R.matrixWorld), M.position.applyMatrix4(m), u++;
      } else if (R.isHemisphereLight) {
        const M = n.hemi[E];
        M.direction.setFromMatrixPosition(R.matrixWorld), M.direction.transformDirection(m), E++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function wa(i) {
  const e = new td(i), t = [], n = [], r = [];
  function a(u) {
    p.camera = u, t.length = 0, n.length = 0, r.length = 0;
  }
  function s(u) {
    t.push(u);
  }
  function o(u) {
    n.push(u);
  }
  function l(u) {
    r.push(u);
  }
  function c() {
    e.setup(t);
  }
  function f(u) {
    e.setupView(t, u);
  }
  const p = {
    lightsArray: t,
    shadowsArray: n,
    lightProbeGridArray: r,
    camera: null,
    lights: e,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: a,
    state: p,
    setupLights: c,
    setupLightsView: f,
    pushLight: s,
    pushShadow: o,
    pushLightProbeGrid: l
  };
}
function nd(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, a = 0) {
    const s = e.get(r);
    let o;
    return s === void 0 ? (o = new wa(i), e.set(r, [o])) : a >= s.length ? (o = new wa(i), s.push(o)) : o = s[a], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
const id = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, rd = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, ad = [
  /* @__PURE__ */ new N(1, 0, 0),
  /* @__PURE__ */ new N(-1, 0, 0),
  /* @__PURE__ */ new N(0, 1, 0),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, 0, 1),
  /* @__PURE__ */ new N(0, 0, -1)
], sd = [
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, 0, 1),
  /* @__PURE__ */ new N(0, 0, -1),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, -1, 0)
], Pa = /* @__PURE__ */ new mt(), ni = /* @__PURE__ */ new N(), Sr = /* @__PURE__ */ new N();
function od(i, e, t) {
  let n = new Za();
  const r = new Ke(), a = new Ke(), s = new ct(), o = new po(), l = new mo(), c = {}, f = t.maxTextureSize, p = { 0: 1, 1: 0, 2: 2 }, u = new Ct({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ke() },
      radius: { value: 4 }
    },
    vertexShader: id,
    fragmentShader: rd
  }), _ = u.clone();
  _.defines.HORIZONTAL_PASS = 1;
  const x = new Xt();
  x.setAttribute(
    "position",
    new $t(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const E = new Ut(x, u), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let d = this.type;
  this.render = function(T, C, g) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || T.length === 0) return;
    this.type === 2 && (De("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const b = i.getRenderTarget(), F = i.getActiveCubeFace(), P = i.getActiveMipmapLevel(), I = i.state;
    I.setBlending(0), I.buffers.depth.getReversed() === !0 ? I.buffers.color.setClear(0, 0, 0, 0) : I.buffers.color.setClear(1, 1, 1, 1), I.buffers.depth.setTest(!0), I.setScissorTest(!1);
    const $ = d !== this.type;
    $ && C.traverse(function(Y) {
      Y.material && (Array.isArray(Y.material) ? Y.material.forEach((B) => B.needsUpdate = !0) : Y.material.needsUpdate = !0);
    });
    for (let Y = 0, B = T.length; Y < B; Y++) {
      const k = T[Y], H = k.shadow;
      if (H === void 0) {
        De("WebGLShadowMap:", k, "has no shadow.");
        continue;
      }
      if (H.autoUpdate === !1 && H.needsUpdate === !1) continue;
      r.copy(H.mapSize);
      const Q = H.getFrameExtents();
      r.multiply(Q), a.copy(H.mapSize), (r.x > f || r.y > f) && (r.x > f && (a.x = Math.floor(f / Q.x), r.x = a.x * Q.x, H.mapSize.x = a.x), r.y > f && (a.y = Math.floor(f / Q.y), r.y = a.y * Q.y, H.mapSize.y = a.y));
      const ee = i.state.buffers.depth.getReversed();
      if (H.camera._reversedDepth = ee, H.map === null || $ === !0) {
        if (H.map !== null && (H.map.depthTexture !== null && (H.map.depthTexture.dispose(), H.map.depthTexture = null), H.map.dispose()), this.type === 3) {
          if (k.isPointLight) {
            De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          H.map = new Gt(r.x, r.y, {
            format: 1030,
            type: 1016,
            minFilter: 1006,
            magFilter: 1006,
            generateMipmaps: !1
          }), H.map.texture.name = k.name + ".shadowMap", H.map.depthTexture = new Xn(r.x, r.y, 1015), H.map.depthTexture.name = k.name + ".shadowMapDepth", H.map.depthTexture.format = 1026, H.map.depthTexture.compareFunction = null, H.map.depthTexture.minFilter = 1003, H.map.depthTexture.magFilter = 1003;
        } else
          k.isPointLight ? (H.map = new rs(r.x), H.map.depthTexture = new co(r.x, 1014)) : (H.map = new Gt(r.x, r.y), H.map.depthTexture = new Xn(r.x, r.y, 1014)), H.map.depthTexture.name = k.name + ".shadowMap", H.map.depthTexture.format = 1026, this.type === 1 ? (H.map.depthTexture.compareFunction = ee ? 518 : 515, H.map.depthTexture.minFilter = 1006, H.map.depthTexture.magFilter = 1006) : (H.map.depthTexture.compareFunction = null, H.map.depthTexture.minFilter = 1003, H.map.depthTexture.magFilter = 1003);
        H.camera.updateProjectionMatrix();
      }
      const ie = H.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let se = 0; se < ie; se++) {
        if (H.map.isWebGLCubeRenderTarget)
          i.setRenderTarget(H.map, se), i.clear();
        else {
          se === 0 && (i.setRenderTarget(H.map), i.clear());
          const ge = H.getViewport(se);
          s.set(
            a.x * ge.x,
            a.y * ge.y,
            a.x * ge.z,
            a.y * ge.w
          ), I.viewport(s);
        }
        if (k.isPointLight) {
          const ge = H.camera, ze = H.matrix, Je = k.distance || ge.far;
          Je !== ge.far && (ge.far = Je, ge.updateProjectionMatrix()), ni.setFromMatrixPosition(k.matrixWorld), ge.position.copy(ni), Sr.copy(ge.position), Sr.add(ad[se]), ge.up.copy(sd[se]), ge.lookAt(Sr), ge.updateMatrixWorld(), ze.makeTranslation(-ni.x, -ni.y, -ni.z), Pa.multiplyMatrices(ge.projectionMatrix, ge.matrixWorldInverse), H._frustum.setFromProjectionMatrix(Pa, ge.coordinateSystem, ge.reversedDepth);
        } else
          H.updateMatrices(k);
        n = H.getFrustum(), M(C, g, H.camera, k, this.type);
      }
      H.isPointLightShadow !== !0 && this.type === 3 && A(H, g), H.needsUpdate = !1;
    }
    d = this.type, m.needsUpdate = !1, i.setRenderTarget(b, F, P);
  };
  function A(T, C) {
    const g = e.update(E);
    u.defines.VSM_SAMPLES !== T.blurSamples && (u.defines.VSM_SAMPLES = T.blurSamples, _.defines.VSM_SAMPLES = T.blurSamples, u.needsUpdate = !0, _.needsUpdate = !0), T.mapPass === null && (T.mapPass = new Gt(r.x, r.y, {
      format: 1030,
      type: 1016
    })), u.uniforms.shadow_pass.value = T.map.depthTexture, u.uniforms.resolution.value = T.mapSize, u.uniforms.radius.value = T.radius, i.setRenderTarget(T.mapPass), i.clear(), i.renderBufferDirect(C, null, g, u, E, null), _.uniforms.shadow_pass.value = T.mapPass.texture, _.uniforms.resolution.value = T.mapSize, _.uniforms.radius.value = T.radius, i.setRenderTarget(T.map), i.clear(), i.renderBufferDirect(C, null, g, _, E, null);
  }
  function R(T, C, g, b) {
    let F = null;
    const P = g.isPointLight === !0 ? T.customDistanceMaterial : T.customDepthMaterial;
    if (P !== void 0)
      F = P;
    else if (F = g.isPointLight === !0 ? l : o, i.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0 || C.alphaToCoverage === !0) {
      const I = F.uuid, $ = C.uuid;
      let Y = c[I];
      Y === void 0 && (Y = {}, c[I] = Y);
      let B = Y[$];
      B === void 0 && (B = F.clone(), Y[$] = B, C.addEventListener("dispose", y)), F = B;
    }
    if (F.visible = C.visible, F.wireframe = C.wireframe, b === 3 ? F.side = C.shadowSide !== null ? C.shadowSide : C.side : F.side = C.shadowSide !== null ? C.shadowSide : p[C.side], F.alphaMap = C.alphaMap, F.alphaTest = C.alphaToCoverage === !0 ? 0.5 : C.alphaTest, F.map = C.map, F.clipShadows = C.clipShadows, F.clippingPlanes = C.clippingPlanes, F.clipIntersection = C.clipIntersection, F.displacementMap = C.displacementMap, F.displacementScale = C.displacementScale, F.displacementBias = C.displacementBias, F.wireframeLinewidth = C.wireframeLinewidth, F.linewidth = C.linewidth, g.isPointLight === !0 && F.isMeshDistanceMaterial === !0) {
      const I = i.properties.get(F);
      I.light = g;
    }
    return F;
  }
  function M(T, C, g, b, F) {
    if (T.visible === !1) return;
    if (T.layers.test(C.layers) && (T.isMesh || T.isLine || T.isPoints) && (T.castShadow || T.receiveShadow && F === 3) && (!T.frustumCulled || n.intersectsObject(T))) {
      T.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, T.matrixWorld);
      const $ = e.update(T), Y = T.material;
      if (Array.isArray(Y)) {
        const B = $.groups;
        for (let k = 0, H = B.length; k < H; k++) {
          const Q = B[k], ee = Y[Q.materialIndex];
          if (ee && ee.visible) {
            const ie = R(T, ee, b, F);
            T.onBeforeShadow(i, T, C, g, $, ie, Q), i.renderBufferDirect(g, null, $, ie, T, Q), T.onAfterShadow(i, T, C, g, $, ie, Q);
          }
        }
      } else if (Y.visible) {
        const B = R(T, Y, b, F);
        T.onBeforeShadow(i, T, C, g, $, B, null), i.renderBufferDirect(g, null, $, B, T, null), T.onAfterShadow(i, T, C, g, $, B, null);
      }
    }
    const I = T.children;
    for (let $ = 0, Y = I.length; $ < Y; $++)
      M(I[$], C, g, b, F);
  }
  function y(T) {
    T.target.removeEventListener("dispose", y);
    for (const g in c) {
      const b = c[g], F = T.target.uuid;
      F in b && (b[F].dispose(), delete b[F]);
    }
  }
}
function ld(i, e) {
  function t() {
    let w = !1;
    const ae = new ct();
    let Z = null;
    const le = new ct(0, 0, 0, 0);
    return {
      setMask: function(he) {
        Z !== he && !w && (i.colorMask(he, he, he, he), Z = he);
      },
      setLocked: function(he) {
        w = he;
      },
      setClear: function(he, j, Ee, q, de) {
        de === !0 && (he *= q, j *= q, Ee *= q), ae.set(he, j, Ee, q), le.equals(ae) === !1 && (i.clearColor(he, j, Ee, q), le.copy(ae));
      },
      reset: function() {
        w = !1, Z = null, le.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let w = !1, ae = !1, Z = null, le = null, he = null;
    return {
      setReversed: function(j) {
        if (ae !== j) {
          const Ee = e.get("EXT_clip_control");
          j ? Ee.clipControlEXT(Ee.LOWER_LEFT_EXT, Ee.ZERO_TO_ONE_EXT) : Ee.clipControlEXT(Ee.LOWER_LEFT_EXT, Ee.NEGATIVE_ONE_TO_ONE_EXT), ae = j;
          const q = he;
          he = null, this.setClear(q);
        }
      },
      getReversed: function() {
        return ae;
      },
      setTest: function(j) {
        j ? te(i.DEPTH_TEST) : we(i.DEPTH_TEST);
      },
      setMask: function(j) {
        Z !== j && !w && (i.depthMask(j), Z = j);
      },
      setFunc: function(j) {
        if (ae && (j = Ss[j]), le !== j) {
          switch (j) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          le = j;
        }
      },
      setLocked: function(j) {
        w = j;
      },
      setClear: function(j) {
        he !== j && (he = j, ae && (j = 1 - j), i.clearDepth(j));
      },
      reset: function() {
        w = !1, Z = null, le = null, he = null, ae = !1;
      }
    };
  }
  function r() {
    let w = !1, ae = null, Z = null, le = null, he = null, j = null, Ee = null, q = null, de = null;
    return {
      setTest: function(Me) {
        w || (Me ? te(i.STENCIL_TEST) : we(i.STENCIL_TEST));
      },
      setMask: function(Me) {
        ae !== Me && !w && (i.stencilMask(Me), ae = Me);
      },
      setFunc: function(Me, at, dt) {
        (Z !== Me || le !== at || he !== dt) && (i.stencilFunc(Me, at, dt), Z = Me, le = at, he = dt);
      },
      setOp: function(Me, at, dt) {
        (j !== Me || Ee !== at || q !== dt) && (i.stencilOp(Me, at, dt), j = Me, Ee = at, q = dt);
      },
      setLocked: function(Me) {
        w = Me;
      },
      setClear: function(Me) {
        de !== Me && (i.clearStencil(Me), de = Me);
      },
      reset: function() {
        w = !1, ae = null, Z = null, le = null, he = null, j = null, Ee = null, q = null, de = null;
      }
    };
  }
  const a = new t(), s = new n(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let f = {}, p = {}, u = {}, _ = /* @__PURE__ */ new WeakMap(), x = [], E = null, m = !1, d = null, A = null, R = null, M = null, y = null, T = null, C = null, g = new Ze(0, 0, 0), b = 0, F = !1, P = null, I = null, $ = null, Y = null, B = null;
  const k = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let H = !1, Q = 0;
  const ee = i.getParameter(i.VERSION);
  ee.indexOf("WebGL") !== -1 ? (Q = parseFloat(/^WebGL (\d)/.exec(ee)[1]), H = Q >= 1) : ee.indexOf("OpenGL ES") !== -1 && (Q = parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]), H = Q >= 2);
  let ie = null, se = {};
  const ge = i.getParameter(i.SCISSOR_BOX), ze = i.getParameter(i.VIEWPORT), Je = new ct().fromArray(ge), He = new ct().fromArray(ze);
  function J(w, ae, Z, le) {
    const he = new Uint8Array(4), j = i.createTexture();
    i.bindTexture(w, j), i.texParameteri(w, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(w, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ee = 0; Ee < Z; Ee++)
      w === i.TEXTURE_3D || w === i.TEXTURE_2D_ARRAY ? i.texImage3D(ae, 0, i.RGBA, 1, 1, le, 0, i.RGBA, i.UNSIGNED_BYTE, he) : i.texImage2D(ae + Ee, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, he);
    return j;
  }
  const re = {};
  re[i.TEXTURE_2D] = J(i.TEXTURE_2D, i.TEXTURE_2D, 1), re[i.TEXTURE_CUBE_MAP] = J(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), re[i.TEXTURE_2D_ARRAY] = J(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), re[i.TEXTURE_3D] = J(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), s.setClear(1), o.setClear(0), te(i.DEPTH_TEST), s.setFunc(3), st(!1), ut(1), te(i.CULL_FACE), Pe(0);
  function te(w) {
    f[w] !== !0 && (i.enable(w), f[w] = !0);
  }
  function we(w) {
    f[w] !== !1 && (i.disable(w), f[w] = !1);
  }
  function Le(w, ae) {
    return u[w] !== ae ? (i.bindFramebuffer(w, ae), u[w] = ae, w === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = ae), w === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = ae), !0) : !1;
  }
  function Re(w, ae) {
    let Z = x, le = !1;
    if (w) {
      Z = _.get(ae), Z === void 0 && (Z = [], _.set(ae, Z));
      const he = w.textures;
      if (Z.length !== he.length || Z[0] !== i.COLOR_ATTACHMENT0) {
        for (let j = 0, Ee = he.length; j < Ee; j++)
          Z[j] = i.COLOR_ATTACHMENT0 + j;
        Z.length = he.length, le = !0;
      }
    } else
      Z[0] !== i.BACK && (Z[0] = i.BACK, le = !0);
    le && i.drawBuffers(Z);
  }
  function nt(w) {
    return E !== w ? (i.useProgram(w), E = w, !0) : !1;
  }
  const Fe = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  Fe[103] = i.MIN, Fe[104] = i.MAX;
  const Xe = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function Pe(w, ae, Z, le, he, j, Ee, q, de, Me) {
    if (w === 0) {
      m === !0 && (we(i.BLEND), m = !1);
      return;
    }
    if (m === !1 && (te(i.BLEND), m = !0), w !== 5) {
      if (w !== d || Me !== F) {
        if ((A !== 100 || y !== 100) && (i.blendEquation(i.FUNC_ADD), A = 100, y = 100), Me)
          switch (w) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.DST_COLOR, i.ONE_MINUS_SRC_ALPHA, i.ZERO, i.ONE);
              break;
            default:
              Ye("WebGLState: Invalid blending: ", w);
              break;
          }
        else
          switch (w) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
              break;
            case 3:
              Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case 4:
              Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              Ye("WebGLState: Invalid blending: ", w);
              break;
          }
        R = null, M = null, T = null, C = null, g.set(0, 0, 0), b = 0, d = w, F = Me;
      }
      return;
    }
    he = he || ae, j = j || Z, Ee = Ee || le, (ae !== A || he !== y) && (i.blendEquationSeparate(Fe[ae], Fe[he]), A = ae, y = he), (Z !== R || le !== M || j !== T || Ee !== C) && (i.blendFuncSeparate(Xe[Z], Xe[le], Xe[j], Xe[Ee]), R = Z, M = le, T = j, C = Ee), (q.equals(g) === !1 || de !== b) && (i.blendColor(q.r, q.g, q.b, de), g.copy(q), b = de), d = w, F = !1;
  }
  function Ve(w, ae) {
    w.side === 2 ? we(i.CULL_FACE) : te(i.CULL_FACE);
    let Z = w.side === 1;
    ae && (Z = !Z), st(Z), w.blending === 1 && w.transparent === !1 ? Pe(0) : Pe(w.blending, w.blendEquation, w.blendSrc, w.blendDst, w.blendEquationAlpha, w.blendSrcAlpha, w.blendDstAlpha, w.blendColor, w.blendAlpha, w.premultipliedAlpha), s.setFunc(w.depthFunc), s.setTest(w.depthTest), s.setMask(w.depthWrite), a.setMask(w.colorWrite);
    const le = w.stencilWrite;
    o.setTest(le), le && (o.setMask(w.stencilWriteMask), o.setFunc(w.stencilFunc, w.stencilRef, w.stencilFuncMask), o.setOp(w.stencilFail, w.stencilZFail, w.stencilZPass)), ft(w.polygonOffset, w.polygonOffsetFactor, w.polygonOffsetUnits), w.alphaToCoverage === !0 ? te(i.SAMPLE_ALPHA_TO_COVERAGE) : we(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function st(w) {
    P !== w && (w ? i.frontFace(i.CW) : i.frontFace(i.CCW), P = w);
  }
  function ut(w) {
    w !== 0 ? (te(i.CULL_FACE), w !== I && (w === 1 ? i.cullFace(i.BACK) : w === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : we(i.CULL_FACE), I = w;
  }
  function _t(w) {
    w !== $ && (H && i.lineWidth(w), $ = w);
  }
  function ft(w, ae, Z) {
    w ? (te(i.POLYGON_OFFSET_FILL), (Y !== ae || B !== Z) && (Y = ae, B = Z, s.getReversed() && (ae = -ae), i.polygonOffset(ae, Z))) : we(i.POLYGON_OFFSET_FILL);
  }
  function je(w) {
    w ? te(i.SCISSOR_TEST) : we(i.SCISSOR_TEST);
  }
  function it(w) {
    w === void 0 && (w = i.TEXTURE0 + k - 1), ie !== w && (i.activeTexture(w), ie = w);
  }
  function D(w, ae, Z) {
    Z === void 0 && (ie === null ? Z = i.TEXTURE0 + k - 1 : Z = ie);
    let le = se[Z];
    le === void 0 && (le = { type: void 0, texture: void 0 }, se[Z] = le), (le.type !== w || le.texture !== ae) && (ie !== Z && (i.activeTexture(Z), ie = Z), i.bindTexture(w, ae || re[w]), le.type = w, le.texture = ae);
  }
  function ot() {
    const w = se[ie];
    w !== void 0 && w.type !== void 0 && (i.bindTexture(w.type, null), w.type = void 0, w.texture = void 0);
  }
  function Be() {
    try {
      i.compressedTexImage2D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function S() {
    try {
      i.compressedTexImage3D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function h() {
    try {
      i.texSubImage2D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function U() {
    try {
      i.texSubImage3D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function z() {
    try {
      i.compressedTexSubImage2D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function W() {
    try {
      i.compressedTexSubImage3D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function ne() {
    try {
      i.texStorage2D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function ce() {
    try {
      i.texStorage3D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function X() {
    try {
      i.texImage2D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function K() {
    try {
      i.texImage3D(...arguments);
    } catch (w) {
      Ye("WebGLState:", w);
    }
  }
  function oe(w) {
    return p[w] !== void 0 ? p[w] : i.getParameter(w);
  }
  function Se(w, ae) {
    p[w] !== ae && (i.pixelStorei(w, ae), p[w] = ae);
  }
  function ue(w) {
    Je.equals(w) === !1 && (i.scissor(w.x, w.y, w.z, w.w), Je.copy(w));
  }
  function fe(w) {
    He.equals(w) === !1 && (i.viewport(w.x, w.y, w.z, w.w), He.copy(w));
  }
  function ye(w, ae) {
    let Z = c.get(ae);
    Z === void 0 && (Z = /* @__PURE__ */ new WeakMap(), c.set(ae, Z));
    let le = Z.get(w);
    le === void 0 && (le = i.getUniformBlockIndex(ae, w.name), Z.set(w, le));
  }
  function Ce(w, ae) {
    const le = c.get(ae).get(w);
    l.get(ae) !== le && (i.uniformBlockBinding(ae, le, w.__bindingPointIndex), l.set(ae, le));
  }
  function Ie() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), s.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), i.pixelStorei(i.PACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, i.BROWSER_DEFAULT_WEBGL), i.pixelStorei(i.PACK_ROW_LENGTH, 0), i.pixelStorei(i.PACK_SKIP_PIXELS, 0), i.pixelStorei(i.PACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_ROW_LENGTH, 0), i.pixelStorei(i.UNPACK_IMAGE_HEIGHT, 0), i.pixelStorei(i.UNPACK_SKIP_PIXELS, 0), i.pixelStorei(i.UNPACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_SKIP_IMAGES, 0), f = {}, p = {}, ie = null, se = {}, u = {}, _ = /* @__PURE__ */ new WeakMap(), x = [], E = null, m = !1, d = null, A = null, R = null, M = null, y = null, T = null, C = null, g = new Ze(0, 0, 0), b = 0, F = !1, P = null, I = null, $ = null, Y = null, B = null, Je.set(0, 0, i.canvas.width, i.canvas.height), He.set(0, 0, i.canvas.width, i.canvas.height), a.reset(), s.reset(), o.reset();
  }
  return {
    buffers: {
      color: a,
      depth: s,
      stencil: o
    },
    enable: te,
    disable: we,
    bindFramebuffer: Le,
    drawBuffers: Re,
    useProgram: nt,
    setBlending: Pe,
    setMaterial: Ve,
    setFlipSided: st,
    setCullFace: ut,
    setLineWidth: _t,
    setPolygonOffset: ft,
    setScissorTest: je,
    activeTexture: it,
    bindTexture: D,
    unbindTexture: ot,
    compressedTexImage2D: Be,
    compressedTexImage3D: S,
    texImage2D: X,
    texImage3D: K,
    pixelStorei: Se,
    getParameter: oe,
    updateUBOMapping: ye,
    uniformBlockBinding: Ce,
    texStorage2D: ne,
    texStorage3D: ce,
    texSubImage2D: h,
    texSubImage3D: U,
    compressedTexSubImage2D: z,
    compressedTexSubImage3D: W,
    scissor: ue,
    viewport: fe,
    reset: Ie
  };
}
function cd(i, e, t, n, r, a, s) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ke(), f = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new Set();
  let u;
  const _ = /* @__PURE__ */ new WeakMap();
  let x = !1;
  try {
    x = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function E(S, h) {
    return x ? new OffscreenCanvas(S, h) : si("canvas");
  }
  function m(S, h, U) {
    let z = 1;
    const W = Be(S);
    if ((W.width > U || W.height > U) && (z = U / Math.max(W.width, W.height)), z < 1)
      if (typeof HTMLImageElement < "u" && S instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && S instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && S instanceof ImageBitmap || typeof VideoFrame < "u" && S instanceof VideoFrame) {
        const ne = Math.floor(z * W.width), ce = Math.floor(z * W.height);
        u === void 0 && (u = E(ne, ce));
        const X = h ? E(ne, ce) : u;
        return X.width = ne, X.height = ce, X.getContext("2d").drawImage(S, 0, 0, ne, ce), De("WebGLRenderer: Texture has been resized from (" + W.width + "x" + W.height + ") to (" + ne + "x" + ce + ")."), X;
      } else
        return "data" in S && De("WebGLRenderer: Image in DataTexture is too big (" + W.width + "x" + W.height + ")."), S;
    return S;
  }
  function d(S) {
    return S.generateMipmaps;
  }
  function A(S) {
    i.generateMipmap(S);
  }
  function R(S) {
    return S.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : S.isWebGL3DRenderTarget ? i.TEXTURE_3D : S.isWebGLArrayRenderTarget || S.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function M(S, h, U, z, W, ne = !1) {
    if (S !== null) {
      if (i[S] !== void 0) return i[S];
      De("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + S + "'");
    }
    let ce;
    z && (ce = e.get("EXT_texture_norm16"), ce || De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let X = h;
    if (h === i.RED && (U === i.FLOAT && (X = i.R32F), U === i.HALF_FLOAT && (X = i.R16F), U === i.UNSIGNED_BYTE && (X = i.R8), U === i.UNSIGNED_SHORT && ce && (X = ce.R16_EXT), U === i.SHORT && ce && (X = ce.R16_SNORM_EXT)), h === i.RED_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.R8UI), U === i.UNSIGNED_SHORT && (X = i.R16UI), U === i.UNSIGNED_INT && (X = i.R32UI), U === i.BYTE && (X = i.R8I), U === i.SHORT && (X = i.R16I), U === i.INT && (X = i.R32I)), h === i.RG && (U === i.FLOAT && (X = i.RG32F), U === i.HALF_FLOAT && (X = i.RG16F), U === i.UNSIGNED_BYTE && (X = i.RG8), U === i.UNSIGNED_SHORT && ce && (X = ce.RG16_EXT), U === i.SHORT && ce && (X = ce.RG16_SNORM_EXT)), h === i.RG_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RG8UI), U === i.UNSIGNED_SHORT && (X = i.RG16UI), U === i.UNSIGNED_INT && (X = i.RG32UI), U === i.BYTE && (X = i.RG8I), U === i.SHORT && (X = i.RG16I), U === i.INT && (X = i.RG32I)), h === i.RGB_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RGB8UI), U === i.UNSIGNED_SHORT && (X = i.RGB16UI), U === i.UNSIGNED_INT && (X = i.RGB32UI), U === i.BYTE && (X = i.RGB8I), U === i.SHORT && (X = i.RGB16I), U === i.INT && (X = i.RGB32I)), h === i.RGBA_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RGBA8UI), U === i.UNSIGNED_SHORT && (X = i.RGBA16UI), U === i.UNSIGNED_INT && (X = i.RGBA32UI), U === i.BYTE && (X = i.RGBA8I), U === i.SHORT && (X = i.RGBA16I), U === i.INT && (X = i.RGBA32I)), h === i.RGB && (U === i.UNSIGNED_SHORT && ce && (X = ce.RGB16_EXT), U === i.SHORT && ce && (X = ce.RGB16_SNORM_EXT), U === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), U === i.UNSIGNED_INT_10F_11F_11F_REV && (X = i.R11F_G11F_B10F)), h === i.RGBA) {
      const K = ne ? zi : ke.getTransfer(W);
      U === i.FLOAT && (X = i.RGBA32F), U === i.HALF_FLOAT && (X = i.RGBA16F), U === i.UNSIGNED_BYTE && (X = K === $e ? i.SRGB8_ALPHA8 : i.RGBA8), U === i.UNSIGNED_SHORT && ce && (X = ce.RGBA16_EXT), U === i.SHORT && ce && (X = ce.RGBA16_SNORM_EXT), U === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), U === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function y(S, h) {
    let U;
    return S ? h === null || h === 1014 || h === 1020 ? U = i.DEPTH24_STENCIL8 : h === 1015 ? U = i.DEPTH32F_STENCIL8 : h === 1012 && (U = i.DEPTH24_STENCIL8, De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : h === null || h === 1014 || h === 1020 ? U = i.DEPTH_COMPONENT24 : h === 1015 ? U = i.DEPTH_COMPONENT32F : h === 1012 && (U = i.DEPTH_COMPONENT16), U;
  }
  function T(S, h) {
    return d(S) === !0 || S.isFramebufferTexture && S.minFilter !== 1003 && S.minFilter !== 1006 ? Math.log2(Math.max(h.width, h.height)) + 1 : S.mipmaps !== void 0 && S.mipmaps.length > 0 ? S.mipmaps.length : S.isCompressedTexture && Array.isArray(S.image) ? h.mipmaps.length : 1;
  }
  function C(S) {
    const h = S.target;
    h.removeEventListener("dispose", C), b(h), h.isVideoTexture && f.delete(h), h.isHTMLTexture && p.delete(h);
  }
  function g(S) {
    const h = S.target;
    h.removeEventListener("dispose", g), P(h);
  }
  function b(S) {
    const h = n.get(S);
    if (h.__webglInit === void 0) return;
    const U = S.source, z = _.get(U);
    if (z) {
      const W = z[h.__cacheKey];
      W.usedTimes--, W.usedTimes === 0 && F(S), Object.keys(z).length === 0 && _.delete(U);
    }
    n.remove(S);
  }
  function F(S) {
    const h = n.get(S);
    i.deleteTexture(h.__webglTexture);
    const U = S.source, z = _.get(U);
    delete z[h.__cacheKey], s.memory.textures--;
  }
  function P(S) {
    const h = n.get(S);
    if (S.depthTexture && (S.depthTexture.dispose(), n.remove(S.depthTexture)), S.isWebGLCubeRenderTarget)
      for (let z = 0; z < 6; z++) {
        if (Array.isArray(h.__webglFramebuffer[z]))
          for (let W = 0; W < h.__webglFramebuffer[z].length; W++) i.deleteFramebuffer(h.__webglFramebuffer[z][W]);
        else
          i.deleteFramebuffer(h.__webglFramebuffer[z]);
        h.__webglDepthbuffer && i.deleteRenderbuffer(h.__webglDepthbuffer[z]);
      }
    else {
      if (Array.isArray(h.__webglFramebuffer))
        for (let z = 0; z < h.__webglFramebuffer.length; z++) i.deleteFramebuffer(h.__webglFramebuffer[z]);
      else
        i.deleteFramebuffer(h.__webglFramebuffer);
      if (h.__webglDepthbuffer && i.deleteRenderbuffer(h.__webglDepthbuffer), h.__webglMultisampledFramebuffer && i.deleteFramebuffer(h.__webglMultisampledFramebuffer), h.__webglColorRenderbuffer)
        for (let z = 0; z < h.__webglColorRenderbuffer.length; z++)
          h.__webglColorRenderbuffer[z] && i.deleteRenderbuffer(h.__webglColorRenderbuffer[z]);
      h.__webglDepthRenderbuffer && i.deleteRenderbuffer(h.__webglDepthRenderbuffer);
    }
    const U = S.textures;
    for (let z = 0, W = U.length; z < W; z++) {
      const ne = n.get(U[z]);
      ne.__webglTexture && (i.deleteTexture(ne.__webglTexture), s.memory.textures--), n.remove(U[z]);
    }
    n.remove(S);
  }
  let I = 0;
  function $() {
    I = 0;
  }
  function Y() {
    return I;
  }
  function B(S) {
    I = S;
  }
  function k() {
    const S = I;
    return S >= r.maxTextures && De("WebGLTextures: Trying to use " + S + " texture units while this GPU supports only " + r.maxTextures), I += 1, S;
  }
  function H(S) {
    const h = [];
    return h.push(S.wrapS), h.push(S.wrapT), h.push(S.wrapR || 0), h.push(S.magFilter), h.push(S.minFilter), h.push(S.anisotropy), h.push(S.internalFormat), h.push(S.format), h.push(S.type), h.push(S.generateMipmaps), h.push(S.premultiplyAlpha), h.push(S.flipY), h.push(S.unpackAlignment), h.push(S.colorSpace), h.join();
  }
  function Q(S, h) {
    const U = n.get(S);
    if (S.isVideoTexture && D(S), S.isRenderTargetTexture === !1 && S.isExternalTexture !== !0 && S.version > 0 && U.__version !== S.version) {
      const z = S.image;
      if (z === null)
        De("WebGLRenderer: Texture marked for update but no image data found.");
      else if (z.complete === !1)
        De("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        we(U, S, h);
        return;
      }
    } else S.isExternalTexture && (U.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D, U.__webglTexture, i.TEXTURE0 + h);
  }
  function ee(S, h) {
    const U = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && U.__version !== S.version) {
      we(U, S, h);
      return;
    } else S.isExternalTexture && (U.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D_ARRAY, U.__webglTexture, i.TEXTURE0 + h);
  }
  function ie(S, h) {
    const U = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && U.__version !== S.version) {
      we(U, S, h);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, U.__webglTexture, i.TEXTURE0 + h);
  }
  function se(S, h) {
    const U = n.get(S);
    if (S.isCubeDepthTexture !== !0 && S.version > 0 && U.__version !== S.version) {
      Le(U, S, h);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, U.__webglTexture, i.TEXTURE0 + h);
  }
  const ge = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, ze = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, Je = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function He(S, h) {
    if (h.type === 1015 && e.has("OES_texture_float_linear") === !1 && (h.magFilter === 1006 || h.magFilter === 1007 || h.magFilter === 1005 || h.magFilter === 1008 || h.minFilter === 1006 || h.minFilter === 1007 || h.minFilter === 1005 || h.minFilter === 1008) && De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(S, i.TEXTURE_WRAP_S, ge[h.wrapS]), i.texParameteri(S, i.TEXTURE_WRAP_T, ge[h.wrapT]), (S === i.TEXTURE_3D || S === i.TEXTURE_2D_ARRAY) && i.texParameteri(S, i.TEXTURE_WRAP_R, ge[h.wrapR]), i.texParameteri(S, i.TEXTURE_MAG_FILTER, ze[h.magFilter]), i.texParameteri(S, i.TEXTURE_MIN_FILTER, ze[h.minFilter]), h.compareFunction && (i.texParameteri(S, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(S, i.TEXTURE_COMPARE_FUNC, Je[h.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (h.magFilter === 1003 || h.minFilter !== 1005 && h.minFilter !== 1008 || h.type === 1015 && e.has("OES_texture_float_linear") === !1) return;
      if (h.anisotropy > 1 || n.get(h).__currentAnisotropy) {
        const U = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(S, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(h.anisotropy, r.getMaxAnisotropy())), n.get(h).__currentAnisotropy = h.anisotropy;
      }
    }
  }
  function J(S, h) {
    let U = !1;
    S.__webglInit === void 0 && (S.__webglInit = !0, h.addEventListener("dispose", C));
    const z = h.source;
    let W = _.get(z);
    W === void 0 && (W = {}, _.set(z, W));
    const ne = H(h);
    if (ne !== S.__cacheKey) {
      W[ne] === void 0 && (W[ne] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, s.memory.textures++, U = !0), W[ne].usedTimes++;
      const ce = W[S.__cacheKey];
      ce !== void 0 && (W[S.__cacheKey].usedTimes--, ce.usedTimes === 0 && F(h)), S.__cacheKey = ne, S.__webglTexture = W[ne].texture;
    }
    return U;
  }
  function re(S, h, U) {
    return Math.floor(Math.floor(S / U) / h);
  }
  function te(S, h, U, z) {
    const ne = S.updateRanges;
    if (ne.length === 0)
      t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, h.width, h.height, U, z, h.data);
    else {
      ne.sort((Se, ue) => Se.start - ue.start);
      let ce = 0;
      for (let Se = 1; Se < ne.length; Se++) {
        const ue = ne[ce], fe = ne[Se], ye = ue.start + ue.count, Ce = re(fe.start, h.width, 4), Ie = re(ue.start, h.width, 4);
        fe.start <= ye + 1 && Ce === Ie && re(fe.start + fe.count - 1, h.width, 4) === Ce ? ue.count = Math.max(
          ue.count,
          fe.start + fe.count - ue.start
        ) : (++ce, ne[ce] = fe);
      }
      ne.length = ce + 1;
      const X = t.getParameter(i.UNPACK_ROW_LENGTH), K = t.getParameter(i.UNPACK_SKIP_PIXELS), oe = t.getParameter(i.UNPACK_SKIP_ROWS);
      t.pixelStorei(i.UNPACK_ROW_LENGTH, h.width);
      for (let Se = 0, ue = ne.length; Se < ue; Se++) {
        const fe = ne[Se], ye = Math.floor(fe.start / 4), Ce = Math.ceil(fe.count / 4), Ie = ye % h.width, w = Math.floor(ye / h.width), ae = Ce, Z = 1;
        t.pixelStorei(i.UNPACK_SKIP_PIXELS, Ie), t.pixelStorei(i.UNPACK_SKIP_ROWS, w), t.texSubImage2D(i.TEXTURE_2D, 0, Ie, w, ae, Z, U, z, h.data);
      }
      S.clearUpdateRanges(), t.pixelStorei(i.UNPACK_ROW_LENGTH, X), t.pixelStorei(i.UNPACK_SKIP_PIXELS, K), t.pixelStorei(i.UNPACK_SKIP_ROWS, oe);
    }
  }
  function we(S, h, U) {
    let z = i.TEXTURE_2D;
    (h.isDataArrayTexture || h.isCompressedArrayTexture) && (z = i.TEXTURE_2D_ARRAY), h.isData3DTexture && (z = i.TEXTURE_3D);
    const W = J(S, h), ne = h.source;
    t.bindTexture(z, S.__webglTexture, i.TEXTURE0 + U);
    const ce = n.get(ne);
    if (ne.version !== ce.__version || W === !0) {
      if (t.activeTexture(i.TEXTURE0 + U), (typeof ImageBitmap < "u" && h.image instanceof ImageBitmap) === !1) {
        const Z = ke.getPrimaries(ke.workingColorSpace), le = h.colorSpace === "" ? null : ke.getPrimaries(h.colorSpace), he = h.colorSpace === "" || Z === le ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, h.flipY), t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, h.premultiplyAlpha), t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, he);
      }
      t.pixelStorei(i.UNPACK_ALIGNMENT, h.unpackAlignment);
      let K = m(h.image, !1, r.maxTextureSize);
      K = ot(h, K);
      const oe = a.convert(h.format, h.colorSpace), Se = a.convert(h.type);
      let ue = M(h.internalFormat, oe, Se, h.normalized, h.colorSpace, h.isVideoTexture);
      He(z, h);
      let fe;
      const ye = h.mipmaps, Ce = h.isVideoTexture !== !0, Ie = ce.__version === void 0 || W === !0, w = ne.dataReady, ae = T(h, K);
      if (h.isDepthTexture)
        ue = y(h.format === 1027, h.type), Ie && (Ce ? t.texStorage2D(i.TEXTURE_2D, 1, ue, K.width, K.height) : t.texImage2D(i.TEXTURE_2D, 0, ue, K.width, K.height, 0, oe, Se, null));
      else if (h.isDataTexture)
        if (ye.length > 0) {
          Ce && Ie && t.texStorage2D(i.TEXTURE_2D, ae, ue, ye[0].width, ye[0].height);
          for (let Z = 0, le = ye.length; Z < le; Z++)
            fe = ye[Z], Ce ? w && t.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, fe.width, fe.height, oe, Se, fe.data) : t.texImage2D(i.TEXTURE_2D, Z, ue, fe.width, fe.height, 0, oe, Se, fe.data);
          h.generateMipmaps = !1;
        } else
          Ce ? (Ie && t.texStorage2D(i.TEXTURE_2D, ae, ue, K.width, K.height), w && te(h, K, oe, Se)) : t.texImage2D(i.TEXTURE_2D, 0, ue, K.width, K.height, 0, oe, Se, K.data);
      else if (h.isCompressedTexture)
        if (h.isCompressedArrayTexture) {
          Ce && Ie && t.texStorage3D(i.TEXTURE_2D_ARRAY, ae, ue, ye[0].width, ye[0].height, K.depth);
          for (let Z = 0, le = ye.length; Z < le; Z++)
            if (fe = ye[Z], h.format !== 1023)
              if (oe !== null)
                if (Ce) {
                  if (w)
                    if (h.layerUpdates.size > 0) {
                      const he = oa(fe.width, fe.height, h.format, h.type);
                      for (const j of h.layerUpdates) {
                        const Ee = fe.data.subarray(
                          j * he / fe.data.BYTES_PER_ELEMENT,
                          (j + 1) * he / fe.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, j, fe.width, fe.height, 1, oe, Ee);
                      }
                      h.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, 0, fe.width, fe.height, K.depth, oe, fe.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, Z, ue, fe.width, fe.height, K.depth, 0, fe.data, 0, 0);
              else
                De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ce ? w && t.texSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, 0, fe.width, fe.height, K.depth, oe, Se, fe.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, Z, ue, fe.width, fe.height, K.depth, 0, oe, Se, fe.data);
        } else {
          Ce && Ie && t.texStorage2D(i.TEXTURE_2D, ae, ue, ye[0].width, ye[0].height);
          for (let Z = 0, le = ye.length; Z < le; Z++)
            fe = ye[Z], h.format !== 1023 ? oe !== null ? Ce ? w && t.compressedTexSubImage2D(i.TEXTURE_2D, Z, 0, 0, fe.width, fe.height, oe, fe.data) : t.compressedTexImage2D(i.TEXTURE_2D, Z, ue, fe.width, fe.height, 0, fe.data) : De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ce ? w && t.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, fe.width, fe.height, oe, Se, fe.data) : t.texImage2D(i.TEXTURE_2D, Z, ue, fe.width, fe.height, 0, oe, Se, fe.data);
        }
      else if (h.isDataArrayTexture)
        if (Ce) {
          if (Ie && t.texStorage3D(i.TEXTURE_2D_ARRAY, ae, ue, K.width, K.height, K.depth), w)
            if (h.layerUpdates.size > 0) {
              const Z = oa(K.width, K.height, h.format, h.type);
              for (const le of h.layerUpdates) {
                const he = K.data.subarray(
                  le * Z / K.data.BYTES_PER_ELEMENT,
                  (le + 1) * Z / K.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, le, K.width, K.height, 1, oe, Se, he);
              }
              h.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, K.width, K.height, K.depth, oe, Se, K.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, ue, K.width, K.height, K.depth, 0, oe, Se, K.data);
      else if (h.isData3DTexture)
        Ce ? (Ie && t.texStorage3D(i.TEXTURE_3D, ae, ue, K.width, K.height, K.depth), w && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, K.width, K.height, K.depth, oe, Se, K.data)) : t.texImage3D(i.TEXTURE_3D, 0, ue, K.width, K.height, K.depth, 0, oe, Se, K.data);
      else if (h.isFramebufferTexture) {
        if (Ie)
          if (Ce)
            t.texStorage2D(i.TEXTURE_2D, ae, ue, K.width, K.height);
          else {
            let Z = K.width, le = K.height;
            for (let he = 0; he < ae; he++)
              t.texImage2D(i.TEXTURE_2D, he, ue, Z, le, 0, oe, Se, null), Z >>= 1, le >>= 1;
          }
      } else if (h.isHTMLTexture) {
        if ("texElementImage2D" in i) {
          const Z = i.canvas;
          if (Z.hasAttribute("layoutsubtree") || Z.setAttribute("layoutsubtree", "true"), K.parentNode !== Z) {
            Z.appendChild(K), p.add(h), Z.onpaint = (le) => {
              const he = le.changedElements;
              for (const j of p)
                he.includes(j.image) && (j.needsUpdate = !0);
            }, Z.requestPaint();
            return;
          }
          if (i.texElementImage2D.length === 3)
            i.texElementImage2D(i.TEXTURE_2D, i.RGBA8, K);
          else {
            const he = i.RGBA, j = i.RGBA, Ee = i.UNSIGNED_BYTE;
            i.texElementImage2D(i.TEXTURE_2D, 0, he, j, Ee, K);
          }
          i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
        }
      } else if (ye.length > 0) {
        if (Ce && Ie) {
          const Z = Be(ye[0]);
          t.texStorage2D(i.TEXTURE_2D, ae, ue, Z.width, Z.height);
        }
        for (let Z = 0, le = ye.length; Z < le; Z++)
          fe = ye[Z], Ce ? w && t.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, oe, Se, fe) : t.texImage2D(i.TEXTURE_2D, Z, ue, oe, Se, fe);
        h.generateMipmaps = !1;
      } else if (Ce) {
        if (Ie) {
          const Z = Be(K);
          t.texStorage2D(i.TEXTURE_2D, ae, ue, Z.width, Z.height);
        }
        w && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, oe, Se, K);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, ue, oe, Se, K);
      d(h) && A(z), ce.__version = ne.version, h.onUpdate && h.onUpdate(h);
    }
    S.__version = h.version;
  }
  function Le(S, h, U) {
    if (h.image.length !== 6) return;
    const z = J(S, h), W = h.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, S.__webglTexture, i.TEXTURE0 + U);
    const ne = n.get(W);
    if (W.version !== ne.__version || z === !0) {
      t.activeTexture(i.TEXTURE0 + U);
      const ce = ke.getPrimaries(ke.workingColorSpace), X = h.colorSpace === "" ? null : ke.getPrimaries(h.colorSpace), K = h.colorSpace === "" || ce === X ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, h.flipY), t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, h.premultiplyAlpha), t.pixelStorei(i.UNPACK_ALIGNMENT, h.unpackAlignment), t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, K);
      const oe = h.isCompressedTexture || h.image[0].isCompressedTexture, Se = h.image[0] && h.image[0].isDataTexture, ue = [];
      for (let j = 0; j < 6; j++)
        !oe && !Se ? ue[j] = m(h.image[j], !0, r.maxCubemapSize) : ue[j] = Se ? h.image[j].image : h.image[j], ue[j] = ot(h, ue[j]);
      const fe = ue[0], ye = a.convert(h.format, h.colorSpace), Ce = a.convert(h.type), Ie = M(h.internalFormat, ye, Ce, h.normalized, h.colorSpace), w = h.isVideoTexture !== !0, ae = ne.__version === void 0 || z === !0, Z = W.dataReady;
      let le = T(h, fe);
      He(i.TEXTURE_CUBE_MAP, h);
      let he;
      if (oe) {
        w && ae && t.texStorage2D(i.TEXTURE_CUBE_MAP, le, Ie, fe.width, fe.height);
        for (let j = 0; j < 6; j++) {
          he = ue[j].mipmaps;
          for (let Ee = 0; Ee < he.length; Ee++) {
            const q = he[Ee];
            h.format !== 1023 ? ye !== null ? w ? Z && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee, 0, 0, q.width, q.height, ye, q.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee, Ie, q.width, q.height, 0, q.data) : De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : w ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee, 0, 0, q.width, q.height, ye, Ce, q.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee, Ie, q.width, q.height, 0, ye, Ce, q.data);
          }
        }
      } else {
        if (he = h.mipmaps, w && ae) {
          he.length > 0 && le++;
          const j = Be(ue[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, le, Ie, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (Se) {
            w ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, ue[j].width, ue[j].height, ye, Ce, ue[j].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ie, ue[j].width, ue[j].height, 0, ye, Ce, ue[j].data);
            for (let Ee = 0; Ee < he.length; Ee++) {
              const de = he[Ee].image[j].image;
              w ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee + 1, 0, 0, de.width, de.height, ye, Ce, de.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee + 1, Ie, de.width, de.height, 0, ye, Ce, de.data);
            }
          } else {
            w ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, ye, Ce, ue[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ie, ye, Ce, ue[j]);
            for (let Ee = 0; Ee < he.length; Ee++) {
              const q = he[Ee];
              w ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee + 1, 0, 0, ye, Ce, q.image[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Ee + 1, Ie, ye, Ce, q.image[j]);
            }
          }
      }
      d(h) && A(i.TEXTURE_CUBE_MAP), ne.__version = W.version, h.onUpdate && h.onUpdate(h);
    }
    S.__version = h.version;
  }
  function Re(S, h, U, z, W, ne) {
    const ce = a.convert(U.format, U.colorSpace), X = a.convert(U.type), K = M(U.internalFormat, ce, X, U.normalized, U.colorSpace), oe = n.get(h), Se = n.get(U);
    if (Se.__renderTarget = h, !oe.__hasExternalTextures) {
      const ue = Math.max(1, h.width >> ne), fe = Math.max(1, h.height >> ne);
      W === i.TEXTURE_3D || W === i.TEXTURE_2D_ARRAY ? t.texImage3D(W, ne, K, ue, fe, h.depth, 0, ce, X, null) : t.texImage2D(W, ne, K, ue, fe, 0, ce, X, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, S), it(h) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, z, W, Se.__webglTexture, 0, je(h)) : (W === i.TEXTURE_2D || W >= i.TEXTURE_CUBE_MAP_POSITIVE_X && W <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, z, W, Se.__webglTexture, ne), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function nt(S, h, U) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, S), h.depthBuffer) {
      const z = h.depthTexture, W = z && z.isDepthTexture ? z.type : null, ne = y(h.stencilBuffer, W), ce = h.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
      it(h) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, je(h), ne, h.width, h.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, je(h), ne, h.width, h.height) : i.renderbufferStorage(i.RENDERBUFFER, ne, h.width, h.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, ce, i.RENDERBUFFER, S);
    } else {
      const z = h.textures;
      for (let W = 0; W < z.length; W++) {
        const ne = z[W], ce = a.convert(ne.format, ne.colorSpace), X = a.convert(ne.type), K = M(ne.internalFormat, ce, X, ne.normalized, ne.colorSpace);
        it(h) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, je(h), K, h.width, h.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, je(h), K, h.width, h.height) : i.renderbufferStorage(i.RENDERBUFFER, K, h.width, h.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Fe(S, h, U) {
    const z = h.isWebGLCubeRenderTarget === !0;
    if (t.bindFramebuffer(i.FRAMEBUFFER, S), !(h.depthTexture && h.depthTexture.isDepthTexture))
      throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const W = n.get(h.depthTexture);
    if (W.__renderTarget = h, (!W.__webglTexture || h.depthTexture.image.width !== h.width || h.depthTexture.image.height !== h.height) && (h.depthTexture.image.width = h.width, h.depthTexture.image.height = h.height, h.depthTexture.needsUpdate = !0), z) {
      if (W.__webglInit === void 0 && (W.__webglInit = !0, h.depthTexture.addEventListener("dispose", C)), W.__webglTexture === void 0) {
        W.__webglTexture = i.createTexture(), t.bindTexture(i.TEXTURE_CUBE_MAP, W.__webglTexture), He(i.TEXTURE_CUBE_MAP, h.depthTexture);
        const oe = a.convert(h.depthTexture.format), Se = a.convert(h.depthTexture.type);
        let ue;
        h.depthTexture.format === 1026 ? ue = i.DEPTH_COMPONENT24 : h.depthTexture.format === 1027 && (ue = i.DEPTH24_STENCIL8);
        for (let fe = 0; fe < 6; fe++)
          i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + fe, 0, ue, h.width, h.height, 0, oe, Se, null);
      }
    } else
      Q(h.depthTexture, 0);
    const ne = W.__webglTexture, ce = je(h), X = z ? i.TEXTURE_CUBE_MAP_POSITIVE_X + U : i.TEXTURE_2D, K = h.depthTexture.format === 1027 ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
    if (h.depthTexture.format === 1026)
      it(h) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, K, X, ne, 0, ce) : i.framebufferTexture2D(i.FRAMEBUFFER, K, X, ne, 0);
    else if (h.depthTexture.format === 1027)
      it(h) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, K, X, ne, 0, ce) : i.framebufferTexture2D(i.FRAMEBUFFER, K, X, ne, 0);
    else
      throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function Xe(S) {
    const h = n.get(S), U = S.isWebGLCubeRenderTarget === !0;
    if (h.__boundDepthTexture !== S.depthTexture) {
      const z = S.depthTexture;
      if (h.__depthDisposeCallback && h.__depthDisposeCallback(), z) {
        const W = () => {
          delete h.__boundDepthTexture, delete h.__depthDisposeCallback, z.removeEventListener("dispose", W);
        };
        z.addEventListener("dispose", W), h.__depthDisposeCallback = W;
      }
      h.__boundDepthTexture = z;
    }
    if (S.depthTexture && !h.__autoAllocateDepthBuffer)
      if (U)
        for (let z = 0; z < 6; z++)
          Fe(h.__webglFramebuffer[z], S, z);
      else {
        const z = S.texture.mipmaps;
        z && z.length > 0 ? Fe(h.__webglFramebuffer[0], S, 0) : Fe(h.__webglFramebuffer, S, 0);
      }
    else if (U) {
      h.__webglDepthbuffer = [];
      for (let z = 0; z < 6; z++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, h.__webglFramebuffer[z]), h.__webglDepthbuffer[z] === void 0)
          h.__webglDepthbuffer[z] = i.createRenderbuffer(), nt(h.__webglDepthbuffer[z], S, !1);
        else {
          const W = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ne = h.__webglDepthbuffer[z];
          i.bindRenderbuffer(i.RENDERBUFFER, ne), i.framebufferRenderbuffer(i.FRAMEBUFFER, W, i.RENDERBUFFER, ne);
        }
    } else {
      const z = S.texture.mipmaps;
      if (z && z.length > 0 ? t.bindFramebuffer(i.FRAMEBUFFER, h.__webglFramebuffer[0]) : t.bindFramebuffer(i.FRAMEBUFFER, h.__webglFramebuffer), h.__webglDepthbuffer === void 0)
        h.__webglDepthbuffer = i.createRenderbuffer(), nt(h.__webglDepthbuffer, S, !1);
      else {
        const W = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ne = h.__webglDepthbuffer;
        i.bindRenderbuffer(i.RENDERBUFFER, ne), i.framebufferRenderbuffer(i.FRAMEBUFFER, W, i.RENDERBUFFER, ne);
      }
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Pe(S, h, U) {
    const z = n.get(S);
    h !== void 0 && Re(z.__webglFramebuffer, S, S.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), U !== void 0 && Xe(S);
  }
  function Ve(S) {
    const h = S.texture, U = n.get(S), z = n.get(h);
    S.addEventListener("dispose", g);
    const W = S.textures, ne = S.isWebGLCubeRenderTarget === !0, ce = W.length > 1;
    if (ce || (z.__webglTexture === void 0 && (z.__webglTexture = i.createTexture()), z.__version = h.version, s.memory.textures++), ne) {
      U.__webglFramebuffer = [];
      for (let X = 0; X < 6; X++)
        if (h.mipmaps && h.mipmaps.length > 0) {
          U.__webglFramebuffer[X] = [];
          for (let K = 0; K < h.mipmaps.length; K++)
            U.__webglFramebuffer[X][K] = i.createFramebuffer();
        } else
          U.__webglFramebuffer[X] = i.createFramebuffer();
    } else {
      if (h.mipmaps && h.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let X = 0; X < h.mipmaps.length; X++)
          U.__webglFramebuffer[X] = i.createFramebuffer();
      } else
        U.__webglFramebuffer = i.createFramebuffer();
      if (ce)
        for (let X = 0, K = W.length; X < K; X++) {
          const oe = n.get(W[X]);
          oe.__webglTexture === void 0 && (oe.__webglTexture = i.createTexture(), s.memory.textures++);
        }
      if (S.samples > 0 && it(S) === !1) {
        U.__webglMultisampledFramebuffer = i.createFramebuffer(), U.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let X = 0; X < W.length; X++) {
          const K = W[X];
          U.__webglColorRenderbuffer[X] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, U.__webglColorRenderbuffer[X]);
          const oe = a.convert(K.format, K.colorSpace), Se = a.convert(K.type), ue = M(K.internalFormat, oe, Se, K.normalized, K.colorSpace, S.isXRRenderTarget === !0), fe = je(S);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, fe, ue, S.width, S.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + X, i.RENDERBUFFER, U.__webglColorRenderbuffer[X]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), S.depthBuffer && (U.__webglDepthRenderbuffer = i.createRenderbuffer(), nt(U.__webglDepthRenderbuffer, S, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (ne) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, z.__webglTexture), He(i.TEXTURE_CUBE_MAP, h);
      for (let X = 0; X < 6; X++)
        if (h.mipmaps && h.mipmaps.length > 0)
          for (let K = 0; K < h.mipmaps.length; K++)
            Re(U.__webglFramebuffer[X][K], S, h, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + X, K);
        else
          Re(U.__webglFramebuffer[X], S, h, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0);
      d(h) && A(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ce) {
      for (let X = 0, K = W.length; X < K; X++) {
        const oe = W[X], Se = n.get(oe);
        let ue = i.TEXTURE_2D;
        (S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (ue = S.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(ue, Se.__webglTexture), He(ue, oe), Re(U.__webglFramebuffer, S, oe, i.COLOR_ATTACHMENT0 + X, ue, 0), d(oe) && A(ue);
      }
      t.unbindTexture();
    } else {
      let X = i.TEXTURE_2D;
      if ((S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (X = S.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(X, z.__webglTexture), He(X, h), h.mipmaps && h.mipmaps.length > 0)
        for (let K = 0; K < h.mipmaps.length; K++)
          Re(U.__webglFramebuffer[K], S, h, i.COLOR_ATTACHMENT0, X, K);
      else
        Re(U.__webglFramebuffer, S, h, i.COLOR_ATTACHMENT0, X, 0);
      d(h) && A(X), t.unbindTexture();
    }
    S.depthBuffer && Xe(S);
  }
  function st(S) {
    const h = S.textures;
    for (let U = 0, z = h.length; U < z; U++) {
      const W = h[U];
      if (d(W)) {
        const ne = R(S), ce = n.get(W).__webglTexture;
        t.bindTexture(ne, ce), A(ne), t.unbindTexture();
      }
    }
  }
  const ut = [], _t = [];
  function ft(S) {
    if (S.samples > 0) {
      if (it(S) === !1) {
        const h = S.textures, U = S.width, z = S.height;
        let W = i.COLOR_BUFFER_BIT;
        const ne = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ce = n.get(S), X = h.length > 1;
        if (X)
          for (let oe = 0; oe < h.length; oe++)
            t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + oe, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + oe, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, ce.__webglMultisampledFramebuffer);
        const K = S.texture.mipmaps;
        K && K.length > 0 ? t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglFramebuffer[0]) : t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglFramebuffer);
        for (let oe = 0; oe < h.length; oe++) {
          if (S.resolveDepthBuffer && (S.depthBuffer && (W |= i.DEPTH_BUFFER_BIT), S.stencilBuffer && S.resolveStencilBuffer && (W |= i.STENCIL_BUFFER_BIT)), X) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ce.__webglColorRenderbuffer[oe]);
            const Se = n.get(h[oe]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Se, 0);
          }
          i.blitFramebuffer(0, 0, U, z, 0, 0, U, z, W, i.NEAREST), l === !0 && (ut.length = 0, _t.length = 0, ut.push(i.COLOR_ATTACHMENT0 + oe), S.depthBuffer && S.resolveDepthBuffer === !1 && (ut.push(ne), _t.push(ne), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, _t)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ut));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), X)
          for (let oe = 0; oe < h.length; oe++) {
            t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + oe, i.RENDERBUFFER, ce.__webglColorRenderbuffer[oe]);
            const Se = n.get(h[oe]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + oe, i.TEXTURE_2D, Se, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglMultisampledFramebuffer);
      } else if (S.depthBuffer && S.resolveDepthBuffer === !1 && l) {
        const h = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [h]);
      }
    }
  }
  function je(S) {
    return Math.min(r.maxSamples, S.samples);
  }
  function it(S) {
    const h = n.get(S);
    return S.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && h.__useRenderToTexture !== !1;
  }
  function D(S) {
    const h = s.render.frame;
    f.get(S) !== h && (f.set(S, h), S.update());
  }
  function ot(S, h) {
    const U = S.colorSpace, z = S.format, W = S.type;
    return S.isCompressedTexture === !0 || S.isVideoTexture === !0 || U !== Gi && U !== "" && (ke.getTransfer(U) === $e ? (z !== 1023 || W !== 1009) && De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Ye("WebGLTextures: Unsupported texture color space:", U)), h;
  }
  function Be(S) {
    return typeof HTMLImageElement < "u" && S instanceof HTMLImageElement ? (c.width = S.naturalWidth || S.width, c.height = S.naturalHeight || S.height) : typeof VideoFrame < "u" && S instanceof VideoFrame ? (c.width = S.displayWidth, c.height = S.displayHeight) : (c.width = S.width, c.height = S.height), c;
  }
  this.allocateTextureUnit = k, this.resetTextureUnits = $, this.getTextureUnits = Y, this.setTextureUnits = B, this.setTexture2D = Q, this.setTexture2DArray = ee, this.setTexture3D = ie, this.setTextureCube = se, this.rebindTextures = Pe, this.setupRenderTarget = Ve, this.updateRenderTargetMipmap = st, this.updateMultisampleRenderTarget = ft, this.setupDepthRenderbuffer = Xe, this.setupFrameBufferTexture = Re, this.useMultisampledRTT = it, this.isReversedDepthBuffer = function() {
    return t.buffers.depth.getReversed();
  };
}
function ud(i, e) {
  function t(n, r = "") {
    let a;
    const s = ke.getTransfer(r);
    if (n === 1009) return i.UNSIGNED_BYTE;
    if (n === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 35899) return i.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === 1010) return i.BYTE;
    if (n === 1011) return i.SHORT;
    if (n === 1012) return i.UNSIGNED_SHORT;
    if (n === 1013) return i.INT;
    if (n === 1014) return i.UNSIGNED_INT;
    if (n === 1015) return i.FLOAT;
    if (n === 1016) return i.HALF_FLOAT;
    if (n === 1021) return i.ALPHA;
    if (n === 1022) return i.RGB;
    if (n === 1023) return i.RGBA;
    if (n === 1026) return i.DEPTH_COMPONENT;
    if (n === 1027) return i.DEPTH_STENCIL;
    if (n === 1028) return i.RED;
    if (n === 1029) return i.RED_INTEGER;
    if (n === 1030) return i.RG;
    if (n === 1031) return i.RG_INTEGER;
    if (n === 1033) return i.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (s === $e)
        if (a = e.get("WEBGL_compressed_texture_s3tc_srgb"), a !== null) {
          if (n === 33776) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (a = e.get("WEBGL_compressed_texture_s3tc"), a !== null) {
        if (n === 33776) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (a = e.get("WEBGL_compressed_texture_pvrtc"), a !== null) {
        if (n === 35840) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491)
      if (a = e.get("WEBGL_compressed_texture_etc"), a !== null) {
        if (n === 36196 || n === 37492) return s === $e ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === 37488) return a.COMPRESSED_R11_EAC;
        if (n === 37489) return a.COMPRESSED_SIGNED_R11_EAC;
        if (n === 37490) return a.COMPRESSED_RG11_EAC;
        if (n === 37491) return a.COMPRESSED_SIGNED_RG11_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (a = e.get("WEBGL_compressed_texture_astc"), a !== null) {
        if (n === 37808) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return s === $e ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (a = e.get("EXT_texture_compression_bptc"), a !== null) {
        if (n === 36492) return s === $e ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (a = e.get("EXT_texture_compression_rgtc"), a !== null) {
        if (n === 36283) return a.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
const fd = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, dd = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class hd {
  /**
   * Constructs a new depth sensing module.
   */
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  /**
   * Inits the depth sensing module
   *
   * @param {XRWebGLDepthInformation} depthData - The XR depth data.
   * @param {XRRenderState} renderState - The XR render state.
   */
  init(e, t) {
    if (this.texture === null) {
      const n = new Ja(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new Ct({
        vertexShader: fd,
        fragmentShader: dd,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Ut(new ui(20, 20), n);
    }
    return this.mesh;
  }
  /**
   * Resets the module
   */
  reset() {
    this.texture = null, this.mesh = null;
  }
  /**
   * Returns a texture representing the depth of the user's environment.
   *
   * @return {?ExternalTexture} The depth texture.
   */
  getDepthTexture() {
    return this.texture;
  }
}
class pd extends bn {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(e, t) {
    super();
    const n = this;
    let r = null, a = 1, s = null, o = "local-floor", l = 1, c = null, f = null, p = null, u = null, _ = null, x = null;
    const E = typeof XRWebGLBinding < "u", m = new hd(), d = {}, A = t.getContextAttributes();
    let R = null, M = null;
    const y = [], T = [], C = new Ke();
    let g = null;
    const b = new kt();
    b.viewport = new ct();
    const F = new kt();
    F.viewport = new ct();
    const P = [b, F], I = new So();
    let $ = null, Y = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(J) {
      let re = y[J];
      return re === void 0 && (re = new Qi(), y[J] = re), re.getTargetRaySpace();
    }, this.getControllerGrip = function(J) {
      let re = y[J];
      return re === void 0 && (re = new Qi(), y[J] = re), re.getGripSpace();
    }, this.getHand = function(J) {
      let re = y[J];
      return re === void 0 && (re = new Qi(), y[J] = re), re.getHandSpace();
    };
    function B(J) {
      const re = T.indexOf(J.inputSource);
      if (re === -1)
        return;
      const te = y[re];
      te !== void 0 && (te.update(J.inputSource, J.frame, c || s), te.dispatchEvent({ type: J.type, data: J.inputSource }));
    }
    function k() {
      r.removeEventListener("select", B), r.removeEventListener("selectstart", B), r.removeEventListener("selectend", B), r.removeEventListener("squeeze", B), r.removeEventListener("squeezestart", B), r.removeEventListener("squeezeend", B), r.removeEventListener("end", k), r.removeEventListener("inputsourceschange", H);
      for (let J = 0; J < y.length; J++) {
        const re = T[J];
        re !== null && (T[J] = null, y[J].disconnect(re));
      }
      $ = null, Y = null, m.reset();
      for (const J in d)
        delete d[J];
      e.setRenderTarget(R), _ = null, u = null, p = null, r = null, M = null, He.stop(), n.isPresenting = !1, e.setPixelRatio(g), e.setSize(C.width, C.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(J) {
      a = J, n.isPresenting === !0 && De("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(J) {
      o = J, n.isPresenting === !0 && De("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || s;
    }, this.setReferenceSpace = function(J) {
      c = J;
    }, this.getBaseLayer = function() {
      return u !== null ? u : _;
    }, this.getBinding = function() {
      return p === null && E && (p = new XRWebGLBinding(r, t)), p;
    }, this.getFrame = function() {
      return x;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(J) {
      if (r = J, r !== null) {
        if (R = e.getRenderTarget(), r.addEventListener("select", B), r.addEventListener("selectstart", B), r.addEventListener("selectend", B), r.addEventListener("squeeze", B), r.addEventListener("squeezestart", B), r.addEventListener("squeezeend", B), r.addEventListener("end", k), r.addEventListener("inputsourceschange", H), A.xrCompatible !== !0 && await t.makeXRCompatible(), g = e.getPixelRatio(), e.getSize(C), E && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let te = null, we = null, Le = null;
          A.depth && (Le = A.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, te = A.stencil ? 1027 : 1026, we = A.stencil ? 1020 : 1014);
          const Re = {
            colorFormat: t.RGBA8,
            depthFormat: Le,
            scaleFactor: a
          };
          p = this.getBinding(), u = p.createProjectionLayer(Re), r.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), M = new Gt(
            u.textureWidth,
            u.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new Xn(u.textureWidth, u.textureHeight, we, void 0, void 0, void 0, void 0, void 0, void 0, te),
              stencilBuffer: A.stencil,
              colorSpace: e.outputColorSpace,
              samples: A.antialias ? 4 : 0,
              resolveDepthBuffer: u.ignoreDepthValues === !1,
              resolveStencilBuffer: u.ignoreDepthValues === !1
            }
          );
        } else {
          const te = {
            antialias: A.antialias,
            alpha: !0,
            depth: A.depth,
            stencil: A.stencil,
            framebufferScaleFactor: a
          };
          _ = new XRWebGLLayer(r, t, te), r.updateRenderState({ baseLayer: _ }), e.setPixelRatio(1), e.setSize(_.framebufferWidth, _.framebufferHeight, !1), M = new Gt(
            _.framebufferWidth,
            _.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: A.stencil,
              resolveDepthBuffer: _.ignoreDepthValues === !1,
              resolveStencilBuffer: _.ignoreDepthValues === !1
            }
          );
        }
        M.isXRRenderTarget = !0, this.setFoveation(l), c = null, s = await r.requestReferenceSpace(o), He.setContext(r), He.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function H(J) {
      for (let re = 0; re < J.removed.length; re++) {
        const te = J.removed[re], we = T.indexOf(te);
        we >= 0 && (T[we] = null, y[we].disconnect(te));
      }
      for (let re = 0; re < J.added.length; re++) {
        const te = J.added[re];
        let we = T.indexOf(te);
        if (we === -1) {
          for (let Re = 0; Re < y.length; Re++)
            if (Re >= T.length) {
              T.push(te), we = Re;
              break;
            } else if (T[Re] === null) {
              T[Re] = te, we = Re;
              break;
            }
          if (we === -1) break;
        }
        const Le = y[we];
        Le && Le.connect(te);
      }
    }
    const Q = new N(), ee = new N();
    function ie(J, re, te) {
      Q.setFromMatrixPosition(re.matrixWorld), ee.setFromMatrixPosition(te.matrixWorld);
      const we = Q.distanceTo(ee), Le = re.projectionMatrix.elements, Re = te.projectionMatrix.elements, nt = Le[14] / (Le[10] - 1), Fe = Le[14] / (Le[10] + 1), Xe = (Le[9] + 1) / Le[5], Pe = (Le[9] - 1) / Le[5], Ve = (Le[8] - 1) / Le[0], st = (Re[8] + 1) / Re[0], ut = nt * Ve, _t = nt * st, ft = we / (-Ve + st), je = ft * -Ve;
      if (re.matrixWorld.decompose(J.position, J.quaternion, J.scale), J.translateX(je), J.translateZ(ft), J.matrixWorld.compose(J.position, J.quaternion, J.scale), J.matrixWorldInverse.copy(J.matrixWorld).invert(), Le[10] === -1)
        J.projectionMatrix.copy(re.projectionMatrix), J.projectionMatrixInverse.copy(re.projectionMatrixInverse);
      else {
        const it = nt + ft, D = Fe + ft, ot = ut - je, Be = _t + (we - je), S = Xe * Fe / D * it, h = Pe * Fe / D * it;
        J.projectionMatrix.makePerspective(ot, Be, S, h, it, D), J.projectionMatrixInverse.copy(J.projectionMatrix).invert();
      }
    }
    function se(J, re) {
      re === null ? J.matrixWorld.copy(J.matrix) : J.matrixWorld.multiplyMatrices(re.matrixWorld, J.matrix), J.matrixWorldInverse.copy(J.matrixWorld).invert();
    }
    this.updateCamera = function(J) {
      if (r === null) return;
      let re = J.near, te = J.far;
      m.texture !== null && (m.depthNear > 0 && (re = m.depthNear), m.depthFar > 0 && (te = m.depthFar)), I.near = F.near = b.near = re, I.far = F.far = b.far = te, ($ !== I.near || Y !== I.far) && (r.updateRenderState({
        depthNear: I.near,
        depthFar: I.far
      }), $ = I.near, Y = I.far), I.layers.mask = J.layers.mask | 6, b.layers.mask = I.layers.mask & -5, F.layers.mask = I.layers.mask & -3;
      const we = J.parent, Le = I.cameras;
      se(I, we);
      for (let Re = 0; Re < Le.length; Re++)
        se(Le[Re], we);
      Le.length === 2 ? ie(I, b, F) : I.projectionMatrix.copy(b.projectionMatrix), ge(J, I, we);
    };
    function ge(J, re, te) {
      te === null ? J.matrix.copy(re.matrixWorld) : (J.matrix.copy(te.matrixWorld), J.matrix.invert(), J.matrix.multiply(re.matrixWorld)), J.matrix.decompose(J.position, J.quaternion, J.scale), J.updateMatrixWorld(!0), J.projectionMatrix.copy(re.projectionMatrix), J.projectionMatrixInverse.copy(re.projectionMatrixInverse), J.isPerspectiveCamera && (J.fov = oi * 2 * Math.atan(1 / J.projectionMatrix.elements[5]), J.zoom = 1);
    }
    this.getCamera = function() {
      return I;
    }, this.getFoveation = function() {
      if (!(u === null && _ === null))
        return l;
    }, this.setFoveation = function(J) {
      l = J, u !== null && (u.fixedFoveation = J), _ !== null && _.fixedFoveation !== void 0 && (_.fixedFoveation = J);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(I);
    }, this.getCameraTexture = function(J) {
      return d[J];
    };
    let ze = null;
    function Je(J, re) {
      if (f = re.getViewerPose(c || s), x = re, f !== null) {
        const te = f.views;
        _ !== null && (e.setRenderTargetFramebuffer(M, _.framebuffer), e.setRenderTarget(M));
        let we = !1;
        te.length !== I.cameras.length && (I.cameras.length = 0, we = !0);
        for (let Fe = 0; Fe < te.length; Fe++) {
          const Xe = te[Fe];
          let Pe = null;
          if (_ !== null)
            Pe = _.getViewport(Xe);
          else {
            const st = p.getViewSubImage(u, Xe);
            Pe = st.viewport, Fe === 0 && (e.setRenderTargetTextures(
              M,
              st.colorTexture,
              st.depthStencilTexture
            ), e.setRenderTarget(M));
          }
          let Ve = P[Fe];
          Ve === void 0 && (Ve = new kt(), Ve.layers.enable(Fe), Ve.viewport = new ct(), P[Fe] = Ve), Ve.matrix.fromArray(Xe.transform.matrix), Ve.matrix.decompose(Ve.position, Ve.quaternion, Ve.scale), Ve.projectionMatrix.fromArray(Xe.projectionMatrix), Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(), Ve.viewport.set(Pe.x, Pe.y, Pe.width, Pe.height), Fe === 0 && (I.matrix.copy(Ve.matrix), I.matrix.decompose(I.position, I.quaternion, I.scale)), we === !0 && I.cameras.push(Ve);
        }
        const Le = r.enabledFeatures;
        if (Le && Le.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && E) {
          p = n.getBinding();
          const Fe = p.getDepthInformation(te[0]);
          Fe && Fe.isValid && Fe.texture && m.init(Fe, r.renderState);
        }
        if (Le && Le.includes("camera-access") && E) {
          e.state.unbindTexture(), p = n.getBinding();
          for (let Fe = 0; Fe < te.length; Fe++) {
            const Xe = te[Fe].camera;
            if (Xe) {
              let Pe = d[Xe];
              Pe || (Pe = new Ja(), d[Xe] = Pe);
              const Ve = p.getCameraImage(Xe);
              Pe.sourceTexture = Ve;
            }
          }
        }
      }
      for (let te = 0; te < y.length; te++) {
        const we = T[te], Le = y[te];
        we !== null && Le !== void 0 && Le.update(we, re, c || s);
      }
      ze && ze(J, re), re.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: re }), x = null;
    }
    const He = new ns();
    He.setAnimationLoop(Je), this.setAnimationLoop = function(J) {
      ze = J;
    }, this.dispose = function() {
    };
  }
}
const md = /* @__PURE__ */ new mt(), cs = /* @__PURE__ */ new Ue();
cs.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function _d(i, e) {
  function t(m, d) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), d.value.copy(m.matrix);
  }
  function n(m, d) {
    d.color.getRGB(m.fogColor.value, Qa(i)), d.isFog ? (m.fogNear.value = d.near, m.fogFar.value = d.far) : d.isFogExp2 && (m.fogDensity.value = d.density);
  }
  function r(m, d, A, R, M) {
    d.isNodeMaterial ? d.uniformsNeedUpdate = !1 : d.isMeshBasicMaterial ? a(m, d) : d.isMeshLambertMaterial ? (a(m, d), d.envMap && (m.envMapIntensity.value = d.envMapIntensity)) : d.isMeshToonMaterial ? (a(m, d), p(m, d)) : d.isMeshPhongMaterial ? (a(m, d), f(m, d), d.envMap && (m.envMapIntensity.value = d.envMapIntensity)) : d.isMeshStandardMaterial ? (a(m, d), u(m, d), d.isMeshPhysicalMaterial && _(m, d, M)) : d.isMeshMatcapMaterial ? (a(m, d), x(m, d)) : d.isMeshDepthMaterial ? a(m, d) : d.isMeshDistanceMaterial ? (a(m, d), E(m, d)) : d.isMeshNormalMaterial ? a(m, d) : d.isLineBasicMaterial ? (s(m, d), d.isLineDashedMaterial && o(m, d)) : d.isPointsMaterial ? l(m, d, A, R) : d.isSpriteMaterial ? c(m, d) : d.isShadowMaterial ? (m.color.value.copy(d.color), m.opacity.value = d.opacity) : d.isShaderMaterial && (d.uniformsNeedUpdate = !1);
  }
  function a(m, d) {
    m.opacity.value = d.opacity, d.color && m.diffuse.value.copy(d.color), d.emissive && m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity), d.map && (m.map.value = d.map, t(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, t(d.alphaMap, m.alphaMapTransform)), d.bumpMap && (m.bumpMap.value = d.bumpMap, t(d.bumpMap, m.bumpMapTransform), m.bumpScale.value = d.bumpScale, d.side === 1 && (m.bumpScale.value *= -1)), d.normalMap && (m.normalMap.value = d.normalMap, t(d.normalMap, m.normalMapTransform), m.normalScale.value.copy(d.normalScale), d.side === 1 && m.normalScale.value.negate()), d.displacementMap && (m.displacementMap.value = d.displacementMap, t(d.displacementMap, m.displacementMapTransform), m.displacementScale.value = d.displacementScale, m.displacementBias.value = d.displacementBias), d.emissiveMap && (m.emissiveMap.value = d.emissiveMap, t(d.emissiveMap, m.emissiveMapTransform)), d.specularMap && (m.specularMap.value = d.specularMap, t(d.specularMap, m.specularMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
    const A = e.get(d), R = A.envMap, M = A.envMapRotation;
    R && (m.envMap.value = R, m.envMapRotation.value.setFromMatrix4(md.makeRotationFromEuler(M)).transpose(), R.isCubeTexture && R.isRenderTargetTexture === !1 && m.envMapRotation.value.premultiply(cs), m.reflectivity.value = d.reflectivity, m.ior.value = d.ior, m.refractionRatio.value = d.refractionRatio), d.lightMap && (m.lightMap.value = d.lightMap, m.lightMapIntensity.value = d.lightMapIntensity, t(d.lightMap, m.lightMapTransform)), d.aoMap && (m.aoMap.value = d.aoMap, m.aoMapIntensity.value = d.aoMapIntensity, t(d.aoMap, m.aoMapTransform));
  }
  function s(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, d.map && (m.map.value = d.map, t(d.map, m.mapTransform));
  }
  function o(m, d) {
    m.dashSize.value = d.dashSize, m.totalSize.value = d.dashSize + d.gapSize, m.scale.value = d.scale;
  }
  function l(m, d, A, R) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.size.value = d.size * A, m.scale.value = R * 0.5, d.map && (m.map.value = d.map, t(d.map, m.uvTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, t(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function c(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.rotation.value = d.rotation, d.map && (m.map.value = d.map, t(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, t(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function f(m, d) {
    m.specular.value.copy(d.specular), m.shininess.value = Math.max(d.shininess, 1e-4);
  }
  function p(m, d) {
    d.gradientMap && (m.gradientMap.value = d.gradientMap);
  }
  function u(m, d) {
    m.metalness.value = d.metalness, d.metalnessMap && (m.metalnessMap.value = d.metalnessMap, t(d.metalnessMap, m.metalnessMapTransform)), m.roughness.value = d.roughness, d.roughnessMap && (m.roughnessMap.value = d.roughnessMap, t(d.roughnessMap, m.roughnessMapTransform)), d.envMap && (m.envMapIntensity.value = d.envMapIntensity);
  }
  function _(m, d, A) {
    m.ior.value = d.ior, d.sheen > 0 && (m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen), m.sheenRoughness.value = d.sheenRoughness, d.sheenColorMap && (m.sheenColorMap.value = d.sheenColorMap, t(d.sheenColorMap, m.sheenColorMapTransform)), d.sheenRoughnessMap && (m.sheenRoughnessMap.value = d.sheenRoughnessMap, t(d.sheenRoughnessMap, m.sheenRoughnessMapTransform))), d.clearcoat > 0 && (m.clearcoat.value = d.clearcoat, m.clearcoatRoughness.value = d.clearcoatRoughness, d.clearcoatMap && (m.clearcoatMap.value = d.clearcoatMap, t(d.clearcoatMap, m.clearcoatMapTransform)), d.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap, t(d.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), d.clearcoatNormalMap && (m.clearcoatNormalMap.value = d.clearcoatNormalMap, t(d.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale), d.side === 1 && m.clearcoatNormalScale.value.negate())), d.dispersion > 0 && (m.dispersion.value = d.dispersion), d.iridescence > 0 && (m.iridescence.value = d.iridescence, m.iridescenceIOR.value = d.iridescenceIOR, m.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1], d.iridescenceMap && (m.iridescenceMap.value = d.iridescenceMap, t(d.iridescenceMap, m.iridescenceMapTransform)), d.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = d.iridescenceThicknessMap, t(d.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), d.transmission > 0 && (m.transmission.value = d.transmission, m.transmissionSamplerMap.value = A.texture, m.transmissionSamplerSize.value.set(A.width, A.height), d.transmissionMap && (m.transmissionMap.value = d.transmissionMap, t(d.transmissionMap, m.transmissionMapTransform)), m.thickness.value = d.thickness, d.thicknessMap && (m.thicknessMap.value = d.thicknessMap, t(d.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = d.attenuationDistance, m.attenuationColor.value.copy(d.attenuationColor)), d.anisotropy > 0 && (m.anisotropyVector.value.set(d.anisotropy * Math.cos(d.anisotropyRotation), d.anisotropy * Math.sin(d.anisotropyRotation)), d.anisotropyMap && (m.anisotropyMap.value = d.anisotropyMap, t(d.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = d.specularIntensity, m.specularColor.value.copy(d.specularColor), d.specularColorMap && (m.specularColorMap.value = d.specularColorMap, t(d.specularColorMap, m.specularColorMapTransform)), d.specularIntensityMap && (m.specularIntensityMap.value = d.specularIntensityMap, t(d.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function x(m, d) {
    d.matcap && (m.matcap.value = d.matcap);
  }
  function E(m, d) {
    const A = e.get(d).light;
    m.referencePosition.value.setFromMatrixPosition(A.matrixWorld), m.nearDistance.value = A.shadow.camera.near, m.farDistance.value = A.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function gd(i, e, t, n) {
  let r = {}, a = {}, s = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(M, y) {
    const T = y.program;
    n.uniformBlockBinding(M, T);
  }
  function c(M, y) {
    let T = r[M.id];
    T === void 0 && (m(M), T = f(M), r[M.id] = T, M.addEventListener("dispose", A));
    const C = y.program;
    n.updateUBOMapping(M, C);
    const g = e.render.frame;
    a[M.id] !== g && (u(M), a[M.id] = g);
  }
  function f(M) {
    const y = p();
    M.__bindingPointIndex = y;
    const T = i.createBuffer(), C = M.__size, g = M.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, T), i.bufferData(i.UNIFORM_BUFFER, C, g), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, y, T), T;
  }
  function p() {
    for (let M = 0; M < o; M++)
      if (s.indexOf(M) === -1)
        return s.push(M), M;
    return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function u(M) {
    const y = r[M.id], T = M.uniforms, C = M.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, y);
    for (let g = 0, b = T.length; g < b; g++) {
      const F = T[g];
      if (Array.isArray(F))
        for (let P = 0, I = F.length; P < I; P++)
          _(F[P], g, P, C);
      else
        _(F, g, 0, C);
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function _(M, y, T, C) {
    if (E(M, y, T, C) === !0) {
      const g = M.__offset, b = M.value;
      if (Array.isArray(b)) {
        let F = 0;
        for (let P = 0; P < b.length; P++) {
          const I = b[P], $ = d(I);
          x(I, M.__data, F), typeof I != "number" && typeof I != "boolean" && !I.isMatrix3 && !ArrayBuffer.isView(I) && (F += $.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else
        x(b, M.__data, 0);
      i.bufferSubData(i.UNIFORM_BUFFER, g, M.__data);
    }
  }
  function x(M, y, T) {
    typeof M == "number" || typeof M == "boolean" ? y[0] = M : M.isMatrix3 ? (y[0] = M.elements[0], y[1] = M.elements[1], y[2] = M.elements[2], y[3] = 0, y[4] = M.elements[3], y[5] = M.elements[4], y[6] = M.elements[5], y[7] = 0, y[8] = M.elements[6], y[9] = M.elements[7], y[10] = M.elements[8], y[11] = 0) : ArrayBuffer.isView(M) ? y.set(new M.constructor(M.buffer, M.byteOffset, y.length)) : M.toArray(y, T);
  }
  function E(M, y, T, C) {
    const g = M.value, b = y + "_" + T;
    if (C[b] === void 0)
      return typeof g == "number" || typeof g == "boolean" ? C[b] = g : ArrayBuffer.isView(g) ? C[b] = g.slice() : C[b] = g.clone(), !0;
    {
      const F = C[b];
      if (typeof g == "number" || typeof g == "boolean") {
        if (F !== g)
          return C[b] = g, !0;
      } else {
        if (ArrayBuffer.isView(g))
          return !0;
        if (F.equals(g) === !1)
          return F.copy(g), !0;
      }
    }
    return !1;
  }
  function m(M) {
    const y = M.uniforms;
    let T = 0;
    const C = 16;
    for (let b = 0, F = y.length; b < F; b++) {
      const P = Array.isArray(y[b]) ? y[b] : [y[b]];
      for (let I = 0, $ = P.length; I < $; I++) {
        const Y = P[I], B = Array.isArray(Y.value) ? Y.value : [Y.value];
        for (let k = 0, H = B.length; k < H; k++) {
          const Q = B[k], ee = d(Q), ie = T % C, se = ie % ee.boundary, ge = ie + se;
          T += se, ge !== 0 && C - ge < ee.storage && (T += C - ge), Y.__data = new Float32Array(ee.storage / Float32Array.BYTES_PER_ELEMENT), Y.__offset = T, T += ee.storage;
        }
      }
    }
    const g = T % C;
    return g > 0 && (T += C - g), M.__size = T, M.__cache = {}, this;
  }
  function d(M) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof M == "number" || typeof M == "boolean" ? (y.boundary = 4, y.storage = 4) : M.isVector2 ? (y.boundary = 8, y.storage = 8) : M.isVector3 || M.isColor ? (y.boundary = 16, y.storage = 12) : M.isVector4 ? (y.boundary = 16, y.storage = 16) : M.isMatrix3 ? (y.boundary = 48, y.storage = 48) : M.isMatrix4 ? (y.boundary = 64, y.storage = 64) : M.isTexture ? De("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(M) ? (y.boundary = 16, y.storage = M.byteLength) : De("WebGLRenderer: Unsupported uniform value type.", M), y;
  }
  function A(M) {
    const y = M.target;
    y.removeEventListener("dispose", A);
    const T = s.indexOf(y.__bindingPointIndex);
    s.splice(T, 1), i.deleteBuffer(r[y.id]), delete r[y.id], delete a[y.id];
  }
  function R() {
    for (const M in r)
      i.deleteBuffer(r[M]);
    s = [], r = {}, a = {};
  }
  return {
    bind: l,
    update: c,
    dispose: R
  };
}
const xd = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);
let Kt = null;
function vd() {
  return Kt === null && (Kt = new ao(xd, 16, 16, 1030, 1016), Kt.name = "DFG_LUT", Kt.minFilter = 1006, Kt.magFilter = 1006, Kt.wrapS = 1001, Kt.wrapT = 1001, Kt.generateMipmaps = !1, Kt.needsUpdate = !0), Kt;
}
class Md {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(e = {}) {
    const {
      canvas: t = vs(),
      context: n = null,
      depth: r = !0,
      stencil: a = !1,
      alpha: s = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: f = "default",
      failIfMajorPerformanceCaveat: p = !1,
      reversedDepthBuffer: u = !1,
      outputBufferType: _ = 1009
    } = e;
    this.isWebGLRenderer = !0;
    let x;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      x = n.getContextAttributes().alpha;
    } else
      x = s;
    const E = _, m = /* @__PURE__ */ new Set([
      1033,
      1031,
      1029
    ]), d = /* @__PURE__ */ new Set([
      1009,
      1014,
      1012,
      1020,
      1017,
      1018
    ]), A = new Uint32Array(4), R = new Int32Array(4), M = new N();
    let y = null, T = null;
    const C = [], g = [];
    let b = null;
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled.
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const F = this;
    let P = !1, I = null, $ = null, Y = null, B = null;
    this._outputColorSpace = wt;
    let k = 0, H = 0, Q = null, ee = -1, ie = null;
    const se = new ct(), ge = new ct();
    let ze = null;
    const Je = new Ze(0);
    let He = 0, J = t.width, re = t.height, te = 1, we = null, Le = null;
    const Re = new ct(0, 0, J, re), nt = new ct(0, 0, J, re);
    let Fe = !1;
    const Xe = new Za();
    let Pe = !1, Ve = !1;
    const st = new mt(), ut = new N(), _t = new ct(), ft = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let je = !1;
    function it() {
      return Q === null ? te : 1;
    }
    let D = n;
    function ot(v, L) {
      return t.getContext(v, L);
    }
    try {
      const v = {
        alpha: !0,
        depth: r,
        stencil: a,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: f,
        failIfMajorPerformanceCaveat: p
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r185"), t.addEventListener("webglcontextlost", de, !1), t.addEventListener("webglcontextrestored", Me, !1), t.addEventListener("webglcontextcreationerror", at, !1), D === null) {
        const L = "webgl2";
        if (D = ot(L, v), D === null)
          throw ot(L) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (v) {
      throw Ye("WebGLRenderer: " + v.message), v;
    }
    let Be, S, h, U, z, W, ne, ce, X, K, oe, Se, ue, fe, ye, Ce, Ie, w, ae, Z, le, he, j;
    function Ee() {
      Be = new xu(D), Be.init(), le = new ud(D, Be), S = new uu(D, Be, e, le), h = new ld(D, Be), S.reversedDepthBuffer && u && h.buffers.depth.setReversed(!0), $ = D.createFramebuffer(), Y = D.createFramebuffer(), B = D.createFramebuffer(), U = new Su(D), z = new Kf(), W = new cd(D, Be, h, z, S, le, U), ne = new gu(F), ce = new yo(D), he = new lu(D, ce), X = new vu(D, ce, U, he), K = new Tu(D, X, ce, he, U), w = new Eu(D, S, W), ye = new fu(z), oe = new Yf(F, ne, Be, S, he, ye), Se = new _d(F, z), ue = new $f(), fe = new nd(Be), Ie = new ou(F, ne, h, K, x, l), Ce = new od(F, K, S), j = new gd(D, U, S, h), ae = new cu(D, Be, U), Z = new Mu(D, Be, U), U.programs = oe.programs, F.capabilities = S, F.extensions = Be, F.properties = z, F.renderLists = ue, F.shadowMap = Ce, F.state = h, F.info = U;
    }
    Ee(), E !== 1009 && (b = new yu(E, t.width, t.height, o, r, a));
    const q = new pd(F, D);
    this.xr = q, this.getContext = function() {
      return D;
    }, this.getContextAttributes = function() {
      return D.getContextAttributes();
    }, this.forceContextLoss = function() {
      const v = Be.get("WEBGL_lose_context");
      v && v.loseContext();
    }, this.forceContextRestore = function() {
      const v = Be.get("WEBGL_lose_context");
      v && v.restoreContext();
    }, this.getPixelRatio = function() {
      return te;
    }, this.setPixelRatio = function(v) {
      v !== void 0 && (te = v, this.setSize(J, re, !1));
    }, this.getSize = function(v) {
      return v.set(J, re);
    }, this.setSize = function(v, L, V = !0) {
      if (q.isPresenting) {
        De("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      J = v, re = L, t.width = Math.floor(v * te), t.height = Math.floor(L * te), V === !0 && (t.style.width = v + "px", t.style.height = L + "px"), b !== null && b.setSize(t.width, t.height), this.setViewport(0, 0, v, L);
    }, this.getDrawingBufferSize = function(v) {
      return v.set(J * te, re * te).floor();
    }, this.setDrawingBufferSize = function(v, L, V) {
      J = v, re = L, te = V, t.width = Math.floor(v * V), t.height = Math.floor(L * V), this.setViewport(0, 0, v, L);
    }, this.setEffects = function(v) {
      if (E === 1009) {
        Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (v) {
        for (let L = 0; L < v.length; L++)
          if (v[L].isOutputPass === !0) {
            De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
            break;
          }
      }
      b.setEffects(v || []);
    }, this.getCurrentViewport = function(v) {
      return v.copy(se);
    }, this.getViewport = function(v) {
      return v.copy(Re);
    }, this.setViewport = function(v, L, V, O) {
      v.isVector4 ? Re.set(v.x, v.y, v.z, v.w) : Re.set(v, L, V, O), h.viewport(se.copy(Re).multiplyScalar(te).round());
    }, this.getScissor = function(v) {
      return v.copy(nt);
    }, this.setScissor = function(v, L, V, O) {
      v.isVector4 ? nt.set(v.x, v.y, v.z, v.w) : nt.set(v, L, V, O), h.scissor(ge.copy(nt).multiplyScalar(te).round());
    }, this.getScissorTest = function() {
      return Fe;
    }, this.setScissorTest = function(v) {
      h.setScissorTest(Fe = v);
    }, this.setOpaqueSort = function(v) {
      we = v;
    }, this.setTransparentSort = function(v) {
      Le = v;
    }, this.getClearColor = function(v) {
      return v.copy(Ie.getClearColor());
    }, this.setClearColor = function() {
      Ie.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return Ie.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ie.setClearAlpha(...arguments);
    }, this.clear = function(v = !0, L = !0, V = !0) {
      let O = 0;
      if (v) {
        let G = !1;
        if (Q !== null) {
          const _e = Q.texture.format;
          G = m.has(_e);
        }
        if (G) {
          const _e = Q.texture.type, ve = d.has(_e), me = Ie.getClearColor(), Te = Ie.getClearAlpha(), be = me.r, Ne = me.g, Ge = me.b;
          ve ? (A[0] = be, A[1] = Ne, A[2] = Ge, A[3] = Te, D.clearBufferuiv(D.COLOR, 0, A)) : (R[0] = be, R[1] = Ne, R[2] = Ge, R[3] = Te, D.clearBufferiv(D.COLOR, 0, R));
        } else
          O |= D.COLOR_BUFFER_BIT;
      }
      L && (O |= D.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), V && (O |= D.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), O !== 0 && D.clear(O);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(v) {
      v.setRenderer(this), I = v;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", de, !1), t.removeEventListener("webglcontextrestored", Me, !1), t.removeEventListener("webglcontextcreationerror", at, !1), Ie.dispose(), ue.dispose(), fe.dispose(), z.dispose(), ne.dispose(), K.dispose(), he.dispose(), j.dispose(), oe.dispose(), q.dispose(), q.removeEventListener("sessionstart", Dr), q.removeEventListener("sessionend", Lr), _n.stop();
    };
    function de(v) {
      v.preventDefault(), Vr("WebGLRenderer: Context Lost."), P = !0;
    }
    function Me() {
      Vr("WebGLRenderer: Context Restored."), P = !1;
      const v = U.autoReset, L = Ce.enabled, V = Ce.autoUpdate, O = Ce.needsUpdate, G = Ce.type;
      Ee(), U.autoReset = v, Ce.enabled = L, Ce.autoUpdate = V, Ce.needsUpdate = O, Ce.type = G;
    }
    function at(v) {
      Ye("WebGLRenderer: A WebGL context could not be created. Reason: ", v.statusMessage);
    }
    function dt(v) {
      const L = v.target;
      L.removeEventListener("dispose", dt), Nt(L);
    }
    function Nt(v) {
      mn(v), z.remove(v);
    }
    function mn(v) {
      const L = z.get(v).programs;
      L !== void 0 && (L.forEach(function(V) {
        oe.releaseProgram(V);
      }), v.isShaderMaterial && oe.releaseShaderCache(v));
    }
    this.renderBufferDirect = function(v, L, V, O, G, _e) {
      L === null && (L = ft);
      const ve = G.isMesh && G.matrixWorld.determinantAffine() < 0, me = ms(v, L, V, O, G);
      h.setMaterial(O, ve);
      let Te = V.index, be = 1;
      if (O.wireframe === !0) {
        if (Te = X.getWireframeAttribute(V), Te === void 0) return;
        be = 2;
      }
      const Ne = V.drawRange, Ge = V.attributes.position;
      let Ae = Ne.start * be, Qe = (Ne.start + Ne.count) * be;
      _e !== null && (Ae = Math.max(Ae, _e.start * be), Qe = Math.min(Qe, (_e.start + _e.count) * be)), Te !== null ? (Ae = Math.max(Ae, 0), Qe = Math.min(Qe, Te.count)) : Ge != null && (Ae = Math.max(Ae, 0), Qe = Math.min(Qe, Ge.count));
      const ht = Qe - Ae;
      if (ht < 0 || ht === 1 / 0) return;
      he.setup(G, O, me, V, Te);
      let lt, et = ae;
      if (Te !== null && (lt = ce.get(Te), et = Z, et.setIndex(lt)), G.isMesh)
        O.wireframe === !0 ? (h.setLineWidth(O.wireframeLinewidth * it()), et.setMode(D.LINES)) : et.setMode(D.TRIANGLES);
      else if (G.isLine) {
        let Et = O.linewidth;
        Et === void 0 && (Et = 1), h.setLineWidth(Et * it()), G.isLineSegments ? et.setMode(D.LINES) : G.isLineLoop ? et.setMode(D.LINE_LOOP) : et.setMode(D.LINE_STRIP);
      } else G.isPoints ? et.setMode(D.POINTS) : G.isSprite && et.setMode(D.TRIANGLES);
      if (G.isBatchedMesh)
        if (Be.get("WEBGL_multi_draw"))
          et.renderMultiDraw(G._multiDrawStarts, G._multiDrawCounts, G._multiDrawCount);
        else {
          const Et = G._multiDrawStarts, xe = G._multiDrawCounts, Dt = G._multiDrawCount, qe = Te ? ce.get(Te).bytesPerElement : 1, Ot = z.get(O).currentProgram.getUniforms();
          for (let qt = 0; qt < Dt; qt++)
            Ot.setValue(D, "_gl_DrawID", qt), et.render(Et[qt] / qe, xe[qt]);
        }
      else if (G.isInstancedMesh)
        et.renderInstances(Ae, ht, G.count);
      else if (V.isInstancedBufferGeometry) {
        const Et = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0, xe = Math.min(V.instanceCount, Et);
        et.renderInstances(Ae, ht, xe);
      } else
        et.render(Ae, ht);
    };
    function rn(v, L, V) {
      v.transparent === !0 && v.side === 2 && v.forceSinglePass === !1 ? (v.side = 1, v.needsUpdate = !0, hi(v, L, V), v.side = 0, v.needsUpdate = !0, hi(v, L, V), v.side = 2) : hi(v, L, V);
    }
    this.compile = function(v, L, V = null) {
      V === null && (V = v), T = fe.get(V), T.init(L), g.push(T), V.traverseVisible(function(G) {
        G.isLight && G.layers.test(L.layers) && (T.pushLight(G), G.castShadow && T.pushShadow(G));
      }), v !== V && v.traverseVisible(function(G) {
        G.isLight && G.layers.test(L.layers) && (T.pushLight(G), G.castShadow && T.pushShadow(G));
      }), T.setupLights();
      const O = /* @__PURE__ */ new Set();
      return v.traverse(function(G) {
        if (!(G.isMesh || G.isPoints || G.isLine || G.isSprite))
          return;
        const _e = G.material;
        if (_e)
          if (Array.isArray(_e))
            for (let ve = 0; ve < _e.length; ve++) {
              const me = _e[ve];
              rn(me, V, G), O.add(me);
            }
          else
            rn(_e, V, G), O.add(_e);
      }), T = g.pop(), O;
    }, this.compileAsync = function(v, L, V = null) {
      const O = this.compile(v, L, V);
      return new Promise((G) => {
        function _e() {
          if (O.forEach(function(ve) {
            z.get(ve).currentProgram.isReady() && O.delete(ve);
          }), O.size === 0) {
            G(v);
            return;
          }
          setTimeout(_e, 10);
        }
        Be.get("KHR_parallel_shader_compile") !== null ? _e() : setTimeout(_e, 10);
      });
    };
    let gt = null;
    function $n(v) {
      gt && gt(v);
    }
    function Dr() {
      _n.stop();
    }
    function Lr() {
      _n.start();
    }
    const _n = new ns();
    _n.setAnimationLoop($n), typeof self < "u" && _n.setContext(self), this.setAnimationLoop = function(v) {
      gt = v, q.setAnimationLoop(v), v === null ? _n.stop() : _n.start();
    }, q.addEventListener("sessionstart", Dr), q.addEventListener("sessionend", Lr), this.render = function(v, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (P === !0) return;
      I !== null && I.renderStart(v, L);
      const V = q.enabled === !0 && q.isPresenting === !0, O = b !== null && (Q === null || V) && b.begin(F, Q);
      if (v.matrixWorldAutoUpdate === !0 && v.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), q.enabled === !0 && q.isPresenting === !0 && (b === null || b.isCompositing() === !1) && (q.cameraAutoUpdate === !0 && q.updateCamera(L), L = q.getCamera()), v.isScene === !0 && v.onBeforeRender(F, v, L, Q), T = fe.get(v, g.length), T.init(L), T.state.textureUnits = W.getTextureUnits(), g.push(T), st.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), Xe.setFromProjectionMatrix(st, 2e3, L.reversedDepth), Ve = this.localClippingEnabled, Pe = ye.init(this.clippingPlanes, Ve), y = ue.get(v, C.length), y.init(), C.push(y), q.enabled === !0 && q.isPresenting === !0) {
        const ve = F.xr.getDepthSensingMesh();
        ve !== null && qi(ve, L, -1 / 0, F.sortObjects);
      }
      qi(v, L, 0, F.sortObjects), y.finish(), F.sortObjects === !0 && y.sort(we, Le, L.reversedDepth), je = q.enabled === !1 || q.isPresenting === !1 || q.hasDepthSensing() === !1, je && Ie.addToRenderList(y, v), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), Pe === !0 && ye.beginShadows();
      const G = T.state.shadowsArray;
      if (Ce.render(G, v, L), Pe === !0 && ye.endShadows(), (O && b.hasRenderPass()) === !1) {
        const ve = y.opaque, me = y.transmissive;
        if (T.setupLights(), L.isArrayCamera) {
          const Te = L.cameras;
          if (me.length > 0)
            for (let be = 0, Ne = Te.length; be < Ne; be++) {
              const Ge = Te[be];
              Ir(ve, me, v, Ge);
            }
          je && Ie.render(v);
          for (let be = 0, Ne = Te.length; be < Ne; be++) {
            const Ge = Te[be];
            Fr(y, v, Ge, Ge.viewport);
          }
        } else
          me.length > 0 && Ir(ve, me, v, L), je && Ie.render(v), Fr(y, v, L);
      }
      Q !== null && H === 0 && (W.updateMultisampleRenderTarget(Q), W.updateRenderTargetMipmap(Q)), O && b.end(F), v.isScene === !0 && v.onAfterRender(F, v, L), he.resetDefaultState(), ee = -1, ie = null, g.pop(), g.length > 0 ? (T = g[g.length - 1], W.setTextureUnits(T.state.textureUnits), Pe === !0 && ye.setGlobalState(F.clippingPlanes, T.state.camera)) : T = null, C.pop(), C.length > 0 ? y = C[C.length - 1] : y = null, I !== null && I.renderEnd();
    };
    function qi(v, L, V, O) {
      if (v.visible === !1) return;
      if (v.layers.test(L.layers)) {
        if (v.isGroup)
          V = v.renderOrder;
        else if (v.isLOD)
          v.autoUpdate === !0 && v.update(L);
        else if (v.isLightProbeGrid)
          T.pushLightProbeGrid(v);
        else if (v.isLight)
          T.pushLight(v), v.castShadow && T.pushShadow(v);
        else if (v.isSprite) {
          if (!v.frustumCulled || Xe.intersectsSprite(v)) {
            O && _t.setFromMatrixPosition(v.matrixWorld).applyMatrix4(st);
            const ve = K.update(v), me = v.material;
            me.visible && y.push(v, ve, me, V, _t.z, null);
          }
        } else if ((v.isMesh || v.isLine || v.isPoints) && (!v.frustumCulled || Xe.intersectsObject(v))) {
          const ve = K.update(v), me = v.material;
          if (O && (v.boundingSphere !== void 0 ? (v.boundingSphere === null && v.computeBoundingSphere(), _t.copy(v.boundingSphere.center)) : (ve.boundingSphere === null && ve.computeBoundingSphere(), _t.copy(ve.boundingSphere.center)), _t.applyMatrix4(v.matrixWorld).applyMatrix4(st)), Array.isArray(me)) {
            const Te = ve.groups;
            for (let be = 0, Ne = Te.length; be < Ne; be++) {
              const Ge = Te[be], Ae = me[Ge.materialIndex];
              Ae && Ae.visible && y.push(v, ve, Ae, V, _t.z, Ge);
            }
          } else me.visible && y.push(v, ve, me, V, _t.z, null);
        }
      }
      const _e = v.children;
      for (let ve = 0, me = _e.length; ve < me; ve++)
        qi(_e[ve], L, V, O);
    }
    function Fr(v, L, V, O) {
      const { opaque: G, transmissive: _e, transparent: ve } = v;
      T.setupLightsView(V), Pe === !0 && ye.setGlobalState(F.clippingPlanes, V), O && h.viewport(se.copy(O)), G.length > 0 && di(G, L, V), _e.length > 0 && di(_e, L, V), ve.length > 0 && di(ve, L, V), h.buffers.depth.setTest(!0), h.buffers.depth.setMask(!0), h.buffers.color.setMask(!0), h.setPolygonOffset(!1);
    }
    function Ir(v, L, V, O) {
      if ((V.isScene === !0 ? V.overrideMaterial : null) !== null)
        return;
      if (T.state.transmissionRenderTarget[O.id] === void 0) {
        const Ae = Be.has("EXT_color_buffer_half_float") || Be.has("EXT_color_buffer_float");
        T.state.transmissionRenderTarget[O.id] = new Gt(1, 1, {
          generateMipmaps: !0,
          type: Ae ? 1016 : 1009,
          minFilter: 1008,
          samples: Math.max(4, S.samples),
          // to avoid feedback loops, the transmission render target requires a resolve, see #26177
          stencilBuffer: a,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: ke.workingColorSpace
        });
      }
      const _e = T.state.transmissionRenderTarget[O.id], ve = O.viewport || se;
      _e.setSize(ve.z * F.transmissionResolutionScale, ve.w * F.transmissionResolutionScale);
      const me = F.getRenderTarget(), Te = F.getActiveCubeFace(), be = F.getActiveMipmapLevel();
      F.setRenderTarget(_e), F.getClearColor(Je), He = F.getClearAlpha(), He < 1 && F.setClearColor(16777215, 0.5), F.clear(), je && Ie.render(V);
      const Ne = F.toneMapping;
      F.toneMapping = 0;
      const Ge = O.viewport;
      if (O.viewport !== void 0 && (O.viewport = void 0), T.setupLightsView(O), Pe === !0 && ye.setGlobalState(F.clippingPlanes, O), di(v, V, O), W.updateMultisampleRenderTarget(_e), W.updateRenderTargetMipmap(_e), Be.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ae = !1;
        for (let Qe = 0, ht = L.length; Qe < ht; Qe++) {
          const lt = L[Qe], { object: et, geometry: Et, material: xe, group: Dt } = lt;
          if (xe.side === 2 && et.layers.test(O.layers)) {
            const qe = xe.side;
            xe.side = 1, xe.needsUpdate = !0, Ur(et, V, O, Et, xe, Dt), xe.side = qe, xe.needsUpdate = !0, Ae = !0;
          }
        }
        Ae === !0 && (W.updateMultisampleRenderTarget(_e), W.updateRenderTargetMipmap(_e));
      }
      F.setRenderTarget(me, Te, be), F.setClearColor(Je, He), Ge !== void 0 && (O.viewport = Ge), F.toneMapping = Ne;
    }
    function di(v, L, V) {
      const O = L.isScene === !0 ? L.overrideMaterial : null;
      for (let G = 0, _e = v.length; G < _e; G++) {
        const ve = v[G], { object: me, geometry: Te, group: be } = ve;
        let Ne = ve.material;
        Ne.allowOverride === !0 && O !== null && (Ne = O), me.layers.test(V.layers) && Ur(me, L, V, Te, Ne, be);
      }
    }
    function Ur(v, L, V, O, G, _e) {
      v.onBeforeRender(F, L, V, O, G, _e), v.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, v.matrixWorld), v.normalMatrix.getNormalMatrix(v.modelViewMatrix), G.onBeforeRender(F, L, V, O, v, _e), G.transparent === !0 && G.side === 2 && G.forceSinglePass === !1 ? (G.side = 1, G.needsUpdate = !0, F.renderBufferDirect(V, L, O, G, v, _e), G.side = 0, G.needsUpdate = !0, F.renderBufferDirect(V, L, O, G, v, _e), G.side = 2) : F.renderBufferDirect(V, L, O, G, v, _e), v.onAfterRender(F, L, V, O, G, _e);
    }
    function hi(v, L, V) {
      L.isScene !== !0 && (L = ft);
      const O = z.get(v), G = T.state.lights, _e = T.state.shadowsArray, ve = G.state.version, me = oe.getParameters(v, G.state, _e, L, V, T.state.lightProbeGridArray), Te = oe.getProgramCacheKey(me);
      let be = O.programs;
      O.environment = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? L.environment : null, O.fog = L.fog;
      const Ne = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap;
      O.envMap = ne.get(v.envMap || O.environment, Ne), O.envMapRotation = O.environment !== null && v.envMap === null ? L.environmentRotation : v.envMapRotation, be === void 0 && (v.addEventListener("dispose", dt), be = /* @__PURE__ */ new Map(), O.programs = be);
      let Ge = be.get(Te);
      if (Ge !== void 0) {
        if (O.currentProgram === Ge && O.lightsStateVersion === ve)
          return Or(v, me), Ge;
      } else
        me.uniforms = oe.getUniforms(v), I !== null && v.isNodeMaterial && I.build(v, V, me), v.onBeforeCompile(me, F), Ge = oe.acquireProgram(me, Te), be.set(Te, Ge), O.uniforms = me.uniforms;
      const Ae = O.uniforms;
      return (!v.isShaderMaterial && !v.isRawShaderMaterial || v.clipping === !0) && (Ae.clippingPlanes = ye.uniform), Or(v, me), O.needsLights = gs(v), O.lightsStateVersion = ve, O.needsLights && (Ae.ambientLightColor.value = G.state.ambient, Ae.lightProbe.value = G.state.probe, Ae.directionalLights.value = G.state.directional, Ae.directionalLightShadows.value = G.state.directionalShadow, Ae.spotLights.value = G.state.spot, Ae.spotLightShadows.value = G.state.spotShadow, Ae.rectAreaLights.value = G.state.rectArea, Ae.ltc_1.value = G.state.rectAreaLTC1, Ae.ltc_2.value = G.state.rectAreaLTC2, Ae.pointLights.value = G.state.point, Ae.pointLightShadows.value = G.state.pointShadow, Ae.hemisphereLights.value = G.state.hemi, Ae.directionalShadowMatrix.value = G.state.directionalShadowMatrix, Ae.spotLightMatrix.value = G.state.spotLightMatrix, Ae.spotLightMap.value = G.state.spotLightMap, Ae.pointShadowMatrix.value = G.state.pointShadowMatrix), O.lightProbeGrid = T.state.lightProbeGridArray.length > 0, O.currentProgram = Ge, O.uniformsList = null, Ge;
    }
    function Nr(v) {
      if (v.uniformsList === null) {
        const L = v.currentProgram.getUniforms();
        v.uniformsList = Bi.seqWithValue(L.seq, v.uniforms);
      }
      return v.uniformsList;
    }
    function Or(v, L) {
      const V = z.get(v);
      V.outputColorSpace = L.outputColorSpace, V.batching = L.batching, V.batchingColor = L.batchingColor, V.instancing = L.instancing, V.instancingColor = L.instancingColor, V.instancingMorph = L.instancingMorph, V.skinning = L.skinning, V.morphTargets = L.morphTargets, V.morphNormals = L.morphNormals, V.morphColors = L.morphColors, V.morphTargetsCount = L.morphTargetsCount, V.numClippingPlanes = L.numClippingPlanes, V.numIntersection = L.numClipIntersection, V.vertexAlphas = L.vertexAlphas, V.vertexTangents = L.vertexTangents, V.toneMapping = L.toneMapping;
    }
    function ps(v, L) {
      if (v.length === 0) return null;
      if (v.length === 1)
        return v[0].texture !== null ? v[0] : null;
      M.setFromMatrixPosition(L.matrixWorld);
      for (let V = 0, O = v.length; V < O; V++) {
        const G = v[V];
        if (G.texture !== null && G.boundingBox.containsPoint(M)) return G;
      }
      return null;
    }
    function ms(v, L, V, O, G) {
      L.isScene !== !0 && (L = ft), W.resetTextureUnits();
      const _e = L.fog, ve = O.isMeshStandardMaterial || O.isMeshLambertMaterial || O.isMeshPhongMaterial ? L.environment : null, me = Q === null ? F.outputColorSpace : Q.isXRRenderTarget === !0 ? Q.texture.colorSpace : ke.workingColorSpace, Te = O.isMeshStandardMaterial || O.isMeshLambertMaterial && !O.envMap || O.isMeshPhongMaterial && !O.envMap, be = ne.get(O.envMap || ve, Te), Ne = O.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4, Ge = !!V.attributes.tangent && (!!O.normalMap || O.anisotropy > 0), Ae = !!V.morphAttributes.position, Qe = !!V.morphAttributes.normal, ht = !!V.morphAttributes.color;
      let lt = 0;
      O.toneMapped && (Q === null || Q.isXRRenderTarget === !0) && (lt = F.toneMapping);
      const et = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color, Et = et !== void 0 ? et.length : 0, xe = z.get(O), Dt = T.state.lights;
      if (Pe === !0 && (Ve === !0 || v !== ie)) {
        const rt = v === ie && O.id === ee;
        ye.setState(O, v, rt);
      }
      let qe = !1;
      O.version === xe.__version ? (xe.needsLights && xe.lightsStateVersion !== Dt.state.version || xe.outputColorSpace !== me || G.isBatchedMesh && xe.batching === !1 || !G.isBatchedMesh && xe.batching === !0 || G.isBatchedMesh && xe.batchingColor === !0 && G.colorTexture === null || G.isBatchedMesh && xe.batchingColor === !1 && G.colorTexture !== null || G.isInstancedMesh && xe.instancing === !1 || !G.isInstancedMesh && xe.instancing === !0 || G.isSkinnedMesh && xe.skinning === !1 || !G.isSkinnedMesh && xe.skinning === !0 || G.isInstancedMesh && xe.instancingColor === !0 && G.instanceColor === null || G.isInstancedMesh && xe.instancingColor === !1 && G.instanceColor !== null || G.isInstancedMesh && xe.instancingMorph === !0 && G.morphTexture === null || G.isInstancedMesh && xe.instancingMorph === !1 && G.morphTexture !== null || xe.envMap !== be || O.fog === !0 && xe.fog !== _e || xe.numClippingPlanes !== void 0 && (xe.numClippingPlanes !== ye.numPlanes || xe.numIntersection !== ye.numIntersection) || xe.vertexAlphas !== Ne || xe.vertexTangents !== Ge || xe.morphTargets !== Ae || xe.morphNormals !== Qe || xe.morphColors !== ht || xe.toneMapping !== lt || xe.morphTargetsCount !== Et || !!xe.lightProbeGrid != T.state.lightProbeGridArray.length > 0) && (qe = !0) : (qe = !0, xe.__version = O.version);
      let Ot = xe.currentProgram;
      qe === !0 && (Ot = hi(O, L, G), I && O.isNodeMaterial && I.onUpdateProgram(O, Ot, xe));
      let qt = !1, an = !1, yn = !1;
      const tt = Ot.getUniforms(), pt = xe.uniforms;
      if (h.useProgram(Ot.program) && (qt = !0, an = !0, yn = !0), O.id !== ee && (ee = O.id, an = !0), xe.needsLights) {
        const rt = ps(T.state.lightProbeGridArray, G);
        xe.lightProbeGrid !== rt && (xe.lightProbeGrid = rt, an = !0);
      }
      if (qt || ie !== v) {
        h.buffers.depth.getReversed() && v.reversedDepth !== !0 && (v._reversedDepth = !0, v.updateProjectionMatrix()), tt.setValue(D, "projectionMatrix", v.projectionMatrix), tt.setValue(D, "viewMatrix", v.matrixWorldInverse);
        const on = tt.map.cameraPosition;
        on !== void 0 && on.setValue(D, ut.setFromMatrixPosition(v.matrixWorld)), S.logarithmicDepthBuffer && tt.setValue(
          D,
          "logDepthBufFC",
          2 / (Math.log(v.far + 1) / Math.LN2)
        ), (O.isMeshPhongMaterial || O.isMeshToonMaterial || O.isMeshLambertMaterial || O.isMeshBasicMaterial || O.isMeshStandardMaterial || O.isShaderMaterial) && tt.setValue(D, "isOrthographic", v.isOrthographicCamera === !0), ie !== v && (ie = v, an = !0, yn = !0);
      }
      if (xe.needsLights && (Dt.state.directionalShadowMap.length > 0 && tt.setValue(D, "directionalShadowMap", Dt.state.directionalShadowMap, W), Dt.state.spotShadowMap.length > 0 && tt.setValue(D, "spotShadowMap", Dt.state.spotShadowMap, W), Dt.state.pointShadowMap.length > 0 && tt.setValue(D, "pointShadowMap", Dt.state.pointShadowMap, W)), G.isSkinnedMesh) {
        tt.setOptional(D, G, "bindMatrix"), tt.setOptional(D, G, "bindMatrixInverse");
        const rt = G.skeleton;
        rt && (rt.boneTexture === null && rt.computeBoneTexture(), tt.setValue(D, "boneTexture", rt.boneTexture, W));
      }
      G.isBatchedMesh && (tt.setOptional(D, G, "batchingTexture"), tt.setValue(D, "batchingTexture", G._matricesTexture, W), tt.setOptional(D, G, "batchingIdTexture"), tt.setValue(D, "batchingIdTexture", G._indirectTexture, W), tt.setOptional(D, G, "batchingColorTexture"), G._colorsTexture !== null && tt.setValue(D, "batchingColorTexture", G._colorsTexture, W));
      const sn = V.morphAttributes;
      if ((sn.position !== void 0 || sn.normal !== void 0 || sn.color !== void 0) && w.update(G, V, Ot), (an || xe.receiveShadow !== G.receiveShadow) && (xe.receiveShadow = G.receiveShadow, tt.setValue(D, "receiveShadow", G.receiveShadow)), (O.isMeshStandardMaterial || O.isMeshLambertMaterial || O.isMeshPhongMaterial) && O.envMap === null && L.environment !== null && (pt.envMapIntensity.value = L.environmentIntensity), pt.dfgLUT !== void 0 && (pt.dfgLUT.value = vd()), an) {
        if (tt.setValue(D, "toneMappingExposure", F.toneMappingExposure), xe.needsLights && _s(pt, yn), _e && O.fog === !0 && Se.refreshFogUniforms(pt, _e), Se.refreshMaterialUniforms(pt, O, te, re, T.state.transmissionRenderTarget[v.id]), xe.needsLights && xe.lightProbeGrid) {
          const rt = xe.lightProbeGrid;
          pt.probesSH.value = rt.texture, pt.probesMin.value.copy(rt.boundingBox.min), pt.probesMax.value.copy(rt.boundingBox.max), pt.probesResolution.value.copy(rt.resolution);
        }
        Bi.upload(D, Nr(xe), pt, W);
      }
      if (O.isShaderMaterial && O.uniformsNeedUpdate === !0 && (Bi.upload(D, Nr(xe), pt, W), O.uniformsNeedUpdate = !1), O.isSpriteMaterial && tt.setValue(D, "center", G.center), tt.setValue(D, "modelViewMatrix", G.modelViewMatrix), tt.setValue(D, "normalMatrix", G.normalMatrix), tt.setValue(D, "modelMatrix", G.matrixWorld), O.uniformsGroups !== void 0) {
        const rt = O.uniformsGroups;
        for (let on = 0, An = rt.length; on < An; on++) {
          const Br = rt[on];
          j.update(Br, Ot), j.bind(Br, Ot);
        }
      }
      return Ot;
    }
    function _s(v, L) {
      v.ambientLightColor.needsUpdate = L, v.lightProbe.needsUpdate = L, v.directionalLights.needsUpdate = L, v.directionalLightShadows.needsUpdate = L, v.pointLights.needsUpdate = L, v.pointLightShadows.needsUpdate = L, v.spotLights.needsUpdate = L, v.spotLightShadows.needsUpdate = L, v.rectAreaLights.needsUpdate = L, v.hemisphereLights.needsUpdate = L;
    }
    function gs(v) {
      return v.isMeshLambertMaterial || v.isMeshToonMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isShadowMaterial || v.isShaderMaterial && v.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return k;
    }, this.getActiveMipmapLevel = function() {
      return H;
    }, this.getRenderTarget = function() {
      return Q;
    }, this.setRenderTargetTextures = function(v, L, V) {
      const O = z.get(v);
      O.__autoAllocateDepthBuffer = v.resolveDepthBuffer === !1, O.__autoAllocateDepthBuffer === !1 && (O.__useRenderToTexture = !1), z.get(v.texture).__webglTexture = L, z.get(v.depthTexture).__webglTexture = O.__autoAllocateDepthBuffer ? void 0 : V, O.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(v, L) {
      const V = z.get(v);
      V.__webglFramebuffer = L, V.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(v, L = 0, V = 0) {
      Q = v, k = L, H = V;
      let O = null, G = !1, _e = !1;
      if (v) {
        const me = z.get(v);
        if (me.__useDefaultFramebuffer !== void 0) {
          h.bindFramebuffer(D.FRAMEBUFFER, me.__webglFramebuffer), se.copy(v.viewport), ge.copy(v.scissor), ze = v.scissorTest, h.viewport(se), h.scissor(ge), h.setScissorTest(ze), ee = -1;
          return;
        } else if (me.__webglFramebuffer === void 0)
          W.setupRenderTarget(v);
        else if (me.__hasExternalTextures)
          W.rebindTextures(v, z.get(v.texture).__webglTexture, z.get(v.depthTexture).__webglTexture);
        else if (v.depthBuffer) {
          const Ne = v.depthTexture;
          if (me.__boundDepthTexture !== Ne) {
            if (Ne !== null && z.has(Ne) && (v.width !== Ne.image.width || v.height !== Ne.image.height))
              throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            W.setupDepthRenderbuffer(v);
          }
        }
        const Te = v.texture;
        (Te.isData3DTexture || Te.isDataArrayTexture || Te.isCompressedArrayTexture) && (_e = !0);
        const be = z.get(v).__webglFramebuffer;
        v.isWebGLCubeRenderTarget ? (Array.isArray(be[L]) ? O = be[L][V] : O = be[L], G = !0) : v.samples > 0 && W.useMultisampledRTT(v) === !1 ? O = z.get(v).__webglMultisampledFramebuffer : Array.isArray(be) ? O = be[V] : O = be, se.copy(v.viewport), ge.copy(v.scissor), ze = v.scissorTest;
      } else
        se.copy(Re).multiplyScalar(te).floor(), ge.copy(nt).multiplyScalar(te).floor(), ze = Fe;
      if (V !== 0 && (O = $), h.bindFramebuffer(D.FRAMEBUFFER, O) && h.drawBuffers(v, O), h.viewport(se), h.scissor(ge), h.setScissorTest(ze), G) {
        const me = z.get(v.texture);
        D.framebufferTexture2D(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_CUBE_MAP_POSITIVE_X + L, me.__webglTexture, V);
      } else if (_e) {
        const me = L;
        for (let Te = 0; Te < v.textures.length; Te++) {
          const be = z.get(v.textures[Te]);
          D.framebufferTextureLayer(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0 + Te, be.__webglTexture, V, me);
        }
      } else if (v !== null && V !== 0) {
        const me = z.get(v.texture);
        D.framebufferTexture2D(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, me.__webglTexture, V);
      }
      ee = -1;
    }, this.readRenderTargetPixels = function(v, L, V, O, G, _e, ve, me = 0) {
      if (!(v && v.isWebGLRenderTarget)) {
        Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Te = z.get(v).__webglFramebuffer;
      if (v.isWebGLCubeRenderTarget && ve !== void 0 && (Te = Te[ve]), Te) {
        h.bindFramebuffer(D.FRAMEBUFFER, Te);
        try {
          const be = v.textures[me], Ne = be.format, Ge = be.type;
          if (v.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + me), !S.textureFormatReadable(Ne)) {
            Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!S.textureTypeReadable(Ge)) {
            Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= v.width - O && V >= 0 && V <= v.height - G && D.readPixels(L, V, O, G, le.convert(Ne), le.convert(Ge), _e);
        } finally {
          const be = Q !== null ? z.get(Q).__webglFramebuffer : null;
          h.bindFramebuffer(D.FRAMEBUFFER, be);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(v, L, V, O, G, _e, ve, me = 0) {
      if (!(v && v.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let Te = z.get(v).__webglFramebuffer;
      if (v.isWebGLCubeRenderTarget && ve !== void 0 && (Te = Te[ve]), Te)
        if (L >= 0 && L <= v.width - O && V >= 0 && V <= v.height - G) {
          h.bindFramebuffer(D.FRAMEBUFFER, Te);
          const be = v.textures[me], Ne = be.format, Ge = be.type;
          if (v.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + me), !S.textureFormatReadable(Ne))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!S.textureTypeReadable(Ge))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const Ae = D.createBuffer();
          D.bindBuffer(D.PIXEL_PACK_BUFFER, Ae), D.bufferData(D.PIXEL_PACK_BUFFER, _e.byteLength, D.STREAM_READ), D.readPixels(L, V, O, G, le.convert(Ne), le.convert(Ge), 0);
          const Qe = Q !== null ? z.get(Q).__webglFramebuffer : null;
          h.bindFramebuffer(D.FRAMEBUFFER, Qe);
          const ht = D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return D.flush(), await Ms(D, ht, 4), D.bindBuffer(D.PIXEL_PACK_BUFFER, Ae), D.getBufferSubData(D.PIXEL_PACK_BUFFER, 0, _e), D.deleteBuffer(Ae), D.deleteSync(ht), _e;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(v, L = null, V = 0) {
      const O = Math.pow(2, -V), G = Math.floor(v.image.width * O), _e = Math.floor(v.image.height * O), ve = L !== null ? L.x : 0, me = L !== null ? L.y : 0;
      W.setTexture2D(v, 0), D.copyTexSubImage2D(D.TEXTURE_2D, V, 0, 0, ve, me, G, _e), h.unbindTexture();
    }, this.copyTextureToTexture = function(v, L, V = null, O = null, G = 0, _e = 0) {
      let ve, me, Te, be, Ne, Ge, Ae, Qe, ht;
      const lt = v.isCompressedTexture ? v.mipmaps[_e] : v.image;
      if (V !== null)
        ve = V.max.x - V.min.x, me = V.max.y - V.min.y, Te = V.isBox3 ? V.max.z - V.min.z : 1, be = V.min.x, Ne = V.min.y, Ge = V.isBox3 ? V.min.z : 0;
      else {
        const pt = Math.pow(2, -G);
        ve = Math.floor(lt.width * pt), me = Math.floor(lt.height * pt), v.isDataArrayTexture ? Te = lt.depth : v.isData3DTexture ? Te = Math.floor(lt.depth * pt) : Te = 1, be = 0, Ne = 0, Ge = 0;
      }
      O !== null ? (Ae = O.x, Qe = O.y, ht = O.z) : (Ae = 0, Qe = 0, ht = 0);
      const et = le.convert(L.format), Et = le.convert(L.type);
      let xe;
      L.isData3DTexture ? (W.setTexture3D(L, 0), xe = D.TEXTURE_3D) : L.isDataArrayTexture || L.isCompressedArrayTexture ? (W.setTexture2DArray(L, 0), xe = D.TEXTURE_2D_ARRAY) : (W.setTexture2D(L, 0), xe = D.TEXTURE_2D), h.activeTexture(D.TEXTURE0), h.pixelStorei(D.UNPACK_FLIP_Y_WEBGL, L.flipY), h.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), h.pixelStorei(D.UNPACK_ALIGNMENT, L.unpackAlignment);
      const Dt = h.getParameter(D.UNPACK_ROW_LENGTH), qe = h.getParameter(D.UNPACK_IMAGE_HEIGHT), Ot = h.getParameter(D.UNPACK_SKIP_PIXELS), qt = h.getParameter(D.UNPACK_SKIP_ROWS), an = h.getParameter(D.UNPACK_SKIP_IMAGES);
      h.pixelStorei(D.UNPACK_ROW_LENGTH, lt.width), h.pixelStorei(D.UNPACK_IMAGE_HEIGHT, lt.height), h.pixelStorei(D.UNPACK_SKIP_PIXELS, be), h.pixelStorei(D.UNPACK_SKIP_ROWS, Ne), h.pixelStorei(D.UNPACK_SKIP_IMAGES, Ge);
      const yn = v.isDataArrayTexture || v.isData3DTexture, tt = L.isDataArrayTexture || L.isData3DTexture;
      if (v.isDepthTexture) {
        const pt = z.get(v), sn = z.get(L), rt = z.get(pt.__renderTarget), on = z.get(sn.__renderTarget);
        h.bindFramebuffer(D.READ_FRAMEBUFFER, rt.__webglFramebuffer), h.bindFramebuffer(D.DRAW_FRAMEBUFFER, on.__webglFramebuffer);
        for (let An = 0; An < Te; An++)
          yn && (D.framebufferTextureLayer(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, z.get(v).__webglTexture, G, Ge + An), D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, z.get(L).__webglTexture, _e, ht + An)), D.blitFramebuffer(be, Ne, ve, me, Ae, Qe, ve, me, D.DEPTH_BUFFER_BIT, D.NEAREST);
        h.bindFramebuffer(D.READ_FRAMEBUFFER, null), h.bindFramebuffer(D.DRAW_FRAMEBUFFER, null);
      } else if (G !== 0 || v.isRenderTargetTexture || z.has(v)) {
        const pt = z.get(v), sn = z.get(L);
        h.bindFramebuffer(D.READ_FRAMEBUFFER, Y), h.bindFramebuffer(D.DRAW_FRAMEBUFFER, B);
        for (let rt = 0; rt < Te; rt++)
          yn ? D.framebufferTextureLayer(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, pt.__webglTexture, G, Ge + rt) : D.framebufferTexture2D(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, pt.__webglTexture, G), tt ? D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, sn.__webglTexture, _e, ht + rt) : D.framebufferTexture2D(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, sn.__webglTexture, _e), G !== 0 ? D.blitFramebuffer(be, Ne, ve, me, Ae, Qe, ve, me, D.COLOR_BUFFER_BIT, D.NEAREST) : tt ? D.copyTexSubImage3D(xe, _e, Ae, Qe, ht + rt, be, Ne, ve, me) : D.copyTexSubImage2D(xe, _e, Ae, Qe, be, Ne, ve, me);
        h.bindFramebuffer(D.READ_FRAMEBUFFER, null), h.bindFramebuffer(D.DRAW_FRAMEBUFFER, null);
      } else
        tt ? v.isDataTexture || v.isData3DTexture ? D.texSubImage3D(xe, _e, Ae, Qe, ht, ve, me, Te, et, Et, lt.data) : L.isCompressedArrayTexture ? D.compressedTexSubImage3D(xe, _e, Ae, Qe, ht, ve, me, Te, et, lt.data) : D.texSubImage3D(xe, _e, Ae, Qe, ht, ve, me, Te, et, Et, lt) : v.isDataTexture ? D.texSubImage2D(D.TEXTURE_2D, _e, Ae, Qe, ve, me, et, Et, lt.data) : v.isCompressedTexture ? D.compressedTexSubImage2D(D.TEXTURE_2D, _e, Ae, Qe, lt.width, lt.height, et, lt.data) : D.texSubImage2D(D.TEXTURE_2D, _e, Ae, Qe, ve, me, et, Et, lt);
      h.pixelStorei(D.UNPACK_ROW_LENGTH, Dt), h.pixelStorei(D.UNPACK_IMAGE_HEIGHT, qe), h.pixelStorei(D.UNPACK_SKIP_PIXELS, Ot), h.pixelStorei(D.UNPACK_SKIP_ROWS, qt), h.pixelStorei(D.UNPACK_SKIP_IMAGES, an), _e === 0 && L.generateMipmaps && D.generateMipmap(xe), h.unbindTexture();
    }, this.initRenderTarget = function(v) {
      z.get(v).__webglFramebuffer === void 0 && W.setupRenderTarget(v);
    }, this.initTexture = function(v) {
      v.isCubeTexture ? W.setTextureCube(v, 0) : v.isData3DTexture ? W.setTexture3D(v, 0) : v.isDataArrayTexture || v.isCompressedArrayTexture ? W.setTexture2DArray(v, 0) : W.setTexture2D(v, 0), h.unbindTexture();
    }, this.resetState = function() {
      k = 0, H = 0, Q = null, h.reset(), he.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * Defines the coordinate system of the renderer.
   *
   * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
   *
   * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
   * @default WebGLCoordinateSystem
   * @readonly
   */
  get coordinateSystem() {
    return 2e3;
  }
  /**
   * Defines the output color space of the renderer.
   *
   * @type {SRGBColorSpace|LinearSRGBColorSpace}
   * @default SRGBColorSpace
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = ke._getDrawingBufferColorSpace(e), t.unpackColorSpace = ke._getUnpackColorSpace();
  }
}
const Sd = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class fi {
  /**
   * Constructs a new pass.
   */
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  /**
   * Sets the size of the pass.
   *
   * @abstract
   * @param {number} width - The width to set.
   * @param {number} height - The height to set.
   */
  setSize() {
  }
  /**
   * This method holds the render logic of a pass. It must be implemented in all derived classes.
   *
   * @abstract
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   *
   * @abstract
   */
  dispose() {
  }
}
const Ed = new ki(-1, 1, 1, -1, 0, 1);
class Td extends Xt {
  constructor() {
    super(), this.setAttribute("position", new Pt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Pt([0, 2, 0, 0, 2, 0], 2));
  }
}
const bd = new Td();
class us {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(e) {
    this._mesh = new Ut(bd, e);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the instance is no longer used in your app.
   */
  dispose() {
    this._mesh.geometry.dispose();
  }
  /**
   * Renders the full screen quad.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  render(e) {
    e.render(this._mesh, Ed);
  }
  /**
   * The quad's material.
   *
   * @type {?Material}
   */
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class yd extends fi {
  /**
   * Constructs a new shader pass.
   *
   * @param {Object|ShaderMaterial} [shader] - A shader object holding vertex and fragment shader as well as
   * defines and uniforms. It's also valid to pass a custom shader material.
   * @param {string} [textureID='tDiffuse'] - The name of the texture uniform that should sample
   * the read buffer.
   */
  constructor(e, t = "tDiffuse") {
    super(), this.textureID = t, this.uniforms = null, this.material = null, e instanceof Ct ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = wr.clone(e.uniforms), this.material = new Ct({
      name: e.name !== void 0 ? e.name : "unspecified",
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this._fsQuad = new us(this.material);
  }
  /**
   * Performs the shader pass.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(e, t, n) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   */
  dispose() {
    this.material.dispose(), this._fsQuad.dispose();
  }
}
class Da extends fi {
  /**
   * Constructs a new mask pass.
   *
   * @param {Scene} scene - The 3D objects in this scene will define the mask.
   * @param {Camera} camera - The camera.
   */
  constructor(e, t) {
    super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  /**
   * Performs a mask pass with the configured scene and camera.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(e, t, n) {
    const r = e.getContext(), a = e.state;
    a.buffers.color.setMask(!1), a.buffers.depth.setMask(!1), a.buffers.color.setLocked(!0), a.buffers.depth.setLocked(!0);
    let s, o;
    this.inverse ? (s = 0, o = 1) : (s = 1, o = 0), a.buffers.stencil.setTest(!0), a.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), a.buffers.stencil.setFunc(r.ALWAYS, s, 4294967295), a.buffers.stencil.setClear(o), a.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), a.buffers.color.setLocked(!1), a.buffers.depth.setLocked(!1), a.buffers.color.setMask(!0), a.buffers.depth.setMask(!0), a.buffers.stencil.setLocked(!1), a.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), a.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), a.buffers.stencil.setLocked(!0);
  }
}
class Ad extends fi {
  /**
   * Constructs a new clear mask pass.
   */
  constructor() {
    super(), this.needsSwap = !1;
  }
  /**
   * Performs the clear of the currently defined mask.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class Rd {
  /**
   * Constructs a new effect composer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} [renderTarget] - This render target and a clone will
   * be used as the internal read and write buffers. If not given, the composer creates
   * the buffers automatically.
   */
  constructor(e, t) {
    if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) {
      const n = e.getSize(new Ke());
      this._width = n.width, this._height = n.height, t = new Gt(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: 1016 }), t.texture.name = "EffectComposer.rt1";
    } else
      this._width = t.width, this._height = t.height;
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new yd(Sd), this.copyPass.material.blending = 0, this.timer = new Eo();
  }
  /**
   * Swaps the internal read/write buffers.
   */
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  /**
   * Adds the given pass to the pass chain.
   *
   * @param {Pass} pass - The pass to add.
   */
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  /**
   * Inserts the given pass at a given index.
   *
   * @param {Pass} pass - The pass to insert.
   * @param {number} index - The index into the pass chain.
   */
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  /**
   * Removes the given pass from the pass chain.
   *
   * @param {Pass} pass - The pass to remove.
   */
  removePass(e) {
    const t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  /**
   * Returns `true` if the pass for the given index is the last enabled pass in the pass chain.
   *
   * @param {number} passIndex - The pass index.
   * @return {boolean} Whether the pass for the given index is the last pass in the pass chain.
   */
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled)
        return !1;
    return !0;
  }
  /**
   * Executes all enabled post-processing passes in order to produce the final frame.
   *
   * @param {number} deltaTime - The delta time in seconds. If not given, the composer computes
   * its own time delta value.
   */
  render(e) {
    this.timer.update(), e === void 0 && (e = this.timer.getDelta());
    const t = this.renderer.getRenderTarget();
    let n = !1;
    for (let r = 0, a = this.passes.length; r < a; r++) {
      const s = this.passes[r];
      if (s.enabled !== !1) {
        if (s.renderToScreen = this.renderToScreen && this.isLastEnabledPass(r), s.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), s.needsSwap) {
          if (n) {
            const o = this.renderer.getContext(), l = this.renderer.state.buffers.stencil;
            l.setFunc(o.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), l.setFunc(o.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        Da !== void 0 && (s instanceof Da ? n = !0 : s instanceof Ad && (n = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  /**
   * Resets the internal state of the EffectComposer.
   *
   * @param {WebGLRenderTarget} [renderTarget] - This render target has the same purpose like
   * the one from the constructor. If set, it is used to setup the read and write buffers.
   */
  reset(e) {
    if (e === void 0) {
      const t = this.renderer.getSize(new Ke());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  /**
   * Resizes the internal read and write buffers as well as all passes. Similar to {@link WebGLRenderer#setSize},
   * this method honors the current pixel ration.
   *
   * @param {number} width - The width in logical pixels.
   * @param {number} height - The height in logical pixels.
   */
  setSize(e, t) {
    this._width = e, this._height = t;
    const n = this._width * this._pixelRatio, r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
    for (let a = 0; a < this.passes.length; a++)
      this.passes[a].setSize(n, r);
  }
  /**
   * Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
   * Setting the pixel ratio will automatically resize the composer.
   *
   * @param {number} pixelRatio - The pixel ratio to set.
   */
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the composer is no longer used in your app.
   */
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class Cd extends fi {
  /**
   * Constructs a new render pass.
   *
   * @param {Scene} scene - The scene to render.
   * @param {Camera} camera - The camera.
   * @param {?Material} [overrideMaterial=null] - The override material. If set, this material is used
   * for all objects in the scene.
   * @param {?(number|Color|string)} [clearColor=null] - The clear color of the render pass.
   * @param {?number} [clearAlpha=null] - The clear alpha of the render pass.
   */
  constructor(e, t, n = null, r = null, a = null) {
    super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = r, this.clearAlpha = a, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new Ze();
  }
  /**
   * Performs a beauty pass with the configured scene and camera.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(e, t, n) {
    const r = e.autoClear;
    e.autoClear = !1;
    let a, s;
    this.overrideMaterial !== null && (s = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), this.clearAlpha !== null && (a = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(a), this.overrideMaterial !== null && (this.scene.overrideMaterial = s), e.autoClear = r;
  }
}
const Ni = {
  name: "OutputShader",
  uniforms: {
    tDiffuse: { value: null },
    toneMappingExposure: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`
  )
};
class wd extends fi {
  /**
   * Constructs a new output pass.
   */
  constructor() {
    super(), this.isOutputPass = !0, this.uniforms = wr.clone(Ni.uniforms), this.material = new ja({
      name: Ni.name,
      uniforms: this.uniforms,
      vertexShader: Ni.vertexShader,
      fragmentShader: Ni.fragmentShader
    }), this._fsQuad = new us(this.material), this._outputColorSpace = null, this._toneMapping = null;
  }
  /**
   * Performs the output pass.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(e, t, n) {
    this.uniforms.tDiffuse.value = n.texture, this.uniforms.toneMappingExposure.value = e.toneMappingExposure, (this._outputColorSpace !== e.outputColorSpace || this._toneMapping !== e.toneMapping) && (this._outputColorSpace = e.outputColorSpace, this._toneMapping = e.toneMapping, this.material.defines = {}, ke.getTransfer(this._outputColorSpace) === $e && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === 1 ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === 2 ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === 3 ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === 4 ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === 6 ? this.material.defines.AGX_TONE_MAPPING = "" : this._toneMapping === 7 ? this.material.defines.NEUTRAL_TONE_MAPPING = "" : this._toneMapping === 5 && (this.material.defines.CUSTOM_TONE_MAPPING = ""), this.material.needsUpdate = !0), this.renderToScreen === !0 ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   */
  dispose() {
    this.material.dispose(), this._fsQuad.dispose();
  }
}
const Pd = Object.freeze({
  mode: "enhanced",
  azimuth: -12,
  elevation: 20,
  shading: 0.75,
  exposure: 1.2,
  darkPaintRetention: 0,
  bloom: 0,
  relief: 0.5,
  tint: 0,
  halo: 0.6,
  referenceRim: !0,
  lightFollow: !0,
  motion: !0,
  stars: !1
}), La = Math.PI / 180, Fa = 1737400, Ia = 0.22, fs = "approved-pilot-01 + locally stylized NASA global continuation", Oi = -Math.PI / 2, Dd = 0.035, Ua = 1.6, Ld = 0.045, Er = 0.18, Na = 1e-3, Vn = 0.65, Oa = 384, Ba = 192, ds = Object.freeze({
  azimuth: [-180, 180],
  elevation: [-90, 90],
  shading: [0, 1],
  darkPaintRetention: [0, 1],
  exposure: [0.5, 3],
  bloom: [0, 0.35],
  relief: [0, 6],
  tint: [0, 1],
  halo: [0, 2]
}), Tr = Object.freeze({
  albedo: "lunar-art-albedo.webp",
  height: "lunar-art-height-rg.png",
  source: "Hybrid illustrated material / NASA SVS CGI Moon Kit 2025 LROC continuation and smoothed LOLA-derived shape",
  materialProvenance: fs,
  materialType: "hybrid material; approved AI pilot with locally stylized NASA global continuation",
  pilotRegistration: { u: [0.375, 0.625], imageV: [0.25, 0.75], boundaries: "blended" },
  reliefProvenance: "Globally smoothed/compressed LOLA broad relief; not physical relief or painted-brightness depth",
  projection: "Equirectangular; longitude 0 at u=0.5; north at v=1",
  heightEncoding: "(R * 255 * 256 + G * 255) * 0.5 - 10000 meters"
}), hs = (
  /* glsl */
  `
  uniform sampler2D uHeight;
  uniform float uRelief;
  uniform float uRadiusMeters;
  uniform float uSilhouetteScale;
  float terrainRadius(vec2 coordinate) {
    vec2 rg = texture2D(uHeight, coordinate).rg;
    float meters = dot(rg * 255.0, vec2(256.0, 1.0)) * 0.5 - 10000.0;
    return 1.0 + meters * uRelief * uSilhouetteScale / uRadiusMeters;
  }
`
), Fd = (
  /* glsl */
  `
  ${hs}
  varying vec3 vLocalDirection;
  void main() {
    vLocalDirection = normalize(position);
    vec3 displaced = vLocalDirection * terrainRadius(uv);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`
), Id = (
  /* glsl */
  `
  ${hs}
  uniform sampler2D uAlbedo;
  uniform mat3 normalMatrix;
  uniform vec3 uLightDirection;
  uniform float uShading;
  uniform float uExposure;
  uniform float uDarkPaintRetention;
  uniform float uTint;
  uniform float uTerrainStep;
  varying vec3 vLocalDirection;
  const float PI = 3.141592653589793;

  vec2 sphericalUV(vec3 direction) {
    // Matches Three SphereGeometry, including its +X central meridian.
    float longitude = dot(direction.xz, direction.xz) > 1e-12
      ? atan(direction.z, -direction.x) : PI;
    return vec2(longitude / (2.0 * PI),
                asin(clamp(direction.y, -1.0, 1.0)) / PI + 0.5);
  }
  vec3 surfacePoint(vec3 direction) {
    vec3 d = normalize(direction);
    return d * terrainRadius(sphericalUV(d));
  }
  // Invert the pinned Three r185 ACES transfer for painted dark colors only.
  // OutputPass still owns the one ACES/sRGB conversion and MSAA alpha handling.
  // This keeps the source lavender RGB instead of globally lowering exposure.
  vec3 sourcePaintInput(vec3 sourceLinear) {
    const mat3 inverseOutput = mat3(
      0.6430382486, 0.0592686904, 0.0059619013,
      0.3111867518, 0.9314364869, 0.0639290157,
      0.0457754574, 0.0092949157, 0.9301183842
    );
    const mat3 inverseInput = mat3(
      1.7647409720, -0.1470278520, -0.0363368301,
      -0.6757776782, 1.1602515117, -0.1624364369,
      -0.0889632938, -0.0132236597, 1.1987732670
    );
    vec3 target = clamp(inverseOutput * sourceLinear, vec3(0.0), vec3(0.98));
    vec3 a = 1.0 - 0.983729 * target;
    vec3 b = 0.0245786 - 0.4329510 * target;
    vec3 c = -0.000090537 - 0.238081 * target;
    vec3 fitted = (-b + sqrt(max(b * b - 4.0 * a * c, vec3(0.0)))) / (2.0 * a);
    return max(inverseInput * fitted, vec3(0.0)) * (0.6 / uExposure);
  }
  void main() {
    vec3 radial = normalize(vLocalDirection);
    // Central differences of softened broad shape, never color derivatives.
    // A tangent-plane stencil avoids longitude singularities at either pole and
    // samples across the wrapped meridian instead of clamping to a plain strip.
    vec3 axis = abs(radial.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
    vec3 tangent = normalize(cross(axis, radial));
    vec3 bitangent = cross(radial, tangent);
    vec3 dT = surfacePoint(radial + tangent * uTerrainStep)
            - surfacePoint(radial - tangent * uTerrainStep);
    vec3 dB = surfacePoint(radial + bitangent * uTerrainStep)
            - surfacePoint(radial - bitangent * uTerrainStep);
    // Painted crater edges intentionally do not match fine LOLA normals.
    // Sphere-scale illumination dominates; terrain contributes only a quiet cue.
    vec3 broadNormal = normalize(cross(dT, dB));
    vec3 N = normalize(normalMatrix * normalize(mix(radial, broadNormal, 0.065)));
    vec3 L = normalize(uLightDirection);
    float diffuse = max(dot(N, L), 0.0);
    // The sRGB albedo is decoded by the texture hardware into linear working RGB.
    vec2 uv = sphericalUV(radial);
    vec2 uvDx = dFdx(uv);
    vec2 uvDy = dFdy(uv);
    // atan's branch cut must not request the coarsest mip along a meridian.
    uvDx.x -= floor(uvDx.x + 0.5);
    uvDy.x -= floor(uvDy.x + 0.5);
    vec3 albedo = textureGrad(uAlbedo, uv, uvDx, uvDy).rgb;
    // The hybrid texture already carries lavender paint and crater detail.
    // Broad neutral fill preserves that detail on the unlit hemisphere without
    // doubling the painted shadows or replacing its palette with a flat wash.
    albedo *= mix(vec3(1.0), vec3(0.86, 0.89, 1.025), uTint);
    vec3 fill = mix(vec3(0.52), vec3(0.51, 0.51, 0.55), uTint);
    vec3 illumination = fill + vec3(0.60, 0.595, 0.59) * diffuse;
    vec3 color = albedo * mix(vec3(1.0), illumination, uShading);
    // Mask in texture space: stays registered to the paint throughout rotation.
    float paintLuminance = dot(albedo, vec3(0.2126, 0.7152, 0.0722));
    float darkPaint = 1.0 - smoothstep(0.30, 0.65, paintLuminance);
    color = mix(color, sourcePaintInput(albedo), darkPaint * uDarkPaintRetention);
    gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
    // Linear working color. OutputPass owns ACES + sRGB exactly once.
  }
`
), Ga = (
  /* glsl */
  `
  varying vec2 vHaloPosition;
  void main() {
    vHaloPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
), Ud = (
  /* glsl */
  `
  uniform float uHalo;
  varying vec2 vHaloPosition;
  void main() {
    float radius = length(vHaloPosition);
    float aa = max(fwidth(radius), 0.00001);
    // Attach the glow directly to the limb; never leave a dark gap like a ring.
    float edgeCoverage = smoothstep(0.998 - aa, 1.0005 + aa, radius);
    float outside = max(radius - 1.0, 0.0);
    float thinRim = 0.38 * exp(-outside / 0.0045);
    // A separate low-intensity white aureole fades well before the quad edge.
    // No noise, rays or pulsing: keep lunar light quiet and surface pixels intact.
    float softGlow = 0.085 * exp(-outside / 0.05);
    float outerFade = 1.0 - smoothstep(1.16, 1.23 + aa, radius);
    float alpha = uHalo * edgeCoverage * (thinRim + softGlow) * outerFade;
    if (alpha < 0.0001) discard;
    gl_FragColor = vec4(vec3(0.92, 0.94, 0.98), alpha);
  }
`
), Nd = (
  /* glsl */
  `
  varying vec2 vHaloPosition;
  void main() {
    float radius = length(vHaloPosition);
    float aa = max(fwidth(radius), 0.00001);
    float distanceToLimb = abs(radius - 0.9995);
    float coverage = 1.0 - smoothstep(0.0018, 0.0018 + aa, distanceToLimb);
    float alpha = 0.62 * coverage;
    if (alpha < 0.0001) discard;
    gl_FragColor = vec4(vec3(0.92, 0.94, 1.0), alpha);
  }
`
);
function za(i, e) {
  const t = { ...i };
  if (!e || typeof e != "object") return t;
  for (const [n, [r, a]] of Object.entries(ds))
    typeof e[n] == "number" && Number.isFinite(e[n]) && (t[n] = Bs.clamp(e[n], r, a));
  for (const n of ["motion", "lightFollow", "referenceRim"])
    typeof e[n] == "boolean" && (t[n] = e[n]);
  return t.mode = "enhanced", t.stars = !1, t.bloom = 0, t;
}
function Va(i, e, t) {
  const n = new URL(String(i), t);
  return n.pathname = n.pathname.replace(/\/?$/, "/"), n.search = "", n.hash = "", new URL(e, n).href;
}
async function Od(i, {
  onReady: e,
  onError: t,
  assetBase: n = "/assets/",
  initialSettings: r,
  signal: a,
  reducedMotion: s
} = {}) {
  if (!i || typeof i.appendChild != "function")
    throw new TypeError("createMoonScene requires a DOM host element.");
  const o = i.ownerDocument, l = o?.defaultView;
  if (!l) throw new TypeError("createMoonScene requires a connected browser document.");
  const c = () => new DOMException("Moon scene initialization aborted.", "AbortError");
  if (a?.aborted) throw c();
  let f, p, u, _, x, E, m, d, A, R = 0, M = 0, y = !1, T = !1, C = !1, g = !1, b = !1, F, P, I = za(Pd, r), $ = 0, Y = !1, B = !1, k = 0, H = 0, Q = 0, ee = Vn, ie = l.performance.now(), se = !0, ge = 1, ze = 1, Je = 1, He, J;
  const re = new Promise((q, de) => {
    J = de;
  });
  re.catch(() => {
  });
  const te = [], we = [], Le = [], Re = l.matchMedia?.("(prefers-reduced-motion: reduce)");
  let nt = typeof s != "boolean", Fe = nt ? !!Re?.matches : s;
  const Xe = new Qs();
  Xe.name = "Moon / embedded accepted illustrated globe V3";
  const Pe = new ki(-1.4, 1.4, 1.4, -1.4, 0.1, 30);
  Pe.position.set(0, 0, 5), Pe.lookAt(0, 0, 0);
  const Ve = new N(), st = new N(), ut = new N(0, 1, 0), _t = new N(1, 0, 0), ft = {
    albedo: Va(n, Tr.albedo, o.baseURI),
    height: Va(n, Tr.height, o.baseURI)
  };
  function je(q) {
    const de = q instanceof Error ? q : new Error(String(q));
    if (F = de.message, !y && typeof t == "function")
      try {
        t(de);
      } catch (Me) {
        console.error(Me);
      }
    return de;
  }
  function it(q, de, Me, at) {
    q.addEventListener(de, Me, at), Le.push(() => q.removeEventListener(de, Me, at));
  }
  function D() {
    return {
      ready: T && !y && !b,
      active: g,
      disposed: y,
      contextLost: b,
      reducedMotion: Fe,
      framePending: R !== 0,
      frameCount: M,
      time: $,
      dragging: Y,
      inertiaActive: B,
      settings: { ...I },
      modelVersion: "global-art-v3",
      materialProvenance: fs,
      surfaceCoverage: "global",
      threeRevision: "185",
      backend: "WebGL2",
      camera: Pe.position.toArray(),
      cameraZoom: Pe.zoom,
      rotation: x?.rotation.toArray().slice(0, 3) ?? [0, Oi, 0],
      quaternion: x?.quaternion.toArray() ?? [0, Math.sin(Oi / 2), 0, Math.cos(Oi / 2)],
      dimensions: {
        width: ge,
        height: ze,
        pixelRatio: Je,
        drawingBufferWidth: f?.domElement.width ?? 0,
        drawingBufferHeight: f?.domElement.height ?? 0
      },
      assets: {
        ...Tr,
        ...ft,
        albedoSize: d ? [d.image.width, d.image.height] : null,
        heightSize: A ? [A.image.width, A.image.height] : null
      },
      mesh: {
        segments: [Oa, Ba],
        vertices: x?.geometry.attributes.position.count ?? 0,
        triangles: (x?.geometry.index.count ?? 0) / 3
      },
      rendererInfo: {
        calls: f?.info.render.calls ?? 0,
        triangles: f?.info.render.triangles ?? 0,
        points: f?.info.render.points ?? 0,
        geometries: f?.info.memory.geometries ?? 0,
        textures: f?.info.memory.textures ?? 0,
        programs: f?.info.programs?.length ?? 0
      },
      ...F ? { lastError: F } : {}
    };
  }
  function ot() {
    R && l.cancelAnimationFrame(R), R = 0;
  }
  function Be() {
    !R && g && T && !y && !b && (se || !Y && !Fe && (I.motion || B)) && (R = l.requestAnimationFrame(fe));
  }
  function S() {
    k = 0, H = 0, B = !1;
  }
  function h() {
    Y = !1, S(), ee = Vn;
  }
  function U() {
    return T && g && !y && !b && !!x && !f.getContext().isContextLost();
  }
  function z(q, de) {
    q && x.rotateOnWorldAxis(ut, q), de && x.rotateOnWorldAxis(_t, de), x.quaternion.normalize();
  }
  function W() {
    return U() ? (S(), Y = !0, ee = 0, Q = ie = l.performance.now(), ot(), Be(), !0) : !1;
  }
  function ne(q, de, Me) {
    if (!Y || !U() || !Number.isFinite(q) || !Number.isFinite(de) || !Number.isFinite(Me) || Me <= 0) return !1;
    if (z(q, de), Fe) S();
    else {
      const at = Math.max(Me, 1e-3);
      let dt = q / at, Nt = de / at;
      const mn = Math.hypot(dt, Nt), rn = mn > Ua ? Ua / mn : 1;
      dt *= rn, Nt *= rn;
      const gt = -Math.expm1(-at / Ld);
      k += (dt - k) * gt, H += (Nt - H) * gt;
    }
    return Q = l.performance.now(), se = !0, Be(), !0;
  }
  function ce(q = !1) {
    if (!Y) return !1;
    Y = !1;
    const de = l.performance.now(), Me = Math.exp(-Math.max(0, (de - Q) / 1e3) / Er);
    return k *= Me, H *= Me, q || Fe || !U() ? S() : B = Math.hypot(k, H) > Na, B || S(), ee = 0, ie = de, Be(), !0;
  }
  function X(q) {
    const de = Math.min(q / Vn, 1);
    return Vn * (de * de * de - 0.5 * de * de * de * de) + Math.max(0, q - Vn);
  }
  function K() {
    if (y || !f || b) return;
    const q = i.getBoundingClientRect();
    ge = Math.max(1, Math.round(q.width || i.clientWidth || 1)), ze = Math.max(1, Math.round(q.height || i.clientHeight || 1)), Je = Math.min(l.devicePixelRatio || 1, 2), f.setPixelRatio(Je), f.setSize(ge, ze, !1), p?.setPixelRatio(Je), p?.setSize(ge, ze);
    const de = ge / ze, Me = 1.3 / Math.min(de, 1);
    Pe.left = -Me * de, Pe.right = Me * de, Pe.top = Me, Pe.bottom = -Me, Pe.updateProjectionMatrix(), se = !0, Be();
  }
  function oe() {
    const q = I.azimuth * La, de = I.elevation * La;
    Ve.set(
      Math.sin(q) * Math.cos(de),
      Math.sin(de),
      Math.cos(q) * Math.cos(de)
    ).normalize(), I.lightFollow && (Pe.updateMatrixWorld(), Ve.transformDirection(Pe.matrixWorld)), x && (x.material.uniforms.uShading.value = I.shading, x.material.uniforms.uExposure.value = I.exposure, x.material.uniforms.uDarkPaintRetention.value = I.darkPaintRetention, x.material.uniforms.uRelief.value = I.relief, x.material.uniforms.uTint.value = I.tint), E && (E.material.uniforms.uHalo.value = I.halo, E.visible = I.halo > 0), m && (m.visible = I.referenceRim), se = !0;
  }
  function Se() {
    if (Pe.updateMatrixWorld(), st.copy(Ve).transformDirection(Pe.matrixWorldInverse), x.material.uniforms.uLightDirection.value.copy(st), E.quaternion.copy(Pe.quaternion), m.quaternion.copy(Pe.quaternion), f.info.reset(), f.setRenderTarget(null), f.setClearColor(0, 0), f.clear(), f.toneMapping = 4, f.toneMappingExposure = I.exposure, p.render(), P) throw P;
    se = !1, M += 1;
  }
  function ue() {
    if (!(!T || y || b))
      try {
        Se();
      } catch (q) {
        T = !1, h(), ot(), je(q);
      }
  }
  function fe(q) {
    if (R = 0, y || b || !T || !g) return;
    const de = Math.min(Math.max((q - ie) / 1e3, 0), 0.05);
    if (ie = q, Je !== Math.min(l.devicePixelRatio || 1, 2) && K(), !Y && !Fe) {
      let Me = 0, at = 0;
      if (B) {
        const dt = Math.exp(-de / Er), Nt = Er * (1 - dt);
        Me = k * Nt, at = H * Nt, k *= dt, H *= dt, Math.hypot(k, H) <= Na && S();
      }
      I.motion && ($ += de, Me += Dd * (X(ee + de) - X(ee)), ee = Math.min(Vn, ee + de)), (Me || at) && (z(Me, at), se = !0);
    }
    se && ue(), Be();
  }
  function ye(q) {
    if (y) return;
    const de = !!q;
    de !== g && (g = de, ie = l.performance.now(), g ? (se = !0, Be()) : (h(), ot()));
  }
  function Ce(q) {
    y || (I = za(I, q), oe(), ie = l.performance.now(), ot(), Be());
  }
  function Ie(q) {
    y || Fe === q || (Fe = q, Fe && S(), ie = l.performance.now(), ot(), se = !0, g && ue(), Be());
  }
  function w(q) {
    y || (nt = typeof q != "boolean", Ie(nt ? !!Re?.matches : q));
  }
  function ae() {
    for (const q of we) q.dispose?.();
    we.length = 0, p?.dispose(), p = void 0, u?.dispose(), u = void 0;
  }
  function Z() {
    if (!y) {
      y = !0, T = !1, g = !1, h(), ot(), J(c()), He = void 0, _?.disconnect();
      for (const q of Le) q();
      Le.length = 0, ae();
      for (const q of te) q.dispose();
      te.length = 0, Xe.clear(), f?.dispose(), f?.domElement.remove(), f?.forceContextLoss();
    }
  }
  function le() {
    f.outputColorSpace = wt, f.autoClear = !1, f.info.autoReset = !1, f.debug.onShaderError = (q, de, Me, at) => {
      P = new Error([
        "Moon shader compilation failed.",
        q.getProgramInfoLog(de),
        q.getShaderInfoLog(Me),
        q.getShaderInfoLog(at)
      ].filter(Boolean).join(`
`));
    };
  }
  function he() {
    if (!(y || b)) {
      if (f.compile(Xe, Pe), P) throw P;
      if (Se(), C = !0, T = !0, F = void 0, ie = l.performance.now(), typeof e == "function")
        try {
          e(D());
        } catch (q) {
          console.error(q);
        }
      Be();
    }
  }
  function j() {
    const q = new Gt(1, 1, {
      type: 1016,
      format: 1023,
      depthBuffer: !0,
      stencilBuffer: !1,
      samples: Math.min(4, f.capabilities.maxSamples)
    });
    u = q, p = new Rd(f, q), u = void 0;
    const de = new Cd(Xe, Pe);
    de.clear = !0, de.clearColor = new Ze(0, 0, 0), de.clearAlpha = 0, we.push(de), p.addPass(de);
    const Me = new wd();
    we.push(Me), Me.material.fragmentShader = Me.material.fragmentShader.replace(
      "gl_FragColor = texture2D( tDiffuse, vUv );",
      `gl_FragColor = texture2D( tDiffuse, vUv );
         float coverage = gl_FragColor.a;
         if (coverage > 0.0001) gl_FragColor.rgb /= coverage;`
    ).replace(/}\s*$/, `
         if (coverage > 0.0001) gl_FragColor.rgb *= coverage;
       }`), Object.assign(Me.material, {
      transparent: !0,
      blending: 5,
      blendEquation: 100,
      blendSrc: 201,
      blendDst: 205,
      blendEquationAlpha: 100,
      blendSrcAlpha: 201,
      blendDstAlpha: 205
    }), Me.material.depthTest = !1, Me.material.depthWrite = !1, Me.clear = !1, p.addPass(Me);
  }
  const Ee = {
    setActive: ye,
    setSettings: Ce,
    setReducedMotion: w,
    renderOnce: ue,
    resize: K,
    getState: D,
    dispose: Z,
    beginDrag: W,
    dragBy: ne,
    endDrag: ce
  };
  try {
    a && it(a, "abort", Z, { once: !0 }), f = new Md({
      antialias: !0,
      alpha: !0,
      powerPreference: "high-performance",
      premultipliedAlpha: !0
    }), le();
    const q = f.domElement;
    q.style.cssText = "display:block;width:100%;height:100%;pointer-events:none;background:transparent;", q.tabIndex = -1, q.setAttribute("aria-hidden", "true"), q.dataset.engine = "three.js r185 / WebGL2", i.appendChild(q), it(q, "webglcontextlost", (gt) => {
      gt.preventDefault(), !y && (b = !0, T = !1, h(), ot(), je(new Error("WebGL context lost. Waiting for the browser to restore it.")));
    }), it(q, "webglcontextrestored", () => {
      if (!y) {
        if (b = !1, P = void 0, !C) {
          He?.(), He = void 0;
          return;
        }
        try {
          le(), ae();
          for (const gt of te)
            (gt.isTexture || gt.isMaterial) && (gt.needsUpdate = !0);
          j(), oe(), K(), he();
        } catch (gt) {
          T = !1, ot(), je(gt);
        }
      }
    }), Re?.addEventListener && it(Re, "change", (gt) => {
      nt && Ie(gt.matches);
    });
    const de = new vo();
    if ([d, A] = await Promise.race([
      Promise.all([ft.albedo, ft.height].map(async (gt) => {
        const $n = await de.loadAsync(gt);
        return y ? $n.dispose() : te.push($n), $n;
      })),
      re
    ]), y) throw c();
    d.name = "Hybrid art / approved-pilot-01 + locally stylized NASA global continuation", d.colorSpace = wt, d.wrapS = 1e3, d.wrapT = 1001, d.minFilter = 1008, d.magFilter = 1006, d.anisotropy = Math.min(f.capabilities.getMaxAnisotropy(), 8), A.name = "Art shape / smoothed-compressed LOLA-derived packed uint16", A.colorSpace = "", A.wrapS = 1e3, A.wrapT = 1001, A.minFilter = 1006, A.magFilter = 1006, A.generateMipmaps = !1, A.anisotropy = 1;
    const Me = new Cr(1, Oa, Ba);
    te.push(Me);
    const at = 65535 * 0.5 - 1e4;
    Me.boundingSphere = new Vi(
      new N(),
      1 + at * ds.relief[1] * Ia / Fa
    );
    const dt = new Ct({
      name: "Moon / hybrid illustrated albedo and softened broad shape",
      uniforms: {
        uAlbedo: { value: d },
        uHeight: { value: A },
        uRadiusMeters: { value: Fa },
        uSilhouetteScale: { value: Ia },
        uRelief: { value: I.relief },
        uTint: { value: I.tint },
        uTerrainStep: { value: Math.max(Math.PI / A.image.height, 9e-3) },
        uLightDirection: { value: new N(0, 0, 1) },
        uShading: { value: I.shading },
        uExposure: { value: I.exposure },
        uDarkPaintRetention: { value: I.darkPaintRetention }
      },
      vertexShader: Fd,
      fragmentShader: Id,
      depthTest: !0,
      depthWrite: !0,
      side: 0
    });
    te.push(dt), x = new Ut(Me, dt), x.name = "Moon / complete 360-degree hybrid illustrated globe", x.rotation.y = Oi, Xe.add(x);
    const Nt = new ui(2.5, 2.5), mn = new Ct({
      name: "Moon / pale-white rim and outward soft glow",
      uniforms: { uHalo: { value: I.halo } },
      vertexShader: Ga,
      fragmentShader: Ud,
      transparent: !0,
      blending: 1,
      depthTest: !0,
      depthWrite: !1,
      side: 2
    });
    E = new Ut(Nt, mn), E.name = "Moon / view-invariant pale-white aureole", E.renderOrder = 1, Xe.add(E), te.push(Nt, mn);
    const rn = new Ct({
      name: "Moon / optional reference-like cold-white edge",
      vertexShader: Ga,
      fragmentShader: Nd,
      transparent: !0,
      blending: 1,
      depthTest: !1,
      depthWrite: !1,
      side: 2
    });
    for (m = new Ut(Nt, rn), m.name = "Moon / removable reference edge trial", m.renderOrder = 2, Xe.add(m), te.push(rn); !y && (b || f.getContext().isContextLost()); )
      b = !0, await Promise.race([
        new Promise((gt) => {
          He = gt;
        }),
        re
      ]);
    if (y || (le(), j(), oe(), K(), typeof l.ResizeObserver == "function" && (_ = new l.ResizeObserver(K), _.observe(i)), it(l, "resize", K), he(), y)) throw c();
    return Ee;
  } catch (q) {
    const de = y ? q : je(q);
    throw Z(), de;
  }
}
export {
  Pd as DEFAULT_SETTINGS,
  Od as createMoonScene
};
