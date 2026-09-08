import type { LocalSong } from '../types';
import { isBlob } from './blobGuards';

// src/utils/localSongCover.ts
// Detects both content-addressed and legacy local cover storage.

export const hasLocalSongCover = (song: LocalSong): boolean => (
  Boolean(song.localCoverAssetId) || isBlob(song.embeddedCover)
);
