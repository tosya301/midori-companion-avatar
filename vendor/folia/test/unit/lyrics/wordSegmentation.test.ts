import { describe, expect, it } from 'vitest';
import {
    hasWordSegmentationOverride,
    isValidWordSegmentation,
    segmentLyricWords,
    segmentTextWords,
    segmentsFromBoundaries,
    getWordSegmentationKey,
} from '../../../src/utils/lyrics/wordSegmentation';
// test/unit/lyrics/wordSegmentation.test.ts
// v0.7.3 helper tests only: the legacy CJK renderer's optional editing integration is not ported.

describe('segmentTextWords', () => {
    it('returns offsets that slice the original text back out', () => {
        const text = 'Hello, world';
        const segments = segmentTextWords(text);

        expect(segments.map(part => part.segment).join('')).toBe(text);
        segments.forEach(part => {
            expect(text.slice(part.index, part.index + part.segment.length)).toBe(part.segment);
        });
    });

    it('marks punctuation as not word-like', () => {
        const segments = segmentTextWords('世界。');
        expect(segments.find(part => part.segment === '。')?.isWordLike).toBe(false);
    });

    it('falls back to graphemes when the runtime has no Segmenter', () => {
        // Intl.Segmenter is read-only, so it is redefined rather than assigned.
        const original = Intl.Segmenter;
        const restore = () => Object.defineProperty(Intl, 'Segmenter', {
            value: original,
            configurable: true,
            writable: true,
        });
        try {
            Object.defineProperty(Intl, 'Segmenter', { value: undefined, configurable: true, writable: true });
            const segments = segmentTextWords('世界');
            expect(segments.map(part => part.segment)).toEqual(['世', '界']);
        } finally {
            restore();
        }
    });

    it('returns nothing for empty text', () => {
        expect(segmentTextWords('')).toEqual([]);
    });
});

describe('segmentsFromBoundaries', () => {
    it('assigns running offsets', () => {
        expect(segmentsFromBoundaries(['我', '想要', '说'])).toEqual([
            { segment: '我', index: 0, isWordLike: true },
            { segment: '想要', index: 1, isWordLike: true },
            { segment: '说', index: 3, isWordLike: true },
        ]);
    });
});

describe('isValidWordSegmentation', () => {
    it('accepts boundaries that rebuild the text', () => {
        expect(isValidWordSegmentation('我想要', ['我', '想要'])).toBe(true);
    });

    it('rejects boundaries that drop, add or reorder characters', () => {
        expect(isValidWordSegmentation('我想要', ['我', '想'])).toBe(false);
        expect(isValidWordSegmentation('我想要', ['我', '想要', '！'])).toBe(false);
        expect(isValidWordSegmentation('我想要', ['想要', '我'])).toBe(false);
    });

    it('rejects empty and missing boundaries', () => {
        expect(isValidWordSegmentation('', [])).toBe(false);
        expect(isValidWordSegmentation('我', undefined)).toBe(false);
    });
});

describe('segmentLyricWords', () => {
    it('prefers a valid saved segmentation over Intl.Segmenter', () => {
        const segments = segmentLyricWords({ fullText: '我想要说', wordSegments: ['我想', '要说'] });
        expect(segments.map(part => part.segment)).toEqual(['我想', '要说']);
    });

    it('ignores a stale segmentation that no longer rebuilds the line', () => {
        const line = { fullText: '我想要说', wordSegments: ['我想', '要'] };
        expect(hasWordSegmentationOverride(line)).toBe(false);
        expect(segmentLyricWords(line).map(part => part.segment).join('')).toBe('我想要说');
    });

    // The prompt tells the model a space belongs to the segment before it; realignSegmentsToText
    // hands it to whichever slice sits next to it. Either way the consumers need it standing on
    // its own, the way Intl.Segmenter emits it.
    it('lifts trailing whitespace out into a segment of its own', () => {
        const segments = segmentLyricWords({
            fullText: "It's unbelievable",
            wordSegments: ["It's ", 'unbelievable'],
        });

        expect(segments.map(part => part.segment)).toEqual(["It's", ' ', 'unbelievable']);
        expect(segments.map(part => part.isWordLike)).toEqual([true, false, true]);
        expect(segments.map(part => part.index)).toEqual([0, 4, 5]);
    });

    it('lifts leading whitespace out into a segment of its own', () => {
        const segments = segmentLyricWords({
            fullText: "It's unbelievable",
            wordSegments: ["It's", ' unbelievable'],
        });

        expect(segments.map(part => part.segment)).toEqual(["It's", ' ', 'unbelievable']);
        expect(segments.map(part => part.index)).toEqual([0, 4, 5]);
    });

    it('keeps whitespace inside a segment, which is the one thing Intl.Segmenter cannot express', () => {
        const segments = segmentLyricWords({ fullText: 'New York City', wordSegments: ['New York', ' City'] });
        expect(segments.map(part => part.segment)).toEqual(['New York', ' ', 'City']);
    });

    it('leaves a whitespace-only boundary alone', () => {
        const segments = segmentLyricWords({ fullText: '把 你', wordSegments: ['把', ' ', '你'] });
        expect(segments.map(part => part.segment)).toEqual(['把', ' ', '你']);
    });

    it('keeps offsets slicing the original text back out after the split', () => {
        const fullText = '把回忆 拼好给你';
        const segments = segmentLyricWords({ fullText, wordSegments: ['把', '回忆 ', '拼好', '给', '你'] });

        expect(segments.map(part => part.segment).join('')).toBe(fullText);
        segments.forEach(part => {
            expect(fullText.slice(part.index, part.index + part.segment.length)).toBe(part.segment);
        });
    });
});

describe('getWordSegmentationKey', () => {
    it('is empty for a line on the default split, so adding it to a key changes nothing', () => {
        expect(getWordSegmentationKey({})).toBe('');
        expect(getWordSegmentationKey({ wordSegments: undefined })).toBe('');
    });

    it('separates splits that differ only in where a boundary falls', () => {
        expect(getWordSegmentationKey({ wordSegments: ['把', '回忆拼', '好'] }))
            .not.toBe(getWordSegmentationKey({ wordSegments: ['把', '回忆', '拼好'] }));
    });

    it('is stable for the same split', () => {
        expect(getWordSegmentationKey({ wordSegments: ['把', '回忆'] }))
            .toBe(getWordSegmentationKey({ wordSegments: ['把', '回忆'] }));
    });
});

