// src/utils/coverUrl.ts

const NON_RESIZABLE_COVER_PROTOCOLS = new Set(['blob:', 'data:', 'file:', 'filesystem:']);

/**
 * Resolves a cover image URL to a smaller CDN variant when the source supports it.
 */
export const getSizedCoverUrl = (url: string | null | undefined, size: number): string => {
    const trimmedUrl = url?.trim() ?? '';
    if (!trimmedUrl) return '';

    const normalizedSize = Math.max(1, Math.round(size));

    try {
        const urlObj = new URL(trimmedUrl);
        if (NON_RESIZABLE_COVER_PROTOCOLS.has(urlObj.protocol)) {
            return trimmedUrl;
        }

        if (urlObj.hostname.includes('126.net')) {
            return `${urlObj.origin}${urlObj.pathname}?param=${normalizedSize}y${normalizedSize}`;
        }

        if (urlObj.pathname.includes('getCoverArt')) {
            urlObj.searchParams.set('size', String(normalizedSize));
            return urlObj.toString();
        }

        return trimmedUrl;
    } catch {
        if (trimmedUrl.includes('126.net')) {
            return `${trimmedUrl.split('?')[0]}?param=${normalizedSize}y${normalizedSize}`;
        }

        return trimmedUrl;
    }
};
