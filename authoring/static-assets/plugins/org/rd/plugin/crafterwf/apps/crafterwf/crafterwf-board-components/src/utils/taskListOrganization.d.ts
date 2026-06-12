import { WorkflowTask } from '../api/taskApi';
export declare type TaskSortMode = 'due' | 'priority';
export interface TaskAssigneeGroup {
    assigneeId: number;
    assigneeUsername?: string;
    tasks: WorkflowTask[];
}
export declare function sortTasks(tasks: WorkflowTask[], sortBy: TaskSortMode): WorkflowTask[];
export declare function groupTasksByAssignee(tasks: WorkflowTask[]): TaskAssigneeGroup[];
export declare function orderAssigneeGroups(groups: TaskAssigneeGroup[], currentUserId: number | null, assigneeLabelFor: (group: TaskAssigneeGroup) => string): TaskAssigneeGroup[];
export declare function organizeTasksByAssignee(tasks: WorkflowTask[], sortBy: TaskSortMode, currentUserId: number | null, assigneeLabelFor: (group: TaskAssigneeGroup) => string): TaskAssigneeGroup[];
