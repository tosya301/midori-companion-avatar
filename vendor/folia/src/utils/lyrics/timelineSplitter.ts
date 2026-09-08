export const hasCjkScript = (text: string): boolean => /[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]/u.test(text);

export const isRomanizationCandidate = (text: string): boolean => {
    const lyricText = text.replace(/\[[^\]]*\]|<[^>]*>/gu, '');
    const letters = lyricText.match(/[A-Za-z\u00c0-\u024f]/gu) || [];
    const nonWhitespace = lyricText.match(/\S/gu) || [];
    return letters.length >= 2 && letters.length / Math.max(nonWhitespace.length, 1) >= 0.45 && !hasCjkScript(text);
};

export function splitCombinedTimeline(rawText: string): { main: string, trans: string, romanization: string } {
    if (!rawText) return { main: '', trans: '', romanization: '' };

    const timeRegex = /\[(\d{2}):(\d{2})[.:](\d{2,3})\]/g;
    const enhancedAngleRegex = /<\d{2}:\d{2}[.:]\d{2,3}>/;
    const enhancedAngleTimestampRegex = /<\d{2}:\d{2}[.:]\d{2,3}>/g;
    const enhancedBracketRegex = /^\s*\[\d{2}:\d{2}[.:]\d{2,3}\][^\[\]\n]+(?:\[\d{2}:\d{2}[.:]\d{2,3}\][^\[\]\n]*)+$/;
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

    const extracted: Array<{
        raw: string,
        timestampSignature: string,
        startTimestamp: string,
        isEnhancedLike: boolean,
    }> = [];

    for (const line of lines) {
        timeRegex.lastIndex = 0;
        let match: RegExpExecArray | null;
        let timestampSignature = '';
        let startTimestamp = '';

        while ((match = timeRegex.exec(line)) !== null) {
            if (!startTimestamp) {
                startTimestamp = match[0];
            }
            timestampSignature += match[0];
        }

        if (!timestampSignature) {
            enhancedAngleTimestampRegex.lastIndex = 0;
            while ((match = enhancedAngleTimestampRegex.exec(line)) !== null) {
                if (!startTimestamp) {
                    startTimestamp = match[0];
                }
                timestampSignature += match[0];
            }
        }

        if (timestampSignature) {
            const hasMultipleBracketTimestamps = line.indexOf('[', 1) !== -1;

            extracted.push({
                raw: line,
                timestampSignature,
                startTimestamp,
                isEnhancedLike: enhancedAngleRegex.test(line) || (hasMultipleBracketTimestamps && enhancedBracketRegex.test(line))
            });
        } else {
            extracted.push({
                raw: line,
                timestampSignature: '',
                startTimestamp: '',
                isEnhancedLike: false
            });
        }
    }

    const mainLines: string[] = [];
    const transLines: string[] = [];
    const romanizationLines: string[] = [];
    let isCombined = false;
    const sharesTimeline = (left: typeof extracted[number], right: typeof extracted[number]): boolean => (
        left.timestampSignature !== '' && left.timestampSignature === right.timestampSignature
    ) || (
        left.startTimestamp !== ''
        && left.startTimestamp === right.startTimestamp
        && (left.isEnhancedLike || right.isEnhancedLike)
    );
    
    for (let i = 0; i < extracted.length; i++) {
        const current = extracted[i];

        const group = [current];
        while (i + 1 < extracted.length && sharesTimeline(current, extracted[i + 1])) {
            group.push(extracted[i + 1]);
            i++;
        }

        if (group.length > 1) {
            const [main, ...alternates] = group;
            const romanizationCandidates = hasCjkScript(main.raw)
                ? alternates.filter(candidate => isRomanizationCandidate(candidate.raw))
                : [];
            const romanization = romanizationCandidates.length === 1 ? romanizationCandidates[0] : undefined;
            const translation = alternates.find(candidate => candidate !== romanization);

            mainLines.push(main.raw);
            if (translation) transLines.push(translation.raw);
            if (romanization) romanizationLines.push(romanization.raw);
            isCombined = true;
        } else {
            mainLines.push(current.raw);
        }
    }

    if (isCombined) {
        return {
            main: mainLines.join('\n'),
            trans: transLines.join('\n'),
            romanization: romanizationLines.join('\n')
        };
    } else {
        return { main: rawText, trans: '', romanization: '' };
    }
}
