export declare function resolveAttachmentLabel(item: Record<string, unknown> | string): string;
export declare function isStaticAssetPath(path: string | undefined | null): boolean;
export declare function isValidContentPath(path: string | undefined | null): boolean;
export declare function extractContentPathFromAttachmentUrl(url: string): string | null;
/** Returns the URL/path to use for display, preview, and linking. */
export declare function resolveAttachmentUrl(attachment: {
    url?: string;
}): string;
export declare function resolveAttachmentDisplayName(attachment: {
    name?: string;
    url?: string;
}): string;
export declare function resolveAttachmentLinkUrl(attachment: {
    url?: string;
}): string;
