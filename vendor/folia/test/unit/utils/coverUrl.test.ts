import { describe, expect, it } from 'vitest';
import { getSizedCoverUrl } from '@/utils/coverUrl';

// test/unit/utils/coverUrl.test.ts

describe('coverUrl utilities', () => {
    it('keeps blob cover URLs unchanged', () => {
        const blobUrl = 'blob:http://localhost:3000/1a56d3d0-2d9d-4f99-be5b-93f3dede5938';

        expect(getSizedCoverUrl(blobUrl, 50)).toBe(blobUrl);
    });

    it('adds Netease CDN size parameters', () => {
        expect(getSizedCoverUrl('https://p1.music.126.net/abc/109951.jpg?param=300y300', 50))
            .toBe('https://p1.music.126.net/abc/109951.jpg?param=50y50');
    });

    it('sets Navidrome cover art size parameters', () => {
        expect(getSizedCoverUrl('https://music.test/rest/getCoverArt.view?id=cover-1&v=1', 150))
            .toBe('https://music.test/rest/getCoverArt.view?id=cover-1&v=1&size=150');
    });
});
