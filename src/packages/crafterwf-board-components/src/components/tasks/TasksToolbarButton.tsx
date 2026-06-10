import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { getOpenTaskCount, TASKS_UPDATED_EVENT } from '../../api/taskApi';
import { buildOpenIcePanelAction } from '../../utils/studioPreview';
import { ToolbarIconBadge } from '../../utils/toolbarBadge';

const TASKS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.tasksPanel';

export function TasksToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Tasks';
  const [openCount, setOpenCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  const refreshOpenCount = useCallback(() => {
    if (!siteId) {
      setOpenCount(0);
      setOverdueCount(0);
      return;
    }
    getOpenTaskCount(siteId).subscribe({
      next(response) {
        setOpenCount(response.response?.result?.openCount ?? 0);
        setOverdueCount(response.response?.result?.overdueCount ?? 0);
      },
      error(e) {
        console.error(e);
      }
    });
  }, [siteId]);

  useEffect(() => {
    refreshOpenCount();
    const intervalId = window.setInterval(refreshOpenCount, 30000);
    const handleUpdated = () => refreshOpenCount();
    window.addEventListener(TASKS_UPDATED_EVENT, handleUpdated);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(TASKS_UPDATED_EVENT, handleUpdated);
    };
  }, [refreshOpenCount]);

  const openTasksPanel = () => {
    dispatch(buildOpenIcePanelAction(title, TASKS_PANEL_WIDGET_ID, siteId ?? undefined) as never);
    refreshOpenCount();
  };

  return (
    <Tooltip title={title}>
      <span>
        <IconButton aria-label={title} size="large" {...props} onClick={openTasksPanel}>
          <ToolbarIconBadge count={openCount} color={overdueCount > 0 ? 'error' : 'primary'}>
            <InventoryRoundedIcon />
          </ToolbarIconBadge>
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default TasksToolbarButton;
