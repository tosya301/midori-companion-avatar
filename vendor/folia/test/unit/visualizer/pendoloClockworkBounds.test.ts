import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { motionValue } from 'framer-motion';
import { describe, expect, it } from 'vitest';
import PendoloClockworkCanvas, { type PendoloClockworkCanvasProps } from '@/components/visualizer/pendolo/PendoloClockworkCanvas';
import { resolvePendoloMotionProfile } from '@/components/visualizer/pendolo/pendoloMotionProfile';

// test/unit/visualizer/pendoloClockworkBounds.test.ts
// Test the public component's canvas box without exporting geometry internals or running a GPU.
const props: PendoloClockworkCanvasProps = {
    centerX: 500, centerY: 500, viewportWidth: 1920, viewportHeight: 1080,
    baseRadius: 100, lyricRingRadius: 300,
    escapementAngleMotionValue: motionValue(0),
    primaryTextColor: '#ffffff', accentTextColor: '#008800',
    showGearDecor: 'full', showCenterGradient: true,
    motionProfile: resolvePendoloMotionProfile('normal'),
};

const canvasBox = (overrides: Partial<PendoloClockworkCanvasProps> = {}) => {
    const html = renderToStaticMarkup(React.createElement(PendoloClockworkCanvas, { ...props, ...overrides }));
    const style = /style="([^"]+)"/.exec(html)?.[1] ?? '';
    const styles = Object.fromEntries(style.split(';').map(item => item.split(':')));
    return ['left', 'top', 'width', 'height'].map(key => Number.parseFloat(styles[key] ?? 'NaN'));
};

describe('Pendolo bounded clockwork canvas', () => {
    it('includes the gradient and the long right-facing lyric pointer without a full viewport allocation', () => {
        expect(canvasBox()).toEqual([319, 319, 497, 362]);
    });
    it('uses the smaller gear reach only when the gradient setting is off', () => {
        expect(canvasBox({ showCenterGradient: false })).toEqual([344, 344, 472, 312]);
    });
    it('clips the box to a small viewport rather than creating negative origins', () => {
        expect(canvasBox({ centerX: 20, centerY: 20, viewportWidth: 320, viewportHeight: 240, showCenterGradient: false }))
            .toEqual([0, 0, 320, 176]);
    });
    it('keeps a fully offscreen clockwork allocation nonnegative', () => {
        expect(canvasBox({ centerX: -1000, centerY: -1000, viewportWidth: 320, viewportHeight: 240, showCenterGradient: false }))
            .toEqual([0, 0, 0, 0]);
    });
    it('responds to a narrower host without changing the clockwork origin', () => {
        expect(canvasBox({ viewportWidth: 640 })).toEqual([319, 319, 321, 362]);
    });
    it('does not mount a canvas if every canvas feature is disabled', () => {
        expect(renderToStaticMarkup(React.createElement(PendoloClockworkCanvas, {
            ...props, showGearDecor: 'none', showCenterGradient: false, showCover: false,
        }))).toBe('');
    });
});
