import type { CappellaEmojiImage } from '../../../types';
import type { CappellaAvatarImage } from './avatarImages';

// Optional, host-owned two-person identity pack. No globals or storage changes.
export interface CappellaConversationAvatar extends CappellaAvatarImage {
    backgroundColor?: string;
    backgroundSize?: string;
}
export interface CappellaConversationPack {
    left: CappellaConversationAvatar;
    right: CappellaConversationAvatar;
    stickers: CappellaEmojiImage[];
}
