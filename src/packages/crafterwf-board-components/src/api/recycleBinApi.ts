import { pluginGet, pluginPost } from './pluginHttp';
import { PLUGIN_SERVICE_BASE } from './workflowApi';

export const RECYCLE_BIN_UPDATED_EVENT = 'crafterwf-recycle-bin-updated';

export type RecycleBinSortField =
  | 'binnedOn'
  | 'internalName'
  | 'originalPath'
  | 'originalModifiedOn'
  | 'originalCreatedOn'
  | 'originalLastModifier'
  | 'binnedByUsername';

export type RecycleBinSortOrder = 'asc' | 'desc';

export interface RecycleBinItem {
  id: string;
  siteId: string;
  binPath: string;
  internalName?: string | null;
  originalPath: string;
  originalLastModifier?: string | null;
  originalModifiedOn?: string | null;
  originalCreatedOn?: string | null;
  originalCreatedBy?: string | null;
  originalSandboxState?: string | null;
  state: 'binned' | 'restored' | 'purged';
  binnedOn?: string | null;
  binnedByUserId?: number;
  binnedByUsername?: string | null;
  restoredOn?: string | null;
  restoredByUserId?: number | null;
  restoredByUsername?: string | null;
  purgedOn?: string | null;
  purgedByUserId?: number | null;
  purgedByUsername?: string | null;
}

export interface RecycleBinListResult {
  items: RecycleBinItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RecycleBinListOptions {
  state?: string;
  page?: number;
  pageSize?: number;
  sortBy?: RecycleBinSortField;
  sortOrder?: RecycleBinSortOrder;
  /** Keyword filter across name, paths, users, state, and dates */
  q?: string;
}

export function canAccessRecycleBin(siteId: string) {
  return pluginGet(
    `${PLUGIN_SERVICE_BASE}/recycle-bin/can-access.json?siteId=${encodeURIComponent(siteId)}`
  );
}

export function listRecycleBinItems(siteId: string, options: RecycleBinListOptions = {}) {
  const {
    state = 'binned',
    page = 1,
    pageSize = 10,
    sortBy = 'binnedOn',
    sortOrder = 'desc',
    q = ''
  } = options;
  const query =
    `${PLUGIN_SERVICE_BASE}/recycle-bin/list.json?siteId=${encodeURIComponent(siteId)}` +
    `&state=${encodeURIComponent(state)}` +
    `&page=${page}` +
    `&pageSize=${pageSize}` +
    `&sortBy=${encodeURIComponent(sortBy)}` +
    `&sortOrder=${encodeURIComponent(sortOrder)}`;
  const trimmedQ = q.trim();
  return pluginGet(
    trimmedQ ? `${query}&q=${encodeURIComponent(trimmedQ)}` : query
  );
}

export function binContentPaths(siteId: string, paths: string[]) {
  const pathsParam = paths.map((path) => encodeURIComponent(path)).join(',');
  return pluginPost(
    `${PLUGIN_SERVICE_BASE}/recycle-bin/bin.json?siteId=${encodeURIComponent(siteId)}&paths=${pathsParam}`
  );
}

export function checkRecycleBinRestore(siteId: string, id: string) {
  return pluginGet(
    `${PLUGIN_SERVICE_BASE}/recycle-bin/check-restore.json?siteId=${encodeURIComponent(siteId)}&id=${encodeURIComponent(id)}`
  );
}

export function restoreRecycleBinItem(siteId: string, id: string, confirmCollision = false) {
  return pluginPost(
    `${PLUGIN_SERVICE_BASE}/recycle-bin/restore.json?siteId=${encodeURIComponent(siteId)}&id=${encodeURIComponent(id)}&confirmCollision=${confirmCollision ? 'true' : 'false'}`
  );
}

export function purgeRecycleBinItem(siteId: string, id: string) {
  return pluginPost(
    `${PLUGIN_SERVICE_BASE}/recycle-bin/purge.json?siteId=${encodeURIComponent(siteId)}&id=${encodeURIComponent(id)}`
  );
}

export function notifyRecycleBinUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(RECYCLE_BIN_UPDATED_EVENT));
  }
}
