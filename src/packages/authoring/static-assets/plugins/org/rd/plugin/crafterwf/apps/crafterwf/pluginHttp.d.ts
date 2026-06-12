/** Read-only plugin REST endpoints (GET). */
export declare function pluginGet(url: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
/**
 * State-changing plugin REST endpoints. Crafter Studio plugin scripts use
 * *.get.groovy for query-parameter mutations (POST/DELETE routing is unreliable).
 */
export declare function pluginPost(url: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
/** Destructive plugin REST endpoints (query params on URL, served by *.get.groovy). */
export declare function pluginDelete(url: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
