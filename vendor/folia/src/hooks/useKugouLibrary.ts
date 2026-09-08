import { useCallback, useEffect } from 'react';
import { omni } from '../services/onlineMusic/omni';
import { useOnlineProviderAccountStore } from '../stores/useOnlineProviderAccountStore';
import type { MediaId, ProviderCollection, ProviderUser } from '../types/onlineMusic';
import {
    clearProviderAccountSnapshot,
    loadProviderAccountSnapshot,
    saveProviderAccountSnapshot,
} from '../services/onlineMusic/providerAccountCache';

// src/hooks/useKugouLibrary.ts

const PAGE_SIZE = 50;

export const useKugouLibrary = () => {
    const updateAccount = useOnlineProviderAccountStore(state => state.updateAccount);
    const clearAccount = useOnlineProviderAccountStore(state => state.clearAccount);

    // Clears the visible account first so a broken IPC logout cannot leave stale authenticated UI behind.
    const clearAuthState = useCallback(async (error?: string) => {
        clearAccount('kugou', error);
        console.info('[KugouLibrary] auth-state-cleared', {
            reason: error || 'manual-logout',
        });
        const cleanupResults = await Promise.allSettled([
            omni.logout('kugou'),
            clearProviderAccountSnapshot('kugou'),
        ]);
        cleanupResults.forEach((result, index) => {
            if (result.status === 'fulfilled') return;
            console.warn('[KugouLibrary] auth-cleanup:error', {
                target: index === 0 ? 'provider-session' : 'account-snapshot',
                name: result.reason instanceof Error ? result.reason.name : 'Error',
                message: result.reason instanceof Error ? result.reason.message : String(result.reason),
            });
        });
    }, [clearAccount]);

    const checkLoginStatus = useCallback(async (): Promise<ProviderUser | null> => {
        const cachedAccount = useOnlineProviderAccountStore.getState().accounts.kugou;
        try {
            const user = await omni.getLoginStatus('kugou');
            if (!user) {
                await clearAuthState(cachedAccount?.user ? 'auth-required' : undefined);
                console.info('[KugouLibrary] login-status:anonymous', {
                    previousAccountExpired: Boolean(cachedAccount?.user),
                });
                return null;
            }
            updateAccount('kugou', {
                status: 'authenticated',
                user,
                hydration: 'ready',
                error: undefined,
            });
            return user;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'kugou_login_status_failed';
            await clearAuthState(cachedAccount?.user ? 'auth-required' : undefined);
            console.warn('[KugouLibrary] login-status:error', {
                hadCachedAccount: Boolean(cachedAccount?.user),
                name: error instanceof Error ? error.name : 'Error',
                message,
            });
            return null;
        }
    }, [clearAuthState, updateAccount]);

    const refresh = useCallback(async () => {
        const availability = omni.getProviderAvailability('kugou');
        console.info('[KugouLibrary] refresh:start', { configured: availability.configured });
        if (!omni.getProviderCapabilities('kugou').auth || !availability.configured) {
            updateAccount('kugou', {
                status: availability.configured ? 'error' : 'anonymous',
                user: null,
                error: availability.reason,
                hydration: 'ready',
                freshness: availability.configured ? 'error' : 'fresh',
            });
            console.warn('[KugouLibrary] refresh:unavailable', { reason: availability.reason });
            return false;
        }

        const cachedAccount = useOnlineProviderAccountStore.getState().accounts.kugou;
        updateAccount('kugou', {
            status: cachedAccount?.user ? 'authenticated' : 'unknown',
            hydration: cachedAccount?.user ? 'ready' : 'loading',
            freshness: 'refreshing',
            error: undefined,
        });
        const user = await checkLoginStatus();
        if (!user) return false;

        console.info('[KugouLibrary] refresh:authenticated', {
            hasAvatar: Boolean(user.avatarUrl),
        });

        const collections: ProviderCollection[] = [];
        let likedSongIds: MediaId[] = [];
        try {
            if (omni.getProviderCapabilities('kugou').likes) {
                try {
                    likedSongIds = await omni.getProviderLikedSongIds('kugou', user.id);
                } catch (error) {
                    console.warn('[KugouLibrary] liked-songs:error', {
                        name: error instanceof Error ? error.name : 'Error',
                        message: error instanceof Error ? error.message : String(error),
                    });
                }
            }
            if (omni.getProviderCapabilities('kugou').userLibrary) {
                let offset = 0;
                let hasMore = true;
                while (hasMore && offset < 1000) {
                    const page = await omni.getProviderUserPlaylists('kugou', user.id, { limit: PAGE_SIZE, offset });
                    collections.push(...page.items);
                    console.info('[KugouLibrary] playlists:page', {
                        offset,
                        itemCount: page.items.length,
                        hasMore: page.hasMore,
                    });
                    hasMore = page.hasMore && page.nextOffset > offset;
                    offset = page.nextOffset;
                }
            }
            if (omni.getProviderCapabilities('kugou').userCloud) {
                collections.push({
                    providerId: 'kugou', id: 'cloud', name: '音乐云盘', type: 'cloud',
                    coverUrl: user.avatarUrl,
                });
            }
            const snapshot = await saveProviderAccountSnapshot('kugou', { user, collections, likedSongIds });
            updateAccount('kugou', {
                status: 'authenticated',
                user,
                collections,
                likedSongIds,
                error: undefined,
                hydration: 'ready',
                freshness: 'fresh',
                lastUpdatedAt: snapshot.savedAt,
            });
            console.info('[KugouLibrary] refresh:complete', {
                collectionCount: collections.length,
                likedSongCount: likedSongIds.length,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'kugou_library_failed';
            updateAccount('kugou', {
                status: 'authenticated',
                user,
                error: message,
                hydration: 'ready',
                freshness: 'error',
            });
            console.warn('[KugouLibrary] playlists:error', {
                name: error instanceof Error ? error.name : 'Error',
                message,
            });
        }
        return true;
    }, [checkLoginStatus, updateAccount]);

    const logout = useCallback(async () => {
        await clearAuthState();
    }, [clearAuthState]);

    useEffect(() => {
        let cancelled = false;
        void (async () => {
            const snapshot = await loadProviderAccountSnapshot('kugou');
            if (cancelled) return;
            if (snapshot) {
                const user = omni.normalizeCachedUser('kugou', snapshot.user);
                if (user) {
                    const collections = snapshot.collections
                        .map(collection => omni.normalizeCachedCollection('kugou', collection, collection.type))
                        .filter(Boolean) as ProviderCollection[];
                    updateAccount('kugou', {
                        status: 'authenticated',
                        user,
                        collections,
                        likedSongIds: snapshot.likedSongIds,
                        hydration: 'ready',
                        freshness: 'stale',
                        lastUpdatedAt: snapshot.savedAt,
                    });
                }
            }
            if (!cancelled) void refresh();
        })();
        return () => { cancelled = true; };
    }, [refresh]);

    return { refresh, logout, checkLoginStatus };
};
