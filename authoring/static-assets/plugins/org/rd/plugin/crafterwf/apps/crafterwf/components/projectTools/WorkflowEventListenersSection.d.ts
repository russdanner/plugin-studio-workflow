import { WorkflowStepDto } from '../../api/adminApi';
import { EditorEventListener } from '../../eventListeners';
export interface WorkflowEventListenersSectionProps {
    steps: WorkflowStepDto[];
    createListeners: EditorEventListener[];
    editListeners: EditorEventListener[];
    onCreateListenersChange(listeners: EditorEventListener[]): void;
    onEditListenersChange(listeners: EditorEventListener[]): void;
}
declare const WorkflowEventListenersSection: ({ steps, createListeners, editListeners, onCreateListenersChange, onEditListenersChange }: WorkflowEventListenersSectionProps) => JSX.Element;
export default WorkflowEventListenersSection;
