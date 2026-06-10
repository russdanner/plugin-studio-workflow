import { WorkflowTask } from '../api/taskApi';
export interface TaskDetailDialogProps {
    open: boolean;
    task: WorkflowTask | null;
    onClose(): void;
    onOpenPackage?(packageId: string): void;
    onChanged?(): void;
}
declare const TaskDetailDialog: ({ open, task, onClose, onOpenPackage, onChanged }: TaskDetailDialogProps) => JSX.Element;
export default TaskDetailDialog;
