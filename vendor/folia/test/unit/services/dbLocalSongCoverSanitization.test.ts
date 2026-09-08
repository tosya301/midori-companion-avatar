import 'fake-indexeddb/auto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { appDatabase } from '../../../src/services/appDatabase';
import { getLocalSongs, saveLocalSongs } from '../../../src/services/db';
import type { LocalSong } from '../../../src/types';

// test/unit/services/dbLocalSongCoverSanitization.test.ts
// Verifies real Dexie persistence never keeps non-Blob local cover payloads.

const buildLocalSong = (patch: Partial<LocalSong> & Pick<LocalSong, 'id'>): LocalSong => {
    const { id, ...songPatch } = patch;
    return {
        id,
        fileName: `${id}.mp3`,
        filePath: `/music/${id}.mp3`,
        title: id,
        titleOrigin: 'import',
        importedMetadata: { title: id, titleSource: 'filename', artistNames: [] },
        duration: 180000,
        fileSize: 1024,
        mimeType: 'audio/mpeg',
        addedAt: 1,
        ...songPatch,
    };
};

describe('db local song cover sanitization', () => {
    beforeEach(async () => {
        await appDatabase.delete();
        await appDatabase.open();
    });

    afterEach(async () => {
        await appDatabase.delete();
    });

    it('does not persist non-Blob embedded covers', async () => {
        await saveLocalSongs([
            buildLocalSong({
                id: 'bad-cover-song',
                embeddedCover: { size: 20, type: 'image/png' } as unknown as Blob,
            }),
        ]);

        expect((await appDatabase.local_music.get('bad-cover-song'))?.embeddedCover).toBeUndefined();
    });

    it('sanitizes non-Blob embedded covers when reading local songs and writes them back', async () => {
        await appDatabase.local_music.put(buildLocalSong({
            id: 'bad-cover-song',
            embeddedCover: { size: 20, type: 'image/png' } as unknown as Blob,
        }));

        const songs = await getLocalSongs();
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(songs[0]?.embeddedCover).toBeUndefined();
        expect((await appDatabase.local_music.get('bad-cover-song'))?.embeddedCover).toBeUndefined();
    });

    it('persists new songs with an asset reference instead of duplicating the cover Blob', async () => {
        const assetId = `sha256:${'a'.repeat(64)}`;
        const embeddedCover = new Blob(['cover'], { type: 'image/png' });
        await appDatabase.local_cover_assets.put({
            id: assetId,
            blob: embeddedCover,
            mimeType: embeddedCover.type,
            size: embeddedCover.size,
            createdAt: 1,
        });

        await saveLocalSongs([buildLocalSong({
            id: 'asset-cover-song',
            localCoverAssetId: assetId,
            localCoverSource: 'embedded',
            embeddedCover,
        })]);

        expect(await appDatabase.local_music.get('asset-cover-song')).toMatchObject({
            localCoverAssetId: assetId,
            localCoverSource: 'embedded',
        });
        expect((await appDatabase.local_music.get('asset-cover-song'))?.embeddedCover).toBeUndefined();
    });

    it('materializes asset references as runtime cover Blobs while loading the local-song catalog', async () => {
        const assetId = `sha256:${'b'.repeat(64)}`;
        const cover = new Blob(['runtime-cover'], { type: 'image/png' });
        await appDatabase.local_cover_assets.put({
            id: assetId,
            blob: cover,
            mimeType: cover.type,
            size: cover.size,
            createdAt: 1,
        });
        await appDatabase.local_music.put(buildLocalSong({
            id: 'runtime-cover-song',
            localCoverAssetId: assetId,
        }));
        const assetRead = vi.spyOn(appDatabase.local_cover_assets, 'get');

        const songs = await getLocalSongs();

        expect(assetRead).toHaveBeenCalledOnce();
        expect(songs[0]?.embeddedCover).toBeInstanceOf(Blob);
        expect(songs[0]?.embeddedCover?.type).toBe('image/png');
    });
});
