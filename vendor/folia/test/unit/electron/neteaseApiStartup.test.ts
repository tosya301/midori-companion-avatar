import { describe, expect, it, vi } from 'vitest';

// test/unit/electron/neteaseApiStartup.test.ts

const {
    refreshAnonymousToken,
    resolveXeapiPublicKey,
} = require('../../../electron/neteaseApiStartup.cjs') as {
    refreshAnonymousToken: (options: Record<string, unknown>) => Promise<boolean>;
    resolveXeapiPublicKey: (options: Record<string, unknown>) => Promise<{
        publicKey: Record<string, unknown>;
        refreshed: boolean;
    }>;
};

const quietLogger = {
    warn: vi.fn(),
};

const immediateRetryOptions = () => ({
    sleep: vi.fn().mockResolvedValue(undefined),
    random: () => 0,
});

describe('NetEase API startup recovery', () => {
    it('retries xeapi key refresh with exponential backoff', async () => {
        const getXeapiPublicKey = vi.fn()
            .mockRejectedValueOnce(new Error('temporary one'))
            .mockResolvedValueOnce({ version: 'invalid-response' })
            .mockResolvedValue({ sk: 'fresh-key', version: '2' });
        const retryOptions = immediateRetryOptions();

        const result = await resolveXeapiPublicKey({
            currentPublicKey: { sk: 'cached-key', version: '1' },
            deviceId: 'device-id',
            getXeapiPublicKey,
            logger: quietLogger,
            retryOptions,
        });

        expect(result).toEqual({
            publicKey: { sk: 'fresh-key', version: '2' },
            refreshed: true,
        });
        expect(getXeapiPublicKey).toHaveBeenCalledTimes(3);
        expect(retryOptions.sleep).toHaveBeenNthCalledWith(1, 250);
        expect(retryOptions.sleep).toHaveBeenNthCalledWith(2, 500);
    });

    it('uses a valid cached xeapi key after refresh attempts fail', async () => {
        const cachedKey = { sk: 'cached-key', version: '1' };
        const getXeapiPublicKey = vi.fn().mockRejectedValue(new Error('offline'));

        const result = await resolveXeapiPublicKey({
            currentPublicKey: cachedKey,
            deviceId: 'device-id',
            getXeapiPublicKey,
            logger: quietLogger,
            retryOptions: immediateRetryOptions(),
        });

        expect(result).toEqual({ publicKey: cachedKey, refreshed: false });
        expect(getXeapiPublicKey).toHaveBeenCalledTimes(3);
    });

    it('still rejects when refresh fails and no usable cached xeapi key exists', async () => {
        const getXeapiPublicKey = vi.fn().mockRejectedValue(new Error('offline'));

        await expect(resolveXeapiPublicKey({
            currentPublicKey: { version: '1' },
            deviceId: 'device-id',
            getXeapiPublicKey,
            logger: quietLogger,
            retryOptions: immediateRetryOptions(),
        })).rejects.toThrow('offline');
        expect(getXeapiPublicKey).toHaveBeenCalledTimes(3);
    });

    it('retries anonymous registration and persists a valid token', async () => {
        const registerAnonymous = vi.fn()
            .mockRejectedValueOnce(new Error('temporary'))
            .mockResolvedValue({ body: { cookie: 'MUSIC_A=anonymous-token' } });
        const persistToken = vi.fn();

        const refreshed = await refreshAnonymousToken({
            registerAnonymous,
            cookieToJson: () => ({ MUSIC_A: 'anonymous-token' }),
            persistToken,
            logger: quietLogger,
            retryOptions: immediateRetryOptions(),
        });

        expect(refreshed).toBe(true);
        expect(registerAnonymous).toHaveBeenCalledTimes(2);
        expect(persistToken).toHaveBeenCalledWith('anonymous-token');
    });

    it('accepts anonymous cookies returned in the top-level cookie array', async () => {
        const registerAnonymous = vi.fn().mockResolvedValue({
            status: 200,
            body: { code: 200 },
            cookie: ['MUSIC_A=anonymous-token', '__csrf=csrf-token'],
        });
        const cookieToJson = vi.fn().mockReturnValue({ MUSIC_A: 'anonymous-token' });
        const persistToken = vi.fn();

        const refreshed = await refreshAnonymousToken({
            registerAnonymous,
            cookieToJson,
            persistToken,
            logger: quietLogger,
            retryOptions: immediateRetryOptions(),
        });

        expect(refreshed).toBe(true);
        expect(cookieToJson).toHaveBeenCalledWith(
            'MUSIC_A=anonymous-token;__csrf=csrf-token',
        );
        expect(persistToken).toHaveBeenCalledWith('anonymous-token');
    });

    it('includes the upstream response status when anonymous registration fails', async () => {
        const logger = { warn: vi.fn() };
        const registerAnonymous = vi.fn().mockResolvedValue({
            status: 503,
            body: { code: 503, msg: 'service unavailable' },
            cookie: [],
        });

        const refreshed = await refreshAnonymousToken({
            registerAnonymous,
            cookieToJson: vi.fn(),
            persistToken: vi.fn(),
            logger,
            retryOptions: immediateRetryOptions(),
        });

        expect(refreshed).toBe(false);
        expect(logger.warn).toHaveBeenCalledWith(
            expect.stringContaining(
                'status=503, code=503, message=service unavailable',
            ),
        );
    });

    it('keeps the existing anonymous token when all refresh attempts fail', async () => {
        const registerAnonymous = vi.fn().mockRejectedValue(new Error('offline'));
        const persistToken = vi.fn();

        const refreshed = await refreshAnonymousToken({
            registerAnonymous,
            cookieToJson: vi.fn(),
            persistToken,
            logger: quietLogger,
            retryOptions: immediateRetryOptions(),
        });

        expect(refreshed).toBe(false);
        expect(registerAnonymous).toHaveBeenCalledTimes(3);
        expect(persistToken).not.toHaveBeenCalled();
    });
});
