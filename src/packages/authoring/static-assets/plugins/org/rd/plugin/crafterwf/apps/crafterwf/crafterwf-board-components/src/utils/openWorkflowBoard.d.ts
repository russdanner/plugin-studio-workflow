import type { Dispatch } from 'redux';
export declare const WORKFLOW_BOARD_WIDGET_ID = "org.rd.plugin.crafterwf.board";
export interface OpenWorkflowBoardOptions {
    workflowId: string;
    openPackageId?: string;
}
export declare function openWorkflowBoard(dispatch: Dispatch, workflowTitle: string, options: OpenWorkflowBoardOptions, siteId?: string): void;
