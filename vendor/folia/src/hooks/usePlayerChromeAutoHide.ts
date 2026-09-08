import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';
import type { PlayerChromeVisibilityMode } from '../types/remoteControl';

// src/hooks/usePlayerChromeAutoHide.ts
// Coordinates persisted player-chrome modes with the legacy auto-hide setting.
const PLAYER_CHROME_VISIBILITY_MODE_STORAGE_KEY = 'player_chrome_visibility_mode';

const isPlayerChromeVisibilityMode = (value: string | null): value is PlayerChromeVisibilityMode => (
    value === 'always-hidden' || value === 'always-visible' || value === 'auto-hide'
);
type UsePlayerChromeAutoHideOptions = {
    autoHidePlayerChrome: boolean;
    initialPlayerChromeHidden: boolean;
    setIsPlayerChromeHidden: React.Dispatch<React.SetStateAction<boolean>>;
    setAutoHidePlayerChromePreference: (enabled: boolean) => void;
    onModeChange?: (mode: PlayerChromeVisibilityMode) => void;
};

const getNextPlayerChromeVisibilityMode = (mode: PlayerChromeVisibilityMode): PlayerChromeVisibilityMode => {
    if (mode === 'always-hidden') return 'always-visible';
    if (mode === 'always-visible') return 'auto-hide';
    return 'always-hidden';
};

const getInitialPlayerChromeVisibilityMode = (autoHidePlayerChrome: boolean, initialPlayerChromeHidden: boolean): PlayerChromeVisibilityMode => {
    const storedMode = localStorage.getItem(PLAYER_CHROME_VISIBILITY_MODE_STORAGE_KEY);
    if (isPlayerChromeVisibilityMode(storedMode)) {
        return storedMode;
    }

    if (autoHidePlayerChrome) return 'auto-hide';
    return initialPlayerChromeHidden ? 'always-hidden' : 'always-visible';
};

export const usePlayerChromeAutoHide = ({
    autoHidePlayerChrome,
    initialPlayerChromeHidden,
    setIsPlayerChromeHidden,
    setAutoHidePlayerChromePreference,
    onModeChange,
}: UsePlayerChromeAutoHideOptions) => {
    const [playerChromeVisibilityMode, setPlayerChromeVisibilityMode] = useState<PlayerChromeVisibilityMode>(() => (
        getInitialPlayerChromeVisibilityMode(autoHidePlayerChrome, initialPlayerChromeHidden)
    ));
    const playerChromeVisibilityModeRef = useRef(playerChromeVisibilityMode);
    const timeoutIdRef = useRef<number | undefined>(undefined);
    const rafIdRef = useRef<number | undefined>(undefined);
    const isSynchronizingPreferenceRef = useRef(false);
    const hasInitializedPreferenceSyncRef = useRef(false);

    const cyclePlayerChromeVisibilityMode = useCallback(() => {
        const nextMode = getNextPlayerChromeVisibilityMode(playerChromeVisibilityModeRef.current);
        const shouldAutoHide = nextMode === 'auto-hide';
        playerChromeVisibilityModeRef.current = nextMode;
        setPlayerChromeVisibilityMode(nextMode);
        if (autoHidePlayerChrome !== shouldAutoHide) {
            isSynchronizingPreferenceRef.current = true;
            setAutoHidePlayerChromePreference(shouldAutoHide);
        }
        onModeChange?.(nextMode);
    }, [autoHidePlayerChrome, onModeChange, setAutoHidePlayerChromePreference]);

    useEffect(() => {
        localStorage.setItem(PLAYER_CHROME_VISIBILITY_MODE_STORAGE_KEY, playerChromeVisibilityMode);
    }, [playerChromeVisibilityMode]);

    useEffect(() => {
        if (!hasInitializedPreferenceSyncRef.current) {
            hasInitializedPreferenceSyncRef.current = true;
            const shouldAutoHide = playerChromeVisibilityModeRef.current === 'auto-hide';
            if (autoHidePlayerChrome !== shouldAutoHide) {
                isSynchronizingPreferenceRef.current = true;
                setAutoHidePlayerChromePreference(shouldAutoHide);
            }
            return;
        }

        if (isSynchronizingPreferenceRef.current) {
            isSynchronizingPreferenceRef.current = false;
            return;
        }

        const nextMode = autoHidePlayerChrome ? 'auto-hide' : 'always-visible';
        playerChromeVisibilityModeRef.current = nextMode;
        setPlayerChromeVisibilityMode(nextMode);
    }, [autoHidePlayerChrome, setAutoHidePlayerChromePreference]);

    useEffect(() => {
        let isThrottled = false;

        const clearAutoHideTimer = () => {
            window.clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = undefined;
        };

        const scheduleAutoHide = (delay: number) => {
            clearAutoHideTimer();
            timeoutIdRef.current = window.setTimeout(() => {
                timeoutIdRef.current = undefined;
                setIsPlayerChromeHidden(true);
            }, delay);
        };

        const showAndResetTimer = () => {
            setIsPlayerChromeHidden(false);
            scheduleAutoHide(3000);
        };

        const handleMouseOut = (event: MouseEvent) => {
            const hasLeftWindow = !event.relatedTarget || event.clientY <= 0 || event.clientX <= 0
                || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight;
            if (hasLeftWindow) {
                scheduleAutoHide(300);
            }
        };

        const handleMouseMove = () => {
            if (isThrottled) return;
            isThrottled = true;
            rafIdRef.current = requestAnimationFrame(() => {
                showAndResetTimer();
                isThrottled = false;
            });
        };

        if (playerChromeVisibilityMode === 'always-hidden') {
            setIsPlayerChromeHidden(true);
            return clearAutoHideTimer;
        }

        if (playerChromeVisibilityMode === 'always-visible') {
            setIsPlayerChromeHidden(false);
            return clearAutoHideTimer;
        }

        showAndResetTimer();
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearAutoHideTimer();
            if (rafIdRef.current !== undefined) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = undefined;
            }
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [playerChromeVisibilityMode, setIsPlayerChromeHidden]);

    return { playerChromeVisibilityMode, cyclePlayerChromeVisibilityMode };
};
