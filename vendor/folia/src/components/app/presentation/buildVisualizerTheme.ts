import type { CSSProperties } from 'react';
import type { Line, Theme, VisualizerMode } from '../../../types';
import type { MediaId } from '../../../types/onlineMusic';

// src/components/app/presentation/buildVisualizerTheme.ts

// Builds the visualizer-facing theme and deterministic geometry seed.

// [lyric-stage patch] 流光 / 心象 / 云阶 / 浮名 read in the same Songti serif
// as the hub's own 云阶 template. This only fills a gap: a custom lyrics font
// picked in settings still wins, and the other modes keep their own stack.
const SONGTI_VISUALIZER_MODES = new Set<VisualizerMode>(['classic', 'cadenza', 'partita', 'fume']);
const SONGTI_FONT_FAMILY = 'Songti SC';

// [lyric-stage patch] Keyword colouring normally comes from an AI-generated
// theme, which this local stage never runs — leaving wordColors empty and the
// lyrics monochrome. Derive a rotating showcase palette from the current
// lyrics so every token has a follow-sing colour. An explicit theme palette
// (AI or user) still wins.
const SHOWCASE_WORD_PALETTE = ['#F6C453', '#F28BA8', '#A88BFA', '#63C7DA'];

const buildShowcaseWordColors = (lines: Line[] | undefined) => {
    if (!lines?.length) return [];

    const seen = new Set<string>();
    const tokens: string[] = [];
    for (const line of lines) {
        const candidates = line.words.length > 0
            ? line.words.map(word => word.text.trim())
            : [line.fullText.trim()];
        for (const token of candidates) {
            if (!token || seen.has(token)) continue;
            seen.add(token);
            tokens.push(token);
        }
    }

    return tokens.map((word, index) => ({
        word,
        color: SHOWCASE_WORD_PALETTE[index % SHOWCASE_WORD_PALETTE.length]!,
    }));
};

export const buildVisualizerTheme = ({
    appStyle,
    theme,
    lyricsFontStyle,
    lyricsFontWeight,
    lyricsCustomFontFamily,
    lyricsFontFallbackFamilies,
    subtitleFontInheritsLyrics,
    subtitleFontStyle,
    subtitleFontWeight,
    subtitleFontFamily,
    subtitleFontFallbackFamilies,
    currentSongId,
    visualizerMode,
    lines,
}: {
    appStyle: CSSProperties;
    theme: Theme;
    lyricsFontStyle: Theme['fontStyle'];
    lyricsFontWeight?: number | null;
    lyricsCustomFontFamily: string | null;
    lyricsFontFallbackFamilies?: string[];
    subtitleFontInheritsLyrics?: boolean;
    subtitleFontStyle?: Theme['fontStyle'];
    subtitleFontWeight?: number | null;
    subtitleFontFamily?: string | null;
    subtitleFontFallbackFamilies?: string[];
    currentSongId?: MediaId | null;
    visualizerMode: VisualizerMode;
    lines?: Line[];
}) => {
    const visualizerBackgroundColor = String(
        (appStyle as CSSProperties & { '--bg-color'?: string })['--bg-color'] ?? theme.backgroundColor,
    );
    const resolvedLyricsFontFamily = lyricsCustomFontFamily
        ?? (SONGTI_VISUALIZER_MODES.has(visualizerMode) ? SONGTI_FONT_FAMILY : undefined);
    const visualizerTheme: Theme = {
        ...theme,
        wordColors: theme.wordColors?.length ? theme.wordColors : buildShowcaseWordColors(lines),
        fontStyle: lyricsFontStyle,
        fontWeight: lyricsFontWeight ?? undefined,
        fontFamily: resolvedLyricsFontFamily,
        fontFamilyStack: lyricsFontFallbackFamilies,
        backgroundColor: visualizerBackgroundColor,
    };
    const visualizerSubtitleTheme: Theme = (subtitleFontInheritsLyrics ?? true)
        ? visualizerTheme
        : {
            ...theme,
            fontStyle: subtitleFontStyle ?? 'sans',
            fontWeight: subtitleFontWeight ?? undefined,
            fontFamily: subtitleFontFamily ?? undefined,
            fontFamilyStack: subtitleFontFallbackFamilies,
            backgroundColor: visualizerBackgroundColor,
        };

    return {
        visualizerTheme,
        visualizerSubtitleTheme,
        visualizerGeometrySeed: currentSongId ?? `geometry-${visualizerMode}`,
    };
};
