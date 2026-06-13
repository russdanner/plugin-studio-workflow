export declare const RECYCLE_BIN_UPDATED_EVENT = "crafterwf-recycle-bin-updated";
export declare type RecycleBinSortField = 'binnedOn' | 'internalName' | 'originalPath' | 'originalModifiedOn' | 'originalCreatedOn' | 'originalLastModifier' | 'binnedByUsername';
export declare type RecycleBinSortOrder = 'asc' | 'desc';
export interface RecycleBinItem {
    id: string;
    siteId: string;
    binPath: string;
    internalName?: string | null;
    originalPath: string;
    originalLastModifier?: string | null;
    originalModifiedOn?: string | null;
    originalCreatedOn?: string | null;
    originalCreatedBy?: string | null;
    originalSandboxState?: string | null;
    state: 'binned' | 'restored' | 'purged';
    binnedOn?: string | null;
    binnedByUserId?: number;
    binnedByUsername?: string | null;
    restoredOn?: string | null;
    restoredByUserId?: number | null;
    restoredByUsername?: string | null;
    purgedOn?: string | null;
    purgedByUserId?: number | null;
    purgedByUsername?: string | null;
}
export interface RecycleBinListResult {
    items: RecycleBinItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export interface RecycleBinListOptions {
    state?: string;
    page?: number;
    pageSize?: number;
    sortBy?: RecycleBinSortField;
    sortOrder?: RecycleBinSortOrder;
    /** Keyword filter across name, paths, users, state, and dates */
    q?: string;
}
export declare function canAccessRecycleBin(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listRecycleBinItems(siteId: string, options?: RecycleBinListOptions): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function binContentPaths(siteId: string, paths: string[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function checkRecycleBinRestore(siteId: string, id: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function restoreRecycleBinItem(siteId: string, id: string, confirmCollision?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function purgeRecycleBinItem(siteId: string, id: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function notifyRecycleBinUpdated(): void;
