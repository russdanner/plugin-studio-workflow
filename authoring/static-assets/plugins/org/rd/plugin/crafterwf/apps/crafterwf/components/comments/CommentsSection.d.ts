import { WorkflowComment } from '../../api/workflowApi';
import { MentionUserOption } from './CommentMentionInput';
export type { MentionUserOption };
export interface CommentsSectionProps {
    comments: WorkflowComment[];
    onAddComment?: (body: string, mentionedUserIds?: number[]) => void;
    onResolveComment?: (commentId: string, resolved: boolean) => void;
    onArchiveComment?: (commentId: string, archived: boolean) => void;
    showArchived?: boolean;
    onShowArchivedChange?: (show: boolean) => void;
    compact?: boolean;
    mentionUsers?: MentionUserOption[];
}
declare const CommentsSection: ({ comments, onAddComment, onResolveComment, onArchiveComment, showArchived, onShowArchivedChange, compact, mentionUsers: mentionUsersProp }: CommentsSectionProps) => JSX.Element;
export default CommentsSection;
