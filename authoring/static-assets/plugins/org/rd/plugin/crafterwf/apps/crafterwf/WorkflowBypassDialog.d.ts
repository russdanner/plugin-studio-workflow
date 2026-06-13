import { WorkflowBypassStudioAction, WorkflowBypassViolation } from '../../api/bypassApi';
export interface WorkflowBypassDialogProps {
    open: boolean;
    checking?: boolean;
    action: WorkflowBypassStudioAction;
    allowUiBypass: boolean;
    violations: WorkflowBypassViolation[];
    acknowledging?: boolean;
    onCancel(): void;
    onConfirm(): void;
}
declare const WorkflowBypassDialog: ({ open, checking, action, allowUiBypass, violations, acknowledging, onCancel, onConfirm }: WorkflowBypassDialogProps) => JSX.Element;
export default WorkflowBypassDialog;
