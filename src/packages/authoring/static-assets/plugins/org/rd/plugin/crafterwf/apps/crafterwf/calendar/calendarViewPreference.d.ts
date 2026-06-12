import { CalendarViewMode } from '../utils/taskCalendarUtils';
export declare function readCalendarViewMode(siteId: string | undefined, fallback: CalendarViewMode): CalendarViewMode;
export declare function writeCalendarViewMode(siteId: string | undefined, mode: CalendarViewMode): void;
