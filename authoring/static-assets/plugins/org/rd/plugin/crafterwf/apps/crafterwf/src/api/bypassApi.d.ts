export declare type WorkflowBypassStudioAction = 'publish' | 'request_publish' | 'reject';
export interface WorkflowBypassViolation {
    contentPath: string;
    packageId: string;
    packageTitle: string;
    workflowId: string;
    workflowName: string;
    currentStepId: string;
    currentStepName: string;
    warningMessage: string;
    allowUiBypass?: boolean;
    studioAction?: WorkflowBypassStudioAction;
}
export interface WorkflowBypassCheckResult {
    action: WorkflowBypassStudioAction;
    requiresAcknowledgement: boolean;
    allowUiBypass: boolean;
    violations: WorkflowBypassViolation[];
}
export declare function checkWorkflowBypass(siteId: string, contentPaths: string[], action: WorkflowBypassStudioAction): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<{
    result: WorkflowBypassCheckResult;
}>>;
export declare function acknowledgeWorkflowBypass(siteId: string, action: WorkflowBypassStudioAction, violations: WorkflowBypassViolation[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function recordWorkflowBypassAction(siteId: string, action: WorkflowBypassStudioAction, violations: WorkflowBypassViolation[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
