export const MIDORI_AVATAR_VISIBLE_RIGHT_RATIO = 0.825;

export interface MonetEmbeddedPortraitLayoutInput {
    viewportWidth: number;
    avatarLeft: number;
    avatarWidth: number;
    portraitBaseCenterX: number;
    portraitOffsetX?: number;
}

/**
 * Centers Monet's portrait in the horizontal free space between Midori's
 * visible character edge and the host viewport's right edge.
 *
 * Midori's direction PNGs share a transparent canvas. Across all 25 frames,
 * the visible alpha edge ends at roughly 82.5% of that canvas width, so using
 * the DOM box's right edge would incorrectly treat transparent pixels as part
 * of the character.
 */
export const resolveMonetEmbeddedPortraitOffsetX = ({
    viewportWidth,
    avatarLeft,
    avatarWidth,
    portraitBaseCenterX,
    portraitOffsetX = 0,
}: MonetEmbeddedPortraitLayoutInput): number => {
    if (![viewportWidth, avatarLeft, avatarWidth, portraitBaseCenterX, portraitOffsetX].every(Number.isFinite)) {
        return 0;
    }
    if (viewportWidth <= 0 || avatarWidth <= 0) return 0;

    const avatarVisibleRight = avatarLeft + avatarWidth * MIDORI_AVATAR_VISIBLE_RIGHT_RATIO;
    const targetCenterX = (avatarVisibleRight + viewportWidth) / 2;
    return targetCenterX - portraitBaseCenterX - portraitOffsetX;
};
