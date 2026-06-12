import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system';
import { CalendarEvent } from '../types/calendarEvent';
import { CalendarEventRangePosition } from '../utils/calendarEventUtils';
export declare function calendarEventRangeSx(theme: Theme, event: CalendarEvent, _day: Date, position: CalendarEventRangePosition | null): SystemStyleObject<Theme>;
export declare function shouldShowEventTitle(position: CalendarEventRangePosition | null): boolean;
export declare function resolveEventRangePosition(event: CalendarEvent, day: Date): CalendarEventRangePosition | null;
