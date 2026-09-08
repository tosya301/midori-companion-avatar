import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettingsUiStore } from '../../stores/useSettingsUiStore';

type ObsThemeMode = 'static' | 'builtin' | 'ai';

interface ObsCopyUrlButtonProps {
    // Copies the OBS URL for the currently selected mode (the handler reads webObsThemeMode from the store).
    onCopy: () => void | Promise<void>;
    copied: boolean;
    disabled?: boolean;
    // Padding/sizing for the primary button so it fits its surrounding context (header vs button row).
    buttonClassName?: string;
}

// Rough menu height used to decide the open direction (3 single-line rows + padding).
const MENU_ESTIMATED_HEIGHT = 150;

// Split button (obs-endpoint-enhance): a primary "copy OBS URL" action plus a ▾ dropdown to pick the
// theme mode (static / builtin / ai). The dropdown is a pure selector — it only sets the mode; copying
// is the primary button's job. Each mode's behavior shows on hover (title). Open direction is detected
// from the live space below the trigger, so it stays correct even if the surrounding layout changes.
export const ObsCopyUrlButton: React.FC<ObsCopyUrlButtonProps> = ({ onCopy, copied, disabled, buttonClassName }) => {
    const { t } = useTranslation();
    const mode = useSettingsUiStore((s) => s.webObsThemeMode);
    const setMode = useSettingsUiStore((s) => s.setWebObsThemeMode);
    const isDaylight = useSettingsUiStore((s) => s.isDaylight);
    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return undefined;
        const onDocMouseDown = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onDocMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onDocMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    const options: Array<{ value: ObsThemeMode; label: string; hint: string }> = [
        { value: 'static', label: t('options.obsThemeModeStatic'), hint: t('options.obsThemeModeStaticHint') },
        { value: 'builtin', label: t('options.obsThemeModeBuiltin'), hint: t('options.obsThemeModeBuiltinHint') },
        { value: 'ai', label: t('options.obsThemeModeAi'), hint: t('options.obsThemeModeAiHint') },
    ];
    const current = options.find((o) => o.value === mode) ?? options[1];

    const toggleMenu = () => {
        if (open) { setOpen(false); return; }
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const spaceBelow = window.innerHeight - rect.bottom;
            // Flip up only when there isn't room below and there's more room above.
            setOpenUp(spaceBelow < MENU_ESTIMATED_HEIGHT && rect.top > spaceBelow);
        }
        setOpen(true);
    };

    const pick = (value: ObsThemeMode) => {
        setMode(value); // select only — copying is the primary button's job
        setOpen(false);
    };

    const baseBtn = 'text-xs font-medium flex items-center gap-1.5 bg-white/10 hover:bg-white/15 active:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
    const menuBg = isDaylight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(24, 24, 27, 0.98)';
    const menuBorder = isDaylight ? 'rgba(24, 24, 27, 0.12)' : 'rgba(255, 255, 255, 0.12)';

    return (
        <div ref={containerRef} className="relative inline-flex items-stretch">
            <button
                type="button"
                onClick={() => void onCopy()}
                disabled={disabled}
                title={`${current.label} — ${current.hint}`}
                className={`${baseBtn} rounded-l-lg ${buttonClassName ?? 'px-3 py-2'}`}
                style={{ color: copied ? '#86efac' : 'var(--text-primary)' }}
            >
                {copied ? <Check size={13} className="shrink-0" /> : <Copy size={13} className="shrink-0" />}
                {/* Reserve the copy label's width so switching to "copied" never resizes the button.
                    In the flex-wrap button row that resize would flip whether this button wraps to the
                    next line, jumping the whole group. The label (with the mode) stays as an invisible
                    width holder and "copied" is overlaid centered. */}
                <span className="relative inline-flex items-center whitespace-nowrap">
                    <span className={copied ? 'invisible' : undefined}>{`${t('options.copyObsUrl')} | ${current.label}`}</span>
                    {copied && <span className="absolute inset-0 flex items-center justify-center">{t('status.copied')}</span>}
                </span>
            </button>
            <button
                type="button"
                onClick={toggleMenu}
                disabled={disabled}
                aria-label={t('options.obsThemeMode')}
                title={t('options.obsThemeMode')}
                className={`${baseBtn} rounded-r-lg px-1.5 border-l border-black/20`}
                style={{ color: 'var(--text-primary)' }}
            >
                <ChevronDown size={13} />
            </button>
            {open && (
                <div
                    className={`absolute right-0 ${openUp ? 'bottom-full mb-1' : 'top-full mt-1'} w-56 max-w-[80vw] rounded-xl border p-1 z-50 shadow-xl`}
                    style={{ backgroundColor: menuBg, borderColor: menuBorder }}
                >
                    {options.map((o) => {
                        const selected = o.value === mode;
                        return (
                            <button
                                key={o.value}
                                type="button"
                                onClick={() => pick(o.value)}
                                title={o.hint}
                                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                <Check size={13} className="shrink-0" style={{ opacity: selected ? 1 : 0 }} />
                                <span className="text-xs font-medium">{o.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
