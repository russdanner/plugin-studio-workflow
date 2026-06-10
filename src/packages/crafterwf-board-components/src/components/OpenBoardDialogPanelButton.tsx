import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { useDispatch } from 'react-redux';

import { listWorkflows, WorkflowSummary } from '../api/adminApi';
import { openWorkflowBoard } from '../utils/openWorkflowBoard';

/** Tools panel label when the site has more than one workflow (accordion). */
const MULTI_WORKFLOW_LABEL = 'Workflow';
const DEFAULT_WORKFLOW_ICON = '@mui/icons-material/AccountTreeOutlined';

function resolveWorkflowIcon(props: Record<string, unknown>): string {
  const icon = props.icon as { id?: string } | undefined;
  return icon?.id?.trim() ? icon.id : DEFAULT_WORKFLOW_ICON;
}

export function OpenBoardDialogPanelButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const workflowIcon = resolveWorkflowIcon(props);

  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const loadWorkflows = useCallback(() => {
    if (!siteId) {
      setWorkflows([]);
      return;
    }
    setLoading(true);
    listWorkflows(siteId).subscribe({
      next(response) {
        setWorkflows(response.response?.result?.workflows ?? []);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setWorkflows([]);
        setLoading(false);
      }
    });
  }, [siteId]);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const openBoard = (workflow: WorkflowSummary) => {
    openWorkflowBoard(dispatch, workflow.name, { workflowId: workflow.id });
  };

  const singleWorkflow = workflows.length === 1 ? workflows[0] : null;
  const multipleWorkflows = workflows.length > 1;
  const panelTitle = singleWorkflow ? singleWorkflow.name : MULTI_WORKFLOW_LABEL;

  const handlePrimaryClick = () => {
    if (loading) {
      return;
    }
    if (singleWorkflow) {
      openBoard(singleWorkflow);
      return;
    }
    if (multipleWorkflows) {
      setExpanded((prev) => !prev);
      return;
    }
    openWorkflowBoard(dispatch, MULTI_WORKFLOW_LABEL, { workflowId: '' });
  };

  const toggleExpanded = () => {
    if (multipleWorkflows) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <>
      <ToolsPanelListItemButton
        icon={{ id: workflowIcon }}
        title={panelTitle}
        disabled={loading}
        onClick={handlePrimaryClick}
        onSecondaryActionClick={multipleWorkflows ? toggleExpanded : undefined}
        secondaryActionIcon={
          multipleWorkflows ? (
            <ExpandMoreRounded
              sx={{
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            />
          ) : (
            <ChevronRightRounded />
          )
        }
      />
      {multipleWorkflows && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List disablePadding dense>
            {workflows.map((workflow) => (
              <ListItemButton
                key={workflow.id}
                sx={{ pl: 5, py: 0.75 }}
                onClick={() => openBoard(workflow)}
              >
                <ListItemText
                  primary={workflow.name}
                  primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default OpenBoardDialogPanelButton;
