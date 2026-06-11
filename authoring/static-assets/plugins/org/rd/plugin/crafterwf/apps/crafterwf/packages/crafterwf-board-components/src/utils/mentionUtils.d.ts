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
};
export declare function extractMentionedUserIds(body: string, users: MentionUserRef[]): number[];
export declare function parseCommentBodyMentions(body: string, users: MentionUserRef[]): CommentBodySegment[];
