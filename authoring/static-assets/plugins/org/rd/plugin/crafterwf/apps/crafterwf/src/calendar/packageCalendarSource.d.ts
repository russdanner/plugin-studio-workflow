import { Observable } from 'rxjs';
import { CalendarEvent } from '../types/calendarEvent';
export interface CalendarPackageRecord {
    id: string;
    workflowId: string;
    title: string;
    dueOn: string;
    workflowName?: string;
    workflowBackgroundUrl?: string;
}
export declare function extractCalendarPackageList(response: unknown): CalendarPackageRecord[];
export declare function packageToCalendarEvent(pkg: CalendarPackageRecord): CalendarEvent;
export declare function getPackageFromCalendarEvent(event: CalendarEvent): CalendarPackageRecord | undefined;
export declare function loadPackageCalendarEvents(siteId: string): Observable<CalendarEvent[]>;
