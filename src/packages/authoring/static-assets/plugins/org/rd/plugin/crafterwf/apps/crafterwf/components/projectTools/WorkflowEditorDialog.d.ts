import { WorkflowDetail } from '../../api/adminApi';
export interface WorkflowEditorDialogProps {
    open: boolean;
    detail: WorkflowDetail;
    onClose(): void;
    onSaved(): void;
}
declare const WorkflowEditorDialog: ({ open, detail, onClose, onSaved }: WorkflowEditorDialogProps) => JSX.Element;
export default WorkflowEditorDialog;
