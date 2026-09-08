import { Captions, Disc3, Image, SlidersHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// src/components/modal/newFeaturesRelease.ts

type NewFeatureCard = {
    id: string;
    icon: LucideIcon;
    daylightIconClassName: string;
    darkIconClassName: string;
};

type NewFeaturesRelease = {
    i18nKey: string;
    features: NewFeatureCard[];
};

// Defines the current release's cards; their localized text lives under i18nKey in every locale.
export const NEW_FEATURES_RELEASE: NewFeaturesRelease = {
    i18nKey: 'releaseNotes.v0_6_16',
    features: [
        { id: 'qqMusicProvider', icon: Disc3, daylightIconClassName: 'text-emerald-600', darkIconClassName: 'text-emerald-400' },
        { id: 'audioEqualizer', icon: SlidersHorizontal, daylightIconClassName: 'text-sky-600', darkIconClassName: 'text-sky-400' },
        { id: 'lyricApi', icon: Captions, daylightIconClassName: 'text-violet-600', darkIconClassName: 'text-violet-400' },
        { id: 'localSongCovers', icon: Image, daylightIconClassName: 'text-amber-600', darkIconClassName: 'text-amber-400' },
    ],
};
