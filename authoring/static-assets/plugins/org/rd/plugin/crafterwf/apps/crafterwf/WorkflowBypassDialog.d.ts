import { WorkflowBypassStudioAction, WorkflowBypassViolation } from '../../api/bypassApi';
export interface WorkflowBypassDialogProps {
    open: boolean;
    action: WorkflowBypassStudioAction;
    allowUiBypass: boolean;
    violations: WorkflowBypassViolation[];
    acknowledging?: boolean;
    onCancel(): void;
    onConfirm(): void;
}
declare const WorkflowBypassDialog: ({ open, action, allowUiBypass, violations, acknowledging, onCancel, onConfirm }: WorkflowBypassDialogProps) => JSX.Element;
export default WorkflowBypassDialog;
