import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { get } from '@craftercms/studio-ui/utils/ajax';

import { PLUGIN_SERVICE_BASE } from '../api/workflowApi';
import { resolveBoardBackgroundColor } from '../colors';
import { CalendarEvent } from '../types/calendarEvent';

export interface CalendarPackageRecord {
  id: string;
  workflowId: string;
  title: string;
  dueOn: string;
  workflowName?: string;
  workflowBackgroundUrl?: string;
}

export function extractCalendarPackageList(response: unknown): CalendarPackageRecord[] {
  const packages = (response as { response?: { result?: { packages?: unknown[] } } })?.response?.result
    ?.packages;
  if (!Array.isArray(packages)) {
    return [];
  }
  return packages as CalendarPackageRecord[];
}

export function packageToCalendarEvent(pkg: CalendarPackageRecord): CalendarEvent {
  return {
    id: `package:${pkg.id}`,
    sourceId: 'package',
    sourceRecordId: pkg.id,
    title: pkg.title,
    startsOn: pkg.dueOn,
    accentHex: resolveBoardBackgroundColor(pkg.workflowBackgroundUrl),
    subtitle: pkg.workflowName,
    meta: {
      workflowId: pkg.workflowId,
      workflowName: pkg.workflowName,
      workflowBackgroundUrl: pkg.workflowBackgroundUrl
    }
  };
}

export function getPackageFromCalendarEvent(event: CalendarEvent): CalendarPackageRecord | undefined {
  if (event.sourceId !== 'package') {
    return undefined;
  }
  return {
    id: event.sourceRecordId,
    workflowId: (event.meta?.workflowId as string) ?? '',
    title: event.title,
    dueOn: event.startsOn,
    workflowName: event.subtitle,
    workflowBackgroundUrl: event.meta?.workflowBackgroundUrl as string | undefined
  };
}

export function loadPackageCalendarEvents(siteId: string): Observable<CalendarEvent[]> {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/calendar-list.json?siteId=${encodeURIComponent(siteId)}`;
  return get(url).pipe(map((response) => extractCalendarPackageList(response).map(packageToCalendarEvent)));
}
