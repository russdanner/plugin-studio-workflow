import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import useStudioItemPreview from '../../hooks/useStudioItemPreview';
import {
  archiveNotification,
  listNotifications,
  notifyNotificationsUpdated,
  resolveNotification,
  WorkflowNotification
} from '../../api/notificationApi';
import {
  canOpenNotificationTarget,
  notificationTargetLinkLabel,
  notificationTargetTypeLabel,
  openNotificationTarget
} from '../../utils/notificationNavigation';

function formatDate(value?: string | null): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

const NotificationsPanel = () => {
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();
  const { previewPath } = useStudioItemPreview();
  const [notifications, setNotifications] = useState<WorkflowNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const loadNotifications = useCallback(() => {
    if (!siteId) {
      setNotifications([]);
      return;
    }
    setLoading(true);
    setError(null);
    listNotifications(siteId, false, true, showArchived, true).subscribe({
      next(response) {
        setNotifications(response.response?.result?.notifications ?? []);
        setLoading(false);
        notifyNotificationsUpdated();
      },
      error(e) {
        console.error(e);
        setError('Unable to load notifications.');
        setNotifications([]);
        setLoading(false);
      }
    });
  }, [showArchived, siteId]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleOpenTarget = (notification: WorkflowNotification) => {
    if (!canOpenNotificationTarget(notification)) {
      return;
    }
    openNotificationTarget(dispatch, siteId, notification, previewPath);
  };

  const handleResolve = (notificationId: string, resolved: boolean) => {
    resolveNotification(siteId, notificationId, resolved).subscribe({
      next() {
        loadNotifications();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleArchive = (notificationId: string, archived: boolean) => {
    archiveNotification(siteId, notificationId, archived).subscribe({
      next() {
        loadNotifications();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  if (loading && notifications.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.25} sx={{ px: 1, pb: 2, minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase', px: 0.5 }}>
        Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ px: 0.5, py: 1 }}>
          No notifications.
        </Typography>
      ) : (
        <Stack spacing={0.75}>
          {notifications.map((notification) => {
            const typeLabel = notificationTargetTypeLabel(notification.targetType);
            const linkLabel = notificationTargetLinkLabel(notification);
            const canOpen = canOpenNotificationTarget(notification);

            return (
              <Box
                key={notification.id}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: notification.archived ? 'action.disabledBackground' : 'action.hover',
                  opacity: notification.archived ? 0.85 : 1,
                  minWidth: 0
                }}
              >
                <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" sx={{ mb: 0.35 }}>
                  <Typography variant="body2" fontWeight={500} sx={{ flex: 1, minWidth: 0 }}>
                    {notification.title}
                  </Typography>
                  {notification.resolved && (
                    <Chip label="Resolved" size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  )}
                  {notification.archived && (
                    <Chip label="Archived" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  )}
                </Stack>
                {notification.message && (
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', mb: 0.5 }}>
                    {notification.message}
                  </Typography>
                )}
                {typeLabel && notification.targetId && (
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ display: 'block', mb: 0.5, wordBreak: 'break-word' }}
                  >
                    <Box component="span" color="text.secondary">
                      {typeLabel}:{' '}
                    </Box>
                    {canOpen ? (
                      <Box
                        component="button"
                        type="button"
                        onClick={() => handleOpenTarget(notification)}
                        sx={{
                          display: 'inline',
                          p: 0,
                          border: 'none',
                          background: 'none',
                          font: 'inherit',
                          fontSize: 'inherit',
                          lineHeight: 'inherit',
                          color: 'primary.main',
                          cursor: 'pointer',
                          fontWeight: 600,
                          textDecoration: 'underline',
                          textUnderlineOffset: 2,
                          wordBreak: 'break-all',
                          '&:hover': { color: 'primary.dark' }
                        }}
                      >
                        {linkLabel}
                      </Box>
                    ) : (
                      <Box component="span" color="text.secondary">
                        {linkLabel}
                      </Box>
                    )}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {formatDate(notification.createdOn)}
                </Typography>
                {!notification.archived && (
                  <Stack direction="row" spacing={1} sx={{ mt: 0.75, flexWrap: 'wrap' }}>
                    <Button
                      size="small"
                      sx={{ px: 0, minWidth: 0 }}
                      onClick={() => handleResolve(notification.id, !notification.resolved)}
                    >
                      {notification.resolved ? 'Reopen' : 'Resolve'}
                    </Button>
                    <Button size="small" sx={{ px: 0, minWidth: 0 }} onClick={() => handleArchive(notification.id, true)}>
                      Archive
                    </Button>
                  </Stack>
                )}
                {notification.archived && (
                  <Button size="small" sx={{ mt: 0.75, px: 0, minWidth: 0 }} onClick={() => handleArchive(notification.id, false)}>
                    Restore
                  </Button>
                )}
              </Box>
            );
          })}
        </Stack>
      )}

      <Button
        size="small"
        sx={{ alignSelf: 'flex-start', px: 0, minWidth: 0 }}
        onClick={() => setShowArchived((prev) => !prev)}
      >
        {showArchived ? 'Hide archived' : 'Show archived'}
      </Button>
    </Stack>
  );
};

export default NotificationsPanel;
