import { fetchMyActivity, fetchUnpublished } from '@craftercms/studio-ui/services/dashboard';
import type { Activity } from '@craftercms/studio-ui/models/Activity';
import type { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { formatDateTime } from './dateTimeFormatting';

const FEED_LIMIT = 50;

const RECENT_ACTIVITY_ACTIONS = ['CREATE', 'UPDATE', 'MOVE'] as const;

export type ContentAttachFeedId = 'search' | 'recent' | 'unpublished';

export interface ContentAttachFeedEntry {
  path: string;
  label?: string | null;
  systemType?: string;
  subtitle?: string;
}

function activityActionLabel(actionType: Activity['actionType']): string {
  switch (actionType) {
    case 'CREATE':
      return 'Created';
    case 'UPDATE':
      return 'Updated';
    case 'MOVE':
      return 'Moved';
    default:
      return actionType.replace(/_/g, ' ').toLowerCase();
  }
}

function dedupeRecentActivity(activities: Activity[]): ContentAttachFeedEntry[] {
  const seen = new Set<string>();
  const entries: ContentAttachFeedEntry[] = [];

  activities.forEach((activity) => {
    const path = activity.item?.path?.trim();
    if (!path || seen.has(path)) {
      return;
    }
    seen.add(path);
    const action = activityActionLabel(activity.actionType);
    const when = activity.actionTimestamp ? formatDateTime(activity.actionTimestamp) : '';
    entries.push({
      path,
      label: activity.item?.label,
      systemType: activity.item?.systemType,
      subtitle: when ? `${action} · ${when}` : action
    });
  });

  return entries;
}

export function loadMyRecentActivityFeed(siteId: string): Observable<ContentAttachFeedEntry[]> {
  return fetchMyActivity(siteId, {
    limit: FEED_LIMIT,
    offset: 0,
    actions: [...RECENT_ACTIVITY_ACTIONS]
  }).pipe(
    map((activities) => dedupeRecentActivity(activities as Activity[])),
    catchError(() => of([]))
  );
}

export function loadUnpublishedWorkFeed(siteId: string): Observable<ContentAttachFeedEntry[]> {
  return fetchUnpublished(siteId, {
    limit: FEED_LIMIT,
    offset: 0,
    sortBy: 'dateModified',
    sortOrder: 'desc'
  }).pipe(
    map((items) =>
      (items as SandboxItem[]).map((item) => ({
        path: item.path,
        label: item.label,
        systemType: item.systemType,
        subtitle: item.dateModified ? `Modified · ${formatDateTime(item.dateModified)}` : 'Unpublished'
      }))
    ),
    catchError(() => of([]))
  );
}

export function excludeAttachedPaths(
  entries: ContentAttachFeedEntry[],
  attachedPaths: string[]
): ContentAttachFeedEntry[] {
  if (!attachedPaths.length) {
    return entries;
  }
  const attached = new Set(attachedPaths);
  return entries.filter((entry) => !attached.has(entry.path));
}
