import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock3, Disc3, ListMusic, Loader2, RefreshCw, Settings2, Sparkles, User } from 'lucide-react';
import DesktopGrid3DSurface, { DesktopGrid3DAction } from '../../folia-grid/DesktopGrid3DSurface';
import { Theme } from '../../../types';
import { navidromeApi } from '../../../services/navidromeService';
import { createCoverPlaceholder, pickRandomSongCoverUrl } from '../../../utils/coverPlaceholders';
import {
    createNavidromeGridViewCollection,
    GridViewCollectionDescriptor,
    NavidromeGridViewCollectionType,
} from './gridViewCollectionAdapters';
import { useDebouncedFocusSync } from '../../../hooks/useDebouncedFocusSync';
import { useNavidromeGridLibrary } from './useNavidromeGridLibrary';

// src/components/app/home/NavidromeGrid3DView.tsx
// Desktop-only Navidrome Grid3D overview that opens GridView instead of legacy collection views.

type NaviSection = 'albums' | 'recently-added' | 'recently-played' | 'playlists' | 'artists';

interface NavidromeGrid3DViewProps {
    focusedAlbumIndex: number;
    setFocusedAlbumIndex: (index: number) => void;
    externalSelection?: any;
    onExternalSelectionHandled?: () => void;
    onOpenSettings?: () => void;
    onOpenGridView?: (collection: GridViewCollectionDescriptor) => void;
    theme: Theme;
    isDaylight: boolean;
    hasFloatingPlayer?: boolean;
    isInteractive?: boolean;
}

const RANDOM_PLAYLIST_ID = '__navi_random__';
const FAVORITES_PLAYLIST_ID = '__navi_favorites__';
const NAVIDROME_LAST_SECTION_KEY = 'folia_navidrome_last_section';
export const NavidromeGrid3DView: React.FC<NavidromeGrid3DViewProps> = ({
    focusedAlbumIndex,
    setFocusedAlbumIndex,
    externalSelection = null,
    onExternalSelectionHandled,
    onOpenSettings,
    onOpenGridView,
    theme,
    isDaylight,
    hasFloatingPlayer = false,
    isInteractive = true,
}) => {
    const { t } = useTranslation();
    const [localAlbumIndex, setLocalAlbumIndex] = useDebouncedFocusSync(focusedAlbumIndex, setFocusedAlbumIndex);
    const [section, setSection] = useState<NaviSection>(() => {
        try {
            const saved = localStorage.getItem(NAVIDROME_LAST_SECTION_KEY);
            if (
                saved === 'albums'
                || saved === 'recently-added'
                || saved === 'recently-played'
                || saved === 'playlists'
                || saved === 'artists'
            ) {
                return saved;
            }
        } catch (e) {
            console.warn('[NavidromeGrid3DView] Failed to restore navidrome last section:', e);
        }
        return 'albums';
    });
    const [focusedPlaylistIndex, setFocusedPlaylistIndex] = useState(0);
    const [focusedArtistIndex, setFocusedArtistIndex] = useState(0);
    const [focusedRecentlyAddedIndex, setFocusedRecentlyAddedIndex] = useState(0);
    const [focusedRecentlyPlayedIndex, setFocusedRecentlyPlayedIndex] = useState(0);
    const {
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
    } = useNavidromeGridLibrary();

    useEffect(() => {
        try {
            localStorage.setItem(NAVIDROME_LAST_SECTION_KEY, section);
        } catch (e) {
            console.warn('[NavidromeGrid3DView] Failed to save navidrome last section:', e);
        }
    }, [section]);

    const createAlbumItems = (sourceAlbums: typeof albums) => {
        if (!config) return [];
        return sourceAlbums.map(album => ({
            id: album.id,
            name: album.name,
            coverUrl: album.coverArt ? navidromeApi.getCoverArtUrl(config, album.coverArt, 600) : createCoverPlaceholder(album.name, 'playlist'),
            description: album.artist,
            trackCount: album.songCount,
            albumArtist: album.artist,
            albumYear: album.year,
            albumGenre: album.genre,
            albumDuration: album.duration,
        }));
    };

    const albumItems = useMemo(() => createAlbumItems(albums), [albums, config]);
    const recentlyAddedItems = useMemo(
        () => createAlbumItems(recentlyAddedAlbums),
        [config, recentlyAddedAlbums],
    );
    const recentlyPlayedItems = useMemo(
        () => createAlbumItems(recentlyPlayedAlbums),
        [config, recentlyPlayedAlbums],
    );

    const playlistItems = useMemo(() => {
        if (!config) return [];
        const getCoverArtUrl = (coverArtId: string, size?: number) => navidromeApi.getCoverArtUrl(config, coverArtId, size);
        const randomCover = pickRandomSongCoverUrl(randomSongs, getCoverArtUrl);
        const favoritesCover = pickRandomSongCoverUrl(favoriteSongs, getCoverArtUrl);

        return [
            {
                id: RANDOM_PLAYLIST_ID,
                name: t('navidrome.random') || 'Random',
                coverUrl: randomCover || createCoverPlaceholder(t('navidrome.random') || 'Random', 'playlist'),
                description: t('navidrome.randomDesc'),
                trackCount: randomSongs.length,
                type: 'playlist' as const,
            },
            {
                id: FAVORITES_PLAYLIST_ID,
                name: t('navidrome.favorites') || 'Favorites',
                coverUrl: favoritesCover || createCoverPlaceholder(t('navidrome.favorites') || 'Favorites', 'playlist'),
                description: t('navidrome.favorites'),
                trackCount: favoriteSongs.length,
                type: 'playlist' as const,
            },
            ...playlists.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                coverUrl: playlist.coverArt ? navidromeApi.getCoverArtUrl(config, playlist.coverArt, 600) : createCoverPlaceholder(playlist.name, 'playlist'),
                description: playlist.owner || t('home.playlists'),
                trackCount: playlist.songCount,
                editable: true,
                type: 'playlist' as const,
            })),
        ];
    }, [config, favoriteSongs, playlists, randomSongs, t]);

    const artistItems = useMemo(() => {
        if (!config) return [];
        return artists.map(artist => ({
            id: artist.id,
            name: artist.name,
            coverUrl: artist.coverArt
                ? navidromeApi.getCoverArtUrl(config, artist.coverArt, 600)
                : artist.artistImageUrl || createCoverPlaceholder(artist.name, 'artist'),
            description: t('navidrome.artists'),
            trackCount: artist.albumCount,
        }));
    }, [artists, config, t]);

    useEffect(() => {
        if (!externalSelection || !onOpenGridView) return;

        if (externalSelection.albumId) {
            const album = albumItems.find(item => item.id === externalSelection.albumId);
            if (album) {
                onOpenGridView(createNavidromeGridViewCollection(album, 'album'));
                onExternalSelectionHandled?.();
            }
        } else if (externalSelection.artistId) {
            const artist = artistItems.find(item => item.id === externalSelection.artistId);
            if (artist) {
                onOpenGridView(createNavidromeGridViewCollection(artist, 'artist'));
                onExternalSelectionHandled?.();
            }
        }
    }, [albumItems, artistItems, externalSelection, onExternalSelectionHandled, onOpenGridView]);

    const currentItems = section === 'albums'
        ? albumItems
        : section === 'recently-added'
            ? recentlyAddedItems
            : section === 'recently-played'
                ? recentlyPlayedItems
                : section === 'playlists'
                    ? playlistItems
                    : artistItems;
    const focusedIndex = section === 'albums'
        ? localAlbumIndex
        : section === 'recently-added'
            ? focusedRecentlyAddedIndex
            : section === 'recently-played'
                ? focusedRecentlyPlayedIndex
                : section === 'playlists'
                    ? focusedPlaylistIndex
                    : focusedArtistIndex;
    const setFocusedIndex = section === 'albums'
        ? setLocalAlbumIndex
        : section === 'recently-added'
            ? setFocusedRecentlyAddedIndex
            : section === 'recently-played'
                ? setFocusedRecentlyPlayedIndex
                : section === 'playlists'
                    ? setFocusedPlaylistIndex
                    : setFocusedArtistIndex;
    const emptyMessage = section === 'playlists'
        ? t('navidrome.noPlaylistsFound')
        : section === 'artists'
            ? t('navidrome.noArtistsFound')
            : t('navidrome.noAlbumsFound');

    const tabs: DesktopGrid3DAction[] = [
        {
            id: 'albums',
            label: t('navidrome.albums'),
            icon: <Disc3 size={13} />,
            active: section === 'albums',
            onClick: () => setSection('albums'),
        },
        {
            id: 'recently-added',
            label: t('navidrome.recentlyAdded'),
            icon: <Sparkles size={13} />,
            active: section === 'recently-added',
            onClick: () => setSection('recently-added'),
        },
        {
            id: 'recently-played',
            label: t('navidrome.recents'),
            icon: <Clock3 size={13} />,
            active: section === 'recently-played',
            onClick: () => setSection('recently-played'),
        },
        {
            id: 'playlists',
            label: t('home.playlists'),
            icon: <ListMusic size={13} />,
            active: section === 'playlists',
            onClick: () => setSection('playlists'),
        },
        {
            id: 'artists',
            label: t('navidrome.artists'),
            icon: <User size={13} />,
            active: section === 'artists',
            onClick: () => setSection('artists'),
        },
    ];

    const actions: DesktopGrid3DAction[] = [
        {
            id: 'refresh',
            label: t('options.audioOutputRefresh') || 'Refresh',
            icon: isLoading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />,
            disabled: isLoading,
            onClick: () => void fetchLibrary(),
            title: t('options.audioOutputRefresh') || 'Refresh',
        },
    ];

    if (!config) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 opacity-70">
                <Settings2 size={56} />
                <p className="text-sm">{t('navidrome.notConfigured') || 'Navidrome is not configured.'}</p>
                <button
                    onClick={onOpenSettings}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
                >
                    {t('navidrome.settings') || 'Navidrome Settings'}
                </button>
            </div>
        );
    }

    return (
        <DesktopGrid3DSurface
            title={section === 'albums'
                ? t('navidrome.albums')
                : section === 'recently-added'
                    ? t('navidrome.recentlyAdded')
                    : section === 'recently-played'
                        ? t('navidrome.recents')
                        : section === 'playlists'
                            ? t('home.playlists')
                            : t('navidrome.artists')}
            mapButtonLabel={t('home.allAlbums')}
            items={currentItems}
            focusedIndex={focusedIndex}
            onFocusedIndexChange={setFocusedIndex}
            onSelect={(item) => {
                const descriptorType: NavidromeGridViewCollectionType = section === 'albums'
                    || section === 'recently-added'
                    || section === 'recently-played'
                    ? 'album'
                    : section === 'artists'
                        ? 'artist'
                        : item.id === RANDOM_PLAYLIST_ID
                            ? 'random'
                            : item.id === FAVORITES_PLAYLIST_ID
                                ? 'favorites'
                                : 'playlist';
                onOpenGridView?.(createNavidromeGridViewCollection(item, descriptorType));
            }}
            tabs={tabs}
            actions={actions}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
            theme={theme}
            isDaylight={isDaylight}
            isInteractive={isInteractive}
            hasFloatingPlayer={hasFloatingPlayer}
            playlistVisibilityScope="navidrome"
        />
    );
};

export default NavidromeGrid3DView;
