/** Local copy of Studio ItemDisplay state helpers (avoid broken `craftercms.components.utils` external). */
export declare type SandboxItemStateMap = Record<string, boolean | undefined>;
export declare function getItemStateId(stateMap: SandboxItemStateMap): string | null;
export declare function isInWorkflow(stateMap: SandboxItemStateMap | undefined): boolean;
