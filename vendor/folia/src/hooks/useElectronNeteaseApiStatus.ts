import { useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { TFunction } from 'i18next';
import type { StatusMessage } from '../types';

// src/hooks/useElectronNeteaseApiStatus.ts

type StatusSetter = Dispatch<SetStateAction<StatusMessage | null>>;

// Watches the Electron NetEase API startup state and surfaces backend failures through the app toast.
export function useElectronNeteaseApiStatus(setStatusMsg: StatusSetter, t: TFunction) {
    const lastReportedFailureAtRef = useRef<number | null>(null);

    useEffect(() => {
        const electronBridge = window.electron;
        if (!electronBridge?.getNeteaseApiStatus) {
            return;
        }

        let disposed = false;

        const reportStatus = (status: ElectronNeteaseApiStatus) => {
            if (disposed || status.status !== 'error') {
                return;
            }

            if (lastReportedFailureAtRef.current === status.updatedAt) {
                return;
            }

            lastReportedFailureAtRef.current = status.updatedAt;
            console.warn('[Electron] Netease API failed to start', status.error);
            setStatusMsg({
                type: 'error',
                text: t('status.neteaseApiStartupFailed'),
                nonce: status.updatedAt,
                durationMs: 8000,
            });
        };

        void electronBridge.getNeteaseApiStatus()
            .then(reportStatus)
            .catch((error) => {
                console.warn('[Electron] Failed to read Netease API status', error);
            });

        const unsubscribe = electronBridge.onNeteaseApiStatusChanged?.(reportStatus);

        return () => {
            disposed = true;
            unsubscribe?.();
        };
    }, [setStatusMsg, t]);
}
