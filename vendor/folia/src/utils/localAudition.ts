// Explicit per-document policy, never persisted in shared Folia settings.
// This selects ownership only; the provider still validates parent + origin.
export const isLocalAuditionEmbed = (): boolean => {
    if (typeof window === 'undefined' || window.parent === window) return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('lyricStage') === '1' && params.get('localAudition') === '1';
};
