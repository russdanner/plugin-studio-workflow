import type { WorkflowFlowLayout, WorkflowFlowViewport, WorkflowStepDto } from '../../api/adminApi';
export declare type FlowEditorStep = WorkflowStepDto & {
    clientKey: string;
};
export interface WorkflowStepsFlowViewProps {
    steps: FlowEditorStep[];
    flowLayout: WorkflowFlowLayout;
    initialFlowViewport?: WorkflowFlowViewport | null;
    selectedClientKey: string | null;
    onSelectStep(clientKey: string): void;
    onFlowLayoutChange(layout: WorkflowFlowLayout): void;
    onFlowViewportChange?(viewport: WorkflowFlowViewport): void;
    onTransitionChange(sourceClientKey: string, targetClientKeys: string[]): void;
    onAddStep(): void;
}
export declare function buildDefaultRowLayout(steps: FlowEditorStep[]): WorkflowFlowLayout;
declare const WorkflowStepsFlowView: (props: WorkflowStepsFlowViewProps) => JSX.Element;
export default WorkflowStepsFlowView;
