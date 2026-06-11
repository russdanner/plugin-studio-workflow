import { get } from '@craftercms/studio-ui/utils/ajax';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export type AuditTargetType = 'workflow' | 'package' | 'task';

export type AuditOperation =
  | 'task_created'
  | 'task_modified'
  | 'package_created'
  | 'package_step_changed'
  | 'package_step_action'
  | 'package_modified'
  | 'workflow_bypass_acknowledged'
  | 'workflow_bypass_action';

export interface AuditLogEntry {
  id: string;
  siteId: string;
  userId?: number;
  username: string;
  operation: AuditOperation | string;
  targetType: AuditTargetType | string;
  targetId: string;
  note?: string;
  createdOn: string;
}

export interface AuditLogSearchResult {
  entries: AuditLogEntry[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AuditLogSearchParams {
  username?: string;
  operation?: string;
  targetType?: string;
  targetId?: string;
  q?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'createdOn' | 'username' | 'operation' | 'note';
  sortOrder?: 'asc' | 'desc';
}

export function searchAuditLog(siteId: string, params: AuditLogSearchParams = {}) {
  const query = new URLSearchParams({ siteId });
  if (params.username) {
    query.set('username', params.username);
  }
  if (params.operation) {
    query.set('operation', params.operation);
  }
  if (params.targetType) {
    query.set('targetType', params.targetType);
  }
  if (params.targetId) {
    query.set('targetId', params.targetId);
  }
  if (params.q) {
    query.set('q', params.q);
  }
  if (params.from) {
    query.set('from', params.from);
  }
  if (params.to) {
    query.set('to', params.to);
  }
  if (params.page != null) {
    query.set('page', String(params.page));
  }
  if (params.pageSize != null) {
    query.set('pageSize', String(params.pageSize));
  }
  if (params.sortBy) {
    query.set('sortBy', params.sortBy);
  }
  if (params.sortOrder) {
    query.set('sortOrder', params.sortOrder);
  }
  return get(`${PLUGIN_SERVICE_BASE}/audit/list.json?${query.toString()}`);
}

export function listPackageAuditLog(
  siteId: string,
  packageId: string,
  page = 1,
  pageSize = 10,
  sortBy: AuditLogSearchParams['sortBy'] = 'createdOn',
  sortOrder: AuditLogSearchParams['sortOrder'] = 'desc'
) {
  return searchAuditLog(siteId, {
    targetType: 'package',
    targetId: packageId,
    page,
    pageSize,
    sortBy,
    sortOrder
  });
}
