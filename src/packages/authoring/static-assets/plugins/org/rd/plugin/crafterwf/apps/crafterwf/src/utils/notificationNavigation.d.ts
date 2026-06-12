import type { Dispatch } from 'redux';
export declare const NOTIFICATION_TARGET: {
    readonly CONTENT: "content";
    readonly WORKFLOW_PACKAGE: "workflow_package";
    readonly TASK: "task";
};
export interface NotificationTargetRef {
    targetType?: string;
    targetId?: string;
    targetTitle?: string;
    targetWorkflowId?: string;
    targetPackageId?: string;
}
export declare function notificationTargetTypeLabel(targetType?: string): string | null;
export declare function notificationTargetLinkLabel(notification: NotificationTargetRef): string;
export declare function canOpenNotificationTarget(notification: NotificationTargetRef): boolean;
export declare function openNotificationTarget(dispatch: Dispatch, siteId: string, notification: NotificationTargetRef, previewPath: (path: string, label?: string) => void, inspectPath?: (path: string, label?: string) => void): void;
