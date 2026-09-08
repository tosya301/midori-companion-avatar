import type { LocalSong } from '../types';
import type { LocalCoverAsset, LocalCoverPayload } from '../types/localCover';
import { isBlob } from '../utils/blobGuards';
import { hashLocalCoverBlobAsync } from '../utils/localMetadataWorkerClient';
import { appDatabase } from './appDatabase';

// src/services/localCoverAssetService.ts
// Persists and deduplicates local cover assets, then materializes them for the existing library model.

const ASSET_ID_PATTERN = /^sha256:[0-9a-f]{64}$/;
const pendingReads = new Map<string, Promise<Blob | null>>();

export interface PreparedLocalCoverBlob {
  assetId?: string;
  blob: Blob;
}

export const resetLocalCoverAssetRuntime = (): void => {
  pendingReads.clear();
};

const normalizeLocalCoverBlob = (blob: Blob): Blob | null => {
  if (!isBlob(blob) || blob.size === 0) return null;
  if (blob.type.startsWith('image/')) return blob;
  if (typeof File === 'undefined' || !(blob instanceof File)) return null;
  const extension = blob.name.split('.').pop()?.toLowerCase();
  const mimeType = extension === 'png'
    ? 'image/png'
    : extension === 'jpg' || extension === 'jpeg'
      ? 'image/jpeg'
      : undefined;
  return mimeType ? new Blob([blob], { type: mimeType }) : null;
};

const isValidCoverPayload = (assetId: string, blob: unknown): blob is Blob => (
  ASSET_ID_PATTERN.test(assetId)
  && isBlob(blob)
  && blob.size > 0
  && blob.type.startsWith('image/')
);

// Normalizes and hashes a standalone cover without writing outside the owning song transaction.
export const prepareLocalCoverBlob = async (blob: Blob): Promise<PreparedLocalCoverBlob | null> => {
  const normalizedBlob = normalizeLocalCoverBlob(blob);
  if (!normalizedBlob) return null;
  try {
    const hashed = await hashLocalCoverBlobAsync(normalizedBlob);
    return hashed
      ? { assetId: hashed.coverAssetId, blob: hashed.cover }
      : { blob: normalizedBlob };
  } catch (error) {
    console.warn('[LocalCoverAsset] Failed to hash local cover; retaining the legacy Blob', error);
    return { blob: normalizedBlob };
  }
};

export const readLocalCoverAsset = async (assetId: string): Promise<Blob | null> => {
  if (!ASSET_ID_PATTERN.test(assetId)) return null;
  const pending = pendingReads.get(assetId);
  if (pending) return pending;

  const read = (async () => {
    const record = await appDatabase.local_cover_assets.get(assetId);
    if (!record || !isValidCoverPayload(record.id, record.blob)) {
      if (record) await appDatabase.local_cover_assets.delete(assetId);
      return null;
    }
    return record.blob;
  })().catch(error => {
    console.warn('[LocalCoverAsset] Failed to read local cover asset', error);
    return null;
  }).finally(() => {
    pendingReads.delete(assetId);
  });

  pendingReads.set(assetId, read);
  return read;
};

export const prepareLocalSongsCoverAssets = async (songs: LocalSong[]): Promise<LocalSong[]> => {
  return Promise.all(songs.map(async song => {
    if (!isBlob(song.embeddedCover)) return song;

    const normalizedBlob = normalizeLocalCoverBlob(song.embeddedCover);
    if (!normalizedBlob) {
      return {
        ...song,
        localCoverAssetId: undefined,
        localCoverSource: undefined,
        embeddedCover: undefined,
      };
    }

    if (song.localCoverAssetId && ASSET_ID_PATTERN.test(song.localCoverAssetId)) {
      return {
        ...song,
        localCoverNeedsAssetMigration: undefined,
        embeddedCover: normalizedBlob,
      };
    }

    try {
      const hashed = await hashLocalCoverBlobAsync(normalizedBlob);
      return hashed
        ? {
            ...song,
            localCoverAssetId: hashed.coverAssetId,
            localCoverSource: song.localCoverSource || 'embedded',
            localCoverNeedsAssetMigration: undefined,
            embeddedCover: hashed.cover,
          }
        : {
            ...song,
            localCoverAssetId: undefined,
            localCoverNeedsAssetMigration: true,
            embeddedCover: normalizedBlob,
          };
    } catch (error) {
      console.warn('[LocalCoverAsset] Failed to prepare local cover; retaining the legacy Blob', error);
      return {
        ...song,
        localCoverAssetId: undefined,
        localCoverNeedsAssetMigration: true,
        embeddedCover: normalizedBlob,
      };
    }
  }));
};

// Writes cover payloads and validates references inside the caller's Dexie transaction.
export const persistLocalSongCoverAssetsInTransaction = (
  songs: LocalSong[],
): LocalSong[] | Promise<LocalSong[]> => {
  const referencedAssetIds = Array.from(new Set(songs.flatMap(song => (
    song.localCoverAssetId && ASSET_ID_PATTERN.test(song.localCoverAssetId)
      ? [song.localCoverAssetId]
      : []
  ))));
  if (referencedAssetIds.length === 0) {
    return songs.map(song => {
      if (!song.localCoverAssetId) return song;
      const { localCoverAssetId: _assetId, localCoverSource: _source, ...fallbackSong } = song;
      return { ...fallbackSong, localCoverNeedsAssetMigration: true };
    });
  }

  return (async () => {
    const payloadByAssetId = new Map<string, LocalCoverPayload>();
    songs.forEach(song => {
      if (song.localCoverAssetId && isValidCoverPayload(song.localCoverAssetId, song.embeddedCover)) {
        payloadByAssetId.set(song.localCoverAssetId, {
          assetId: song.localCoverAssetId,
          blob: song.embeddedCover,
        });
      }
    });

    const existingAssets = await appDatabase.local_cover_assets.bulkGet(referencedAssetIds);
    const availableAssetIds = new Set<string>();
    const assetsToWrite: LocalCoverAsset[] = [];
    referencedAssetIds.forEach((assetId, index) => {
      const existing = existingAssets[index];
      if (existing && isValidCoverPayload(existing.id, existing.blob)) {
        availableAssetIds.add(assetId);
        return;
      }

      const payload = payloadByAssetId.get(assetId);
      if (!payload) return;
      assetsToWrite.push({
        id: assetId,
        blob: payload.blob,
        mimeType: payload.blob.type,
        size: payload.blob.size,
        createdAt: Date.now(),
      });
      availableAssetIds.add(assetId);
    });
    if (assetsToWrite.length > 0) {
      await appDatabase.local_cover_assets.bulkPut(assetsToWrite);
    }

    return songs.map(song => {
      if (!song.localCoverAssetId) return song;
      if (availableAssetIds.has(song.localCoverAssetId)) {
        return { ...song, localCoverNeedsAssetMigration: undefined };
      }
      const { localCoverAssetId: _assetId, localCoverSource: _source, ...fallbackSong } = song;
      return { ...fallbackSong, localCoverNeedsAssetMigration: true };
    });
  })();
};

export const materializeLocalSongCoverBlobs = async (songs: LocalSong[]): Promise<LocalSong[]> => {
  const assetIds = Array.from(new Set(songs.flatMap(song => (
    !isBlob(song.embeddedCover) && song.localCoverAssetId ? [song.localCoverAssetId] : []
  ))));
  const coverEntries = await Promise.all(assetIds.map(async assetId => (
    [assetId, await readLocalCoverAsset(assetId)] as const
  )));
  const coversByAssetId = new Map(coverEntries);

  return songs.map(song => {
    if (isBlob(song.embeddedCover) || !song.localCoverAssetId) return song;
    const embeddedCover = coversByAssetId.get(song.localCoverAssetId);
    if (embeddedCover) return { ...song, embeddedCover };
    const { localCoverAssetId: _assetId, localCoverSource: _source, ...fallbackSong } = song;
    return { ...fallbackSong, localCoverNeedsAssetMigration: true };
  });
};

export const loadLocalSongCoverBlob = async (song: LocalSong): Promise<Blob | null> => {
  if (isBlob(song.embeddedCover)) return song.embeddedCover;
  if (!song.localCoverAssetId) return null;
  return readLocalCoverAsset(song.localCoverAssetId);
};

export const deleteUnreferencedLocalCoverAssets = async (assetIds: Iterable<string>): Promise<void> => {
  const uniqueIds = Array.from(new Set(Array.from(assetIds).filter(id => ASSET_ID_PATTERN.test(id))));
  for (const assetId of uniqueIds) {
    const remaining = await appDatabase.local_music.where('localCoverAssetId').equals(assetId).count();
    if (remaining > 0) continue;
    await appDatabase.local_cover_assets.delete(assetId);
  }
};
