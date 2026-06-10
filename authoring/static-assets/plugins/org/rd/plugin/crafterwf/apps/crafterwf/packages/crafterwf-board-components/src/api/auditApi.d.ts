export declare type AuditTargetType = 'workflow' | 'package' | 'task';
export declare type AuditOperation = 'task_created' | 'task_modified' | 'package_created' | 'package_step_changed' | 'package_step_action' | 'package_modified';
export interface AuditLogEntry {
    id: string;
    siteId: string;
    userId?: number;
    username: string;
    operation: AuditOperation | string;
    targetType: AuditTargetType | string;
    targetId: string;
    note?: string;
    createdOn: string;
}
export interface AuditLogSearchResult {
    entries: AuditLogEntry[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface AuditLogSearchParams {
    username?: string;
    operation?: string;
    targetType?: string;
    targetId?: string;
    q?: string;
    from?: string;
    to?: string;
    page?: number;
    pageSize?: number;
    sortBy?: 'createdOn' | 'username' | 'operation' | 'note';
    sortOrder?: 'asc' | 'desc';
}
export declare function searchAuditLog(siteId: string, params?: AuditLogSearchParams): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listPackageAuditLog(siteId: string, packageId: string, page?: number, pageSize?: number, sortBy?: AuditLogSearchParams['sortBy'], sortOrder?: AuditLogSearchParams['sortOrder']): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
