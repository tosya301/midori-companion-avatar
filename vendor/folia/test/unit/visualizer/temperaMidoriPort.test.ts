import React from 'react';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { motionValue } from 'framer-motion';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TEMPERA_TUNING, type Theme } from '@/types';
import type { VisualizerSharedProps } from '@/components/visualizer/definition';
import entry from '@/components/visualizer/tempera/entry';
import { getVisualizerRegistryEntry, hasVisualizerMode } from '@/components/visualizer/registry';
import { applyVisualizerTuning } from '@/components/visualizer/tuningRegistry';
import { TEMPERA_SHOT_KINDS } from '@/components/visualizer/tempera/types';
import en from '@/i18n/locales/en';
import zh from '@/i18n/locales/zh-CN';

// test/unit/visualizer/temperaMidoriPort.test.ts
// Exercises the legacy entry/registry/query seams, not a substitute GPU renderer.
const theme = {
    backgroundColor: '#101014', primaryColor: '#f2f2f0',
    accentColor: '#e1565f', secondaryColor: '#4f7fb8',
} as Theme;
const props: VisualizerSharedProps = {
    currentTime: motionValue(12), currentLineIndex: 0,
    lines: [{ fullText: 'Hello 世界', startTime: 10, endTime: 14, words: [] }],
    theme, audioPower: motionValue(0),
    audioBands: {
        bass: motionValue(0), lowMid: motionValue(0), mid: motionValue(0),
        vocal: motionValue(0), treble: motionValue(0),
    },
    seed: 'first-song', paused: true,
};

// Run the real query bootstrap with isolated browser/storage boundaries; never import App.
const runEmbedQuery = (query: string) => {
    const source = readFileSync(new URL('../../../src/index.tsx', import.meta.url), 'utf8');
    const body = source.slice(source.indexOf('const lyricStageParams ='), source.indexOf("void import('./bootstrap')"));
    const stored = new Map<string, string>();
    const classes = new Set<string>();
    vm.runInNewContext(body, {
        URLSearchParams,
        window: { location: { search: query } },
        document: {
            documentElement: { classList: { add: (name: string) => classes.add(name) } },
            body: { classList: { add: (name: string) => classes.add(name) } },
        },
        navigator: {},
        localStorage: { setItem: (key: string, value: string) => stored.set(key, value) },
        __APP_VERSION__: '0.6.16',
    });
    return { stored, classes };
};

describe('Tempera Midori default-renderer port', () => {
    it('preserves every v0.7.3 default without a transparency/minimal preset', () => {
        expect(DEFAULT_TEMPERA_TUNING).toEqual({
            cameraIntensity: 1, glyphMotion: 1, wholeLineLyrics: false,
            glyphSettleStretch: 0.5, colorMode: 'duo', showBlocks: true,
            showDecor: true, textInversion: true, layerImages: [],
            layerImageDepth: 'back', layerImageFrequency: 0.6,
            enableTransitions: true, textureResolution: 1.5,
            postProcessEnabled: true, postProcessTextureCompression: false,
            postProcessGrain: 0.2, postProcessContrast: 0, postProcessRgbShift: 0,
            postProcessVignette: 0.85, postProcessLensDistortion: 0.3,
        });
        expect(TEMPERA_SHOT_KINDS).toHaveLength(121);
        expect(new Set(TEMPERA_SHOT_KINDS).size).toBe(121);
    });

    it('is discovered by the existing registry without a settings adapter', () => {
        expect(hasVisualizerMode('tempera')).toBe(true);
        expect(getVisualizerRegistryEntry('tempera')).toBe(entry);
        expect(entry.tuningKind).toBe('none');
        expect(entry.renderSettingsPanel).toBeUndefined();
        expect(entry.resetSettings).toBeUndefined();
        expect(applyVisualizerTuning('tempera', props)).toBe(props);
        expect(en.ui.visualizerTempera).toBe('Tempera');
        expect(zh.ui.visualizerTempera).toBe('凝彩');
    });

    it('owns Suspense and preserves the clock/lines without keying the lazy renderer by song', () => {
        const first = entry.render(props) as React.ReactElement<{ children: React.ReactElement<VisualizerSharedProps>; fallback: null }>;
        const next = entry.render({ ...props, seed: 'next-song' }) as typeof first;
        expect(first.type).toBe(React.Suspense);
        expect(first.props.fallback).toBeNull();
        expect(first.key).toBeNull();
        expect(first.props.children.key).toBeNull();
        expect(next.props.children.key).toBeNull();
        expect(first.props.children.type).toBe(next.props.children.type);
        expect(first.props.children.props.currentTime).toBe(props.currentTime);
        expect(first.props.children.props.lines).toBe(props.lines);
        expect(first.props.children.props.temperaTuning).toBeUndefined();
        expect(next.props.children.props.seed).toBe('next-song');
    });

    it('accepts the embed query and rejects unknown modes without changing ordinary startup', () => {
        const accepted = runEmbedQuery('?lyricStage=1&visualizer=tempera');
        expect(accepted.stored.get('visualizer_mode')).toBe('tempera');
        expect(accepted.classes.has('lyric-stage-embed')).toBe(true);
        expect(runEmbedQuery('?lyricStage=1&visualizer=unknown').stored.has('visualizer_mode')).toBe(false);
        expect(runEmbedQuery('?visualizer=tempera').stored.size).toBe(0);
    });
});
