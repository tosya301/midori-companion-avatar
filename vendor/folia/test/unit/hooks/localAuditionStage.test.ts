import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Same dependency-free hook approach as useOnlineProviderQrLogin.test.ts,
// with dependency-aware effects/callbacks to exercise rerenders and cleanup.
const runtime = vi.hoisted(() => ({ slots: [] as any[], cursor: 0, effects: [] as any[] }));
vi.mock('react', () => {
    const slot = (initial: any) => {
        const i = runtime.cursor++;
        return runtime.slots[i] ??= { current: initial };
    };
    const changed = (a: any[], b: any[]) => !a || a.length !== b.length || b.some((v, i) => !Object.is(v, a[i]));
    return {
        useRef: slot,
        useState: (initial: any) => {
            const s = slot(initial);
            return [s.current, s.set ??= (v: any) => { s.current = typeof v === 'function' ? v(s.current) : v; }];
        },
        useCallback: (fn: any, deps: any[]) => {
            const s = slot(fn);
            if (changed(s.deps, deps)) { s.current = fn; s.deps = deps; }
            return s.current;
        },
        useEffect: (effect: any, deps: any[]) => {
            const s = slot(null);
            if (changed(s.deps, deps)) {
                s.deps = deps;
                runtime.effects.push(() => { s.cleanup?.(); s.cleanup = effect(); });
            }
        },
    };
});
const mocks = vi.hoisted(() => ({ callbacks: null as any, parse: vi.fn(), match: vi.fn(), playerCap: vi.fn() }));
vi.mock('@/services/db', () => ({ getFromCache: vi.fn(), removeFromCache: vi.fn(), saveToCache: vi.fn() }));
vi.mock('@/utils/lyrics/LyricParserFactory', () => ({ LyricParserFactory: { parse: mocks.parse } }));
vi.mock('@/utils/lyrics/autoMatchBestLyric', () => ({ autoMatchBestLyric: mocks.match }));
vi.mock('@/hooks/usePlayerCapSource', () => ({ usePlayerCapSource: mocks.playerCap }));
vi.mock('@/services/nowPlayingProvider', () => ({ NowPlayingProvider: class {
    constructor(callbacks: any) { mocks.callbacks = callbacks; }
    start() {}
    stop() {}
} }));

import { useStagePlaybackController } from '@/hooks/useStagePlaybackController';
import { NOW_PLAYING_PROGRESS_QUERY_URL } from '@/utils/nowPlayingClock';
import { isLocalAuditionEmbed } from '@/utils/localAudition';
import { PlayerState } from '@/types';

const lineLyrics = { lines: [{ startTime: 0, endTime: 100, fullText: 'host line', words: [] }], isWordByWord: false };
const onlineLyrics = { lines: [{ startTime: 0, endTime: 100, fullText: 'online replacement', words: [] }], isWordByWord: true };
const track = { id: 'local-one', title: 'Host song', artist: 'Host', album: '', coverUrl: null, durationMs: 100000 };
const lyric = { title: track.title, artist: track.artist, source: 'local', hasLyric: true, lrc: '[00:00.00]host line', durationMs: 100000 };
let params: Parameters<typeof useStagePlaybackController>[0];
const render = () => {
    runtime.cursor = 0;
    const result = useStagePlaybackController(params);
    runtime.effects.splice(0).forEach(effect => effect());
    return result;
};
const unmount = () => runtime.slots.forEach(s => { s.cleanup?.(); s.cleanup = null; });
const settle = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
const content = async () => {
    mocks.callbacks.onTrack(track);
    mocks.callbacks.onLyric(lyric);
    render();
    await settle();
};
const pause = (paused: boolean) => { mocks.callbacks.onPauseState(paused); render(); };

beforeEach(() => {
    runtime.slots = []; runtime.cursor = 0; runtime.effects = [];
    vi.useFakeTimers();
    vi.stubGlobal('window', {
        parent: {}, location: { search: '?lyricStage=1&localAudition=1', origin: 'http://localhost' },
        setInterval: (fn: any, ms: number) => setInterval(fn, ms), clearInterval: (id: any) => clearInterval(id),
    });
    vi.stubGlobal('localStorage', { getItem: () => 'true' });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ progress: 99000 }) }));
    mocks.parse.mockReset().mockResolvedValue(lineLyrics);
    mocks.match.mockReset().mockResolvedValue({ lyrics: onlineLyrics, source: 'netease' });
    mocks.playerCap.mockReset().mockReturnValue({ state: { connectionStatus: 'disabled', clock: { durationSec: 0 }, lyrics: null, track: null }, players: [], getCurrentTimeSec: () => 0 });
    const ref = (current: any) => ({ current });
    params = {
        t: key => key, isDev: false, isElectronWindow: false,
        enableNowPlayingStage: true, enablePlayerCapStage: false,
        playerCapHost: '', playerCapPlayer: '', playerCapTimeBasis: 'timestamp', playerCapSticky: false,
        activePlaybackContext: 'stage', setActivePlaybackContext: vi.fn(),
        currentSong: null, lyrics: null, cachedCoverUrl: null, audioSrc: null, playQueue: [], isFmMode: false,
        playerState: PlayerState.PAUSED, duration: 0, currentLineIndex: -1,
        currentTime: { get: () => 0, set: vi.fn() } as any, audioRef: ref(null), currentSongRef: ref(null),
        shouldAutoPlayRef: ref(false), pendingResumeTimeRef: ref(null), lastAudioRecoverySourceRef: ref(null), currentOnlineAudioUrlFetchedAtRef: ref(null),
        setCurrentSong: vi.fn(), setLyrics: vi.fn(), setCachedCoverUrl: vi.fn(), setAudioSrc: vi.fn(), setPlayQueue: vi.fn(), setIsFmMode: vi.fn(),
        setIsLyricsLoading: vi.fn(), setPlayerState: vi.fn(), setCurrentLineIndex: vi.fn(), setDuration: vi.fn(), setStatusMsg: vi.fn(), navigateToPlayer: vi.fn(),
    };
});
afterEach(() => { unmount(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('embedded local audition ownership', () => {
    it.each(['', '?localAudition=1', '?lyricStage=0&localAudition=1', '?lyricStage=1', '?lyricStage=1&localAudition=true', '?lyricStage=1&localAudition=0'])('rejects non-opt-in query %s', search => {
        window.location.search = search;
        expect(isLocalAuditionEmbed()).toBe(false);
    });
    it('requires a parent iframe and does not persist a setting', () => {
        expect(isLocalAuditionEmbed()).toBe(true);
        (window as any).parent = window;
        expect(isLocalAuditionEmbed()).toBe(false);
    });
    it('keeps supplied lines and host clock across resume, poll, pause and small/backward seeks', async () => {
        render(); await content();
        expect(params.setLyrics).toHaveBeenLastCalledWith(lineLyrics);
        pause(false);
        await vi.advanceTimersByTimeAsync(21000);
        mocks.callbacks.onProgress({ progressMs: 12800, quality: 'precise' });
        expect(params.currentTime.set).toHaveBeenLastCalledWith(12.8);
        pause(true);
        mocks.callbacks.onProgress({ progressMs: 12750, quality: 'precise' });
        expect(params.currentTime.set).toHaveBeenLastCalledWith(12.75);
        mocks.callbacks.onProgress({ progressMs: 4000, quality: 'coarse' });
        expect(params.currentTime.set).toHaveBeenLastCalledWith(4);
        pause(false); await settle();
        expect(fetch).not.toHaveBeenCalled();
        expect(mocks.match).not.toHaveBeenCalled();
        expect(params.setLyrics).toHaveBeenLastCalledWith(lineLyrics);
    });
    it('does not let a persisted PlayerCap preference take ownership', () => {
        params.enablePlayerCapStage = true;
        const result = render();
        expect(result.stageSource).toBe('now-playing');
        expect(mocks.playerCap).toHaveBeenLastCalledWith(expect.objectContaining({ enabled: false }));
    });
    it('retains online upgrade and precise Spotify polling in normal embeds', async () => {
        window.location.search = '?lyricStage=1';
        render(); await content();
        expect(mocks.match).toHaveBeenCalledTimes(1);
        expect(params.setLyrics).toHaveBeenLastCalledWith(onlineLyrics);
        pause(false); await settle();
        expect(fetch).toHaveBeenCalledWith(NOW_PLAYING_PROGRESS_QUERY_URL, expect.objectContaining({ signal: expect.any(AbortSignal) }));
        await vi.advanceTimersByTimeAsync(7000);
        expect(vi.mocked(fetch).mock.calls.length).toBeGreaterThanOrEqual(2);
        pause(true); await settle();
        expect(params.currentTime.set).toHaveBeenLastCalledWith(99);
    });
    it('discards a stale lyric parse immediately when new host content arrives', async () => {
        let resolve!: (v: any) => void;
        mocks.parse.mockImplementationOnce(() => new Promise(r => { resolve = r; }));
        render(); await content();
        mocks.callbacks.onLyric({ ...lyric, lrc: '[00:00.00]new host line' });
        resolve(onlineLyrics); await settle();
        expect(params.setLyrics).not.toHaveBeenCalledWith(onlineLyrics);
        render(); await settle();
        expect(params.setLyrics).toHaveBeenLastCalledWith(lineLyrics);
    });
    it.each(['new-content', 'local-mode', 'leave-stage', 'unmount'])('cancels stale query and match on %s', async boundary => {
        window.location.search = '?lyricStage=1';
        let resolveMatch!: (v: any) => void;
        let resolveFetch!: (v: any) => void;
        mocks.match.mockImplementation(() => new Promise(r => { resolveMatch = r; }));
        vi.mocked(fetch).mockImplementation(() => new Promise(r => { resolveFetch = r; }));
        render(); await content(); pause(false);
        const matchSignal = mocks.match.mock.calls[0][3].signal as AbortSignal;
        const querySignal = vi.mocked(fetch).mock.calls[0][1]!.signal as AbortSignal;
        if (boundary === 'new-content') mocks.callbacks.onTrack({ ...track, id: 'two', title: 'Second song' });
        if (boundary === 'local-mode') { window.location.search += '&localAudition=1'; render(); }
        if (boundary === 'leave-stage') { params.activePlaybackContext = 'main'; render(); }
        if (boundary === 'unmount') unmount();
        expect(matchSignal.aborted).toBe(true);
        expect(querySignal.aborted).toBe(true);
        vi.mocked(params.currentTime.set).mockClear();
        resolveMatch({ lyrics: onlineLyrics });
        resolveFetch({ ok: true, json: async () => ({ progress: 99000 }) });
        await settle();
        expect(params.setLyrics).not.toHaveBeenCalledWith(onlineLyrics);
        expect(params.currentTime.set).not.toHaveBeenCalled();
    });
});
