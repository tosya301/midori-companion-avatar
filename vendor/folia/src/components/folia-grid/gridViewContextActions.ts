import type { SongResult } from '../../types';
import { isSongUnavailable } from '../../services/onlineMusic/songAvailability';

// src/components/folia-grid/gridViewContextActions.ts

export type GridViewContextItem = {
    rawTrack?: SongResult;
};

// Resolves the exact playable track set represented by the current GridView context.
export const resolveGridViewContextTracks = (
    visibleItems: readonly GridViewContextItem[],
    allPlayableTracks: SongResult[],
    isFilterActive: boolean
): SongResult[] => {
    if (!isFilterActive) {
        return allPlayableTracks;
    }

    return visibleItems.flatMap(item => (
        item.rawTrack && !isSongUnavailable(item.rawTrack)
            ? [item.rawTrack]
            : []
    ));
};
