import { afterEach, describe, expect, it, vi } from 'vitest';
import { NowPlayingProvider } from '@/services/nowPlayingProvider';

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

describe('local audition parent transport', () => {
    it.each(['?lyricStage=1', '?lyricStage=1&localAudition=1'])('keeps the same parent/origin security and events for %s', search => {
        const listeners = new Set<(message: any) => void>();
        const parent = { postMessage: vi.fn() };
        const origin = 'http://127.0.0.1:5178';
        vi.stubGlobal('window', {
            parent, location: { search, origin },
            addEventListener: (_: string, handler: any) => listeners.add(handler),
            removeEventListener: (_: string, handler: any) => listeners.delete(handler),
        });
        vi.stubGlobal('WebSocket', vi.fn());
        const callbacks = { onTrack: vi.fn(), onLyric: vi.fn(), onPauseState: vi.fn(), onProgress: vi.fn() };
        const provider = new NowPlayingProvider(callbacks);
        provider.start();
        expect(parent.postMessage).toHaveBeenCalledWith({ type: 'midori-lyrics-ready', engine: 'folia' }, origin);
        expect(WebSocket).not.toHaveBeenCalled();
        const data = { type: 'midori-lyrics-events', events: [
            { event: 'Track', data: { id: 'local-1', title: 'Local song', author: 'Host', duration: 100000 } },
            { event: 'Lyric', data: { title: 'Local song', lrc: '[00:01.00]host line', hasLyric: true } },
            { event: 'PlayerPauseState', data: { isPaused: true } },
            { event: 'PlayerProgress', data: { progress: 12345 } },
        ] };
        const send = (source: any, messageOrigin: string) => listeners.forEach(fn => fn({ source, origin: messageOrigin, data }));
        send({}, origin); send(parent, 'https://untrusted.invalid');
        expect(callbacks.onTrack).not.toHaveBeenCalled();
        expect(callbacks.onLyric).not.toHaveBeenCalled();
        expect(callbacks.onProgress).not.toHaveBeenCalled();
        send(parent, origin);
        expect(callbacks.onTrack).toHaveBeenCalledWith(expect.objectContaining({ id: 'local-1', title: 'Local song' }));
        expect(callbacks.onLyric).toHaveBeenCalledWith(expect.objectContaining({ lrc: '[00:01.00]host line' }));
        expect(callbacks.onPauseState).toHaveBeenCalledWith(true);
        expect(callbacks.onProgress).toHaveBeenLastCalledWith({ progressMs: 12345, quality: 'precise', isReplay: false });
        provider.stop();
        expect(listeners.size).toBe(0);
    });

    it.each([
        ['?lyricStage=1', '/api/spotify/progress'],
        ['?lyricStage=1&localAudition=1', '/api/spotify/progress'],
        ['?localAudition=1', 'http://localhost:9863/api/query/progress'],
    ])('does not add a configurable URL through %s', async (search, expected) => {
        vi.stubGlobal('window', { location: { search }, parent: {} });
        vi.resetModules();
        const clock = await import('@/utils/nowPlayingClock');
        expect(clock.NOW_PLAYING_PROGRESS_QUERY_URL).toBe(expected);
    });
});
