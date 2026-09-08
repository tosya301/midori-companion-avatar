import type { LocalSong } from '../types';

// Shared ordering rules for local-library views and their playback queues.
export type LocalSongFolderSortField = 'fileName' | 'fileLastModified';
export type LocalSongFolderSortDirection = 'asc' | 'desc';

const naturalCollator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
});

const compareText = (left: string, right: string): number => naturalCollator.compare(left, right);

const getSongName = (song: LocalSong): string => song.title?.trim() || song.fileName;

export const compareLocalSongsByFileName = (left: LocalSong, right: LocalSong): number =>
    compareText(left.fileName, right.fileName)
    || compareText(left.filePath, right.filePath);

const compareLocalSongsByLastModified = (left: LocalSong, right: LocalSong): number =>
    (left.fileLastModified ?? 0) - (right.fileLastModified ?? 0)
    || compareLocalSongsByFileName(left, right);

export const compareLocalFolderSongs = (
    left: LocalSong,
    right: LocalSong,
    field: LocalSongFolderSortField = 'fileName',
    direction: LocalSongFolderSortDirection = 'asc',
): number => {
    const result = field === 'fileLastModified'
        ? compareLocalSongsByLastModified(left, right)
        : compareLocalSongsByFileName(left, right);

    return direction === 'desc' ? -result : result;
};

export const compareLocalAlbumSongs = (left: LocalSong, right: LocalSong): number => {
    const leftHasTrackNumber = typeof left.trackNumber === 'number';
    const rightHasTrackNumber = typeof right.trackNumber === 'number';

    if (leftHasTrackNumber !== rightHasTrackNumber) {
        return leftHasTrackNumber ? -1 : 1;
    }

    if (leftHasTrackNumber && rightHasTrackNumber) {
        const discDifference = (left.discNumber ?? 1) - (right.discNumber ?? 1);
        if (discDifference !== 0) {
            return discDifference;
        }

        const trackDifference = left.trackNumber! - right.trackNumber!;
        if (trackDifference !== 0) {
            return trackDifference;
        }
    }

    return compareText(getSongName(left), getSongName(right))
        || compareLocalSongsByFileName(left, right);
};

export const sortLocalFolderSongs = (
    songs: LocalSong[],
    field: LocalSongFolderSortField = 'fileName',
    direction: LocalSongFolderSortDirection = 'asc',
): LocalSong[] => [...songs].sort((left, right) => compareLocalFolderSongs(left, right, field, direction));

export const sortLocalAlbumSongs = (songs: LocalSong[]): LocalSong[] =>
    [...songs].sort(compareLocalAlbumSongs);
