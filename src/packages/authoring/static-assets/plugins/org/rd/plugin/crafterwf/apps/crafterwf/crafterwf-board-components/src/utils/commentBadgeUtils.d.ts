import { WorkflowComment } from '../api/workflowApi';
export declare const COMMENTS_UPDATED_EVENT = "crafterwf:comments-updated";
export declare function notifyCommentsUpdated(): void;
export declare function markCommentsViewed(siteId: string, contentPath: string): void;
export declare function commentMentionsUsername(body: string, username: string): boolean;
export declare function isUnreadComment(comment: WorkflowComment, currentUserId: number | undefined, lastViewedAt?: string): boolean;
export declare function countCommentBadgeState(comments: WorkflowComment[], currentUserId: number | undefined, currentUsername: string | undefined, siteId: string, contentPath: string): {
    unreadCount: number;
    mentionCount: number;
};
export declare function collectCommentsForContentPath(contentComments: WorkflowComment[], packages: {
    comments: WorkflowComment[];
}[]): WorkflowComment[];
