import type { Dispatch } from 'redux';

import { batchActions } from '@craftercms/studio-ui/state/actions/misc';
import { fetchItemVersions } from '@craftercms/studio-ui/state/actions/versions';
import { showDependenciesDialog, showHistoryDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { getRootPath } from '@craftercms/studio-ui/utils/path';

import type { AttachedSandboxItem } from '../types/CardDetailsRecord';

export function openStudioItemHistory(dispatch: Dispatch, item: AttachedSandboxItem): void {
  if (!item?.path) {
    return;
  }
  dispatch(
    batchActions([
      fetchItemVersions({ item, rootPath: getRootPath(item.path) }),
      showHistoryDialog({})
    ])
  );
}

export function openStudioItemDependencies(dispatch: Dispatch, item: AttachedSandboxItem): void {
  if (!item?.path) {
    return;
  }
  dispatch(showDependenciesDialog({ item, rootPath: getRootPath(item.path) }));
}

export function resolveSandboxItemInternalName(item: AttachedSandboxItem): string {
  const detailed = item as AttachedSandboxItem & { internalName?: string };
  const internalName = detailed.internalName?.trim();
  if (internalName) {
    return internalName;
  }
  const label = item.label?.trim();
  if (label) {
    return label;
  }
  if (item.path) {
    const segments = item.path.split('/').filter(Boolean);
    return segments[segments.length - 1] || item.path;
  }
  return 'Untitled';
}
