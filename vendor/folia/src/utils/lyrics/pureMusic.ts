const PURE_MUSIC_NOTICE = '纯音乐，请欣赏';
const LRC_TAG_PATTERN = /\[[^\]]*]/g;
const JSON_LINE_PATTERN = /^\s*\{.*}\s*$/;

export const hasNeteasePureMusicFlag = (source?: {
    pureMusic?: boolean;
    lrc?: { pureMusic?: boolean };
    yrc?: { pureMusic?: boolean };
    ytlrc?: { pureMusic?: boolean };
    tlyric?: { pureMusic?: boolean };
} | null): boolean => {
    if (!source) return false;

    return Boolean(
        source.pureMusic
        || source.lrc?.pureMusic
        || source.yrc?.pureMusic
        || source.ytlrc?.pureMusic
        || source.tlyric?.pureMusic
    );
};

const normalizeLyricText = (text?: string | null): string => {
    if (!text) return '';

    return text
        .replace(/\uFEFF/g, '')
        .split(/\r?\n/)
        .map(line => line.replace(LRC_TAG_PATTERN, '').trim())
        .filter(line => line && !JSON_LINE_PATTERN.test(line))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

export const isPureMusicLyricText = (text?: string | null): boolean => {
    const normalized = normalizeLyricText(text);
    return normalized.includes(PURE_MUSIC_NOTICE);
};
