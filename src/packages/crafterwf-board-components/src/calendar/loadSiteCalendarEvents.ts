import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CalendarEvent } from '../types/calendarEvent';
import { loadPackageCalendarEvents } from './packageCalendarSource';
import { loadTaskCalendarEvents } from './taskCalendarSource';

/**
 * Aggregates date-based items from all registered calendar sources.
 * Add new sources here (e.g. campaigns) as they become available.
 */
export function loadSiteCalendarEvents(siteId: string): Observable<CalendarEvent[]> {
  return forkJoin([
    loadTaskCalendarEvents(siteId).pipe(catchError(() => of([] as CalendarEvent[]))),
    loadPackageCalendarEvents(siteId).pipe(catchError(() => of([] as CalendarEvent[])))
    // loadCampaignCalendarEvents(siteId).pipe(catchError(() => of([]))),
  ]).pipe(map((groups) => groups.flat()));
}
