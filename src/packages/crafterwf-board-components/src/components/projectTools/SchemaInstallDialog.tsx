import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import { ApiResponse, ApiResponseErrorState } from '@craftercms/studio-ui';
import { installSchema, SchemaStatus } from '../../api/adminApi';

type InstallPhase = 'installing' | 'success' | 'error';

export interface SchemaInstallDialogProps {
  open: boolean;
  siteId: string;
  onClose: () => void;
  onInstalled: (status: SchemaStatus) => void;
}

const SchemaInstallDialog = ({ open, siteId, onClose, onInstalled }: SchemaInstallDialogProps) => {
  const [phase, setPhase] = useState<InstallPhase>('installing');
  const [status, setStatus] = useState<SchemaStatus | null>(null);
  const [error, setError] = useState<ApiResponse>();
  const onInstalledRef = useRef(onInstalled);
  onInstalledRef.current = onInstalled;

  useEffect(() => {
    if (!open || !siteId) {
      return;
    }
    setPhase('installing');
    setStatus(null);
    setError(undefined);

    const sub = installSchema(siteId).subscribe({
      next: (response) => {
        const result = response.response.result as SchemaStatus;
        setStatus(result);
        if (result.installed) {
          setPhase('success');
          onInstalledRef.current(result);
        } else {
          setPhase('error');
          setError({
            code: '?',
            message:
              [result.error, result.detail].filter(Boolean).join(' — ') ||
              'Schema installation did not complete.'
          } as ApiResponse);
        }
      },
      error(e) {
        console.error(e);
        setPhase('error');
        setError(
          e.response?.response ??
            ({
              code: '?',
              message: 'Schema installation failed. Check Studio logs and database grants.'
            } as ApiResponse)
        );
      }
    });

    return () => sub.unsubscribe();
  }, [open, siteId]);

  const canClose = phase !== 'installing';

  return (
    <Dialog open={open} onClose={canClose ? onClose : undefined} maxWidth="sm" fullWidth>
      <DialogTitle>Install workflow database</DialogTitle>
      <DialogContent>
        {phase === 'installing' && (
          <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 2 }}>
            <CircularProgress size={28} />
            <Typography variant="body2">Creating schema and tables…</Typography>
          </Stack>
        )}

        {phase === 'success' && status && (
          <Stack spacing={1.5} sx={{ py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon color="success" />
              <Typography variant="body1" fontWeight={600}>
                Installation complete
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Schema <strong>{status.schemaName}</strong> is ready (version {status.version}).
            </Typography>
          </Stack>
        )}

        {phase === 'error' && (
          <Box sx={{ py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <ErrorOutlineRoundedIcon color="error" />
              <Typography variant="body1" fontWeight={600}>
                Installation failed
              </Typography>
            </Stack>
            {status?.remedialAction && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {status.remedialAction}
              </Typography>
            )}
            {error && <ApiResponseErrorState error={error} />}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={!canClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchemaInstallDialog;
