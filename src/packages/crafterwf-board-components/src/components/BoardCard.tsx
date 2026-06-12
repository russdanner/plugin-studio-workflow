import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  Card,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Badge,
  Box,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { ApiResponse } from '@craftercms/studio-ui';
import { fetchItemsByPath } from '@craftercms/studio-ui/services/content';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import CardRecord from '../types/CardRecord';
import CardDetailsRecord from '../types/CardDetailsRecord';
import CardDetails from './CardDetails';
import BoardCardActions from './CardActions';
import {
  archiveComment,
  createPackageComment,
  listPackageComments,
  loadPackageDetails,
  removeAttachment,
  resolveComment,
  updatePackageTitle,
  updatePackageDescription,
  updatePackageDueOn
} from '../api/workflowApi';
import {
  archiveTask,
  completeTask,
  createPackageTask,
  formatDueOnForApi,
  listPackageTasks,
  notifyTasksUpdated,
  TaskPriority
} from '../api/taskApi';
import { resolveStepColor } from '../colors';
import { PACKAGE_TITLE_MAX_LENGTH } from '../consts';
import { notifyWorkflowsUpdated } from '../utils/activeWorkflows';
import { notifyCommentsUpdated } from '../utils/commentBadgeUtils';
import { notifyCalendarUpdated } from '../types/calendarEvent';
import {
  extractContentPathFromAttachmentUrl,
  isStaticAssetPath,
  isValidContentPath,
  resolveAttachmentDisplayName,
  resolveAttachmentUrl
} from '../utils/attachmentUtils';

export interface BoardCardProps {
  card: CardRecord;
  detailsOpen?: boolean;
  onDetailsOpen?: () => void;
  onDetailsClose?: () => void;
  onPackageChanged?: () => void;
  /** When true, only render the details dialog (no board card face). */
  dialogOnly?: boolean;
}

function coverColorToMuiColor(color: string | undefined | null): string | undefined {
  if (color == null || typeof color !== 'string') return undefined;
  const resolved = resolveStepColor(color);
  return resolved || undefined;
}

function coverColorForCss(color: string | undefined | null): string | undefined {
  return coverColorToMuiColor(color) ?? (color?.trim() || undefined);
}

const emptyDetails: CardDetailsRecord = {
  attachedContentItems: null,
  attachedDocuments: null,
  attachments: null,
  comments: null,
  tasks: null
};

const BoardCard = ({
  card,
  detailsOpen = false,
  onDetailsOpen,
  onDetailsClose,
  onPackageChanged,
  dialogOnly = false
}: BoardCardProps) => {
  const siteId = useActiveSiteId();
  const [error, setError] = useState<ApiResponse>();
  const [cardDetailsData, setCardDetailsData] = useState<CardDetailsRecord>(emptyDetails);
  const [showArchivedComments, setShowArchivedComments] = useState(false);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false);
  const [packageTitle, setPackageTitle] = useState(card.name);
  const [packageDescription, setPackageDescription] = useState(card.desc);
  const [packageDueOn, setPackageDueOn] = useState(card.dueOn);
  const [editingTitle, setEditingTitle] = useState(false);
  const [savingTitle, setSavingTitle] = useState(false);
  const [savingDescription, setSavingDescription] = useState(false);
  const [savingDueOn, setSavingDueOn] = useState(false);
  const [auditRefreshKey, setAuditRefreshKey] = useState(0);
  const ignoreBackdropCloseRef = useRef(false);
  const boardRefreshTimerRef = useRef<number>();

  const serverAddress =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
      : '';

  const loadCommentsOnly = (includeArchived = showArchivedComments) => {
    listPackageComments(siteId, card.id, true, includeArchived).subscribe({
      next: (response) => {
        const comments = response.response?.result?.comments ?? [];
        setCardDetailsData((prev) => ({ ...prev, comments }));
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const loadTasksOnly = (includeArchived = showArchivedTasks) => {
    listPackageTasks(siteId, card.id, true, includeArchived).subscribe({
      next: (response) => {
        const tasks = response.response?.result?.tasks ?? [];
        setCardDetailsData((prev) => ({ ...prev, tasks }));
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const loadCardDetailsData = () => {
    loadPackageDetails(siteId, card.id, serverAddress).subscribe({
      next: (response) => {
        const details = response.response.result;

        const contentItemPaths: string[] = [];
        const documentItems: Array<{ id: string; name: string; url: string; path: string }> = [];
        const pathsToFetch = new Set<string>();

        details.attachments?.forEach((attachment) => {
          const contentPath =
            extractContentPathFromAttachmentUrl(attachment.url || '') ||
            (isStaticAssetPath(attachment.url) ? attachment.url : null);
          const assetUrl = resolveAttachmentUrl(attachment);

          if (contentPath && isStaticAssetPath(contentPath)) {
            documentItems.push({
              id: attachment.id,
              name: resolveAttachmentDisplayName(attachment),
              url: assetUrl,
              path: contentPath
            });
            pathsToFetch.add(contentPath);
          } else if (contentPath && isValidContentPath(contentPath) && attachment.url?.includes('contentId')) {
            contentItemPaths.push(contentPath);
            pathsToFetch.add(contentPath);
          } else if (contentPath && isValidContentPath(contentPath)) {
            documentItems.push({
              id: attachment.id,
              name: resolveAttachmentDisplayName(attachment),
              url: assetUrl,
              path: contentPath
            });
            pathsToFetch.add(contentPath);
          } else if (attachment.url && !attachment.url.includes('contentId=undefined')) {
            documentItems.push({
              id: attachment.id,
              name: resolveAttachmentDisplayName(attachment),
              url: assetUrl,
              path: contentPath || attachment.url
            });
          }
        });

        setCardDetailsData((prev) => ({
          ...prev,
          attachments: details.attachments,
          attachedDocuments: documentItems,
          attachedContentItems: pathsToFetch.size === 0 ? [] : []
        }));

        if (pathsToFetch.size > 0) {
          fetchItemsByPath(siteId, Array.from(pathsToFetch), { castAsDetailedItem: true }).subscribe({
            next(sandboxItems) {
              const byPath: Record<string, (typeof sandboxItems)[number]> = {};
              sandboxItems.forEach((item) => {
                if (item?.path) {
                  byPath[item.path] = item;
                }
              });
              const attachedContentItems = contentItemPaths
                .map((path) => byPath[path])
                .filter((item): item is NonNullable<typeof item> => !!item);
              const attachedDocuments = documentItems.map((doc) => ({
                ...doc,
                sandboxItem: doc.path ? byPath[doc.path] : undefined
              }));
              setCardDetailsData((prev) => ({
                ...prev,
                attachedContentItems,
                attachedDocuments
              }));
            }
          });
        }
      },
      error(e) {
        console.error(e);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unknown Error. Check browser console.' } as ApiResponse)
        );
      }
    });

    loadCommentsOnly();
    loadTasksOnly();
  };

  const scheduleBoardRefresh = () => {
    if (boardRefreshTimerRef.current) {
      window.clearTimeout(boardRefreshTimerRef.current);
    }
    boardRefreshTimerRef.current = window.setTimeout(() => {
      onPackageChanged?.();
    }, 400);
  };

  const bumpAuditRefresh = () => {
    setAuditRefreshKey((current) => current + 1);
  };

  const handleDetailsChanged = () => {
    loadCardDetailsData();
    scheduleBoardRefresh();
    bumpAuditRefresh();
  };

  const handlePackageChanged = () => {
    loadCardDetailsData();
    onPackageChanged?.();
    if (detailsOpen) {
      onDetailsClose?.();
    }
  };

  const openDetails = () => {
    onDetailsOpen?.();
    loadCardDetailsData();
  };

  const handleCardCloseClick = () => {
    setEditingTitle(false);
    setPackageTitle(card.name);
    setPackageDescription(card.desc);
    setPackageDueOn(card.dueOn);
    onDetailsClose?.();
  };

  const handleDialogClose = (_event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && ignoreBackdropCloseRef.current) {
      return;
    }
    handleCardCloseClick();
  };

  const handleNestedDialogChange = (open: boolean) => {
    ignoreBackdropCloseRef.current = open;
    if (!open) {
      window.setTimeout(() => {
        ignoreBackdropCloseRef.current = false;
      }, 300);
    }
  };

  useEffect(() => {
    if (detailsOpen) {
      loadCardDetailsData();
    }
  }, [detailsOpen, card.id]);

  useEffect(() => {
    setPackageTitle(card.name);
    setPackageDescription(card.desc);
    setPackageDueOn(card.dueOn);
    setEditingTitle(false);
  }, [card.id, card.name, card.desc, card.dueOn]);

  const savePackageTitle = (onComplete?: () => void) => {
    const trimmed = packageTitle.trim();
    if (!trimmed) {
      setPackageTitle(card.name);
      onComplete?.();
      return;
    }
    if (trimmed === card.name || savingTitle) {
      onComplete?.();
      return;
    }
    setSavingTitle(true);
    updatePackageTitle(siteId, card.id, trimmed).subscribe({
      next: () => {
        setSavingTitle(false);
        setPackageTitle(trimmed);
        scheduleBoardRefresh();
        notifyWorkflowsUpdated();
        bumpAuditRefresh();
        onComplete?.();
      },
      error(e) {
        console.error(e);
        setSavingTitle(false);
        setPackageTitle(card.name);
        onComplete?.();
      }
    });
  };

  const startEditingTitle = () => {
    setPackageTitle(card.name);
    setEditingTitle(true);
  };

  const cancelEditingTitle = () => {
    setPackageTitle(card.name);
    setEditingTitle(false);
  };

  const confirmEditingTitle = () => {
    savePackageTitle(() => setEditingTitle(false));
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmEditingTitle();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditingTitle();
    }
  };

  const handleSaveDescription = (nextDescription: string) => {
    const normalized = nextDescription.trim();
    if (normalized === (packageDescription.trim() || '') || savingDescription) {
      return;
    }
    setSavingDescription(true);
    updatePackageDescription(siteId, card.id, normalized).subscribe({
      next: () => {
        setSavingDescription(false);
        setPackageDescription(normalized);
        scheduleBoardRefresh();
        notifyWorkflowsUpdated();
        bumpAuditRefresh();
      },
      error(e) {
        console.error(e);
        setSavingDescription(false);
        setPackageDescription(card.desc);
      }
    });
  };

  const handleDueOnChange = (dueOn: string | null) => {
    const apiValue = formatDueOnForApi(dueOn);
    const currentApi = formatDueOnForApi(packageDueOn ?? null);
    if (apiValue === currentApi || savingDueOn) {
      return;
    }
    setSavingDueOn(true);
    updatePackageDueOn(siteId, card.id, apiValue).subscribe({
      next: () => {
        setSavingDueOn(false);
        setPackageDueOn(apiValue ?? undefined);
        scheduleBoardRefresh();
        notifyCalendarUpdated();
        bumpAuditRefresh();
      },
      error(e) {
        console.error(e);
        setSavingDueOn(false);
        setPackageDueOn(card.dueOn);
      }
    });
  };

  useEffect(() => {
    return () => {
      if (boardRefreshTimerRef.current) {
        window.clearTimeout(boardRefreshTimerRef.current);
      }
    };
  }, []);

  const handleCardClick = () => {
    if (!detailsOpen) {
      openDetails();
    }
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    const attachment = cardDetailsData.attachments?.find((item) => item.id === attachmentId);
    if (!attachment) {
      return;
    }

    const attachmentType = attachment._type === 'link' ? 'link' : 'content';
    removeAttachment(siteId, card.id, attachment.id, attachmentType).subscribe({
      next: () => handleDetailsChanged(),
      error(e) {
        console.error(e);
      }
    });
  };

  const handleRemoveContentItem = (contentPath: string) => {
    const attachment = cardDetailsData.attachments?.find((item) => {
      const path = extractContentPathFromAttachmentUrl(item.url || '');
      return path === contentPath;
    });

    if (!attachment) {
      return;
    }

    removeAttachment(siteId, card.id, attachment.id, 'content').subscribe({
      next: () => handleDetailsChanged(),
      error(e) {
        console.error(e);
      }
    });
  };

  const handleAddComment = (body: string, mentionedUserIds?: number[]) => {
    createPackageComment(siteId, card.id, body, mentionedUserIds).subscribe({
      next: () => {
        loadCommentsOnly();
        scheduleBoardRefresh();
        notifyCommentsUpdated();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleResolveComment = (commentId: string, resolved: boolean) => {
    resolveComment(siteId, commentId, resolved).subscribe({
      next: () => {
        loadCommentsOnly();
        scheduleBoardRefresh();
        notifyCommentsUpdated();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleArchiveComment = (commentId: string, archived: boolean) => {
    archiveComment(siteId, commentId, archived).subscribe({
      next: () => {
        loadCommentsOnly();
        scheduleBoardRefresh();
        notifyCommentsUpdated();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleShowArchivedCommentsChange = (show: boolean) => {
    setShowArchivedComments(show);
    listPackageComments(siteId, card.id, true, show).subscribe({
      next: (response) => {
        const comments = response.response?.result?.comments ?? [];
        setCardDetailsData((prev) => ({ ...prev, comments }));
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleCreateTask = (
    title: string,
    priority: TaskPriority,
    dueOn?: string,
    startOn?: string
  ) => {
    createPackageTask(
      siteId,
      card.id,
      title,
      priority,
      formatDueOnForApi(dueOn) || undefined,
      undefined,
      undefined,
      formatDueOnForApi(startOn) || undefined
    ).subscribe({
      next: () => {
        loadTasksOnly();
        notifyTasksUpdated();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleCompleteTask = (taskId: string, complete: boolean) => {
    completeTask(siteId, taskId, complete).subscribe({
      next: () => {
        loadTasksOnly();
        notifyTasksUpdated();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleArchiveTask = (taskId: string, archived: boolean) => {
    archiveTask(siteId, taskId, archived).subscribe({
      next: () => {
        loadTasksOnly();
        notifyTasksUpdated();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleShowArchivedTasksChange = (show: boolean) => {
    setShowArchivedTasks(show);
    listPackageTasks(siteId, card.id, true, show).subscribe({
      next: (response) => {
        const tasks = response.response?.result?.tasks ?? [];
        setCardDetailsData((prev) => ({ ...prev, tasks }));
      },
      error(e) {
        console.error(e);
      }
    });
  };

  return (
    <>
      {!dialogOnly && (
      <Card
        elevation={0}
        onClick={handleCardClick}
        sx={(theme) => ({
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderTop: card.cover?.color ? `4px solid ${coverColorForCss(card.cover.color)}` : undefined,
          boxShadow: theme.shadows[1],
          cursor: 'pointer',
          transition: theme.transitions.create(['box-shadow', 'border-color'], {
            duration: theme.transitions.duration.short
          }),
          '&:hover': {
            boxShadow: theme.shadows[3],
            borderColor: 'action.hover'
          }
        })}
      >
        <CardHeader
          action={
            <Box component="span" onClick={(event) => event.stopPropagation()} sx={{ display: 'inline-flex' }}>
              <BoardCardActions
                card={card}
                cardDetails={cardDetailsData}
                onMenuOpen={loadCardDetailsData}
                onDetailsChanged={handleDetailsChanged}
                onPackageChanged={handlePackageChanged}
                onNestedDialogChange={handleNestedDialogChange}
              />
            </Box>
          }
          title={card.name}
          titleTypographyProps={{ variant: 'body2', fontWeight: 600 }}
          sx={{ py: 1, '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }}
        />
        {card.badges.attachments > 0 && (
          <CardActions disableSpacing>
            <IconButton size="small" aria-label="attachments">
              <Badge badgeContent={card.badges.attachments} color="primary">
                <AttachmentRoundedIcon />
              </Badge>
            </IconButton>
          </CardActions>
        )}
      </Card>
      )}

      <Dialog
        open={detailsOpen}
        onClose={handleDialogClose}
        disableRestoreFocus
        fullWidth
        maxWidth="sm"
        scroll="paper"
        aria-labelledby="workflow-package-details-title"
        PaperProps={{
          sx: (theme) => ({
            borderRadius: 2,
            overflow: 'hidden',
            width: '100%',
            maxWidth: `min(${theme.breakpoints.values.sm}px, calc(100% - ${theme.spacing(4)}))`
          })
        }}
      >
        <DialogTitle
          id="workflow-package-details-title"
          sx={(theme) => {
            const cover = coverColorToMuiColor(card.cover?.color);
            if (cover) {
              return {
                py: 1.5,
                pr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                backgroundColor: cover,
                color: theme.palette.getContrastText(cover),
                borderBottom: `1px solid ${theme.palette.divider}`
              };
            }
            return {
              py: 1.5,
              pr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              borderBottom: `1px solid ${theme.palette.divider}`
            };
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {editingTitle ? (
              <>
                <TextField
                  value={packageTitle}
                  onChange={(event) => setPackageTitle(event.target.value)}
                  onKeyDown={handleTitleKeyDown}
                  onClick={(event) => event.stopPropagation()}
                  disabled={savingTitle}
                  variant="standard"
                  fullWidth
                  autoFocus
                  placeholder="Package title"
                  inputProps={{
                    maxLength: PACKAGE_TITLE_MAX_LENGTH,
                    'aria-label': 'Package title'
                  }}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    '& .MuiInput-root': { color: 'inherit' },
                    '& .MuiInput-root:before': { borderColor: 'rgba(128,128,128,0.42)' },
                    '& .MuiInput-root:hover:not(.Mui-disabled):before': { borderColor: 'rgba(128,128,128,0.87)' },
                    '& .MuiInput-root:after': { borderColor: 'primary.main' },
                    '& .MuiInput-input': {
                      fontWeight: 600,
                      fontSize: '1rem',
                      py: 0.25,
                      wordBreak: 'break-word'
                    }
                  }}
                />
                <Tooltip title="Save title">
                  <span>
                    <IconButton
                      size="small"
                      onClick={confirmEditingTitle}
                      disabled={savingTitle}
                      aria-label="Save title"
                      sx={{ color: 'inherit' }}
                    >
                      <CheckRoundedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Cancel">
                  <span>
                    <IconButton
                      size="small"
                      onClick={cancelEditingTitle}
                      disabled={savingTitle}
                      aria-label="Cancel title edit"
                      sx={{ color: 'inherit' }}
                    >
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            ) : (
              <>
                <Typography
                  id="workflow-package-details-title-text"
                  variant="subtitle1"
                  component="span"
                  sx={{ flex: 1, minWidth: 0, fontWeight: 600, wordBreak: 'break-word' }}
                >
                  {packageTitle}
                </Typography>
                <Tooltip title="Rename package">
                  <IconButton
                    size="small"
                    onClick={startEditingTitle}
                    aria-label="Rename package"
                    sx={{ color: 'inherit' }}
                  >
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <BoardCardActions
              card={card}
              cardDetails={cardDetailsData}
              onMenuOpen={loadCardDetailsData}
              onDetailsChanged={handleDetailsChanged}
              onPackageChanged={handlePackageChanged}
              onNestedDialogChange={handleNestedDialogChange}
              variant="button"
            />
          </Box>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: { xs: 'min(72vh, 560px)', sm: 'min(65vh, 520px)' },
            scrollbarWidth: 'thin',
            px: 2,
            py: 1.5,
            minWidth: 0
          }}
        >
          <CardDetails
            card={card}
            cardDetails={cardDetailsData}
            description={packageDescription}
            onSaveDescription={handleSaveDescription}
            savingDescription={savingDescription}
            dueOn={packageDueOn}
            onDueOnChange={handleDueOnChange}
            savingDueOn={savingDueOn}
            auditRefreshKey={auditRefreshKey}
            onRemoveAttachment={handleRemoveAttachment}
            onRemoveContentItem={handleRemoveContentItem}
            onAddComment={handleAddComment}
            onResolveComment={handleResolveComment}
            onArchiveComment={handleArchiveComment}
            showArchivedComments={showArchivedComments}
            onShowArchivedCommentsChange={handleShowArchivedCommentsChange}
            onCreateTask={handleCreateTask}
            onCompleteTask={handleCompleteTask}
            onArchiveTask={handleArchiveTask}
            onTasksChange={() => loadTasksOnly()}
            showArchivedTasks={showArchivedTasks}
            onShowArchivedTasksChange={handleShowArchivedTasksChange}
          />
        </DialogContent>
        <DialogActions sx={{ px: 2, py: 1.5, justifyContent: 'flex-end' }}>
          <Button onClick={handleCardCloseClick} variant="contained" color="primary" size="medium">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoardCard;
