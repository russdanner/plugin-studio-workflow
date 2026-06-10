export interface SchemaStatus {
    installed: boolean;
    schemaName: string;
    version: number;
    error?: string;
    remedialAction?: string;
    detail?: string;
}
export interface WorkflowSummary {
    id: string;
    name: string;
    description?: string;
    backgroundUrl?: string;
    position?: number;
    isDefault?: boolean;
    stepCount: number;
    packageCount: number;
}
import { StepActionType } from '../stepActions';
import { StepContentRule, StepRoleRule } from '../stepRules';
export interface WorkflowStepDto {
    id?: string;
    name: string;
    description?: string;
    position?: number;
    color?: string;
    isTerminal?: boolean;
    allowAddPackage?: boolean;
    clientKey?: string;
    actionType?: StepActionType;
    actionSuccessStepId?: string;
    actionSuccessStepClientKey?: string;
    /** @deprecated legacy boolean flags — use actionType */
    actionRequestPublishStaging?: boolean;
    actionRequestPublishLive?: boolean;
    actionPublishStaging?: boolean;
    actionPublishLive?: boolean;
    roleRule?: StepRoleRule;
    contentRule?: StepContentRule;
}
export interface PublishingTargetsInfo {
    stagingEnabled: boolean;
    targets?: string[];
}
export interface WorkflowDetail {
    workflow: {
        id: string;
        name: string;
        description?: string;
        backgroundUrl?: string;
        /** Board canvas swatch id (stored in background_url) */
        backgroundColor?: string;
        position?: number;
        isDefault?: boolean;
    };
    steps: WorkflowStepDto[];
}
export declare function getSchemaStatus(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function installSchema(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listWorkflows(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getWorkflow(siteId: string, workflowId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createWorkflow(siteId: string, name: string, description?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function deleteWorkflow(siteId: string, workflowId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function saveWorkflowDefinition(siteId: string, workflowId: string, payload: WorkflowDetail): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getPublishingTargets(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
