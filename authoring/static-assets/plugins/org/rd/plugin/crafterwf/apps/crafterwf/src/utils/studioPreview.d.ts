/** Avoid bundling studio-ui useSelection (uses import.meta.env, breaks plugin load). */
export declare function usePreviewContentPath(): string | undefined;
export declare function buildOpenIcePanelAction(title: string, panelWidgetId: string, siteId?: string): any;
/** @deprecated Use buildOpenIcePanelAction */
export declare function buildOpenCommentsIcePanelAction(title: string, panelWidgetId: string, siteId?: string): any;
