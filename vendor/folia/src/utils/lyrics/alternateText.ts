import type { Line, LyricAlternateText, SubtitleContentMode } from '../../types';

// src/utils/lyrics/alternateText.ts
// Resolves normalized translation and romanization tracks without format-specific logic in renderers.

type AlternateTextSource = Pick<Line, 'translation' | 'romanization' | 'alternateTexts'>;

const findAlternateText = (
    alternateTexts: LyricAlternateText[] | undefined,
    role: Exclude<SubtitleContentMode, 'none'>,
): string | null => (
    alternateTexts?.find(entry => entry.role === role && entry.text.trim())?.text.trim() ?? null
);

export const resolveLyricAlternateText = (
    source: AlternateTextSource | null | undefined,
    mode: SubtitleContentMode,
): string | null => {
    if (!source || mode === 'none') {
        return null;
    }

    const directText = mode === 'translation' ? source.translation : source.romanization;
    return directText?.trim() || findAlternateText(source.alternateTexts, mode);
};

export const resolveSubtitleContentMode = (
    mode: SubtitleContentMode | undefined,
    legacyShowTranslation = true,
): SubtitleContentMode => mode ?? (legacyShowTranslation ? 'translation' : 'none');
