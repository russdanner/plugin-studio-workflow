export interface MentionUserRef {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
}
export declare type CommentBodySegment = {
    type: 'text';
    value: string;
} | {
    type: 'mention';
    username: string;
    user?: MentionUserRef;
} | {
    type: 'pendingMention';
    value: string;
};
/** Active @mention fragment at the cursor while composing (e.g. "@adm"). */
export declare function getMentionQuery(text: string, cursor: number): string | null;
export declare function parseCommentDraftSegments(body: string, users: MentionUserRef[], cursor: number): CommentBodySegment[];
export declare function extractMentionedUserIds(body: string, users: MentionUserRef[]): number[];
export declare function parseCommentBodyMentions(body: string, users: MentionUserRef[]): CommentBodySegment[];
