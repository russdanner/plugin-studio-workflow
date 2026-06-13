import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
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
export declare type WorkflowBypassCheckResponse = {
    result: WorkflowBypassCheckResult;
};
export declare function checkWorkflowBypass(siteId: string, contentPaths: string[], action: WorkflowBypassStudioAction): Observable<AjaxResponse<WorkflowBypassCheckResponse>>;
export declare function acknowledgeWorkflowBypass(siteId: string, action: WorkflowBypassStudioAction, violations: WorkflowBypassViolation[]): Observable<AjaxResponse<any>>;
export declare function recordWorkflowBypassAction(siteId: string, action: WorkflowBypassStudioAction, violations: WorkflowBypassViolation[]): Observable<AjaxResponse<any>>;
