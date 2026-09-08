import React from 'react';
import { Languages, LayoutList } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { Theme } from '../../../types';
import type { AppLanguagePreference } from '../../../i18n/config';
import { useSettingsUiStore } from '../../../stores/useSettingsUiStore';
import { CustomSelect } from '../../shared/CustomSelect';
import PinnedCommandSettings from './PinnedCommandSettings';

// src/components/modal/settings/GeneralSettingsSubview.tsx
// Global app preferences that should stay independent from playback and desktop-only settings.

type GeneralSettingsSubviewProps = {
    isDaylight: boolean;
    settingsCardClass: string;
    theme?: Theme;
};

const GeneralSettingsSubview: React.FC<GeneralSettingsSubviewProps> = ({
    isDaylight,
    settingsCardClass,
    theme,
}) => {
    const { t, i18n } = useTranslation();
    const {
        appLanguagePreference,
        onAppLanguagePreferenceChange,
        showHomeTabPlaylist,
        showHomeTabRadio,
        showHomeTabAlbums,
        showHomeTabLocal,
        handleToggleHomeTabPlaylist,
        handleToggleHomeTabRadio,
        handleToggleHomeTabAlbums,
        handleToggleHomeTabLocal,
    } = useSettingsUiStore(useShallow(state => ({
        appLanguagePreference: state.appLanguagePreference,
        onAppLanguagePreferenceChange: state.handleSetAppLanguagePreference,
        showHomeTabPlaylist: state.showHomeTabPlaylist,
        showHomeTabRadio: state.showHomeTabRadio,
        showHomeTabAlbums: state.showHomeTabAlbums,
        showHomeTabLocal: state.showHomeTabLocal,
        handleToggleHomeTabPlaylist: state.handleToggleHomeTabPlaylist,
        handleToggleHomeTabRadio: state.handleToggleHomeTabRadio,
        handleToggleHomeTabAlbums: state.handleToggleHomeTabAlbums,
        handleToggleHomeTabLocal: state.handleToggleHomeTabLocal,
    })));

    const getResolvedLanguageLabel = (): string => {
        const lang = i18n.resolvedLanguage;
        if (lang?.startsWith('zh')) {
            return t('options.appLanguageZhCN');
        }
        if (lang === 'in' || lang?.startsWith('id')) {
            return t('options.appLanguageInID') || 'Bahasa Indonesia';
        }
        return t('options.appLanguageEnUS') || 'English';
    };

    const currentResolvedLanguage = getResolvedLanguageLabel();

    const languageOptions: Array<{ value: AppLanguagePreference; label: string; }> = [
        { value: 'system', label: t('options.appLanguageSystem') },
        { value: 'zh-CN', label: t('options.appLanguageZhCN') },
        { value: 'en', label: t('options.appLanguageEnUS') || 'English' },
        { value: 'in', label: t('options.appLanguageInID') || 'Bahasa Indonesia' },
    ];

    const languageHint = appLanguagePreference === 'system'
        ? (t('options.appLanguageSystemHint')).replace('{{language}}', currentResolvedLanguage)
        : null;

    const toggleOffBackgroundClass = isDaylight ? 'bg-zinc-200' : 'bg-[#2A2D35]';

    return (
        <div className="space-y-5">
            <section>
                <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-4 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <Languages size={14} /> {t('options.languageSettings')}
                </h3>
                <div className={`p-4 rounded-xl border space-y-4 ${settingsCardClass}`}>
                    <div className="space-y-1">
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {t('options.appLanguage')}
                        </div>
                        <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                            {t('options.appLanguageDesc')}
                        </div>
                    </div>
                    <CustomSelect
                        value={appLanguagePreference}
                        onChange={(value) => {
                            void onAppLanguagePreferenceChange(value as AppLanguagePreference);
                        }}
                        options={languageOptions}
                        isDaylight={isDaylight}
                        theme={theme}
                    />
                    {languageHint && (
                        <div className="text-[11px] opacity-50" style={{ color: 'var(--text-secondary)' }}>
                            {languageHint}
                        </div>
                    )}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-4 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <LayoutList size={14} /> {t('options.homeTabsVisibility')}
                </h3>
                <div className={`rounded-xl border ${settingsCardClass} overflow-hidden`}>
                    <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.showHomeTabPlaylist')}
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggleHomeTabPlaylist(!showHomeTabPlaylist)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!showHomeTabPlaylist ? toggleOffBackgroundClass : ''}`}
                            style={{ backgroundColor: showHomeTabPlaylist ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${showHomeTabPlaylist ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.showHomeTabRadio')}
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggleHomeTabRadio(!showHomeTabRadio)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!showHomeTabRadio ? toggleOffBackgroundClass : ''}`}
                            style={{ backgroundColor: showHomeTabRadio ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${showHomeTabRadio ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.showHomeTabAlbums')}
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggleHomeTabAlbums(!showHomeTabAlbums)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!showHomeTabAlbums ? toggleOffBackgroundClass : ''}`}
                            style={{ backgroundColor: showHomeTabAlbums ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${showHomeTabAlbums ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.showHomeTabLocal')}
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggleHomeTabLocal(!showHomeTabLocal)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!showHomeTabLocal ? toggleOffBackgroundClass : ''}`}
                            style={{ backgroundColor: showHomeTabLocal ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${showHomeTabLocal ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>
            </section>

            <PinnedCommandSettings
                isDaylight={isDaylight}
                settingsCardClass={settingsCardClass}
                theme={theme}
            />
        </div>
    );
};

export default GeneralSettingsSubview;
