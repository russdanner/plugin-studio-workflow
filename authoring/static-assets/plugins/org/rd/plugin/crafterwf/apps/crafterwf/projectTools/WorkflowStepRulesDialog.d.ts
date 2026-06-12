import { StepContentRule, StepRoleRule } from '../../stepRules';
export interface WorkflowStepRulesDialogProps {
    open: boolean;
    stepName: string;
    roleRule: StepRoleRule;
    contentRule: StepContentRule;
    onClose(): void;
    onSave(roleRule: StepRoleRule, contentRule: StepContentRule): void;
}
declare const WorkflowStepRulesDialog: ({ open, stepName, roleRule: initialRoleRule, contentRule: initialContentRule, onClose, onSave }: WorkflowStepRulesDialogProps) => JSX.Element;
export default WorkflowStepRulesDialog;
