import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { ApiResponse } from '@craftercms/studio-ui';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import {
  AuditLogEntry,
  AuditLogSearchParams,
  searchAuditLog
} from '../../api/auditApi';

export interface AuditLogTabProps {
  schemaReady: boolean;
}

const TARGET_TYPE_OPTIONS = [
  { value: '', label: 'All target types' },
  { value: 'task', label: 'Task' },
  { value: 'package', label: 'Package' },
  { value: 'workflow', label: 'Workflow' }
];

const OPERATION_OPTIONS = [
  { value: '', label: 'All operations' },
  { value: 'task_created', label: 'Task created' },
  { value: 'task_modified', label: 'Task modified' },
  { value: 'package_created', label: 'Package created' },
  { value: 'package_step_changed', label: 'Package step changed' },
  { value: 'package_step_action', label: 'Automatic step action' },
  { value: 'workflow_bypass_acknowledged', label: 'Workflow bypass acknowledged' },
  { value: 'workflow_bypass_action', label: 'Workflow bypass action' },
  { value: 'package_modified', label: 'Package modified' }
];

function formatDate(value?: string) {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

function formatOperation(operation: string) {
  return operation.replace(/_/g, ' ');
}

const AuditLogTab = ({ schemaReady }: AuditLogTabProps) => {
  const siteId = useActiveSiteId();
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [error, setError] = useState<ApiResponse>();
  const [filters, setFilters] = useState<AuditLogSearchParams>({
    username: '',
    operation: '',
    targetType: '',
    targetId: '',
    q: ''
  });

  const loadEntries = useCallback(() => {
    if (!schemaReady || !siteId) {
      return;
    }
    setLoading(true);
    setError(undefined);
    searchAuditLog(siteId, {
      ...filters,
      username: filters.username || undefined,
      operation: filters.operation || undefined,
      targetType: filters.targetType || undefined,
      targetId: filters.targetId || undefined,
      q: filters.q || undefined,
      page: page + 1,
      pageSize
    }).subscribe({
      next: (response) => {
        const result = response.response.result;
        setEntries(result.entries || []);
        setTotal(result.total || 0);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setError(
          e.response?.response ?? ({ code: '?', message: 'Unable to load audit log.' } as ApiResponse)
        );
        setLoading(false);
      }
    });
  }, [schemaReady, siteId, filters, page, pageSize]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleFilterChange = (field: keyof AuditLogSearchParams, value: string) => {
    setPage(0);
    setFilters((current) => ({ ...current, [field]: value }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Audit Log</Typography>
        <Tooltip title="Refresh">
          <span>
            <IconButton onClick={loadEntries} disabled={loading || !schemaReady} size="small">
              <RefreshRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {!schemaReady ? (
        <Typography color="text.secondary">Install the workflow schema on the Admin tab first.</Typography>
      ) : (
        <>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="User"
              size="small"
              value={filters.username || ''}
              onChange={(e) => handleFilterChange('username', e.target.value)}
              sx={{ minWidth: 160 }}
            />
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Operation</InputLabel>
              <Select
                label="Operation"
                value={filters.operation || ''}
                onChange={(e) => handleFilterChange('operation', e.target.value)}
              >
                {OPERATION_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Target type</InputLabel>
              <Select
                label="Target type"
                value={filters.targetType || ''}
                onChange={(e) => handleFilterChange('targetType', e.target.value)}
              >
                {TARGET_TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Target ID"
              size="small"
              value={filters.targetId || ''}
              onChange={(e) => handleFilterChange('targetId', e.target.value)}
              sx={{ minWidth: 220 }}
            />
            <TextField
              label="Search note"
              size="small"
              value={filters.q || ''}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              sx={{ flex: 1, minWidth: 200 }}
            />
            <Button variant="outlined" onClick={loadEntries} disabled={loading}>
              Apply
            </Button>
          </Stack>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error.message}
            </Typography>
          )}

          <Paper variant="outlined">
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Operation</TableCell>
                    <TableCell>Target type</TableCell>
                    <TableCell>Target ID</TableCell>
                    <TableCell>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : entries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">No audit entries found.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    entries.map((entry) => (
                      <TableRow key={entry.id} hover>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatDate(entry.createdOn)}</TableCell>
                        <TableCell>{entry.username}</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>
                          {formatOperation(entry.operation)}
                        </TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>{entry.targetType}</TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            maxWidth: 220,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {entry.targetId}
                        </TableCell>
                        <TableCell>{entry.note || '—'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={(_, nextPage) => setPage(nextPage)}
              rowsPerPage={pageSize}
              onRowsPerPageChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
          </Paper>
        </>
      )}
    </Box>
  );
};

export default AuditLogTab;
