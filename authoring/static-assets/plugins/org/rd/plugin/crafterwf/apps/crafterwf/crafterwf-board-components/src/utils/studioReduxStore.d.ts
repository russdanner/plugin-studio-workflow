export declare type StudioStore = {
    getState(): Record<string, unknown>;
    dispatch(action: unknown): unknown;
    subscribe(listener: () => void): () => void;
};
/** Studio shell Redux store (works outside React Provider context). */
export declare function getStudioStore(): StudioStore | null;
export declare function getActiveSiteFromStore(explicit?: string): string;
