import type { WorkflowContentEventType } from '../api/contentEventApi';

/** Map Studio socket/lifecycle hints to plugin create|edit; preview saves default to edit. */
export function resolveBridgeEventType(payload: { eventType?: string }): WorkflowContentEventType {
  const raw = payload?.eventType?.trim()?.toUpperCase();
  if (!raw || raw === 'CONTENT_EVENT') {
    return 'edit';
  }
  if (raw in { NEW: 1, CREATE: 1, CREATED: 1, DUPLICATE: 1, COPY: 1 }) {
    return 'create';
  }
  if (raw in { UPDATE: 1, EDIT: 1, UPDATED: 1 }) {
    return 'edit';
  }
  return 'edit';
}
