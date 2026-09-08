import { createRequire } from 'module';
import { describe, expect, it } from 'vitest';

// test/unit/electron/windowPlaybackHandoff.test.ts
// Locks down the short-lived main-process playback handoff store.

const require = createRequire(import.meta.url);
const { createWindowPlaybackHandoffStore } = require('../../../electron/windowPlaybackHandoff.cjs') as {
    createWindowPlaybackHandoffStore: (options?: {
        ttlMs?: number;
        now?: () => number;
    }) => {
        clear: () => void;
        consume: () => unknown | null;
        peek: () => unknown | null;
        save: (handoff: unknown) => boolean;
    };
};

describe('windowPlaybackHandoffStore', () => {
    it('consumes a saved handoff only once', () => {
        let now = 1000;
        const store = createWindowPlaybackHandoffStore({ ttlMs: 5000, now: () => now });
        const handoff = { version: 1, capturedAt: now };

        expect(store.save(handoff)).toBe(true);
        expect(store.peek()).toBe(handoff);
        expect(store.consume()).toBe(handoff);
        expect(store.consume()).toBeNull();
    });

    it('drops expired handoffs', () => {
        let now = 1000;
        const store = createWindowPlaybackHandoffStore({ ttlMs: 100, now: () => now });

        store.save({ version: 1, capturedAt: now });
        now = 1101;

        expect(store.peek()).toBeNull();
        expect(store.consume()).toBeNull();
    });

    it('clears the current handoff when saving invalid payloads', () => {
        const store = createWindowPlaybackHandoffStore();

        store.save({ version: 1, capturedAt: 1 });
        expect(store.save(null)).toBe(false);

        expect(store.consume()).toBeNull();
    });
});
