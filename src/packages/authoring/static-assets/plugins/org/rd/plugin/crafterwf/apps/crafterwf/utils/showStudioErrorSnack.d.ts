/**
 * Show Studio's bottom-left snackbar (notistack via GlobalDialogManager).
 * Widget plugins publish through the host bus when available; otherwise Redux dispatch.
 * Do not use both — Studio listens to both and would show duplicate snackbars.
 */
export declare function showStudioErrorSnack(message: string): void;
