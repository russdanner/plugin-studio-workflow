import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
import { getItemStateId, isInWorkflow } from './sandboxItemStateUtils';

const WORKFLOW_STATE_LABELS: Record<string, string> = {
  new: 'New',
  modified: 'Modified',
  deleted: 'Deleted',
  locked: 'Locked',
  systemProcessing: 'System Processing',
  submitted: 'Submitted',
  scheduled: 'Scheduled',
  publishing: 'Publishing',
  submittedToStaging: 'Submitted to staging',
  submittedToLive: 'Submitted to live',
  disabled: 'Disabled'
};

/** Plain-text workflow/publishing state for attachment rows (matches Studio item navigator). */
export function getSandboxItemStateLabel(item: AttachedSandboxItem): string {
  if (!item?.stateMap) {
    return '';
  }
  if (!isInWorkflow(item.stateMap)) {
    if (item.stateMap.live) {
      return 'Live';
    }
    if (item.stateMap.staged) {
      return 'Staged';
    }
    return 'Unpublished';
  }
  const stateId = getItemStateId(item.stateMap);
  if (!stateId) {
    return 'Not in workflow';
  }
  if (stateId === 'locked' && item.lockOwner?.username) {
    return `Locked by ${item.lockOwner.username}`;
  }
  return WORKFLOW_STATE_LABELS[stateId] ?? 'Not in workflow';
}
