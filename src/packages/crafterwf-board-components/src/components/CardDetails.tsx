import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Divider
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CardRecord from '../types/CardRecord';
import CardDetailsRecord, { AttachedSandboxItem } from '../types/CardDetailsRecord';
import AttachedSandboxItemDisplay from './AttachedSandboxItemDisplay';
import CommentsSection from './comments/CommentsSection';
import PackageTasksSection from './tasks/PackageTasksSection';
import PackageAuditTrailSection from './PackageAuditTrailSection';
import { TaskPriority } from '../api/taskApi';
import { resolveAttachmentDisplayName } from '../utils/attachmentUtils';
import { formatDateTime, toDateTimeInputValue } from '../utils/dateTimeFormatting';
import useStudioItemPreview from '../hooks/useStudioItemPreview';
import { PACKAGE_DESCRIPTION_MAX_LENGTH } from '../consts';

export interface CardDetailsProps {
  card: CardRecord;
  cardDetails: CardDetailsRecord;
  onRemoveAttachment(id: string): void;
  onRemoveContentItem?(path: string): void;
  onAddComment?(body: string, mentionedUserIds?: number[]): void;
  onResolveComment?(commentId: string, resolved: boolean): void;
  onArchiveComment?(commentId: string, archived: boolean): void;
  showArchivedComments?: boolean;
  onShowArchivedCommentsChange?(show: boolean): void;
  onCreateTask?(title: string, priority: TaskPriority, dueOn?: string): void;
  onCompleteTask?(taskId: string, complete: boolean): void;
  onArchiveTask?(taskId: string, archived: boolean): void;
  onTasksChange?(): void;
  showArchivedTasks?: boolean;
  onShowArchivedTasksChange?(show: boolean): void;
  description: string;
  onSaveDescription?(description: string): void;
  savingDescription?: boolean;
  dueOn?: string;
  onDueOnChange?(dueOn: string | null): void;
  savingDueOn?: boolean;
  auditRefreshKey?: number;
}

const dense = true;

/** Long paths/URLs in list rows need this so flex layout does not overflow the dialog. */
const listItemRowSx = { alignItems: 'flex-start' as const, py: 0.5, minWidth: 0 };
const listItemTextSx = { minWidth: 0, pr: 1 };
const longTextSx = { wordBreak: 'break-all' as const, overflowWrap: 'anywhere' as const };

function formatContentTypeLabel(contentTypeId: string): string {
  const parts = contentTypeId.split('/').filter(Boolean);
  if (parts.length === 0) {
    return contentTypeId;
  }
  const namePart = parts[parts.length - 1].replace(/[-_]/g, ' ');
  const label = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  if (parts.length > 1) {
    const category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return `${label} (${category})`;
  }
  return label;
}

function resolveSandboxItemLabel(item: AttachedSandboxItem): string {
  const label = item.label?.trim();
  if (label) {
    return label;
  }
  if (item.path) {
    const segments = item.path.split('/').filter(Boolean);
    return segments[segments.length - 1] || item.path;
  }
  return 'Untitled';
}

function groupContentByType(items: AttachedSandboxItem[]): Array<[string, AttachedSandboxItem[]]> {
  const groups = new Map<string, AttachedSandboxItem[]>();
  items.forEach((item) => {
    const type = item.contentTypeId || 'Other';
    if (!groups.has(type)) {
      groups.set(type, []);
    }
    groups.get(type)!.push(item);
  });
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

const CardDetails = ({
  card,
  cardDetails,
  onRemoveAttachment,
  onRemoveContentItem,
  onAddComment,
  onResolveComment,
  onArchiveComment,
  showArchivedComments = false,
  onShowArchivedCommentsChange,
  onCreateTask,
  onCompleteTask,
  onArchiveTask,
  onTasksChange,
  showArchivedTasks = false,
  onShowArchivedTasksChange,
  description,
  onSaveDescription,
  savingDescription = false,
  dueOn,
  onDueOnChange,
  savingDueOn = false,
  auditRefreshKey = 0
}: CardDetailsProps) => {
  const { previewItem, previewPath } = useStudioItemPreview();
  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionDraft, setDescriptionDraft] = useState(description);
  const [editingDueOn, setEditingDueOn] = useState(false);

  useEffect(() => {
    setDescriptionDraft(description);
    setEditingDescription(false);
  }, [description, card.id]);

  useEffect(() => {
    setEditingDueOn(false);
  }, [dueOn, card.id]);

  const handleStartEditDescription = () => {
    setDescriptionDraft(description);
    setEditingDescription(true);
  };

  const handleCancelEditDescription = () => {
    setDescriptionDraft(description);
    setEditingDescription(false);
  };

  const handleConfirmEditDescription = () => {
    if (!onSaveDescription || savingDescription) {
      return;
    }
    if (descriptionDraft.trim() === (description?.trim() || '')) {
      setEditingDescription(false);
      return;
    }
    onSaveDescription(descriptionDraft);
  };

  const handleRemoveAttachment = (id: string) => {
    onRemoveAttachment(id);
  };

  const handleRemoveContentItem = (path: string) => {
    if (onRemoveContentItem) {
      onRemoveContentItem(path);
    }
  };

  const contentItems = cardDetails.attachedContentItems ?? [];
  const documents = cardDetails.attachedDocuments ?? [];
  const comments = cardDetails.comments ?? [];
  const tasks = cardDetails.tasks ?? [];

  const contentGroups = useMemo(() => groupContentByType(contentItems), [contentItems]);

  return (
    <Stack spacing={1.25} sx={{ py: 0, px: 0, minWidth: 0, maxWidth: '100%' }}>
      <Stack spacing={0.35} sx={{ minWidth: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' }}>
            Description
          </Typography>
          {onSaveDescription && !editingDescription && (
            <Tooltip title="Edit description">
              <IconButton size="small" onClick={handleStartEditDescription} aria-label="Edit description">
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        {editingDescription ? (
          <Stack spacing={0.75}>
            <TextField
              value={descriptionDraft}
              onChange={(event) => setDescriptionDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  handleCancelEditDescription();
                }
              }}
              disabled={savingDescription}
              multiline
              minRows={3}
              maxRows={8}
              fullWidth
              size="small"
              placeholder="Package description"
              inputProps={{
                maxLength: PACKAGE_DESCRIPTION_MAX_LENGTH,
                'aria-label': 'Package description'
              }}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Tooltip title="Cancel">
                <span>
                  <IconButton
                    size="small"
                    onClick={handleCancelEditDescription}
                    disabled={savingDescription}
                    aria-label="Cancel description edit"
                  >
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Save description">
                <span>
                  <IconButton
                    size="small"
                    onClick={handleConfirmEditDescription}
                    disabled={savingDescription}
                    aria-label="Save description"
                    color="primary"
                  >
                    <CheckRoundedIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          </Stack>
        ) : (
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5, ...longTextSx }}
          >
            {description.trim() || '—'}
          </Typography>
        )}
      </Stack>

      {onDueOnChange && (
        <>
          <Divider flexItem sx={{ my: 0.25 }} />
          <Stack spacing={0.35} sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' }}>
              Due date
            </Typography>
            {editingDueOn ? (
              <TextField
                size="small"
                type="datetime-local"
                autoFocus
                disabled={savingDueOn}
                value={toDateTimeInputValue(dueOn)}
                onChange={(event) => {
                  onDueOnChange(event.target.value || null);
                  setEditingDueOn(false);
                }}
                onBlur={() => setEditingDueOn(false)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: 280, '& .MuiInputBase-input': { fontWeight: 600, py: 0.75 } }}
              />
            ) : (
              <Typography
                variant="body2"
                component="button"
                type="button"
                disabled={savingDueOn}
                onClick={() => !savingDueOn && setEditingDueOn(true)}
                sx={{
                  fontWeight: 600,
                  border: 0,
                  bgcolor: 'transparent',
                  p: 0,
                  m: 0,
                  cursor: savingDueOn ? 'default' : 'pointer',
                  color: dueOn ? 'text.primary' : 'primary.main',
                  textAlign: 'left',
                  textDecoration: savingDueOn ? 'none' : 'underline',
                  textUnderlineOffset: 2,
                  '&:hover': savingDueOn ? undefined : { color: 'primary.main' }
                }}
              >
                {dueOn ? `Due ${formatDateTime(dueOn)}` : 'Add due date'}
              </Typography>
            )}
          </Stack>
        </>
      )}

      <Divider flexItem sx={{ my: 0.25 }} />

      <Stack spacing={0.75}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' }}>
          Related content
        </Typography>
        {contentItems.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 0.5 }}>
            No linked content items.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {contentGroups.map(([contentTypeId, items]) => (
              <Stack key={contentTypeId} spacing={0.35}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, pl: 0.25 }}>
                  {formatContentTypeLabel(contentTypeId)}
                </Typography>
                <List
                  dense={dense}
                  disablePadding
                  sx={{ bgcolor: 'action.hover', borderRadius: 1, minWidth: 0, overflowX: 'hidden' }}
                >
                  {items.map((contentItem, contentIndex) => {
                    const path = contentItem.path || '';
                    const label = resolveSandboxItemLabel(contentItem);
                    return (
                      <ListItem
                        key={path || `${contentTypeId}-${contentIndex}`}
                        secondaryAction={
                          path ? (
                            <IconButton
                              edge="end"
                              aria-label="remove attachment"
                              size="small"
                              onClick={() => handleRemoveContentItem(path)}
                            >
                              <ClearRoundedIcon fontSize="small" />
                            </IconButton>
                          ) : undefined
                        }
                        sx={listItemRowSx}
                      >
                        <ListItemText
                          sx={listItemTextSx}
                          primary={
                            <Tooltip title={path || label} placement="top-start" enterDelay={400}>
                              <span>
                                <AttachedSandboxItemDisplay
                                  item={contentItem}
                                  label={label}
                                  onClick={() => previewItem(contentItem)}
                                />
                              </span>
                            </Tooltip>
                          }
                          primaryTypographyProps={{ variant: 'body2', component: 'div' }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      <Divider flexItem sx={{ my: 0.25 }} />

      <Stack spacing={0.5}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' }}>
          Documents &amp; assets
        </Typography>
        {documents.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 0.5 }}>
            No file attachments.
          </Typography>
        ) : (
          <List
            dense={dense}
            disablePadding
            sx={{ bgcolor: 'action.hover', borderRadius: 1, minWidth: 0, overflowX: 'hidden' }}
          >
            {documents.map((document, docIndex) => {
              const displayPath = document.path || document.url || '';
              const fileName = resolveAttachmentDisplayName(document);
              return (
                <ListItem
                  key={document.id ?? document.url ?? docIndex}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="remove attachment"
                      size="small"
                      onClick={() => handleRemoveAttachment(document.id)}
                    >
                      <ClearRoundedIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={listItemRowSx}
                >
                  <ListItemText
                    sx={listItemTextSx}
                    primary={
                      <Tooltip title={displayPath} placement="top-start" enterDelay={400}>
                        <span>
                          {document.sandboxItem ? (
                            <AttachedSandboxItemDisplay
                              item={document.sandboxItem}
                              label={fileName}
                              onClick={() => previewPath(displayPath, fileName)}
                            />
                          ) : (
                            <Typography
                              variant="body2"
                              component="span"
                              onClick={() => previewPath(displayPath, fileName)}
                              sx={(theme) => ({
                                ...longTextSx,
                                display: 'block',
                                maxWidth: '100%',
                                minWidth: 0,
                                cursor: 'pointer',
                                color:
                                  theme.palette.mode === 'dark'
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.main,
                                '&:hover': { textDecoration: 'underline' }
                              })}
                            >
                              {fileName}
                            </Typography>
                          )}
                        </span>
                      </Tooltip>
                    }
                    primaryTypographyProps={{ variant: 'body2', component: 'div' }}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Stack>

      <Divider flexItem sx={{ my: 0.25 }} />

      <Stack spacing={0.75}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' }}>
          Comments
        </Typography>
        <CommentsSection
          comments={comments}
          onAddComment={onAddComment}
          onResolveComment={onResolveComment}
          onArchiveComment={onArchiveComment}
          showArchived={showArchivedComments}
          onShowArchivedChange={onShowArchivedCommentsChange}
        />
      </Stack>

      <Divider flexItem sx={{ my: 0.25 }} />

      <Stack spacing={0.75}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' }}>
          Tasks
        </Typography>
        <PackageTasksSection
          tasks={tasks}
          onCreateTask={onCreateTask}
          onCompleteTask={onCompleteTask}
          onArchiveTask={onArchiveTask}
          onTasksChange={onTasksChange}
          showArchived={showArchivedTasks}
          onShowArchivedChange={onShowArchivedTasksChange}
        />
      </Stack>

      <Divider flexItem sx={{ my: 0.25 }} />

      <PackageAuditTrailSection packageId={card.id} refreshKey={auditRefreshKey} />
    </Stack>
  );
};

export default CardDetails;
