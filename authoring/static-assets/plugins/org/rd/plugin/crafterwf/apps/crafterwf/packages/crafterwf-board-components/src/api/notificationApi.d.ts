export interface WorkflowNotification {
    id: string;
    siteId: string;
    userId: number;
    title: string;
    message?: string;
    targetType?: string;
    targetId?: string;
    targetTitle?: string;
    targetWorkflowId?: string;
    targetPackageId?: string;
    read: boolean;
    resolved: boolean;
    archived: boolean;
    createdOn?: string;
    modifiedOn?: string;
}
export declare const NOTIFICATIONS_UPDATED_EVENT = "crafterwf:notifications-updated";
export declare function notifyNotificationsUpdated(): void;
export declare function listNotifications(siteId: string, unreadOnly?: boolean, includeResolved?: boolean, includeArchived?: boolean, markDisplayedAsRead?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getUnreadNotificationCount(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createNotification(siteId: string, title: string, message: string, targetType?: string, targetId?: string, userId?: number): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function markNotificationRead(siteId: string, notificationId: string, read?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function markAllNotificationsRead(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function resolveNotification(siteId: string, notificationId: string, resolved: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function archiveNotification(siteId: string, notificationId: string, archived: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
