/** Identifies which system produced a calendar event. */
export type CalendarEventSourceId = 'task' | 'package';

export interface CalendarEvent {
  /** Stable composite id, e.g. `task:<uuid>` or `package:<uuid>`. */
  id: string;
  sourceId: CalendarEventSourceId;
  sourceRecordId: string;
  title: string;
  /** ISO date/time when the event occurs (or starts). */
  startsOn: string;
  endsOn?: string | null;
  /** MUI palette key for task priority accents. */
  accentColor?: 'error' | 'warning' | 'info' | 'primary' | 'secondary';
  /** Workflow board background color for package events. */
  accentHex?: string;
  complete?: boolean;
  archived?: boolean;
  subtitle?: string;
  /** Source-specific payload for rendering and actions. */
  meta?: Record<string, unknown>;
}

export const CALENDAR_UPDATED_EVENT = 'crafterwf:calendar-updated';

export function notifyCalendarUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CALENDAR_UPDATED_EVENT));
  }
}
