import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import { IconButton, Tooltip } from '@mui/material';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { me } from '@craftercms/studio-ui/services/users';
import { useDispatch } from 'react-redux';

import { findPackagesByContentPath } from '../../api/workflowApi';
import {
  collectCommentsForContentPath,
  COMMENTS_UPDATED_EVENT,
  countCommentBadgeState,
  markCommentsViewed
} from '../../utils/commentBadgeUtils';
import { buildOpenCommentsIcePanelAction, usePreviewContentPath } from '../../utils/studioPreview';
import { ToolbarIconBadge } from '../../utils/toolbarBadge';

const CONTENT_COMMENTS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.contentCommentsPanel';

export function ContentCommentsToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const contentPath = usePreviewContentPath();
  const title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Comments';
  const [unreadCount, setUnreadCount] = useState(0);
  const [mentionCount, setMentionCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  const [currentUsername, setCurrentUsername] = useState<string | undefined>();

  useEffect(() => {
    const subscription = me().subscribe({
      next(currentUser) {
        setCurrentUserId(currentUser?.id);
        setCurrentUsername(currentUser?.username);
      },
      error(e) {
        console.error(e);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const refreshBadge = useCallback(() => {
    if (!siteId || !contentPath) {
      setUnreadCount(0);
      setMentionCount(0);
      return;
    }
    findPackagesByContentPath(siteId, contentPath, true, false).subscribe({
      next(response) {
        const result = response.response?.result;
        const comments = collectCommentsForContentPath(
          result?.contentComments ?? [],
          result?.packages ?? []
        );
        const counts = countCommentBadgeState(
          comments,
          currentUserId,
          currentUsername,
          siteId,
          contentPath
        );
        setUnreadCount(counts.unreadCount);
        setMentionCount(counts.mentionCount);
      },
      error(e) {
        console.error(e);
      }
    });
  }, [contentPath, currentUserId, currentUsername, siteId]);

  useEffect(() => {
    refreshBadge();
    const intervalId = window.setInterval(refreshBadge, 30000);
    const handleUpdated = () => refreshBadge();
    window.addEventListener(COMMENTS_UPDATED_EVENT, handleUpdated);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(COMMENTS_UPDATED_EVENT, handleUpdated);
    };
  }, [refreshBadge]);

  const openCommentsPanel = () => {
    if (siteId && contentPath) {
      markCommentsViewed(siteId, contentPath);
      setUnreadCount(0);
      setMentionCount(0);
    }
    dispatch(
      buildOpenCommentsIcePanelAction(title, CONTENT_COMMENTS_PANEL_WIDGET_ID, siteId ?? undefined) as never
    );
    refreshBadge();
  };

  return (
    <Tooltip title={!contentPath ? 'Open a page in preview to see comments' : title}>
      <span>
        <IconButton
          aria-label={title}
          size="large"
          disabled={!contentPath}
          {...props}
          onClick={openCommentsPanel}
        >
          <ToolbarIconBadge
            count={unreadCount}
            overdueCount={mentionCount}
            color={mentionCount > 0 ? 'error' : 'primary'}
          >
            <CommentRoundedIcon />
          </ToolbarIconBadge>
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default ContentCommentsToolbarButton;
