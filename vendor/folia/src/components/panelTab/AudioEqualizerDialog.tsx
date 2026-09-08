import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AudioLines, Power, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Theme } from '../../types';
import { useSettingsUiStore } from '../../stores/useSettingsUiStore';
import { colorWithAlpha, mixColors } from '../visualizer/colorMix';
import {
    AUDIO_EQUALIZER_BANDS,
    AUDIO_EQUALIZER_MAX_GAIN_DB,
    AUDIO_EQUALIZER_MIN_GAIN_DB,
    AUDIO_EQUALIZER_PRESETS,
    type AudioEqualizerModeId,
    type AudioEqualizerSettings,
} from '../../utils/audioEqualizer';
import ThemedDialog from '../shared/ThemedDialog';

// src/components/panelTab/AudioEqualizerDialog.tsx
// Provides the compact ten-band equalizer editor opened from the controls tab.

type AudioEqualizerDialogProps = {
    isDaylight: boolean;
    theme: Theme;
};

const PRESET_IDS: AudioEqualizerModeId[] = ['flat', 'lofi', 'radio', 'vinyl', 'vocal', 'bass', 'custom'];

const AudioEqualizerDialog: React.FC<AudioEqualizerDialogProps> = ({ isDaylight, theme }) => {
    const { t } = useTranslation();
    const settings = useSettingsUiStore(state => state.audioEqualizerSettings);
    const isOpen = useSettingsUiStore(state => state.isAudioEqualizerOpen);
    const close = useSettingsUiStore(state => state.closeAudioEqualizer);
    const commitSettings = useSettingsUiStore(state => state.handleSetAudioEqualizerSettings);
    const [draft, setDraft] = useState<AudioEqualizerSettings>(settings);
    const draftRef = useRef(draft);

    const updateDraft = (next: AudioEqualizerSettings) => {
        draftRef.current = next;
        setDraft(next);
    };

    useEffect(() => {
        if (isOpen) {
            updateDraft({
                enabled: settings.enabled,
                gains: [...settings.gains],
                preset: settings.preset,
                customGains: [...settings.customGains],
            });
        }
    }, [isOpen, settings]);

    const updateBandDraft = (index: number, value: number) => {
        const gains = [...draftRef.current.gains];
        gains[index] = value;
        updateDraft({
            ...draftRef.current,
            enabled: true,
            gains,
            preset: 'custom',
            customGains: [...gains],
        });
    };

    const applyPreset = (presetId: AudioEqualizerModeId) => {
        const next = {
            ...draftRef.current,
            enabled: true,
            preset: presetId,
            gains: presetId === 'custom'
                ? [...draftRef.current.customGains]
                : [...AUDIO_EQUALIZER_PRESETS[presetId]],
        };
        updateDraft(next);
        commitSettings(next);
    };

    const selectedAccentColor = isDaylight
        ? mixColors(theme.accentColor, '#18181b', 0.52)
        : theme.accentColor;
    const inactiveText = isDaylight ? 'text-zinc-600' : 'text-white/45';
    const trackClass = isDaylight ? 'bg-zinc-300' : 'bg-white/10';
    const surfaceClass = isDaylight
        ? 'border-zinc-300 bg-zinc-100/90 text-zinc-800'
        : 'border-white/10 bg-white/[0.05]';
    const buttonClass = isDaylight
        ? 'border-zinc-300 bg-zinc-100/90 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-200'
        : 'border-white/10 bg-white/[0.05] hover:bg-white/[0.1]';
    const gainTextClass = isDaylight ? 'text-zinc-700' : 'text-white';

    if (typeof document === 'undefined') {
        return null;
    }

    return createPortal((
        <ThemedDialog
            isOpen={isOpen}
            onClose={close}
            isDaylight={isDaylight}
            title={t('ui.equalizerTitle')}
            description={t('ui.equalizerDescription')}
            maxWidthClass="max-w-2xl"
        >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={() => {
                        const next = { ...draftRef.current, enabled: !draftRef.current.enabled };
                        updateDraft(next);
                        commitSettings(next);
                    }}
                    aria-pressed={draft.enabled}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${buttonClass}`}
                    style={draft.enabled ? {
                        color: selectedAccentColor,
                        borderColor: colorWithAlpha(selectedAccentColor, 0.5),
                        backgroundColor: colorWithAlpha(selectedAccentColor, 0.1),
                    } : undefined}
                >
                    <Power size={14} />
                    {t(draft.enabled ? 'ui.equalizerEnabled' : 'ui.equalizerDisabled')}
                </button>

                <div className="flex flex-wrap items-center gap-1.5">
                    {PRESET_IDS.map(presetId => (
                        <button
                            key={presetId}
                            type="button"
                            onClick={() => applyPreset(presetId)}
                            aria-pressed={draft.preset === presetId}
                            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${buttonClass}`}
                            style={draft.preset === presetId ? {
                                color: selectedAccentColor,
                                borderColor: colorWithAlpha(selectedAccentColor, 0.55),
                                backgroundColor: colorWithAlpha(selectedAccentColor, 0.12),
                            } : undefined}
                        >
                            {t(`ui.equalizerPreset.${presetId}`)}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => applyPreset('flat')}
                        title={t('ui.equalizerReset')}
                        aria-label={t('ui.equalizerReset')}
                        className={`rounded-full border p-2 transition-colors ${buttonClass}`}
                    >
                        <RotateCcw size={14} />
                    </button>
                </div>
            </div>

            <div className={`overflow-x-auto rounded-2xl border p-4 ${surfaceClass}`}>
                <div className="mb-3 flex min-w-[520px] items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em]">
                    <span className={`flex items-center gap-1.5 ${inactiveText}`}><AudioLines size={13} />{t('ui.equalizerGain')}</span>
                    <span className={inactiveText}>+12 dB · 0 · −12 dB</span>
                </div>
                <div className="grid min-w-[520px] grid-cols-10 gap-2">
                    {AUDIO_EQUALIZER_BANDS.map((band, index) => {
                        const gain = draft.gains[index] ?? 0;
                        return (
                            <label key={band.frequency} className="flex flex-col items-center gap-2">
                                <span className={`text-[10px] font-semibold tabular-nums ${gainTextClass}`} style={{ color: gain === 0 ? undefined : selectedAccentColor }}>
                                    {gain > 0 ? '+' : ''}{gain}
                                </span>
                                <input
                                    type="range"
                                    min={AUDIO_EQUALIZER_MIN_GAIN_DB}
                                    max={AUDIO_EQUALIZER_MAX_GAIN_DB}
                                    step="1"
                                    value={gain}
                                    aria-label={`${band.label} Hz`}
                                    onInput={event => updateBandDraft(index, Number(event.currentTarget.value))}
                                    onChange={event => updateBandDraft(index, Number(event.currentTarget.value))}
                                    onPointerUp={() => commitSettings(draftRef.current)}
                                    onPointerCancel={() => commitSettings(draftRef.current)}
                                    onKeyUp={() => commitSettings(draftRef.current)}
                                    onBlur={() => commitSettings(draftRef.current)}
                                    className={`h-32 w-1.5 cursor-pointer appearance-none rounded-full ${trackClass}`}
                                    style={{ writingMode: 'vertical-lr', direction: 'rtl', accentColor: isDaylight ? selectedAccentColor : theme.accentColor }}
                                />
                                <span className={`text-[10px] font-semibold tabular-nums ${inactiveText}`}>{band.label}</span>
                            </label>
                        );
                    })}
                </div>
                <div className={`mt-2 min-w-[520px] text-center text-[9px] uppercase tracking-[0.2em] ${inactiveText}`}>Hz</div>
            </div>
        </ThemedDialog>
    ), document.body);
};

export default AudioEqualizerDialog;
