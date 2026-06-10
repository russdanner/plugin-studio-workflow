import { WorkflowComment } from '../../api/workflowApi';
export interface MentionUserOption {
    id: number;
    username: string;
    label: string;
}
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
