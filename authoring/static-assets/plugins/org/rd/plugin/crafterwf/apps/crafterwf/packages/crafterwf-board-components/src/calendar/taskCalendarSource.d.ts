import { Observable } from 'rxjs';
import { WorkflowTask } from '../api/taskApi';
import { CalendarEvent } from '../types/calendarEvent';
export declare function taskToCalendarEvent(task: WorkflowTask): CalendarEvent;
export declare function loadTaskCalendarEvents(siteId: string): Observable<CalendarEvent[]>;
export declare function getTaskFromCalendarEvent(event: CalendarEvent): WorkflowTask | undefined;
