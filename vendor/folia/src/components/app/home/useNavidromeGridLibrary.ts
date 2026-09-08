import { useCallback, useEffect, useState } from 'react';
import { getNavidromeConfig, navidromeApi } from '../../../services/navidromeService';
import type { SubsonicAlbum, SubsonicArtist, SubsonicPlaylist, SubsonicSong } from '../../../types/navidrome';

// src/components/app/home/useNavidromeGridLibrary.ts
// Owns Navidrome overview requests so the Grid3D view remains a presentation-focused entry.

const ALBUM_PAGE_SIZE = 500;
const MAX_ALBUM_PAGES = 20;
const RECENT_ALBUM_LIMIT = 500;

export const useNavidromeGridLibrary = () => {
    const [config] = useState(() => getNavidromeConfig());
    const [albums, setAlbums] = useState<SubsonicAlbum[]>([]);
    const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState<SubsonicAlbum[]>([]);
    const [recentlyPlayedAlbums, setRecentlyPlayedAlbums] = useState<SubsonicAlbum[]>([]);
    const [playlists, setPlaylists] = useState<SubsonicPlaylist[]>([]);
    const [artists, setArtists] = useState<SubsonicArtist[]>([]);
    const [randomSongs, setRandomSongs] = useState<SubsonicSong[]>([]);
    const [favoriteSongs, setFavoriteSongs] = useState<SubsonicSong[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Loads every alphabetical page while keeping the two recent album views server-ordered.
    const fetchLibrary = useCallback(async () => {
        if (!config) return;

        setIsLoading(true);
        try {
            const allAlbums: SubsonicAlbum[] = [];
            for (let page = 0; page < MAX_ALBUM_PAGES; page += 1) {
                const offset = page * ALBUM_PAGE_SIZE;
                const pageAlbums = await navidromeApi.getAlbumList2(
                    config,
                    'alphabeticalByName',
                    ALBUM_PAGE_SIZE,
                    offset,
                );
                allAlbums.push(...pageAlbums);
                if (pageAlbums.length < ALBUM_PAGE_SIZE) break;
            }

            const [
                nextRecentlyAddedAlbums,
                nextRecentlyPlayedAlbums,
                nextPlaylists,
                nextArtists,
                nextRandomSongs,
                nextFavoriteSongs,
            ] = await Promise.all([
                navidromeApi.getAlbumList2(config, 'newest', RECENT_ALBUM_LIMIT),
                navidromeApi.getAlbumList2(config, 'recent', RECENT_ALBUM_LIMIT),
                navidromeApi.getPlaylists(config),
                navidromeApi.getArtists(config),
                navidromeApi.getRandomSongs(config, 100),
                navidromeApi.getStarred2(config),
            ]);

            setAlbums(allAlbums);
            setRecentlyAddedAlbums(nextRecentlyAddedAlbums);
            setRecentlyPlayedAlbums(nextRecentlyPlayedAlbums);
            setPlaylists(nextPlaylists);
            setArtists(nextArtists);
            setRandomSongs(nextRandomSongs);
            setFavoriteSongs(nextFavoriteSongs);
        } finally {
            setIsLoading(false);
        }
    }, [config]);

    useEffect(() => {
        void fetchLibrary();
    }, [fetchLibrary]);

    return {
        albums,
        artists,
        config,
        favoriteSongs,
        fetchLibrary,
        isLoading,
        playlists,
        randomSongs,
        recentlyAddedAlbums,
        recentlyPlayedAlbums,
    };
};
