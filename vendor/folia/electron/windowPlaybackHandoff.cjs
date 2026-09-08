// electron/windowPlaybackHandoff.cjs
// Holds a short-lived renderer playback handoff while the main window is rebuilt.

function isObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function createWindowPlaybackHandoffStore(options = {}) {
  const ttlMs = Number.isFinite(options.ttlMs) ? Math.max(0, options.ttlMs) : 15_000;
  const now = typeof options.now === 'function' ? options.now : () => Date.now();
  let currentHandoff = null;
  let expiresAt = 0;

  const clear = () => {
    currentHandoff = null;
    expiresAt = 0;
  };

  const save = (handoff) => {
    if (!isObject(handoff)) {
      clear();
      return false;
    }

    currentHandoff = handoff;
    expiresAt = now() + ttlMs;
    return true;
  };

  const consume = () => {
    if (!currentHandoff || now() > expiresAt) {
      clear();
      return null;
    }

    const handoff = currentHandoff;
    clear();
    return handoff;
  };

  const peek = () => {
    if (!currentHandoff || now() > expiresAt) {
      clear();
      return null;
    }

    return currentHandoff;
  };

  return {
    clear,
    consume,
    peek,
    save,
  };
}

module.exports = {
  createWindowPlaybackHandoffStore,
};
