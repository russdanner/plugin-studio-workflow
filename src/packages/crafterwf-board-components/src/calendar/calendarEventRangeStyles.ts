import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system';

import { CalendarEvent } from '../types/calendarEvent';
import { CalendarEventRangePosition, eventRangePosition } from '../utils/calendarEventUtils';
import { calendarEventBorderColor } from './calendarEventDisplay';

export function calendarEventRangeSx(
  theme: Theme,
  event: CalendarEvent,
  _day: Date,
  position: CalendarEventRangePosition | null
): SystemStyleObject<Theme> {
  const borderColor = calendarEventBorderColor(theme, event);
  const isRange = position === 'start' || position === 'middle' || position === 'end';
  return {
    borderLeft: `3px solid ${borderColor}`,
    borderTopLeftRadius: position === 'start' || position === 'single' ? 6 : 0,
    borderBottomLeftRadius: position === 'start' || position === 'single' ? 6 : 0,
    borderTopRightRadius: position === 'end' || position === 'single' ? 6 : 0,
    borderBottomRightRadius: position === 'end' || position === 'single' ? 6 : 0,
    ml: position === 'middle' || position === 'end' ? -0.5 : 0,
    mr: position === 'middle' || position === 'start' ? -0.5 : 0,
    px: isRange ? 0.75 : undefined,
    bgcolor: event.complete ? 'action.hover' : isRange ? 'action.selected' : undefined
  };
}

export function shouldShowEventTitle(position: CalendarEventRangePosition | null): boolean {
  return position !== 'middle';
}

export function resolveEventRangePosition(event: CalendarEvent, day: Date): CalendarEventRangePosition | null {
  return eventRangePosition(event, day);
}
