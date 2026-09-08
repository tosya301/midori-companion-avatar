import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as pixi from 'pixi.js';
import { DEFAULT_SONNET_TUNING, type Theme } from '@/types';
import { buildSonnetScene } from '@/components/visualizer/sonnet/sonnetSceneBuilder';
import { createSonnetGlitchEffect } from '@/components/visualizer/sonnet/sonnetGlitchFilter';
import { loadPixi } from '@/components/visualizer/loadPixi';
import type { SonnetParagraph } from '@/components/visualizer/sonnet/types';

// test/unit/visualizer/sonnetRuntimeBackport.test.ts
// Real installed Pixi classes and shader preprocessing; only the GPU capability query is stubbed.
// This proves compatibility with the retained dependency, not NVIDIA rendering correctness.
const adapter = pixi.DOMAdapter.get();
const precision = pixi.GlProgram.defaultOptions.preferredFragmentPrecision;
const theme = {
    name: '', description: '', primaryColor: '#ffffff', secondaryColor: '#aabbcc',
    accentColor: '#778899', backgroundColor: '#112233', fontStyle: 'sans',
    animationIntensity: 'normal', lyricsIcons: [],
} as unknown as Theme;
const paragraph: SonnetParagraph = {
    id: 'backport', kind: 'verse', boundary: 'song-start', startTime: 0, endTime: 10,
    lines: [], shots: [], transitionOut: null,
};
const build = (overrides: Record<string, unknown> = {}, selectedParagraph = paragraph) => buildSonnetScene(pixi, {
    programSeed: 'backport', host: { clientWidth: 1280, clientHeight: 720 } as HTMLDivElement,
    theme, tuning: { ...DEFAULT_SONNET_TUNING, showOnlyText: true, enableTransitions: true },
    lyricsFontScale: 1, staticMode: false, transparentBackground: false, ...overrides,
}, new Map(), selectedParagraph);
const dispose = (scene: ReturnType<typeof build>) => {
    scene.container.filters = null;
    scene.postProcessFilters.forEach(filter => filter.destroy());
    scene.container.destroy({ children: true });
};

beforeAll(() => {
    pixi.DOMAdapter.set({ ...adapter, createCanvas: () => ({
        getContext: () => ({ isContextLost: () => false, getShaderPrecisionFormat: () => ({ precision: 23 }) }),
    }) as unknown as HTMLCanvasElement });
});
afterAll(() => {
    pixi.DOMAdapter.set(adapter);
    pixi.GlProgram.defaultOptions.preferredFragmentPrecision = precision;
});

describe('Sonnet minimal runtime backport', () => {
    it('preprocesses the actual Pixi NoiseFilter as highp before filter construction', async () => {
        const loaded = await loadPixi();
        expect(loaded.GlProgram).toBe(pixi.GlProgram);
        const noise = new loaded.NoiseFilter();
        expect(noise.glProgram?.fragment).toMatch(/precision highp float/);
        noise.destroy();
    });
    it('keeps a live glitch filter at zero padding as its uniforms change', () => {
        const effect = createSonnetGlitchEffect(pixi);
        expect(effect.filter.padding).toBe(0);
        effect.filter.enabled = true;
        effect.update(0.9, 0.95);
        expect(effect.filter.padding).toBe(0);
        effect.filter.destroy();
    });
    it('keeps paragraph-transition blur padding at zero while strength ramps', () => {
        const scene = build();
        expect(scene.transitionBlurFilter).not.toBeNull();
        for (const strength of [0, 1, 8, 20]) {
            scene.transitionBlurFilter!.strength = strength;
            expect(scene.transitionBlurFilter!.padding).toBe(0);
        }
        dispose(scene);
    });
    it('still omits transition filters in static mode', () => {
        const scene = build({ staticMode: true });
        expect(scene.transitionBlurFilter).toBeNull();
        expect(scene.transitionGlitchEffect).toBeNull();
        dispose(scene);
    });
    it('does not attach a fixed bounds mask to a mask-reveal shot', () => {
        const scene = build({ staticMode: true }, { ...paragraph, shots: [{
            id: 'mask', kind: 'mask-reveal', startTime: 0, endTime: 10, lineIndices: [], cues: [],
            camera: { x: 0, y: 0, zoom: 1, rotation: 0 },
        }] });
        expect(scene.shots[0].container.mask).toBeUndefined();
        dispose(scene);
    });
    it('removes only the full-scene wash in transparent mode while retaining MG marks', () => {
        const tuning = { ...DEFAULT_SONNET_TUNING, showOnlyText: false, showBackgroundMg: true, enableTransitions: false };
        const opaque = build({ tuning, staticMode: true });
        const transparent = build({ tuning, staticMode: true, transparentBackground: true });
        const opaqueBg = opaque.container.children[0];
        const transparentBg = transparent.container.children[0];
        expect(transparentBg.children.length).toBeGreaterThan(0);
        expect(opaqueBg.children.length - transparentBg.children.length).toBe(1);
        expect(opaqueBg.children[0].getBounds().rectangle.width).toBe(1280);
        dispose(opaque);
        dispose(transparent);
    });
});
