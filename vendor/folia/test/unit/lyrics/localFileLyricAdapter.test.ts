import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalFileLyricAdapter } from '@/utils/lyrics/adapters/LocalFileLyricAdapter';
import { parseLyricsAsync } from '@/utils/lyrics/workerClient';

// test/unit/lyrics/localFileLyricAdapter.test.ts
// Verifies local file lyric format hints are forwarded into the shared worker pipeline.

vi.mock('@/utils/lyrics/workerClient', () => ({
    parseLyricsAsync: vi.fn(),
}));

describe('LocalFileLyricAdapter', () => {
    beforeEach(() => {
        vi.mocked(parseLyricsAsync).mockReset();
        vi.mocked(parseLyricsAsync).mockResolvedValue({ lines: [] });
    });

    it.each(['krc', 'qrc', 'yrc', 'ttml'] as const)('forwards %s format hints', async (formatHint) => {
        await new LocalFileLyricAdapter().parse({
            type: 'local',
            lrcContent: '[1000,500]<0,500,0>Hello',
            formatHint,
        });

        expect(parseLyricsAsync).toHaveBeenCalledWith(
            formatHint,
            '[1000,500]<0,500,0>Hello',
            '',
            {},
            '',
        );
    });

    it('separates local main, translation, and romanization tracks conservatively', async () => {
        await new LocalFileLyricAdapter().parse({
            type: 'local',
            lrcContent: [
                '[00:01.00]君のことが好き',
                '[00:01.00]我喜欢你',
                '[00:01.00]Kimi no koto ga suki',
            ].join('\n'),
        });

        expect(parseLyricsAsync).toHaveBeenCalledWith(
            'lrc',
            '[00:01.00]君のことが好き',
            '[00:01.00]我喜欢你',
            {},
            '[00:01.00]Kimi no koto ga suki',
        );
    });
});
