import { MentionUserRef } from '../../utils/mentionUtils';
export interface CommentBodyWithMentionsProps {
    body: string;
    mentionUsers: MentionUserRef[];
    siteId?: string | null;
}
export declare function CommentBodyWithMentions({ body, mentionUsers, siteId }: CommentBodyWithMentionsProps): JSX.Element;
export default CommentBodyWithMentions;
