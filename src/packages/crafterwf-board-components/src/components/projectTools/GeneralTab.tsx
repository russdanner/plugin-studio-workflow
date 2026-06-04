import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { getSchemaStatus, SchemaStatus } from '../../api/adminApi';
import SchemaInstallDialog from './SchemaInstallDialog';

export interface GeneralTabProps {
  onSchemaReady?: () => void;
}

const GeneralTab = ({ onSchemaReady }: GeneralTabProps) => {
  const siteId = useActiveSiteId();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SchemaStatus | null>(null);
  const [installDialogOpen, setInstallDialogOpen] = useState(false);

  const refreshStatus = useCallback(() => {
    if (!siteId) {
      return;
    }
    setLoading(true);
    getSchemaStatus(siteId).subscribe({
      next: (response) => {
        const result = response.response.result as SchemaStatus;
        setStatus(result);
        setLoading(false);
        if (result.installed) {
          onSchemaReady?.();
        }
      },
      error(e) {
        console.error(e);
        setLoading(false);
        setStatus(null);
      }
    });
  }, [onSchemaReady, siteId]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const handleInstalled = (result: SchemaStatus) => {
    setStatus(result);
    onSchemaReady?.();
  };

  const handleDialogClose = () => {
    setInstallDialogOpen(false);
    refreshStatus();
  };

  return (
    <Box sx={{ p: 2, maxWidth: 720 }}>
      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
        <Typography variant="body1" component="span">
          Workflow Database:
        </Typography>

        {loading && <CircularProgress size={18} />}

        {!loading && status?.installed && (
          <>
            <CheckCircleRoundedIcon color="success" fontSize="small" aria-hidden />
            <Typography variant="body1" component="span" color="success.main" fontWeight={500}>
              Installed
            </Typography>
          </>
        )}

        {!loading && status && !status.installed && (
          <Button variant="contained" size="small" onClick={() => setInstallDialogOpen(true)}>
            Install
          </Button>
        )}

        {!loading && !status && siteId && (
          <Button variant="contained" size="small" onClick={() => setInstallDialogOpen(true)}>
            Install
          </Button>
        )}
      </Stack>

      {siteId && (
        <SchemaInstallDialog
          open={installDialogOpen}
          siteId={siteId}
          onClose={handleDialogClose}
          onInstalled={handleInstalled}
        />
      )}
    </Box>
  );
};

export default GeneralTab;
