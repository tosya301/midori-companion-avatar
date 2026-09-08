import { describe, expect, it, vi } from 'vitest';
import {
    completeOnlineProviderLoginTransaction,
    switchOnlineProviderTransaction,
} from '@/hooks/useOnlineProviderPlatform';

// test/unit/onlineMusic/providerSwitchTransaction.test.ts

describe('online provider switch transaction', () => {
    it('does not commit or refresh when cleanup confirmation is cancelled', async () => {
        const commit = vi.fn();
        const refresh = vi.fn();
        const prepare = vi.fn().mockResolvedValue(false);
        await expect(switchOnlineProviderTransaction({
            currentProviderId: 'netease', nextProviderId: 'kugou', prepare, commit, refresh,
        })).resolves.toBe(false);
        expect(commit).not.toHaveBeenCalled();
        expect(refresh).not.toHaveBeenCalled();
    });

    it('cleans up before committing and refreshes only the new provider', async () => {
        const order: string[] = [];
        const prepare = vi.fn(async () => { order.push('cleanup'); return true; });
        const commit = vi.fn(() => { order.push('commit'); });
        const refresh = vi.fn(async () => { order.push('refresh'); });
        await expect(switchOnlineProviderTransaction({
            currentProviderId: 'netease', nextProviderId: 'kugou', prepare, commit, refresh,
        })).resolves.toBe(true);
        expect(order).toEqual(['cleanup', 'commit', 'refresh']);
        expect(commit).toHaveBeenCalledWith('kugou');
    });
});

describe('online provider login transaction', () => {
    it('refreshes the current provider after QR confirmation without activating it again', async () => {
        const refresh = vi.fn().mockResolvedValue(true);
        const activate = vi.fn().mockResolvedValue(true);

        await expect(completeOnlineProviderLoginTransaction({
            currentProviderId: 'netease',
            loginProviderId: 'netease',
            refresh,
            activate,
        })).resolves.toBe(true);

        expect(refresh).toHaveBeenCalledOnce();
        expect(activate).not.toHaveBeenCalled();
    });

    it('refreshes a different provider before asking to activate it', async () => {
        const order: string[] = [];
        const refresh = vi.fn(async () => { order.push('refresh'); return true; });
        const activate = vi.fn(async () => { order.push('activate'); return true; });

        await expect(completeOnlineProviderLoginTransaction({
            currentProviderId: 'netease',
            loginProviderId: 'kugou',
            refresh,
            activate,
        })).resolves.toBe(true);

        expect(order).toEqual(['refresh', 'activate']);
    });

    it('does not activate a provider when its authenticated account cannot be refreshed', async () => {
        const activate = vi.fn().mockResolvedValue(true);

        await expect(completeOnlineProviderLoginTransaction({
            currentProviderId: 'netease',
            loginProviderId: 'kugou',
            refresh: vi.fn().mockResolvedValue(false),
            activate,
        })).resolves.toBe(false);

        expect(activate).not.toHaveBeenCalled();
    });
});
