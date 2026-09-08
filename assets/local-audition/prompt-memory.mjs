export const AUDITION_PROMPT_KEY = 'midori.public.music-audition-dismissed.v1';

// Storage can be blocked. Keep the choice for this page even then.
export function createAuditionPromptMemory(getStorage) {
  let dismissed = false;
  return {
    isDismissed() {
      try { dismissed ||= getStorage().getItem(AUDITION_PROMPT_KEY) === '1'; } catch {}
      return dismissed;
    },
    dismiss() {
      dismissed = true;
      try { getStorage().setItem(AUDITION_PROMPT_KEY, '1'); } catch {}
    },
  };
}

export function isConnectedMusicState(state) {
  return state?.ok === true && state.connection === 'connected'
    && state.source !== 'local-audition';
}
