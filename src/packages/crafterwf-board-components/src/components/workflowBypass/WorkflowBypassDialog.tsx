import * as React from 'react';
import { useState } from 'react';

import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

import { WorkflowBypassStudioAction, WorkflowBypassViolation } from '../../api/bypassApi';

export interface WorkflowBypassDialogProps {
  open: boolean;
  action: WorkflowBypassStudioAction;
  allowUiBypass: boolean;
  violations: WorkflowBypassViolation[];
  acknowledging?: boolean;
  onCancel(): void;
  onConfirm(): void;
}

function actionLabel(action: WorkflowBypassStudioAction): string {
  switch (action) {
    case 'request_publish':
      return 'request publish';
    case 'reject':
      return 'reject';
    default:
      return 'publish';
  }
}

function actionNoun(action: WorkflowBypassStudioAction): string {
  switch (action) {
    case 'request_publish':
      return 'Request publish';
    case 'reject':
      return 'Reject';
    default:
      return 'Publish';
  }
}

const WorkflowBypassDialog = ({
  open,
  action,
  allowUiBypass,
  violations,
  acknowledging = false,
  onCancel,
  onConfirm
}: WorkflowBypassDialogProps) => {
  const [acknowledged, setAcknowledged] = useState(false);

  React.useEffect(() => {
    if (open) {
      setAcknowledged(false);
    }
  }, [open, violations, allowUiBypass]);

  const primaryMessage = violations[0]?.warningMessage;

  return (
    <Dialog open={open} onClose={acknowledging ? undefined : onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {allowUiBypass ? (
          <WarningAmberRoundedIcon color="warning" />
        ) : (
          <BlockRoundedIcon color="error" />
        )}
        {allowUiBypass ? 'Workflow bypass warning' : 'Workflow step required'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {allowUiBypass
              ? `You are about to ${actionLabel(action)} content outside the configured workflow step. Review the package details below. You may continue after acknowledging this warning.`
              : `${actionNoun(action)} is blocked because this content is in a workflow package that is not on the correct step. Move the package to the step that runs this action, then try again.`}
          </Typography>
          {primaryMessage && (
            <Alert severity={allowUiBypass ? 'warning' : 'error'} sx={{ alignItems: 'flex-start' }}>
              {primaryMessage}
            </Alert>
          )}
          {violations.map((violation) => (
            <Stack
              key={`${violation.packageId}-${violation.contentPath}`}
              spacing={0.5}
              sx={(theme) => ({
                p: 1.5,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`
              })}
            >
              <Typography variant="subtitle2">{violation.packageTitle}</Typography>
              <Typography variant="body2">
                <strong>Workflow:</strong> {violation.workflowName}
              </Typography>
              <Typography variant="body2">
                <strong>Current step:</strong> {violation.currentStepName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {violation.contentPath}
              </Typography>
            </Stack>
          ))}
          {allowUiBypass && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  disabled={acknowledging}
                />
              }
              label="I understand this action bypasses the workflow step."
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {allowUiBypass ? (
          <>
            <Button onClick={onCancel} disabled={acknowledging}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="warning"
              disabled={!acknowledged || acknowledging}
              onClick={onConfirm}
            >
              Continue
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={onCancel}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default WorkflowBypassDialog;
