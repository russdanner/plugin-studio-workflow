import { TaskPriority, WorkflowTask } from '../api/taskApi';

export type CalendarViewMode = 'day' | 'week' | 'month';

export function parseCalendarDate(value?: string | null): Date | null {
  if (!value?.trim()) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** @deprecated Use parseCalendarDate */
export function parseTaskDueDate(dueOn?: string | null): Date | null {
  return parseCalendarDate(dueOn);
}

export function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function endOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

/** Week starts on Sunday to match the month grid headers. */
export function startOfWeek(date: Date): Date {
  const day = startOfDay(date);
  day.setDate(day.getDate() - day.getDay());
  return day;
}

export function endOfWeek(date: Date): Date {
  return endOfDay(addDays(startOfWeek(date), 6));
}

export function startOfMonth(date: Date): Date {
  return startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function endOfMonth(date: Date): Date {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function toDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function taskOccursOnDay(task: WorkflowTask, day: Date): boolean {
  const due = parseTaskDueDate(task.dueOn);
  return !!due && isSameDay(due, day);
}

export function getWeekDayDates(anchor: Date): Date[] {
  const start = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export function getMonthGridDays(anchor: Date): Date[] {
  const monthStart = startOfMonth(anchor);
  const gridStart = startOfWeek(monthStart);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

export function formatCalendarDayLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatCalendarDayHeading(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatCalendarWeekHeading(start: Date, end: Date): string {
  const sameYear = start.getFullYear() === end.getFullYear();
  const startLabel = start.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric'
  });
  const endLabel = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startLabel} – ${endLabel}`;
}

export function formatCalendarMonthHeading(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function formatTaskDueTime(dueOn?: string | null): string {
  const due = parseTaskDueDate(dueOn);
  if (!due) {
    return '';
  }
  return due.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export function priorityColor(priority: TaskPriority): 'error' | 'warning' | 'info' {
  if (priority === 'high') {
    return 'error';
  }
  if (priority === 'low') {
    return 'info';
  }
  return 'warning';
}

export function shiftAnchorDate(anchor: Date, mode: CalendarViewMode, direction: -1 | 1): Date {
  if (mode === 'day') {
    return addDays(anchor, direction);
  }
  if (mode === 'week') {
    return addDays(anchor, direction * 7);
  }
  return addMonths(anchor, direction);
}

export function partitionTasksByDueDate(tasks: WorkflowTask[]) {
  const scheduled: WorkflowTask[] = [];
  const unscheduled: WorkflowTask[] = [];
  tasks.forEach((task) => {
    if (parseTaskDueDate(task.dueOn)) {
      scheduled.push(task);
    } else {
      unscheduled.push(task);
    }
  });
  return { scheduled, unscheduled };
}

export function tasksForDay(tasks: WorkflowTask[], day: Date): WorkflowTask[] {
  return tasks
    .filter((task) => taskOccursOnDay(task, day))
    .sort((a, b) => {
      const dueA = parseTaskDueDate(a.dueOn)?.getTime() ?? 0;
      const dueB = parseTaskDueDate(b.dueOn)?.getTime() ?? 0;
      if (dueA !== dueB) {
        return dueA - dueB;
      }
      return a.title.localeCompare(b.title);
    });
}
