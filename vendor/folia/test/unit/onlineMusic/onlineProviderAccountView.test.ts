import { describe, expect, it } from 'vitest';
import { resolveOnlineProviderAccountView } from '@/components/app/home/onlineProviderAccountView';
import type { ProviderAccountSummary } from '@/types/onlineMusic';

// test/unit/onlineMusic/onlineProviderAccountView.test.ts

const provider = (status: ProviderAccountSummary['status']): ProviderAccountSummary => ({
    providerId: 'netease',
    displayName: 'NetEase Cloud Music',
    shortName: 'NetEase',
    availability: { configured: true },
    status,
    user: null,
    collections: [],
});

describe('online provider account home view', () => {
    it('shows a neutral resolving state while the account is hydrating', () => {
        expect(resolveOnlineProviderAccountView({
            provider: provider('unknown'),
            hasUser: false,
            platformAvailable: true,
        })).toBe('resolving');
    });

    it('shows the login view only after the account is confirmed anonymous', () => {
        expect(resolveOnlineProviderAccountView({
            provider: provider('anonymous'),
            hasUser: false,
            platformAvailable: true,
        })).toBe('guest');
    });

    it('uses cached user data immediately even while remote validation is pending', () => {
        expect(resolveOnlineProviderAccountView({
            provider: provider('unknown'),
            hasUser: true,
            platformAvailable: true,
        })).toBe('authenticated');
    });
});
