export interface MentionUserRef {
    id: number;
    username: string;
}
export declare function extractMentionedUserIds(body: string, users: MentionUserRef[]): number[];
