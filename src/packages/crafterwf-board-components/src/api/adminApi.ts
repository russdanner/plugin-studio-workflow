import { get, post } from '@craftercms/studio-ui/utils/ajax';
import { pluginDelete, pluginPost } from './pluginHttp';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export interface SchemaStatus {
  installed: boolean;
  schemaName: string;
  version: number;
  error?: string;
  remedialAction?: string;
  detail?: string;
}

export interface WorkflowSummary {
  id: string;
  name: string;
  description?: string;
  backgroundUrl?: string;
  position?: number;
  isDefault?: boolean;
  stepCount: number;
  packageCount: number;
}

import { StepActionType } from '../stepActions';
import { StepContentRule, StepRoleRule } from '../stepRules';
import { WorkflowEventListener } from '../eventListeners';

export interface WorkflowStepDto {
  id?: string;
  name: string;
  description?: string;
  position?: number;
  color?: string;
  isTerminal?: boolean;
  allowAddPackage?: boolean;
  clientKey?: string;
  actionType?: StepActionType;
  actionSuccessStepId?: string;
  actionSuccessStepClientKey?: string;
  /** @deprecated legacy boolean flags — use actionType */
  actionRequestPublishStaging?: boolean;
  actionRequestPublishLive?: boolean;
  actionPublishStaging?: boolean;
  actionPublishLive?: boolean;
  roleRule?: StepRoleRule;
  contentRule?: StepContentRule;
}

export interface PublishingTargetsInfo {
  stagingEnabled: boolean;
  targets?: string[];
}

export interface WorkflowDetail {
  workflow: {
    id: string;
    name: string;
    description?: string;
    backgroundUrl?: string;
    /** Board canvas swatch id (stored in background_url) */
    backgroundColor?: string;
    position?: number;
    isDefault?: boolean;
    createListeners?: WorkflowEventListener[];
    editListeners?: WorkflowEventListener[];
    bypassWarningMessage?: string;
    /** When true, authors may acknowledge and continue Studio publish/reject off-step. Default false. */
    allowUiBypass?: boolean;
  };
  steps: WorkflowStepDto[];
  createListeners?: WorkflowEventListener[];
  editListeners?: WorkflowEventListener[];
}

export function getSchemaStatus(siteId: string) {
  return get(
    `${PLUGIN_SERVICE_BASE}/admin/schema/status.json?siteId=${encodeURIComponent(siteId)}`
  );
}

export function installSchema(siteId: string) {
  return pluginPost(
    `${PLUGIN_SERVICE_BASE}/admin/schema/install.json?siteId=${encodeURIComponent(siteId)}`
  );
}

export function listWorkflows(siteId: string) {
  return get(`${PLUGIN_SERVICE_BASE}/admin/workflow/list.json?siteId=${encodeURIComponent(siteId)}`);
}

export function getWorkflow(siteId: string, workflowId: string) {
  return get(
    `${PLUGIN_SERVICE_BASE}/admin/workflow/get.json?siteId=${encodeURIComponent(siteId)}&workflowId=${encodeURIComponent(workflowId)}`
  );
}

export function createWorkflow(siteId: string, name: string, description = '') {
  const url =
    `${PLUGIN_SERVICE_BASE}/admin/workflow/create.json?siteId=${encodeURIComponent(siteId)}` +
    `&name=${encodeURIComponent(name)}` +
    `&description=${encodeURIComponent(description)}` +
    '&withDefaultSteps=true';
  return pluginPost(url);
}

export function deleteWorkflow(siteId: string, workflowId: string) {
  return pluginDelete(
    `${PLUGIN_SERVICE_BASE}/admin/workflow/delete.json?siteId=${encodeURIComponent(siteId)}&workflowId=${encodeURIComponent(workflowId)}`
  );
}

export function saveWorkflowDefinition(siteId: string, workflowId: string, payload: WorkflowDetail) {
  const createListeners = payload.createListeners ?? payload.workflow.createListeners ?? [];
  const editListeners = payload.editListeners ?? payload.workflow.editListeners ?? [];
  return post(
    `${PLUGIN_SERVICE_BASE}/admin/workflow/save.json?siteId=${encodeURIComponent(siteId)}`,
    {
      siteId,
      workflowId,
      workflow: {
        ...payload.workflow,
        createListeners,
        editListeners
      },
      steps: payload.steps,
      createListeners,
      editListeners
    }
  );
}

export function getPublishingTargets(siteId: string) {
  return get(
    `${PLUGIN_SERVICE_BASE}/admin/publishing/targets.json?siteId=${encodeURIComponent(siteId)}`
  );
}
