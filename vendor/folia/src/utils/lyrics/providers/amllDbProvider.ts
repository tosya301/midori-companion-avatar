import type { AmllDbPlatform, LyricData } from '../../../types';
import { parseLyricsByFormat } from '../parserCore';

// src/utils/lyrics/providers/amllDbProvider.ts

const AMLL_DB_BASE_URL = 'https://amll-ttml-db.stevexmh.net';
const AMLL_DB_CACHE_LIMIT = 200;
const AMLL_DB_FETCH_TIMEOUT_MS = 5000;
const lyricsCache = new Map<string, Promise<LyricData | null>>();

function getElectronBridge() {
    if (typeof window === 'undefined') {
        return undefined;
    }
    return window.electron;
}

export const buildAmllDbLyricsUrl = (platform: AmllDbPlatform, musicId: number | string): string => (
    `${AMLL_DB_BASE_URL}/${platform}/${encodeURIComponent(String(musicId))}?format=ttml`
);

const buildAmllDbRequestUrl = (platform: AmllDbPlatform, musicId: number | string): string => {
    const targetUrl = buildAmllDbLyricsUrl(platform, musicId);
    return getElectronBridge() ? targetUrl : `/api/lyric-proxy?url=${encodeURIComponent(targetUrl)}`;
};

async function requestAmllDb(platform: AmllDbPlatform, musicId: number | string): Promise<{ ok: boolean; status: number; text: () => Promise<string> }> {
    const requestUrl = buildAmllDbRequestUrl(platform, musicId);
    const electronBridge = getElectronBridge();

    if (electronBridge?.fetchLyricProxy) {
        const response = await electronBridge.fetchLyricProxy(requestUrl, {
            method: 'GET',
        });
        return {
            ok: response.ok,
            status: response.status,
            text: async () => response.bodyText,
        };
    }

    return fetch(requestUrl, {
        credentials: 'omit',
        signal: AbortSignal.timeout(AMLL_DB_FETCH_TIMEOUT_MS),
    });
}

export function clearAmllDbLyricsCache(): void {
    lyricsCache.clear();
}

async function fetchAmllDbLyricsUncached(
    platform: AmllDbPlatform,
    musicId: number | string,
): Promise<LyricData | null> {
    try {
        const response = await requestAmllDb(platform, musicId);
        if (!response.ok) {
            return null;
        }

        const ttml = await response.text();
        if (!ttml.trim() || !/<tt(?:\s|>)/i.test(ttml)) {
            return null;
        }

        const parsed = parseLyricsByFormat('ttml', ttml);
        return parsed?.lines?.length ? parsed : null;
    } catch (error) {
        console.warn(`[AMLLDB] Failed to fetch ${platform}/${musicId}:`, error);
        return null;
    }
}

export async function fetchAmllDbLyrics(
    platform: AmllDbPlatform,
    musicId: number | string,
): Promise<LyricData | null> {
    const id = String(musicId).trim();
    if (!id) {
        return null;
    }

    const cacheKey = `${platform}:${id}`;
    const cached = lyricsCache.get(cacheKey);
    if (cached) {
        return cached;
    }

    const request = fetchAmllDbLyricsUncached(platform, id);
    lyricsCache.set(cacheKey, request);
    if (lyricsCache.size > AMLL_DB_CACHE_LIMIT) {
        const oldestKey = lyricsCache.keys().next().value;
        if (oldestKey) {
            lyricsCache.delete(oldestKey);
        }
    }

    return request;
}
