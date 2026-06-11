import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Subscription } from 'rxjs';

import {
  closePublishDialog,
  closeRejectDialog,
  showPublishDialog,
  showRejectDialog
} from '@craftercms/studio-ui/state/actions/dialogs';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import {
  acknowledgeWorkflowBypass,
  checkWorkflowBypass,
  recordWorkflowBypassAction,
  WorkflowBypassStudioAction,
  WorkflowBypassViolation
} from '../../api/bypassApi';
import WorkflowBypassDialog from './WorkflowBypassDialog';

type SandboxItem = { path?: string; id?: string };

type PublishDialogState = {
  open?: boolean;
  isSubmitting?: boolean;
  items?: SandboxItem[];
  crafterwfBypassAcknowledged?: boolean;
  isRequestPublish?: boolean;
  [key: string]: unknown;
};

type PendingStudioDialog = {
  kind: 'publish' | 'reject';
  payload: Record<string, unknown>;
};

type PendingBypassRecord = {
  action: WorkflowBypassStudioAction;
  violations: WorkflowBypassViolation[];
};

function extractContentPaths(payload: Record<string, unknown>): string[] {
  const items = payload.items as SandboxItem[] | undefined;
  const fromItems = (items ?? [])
    .map((item) => (item.path || item.id || '').trim())
    .filter(Boolean);
  if (fromItems.length) {
    return fromItems;
  }
  const paths = payload.paths;
  if (Array.isArray(paths)) {
    return paths.map((path) => String(path).trim()).filter(Boolean);
  }
  if (typeof paths === 'string' && paths.trim()) {
    return [paths.trim()];
  }
  return [];
}

function resolvePublishAction(payload: Record<string, unknown>): WorkflowBypassStudioAction {
  if (payload.isRequestPublish) {
    return 'request_publish';
  }
  return 'publish';
}

/** Headless guard: intercepts Studio publish/reject when content is in a workflow off-step. */
const WorkflowBypassGuard = () => {
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();

  const publishDialog = useSelector(
    (state: { dialogs?: { publish?: PublishDialogState } }) => state.dialogs?.publish
  );
  const rejectDialog = useSelector(
    (state: { dialogs?: { reject?: PublishDialogState } }) => state.dialogs?.reject
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [acknowledging, setAcknowledging] = useState(false);
  const [violations, setViolations] = useState<WorkflowBypassViolation[]>([]);
  const [allowUiBypass, setAllowUiBypass] = useState(false);
  const [studioAction, setStudioAction] = useState<WorkflowBypassStudioAction>('publish');

  const pendingStudioDialog = useRef<PendingStudioDialog | null>(null);
  const pendingBypassRecord = useRef<PendingBypassRecord | null>(null);
  const interceptingRef = useRef(false);
  const lastInterceptKey = useRef('');
  const publishWasSubmittingRef = useRef(false);
  const rejectWasSubmittingRef = useRef(false);
  const subscriptionsRef = useRef<Subscription[]>([]);

  const trackSubscription = useCallback((subscription: Subscription) => {
    subscriptionsRef.current.push(subscription);
    return subscription;
  }, []);

  useEffect(() => {
    return () => {
      subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
      subscriptionsRef.current = [];
    };
  }, []);

  const closeBypassDialog = useCallback(() => {
    setDialogOpen(false);
    setViolations([]);
    pendingStudioDialog.current = null;
  }, []);

  const recordCompletedBypass = useCallback(
    (action: WorkflowBypassStudioAction) => {
      const pending = pendingBypassRecord.current;
      if (!pending || !siteId || pending.action !== action) {
        return;
      }
      pendingBypassRecord.current = null;
      trackSubscription(
        recordWorkflowBypassAction(siteId, pending.action, pending.violations).subscribe({
          error(e) {
            console.error('[crafterwf] Failed to record workflow bypass action', e);
          }
        })
      );
    },
    [siteId, trackSubscription]
  );

  const resumeStudioDialog = useCallback(() => {
    const pending = pendingStudioDialog.current;
    if (!pending) {
      return;
    }
    const payload = {
      ...pending.payload,
      crafterwfBypassAcknowledged: true
    };
    if (pending.kind === 'publish') {
      dispatch(showPublishDialog(payload));
    } else {
      dispatch(showRejectDialog(payload));
    }
    pendingStudioDialog.current = null;
  }, [dispatch]);

  const interceptDialog = useCallback(
    (kind: 'publish' | 'reject', payload: Record<string, unknown>, action: WorkflowBypassStudioAction) => {
      if (!siteId || payload.crafterwfBypassAcknowledged) {
        return;
      }
      const paths = extractContentPaths(payload);
      if (!paths.length || interceptingRef.current) {
        return;
      }
      const interceptKey = `${kind}:${paths.join('|')}:${action}`;
      if (lastInterceptKey.current === interceptKey) {
        return;
      }

      interceptingRef.current = true;
      trackSubscription(
        checkWorkflowBypass(siteId, paths, action).subscribe({
          next(response) {
            interceptingRef.current = false;
            const result = response.response?.result;
            if (!result?.requiresAcknowledgement || !result.violations?.length) {
              lastInterceptKey.current = '';
              return;
            }
            lastInterceptKey.current = interceptKey;
            pendingStudioDialog.current = { kind, payload };
            setStudioAction(action);
            setAllowUiBypass(result.allowUiBypass === true);
            setViolations(result.violations);
            setDialogOpen(true);
            if (kind === 'publish') {
              dispatch(closePublishDialog());
            } else {
              dispatch(closeRejectDialog());
            }
          },
          error(e) {
            interceptingRef.current = false;
            console.error('[crafterwf] Workflow bypass check failed', e);
          }
        })
      );
    },
    [dispatch, siteId, trackSubscription]
  );

  useEffect(() => {
    if (!publishDialog?.open || publishDialog.crafterwfBypassAcknowledged) {
      if (!publishDialog?.open) {
        if (publishWasSubmittingRef.current) {
          recordCompletedBypass('publish');
          recordCompletedBypass('request_publish');
        } else {
          pendingBypassRecord.current = null;
        }
        publishWasSubmittingRef.current = false;
        lastInterceptKey.current = '';
      }
      return;
    }
    if (publishDialog.isSubmitting) {
      publishWasSubmittingRef.current = true;
    }
    interceptDialog('publish', publishDialog, resolvePublishAction(publishDialog));
  }, [publishDialog, interceptDialog, recordCompletedBypass]);

  useEffect(() => {
    if (!rejectDialog?.open || rejectDialog.crafterwfBypassAcknowledged) {
      if (!rejectDialog?.open) {
        if (rejectWasSubmittingRef.current) {
          recordCompletedBypass('reject');
        } else {
          pendingBypassRecord.current = null;
        }
        rejectWasSubmittingRef.current = false;
        lastInterceptKey.current = '';
      }
      return;
    }
    if (rejectDialog.isSubmitting) {
      rejectWasSubmittingRef.current = true;
    }
    interceptDialog('reject', rejectDialog, 'reject');
  }, [rejectDialog, interceptDialog, recordCompletedBypass]);

  const handleConfirm = () => {
    if (!allowUiBypass || !siteId || !violations.length) {
      return;
    }
    setAcknowledging(true);
    trackSubscription(
      acknowledgeWorkflowBypass(siteId, studioAction, violations).subscribe({
        next: () => {
          pendingBypassRecord.current = { action: studioAction, violations: [...violations] };
          setAcknowledging(false);
          setDialogOpen(false);
          resumeStudioDialog();
        },
        error(e) {
          console.error('[crafterwf] Failed to record workflow bypass acknowledgement', e);
          setAcknowledging(false);
        }
      })
    );
  };

  return (
    <WorkflowBypassDialog
      open={dialogOpen}
      action={studioAction}
      allowUiBypass={allowUiBypass}
      violations={violations}
      acknowledging={acknowledging}
      onCancel={closeBypassDialog}
      onConfirm={handleConfirm}
    />
  );
};

export default WorkflowBypassGuard;
