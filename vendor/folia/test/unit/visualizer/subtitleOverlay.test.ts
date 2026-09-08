import { describe, expect, it } from 'vitest';
import { resolveVisualizerSubtitleOverlayContent } from '@/components/visualizer/VisualizerSubtitleOverlay';
import type { Line } from '@/types';

// test/unit/visualizer/subtitleOverlay.test.ts
// Locks the split between hiding the whole subtitle overlay and hiding only translation text.

describe('VisualizerSubtitleOverlay content resolution', () => {
    const activeLine: Line = {
        startTime: 1,
        endTime: 2,
        fullText: 'Hello',
        translation: '你好',
        romanization: 'Harō',
        words: [],
    };
    const nextLine: Line = {
        startTime: 2,
        endTime: 3,
        fullText: 'World',
        words: [],
    };

    it('hides the entire overlay when the legacy hide setting is enabled', () => {
        const content = resolveVisualizerSubtitleOverlayContent({
            showText: true,
            activeLine,
            recentCompletedLine: null,
            nextLines: [nextLine],
            hideTranslationSubtitle: true,
            showSubtitleTranslation: true,
        });

        expect(content.shouldRenderOverlay).toBe(false);
        expect(content.subtitleText).toBeNull();
        expect(content.upcomingLines).toEqual([]);
    });

    it('keeps upcoming-line hints when only translation text is hidden', () => {
        const content = resolveVisualizerSubtitleOverlayContent({
            showText: true,
            activeLine,
            recentCompletedLine: null,
            nextLines: [nextLine],
            hideTranslationSubtitle: false,
            showSubtitleTranslation: false,
        });

        expect(content.shouldRenderOverlay).toBe(true);
        expect(content.subtitleText).toBeNull();
        expect(content.upcomingLines).toEqual([nextLine]);
    });

    it('selects romanization without falling back to translation', () => {
        const romanized = resolveVisualizerSubtitleOverlayContent({
            showText: true,
            activeLine,
            recentCompletedLine: null,
            nextLines: [nextLine],
            hideTranslationSubtitle: false,
            showSubtitleTranslation: true,
            subtitleContentMode: 'romanization',
        });
        const missingRomanization = resolveVisualizerSubtitleOverlayContent({
            showText: true,
            activeLine: { ...activeLine, romanization: undefined },
            recentCompletedLine: null,
            nextLines: [nextLine],
            hideTranslationSubtitle: false,
            showSubtitleTranslation: true,
            subtitleContentMode: 'romanization',
        });

        expect(romanized.subtitleText).toBe('Harō');
        expect(romanized.upcomingLines).toEqual([]);
        expect(missingRomanization.subtitleText).toBeNull();
        expect(missingRomanization.upcomingLines).toEqual([nextLine]);
    });

    it('resolves romanization from alternate texts when the direct field is absent', () => {
        const content = resolveVisualizerSubtitleOverlayContent({
            showText: true,
            activeLine: {
                ...activeLine,
                romanization: undefined,
                alternateTexts: [{ role: 'romanization', text: 'Hello' }],
            },
            recentCompletedLine: null,
            nextLines: [],
            hideTranslationSubtitle: false,
            showSubtitleTranslation: true,
            subtitleContentMode: 'romanization',
        });

        expect(content.subtitleText).toBe('Hello');
    });
});
