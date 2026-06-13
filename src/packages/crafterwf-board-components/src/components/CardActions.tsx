import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Typography, Button } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from '@mui/material/IconButton';

import {
  showEditDialog,
  showNewContentDialog,
  closeNewContentDialog,
  newContentCreationComplete,
  showUploadDialog,
  closeUploadDialog,
  showPublishDialog,
  closePublishDialog,
  showRejectDialog,
  closeRejectDialog
} from '@craftercms/studio-ui/state/actions/dialogs';
import { fetchSandboxItem } from '@craftercms/studio-ui/services/content';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { dispatchDOMEvent, batchActions } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';

import CardRecord from '../types/CardRecord';
import CardDetailsRecord from '../types/CardDetailsRecord';
import { attachContent, archivePackage } from '../api/workflowApi';
import {
  isValidContentPath,
  resolveAttachmentLabel,
  resolveSandboxItemPath
} from '../utils/attachmentUtils';
import { notifyWorkflowsUpdated } from '../utils/activeWorkflows';
import ContentSearchAttachDialog from './ContentSearchAttachDialog';

export interface CardActionsProps {
  card: CardRecord;
  cardDetails: CardDetailsRecord;
  onMenuOpen(): void;
  /** Refresh package details only (attach content, comments) */
  onDetailsChanged?: () => void;
  /** Full package change including board refresh (archive) */
  onPackageChanged?: () => void;
  /** Studio nested dialog opened/closed (search, new content, etc.) */
  onNestedDialogChange?: (open: boolean) => void;
  /** icon = card header menu; button = dialog toolbar */
  variant?: 'icon' | 'button';
}

const CardActions = ({
  card,
  cardDetails,
  onMenuOpen,
  onDetailsChanged,
  onPackageChanged,
  onNestedDialogChange,
  variant = 'icon'
}: CardActionsProps) => {
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [contentSearchOpen, setContentSearchOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const attachedContentPathsKey = (cardDetails?.attachedContentItems ?? [])
    .map((item) => item.path?.trim() ?? '')
    .filter(Boolean)
    .sort()
    .join('\0');
  const attachedPaths = React.useMemo(
    () => (attachedContentPathsKey ? attachedContentPathsKey.split('\0') : []),
    [attachedContentPathsKey]
  );

  const serverAddress =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
      : '';

  const attachContentToPackage = (contentName: string, contentPath: string) => {
    if (!isValidContentPath(contentPath)) {
      console.error('[crafterwf] Cannot attach content: invalid path.', contentPath);
      notifyNestedDialogClosed();
      return;
    }
    attachContent(siteId, card.id, contentPath, contentName, serverAddress).subscribe({
      next: () => {
        notifyWorkflowsUpdated();
        onDetailsChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const notifyNestedDialogClosed = () => {
    window.setTimeout(() => onNestedDialogChange?.(false), 0);
  };

  const handleCardActionsClose = () => {
    setAnchorEl(null);
  };

  const handleCreatePage = () => {
    handleCreateContent('/site/website/index.xml');
  };

  const handleCreateComponent = () => {
    handleCreateContent('/site/components');
  };

  const handleCreateContent = (path: string) => {
    onNestedDialogChange?.(true);
    fetchSandboxItem(siteId, path, { castAsDetailedItem: true }).subscribe({
      next(sandboxItem) {
        createCustomDocumentEventListener('CRAFTERWF_NEW_CONTENT', (response) => {
          const savedItem = (response?.item ?? response) as Record<string, unknown> | undefined;
          const contentPath = resolveSandboxItemPath(savedItem);
          if (!contentPath) {
            console.error('[crafterwf] New content saved but no path was returned; skipping attach.', response);
            notifyNestedDialogClosed();
            return;
          }
          attachContentToPackage(resolveAttachmentLabel(savedItem ?? { path: contentPath }), contentPath);
          notifyNestedDialogClosed();
        });

        createCustomDocumentEventListener('CRAFTERWF_CONTENTTYPE_SELECTED', (response) => {
          dispatch(
            showEditDialog({
              ...response,
              onSaveSuccess: batchActions([
                closeNewContentDialog(),
                newContentCreationComplete(),
                dispatchDOMEvent({
                  id: 'CRAFTERWF_NEW_CONTENT'
                })
              ])
            })
          );
        });

        dispatch(
          showNewContentDialog({
            item: sandboxItem,
            // @ts-ignore - required attributes injected by GlobalDialogManager
            onContentTypeSelected: dispatchDOMEvent({
              id: 'CRAFTERWF_CONTENTTYPE_SELECTED'
            })
          })
        );
      },
      error() {
        console.error("Oops! We can't find the content you are looking for.");
      }
    });

    handleCardActionsClose();
  };

  const handleUploadAsset = () => {
    onNestedDialogChange?.(true);
    createCustomDocumentEventListener('CRAFTERWF_UPLOAD_CONTENT', () => {
      notifyNestedDialogClosed();
    });

    dispatch(
      showUploadDialog({
        path: '/static-assets/images/library',
        site: siteId,
        onClose: batchActions([
          closeUploadDialog(),
          dispatchDOMEvent({
            id: 'CRAFTERWF_UPLOAD_CONTENT'
          })
        ])
      })
    );

    handleCardActionsClose();
  };

  const closeContentSearch = () => {
    setContentSearchOpen(false);
    notifyNestedDialogClosed();
  };

  const handleAttachExistingContent = () => {
    onNestedDialogChange?.(true);
    setContentSearchOpen(true);
    handleCardActionsClose();
  };

  const handleContentSearchAccept = (paths: string[]) => {
    paths.forEach((path) => {
      attachContentToPackage(resolveAttachmentLabel(path), path);
    });
    closeContentSearch();
  };

  const handlePublishContent = () => {
    onNestedDialogChange?.(true);
    dispatch(
      showPublishDialog({
        items: cardDetails.attachedContentItems,
        onSuccess: batchActions([closePublishDialog()])
      })
    );
    handleCardActionsClose();
  };

  const handleRequestReviewOfContent = () => {
    onNestedDialogChange?.(true);
    const schedulingMap = {
      approvePublish: null,
      schedulePublish: 'custom',
      requestPublish: 'now',
      publish: 'now'
    };

    dispatch(
      showPublishDialog({
        scheduling: schedulingMap['requestPublish'],
        items: cardDetails.attachedContentItems,
        isRequestPublish: true,
        isSubmitting: true,
        submissionCommentRequired: true,
        showRequestApproval: true,
        onSuccess: batchActions([closePublishDialog()])
      })
    );
    handleCardActionsClose();
  };

  const handleRejectContent = () => {
    onNestedDialogChange?.(true);
    dispatch(
      showRejectDialog({
        items: cardDetails.attachedContentItems,
        onSuccess: batchActions([closeRejectDialog()])
      })
    );
    handleCardActionsClose();
  };

  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onMenuOpen();
    setAnchorEl(event.currentTarget);
  };

  const handleArchivePackage = () => {
    archivePackage(siteId, card.id).subscribe({
      next: () => {
        notifyWorkflowsUpdated();
        onPackageChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
    handleCardActionsClose();
  };

  let hasItemsInReview = false;
  let hasItemsForReview = false;
  let hasItemsForPublish = false;
  let hasItems = false;

  if (cardDetails && cardDetails.attachedContentItems) {
    cardDetails.attachedContentItems.forEach((contentItem) => {
      hasItems = true;
      const availableActionsMap = contentItem.availableActionsMap;

      hasItemsForReview =
        availableActionsMap.rejectPublish === false ? true : hasItemsForReview;

      hasItemsInReview = availableActionsMap.rejectPublish === true ? true : hasItemsInReview;

      hasItemsForPublish =
        (availableActionsMap.approvePublish || availableActionsMap.publish) === true ? true : hasItemsForPublish;
    });
  }

  const menuId = variant === 'button' ? 'package-actions-menu-dialog' : 'long-menu';
  const triggerId = variant === 'button' ? 'package-actions-button' : 'long-button';

  return (
    <>
      {variant === 'button' ? (
        <Button
          id={triggerId}
          size="small"
          variant="outlined"
          aria-label="package actions"
          aria-controls={open ? menuId : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickActions}
          sx={(theme) => ({
            color: 'inherit',
            borderColor: 'currentColor',
            opacity: 0.9,
            '&:hover': {
              borderColor: 'currentColor',
              bgcolor: theme.palette.action.hover
            }
          })}
        >
          Actions
        </Button>
      ) : (
        <IconButton
          id={triggerId}
          aria-label="package actions"
          aria-controls={open ? menuId : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickActions}
        >
          <MoreVertRoundedIcon />
        </IconButton>
      )}
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCardActionsClose}
        PaperProps={{
          sx: { maxHeight: 360, minWidth: 220 }
        }}
        MenuListProps={{
          'aria-labelledby': triggerId
        }}
      >
        <MenuItem key="createPage" onClick={handleCreatePage}>
          <Typography>New Page</Typography>
        </MenuItem>
        <MenuItem key="createComponent" onClick={handleCreateComponent}>
          <Typography>New Component</Typography>
        </MenuItem>
        <MenuItem key="attachExistingContent" onClick={handleAttachExistingContent}>
          <Typography>Existing Content</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          key="handleRequestReviewOfContent"
          onClick={handleRequestReviewOfContent}
          style={{ display: hasItemsForReview ? 'block' : 'none' }}
        >
          <Typography>Request Review</Typography>
        </MenuItem>
        <MenuItem
          key="rejectContent"
          onClick={handleRejectContent}
          style={{ display: hasItemsInReview ? 'block' : 'none' }}
        >
          <Typography>Reject Submission</Typography>
        </MenuItem>
        <MenuItem
          key="publishContent"
          onClick={handlePublishContent}
          style={{ display: hasItemsForPublish ? 'block' : 'none' }}
        >
          <Typography>Publish</Typography>
        </MenuItem>
        <Divider style={{ display: hasItems ? 'block' : 'none' }} />
        <MenuItem key="archivePackage" onClick={handleArchivePackage}>
          <Typography>Archive Package</Typography>
        </MenuItem>
      </Menu>
      <ContentSearchAttachDialog
        open={contentSearchOpen}
        onClose={closeContentSearch}
        onAttach={handleContentSearchAccept}
        attachedPaths={attachedPaths}
      />
    </>
  );
};

export default CardActions;
