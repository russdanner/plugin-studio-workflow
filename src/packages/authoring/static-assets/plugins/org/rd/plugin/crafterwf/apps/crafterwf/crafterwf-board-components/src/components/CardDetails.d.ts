import CardRecord from '../types/CardRecord';
import CardDetailsRecord from '../types/CardDetailsRecord';
import { TaskPriority } from '../api/taskApi';
export interface CardDetailsProps {
    card: CardRecord;
    cardDetails: CardDetailsRecord;
    onRemoveAttachment(id: string): void;
    onRemoveContentItem?(path: string): void;
    onAddComment?(body: string, mentionedUserIds?: number[]): void;
    onResolveComment?(commentId: string, resolved: boolean): void;
    onArchiveComment?(commentId: string, archived: boolean): void;
    showArchivedComments?: boolean;
    onShowArchivedCommentsChange?(show: boolean): void;
    onCreateTask?(title: string, priority: TaskPriority, dueOn?: string): void;
    onCompleteTask?(taskId: string, complete: boolean): void;
    onArchiveTask?(taskId: string, archived: boolean): void;
    onTasksChange?(): void;
    showArchivedTasks?: boolean;
    onShowArchivedTasksChange?(show: boolean): void;
    description: string;
    onSaveDescription?(description: string): void;
    savingDescription?: boolean;
    dueOn?: string;
    onDueOnChange?(dueOn: string | null): void;
    savingDueOn?: boolean;
    auditRefreshKey?: number;
}
declare const CardDetails: ({ card, cardDetails, onRemoveAttachment, onRemoveContentItem, onAddComment, onResolveComment, onArchiveComment, showArchivedComments, onShowArchivedCommentsChange, onCreateTask, onCompleteTask, onArchiveTask, onTasksChange, showArchivedTasks, onShowArchivedTasksChange, description, onSaveDescription, savingDescription, dueOn, onDueOnChange, savingDueOn, auditRefreshKey }: CardDetailsProps) => JSX.Element;
export default CardDetails;
