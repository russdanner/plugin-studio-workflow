export declare function resolveAttachmentLabel(item: Record<string, unknown> | string): string;
export declare function isStaticAssetPath(path: string | undefined | null): boolean;
export declare function isValidContentPath(path: string | undefined | null): boolean;
/** True for repository paths the workflow bypass API accepts (not numeric ids or URLs). */
export declare function isSandboxContentPath(path: string | undefined | null): boolean;
/** Drop null/empty/invalid paths before calling Studio sandbox_items_by_path. */
export declare function filterValidSandboxPaths(paths: Array<string | null | undefined>): string[];
/** Resolve a sandbox item path from Studio save/preview payloads (uri, path, localId). */
export declare function resolveSandboxItemPath(item: Record<string, unknown> | null | undefined): string | null;
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
