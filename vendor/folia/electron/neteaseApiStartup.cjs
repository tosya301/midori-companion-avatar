// electron/neteaseApiStartup.cjs

const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_RETRY_BASE_DELAY_MS = 250;
const DEFAULT_RETRY_JITTER_MS = 100;

const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));

function getErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return typeof error === 'string' && error.trim() ? error : 'Unknown error';
}

function hasUsableXeapiPublicKey(publicKey) {
  return Boolean(
    publicKey
    && typeof publicKey === 'object'
    && typeof publicKey.sk === 'string'
    && publicKey.sk.trim(),
  );
}

function getAnonymousCookie(registration) {
  const bodyCookie = registration?.body?.cookie;
  if (typeof bodyCookie === 'string' && bodyCookie.trim()) {
    return bodyCookie;
  }

  const responseCookies = registration?.cookie;
  if (Array.isArray(responseCookies)) {
    return responseCookies
      .filter((cookie) => typeof cookie === 'string' && cookie.trim())
      .join(';');
  }

  return typeof responseCookies === 'string' ? responseCookies : '';
}

function describeAnonymousRegistration(registration) {
  const status = registration?.status;
  const code = registration?.body?.code;
  const message = registration?.body?.message || registration?.body?.msg;
  const details = [
    status !== undefined ? `status=${status}` : '',
    code !== undefined ? `code=${code}` : '',
    typeof message === 'string' && message.trim() ? `message=${message.trim()}` : '',
  ].filter(Boolean);

  return details.length > 0 ? ` (${details.join(', ')})` : '';
}

// Retries a short startup operation with bounded exponential backoff and jitter.
async function retryStartupOperation(operation, options = {}) {
  const attempts = options.attempts || DEFAULT_RETRY_ATTEMPTS;
  const baseDelayMs = options.baseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS;
  const jitterMs = options.jitterMs ?? DEFAULT_RETRY_JITTER_MS;
  const sleep = options.sleep || wait;
  const random = options.random || Math.random;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (attempt >= attempts) {
        throw error;
      }

      options.onRetry?.(error, attempt);
      const exponentialDelay = baseDelayMs * (2 ** (attempt - 1));
      const jitter = Math.floor(random() * jitterMs);
      await sleep(exponentialDelay + jitter);
    }
  }

  throw new Error('Startup operation exhausted its retry attempts');
}

// Refreshes the xeapi key and falls back only when the cached key is still usable.
async function resolveXeapiPublicKey({
  currentPublicKey,
  deviceId,
  getXeapiPublicKey,
  logger = console,
  retryOptions,
}) {
  try {
    const publicKey = await retryStartupOperation(
      async () => {
        const refreshedPublicKey = await getXeapiPublicKey(currentPublicKey, deviceId);
        if (!hasUsableXeapiPublicKey(refreshedPublicKey)) {
          throw new Error('xeapi public key response missing sk');
        }
        return refreshedPublicKey;
      },
      {
        ...retryOptions,
        onRetry: (error, attempt) => {
          logger.warn(
            `[Netease API] Failed to refresh xeapi public key (attempt ${attempt}), retrying: ${getErrorMessage(error)}`,
          );
          retryOptions?.onRetry?.(error, attempt);
        },
      },
    );

    return { publicKey, refreshed: true };
  } catch (error) {
    if (!hasUsableXeapiPublicKey(currentPublicKey)) {
      throw error;
    }

    logger.warn(
      `[Netease API] Failed to refresh xeapi public key, using cached key: ${getErrorMessage(error)}`,
    );
    return { publicKey: currentPublicKey, refreshed: false };
  }
}

// Refreshes the anonymous token without making this optional credential block startup.
async function refreshAnonymousToken({
  registerAnonymous,
  cookieToJson,
  persistToken,
  logger = console,
  retryOptions,
}) {
  try {
    await retryStartupOperation(async () => {
      const registration = await registerAnonymous();
      const anonymousCookie = getAnonymousCookie(registration);
      if (!anonymousCookie.trim()) {
        throw new Error(
          `anonymous registration response missing cookie${describeAnonymousRegistration(registration)}`,
        );
      }

      const cookieObject = cookieToJson(anonymousCookie);
      if (typeof cookieObject.MUSIC_A !== 'string' || !cookieObject.MUSIC_A.trim()) {
        throw new Error('anonymous registration response missing MUSIC_A');
      }

      await persistToken(cookieObject.MUSIC_A);
    }, {
      ...retryOptions,
      onRetry: (error, attempt) => {
        logger.warn(
          `[Netease API] Failed to refresh anonymous token (attempt ${attempt}), retrying: ${getErrorMessage(error)}`,
        );
        retryOptions?.onRetry?.(error, attempt);
      },
    });
    return true;
  } catch (error) {
    logger.warn(
      `[Netease API] Failed to refresh anonymous token, keeping existing token: ${getErrorMessage(error)}`,
    );
    return false;
  }
}

module.exports = {
  hasUsableXeapiPublicKey,
  refreshAnonymousToken,
  resolveXeapiPublicKey,
  retryStartupOperation,
};
