import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMidoriCappellaPack, MIDORI_CAPPELLA_PACK } from '@/components/visualizer/cappella/midoriConversationPack';

// The host-owned pack must never change standalone or unrelated iframe settings.
afterEach(() => vi.unstubAllGlobals());
describe('Midori Cappella conversation pack', () => {
    it('has the exact fixed identities and only the three chosen stickers', () => {
        expect(MIDORI_CAPPELLA_PACK.left.name).toBe('奶黑');
        expect(MIDORI_CAPPELLA_PACK.right.name).toBe('阿绿');
        expect(MIDORI_CAPPELLA_PACK.left.url).toContain('avatar-naihei.jpg');
        expect(MIDORI_CAPPELLA_PACK.stickers.map(x => x.id)).toEqual(['kiss', 'like', 'cheer']);
    });
    it('is absent without a browser', () => {
        vi.stubGlobal('window', undefined);
        expect(getMidoriCappellaPack()).toBeUndefined();
    });
    it('does not override standalone preferences even with the query', () => {
        const win: any = { location: { search: '?lyricStage=1' } };win.parent=win;vi.stubGlobal('window',win);
        expect(getMidoriCappellaPack()).toBeUndefined();
    });
    it('does not override unrelated embedded surfaces', () => {
        vi.stubGlobal('window',{ parent: {}, location: { search: '?visualizer=cappella' } });
        expect(getMidoriCappellaPack()).toBeUndefined();
    });
    it('supplies one stable pack in the actual Midori embed', () => {
        vi.stubGlobal('window',{ parent: {}, location: { search: '?lyricStage=1&visualizer=cappella' } });
        expect(getMidoriCappellaPack()).toBe(MIDORI_CAPPELLA_PACK);
        expect(getMidoriCappellaPack()).toBe(getMidoriCappellaPack());
    });
});
