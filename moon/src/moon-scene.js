import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export const DEFAULT_SETTINGS = Object.freeze({
  mode: 'enhanced',
  azimuth: -12,
  elevation: 20,
  shading: 0.75,
  exposure: 1.20,
  darkPaintRetention: 0,
  bloom: 0,
  relief: 0.5,
  tint: 0,
  halo: 0.6,
  referenceRim: true,
  lightFollow: true,
  motion: true,
  stars: false,
});

const DEG = Math.PI / 180;
const MOON_RADIUS_METERS = 1737400;
// Broad, pre-smoothed LOLA-derived shape is an artistic cue, not physical relief.
// Keep the silhouette quiet even at the existing controller's maximum relief.
const SILHOUETTE_SCALE = 0.22;
const MATERIAL_PROVENANCE = 'approved-pilot-01 + locally stylized NASA global continuation';
const BASE_ROTATION_Y = -Math.PI / 2;
const AMBIENT_SPEED = 0.035;
const MAX_DRAG_SPEED = 1.6;
const VELOCITY_SMOOTH_SECONDS = 0.045;
const INERTIA_SECONDS = 0.18;
const INERTIA_STOP_SPEED = 0.001;
const AMBIENT_RESUME_SECONDS = 0.65;
const WIDTH_SEGMENTS = 384;
const HEIGHT_SEGMENTS = 192;
const RANGES = Object.freeze({
  azimuth: [-180, 180], elevation: [-90, 90], shading: [0, 1], darkPaintRetention: [0, 1],
  exposure: [0.5, 3], bloom: [0, 0.35], relief: [0, 6], tint: [0, 1], halo: [0, 2],
});
const LUNAR_ASSETS = Object.freeze({
  albedo: 'lunar-art-albedo.webp',
  height: 'lunar-art-height-rg.png',
  source: 'Hybrid illustrated material / NASA SVS CGI Moon Kit 2025 LROC continuation and smoothed LOLA-derived shape',
  materialProvenance: MATERIAL_PROVENANCE,
  materialType: 'hybrid material; approved AI pilot with locally stylized NASA global continuation',
  pilotRegistration: { u: [0.375, 0.625], imageV: [0.25, 0.75], boundaries: 'blended' },
  reliefProvenance: 'Globally smoothed/compressed LOLA broad relief; not physical relief or painted-brightness depth',
  projection: 'Equirectangular; longitude 0 at u=0.5; north at v=1',
  heightEncoding: '(R * 255 * 256 + G * 255) * 0.5 - 10000 meters',
});

// Both stages decode the pre-smoothed, compressed LOLA-derived art height map.
// Linear interpolation of packed channels is valid because decoding is affine.
// Never gamma-decode height data or derive depth from the painted albedo.
const terrainGLSL = /* glsl */ `
  uniform sampler2D uHeight;
  uniform float uRelief;
  uniform float uRadiusMeters;
  uniform float uSilhouetteScale;
  float terrainRadius(vec2 coordinate) {
    vec2 rg = texture2D(uHeight, coordinate).rg;
    float meters = dot(rg * 255.0, vec2(256.0, 1.0)) * 0.5 - 10000.0;
    return 1.0 + meters * uRelief * uSilhouetteScale / uRadiusMeters;
  }
`;
const moonVertexShader = /* glsl */ `
  ${terrainGLSL}
  varying vec3 vLocalDirection;
  void main() {
    vLocalDirection = normalize(position);
    vec3 displaced = vLocalDirection * terrainRadius(uv);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const moonFragmentShader = /* glsl */ `
  ${terrainGLSL}
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
`;

// A camera-facing annulus in world-radius units: it follows orbit and zoom,
// never the surface spin. Transparent interior/outer pixels are discarded so
// its quad cannot cover background stars. Linear RGB enters the same composer
// as the moon; OutputPass handles straight-color tonemapping and coverage.
const haloVertexShader = /* glsl */ `
  varying vec2 vHaloPosition;
  void main() {
    vHaloPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const haloFragmentShader = /* glsl */ `
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
`;

// Optional reference-like bright edge. Separate from the accepted outer glow,
// so disabling this trial restores the previous rendering without retuning it.
const referenceRimFragmentShader = /* glsl */ `
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
`;

function sanitizeSettings(current, partial) {
  const next = { ...current };
  if (!partial || typeof partial !== 'object') return next;
  for (const [key, [min, max]] of Object.entries(RANGES)) {
    if (typeof partial[key] === 'number' && Number.isFinite(partial[key])) {
      next[key] = THREE.MathUtils.clamp(partial[key], min, max);
    }
  }
  for (const key of ['motion', 'lightFollow', 'referenceRim']) {
    if (typeof partial[key] === 'boolean') next[key] = partial[key];
  }
  // Decorative embed never allocates source/stars/bloom resources.
  next.mode = 'enhanced';
  next.stars = false;
  next.bloom = 0;
  return next;
}


/** Resolve an asset DIRECTORY, with or without its trailing slash. */
function assetURL(assetBase, filename, baseURI) {
  const base = new URL(String(assetBase), baseURI);
  base.pathname = base.pathname.replace(/\/?$/, '/');
  // Directory query/hash are not part of the child texture URL.
  base.search = '';
  base.hash = '';
  return new URL(filename, base).href;
}

/**
 * Transparent accepted V3 globe; manual rotation is opt-in via controller methods.
 * No pointer listeners: the parent owns hit-testing, capture and input deltas.
 * Returns Promise<controller>
 * after the first real frame; starts inactive at the accepted near-side pose.
 * Pass an AbortSignal to cancel initialization/unmount before the promise resolves.
 * assetBase is a browser URL directory (absolute URL, root path, or relative path).
 * onReady(state) is called after first render AND each successful context restore.
 * Reduced motion defaults to the OS preference; setReducedMotion overrides it.
 */
export async function createMoonScene(host, {
  onReady, onError, assetBase = '/assets/', initialSettings,
  signal, reducedMotion,
} = {}) {
  if (!host || typeof host.appendChild !== 'function') {
    throw new TypeError('createMoonScene requires a DOM host element.');
  }
  const doc = host.ownerDocument;
  const win = doc?.defaultView;
  if (!win) throw new TypeError('createMoonScene requires a connected browser document.');
  const abortError = () => new DOMException('Moon scene initialization aborted.', 'AbortError');
  if (signal?.aborted) throw abortError();

  let renderer, composer, pendingRenderTarget, resizeObserver;
  let moon, halo, referenceRim, albedoTexture, heightTexture;
  let frame = 0;
  let frameCount = 0;
  let disposed = false;
  let ready = false;
  let initialized = false;
  let active = false;
  let lostContext = false;
  let lastError, shaderError;
  let settings = sanitizeSettings(DEFAULT_SETTINGS, initialSettings);
  let time = 0;
  let dragging = false;
  let inertiaActive = false;
  // Horizontal input -> world Y, vertical input -> world X. Radians / second.
  let velocityX = 0, velocityY = 0;
  let lastDragTime = 0;
  let ambientResumeTime = AMBIENT_RESUME_SECONDS;
  let previousTime = win.performance.now();
  let dirty = true;
  let width = 1, height = 1, pixelRatio = 1;
  let contextWaiter;
  let rejectCancelled;
  const cancelled = new Promise((_, reject) => { rejectCancelled = reject; });
  // Disposal after successful initialization must not create an unhandled rejection.
  cancelled.catch(() => {});
  const resources = [];
  const passes = [];
  const eventCleanups = [];
  const media = win.matchMedia?.('(prefers-reduced-motion: reduce)');
  let followSystemMotion = typeof reducedMotion !== 'boolean';
  let motionReduced = followSystemMotion ? Boolean(media?.matches) : reducedMotion;
  const scene = new THREE.Scene();
  scene.name = 'Moon / embedded accepted illustrated globe V3';
  const camera = new THREE.OrthographicCamera(-1.4, 1.4, 1.4, -1.4, 0.1, 30);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);
  const lightWorld = new THREE.Vector3();
  const lightView = new THREE.Vector3();
  const worldY = new THREE.Vector3(0, 1, 0);
  const worldX = new THREE.Vector3(1, 0, 0);
  const assets = {
    albedo: assetURL(assetBase, LUNAR_ASSETS.albedo, doc.baseURI),
    height: assetURL(assetBase, LUNAR_ASSETS.height, doc.baseURI),
  };

  function reportError(error) {
    const normalized = error instanceof Error ? error : new Error(String(error));
    lastError = normalized.message;
    if (!disposed && typeof onError === 'function') {
      try { onError(normalized); } catch (callbackError) { console.error(callbackError); }
    }
    return normalized;
  }

  function listen(target, name, callback, options) {
    target.addEventListener(name, callback, options);
    eventCleanups.push(() => target.removeEventListener(name, callback, options));
  }

  function getState() {
    return {
      ready: ready && !disposed && !lostContext,
      active, disposed, contextLost: lostContext, reducedMotion: motionReduced,
      framePending: frame !== 0, frameCount, time,
      dragging, inertiaActive,
      settings: { ...settings },
      modelVersion: 'global-art-v3',
      materialProvenance: MATERIAL_PROVENANCE,
      surfaceCoverage: 'global',
      threeRevision: THREE.REVISION,
      backend: 'WebGL2',
      camera: camera.position.toArray(), cameraZoom: camera.zoom,
      rotation: moon?.rotation.toArray().slice(0, 3) ?? [0, BASE_ROTATION_Y, 0],
      quaternion: moon?.quaternion.toArray()
        ?? [0, Math.sin(BASE_ROTATION_Y / 2), 0, Math.cos(BASE_ROTATION_Y / 2)],
      dimensions: { width, height, pixelRatio,
        drawingBufferWidth: renderer?.domElement.width ?? 0,
        drawingBufferHeight: renderer?.domElement.height ?? 0 },
      assets: { ...LUNAR_ASSETS, ...assets,
        albedoSize: albedoTexture ? [albedoTexture.image.width, albedoTexture.image.height] : null,
        heightSize: heightTexture ? [heightTexture.image.width, heightTexture.image.height] : null },
      mesh: { segments: [WIDTH_SEGMENTS, HEIGHT_SEGMENTS],
        vertices: moon?.geometry.attributes.position.count ?? 0,
        triangles: (moon?.geometry.index.count ?? 0) / 3 },
      rendererInfo: {
        calls: renderer?.info.render.calls ?? 0,
        triangles: renderer?.info.render.triangles ?? 0,
        points: renderer?.info.render.points ?? 0,
        geometries: renderer?.info.memory.geometries ?? 0,
        textures: renderer?.info.memory.textures ?? 0,
        programs: renderer?.info.programs?.length ?? 0,
      },
      ...(lastError ? { lastError } : {}),
    };
  }

  function cancelFrame() {
    if (frame) win.cancelAnimationFrame(frame);
    frame = 0;
  }

  function schedule() {
    if (!frame && active && ready && !disposed && !lostContext
        && (dirty || (!dragging && !motionReduced && (settings.motion || inertiaActive)))) {
      frame = win.requestAnimationFrame(animate);
    }
  }

  function clearInertia() {
    velocityX = 0;
    velocityY = 0;
    inertiaActive = false;
  }

  function clearInteraction() {
    dragging = false;
    clearInertia();
    ambientResumeTime = AMBIENT_RESUME_SECONDS;
  }

  function canDrag() {
    return ready && active && !disposed && !lostContext && Boolean(moon)
      && !renderer.getContext().isContextLost();
  }

  // These unit axes and Three's rotateOnWorldAxis scratch quaternion are reused.
  // Only the globe owns its pose; settings, camera and halo never overwrite it.
  function rotateGlobe(horizontal, vertical) {
    if (horizontal) moon.rotateOnWorldAxis(worldY, horizontal);
    if (vertical) moon.rotateOnWorldAxis(worldX, vertical);
    moon.quaternion.normalize();
  }

  function beginDrag() {
    if (!canDrag()) return false;
    clearInertia();
    dragging = true;
    ambientResumeTime = 0;
    lastDragTime = previousTime = win.performance.now();
    cancelFrame();
    schedule(); // At most one already-dirty redraw, never a stationary drag loop.
    return true;
  }

  function dragBy(deltaXrad, deltaYrad, elapsedSeconds) {
    if (!dragging || !canDrag()
        || !Number.isFinite(deltaXrad) || !Number.isFinite(deltaYrad)
        || !Number.isFinite(elapsedSeconds) || elapsedSeconds <= 0) return false;
    rotateGlobe(deltaXrad, deltaYrad);
    if (motionReduced) clearInertia();
    else {
      const dt = Math.max(elapsedSeconds, 0.001);
      let sampleX = deltaXrad / dt;
      let sampleY = deltaYrad / dt;
      const speed = Math.hypot(sampleX, sampleY);
      const scale = speed > MAX_DRAG_SPEED ? MAX_DRAG_SPEED / speed : 1;
      sampleX *= scale;
      sampleY *= scale;
      const blend = -Math.expm1(-dt / VELOCITY_SMOOTH_SECONDS);
      velocityX += (sampleX - velocityX) * blend;
      velocityY += (sampleY - velocityY) * blend;
    }
    lastDragTime = win.performance.now();
    dirty = true;
    schedule(); // Also redraws manual input under system reduced motion.
    return true;
  }

  function endDrag(cancelled = false) {
    if (!dragging) return false;
    dragging = false;
    const now = win.performance.now();
    // A held-still pointer must not release an old fling; no idle rAF needed.
    const idleDecay = Math.exp(-Math.max(0, (now - lastDragTime) / 1000) / INERTIA_SECONDS);
    velocityX *= idleDecay;
    velocityY *= idleDecay;
    if (cancelled || motionReduced || !canDrag()) clearInertia();
    else inertiaActive = Math.hypot(velocityX, velocityY) > INERTIA_STOP_SPEED;
    if (!inertiaActive) clearInertia();
    ambientResumeTime = 0;
    previousTime = now;
    schedule();
    return true;
  }

  // Integral of smoothstep(0, 1, t), for frame-rate-independent ambient ramp.
  function ambientIntegral(seconds) {
    const u = Math.min(seconds / AMBIENT_RESUME_SECONDS, 1);
    return AMBIENT_RESUME_SECONDS * (u * u * u - 0.5 * u * u * u * u)
      + Math.max(0, seconds - AMBIENT_RESUME_SECONDS);
  }

  function resize() {
    if (disposed || !renderer || lostContext) return;
    const rect = host.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width || host.clientWidth || 1));
    height = Math.max(1, Math.round(rect.height || host.clientHeight || 1));
    pixelRatio = Math.min(win.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    composer?.setPixelRatio(pixelRatio);
    composer?.setSize(width, height);
    const aspect = width / height;
    // Accepted framing: diameter 77% of the short edge; host owns CSS sizing.
    const halfHeight = 1.30 / Math.min(aspect, 1);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    dirty = true;
    schedule();
  }

  function applySettings() {
    const azimuth = settings.azimuth * DEG;
    const elevation = settings.elevation * DEG;
    lightWorld.set(
      Math.sin(azimuth) * Math.cos(elevation), Math.sin(elevation),
      Math.cos(azimuth) * Math.cos(elevation),
    ).normalize();
    if (settings.lightFollow) {
      camera.updateMatrixWorld();
      lightWorld.transformDirection(camera.matrixWorld);
    }
    if (moon) {
      moon.material.uniforms.uShading.value = settings.shading;
      moon.material.uniforms.uExposure.value = settings.exposure;
      moon.material.uniforms.uDarkPaintRetention.value = settings.darkPaintRetention;
      moon.material.uniforms.uRelief.value = settings.relief;
      moon.material.uniforms.uTint.value = settings.tint;
    }
    if (halo) {
      halo.material.uniforms.uHalo.value = settings.halo;
      halo.visible = settings.halo > 0;
    }
    if (referenceRim) referenceRim.visible = settings.referenceRim;
    dirty = true;
  }

  function render() {
    camera.updateMatrixWorld();
    lightView.copy(lightWorld).transformDirection(camera.matrixWorldInverse);
    moon.material.uniforms.uLightDirection.value.copy(lightView);
    halo.quaternion.copy(camera.quaternion);
    referenceRim.quaternion.copy(camera.quaternion);
    renderer.info.reset();
    // Clear the real canvas every time: OutputPass blends premultiplied coverage.
    // Without this clear a transparent embed accumulates limb light across frames.
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = settings.exposure;
    composer.render();
    if (shaderError) throw shaderError;
    dirty = false;
    frameCount += 1;
  }

  function renderOnce() {
    if (!ready || disposed || lostContext) return;
    try { render(); } catch (error) {
      ready = false;
      clearInteraction();
      cancelFrame();
      reportError(error);
    }
  }

  function animate(now) {
    frame = 0;
    if (disposed || lostContext || !ready || !active) return;
    const dt = Math.min(Math.max((now - previousTime) / 1000, 0), 0.05);
    previousTime = now;
    if (pixelRatio !== Math.min(win.devicePixelRatio || 1, 2)) resize();
    if (!dragging && !motionReduced) {
      let horizontal = 0, vertical = 0;
      if (inertiaActive) {
        const decay = Math.exp(-dt / INERTIA_SECONDS);
        const travel = INERTIA_SECONDS * (1 - decay);
        horizontal = velocityX * travel;
        vertical = velocityY * travel;
        velocityX *= decay;
        velocityY *= decay;
        if (Math.hypot(velocityX, velocityY) <= INERTIA_STOP_SPEED) clearInertia();
      }
      if (settings.motion) {
        time += dt;
        horizontal += AMBIENT_SPEED * (ambientIntegral(ambientResumeTime + dt)
          - ambientIntegral(ambientResumeTime));
        ambientResumeTime = Math.min(AMBIENT_RESUME_SECONDS, ambientResumeTime + dt);
      }
      if (horizontal || vertical) {
        rotateGlobe(horizontal, vertical);
        dirty = true;
      }
    }
    if (dirty) renderOnce();
    schedule();
  }

  function setActive(value) {
    if (disposed) return;
    const next = Boolean(value);
    if (next === active) return;
    active = next;
    previousTime = win.performance.now();
    if (!active) { clearInteraction(); cancelFrame(); }
    else { dirty = true; schedule(); }
  }

  function setSettings(partial) {
    if (disposed) return;
    settings = sanitizeSettings(settings, partial);
    applySettings();
    previousTime = win.performance.now();
    cancelFrame();
    // Inactive changes are batched until activation or explicit renderOnce().
    schedule();
  }

  function updateReducedMotion(value) {
    if (disposed || motionReduced === value) return;
    motionReduced = value;
    if (motionReduced) clearInertia();
    previousTime = win.performance.now();
    cancelFrame();
    dirty = true;
    // Static redraw only while enabled; inactive hosts retain the dirty state.
    if (active) renderOnce();
    schedule();
  }

  function setReducedMotion(value) {
    if (disposed) return;
    followSystemMotion = typeof value !== 'boolean';
    updateReducedMotion(followSystemMotion ? Boolean(media?.matches) : value);
  }

  function disposeComposer() {
    for (const pass of passes) pass.dispose?.();
    passes.length = 0;
    composer?.dispose();
    composer = undefined;
    pendingRenderTarget?.dispose();
    pendingRenderTarget = undefined;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    ready = false;
    active = false;
    clearInteraction();
    cancelFrame();
    rejectCancelled(abortError());
    contextWaiter = undefined;
    resizeObserver?.disconnect();
    for (const cleanup of eventCleanups) cleanup();
    eventCleanups.length = 0;
    disposeComposer();
    for (const resource of resources) resource.dispose();
    resources.length = 0;
    scene.clear();
    renderer?.dispose();
    renderer?.domElement.remove();
    // The canvas is exclusively owned; release its GL context on final teardown.
    renderer?.forceContextLoss();
  }

  function configureRenderer() {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    renderer.info.autoReset = false;
    renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
      shaderError = new Error([
        'Moon shader compilation failed.', gl.getProgramInfoLog(program),
        gl.getShaderInfoLog(vertex), gl.getShaderInfoLog(fragment),
      ].filter(Boolean).join('\n'));
    };
  }

  function finishReady() {
    if (disposed || lostContext) return;
    // Synchronous compile avoids a compileAsync promise stranded by context loss.
    renderer.compile(scene, camera);
    if (shaderError) throw shaderError;
    render();
    initialized = true;
    ready = true;
    lastError = undefined;
    previousTime = win.performance.now();
    if (typeof onReady === 'function') {
      try { onReady(getState()); } catch (callbackError) { console.error(callbackError); }
    }
    schedule();
  }

  function createComposer() {
    const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      depthBuffer: true,
      stencilBuffer: false,
      samples: Math.min(4, renderer.capabilities.maxSamples),
    });
    // Own the target even if composer construction fails.
    pendingRenderTarget = renderTarget;
    composer = new EffectComposer(renderer, renderTarget);
    pendingRenderTarget = undefined;
    const moonPass = new RenderPass(scene, camera);
    moonPass.clear = true;
    moonPass.clearColor = new THREE.Color(0, 0, 0);
    moonPass.clearAlpha = 0;
    passes.push(moonPass);
    composer.addPass(moonPass);
    const outputPass = new OutputPass();
    passes.push(outputPass);
    // Tone-map straight color at MSAA silhouette pixels, then restore coverage.
    // Applying a nonlinear transfer directly to premultiplied RGB brightens edges.
    outputPass.material.fragmentShader = outputPass.material.fragmentShader
      .replace(
        'gl_FragColor = texture2D( tDiffuse, vUv );',
        `gl_FragColor = texture2D( tDiffuse, vUv );
         float coverage = gl_FragColor.a;
         if (coverage > 0.0001) gl_FragColor.rgb /= coverage;`,
      )
      .replace(/}\s*$/, `
         if (coverage > 0.0001) gl_FragColor.rgb *= coverage;
       }`);
    // Premultiplied composition retains subpixel silhouette coverage and lets
    // optional bloom outside the solid disc add light without adding opacity.
    Object.assign(outputPass.material, {
      transparent: true,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendEquationAlpha: THREE.AddEquation,
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    outputPass.material.depthTest = false;
    outputPass.material.depthWrite = false;
    outputPass.clear = false;
    composer.addPass(outputPass);
  }

  const controller = {
    setActive, setSettings, setReducedMotion, renderOnce, resize, getState, dispose,
    beginDrag, dragBy, endDrag,
  };

  try {
    if (signal) listen(signal, 'abort', dispose, { once: true });
    renderer = new THREE.WebGLRenderer({
      antialias: true, alpha: true, powerPreference: 'high-performance',
      premultipliedAlpha: true,
    });
    configureRenderer();
    const canvas = renderer.domElement;
    canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none;background:transparent;';
    canvas.tabIndex = -1;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.dataset.engine = `three.js r${THREE.REVISION} / WebGL2`;
    host.appendChild(canvas);
    listen(canvas, 'webglcontextlost', (event) => {
      event.preventDefault();
      if (disposed) return;
      lostContext = true;
      ready = false;
      clearInteraction();
      cancelFrame();
      reportError(new Error('WebGL context lost. Waiting for the browser to restore it.'));
    });
    listen(canvas, 'webglcontextrestored', () => {
      if (disposed) return;
      lostContext = false;
      shaderError = undefined;
      if (!initialized) {
        contextWaiter?.();
        contextWaiter = undefined;
        return;
      }
      try {
        // Three rebuilds its GL state first. Rebuild owned FBO/pass state as well.
        configureRenderer();
        disposeComposer();
        for (const resource of resources) {
          if (resource.isTexture || resource.isMaterial) resource.needsUpdate = true;
        }
        createComposer();
        applySettings();
        resize();
        finishReady();
      } catch (error) {
        ready = false;
        cancelFrame();
        reportError(error);
      }
    });
    if (media?.addEventListener) {
      listen(media, 'change', (event) => {
        if (followSystemMotion) updateReducedMotion(event.matches);
      });
    }
    const loader = new THREE.TextureLoader();
    [albedoTexture, heightTexture] = await Promise.race([
      Promise.all([assets.albedo, assets.height].map(async (url) => {
        const loaded = await loader.loadAsync(url);
        // Late siblings after failure/abort must never reattach or leak textures.
        if (disposed) loaded.dispose();
        else resources.push(loaded);
        return loaded;
      })),
      cancelled,
    ]);
    if (disposed) throw abortError();
    albedoTexture.name = 'Hybrid art / approved-pilot-01 + locally stylized NASA global continuation';
    albedoTexture.colorSpace = THREE.SRGBColorSpace;
    albedoTexture.wrapS = THREE.RepeatWrapping;
    albedoTexture.wrapT = THREE.ClampToEdgeWrapping;
    albedoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    albedoTexture.magFilter = THREE.LinearFilter;
    albedoTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    heightTexture.name = 'Art shape / smoothed-compressed LOLA-derived packed uint16';
    heightTexture.colorSpace = THREE.NoColorSpace;
    heightTexture.wrapS = THREE.RepeatWrapping;
    heightTexture.wrapT = THREE.ClampToEdgeWrapping;
    heightTexture.minFilter = THREE.LinearFilter;
    heightTexture.magFilter = THREE.LinearFilter;
    heightTexture.generateMipmaps = false;
    heightTexture.anisotropy = 1;


    const sphereGeometry = new THREE.SphereGeometry(1, WIDTH_SEGMENTS, HEIGHT_SEGMENTS);
    resources.push(sphereGeometry);
    // Conservative bound of the entire packed uint16 height encoding, replacing
    // standalone CPU DEM readback/vertex statistics. Shader geometry is unchanged.
    const maximumEncodedMeters = 65535 * 0.5 - 10000;
    sphereGeometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(),
      1 + maximumEncodedMeters * RANGES.relief[1] * SILHOUETTE_SCALE / MOON_RADIUS_METERS,
    );
    const moonMaterial = new THREE.ShaderMaterial({
      name: 'Moon / hybrid illustrated albedo and softened broad shape',
      uniforms: {
        uAlbedo: { value: albedoTexture },
        uHeight: { value: heightTexture },
        uRadiusMeters: { value: MOON_RADIUS_METERS },
        uSilhouetteScale: { value: SILHOUETTE_SCALE },
        uRelief: { value: settings.relief },
        uTint: { value: settings.tint },
        uTerrainStep: { value: Math.max(Math.PI / heightTexture.image.height, 0.009) },
        uLightDirection: { value: new THREE.Vector3(0, 0, 1) },
        uShading: { value: settings.shading },
        uExposure: { value: settings.exposure },
        uDarkPaintRetention: { value: settings.darkPaintRetention },
      },
      vertexShader: moonVertexShader,
      fragmentShader: moonFragmentShader,
      depthTest: true,
      depthWrite: true,
      side: THREE.FrontSide,
    });
    resources.push(moonMaterial);
    moon = new THREE.Mesh(sphereGeometry, moonMaterial);
    moon.name = 'Moon / complete 360-degree hybrid illustrated globe';
    moon.rotation.y = BASE_ROTATION_Y;
    scene.add(moon);

    const haloGeometry = new THREE.PlaneGeometry(2.50, 2.50);
    const haloMaterial = new THREE.ShaderMaterial({
      name: 'Moon / pale-white rim and outward soft glow',
      uniforms: { uHalo: { value: settings.halo } },
      vertexShader: haloVertexShader,
      fragmentShader: haloFragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.name = 'Moon / view-invariant pale-white aureole';
    // Independent of the moon transform; opaque sphere depth occludes any AA
    // overlap at its limb. No black backing, opaque alpha, or emissive bloom.
    halo.renderOrder = 1;
    scene.add(halo);
    resources.push(haloGeometry, haloMaterial);

    const referenceRimMaterial = new THREE.ShaderMaterial({
      name: 'Moon / optional reference-like cold-white edge',
      vertexShader: haloVertexShader,
      fragmentShader: referenceRimFragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    referenceRim = new THREE.Mesh(haloGeometry, referenceRimMaterial);
    referenceRim.name = 'Moon / removable reference edge trial';
    referenceRim.renderOrder = 2;
    scene.add(referenceRim);
    resources.push(referenceRimMaterial);


    // Context may have been lost while the only two textures were in flight.
    while (!disposed && (lostContext || renderer.getContext().isContextLost())) {
      // The GL flag becomes true before the queued webglcontextlost DOM event.
      lostContext = true;
      await Promise.race([
        new Promise((resolve) => { contextWaiter = resolve; }), cancelled,
      ]);
    }
    if (disposed) throw abortError();
    configureRenderer();
    createComposer();
    applySettings();
    resize();
    if (typeof win.ResizeObserver === 'function') {
      resizeObserver = new win.ResizeObserver(resize);
      resizeObserver.observe(host);
    }
    listen(win, 'resize', resize);
    finishReady();
    if (disposed) throw abortError();
    return controller;
  } catch (error) {
    const normalized = disposed ? error : reportError(error);
    dispose();
    throw normalized;
  }
}
