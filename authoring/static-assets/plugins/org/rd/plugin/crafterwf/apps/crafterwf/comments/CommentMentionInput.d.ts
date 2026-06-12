import { MentionUserRef } from '../../utils/mentionUtils';
export interface MentionUserOption extends MentionUserRef {
    label: string;
}
export interface CommentMentionInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    mentionUsers: MentionUserOption[];
    mentionUsersLoading?: boolean;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
}
declare const CommentMentionInput: ({ value, onChange, onSubmit, mentionUsers, mentionUsersLoading, placeholder, minRows, maxRows }: CommentMentionInputProps) => JSX.Element;
export default CommentMentionInput;
