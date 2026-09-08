// src/components/visualizer/pixiDisplayResources.ts
// Releases renderer-owned data without discarding display trees that must remain seekable.
export interface PixiDisplayNode {
    children?: PixiDisplayNode[];
    visible?: boolean;
    unload?: () => void;
    destroy?: (options?: { children?: boolean }) => void;
}

export const unloadPixiDisplayTree = (root: PixiDisplayNode) => {
    const stack = [...(root.children ?? [])];
    while (stack.length > 0) {
        const node = stack.pop()!;
        if (node.children?.length) stack.push(...node.children);
        node.unload?.();
    }
};

/** Unloads descendants exactly once when a retained Pixi tree leaves the visible set. */
export const setPixiDisplayTreeVisibility = (root: PixiDisplayNode, visible: boolean) => {
    const wasVisible = root.visible !== false;
    root.visible = visible;
    if (wasVisible && !visible) unloadPixiDisplayTree(root);
};

// removeChildren() only detaches nodes; explicitly unload and destroy detached subtrees.
export const destroyPixiContainerChildren = (container: PixiDisplayNode & {
    removeChildren: () => PixiDisplayNode[];
}) => {
    const children = container.removeChildren();
    children.forEach(child => {
        unloadPixiDisplayTree(child);
        child.unload?.();
        child.destroy?.({ children: true });
    });
};
