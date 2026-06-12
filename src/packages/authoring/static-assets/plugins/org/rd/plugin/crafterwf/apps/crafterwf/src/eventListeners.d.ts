export interface WorkflowEventListener {
    id?: string;
    contentType: string;
    pathRegex: string;
    packageNamePrefix: string;
    stepId: string;
}
export declare type WorkflowEventListenerKind = 'create' | 'edit';
export declare function defaultEventListener(stepId?: string): WorkflowEventListener;
export declare function newEventListenerClientKey(): string;
export declare type EditorEventListener = WorkflowEventListener & {
    clientKey: string;
};
export declare function mapDetailListeners(listeners: WorkflowEventListener[] | undefined, defaultStepId?: string): EditorEventListener[];
