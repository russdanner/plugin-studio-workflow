import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { ApiResponse, ApiResponseErrorState } from '@craftercms/studio-ui';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import {
  createWorkflow,
  deleteWorkflow,
  getWorkflow,
  listWorkflows,
  WorkflowDetail,
  WorkflowSummary
} from '../../api/adminApi';
import WorkflowEditorDialog from './WorkflowEditorDialog';
import { showStudioErrorSnack } from '../../utils/showStudioErrorSnack';

export interface WorkflowsTabProps {
  schemaReady: boolean;
}

const WorkflowsTab = ({ schemaReady }: WorkflowsTabProps) => {
  const siteId = useActiveSiteId();
  const [loading, setLoading] = useState(false);
  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([]);
  const [error, setError] = useState<ApiResponse>();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);
  const [editorDetail, setEditorDetail] = useState<WorkflowDetail | null>(null);

  const loadWorkflows = useCallback(() => {
    if (!schemaReady || !siteId) {
      return;
    }
    setLoading(true);
    setError(undefined);
    listWorkflows(siteId).subscribe({
      next: (response) => {
        setWorkflows(response.response.result.workflows || []);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unable to load workflows.' } as ApiResponse)
        );
        setLoading(false);
      }
    });
  }, [schemaReady, siteId]);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const openEditor = (detail: WorkflowDetail) => {
    setEditorDetail(detail);
    setEditorOpen(true);
  };

  const handleAdd = () => {
    setEditorLoading(true);
    createWorkflow(siteId, 'New Workflow', '').subscribe({
      next: (response) => {
        setEditorLoading(false);
        openEditor(response.response.result as WorkflowDetail);
        loadWorkflows();
      },
      error(e) {
        console.error(e);
        setEditorLoading(false);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unable to create workflow.' } as ApiResponse)
        );
      }
    });
  };

  const handleEdit = (workflowId: string) => {
    setEditorLoading(true);
    getWorkflow(siteId, workflowId).subscribe({
      next: (response) => {
        setEditorLoading(false);
        openEditor(response.response.result as WorkflowDetail);
      },
      error(e) {
        console.error(e);
        setEditorLoading(false);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unable to load workflow.' } as ApiResponse)
        );
      }
    });
  };

  const handleDelete = (workflow: WorkflowSummary) => {
    if (workflow.packageCount > 0) {
      showStudioErrorSnack(
        'This workflow has active packages. Archive or move packages before deleting the workflow.'
      );
      return;
    }
    if (!window.confirm(`Delete workflow "${workflow.name}"?`)) {
      return;
    }
    deleteWorkflow(siteId, workflow.id).subscribe({
      next: () => loadWorkflows(),
      error(e) {
        console.error(e);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unable to delete workflow.' } as ApiResponse)
        );
      }
    });
  };

  if (!schemaReady) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Install the database schema on the Admin tab before managing workflows.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Workflows</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh">
            <IconButton onClick={loadWorkflows} aria-label="Refresh workflows">
              <RefreshRoundedIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleAdd}
            disabled={editorLoading}
          >
            Add workflow
          </Button>
        </Stack>
      </Stack>

      {error && <ApiResponseErrorState error={error} />}

      {loading ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={20} />
          <Typography variant="body2">Loading workflows…</Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ flex: 1, minHeight: 0 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Steps</TableCell>
                <TableCell align="right">Packages</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body2" color="text.secondary">
                      No workflows yet. Click Add workflow to create one.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                workflows.map((workflow) => (
                  <TableRow key={workflow.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {workflow.name}
                      </Typography>
                      {workflow.description && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {workflow.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">{workflow.stepCount}</TableCell>
                    <TableCell align="right">{workflow.packageCount}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit workflow">
                        <IconButton size="small" onClick={() => handleEdit(workflow.id)} aria-label="Edit">
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete workflow">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(workflow)}
                          aria-label="Delete"
                          disabled={workflow.packageCount > 0}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {editorDetail && (
        <WorkflowEditorDialog
          open={editorOpen}
          detail={editorDetail}
          onClose={() => {
            setEditorOpen(false);
            setEditorDetail(null);
          }}
          onSaved={() => {
            loadWorkflows();
            getWorkflow(siteId, editorDetail.workflow.id).subscribe({
              next: (response) => {
                setEditorDetail(response.response.result as WorkflowDetail);
              },
              error() {
                setEditorOpen(false);
                setEditorDetail(null);
              }
            });
          }}
        />
      )}
    </Box>
  );
};

export default WorkflowsTab;
