import React from 'react';
import { Pin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { Theme } from '../../../types';
import { useSettingsUiStore } from '../../../stores/useSettingsUiStore';
import { COMMAND_PALETTE_COMMANDS } from '../../command-palette/commandRegistry';
import { getCommandTitle } from '../../command-palette/commandText';
import { CustomSelect } from '../../shared/CustomSelect';

// src/components/modal/settings/PinnedCommandSettings.tsx
// Configures the three registry-backed shortcuts shown below the command palette.

type PinnedCommandSettingsProps = {
    isDaylight: boolean;
    settingsCardClass: string;
    theme?: Theme;
};

const PinnedCommandSettings: React.FC<PinnedCommandSettingsProps> = ({
    isDaylight,
    settingsCardClass,
    theme,
}) => {
    const { t } = useTranslation();
    const { pinnedCommandIds, setPinnedCommandId } = useSettingsUiStore(useShallow(state => ({
        pinnedCommandIds: state.pinnedCommandIds,
        setPinnedCommandId: state.setPinnedCommandId,
    })));

    return (
        <section>
            <h3
                className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-50"
                style={{ color: 'var(--text-secondary)' }}
            >
                <Pin size={14} /> {t('options.pinnedCommands')}
            </h3>
            <div className={`space-y-4 rounded-xl border p-4 ${settingsCardClass}`}>
                <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {t('options.pinnedCommands')}
                    </div>
                    <div className="max-w-[520px] text-[11px] opacity-50" style={{ color: 'var(--text-secondary)' }}>
                        {t('options.pinnedCommandsDesc')}
                    </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    {pinnedCommandIds.map((commandId, slotIndex) => {
                        const options = [
                            { value: '', label: t('options.pinnedCommandNone') },
                            ...COMMAND_PALETTE_COMMANDS
                                .filter(command => (
                                    command.id === commandId || !pinnedCommandIds.includes(command.id)
                                ))
                                .map(command => ({
                                    value: command.id,
                                    label: getCommandTitle(command, t),
                                })),
                        ];
                        const slotLabel = t('options.pinnedCommandSlot', { index: slotIndex + 1 });

                        return (
                            <div key={slotIndex} className="min-w-0 space-y-1.5">
                                <div className="text-xs opacity-65" style={{ color: 'var(--text-secondary)' }}>
                                    {slotLabel}
                                </div>
                                <CustomSelect
                                    value={commandId ?? ''}
                                    onChange={(value) => setPinnedCommandId(slotIndex, value || null)}
                                    options={options}
                                    ariaLabel={slotLabel}
                                    placeholder={t('options.pinnedCommandNone')}
                                    isDaylight={isDaylight}
                                    theme={theme}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PinnedCommandSettings;
