import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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
  archiveTask,
  completeTask,
  formatTaskDateForApi,
  getTask,
  notifyTasksUpdated,
  TASK_TARGET,
  TaskPriority,
  updateTask,
  WorkflowTask
} from '../api/taskApi';
import {
  AssigneeMenuItem,
  resolveAssigneeLabel,
  TaskAssigneeOption,
  UserAvatarLabel,
  userLabel
} from '../components/users/studioUserDisplay';
import { formatDateTime, toDateTimeInputValue } from '../utils/dateTimeFormatting';

export interface TaskDetailDialogProps {
  open: boolean;
  task: WorkflowTask | null;
  onClose(): void;
  onOpenPackage?(packageId: string): void;
  onChanged?(): void;
}

const TaskDetailDialog = ({ open, task, onClose, onOpenPackage, onChanged }: TaskDetailDialogProps) => {
  const siteId = useActiveSiteId();
  const [currentTask, setCurrentTask] = useState<WorkflowTask | null>(task);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');
  const [editingDueOn, setEditingDueOn] = useState(false);
  const [editingStartOn, setEditingStartOn] = useState(false);
  const [assigneeOptions, setAssigneeOptions] = useState<TaskAssigneeOption[]>([]);

  const assigneeById = useMemo(() => {
    const map = new Map<number, TaskAssigneeOption>();
    assigneeOptions.forEach((option) => map.set(option.id, option));
    return map;
  }, [assigneeOptions]);

  const loadAssignees = useCallback(() => {
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
          }
        });
      },
      error(e) {
        console.error(e);
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      loadAssignees();
    }
  }, [open, loadAssignees]);

  useEffect(() => {
    if (!open || !task || !siteId) {
      setCurrentTask(task);
      return;
    }
    getTask(siteId, task.id).subscribe({
      next(response) {
        const fresh = response.response?.result as WorkflowTask | undefined;
        if (!fresh) {
          setCurrentTask(task);
          return;
        }
        setCurrentTask({
          ...fresh,
          complete: fresh.complete === true || (fresh as { complete?: unknown }).complete === 'true',
          archived: fresh.archived === true || (fresh as { archived?: unknown }).archived === 'true',
          priority: (fresh.priority ?? 'medium') as TaskPriority
        });
      },
      error(e) {
        console.error(e);
        setCurrentTask(task);
      }
    });
  }, [open, task, siteId]);

  useEffect(() => {
    setEditingTitle(false);
    setEditingDueOn(false);
    setEditingStartOn(false);
    setTitleDraft(currentTask?.title ?? '');
  }, [currentTask?.id, open]);

  if (!currentTask) {
    return null;
  }

  const handleComplete = (complete: boolean) => {
    if (!siteId || currentTask.archived) {
      return;
    }
    completeTask(siteId, currentTask.id, complete).subscribe({
      next() {
        setCurrentTask((prev) => (prev ? { ...prev, complete } : prev));
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleDueDateChange = (value: string | null) => {
    if (!siteId || currentTask.archived) {
      return;
    }
    updateTask(siteId, currentTask.id, { dueOn: formatTaskDateForApi(value) }).subscribe({
      next() {
        setEditingDueOn(false);
        setCurrentTask((prev) =>
          prev ? { ...prev, dueOn: formatTaskDateForApi(value) ?? undefined } : prev
        );
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleStartDateChange = (value: string | null) => {
    if (!siteId || currentTask.archived) {
      return;
    }
    updateTask(siteId, currentTask.id, { startOn: formatTaskDateForApi(value) }).subscribe({
      next() {
        setEditingStartOn(false);
        setCurrentTask((prev) =>
          prev ? { ...prev, startOn: formatTaskDateForApi(value) ?? undefined } : prev
        );
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleAssigneeChange = (assigneeId: number) => {
    if (!siteId || currentTask.archived || assigneeId === currentTask.assigneeId) {
      return;
    }
    const assignee = assigneeById.get(assigneeId);
    updateTask(siteId, currentTask.id, {
      assigneeId,
      assigneeUsername: assignee?.username ?? currentTask.assigneeUsername
    }).subscribe({
      next() {
        setCurrentTask((prev) =>
          prev
            ? {
                ...prev,
                assigneeId,
                assigneeUsername: assignee?.username ?? prev.assigneeUsername
              }
            : prev
        );
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const saveTitle = () => {
    const trimmed = titleDraft.trim();
    if (!siteId || !trimmed || trimmed === currentTask.title || currentTask.archived) {
      setEditingTitle(false);
      return;
    }
    updateTask(siteId, currentTask.id, { title: trimmed }).subscribe({
      next() {
        setCurrentTask((prev) => (prev ? { ...prev, title: trimmed } : prev));
        setEditingTitle(false);
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
        setEditingTitle(false);
      }
    });
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    if (!siteId || currentTask.archived || priority === currentTask.priority) {
      return;
    }
    updateTask(siteId, currentTask.id, { priority }).subscribe({
      next() {
        setCurrentTask((prev) => (prev ? { ...prev, priority } : prev));
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleArchive = (archived: boolean) => {
    if (!siteId) {
      return;
    }
    archiveTask(siteId, currentTask.id, archived).subscribe({
      next() {
        setCurrentTask((prev) => (prev ? { ...prev, archived } : prev));
        notifyTasksUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      aria-labelledby="calendar-task-detail-title"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle id="calendar-task-detail-title" sx={{ pb: 1 }}>
        Task
      </DialogTitle>
      <DialogContent dividers sx={{ px: 2, py: 1.5 }}>
        <Stack spacing={1.25}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Checkbox
              checked={currentTask.complete}
              disabled={currentTask.archived}
              onChange={(e) => handleComplete(e.target.checked)}
              sx={{ p: 0, mt: 0.25 }}
            />
            {editingTitle && !currentTask.archived ? (
              <TextField
                size="small"
                fullWidth
                autoFocus
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    saveTitle();
                  }
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    setEditingTitle(false);
                    setTitleDraft(currentTask.title);
                  }
                }}
                onBlur={saveTitle}
              />
            ) : (
              <Box
                component="button"
                type="button"
                disabled={currentTask.archived}
                onClick={() => {
                  if (!currentTask.archived) {
                    setTitleDraft(currentTask.title);
                    setEditingTitle(true);
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 0.5,
                  flex: 1,
                  minWidth: 0,
                  p: 0,
                  border: 0,
                  bgcolor: 'transparent',
                  textAlign: 'left',
                  cursor: currentTask.archived ? 'default' : 'pointer',
                  font: 'inherit'
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    flex: 1,
                    fontWeight: 600,
                    wordBreak: 'break-word',
                    textDecoration: currentTask.complete ? 'line-through' : 'none',
                    color: currentTask.complete ? 'text.secondary' : 'text.primary'
                  }}
                >
                  {currentTask.title}
                </Typography>
                {!currentTask.archived && (
                  <EditRoundedIcon sx={{ fontSize: 16, color: 'text.secondary', mt: 0.35, flexShrink: 0 }} />
                )}
              </Box>
            )}
            {currentTask.archived && (
              <Chip label="Archived" size="small" variant="outlined" sx={{ height: 22, fontSize: '0.7rem' }} />
            )}
          </Stack>

          {currentTask.targetType === TASK_TARGET.WORKFLOW_PACKAGE && currentTask.targetId && (
            <Typography variant="body2" color="text.secondary">
              Package:{' '}
              <Box
                component="button"
                type="button"
                onClick={() => onOpenPackage?.(currentTask.targetId!)}
                sx={{
                  p: 0,
                  border: 0,
                  bgcolor: 'transparent',
                  font: 'inherit',
                  fontSize: 'inherit',
                  color: 'primary.main',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  textUnderlineOffset: 2
                }}
              >
                {currentTask.targetTitle || 'Untitled package'}
              </Box>
            </Typography>
          )}

          <Stack spacing={0.35}>
            <Typography variant="caption" color="text.secondary">
              Created {formatDateTime(currentTask.createdOn)}
            </Typography>
            {editingStartOn && !currentTask.archived ? (
              <TextField
                size="small"
                type="datetime-local"
                autoFocus
                value={toDateTimeInputValue(currentTask.startOn)}
                onChange={(e) => handleStartDateChange(e.target.value || null)}
                onBlur={() => setEditingStartOn(false)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: 280, '& .MuiInputBase-input': { fontWeight: 600, py: 0.75 } }}
              />
            ) : (
              <Typography
                variant="body2"
                component="button"
                type="button"
                disabled={currentTask.archived}
                onClick={() => !currentTask.archived && setEditingStartOn(true)}
                sx={{
                  fontWeight: 600,
                  border: 0,
                  bgcolor: 'transparent',
                  p: 0,
                  m: 0,
                  cursor: currentTask.archived ? 'default' : 'pointer',
                  color: currentTask.startOn ? 'text.primary' : 'primary.main',
                  textAlign: 'left',
                  textDecoration: currentTask.archived ? 'none' : 'underline',
                  textUnderlineOffset: 2
                }}
              >
                {currentTask.startOn ? `Start ${formatDateTime(currentTask.startOn)}` : 'Add start date'}
              </Typography>
            )}
            {editingDueOn && !currentTask.archived ? (
              <TextField
                size="small"
                type="datetime-local"
                autoFocus
                value={toDateTimeInputValue(currentTask.dueOn)}
                onChange={(e) => handleDueDateChange(e.target.value || null)}
                onBlur={() => setEditingDueOn(false)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: 280, '& .MuiInputBase-input': { fontWeight: 600, py: 0.75 } }}
              />
            ) : (
              <Typography
                variant="body2"
                component="button"
                type="button"
                disabled={currentTask.archived}
                onClick={() => !currentTask.archived && setEditingDueOn(true)}
                sx={{
                  fontWeight: 600,
                  border: 0,
                  bgcolor: 'transparent',
                  p: 0,
                  m: 0,
                  cursor: currentTask.archived ? 'default' : 'pointer',
                  color: currentTask.dueOn ? 'text.primary' : 'primary.main',
                  textAlign: 'left',
                  textDecoration: currentTask.archived ? 'none' : 'underline',
                  textUnderlineOffset: 2
                }}
              >
                {currentTask.dueOn ? `Due ${formatDateTime(currentTask.dueOn)}` : 'Add due date'}
              </Typography>
            )}
          </Stack>

          {assigneeOptions.length > 0 ? (
            <FormControl size="small" fullWidth disabled={currentTask.archived}>
              <InputLabel id="calendar-task-assignee-label">Assignee</InputLabel>
              <Select
                labelId="calendar-task-assignee-label"
                label="Assignee"
                value={currentTask.assigneeId}
                onChange={(e) => handleAssigneeChange(e.target.value as number)}
                renderValue={(value) => {
                  const option = assigneeById.get(value as number);
                  const user = option ?? {
                    username: currentTask.assigneeUsername ?? `user-${currentTask.assigneeId}`,
                    firstName: undefined,
                    lastName: undefined
                  };
                  return (
                    <UserAvatarLabel
                      user={user}
                      label={
                        option?.label ??
                        resolveAssigneeLabel(currentTask.assigneeId, currentTask.assigneeUsername, assigneeOptions)
                      }
                      size={20}
                      typographyVariant="body2"
                    />
                  );
                }}
              >
                {assigneeOptions.map((option) => (
                  <AssigneeMenuItem key={option.id} option={option} />
                ))}
                {!assigneeById.has(currentTask.assigneeId) && (
                  <MenuItem value={currentTask.assigneeId}>
                    <UserAvatarLabel
                      user={{
                        username: currentTask.assigneeUsername ?? `user-${currentTask.assigneeId}`,
                        firstName: undefined,
                        lastName: undefined
                      }}
                      label={
                        currentTask.assigneeUsername || `User ${currentTask.assigneeId}`
                      }
                      size={22}
                    />
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          ) : (
            currentTask.assigneeUsername && (
              <UserAvatarLabel
                user={{ username: currentTask.assigneeUsername }}
                label={currentTask.assigneeUsername}
                size={24}
                typographyVariant="body2"
              />
            )
          )}

          <FormControl size="small" fullWidth disabled={currentTask.archived}>
            <InputLabel id="calendar-task-priority-label">Priority</InputLabel>
            <Select
              labelId="calendar-task-priority-label"
              label="Priority"
              value={currentTask.priority ?? 'medium'}
              onChange={(e) => handlePriorityChange(e.target.value as TaskPriority)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1.5, justifyContent: 'space-between' }}>
        <Button
          size="small"
          onClick={() => handleArchive(!currentTask.archived)}
          color={currentTask.archived ? 'primary' : 'inherit'}
        >
          {currentTask.archived ? 'Unarchive' : 'Archive'}
        </Button>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailDialog;
