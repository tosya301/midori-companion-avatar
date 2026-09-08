import { describe, expect, it } from 'vitest';
import { DEFAULT_TEMPERA_TUNING, type Theme } from '@/types';
import { loadPixi } from '@/components/visualizer/loadPixi';
import { createTemperaDifferenceFilter } from '@/components/visualizer/tempera/temperaDifferenceFilter';
import { buildTemperaBlocks } from '@/components/visualizer/tempera/temperaBlocks';
import { compileTemperaProgram } from '@/components/visualizer/tempera/temperaProgram';
import { resolveTemperaPalette } from '@/components/visualizer/tempera/temperaPalette';
import { TEMPERA_SHOT_KINDS } from '@/components/visualizer/tempera/types';
import { createSonnetLensFilter } from '@/components/visualizer/sonnet/sonnetLensFilter';
import { createSonnetPrintFilters } from '@/components/visualizer/sonnet/sonnetPrintFilters';
import { setTemperaTransitionBlur } from '@/components/visualizer/tempera/temperaSceneFilters';

// test/unit/visualizer/temperaPixiCompatibility.test.ts
// Real installed Pixi classes and shader preprocessing. Only the GPU capability query is
// stubbed in Node; these are not GPU compilation, pixel output, or browser acceptance tests.
const theme = {
    backgroundColor: '#101014', primaryColor: '#f2f2f0',
    accentColor: '#e1565f', secondaryColor: '#4f7fb8',
} as Theme;

describe('Tempera against the retained Pixi dependency', () => {
    it('constructs real inversion/post-process filters with highp and live blur attachment', async () => {
        const pixi = await loadPixi();
        const originalAdapter = pixi.DOMAdapter.get();
        const glCapabilityQuery = {
            isContextLost: () => false,
            FRAGMENT_SHADER: 35632, HIGH_FLOAT: 36338,
            getShaderPrecisionFormat: () => ({ precision: 23, rangeMin: 127, rangeMax: 127 }),
        };
        pixi.DOMAdapter.set({
            ...originalAdapter,
            createCanvas: () => ({ getContext: () => glCapabilityQuery }) as unknown as HTMLCanvasElement,
        });
        const filters: import('pixi.js').Filter[] = [];
        const container = new pixi.Container();
        try {
            const inversion = createTemperaDifferenceFilter(pixi, { ink: '#fff', paper: '#000' });
            const tint = createTemperaDifferenceFilter(pixi, {
                ink: '#fff', paper: '#000', inversion: false, tint: ['#f00', '#00f'],
            });
            const grain = new pixi.NoiseFilter({ noise: DEFAULT_TEMPERA_TUNING.postProcessGrain, seed: 0.9 });
            const lens = createSonnetLensFilter(pixi, {
                distortion: DEFAULT_TEMPERA_TUNING.postProcessLensDistortion, dispersion: 0,
            });
            const print = createSonnetPrintFilters(pixi, {
                rgbShift: 0, halftone: 0, vignette: DEFAULT_TEMPERA_TUNING.postProcessVignette,
            });
            const blur = new pixi.BlurFilter({ strength: 0, resolution: 0.75 });
            filters.push(inversion, tint, grain, lens, ...print, blur);
            expect(pixi.GlProgram.defaultOptions.preferredFragmentPrecision).toBe('highp');
            filters.forEach(filter => expect(filter).toBeInstanceOf(pixi.Filter));
            // BlurFilter is a two-pass composite with no program on its outer wrapper.
            [inversion, tint, grain, lens, ...print].forEach(filter => {
                expect(filter.glProgram?.fragment).toContain('precision highp float');
            });
            expect(inversion.blendRequired).toBe(true);
            expect(inversion.resolution).toBe('inherit');
            expect(inversion.glProgram?.fragment).toContain('uniform sampler2D uBackTexture');
            expect(tint.blendRequired).toBe(false);
            expect(tint.glProgram?.fragment).not.toContain('uBackTexture');
            expect(print).toHaveLength(1);
            const baseFilters = [grain, lens, ...print];
            container.filters = baseFilters;
            const scene = { container, baseFilters, transitionBlurFilter: blur, transitionBlurAttached: false };
            setTemperaTransitionBlur(scene, 5);
            expect(container.filters).toEqual([...baseFilters, blur]);
            setTemperaTransitionBlur(scene, 0);
            expect(container.filters).toEqual(baseFilters);
        } finally {
            container.filters = [];
            filters.forEach(filter => filter.destroy());
            container.destroy({ children: true });
            pixi.DOMAdapter.set(originalAdapter);
        }
    });

    it('builds and seeks every one of the 121 compositions using real Graphics/Container objects', async () => {
        const pixi = await loadPixi();
        const palette = resolveTemperaPalette(theme, DEFAULT_TEMPERA_TUNING);
        const program = compileTemperaProgram([
            { fullText: 'Hello world 世界', startTime: 0, endTime: 4, words: [] },
        ], 'pixi-compat');
        const shot = program.paragraphs[0].shots[0];
        const snapshot = (root: import('pixi.js').Container): number[][] => {
            const result: number[][] = [];
            const visit = (node: import('pixi.js').Container) => {
                result.push([node.x, node.y, node.alpha, node.scale.x, node.scale.y, node.rotation]);
                node.children.forEach(visit);
            };
            visit(root);
            return result;
        };
        expect(TEMPERA_SHOT_KINDS).toHaveLength(121);
        for (const kind of TEMPERA_SHOT_KINDS) {
            const view = buildTemperaBlocks(pixi, {
                kind, palette, decor: shot.decor, width: 1280, height: 720,
                seed: 4242, showDecor: true, flowAngle: shot.flowAngle,
            });
            try {
                expect(view.container, kind).toBeInstanceOf(pixi.Container);
                expect(view.container.children.length, kind).toBeGreaterThan(0);
                view.updateTime(2, 0, 4, 3.5);
                const middle = snapshot(view.container);
                expect(middle.flat().every(Number.isFinite), kind).toBe(true);
                view.updateTime(3.5, 0, 4, 3.5);
                view.updateTime(2, 0, 4, 3.5);
                expect(snapshot(view.container), kind).toEqual(middle);
            } finally {
                view.container.destroy({ children: true });
            }
        }
    });
});
