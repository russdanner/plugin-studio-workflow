export declare const RECYCLE_BIN_UPDATED_EVENT = "crafterwf-recycle-bin-updated";
export interface RecycleBinItem {
    id: string;
    siteId: string;
    binPath: string;
    internalName?: string | null;
    originalPath: string;
    originalLastModifier?: string | null;
    originalModifiedOn?: string | null;
    originalCreatedOn?: string | null;
    state: 'binned' | 'restored' | 'purged';
    binnedOn?: string | null;
    binnedByUserId?: number;
    binnedByUsername?: string | null;
    restoredOn?: string | null;
    restoredByUserId?: number | null;
    restoredByUsername?: string | null;
}
export declare function canAccessRecycleBin(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listRecycleBinItems(siteId: string, state?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function binContentPaths(siteId: string, paths: string[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function checkRecycleBinRestore(siteId: string, id: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function restoreRecycleBinItem(siteId: string, id: string, confirmCollision?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function notifyRecycleBinUpdated(): void;
