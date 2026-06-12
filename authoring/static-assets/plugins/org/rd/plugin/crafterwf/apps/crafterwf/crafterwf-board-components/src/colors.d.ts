export interface ColorSwatch {
    id: string;
    hex: string;
    label: string;
}
/** Soft backgrounds for the kanban board canvas */
export declare const BOARD_BACKGROUND_SWATCHES: ColorSwatch[];
/** Accent colors for workflow steps (left rail stripe) */
export declare const STEP_COLOR_SWATCHES: ColorSwatch[];
export declare function resolveBoardBackgroundColor(value: string | undefined | null): string;
export declare function resolveStepColor(value: string | undefined | null): string;
export declare function normalizeBoardBackgroundId(value: string | undefined | null): string;
export declare function normalizeStepColorId(value: string | undefined | null): string;
/** @deprecated use STEP_COLOR_SWATCHES */
export declare const STEP_COLOR_OPTIONS: string[];
