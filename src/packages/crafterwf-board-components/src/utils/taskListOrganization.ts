import { TaskPriority, WorkflowTask } from '../api/taskApi';

export type TaskSortMode = 'due' | 'priority';

export interface TaskAssigneeGroup {
  assigneeId: number;
  assigneeUsername?: string;
  tasks: WorkflowTask[];
}

const PRIORITY_RANK: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2
};

function parseTime(value?: string | null): number | null {
  if (!value) {
    return null;
  }
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : time;
}

function compareTasksByDue(a: WorkflowTask, b: WorkflowTask): number {
  const dueA = parseTime(a.dueOn);
  const dueB = parseTime(b.dueOn);
  if (dueA != null && dueB != null && dueA !== dueB) {
    return dueA - dueB;
  }
  if (dueA != null && dueB == null) {
    return -1;
  }
  if (dueA == null && dueB != null) {
    return 1;
  }
  const startA = parseTime(a.startOn);
  const startB = parseTime(b.startOn);
  if (startA != null && startB != null && startA !== startB) {
    return startA - startB;
  }
  if (a.complete !== b.complete) {
    return a.complete ? 1 : -1;
  }
  return a.title.localeCompare(b.title);
}

function compareTasksByPriority(a: WorkflowTask, b: WorkflowTask): number {
  const rankA = PRIORITY_RANK[a.priority ?? 'medium'];
  const rankB = PRIORITY_RANK[b.priority ?? 'medium'];
  if (rankA !== rankB) {
    return rankA - rankB;
  }
  return compareTasksByDue(a, b);
}

export function sortTasks(tasks: WorkflowTask[], sortBy: TaskSortMode): WorkflowTask[] {
  const copy = [...tasks];
  copy.sort(sortBy === 'priority' ? compareTasksByPriority : compareTasksByDue);
  return copy;
}

export function groupTasksByAssignee(tasks: WorkflowTask[]): TaskAssigneeGroup[] {
  const byAssignee = new Map<number, TaskAssigneeGroup>();
  tasks.forEach((task) => {
    const existing = byAssignee.get(task.assigneeId);
    if (existing) {
      existing.tasks.push(task);
      return;
    }
    byAssignee.set(task.assigneeId, {
      assigneeId: task.assigneeId,
      assigneeUsername: task.assigneeUsername,
      tasks: [task]
    });
  });
  return Array.from(byAssignee.values());
}

export function orderAssigneeGroups(
  groups: TaskAssigneeGroup[],
  currentUserId: number | null,
  assigneeLabelFor: (group: TaskAssigneeGroup) => string
): TaskAssigneeGroup[] {
  const sorted = [...groups];
  sorted.sort((a, b) => {
    if (currentUserId != null) {
      if (a.assigneeId === currentUserId && b.assigneeId !== currentUserId) {
        return -1;
      }
      if (b.assigneeId === currentUserId && a.assigneeId !== currentUserId) {
        return 1;
      }
    }
    return assigneeLabelFor(a).localeCompare(assigneeLabelFor(b));
  });
  return sorted;
}

export function organizeTasksByAssignee(
  tasks: WorkflowTask[],
  sortBy: TaskSortMode,
  currentUserId: number | null,
  assigneeLabelFor: (group: TaskAssigneeGroup) => string
): TaskAssigneeGroup[] {
  const sorted = sortTasks(tasks, sortBy);
  const groups = groupTasksByAssignee(sorted);
  const ordered = orderAssigneeGroups(groups, currentUserId, assigneeLabelFor);
  return ordered.map((group) => ({
    ...group,
    tasks: sortTasks(group.tasks, sortBy)
  }));
}
