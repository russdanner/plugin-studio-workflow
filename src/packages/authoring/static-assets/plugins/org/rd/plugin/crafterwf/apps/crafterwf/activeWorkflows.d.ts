import type { Dispatch } from 'redux';
import { WorkflowSummary } from '../api/adminApi';
import { ContentPackageWithComments } from '../api/workflowApi';
export declare const WORKFLOWS_UPDATED_EVENT = "crafterwf:workflows-updated";
export interface WorkflowPackageGroup {
    workflowId: string;
    workflowName: string;
    packages: ContentPackageWithComments[];
}
export declare function notifyWorkflowsUpdated(): void;
export declare function groupPackagesByWorkflow(packages: ContentPackageWithComments[]): WorkflowPackageGroup[];
export declare function openWorkflowBoardForGroup(dispatch: Dispatch, group: WorkflowPackageGroup): void;
export declare function startWorkflowPackageForContent(dispatch: Dispatch, siteId: string, contentPath: string, workflow: WorkflowSummary): Promise<void>;
export declare function resolveContentLabel(siteId: string, contentPath: string): Promise<string>;
