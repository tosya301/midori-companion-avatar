import { describe, expect, it, vi } from 'vitest';
import { applyAudioEqualizerSettings, connectAudioEqualizerGraph } from '@/services/audioEqualizerGraph';
import {
    AUDIO_EQUALIZER_BANDS,
    AUDIO_EQUALIZER_PRESETS,
    DEFAULT_AUDIO_EQUALIZER_SETTINGS,
    resolveAudioEqualizerSettings,
} from '@/utils/audioEqualizer';

// test/unit/utils/audioEqualizer.test.ts
// Verifies persisted equalizer normalization and the ten-node Web Audio chain.

const createAudioParam = () => ({
    value: 0,
    cancelScheduledValues: vi.fn(),
    setTargetAtTime: vi.fn(),
});

const createFilter = () => ({
    type: 'peaking',
    frequency: createAudioParam(),
    Q: createAudioParam(),
    gain: createAudioParam(),
    connect: vi.fn(),
});

describe('audio equalizer model', () => {
    it('normalizes malformed persisted values into ten safe bands', () => {
        const settings = resolveAudioEqualizerSettings({
            enabled: true,
            gains: [20, -20, '4', Number.NaN],
        });

        expect(settings.enabled).toBe(true);
        expect(settings.gains).toHaveLength(AUDIO_EQUALIZER_BANDS.length);
        expect(settings.gains.slice(0, 5)).toEqual([12, -12, 4, 0, 0]);
        expect(settings.preset).toBe('custom');
        expect(settings.customGains).toEqual(settings.gains);
    });

    it('returns an independent flat default for invalid input', () => {
        const first = resolveAudioEqualizerSettings(null);
        first.gains[0] = 6;
        const second = resolveAudioEqualizerSettings(null);

        expect(second).toEqual(DEFAULT_AUDIO_EQUALIZER_SETTINGS);
        expect(second.gains).not.toBe(DEFAULT_AUDIO_EQUALIZER_SETTINGS.gains);
        expect(second.customGains).not.toBe(DEFAULT_AUDIO_EQUALIZER_SETTINGS.customGains);
    });

    it('preserves a separate custom slot while a built-in preset is active', () => {
        const settings = resolveAudioEqualizerSettings({
            enabled: true,
            gains: AUDIO_EQUALIZER_PRESETS.lofi,
            preset: 'lofi',
            customGains: [3, 2, 1, 0, -1, -2, -3, -4, -5, -6],
        });

        expect(settings.preset).toBe('lofi');
        expect(settings.gains).toEqual(AUDIO_EQUALIZER_PRESETS.lofi);
        expect(settings.customGains).toEqual([3, 2, 1, 0, -1, -2, -3, -4, -5, -6]);
    });
});

describe('audio equalizer graph', () => {
    it('connects ten filters between the existing gain and analyser nodes', () => {
        const filters = AUDIO_EQUALIZER_BANDS.map(() => createFilter());
        const context = {
            sampleRate: 48_000,
            createBiquadFilter: vi.fn(() => filters.shift()),
        } as unknown as AudioContext;
        const input = { connect: vi.fn() } as unknown as AudioNode;
        const output = {} as AudioNode;
        const nodesRef = { current: [] as BiquadFilterNode[] };

        connectAudioEqualizerGraph({
            context,
            input,
            output,
            nodesRef,
            settings: {
                enabled: true,
                gains: Array.from({ length: 10 }, (_, index) => index - 5),
                preset: 'custom',
                customGains: Array(10).fill(0),
            },
        });

        expect(nodesRef.current).toHaveLength(10);
        expect(input.connect).toHaveBeenCalledWith(nodesRef.current[0]);
        expect(nodesRef.current[0].type).toBe('lowshelf');
        expect(nodesRef.current[9].type).toBe('highshelf');
        expect(nodesRef.current[9].connect).toHaveBeenCalledWith(output);
        expect(nodesRef.current[0].gain.value).toBe(-5);
        expect(nodesRef.current[9].gain.value).toBe(4);
    });

    it('smoothly bypasses every band when disabled', () => {
        const nodes = AUDIO_EQUALIZER_BANDS.map(() => createFilter()) as unknown as BiquadFilterNode[];
        const context = { currentTime: 2 } as AudioContext;

        applyAudioEqualizerSettings(context, nodes, {
            enabled: false,
            gains: Array(10).fill(6),
            preset: 'custom',
            customGains: Array(10).fill(6),
        });

        nodes.forEach(node => {
            expect(node.gain.cancelScheduledValues).toHaveBeenCalledWith(2);
            expect(node.gain.setTargetAtTime).toHaveBeenCalledWith(0, 2, 0.015);
        });
    });
});
