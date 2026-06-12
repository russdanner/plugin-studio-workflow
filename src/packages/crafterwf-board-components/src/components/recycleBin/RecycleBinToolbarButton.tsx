import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Subscription } from 'rxjs';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import {
  binContentPaths,
  canAccessRecycleBin,
  notifyRecycleBinUpdated,
  RecycleBinItem
} from '../../api/recycleBinApi';
import { openRecycleBinDialog } from '../../utils/openRecycleBinDialog';
import { usePreviewContentPath } from '../../utils/studioPreview';
import { emitStudioMoveContentEvent } from '../../utils/studioContentEvents';
import { showStudioErrorSnack } from '../../utils/showStudioErrorSnack';
import RecycleBinSelectDialog from './RecycleBinSelectDialog';

export function RecycleBinToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const contentPath = usePreviewContentPath();
  const title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Recycle bin';

  const [allowed, setAllowed] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [confirmCurrentOpen, setConfirmCurrentOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [binning, setBinning] = useState(false);
  const [confirmSelectPaths, setConfirmSelectPaths] = useState<string[] | null>(null);

  const accessSubscriptionRef = useRef<Subscription | null>(null);

  const refreshAccess = useCallback(() => {
    accessSubscriptionRef.current?.unsubscribe();
    if (!siteId) {
      setAllowed(false);
      setCheckingAccess(false);
      return;
    }
    setCheckingAccess(true);
    accessSubscriptionRef.current = canAccessRecycleBin(siteId).subscribe({
      next(response) {
        setAllowed(Boolean(response.response?.result?.allowed));
        setCheckingAccess(false);
      },
      error(e) {
        console.error('[crafterwf] recycle-bin/can-access failed', e);
        setAllowed(false);
        setCheckingAccess(false);
      }
    });
  }, [siteId]);

  useEffect(() => {
    refreshAccess();
    return () => accessSubscriptionRef.current?.unsubscribe();
  }, [refreshAccess]);

  const notifyContentTreeMoves = (items: RecycleBinItem[]) => {
    if (!siteId) {
      return;
    }
    items.forEach((item) => {
      if (item.originalPath && item.binPath) {
        emitStudioMoveContentEvent(dispatch, siteId, item.originalPath, item.binPath);
      }
    });
  };

  const runBinPaths = async (paths: string[]) => {
    if (!siteId || paths.length === 0) {
      return;
    }
    setBinning(true);
    try {
      const binnedItems = await new Promise<RecycleBinItem[]>((resolve, reject) => {
        binContentPaths(siteId, paths).subscribe({
          next(response) {
            const result = response.response?.result;
            const errors = result?.errors as Array<{ path: string; message: string }> | undefined;
            if (errors?.length) {
              showStudioErrorSnack(errors.map((entry) => entry.message).join(' '));
            }
            resolve((result?.items as RecycleBinItem[] | undefined) ?? []);
          },
          error(err) {
            reject(err);
          }
        });
      });
      notifyContentTreeMoves(binnedItems);
      notifyRecycleBinUpdated();
    } catch (e) {
      console.error(e);
      showStudioErrorSnack('Unable to move item(s) to recycle bin.');
    } finally {
      setBinning(false);
      setConfirmCurrentOpen(false);
      setSelectOpen(false);
      setConfirmSelectPaths(null);
    }
  };

  const handleBinCurrentPage = () => {
    setMenuAnchor(null);
    if (!contentPath) {
      showStudioErrorSnack('Open a page in preview to recycle it.');
      return;
    }
    setConfirmCurrentOpen(true);
  };

  const handleSelectItems = () => {
    setMenuAnchor(null);
    setSelectOpen(true);
  };

  const handleOpenRecycleBin = () => {
    setMenuAnchor(null);
    openRecycleBinDialog(dispatch, title, siteId ?? undefined);
  };

  if (checkingAccess || !allowed) {
    return null;
  }

  return (
    <>
      <Tooltip title={title}>
        <span>
          <IconButton
            aria-label={title}
            size="large"
            disabled={binning}
            {...props}
            onClick={(event) => setMenuAnchor(event.currentTarget)}
          >
            {binning ? <CircularProgress size={22} color="inherit" /> : <DeleteOutlineRoundedIcon />}
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
        <MenuItem onClick={handleBinCurrentPage} disabled={!contentPath || binning}>
          <ListItemText
            primary="Put current page in recycle bin"
            secondary={contentPath ? contentPath : 'Open preview content first'}
          />
        </MenuItem>
        <MenuItem onClick={handleSelectItems} disabled={binning}>
          <ListItemText primary="Select items to put in recycle bin" />
        </MenuItem>
        <MenuItem onClick={handleOpenRecycleBin} disabled={binning}>
          <ListItemText primary="Open recycle bin" />
        </MenuItem>
      </Menu>

      <Dialog open={confirmCurrentOpen} onClose={() => setConfirmCurrentOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Move to recycle bin?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Move <strong>{contentPath}</strong> to the recycle bin? You can restore it later from the recycle bin
            dialog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCurrentOpen(false)} disabled={binning}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => contentPath && void runBinPaths([contentPath])}
            disabled={binning || !contentPath}
          >
            Move to recycle bin
          </Button>
        </DialogActions>
      </Dialog>

      <RecycleBinSelectDialog
        open={selectOpen}
        onClose={() => setSelectOpen(false)}
        onConfirm={(paths) => setConfirmSelectPaths(paths)}
      />

      <Dialog
        open={Boolean(confirmSelectPaths?.length)}
        onClose={() => setConfirmSelectPaths(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Move {confirmSelectPaths?.length ?? 0} item(s) to recycle bin?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selected items will be moved under <strong>/recyclebin</strong> and can be restored later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmSelectPaths(null)} disabled={binning}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => confirmSelectPaths && void runBinPaths(confirmSelectPaths)}
            disabled={binning}
          >
            Move to recycle bin
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecycleBinToolbarButton;
