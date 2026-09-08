import type { CappellaConversationPack } from './conversationPack';
import kiss from './midori-assets/sticker-kiss.png';
import like from './midori-assets/sticker-like.png';
import cheer from './midori-assets/sticker-cheer.png';
import midori from './midori-assets/avatar-midori.png';
import naihei from './midori-assets/avatar-naihei.jpg';

// Private Midori embed assets. Standalone Folia retains its own preferences.
export const MIDORI_CAPPELLA_PACK: CappellaConversationPack = {
    left: { id: 'naihei', name: '奶黑', url: naihei, backgroundColor: '#26282d', backgroundSize: 'cover' },
    right: { id: 'midori', name: '阿绿', url: midori, backgroundColor: '#edf2e8', backgroundSize: '92%' },
    stickers: [
        { id: 'kiss', name: '飞吻爱心', url: kiss },
        { id: 'like', name: '笑着点赞', url: like },
        { id: 'cheer', name: '荧光棒应援', url: cheer },
    ],
};

export const getMidoriCappellaPack = (): CappellaConversationPack | undefined => {
    if (typeof window === 'undefined' || window.parent === window) return undefined;
    return new URLSearchParams(window.location.search).get('lyricStage') === '1'
        ? MIDORI_CAPPELLA_PACK
        : undefined;
};
