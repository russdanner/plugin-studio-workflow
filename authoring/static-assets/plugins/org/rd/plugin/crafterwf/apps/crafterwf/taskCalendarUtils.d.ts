import { TaskPriority, WorkflowTask } from '../api/taskApi';
export declare type CalendarViewMode = 'day' | 'week' | 'month';
export declare function parseCalendarDate(value?: string | null): Date | null;
/** @deprecated Use parseCalendarDate */
export declare function parseTaskDueDate(dueOn?: string | null): Date | null;
export declare function startOfDay(date: Date): Date;
export declare function endOfDay(date: Date): Date;
export declare function addDays(date: Date, days: number): Date;
export declare function addMonths(date: Date, months: number): Date;
/** Week starts on Sunday to match the month grid headers. */
export declare function startOfWeek(date: Date): Date;
export declare function endOfWeek(date: Date): Date;
export declare function startOfMonth(date: Date): Date;
export declare function endOfMonth(date: Date): Date;
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function isSameMonth(a: Date, b: Date): boolean;
export declare function toDayKey(date: Date): string;
export declare function taskOccursOnDay(task: WorkflowTask, day: Date): boolean;
export declare function getWeekDayDates(anchor: Date): Date[];
export declare function getMonthGridDays(anchor: Date): Date[];
export declare function formatCalendarDayLabel(date: Date): string;
export declare function formatCalendarDayHeading(date: Date): string;
export declare function formatCalendarWeekHeading(start: Date, end: Date): string;
export declare function formatCalendarMonthHeading(date: Date): string;
export declare function formatTaskDueTime(dueOn?: string | null): string;
export declare function priorityColor(priority: TaskPriority): 'error' | 'warning' | 'info';
export declare function shiftAnchorDate(anchor: Date, mode: CalendarViewMode, direction: -1 | 1): Date;
export declare function partitionTasksByDueDate(tasks: WorkflowTask[]): {
    scheduled: WorkflowTask[];
    unscheduled: WorkflowTask[];
};
export declare function tasksForDay(tasks: WorkflowTask[], day: Date): WorkflowTask[];
