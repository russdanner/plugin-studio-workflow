import { Observable } from 'rxjs';
import { CalendarEvent } from '../types/calendarEvent';
/**
 * Aggregates date-based items from all registered calendar sources.
 * Add new sources here (e.g. campaigns) as they become available.
 */
export declare function loadSiteCalendarEvents(siteId: string): Observable<CalendarEvent[]>;
