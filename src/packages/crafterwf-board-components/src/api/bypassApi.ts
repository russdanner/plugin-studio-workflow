import { post } from '@craftercms/studio-ui/utils/ajax';
import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { pluginGet } from './pluginHttp';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export type WorkflowBypassStudioAction = 'publish' | 'request_publish' | 'reject';

export interface WorkflowBypassViolation {
  contentPath: string;
  packageId: string;
  packageTitle: string;
  workflowId: string;
  workflowName: string;
  currentStepId: string;
  currentStepName: string;
  warningMessage: string;
  allowUiBypass?: boolean;
  studioAction?: WorkflowBypassStudioAction;
}

export interface WorkflowBypassCheckResult {
  action: WorkflowBypassStudioAction;
  requiresAcknowledgement: boolean;
  allowUiBypass: boolean;
  violations: WorkflowBypassViolation[];
}

export type WorkflowBypassCheckResponse = { result: WorkflowBypassCheckResult };

export function checkWorkflowBypass(
  siteId: string,
  contentPaths: string[],
  action: WorkflowBypassStudioAction
): Observable<AjaxResponse<WorkflowBypassCheckResponse>> {
  const paths = contentPaths.filter(Boolean).join(',');
  return pluginGet(
    `${PLUGIN_SERVICE_BASE}/workflow-bypass/check.json?siteId=${encodeURIComponent(siteId)}` +
      `&contentPaths=${encodeURIComponent(paths)}` +
      `&action=${encodeURIComponent(action)}`
  ) as Observable<AjaxResponse<WorkflowBypassCheckResponse>>;
}

export function acknowledgeWorkflowBypass(
  siteId: string,
  action: WorkflowBypassStudioAction,
  violations: WorkflowBypassViolation[]
) {
  return post(`${PLUGIN_SERVICE_BASE}/workflow-bypass/acknowledge.json`, {
    siteId,
    action,
    violations
  });
}

export function recordWorkflowBypassAction(
  siteId: string,
  action: WorkflowBypassStudioAction,
  violations: WorkflowBypassViolation[]
) {
  return post(`${PLUGIN_SERVICE_BASE}/workflow-bypass/record-action.json`, {
    siteId,
    action,
    violations
  });
}
