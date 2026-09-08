import { splitCombinedTimeline } from './timelineSplitter';

export interface EmbeddedLrcNormalizationResult {
    mainText: string;
    translationText: string;
}

export interface EmbeddedUsltLikeTag {
    language?: string;
    descriptor?: string;
    text: string;
}

export interface EmbeddedStructuredLyricLine {
    start?: number;
    value?: string;
}

function formatStructuredTimestamp(totalMs: number): string {
    const safeTotalMs = Math.max(0, totalMs);
    const minutes = Math.floor(safeTotalMs / 60000);
    const seconds = Math.floor((safeTotalMs % 60000) / 1000);
    const ms = safeTotalMs % 1000;
    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');
    const xx = Math.floor(ms / 10).toString().padStart(2, '0');
    return `[${mm}:${ss}.${xx}]`;
}

function isTranslationUsltTag(tag: EmbeddedUsltLikeTag): boolean {
    const language = tag.language?.toLowerCase();
    const descriptor = tag.descriptor?.toLowerCase() || '';

    return language === 'chi'
        || language === 'zho'
        || descriptor.includes('translation')
        || descriptor.includes('trans');
}

export function normalizeEmbeddedLrcText(
    textContent?: string,
    translationContent?: string
): EmbeddedLrcNormalizationResult {
    if (!textContent) {
        return { mainText: '', translationText: '' };
    }

    if (translationContent) {
        return {
            mainText: textContent,
            translationText: translationContent
        };
    }

    const { main, trans } = splitCombinedTimeline(textContent);
    return {
        mainText: main,
        translationText: trans
    };
}

export function normalizeEmbeddedUsltTags(
    usltTags: EmbeddedUsltLikeTag[] | undefined
): EmbeddedLrcNormalizationResult {
    if (!usltTags?.length) {
        return { mainText: '', translationText: '' };
    }

    if (usltTags.length === 1) {
        return normalizeEmbeddedLrcText(usltTags[0].text);
    }

    const translationTag = usltTags.find(tag => isTranslationUsltTag(tag));
    if (translationTag) {
        return {
            mainText: usltTags.find(tag => tag !== translationTag)?.text || '',
            translationText: translationTag.text
        };
    }

    return {
        mainText: usltTags[0].text,
        translationText: usltTags[1].text
    };
}

export function normalizeEmbeddedStructuredLyrics(
    structuredLyrics: EmbeddedStructuredLyricLine[] | undefined
): EmbeddedLrcNormalizationResult {
    if (!structuredLyrics?.length) {
        return { mainText: '', translationText: '' };
    }

    const groups = new Map<number, string[]>();

    structuredLyrics.forEach(line => {
        const value = (line.value || '').trim();
        if (!value) {
            return;
        }

        const start = line.start || 0;
        const current = groups.get(start) || [];
        current.push(value);
        groups.set(start, current);
    });

    const mainLines: string[] = [];
    const translationLines: string[] = [];

    [...groups.entries()]
        .sort((a, b) => a[0] - b[0])
        .forEach(([start, values]) => {
            const prefix = formatStructuredTimestamp(start);
            if (values[0]) {
                mainLines.push(`${prefix}${values[0]}`);
            }
            if (values[1]) {
                translationLines.push(`${prefix}${values[1]}`);
            }
        });

    return {
        mainText: mainLines.join('\n'),
        translationText: translationLines.join('\n')
    };
}
