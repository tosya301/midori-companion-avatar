import React, { useMemo } from 'react';
import { DEFAULT_PENDOLO_TUNING, type PendoloTuning } from '../../../types';
import { type VisualizerSettingsPanelProps } from '../definition';
import VisualizerPresetGroup, { type VisualizerPresetOption } from '../VisualizerPresetGroup';

// src/components/visualizer/pendolo/PendoloSettingsPanel.tsx
// Owns Pendolo-specific tuning controls while reusing the shared themed preset group.
const PendoloSettingsPanel: React.FC<VisualizerSettingsPanelProps> = ({
    t,
    isDaylight,
    theme,
    rangeInputClass,
    pendoloTuning,
    onPendoloTuningChange,
    onSliderPointerDown,
    onSliderCommit,
}) => {
    const resolvedTuning = pendoloTuning ?? DEFAULT_PENDOLO_TUNING;
    const centerGradientOptions: VisualizerPresetOption<boolean>[] = useMemo(() => ([
        { value: true, label: t('options.pendoloCenterGradientOn') || '开启' },
        { value: false, label: t('options.pendoloCenterGradientOff') || '关闭' },
    ]), [t]);
    const coverOnWatchFaceOptions: VisualizerPresetOption<boolean>[] = useMemo(() => ([
        { value: true, label: t('options.pendoloCoverOnWatchFaceOn') || '显示' },
        { value: false, label: t('options.pendoloCoverOnWatchFaceOff') || '隐藏' },
    ]), [t]);
    const lineGlowOptions: VisualizerPresetOption<boolean>[] = useMemo(() => ([
        { value: true, label: t('options.pendoloLineGlowOn') || '开启' },
        { value: false, label: t('options.pendoloLineGlowOff') || '关闭' },
    ]), [t]);
    const gearDecorOptions: VisualizerPresetOption<PendoloTuning['showGearDecor']>[] = useMemo(() => ([
        { value: 'none', label: t('options.decorNone') || '无' },
        { value: 'subtle', label: t('options.decorSubtle') || '半透明' },
        { value: 'full', label: t('options.decorFull') || '完整' },
    ]), [t]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span>{t('options.pendoloWheelCenterX') || '轮盘水平位置 (0 = 左边缘)'}</span>
                    <span className="font-mono opacity-70" style={{ color: 'var(--text-secondary)' }}>
                        {resolvedTuning.wheelCenterX > 0 ? '+' : ''}{Math.round(resolvedTuning.wheelCenterX * 100)}%
                    </span>
                </div>
                <input
                    type="range"
                    min="-0.20"
                    max="0.40"
                    step="0.01"
                    value={resolvedTuning.wheelCenterX}
                    onChange={(event) => onPendoloTuningChange?.({ wheelCenterX: parseFloat(event.target.value) })}
                    onPointerDown={onSliderPointerDown}
                    onPointerUp={onSliderCommit}
                    className={rangeInputClass}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span>{t('options.pendoloArcRadius') || '轮盘半径'}</span>
                    <span className="font-mono opacity-70" style={{ color: 'var(--text-secondary)' }}>
                        {Math.round(resolvedTuning.arcRadius * 100)}%
                    </span>
                </div>
                <input
                    type="range"
                    min="0.25"
                    max="0.80"
                    step="0.01"
                    value={resolvedTuning.arcRadius}
                    onChange={(event) => onPendoloTuningChange?.({ arcRadius: parseFloat(event.target.value) })}
                    onPointerDown={onSliderPointerDown}
                    onPointerUp={onSliderCommit}
                    className={rangeInputClass}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span>{t('options.pendoloArcAngleDeg') || '弧度角度'}</span>
                    <span className="font-mono opacity-70" style={{ color: 'var(--text-secondary)' }}>
                        {Math.round(resolvedTuning.arcAngleDeg)}°
                    </span>
                </div>
                <input
                    type="range"
                    min="40"
                    max="160"
                    step="5"
                    value={resolvedTuning.arcAngleDeg}
                    onChange={(event) => onPendoloTuningChange?.({ arcAngleDeg: parseFloat(event.target.value) })}
                    onPointerDown={onSliderPointerDown}
                    onPointerUp={onSliderCommit}
                    className={rangeInputClass}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span>{t('options.pendoloTickSnappiness') || '擒纵咬合力度'}</span>
                    <span className="font-mono opacity-70" style={{ color: 'var(--text-secondary)' }}>
                        {resolvedTuning.tickSnappiness.toFixed(1)}x
                    </span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={resolvedTuning.tickSnappiness}
                    onChange={(event) => onPendoloTuningChange?.({ tickSnappiness: parseFloat(event.target.value) })}
                    onPointerDown={onSliderPointerDown}
                    onPointerUp={onSliderCommit}
                    className={rangeInputClass}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span>{t('options.pendoloActiveScale') || '聚焦句缩放'}</span>
                    <span className="font-mono opacity-70" style={{ color: 'var(--text-secondary)' }}>
                        {resolvedTuning.activeScale.toFixed(2)}x
                    </span>
                </div>
                <input
                    type="range"
                    min="1.00"
                    max="1.60"
                    step="0.05"
                    value={resolvedTuning.activeScale}
                    onChange={(event) => onPendoloTuningChange?.({ activeScale: parseFloat(event.target.value) })}
                    onPointerDown={onSliderPointerDown}
                    onPointerUp={onSliderCommit}
                    className={rangeInputClass}
                />
            </div>

            <VisualizerPresetGroup
                label={t('options.pendoloShowGearDecor') || '机械齿轮饰线'}
                value={resolvedTuning.showGearDecor}
                options={gearDecorOptions}
                onChange={(next) => onPendoloTuningChange?.({ showGearDecor: next })}
                isDaylight={isDaylight}
                theme={theme}
            />
            <VisualizerPresetGroup
                label={t('options.pendoloShowCenterGradient') || '齿轮区域中央深色渐变'}
                value={resolvedTuning.showCenterGradient ?? true}
                options={centerGradientOptions}
                onChange={(next) => onPendoloTuningChange?.({ showCenterGradient: next })}
                isDaylight={isDaylight}
                theme={theme}
            />
            <VisualizerPresetGroup
                label={t('options.pendoloShowCoverOnWatchFace') || '表盘显示专辑封面'}
                value={resolvedTuning.showCoverOnWatchFace ?? false}
                options={coverOnWatchFaceOptions}
                onChange={(next) => onPendoloTuningChange?.({ showCoverOnWatchFace: next })}
                isDaylight={isDaylight}
                theme={theme}
            />
            <VisualizerPresetGroup
                label={t('options.pendoloEnableLineGlow') || '线条发光效果'}
                value={resolvedTuning.enableLineGlow ?? false}
                options={lineGlowOptions}
                onChange={(next) => onPendoloTuningChange?.({ enableLineGlow: next })}
                isDaylight={isDaylight}
                theme={theme}
            />
        </div>
    );
};

export default PendoloSettingsPanel;
