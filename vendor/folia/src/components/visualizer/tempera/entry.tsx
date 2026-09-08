import React from 'react';
import { defineVisualizer } from '../definition';

// src/components/visualizer/tempera/entry.tsx
// Registers the complete v0.7.3 director against Midori's v0.6.16 entry contract.
const VisualizerTempera = React.lazy(() => import('./VisualizerTempera'));

export default defineVisualizer({
    mode: 'tempera',
    order: 20,
    labelKey: 'ui.visualizerTempera',
    labelFallback: 'Tempera',
    previewSeed: 'tempera',
    previewStartOffset: 0,
    // Default-renderer port only: no player settings/store/tuning registry integration.
    tuningKind: 'none',
    // Deliberately unkeyed on the seed: the runtime hands a track change over in place
    // (see songHandover.ts / pixiRuntimeHost.ts). Remounting here would throw the WebGL
    // context away mid-transition and leave the frame empty for the whole rebuild.
    // The old shared renderer has no Suspense boundary, so this entry owns its lazy load.
    render: props => (
        <React.Suspense fallback={null}>
            <VisualizerTempera {...props} />
        </React.Suspense>
    ),
});
