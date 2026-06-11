export interface WorkflowEventListener {
  id?: string;
  contentType: string;
  pathRegex: string;
  packageNamePrefix: string;
  stepId: string;
}

export type WorkflowEventListenerKind = 'create' | 'edit';

export function defaultEventListener(stepId = ''): WorkflowEventListener {
  return {
    contentType: '',
    pathRegex: '',
    packageNamePrefix: '',
    stepId
  };
}

export function newEventListenerClientKey(): string {
  return `listener-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export type EditorEventListener = WorkflowEventListener & { clientKey: string };

export function mapDetailListeners(
  listeners: WorkflowEventListener[] | undefined,
  defaultStepId = ''
): EditorEventListener[] {
  return (listeners ?? []).map((listener, index) => ({
    ...listener,
    clientKey: listener.id || `existing-listener-${index}`
  }));
}
