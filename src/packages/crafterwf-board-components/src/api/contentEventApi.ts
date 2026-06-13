import { pluginGet } from './pluginHttp';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export type WorkflowContentEventType = 'create' | 'edit';

export function processWorkflowContentEvent(
  siteId: string,
  eventType: WorkflowContentEventType,
  contentPath: string,
  contentType?: string
) {
  const params = new URLSearchParams({
    siteId,
    eventType,
    contentPath
  });
  if (contentType?.trim()) {
    params.set('contentType', contentType.trim());
  }
  return pluginGet(`${PLUGIN_SERVICE_BASE}/content-event/process.json?${params.toString()}`);
}
