import { pluginGet, pluginPost } from './pluginHttp';
import { openWorkflowBoard } from '../utils/openWorkflowBoard';
import type { Dispatch } from 'redux';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export type TaskPriority = 'high' | 'medium' | 'low';

export const TASK_TARGET = {
  WORKFLOW_PACKAGE: 'workflow_package',
  CONTENT: 'content'
} as const;

export type TaskTargetType = (typeof TASK_TARGET)[keyof typeof TASK_TARGET];

export interface WorkflowTask {
  id: string;
  siteId: string;
  title: string;
  priority: TaskPriority;
  assigneeId: number;
  assigneeUsername?: string;
  startOn?: string;
  dueOn?: string;
  complete: boolean;
  archived: boolean;
  targetType?: TaskTargetType;
  targetId?: string;
  targetTitle?: string;
  targetWorkflowId?: string;
  createdOn?: string;
  modifiedOn?: string;
  completedOn?: string;
}

export const TASKS_UPDATED_EVENT = 'crafterwf:tasks-updated';

export function notifyTasksUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(TASKS_UPDATED_EVENT));
  }
}

function isTruthy(value: unknown): boolean {
  return value === true || value === 1 || value === '1' || value === 'true';
}

export function extractTaskListResult(response: unknown): WorkflowTask[] {
  const body = (response as { response?: { result?: { tasks?: unknown[] } } })?.response;
  const rawTasks = body?.result?.tasks;
  if (!Array.isArray(rawTasks)) {
    return [];
  }
  return rawTasks.map((task) => {
    const row = task as WorkflowTask;
    return {
      ...row,
      complete: isTruthy(row.complete),
      archived: isTruthy(row.archived),
      priority: (row.priority ?? 'medium') as TaskPriority
    };
  });
}

export function formatDueOnForApi(value?: string | null): string | null {
  if (!value?.trim()) {
    return null;
  }
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed)) {
    return `${trimmed}:00`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return `${trimmed}T00:00:00`;
  }
  return trimmed;
}

/** @deprecated Use formatTaskDateForApi */
export const formatTaskDateForApi = formatDueOnForApi;

export function listTasks(
  siteId: string,
  includeComplete = true,
  includeArchived = false,
  targetType?: TaskTargetType,
  targetId?: string,
  allTasks = false
) {
  let url =
    `${PLUGIN_SERVICE_BASE}/task/list.json?siteId=${encodeURIComponent(siteId)}` +
    `&includeComplete=${includeComplete ? 'true' : 'false'}` +
    `&includeArchived=${includeArchived ? 'true' : 'false'}`;
  if (allTasks) {
    url += '&allTasks=true';
  }
  if (targetType) {
    url += `&targetType=${encodeURIComponent(targetType)}`;
  }
  if (targetId) {
    url += `&targetId=${encodeURIComponent(targetId)}`;
  }
  return pluginGet(url);
}

export function listAllTasks(siteId: string, includeComplete = true, includeArchived = false) {
  return listTasks(siteId, includeComplete, includeArchived, undefined, undefined, true);
}

export function getOpenTaskCount(siteId: string) {
  const url = `${PLUGIN_SERVICE_BASE}/task/open-count.json?siteId=${encodeURIComponent(siteId)}`;
  return pluginGet(url);
}

export function createTask(
  siteId: string,
  title: string,
  priority: TaskPriority = 'medium',
  dueOn?: string,
  targetType?: TaskTargetType,
  targetId?: string,
  assigneeId?: number,
  assigneeUsername?: string,
  startOn?: string
) {
  let url =
    `${PLUGIN_SERVICE_BASE}/task/create.json?siteId=${encodeURIComponent(siteId)}` +
    `&title=${encodeURIComponent(title)}` +
    `&priority=${encodeURIComponent(priority)}`;
  if (startOn) {
    url += `&startOn=${encodeURIComponent(startOn)}`;
  }
  if (dueOn) {
    url += `&dueOn=${encodeURIComponent(dueOn)}`;
  }
  if (targetType) {
    url += `&targetType=${encodeURIComponent(targetType)}`;
  }
  if (targetId) {
    url += `&targetId=${encodeURIComponent(targetId)}`;
  }
  if (assigneeId != null) {
    url += `&assigneeId=${assigneeId}`;
  }
  if (assigneeUsername) {
    url += `&assigneeUsername=${encodeURIComponent(assigneeUsername)}`;
  }
  return pluginPost(url);
}

export function updateTask(
  siteId: string,
  taskId: string,
  updates: {
    title?: string;
    priority?: TaskPriority;
    startOn?: string | null;
    dueOn?: string | null;
    targetType?: TaskTargetType;
    targetId?: string;
    assigneeId?: number;
    assigneeUsername?: string;
  }
) {
  let url =
    `${PLUGIN_SERVICE_BASE}/task/update.json?siteId=${encodeURIComponent(siteId)}` +
    `&taskId=${encodeURIComponent(taskId)}`;
  if (updates.title != null) {
    url += `&title=${encodeURIComponent(updates.title)}`;
  }
  if (updates.priority != null) {
    url += `&priority=${encodeURIComponent(updates.priority)}`;
  }
  if (updates.startOn !== undefined) {
    url += updates.startOn ? `&startOn=${encodeURIComponent(updates.startOn)}` : '&startOn=';
  }
  if (updates.dueOn !== undefined) {
    url += updates.dueOn ? `&dueOn=${encodeURIComponent(updates.dueOn)}` : '&dueOn=';
  }
  if (updates.targetType != null) {
    url += `&targetType=${encodeURIComponent(updates.targetType)}`;
  }
  if (updates.targetId != null) {
    url += `&targetId=${encodeURIComponent(updates.targetId)}`;
  }
  if (updates.assigneeId != null) {
    url += `&assigneeId=${updates.assigneeId}`;
  }
  if (updates.assigneeUsername != null) {
    url += `&assigneeUsername=${encodeURIComponent(updates.assigneeUsername)}`;
  }
  return pluginPost(url);
}

export function completeTask(siteId: string, taskId: string, complete: boolean) {
  const url =
    `${PLUGIN_SERVICE_BASE}/task/complete.json?siteId=${encodeURIComponent(siteId)}` +
    `&taskId=${encodeURIComponent(taskId)}` +
    `&complete=${complete ? 'true' : 'false'}`;
  return pluginPost(url);
}

export function archiveTask(siteId: string, taskId: string, archived: boolean) {
  const url =
    `${PLUGIN_SERVICE_BASE}/task/archive.json?siteId=${encodeURIComponent(siteId)}` +
    `&taskId=${encodeURIComponent(taskId)}` +
    `&archived=${archived ? 'true' : 'false'}`;
  return pluginPost(url);
}

export function getTask(siteId: string, taskId: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/task/get.json?siteId=${encodeURIComponent(siteId)}` +
    `&taskId=${encodeURIComponent(taskId)}`;
  return pluginGet(url);
}

export function listPackageTasks(
  siteId: string,
  workflowPackageId: string,
  includeComplete = true,
  includeArchived = false
) {
  return listTasks(
    siteId,
    includeComplete,
    includeArchived,
    TASK_TARGET.WORKFLOW_PACKAGE,
    workflowPackageId
  );
}

export function openWorkflowPackage(
  dispatch: Dispatch,
  workflowId: string,
  packageId: string,
  boardTitle = 'Workflow'
) {
  openWorkflowBoard(dispatch, boardTitle, { workflowId, openPackageId: packageId });
}

export function createPackageTask(
  siteId: string,
  workflowPackageId: string,
  title: string,
  priority: TaskPriority = 'medium',
  dueOn?: string,
  assigneeId?: number,
  assigneeUsername?: string,
  startOn?: string
) {
  return createTask(
    siteId,
    title,
    priority,
    dueOn,
    TASK_TARGET.WORKFLOW_PACKAGE,
    workflowPackageId,
    assigneeId,
    assigneeUsername,
    startOn
  );
}
