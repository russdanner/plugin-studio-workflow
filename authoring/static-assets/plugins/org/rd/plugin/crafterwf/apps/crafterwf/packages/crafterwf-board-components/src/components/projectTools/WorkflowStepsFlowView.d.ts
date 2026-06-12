import type { WorkflowStepDto } from '../../api/adminApi';
export declare type FlowEditorStep = WorkflowStepDto & {
    clientKey: string;
};
export interface WorkflowStepsFlowViewProps {
    steps: FlowEditorStep[];
    selectedClientKey: string | null;
    onSelectStep(clientKey: string): void;
    onStepOrderChange(orderedClientKeys: string[]): void;
    onAddStep(): void;
}
declare const WorkflowStepsFlowView: ({ steps, selectedClientKey, onSelectStep, onStepOrderChange, onAddStep }: WorkflowStepsFlowViewProps) => JSX.Element;
export default WorkflowStepsFlowView;
