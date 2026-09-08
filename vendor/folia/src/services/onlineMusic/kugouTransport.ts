import md5 from 'blueimp-md5';
import { OnlineProviderError } from '../../types/onlineMusic';
import { readProviderSessionValue, removeProviderSessionValue, writeProviderSessionValue } from './providerStorage';

// src/services/onlineMusic/kugouTransport.ts

export const KUGOU_OPERATIONS = [
    'register_dev', 'login_qr_key', 'login_qr_create', 'login_qr_check', 'logout',
    'user_detail', 'user_vip_detail', 'youth_union_vip', 'youth_day_vip', 'youth_day_vip_upgrade',
    'user_playlist', 'user_cloud', 'user_cloud_url', 'search',
    'audio', 'krm_audio', 'song_url', 'song_climax', 'search_lyric', 'lyric', 'playlist_track_all',
    'playlist_detail',
    'album_detail', 'album_songs', 'artist_detail', 'artist_albums', 'artist_audios',
    'everyday_recommend', 'everyday_history', 'personal_fm', 'top_card_youth', 'playlist_add',
    'playlist_del', 'playlist_tracks_add', 'playlist_tracks_del',
] as const;

export type KugouOperation = typeof KUGOU_OPERATIONS[number];
export type KugouParams = Record<string, string | number | boolean | undefined>;

const ENDPOINTS: Record<KugouOperation, string> = {
    register_dev: '/register/dev',
    login_qr_key: '/login/qr/key',
    login_qr_create: '/login/qr/create',
    login_qr_check: '/login/qr/check',
    logout: '/logout',
    user_detail: '/user/detail',
    user_vip_detail: '/user/vip/detail',
    youth_union_vip: '/youth/union/vip',
    youth_day_vip: '/youth/day/vip',
    youth_day_vip_upgrade: '/youth/day/vip/upgrade',
    user_playlist: '/user/playlist',
    user_cloud: '/user/cloud',
    user_cloud_url: '/user/cloud/url',
    search: '/search',
    audio: '/audio',
    krm_audio: '/krm/audio',
    song_url: '/song/url',
    song_climax: '/song/climax',
    search_lyric: '/search/lyric',
    lyric: '/lyric',
    playlist_track_all: '/playlist/track/all',
    playlist_detail: '/playlist/detail',
    album_detail: '/album/detail',
    album_songs: '/album/songs',
    artist_detail: '/artist/detail',
    artist_albums: '/artist/albums',
    artist_audios: '/artist/audios',
    everyday_recommend: '/everyday/recommend',
    everyday_history: '/everyday/history',
    personal_fm: '/personal/fm',
    top_card_youth: '/top/card/youth',
    playlist_add: '/playlist/add',
    playlist_del: '/playlist/del',
    playlist_tracks_add: '/playlist/tracks/add',
    playlist_tracks_del: '/playlist/tracks/del',
};

const getWebApiBase = (): string => {
    const viteValue = typeof import.meta !== 'undefined' && import.meta.env?.MODE !== 'test'
        ? String((import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_KUGOU_API_BASE || '')
        : '';
    const processValue = typeof process !== 'undefined'
        ? String(process.env?.VITE_KUGOU_API_BASE || '')
        : '';
    const value = viteValue || processValue;
    return value.trim().replace(/\/$/, '');
};

const isDeviceVerificationRequired = (body: any): boolean => {
    const errorCode = Number(body?.errcode ?? body?.error_code);
    const message = String(body?.error ?? body?.error_msg ?? body?.msg ?? '');
    return errorCode === 20028 || message.includes('本次请求需要验证');
};

const getWebSessionCookie = (): string => {
    const values = new Map<string, string>();
    const storedCookie = readProviderSessionValue('kugou', 'cookie');
    storedCookie?.split(';').forEach(entry => {
        const separator = entry.indexOf('=');
        if (separator <= 0) return;
        values.set(entry.slice(0, separator).trim(), entry.slice(separator + 1).trim());
    });

    const token = readProviderSessionValue('kugou', 'token');
    const userId = readProviderSessionValue('kugou', 'userid');
    const dfid = readProviderSessionValue('kugou', 'dfid');
    if (dfid) values.set('dfid', dfid);
    if (token) values.set('token', token);
    if (userId) values.set('userid', userId);
    return Array.from(values, ([key, value]) => `${key}=${value}`).join(';');
};

export const hasKugouAuthenticatedSearchSession = (): boolean => {
    // Electron keeps the reusable token/dfid in the encrypted main-process bridge. The account id
    // is only a non-secret hint that lets this synchronous selector choose authenticated search.
    if (typeof window !== 'undefined' && window.electron?.kugouRequest) {
        return Boolean(readProviderSessionValue('kugou', 'userid'));
    }
    const cookie = getWebSessionCookie();
    return ['token', 'userid', 'dfid'].every(key => (
        new RegExp(`(?:^|;)\\s*${key}=[^;]+`, 'i').test(cookie)
    ));
};

// Reproduces KuGou's anonymous Android search signature used before account-backed provider search.
export const requestKugouAnonymousSearch = async (
    keyword: string,
    page: number,
    pagesize: number,
): Promise<any> => {
    const clientTimeMs = Date.now();
    const clientTimeSec = Math.floor(clientTimeMs / 1000);
    const mid = md5(String(clientTimeMs));
    const params: Record<string, string | number> = {
        sorttype: '0',
        keyword,
        pagesize,
        page,
        userid: '0',
        appid: '3116',
        token: '',
        clienttime: clientTimeSec,
        iscorrection: '1',
        uuid: '-',
        mid,
        dfid: '-',
        clientver: '11070',
        platform: 'AndroidFilter',
    };
    const signatureSource = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('');
    params.signature = md5(
        `LnT6xpN3khm36zse0QzvmgTZ3waWdRSA${signatureSource}LnT6xpN3khm36zse0QzvmgTZ3waWdRSA`,
    );

    const targetUrl = new URL('http://complexsearch.kugou.com/v2/search/song');
    Object.entries(params).forEach(([key, value]) => targetUrl.searchParams.set(key, String(value)));
    const requestUrl = typeof window !== 'undefined' && window.electron
        ? targetUrl.toString()
        : `/api/lyric-proxy?url=${encodeURIComponent(targetUrl.toString())}`;
    const response = await fetch(requestUrl, {
        method: 'GET',
        credentials: 'omit',
        headers: {
            'User-Agent': 'Android14-1070-11070-201-0-SearchSong-wifi',
            'KG-Rec': '1',
            'KG-RC': '1',
            'KG-CLIENTTIMEMS': String(clientTimeMs),
            mid,
            'x-router': 'complexsearch.kugou.com',
        },
    });
    if (!response.ok) {
        throw new OnlineProviderError(
            'network',
            `KuGou anonymous search failed: ${response.status}`,
            'kugou',
        );
    }
    const body = await response.json();
    const errorCode = Number(body?.error_code);
    if (Number.isFinite(errorCode) && errorCode !== 0 && errorCode !== 200) {
        throw new OnlineProviderError(
            'network',
            `KuGou anonymous search failed: ${errorCode}`,
            'kugou',
        );
    }
    return body;
};

const clearWebDeviceIdentity = (): void => {
    removeProviderSessionValue('kugou', 'dfid');
    const storedCookie = readProviderSessionValue('kugou', 'cookie');
    if (!storedCookie) return;
    const retained = storedCookie.split(';').filter(entry => entry.trim() && !/^\s*dfid=/i.test(entry));
    if (retained.length > 0) {
        writeProviderSessionValue('kugou', 'cookie', retained.join(';'));
    } else {
        removeProviderSessionValue('kugou', 'cookie');
    }
};

const persistWebSession = (response: any): void => {
    const cookies = response?.cookie || response?.data?.cookie;
    if (typeof cookies === 'string' && cookies) writeProviderSessionValue('kugou', 'cookie', cookies);
    if (Array.isArray(cookies) && cookies.length) writeProviderSessionValue('kugou', 'cookie', cookies.join('; '));

    const payload = response?.data || response?.body?.data || response?.body || response;
    const token = payload?.token;
    const userId = payload?.userid ?? payload?.user_id;
    const dfid = payload?.dfid;
    if (token) writeProviderSessionValue('kugou', 'token', String(token));
    if (userId) writeProviderSessionValue('kugou', 'userid', String(userId));
    if (dfid) writeProviderSessionValue('kugou', 'dfid', String(dfid));
};

/**
 * Removes credentials written by older desktop builds. Electron only retains the non-sensitive
 * account id in renderer storage; every reusable credential stays in the encrypted IPC bridge.
 */
const persistElectronAccountHint = (operation: KugouOperation, response: any): void => {
    ['cookie', 'token', 'dfid'].forEach(key => removeProviderSessionValue('kugou', key));
    if (operation === 'logout') {
        removeProviderSessionValue('kugou', 'userid');
        return;
    }
    const payload = response?.data || response?.body?.data || response?.body || response;
    const userId = payload?.userid ?? payload?.user_id;
    if (userId) writeProviderSessionValue('kugou', 'userid', String(userId));
};

export const getKugouTransportAvailability = () => {
    if (typeof window !== 'undefined' && window.electron?.kugouRequest) return { configured: true } as const;
    return getWebApiBase()
        ? { configured: true } as const
        : { configured: false, reason: 'not-configured' as const };
};

// Routes one provider request through Electron IPC or an explicitly configured Web backend.
export const requestKugou = async <T = unknown>(operation: KugouOperation, params: KugouParams = {}): Promise<T> => {
    if (typeof window !== 'undefined' && window.electron?.kugouRequest) {
        // Account credentials are injected by the main-process bridge. Drop legacy renderer values
        // at the IPC boundary so an old localStorage token cannot keep circulating after migration.
        const electronParams = Object.fromEntries(
            Object.entries(params).filter(([key]) => !['token', 'dfid', 'cookie'].includes(key.toLowerCase())),
        );
        const response = await window.electron.kugouRequest(operation, electronParams);
        persistElectronAccountHint(operation, response);
        return response as T;
    }

    const base = getWebApiBase();
    if (!base) {
        throw new OnlineProviderError('unavailable', 'VITE_KUGOU_API_BASE is not configured', 'kugou');
    }
    const execute = async (targetOperation: KugouOperation, targetParams: KugouParams): Promise<any> => {
        const query = new URLSearchParams();
        Object.entries(targetParams).forEach(([key, value]) => {
            if (value !== undefined) query.set(key, String(value));
        });
        const cookie = getWebSessionCookie();
        if (cookie) query.set('cookie', cookie);
        query.set('timestamp', String(Date.now()));

        const response = await fetch(`${base}${ENDPOINTS[targetOperation]}?${query}`, { credentials: 'include' });
        if (!response.ok) {
            throw new OnlineProviderError('network', `KuGouMusicApi request failed: ${response.status}`, 'kugou');
        }
        const responseBody = await response.json();
        persistWebSession(responseBody);
        const body = responseBody?.body ?? responseBody;
        return body;
    };

    let body = await execute(operation, params);
    if (operation !== 'register_dev' && isDeviceVerificationRequired(body)) {
        clearWebDeviceIdentity();
        await execute('register_dev', {});
        body = await execute(operation, params);
    }
    return body as T;
};
