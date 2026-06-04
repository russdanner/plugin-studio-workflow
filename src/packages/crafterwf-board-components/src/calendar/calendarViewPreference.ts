import { CalendarViewMode } from '../utils/taskCalendarUtils';

const STORAGE_KEY = 'crafterwf:calendar-view-mode';

const VALID_MODES: CalendarViewMode[] = ['day', 'week', 'month'];

function isCalendarViewMode(value: unknown): value is CalendarViewMode {
  return typeof value === 'string' && VALID_MODES.includes(value as CalendarViewMode);
}

function storageKey(siteId?: string): string {
  return siteId ? `${STORAGE_KEY}:${siteId}` : STORAGE_KEY;
}

export function readCalendarViewMode(siteId: string | undefined, fallback: CalendarViewMode): CalendarViewMode {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const stored = window.localStorage.getItem(storageKey(siteId));
    return isCalendarViewMode(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

export function writeCalendarViewMode(siteId: string | undefined, mode: CalendarViewMode): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(storageKey(siteId), mode);
  } catch {
    // Ignore quota / private mode errors
  }
}
