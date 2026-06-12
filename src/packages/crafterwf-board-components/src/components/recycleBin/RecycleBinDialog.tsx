import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { useDispatch } from 'react-redux';

import useStudioItemPreview from '../../hooks/useStudioItemPreview';
import {
  checkRecycleBinRestore,
  listRecycleBinItems,
  notifyRecycleBinUpdated,
  purgeRecycleBinItem,
  RECYCLE_BIN_UPDATED_EVENT,
  RecycleBinItem,
  RecycleBinListResult,
  RecycleBinSortField,
  RecycleBinSortOrder,
  restoreRecycleBinItem
} from '../../api/recycleBinApi';
import {
  displayRecycleBinName,
  formatRecycleBinUserDate,
  formatSandboxStateLabel
} from '../../utils/recycleBinDisplay';
import { emitStudioDeleteContentEvent, emitStudioMoveContentEvent } from '../../utils/studioContentEvents';
import { showStudioErrorSnack } from '../../utils/showStudioErrorSnack';

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const FILTER_DEBOUNCE_MS = 300;

const SORT_COLUMNS: Array<{ id: RecycleBinSortField; label: string }> = [
  { id: 'internalName', label: 'Name' },
  { id: 'originalCreatedOn', label: 'Created' },
  { id: 'originalModifiedOn', label: 'Last modified' },
  { id: 'binnedOn', label: 'Binned' }
];

function MetadataCell({ username, date }: { username?: string | null; date?: string | null }) {
  return (
    <Typography variant="caption" component="div" sx={{ whiteSpace: 'nowrap' }}>
      {formatRecycleBinUserDate(username, date)}
    </Typography>
  );
}

/** Content widget for Studio's SHOW_WIDGET_DIALOG shell. */
const RecycleBinDialog = () => {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const { previewPath } = useStudioItemPreview();

  const [items, setItems] = useState<RecycleBinItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<RecycleBinSortField>('binnedOn');
  const [sortOrder, setSortOrder] = useState<RecycleBinSortOrder>('desc');
  const [filterInput, setFilterInput] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<'restore' | 'purge' | null>(null);
  const [collisionDialog, setCollisionDialog] = useState<{
    item: RecycleBinItem;
    originalPath: string;
  } | null>(null);
  const [purgeDialog, setPurgeDialog] = useState<RecycleBinItem | null>(null);

  const refresh = useCallback(() => {
    if (!siteId) {
      setItems([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    setError(null);
    listRecycleBinItems(siteId, {
      page: page + 1,
      pageSize,
      sortBy,
      sortOrder,
      q: filterQuery
    }).subscribe({
      next(response) {
        const result = response.response?.result as RecycleBinListResult | undefined;
        setItems(result?.items ?? []);
        setTotal(result?.total ?? 0);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setError('Unable to load recycle bin.');
        setItems([]);
        setTotal(0);
        setLoading(false);
      }
    });
  }, [filterQuery, page, pageSize, siteId, sortBy, sortOrder]);

  useEffect(() => {
    const handle = window.setTimeout(() => setFilterQuery(filterInput.trim()), FILTER_DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [filterInput]);

  useEffect(() => {
    refresh();
    const handleUpdated = () => refresh();
    window.addEventListener(RECYCLE_BIN_UPDATED_EVENT, handleUpdated);
    return () => window.removeEventListener(RECYCLE_BIN_UPDATED_EVENT, handleUpdated);
  }, [refresh]);

  const handleSort = (field: RecycleBinSortField) => {
    if (sortBy === field) {
      setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(0);
  };

  const performRestore = async (item: RecycleBinItem, confirmCollision: boolean) => {
    if (!siteId) {
      return;
    }
    setBusyId(item.id);
    setBusyAction('restore');
    try {
      await new Promise<void>((resolve, reject) => {
        restoreRecycleBinItem(siteId, item.id, confirmCollision).subscribe({
          next(response) {
            const restored = response.response?.result?.item as RecycleBinItem | undefined;
            if (restored?.binPath && restored?.originalPath) {
              emitStudioMoveContentEvent(dispatch, siteId, restored.binPath, restored.originalPath);
            } else if (item.binPath && item.originalPath) {
              emitStudioMoveContentEvent(dispatch, siteId, item.binPath, item.originalPath);
            }
            resolve();
          },
          error(err) {
            reject(err);
          }
        });
      });
      notifyRecycleBinUpdated();
    } catch (e) {
      console.error(e);
      showStudioErrorSnack('Unable to restore item. Check permissions and try again.');
    } finally {
      setBusyId(null);
      setBusyAction(null);
      setCollisionDialog(null);
    }
  };

  const performPurge = async (item: RecycleBinItem) => {
    if (!siteId) {
      return;
    }
    setBusyId(item.id);
    setBusyAction('purge');
    try {
      await new Promise<void>((resolve, reject) => {
        purgeRecycleBinItem(siteId, item.id).subscribe({
          next() {
            emitStudioDeleteContentEvent(dispatch, siteId, item.binPath);
            resolve();
          },
          error(err) {
            reject(err);
          }
        });
      });
      notifyRecycleBinUpdated();
    } catch (e) {
      console.error(e);
      showStudioErrorSnack('Unable to permanently delete item. Check permissions and try again.');
    } finally {
      setBusyId(null);
      setBusyAction(null);
      setPurgeDialog(null);
    }
  };

  const handleRestoreClick = (item: RecycleBinItem) => {
    if (!siteId) {
      return;
    }
    checkRecycleBinRestore(siteId, item.id).subscribe({
      next(response) {
        const result = response.response?.result;
        if (result?.collision) {
          setCollisionDialog({
            item,
            originalPath: result.originalPath ?? item.originalPath
          });
          return;
        }
        void performRestore(item, false);
      },
      error(e) {
        console.error(e);
        showStudioErrorSnack('Unable to check restore path.');
      }
    });
  };

  const handlePreview = (item: RecycleBinItem) => {
    previewPath(item.binPath, displayRecycleBinName(item));
  };

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        minWidth: 0,
        minHeight: 0,
        flex: 1,
        boxSizing: 'border-box',
        px: theme.spacing(2.5),
        py: theme.spacing(2),
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      })}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2, flexShrink: 0 }}>
        <Box
          sx={(theme) => ({
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: theme.palette.error.main,
            color: theme.palette.error.contrastText
          })}
        >
          <DeleteOutlineRoundedIcon fontSize="small" />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            Recycle bin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review metadata, preview binned content, restore, or permanently delete.
          </Typography>
        </Box>
        {!loading ? <Chip size="small" label={`${total} item${total === 1 ? '' : 's'}`} /> : null}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }} alignItems={{ sm: 'center' }}>
        <TextField
          size="small"
          placeholder="Filter by name, path, user, state, or date…"
          value={filterInput}
          onChange={(event) => {
            setFilterInput(event.target.value);
            setPage(0);
          }}
          sx={{ flex: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
            endAdornment: filterInput ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="Clear filter"
                  onClick={() => setFilterInput('')}
                  edge="end"
                >
                  <ClearRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="crafterwf-recycle-bin-sort-label">Sort by</InputLabel>
          <Select
            labelId="crafterwf-recycle-bin-sort-label"
            label="Sort by"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as RecycleBinSortField);
              setPage(0);
            }}
          >
            {SORT_COLUMNS.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="crafterwf-recycle-bin-order-label">Order</InputLabel>
          <Select
            labelId="crafterwf-recycle-bin-order-label"
            label="Order"
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value as RecycleBinSortOrder);
              setPage(0);
            }}
          >
            <MenuItem value="desc">Newest first</MenuItem>
            <MenuItem value="asc">Oldest first</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider sx={{ mb: 1.5, flexShrink: 0 }} />

      <TableContainer sx={{ flex: 1, minHeight: 0 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
            <CircularProgress size={32} />
          </Box>
        ) : null}

        {error ? (
          <Typography color="error" variant="body2" sx={{ py: 2 }}>
            {error}
          </Typography>
        ) : null}

        {!loading && !error && items.length === 0 ? (
          <Stack spacing={1} alignItems="center" sx={{ py: 6, px: 2, textAlign: 'center' }}>
            <DeleteOutlineRoundedIcon sx={{ fontSize: 48, color: 'text.disabled', opacity: 0.5 }} />
            <Typography variant="subtitle1" color="text.secondary">
              {filterQuery ? 'No items match your filter' : 'The recycle bin is empty'}
            </Typography>
            {filterQuery ? (
              <Button size="small" onClick={() => setFilterInput('')}>
                Clear filter
              </Button>
            ) : null}
          </Stack>
        ) : null}

        {!loading && items.length > 0 ? (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {SORT_COLUMNS.map((column) => (
                  <TableCell key={column.id} sortDirection={sortBy === column.id ? sortOrder : false}>
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Last state</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const isBusy = busyId === item.id;
                return (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ minWidth: 160 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {displayRecycleBinName(item)}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="div"
                        sx={{ fontFamily: 'monospace', wordBreak: 'break-all', color: 'text.secondary' }}
                      >
                        {item.originalPath}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <MetadataCell username={item.originalCreatedBy} date={item.originalCreatedOn} />
                    </TableCell>
                    <TableCell>
                      <MetadataCell username={item.originalLastModifier} date={item.originalModifiedOn} />
                    </TableCell>
                    <TableCell>
                      <MetadataCell username={item.binnedByUsername} date={item.binnedOn} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        variant="outlined"
                        label={formatSandboxStateLabel(item.originalSandboxState)}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      <Tooltip title="Preview in Studio">
                        <span>
                          <IconButton
                            size="small"
                            aria-label={`Preview ${displayRecycleBinName(item)}`}
                            onClick={() => handlePreview(item)}
                            disabled={isBusy}
                          >
                            <PreviewRoundedIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Restore to original path">
                        <span>
                          <IconButton
                            size="small"
                            color="primary"
                            aria-label={`Restore ${displayRecycleBinName(item)}`}
                            onClick={() => handleRestoreClick(item)}
                            disabled={isBusy}
                          >
                            {isBusy && busyAction === 'restore' ? (
                              <CircularProgress size={18} color="inherit" />
                            ) : (
                              <RestoreFromTrashRoundedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Delete permanently">
                        <span>
                          <IconButton
                            size="small"
                            color="error"
                            aria-label={`Delete permanently ${displayRecycleBinName(item)}`}
                            onClick={() => setPurgeDialog(item)}
                            disabled={isBusy}
                          >
                            {isBusy && busyAction === 'purge' ? (
                              <CircularProgress size={18} color="inherit" />
                            ) : (
                              <DeleteForeverRoundedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : null}
      </TableContainer>

      {!loading && total > 0 ? (
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
          rowsPerPageOptions={PAGE_SIZE_OPTIONS}
          sx={{ flexShrink: 0, borderTop: 1, borderColor: 'divider' }}
        />
      ) : null}

      <Dialog open={Boolean(collisionDialog)} onClose={() => setCollisionDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Path already exists</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Stack spacing={1.5}>
              <Typography variant="body2">
                Restoring <strong>{collisionDialog ? displayRecycleBinName(collisionDialog.item) : ''}</strong> will
                move content back to:
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {collisionDialog?.originalPath}
              </Typography>
              <Typography variant="body2" color="warning.main">
                That path already exists in the sandbox. Confirm only if you intend to overwrite or merge with the
                existing item.
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCollisionDialog(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => collisionDialog && void performRestore(collisionDialog.item, true)}
            disabled={busyId === collisionDialog?.item.id}
          >
            Restore anyway
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(purgeDialog)} onClose={() => setPurgeDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Delete permanently?</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Stack spacing={1.5}>
              <Typography variant="body2">
                Permanently delete <strong>{purgeDialog ? displayRecycleBinName(purgeDialog) : ''}</strong>?
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {purgeDialog?.binPath}
              </Typography>
              <Typography variant="body2" color="error">
                This cannot be undone. The sandbox content will be removed and the recycle bin record will be marked
                purged.
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPurgeDialog(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => purgeDialog && void performPurge(purgeDialog)}
            disabled={busyId === purgeDialog?.id}
          >
            Delete permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecycleBinDialog;
