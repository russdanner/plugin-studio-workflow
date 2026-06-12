import { TaskPriority, WorkflowTask } from '../../api/taskApi';
import { TaskAssigneeOption } from '../users/studioUserDisplay';
export type { TaskAssigneeOption };
export interface PackageTasksSectionProps {
    tasks: WorkflowTask[];
    onCreateTask?: (title: string, priority: TaskPriority, dueOn?: string, startOn?: string) => void;
    onCompleteTask?: (taskId: string, complete: boolean) => void;
    onArchiveTask?: (taskId: string, archived: boolean) => void;
    onTasksChange?: () => void;
    showArchived?: boolean;
    onShowArchivedChange?: (show: boolean) => void;
}
declare const PackageTasksSection: ({ tasks, onCreateTask, onCompleteTask, onArchiveTask, onTasksChange, showArchived, onShowArchivedChange }: PackageTasksSectionProps) => JSX.Element;
export default PackageTasksSection;
