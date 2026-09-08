import { resolveMonetEmbeddedPortraitOffsetX } from './monetEmbedLayout';

// src/components/visualizer/monet/monetEmbedMotion.ts
// Couple the embedded portrait to Midori's compositor timeline, not React renders.
const layoutLeft = (element: HTMLElement): number => {
    let left = 0;
    let current: HTMLElement | null = element;
    while (current) {
        left += current.offsetLeft;
        current = current.offsetParent instanceof HTMLElement ? current.offsetParent : null;
    }
    return left;
};

export const bindMonetEmbeddedPortrait = (
    portraitLayout: HTMLElement,
    portrait: HTMLElement,
    savedOffsetX: number,
): (() => void) => {
    let host: Window;
    let avatar: HTMLElement | null;
    let shell: HTMLElement | null;
    try {
        host = window.parent;
        avatar = host.document.querySelector<HTMLElement>('#avatar');
        shell = host.document.querySelector<HTMLElement>('.avatar-shell');
    } catch {
        return () => {};
    }
    if (!avatar || !shell) return () => {};
    let frame = 0;
    let coupledAnimation: Animation | null = null;
    const translate = (x: number) => `translate3d(${x}px, 0, 0)`;
    const translationX = (transform: string) => {
        // CSS transition keyframes retain the shell's percentage Y lift. Only
        // X is needed; DOMMatrix cannot parse that otherwise valid percentage.
        const pixelX = /^translate3d\(\s*(-?[\d.]+)px\s*,/.exec(transform);
        return pixelX ? Number(pixelX[1]) : new DOMMatrixReadOnly(transform).e;
    };

    // Read stable layout coordinates for the cover; subtract only avatar gaze,
    // leaving the shell translation in the accepted free-space midpoint formula.
    const synchronize = () => {
        frame = 0;
        const rect = avatar.getBoundingClientRect();
        const gaze = new DOMMatrixReadOnly(host.getComputedStyle(avatar).transform).e;
        const frameLeft = window.frameElement?.getBoundingClientRect().left ?? 0;
        const offset = resolveMonetEmbeddedPortraitOffsetX({
            viewportWidth: host.innerWidth,
            avatarLeft: rect.left - gaze,
            avatarWidth: rect.width,
            portraitBaseCenterX: frameLeft + layoutLeft(portrait) + portrait.offsetWidth / 2,
            portraitOffsetX: savedOffsetX,
        });
        coupledAnimation?.cancel();
        coupledAnimation = null;
        portraitLayout.style.transform = translate(offset);

        const transition = shell.getAnimations().find(animation =>
            (animation as CSSTransition).transitionProperty === 'transform'
            && (animation.playState === 'running' || animation.playState === 'paused'));
        if (!transition || !(transition.effect)) return;
        const effect = transition.effect as KeyframeEffect;
        const keyframes = effect.getKeyframes();
        const shellX = new DOMMatrixReadOnly(host.getComputedStyle(shell).transform).e;
        // The free-space center travels half as far as the character. Reuse the
        // browser's actual keyframes/timing, including shortened reversal timing.
        const frames = keyframes.map(keyframe => ({
            offset: keyframe.offset,
            easing: keyframe.easing,
            transform: translate(offset + (translationX(String(keyframe.transform)) - shellX) / 2),
        }));
        if (frames.length < 2) return;
        const last = frames[frames.length - 1];
        portraitLayout.style.transform = last.transform;
        coupledAnimation = portraitLayout.animate(frames, {
            ...effect.getTiming(),
            fill: 'both',
            timeline: transition.timeline,
        });
        coupledAnimation.playbackRate = transition.playbackRate;
        if (transition.startTime !== null) coupledAnimation.startTime = transition.startTime;
        if (transition.playState === 'paused') {
            coupledAnimation.pause();
            coupledAnimation.currentTime = transition.currentTime;
        }
    };
    const schedule = () => {
        if (!frame) frame = requestAnimationFrame(synchronize);
    };
    const onTransition = (event: TransitionEvent) => {
        if (event.target === shell && event.propertyName === 'transform') {
            cancelAnimationFrame(frame);
            synchronize();
        }
    };
    synchronize();
    host.addEventListener('resize', schedule);
    shell.addEventListener('transitionrun', onTransition);
    shell.addEventListener('transitionend', onTransition);
    shell.addEventListener('transitioncancel', onTransition);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(avatar);
    resizeObserver.observe(portraitLayout);
    resizeObserver.observe(portrait);
    return () => {
        cancelAnimationFrame(frame);
        coupledAnimation?.cancel();
        host.removeEventListener('resize', schedule);
        shell.removeEventListener('transitionrun', onTransition);
        shell.removeEventListener('transitionend', onTransition);
        shell.removeEventListener('transitioncancel', onTransition);
        resizeObserver.disconnect();
        portraitLayout.style.removeProperty('transform');
    };
};
