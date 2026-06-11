import { WorkflowTask } from '../api/taskApi';
import { CalendarEvent } from '../types/calendarEvent';
import { isSameDay, parseCalendarDate, startOfDay } from './taskCalendarUtils';

function isPastDueDate(isoDate?: string | null, reference = new Date()): boolean {
  const due = parseCalendarDate(isoDate);
  return !!(due && due.getTime() < reference.getTime());
}

export function eventOccursOnDay(event: CalendarEvent, day: Date): boolean {
  const start = parseCalendarDate(event.startsOn);
  if (!start) {
    return false;
  }
  if (isSameDay(start, day)) {
    return true;
  }
  const end = parseCalendarDate(event.endsOn);
  if (!end) {
    return false;
  }
  const dayStart = startOfDay(day).getTime();
  const rangeStart = startOfDay(start).getTime();
  const rangeEnd = startOfDay(end).getTime();
  return dayStart >= rangeStart && dayStart <= rangeEnd;
}

export function partitionEventsByDate(events: CalendarEvent[]) {
  const scheduled: CalendarEvent[] = [];
  const unscheduled: CalendarEvent[] = [];
  events.forEach((event) => {
    if (parseCalendarDate(event.startsOn)) {
      scheduled.push(event);
    } else {
      unscheduled.push(event);
    }
  });
  return { scheduled, unscheduled };
}

export function eventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  return events
    .filter((event) => eventOccursOnDay(event, day))
    .sort((a, b) => {
      const startA = parseCalendarDate(a.startsOn)?.getTime() ?? 0;
      const startB = parseCalendarDate(b.startsOn)?.getTime() ?? 0;
      if (startA !== startB) {
        return startA - startB;
      }
      const sourceCompare = String(a.sourceId).localeCompare(String(b.sourceId));
      if (sourceCompare !== 0) {
        return sourceCompare;
      }
      return a.title.localeCompare(b.title);
    });
}

export function isCountableCalendarEvent(event: CalendarEvent): boolean {
  return !(event.sourceId === 'task' && event.complete);
}

export function countEventsOnDay(events: CalendarEvent[], day: Date): number {
  return eventsForDay(events, day).filter(isCountableCalendarEvent).length;
}

export function isOverdueCalendarEvent(event: CalendarEvent, reference = new Date()): boolean {
  if (!isCountableCalendarEvent(event)) {
    return false;
  }
  if (event.sourceId === 'task') {
    const task = event.meta?.task as WorkflowTask | undefined;
    return !!(task && !task.complete && isPastDueDate(task.dueOn, reference));
  }
  if (event.sourceId === 'package') {
    return isPastDueDate(event.startsOn, reference);
  }
  return false;
}

export function countOverdueCalendarEvents(events: CalendarEvent[], reference = new Date()): number {
  return events.filter((event) => isOverdueCalendarEvent(event, reference)).length;
}

export function formatEventTime(startsOn?: string | null): string {
  const date = parseCalendarDate(startsOn);
  if (!date) {
    return '';
  }
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export type CalendarEventRangePosition = 'single' | 'start' | 'middle' | 'end';

export function eventRangePosition(event: CalendarEvent, day: Date): CalendarEventRangePosition | null {
  if (!eventOccursOnDay(event, day)) {
    return null;
  }
  const start = parseCalendarDate(event.startsOn);
  const end = parseCalendarDate(event.endsOn);
  if (!start) {
    return null;
  }
  if (!end || isSameDay(start, end)) {
    return 'single';
  }
  if (isSameDay(day, start)) {
    return 'start';
  }
  if (isSameDay(day, end)) {
    return 'end';
  }
  return 'middle';
}

export function isMultiDayEvent(event: CalendarEvent): boolean {
  const start = parseCalendarDate(event.startsOn);
  const end = parseCalendarDate(event.endsOn);
  return !!(start && end && !isSameDay(start, end));
}
