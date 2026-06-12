import type { Dispatch } from 'redux';
export interface StudioPreviewItem {
    path: string;
    label?: string;
    name?: string;
    type?: string;
    systemType?: string;
    mimeType?: string;
}
export interface StudioPreviewContext {
    dispatch: Dispatch;
    site: string;
    authoringBase: string;
    guestBase: string;
}
/**
 * Opens content in Studio preview with edit mode off (inspect / browse).
 */
export declare function openContentInInspectMode(item: StudioPreviewItem, context: StudioPreviewContext): void;
/**
 * Opens the same preview dialog used by Studio Search (showPreviewDialog / showEditDialog).
 */
export declare function previewStudioItem(item: StudioPreviewItem, context: StudioPreviewContext): void;
