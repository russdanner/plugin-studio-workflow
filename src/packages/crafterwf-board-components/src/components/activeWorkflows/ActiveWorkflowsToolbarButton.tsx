import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { listWorkflows, WorkflowSummary } from '../../api/adminApi';
import { findPackagesByContentPath, ContentPackageWithComments } from '../../api/workflowApi';
import {
  groupPackagesByWorkflow,
  openWorkflowBoardForGroup,
  startWorkflowPackageForContent,
  WORKFLOWS_UPDATED_EVENT,
  WorkflowPackageGroup
} from '../../utils/activeWorkflows';
import { usePreviewContentPath } from '../../utils/studioPreview';
import { showStudioErrorSnack } from '../../utils/showStudioErrorSnack';
import { parseCalendarDate } from '../../utils/taskCalendarUtils';
import { ToolbarIconBadge } from '../../utils/toolbarBadge';
import WorkflowBypassGuard from '../workflowBypass/WorkflowBypassGuard';

export function ActiveWorkflowsToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const contentPath = usePreviewContentPath();
  const title =
    typeof props.title === 'string' && props.title.trim() ? props.title : 'Page packages';

  const [packages, setPackages] = useState<ContentPackageWithComments[]>([]);
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([]);

  const workflowGroups = useMemo(() => groupPackagesByWorkflow(packages), [packages]);
  const packageCount = packages.length;
  const overduePackageCount = useMemo(
    () =>
      packages.filter((pkg) => {
        const due = parseCalendarDate(pkg.dueOn);
        return !!(due && due.getTime() < Date.now());
      }).length,
    [packages]
  );

  const refreshPackages = useCallback(() => {
    if (!siteId || !contentPath) {
      setPackages([]);
      return;
    }
    setLoading(true);
    findPackagesByContentPath(siteId, contentPath, true, false).subscribe({
      next(response) {
        setPackages(response.response?.result?.packages ?? []);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setPackages([]);
        setLoading(false);
      }
    });
  }, [contentPath, siteId]);

  useEffect(() => {
    refreshPackages();
    const intervalId = window.setInterval(refreshPackages, 30000);
    const handleUpdated = () => refreshPackages();
    window.addEventListener(WORKFLOWS_UPDATED_EVENT, handleUpdated);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(WORKFLOWS_UPDATED_EVENT, handleUpdated);
    };
  }, [refreshPackages]);

  const loadWorkflows = (): Promise<WorkflowSummary[]> =>
    new Promise((resolve, reject) => {
      if (!siteId) {
        resolve([]);
        return;
      }
      listWorkflows(siteId).subscribe({
        next(response) {
          const list = response.response?.result?.workflows ?? [];
          setWorkflows(list);
          resolve(list);
        },
        error(err) {
          console.error(err);
          reject(err);
        }
      });
    });

  const handleStartOnWorkflow = async (workflow: WorkflowSummary) => {
    if (!siteId || !contentPath) {
      return;
    }
    setStartDialogOpen(false);
    setStarting(true);
    try {
      await startWorkflowPackageForContent(dispatch, siteId, contentPath, workflow);
    } catch (e) {
      console.error(e);
      showStudioErrorSnack('Unable to start workflow. Check Project Tools → Workflows and try again.');
    } finally {
      setStarting(false);
    }
  };

  const handleStartWorkflow = async () => {
    if (!contentPath) {
      return;
    }
    try {
      const available = workflows.length ? workflows : await loadWorkflows();
      if (!available.length) {
        showStudioErrorSnack(
          'No workflows are configured for this site. Create one in Project Tools → Crafter Workflow.'
        );
        return;
      }
      if (available.length === 1) {
        await handleStartOnWorkflow(available[0]);
        return;
      }
      setStartDialogOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenWorkflowGroup = (group: WorkflowPackageGroup) => {
    setMenuAnchor(null);
    openWorkflowBoardForGroup(dispatch, group);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!contentPath) {
      return;
    }
    if (packageCount === 0) {
      handleStartWorkflow();
      return;
    }
    if (workflowGroups.length === 1) {
      openWorkflowBoardForGroup(dispatch, workflowGroups[0]);
      return;
    }
    setMenuAnchor(event.currentTarget);
  };

  const tooltipTitle = !contentPath
    ? 'Open a page in preview to see active workflows'
    : packageCount === 0
      ? `${title} — start a workflow for this page`
      : packageCount === 1
        ? `${title} — 1 active package on this page`
        : `${title} — ${packageCount} active packages on this page`;

  return (
    <>
      <WorkflowBypassGuard />
      <Tooltip title={tooltipTitle}>
        <span>
          <IconButton
            aria-label={title}
            onClick={handleClick}
            size="large"
            disabled={!contentPath || loading || starting}
            {...props}
          >
            <ToolbarIconBadge
              count={packageCount}
              overdueCount={overduePackageCount}
              color={overduePackageCount > 0 ? 'error' : 'secondary'}
              sx={
                overduePackageCount === 0
                  ? { '& .MuiBadge-badge': { backgroundColor: '#9c27b0' } }
                  : undefined
              }
            >
              {starting ? <CircularProgress size={22} color="inherit" /> : <AccountTreeOutlinedIcon />}
            </ToolbarIconBadge>
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {workflowGroups.map((group) => (
          <MenuItem key={group.workflowId} onClick={() => handleOpenWorkflowGroup(group)}>
            <ListItemText
              primary={group.workflowName}
              secondary={`${group.packages.length} package${group.packages.length === 1 ? '' : 's'}`}
            />
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={startDialogOpen} onClose={() => setStartDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Start a workflow</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Choose a workflow for this page. A new package will be created on the first step with this content attached.
          </Typography>
          <List disablePadding dense>
            {workflows.map((workflow) => (
              <ListItemButton key={workflow.id} onClick={() => handleStartOnWorkflow(workflow)} disabled={starting}>
                <ListItemText primary={workflow.name} secondary={workflow.description || undefined} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStartDialogOpen(false)} disabled={starting}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ActiveWorkflowsToolbarButton;
