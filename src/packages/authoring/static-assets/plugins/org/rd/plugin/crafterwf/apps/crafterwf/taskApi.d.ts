import type { Dispatch } from 'redux';
export declare type TaskPriority = 'high' | 'medium' | 'low';
export declare const TASK_TARGET: {
    readonly WORKFLOW_PACKAGE: "workflow_package";
    readonly CONTENT: "content";
};
export declare type TaskTargetType = (typeof TASK_TARGET)[keyof typeof TASK_TARGET];
export interface WorkflowTask {
    id: string;
    siteId: string;
    title: string;
    priority: TaskPriority;
    assigneeId: number;
    assigneeUsername?: string;
    startOn?: string;
    dueOn?: string;
    complete: boolean;
    archived: boolean;
    targetType?: TaskTargetType;
    targetId?: string;
    targetTitle?: string;
    targetWorkflowId?: string;
    createdOn?: string;
    modifiedOn?: string;
    completedOn?: string;
}
export declare const TASKS_UPDATED_EVENT = "crafterwf:tasks-updated";
export declare function notifyTasksUpdated(): void;
export declare function extractTaskListResult(response: unknown): WorkflowTask[];
export declare function formatDueOnForApi(value?: string | null): string | null;
/** @deprecated Use formatTaskDateForApi */
export declare const formatTaskDateForApi: typeof formatDueOnForApi;
export declare function listTasks(siteId: string, includeComplete?: boolean, includeArchived?: boolean, targetType?: TaskTargetType, targetId?: string, allTasks?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listAllTasks(siteId: string, includeComplete?: boolean, includeArchived?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getOpenTaskCount(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createTask(siteId: string, title: string, priority?: TaskPriority, dueOn?: string, targetType?: TaskTargetType, targetId?: string, assigneeId?: number, assigneeUsername?: string, startOn?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function updateTask(siteId: string, taskId: string, updates: {
    title?: string;
    priority?: TaskPriority;
    startOn?: string | null;
    dueOn?: string | null;
    targetType?: TaskTargetType;
    targetId?: string;
    assigneeId?: number;
    assigneeUsername?: string;
}): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function completeTask(siteId: string, taskId: string, complete: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function archiveTask(siteId: string, taskId: string, archived: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getTask(siteId: string, taskId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listPackageTasks(siteId: string, workflowPackageId: string, includeComplete?: boolean, includeArchived?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function openWorkflowPackage(dispatch: Dispatch, workflowId: string, packageId: string, boardTitle?: string): void;
export declare function createPackageTask(siteId: string, workflowPackageId: string, title: string, priority?: TaskPriority, dueOn?: string, assigneeId?: number, assigneeUsername?: string, startOn?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
