import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { getUnreadNotificationCount, NOTIFICATIONS_UPDATED_EVENT } from '../../api/notificationApi';
import { buildOpenIcePanelAction } from '../../utils/studioPreview';
import { ToolbarIconBadge } from '../../utils/toolbarBadge';

const NOTIFICATIONS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.notificationsPanel';

export function NotificationsToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Notifications';
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(() => {
    if (!siteId) {
      setUnreadCount(0);
      return;
    }
    getUnreadNotificationCount(siteId).subscribe({
      next(response) {
        setUnreadCount(response.response?.result?.unreadCount ?? 0);
      },
      error(e) {
        console.error(e);
      }
    });
  }, [siteId]);

  useEffect(() => {
    refreshUnreadCount();
    const intervalId = window.setInterval(refreshUnreadCount, 30000);
    const handleUpdated = () => refreshUnreadCount();
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, handleUpdated);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, handleUpdated);
    };
  }, [refreshUnreadCount]);

  const openNotificationsPanel = () => {
    dispatch(buildOpenIcePanelAction(title, NOTIFICATIONS_PANEL_WIDGET_ID, siteId ?? undefined) as never);
    refreshUnreadCount();
  };

  return (
    <Tooltip title={title}>
      <span>
        <IconButton aria-label={title} size="large" {...props} onClick={openNotificationsPanel}>
          <ToolbarIconBadge count={unreadCount} overdueCount={0} color="error">
            <NotificationsNoneRoundedIcon />
          </ToolbarIconBadge>
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default NotificationsToolbarButton;
