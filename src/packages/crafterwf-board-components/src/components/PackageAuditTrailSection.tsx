import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { AuditLogEntry, AuditLogSearchParams, listPackageAuditLog } from '../api/auditApi';
import { UserAvatarFromUsername } from './users/studioUserDisplay';

type SortableColumn = NonNullable<AuditLogSearchParams['sortBy']>;

const DEFAULT_PAGE_SIZE = 10;

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

export interface PackageAuditTrailSectionProps {
  packageId: string;
  refreshKey?: number;
}

const PackageAuditTrailSection = ({ packageId, refreshKey = 0 }: PackageAuditTrailSectionProps) => {
  const siteId = useActiveSiteId();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy, setSortBy] = useState<SortableColumn>('createdOn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState<string>();

  const loadEntries = useCallback(() => {
    if (!siteId || !packageId) {
      return;
    }
    setLoading(true);
    setError(undefined);
    listPackageAuditLog(siteId, packageId, page + 1, pageSize, sortBy, sortOrder).subscribe({
      next: (response) => {
        const result = response.response?.result;
        setEntries(result?.entries ?? []);
        setTotal(result?.total ?? 0);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setEntries([]);
        setTotal(0);
        setLoading(false);
        setError(e.response?.response?.message || 'Unable to load audit trail.');
      }
    });
  }, [siteId, packageId, page, pageSize, sortBy, sortOrder, refreshKey]);

  useEffect(() => {
    setExpanded(false);
    setPage(0);
    setPageSize(DEFAULT_PAGE_SIZE);
    setSortBy('createdOn');
    setSortOrder('desc');
    setEntries([]);
    setTotal(0);
    setError(undefined);
  }, [packageId]);

  useEffect(() => {
    if (!expanded) {
      return;
    }
    loadEntries();
  }, [expanded, loadEntries]);

  const handleAccordionChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
    if (isExpanded) {
      setPage(0);
    }
  };

  const handleSort = (column: SortableColumn) => {
    setPage(0);
    if (sortBy === column) {
      setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortBy(column);
    setSortOrder(column === 'createdOn' ? 'desc' : 'asc');
  };

  const sortDirection = (column: SortableColumn): 'asc' | 'desc' =>
    sortBy === column ? sortOrder : 'asc';

  const renderSortLabel = (column: SortableColumn, label: string, alignRight = false) => (
    <TableSortLabel
      active={sortBy === column}
      direction={sortDirection(column)}
      onClick={() => handleSort(column)}
      sx={alignRight ? { ml: 'auto' } : undefined}
    >
      {label}
    </TableSortLabel>
  );

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      disableGutters
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: '8px !important',
        '&:before': { display: 'none' },
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        sx={{ minHeight: 44, '& .MuiAccordionSummary-content': { my: 0.5 } }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Audit trail
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, px: 1.5, pb: 1.5 }}>
        {error ? (
          <Typography variant="body2" color="error" sx={{ py: 0.5 }}>
            {error}
          </Typography>
        ) : (
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <TableContainer>
              <Table size="small" aria-label="Package audit trail">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {renderSortLabel('createdOn', 'Date')}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{renderSortLabel('username', 'User')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{renderSortLabel('operation', 'Operation')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '50%' }}>
                      {renderSortLabel('note', 'Note')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && entries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        <CircularProgress size={22} />
                      </TableCell>
                    </TableRow>
                  ) : entries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          No audit entries for this package.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    entries.map((entry) => (
                      <TableRow key={entry.id} hover>
                        <TableCell sx={{ whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                          {formatDate(entry.createdOn)}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          {entry.username ? (
                            <UserAvatarFromUsername username={entry.username} size={22} />
                          ) : (
                            'unknown'
                          )}
                        </TableCell>
                        <TableCell sx={{ textTransform: 'capitalize', verticalAlign: 'top' }}>
                          {formatOperation(entry.operation)}
                        </TableCell>
                        <TableCell
                          sx={{
                            verticalAlign: 'top',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                          }}
                        >
                          {entry.note || '—'}
                        </TableCell>
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
              onRowsPerPageChange={(event) => {
                setPageSize(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Rows:"
              sx={{
                borderTop: 1,
                borderColor: 'divider',
                '.MuiTablePagination-toolbar': { minHeight: 44, px: 1 }
              }}
            />
            {loading && entries.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.75, borderTop: 1, borderColor: 'divider' }}>
                <CircularProgress size={18} />
              </Box>
            )}
          </Paper>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PackageAuditTrailSection;
