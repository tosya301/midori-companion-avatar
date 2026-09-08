import { publicFetch } from './public-api.js';
const stage = document.querySelector('.stage');
const avatar = document.querySelector('#avatar');
const voiceRingWave = document.querySelector('.voice-ring-wave');
const voiceRingWash = document.querySelector('.voice-ring-wash');
const voiceVisualizer = document.querySelector('#voiceVisualizer');
const controlCard = document.querySelector('.control-card');
const collapsePanelBtn = document.querySelector('#collapsePanelBtn');
const panelToggleBtn = document.querySelector('#panelToggleBtn');
const heartBurstLayer = document.querySelector('#heartBurstLayer');
const avatarFrame = document.querySelector('#avatarFrame');
const avatarFrameNext = document.querySelector('#avatarFrameNext');
const avatarBlinkHalf = document.querySelector('#avatarBlinkHalf');
const avatarBlinkClosed = document.querySelector('#avatarBlinkClosed');
const avatarSpecialFrame = document.querySelector('#avatarSpecialFrame');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const meterFill = document.querySelector('#meterFill');
const mouth = document.querySelector('#mouth');
const volumeControl = document.querySelector('#volumeControl');
const volumeBtn = document.querySelector('#volumeBtn');
const volumePanel = document.querySelector('#volumePanel');
const volumeText = document.querySelector('#volumeText');
const volumeSlider = document.querySelector('#volumeSlider');
const statusText = document.querySelector('#statusText');
const audioPath = document.querySelector('#audioPath');
const unlockBtn = document.querySelector('#unlockBtn');
const generationStatus = document.querySelector('#generationStatus');
const errorBox = document.querySelector('#errorBox');
const recentList = document.querySelector('#recentList');
const clearRecentBtn = document.querySelector('#clearRecentBtn');
const bridgeStatus = document.querySelector('#bridgeStatus');
const statusDot = document.querySelector('.status-dot');
const siteIconToggleBtn = document.querySelector('#siteIconToggleBtn');
const swayBtn = document.querySelector('#swayBtn');
const avatarSwayStatus = document.querySelector('#avatarSwayStatus');
let avatarSwayFrame = document.querySelector('#avatarSwayFrame');
const freezeBtn = document.querySelector('#freezeBtn');
const cycleDirBtn = document.querySelector('#cycleDirBtn');
const avatarToolbar = document.querySelector('.avatar-toolbar');
const siteIconDock = document.querySelector('#siteIconDock');
const siteIconLinks = Array.from(document.querySelectorAll('.site-icon-link'));
const modeToggleBtn = document.querySelector('#modeToggleBtn');
const midoriInputDock = document.querySelector('#midoriInputDock');
const midoriInput = document.querySelector('#midoriInput');
const midoriInputEnter = document.querySelector('#midoriInputEnter');
const midoriInputStatus = document.querySelector('#midoriInputStatus');
const midoriInputContextToken = document.querySelector('#midoriInputContextToken');
const midoriInputContextName = document.querySelector('#midoriInputContextName');
const midoriReply = document.querySelector('#midoriReply');
const midoriYouTubePlayerDock = document.querySelector('#midoriYouTubePlayerDock');
const midoriYouTubePlayerDragHandle = document.querySelector('#midoriYouTubePlayerDragHandle');
const midoriYouTubePlayerTitle = document.querySelector('#midoriYouTubePlayerTitle');
const midoriYouTubePlayerHost = document.querySelector('#midoriYouTubePlayer');
const midoriYouTubePlayerMinimize = document.querySelector('#midoriYouTubePlayerMinimize');
const midoriYouTubePlayerClose = document.querySelector('#midoriYouTubePlayerClose');
const midoriBilibiliPlayerDock = document.querySelector('#midoriBilibiliPlayerDock');
const midoriBilibiliPlayerDragHandle = document.querySelector('#midoriBilibiliPlayerDragHandle');
const midoriBilibiliPlayerTitle = document.querySelector('#midoriBilibiliPlayerTitle');
const midoriBilibiliPlayerHost = document.querySelector('#midoriBilibiliPlayer');
const midoriBilibiliPlayerMinimize = document.querySelector('#midoriBilibiliPlayerMinimize');
const midoriBilibiliPlayerClose = document.querySelector('#midoriBilibiliPlayerClose');
const nightStarfield = document.querySelector('#nightStarfield');
const nightMoonLayer = document.querySelector('#nightMoonLayer');
const nightMoonCanvas = document.querySelector('#nightMoonCanvas');
const avatarGlow = document.querySelector('.avatar-glow');
const pragmataDrift = document.querySelector('#pragmataDrift');
const pragmataDriftArt = document.querySelector('.pragmata-drift-art');
const nightSpaceship = document.querySelector('#nightSpaceship');
const nightSpaceshipArt = document.querySelector('.night-spaceship-art');

const RECENT_STORAGE_KEY = 'midoriAvatarRecentAudioV1';
const THEME_STORAGE_KEY = 'midoriAvatarThemeV1';
const MIDORI_HERMES_LEGACY_SESSION_STORAGE_KEY = 'midoriHermesSessionV1';
const MIDORI_HERMES_SESSION_STORAGE_PREFIX = 'midoriHermesSessionV2';
const MIDORI_YOUTUBE_PLAYER_POSITION_KEY = 'midoriYouTubePlayerPositionV1';
const MIDORI_YOUTUBE_PLAYER_SIZE_KEY = 'midoriYouTubePlayerSizeV1';
const MIDORI_BILIBILI_PLAYER_POSITION_KEY = 'midoriBilibiliPlayerPositionV1';
const MIDORI_BILIBILI_PLAYER_SIZE_KEY = 'midoriBilibiliPlayerSizeV1';
const MIDORI_YOUTUBE_PLAYER_MIN_WIDTH = 280;
const MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO = 16 / 9;
const MIDORI_YOUTUBE_PLAYER_HEADING_HEIGHT = 36;
const NIGHT_STAR_COUNT = 276;
const NIGHT_BLUE_STAR_COUNT = 36;
const NIGHT_MOON_TEXTURE_URL = './assets/moon/midori-night-cel-moon-candidate-02.png';
const NIGHT_MOON_CYCLE_MS = 150_000;
const NIGHT_MOON_ROLL_CYCLE_MS = 750_000;
const NIGHT_MOON_YAW_DEG = 3.5;
const NIGHT_MOON_PITCH_DEG = 1.2;
const NIGHT_MOON_MAX_DPR = 1.5;
const SHOOTING_STAR_MIN_DELAY_MS = 6_000;
const SHOOTING_STAR_MAX_DELAY_MS = 6_000;
const SHOOTING_STAR_LENGTH_SCALE = 0.9;
const SHOOTING_STAR_SPEED_SCALE = 1.1025;
const PRAGMATA_TILT_MIN_DEG = 0.8;
const PRAGMATA_TILT_MAX_DEG = 1.2;
const PRAGMATA_Y_MIN_PX = 9;
const PRAGMATA_Y_MAX_PX = 13;
const PRAGMATA_ENTRY_REGION_TOP_VH = 0;
const PRAGMATA_ENTRY_REGION_BOTTOM_VH = 73;
const PRAGMATA_ALPHA_CENTER_Y_RATIO = 613 / 1254;
const PRAGMATA_ALPHA_HALF_WIDTH_RATIO = 1095 / 2508;
const PRAGMATA_ALPHA_HALF_HEIGHT_RATIO = 269 / 1254;
const PRAGMATA_GLOW_GUARD_PX = 6;
const NIGHT_SPACESHIP_FIXED_ROUTE_COUNT = 3;
const NIGHT_SPACESHIP_RANDOM_ROUTE_COUNT = 2;
const NIGHT_SPACESHIP_BASE_ROUTE_COUNT = 5;
const NIGHT_SPACESHIP_DIRECTED_ROUTE_COUNT = 10;
const NIGHT_SPACESHIP_PREVIOUS_TRAVEL_DURATION_MS = 8_640;
const NIGHT_SPACESHIP_SPEED_SCALE = 0.3724;
const NIGHT_SPACESHIP_INTERVAL_MS = 48_000;
const NIGHT_SPACESHIP_FADE_FRACTION = 0.04;
const NIGHT_SPACESHIP_FIXED_ROUTES = [
  {
    pairId: 'route-1',
    source: 'reference',
    start: { x: -0.326, y: 1.034 },
    end: { x: 0.484, y: -0.213 },
  },
  {
    pairId: 'route-2',
    source: 'reference',
    start: { x: 0.339, y: 1.185 },
    end: { x: 0.684, y: -0.213 },
  },
  {
    pairId: 'route-3',
    source: 'reference',
    start: { x: 0.604, y: 1.185 },
    end: { x: -0.326, y: 0.199 },
  },
];
const NIGHT_SPACESHIP_RANDOM_EDGE_PAIRS = [
  ['left', 'right'],
  ['bottom', 'top'],
];
const RECENT_LIMIT = 8;
const DIRECTION_SETS = {
  default: {
    label: '原来的衣服',
    base: './assets/directions',
  },
  'midori-new-v2': {
    label: '新衣服',
    base: './assets/direction-sets/midori-new-v2',
  },
};
const DEFAULT_DIRECTION_SET = 'default';
const FROZEN_BLINK_SLOT = 'c2_r2';
const FROZEN_BLINK_FRAMES = {
  half: avatarBlinkHalf,
  closed: avatarBlinkClosed,
};
const FROZEN_BLINK_WAIT_MIN_MS = 6000;
const FROZEN_BLINK_WAIT_MAX_MS = 8000;
const FROZEN_BLINK_HALF_MS = 65;
const FROZEN_BLINK_CLOSED_MS = 85;
const FROZEN_BLINK_RETURN_HALF_MS = 65;
const SPECIAL_VISUAL_STATES = {
  angry_cute_arms_crossed: {
    src: './assets/special-poses/default/angry-cute-arms-crossed.png',
    allowedDirectionSets: [DEFAULT_DIRECTION_SET],
    calibration: { scale: 0.988, x: '1.67%', y: '0.6%' },
  },
};
const FROZEN_CYCLE_SPECIAL_VISUAL_STATE = 'angry_cute_arms_crossed';
const DIRECTION_FRAME_CALIBRATION = {
  // Horizontal alpha-weighted visual centering against the accepted angry pose.
  // Y, scale, and clip calibration remain untouched.
  [DEFAULT_DIRECTION_SET]: {
    c0_r0: { x: '0.294%' }, c0_r1: { x: '-1.852%' }, c0_r2: { x: '0.879%' }, c0_r3: { x: '1.359%' }, c0_r4: { x: '0.688%' },
    c1_r0: { x: '-0.186%' }, c1_r1: { x: '0.276%' }, c1_r2: { x: '-0.119%' }, c1_r3: { x: '0.749%' }, c1_r4: { x: '1.046%' },
    c2_r0: { x: '-0.590%' }, c2_r1: { x: '0.426%' }, c2_r2: { x: '0.333%' }, c2_r3: { x: '0.259%' }, c2_r4: { x: '0.250%' },
    c3_r0: { x: '-0.340%' }, c3_r1: { x: '0.662%' }, c3_r2: { x: '-0.220%' }, c3_r3: { x: '-0.722%' }, c3_r4: { x: '0.780%' },
    c4_r0: { x: '-0.260%' }, c4_r1: { x: '0.144%' }, c4_r2: { x: '-0.131%' }, c4_r3: { x: '0.313%' }, c4_r4: { x: '-0.688%' },
  },
  // Preserve every accepted size/Y/clip tweak while aligning the full new-look pack.
  'midori-new-v2': {
    c0_r0: { x: '-1.340%' },
    c0_r1: { x: '0.376%' },
    c0_r2: { x: '-0.210%' },
    c0_r3: { x: '0.465%' },
    c0_r4: { scale: 0.98, x: '-0.800%', y: '1.0%' },
    c1_r0: { scale: 1.052, x: '0.431%', y: '-2.7%' },
    c1_r1: { x: '0.961%' },
    c1_r2: { x: '-0.054%' },
    c1_r3: { x: '0.624%' },
    c1_r4: { x: '0.367%' },
    c2_r0: { scale: 1.11, x: '0.119%', y: '-3.4%' },
    c2_r1: { x: '0.548%' },
    c2_r2: { x: '0.486%' },
    c2_r3: { x: '0.920%' },
    c2_r4: { scale: 1.03, x: '1.081%', y: '-1.8%' },
    c3_r0: { scale: 1.09, x: '0.833%', y: '-4.6%' },
    c3_r1: { x: '0.739%' },
    c3_r2: { x: '0.352%' },
    c3_r3: { scale: 1.06, x: '-0.197%', y: '-1.1%', clipBottom: '2%' },
    c3_r4: { x: '-0.579%' },
    c4_r0: { scale: 1.09, x: '0.097%', y: '-4.6%' },
    c4_r1: { x: '-0.339%' },
    c4_r2: { x: '-1.327%' },
    c4_r3: { x: '-0.959%' },
    c4_r4: { x: '-2.105%' },
  },
};
// Mode is independent of Freeze. Registry insertion order defines the cycle.
const SWAY_AVATARS = Object.freeze({
  green: { label: '奶绿', src: './assets/sway/milky-green.svg' },
  white: { label: '奶白', src: './assets/sway/milky-white.svg' },
  black: { label: '奶黑', src: './assets/sway/milky-black.svg' },
  swim: { label: '泳装奶绿', src: './assets/sway/swim-milky-green-animated.svg' },
  classic: { label: '初代奶绿', src: './assets/sway/milky-green-v1.1-animated.svg' },
  lil: { label: '奶小绿', src: './assets/sway/lil/bounds.svg', talking: {
    assetBase: './assets/sway/lil/',
    rendererOptions: { idleId: 'mlt-idle-mouth', talkId: 'mlt-speaking-mouth', catId: 'mlt-cat-mouth' },
    idleExpression: { pose: 'cat', every: 2, holdMs: 12000, easeMs: 0, owner: 'cat' },
  } },
});
const SWAY_MODE_ORDER = Object.freeze(['off', ...Object.keys(SWAY_AVATARS)]);
let swayMode = 'off';
let requestedSwayMode = 'off';
let swaySwapToken = 0;
let talkingSway = null;
const DIRECTION_INDEX_MAX = 4;
const DIRECTION_HYSTERESIS = 0.075;
const LOOK_SMOOTHING = 0.2;
const LOOK_SETTLE_EPSILON = 0.002;
let currentDirectionSet = DEFAULT_DIRECTION_SET;
let requestedDirectionSet = DEFAULT_DIRECTION_SET;
let currentDirectionSlot = 'c2_r2';
let requestedDirectionSlot = 'c2_r2';
let requestedDirectionCol = 2;
let requestedDirectionRow = 2;
let activeFrameIndex = 0;
let directionSwapToken = 0;
let targetLookX = 0;
let targetLookY = 0;
let renderedLookX = 0;
let renderedLookY = 0;
let lookRafId = 0;
const avatarFrames = [avatarFrame, avatarFrameNext];
const directionFrameCache = new Map();
const HEART_GLYPHS = ['❤️', '💛'];
const HEARTS_PER_CLICK = 2;
const HEART_INTERACTIVE_SELECTOR = 'button, a, input, textarea, select, summary, details, [role="button"]';
const SITE_ICON_LAYOUT = {
  youtube: { x: 16, y: 34 },
  x: { x: 18, y: 64 },
  figma: { x: 16, y: 84 },
  gmail: { x: 84, y: 50 },
  spotify: { x: 84, y: 24 },
  bilibili: { x: 84, y: 76 },
  blender: { x: 16, y: 14 },
};
const MIDORI_INPUT_CONTEXTS = {
  youtube: '搜索、播放或查看 YouTube 内容',
  x: '查看、搜索或发布 X 动态',
  figma: '打开或处理 Figma 设计',
  gmail: '查看、搜索或处理 Gmail 邮件',
  spotify: '想听什么？也可以让阿绿推荐一首歌',
  bilibili: '查看动态、视频，或让阿绿准备发布和评论',
};
const MIDORI_INPUT_DEFAULT_PLACEHOLDER = '和阿绿说点什么';
const MIDORI_INPUT_BASE_HEIGHT = 42.24;
const MIDORI_INPUT_LINE_HEIGHT = 17;
const MIDORI_INPUT_MAX_ROWS = 4;
const MIDORI_REPLY_TYPE_INTERVAL_MS = 24;
const MIDORI_REPLY_THINKING_TEXT = '阿绿正在组织语言';
const MIDORI_REPLY_THINKING_DOT_COUNT = 6;
const MIDORI_REPLY_THINKING_INTERVAL_MS = 500;
const MIDORI_REPLY_INPUT_PREVIEW_MAX_GRAPHEMES = 48;
const MIDORI_CHAT_REQUEST_TIMEOUT_MS = 120_000;
const MIDORI_REPLY_RETENTION_MS = 60_000;
const MIDORI_REPLY_FADE_MS = 500;
const MIDORI_REPLY_WHEEL_SCALE = 0.5625;
const MIDORI_REPLY_SEGMENTER = typeof Intl.Segmenter === 'function'
  ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  : null;
const SITE_ICON_UNREAD_STORAGE_PREFIX = 'midori.siteIconUnread.';
const GMAIL_UNREAD_ENDPOINT = '/api/gmail-unread';
const GMAIL_UNREAD_POLL_MS = 60_000;
const GMAIL_UNREAD_REQUEST_TIMEOUT_MS = 8_000;
const SITE_ICON_TEXTURE_GUARD_MARGIN = 18;
const SITE_ICON_BOUNDARY_GAP_PX = 1;
const SITE_ICON_TOOLBAR_GUARD_MARGIN = 12;
const SITE_ICON_PAIR_COLLISION_PADDING = 0.6;
const SITE_ICON_PAIR_MAX_SEPARATION_STEP = 2.4;
const SITE_ICON_COLLISION_SCALE = 0.85;
const SITE_ICON_WOBBLE_MAX_DEG = 2.2;
const SITE_ICON_APPEARANCE_GUARD_PX = 2;
const SITE_ICON_AVATAR_BOUNDS_STRIDE = 4;
const SITE_ICON_AVATAR_ALPHA_THRESHOLD = 16;
const SITE_ICON_DRAG_HOLD_MS = 340;
const SITE_ICON_DRAG_CANCEL_PX = 8;
const SITE_ICON_RESPAWN_FADE_MS = 450;
const VOICE_RING_CENTER = 100;
const VOICE_RING_RADIUS = 72;
const VOICE_WAVE_POINT_COUNT = 64;
const VOICE_WAVE_RADIUS = 82;
const VOICE_RING_SPEAK_THRESHOLD = 0.035;
const VOICE_CAPSULE_CSS_W = 520;
const VOICE_CAPSULE_CSS_H = 360;
const VOICE_CAPSULE_BAR_COUNT = 7;
const VOICE_CAPSULE_ENVELOPE = [0.32, 0.52, 0.78, 1.00, 0.86, 0.58, 0.34];
const VOICE_CAPSULE_BAR_W = 17;
const VOICE_CAPSULE_GAP = 11.52;
const VOICE_CAPSULE_MAX_H = 217;
const VOICE_CAPSULE_MIN_H = VOICE_CAPSULE_BAR_W;
const VOICE_CAPSULE_UPDATE_MS = 25;
const VOICE_CAPSULE_ATTACK_TAU = 15;
const VOICE_CAPSULE_RELEASE_TAU = 40.5;
const VOICE_CAPSULE_FREQ_LO = 150;
const VOICE_CAPSULE_FREQ_HI = 4800;
const VOICE_CAPSULE_LOW_SHELF_HZ = 400;
const VOICE_CAPSULE_LOW_SHELF_GAIN = 0.45;
const VOICE_CAPSULE_NOISE_GATE = 0.06;
const VOICE_CAPSULE_CURVE = 1.2;
const voiceCapsuleBandRanges = (() => {
  const ranges = [];
  const logLo = Math.log(VOICE_CAPSULE_FREQ_LO);
  const logHi = Math.log(VOICE_CAPSULE_FREQ_HI);
  for (let i = 0; i < VOICE_CAPSULE_BAR_COUNT; i += 1) {
    const a = Math.exp(logLo + (logHi - logLo) * (i / VOICE_CAPSULE_BAR_COUNT));
    const b = Math.exp(logLo + (logHi - logLo) * ((i + 1) / VOICE_CAPSULE_BAR_COUNT));
    ranges.push([a, b]);
  }
  return ranges;
})();

const params = new URLSearchParams(window.location.search);
const bg = params.get('bg');
const requestedTheme = params.get('theme');
const liveMode = params.get('live') === '1' || params.get('live') === 'true';
const mouthMode = params.get('mouth');
const voiceMode = params.get('voice');
const shootingStarPreviewMode = params.get('meteor') === 'preview';
const nightMoonPhaseValue = Number.parseFloat(params.get('moonPhase') ?? '');
const nightMoonPreviewPhase = Number.isFinite(nightMoonPhaseValue)
  ? clamp(nightMoonPhaseValue, 0, 1)
  : null;
const voicePreviewMode = voiceMode === 'preview' || (liveMode && voiceMode === 'active');
if (bg === 'transparent') document.body.classList.add('transparent');
if (bg === 'chromakey') document.body.classList.add('chromakey');
if (liveMode) document.body.classList.add('live-select-mode');
if (mouthMode === 'overlay') document.body.classList.add('mouth-overlay');

let audioCtx;
let analyser;
let voiceCapsuleAnalyser;
let sourceNode;
let data;
let voiceCapsuleFreqData;
let env = 0;
let raf;
let voicePreviewRaf;
let voiceCapsuleDpr = 0;
let voiceCapsuleLastUpdate = 0;
let voiceCapsulePrevNow = 0;
let liveAudioUnlocked = false;
let currentSpeechItem = null;
let currentPlaybackMeta = null;
let midoriChatBusy = false;
let activeMidoriRequest = null;
let midoriYouTubeApiPromise = null;
let midoriYouTubePlayer = null;
let midoriMediaGeneration = 0;
let midoriYouTubePlayResolve = null;
let midoriYouTubePlayReject = null;
let midoriYouTubePlayTimeout = 0;
let midoriReplyTargetText = '';
let midoriReplyTargetUnits = [];
let midoriReplyRenderedUnits = 0;
let midoriReplyTypingTimer = 0;
let midoriReplyThinkingTimer = 0;
let midoriReplyThinkingDots = 0;
let midoriReplySubmittedPreview = '';
let midoriReplyRetentionTimer = 0;
let midoriReplyFadeTimer = 0;
let midoriReplySelectionScrollLock = null;
let activeSpecialVisualState = '';
let frozenCycleSpecialVisualState = '';
let visualActivationArmed = false;
let speechQueue = [];
let speechQueueStarting = false;
let speechPlaybackGeneration = 0;
let recentItems = loadRecentItems();
const seenEventIds = new Set();
const SEEN_EVENT_IDS_LIMIT = 2048;
const EVENT_BRIDGE_RETRY_MAX_MS = 30_000;
let eventBridge = null;
let eventBridgeRetryTimer = 0;
let eventBridgeRetryAttempt = 0;
let eventBridgeCursor = '';
let activeErrorOwner = null;
const voiceCapsuleCtx = voiceVisualizer?.getContext('2d') || null;
const voiceCapsuleTargets = new Float32Array(VOICE_CAPSULE_BAR_COUNT);
const voiceCapsuleLevels = new Float32Array(VOICE_CAPSULE_BAR_COUNT);
let isAvatarFrozen = false;
let blinkScheduleTimer = 0;
let blinkSequenceTimers = [];
let blinkSequenceToken = 0;
let frozenC2R2ReturnFadeCleanup = null;
let isControlPanelCollapsed = false;
let frozenDirectionCol = 2;
let frozenDirectionRow = 2;
let siteIconDragState = null;
let siteIconStates = [];
let siteIconRaf = 0;
let siteIconLastTs = 0;
let siteIconTransitionTimer = 0;
let areSiteIconsCollapsed = false;
let siteIconForbiddenRect = null;
const siteIconAvatarBoundsCache = new Map();
let siteIconForbiddenRefreshPromise = null;
let siteIconLastForbiddenRefresh = 0;
let gmailUnreadPollTimer = 0;
let gmailUnreadInFlight = false;
let shootingStarTimer = 0;
let shootingStarPreviewConsumed = false;
let nightMoonGpu = null;
let nightMoonRaf = 0;
let nightMoonReady = false;
let nightMoonReducedMotionMedia = null;
let nightMoonResizeObserver = null;
let nightMoonLayoutSyncRaf = 0;
let nightMoonLastPhase = 0;
let nightMoonLastRollPhase = 0;
let nightMoonLastYawDeg = 0;
let nightMoonLastPitchDeg = 0;
let nightMoonLastRollDeg = 0;
let nightSpaceshipBaseRoutes = [];
let nightSpaceshipRouteDeck = [];
let nightSpaceshipLastPairId = null;
let nightSpaceshipCurrentEntry = null;
let nightSpaceshipAnimation = null;
let nightSpaceshipTimer = 0;
let nightSpaceshipNextFlightAt = 0;
let nightSpaceshipReducedMotionMedia = null;
let nightSpaceshipPreviewActive = false;
let nightSpaceshipHistory = [];
let nightSpaceshipInitialized = false;
const CYCLE_DIR_SLOTS = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
  [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
  [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
];
let cycleDirIndex = CYCLE_DIR_SLOTS.findIndex(([c, r]) => c === 2 && r === 2);

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomizePragmataTiltAmplitude() {
  if (!pragmataDriftArt) return;
  const amplitude = randomBetween(PRAGMATA_TILT_MIN_DEG, PRAGMATA_TILT_MAX_DEG);
  const formattedAmplitude = amplitude.toFixed(3);
  pragmataDriftArt.style.setProperty('--pragmata-tilt-amplitude', `${formattedAmplitude}deg`);
  pragmataDriftArt.dataset.tiltAmplitudeDeg = formattedAmplitude;
}

function randomizePragmataYAmplitude() {
  if (!pragmataDriftArt) return;
  const amplitude = randomBetween(PRAGMATA_Y_MIN_PX, PRAGMATA_Y_MAX_PX);
  const formattedAmplitude = amplitude.toFixed(3);
  pragmataDriftArt.style.setProperty('--pragmata-y-amplitude', `${formattedAmplitude}px`);
  pragmataDriftArt.dataset.yAmplitudePx = formattedAmplitude;
}

function pragmataSafeEntryCenterRange() {
  if (!avatar || !pragmataDrift) return;
  const artWidth = Number.parseFloat(getComputedStyle(pragmataDrift).width);
  if (!Number.isFinite(artWidth) || artWidth <= 0) return;

  const maxTiltRadians = PRAGMATA_TILT_MAX_DEG * Math.PI / 180;
  const alphaHalfWidth = artWidth * PRAGMATA_ALPHA_HALF_WIDTH_RATIO;
  const alphaHalfHeight = artWidth * PRAGMATA_ALPHA_HALF_HEIGHT_RATIO;
  const rotatedHalfHeight = alphaHalfWidth * Math.sin(maxTiltRadians)
    + alphaHalfHeight * Math.cos(maxTiltRadians);
  const motionGuard = rotatedHalfHeight + PRAGMATA_Y_MAX_PX + PRAGMATA_GLOW_GUARD_PX;
  const regionTopPx = window.innerHeight * PRAGMATA_ENTRY_REGION_TOP_VH / 100;
  const regionBottomPx = window.innerHeight * PRAGMATA_ENTRY_REGION_BOTTOM_VH / 100;
  const safeMinPx = regionTopPx + motionGuard;
  const safeMaxPx = regionBottomPx - motionGuard;
  const midpointPx = (regionTopPx + regionBottomPx) / 2;
  const hasRoom = safeMinPx <= safeMaxPx;

  return {
    artWidth,
    safeMinVh: (hasRoom ? safeMinPx : midpointPx) / window.innerHeight * 100,
    safeMaxVh: (hasRoom ? safeMaxPx : midpointPx) / window.innerHeight * 100,
    fallbackVh: midpointPx / window.innerHeight * 100,
  };
}

function setPragmataEntryY(targetVh) {
  const safeRange = pragmataSafeEntryCenterRange();
  if (!safeRange) return;
  const avatarRect = avatar.getBoundingClientRect();
  const avatarTransform = new DOMMatrixReadOnly(getComputedStyle(avatar).transform);
  const avatarLayoutTop = avatarRect.top - avatarTransform.f;
  const clampedTargetVh = clamp(targetVh, safeRange.safeMinVh, safeRange.safeMaxVh);

  const targetViewportY = window.innerHeight * clampedTargetVh / 100;
  const alphaCenterY = safeRange.artWidth * PRAGMATA_ALPHA_CENTER_Y_RATIO;
  const entryTop = targetViewportY - avatarLayoutTop - alphaCenterY;
  pragmataDrift.style.setProperty('--pragmata-entry-top', `${entryTop.toFixed(3)}px`);
  pragmataDrift.dataset.entryYVh = clampedTargetVh.toFixed(3);
  pragmataDrift.dataset.entryTopPx = entryTop.toFixed(3);
  pragmataDrift.dataset.entrySafeMinVh = safeRange.safeMinVh.toFixed(3);
  pragmataDrift.dataset.entrySafeMaxVh = safeRange.safeMaxVh.toFixed(3);
}

function randomizePragmataEntryY() {
  const safeRange = pragmataSafeEntryCenterRange();
  if (!safeRange) return;
  const targetVh = safeRange.safeMaxVh > safeRange.safeMinVh
    ? randomBetween(safeRange.safeMinVh, safeRange.safeMaxVh)
    : safeRange.fallbackVh;
  setPragmataEntryY(targetVh);
}

function syncPragmataEntryY() {
  const targetVh = Number.parseFloat(pragmataDrift?.dataset.entryYVh || '');
  if (Number.isFinite(targetVh)) setPragmataEntryY(targetVh);
}

function setupPragmataDriftMotion() {
  if (!pragmataDrift || !pragmataDriftArt) return;
  randomizePragmataTiltAmplitude();
  randomizePragmataYAmplitude();
  randomizePragmataEntryY();
  pragmataDrift.addEventListener('animationiteration', (event) => {
    if (event.animationName === 'pragmata-zero-g-crossing') randomizePragmataEntryY();
  });
  pragmataDriftArt.addEventListener('animationiteration', (event) => {
    if (event.animationName === 'pragmata-zero-g-phase') {
      randomizePragmataTiltAmplitude();
    } else if (event.animationName === 'pragmata-zero-g-y-amplitude-cue') {
      randomizePragmataYAmplitude();
    }
  });
}

function randomNightSpaceshipEdgePoint(edge) {
  if (edge === 'left') return { x: -0.20, y: randomBetween(0.12, 0.88) };
  if (edge === 'right') return { x: 1.20, y: randomBetween(0.12, 0.88) };
  if (edge === 'top') return { x: randomBetween(0.12, 0.88), y: -0.24 };
  return { x: randomBetween(0.12, 0.88), y: 1.24 };
}

function generateNightSpaceshipBaseRoutes() {
  const fixedRoutes = NIGHT_SPACESHIP_FIXED_ROUTES.map((route) => ({
    ...route,
    start: { ...route.start },
    end: { ...route.end },
  }));
  const randomRoutes = NIGHT_SPACESHIP_RANDOM_EDGE_PAIRS.map(([startEdge, endEdge], index) => ({
    pairId: `route-${NIGHT_SPACESHIP_FIXED_ROUTE_COUNT + index + 1}`,
    source: 'generated',
    startEdge,
    endEdge,
    start: randomNightSpaceshipEdgePoint(startEdge),
    end: randomNightSpaceshipEdgePoint(endEdge),
  }));
  const routes = [...fixedRoutes, ...randomRoutes];
  if (routes.length !== NIGHT_SPACESHIP_BASE_ROUTE_COUNT
      || randomRoutes.length !== NIGHT_SPACESHIP_RANDOM_ROUTE_COUNT) {
    throw new Error('Night spaceship route-count invariant failed');
  }
  return routes;
}

function shuffleNightSpaceshipValues(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function shuffledNightSpaceshipPairOrder(disallowedFirst = null) {
  const pairIds = nightSpaceshipBaseRoutes.map((route) => route.pairId);
  for (let attempt = 0; attempt < 64; attempt += 1) {
    const shuffled = shuffleNightSpaceshipValues(pairIds);
    if (!disallowedFirst || shuffled[0] !== disallowedFirst) return shuffled;
  }
  const fallback = [...pairIds];
  if (disallowedFirst && fallback[0] === disallowedFirst) {
    [fallback[0], fallback[1]] = [fallback[1], fallback[0]];
  }
  return fallback;
}

function buildNightSpaceshipRouteDeck(previousPairId = null) {
  if (!nightSpaceshipBaseRoutes.length) {
    nightSpaceshipBaseRoutes = generateNightSpaceshipBaseRoutes();
  }
  const firstPairOrder = shuffledNightSpaceshipPairOrder(previousPairId);
  const secondPairOrder = shuffledNightSpaceshipPairOrder(firstPairOrder[firstPairOrder.length - 1]);
  const firstDirectionByPair = new Map(
    firstPairOrder.map((pairId) => [pairId, Math.random() < 0.5 ? 'forward' : 'reverse']),
  );
  const toEntry = (pairId, direction) => ({
    pairId,
    direction,
    reverse: direction === 'reverse',
    directedId: `${pairId}-${direction}`,
  });
  const firstHalf = firstPairOrder.map((pairId) => toEntry(pairId, firstDirectionByPair.get(pairId)));
  const secondHalf = secondPairOrder.map((pairId) => {
    const firstDirection = firstDirectionByPair.get(pairId);
    return toEntry(pairId, firstDirection === 'forward' ? 'reverse' : 'forward');
  });
  const deck = [...firstHalf, ...secondHalf];
  if (deck.length !== NIGHT_SPACESHIP_DIRECTED_ROUTE_COUNT) {
    throw new Error('Night spaceship directed-route invariant failed');
  }
  return deck;
}

function nightSpaceshipMotionEnabled() {
  const captureMode = document.documentElement.dataset.bg === 'transparent'
    || document.documentElement.dataset.bg === 'chromakey';
  return Boolean(
    nightSpaceship
    && nightSpaceshipArt
    && nightSpaceshipInitialized
    && document.documentElement.dataset.theme === 'night'
    && !captureMode
    && !document.hidden
    && !(nightSpaceshipReducedMotionMedia?.matches ?? false)
  );
}

function nextNightSpaceshipRouteEntry() {
  if (!nightSpaceshipRouteDeck.length) {
    nightSpaceshipRouteDeck = buildNightSpaceshipRouteDeck(nightSpaceshipLastPairId);
  }
  const entry = nightSpaceshipRouteDeck.shift();
  nightSpaceshipLastPairId = entry.pairId;
  return entry;
}

function resolveNightSpaceshipRoute(entry) {
  const route = nightSpaceshipBaseRoutes.find((candidate) => candidate.pairId === entry.pairId);
  if (!route || !nightSpaceship) return null;
  const startNorm = entry.reverse ? route.end : route.start;
  const endNorm = entry.reverse ? route.start : route.end;
  const start = { x: startNorm.x * window.innerWidth, y: startNorm.y * window.innerHeight };
  const end = { x: endNorm.x * window.innerWidth, y: endNorm.y * window.innerHeight };
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const rawAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI + 90;
  const angle = ((rawAngle + 180) % 360 + 360) % 360 - 180;
  const distance = Math.hypot(deltaX, deltaY);
  return { route, start, end, angle, distance };
}

function nightSpaceshipTransformForPoint(point, baseCenter, angle) {
  const deltaX = point.x - baseCenter.x;
  const deltaY = point.y - baseCenter.y;
  return `translate3d(${deltaX.toFixed(3)}px, ${deltaY.toFixed(3)}px, 0) rotate(${angle.toFixed(3)}deg)`;
}

function stopNightSpaceshipMotion() {
  if (nightSpaceshipTimer) {
    window.clearTimeout(nightSpaceshipTimer);
    nightSpaceshipTimer = 0;
  }
  nightSpaceshipNextFlightAt = 0;
  if (nightSpaceshipAnimation) {
    nightSpaceshipAnimation.cancel();
    nightSpaceshipAnimation = null;
  }
  nightSpaceshipCurrentEntry = null;
  if (nightSpaceship) {
    nightSpaceship.style.opacity = '0';
    delete nightSpaceship.dataset.nextFlightAt;
    nightSpaceship.dataset.motionState = 'idle';
  }
}

function startNightSpaceshipFlight(entry, { previewProgress = null } = {}) {
  if (!nightSpaceship || !entry) return null;
  if (nightSpaceshipTimer) {
    window.clearTimeout(nightSpaceshipTimer);
    nightSpaceshipTimer = 0;
  }
  nightSpaceshipNextFlightAt = 0;
  delete nightSpaceship.dataset.nextFlightAt;
  if (nightSpaceshipAnimation) {
    nightSpaceshipAnimation.cancel();
    nightSpaceshipAnimation = null;
  }
  nightSpaceship.style.opacity = '0';

  const resolved = resolveNightSpaceshipRoute(entry);
  const referenceResolved = resolveNightSpaceshipRoute({ pairId: 'route-1', reverse: false });
  if (!resolved || !referenceResolved) return null;
  const baseRect = nightSpaceship.getBoundingClientRect();
  const baseCenter = {
    x: baseRect.left + baseRect.width / 2,
    y: baseRect.top + baseRect.height / 2,
  };
  const previousReferenceSpeed = referenceResolved.distance
    / (NIGHT_SPACESHIP_PREVIOUS_TRAVEL_DURATION_MS / 1000);
  const speedPxPerSecond = previousReferenceSpeed * NIGHT_SPACESHIP_SPEED_SCALE;
  const duration = resolved.distance / speedPxPerSecond * 1000;
  const pointAt = (progress) => ({
    x: resolved.start.x + (resolved.end.x - resolved.start.x) * progress,
    y: resolved.start.y + (resolved.end.y - resolved.start.y) * progress,
  });
  const keyframeAt = (progress, opacity, offset) => ({
    offset,
    opacity,
    transform: nightSpaceshipTransformForPoint(pointAt(progress), baseCenter, resolved.angle),
  });

  nightSpaceshipCurrentEntry = entry;
  nightSpaceship.dataset.routePairId = entry.pairId;
  nightSpaceship.dataset.routeDirection = entry.direction;
  nightSpaceship.dataset.directedRouteId = entry.directedId;
  nightSpaceship.dataset.routeSource = resolved.route.source;
  nightSpaceship.dataset.routeDurationMs = duration.toFixed(3);
  nightSpaceship.dataset.routeSpeedPxPerSecond = speedPxPerSecond.toFixed(3);
  nightSpaceship.dataset.deckRemaining = String(nightSpaceshipRouteDeck.length);
  nightSpaceship.dataset.motionState = previewProgress == null ? 'flying' : 'preview';

  nightSpaceshipAnimation = nightSpaceship.animate([
    keyframeAt(0, 0, 0),
    keyframeAt(NIGHT_SPACESHIP_FADE_FRACTION, 1, NIGHT_SPACESHIP_FADE_FRACTION),
    keyframeAt(1 - NIGHT_SPACESHIP_FADE_FRACTION, 1, 1 - NIGHT_SPACESHIP_FADE_FRACTION),
    keyframeAt(1, 0, 1),
  ], {
    duration,
    easing: 'linear',
    fill: 'both',
  });

  const result = {
    ...entry,
    duration,
    speedPxPerSecond,
    angle: resolved.angle,
    start: resolved.start,
    end: resolved.end,
  };

  if (previewProgress != null) {
    nightSpaceshipAnimation.pause();
    nightSpaceshipAnimation.currentTime = duration * clamp(Number(previewProgress) || 0, 0, 1);
    return result;
  }

  nightSpaceshipHistory.push(entry.directedId);
  nightSpaceshipHistory = nightSpaceshipHistory.slice(-64);
  const activeAnimation = nightSpaceshipAnimation;
  activeAnimation.addEventListener('finish', () => {
    if (nightSpaceshipAnimation !== activeAnimation) return;
    activeAnimation.cancel();
    nightSpaceshipAnimation = null;
    nightSpaceshipCurrentEntry = null;
    nightSpaceship.style.opacity = '0';
    nightSpaceship.dataset.motionState = 'waiting';
    if (!nightSpaceshipMotionEnabled()) return;
    scheduleNextNightSpaceshipFlight();
  }, { once: true });
  return result;
}

function playNextNightSpaceshipFlight() {
  if (!nightSpaceshipMotionEnabled() || nightSpaceshipPreviewActive) return;
  startNightSpaceshipFlight(nextNightSpaceshipRouteEntry());
}

function scheduleNextNightSpaceshipFlight() {
  if (!nightSpaceshipMotionEnabled()
      || nightSpaceshipPreviewActive
      || nightSpaceshipAnimation
      || nightSpaceshipTimer) return;
  nightSpaceshipNextFlightAt = Date.now() + NIGHT_SPACESHIP_INTERVAL_MS;
  nightSpaceship.dataset.nextFlightAt = String(nightSpaceshipNextFlightAt);
  nightSpaceship.dataset.motionState = 'waiting';
  nightSpaceshipTimer = window.setTimeout(() => {
    nightSpaceshipTimer = 0;
    nightSpaceshipNextFlightAt = 0;
    delete nightSpaceship.dataset.nextFlightAt;
    if (!nightSpaceshipMotionEnabled() || nightSpaceshipPreviewActive) {
      syncNightSpaceshipMotion();
      return;
    }
    playNextNightSpaceshipFlight();
  }, NIGHT_SPACESHIP_INTERVAL_MS);
}

function syncNightSpaceshipMotion() {
  if (!nightSpaceshipMotionEnabled()) {
    nightSpaceshipPreviewActive = false;
    stopNightSpaceshipMotion();
    return;
  }
  if (nightSpaceshipPreviewActive) return;
  if (!nightSpaceshipAnimation && !nightSpaceshipTimer) scheduleNextNightSpaceshipFlight();
}

function setupNightSpaceshipMotion() {
  if (!nightSpaceship || !nightSpaceshipArt) return;
  nightSpaceshipBaseRoutes = generateNightSpaceshipBaseRoutes();
  nightSpaceshipRouteDeck = [];
  nightSpaceshipInitialized = true;
  nightSpaceshipReducedMotionMedia = window.matchMedia?.('(prefers-reduced-motion: reduce)') || null;
  const handleReducedMotionChange = () => syncNightSpaceshipMotion();
  nightSpaceshipReducedMotionMedia?.addEventListener?.('change', handleReducedMotionChange);
  nightSpaceshipReducedMotionMedia?.addListener?.(handleReducedMotionChange);

  window.__midoriNightSpaceship = {
    getState: () => ({
      baseRouteCount: nightSpaceshipBaseRoutes.length,
      directedRouteCount: NIGHT_SPACESHIP_DIRECTED_ROUTE_COUNT,
      fixedRouteCount: NIGHT_SPACESHIP_FIXED_ROUTE_COUNT,
      randomRouteCount: NIGHT_SPACESHIP_RANDOM_ROUTE_COUNT,
      speedScale: NIGHT_SPACESHIP_SPEED_SCALE,
      intervalMs: NIGHT_SPACESHIP_INTERVAL_MS,
      previousTravelDurationMs: NIGHT_SPACESHIP_PREVIOUS_TRAVEL_DURATION_MS,
      routes: nightSpaceshipBaseRoutes.map((route) => ({
        ...route,
        start: { ...route.start },
        end: { ...route.end },
      })),
      deck: nightSpaceshipRouteDeck.map((entry) => ({ ...entry })),
      current: nightSpaceshipCurrentEntry ? { ...nightSpaceshipCurrentEntry } : null,
      history: [...nightSpaceshipHistory],
      motionState: nightSpaceship.dataset.motionState || '',
      nextFlightAt: nightSpaceshipNextFlightAt || null,
      nextFlightInMs: nightSpaceshipNextFlightAt
        ? Math.max(0, nightSpaceshipNextFlightAt - Date.now())
        : null,
    }),
    buildDeck: (previousPairId = null) => buildNightSpaceshipRouteDeck(previousPairId)
      .map((entry) => ({ ...entry })),
    previewRoute: (pairId = 'route-1', direction = 'forward', progress = 0.5) => {
      nightSpaceshipPreviewActive = true;
      stopNightSpaceshipMotion();
      return startNightSpaceshipFlight({
        pairId,
        direction,
        reverse: direction === 'reverse',
        directedId: `${pairId}-${direction}`,
      }, { previewProgress: progress });
    },
    resume: () => {
      nightSpaceshipPreviewActive = false;
      stopNightSpaceshipMotion();
      syncNightSpaceshipMotion();
    },
    sync: syncNightSpaceshipMotion,
  };
  syncNightSpaceshipMotion();
}

function themeSeededRandom(seed) {
  return function nextRandom() {
    let value = seed += 0x6d2b79f5;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function buildNightStarfield() {
  if (!nightStarfield || nightStarfield.childElementCount) return;
  const random = themeSeededRandom(0x4d49444f);
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < NIGHT_STAR_COUNT; index += 1) {
    const star = document.createElement('span');
    const isBlueStar = index >= NIGHT_STAR_COUNT - NIGHT_BLUE_STAR_COUNT;
    const scaleRoll = random();
    const tintRoll = random();
    const size = isBlueStar
      ? 0.58 + random() * 0.76
      : scaleRoll < 0.70
        ? 0.65 + random() * 0.48
        : scaleRoll < 0.94
          ? 1.15 + random() * 0.58
          : 1.78 + random() * 0.62;
    const opacity = isBlueStar
      ? 0.10 + random() * 0.18
      : 0.18 + random() * (size > 1.75 ? 0.66 : 0.48);
    const duration = 4.6 + random() * 5.4;

    star.className = 'night-star';
    if (isBlueStar) star.classList.add('is-blue');
    else if (tintRoll < 0.09) star.classList.add('is-warm');
    else if (tintRoll < 0.15) star.classList.add('is-mint');
    if (!isBlueStar && size > 1.72 && random() < 0.68) star.classList.add('is-focus');
    if (random() < 0.34) star.classList.add('is-twinkling');

    star.style.setProperty('--star-x', `${1.2 + random() * 97.6}%`);
    star.style.setProperty('--star-y', `${1.5 + random() * 95.5}%`);
    star.style.setProperty('--star-size', `${size.toFixed(2)}px`);
    star.style.setProperty('--star-opacity', opacity.toFixed(2));
    star.style.setProperty('--star-duration', `${duration.toFixed(2)}s`);
    star.style.setProperty('--star-delay', `${(-random() * duration).toFixed(2)}s`);
    fragment.append(star);
  }

  nightStarfield.replaceChildren(fragment);
}

function shootingStarsEnabled() {
  const captureMode = document.documentElement.dataset.bg === 'transparent'
    || document.documentElement.dataset.bg === 'chromakey';
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  return Boolean(
    nightStarfield
    && document.documentElement.dataset.theme === 'night'
    && !captureMode
    && !document.hidden
    && !reducedMotion
  );
}

function spawnShootingStar() {
  if (!shootingStarsEnabled() || nightStarfield.querySelector('.shooting-star')) return null;

  const svgNamespace = 'http://www.w3.org/2000/svg';
  const meteor = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const pathSoft = document.createElementNS(svgNamespace, 'path');
  const path = document.createElementNS(svgNamespace, 'path');
  const origin = document.createElementNS(svgNamespace, 'circle');
  const width = window.innerWidth;
  const height = window.innerHeight;
  const startX = width * randomBetween(0.18, 1.05);
  const startY = height * randomBetween(-0.08, 0.72);
  const travelX = width * randomBetween(0.276, 0.468) * SHOOTING_STAR_LENGTH_SCALE;
  const travelY = height * randomBetween(0.161, 0.306) * SHOOTING_STAR_LENGTH_SCALE;
  const endX = startX - travelX;
  const endY = startY + travelY;
  const controlX = (startX + endX) / 2;
  const controlY = (startY + endY) / 2 - randomBetween(16, 28);
  const drawDuration = randomBetween(700, 1_050) / SHOOTING_STAR_SPEED_SCALE;
  const eraseDuration = drawDuration * 0.55;
  const totalDuration = drawDuration + eraseDuration;
  const tintRoll = Math.random();
  const pathData = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  const removeMeteor = () => meteor.remove();
  const handleMeteorAnimationEnd = (event) => {
    if (event.animationName !== 'shooting-star-erase') return;
    removeMeteor();
  };

  meteor.classList.add('shooting-star');
  if (tintRoll < 0.09) meteor.classList.add('is-warm');
  else if (tintRoll < 0.15) meteor.classList.add('is-mint');
  meteor.setAttribute('viewBox', `0 0 ${width} ${height}`);
  meteor.setAttribute('preserveAspectRatio', 'none');
  meteor.setAttribute('aria-hidden', 'true');
  meteor.style.setProperty('--meteor-draw-duration', `${drawDuration.toFixed(0)}ms`);
  meteor.style.setProperty('--meteor-erase-duration', `${eraseDuration.toFixed(0)}ms`);

  origin.classList.add('shooting-star-origin');
  origin.setAttribute('cx', startX.toFixed(1));
  origin.setAttribute('cy', startY.toFixed(1));
  origin.setAttribute('r', '0.85');
  pathSoft.classList.add('shooting-star-soft');
  pathSoft.setAttribute('d', pathData);
  path.classList.add('shooting-star-core');
  path.setAttribute('d', pathData);
  const pathLength = path.getTotalLength();
  meteor.style.setProperty('--meteor-path-length', `${pathLength.toFixed(1)}px`);
  meteor.style.setProperty('--meteor-path-exit', `${(-pathLength).toFixed(1)}px`);
  meteor.append(origin, pathSoft, path);
  path.addEventListener('animationend', handleMeteorAnimationEnd);
  window.setTimeout(removeMeteor, totalDuration + 250);
  nightStarfield.append(meteor);
  return meteor;
}

function scheduleShootingStar({ immediate = false } = {}) {
  window.clearTimeout(shootingStarTimer);
  shootingStarTimer = 0;
  if (!shootingStarsEnabled()) return;

  const delay = immediate
    ? 180
    : randomBetween(SHOOTING_STAR_MIN_DELAY_MS, SHOOTING_STAR_MAX_DELAY_MS);
  shootingStarTimer = window.setTimeout(() => {
    shootingStarTimer = 0;
    spawnShootingStar();
    scheduleShootingStar();
  }, delay);
}

function syncShootingStarScheduler() {
  window.clearTimeout(shootingStarTimer);
  shootingStarTimer = 0;
  if (!shootingStarsEnabled()) {
    nightStarfield?.querySelector('.shooting-star')?.remove();
    return;
  }

  const immediate = shootingStarPreviewMode && !shootingStarPreviewConsumed;
  if (immediate) shootingStarPreviewConsumed = true;
  scheduleShootingStar({ immediate });
}

function compileNightMoonShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Moon shader compilation failed';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function syncNightMoonLayerLayout() {
  if (!nightMoonLayer || !avatarGlow) return;
  const rect = avatarGlow.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  // Remove the avatar's actual interpolated gaze transform, retaining its
  // neutral -4.6px alignment. Moon layout belongs to the shell, not the pointer.
  const gazeTransform = new DOMMatrixReadOnly(getComputedStyle(avatar).transform);
  nightMoonLayer.style.left = `${rect.left - gazeTransform.m41 - 4.6}px`;
  nightMoonLayer.style.top = `${rect.top - gazeTransform.m42}px`;
  nightMoonLayer.style.width = `${rect.width}px`;
  nightMoonLayer.style.height = `${rect.height}px`;
  nightMoonLayer.dataset.positioned = 'true';
}

function scheduleNightMoonLayerLayoutSync() {
  if (nightMoonLayoutSyncRaf) return;
  nightMoonLayoutSyncRaf = window.requestAnimationFrame(() => {
    nightMoonLayoutSyncRaf = 0;
    syncNightMoonLayerLayout();
    // The retired 2.5D render loop used to track this anchor every frame.
    // Keep tracking only while the shell actually moves, not as an idle GPU loop.
    const shell = avatarGlow?.closest('.avatar-shell');
    if (shell?.getAnimations().some(animation =>
      animation.playState === 'running' && animation.transitionProperty === 'transform')) {
      scheduleNightMoonLayerLayoutSync();
    }
  });
}

function resizeNightMoonCanvas() {
  if (!nightMoonCanvas || !nightMoonGpu) return false;
  syncNightMoonLayerLayout();
  const rect = nightMoonCanvas.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;
  const dpr = Math.min(window.devicePixelRatio || 1, NIGHT_MOON_MAX_DPR);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (nightMoonCanvas.width !== width || nightMoonCanvas.height !== height) {
    nightMoonCanvas.width = width;
    nightMoonCanvas.height = height;
  }
  nightMoonGpu.gl.viewport(0, 0, width, height);
  return true;
}

function renderNightMoonAtPhase(phase, rollPhase = phase * NIGHT_MOON_CYCLE_MS / NIGHT_MOON_ROLL_CYCLE_MS) {
  if (!nightMoonGpu || !resizeNightMoonCanvas()) return;
  const normalizedPhase = ((phase % 1) + 1) % 1;
  const normalizedRollPhase = ((rollPhase % 1) + 1) % 1;
  const theta = normalizedPhase * Math.PI * 2;
  const yawDeg = Math.sin(theta) * NIGHT_MOON_YAW_DEG;
  const pitchDeg = Math.cos(theta) * NIGHT_MOON_PITCH_DEG;
  const rollDeg = normalizedRollPhase * 360;
  const { gl, program, buffer, texture, uniforms } = nightMoonGpu;
  const minSide = Math.min(nightMoonCanvas.width, nightMoonCanvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(nightMoonGpu.positionLocation);
  gl.vertexAttribPointer(nightMoonGpu.positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(uniforms.texture, 0);
  gl.uniform1f(uniforms.yaw, yawDeg * Math.PI / 180);
  gl.uniform1f(uniforms.pitch, pitchDeg * Math.PI / 180);
  gl.uniform1f(uniforms.roll, rollDeg * Math.PI / 180);
  gl.uniform2f(
    uniforms.viewportScale,
    nightMoonCanvas.width / minSide,
    nightMoonCanvas.height / minSide,
  );
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  nightMoonLastPhase = normalizedPhase;
  nightMoonLastRollPhase = normalizedRollPhase;
  nightMoonLastYawDeg = yawDeg;
  nightMoonLastPitchDeg = pitchDeg;
  nightMoonLastRollDeg = rollDeg;
}

function nightMoonMotionEnabled() {
  const captureMode = document.documentElement.dataset.bg === 'transparent'
    || document.documentElement.dataset.bg === 'chromakey';
  return Boolean(
    nightMoonReady
    && document.documentElement.dataset.theme === 'night'
    && !captureMode
    && !document.hidden
    && !(nightMoonReducedMotionMedia?.matches ?? false)
    && nightMoonPreviewPhase == null
  );
}

function tickNightMoon2p5d(now) {
  nightMoonRaf = 0;
  if (!nightMoonMotionEnabled()) return;
  renderNightMoonAtPhase(
    (now % NIGHT_MOON_CYCLE_MS) / NIGHT_MOON_CYCLE_MS,
    (now % NIGHT_MOON_ROLL_CYCLE_MS) / NIGHT_MOON_ROLL_CYCLE_MS,
  );
  nightMoonRaf = window.requestAnimationFrame(tickNightMoon2p5d);
}

function syncNightMoon2p5d() {
  if (nightMoonRaf) {
    window.cancelAnimationFrame(nightMoonRaf);
    nightMoonRaf = 0;
  }
  if (!nightMoonReady || !nightMoonCanvas) return;

  if (document.documentElement.dataset.theme !== 'night') {
    nightMoonCanvas.dataset.motionState = 'paused-light';
    return;
  }
  if (nightMoonPreviewPhase != null) {
    renderNightMoonAtPhase(nightMoonPreviewPhase);
    nightMoonCanvas.dataset.motionState = 'preview';
    return;
  }
  if (!nightMoonMotionEnabled()) {
    renderNightMoonAtPhase(0);
    nightMoonCanvas.dataset.motionState = 'static';
    return;
  }

  nightMoonCanvas.dataset.motionState = 'animating';
  nightMoonRaf = window.requestAnimationFrame(tickNightMoon2p5d);
}

async function setupNightMoon2p5d() {
  // Retain the accepted old projection only as an explicit rollback route.
  // Normal Night uses the isolated, lazily loaded full-globe renderer.
  if (params.get('moon') !== 'legacy') return;
  if (!nightMoonCanvas || nightMoonGpu) return;
  try {
    const gl = nightMoonCanvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      nightMoonCanvas.dataset.motionState = 'unavailable';
      return;
    }

    const vertexShader = compileNightMoonShader(gl, gl.VERTEX_SHADER, `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);
    const fragmentShader = compileNightMoonShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uYaw;
      uniform float uPitch;
      uniform float uRoll;
      uniform vec2 uViewportScale;
      void main() {
        vec2 p = (vUv * 2.0 - 1.0) * uViewportScale;
        float radius2 = dot(p, p);
        if (radius2 > 1.0) discard;

        vec3 viewNormal = vec3(p, sqrt(max(0.0, 1.0 - radius2)));
        float cp = cos(uPitch);
        float sp = sin(uPitch);
        vec3 pitched = vec3(
          viewNormal.x,
          cp * viewNormal.y + sp * viewNormal.z,
          -sp * viewNormal.y + cp * viewNormal.z
        );
        float cy = cos(uYaw);
        float sy = sin(uYaw);
        vec3 objectNormal = vec3(
          cy * pitched.x - sy * pitched.z,
          pitched.y,
          sy * pitched.x + cy * pitched.z
        );
        float cr = cos(uRoll);
        float sr = sin(uRoll);
        vec2 rolledNormal = vec2(
          cr * objectNormal.x - sr * objectNormal.y,
          sr * objectNormal.x + cr * objectNormal.y
        );
        vec2 sourceUv = rolledNormal * 0.5 + 0.5;
        gl_FragColor = texture2D(uTexture, sourceUv);
      }
    `);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Moon shader link failed');
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const image = new Image();
    const imageLoaded = new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
    });
    image.src = NIGHT_MOON_TEXTURE_URL;
    await imageLoaded;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    nightMoonGpu = {
      gl,
      program,
      buffer,
      texture,
      positionLocation: gl.getAttribLocation(program, 'aPosition'),
      uniforms: {
        texture: gl.getUniformLocation(program, 'uTexture'),
        yaw: gl.getUniformLocation(program, 'uYaw'),
        pitch: gl.getUniformLocation(program, 'uPitch'),
        roll: gl.getUniformLocation(program, 'uRoll'),
        viewportScale: gl.getUniformLocation(program, 'uViewportScale'),
      },
    };
    nightMoonReducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    nightMoonReducedMotionMedia.addEventListener?.('change', syncNightMoon2p5d);
    nightMoonResizeObserver = new ResizeObserver(() => {
      renderNightMoonAtPhase(nightMoonLastPhase, nightMoonLastRollPhase);
    });
    nightMoonResizeObserver.observe(nightMoonCanvas);
    nightMoonReady = true;
    nightMoonCanvas.classList.add('is-ready');
    document.documentElement.classList.add('moon-2p5d-ready');
    window.__midoriMoon2p5d = {
      getState: () => ({
        ready: nightMoonReady,
        cycleMs: NIGHT_MOON_CYCLE_MS,
        rollCycleMs: NIGHT_MOON_ROLL_CYCLE_MS,
        phase: nightMoonLastPhase,
        rollPhase: nightMoonLastRollPhase,
        yawDeg: nightMoonLastYawDeg,
        pitchDeg: nightMoonLastPitchDeg,
        rollDeg: nightMoonLastRollDeg,
        motionState: nightMoonCanvas.dataset.motionState || '',
      }),
      renderPhase: (phase) => renderNightMoonAtPhase(clamp(Number(phase) || 0, 0, 1)),
      sync: syncNightMoon2p5d,
    };
    syncNightMoon2p5d();
  } catch {
    nightMoonReady = false;
    nightMoonGpu = null;
    nightMoonCanvas.classList.remove('is-ready');
    nightMoonCanvas.dataset.motionState = 'fallback';
    document.documentElement.classList.remove('moon-2p5d-ready');
  }
}

function setTheme(theme, { persist = true } = {}) {
  const nextTheme = theme === 'night' ? 'night' : 'light';
  const isNight = nextTheme === 'night';
  document.documentElement.dataset.theme = nextTheme;
  modeToggleBtn?.setAttribute('aria-checked', isNight ? 'true' : 'false');
  modeToggleBtn?.setAttribute('aria-label', isNight ? '切换到日间模式' : '切换到夜间模式');
  if (modeToggleBtn) modeToggleBtn.dataset.mode = nextTheme;

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // localStorage can be unavailable in restrictive/private contexts.
    }
  }

  drawVoiceCapsule();
  syncShootingStarScheduler();
  syncNightMoon2p5d();
  scheduleNightMoonLayerLayoutSync();
  syncNightSpaceshipMotion();
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === 'night' ? 'night' : 'light';
  setTheme(current === 'night' ? 'light' : 'night');
}

function parseSiteIconUnreadCount(value) {
  if (value == null || value === '') return 0;
  const count = Number.parseInt(String(value), 10);
  if (!Number.isFinite(count) || count <= 0) return 0;
  return clamp(count, 0, 999);
}

function formatSiteIconUnreadCount(count) {
  if (count <= 0) return '';
  return count > 99 ? '99+' : String(count);
}

function initialSiteIconUnreadCount(site) {
  const queryKeys = [`${site}Unread`, `${site}_unread`, `${site}-unread`];
  for (const key of queryKeys) {
    if (params.has(key)) return parseSiteIconUnreadCount(params.get(key));
  }

  try {
    return parseSiteIconUnreadCount(localStorage.getItem(`${SITE_ICON_UNREAD_STORAGE_PREFIX}${site}`));
  } catch {
    return 0;
  }
}

function setSiteIconUnreadBadge(link, count, { persist = false } = {}) {
  const site = link.dataset.site || '';
  const badge = link.querySelector('.site-icon-badge');
  const nextCount = parseSiteIconUnreadCount(count);
  if (!badge) return nextCount;

  if (!link.dataset.baseAriaLabel) {
    link.dataset.baseAriaLabel = link.getAttribute('aria-label') || link.textContent.trim() || site;
  }
  const displaying = !link.dataset.familyCurrent || link.dataset.familyCurrent === site;
  const baseLabel = link.dataset.baseAriaLabel;
  const badgeText = formatSiteIconUnreadCount(nextCount);

  if (badgeText) {
    badge.textContent = badgeText;
    badge.hidden = !displaying;
    link.classList.toggle('has-unread', displaying);
    link.dataset.unread = String(nextCount);
    const unit = site === 'gmail' ? '封未读邮件' : '条未读消息';
    link.setAttribute('aria-label', displaying ? `${baseLabel}，${nextCount} ${unit}` : link.querySelector('.site-icon-label').textContent);
  } else {
    badge.textContent = '';
    badge.hidden = true;
    link.classList.remove('has-unread');
    delete link.dataset.unread;
    link.setAttribute('aria-label', displaying ? baseLabel : link.querySelector('.site-icon-label').textContent);
  }

  if (persist && site) {
    try {
      const key = `${SITE_ICON_UNREAD_STORAGE_PREFIX}${site}`;
      if (nextCount > 0) localStorage.setItem(key, String(nextCount));
      else localStorage.removeItem(key);
    } catch {
      // localStorage can be unavailable in restrictive/private contexts.
    }
  }

  return nextCount;
}

function setupSiteIconUnreadBadge(link) {
  const site = link.dataset.site || '';
  setSiteIconUnreadBadge(link, initialSiteIconUnreadCount(site));
}

window.setMidoriSiteIconUnread = (site, count, options = {}) => {
  const normalizedSite = String(site);
  const link = siteIconLinks.find((candidate) => candidate.dataset.site === normalizedSite);
  if (!link) return 0;
  return setSiteIconUnreadBadge(link, count, { persist: options.persist !== false });
};
window.setGmailUnread = (count, options = {}) => window.setMidoriSiteIconUnread('gmail', count, options);

function gmailIconLink() {
  return siteIconLinks.find((candidate) => candidate.dataset.site === 'gmail') || null;
}

function setGmailUnreadUnavailable(link, payload = null) {
  setSiteIconUnreadBadge(link, 0, { persist: true });
  link.dataset.gmailUnreadStatus = 'unavailable';
  link.dataset.gmailUnreadSource = 'gmail-api-error';
  const errorCode = String(payload?.error_code || '').trim();
  if (errorCode) link.dataset.gmailUnreadError = errorCode;
  else delete link.dataset.gmailUnreadError;
}

async function refreshGmailUnreadBadge({ force = false } = {}) {
  const link = gmailIconLink();
  if (!link || gmailUnreadInFlight) return null;

  gmailUnreadInFlight = true;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), GMAIL_UNREAD_REQUEST_TIMEOUT_MS);

  try {
    const url = force ? `${GMAIL_UNREAD_ENDPOINT}?force=1` : GMAIL_UNREAD_ENDPOINT;
    const response = await publicFetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.ok) {
      setGmailUnreadUnavailable(link, payload);
      return payload;
    }
    if (payload.configured && Number.isFinite(payload.count)) {
      setSiteIconUnreadBadge(link, payload.count, { persist: true });
      delete link.dataset.gmailUnreadStatus;
      delete link.dataset.gmailUnreadError;
      link.dataset.gmailUnreadSource = payload.cached ? 'gmail-api-cache' : 'gmail-api';
    }
    return payload;
  } catch {
    setGmailUnreadUnavailable(link);
    return null;
  } finally {
    window.clearTimeout(timeout);
    gmailUnreadInFlight = false;
  }
}

function setupGmailUnreadPolling() {
  if (!gmailIconLink() || gmailUnreadPollTimer) return;
  refreshGmailUnreadBadge({ force: true });
  gmailUnreadPollTimer = window.setInterval(() => refreshGmailUnreadBadge(), GMAIL_UNREAD_POLL_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshGmailUnreadBadge({ force: true });
  });
}

window.refreshGmailUnread = () => refreshGmailUnreadBadge({ force: true });

function updateMidoriInputFilled() {
  if (!midoriInputDock || !midoriInput) return;
  midoriInputDock.dataset.filled = String(midoriInput.value.trim().length > 0);
}

function resizeMidoriInput() {
  if (!midoriInputDock || !midoriInput) return;
  midoriInput.style.height = `${MIDORI_INPUT_BASE_HEIGHT}px`;
  const extraContentHeight = Math.max(0, midoriInput.scrollHeight - Math.ceil(MIDORI_INPUT_BASE_HEIGHT));
  const extraRows = Math.ceil(extraContentHeight / MIDORI_INPUT_LINE_HEIGHT);
  const visibleExtraRows = Math.min(extraRows, MIDORI_INPUT_MAX_ROWS - 1);
  const nextInputHeight = MIDORI_INPUT_BASE_HEIGHT + visibleExtraRows * MIDORI_INPUT_LINE_HEIGHT;
  const overflowing = extraRows > MIDORI_INPUT_MAX_ROWS - 1;
  midoriInput.style.height = `${nextInputHeight}px`;
  midoriInput.style.overflowY = overflowing ? 'auto' : 'hidden';
  midoriInputDock.style.height = `${nextInputHeight + 1}px`;
  if (!overflowing) midoriInput.scrollTop = 0;
}

function setMidoriInputContext(site) {
  if (!midoriInputDock || !midoriInput) return;
  if (midoriChatBusy) return;
  const context = MIDORI_INPUT_CONTEXTS[site];
  if (!context) return;
  clearStoredMidoriHermesSession(site);
  midoriInputDock.dataset.context = site;
  midoriInput.placeholder = context;
  let contextName = site;
  document.querySelectorAll('.site-icon-context').forEach((button) => {
    const wrapper = button.closest('.site-icon-link');
    const selected = (wrapper?.dataset.familyCurrent || wrapper?.dataset.site) === site;
    button.setAttribute('aria-pressed', String(selected));
    if (selected) contextName = button.textContent.trim();
  });
  if (midoriInputContextToken && midoriInputContextName) {
    midoriInputContextName.textContent = `/${contextName.toLowerCase()}`;
    midoriInputContextToken.classList.add('is-visible');
    midoriInputContextToken.setAttribute('aria-hidden', 'false');
  }
  if (midoriInputStatus) midoriInputStatus.textContent = `已选择 ${site} 上下文`;
  if (site === 'youtube') {
    ensureMidoriYouTubeIframeApi().catch(() => {
      // The visible play request reports API load failures; context selection stays non-blocking.
    });
  }
}

function clearMidoriInputContext() {
  if (!midoriInputDock || !midoriInput || !midoriInputDock.dataset.context) return;
  midoriInputDock.dataset.context = '';
  midoriInput.placeholder = MIDORI_INPUT_DEFAULT_PLACEHOLDER;
  document.querySelectorAll('.site-icon-context').forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
  });
  if (midoriInputContextToken && midoriInputContextName) {
    midoriInputContextToken.classList.remove('is-visible');
    midoriInputContextToken.setAttribute('aria-hidden', 'true');
    midoriInputContextName.textContent = '';
  }
  if (midoriInputStatus) midoriInputStatus.textContent = '已清除 App Context';
}

function midoriToolProgressText(toolName, context, phase = 'started') {
  const rawToolName = String(toolName || '');
  const gmailToolName = rawToolName.startsWith('mcp__gmail__')
    ? rawToolName.replace(/^mcp__gmail__/, '')
    : '';
  const bilibiliToolName = rawToolName.startsWith('mcp__bilibili__')
    ? rawToolName.replace(/^mcp__bilibili__/, '')
    : '';
  const gmailProgress = {
    gmail_search: 'Gmail · 正在搜索邮件',
    gmail_read_message: 'Gmail · 正在读取邮件',
    gmail_create_draft: 'Gmail · 正在创建草稿',
    gmail_set_read_state: 'Gmail · 正在更新已读状态',
    gmail_add_star: 'Gmail · 正在添加星标',
  };
  const bilibiliProgress = {
    bilibili_search_users: 'Bilibili · 正在搜索 UP 主',
    bilibili_list_dynamics: 'Bilibili · 正在读取动态',
    bilibili_list_videos: 'Bilibili · 正在读取视频',
    bilibili_prepare_dynamic: 'Bilibili · 正在准备动态预览',
    bilibili_prepare_comment: 'Bilibili · 正在准备评论预览',
  };
  const isApprovedGmailTool = context === 'gmail'
    && Object.prototype.hasOwnProperty.call(gmailProgress, gmailToolName);
  const isApprovedBilibiliTool = context === 'bilibili'
    && Object.prototype.hasOwnProperty.call(bilibiliProgress, bilibiliToolName);
  const isYouTubeWebTool = context === 'youtube'
    && (rawToolName === 'web_search' || rawToolName === 'web_extract');
  const isBilibiliPrepareTool = bilibiliToolName === 'bilibili_prepare_dynamic'
    || bilibiliToolName === 'bilibili_prepare_comment';
  if (phase === 'failed') {
    if (isYouTubeWebTool) return 'YouTube · 联网搜索失败，阿绿正在确认原因';
    if (context === 'spotify') return 'Spotify · 操作失败，阿绿正在确认原因';
    if (isApprovedGmailTool) return 'Gmail · 操作失败，阿绿正在确认原因';
    if (isApprovedBilibiliTool) return 'Bilibili · 操作失败，阿绿正在确认原因';
    return '操作失败，阿绿正在确认原因';
  }
  if (phase === 'completed') {
    if (isYouTubeWebTool) return 'YouTube · 搜索结束，阿绿正在核对视频';
    if (context === 'spotify') return 'Spotify · 执行结束，阿绿正在确认结果';
    if (isApprovedGmailTool) return 'Gmail · 操作结束，阿绿正在确认结果';
    if (isApprovedBilibiliTool) {
      return isBilibiliPrepareTool
        ? 'Bilibili · 预览已准备，阿绿正在确认内容'
        : 'Bilibili · 读取结束，阿绿正在确认结果';
    }
    return '阿绿处理结束，正在确认结果';
  }
  if (isApprovedGmailTool) return gmailProgress[gmailToolName];
  if (isApprovedBilibiliTool) return bilibiliProgress[bilibiliToolName];
  if (isYouTubeWebTool) {
    return rawToolName === 'web_search'
      ? 'YouTube · 阿绿正在联网搜索视频'
      : 'YouTube · 阿绿正在核对视频页面';
  }
  if (context !== 'spotify') return '阿绿正在处理';
  const spotifyProgress = {
    spotify_search: 'Spotify · 正在搜索',
    spotify_playback: 'Spotify · 正在控制播放',
    spotify_playlists: 'Spotify · 正在查找播放列表',
    spotify_devices: 'Spotify · 正在连接播放设备',
    spotify_queue: 'Spotify · 正在处理播放队列',
    spotify_albums: 'Spotify · 正在读取专辑',
    spotify_library: 'Spotify · 正在读取音乐库',
  };
  return spotifyProgress[rawToolName] || 'Spotify · 正在处理';
}

function parseMidoriSseFrame(frame) {
  let eventName = 'message';
  const dataLines = [];
  frame.split('\n').forEach((line) => {
    if (line.startsWith('event:')) eventName = line.slice(6).trim() || 'message';
    if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart());
  });
  if (!dataLines.length) return null;
  try {
    return { eventName, payload: JSON.parse(dataLines.join('\n')) };
  } catch {
    return { eventName, payload: { data: dataLines.join('\n') } };
  }
}

function awaitMidoriRequest(promise, signal) {
  if (!signal) return Promise.resolve(promise);
  return new Promise((resolve, reject) => {
    const abort = () => reject(new DOMException('Request aborted', 'AbortError'));
    signal.addEventListener('abort', abort, { once: true });
    Promise.resolve(promise).then(
      (value) => {
        signal.removeEventListener('abort', abort);
        if (signal.aborted) abort();
        else resolve(value);
      },
      (error) => {
        signal.removeEventListener('abort', abort);
        reject(error);
      },
    );
    if (signal.aborted) abort();
  });
}

async function consumeMidoriChatStream(response, onEvent, signal) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finished = false;
  try {
    while (true) {
      const { value, done } = await awaitMidoriRequest(reader.read(), signal);
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
      // Normalize after buffering, including CRLF split across network chunks.
      buffer = buffer.replaceAll('\r\n', '\n');
      let boundary = buffer.indexOf('\n\n');
      while (boundary >= 0) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const event = parseMidoriSseFrame(frame);
        if (event) onEvent(event.eventName, event.payload);
        boundary = buffer.indexOf('\n\n');
      }
      if (done) break;
    }
    // EOF never dispatches an unterminated SSE frame, including completed.
    finished = true;
  } finally {
    // A broken transport must not keep input locked while cancel itself hangs.
    if (!finished) void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

function midoriHermesSessionStorageKey(context) {
  const requested = String(context || '').trim().toLowerCase();
  const scope = Object.prototype.hasOwnProperty.call(MIDORI_INPUT_CONTEXTS, requested)
    ? requested
    : 'chat';
  return `${MIDORI_HERMES_SESSION_STORAGE_PREFIX}:${scope}`;
}

function readStoredMidoriHermesSession(context) {
  try {
    return localStorage.getItem(midoriHermesSessionStorageKey(context)) || '';
  } catch {
    return '';
  }
}

function storeMidoriHermesSession(context, sessionId) {
  const cleanSessionId = String(sessionId || '').trim();
  if (!cleanSessionId) return;
  try {
    localStorage.setItem(midoriHermesSessionStorageKey(context), cleanSessionId);
  } catch {}
}

function clearStoredMidoriHermesSession(context) {
  try {
    localStorage.removeItem(midoriHermesSessionStorageKey(context));
  } catch {}
}

function discardLegacyMidoriHermesSession() {
  try {
    localStorage.removeItem(MIDORI_HERMES_LEGACY_SESSION_STORAGE_KEY);
  } catch {}
}

function midoriReplyGraphemes(value) {
  const text = String(value || '');
  if (!MIDORI_REPLY_SEGMENTER) return Array.from(text);
  return Array.from(MIDORI_REPLY_SEGMENTER.segment(text), ({ segment }) => segment);
}

function formatMidoriReplySubmittedPreview(value) {
  const compact = String(value || '').replace(/\s+/g, ' ').trim();
  if (!compact) return '';
  const units = midoriReplyGraphemes(compact);
  if (units.length <= MIDORI_REPLY_INPUT_PREVIEW_MAX_GRAPHEMES) return compact;
  return `${units.slice(0, MIDORI_REPLY_INPUT_PREVIEW_MAX_GRAPHEMES).join('').trimEnd()}…`;
}

function clearMidoriReplyTimers({ typing = true } = {}) {
  if (typing && midoriReplyTypingTimer) window.clearTimeout(midoriReplyTypingTimer);
  if (midoriReplyThinkingTimer) window.clearTimeout(midoriReplyThinkingTimer);
  if (midoriReplyRetentionTimer) window.clearTimeout(midoriReplyRetentionTimer);
  if (midoriReplyFadeTimer) window.clearTimeout(midoriReplyFadeTimer);
  if (typing) midoriReplyTypingTimer = 0;
  midoriReplyThinkingTimer = 0;
  midoriReplyRetentionTimer = 0;
  midoriReplyFadeTimer = 0;
}

function startMidoriReplySelectionScrollLock(event) {
  if (!midoriReply || event.button !== 0 || event.altKey) return;
  midoriReplySelectionScrollLock = {
    x: window.scrollX,
    y: window.scrollY,
  };
}

function holdMidoriReplySelectionScrollLock() {
  if (!midoriReplySelectionScrollLock) return;
  const { x, y } = midoriReplySelectionScrollLock;
  if (window.scrollX === x && window.scrollY === y) return;
  window.scrollTo(x, y);
}

function stopMidoriReplySelectionScrollLock() {
  midoriReplySelectionScrollLock = null;
}

function handleMidoriReplyWheel(event) {
  if (!midoriReply || !Number.isFinite(event.deltaY) || event.deltaY === 0) return;
  const maxScrollTop = Math.max(0, midoriReply.scrollHeight - midoriReply.clientHeight);
  if (maxScrollTop <= 0) {
    if (midoriReplySelectionScrollLock) event.preventDefault();
    return;
  }
  const movingTowardStart = event.deltaY < 0 && midoriReply.scrollTop <= 0;
  const movingTowardEnd = event.deltaY > 0 && midoriReply.scrollTop >= maxScrollTop;
  if (movingTowardStart || movingTowardEnd) {
    if (midoriReplySelectionScrollLock) event.preventDefault();
    return;
  }

  const deltaUnit = event.deltaMode === 1
    ? MIDORI_INPUT_LINE_HEIGHT
    : event.deltaMode === 2
      ? midoriReply.clientHeight
      : 1;
  const nextScrollTop = Math.min(
    maxScrollTop,
    Math.max(0, midoriReply.scrollTop + event.deltaY * deltaUnit * MIDORI_REPLY_WHEEL_SCALE),
  );
  if (nextScrollTop === midoriReply.scrollTop) return;
  event.preventDefault();
  midoriReply.scrollTop = nextScrollTop;
}

function resetMidoriReplyForTurn() {
  clearMidoriReplyTimers();
  midoriReplyTargetText = '';
  midoriReplyTargetUnits = [];
  midoriReplyRenderedUnits = 0;
  midoriReplyThinkingDots = 0;
  midoriReplySubmittedPreview = '';
  if (midoriReply) {
    midoriReply.textContent = '';
    midoriReply.scrollTop = 0;
    midoriReply.classList.remove('is-visible', 'is-fading');
  }
  if (midoriInputDock) midoriInputDock.dataset.reply = 'false';
}

function renderMidoriReplyThinking() {
  if (!midoriReply) return;
  const submittedPrefix = midoriReplySubmittedPreview ? `${midoriReplySubmittedPreview} · ` : '';
  midoriReply.textContent = `${submittedPrefix}${MIDORI_REPLY_THINKING_TEXT}${'.'.repeat(midoriReplyThinkingDots)}`;
  midoriReply.classList.remove('is-fading');
  midoriReply.classList.add('is-visible');
  if (midoriInputDock) midoriInputDock.dataset.reply = 'true';
}

function tickMidoriReplyThinking() {
  midoriReplyThinkingTimer = 0;
  midoriReplyThinkingDots = midoriReplyThinkingDots >= MIDORI_REPLY_THINKING_DOT_COUNT
    ? 0
    : midoriReplyThinkingDots + 1;
  renderMidoriReplyThinking();
  midoriReplyThinkingTimer = window.setTimeout(
    tickMidoriReplyThinking,
    MIDORI_REPLY_THINKING_INTERVAL_MS,
  );
}

function startMidoriReplyThinking() {
  if (!midoriReply) return;
  if (midoriReplyThinkingTimer) window.clearTimeout(midoriReplyThinkingTimer);
  midoriReplyThinkingDots = 0;
  renderMidoriReplyThinking();
  midoriReplyThinkingTimer = window.setTimeout(
    tickMidoriReplyThinking,
    MIDORI_REPLY_THINKING_INTERVAL_MS,
  );
}

function stopMidoriReplyThinking({ clear = false } = {}) {
  if (midoriReplyThinkingTimer) window.clearTimeout(midoriReplyThinkingTimer);
  midoriReplyThinkingTimer = 0;
  midoriReplyThinkingDots = 0;
  midoriReplySubmittedPreview = '';
  if (clear && midoriReply) midoriReply.textContent = '';
}

function scheduleMidoriReplyExpiry() {
  if (!midoriReply || !midoriReply.textContent) return;
  if (midoriReplyRetentionTimer) window.clearTimeout(midoriReplyRetentionTimer);
  if (midoriReplyFadeTimer) window.clearTimeout(midoriReplyFadeTimer);
  midoriReplyRetentionTimer = window.setTimeout(() => {
    midoriReplyRetentionTimer = 0;
    midoriReply.classList.add('is-fading');
    midoriReplyFadeTimer = window.setTimeout(() => {
      midoriReplyFadeTimer = 0;
      midoriReply.textContent = '';
      midoriReplyTargetText = '';
      midoriReplyTargetUnits = [];
      midoriReplyRenderedUnits = 0;
      midoriReply.classList.remove('is-visible', 'is-fading');
      if (midoriInputDock) midoriInputDock.dataset.reply = 'false';
    }, MIDORI_REPLY_FADE_MS);
  }, MIDORI_REPLY_RETENTION_MS);
}

function appendMidoriReplyGrapheme(value) {
  if (!midoriReply) return;
  const grapheme = document.createElement('span');
  grapheme.className = 'midori-reply-grapheme';
  grapheme.textContent = value;
  midoriReply.appendChild(grapheme);
}

function typeNextMidoriReplyGrapheme() {
  midoriReplyTypingTimer = 0;
  if (!midoriReply) return;
  if (midoriReplyRenderedUnits >= midoriReplyTargetUnits.length) {
    scheduleMidoriReplyExpiry();
    return;
  }

  appendMidoriReplyGrapheme(midoriReplyTargetUnits[midoriReplyRenderedUnits]);
  midoriReplyRenderedUnits += 1;
  midoriReply.scrollTop = midoriReply.scrollHeight;
  midoriReplyTypingTimer = window.setTimeout(typeNextMidoriReplyGrapheme, MIDORI_REPLY_TYPE_INTERVAL_MS);
}

function playMidoriReplyText(value) {
  if (!midoriReply) return;
  const text = String(value || '').trim();
  if (!text) return;

  stopMidoriReplyThinking({ clear: true });

  if (midoriReplyTypingTimer) window.clearTimeout(midoriReplyTypingTimer);
  if (midoriReplyRetentionTimer) window.clearTimeout(midoriReplyRetentionTimer);
  if (midoriReplyFadeTimer) window.clearTimeout(midoriReplyFadeTimer);
  midoriReplyTypingTimer = 0;
  midoriReplyRetentionTimer = 0;
  midoriReplyFadeTimer = 0;
  midoriReply.textContent = '';
  midoriReply.scrollTop = 0;
  midoriReplyRenderedUnits = 0;
  midoriReply.classList.remove('is-fading');
  midoriReply.classList.add('is-visible');
  if (midoriInputDock) midoriInputDock.dataset.reply = 'true';

  midoriReplyTargetText = text;
  midoriReplyTargetUnits = midoriReplyGraphemes(midoriReplyTargetText);
  typeNextMidoriReplyGrapheme();
}

async function trySubmitSpotifyQuickControl(text, context, signal, requestId) {
  if (context !== 'spotify') return { handled: false };
  const response = await awaitMidoriRequest(publicFetch('/api/spotify/quick-control', {
    method: 'POST',
    cache: 'no-store',
    signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ text, request_id: requestId }),
  }), signal);
  const payload = await awaitMidoriRequest(response.json().catch(() => ({})), signal);
  if (response.status === 422 && payload.error_code === 'spotify_quick_control_not_matched') {
    return { handled: false };
  }
  if (!response.ok || !payload.ok) {
    const error = new Error(payload.error || `Spotify 快控 HTTP ${response.status}`);
    error.spotifyQuickControl = true;
    throw error;
  }
  if (
    typeof window !== 'undefined'
    && typeof window.dispatchEvent === 'function'
    && typeof CustomEvent === 'function'
  ) {
    window.dispatchEvent(new CustomEvent('midori:spotify-control'));
  }
  return {
    handled: true,
    message: String(payload.message || 'Spotify · 操作完成'),
    tts_queued: Boolean(payload.tts_queued),
  };
}

function ensureMidoriYouTubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (midoriYouTubeApiPromise) return midoriYouTubeApiPromise;

  midoriYouTubeApiPromise = new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error = null) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      if (error) {
        midoriYouTubeApiPromise = null;
        reject(error);
      } else {
        resolve(window.YT);
      }
    };
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') previousReady();
      if (window.YT?.Player) finish();
      else finish(new Error('YouTube IFrame API 未就绪。'));
    };
    let script = document.querySelector('script[data-midori-youtube-iframe-api]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.dataset.midoriYoutubeIframeApi = 'true';
      document.head.appendChild(script);
    }
    script.addEventListener('error', () => finish(new Error('YouTube IFrame API 加载失败。')), { once: true });
    const timeoutId = window.setTimeout(() => finish(new Error('YouTube IFrame API 加载超时。')), 12_000);
  });
  return midoriYouTubeApiPromise;
}

function settleMidoriYouTubePlay(error = null) {
  window.clearTimeout(midoriYouTubePlayTimeout);
  midoriYouTubePlayTimeout = 0;
  const resolve = midoriYouTubePlayResolve;
  const reject = midoriYouTubePlayReject;
  midoriYouTubePlayResolve = null;
  midoriYouTubePlayReject = null;
  if (error) reject?.(error);
  else resolve?.();
}

function waitForMidoriYouTubePlaying() {
  settleMidoriYouTubePlay(new Error('YouTube 播放请求已被新任务替换。'));
  return new Promise((resolve, reject) => {
    midoriYouTubePlayResolve = resolve;
    midoriYouTubePlayReject = reject;
    midoriYouTubePlayTimeout = window.setTimeout(() => {
      settleMidoriYouTubePlay(new Error('YouTube 没有自动开始播放，请在播放器里点一下播放。'));
    }, 12_000);
  });
}

function syncMidoriYouTubePlayerTitle(player) {
  const resolvedTitle = String(player?.getVideoData?.().title || '').trim();
  if (resolvedTitle && midoriYouTubePlayerTitle) {
    midoriYouTubePlayerTitle.textContent = resolvedTitle;
    midoriYouTubePlayerTitle.title = resolvedTitle;
  }
  return resolvedTitle || 'YouTube 视频';
}

function setMidoriMediaPlayerMinimized({
  dock,
  toggle,
  platform,
  minimized,
  place,
  setWidth,
}) {
  if (!dock || !toggle) return;
  if (minimized) {
    dock.dataset.minimized = 'true';
    delete dock.dataset.dragging;
    delete dock.dataset.resizing;
    const rect = dock.getBoundingClientRect();
    const rightInset = window.innerWidth <= 520
      ? 10
      : Math.min(24, Math.max(14, window.innerWidth * 0.02));
    const left = Math.max(0, window.innerWidth - rect.width - rightInset);
    const top = Math.max(0, window.innerHeight - rect.height);
    place(left, top);
  } else {
    delete dock.dataset.minimized;
  }
  toggle.setAttribute('aria-pressed', String(minimized));
  const action = minimized ? '恢复' : '最小化';
  toggle.setAttribute('aria-label', `${action} ${platform} 播放器`);
  toggle.title = `${action}播放器`;

  if (!minimized && !dock.hidden) {
    const rect = dock.getBoundingClientRect();
    const width = rect.width || Number.parseFloat(dock.style.width) || 420;
    setWidth(width, { persist: true });
    const restoredRect = dock.getBoundingClientRect();
    place(restoredRect.left, restoredRect.top, { persist: true });
  }
}

function setMidoriYouTubePlayerMinimized(minimized) {
  setMidoriMediaPlayerMinimized({
    dock: midoriYouTubePlayerDock,
    toggle: midoriYouTubePlayerMinimize,
    platform: 'YouTube',
    minimized,
    place: placeMidoriYouTubePlayer,
    setWidth: setMidoriYouTubePlayerWidth,
  });
}

function setMidoriBilibiliPlayerMinimized(minimized) {
  setMidoriMediaPlayerMinimized({
    dock: midoriBilibiliPlayerDock,
    toggle: midoriBilibiliPlayerMinimize,
    platform: 'Bilibili',
    minimized,
    place: placeMidoriBilibiliPlayer,
    setWidth: setMidoriBilibiliPlayerWidth,
  });
}

async function playResolvedMidoriYouTube(payload, YT, generation = midoriMediaGeneration) {
  if (generation !== midoriMediaGeneration) return '';
  const videoId = String(payload.video_id || '');
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) throw new Error('YouTube Bridge 返回了无效 video ID。');
  if (!midoriYouTubePlayerDock || !midoriYouTubePlayerHost) throw new Error('YouTube 播放器容器不可用。');

  midoriYouTubePlayerDock.hidden = false;
  if (midoriYouTubePlayerTitle) {
    midoriYouTubePlayerTitle.textContent = '正在载入视频…';
    midoriYouTubePlayerTitle.removeAttribute?.('title');
  }
  const playing = waitForMidoriYouTubePlaying();
  // Constructor errors/close can reject before execution reaches await below.
  void playing.catch(() => {});
  const play = (player) => {
    if (generation !== midoriMediaGeneration) return;
    player.setVolume(100);
    player.unMute();
    player.playVideo();
  };

  if (midoriYouTubePlayer?.loadVideoById) {
    midoriYouTubePlayer.loadVideoById(videoId);
    play(midoriYouTubePlayer);
  } else {
    midoriYouTubePlayerHost.replaceChildren();
    // YT replaces its mount; retain the stable outer host across destroy/reopen.
    const mount = document.createElement('div');
    midoriYouTubePlayerHost.append(mount);
    midoriYouTubePlayer = new YT.Player(mount, {
      width: '100%',
      height: '100%',
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => play(event.target),
        onStateChange: (event) => {
          if (generation !== midoriMediaGeneration) return;
          if (event.data === YT.PlayerState.PLAYING) {
            syncMidoriYouTubePlayerTitle(event.target);
            settleMidoriYouTubePlay();
          }
        },
        onError: (event) => {
          if (generation === midoriMediaGeneration) settleMidoriYouTubePlay(new Error(`YouTube 播放错误 ${event.data}`));
        },
      },
    });
  }
  await playing;
  if (generation !== midoriMediaGeneration) return '';
  const title = syncMidoriYouTubePlayerTitle(midoriYouTubePlayer);
  return `YouTube · 正在播放《${title}》`;
}

function closeMidoriYouTubePlayer({ silent = false } = {}) {
  midoriMediaGeneration += 1;
  const wasVisible = Boolean(midoriYouTubePlayerDock && !midoriYouTubePlayerDock.hidden);
  settleMidoriYouTubePlay(new Error('YouTube 播放器已关闭。'));
  try { midoriYouTubePlayer?.stopVideo?.(); } catch (_) {}
  try { midoriYouTubePlayer?.destroy?.(); } catch (_) {}
  midoriYouTubePlayer = null;
  setMidoriYouTubePlayerMinimized(false);
  if (midoriYouTubePlayerDock) midoriYouTubePlayerDock.hidden = true;
  if (midoriYouTubePlayerTitle) {
    midoriYouTubePlayerTitle.textContent = '准备播放';
    midoriYouTubePlayerTitle.removeAttribute?.('title');
  }
  if (wasVisible && !silent) {
    playMidoriReplyText('YouTube · 已停止播放');
    if (midoriInputStatus) midoriInputStatus.textContent = 'YouTube · 已停止播放';
  }
}

async function handleMidoriYouTubePlayEvent(payload) {
  closeMidoriYouTubePlayer({ silent: true });
  closeMidoriBilibiliPlayer({ silent: true });
  const generation = midoriMediaGeneration;
  if (midoriYouTubePlayerDock) midoriYouTubePlayerDock.hidden = false;
  if (midoriYouTubePlayerTitle) midoriYouTubePlayerTitle.textContent = '正在连接 YouTube…';
  try {
    const YT = await ensureMidoriYouTubeIframeApi();
    if (generation !== midoriMediaGeneration) return '';
    const message = await playResolvedMidoriYouTube(payload, YT, generation);
    if (generation !== midoriMediaGeneration) return '';
    if (midoriInputStatus) midoriInputStatus.textContent = message;
    return message;
  } catch (err) {
    if (generation !== midoriMediaGeneration) return '';
    settleMidoriYouTubePlay(err);
    if (midoriYouTubePlayerTitle) midoriYouTubePlayerTitle.textContent = '播放未自动开始';
    if (midoriInputStatus) {
      midoriInputStatus.textContent = `YouTube · ${friendlyError(err.message)}`;
    }
    return '';
  }
}

function closeMidoriBilibiliPlayer({ silent = false } = {}) {
  const wasVisible = Boolean(midoriBilibiliPlayerDock && !midoriBilibiliPlayerDock.hidden);
  if (midoriBilibiliPlayerHost) midoriBilibiliPlayerHost.src = 'about:blank';
  setMidoriBilibiliPlayerMinimized(false);
  if (midoriBilibiliPlayerDock) midoriBilibiliPlayerDock.hidden = true;
  if (midoriBilibiliPlayerTitle) {
    midoriBilibiliPlayerTitle.textContent = '准备播放';
    midoriBilibiliPlayerTitle.removeAttribute?.('title');
  }
  if (wasVisible && !silent) {
    playMidoriReplyText('Bilibili · 已停止播放');
    if (midoriInputStatus) midoriInputStatus.textContent = 'Bilibili · 已停止播放';
  }
}

function buildMidoriBilibiliEmbedUrl(bvid, page) {
  if (!/^BV[0-9A-Za-z]{10}$/.test(bvid)) throw new Error('Bilibili Bridge 返回了无效 BVID。');
  const safePage = Number.parseInt(page, 10);
  if (!Number.isInteger(safePage) || safePage < 1 || safePage > 999) {
    throw new Error('Bilibili Bridge 返回了无效分 P。');
  }
  const url = new URL('https://player.bilibili.com/player.html');
  url.searchParams.set('bvid', bvid);
  url.searchParams.set('page', String(safePage));
  url.searchParams.set('autoplay', '1');
  url.searchParams.set('danmaku', '1');
  url.searchParams.set('high_quality', '1');
  return url.toString();
}

async function handleMidoriBilibiliPlayEvent(payload) {
  try {
    const bvid = String(payload.bvid || '');
    const page = Number.parseInt(payload.page ?? 1, 10);
    const embedUrl = buildMidoriBilibiliEmbedUrl(bvid, page);
    if (!midoriBilibiliPlayerDock || !midoriBilibiliPlayerHost || !midoriBilibiliPlayerTitle) {
      throw new Error('Bilibili 播放器容器不可用。');
    }
    closeMidoriYouTubePlayer({ silent: true });
    const resolvedTitle = String(payload.title || '').trim().slice(0, 120);
    const title = resolvedTitle || (page > 1 ? `${bvid} · P${page}` : bvid);
    midoriBilibiliPlayerTitle.textContent = title;
    midoriBilibiliPlayerTitle.title = title;
    midoriBilibiliPlayerDock.hidden = false;
    midoriBilibiliPlayerHost.src = embedUrl;
    const message = page > 1
      ? `Bilibili · 已载入 ${bvid} · P${page}`
      : `Bilibili · 已载入 ${bvid}`;
    if (midoriInputStatus) midoriInputStatus.textContent = message;
    return message;
  } catch (err) {
    if (midoriBilibiliPlayerTitle) midoriBilibiliPlayerTitle.textContent = '播放器载入失败';
    if (midoriInputStatus) midoriInputStatus.textContent = `Bilibili · ${friendlyError(err.message)}`;
    return '';
  }
}

function clampMidoriYouTubePlayerPosition(left, top) {
  if (!midoriYouTubePlayerDock) return { left: 0, top: 0 };
  const rect = midoriYouTubePlayerDock.getBoundingClientRect();
  const styledWidth = Number.parseFloat(midoriYouTubePlayerDock.style.width);
  const width = rect.width || midoriYouTubePlayerDock.offsetWidth || styledWidth || 420;
  const estimatedHeight = MIDORI_YOUTUBE_PLAYER_HEADING_HEIGHT
    + 2
    + Math.max(0, width - 2) / MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO;
  const height = rect.height || midoriYouTubePlayerDock.offsetHeight || estimatedHeight;
  return {
    left: Math.max(0, Math.min(left, Math.max(0, window.innerWidth - width))),
    top: Math.max(0, Math.min(top, Math.max(0, window.innerHeight - height))),
  };
}

function placeMidoriYouTubePlayer(left, top, { persist = false } = {}) {
  if (!midoriYouTubePlayerDock) return;
  const clamped = clampMidoriYouTubePlayerPosition(left, top);
  midoriYouTubePlayerDock.style.left = `${Math.round(clamped.left)}px`;
  midoriYouTubePlayerDock.style.top = `${Math.round(clamped.top)}px`;
  midoriYouTubePlayerDock.style.right = 'auto';
  midoriYouTubePlayerDock.style.bottom = 'auto';
  if (persist) {
    try {
      localStorage.setItem(MIDORI_YOUTUBE_PLAYER_POSITION_KEY, JSON.stringify(clamped));
    } catch (_) {}
  }
}

function setupMidoriYouTubePlayerDrag() {
  if (!midoriYouTubePlayerDock || !midoriYouTubePlayerDragHandle) return;
  try {
    const stored = JSON.parse(localStorage.getItem(MIDORI_YOUTUBE_PLAYER_POSITION_KEY) || 'null');
    if (Number.isFinite(stored?.left) && Number.isFinite(stored?.top)) {
      placeMidoriYouTubePlayer(stored.left, stored.top);
    }
  } catch (_) {}

  const drag = { active: false, pointerId: null, dx: 0, dy: 0 };
  midoriYouTubePlayerDragHandle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || event.target.closest('button')) return;
    const rect = midoriYouTubePlayerDock.getBoundingClientRect();
    drag.active = true;
    drag.pointerId = event.pointerId;
    drag.dx = event.clientX - rect.left;
    drag.dy = event.clientY - rect.top;
    midoriYouTubePlayerDock.dataset.dragging = 'true';
    placeMidoriYouTubePlayer(rect.left, rect.top);
    event.preventDefault();
  });
  document.addEventListener('pointermove', (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    placeMidoriYouTubePlayer(event.clientX - drag.dx, event.clientY - drag.dy);
    event.preventDefault();
  });
  const finishDrag = (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    drag.active = false;
    drag.pointerId = null;
    delete midoriYouTubePlayerDock.dataset.dragging;
    const rect = midoriYouTubePlayerDock.getBoundingClientRect();
    const persist = midoriYouTubePlayerDock.dataset.minimized !== 'true';
    placeMidoriYouTubePlayer(rect.left, rect.top, { persist });
  };
  document.addEventListener('pointerup', finishDrag);
  document.addEventListener('pointercancel', finishDrag);
  window.addEventListener('resize', () => {
    if (midoriYouTubePlayerDock.hidden) return;
    const rect = midoriYouTubePlayerDock.getBoundingClientRect();
    const persist = midoriYouTubePlayerDock.dataset.minimized !== 'true';
    placeMidoriYouTubePlayer(rect.left, rect.top, { persist });
  });
}

function getMidoriYouTubePlayerWidthBounds() {
  const viewportWidth = Math.max(0, Number(window.innerWidth) || 0);
  const viewportHeight = Math.max(0, Number(window.innerHeight) || 0);
  const widthByHeight = Math.max(
    0,
    (viewportHeight - MIDORI_YOUTUBE_PLAYER_HEADING_HEIGHT - 2)
      * MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO
      + 2,
  );
  const max = Math.max(1, Math.min(viewportWidth || 420, widthByHeight || 420));
  return { min: Math.min(MIDORI_YOUTUBE_PLAYER_MIN_WIDTH, max), max };
}

function setMidoriYouTubePlayerWidth(width, { persist = false } = {}) {
  if (!midoriYouTubePlayerDock) return 0;
  const bounds = getMidoriYouTubePlayerWidthBounds();
  const clamped = Math.max(bounds.min, Math.min(Number(width) || 420, bounds.max));
  midoriYouTubePlayerDock.style.width = `${Math.round(clamped)}px`;
  if (persist) {
    try {
      localStorage.setItem(MIDORI_YOUTUBE_PLAYER_SIZE_KEY, JSON.stringify({ width: clamped }));
    } catch (_) {}
  }
  return clamped;
}

function setupMidoriYouTubePlayerResize() {
  if (!midoriYouTubePlayerDock) return;
  const handles = [...midoriYouTubePlayerDock.querySelectorAll('[data-youtube-resize]')];
  if (!handles.length) return;

  try {
    const stored = JSON.parse(localStorage.getItem(MIDORI_YOUTUBE_PLAYER_SIZE_KEY) || 'null');
    if (Number.isFinite(stored?.width)) setMidoriYouTubePlayerWidth(stored.width);
  } catch (_) {}

  const resize = {
    active: false,
    pointerId: null,
    direction: '',
    startX: 0,
    startY: 0,
    startRect: null,
    previousCursor: '',
  };

  handles.forEach((handle) => {
    handle.addEventListener('pointerdown', (event) => {
      if (midoriYouTubePlayerDock.dataset.minimized === 'true' || event.button !== 0) return;
      resize.active = true;
      resize.pointerId = event.pointerId;
      resize.direction = String(handle.dataset.youtubeResize || '');
      resize.startX = event.clientX;
      resize.startY = event.clientY;
      resize.startRect = midoriYouTubePlayerDock.getBoundingClientRect();
      resize.previousCursor = document.documentElement.style.cursor;
      document.documentElement.style.cursor = getComputedStyle(handle).cursor;
      midoriYouTubePlayerDock.dataset.resizing = 'true';
      placeMidoriYouTubePlayer(resize.startRect.left, resize.startRect.top);
      event.preventDefault();
      event.stopPropagation();
    });
  });

  document.addEventListener('pointermove', (event) => {
    if (!resize.active || event.pointerId !== resize.pointerId || !resize.startRect) return;
    const dx = event.clientX - resize.startX;
    const dy = event.clientY - resize.startY;
    const horizontalDelta = resize.direction.includes('e')
      ? dx
      : resize.direction.includes('w')
        ? -dx
        : 0;
    const verticalDelta = resize.direction.includes('s')
      ? dy * MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO
      : resize.direction.includes('n')
        ? -dy * MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO
        : 0;
    const widthDelta = horizontalDelta && verticalDelta
      ? (Math.abs(horizontalDelta) >= Math.abs(verticalDelta) ? horizontalDelta : verticalDelta)
      : horizontalDelta || verticalDelta;

    setMidoriYouTubePlayerWidth(resize.startRect.width + widthDelta);
    const resizedRect = midoriYouTubePlayerDock.getBoundingClientRect();
    const left = resize.direction.includes('w')
      ? resize.startRect.right - resizedRect.width
      : resize.startRect.left;
    const top = resize.direction.includes('n')
      ? resize.startRect.bottom - resizedRect.height
      : resize.startRect.top;
    placeMidoriYouTubePlayer(left, top);
    event.preventDefault();
  });

  const finishResize = (event) => {
    if (!resize.active || event.pointerId !== resize.pointerId) return;
    resize.active = false;
    resize.pointerId = null;
    resize.direction = '';
    resize.startRect = null;
    delete midoriYouTubePlayerDock.dataset.resizing;
    document.documentElement.style.cursor = resize.previousCursor;
    const rect = midoriYouTubePlayerDock.getBoundingClientRect();
    setMidoriYouTubePlayerWidth(rect.width, { persist: true });
    placeMidoriYouTubePlayer(rect.left, rect.top, { persist: true });
  };
  document.addEventListener('pointerup', finishResize);
  document.addEventListener('pointercancel', finishResize);
  window.addEventListener('resize', () => {
    if (midoriYouTubePlayerDock.dataset.minimized === 'true') return;
    const currentWidth = midoriYouTubePlayerDock.getBoundingClientRect().width
      || Number.parseFloat(midoriYouTubePlayerDock.style.width)
      || 420;
    setMidoriYouTubePlayerWidth(currentWidth, { persist: true });
    if (midoriYouTubePlayerDock.hidden) return;
    const rect = midoriYouTubePlayerDock.getBoundingClientRect();
    placeMidoriYouTubePlayer(rect.left, rect.top, { persist: true });
  });
}

function clampMidoriBilibiliPlayerPosition(left, top) {
  if (!midoriBilibiliPlayerDock) return { left: 0, top: 0 };
  const rect = midoriBilibiliPlayerDock.getBoundingClientRect();
  const styledWidth = Number.parseFloat(midoriBilibiliPlayerDock.style.width);
  const width = rect.width || midoriBilibiliPlayerDock.offsetWidth || styledWidth || 420;
  const estimatedHeight = MIDORI_YOUTUBE_PLAYER_HEADING_HEIGHT
    + 2
    + Math.max(0, width - 2) / MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO;
  const height = rect.height || midoriBilibiliPlayerDock.offsetHeight || estimatedHeight;
  return {
    left: Math.max(0, Math.min(left, Math.max(0, window.innerWidth - width))),
    top: Math.max(0, Math.min(top, Math.max(0, window.innerHeight - height))),
  };
}

function placeMidoriBilibiliPlayer(left, top, { persist = false } = {}) {
  if (!midoriBilibiliPlayerDock) return;
  const clamped = clampMidoriBilibiliPlayerPosition(left, top);
  midoriBilibiliPlayerDock.style.left = `${Math.round(clamped.left)}px`;
  midoriBilibiliPlayerDock.style.top = `${Math.round(clamped.top)}px`;
  midoriBilibiliPlayerDock.style.right = 'auto';
  midoriBilibiliPlayerDock.style.bottom = 'auto';
  if (persist) {
    try {
      localStorage.setItem(MIDORI_BILIBILI_PLAYER_POSITION_KEY, JSON.stringify(clamped));
    } catch (_) {}
  }
}

function setMidoriBilibiliPlayerWidth(width, { persist = false } = {}) {
  if (!midoriBilibiliPlayerDock) return 0;
  const bounds = getMidoriYouTubePlayerWidthBounds();
  const clamped = Math.max(bounds.min, Math.min(Number(width) || 420, bounds.max));
  midoriBilibiliPlayerDock.style.width = `${Math.round(clamped)}px`;
  if (persist) {
    try {
      localStorage.setItem(MIDORI_BILIBILI_PLAYER_SIZE_KEY, JSON.stringify({ width: clamped }));
    } catch (_) {}
  }
  return clamped;
}

function setupMidoriBilibiliPlayerDrag() {
  if (!midoriBilibiliPlayerDock || !midoriBilibiliPlayerDragHandle) return;
  try {
    const stored = JSON.parse(localStorage.getItem(MIDORI_BILIBILI_PLAYER_POSITION_KEY) || 'null');
    if (Number.isFinite(stored?.left) && Number.isFinite(stored?.top)) {
      placeMidoriBilibiliPlayer(stored.left, stored.top);
    }
  } catch (_) {}

  const drag = { active: false, pointerId: null, dx: 0, dy: 0 };
  midoriBilibiliPlayerDragHandle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || event.target.closest('button')) return;
    const rect = midoriBilibiliPlayerDock.getBoundingClientRect();
    drag.active = true;
    drag.pointerId = event.pointerId;
    drag.dx = event.clientX - rect.left;
    drag.dy = event.clientY - rect.top;
    midoriBilibiliPlayerDock.dataset.dragging = 'true';
    placeMidoriBilibiliPlayer(rect.left, rect.top);
    event.preventDefault();
  });
  document.addEventListener('pointermove', (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    placeMidoriBilibiliPlayer(event.clientX - drag.dx, event.clientY - drag.dy);
    event.preventDefault();
  });
  const finishDrag = (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    drag.active = false;
    drag.pointerId = null;
    delete midoriBilibiliPlayerDock.dataset.dragging;
    const rect = midoriBilibiliPlayerDock.getBoundingClientRect();
    const persist = midoriBilibiliPlayerDock.dataset.minimized !== 'true';
    placeMidoriBilibiliPlayer(rect.left, rect.top, { persist });
  };
  document.addEventListener('pointerup', finishDrag);
  document.addEventListener('pointercancel', finishDrag);
  window.addEventListener('resize', () => {
    if (midoriBilibiliPlayerDock.hidden) return;
    const rect = midoriBilibiliPlayerDock.getBoundingClientRect();
    const persist = midoriBilibiliPlayerDock.dataset.minimized !== 'true';
    placeMidoriBilibiliPlayer(rect.left, rect.top, { persist });
  });
}

function setupMidoriBilibiliPlayerResize() {
  if (!midoriBilibiliPlayerDock) return;
  const handles = [...midoriBilibiliPlayerDock.querySelectorAll('[data-bilibili-resize]')];
  if (!handles.length) return;
  try {
    const stored = JSON.parse(localStorage.getItem(MIDORI_BILIBILI_PLAYER_SIZE_KEY) || 'null');
    if (Number.isFinite(stored?.width)) setMidoriBilibiliPlayerWidth(stored.width);
  } catch (_) {}

  const resize = {
    active: false,
    pointerId: null,
    direction: '',
    startX: 0,
    startY: 0,
    startRect: null,
    previousCursor: '',
  };
  handles.forEach((handle) => {
    handle.addEventListener('pointerdown', (event) => {
      if (midoriBilibiliPlayerDock.dataset.minimized === 'true' || event.button !== 0) return;
      resize.active = true;
      resize.pointerId = event.pointerId;
      resize.direction = String(handle.dataset.bilibiliResize || '');
      resize.startX = event.clientX;
      resize.startY = event.clientY;
      resize.startRect = midoriBilibiliPlayerDock.getBoundingClientRect();
      resize.previousCursor = document.documentElement.style.cursor;
      document.documentElement.style.cursor = getComputedStyle(handle).cursor;
      midoriBilibiliPlayerDock.dataset.resizing = 'true';
      placeMidoriBilibiliPlayer(resize.startRect.left, resize.startRect.top);
      event.preventDefault();
      event.stopPropagation();
    });
  });
  document.addEventListener('pointermove', (event) => {
    if (!resize.active || event.pointerId !== resize.pointerId || !resize.startRect) return;
    const dx = event.clientX - resize.startX;
    const dy = event.clientY - resize.startY;
    const horizontalDelta = resize.direction.includes('e')
      ? dx
      : resize.direction.includes('w') ? -dx : 0;
    const verticalDelta = resize.direction.includes('s')
      ? dy * MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO
      : resize.direction.includes('n') ? -dy * MIDORI_YOUTUBE_PLAYER_ASPECT_RATIO : 0;
    const widthDelta = horizontalDelta && verticalDelta
      ? (Math.abs(horizontalDelta) >= Math.abs(verticalDelta) ? horizontalDelta : verticalDelta)
      : horizontalDelta || verticalDelta;
    setMidoriBilibiliPlayerWidth(resize.startRect.width + widthDelta);
    const resizedRect = midoriBilibiliPlayerDock.getBoundingClientRect();
    const left = resize.direction.includes('w')
      ? resize.startRect.right - resizedRect.width
      : resize.startRect.left;
    const top = resize.direction.includes('n')
      ? resize.startRect.bottom - resizedRect.height
      : resize.startRect.top;
    placeMidoriBilibiliPlayer(left, top);
    event.preventDefault();
  });
  const finishResize = (event) => {
    if (!resize.active || event.pointerId !== resize.pointerId) return;
    resize.active = false;
    resize.pointerId = null;
    resize.direction = '';
    resize.startRect = null;
    delete midoriBilibiliPlayerDock.dataset.resizing;
    document.documentElement.style.cursor = resize.previousCursor;
    const rect = midoriBilibiliPlayerDock.getBoundingClientRect();
    setMidoriBilibiliPlayerWidth(rect.width, { persist: true });
    placeMidoriBilibiliPlayer(rect.left, rect.top, { persist: true });
  };
  document.addEventListener('pointerup', finishResize);
  document.addEventListener('pointercancel', finishResize);
  window.addEventListener('resize', () => {
    if (midoriBilibiliPlayerDock.dataset.minimized === 'true') return;
    const currentWidth = midoriBilibiliPlayerDock.getBoundingClientRect().width
      || Number.parseFloat(midoriBilibiliPlayerDock.style.width)
      || 420;
    setMidoriBilibiliPlayerWidth(currentWidth, { persist: true });
    if (midoriBilibiliPlayerDock.hidden) return;
    const rect = midoriBilibiliPlayerDock.getBoundingClientRect();
    placeMidoriBilibiliPlayer(rect.left, rect.top, { persist: true });
  });
}

function cancelMidoriRequest(request) {
  if (!request || request.completed || request.cancelSent) return;
  request.cancelSent = true;
  try {
    // Do not reuse the aborted submit signal or retry an uncertain write.
    void publicFetch('/api/chat/cancel', {
      method: 'POST', cache: 'no-store', keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ request_id: request.id }),
    }).catch(() => {});
  } catch (_) { /* Best-effort; the server also enforces its own deadline. */ }
}

function abandonActiveMidoriRequest() {
  if (!activeMidoriRequest) return;
  cancelMidoriRequest(activeMidoriRequest);
  activeMidoriRequest.controller.abort();
}

async function submitMidoriInput() {
  if (!midoriInputDock || !midoriInput || midoriChatBusy) return;
  const draft = midoriInput.value.trim();
  if (!draft) {
    midoriInput.focus({ preventScroll: true });
    return;
  }
  const submittedContext = midoriInputDock.dataset.context || '';

  midoriChatBusy = true;
  midoriInputDock.dataset.busy = 'true';
  resetMidoriReplyForTurn();
  midoriInput.value = '';
  updateMidoriInputFilled();
  resizeMidoriInput();
  midoriInput.readOnly = true;
  if (midoriInputEnter) midoriInputEnter.disabled = true;
  if (midoriInputStatus) {
    midoriInputStatus.textContent = submittedContext === 'spotify'
      ? 'Spotify · 正在检查快捷控制'
      : submittedContext === 'youtube'
        ? 'YouTube · 正在向你的 Agent 提交请求'
        : submittedContext === 'bilibili'
          ? 'Bilibili · 正在向你的 Agent 提交请求'
        : '消息已发送，等待阿绿回复';
  }

  let finalText = '';
  let streamedText = '';
  let sawAssistantCompleted = false;
  let streamStarted = false;
  let voiceWarning = '';
  const chatAbortController = new AbortController();
  const request = {
    id: globalThis.crypto?.randomUUID?.() || `web_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`,
    controller: chatAbortController, completed: false, cancelSent: false, timedOut: false,
  };
  activeMidoriRequest = request;
  const chatTimeout = globalThis.setTimeout(
    () => { request.timedOut = true; cancelMidoriRequest(request); chatAbortController.abort(); }, MIDORI_CHAT_REQUEST_TIMEOUT_MS,
  );
  try {
    const quickResult = await trySubmitSpotifyQuickControl(draft, submittedContext, chatAbortController.signal, request.id);
    if (quickResult.handled) {
      request.completed = true;
      if (midoriInputStatus) midoriInputStatus.textContent = quickResult.message;
      return;
    }

    midoriReplySubmittedPreview = formatMidoriReplySubmittedPreview(draft);
    startMidoriReplyThinking();
    if (midoriInputStatus) midoriInputStatus.textContent = '消息已发送，等待阿绿回复';
    if (!liveAudioUnlocked) unlockLiveAudio({ playQueued: false }).catch(() => {});
    const response = await awaitMidoriRequest(publicFetch('/api/chat/stream', {
      method: 'POST',
      cache: 'no-store',
      signal: chatAbortController.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      body: JSON.stringify({
        text: draft,
        request_id: request.id,
        session_id: readStoredMidoriHermesSession(submittedContext),
        context: submittedContext,
      }),
    }), chatAbortController.signal);
    if (!response.ok || !response.body) {
      const errorPayload = await awaitMidoriRequest(response.json().catch(() => null), chatAbortController.signal);
      throw new Error(errorPayload?.error || `聊天服务 HTTP ${response.status}`);
    }

    streamStarted = true;
    await consumeMidoriChatStream(response, (eventName, payload) => {
      if (chatAbortController.signal.aborted) return;
      if (eventName === 'session.ready') {
        const sessionId = String(payload.session_id || '');
        storeMidoriHermesSession(submittedContext, sessionId);
      } else if (eventName === 'assistant.delta') {
        streamedText += String(payload.delta || '');
      } else if (eventName === 'assistant.completed') {
        if (!sawAssistantCompleted) {
          if (typeof payload.content !== 'string' || !payload.content.trim()) {
            throw new Error('回复完成事件缺少有效正文；本轮结果不完整。');
          }
          finalText = payload.content.trim();
        }
        sawAssistantCompleted = true;
        request.completed = true;
      } else if (eventName === 'youtube.play') {
        handleMidoriYouTubePlayEvent(payload);
      } else if (eventName === 'bilibili.play') {
        handleMidoriBilibiliPlayEvent(payload);
      } else if (eventName === 'bilibili.stop') {
        closeMidoriBilibiliPlayer();
      } else if (eventName === 'tool.started') {
        if (midoriInputStatus) {
          midoriInputStatus.textContent = midoriToolProgressText(payload.tool_name, submittedContext);
        }
      } else if (eventName === 'tool.completed') {
        if (midoriInputStatus) {
          midoriInputStatus.textContent = midoriToolProgressText(payload.tool_name, submittedContext, 'completed');
        }
      } else if (eventName === 'tool.failed') {
        if (midoriInputStatus) {
          midoriInputStatus.textContent = midoriToolProgressText(payload.tool_name, submittedContext, 'failed');
        }
      } else if (eventName === 'voice.queued') {
        if (sawAssistantCompleted && midoriInputStatus) midoriInputStatus.textContent = '阿绿回复完成，语音分段生成中';
      } else if (eventName === 'voice.error') {
        voiceWarning = payload.message || '语音生成或交付失败';
        showMidoriVoiceWarning(payload);
      } else if (eventName === 'error') {
        throw new Error(payload.message || 'Midori Agent 流式响应失败');
      }
    }, chatAbortController.signal);

    if (!sawAssistantCompleted) throw new Error('回复流已中断，未收到完成确认；本轮结果不完整。');
    if (!finalText) throw new Error('阿绿这次没有返回可显示的回复');
    playMidoriReplyText(finalText);
    if (midoriInputStatus) midoriInputStatus.textContent = voiceWarning ? `阿绿回复完成，语音异常：${voiceWarning}` : '阿绿回复完成';
  } catch (err) {
    cancelMidoriRequest(request);
    const chatTimedOut = request.timedOut;
    const chatAbandoned = chatAbortController.signal.aborted && !chatTimedOut;
    if (chatAbortController.signal.aborted || (streamStarted && !sawAssistantCompleted)) clearStoredMidoriHermesSession(submittedContext);
    const errorLabel = err.spotifyQuickControl
      ? 'Spotify 控制失败'
      : chatTimedOut
        ? '连接超时'
        : '连接失败';
    const errorMessage = chatTimedOut
      ? '本轮请求超过 120 秒，已解锁输入框；操作结果不明，未自动重试。下次发送会使用新会话，避免续接旧请求。'
      : chatAbandoned ? '本轮请求已取消，操作结果不明，未自动重试。' : friendlyError(err.message);
    if (sawAssistantCompleted && finalText) {
      // Keep the confirmed answer even if a trailing voice/media event fails.
      playMidoriReplyText(finalText);
      if (midoriInputStatus) midoriInputStatus.textContent = `阿绿回复已完成，后续连接异常：${errorMessage}`;
      return;
    }
    playMidoriReplyText(`${errorLabel}：${errorMessage}`);
    if (midoriInputStatus) {
      midoriInputStatus.textContent = chatTimedOut
        ? '发送超时，输入框已恢复'
        : err.spotifyQuickControl
        ? 'Spotify · 操作失败，输入未自动恢复'
        : '发送失败，输入未自动恢复';
    }
  } finally {
    if (chatTimeout) globalThis.clearTimeout(chatTimeout);
    if (activeMidoriRequest === request) activeMidoriRequest = null;
    midoriChatBusy = false;
    midoriInputDock.dataset.busy = 'false';
    midoriInput.readOnly = false;
    if (midoriInputEnter) midoriInputEnter.disabled = false;
    midoriInput.focus({ preventScroll: true });
  }
}

function setupMidoriInputDock() {
  if (!midoriInputDock || !midoriInput) return;
  window.addEventListener('pagehide', abandonActiveMidoriRequest);
  discardLegacyMidoriHermesSession();
  midoriReply?.addEventListener('wheel', handleMidoriReplyWheel, { passive: false });
  midoriReply?.addEventListener('pointerdown', startMidoriReplySelectionScrollLock);
  document.addEventListener('pointerup', stopMidoriReplySelectionScrollLock);
  document.addEventListener('pointercancel', stopMidoriReplySelectionScrollLock);
  window.addEventListener('blur', stopMidoriReplySelectionScrollLock);
  window.addEventListener('scroll', holdMidoriReplySelectionScrollLock, { passive: true });
  midoriInput.addEventListener('input', () => {
    updateMidoriInputFilled();
    resizeMidoriInput();
  });
  midoriInput.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    const shouldRemoveContext =
      event.key === 'Backspace' &&
      Boolean(midoriInputDock.dataset.context) &&
      midoriInput.selectionStart === 0 &&
      midoriInput.selectionEnd === 0;
    if (shouldRemoveContext) {
      event.preventDefault();
      clearMidoriInputContext();
      return;
    }
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    submitMidoriInput();
  });
  midoriInputDock.addEventListener('submit', (event) => {
    event.preventDefault();
    submitMidoriInput();
  });
  updateMidoriInputFilled();
  resizeMidoriInput();
}

function setupFloatingSiteIcons() {
  if (!siteIconDock || !siteIconLinks.length) return;
  const dockRect = siteIconDock.getBoundingClientRect();
  siteIconStates = siteIconLinks.map((link, index) => {
    const site = link.dataset.site;
    const layout = SITE_ICON_LAYOUT[site] || { x: 50, y: 50 };
    const state = {
      link,
      x: dockRect.width * (layout.x / 100),
      y: dockRect.height * (layout.y / 100),
      vx: 0,
      vy: 0,
      speed: randomBetween(7, 13),
      turnIn: randomBetween(3.8, 8.5),
      rotatePhase: randomBetween(0, Math.PI * 2),
      dragging: false,
      pointerId: null,
      holdTimer: 0,
      suppressClickUntil: 0,
      respawning: false,
      respawnTimer: 0,
      spawnTimer: 0,
      hoverPaused: false,
      pausedRotate: null,
      ignoreHoverPauseUntilLeave: false,
    };
    setupSiteIconUnreadBadge(link);
    setSiteIconRandomVelocity(state, index);
    resolveSiteIconPosition(state);
    applySiteIconPosition(state);
    bindSiteIconDragHandlers(state);
    return state;
  });
  refreshSiteIconForbiddenRect(true);
  setupGmailUnreadPolling();
  if (!siteIconRaf) siteIconRaf = requestAnimationFrame(tickSiteIcons);
}

function setSiteIconRandomVelocity(state, seed = 0) {
  const angle = randomBetween(0, Math.PI * 2) + seed * 0.37;
  state.speed = randomBetween(5.5, 10.5);
  state.vx = Math.cos(angle) * state.speed;
  state.vy = Math.sin(angle) * state.speed;
  state.turnIn = randomBetween(4.5, 10.5);
}

function reflectSiteIconVelocity(state, axis) {
  if (axis === 'x') state.vx *= -1;
  if (axis === 'y') state.vy *= -1;
  const angle = Math.atan2(state.vy, state.vx) + randomBetween(-0.45, 0.45);
  const speed = clamp(Math.hypot(state.vx, state.vy) || state.speed || 9, 6.5, 13.5);
  state.vx = Math.cos(angle) * speed;
  state.vy = Math.sin(angle) * speed;
  state.turnIn = randomBetween(3.8, 8.5);
}

function siteIconCurrentSpeed(state) {
  return Math.hypot(state.vx, state.vy) || state.speed || 8;
}

function reflectSiteIconVelocityOnNormal(state, nx, ny, fallbackSign = -1) {
  const speed = siteIconCurrentSpeed(state);
  const dot = state.vx * nx + state.vy * ny;
  let nextVx = state.vx - 2 * dot * nx;
  let nextVy = state.vy - 2 * dot * ny;
  const nextSpeed = Math.hypot(nextVx, nextVy);

  if (nextSpeed < 0.001) {
    nextVx = nx * speed * fallbackSign;
    nextVy = ny * speed * fallbackSign;
  } else {
    nextVx = (nextVx / nextSpeed) * speed;
    nextVy = (nextVy / nextSpeed) * speed;
  }

  state.vx = nextVx;
  state.vy = nextVy;
  state.speed = speed;
}

function siteIconHalfSize(state) {
  const rect = state.link.getBoundingClientRect();
  const halfX = (rect.width / 2 || 43) * SITE_ICON_COLLISION_SCALE;
  const halfY = (rect.height / 2 || 48) * SITE_ICON_COLLISION_SCALE;
  return {
    x: Math.max(38 * SITE_ICON_COLLISION_SCALE, halfX),
    y: Math.max(42 * SITE_ICON_COLLISION_SCALE, halfY),
  };
}

function siteIconAppearanceHalfSize(state) {
  const rect = state.link.getBoundingClientRect();
  const width = state.link.offsetWidth || rect.width || 86;
  const height = state.link.offsetHeight || rect.height || 96;
  const radians = SITE_ICON_WOBBLE_MAX_DEG * (Math.PI / 180);
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));
  return {
    x: (width * cos + height * sin) / 2 + SITE_ICON_APPEARANCE_GUARD_PX,
    y: (width * sin + height * cos) / 2 + SITE_ICON_APPEARANCE_GUARD_PX,
  };
}

function siteIconAppearanceBounds(state, dockRect) {
  const half = siteIconAppearanceHalfSize(state);
  const centerX = dockRect.width / 2;
  const centerY = dockRect.height / 2;
  const minX = Math.min(half.x, centerX);
  const minY = Math.min(half.y, centerY);
  return {
    minX,
    maxX: Math.max(minX, dockRect.width - half.x),
    minY,
    maxY: Math.max(minY, dockRect.height - half.y),
  };
}

function projectSiteIconToAppearanceBounds(state, point, dockRect) {
  const bounds = siteIconAppearanceBounds(state, dockRect);
  return {
    x: clamp(point.x, bounds.minX, bounds.maxX),
    y: clamp(point.y, bounds.minY, bounds.maxY),
  };
}

function siteIconRectAt(state, x = state.x, y = state.y) {
  const half = siteIconHalfSize(state);
  return {
    left: x - half.x,
    right: x + half.x,
    top: y - half.y,
    bottom: y + half.y,
  };
}

function rectsOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function inflateRect(rect, margin) {
  return {
    left: rect.left - margin,
    right: rect.right + margin,
    top: rect.top - margin,
    bottom: rect.bottom + margin,
  };
}

function avatarToolbarGuardRect() {
  if (!siteIconDock || !avatarToolbar) return null;
  const dockRect = siteIconDock.getBoundingClientRect();
  const toolbarRect = avatarToolbar.getBoundingClientRect();
  if (toolbarRect.width <= 0 || toolbarRect.height <= 0) return null;

  return inflateRect({
    left: toolbarRect.left - dockRect.left,
    right: toolbarRect.right - dockRect.left,
    top: toolbarRect.top - dockRect.top,
    bottom: toolbarRect.bottom - dockRect.top,
  }, SITE_ICON_TOOLBAR_GUARD_MARGIN);
}

function siteIconBlockingRects({ avoidTexture = true, avoidToolbar = true } = {}) {
  const rects = [];
  if (avoidTexture && siteIconForbiddenRect) {
    rects.push(inflateRect(siteIconForbiddenRect, SITE_ICON_BOUNDARY_GAP_PX));
  }
  const toolbarRect = avoidToolbar ? avatarToolbarGuardRect() : null;
  if (toolbarRect) rects.push(toolbarRect);
  // The accepted floating timer can otherwise cover a family's side control.
  // Extend existing blockers without changing the accepted timer geometry.
  const timer = avoidToolbar ? document.getElementById('midoriPomodoro')?.shadowRoot?.getElementById('clock') : null;
  if (timer && siteIconDock) {
    const box = timer.getBoundingClientRect(), dock = siteIconDock.getBoundingClientRect();
    if (box.width && box.height) rects.push(inflateRect({
      left: box.left - dock.left, right: box.right - dock.left,
      top: box.top - dock.top, bottom: box.bottom - dock.top,
    }, SITE_ICON_TOOLBAR_GUARD_MARGIN));
  }
  return rects;
}

function rectOverlapsAny(rect, candidates) {
  return candidates.some((candidate) => rectsOverlap(rect, candidate));
}

function resolveSiteIconAgainstRect(state, forbidden, bounds) {
  const rect = siteIconRectAt(state);
  if (!rectsOverlap(rect, forbidden)) return '';

  const pushes = [
    { axis: 'x', value: forbidden.left - rect.right },
    { axis: 'x', value: forbidden.right - rect.left },
    { axis: 'y', value: forbidden.top - rect.bottom },
    { axis: 'y', value: forbidden.bottom - rect.top },
  ].sort((a, b) => Math.abs(a.value) - Math.abs(b.value));

  const push = pushes[0];
  if (push.axis === 'x') state.x += push.value;
  else state.y += push.value;
  state.x = clamp(state.x, bounds.minX, bounds.maxX);
  state.y = clamp(state.y, bounds.minY, bounds.maxY);
  let bouncedAxis = push.axis;

  if (rectsOverlap(siteIconRectAt(state), forbidden)) {
    const { half, dockWidth, dockHeight, minX, maxX, minY, maxY } = bounds;
    const spaces = [
      { side: 'left', size: forbidden.left, x: Math.max(minX, forbidden.left - half.x), y: state.y, axis: 'x' },
      { side: 'right', size: dockWidth - forbidden.right, x: Math.min(maxX, forbidden.right + half.x), y: state.y, axis: 'x' },
      { side: 'top', size: forbidden.top, x: state.x, y: Math.max(minY, forbidden.top - half.y), axis: 'y' },
      { side: 'bottom', size: dockHeight - forbidden.bottom, x: state.x, y: Math.min(maxY, forbidden.bottom + half.y), axis: 'y' },
    ].sort((a, b) => b.size - a.size);
    const target = spaces[0];
    state.x = clamp(target.x, minX, maxX);
    state.y = clamp(target.y, minY, maxY);
    bouncedAxis = target.axis;
  }

  return bouncedAxis;
}

function resolveSiteIconPosition(state, { avoidTexture = true, reflect = true, avoidToolbar = true } = {}) {
  if (!siteIconDock) return;
  const dockRect = siteIconDock.getBoundingClientRect();
  const half = siteIconHalfSize(state);
  let bouncedAxis = '';

  const minX = half.x + SITE_ICON_BOUNDARY_GAP_PX;
  const maxX = Math.max(minX, dockRect.width - half.x - SITE_ICON_BOUNDARY_GAP_PX);
  const minY = half.y + SITE_ICON_BOUNDARY_GAP_PX;
  const maxY = Math.max(minY, dockRect.height - half.y - SITE_ICON_BOUNDARY_GAP_PX);

  if (state.x < minX || state.x > maxX) {
    state.x = clamp(state.x, minX, maxX);
    bouncedAxis = 'x';
  }
  if (state.y < minY || state.y > maxY) {
    state.y = clamp(state.y, minY, maxY);
    bouncedAxis = bouncedAxis || 'y';
  }

  const bounds = { half, minX, maxX, minY, maxY, dockWidth: dockRect.width, dockHeight: dockRect.height };
  const blockingRects = siteIconBlockingRects({ avoidTexture, avoidToolbar });
  for (let pass = 0; pass < 2; pass += 1) {
    for (const forbidden of blockingRects) {
      const axis = resolveSiteIconAgainstRect(state, forbidden, bounds);
      if (axis && !bouncedAxis) bouncedAxis = axis;
    }
  }

  if (bouncedAxis && reflect && !state.dragging) reflectSiteIconVelocity(state, bouncedAxis);
}
function siteIconRespawnCandidateIsSafe(state, point, blockingRects, { avoidIcons = true } = {}) {
  const rect = siteIconRectAt(state, point.x, point.y);
  if (rectOverlapsAny(rect, blockingRects)) return false;
  if (!avoidIcons) return true;
  return !siteIconStates.some((other) => (
    other !== state && !other.respawning && rectsOverlap(rect, siteIconRectAt(other))
  ));
}

function findNearestSafeSiteIconPosition(state, origin, blockingRects, spawnBounds, { avoidIcons = true } = {}) {
  const step = 8;
  let best = null;
  const consider = (x, y) => {
    const point = { x, y };
    if (!siteIconRespawnCandidateIsSafe(state, point, blockingRects, { avoidIcons })) return;
    const distance = Math.hypot(x - origin.x, y - origin.y);
    if (!best || distance < best.distance) best = { ...point, distance };
  };

  for (let y = spawnBounds.minY; y <= spawnBounds.maxY; y += step) {
    for (let x = spawnBounds.minX; x <= spawnBounds.maxX; x += step) consider(x, y);
    consider(spawnBounds.maxX, y);
  }
  for (let x = spawnBounds.minX; x <= spawnBounds.maxX; x += step) consider(x, spawnBounds.maxY);
  consider(spawnBounds.maxX, spawnBounds.maxY);
  return best ? { x: best.x, y: best.y } : null;
}

function pickRandomSiteIconPosition(state) {
  const dockRect = siteIconDock.getBoundingClientRect();
  const collisionHalf = siteIconHalfSize(state);
  const rawMinX = collisionHalf.x + SITE_ICON_BOUNDARY_GAP_PX;
  const rawMaxX = Math.max(rawMinX, dockRect.width - collisionHalf.x - SITE_ICON_BOUNDARY_GAP_PX);
  const rawMinY = collisionHalf.y + SITE_ICON_BOUNDARY_GAP_PX;
  const rawMaxY = Math.max(rawMinY, dockRect.height - collisionHalf.y - SITE_ICON_BOUNDARY_GAP_PX);
  const spawnBounds = siteIconAppearanceBounds(state, dockRect);
  const blockingRects = siteIconBlockingRects({ avoidTexture: true });
  let lastProjected = projectSiteIconToAppearanceBounds(state, {
    x: randomBetween(rawMinX, rawMaxX),
    y: randomBetween(rawMinY, rawMaxY),
  }, dockRect);

  for (let attempt = 0; attempt < 180; attempt += 1) {
    const rawX = randomBetween(rawMinX, rawMaxX);
    const rawY = randomBetween(rawMinY, rawMaxY);
    const projected = projectSiteIconToAppearanceBounds(state, { x: rawX, y: rawY }, dockRect);
    lastProjected = projected;
    if (siteIconRespawnCandidateIsSafe(state, projected, blockingRects)) return projected;
  }

  const fallbackSlots = [
    { x: spawnBounds.minX + (spawnBounds.maxX - spawnBounds.minX) * 0.14, y: spawnBounds.minY + (spawnBounds.maxY - spawnBounds.minY) * 0.24 },
    { x: spawnBounds.minX + (spawnBounds.maxX - spawnBounds.minX) * 0.14, y: spawnBounds.minY + (spawnBounds.maxY - spawnBounds.minY) * 0.76 },
    { x: spawnBounds.minX + (spawnBounds.maxX - spawnBounds.minX) * 0.86, y: spawnBounds.minY + (spawnBounds.maxY - spawnBounds.minY) * 0.22 },
    { x: spawnBounds.minX + (spawnBounds.maxX - spawnBounds.minX) * 0.86, y: spawnBounds.minY + (spawnBounds.maxY - spawnBounds.minY) * 0.78 },
  ];
  const fallback = fallbackSlots.find((slot) => (
    siteIconRespawnCandidateIsSafe(state, slot, blockingRects)
  ));
  if (fallback) return fallback;

  return findNearestSafeSiteIconPosition(state, lastProjected, blockingRects, spawnBounds)
    || findNearestSafeSiteIconPosition(state, lastProjected, blockingRects, spawnBounds, { avoidIcons: false })
    || { x: spawnBounds.minX, y: spawnBounds.minY };
}
function respawnSiteIcon(state) {
  if (state.respawning) return;

  window.clearTimeout(state.holdTimer);
  window.clearTimeout(state.respawnTimer);
  window.clearTimeout(state.spawnTimer);
  state.dragging = false;
  state.dragStarted = false;
  state.pointerId = null;
  state.ignoreHoverPauseUntilLeave = false;
  state.respawning = true;
  state.suppressClickUntil = performance.now() + SITE_ICON_RESPAWN_FADE_MS * 2 + 250;
  state.link.classList.remove('is-drag-pending', 'is-dragging', 'is-spawning');
  state.link.classList.add('is-respawning');

  state.respawnTimer = window.setTimeout(() => {
    const next = pickRandomSiteIconPosition(state);
    state.x = next.x;
    state.y = next.y;
    setSiteIconRandomVelocity(state);
    resolveSiteIconPosition(state, { avoidTexture: true, reflect: false });
    applySiteIconPosition(state);

    requestAnimationFrame(() => {
      state.link.classList.add('is-spawning');
      state.link.classList.remove('is-respawning');
      state.spawnTimer = window.setTimeout(() => {
        state.link.classList.remove('is-spawning');
        state.respawning = false;
      }, SITE_ICON_RESPAWN_FADE_MS);
    });
  }, SITE_ICON_RESPAWN_FADE_MS);
}

function resolveSiteIconPairCollisions() {
  for (let pass = 0; pass < 3; pass += 1) {
    let changed = false;

    for (let i = 0; i < siteIconStates.length; i += 1) {
      for (let j = i + 1; j < siteIconStates.length; j += 1) {
        const a = siteIconStates[i];
        const b = siteIconStates[j];
        if (a.respawning || b.respawning) continue;
        const rectA = siteIconRectAt(a);
        const rectB = siteIconRectAt(b);
        if (!rectsOverlap(rectA, rectB)) continue;

        const protectedA = a.dragging || a.hoverPaused;
        const protectedB = b.dragging || b.hoverPaused;
        if (protectedA && protectedB) continue;

        const overlapX = Math.min(rectA.right - rectB.left, rectB.right - rectA.left);
        const overlapY = Math.min(rectA.bottom - rectB.top, rectB.bottom - rectA.top);
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distance = Math.hypot(dx, dy);

        if (distance < 0.001) {
          const fallbackAngle = (i + 1) * 2.399963 + j * 0.73;
          dx = Math.cos(fallbackAngle);
          dy = Math.sin(fallbackAngle);
          distance = 1;
        }

        const nx = dx / distance;
        const ny = dy / distance;
        const separationX = Math.abs(nx) > 0.001 ? overlapX / Math.abs(nx) : Infinity;
        const separationY = Math.abs(ny) > 0.001 ? overlapY / Math.abs(ny) : Infinity;
        const desiredSeparation = Math.min(separationX, separationY) + SITE_ICON_PAIR_COLLISION_PADDING;
        const separation = Math.min(desiredSeparation, SITE_ICON_PAIR_MAX_SEPARATION_STEP);

        if (protectedA && !protectedB) {
          b.x += nx * separation;
          b.y += ny * separation;
        } else if (!protectedA && protectedB) {
          a.x -= nx * separation;
          a.y -= ny * separation;
        } else {
          a.x -= nx * separation * 0.5;
          a.y -= ny * separation * 0.5;
          b.x += nx * separation * 0.5;
          b.y += ny * separation * 0.5;
        }

        const effectiveAvx = protectedA ? 0 : a.vx;
        const effectiveAvy = protectedA ? 0 : a.vy;
        const effectiveBvx = protectedB ? 0 : b.vx;
        const effectiveBvy = protectedB ? 0 : b.vy;
        const relativeVelocityAlongNormal = (effectiveBvx - effectiveAvx) * nx + (effectiveBvy - effectiveAvy) * ny;
        if (relativeVelocityAlongNormal < -0.01) {
          const aTowardB = effectiveAvx * nx + effectiveAvy * ny;
          const bTowardA = effectiveBvx * nx + effectiveBvy * ny;
          if (!protectedA && aTowardB > 0.01) reflectSiteIconVelocityOnNormal(a, nx, ny, -1);
          if (!protectedB && bTowardA < -0.01) reflectSiteIconVelocityOnNormal(b, nx, ny, 1);
        }

        if (!protectedA) resolveSiteIconPosition(a, { avoidTexture: true, reflect: false });
        if (!protectedB) resolveSiteIconPosition(b, { avoidTexture: true, reflect: false });
        changed = true;
      }
    }

    if (!changed) break;
  }
}

function applySiteIconPosition(state) {
  const wobble = state.hoverPaused && state.pausedRotate !== null
    ? state.pausedRotate
    : Math.sin(performance.now() / 2600 + state.rotatePhase) * SITE_ICON_WOBBLE_MAX_DEG;
  state.link.style.setProperty('--icon-x', `${state.x.toFixed(1)}px`);
  state.link.style.setProperty('--icon-y', `${state.y.toFixed(1)}px`);
  state.link.style.setProperty('--icon-rotate', `${wobble.toFixed(2)}deg`);
}

function currentSiteIconAvatarFrame() {
  if (swayMode !== 'off') return avatarSwayFrame;
  if (avatar.classList.contains('special-visual-active') && avatarSpecialFrame?.classList.contains('is-active')) {
    return avatarSpecialFrame;
  }
  return avatarFrames[activeFrameIndex] || document.querySelector('.avatar-frame.is-active');
}

async function loadSiteIconAvatarBounds(frame) {
  await frame.decode?.();
  const src = frame.dataset?.boundsSrc || frame.currentSrc || frame.src;
  const cached = siteIconAvatarBoundsCache.get(src);
  if (cached) return cached;

  const img = new Image();
  img.src = src;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const stride = SITE_ICON_AVATAR_BOUNDS_STRIDE;
  let minX = canvas.width;
  let maxX = -1;

  for (let y = 0; y < canvas.height; y += stride) {
    for (let x = 0; x < canvas.width; x += stride) {
      if (pixels[(y * canvas.width + x) * 4 + 3] <= SITE_ICON_AVATAR_ALPHA_THRESHOLD) continue;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }

  const bbox = maxX >= minX ? { minX, maxX } : null;
  const bounds = {
    src: img.currentSrc || img.src,
    width: canvas.width,
    height: canvas.height,
    bbox,
  };
  siteIconAvatarBoundsCache.set(src, bounds);
  return bounds;
}

function siteIconAvatarBoundsTransform(bounds, frame) {
  const dockRect = siteIconDock.getBoundingClientRect();
  const avatarRect = avatar.getBoundingClientRect();
  const fitScale = Math.min(avatarRect.width / bounds.width, avatarRect.height / bounds.height);
  const contentWidth = bounds.width * fitScale;
  const style = getComputedStyle(frame);
  const frameScale = Number.parseFloat(style.getPropertyValue('--frame-scale')) || 1;
  const xPct = Number.parseFloat(style.getPropertyValue('--frame-x')) || 0;
  return {
    dockRect,
    avatarRect,
    fitScale,
    contentLeft: avatarRect.left + (avatarRect.width - contentWidth) / 2,
    frameScale,
    tx: avatarRect.width * (xPct / 100),
    cx: avatarRect.left + avatarRect.width / 2,
  };
}

function siteIconAvatarSourceXToViewport(transform, sourceX) {
  const baseX = transform.contentLeft + sourceX * transform.fitScale;
  return transform.cx + (baseX - transform.cx) * transform.frameScale + transform.tx;
}

function fallbackAvatarTextureGuardRect() {
  if (!siteIconDock || !avatar) return null;
  const dockRect = siteIconDock.getBoundingClientRect();
  const avatarRect = avatar.getBoundingClientRect();
  return {
    left: avatarRect.left - dockRect.left + avatarRect.width * 0.26 - SITE_ICON_TEXTURE_GUARD_MARGIN,
    right: avatarRect.left - dockRect.left + avatarRect.width * 0.78 + SITE_ICON_TEXTURE_GUARD_MARGIN,
    top: 0,
    bottom: dockRect.height,
  };
}

async function measureAvatarTextureGuardRect() {
  if (!siteIconDock || !avatar) return null;
  const frame = currentSiteIconAvatarFrame();
  if (!frame) return fallbackAvatarTextureGuardRect();

  const fallback = fallbackAvatarTextureGuardRect();

  try {
    const bounds = await loadSiteIconAvatarBounds(frame);
    if (!bounds?.bbox) return fallback;
    const transform = siteIconAvatarBoundsTransform(bounds, frame);
    const left = siteIconAvatarSourceXToViewport(transform, bounds.bbox.minX);
    const right = siteIconAvatarSourceXToViewport(transform, bounds.bbox.maxX);
    return {
      left: clamp(left - transform.dockRect.left - SITE_ICON_TEXTURE_GUARD_MARGIN, 0, transform.dockRect.width),
      right: clamp(right - transform.dockRect.left + SITE_ICON_TEXTURE_GUARD_MARGIN, 0, transform.dockRect.width),
      top: 0,
      bottom: transform.dockRect.height,
    };
  } catch {
    return fallback;
  }
}

function refreshSiteIconForbiddenRect(force = false) {
  const now = performance.now();
  if (!force && now - siteIconLastForbiddenRefresh < 1200) return;
  if (siteIconForbiddenRefreshPromise) return;

  siteIconLastForbiddenRefresh = now;
  siteIconForbiddenRefreshPromise = measureAvatarTextureGuardRect()
    .then((rect) => {
      siteIconForbiddenRect = rect;
      siteIconStates.forEach((state) => {
        // Pointer drag and respawn own the icon position exclusively. An async
        // avatar-boundary refresh can finish during either state; moving the
        // icon here would make it jump while held or before its fade-out ends.
        if (state.dragging || state.respawning || state.link.dataset.familyOpen === 'true') return;
        resolveSiteIconPosition(state, { avoidTexture: !state.dragging });
        applySiteIconPosition(state);
      });
    })
    .finally(() => {
      siteIconForbiddenRefreshPromise = null;
    });
}

function tickSiteIcons(ts) {
  siteIconRaf = 0;
  if (areSiteIconsCollapsed) {
    siteIconLastTs = 0;
    return;
  }
  siteIconRaf = requestAnimationFrame(tickSiteIcons);
  if (!siteIconLastTs) siteIconLastTs = ts;
  const dt = Math.min(0.05, Math.max(0, (ts - siteIconLastTs) / 1000));
  siteIconLastTs = ts;
  refreshSiteIconForbiddenRect(false);

  siteIconStates.forEach((state) => {
    if (!state.dragging && !state.respawning && !state.hoverPaused) {
      // Keep the current drift vector until a boundary or icon collision reflects it.
      state.x += state.vx * dt;
      state.y += state.vy * dt;
      resolveSiteIconPosition(state);
    } else if (state.hoverPaused && !state.dragging && !state.respawning && state.link.dataset.familyOpen !== 'true') {
      resolveSiteIconPosition(state, { reflect: false });
    }
  });
  resolveSiteIconPairCollisions();
  siteIconStates.forEach(applySiteIconPosition);
}

function setSiteIconsCollapsed(collapsed) {
  if (!siteIconDock || !siteIconToggleBtn) return;
  const nextState = Boolean(collapsed);
  if (areSiteIconsCollapsed === nextState && siteIconDock.dataset.collapsed === String(nextState)) return;

  areSiteIconsCollapsed = nextState;
  siteIconDock.dataset.collapsed = String(nextState);
  siteIconDock.dataset.motion = nextState ? 'collapsing' : 'expanding';
  if (nextState) siteIconDock.setAttribute('aria-hidden', 'true');
  else siteIconDock.removeAttribute('aria-hidden');
  if ('inert' in siteIconDock) siteIconDock.inert = nextState;

  siteIconToggleBtn.setAttribute('aria-expanded', String(!nextState));
  siteIconToggleBtn.classList.toggle('is-active', nextState);
  const actionLabel = nextState ? '放出漂浮应用图标' : '收起漂浮应用图标';
  siteIconToggleBtn.setAttribute('aria-label', actionLabel);
  siteIconToggleBtn.dataset.tooltip = actionLabel;

  siteIconLinks.forEach((link, index) => {
    link.style.setProperty('--site-icon-collapse-order', String(index));
    link.style.setProperty('--site-icon-expand-order', String(siteIconLinks.length - index - 1));
  });
  siteIconStates.forEach((state) => {
    window.clearTimeout(state.holdTimer);
    state.holdTimer = 0;
    state.dragging = false;
    state.pointerId = null;
    state.hoverPaused = false;
    state.pausedRotate = null;
    state.link.classList.remove('is-drag-pending', 'is-dragging', 'is-hover-paused');
  });
  siteIconDragState = null;
  siteIconLastTs = 0;

  if (nextState) {
    if (siteIconRaf) cancelAnimationFrame(siteIconRaf);
    siteIconRaf = 0;
  } else if (!siteIconRaf) {
    siteIconRaf = requestAnimationFrame(tickSiteIcons);
  }

  window.clearTimeout(siteIconTransitionTimer);
  siteIconTransitionTimer = window.setTimeout(() => {
    delete siteIconDock.dataset.motion;
    siteIconTransitionTimer = 0;
  }, 680);
}

async function launchLocalBlender(state) {
  if (state.launchPending || (state.link.dataset.familyCurrent || state.link.dataset.site) !== 'blender') return;
  const target = state.link.querySelector('.site-icon-target');
  const label = state.link.querySelector('.site-icon-label');
  const status = document.querySelector('#blenderLaunchStatus');
  if (!target || !label) return;
  window.clearTimeout(state.launchLabelTimer);
  state.launchPending = true;
  state.link.dataset.launchState = 'pending';
  target.disabled = true;
  label.disabled = true;
  target.setAttribute('aria-busy', 'true');
  target.setAttribute('aria-disabled', 'true');
  label.textContent = '启动中…';
  if (status) status.textContent = '正在启动本地 Blender';
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await publicFetch('/api/apps/blender/launch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Midori-Action': 'launch-blender' },
      body: '{}',
      credentials: 'same-origin',
      cache: 'no-store',
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true || result.app !== 'blender'
        || !Number.isInteger(result.pid) || result.pid <= 0
        || typeof result.already_running !== 'boolean') {
      const error = new Error('Blender launch was not confirmed');
      error.code = result.error_code || 'unconfirmed';
      throw error;
    }
    const message = result.already_running ? 'Blender 已在运行' : 'Blender 已启动';
    state.link.dataset.launchState = 'success';
    label.textContent = result.already_running ? '已在运行' : '已打开';
    target.title = label.title = message;
    if (status) status.textContent = message;
  } catch (error) {
    // An interrupted POST may already have launched the app. Never retry it automatically.
    const uncertain = !error.code || ['unconfirmed', 'blender_launch_timeout', 'blender_launch_failed', 'launch_in_progress'].includes(error.code);
    const message = uncertain
      ? '未能确认 Blender 启动结果，请先检查本地窗口；不会自动重试'
      : 'Blender 启动失败，请检查本地安装或 Avatar 服务后再试';
    state.link.dataset.launchState = 'error';
    label.textContent = uncertain ? '请检查窗口' : '启动失败';
    target.title = label.title = message;
    if (status) status.textContent = message;
  } finally {
    window.clearTimeout(timeout);
    state.launchPending = false;
    target.disabled = false;
    label.disabled = false;
    target.removeAttribute('aria-busy');
    target.removeAttribute('aria-disabled');
    state.launchLabelTimer = window.setTimeout(() => {
      if ((state.link.dataset.familyCurrent || state.link.dataset.site) === 'blender' && !state.launchPending) label.textContent = 'Blender';
    }, 5_000);
  }
}

window.midoriFamilyCanSwitch = (group) => !midoriChatBusy && group?.dataset.launchState !== 'pending';

function bindSiteIconDragHandlers(state) {
  const { link } = state;
  const contextButton = link.querySelector('.site-icon-context, .site-icon-launch-label');

  link.addEventListener('dragstart', (event) => event.preventDefault());
  link.querySelectorAll('img').forEach((img) => {
    img.addEventListener('dragstart', (event) => event.preventDefault());
  });
  contextButton?.addEventListener('pointerdown', (event) => {
    // Labels are independent context/launch actions, not drag handles.
    event.stopPropagation();
  });

  const setHoverPaused = (paused) => {
    const expanded = link.dataset.familyOpen === 'true';
    const shouldPause = (paused || expanded) && !state.dragging && !state.respawning && (!state.ignoreHoverPauseUntilLeave || expanded);
    if (shouldPause && !state.hoverPaused) {
      state.pausedRotate = Number.parseFloat(link.style.getPropertyValue('--icon-rotate')) || 0;
    }
    if (!shouldPause) state.pausedRotate = null;
    state.hoverPaused = shouldPause;
    link.classList.toggle('is-hover-paused', state.hoverPaused);
  };

  link.addEventListener('family-state', (event) => setHoverPaused(event.detail.open || link.matches(':hover')));
  link.addEventListener('family-changed', (event) => {
    window.clearTimeout(state.launchLabelTimer);
    delete link.dataset.launchState;
    if (midoriInputDock?.dataset.context === event.detail.previous) clearMidoriInputContext();
    if (link.dataset.site === 'gmail') setSiteIconUnreadBadge(link, link.dataset.unread || 0);
  });
  link.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') setHoverPaused(true);
  });
  link.addEventListener('pointerleave', () => {
    state.ignoreHoverPauseUntilLeave = false;
    setHoverPaused(false);
  });

  link.addEventListener('pointerdown', (event) => {
    if (state.respawning) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    window.clearTimeout(state.holdTimer);
    siteIconDragState = state;
    state.pointerId = event.pointerId;
    state.startClientX = event.clientX;
    state.startClientY = event.clientY;
    state.dragging = false;
    state.dragStarted = false;
    link.classList.add('is-drag-pending');

    state.holdTimer = window.setTimeout(() => {
      const dockRect = siteIconDock.getBoundingClientRect();
      state.ignoreHoverPauseUntilLeave = true;
      setHoverPaused(false);
      state.dragging = true;
      state.dragStarted = true;
      state.suppressClickUntil = performance.now() + 600;
      state.dragOffsetX = event.clientX - (dockRect.left + state.x);
      state.dragOffsetY = event.clientY - (dockRect.top + state.y);
      link.classList.remove('is-drag-pending');
      link.classList.add('is-dragging');
      try {
        link.setPointerCapture?.(event.pointerId);
      } catch {
        // Synthetic pointer events used by browser tests do not always create an active pointer.
      }
    }, SITE_ICON_DRAG_HOLD_MS);
  });

  link.addEventListener('pointermove', (event) => {
    if (siteIconDragState !== state || state.pointerId !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - state.startClientX, event.clientY - state.startClientY);

    if (!state.dragging && moved > SITE_ICON_DRAG_CANCEL_PX) {
      window.clearTimeout(state.holdTimer);
      link.classList.remove('is-drag-pending');
      return;
    }

    if (!state.dragging) return;
    event.preventDefault();
    const dockRect = siteIconDock.getBoundingClientRect();
    state.x = event.clientX - dockRect.left - state.dragOffsetX;
    state.y = event.clientY - dockRect.top - state.dragOffsetY;
    resolveSiteIconPosition(state, { avoidTexture: false, avoidToolbar: false });
    applySiteIconPosition(state);
  });

  const finishPointer = (event) => {
    if (siteIconDragState !== state || state.pointerId !== event.pointerId) return;
    window.clearTimeout(state.holdTimer);
    link.classList.remove('is-drag-pending');
    if (state.dragStarted) {
      event.preventDefault();
      state.suppressClickUntil = performance.now() + 600;
      if (siteIconForbiddenRect && rectsOverlap(siteIconRectAt(state), siteIconForbiddenRect)) {
        respawnSiteIcon(state);
      } else {
        setSiteIconRandomVelocity(state);
      }
    }
    state.dragging = false;
    state.dragStarted = false;
    state.pointerId = null;
    siteIconDragState = null;
    link.classList.remove('is-dragging');
    setHoverPaused(link.matches(':hover'));
    try {
      link.releasePointerCapture?.(event.pointerId);
    } catch {
      // See setPointerCapture guard above.
    }
  };

  link.addEventListener('pointerup', finishPointer);
  link.addEventListener('pointercancel', finishPointer);

  link.addEventListener('click', (event) => {
    // Let the live-select Alt/Option-click gesture inspect the icon without opening a new tab.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      event.preventDefault();
      return;
    }
    if (performance.now() < state.suppressClickUntil) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if ((link.dataset.familyCurrent || link.dataset.site) === 'blender'
        && event.target.closest('.site-icon-target, .site-icon-label')) {
      event.preventDefault();
      event.stopPropagation();
      launchLocalBlender(state);
      return;
    }
    if (event.target.closest('.site-icon-context')) {
      event.preventDefault();
      event.stopPropagation();
      setMidoriInputContext(link.dataset.familyCurrent || link.dataset.site || '');
      midoriInput?.focus({ preventScroll: true });
      return;
    }
    if (!event.target.closest('.site-icon-target')) return;
    // Opening these target=_blank links can leave the original tab without a pointerleave event.
    // Treat this click as a virtual mouse-leave until the real pointer leaves/re-enters.
    state.ignoreHoverPauseUntilLeave = true;
    setHoverPaused(false);
  });
}

function buildVoiceWavePath(energy, phase = 0) {
  const amp = 2.6 + energy * 9.4;
  const points = [];
  for (let i = 0; i < VOICE_WAVE_POINT_COUNT; i += 1) {
    const t = (i / VOICE_WAVE_POINT_COUNT) * Math.PI * 2;
    const sea =
      Math.sin(t * 3 + phase) * 0.54 +
      Math.sin(t * 5 - phase * 1.38) * 0.28 +
      Math.sin(t * 9 + phase * 0.72) * 0.18 +
      Math.sin(t * 14 - phase * 0.42) * 0.1;
    const radius = VOICE_WAVE_RADIUS + sea * amp;
    points.push({
      x: VOICE_RING_CENTER + Math.cos(t) * radius,
      y: VOICE_RING_CENTER + Math.sin(t) * radius,
    });
  }

  const commands = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`];
  for (let i = 0; i < points.length; i += 1) {
    const p0 = points[(i - 1 + points.length) % points.length];
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    commands.push(`C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
  }
  commands.push('Z');
  return commands.join(' ');
}

function setupVoiceCapsuleCanvas() {
  if (!voiceVisualizer || !voiceCapsuleCtx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(VOICE_CAPSULE_CSS_W * dpr);
  const height = Math.round(VOICE_CAPSULE_CSS_H * dpr);

  if (voiceCapsuleDpr === dpr && voiceVisualizer.width === width && voiceVisualizer.height === height) return;
  voiceCapsuleDpr = dpr;
  voiceVisualizer.width = width;
  voiceVisualizer.height = height;
  voiceCapsuleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawVoiceCapsule();
}

function drawVoiceCapsuleBar(x, y, w, h) {
  if (!voiceCapsuleCtx) return;
  const ctx = voiceCapsuleCtx;
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + r, y + h - r, r, 0, Math.PI);
  ctx.closePath();
}

function drawVoiceCapsule() {
  if (!voiceCapsuleCtx) return;
  const ctx = voiceCapsuleCtx;
  ctx.clearRect(0, 0, VOICE_CAPSULE_CSS_W, VOICE_CAPSULE_CSS_H);
  const totalW = VOICE_CAPSULE_BAR_COUNT * VOICE_CAPSULE_BAR_W + (VOICE_CAPSULE_BAR_COUNT - 1) * VOICE_CAPSULE_GAP;
  const startX = (VOICE_CAPSULE_CSS_W - totalW) / 2;
  const midY = VOICE_CAPSULE_CSS_H / 2;

  for (let i = 0; i < VOICE_CAPSULE_BAR_COUNT; i += 1) {
    const maxH = VOICE_CAPSULE_MIN_H + (VOICE_CAPSULE_MAX_H - VOICE_CAPSULE_MIN_H) * VOICE_CAPSULE_ENVELOPE[i];
    const h = VOICE_CAPSULE_MIN_H + (maxH - VOICE_CAPSULE_MIN_H) * voiceCapsuleLevels[i];
    const x = startX + i * (VOICE_CAPSULE_BAR_W + VOICE_CAPSULE_GAP);
    const y = midY - h / 2;

    // Reference material: solid milk-white capsules with a tight soft glow.
    // Keep geometry and frequency/RMS timing unchanged; no glass stripes/rim.
    ctx.save();
    ctx.shadowColor = 'rgba(255, 255, 255, 0.216)';
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    drawVoiceCapsuleBar(x, y, VOICE_CAPSULE_BAR_W, h);
    ctx.fillStyle = 'rgb(255, 254, 250)';
    ctx.fill();
    ctx.restore();
  }
}

function voiceCapsuleBandLevel(loHz, hiHz) {
  if (!audioCtx || !voiceCapsuleAnalyser || !voiceCapsuleFreqData) return 0;
  const nyquist = audioCtx.sampleRate / 2;
  const binHz = nyquist / voiceCapsuleAnalyser.frequencyBinCount;
  const lo = Math.max(0, Math.floor(loHz / binHz));
  const hi = Math.min(voiceCapsuleAnalyser.frequencyBinCount - 1, Math.ceil(hiHz / binHz));
  let sum = 0;
  for (let b = lo; b <= hi; b += 1) sum += voiceCapsuleFreqData[b];
  let v = (sum / (hi - lo + 1)) / 255;
  const center = (loHz + hiHz) / 2;
  if (center < VOICE_CAPSULE_LOW_SHELF_HZ) {
    const t = center / VOICE_CAPSULE_LOW_SHELF_HZ;
    v *= VOICE_CAPSULE_LOW_SHELF_GAIN + (1 - VOICE_CAPSULE_LOW_SHELF_GAIN) * t;
  }
  if (v < VOICE_CAPSULE_NOISE_GATE) v = 0;
  return Math.pow(v, VOICE_CAPSULE_CURVE);
}

function refreshVoiceCapsuleTargets(now, active, previewLevel = 0) {
  if (now - voiceCapsuleLastUpdate < VOICE_CAPSULE_UPDATE_MS) return;
  voiceCapsuleLastUpdate = now;

  if (!active) {
    voiceCapsuleTargets.fill(0);
    return;
  }

  if (voicePreviewMode && (!voiceCapsuleAnalyser || audio.paused || audio.ended)) {
    const phase = now / 1000;
    const base = clamp(previewLevel, 0.18, 0.92);
    for (let i = 0; i < VOICE_CAPSULE_BAR_COUNT; i += 1) {
      const tilt = 0.60 + 0.55 * (i / (VOICE_CAPSULE_BAR_COUNT - 1));
      const ripple = 0.74 + Math.sin(phase * 4.3 + i * 0.92) * 0.16 + Math.sin(phase * 8.1 - i * 0.51) * 0.1;
      voiceCapsuleTargets[i] = clamp(base * ripple * tilt * 1.12, 0, 0.95);
    }
    return;
  }

  if (!voiceCapsuleAnalyser || !voiceCapsuleFreqData) {
    voiceCapsuleTargets.fill(0);
    return;
  }

  voiceCapsuleAnalyser.getByteFrequencyData(voiceCapsuleFreqData);
  for (let i = 0; i < VOICE_CAPSULE_BAR_COUNT; i += 1) {
    const [lo, hi] = voiceCapsuleBandRanges[i];
    const tilt = 0.60 + 0.55 * (i / (VOICE_CAPSULE_BAR_COUNT - 1));
    voiceCapsuleTargets[i] = Math.min(1, voiceCapsuleBandLevel(lo, hi) * tilt * 1.26);
  }
}

function updateVoiceCapsuleVisualizer(level, forceActive = false) {
  if (!voiceVisualizer || !voiceCapsuleCtx) return;
  setupVoiceCapsuleCanvas();
  const active = forceActive || voicePreviewMode || (!audio.paused && !audio.ended);
  voiceVisualizer.classList.toggle('is-active', active);

  const now = performance.now();
  const dt = voiceCapsulePrevNow ? Math.min(48, now - voiceCapsulePrevNow) : 16.7;
  voiceCapsulePrevNow = now;
  refreshVoiceCapsuleTargets(now, active, clamp(level, 0, 1));

  for (let i = 0; i < VOICE_CAPSULE_BAR_COUNT; i += 1) {
    const target = voiceCapsuleTargets[i];
    const current = voiceCapsuleLevels[i];
    const tau = target > current ? VOICE_CAPSULE_ATTACK_TAU : VOICE_CAPSULE_RELEASE_TAU;
    const k = 1 - Math.exp(-dt / tau);
    voiceCapsuleLevels[i] = current + (target - current) * k;
  }
  drawVoiceCapsule();
}

function updateVoiceRing(level) {
  const visual = clamp(level, 0, 1);
  const active = voicePreviewMode || (visual > VOICE_RING_SPEAK_THRESHOLD && !audio.paused && !audio.ended);
  const displayLevel = active ? visual : 0;
  const energy = Math.pow(displayLevel, 0.72);
  const now = performance.now() / 1000;
  avatar.classList.toggle('is-speaking', active);
  avatar.style.setProperty('--voice-level', displayLevel.toFixed(3));
  avatar.style.setProperty('--voice-ring-opacity', active ? (0.18 + energy * 0.68).toFixed(3) : '0');

  if (voiceRingWave && voiceRingWash) {
    const wavePath = buildVoiceWavePath(energy, now * (1.2 + energy * 0.76));
    voiceRingWave.setAttribute('d', wavePath);
    voiceRingWash.setAttribute('d', wavePath);
  }
}

function tickVoicePreview() {
  const now = performance.now() / 1000;
  const previewLevel = clamp(
    0.56 +
      Math.sin(now * 1.9) * 0.16 +
      Math.sin(now * 4.7 + 0.8) * 0.11 +
      Math.sin(now * 8.5 + 1.6) * 0.06,
    0.36,
    0.92,
  );
  updateVoiceRing(previewLevel);
  updateVoiceCapsuleVisualizer(previewLevel, true);
  voicePreviewRaf = requestAnimationFrame(tickVoicePreview);
}

function updateVolumeButton() {
  if (!volumeControl || !volumeBtn || !volumeText) return;
  const effectiveVolume = audio.muted ? 0 : audio.volume;
  const level = clamp(effectiveVolume, 0, 1);
  const pct = Math.round(level * 100);

  volumeText.textContent = `${pct}%`;
  volumeControl.style.setProperty('--volume-level', level.toFixed(3));
  volumeControl.classList.toggle('is-muted', pct === 0);
  volumeControl.classList.toggle('is-low', pct > 0 && pct <= 40);
  volumeBtn.setAttribute('aria-label', `${volumeControl.classList.contains('is-expanded') ? '关闭' : '打开'}音量控制，当前音量 ${pct}%`);
  volumeBtn.title = `${pct}% · 点击${volumeControl.classList.contains('is-expanded') ? '收起' : '打开'}音量控制`;

  if (volumeSlider) {
    volumeSlider.value = String(pct);
    volumeSlider.setAttribute('aria-valuetext', `${pct}%`);
  }
}

function setVolumeExpanded(expanded, { focusSlider = false } = {}) {
  if (!volumeControl || !volumeBtn) return;
  volumeControl.classList.toggle('is-expanded', expanded);
  volumeBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  volumePanel?.setAttribute('aria-hidden', expanded ? 'false' : 'true');

  if (volumeSlider) {
    volumeSlider.tabIndex = expanded ? 0 : -1;
    if (expanded && focusSlider) volumeSlider.focus({ preventScroll: true });
  }

  updateVolumeButton();
}

function toggleVolumeExpanded({ focusSlider = false } = {}) {
  setVolumeExpanded(!volumeControl?.classList.contains('is-expanded'), { focusSlider });
}

function isModifiedActivation(event) {
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

function setControlPanelCollapsed(collapsed) {
  if (!stage || !controlCard || !panelToggleBtn) return;
  const nextState = Boolean(collapsed);
  if (isControlPanelCollapsed === nextState) return;

  const focusWasInsidePanel = document.activeElement instanceof Node && controlCard.contains(document.activeElement);
  isControlPanelCollapsed = nextState;
  stage.classList.toggle('is-control-panel-collapsed', nextState);
  scheduleNightMoonLayerLayoutSync();
  window.setTimeout(scheduleNightMoonLayerLayoutSync, 450);
  if (nextState) controlCard.setAttribute('aria-hidden', 'true');
  else controlCard.removeAttribute('aria-hidden');
  if ('inert' in controlCard) controlCard.inert = nextState;
  collapsePanelBtn?.setAttribute('aria-expanded', nextState ? 'false' : 'true');

  panelToggleBtn.disabled = false;
  panelToggleBtn.removeAttribute('aria-hidden');
  panelToggleBtn.setAttribute('aria-expanded', nextState ? 'false' : 'true');
  panelToggleBtn.classList.toggle('is-active', !nextState);
  const panelToggleLabel = nextState ? '展开语音控制面板' : '收起语音控制面板';
  panelToggleBtn.setAttribute('aria-label', panelToggleLabel);
  panelToggleBtn.dataset.tooltip = panelToggleLabel;

  if (nextState) {
    setVolumeExpanded(false);
    if (focusWasInsidePanel) {
      window.requestAnimationFrame(() => panelToggleBtn.focus({ preventScroll: true }));
    }
  } else if (focusWasInsidePanel) {
    collapsePanelBtn?.focus({ preventScroll: true });
  }
}

function setVolumeFromSlider() {
  if (!volumeSlider) return;
  const level = clamp(Number(volumeSlider.value) / 100, 0, 1);
  audio.volume = level;
  audio.muted = level === 0;
  updateVolumeButton();
}

function axisBoundaryBetween(lowerIndex) {
  return ((lowerIndex + 0.5) / 2) - 1;
}

function axisToDirectionIndex(value, previousIndex = null) {
  const rawIndex = clamp(Math.round((value + 1) * 2), 0, DIRECTION_INDEX_MAX);
  if (previousIndex === null || rawIndex === previousIndex) return rawIndex;

  if (rawIndex > previousIndex) {
    const boundary = axisBoundaryBetween(previousIndex);
    return value > boundary + DIRECTION_HYSTERESIS ? rawIndex : previousIndex;
  }

  const boundary = axisBoundaryBetween(previousIndex - 1);
  return value < boundary - DIRECTION_HYSTERESIS ? rawIndex : previousIndex;
}

function directionSetConfig(setId = requestedDirectionSet) {
  return DIRECTION_SETS[setId] || DIRECTION_SETS[DEFAULT_DIRECTION_SET];
}

function directionFrameUrl(col, row, setId = requestedDirectionSet) {
  return `${directionSetConfig(setId).base}/c${col}_r${row}.png`;
}

function specialVisualStateConfig(stateId) {
  return SPECIAL_VISUAL_STATES[stateId] || null;
}

function displayedSpecialVisualState() {
  return activeSpecialVisualState || frozenCycleSpecialVisualState;
}

function isFrozenC2R2ReturnFadeEligible() {
  return Boolean(
    isAvatarFrozen
    && !document.hidden
    && requestedDirectionSet === DEFAULT_DIRECTION_SET
    && currentDirectionSet === DEFAULT_DIRECTION_SET
    && requestedDirectionSlot === FROZEN_BLINK_SLOT
    && currentDirectionSlot === FROZEN_BLINK_SLOT
  );
}

function clearFrozenC2R2ReturnFade() {
  frozenC2R2ReturnFadeCleanup?.();
}

function playFrozenC2R2ReturnFade() {
  clearFrozenC2R2ReturnFade();
  if (!isFrozenC2R2ReturnFadeEligible()) return;

  const frame = avatarFrames[activeFrameIndex];
  if (!frame?.classList.contains('is-active')) return;

  let fallbackTimer = 0;
  const cleanup = () => {
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    frame.removeEventListener('animationend', handleFinish);
    frame.removeEventListener('animationcancel', handleFinish);
    frame.classList.remove('special-visual-return-fade-in');
    if (frozenC2R2ReturnFadeCleanup === cleanup) frozenC2R2ReturnFadeCleanup = null;
  };
  const handleFinish = (event) => {
    if (event.target !== frame || event.animationName !== 'special-visual-fade-in') return;
    cleanup();
  };

  frame.addEventListener('animationend', handleFinish);
  frame.addEventListener('animationcancel', handleFinish);
  frozenC2R2ReturnFadeCleanup = cleanup;
  void frame.offsetWidth;
  frame.classList.add('special-visual-return-fade-in');
  fallbackTimer = window.setTimeout(cleanup, 300);
}

function syncSpecialVisualState() {
  const displayedState = displayedSpecialVisualState();
  const config = specialVisualStateConfig(displayedState);
  const visible = Boolean(
    avatarSpecialFrame
    && config
    && swayMode === 'off'
    && config.allowedDirectionSets.includes(requestedDirectionSet)
  );

  if (config && avatarSpecialFrame && avatarSpecialFrame.getAttribute('src') !== config.src) {
    avatarSpecialFrame.setAttribute('src', config.src);
  }
  if (avatarSpecialFrame) {
    const calibration = config?.calibration;
    avatarSpecialFrame.style.setProperty('--frame-scale', calibration ? String(calibration.scale) : '1');
    avatarSpecialFrame.style.setProperty('--frame-x', calibration?.x || '0%');
    avatarSpecialFrame.style.setProperty('--frame-y', calibration?.y || '0%');
  }
  avatar.classList.toggle('special-visual-active', visible);
  avatar.classList.toggle(
    'frozen-cycle-special-active',
    visible && !activeSpecialVisualState && displayedState === frozenCycleSpecialVisualState,
  );
  avatarSpecialFrame?.classList.toggle('is-active', visible);
  avatarSpecialFrame?.setAttribute('aria-hidden', visible ? 'false' : 'true');

  if (displayedState) avatar.dataset.visualState = displayedState;
  else delete avatar.dataset.visualState;
  avatar.dataset.visualStateVisible = visible ? 'true' : 'false';
  syncFrozenBlink();
}

function activateSpecialVisualState(stateId) {
  clearFrozenC2R2ReturnFade();
  activeSpecialVisualState = specialVisualStateConfig(stateId) ? stateId : '';
  syncSpecialVisualState();
}

function clearSpecialVisualState() {
  const shouldFadeFrozenReturn = avatar.classList.contains('special-visual-active');
  activeSpecialVisualState = '';
  syncSpecialVisualState();
  if (shouldFadeFrozenReturn && !avatar.classList.contains('special-visual-active')) {
    playFrozenC2R2ReturnFade();
  }
}

function directionCacheKey(setId, slot) {
  return `${setId}:${slot}`;
}

function directionFrameCalibration(slot, setId = requestedDirectionSet) {
  return DIRECTION_FRAME_CALIBRATION[setId]?.[slot] || null;
}

function applyDirectionFrameCalibration(frame, slot, setId = requestedDirectionSet) {
  if (!frame) return;
  const calibration = directionFrameCalibration(slot, setId);
  frame.dataset.directionSet = setId;
  frame.dataset.directionSlot = slot;
  frame.style.setProperty('--frame-scale', String(calibration?.scale ?? 1));
  frame.style.setProperty('--frame-x', calibration?.x || '0%');
  frame.style.setProperty('--frame-y', calibration?.y || '0%');
  frame.style.setProperty('--frame-clip-bottom', calibration?.clipBottom || '0%');
}

function warmDirectionFrame(slot, url, setId = requestedDirectionSet) {
  const key = directionCacheKey(setId, slot);
  if (directionFrameCache.has(key)) return directionFrameCache.get(key);

  const img = new Image();
  img.decoding = 'async';
  img.src = url;

  const ready = img.decode
    ? img.decode().catch(() => undefined)
    : new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

  const entry = { setId, url, ready };
  directionFrameCache.set(key, entry);
  return entry;
}

async function swapAvatarFrame(slot, url, token, col, row, setId = requestedDirectionSet) {
  const entry = warmDirectionFrame(slot, url, setId);
  await entry.ready;
  if (
    token !== directionSwapToken ||
    requestedDirectionSlot !== slot ||
    requestedDirectionSet !== setId ||
    (currentDirectionSlot === slot && currentDirectionSet === setId)
  ) return;

  const nextIndex = activeFrameIndex === 0 ? 1 : 0;
  const activeFrame = avatarFrames[activeFrameIndex];
  const nextFrame = avatarFrames[nextIndex];
  if (!nextFrame || !activeFrame) return;

  if (nextFrame.getAttribute('src') !== url) nextFrame.src = url;
  try {
    if (nextFrame.decode) await nextFrame.decode();
  } catch {
    if (token === directionSwapToken && requestedDirectionSlot === slot && requestedDirectionSet === setId) {
      // Keep the visible frame, but allow the same requested direction to retry.
      nextFrame.removeAttribute('src');
      directionFrameCache.delete(directionCacheKey(setId, slot));
      requestedDirectionSlot = '';
    }
    return;
  }
  if (token !== directionSwapToken || requestedDirectionSlot !== slot || requestedDirectionSet !== setId) return;

  applyDirectionFrameCalibration(nextFrame, slot, setId);
  nextFrame.classList.add('is-active');
  activeFrame.classList.remove('is-active');
  nextFrame.setAttribute('aria-hidden', 'false');
  activeFrame.setAttribute('aria-hidden', 'true');
  activeFrameIndex = nextIndex;
  currentDirectionSet = setId;
  currentDirectionSlot = slot;
  requestedDirectionCol = col;
  requestedDirectionRow = row;
  avatar.setAttribute('data-direction-set', setId);
  avatar.setAttribute('data-direction-slot', slot);
  avatar.setAttribute('aria-label', `阿绿方向帧头像：${slot} · ${directionSetConfig(setId).label}`);
  syncFrozenBlink();
}

function setAvatarLook(x, y) {
  const lookX = clamp(x, -1, 1);
  const lookY = clamp(y, -1, 1);
  const col = axisToDirectionIndex(lookX, requestedDirectionCol);
  const row = axisToDirectionIndex(lookY, requestedDirectionRow);
  const slot = `c${col}_r${row}`;
  const setId = requestedDirectionSet;

  avatar.style.setProperty('--look-x', lookX.toFixed(3));
  avatar.style.setProperty('--look-y', lookY.toFixed(3));

  // Do not fetch/swap hidden PNG direction frames while a front-facing SVG is shown.
  if (swayMode !== 'off') return;
  if (slot === requestedDirectionSlot && currentDirectionSet === setId) return;
  requestedDirectionSlot = slot;
  requestedDirectionCol = col;
  requestedDirectionRow = row;
  const token = ++directionSwapToken;
  swapAvatarFrame(slot, directionFrameUrl(col, row, setId), token, col, row, setId);
}

function tickSmoothedLook() {
  lookRafId = 0;
  renderedLookX += (targetLookX - renderedLookX) * LOOK_SMOOTHING;
  renderedLookY += (targetLookY - renderedLookY) * LOOK_SMOOTHING;

  const dx = Math.abs(targetLookX - renderedLookX);
  const dy = Math.abs(targetLookY - renderedLookY);
  if (dx < LOOK_SETTLE_EPSILON) renderedLookX = targetLookX;
  if (dy < LOOK_SETTLE_EPSILON) renderedLookY = targetLookY;

  setAvatarLook(renderedLookX, renderedLookY);

  if (renderedLookX !== targetLookX || renderedLookY !== targetLookY) {
    lookRafId = window.requestAnimationFrame(tickSmoothedLook);
  }
}

function requestAvatarLook(x, y) {
  if (isAvatarFrozen) return;
  targetLookX = clamp(x, -1, 1);
  targetLookY = clamp(y, -1, 1);
  if (!lookRafId) lookRafId = window.requestAnimationFrame(tickSmoothedLook);
}

function preloadDirectionFrames(setId = requestedDirectionSet) {
  // Keep exact artwork and on-demand swaps; do not flood startup with 25 decodes.
  const slots = [];
  for (let row = 0; row <= DIRECTION_INDEX_MAX; row += 1) {
    for (let col = 0; col <= DIRECTION_INDEX_MAX; col += 1) {
      slots.push({ col, row, distance: Math.abs(col - requestedDirectionCol) + Math.abs(row - requestedDirectionRow) });
    }
  }
  slots.sort((a, b) => a.distance - b.distance);
  const idle = () => new Promise(resolve => {
    if (window.requestIdleCallback) window.requestIdleCallback(resolve, { timeout: 1000 });
    else window.setTimeout(resolve, 80);
  });
  const warmNext = async () => {
    while (slots.length && requestedDirectionSet === setId) {
      await idle();
      if (document.hidden || requestedDirectionSet !== setId) return;
      const next = slots.shift();
      if (!next) return;
      await warmDirectionFrame(`c${next.col}_r${next.row}`, directionFrameUrl(next.col, next.row, setId), setId).ready;
    }
  };
  // Two independent workers; a slow prefetch never blocks a requested direction.
  void warmNext();
  void warmNext();
}

function createFloatingHeart(x, y, index) {
  if (!heartBurstLayer) return;

  const heart = document.createElement('span');
  const track = randomBetween(-34, 34);
  const drift = randomBetween(-16, 16);
  const rise = randomBetween(105, 170);
  const duration = randomBetween(1430, 1855);
  const delay = index * randomBetween(70, 115) + randomBetween(0, 28);
  const scale = randomBetween(0.88, 1.12);
  const size = randomBetween(24, 34);
  const rotate = randomBetween(-12, 12);
  const spin = randomBetween(-10, 10);

  heart.className = 'heart-pop';
  heart.textContent = HEART_GLYPHS[Math.floor(Math.random() * HEART_GLYPHS.length)];
  heart.style.setProperty('--heart-x', `${x + randomBetween(-14, 14)}px`);
  heart.style.setProperty('--heart-y', `${y + randomBetween(-10, 8)}px`);
  heart.style.setProperty('--heart-track', `${track.toFixed(1)}px`);
  heart.style.setProperty('--heart-drift', `${drift.toFixed(1)}px`);
  heart.style.setProperty('--heart-rise', `${rise.toFixed(1)}px`);
  heart.style.setProperty('--heart-duration', `${duration.toFixed(0)}ms`);
  heart.style.setProperty('--heart-delay', `${delay.toFixed(0)}ms`);
  heart.style.setProperty('--heart-scale', scale.toFixed(2));
  heart.style.setProperty('--heart-scale-final', (scale * 1.02).toFixed(2));
  heart.style.setProperty('--heart-size', `${size.toFixed(1)}px`);
  heart.style.setProperty('--heart-rotate', `${rotate.toFixed(1)}deg`);
  heart.style.setProperty('--heart-spin', `${spin.toFixed(1)}deg`);
  heart.style.setProperty('--heart-rotate-final', `${(rotate + spin).toFixed(1)}deg`);
  heart.addEventListener('animationend', () => heart.remove(), { once: true });

  heartBurstLayer.appendChild(heart);
}

function spawnHeartBurst(event) {
  if (!stage || !heartBurstLayer) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  if (event.target instanceof Node && controlCard?.contains(event.target)) return;
  if (event.target instanceof Element && event.target.closest(HEART_INTERACTIVE_SELECTOR)) return;

  const x = clamp(event.clientX, 0, window.innerWidth);
  const y = clamp(event.clientY, 0, window.innerHeight);

  for (let i = 0; i < HEARTS_PER_CLICK; i += 1) {
    createFloatingHeart(x, y, i);
  }
}

function showError(message, owner = 'general') {
  activeErrorOwner = owner;
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function clearError(owner = null) {
  if (owner && activeErrorOwner !== owner) return;
  activeErrorOwner = null;
  errorBox.hidden = true;
  errorBox.textContent = '';
}

function setBridgeState(label, offline = false) {
  bridgeStatus.textContent = label;
  bridgeStatus.classList.toggle('is-offline', offline);
  statusDot?.classList.toggle('is-offline', offline);
}

function markLiveAudioUnlocked() {
  liveAudioUnlocked = true;
  unlockBtn.textContent = speechQueue.length ? '播放队列中' : '语音播放已就绪';
  unlockBtn.classList.add('is-unlocked');
  unlockBtn.disabled = false;
}

function markLiveAudioLocked(label = '启动直播播放') {
  liveAudioUnlocked = false;
  unlockBtn.textContent = label;
  unlockBtn.classList.remove('is-unlocked');
  unlockBtn.disabled = false;
}

async function unlockLiveAudio({ playQueued = true } = {}) {
  clearError('audio');
  unlockBtn.disabled = true;
  unlockBtn.textContent = '解锁中…';
  try {
    ensureAudioGraph();
    await audioCtx.resume();

    // Browsers often block media playback triggered by SSE/WebSocket events
    // until the page has received a real user gesture. A muted play/pause on
    // the current audio element makes that unlock explicit without making noise.
    const wasMuted = audio.muted;
    const wasPaused = audio.paused;
    const previousTime = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    audio.muted = true;
    try {
      await audio.play();
      audio.pause();
      if (Number.isFinite(previousTime)) audio.currentTime = previousTime;
    } finally {
      audio.muted = wasMuted;
      if (!wasPaused) await audio.play().catch(() => {});
    }

    markLiveAudioUnlocked();
    generationStatus.textContent = '直播播放已启动：之后收到 Midori 事件会自动播放';
    statusText.textContent = 'Live audio armed';

    if (playQueued) {
      playNextQueuedSpeech();
    }
  } catch (err) {
    markLiveAudioLocked('再次解锁音频');
    showError(`音频解锁失败：${friendlyError(err.message)}`, 'audio');
  } finally {
    if (!liveAudioUnlocked) unlockBtn.disabled = false;
  }
}

function setMouth(state) {
  mouth.classList.remove('mouth-closed', 'mouth-half', 'mouth-open');
  if (state === 2) {
    mouth.classList.add('mouth-open');
  } else if (state === 1) {
    mouth.classList.add('mouth-half');
  } else {
    mouth.classList.add('mouth-closed');
  }
}

function ensureAudioGraph() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    data = new Float32Array(analyser.fftSize);

    voiceCapsuleAnalyser = audioCtx.createAnalyser();
    voiceCapsuleAnalyser.fftSize = 2048;
    voiceCapsuleAnalyser.smoothingTimeConstant = 0.65;
  }
  if (!voiceCapsuleFreqData || voiceCapsuleFreqData.length !== voiceCapsuleAnalyser.frequencyBinCount) {
    voiceCapsuleFreqData = new Uint8Array(voiceCapsuleAnalyser.frequencyBinCount);
  }
  if (!sourceNode) {
    sourceNode = audioCtx.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    sourceNode.connect(voiceCapsuleAnalyser);
    analyser.connect(audioCtx.destination);
  }
}

function audioLevel() {
  if (!analyser) return 0;
  analyser.getFloatTimeDomainData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) sum += data[i] * data[i];
  return Math.sqrt(sum / data.length);
}

function tick() {
  const raw = audioLevel() * 3.2;
  if (raw > env) env += (raw - env) * 0.58;
  else env += (raw - env) * 0.16;

  const visual = clamp(env / 0.34, 0, 1);
  meterFill.style.width = `${Math.round(visual * 100)}%`;
  updateVoiceRing(visual);
  updateVoiceCapsuleVisualizer(visual);

  const state = env > 0.18 ? 2 : env > 0.065 ? 1 : 0;
  setMouth(state);
  raf = requestAnimationFrame(tick);
}

async function playAudio(label = 'Playing local audio', { restart = false } = {}) {
  const generation = speechPlaybackGeneration;
  ensureAudioGraph();
  await audioCtx.resume();
  if (generation !== speechPlaybackGeneration) return;
  if (restart || audio.ended) audio.currentTime = 0;
  visualActivationArmed = true;
  try {
    await audio.play();
    if (generation !== speechPlaybackGeneration) return;
  } catch (err) {
    visualActivationArmed = false;
    throw err;
  }
  if (visualActivationArmed) {
    visualActivationArmed = false;
    activateSpecialVisualState(currentPlaybackMeta?.visualState);
  }
  markLiveAudioUnlocked();
  clearError('audio');
  statusText.textContent = label;
  pauseBtn.textContent = '暂停';
  pauseBtn.setAttribute('aria-pressed', 'false');
  cancelAnimationFrame(raf);
  tick();
}

function pauseAudio(label = 'Paused') {
  audio.pause();
  statusText.textContent = label;
  pauseBtn.textContent = '继续播放';
  pauseBtn.setAttribute('aria-pressed', 'true');
}

function resetMouthMeter() {
  env = 0;
  meterFill.style.width = '0%';
  updateVoiceRing(0);
  updateVoiceCapsuleVisualizer(0, false);
  setMouth(0);
}

function withCacheBust(url) {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}t=${Date.now()}`;
}

async function loadAndPlayAudio(audioUrl, meta = {}, { addToRecent = true, label = 'Playing Agent audio' } = {}) {
  currentPlaybackMeta = normalizeRecentItem({ ...meta, audioUrl });
  visualActivationArmed = false;
  clearSpecialVisualState();
  const oldUrl = audio.dataset.objectUrl;
  if (oldUrl) {
    URL.revokeObjectURL(oldUrl);
    delete audio.dataset.objectUrl;
  }
  audio.src = withCacheBust(audioUrl);
  audioPath.textContent = audioUrl;
  audio.load();
  if (addToRecent) addRecentItem({ ...meta, audioUrl });
  await playAudio(label);
}

function friendlyError(message) {
  if (!message) return '未知错误。';
  if (message.includes('Failed to fetch')) {
    return `请求头像本地服务失败：请确认 ${location.origin}/ 仍在运行，并查看使用与接入说明。`;
  }
  if (message.includes('NotAllowedError') || message.includes('play()')) {
    return '浏览器阻止了自动播放。请先点一次“启动直播播放”或“播放待播音频”。';
  }
  return message;
}

function loadRecentItems() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.slice(0, RECENT_LIMIT) : [];
  } catch {
    return [];
  }
}

function saveRecentItems() {
  try {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentItems.slice(0, RECENT_LIMIT)));
  } catch {
    // History is best-effort; unavailable storage must not block playback.
  }
}

function normalizeRecentItem(item) {
  if (!item) return null;
  const stable = {
    eventId: item.eventId || item.event_id || `recent_${Date.now()}`,
    source: item.source || 'manual',
    text: item.text || '(无文本)',
    audioUrl: item.audioUrl || item.audio_url,
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
    duration: item.duration,
    emotion: item.emotion,
    visualState: item.visualState || item.visual_state || '',
  };
  return stable.audioUrl ? stable : null;
}

function addRecentItem(item) {
  const stable = normalizeRecentItem(item);
  if (!stable) return;
  recentItems = [stable, ...recentItems.filter((x) => x.audioUrl !== stable.audioUrl && x.eventId !== stable.eventId)].slice(0, RECENT_LIMIT);
  saveRecentItems();
  renderRecentItems();
}

function renderRecentItems() {
  recentList.replaceChildren();
  if (!recentItems.length) {
    const empty = document.createElement('li');
    empty.className = 'recent-empty';
    empty.textContent = '还没有事件音频。收到 Agent 提供的音频后会出现在这里。';
    recentList.append(empty);
    return;
  }

  for (const item of recentItems) {
    const li = document.createElement('li');
    li.className = 'recent-item';

    const text = document.createElement('div');
    text.className = 'recent-text';
    text.textContent = item.text;
    text.title = item.text;

    const meta = document.createElement('div');
    meta.className = 'recent-meta';
    const when = new Date(item.createdAt);
    const time = Number.isNaN(when.getTime()) ? '刚刚' : when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const parts = [item.source === 'hermes-midori-profile' ? 'Hermes/Midori' : item.source, time];
    if (item.duration) parts.push(`${item.duration}s`);
    if (item.emotion) parts.push(item.emotion);
    meta.textContent = parts.filter(Boolean).join(' · ');

    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'recent-play';
    play.setAttribute('aria-label', '播放这条语音');
    play.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 9.25v5.5h3.15L12.4 19V5L7.15 9.25H4Z" />
        <path d="M15.25 8.4a4.8 4.8 0 0 1 0 7.2" />
        <path d="M17.85 5.8a8.45 8.45 0 0 1 0 12.4" />
      </svg>
    `;
    play.addEventListener('click', () => {
      loadAndPlayAudio(item.audioUrl, item, { addToRecent: false, label: 'Replaying recent audio' })
        .catch((err) => showError(friendlyError(err.message), 'audio'));
    });

    const bubble = document.createElement('div');
    bubble.className = 'recent-bubble';
    bubble.append(text, meta);
    li.append(play, bubble);
    recentList.append(li);
  }
}

function queuedSpeechLabel() {
  return speechQueue.length ? `后面还有 ${speechQueue.length} 条待播。` : '队列已清空。';
}

function queueSpeechItem(item) {
  const stable = normalizeRecentItem(item);
  if (!stable) return;
  speechQueue.push(stable);

  if (!liveAudioUnlocked) {
    markLiveAudioLocked('播放待播音频');
    generationStatus.textContent = `已收到 ${speechQueue.length} 条 Midori 语音；请点“播放待播音频”后按顺序播放。`;
    statusText.textContent = 'Event queued';
    showError('网页已经收到阿绿音频，但浏览器阻止了未授权自动播放。点一次“播放待播音频”后，本页会按生成顺序播放队列。', 'audio');
    return;
  }

  generationStatus.textContent = currentSpeechItem
    ? `已加入播放队列，当前语音读完后继续。${queuedSpeechLabel()}`
    : '收到 Agent 事件，准备播放头像音频。';
  playNextQueuedSpeech();
}

async function playNextQueuedSpeech() {
  if (speechQueueStarting || currentSpeechItem || !liveAudioUnlocked || !speechQueue.length) return;

  speechQueueStarting = true;
  const generation = speechPlaybackGeneration;
  const item = speechQueue.shift();
  currentSpeechItem = item;
  addRecentItem(item);
  markLiveAudioUnlocked();
  generationStatus.textContent = `正在播放当前 Midori 语音。${queuedSpeechLabel()}`;

  try {
    await loadAndPlayAudio(item.audioUrl, item, { addToRecent: false, label: 'Playing Agent audio' });
  } catch (err) {
    if (generation !== speechPlaybackGeneration) return;
    const rawMessage = err?.message || String(err);
    const autoplayBlocked = err?.name === 'NotAllowedError' || rawMessage.includes('NotAllowedError') || rawMessage.includes('play()');
    const msg = friendlyError(autoplayBlocked ? 'NotAllowedError' : rawMessage);
    currentSpeechItem = null;

    if (autoplayBlocked) {
      speechQueue.unshift(item);
      markLiveAudioLocked('播放待播音频');
      generationStatus.textContent = `播放队列已暂停：还有 ${speechQueue.length} 条待播，请点“播放待播音频”。`;
      statusText.textContent = 'Event queued';
      showError(`${msg}\n队列已保留，解锁后会从这条继续。`, 'audio');
    } else {
      statusText.textContent = 'Queued audio failed';
      showError(`${msg}\n这条语音未能播放，正在尝试队列下一条。`, 'audio');
    }
  } finally {
    if (generation === speechPlaybackGeneration) speechQueueStarting = false;
  }

  if (generation === speechPlaybackGeneration && !currentSpeechItem && liveAudioUnlocked && speechQueue.length) {
    window.setTimeout(playNextQueuedSpeech, 0);
  }
}

function rememberMidoriEventId(eventId) {
  if (!eventId) return true;
  if (seenEventIds.has(eventId)) return false;
  seenEventIds.add(eventId);
  while (seenEventIds.size > SEEN_EVENT_IDS_LIMIT) seenEventIds.delete(seenEventIds.values().next().value);
  return true;
}

function showMidoriVoiceWarning(payload) {
  const message = `语音交付异常：${payload.message || payload.error || '语音未能生成或交付，文字回复不受影响。'}`;
  showError(message, 'voice');
  if (generationStatus) generationStatus.textContent = message;
}

function scheduleEventBridgeRetry() {
  if (eventBridgeRetryTimer) return;
  const delay = Math.min(EVENT_BRIDGE_RETRY_MAX_MS, 1000 * (2 ** Math.min(eventBridgeRetryAttempt, 5)));
  eventBridgeRetryAttempt = Math.min(eventBridgeRetryAttempt + 1, 6);
  setBridgeState(`Bridge offline · retry in ${delay / 1000}s`, true);
  eventBridgeRetryTimer = window.setTimeout(() => {
    eventBridgeRetryTimer = 0;
    connectEventBridge();
  }, delay);
}

function connectEventBridge() {
  if (!window.EventSource) {
    setBridgeState('Bridge unsupported', true);
    return;
  }
  if (eventBridgeRetryTimer) return;
  if (eventBridge && eventBridge.readyState !== EventSource.CLOSED) return;
  if (eventBridge) eventBridge.close();
  eventBridge = null;
  let events;
  try {
    // Memory only: a newly opened page must never replay historical audio.
    events = new EventSource(eventBridgeCursor ? `/events?last_event_id=${encodeURIComponent(eventBridgeCursor)}` : '/events');
  } catch {
    scheduleEventBridgeRetry();
    return;
  }
  eventBridge = events;
  const rememberCursor = (message) => {
    const cursor = String(message.lastEventId || '');
    if (cursor && cursor.length <= 256) eventBridgeCursor = cursor;
  };
  events.addEventListener('bridge', (message) => {
    if (eventBridge !== events) return;
    try {
      const payload = message.data ? JSON.parse(message.data) : {};
      if (payload.ok === false) {
        if (payload.type !== 'overflow') rememberCursor(message);
        setBridgeState('Bridge delivery warning', true);
        showError(payload.message || '语音交付存在缺段，正在恢复连接。', payload.type === 'overflow' ? 'bridge-overflow' : 'bridge-gap');
        return;
      }
      rememberCursor(message);
      eventBridgeRetryAttempt = 0;
      setBridgeState('Bridge online');
      clearError('bridge-connection');
      clearError('bridge-overflow');
    } catch (err) {
      showError(`事件桥数据解析失败：${err.message}`, 'bridge-connection');
    }
  });
  events.addEventListener('speech', (message) => {
    if (eventBridge !== events) return;
    try {
      const event = JSON.parse(message.data);
      if (!event.audio_url) return;
      const eventId = event.event_id || event.eventId || event.audio_url;
      if (rememberMidoriEventId(eventId)) void handleSpeechEvent(event);
      rememberCursor(message);
    } catch (err) {
      setBridgeState('Bridge parse error', true);
      showError(`事件桥数据解析失败：${err.message}`, 'bridge-connection');
    }
  });
  events.addEventListener('message', (message) => {
    if (eventBridge !== events) return;
    try {
      const payload = JSON.parse(message.data);
      if (typeof payload.text !== 'string' || !payload.text.trim()) return;
      if (rememberMidoriEventId(payload.event_id || message.lastEventId)) playMidoriReplyText(payload.text);
      rememberCursor(message);
    } catch (err) { showError(`消息数据解析失败：${err.message}`, 'bridge-connection'); }
  });
  events.addEventListener('stop', (message) => {
    if (eventBridge !== events) return;
    if (rememberMidoriEventId(message.lastEventId)) stopPublicPlayback();
    rememberCursor(message);
  });
  events.addEventListener('voice.error', (message) => {
    if (eventBridge !== events) return;
    try {
      const payload = JSON.parse(message.data);
      const id = message.lastEventId || payload.event_id;
      if (rememberMidoriEventId(id ? `voice.error:${id}` : '')) showMidoriVoiceWarning(payload);
      rememberCursor(message);
    }
    catch (err) { showError(`事件桥数据解析失败：${err.message}`, 'bridge-connection'); }
  });
  events.onerror = () => {
    if (eventBridge !== events) return;
    if (events.readyState !== EventSource.CLOSED) {
      setBridgeState('Bridge reconnecting…', true);
      return; // CONNECTING still belongs to the browser's native retry loop.
    }
    events.close();
    eventBridge = null;
    scheduleEventBridgeRetry();
  };
}

function loadLiveSelectOverlay() {
  if (!liveMode) return;
  const script = document.createElement('script');
  script.src = './live-select.js';
  script.async = true;
  script.onload = () => {
    generationStatus.textContent = 'Live Browser B1 已开启：Alt/Option + click 选区，会复制 JSON。';
  };
  script.onerror = () => {
    showError('Live Browser B1 脚本未加载：请确认 live-select.js 已复制到项目根目录。');
  };
  document.head.append(script);
}

async function handleSpeechEvent(event) {
  if (!event.audio_url) return;
  const meta = {
    eventId: event.event_id,
    source: event.source || 'event',
    text: event.text || '(Midori event)',
    audioUrl: event.audio_url,
    createdAt: event.created_at || new Date().toISOString(),
    emotion: event.emotion,
    visualState: event.visual_state || event.visualState || '',
  };
  queueSpeechItem(meta);
}

function stopPublicPlayback() {
  speechPlaybackGeneration += 1;
  speechQueue.length = 0;
  speechQueueStarting = false;
  currentSpeechItem = null;
  visualActivationArmed = false;
  audio.pause();
  audio.currentTime = 0;
  cancelAnimationFrame(raf);
  clearSpecialVisualState();
  resetMouthMeter();
  pauseBtn.textContent = '继续播放';
  pauseBtn.setAttribute('aria-pressed', 'true');
  generationStatus.textContent = '播放已停止，待播队列已清空。';
  statusText.textContent = 'Stopped';
}

document.querySelector('#stopBtn')?.addEventListener('click', async () => {
  stopPublicPlayback();
  try {
    const response = await publicFetch('/api/stop', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: crypto.randomUUID() }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (err) {
    showError(`本页已停止，但服务端停止确认失败（${err.message}）；未自动重试。`, 'stop');
  }
});

async function setupPublicSamples() {
  const select = document.querySelector('#sampleSelect');
  const play = document.querySelector('#samplePlayBtn');
  const status = document.querySelector('#sampleStatus');
  try {
    const response = await publicFetch('./audio/samples.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const catalog = await response.json();
    const samples = (Array.isArray(catalog.samples) ? catalog.samples : []).filter(item =>
      /^[a-z0-9-]+\.wav$/.test(item.file) && typeof item.label === 'string' && typeof item.id === 'string');
    if (!samples.length) throw new Error('样音清单为空');
    select.replaceChildren(...samples.map(item => new Option(item.label, item.id)));
    select.disabled = false;
    play.disabled = false;
    const current = () => samples.find(item => item.id === select.value);
    const describe = () => {
      const item = current();
      status.textContent = item.kind === 'synthetic-speech'
        ? `${item.label} · AI 合成语音，非本人录音；本地播放，不调用 TTS。`
        : '原创提示测试音；本地播放，不调用 TTS。';
    };
    select.addEventListener('change', describe);
    play.addEventListener('click', () => {
      const item = current();
      if (!item) return;
      stopPublicPlayback();
      clearError('audio');
      loadAndPlayAudio(`./audio/${item.file}`, {
        text: item.text || item.label, source: 'builtin-test', eventId: `sample:${item.id}`,
      }, { addToRecent: false, label: item.label }).catch(err => showError(friendlyError(err.message), 'audio'));
    });
    describe();
  } catch (err) {
    status.textContent = `样音清单加载失败：${err.message}`;
  }
}
void setupPublicSamples();

clearRecentBtn.addEventListener('click', () => {
  recentItems = [];
  saveRecentItems();
  renderRecentItems();
});

unlockBtn.addEventListener('click', () => {
  unlockLiveAudio().catch((err) => showError(friendlyError(err.message)));
});

playBtn.addEventListener('click', () => {
  playAudio('Replaying current audio from start', { restart: true }).catch((err) => {
    showError(friendlyError(err.message), 'audio');
    statusText.textContent = 'Playback failed';
  });
});

pauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    playAudio('Resumed playback').catch((err) => {
      showError(friendlyError(err.message), 'audio');
      statusText.textContent = 'Resume failed';
    });
  } else {
    pauseAudio('Paused');
  }
});

volumeBtn?.addEventListener('click', (event) => {
  toggleVolumeExpanded({ focusSlider: event.detail === 0 });
});

volumeSlider?.addEventListener('pointerdown', () => setVolumeExpanded(true));
volumeSlider?.addEventListener('input', setVolumeFromSlider);
volumeSlider?.addEventListener('change', setVolumeFromSlider);

collapsePanelBtn?.addEventListener('click', (event) => {
  if (isModifiedActivation(event)) return;
  setControlPanelCollapsed(true);
});

panelToggleBtn?.addEventListener('click', (event) => {
  if (isModifiedActivation(event)) return;
  setControlPanelCollapsed(!isControlPanelCollapsed);
});

document.addEventListener('pointerdown', (event) => {
  if (!volumeControl?.classList.contains('is-expanded')) return;
  if (event.target instanceof Node && volumeControl.contains(event.target)) return;
  setVolumeExpanded(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !volumeControl?.classList.contains('is-expanded')) return;
  setVolumeExpanded(false);
  volumeBtn?.focus({ preventScroll: true });
});

function handleAudioPlaybackError() {
  visualActivationArmed = false;
  clearSpecialVisualState();

  const failedSpeech = currentSpeechItem;
  currentSpeechItem = null;
  resetMouthMeter();
  if (!failedSpeech) return;

  pauseBtn.textContent = '继续播放';
  pauseBtn.setAttribute('aria-pressed', 'true');
  statusText.textContent = speechQueue.length ? 'Queued audio failed; playing next queued audio' : 'Queued audio failed';

  if (speechQueue.length && liveAudioUnlocked) {
    generationStatus.textContent = `当前语音播放失败，继续播放下一条。${queuedSpeechLabel()}`;
    if (!speechQueueStarting) window.setTimeout(playNextQueuedSpeech, 0);
  } else {
    generationStatus.textContent = '当前 Midori 语音播放失败，等待下一条事件。';
    markLiveAudioUnlocked();
  }
}

audio.addEventListener('volumechange', updateVolumeButton);

audio.addEventListener('playing', () => {
  if (!visualActivationArmed) return;
  visualActivationArmed = false;
  activateSpecialVisualState(currentPlaybackMeta?.visualState);
});

audio.addEventListener('error', handleAudioPlaybackError);

audio.addEventListener('ended', () => {
  visualActivationArmed = false;
  clearSpecialVisualState();
  const finishedSpeech = currentSpeechItem;
  currentSpeechItem = null;
  statusText.textContent = speechQueue.length ? 'Audio finished; playing next queued audio' : 'Audio finished';
  pauseBtn.textContent = '继续播放';
  pauseBtn.setAttribute('aria-pressed', 'true');
  resetMouthMeter();

  if (speechQueue.length && liveAudioUnlocked) {
    generationStatus.textContent = `当前语音已读完，继续播放下一条。${queuedSpeechLabel()}`;
    playNextQueuedSpeech();
  } else if (finishedSpeech) {
    generationStatus.textContent = '当前语音已读完，等待下一条 Midori 事件。';
    markLiveAudioUnlocked();
  }
});

window.addEventListener('pointermove', (event) => {
  const rect = avatar.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height * 0.48;
  const range = Math.max(180, rect.width * 0.72);
  const x = clamp((event.clientX - cx) / range, -1, 1);
  const y = clamp((event.clientY - cy) / range, -1, 1);
  requestAvatarLook(x, y);
});

stage?.addEventListener('pointerdown', spawnHeartBurst);

function isFrozenBlinkEligible() {
  return Boolean(
    avatarBlinkHalf
    && avatarBlinkClosed
    && swayMode === 'off'
    && isAvatarFrozen
    && !document.hidden
    && requestedDirectionSet === DEFAULT_DIRECTION_SET
    && currentDirectionSet === DEFAULT_DIRECTION_SET
    && requestedDirectionSlot === FROZEN_BLINK_SLOT
    && currentDirectionSlot === FROZEN_BLINK_SLOT
    && !displayedSpecialVisualState()
  );
}

function setFrozenBlinkState(nextState = 'open') {
  const requestedState = FROZEN_BLINK_FRAMES[nextState] ? nextState : 'open';
  const visibleState = requestedState !== 'open' && isFrozenBlinkEligible()
    ? requestedState
    : 'open';

  avatar.dataset.blinkState = visibleState;
  avatar.classList.toggle('blink-frame-active', visibleState !== 'open');
  Object.entries(FROZEN_BLINK_FRAMES).forEach(([state, frame]) => {
    const active = state === visibleState;
    frame?.classList.toggle('is-active', active);
    frame?.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
}

function clearFrozenBlinkTimers() {
  if (blinkScheduleTimer) {
    window.clearTimeout(blinkScheduleTimer);
    blinkScheduleTimer = 0;
  }
  blinkSequenceTimers.forEach((timer) => window.clearTimeout(timer));
  blinkSequenceTimers = [];
  blinkSequenceToken += 1;
}

function scheduleBlink() {
  if (blinkScheduleTimer) window.clearTimeout(blinkScheduleTimer);
  if (!isFrozenBlinkEligible()) {
    blinkScheduleTimer = 0;
    setFrozenBlinkState('open');
    return;
  }

  const wait = randomBetween(FROZEN_BLINK_WAIT_MIN_MS, FROZEN_BLINK_WAIT_MAX_MS);
  blinkScheduleTimer = window.setTimeout(() => {
    blinkScheduleTimer = 0;
    runFrozenBlinkSequence();
  }, wait);
}

function runFrozenBlinkSequence() {
  if (!isFrozenBlinkEligible()) {
    syncFrozenBlink();
    return;
  }

  blinkSequenceTimers.forEach((timer) => window.clearTimeout(timer));
  blinkSequenceTimers = [];
  const token = ++blinkSequenceToken;
  const steps = [
    { at: 0, state: 'half' },
    { at: FROZEN_BLINK_HALF_MS, state: 'closed' },
    { at: FROZEN_BLINK_HALF_MS + FROZEN_BLINK_CLOSED_MS, state: 'half' },
    { at: FROZEN_BLINK_HALF_MS + FROZEN_BLINK_CLOSED_MS + FROZEN_BLINK_RETURN_HALF_MS, state: 'open' },
  ];
  const finishedAt = steps[steps.length - 1].at;

  steps.forEach(({ at, state }) => {
    const timer = window.setTimeout(() => {
      if (token !== blinkSequenceToken || !isFrozenBlinkEligible()) return;
      setFrozenBlinkState(state);
    }, at);
    blinkSequenceTimers.push(timer);
  });

  const doneTimer = window.setTimeout(() => {
    if (token !== blinkSequenceToken) return;
    blinkSequenceTimers = [];
    setFrozenBlinkState('open');
    scheduleBlink();
  }, finishedAt + 20);
  blinkSequenceTimers.push(doneTimer);
}

function syncFrozenBlink() {
  clearFrozenBlinkTimers();
  setFrozenBlinkState('open');
  const eligible = isFrozenBlinkEligible();
  avatar.dataset.blinkEligible = eligible ? 'true' : 'false';
  if (eligible) scheduleBlink();
}

function toggleFreeze() {
  isAvatarFrozen = !isAvatarFrozen;
  avatar.classList.toggle('is-frozen', isAvatarFrozen);
  freezeBtn.classList.toggle('is-active', isAvatarFrozen);
  freezeBtn.setAttribute('aria-pressed', isAvatarFrozen ? 'true' : 'false');
  freezeBtn.setAttribute('aria-label', '冻结立绘朝向');
  freezeBtn.dataset.tooltip = isAvatarFrozen ? '解冻立绘朝向' : '冻结立绘朝向';
  cycleDirBtn.setAttribute('aria-label', isAvatarFrozen ? '切换立绘' : '冻结后可切换立绘');
  cycleDirBtn.dataset.tooltip = isAvatarFrozen ? '切换立绘' : '冻结后可切换立绘';

  if (isAvatarFrozen) {
    // Cancel smoothing loop so tickSmoothedLook won't race with cycleFrozenDirection
    if (lookRafId) {
      window.cancelAnimationFrame(lookRafId);
      lookRafId = 0;
    }
    // Force settle look to (0,0) immediately
    renderedLookX = 0;
    renderedLookY = 0;
    targetLookX = 0;
    targetLookY = 0;
    setAvatarLook(0, 0);

    // Freeze still chooses the original neutral pose even if PNG rendering is
    // suspended behind an SVG. Restore that pose when sway is turned off.
    if (swayMode !== 'off') {
      requestedDirectionCol = 2;
      requestedDirectionRow = 2;
      requestedDirectionSlot = FROZEN_BLINK_SLOT;
    }
    frozenDirectionCol = requestedDirectionCol;
    frozenDirectionRow = requestedDirectionRow;
    cycleDirIndex = CYCLE_DIR_SLOTS.findIndex(([c, r]) => c === requestedDirectionCol && r === requestedDirectionRow);
    if (cycleDirIndex < 0) cycleDirIndex = 2;
    cycleDirBtn.classList.remove('is-disabled');
    cycleDirBtn.disabled = false;
  } else {
    frozenCycleSpecialVisualState = '';
    syncSpecialVisualState();
    cycleDirBtn.classList.add('is-disabled');
    cycleDirBtn.disabled = true;
  }
  syncFrozenBlink();
  syncSwayControls();
}

function cycleFrozenDirection() {
  if (!isAvatarFrozen || swayMode !== 'off') return;

  if (frozenCycleSpecialVisualState) {
    frozenCycleSpecialVisualState = '';
    syncSpecialVisualState();
    cycleDirIndex = CYCLE_DIR_SLOTS.findIndex(([c, r]) => c === 2 && r === 3);
  } else if (
    requestedDirectionSet === DEFAULT_DIRECTION_SET
    && requestedDirectionSlot === FROZEN_BLINK_SLOT
  ) {
    frozenCycleSpecialVisualState = FROZEN_CYCLE_SPECIAL_VISUAL_STATE;
    syncSpecialVisualState();
    return;
  } else {
    cycleDirIndex = (cycleDirIndex + 1) % CYCLE_DIR_SLOTS.length;
  }

  const [col, row] = CYCLE_DIR_SLOTS[cycleDirIndex];
  frozenDirectionCol = col;
  frozenDirectionRow = row;
  const slot = `c${col}_r${row}`;
  requestedDirectionCol = col;
  requestedDirectionRow = row;
  requestedDirectionSlot = slot;
  syncFrozenBlink();
  const token = ++directionSwapToken;
  // swapAvatarFrame is async; it sets currentDirectionSlot + aria attrs on success
  swapAvatarFrame(slot, directionFrameUrl(col, row, requestedDirectionSet), token, col, row, requestedDirectionSet);
}

function nextSwayMode(mode) {
  return SWAY_MODE_ORDER[(SWAY_MODE_ORDER.indexOf(mode) + 1) % SWAY_MODE_ORDER.length];
}

function syncSwayControls() {
  const active = swayMode !== 'off';
  const label = swayMode === 'green' ? '常服' : SWAY_AVATARS[swayMode]?.label;
  const copy = active ? `轻摇 · ${label}` : '开启轻摇';
  swayBtn?.classList.toggle('is-active', active);
  swayBtn?.setAttribute('aria-pressed', String(active));
  swayBtn?.setAttribute('aria-label', copy);
  swayBtn?.setAttribute('aria-busy', String(requestedSwayMode !== swayMode));
  if (swayBtn) {
    swayBtn.dataset.swayMode = swayMode;
    swayBtn.dataset.tooltip = copy;
  }
  avatar.dataset.swayMode = swayMode;
  // SVGs contain one frontal pose, not a direction matrix. Retain the old
  // direction selection while this mode is active; never silently rotate it.
  cycleDirBtn.disabled = active || !isAvatarFrozen;
  cycleDirBtn.classList.toggle('is-disabled', cycleDirBtn.disabled);
  const directionCopy = active ? '轻摇模式使用正面立绘'
    : isAvatarFrozen ? '切换立绘' : '冻结后可切换立绘';
  cycleDirBtn.setAttribute('aria-label', directionCopy);
  cycleDirBtn.dataset.tooltip = directionCopy;
}

async function setSwayMode(nextMode) {
  const next = Object.hasOwn(SWAY_AVATARS, nextMode) ? nextMode : 'off';
  const token = ++swaySwapToken;
  requestedSwayMode = next;
  syncSwayControls();

  if (next === 'off') {
    // A Freeze click during SVG mode selected a neutral PNG without loading it.
    // Decode the retained/selected frozen pose before revealing it again.
    if (isAvatarFrozen && swayMode !== 'off') {
      const col = frozenDirectionCol;
      const row = frozenDirectionRow;
      const slot = `c${col}_r${row}`;
      requestedDirectionSlot = slot;
      requestedDirectionCol = col;
      requestedDirectionRow = row;
      const directionToken = ++directionSwapToken;
      await swapAvatarFrame(slot, directionFrameUrl(col, row), directionToken, col, row);
      if (token !== swaySwapToken) return;
    }
    // Release mouth listeners and the old SMIL tree as well as image resources.
    talkingSway?.dispose();
    talkingSway = null;
    if (avatarSwayFrame?.tagName !== 'IMG') avatarSwayFrame?.replaceChildren();
    swayMode = 'off';
    avatar.classList.remove('sway-mode-active');
    avatarSwayFrame?.classList.remove('is-active');
    avatarSwayFrame?.setAttribute('aria-hidden', 'true');
    avatarSwayFrame?.removeAttribute('src');
    if (!isAvatarFrozen) setAvatarLook(renderedLookX, renderedLookY);
    avatar.setAttribute('aria-label', `阿绿方向帧头像：${currentDirectionSlot} · ${directionSetConfig(currentDirectionSet).label}`);
    syncSpecialVisualState();
    syncSwayControls();
    refreshSiteIconForbiddenRect(true);
    if (avatarSwayStatus) avatarSwayStatus.textContent = '已回到原立绘';
    return;
  }

  const config = SWAY_AVATARS[next];
  // Decode off-DOM; retain the current fully rendered pose until ready. The
  // token prevents a slow request resurrecting a mode after another click.
  let image = new Image();
  let candidate = null;
  image.id = 'avatarSwayFrame';
  image.className = 'avatar-frame avatar-sway-frame is-active';
  image.alt = '';
  image.decoding = 'async';
  image.draggable = false;
  image.setAttribute('aria-hidden', 'true');
  try {
    if (next === 'green' || config.talking) {
      const { createTalkingSway } = await import('./assets/sway/v4-r4/sway-mouth.mjs?v=stable-owner-2');
      candidate = await createTalkingSway({
        audio, readEnergy: audioLevel, contextRunning: () => audioCtx?.state === 'running', boundsSrc: config.src,
        ...config.talking,
      });
      image = candidate.element;
    } else if (next === 'swim') {
      const { createSvgDocument } = await import('./assets/sway/svg-document.mjs?v=native-doc-transparent-2');
      candidate = await createSvgDocument({src: config.src, host: avatarSwayFrame.parentElement});
      image = candidate.element;
    } else {
      image.src = config.src;
      await image.decode();
      if (!image.naturalWidth || !image.naturalHeight) throw new Error('SVG has no drawable size');
    }
  } catch {
    candidate?.dispose();
    if (token !== swaySwapToken) return;
    requestedSwayMode = swayMode;
    syncSwayControls();
    if (avatarSwayStatus) avatarSwayStatus.textContent = `${config.label}轻摇加载失败，已保留当前立绘，请重试。`;
    return;
  }
  if (token !== swaySwapToken) { candidate?.dispose(); return; }
  directionSwapToken += 1; // Invalidate any outstanding PNG swap.
  // A cancelled swap must not leave a requested slot falsely marked as loaded.
  requestedDirectionSlot = currentDirectionSlot;
  requestedDirectionCol = Number(currentDirectionSlot[1]);
  requestedDirectionRow = Number(currentDirectionSlot[4]);
  clearFrozenC2R2ReturnFade();
  talkingSway?.dispose();
  // A staged native document must stay in its original parent to retain SMIL.
  if (image.parentNode === avatarSwayFrame.parentNode) avatarSwayFrame.remove();
  else avatarSwayFrame.replaceWith(image);
  avatarSwayFrame = image;
  talkingSway = candidate;
  talkingSway?.start();
  swayMode = next;
  avatar.classList.add('sway-mode-active');
  avatar.setAttribute('aria-label', `${config.label}轻摇立绘：自动轻摇与眨眼${next === 'swim' ? '' : '、微笑'}`);
  syncSpecialVisualState();
  syncSwayControls();
  refreshSiteIconForbiddenRect(true);
  if (avatarSwayStatus) avatarSwayStatus.textContent = `已开启${config.label}轻摇`;
}

swayBtn?.addEventListener('click', (event) => {
  if (isModifiedActivation(event)) return;
  const next = nextSwayMode(requestedSwayMode);
  void setSwayMode(next);
});
syncSwayControls();

freezeBtn.addEventListener('click', toggleFreeze);
cycleDirBtn.addEventListener('click', cycleFrozenDirection);
siteIconToggleBtn?.addEventListener('click', (event) => {
  if (isModifiedActivation(event)) return;
  setSiteIconsCollapsed(!areSiteIconsCollapsed);
});
modeToggleBtn?.addEventListener('click', toggleTheme);
midoriYouTubePlayerMinimize?.addEventListener('click', () => {
  setMidoriYouTubePlayerMinimized(midoriYouTubePlayerDock?.dataset.minimized !== 'true');
});
midoriYouTubePlayerClose?.addEventListener('click', closeMidoriYouTubePlayer);
midoriBilibiliPlayerMinimize?.addEventListener('click', () => {
  setMidoriBilibiliPlayerMinimized(midoriBilibiliPlayerDock?.dataset.minimized !== 'true');
});
midoriBilibiliPlayerClose?.addEventListener('click', closeMidoriBilibiliPlayer);
setupMidoriYouTubePlayerResize();
setupMidoriYouTubePlayerDrag();
setupMidoriBilibiliPlayerResize();
setupMidoriBilibiliPlayerDrag();

buildNightStarfield();
const initialTheme = requestedTheme === 'light' || requestedTheme === 'night'
  ? requestedTheme
  : document.documentElement.dataset.theme;
applyDirectionFrameCalibration(avatarFrame, currentDirectionSlot, currentDirectionSet);
applyDirectionFrameCalibration(avatarFrameNext, currentDirectionSlot, currentDirectionSet);
setTheme(initialTheme, { persist: false });
setupNightMoon2p5d();
scheduleNightMoonLayerLayoutSync();
setupPragmataDriftMotion();
setupNightSpaceshipMotion();
setupVoiceCapsuleCanvas();
setupMidoriInputDock();
setupFloatingSiteIcons();
window.addEventListener('resize', setupVoiceCapsuleCanvas);
window.addEventListener('resize', scheduleNightMoonLayerLayoutSync);
window.addEventListener('resize', syncPragmataEntryY);
document.addEventListener('visibilitychange', syncFrozenBlink);
document.addEventListener('visibilitychange', syncShootingStarScheduler);
document.addEventListener('visibilitychange', syncNightMoon2p5d);
document.addEventListener('visibilitychange', syncNightSpaceshipMotion);
if (voicePreviewMode) tickVoicePreview();
else {
  updateVoiceRing(0);
  updateVoiceCapsuleVisualizer(0, false);
}
setVolumeExpanded(false);
setFrozenBlinkState('open');
setMouth(0);
avatar.setAttribute('data-direction-set', currentDirectionSet);
avatar.setAttribute('data-direction-slot', currentDirectionSlot);
avatar.setAttribute('aria-label', `阿绿方向帧头像：${currentDirectionSlot} · ${directionSetConfig(currentDirectionSet).label}`);
syncSpecialVisualState();
preloadDirectionFrames(DEFAULT_DIRECTION_SET);
setAvatarLook(0, 0);
pauseBtn.setAttribute('aria-pressed', 'false');
renderRecentItems();
connectEventBridge();
loadLiveSelectOverlay();

// Tim-approved close-distance presentation; shares existing SVG/audio owners.
import { initGachikoiDistance } from './assets/gachikoi/gachikoi-distance.mjs?v=art-scale-v1';
initGachikoiDistance({
  avatar, swayBtn, dock: midoriInputDock, voice: voiceVisualizer,
  getFrame: () => avatarSwayFrame, getMode: () => swayMode, setMode: setSwayMode,
});

// Accepted floating timer. Reuse the icon drop guard without calling its respawn.
import { initPomodoro } from './assets/pomodoro/integration.mjs?v=equal-controls9';
initPomodoro({
  fadeMs: SITE_ICON_RESPAWN_FADE_MS,
  getDropRect: async () => {
    const rect = await measureAvatarTextureGuardRect();
    if (!rect || !siteIconDock) return null;
    const dock = siteIconDock.getBoundingClientRect();
    return {left: rect.left + dock.left, right: rect.right + dock.left,
      top: rect.top + dock.top, bottom: rect.bottom + dock.top};
  },
}).catch(error => console.error('Pomodoro initialization failed', error));
