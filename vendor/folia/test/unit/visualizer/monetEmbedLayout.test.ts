import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
    MIDORI_AVATAR_VISIBLE_RIGHT_RATIO,
    resolveMonetEmbeddedPortraitOffsetX,
} from '../../../src/components/visualizer/monet/monetEmbedLayout';

describe('Monet Midori embed portrait layout', () => {
    it('extends the embedded Monet row to the host viewport instead of clipping at 1520px', () => {
        const testDirectory = path.dirname(fileURLToPath(import.meta.url));
        const source = fs.readFileSync(
            path.resolve(testDirectory, '../../../src/components/visualizer/monet/VisualizerMonet.tsx'),
            'utf8',
        );

        expect(source).toContain("isLyricStageEmbed\n                        ? 'flex h-full w-full flex-row items-center overflow-visible'");
        expect(source).toContain(": 'flex h-full w-full max-w-[1520px] flex-row items-center overflow-hidden'");
    });

    it('centers the portrait between Midori visible alpha edge and the viewport right edge', () => {
        const viewportWidth = 1280;
        const avatarLeft = 405;
        const avatarWidth = 447;
        const portraitWidth = 335;
        const portraitBaseLeft = 780;
        const portraitBaseCenterX = portraitBaseLeft + portraitWidth / 2;

        const offset = resolveMonetEmbeddedPortraitOffsetX({
            viewportWidth,
            avatarLeft,
            avatarWidth,
            portraitBaseCenterX,
        });

        const avatarVisibleRight = avatarLeft + avatarWidth * MIDORI_AVATAR_VISIBLE_RIGHT_RATIO;
        const portraitLeft = portraitBaseLeft + offset;
        const portraitRight = portraitLeft + portraitWidth;

        expect(offset).toBeCloseTo(79.3875, 4);
        expect(portraitLeft - avatarVisibleRight).toBeCloseTo(viewportWidth - portraitRight, 0);
    });

    it('keeps the host centering offset separate from a saved Folia portrait offset', () => {
        expect(resolveMonetEmbeddedPortraitOffsetX({
            viewportWidth: 1280,
            avatarLeft: 405,
            avatarWidth: 447,
            portraitBaseCenterX: 947.5,
            portraitOffsetX: -25,
        })).toBeCloseTo(104.3875, 4);
    });

    it('returns a safe neutral offset for invalid geometry', () => {
        expect(resolveMonetEmbeddedPortraitOffsetX({
            viewportWidth: 0,
            avatarLeft: 0,
            avatarWidth: 0,
            portraitBaseCenterX: 0,
        })).toBe(0);
    });
});
