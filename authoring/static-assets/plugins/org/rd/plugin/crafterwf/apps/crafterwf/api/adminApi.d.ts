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
import { WorkflowEventListener } from '../eventListeners';
export interface WorkflowFlowNodePosition {
    x: number;
    y: number;
}
/** Canvas positions keyed by step id (persisted in workflow JSON). */
export declare type WorkflowFlowLayout = Record<string, WorkflowFlowNodePosition>;
/** React Flow pan/zoom state (persisted in workflow JSON). */
export interface WorkflowFlowViewport {
    x: number;
    y: number;
    zoom: number;
}
export declare const DEFAULT_FLOW_VIEWPORT: WorkflowFlowViewport;
export declare function normalizeFlowViewport(value: unknown): WorkflowFlowViewport | null;
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
    /** Step ids packages may be manually dragged to from this step (empty = any step). */
    transitionStepIds?: string[];
    /** Editor-only client keys for transitionStepIds. */
    transitionStepClientKeys?: string[];
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
        createListeners?: WorkflowEventListener[];
        editListeners?: WorkflowEventListener[];
        bypassWarningMessage?: string;
        /** When true, authors may acknowledge and continue Studio publish/reject off-step. Default false. */
        allowUiBypass?: boolean;
        /** React Flow node positions keyed by step id. */
        flowLayout?: WorkflowFlowLayout;
        /** Saved canvas pan/zoom for the workflow flow editor. */
        flowViewport?: WorkflowFlowViewport | null;
    };
    steps: WorkflowStepDto[];
    createListeners?: WorkflowEventListener[];
    editListeners?: WorkflowEventListener[];
}
export declare function getSchemaStatus(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function installSchema(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listWorkflows(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getWorkflow(siteId: string, workflowId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createWorkflow(siteId: string, name: string, description?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function deleteWorkflow(siteId: string, workflowId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function saveWorkflowDefinition(siteId: string, workflowId: string, payload: WorkflowDetail): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getPublishingTargets(siteId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
