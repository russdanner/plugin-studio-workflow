import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { fetchAll as fetchAllUsers, me } from '@craftercms/studio-ui/services/users';

import {
  formatDueOnForApi,
  notifyTasksUpdated,
  TaskPriority,
  updateTask,
  WorkflowTask
} from '../../api/taskApi';
import {
  AssigneeMenuItem,
  findAssigneeOption,
  resolveAssigneeLabel,
  TaskAssigneeOption,
  UserAvatarLabel,
  userLabel
} from '../users/studioUserDisplay';
import { formatDateTime, toDateTimeInputValue } from '../../utils/dateTimeFormatting';

export type { TaskAssigneeOption };

export interface PackageTasksSectionProps {
  tasks: WorkflowTask[];
  onCreateTask?: (title: string, priority: TaskPriority, dueOn?: string, startOn?: string) => void;
  onCompleteTask?: (taskId: string, complete: boolean) => void;
  onArchiveTask?: (taskId: string, archived: boolean) => void;
  onTasksChange?: () => void;
  showArchived?: boolean;
  onShowArchivedChange?: (show: boolean) => void;
}

const PackageTasksSection = ({
  tasks,
  onCreateTask,
  onCompleteTask,
  onArchiveTask,
  onTasksChange,
  showArchived = false,
  onShowArchivedChange
}: PackageTasksSectionProps) => {
  const siteId = useActiveSiteId();
  const [titleDraft, setTitleDraft] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueOn, setDueOn] = useState('');
  const [startOn, setStartOn] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [assigneeOptions, setAssigneeOptions] = useState<TaskAssigneeOption[]>([]);
  const [assigneesLoading, setAssigneesLoading] = useState(false);
  const [editingTitleTaskId, setEditingTitleTaskId] = useState<string | null>(null);
  const [editingTitleDraft, setEditingTitleDraft] = useState('');
  const [editingDueTaskId, setEditingDueTaskId] = useState<string | null>(null);
  const [editingStartTaskId, setEditingStartTaskId] = useState<string | null>(null);

  const assigneeById = useMemo(() => {
    const map = new Map<number, TaskAssigneeOption>();
    assigneeOptions.forEach((option) => map.set(option.id, option));
    return map;
  }, [assigneeOptions]);

  const loadAssignees = useCallback(() => {
    setAssigneesLoading(true);
    me().subscribe({
      next(currentUser) {
        fetchAllUsers({ limit: 500, offset: 0 }).subscribe({
          next(users) {
            const enabled = (users ?? []).filter((user) => user.enabled !== false);
            setAssigneeOptions(
              enabled.map((user) => ({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                label: userLabel(user)
              }))
            );
            setAssigneesLoading(false);
          },
          error(e) {
            console.error(e);
            if (currentUser?.id != null) {
              setAssigneeOptions([
                {
                  id: currentUser.id,
                  username: currentUser.username,
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName,
                  label: userLabel(currentUser)
                }
              ]);
            }
            setAssigneesLoading(false);
          }
        });
      },
      error(e) {
        console.error(e);
        setAssigneesLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    loadAssignees();
  }, [loadAssignees]);

  const refreshTasks = () => {
    onTasksChange?.();
    notifyTasksUpdated();
  };

  const resetCreateForm = () => {
    setTitleDraft('');
    setDueOn('');
    setStartOn('');
    setPriority('medium');
  };

  const handleSubmit = () => {
    const title = titleDraft.trim();
    if (!title || !onCreateTask) {
      return;
    }
    onCreateTask(title, priority, dueOn || undefined, startOn || undefined);
    resetCreateForm();
    setShowAddForm(false);
  };

  const handlePriorityChange = (task: WorkflowTask, nextPriority: TaskPriority) => {
    if (!siteId) {
      return;
    }
    updateTask(siteId, task.id, { priority: nextPriority }).subscribe({
      next: refreshTasks,
      error(e) {
        console.error(e);
      }
    });
  };

  const handleAssigneeChange = (task: WorkflowTask, assigneeId: number) => {
    if (!siteId) {
      return;
    }
    const assignee = assigneeById.get(assigneeId);
    updateTask(siteId, task.id, {
      assigneeId,
      assigneeUsername: assignee?.username ?? task.assigneeUsername
    }).subscribe({
      next: refreshTasks,
      error(e) {
        console.error(e);
      }
    });
  };

  const handleDueDateChange = (task: WorkflowTask, value: string | null) => {
    if (!siteId) {
      return;
    }
    updateTask(siteId, task.id, { dueOn: formatDueOnForApi(value) }).subscribe({
      next() {
        setEditingDueTaskId(null);
        refreshTasks();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleStartDateChange = (task: WorkflowTask, value: string | null) => {
    if (!siteId) {
      return;
    }
    updateTask(siteId, task.id, { startOn: formatDueOnForApi(value) }).subscribe({
      next() {
        setEditingStartTaskId(null);
        refreshTasks();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const startTitleEdit = (task: WorkflowTask) => {
    setEditingTitleTaskId(task.id);
    setEditingTitleDraft(task.title);
  };

  const cancelTitleEdit = () => {
    setEditingTitleTaskId(null);
    setEditingTitleDraft('');
  };

  const saveTitleEdit = (task: WorkflowTask) => {
    const trimmed = editingTitleDraft.trim();
    if (!trimmed || !siteId) {
      cancelTitleEdit();
      return;
    }
    if (trimmed === task.title) {
      cancelTitleEdit();
      return;
    }
    updateTask(siteId, task.id, { title: trimmed }).subscribe({
      next() {
        cancelTitleEdit();
        refreshTasks();
      },
      error(e) {
        console.error(e);
        cancelTitleEdit();
      }
    });
  };

  const resolveAssigneeLabelForTask = (task: WorkflowTask): string =>
    resolveAssigneeLabel(task.assigneeId, task.assigneeUsername, assigneeOptions);

  const showArchivedToggle = Boolean(onShowArchivedChange);

  if (assigneesLoading && assigneeOptions.length === 0 && tasks.length > 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Stack spacing={1}>
      {tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 0.5 }}>
          {showArchived && showArchivedToggle ? 'No tasks (including archived).' : 'No tasks yet.'}
        </Typography>
      ) : (
        <Stack spacing={0.75}>
          {tasks.map((task) => (
            <Box
              key={task.id}
              sx={{
                p: 1.25,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                bgcolor: task.archived ? 'action.disabledBackground' : 'background.paper',
                opacity: task.archived ? 0.85 : 1,
                minWidth: 0
              }}
            >
              <Stack direction="row" spacing={0.75} alignItems="flex-start">
                {onCompleteTask && (
                  <Checkbox
                    size="small"
                    checked={task.complete}
                    disabled={task.archived}
                    onChange={(e) => onCompleteTask(task.id, e.target.checked)}
                    sx={{ p: 0, mt: 0.15, flexShrink: 0 }}
                  />
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={0.75} alignItems="flex-start" sx={{ mb: 0.75 }}>
                    {editingTitleTaskId === task.id ? (
                      <TextField
                        size="small"
                        fullWidth
                        autoFocus
                        value={editingTitleDraft}
                        onChange={(e) => setEditingTitleDraft(e.target.value)}
                        onBlur={() => saveTitleEdit(task)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            saveTitleEdit(task);
                          }
                          if (e.key === 'Escape') {
                            e.preventDefault();
                            cancelTitleEdit();
                          }
                        }}
                        sx={{ flex: 1, minWidth: 0 }}
                      />
                    ) : (
                      <Box
                        role="button"
                        tabIndex={task.archived ? -1 : 0}
                        onClick={() => !task.archived && startTitleEdit(task)}
                        onKeyDown={(e) => {
                          if (!task.archived && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            startTitleEdit(task);
                          }
                        }}
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 0.5,
                          cursor: task.archived ? 'default' : 'pointer',
                          '&:hover .package-task-title-edit-icon': {
                            opacity: task.archived ? 0 : 1
                          },
                          '&:hover .package-task-title-text': task.archived
                            ? undefined
                            : {
                                textDecoration: task.complete ? 'line-through underline' : 'underline',
                                textUnderlineOffset: 2
                              }
                        }}
                      >
                        <Typography
                          className="package-task-title-text"
                          variant="body2"
                          fontWeight={600}
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            wordBreak: 'break-word',
                            textDecoration: task.complete ? 'line-through' : 'none',
                            color: task.complete ? 'text.secondary' : 'text.primary'
                          }}
                        >
                          {task.title}
                        </Typography>
                        {!task.archived && (
                          <EditRoundedIcon
                            className="package-task-title-edit-icon"
                            sx={{
                              fontSize: 14,
                              opacity: 0,
                              transition: 'opacity 0.15s ease',
                              mt: 0.2,
                              flexShrink: 0,
                              color: 'text.secondary'
                            }}
                          />
                        )}
                      </Box>
                    )}
                    {task.archived && (
                      <Chip label="Archived" size="small" variant="outlined" sx={{ height: 22, fontSize: '0.7rem', flexShrink: 0 }} />
                    )}
                  </Stack>

                  <Stack spacing={0.35} sx={{ mb: 0.75 }}>
                    <Typography variant="caption" color="text.secondary">
                      Created {formatDateTime(task.createdOn)}
                    </Typography>

                    {editingStartTaskId === task.id ? (
                      <TextField
                        size="small"
                        type="datetime-local"
                        autoFocus
                        disabled={task.archived}
                        value={toDateTimeInputValue(task.startOn)}
                        onChange={(e) => handleStartDateChange(task, e.target.value || null)}
                        onBlur={() => setEditingStartTaskId(null)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ maxWidth: 240, '& .MuiInputBase-input': { fontWeight: 700, py: 0.5 } }}
                      />
                    ) : (
                      <Typography
                        variant="caption"
                        component="button"
                        type="button"
                        disabled={task.archived}
                        onClick={() => !task.archived && setEditingStartTaskId(task.id)}
                        sx={{
                          fontWeight: 700,
                          border: 0,
                          bgcolor: 'transparent',
                          p: 0,
                          m: 0,
                          cursor: task.archived ? 'default' : 'pointer',
                          color: task.startOn ? 'text.primary' : 'primary.main',
                          textAlign: 'left',
                          textDecoration: task.archived ? 'none' : 'underline',
                          textUnderlineOffset: 2,
                          '&:hover': task.archived ? undefined : { color: 'primary.main' }
                        }}
                      >
                        {task.startOn ? `Start ${formatDateTime(task.startOn)}` : 'Add start date'}
                      </Typography>
                    )}

                    {editingDueTaskId === task.id ? (
                      <TextField
                        size="small"
                        type="datetime-local"
                        autoFocus
                        disabled={task.archived}
                        value={toDateTimeInputValue(task.dueOn)}
                        onChange={(e) => handleDueDateChange(task, e.target.value || null)}
                        onBlur={() => setEditingDueTaskId(null)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ maxWidth: 240, '& .MuiInputBase-input': { fontWeight: 700, py: 0.5 } }}
                      />
                    ) : (
                      <Typography
                        variant="caption"
                        component="button"
                        type="button"
                        disabled={task.archived}
                        onClick={() => !task.archived && setEditingDueTaskId(task.id)}
                        sx={{
                          fontWeight: 700,
                          border: 0,
                          bgcolor: 'transparent',
                          p: 0,
                          m: 0,
                          cursor: task.archived ? 'default' : 'pointer',
                          color: task.dueOn ? 'text.primary' : 'primary.main',
                          textAlign: 'left',
                          textDecoration: task.archived ? 'none' : 'underline',
                          textUnderlineOffset: 2,
                          '&:hover': task.archived ? undefined : { color: 'primary.main' }
                        }}
                      >
                        {task.dueOn ? `Due ${formatDateTime(task.dueOn)}` : 'Add due date'}
                      </Typography>
                    )}
                  </Stack>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 1,
                      mb: 0.75
                    }}
                  >
                    <FormControl size="small" fullWidth>
                      <InputLabel id={`package-task-${task.id}-priority-label`}>Priority</InputLabel>
                      <Select
                        labelId={`package-task-${task.id}-priority-label`}
                        label="Priority"
                        value={task.priority}
                        onChange={(e) => handlePriorityChange(task, e.target.value as TaskPriority)}
                        disabled={task.archived}
                      >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>

                    {assigneeOptions.length > 0 ? (
                      <FormControl size="small" fullWidth>
                        <InputLabel id={`package-task-${task.id}-assignee-label`}>Assignee</InputLabel>
                        <Select
                          labelId={`package-task-${task.id}-assignee-label`}
                          label="Assignee"
                          value={task.assigneeId}
                          onChange={(e) => handleAssigneeChange(task, e.target.value as number)}
                          disabled={task.archived}
                          renderValue={(value) => {
                            const option = assigneeById.get(value as number);
                            const user = option ?? {
                              username: task.assigneeUsername ?? `user-${task.assigneeId}`,
                              firstName: undefined,
                              lastName: undefined
                            };
                            return (
                              <UserAvatarLabel
                                user={user}
                                label={option?.label ?? resolveAssigneeLabelForTask(task)}
                                size={20}
                                typographyVariant="body2"
                              />
                            );
                          }}
                        >
                          {assigneeOptions.map((option) => (
                            <AssigneeMenuItem key={option.id} option={option} />
                          ))}
                          {!assigneeById.has(task.assigneeId) && (
                            <MenuItem value={task.assigneeId}>
                              <UserAvatarLabel
                                user={{
                                  username: task.assigneeUsername ?? `user-${task.assigneeId}`,
                                  firstName: undefined,
                                  lastName: undefined
                                }}
                                label={resolveAssigneeLabelForTask(task)}
                                size={22}
                              />
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    ) : (
                      <UserAvatarLabel
                        user={{
                          username: task.assigneeUsername ?? `user-${task.assigneeId}`,
                          firstName: undefined,
                          lastName: undefined
                        }}
                        label={resolveAssigneeLabelForTask(task)}
                        size={20}
                        typographyVariant="caption"
                      />
                    )}
                  </Box>

                  {onArchiveTask && !task.archived && (
                    <Button size="small" sx={{ px: 0, minWidth: 0 }} onClick={() => onArchiveTask(task.id, true)}>
                      Archive
                    </Button>
                  )}
                  {onArchiveTask && task.archived && (
                    <Button size="small" sx={{ px: 0, minWidth: 0 }} onClick={() => onArchiveTask(task.id, false)}>
                      Restore
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      {showArchivedToggle && (
        <Button
          size="small"
          sx={{ alignSelf: 'flex-start', px: 0, minWidth: 0 }}
          onClick={() => onShowArchivedChange?.(!showArchived)}
        >
          {showArchived ? 'Hide archived' : 'Show archived'}
        </Button>
      )}

      {onCreateTask && !showAddForm && (
        <Button
          size="small"
          sx={{ alignSelf: 'flex-start', px: 0, minWidth: 0 }}
          onClick={() => setShowAddForm(true)}
        >
          Add task
        </Button>
      )}

      {onCreateTask && showAddForm && (
        <Stack spacing={1} sx={{ pt: 0.5 }}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              size="small"
              fullWidth
              autoFocus
              placeholder="Add a task…"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              sx={{ '& .MuiInputBase-input': { pr: 4 } }}
            />
            <IconButton
              size="small"
              color="primary"
              disabled={!titleDraft.trim()}
              onClick={handleSubmit}
              aria-label="Create task"
              sx={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }}
            >
              <SendRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={1}>
            <FormControl size="small" sx={{ minWidth: 110, flex: 1 }}>
              <InputLabel id="package-task-priority-label">Priority</InputLabel>
              <Select
                labelId="package-task-priority-label"
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              type="datetime-local"
              label="Start"
              InputLabelProps={{ shrink: true }}
              value={startOn}
              onChange={(e) => setStartOn(e.target.value)}
              sx={{ flex: 2, minWidth: 0 }}
            />
            <TextField
              size="small"
              type="datetime-local"
              label="Due"
              InputLabelProps={{ shrink: true }}
              value={dueOn}
              onChange={(e) => setDueOn(e.target.value)}
              sx={{ flex: 2, minWidth: 0 }}
            />
          </Stack>
          <Button
            size="small"
            sx={{ alignSelf: 'flex-start', px: 0, minWidth: 0 }}
            onClick={() => {
              resetCreateForm();
              setShowAddForm(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default PackageTasksSection;
