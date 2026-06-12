import { MentionUserRef } from '../../utils/mentionUtils';
export interface MentionHighlightProps {
    username: string;
    user?: MentionUserRef;
    siteId?: string | null;
}
export declare function MentionHighlight({ username, user, siteId }: MentionHighlightProps): JSX.Element;
export default MentionHighlight;
