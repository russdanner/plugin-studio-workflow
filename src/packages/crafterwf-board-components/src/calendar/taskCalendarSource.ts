import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { extractTaskListResult, listAllTasks, TaskPriority, WorkflowTask } from '../api/taskApi';
import { CalendarEvent } from '../types/calendarEvent';
import { parseCalendarDate, priorityColor } from '../utils/taskCalendarUtils';

function resolveTaskCalendarDates(task: WorkflowTask): { startsOn: string; endsOn?: string } | null {
  const startRaw = task.startOn?.trim();
  const dueRaw = task.dueOn?.trim();
  if (startRaw && dueRaw) {
    const startDate = parseCalendarDate(startRaw);
    const dueDate = parseCalendarDate(dueRaw);
    if (startDate && dueDate && startDate.getTime() > dueDate.getTime()) {
      return { startsOn: dueRaw, endsOn: startRaw };
    }
    return { startsOn: startRaw, endsOn: dueRaw };
  }
  if (dueRaw) {
    return { startsOn: dueRaw };
  }
  if (startRaw) {
    return { startsOn: startRaw };
  }
  return null;
}

export function taskToCalendarEvent(task: WorkflowTask): CalendarEvent {
  const schedule = resolveTaskCalendarDates(task);
  return {
    id: `task:${task.id}`,
    sourceId: 'task',
    sourceRecordId: task.id,
    title: task.title,
    startsOn: schedule?.startsOn ?? '',
    endsOn: schedule?.endsOn,
    accentColor: priorityColor(task.priority ?? ('medium' as TaskPriority)),
    complete: task.complete,
    archived: task.archived,
    subtitle: task.assigneeUsername,
    meta: { task }
  };
}

export function loadTaskCalendarEvents(siteId: string): Observable<CalendarEvent[]> {
  return listAllTasks(siteId, true, false).pipe(
    map((response) => extractTaskListResult(response).map(taskToCalendarEvent))
  );
}

export function getTaskFromCalendarEvent(event: CalendarEvent): WorkflowTask | undefined {
  if (event.sourceId !== 'task') {
    return undefined;
  }
  return event.meta?.task as WorkflowTask | undefined;
}
