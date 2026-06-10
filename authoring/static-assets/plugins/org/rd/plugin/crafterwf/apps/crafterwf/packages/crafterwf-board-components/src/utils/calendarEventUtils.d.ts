import { CalendarEvent } from '../types/calendarEvent';
export declare function eventOccursOnDay(event: CalendarEvent, day: Date): boolean;
export declare function partitionEventsByDate(events: CalendarEvent[]): {
    scheduled: CalendarEvent[];
    unscheduled: CalendarEvent[];
};
export declare function eventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
export declare function isCountableCalendarEvent(event: CalendarEvent): boolean;
export declare function countEventsOnDay(events: CalendarEvent[], day: Date): number;
export declare function formatEventTime(startsOn?: string | null): string;
export declare type CalendarEventRangePosition = 'single' | 'start' | 'middle' | 'end';
export declare function eventRangePosition(event: CalendarEvent, day: Date): CalendarEventRangePosition | null;
export declare function isMultiDayEvent(event: CalendarEvent): boolean;
