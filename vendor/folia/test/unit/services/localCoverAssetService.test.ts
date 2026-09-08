import 'fake-indexeddb/auto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { appDatabase } from '../../../src/services/appDatabase';
import { assignImportedSongs } from '../../../src/services/localLibraryCatalogService';
import {
    materializeLocalSongCoverBlobs,
    prepareLocalCoverBlob,
    prepareLocalSongsCoverAssets,
    resetLocalCoverAssetRuntime,
} from '../../../src/services/localCoverAssetService';
import type { LocalSong } from '../../../src/types';
import { hashLocalCoverBlobAsync } from '../../../src/utils/localMetadataWorkerClient';

// test/unit/services/localCoverAssetService.test.ts
// Verifies content-addressed cover deduplication, failure isolation, and simple runtime materialization.

vi.mock('../../../src/utils/localMetadataWorkerClient', () => ({
    hashLocalCoverBlobAsync: vi.fn(),
}));

const buildSong = (id: string, embeddedCover?: Blob): LocalSong => ({
    id,
    fileName: `${id}.flac`,
    filePath: `Music/${id}.flac`,
    title: id,
    titleOrigin: 'import',
    importedMetadata: {
        title: id,
        titleSource: 'filename',
        artistNames: ['Artist'],
        albumName: 'Album',
    },
    duration: 1,
    fileSize: 1,
    mimeType: 'audio/flac',
    addedAt: 1,
    embeddedCover,
});

describe('localCoverAssetService', () => {
    beforeEach(async () => {
        resetLocalCoverAssetRuntime();
        await appDatabase.delete();
        await appDatabase.open();
        vi.mocked(hashLocalCoverBlobAsync).mockReset();
    });

    afterEach(async () => {
        vi.restoreAllMocks();
        await appDatabase.delete();
    });

    it('stores identical cover content once and leaves song batches with lightweight references', async () => {
        const assetId = `sha256:${'1'.repeat(64)}`;
        const coverA = new Blob(['same-cover'], { type: 'image/png' });
        const coverB = new Blob(['same-cover'], { type: 'image/png' });
        vi.mocked(hashLocalCoverBlobAsync).mockImplementation(async cover => ({ cover, coverAssetId: assetId }));
        const assetWrite = vi.spyOn(appDatabase.local_cover_assets, 'bulkPut');

        const prepared = await prepareLocalSongsCoverAssets([
            buildSong('one', coverA),
            buildSong('two', coverB),
        ]);
        await assignImportedSongs(prepared);

        expect(prepared.map(song => song.localCoverAssetId)).toEqual([assetId, assetId]);
        expect(prepared.every(song => song.embeddedCover instanceof Blob)).toBe(true);
        expect(assetWrite).toHaveBeenCalledTimes(1);
        expect(await appDatabase.local_cover_assets.count()).toBe(1);
        expect((await appDatabase.local_music.toArray()).every(song => song.embeddedCover === undefined)).toBe(true);
    });

    it('retains the legacy Blob and a retry marker when cover hashing fails', async () => {
        const cover = new Blob(['failed-cover'], { type: 'image/jpeg' });
        vi.mocked(hashLocalCoverBlobAsync).mockResolvedValue(null);

        const [prepared] = await prepareLocalSongsCoverAssets([buildSong('cover-write-failed', cover)]);
        await assignImportedSongs([prepared]);

        expect(prepared.localCoverAssetId).toBeUndefined();
        expect(prepared.localCoverNeedsAssetMigration).toBe(true);
        expect(prepared.embeddedCover).toBe(cover);
        expect(await appDatabase.local_music.get(prepared.id)).toBeTruthy();
        expect(await appDatabase.local_library_assignments.get(prepared.id)).toBeTruthy();
        expect((await appDatabase.local_music.get(prepared.id))?.embeddedCover).toBeInstanceOf(Blob);
        expect(await appDatabase.local_cover_assets.count()).toBe(0);
    });

    it('infers the MIME type for a folder cover File whose browser type is empty', async () => {
        const assetId = `sha256:${'4'.repeat(64)}`;
        const folderFile = new File(['folder-cover'], 'cover.jpg');
        vi.mocked(hashLocalCoverBlobAsync).mockImplementation(async cover => ({ cover, coverAssetId: assetId }));

        const result = await prepareLocalCoverBlob(folderFile);

        expect(result).toMatchObject({ assetId });
        expect(result?.blob.type).toBe('image/jpeg');
        expect(await appDatabase.local_cover_assets.count()).toBe(0);
    });

    it('rolls back a new asset when the owning song transaction fails', async () => {
        const assetId = `sha256:${'5'.repeat(64)}`;
        const cover = new Blob(['transaction-cover'], { type: 'image/png' });
        vi.mocked(hashLocalCoverBlobAsync).mockResolvedValue({ cover, coverAssetId: assetId });
        const [prepared] = await prepareLocalSongsCoverAssets([buildSong('rollback-cover', cover)]);
        vi.spyOn(appDatabase.local_music, 'bulkPut').mockRejectedValueOnce(new Error('forced song failure'));

        await expect(assignImportedSongs([prepared])).rejects.toThrow('forced song failure');

        expect(await appDatabase.local_cover_assets.get(assetId)).toBeUndefined();
        expect(await appDatabase.local_music.get(prepared.id)).toBeUndefined();
    });

    it('keeps the previous legacy cover when the asset-table write fails', async () => {
        const assetId = `sha256:${'8'.repeat(64)}`;
        const cover = new Blob(['legacy-cover'], { type: 'image/png' });
        vi.mocked(hashLocalCoverBlobAsync).mockResolvedValueOnce(null);
        const [legacySong] = await prepareLocalSongsCoverAssets([buildSong('legacy-rollback', cover)]);
        await assignImportedSongs([legacySong]);

        vi.mocked(hashLocalCoverBlobAsync).mockResolvedValueOnce({ cover, coverAssetId: assetId });
        const [updatedSong] = await prepareLocalSongsCoverAssets([{
            ...legacySong,
            embeddedMetadataVersion: 5,
        }]);
        vi.spyOn(appDatabase.local_cover_assets, 'bulkPut').mockRejectedValueOnce(new Error('quota exceeded'));

        await expect(assignImportedSongs([updatedSong])).rejects.toThrow('quota exceeded');

        const storedSong = await appDatabase.local_music.get(legacySong.id);
        expect(storedSong?.localCoverAssetId).toBeUndefined();
        expect(storedSong?.localCoverNeedsAssetMigration).toBe(true);
        expect(storedSong?.embeddedMetadataVersion).toBeUndefined();
        expect(storedSong?.embeddedCover).toBeInstanceOf(Blob);
        expect(await appDatabase.local_cover_assets.get(assetId)).toBeUndefined();
    });

    it('reads a shared asset once while materializing multiple local songs', async () => {
        const assetId = `sha256:${'3'.repeat(64)}`;
        const cover = new Blob(['shared-cover'], { type: 'image/webp' });
        await appDatabase.local_cover_assets.put({
            id: assetId,
            blob: cover,
            mimeType: cover.type,
            size: cover.size,
            createdAt: 1,
        });
        const assetRead = vi.spyOn(appDatabase.local_cover_assets, 'get');
        const songs = await materializeLocalSongCoverBlobs([
            { ...buildSong('one'), localCoverAssetId: assetId },
            { ...buildSong('two'), localCoverAssetId: assetId },
        ]);

        expect(assetRead).toHaveBeenCalledTimes(1);
        expect(songs.every(song => song.embeddedCover instanceof Blob)).toBe(true);
        expect(songs[0].embeddedCover).toBe(songs[1].embeddedCover);
    });

    it('clears a missing asset reference and marks the song for cover rehydration', async () => {
        const assetId = `sha256:${'6'.repeat(64)}`;

        const [song] = await materializeLocalSongCoverBlobs([{
            ...buildSong('missing-cover'),
            localCoverAssetId: assetId,
            localCoverSource: 'folder',
        }]);

        expect(song.localCoverAssetId).toBeUndefined();
        expect(song.localCoverSource).toBeUndefined();
        expect(song.localCoverNeedsAssetMigration).toBe(true);
    });
});
