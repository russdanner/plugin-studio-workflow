import CardRecord from '../types/CardRecord';
import { StepActionType } from '../stepActions';
import { StepContentRule, StepRoleRule } from '../stepRules';
export declare const PLUGIN_SERVICE_BASE = "/studio/api/2/plugin/script/plugins/org/rd/plugin/crafterwf/crafterwf";
export interface BoardView {
    board: {
        id: string;
        name: string;
        url: null;
        prefs: {
            backgroundColor?: string;
            backgroundImage?: string;
        };
    };
    lists: Array<{
        id: string;
        name: string;
        color?: string;
        actionType?: StepActionType;
        allowAddPackage?: boolean;
        roleRule?: StepRoleRule;
        contentRule?: StepContentRule;
        moveBlocked?: boolean;
        moveBlockedMessage?: string;
        cards: CardRecord[];
    }>;
    currentUserGroups?: string[];
}
export interface BoardStepPackageApi {
    id: string;
    title: string;
    description?: string;
    position: number;
    coverColor?: string;
    status: string;
    attachmentCount: number;
    commentCount: number;
    dueOn?: string;
    contentPaths?: string[];
    contentTypes?: string[];
}
export interface BoardApiResponse {
    currentUser?: {
        username?: string;
        groups?: string[];
    };
    workflow: {
        id: string;
        name: string;
        description?: string;
        backgroundUrl?: string;
        position?: number;
    };
    workflowSteps: Array<{
        id: string;
        name: string;
        position: number;
        color?: string;
        isTerminal?: boolean;
        actionType?: string;
        allowAddPackage?: boolean;
        roleRule?: StepRoleRule;
        contentRule?: StepContentRule;
        workflowPackages: BoardStepPackageApi[];
    }>;
}
export declare function isListMoveBlockedForPackage(list: Pick<BoardView['lists'][number], 'roleRule' | 'contentRule' | 'moveBlocked' | 'moveBlockedMessage'>, packageSummary: {
    contentPaths?: string[];
    contentTypes?: string[];
}, userGroups: string[]): {
    blocked: boolean;
    message?: string;
};
export declare function mapBoardResponse(result: BoardApiResponse): BoardView;
export declare function loadBoard(siteId: string, workflowId?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createPackage(siteId: string, workflowStepId: string, title: string, description: string, coverColor: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function movePackage(siteId: string, workflowPackageId: string, workflowStepId: string, index: number): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export interface PackageActionResult {
    stepActionFailed?: boolean | number | string;
    stepActionStatus?: string;
    stepActionMessage?: string;
    userMessage?: string;
    /** Some API serializers may expose the failure text as `message`. */
    message?: string;
    reverted?: boolean;
    workflowStepId?: string;
    step_action_failed?: boolean | number | string;
    step_action_status?: string;
    step_action_message?: string;
    user_message?: string;
    moveBlocked?: boolean;
    moveBlockedReason?: string;
}
export declare function extractPackageActionResult(response: unknown): PackageActionResult | undefined;
export declare function getStepActionFailureMessage(result?: PackageActionResult): string | null;
/** Resolve a step-action failure message from a move/create package ajax response. */
export declare function getPackageActionFailureMessage(response: unknown): string | null;
export declare function archivePackage(siteId: string, workflowPackageId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function updatePackageTitle(siteId: string, workflowPackageId: string, title: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function updatePackageDescription(siteId: string, workflowPackageId: string, description: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function updatePackageDueOn(siteId: string, workflowPackageId: string, dueOn: string | null): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function getWorkflowPackage(siteId: string, workflowPackageId: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function loadPackageDetails(siteId: string, workflowPackageId: string, server: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function attachContent(siteId: string, workflowPackageId: string, contentPath: string, displayName: string, server: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function removeAttachment(siteId: string, workflowPackageId: string, attachmentId: string, attachmentType?: 'content' | 'link'): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare const COMMENT_TARGET: {
    readonly WORKFLOW_PACKAGE: "workflow_package";
    readonly CONTENT: "content";
};
export declare type CommentTargetType = (typeof COMMENT_TARGET)[keyof typeof COMMENT_TARGET];
export interface WorkflowComment {
    id: string;
    targetId: string;
    targetType: CommentTargetType;
    body: string;
    authorId?: number;
    authorUsername?: string;
    workflowStepId?: string;
    workflowStepName?: string;
    createdOn?: string;
    resolvedOn?: string | null;
    resolved?: boolean;
    archivedOn?: string | null;
    archived?: boolean;
}
/** @deprecated Use WorkflowComment */
export declare type PackageComment = WorkflowComment;
export interface ContentPackageWithComments {
    workflowPackageId: string;
    workflowId?: string;
    workflowName?: string;
    title: string;
    coverColor?: string;
    workflowStepId?: string;
    workflowStepName?: string;
    comments: WorkflowComment[];
}
export interface ContentCommentsResult {
    contentPath: string;
    contentComments: WorkflowComment[];
    packages: ContentPackageWithComments[];
}
export declare function findPackagesByContentPath(siteId: string, contentPath: string, includeResolved?: boolean, includeArchived?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listComments(siteId: string, targetType: CommentTargetType, targetId: string, includeResolved?: boolean, includeArchived?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function listPackageComments(siteId: string, workflowPackageId: string, includeResolved?: boolean, includeArchived?: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createComment(siteId: string, targetType: CommentTargetType, targetId: string, body: string, mentionedUserIds?: number[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createPackageComment(siteId: string, workflowPackageId: string, body: string, mentionedUserIds?: number[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function createContentComment(siteId: string, contentPath: string, body: string, mentionedUserIds?: number[]): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function resolveComment(siteId: string, commentId: string, resolved: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
export declare function archiveComment(siteId: string, commentId: string, archived: boolean): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
