export type AudioEqualizerSettings = {
    enabled: boolean;
    gains: number[];
    preset: AudioEqualizerModeId;
    customGains: number[];
};

// src/utils/audioEqualizer.ts
// Defines the persisted ten-band equalizer model shared by UI and Web Audio runtime.

export const AUDIO_EQUALIZER_STORAGE_KEY = 'audio_equalizer_settings';
export const AUDIO_EQUALIZER_MIN_GAIN_DB = -12;
export const AUDIO_EQUALIZER_MAX_GAIN_DB = 12;

export const AUDIO_EQUALIZER_BANDS = [
    { frequency: 31, label: '31' },
    { frequency: 62, label: '62' },
    { frequency: 125, label: '125' },
    { frequency: 250, label: '250' },
    { frequency: 500, label: '500' },
    { frequency: 1000, label: '1k' },
    { frequency: 2000, label: '2k' },
    { frequency: 4000, label: '4k' },
    { frequency: 8000, label: '8k' },
    { frequency: 16000, label: '16k' },
] as const;

export type AudioEqualizerPresetId = 'flat' | 'lofi' | 'radio' | 'vinyl' | 'vocal' | 'bass';
export type AudioEqualizerModeId = AudioEqualizerPresetId | 'custom';

export const AUDIO_EQUALIZER_PRESETS: Record<AudioEqualizerPresetId, readonly number[]> = {
    flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lofi: [-4, -2, 0, 2, 3, 2, 0, -3, -7, -10],
    radio: [-12, -8, -3, 2, 4, 4, 2, -3, -8, -12],
    vinyl: [3, 2, 1, 0, -1, -1, -2, -3, -5, -7],
    vocal: [-2, -1, 0, 2, 4, 4, 3, 1, 0, -1],
    bass: [6, 5, 3, 1, 0, -1, -1, 0, 1, 2],
};

export const DEFAULT_AUDIO_EQUALIZER_SETTINGS: AudioEqualizerSettings = {
    enabled: false,
    gains: [...AUDIO_EQUALIZER_PRESETS.flat],
    preset: 'flat',
    customGains: [...AUDIO_EQUALIZER_PRESETS.flat],
};

const clampGain = (value: unknown): number => {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed)) {
        return 0;
    }
    return Math.min(AUDIO_EQUALIZER_MAX_GAIN_DB, Math.max(AUDIO_EQUALIZER_MIN_GAIN_DB, parsed));
};

const normalizeGains = (value: unknown): number[] => {
    const rawGains = Array.isArray(value) ? value : [];
    return AUDIO_EQUALIZER_BANDS.map((_, index) => clampGain(rawGains[index]));
};

const isPresetId = (value: unknown): value is AudioEqualizerPresetId => (
    typeof value === 'string' && Object.hasOwn(AUDIO_EQUALIZER_PRESETS, value)
);

const resolveModeId = (value: unknown, gains: number[]): AudioEqualizerModeId => {
    if (value === 'custom' || isPresetId(value)) {
        return value;
    }

    return (Object.entries(AUDIO_EQUALIZER_PRESETS) as Array<[AudioEqualizerPresetId, readonly number[]]>)
        .find(([, presetGains]) => presetGains.every((gain, index) => gain === gains[index]))?.[0]
        ?? 'custom';
};

// Normalizes untrusted persisted or imported data into exactly ten safe gain values.
export const resolveAudioEqualizerSettings = (value: unknown): AudioEqualizerSettings => {
    if (!value || typeof value !== 'object') {
        return {
            enabled: DEFAULT_AUDIO_EQUALIZER_SETTINGS.enabled,
            gains: [...DEFAULT_AUDIO_EQUALIZER_SETTINGS.gains],
            preset: DEFAULT_AUDIO_EQUALIZER_SETTINGS.preset,
            customGains: [...DEFAULT_AUDIO_EQUALIZER_SETTINGS.customGains],
        };
    }

    const candidate = value as Partial<AudioEqualizerSettings>;
    const gains = normalizeGains(candidate.gains);
    const preset = resolveModeId(candidate.preset, gains);
    return {
        enabled: candidate.enabled === true,
        gains,
        preset,
        customGains: Array.isArray(candidate.customGains)
            ? normalizeGains(candidate.customGains)
            : [...(preset === 'custom' ? gains : DEFAULT_AUDIO_EQUALIZER_SETTINGS.customGains)],
    };
};

export const readStoredAudioEqualizerSettings = (): AudioEqualizerSettings => {
    if (typeof window === 'undefined') {
        return resolveAudioEqualizerSettings(DEFAULT_AUDIO_EQUALIZER_SETTINGS);
    }

    const saved = window.localStorage.getItem(AUDIO_EQUALIZER_STORAGE_KEY);
    if (!saved) {
        return resolveAudioEqualizerSettings(DEFAULT_AUDIO_EQUALIZER_SETTINGS);
    }

    try {
        return resolveAudioEqualizerSettings(JSON.parse(saved));
    } catch {
        return resolveAudioEqualizerSettings(DEFAULT_AUDIO_EQUALIZER_SETTINGS);
    }
};

export const writeStoredAudioEqualizerSettings = (settings: AudioEqualizerSettings) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(AUDIO_EQUALIZER_STORAGE_KEY, JSON.stringify(settings));
    }
};
