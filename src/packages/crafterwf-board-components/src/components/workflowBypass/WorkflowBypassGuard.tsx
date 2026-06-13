import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { Subscription } from 'rxjs';

import {
  closePublishDialog,
  closeRejectDialog,
  showPublishDialog,
  showRejectDialog
} from '@craftercms/studio-ui/state/actions/dialogs';

import {
  acknowledgeWorkflowBypass,
  checkWorkflowBypass,
  recordWorkflowBypassAction,
  WorkflowBypassCheckResult,
  WorkflowBypassStudioAction,
  WorkflowBypassViolation
} from '../../api/bypassApi';
import { filterValidSandboxPaths, isSandboxContentPath } from '../../utils/attachmentUtils';
import { getActiveSiteFromStore, getStudioStore } from '../../utils/studioReduxStore';
import WorkflowBypassDialog from './WorkflowBypassDialog';

type SandboxItem = {
  path?: string;
  id?: string | number;
  localId?: string;
  url?: string;
};

type PublishDialogState = {
  open?: boolean;
  isSubmitting?: boolean;
  items?: SandboxItem[];
  crafterwfBypassAcknowledged?: boolean;
  isRequestPublish?: boolean;
  [key: string]: unknown;
};

type StudioRootState = {
  dialogs?: {
    publish?: PublishDialogState;
    reject?: PublishDialogState;
  };
  preview?: {
    guest?: {
      path?: string;
    };
  };
  sites?: {
    active?: string;
  };
};

type PendingStudioDialog = {
  kind: 'publish' | 'reject';
  payload: Record<string, unknown>;
};

type PendingBypassRecord = {
  action: WorkflowBypassStudioAction;
  violations: WorkflowBypassViolation[];
};

function pickSandboxPath(value: unknown): string | null {
  if (typeof value !== 'string' || !isSandboxContentPath(value)) {
    return null;
  }
  return value.trim();
}

function extractContentPaths(payload: Record<string, unknown>, state?: StudioRootState): string[] {
  const items = payload.items as SandboxItem[] | undefined;
  const fromItems = (items ?? [])
    .map((item) => pickSandboxPath(item.path) ?? pickSandboxPath(item.localId))
    .filter((path): path is string => !!path);
  if (fromItems.length) {
    return filterValidSandboxPaths(fromItems);
  }
  const paths = payload.paths;
  if (Array.isArray(paths)) {
    return filterValidSandboxPaths(
      paths.map((path) => pickSandboxPath(path)).filter((path): path is string => !!path)
    );
  }
  if (typeof paths === 'string') {
    const path = pickSandboxPath(paths);
    return path ? [path] : [];
  }
  const singlePath = pickSandboxPath(payload.path) ?? pickSandboxPath(payload.contentPath);
  if (singlePath) {
    return [singlePath];
  }
  const previewPath = pickSandboxPath(state?.preview?.guest?.path);
  return previewPath ? [previewPath] : [];
}

function parseBypassCheckResult(response: unknown): WorkflowBypassCheckResult | null {
  const root = response as { response?: Record<string, unknown> } | null | undefined;
  const envelope = root?.response;
  if (!envelope || typeof envelope !== 'object') {
    return null;
  }
  const candidate = (envelope.result ?? envelope) as Record<string, unknown>;
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }
  if ('requiresAcknowledgement' in candidate || 'violations' in candidate) {
    return candidate as unknown as WorkflowBypassCheckResult;
  }
  return null;
}

function resolvePublishAction(payload: Record<string, unknown>): WorkflowBypassStudioAction {
  if (payload.isRequestPublish) {
    return 'request_publish';
  }
  const scheduling = payload.scheduling;
  if (scheduling === 'now' && payload.requestApproval) {
    return 'request_publish';
  }
  return 'publish';
}

function dialogFingerprint(kind: 'publish' | 'reject', payload: Record<string, unknown>): string {
  const items = payload.items as SandboxItem[] | undefined;
  const itemPaths = (items ?? []).map((item) => item.path || item.localId || item.id || '').join(',');
  return `${kind}:${itemPaths}:${String(payload.scheduling ?? '')}:${String(payload.isRequestPublish ?? '')}`;
}

/** Headless guard: intercepts Studio publish/reject when content is in a workflow off-step. */
const WorkflowBypassGuard = () => {
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [acknowledging, setAcknowledging] = useState(false);
  const [violations, setViolations] = useState<WorkflowBypassViolation[]>([]);
  const [allowUiBypass, setAllowUiBypass] = useState(false);
  const [studioAction, setStudioAction] = useState<WorkflowBypassStudioAction>('publish');

  const pendingStudioDialog = useRef<PendingStudioDialog | null>(null);
  const pendingBypassRecord = useRef<PendingBypassRecord | null>(null);
  const interceptingRef = useRef(false);
  const clearedWithoutViolationKeys = useRef<Set<string>>(new Set());
  const publishWasSubmittingRef = useRef(false);
  const rejectWasSubmittingRef = useRef(false);
  const handledPublishFingerprint = useRef<string | null>(null);
  const handledRejectFingerprint = useRef<string | null>(null);
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

  const restoreStudioDialog = useCallback(
    (pending: PendingStudioDialog) => {
      if (pending.kind === 'publish') {
        dispatch(showPublishDialog(pending.payload));
      } else {
        dispatch(showRejectDialog(pending.payload));
      }
    },
    [dispatch]
  );

  const closeBypassDialog = useCallback(() => {
    setDialogOpen(false);
    setChecking(false);
    setViolations([]);
    pendingStudioDialog.current = null;
    clearedWithoutViolationKeys.current.clear();
  }, []);

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

  const recordCompletedBypass = useCallback(
    (action: WorkflowBypassStudioAction, siteId: string) => {
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
    [trackSubscription]
  );

  const interceptDialog = useCallback(
    (
      kind: 'publish' | 'reject',
      payload: Record<string, unknown>,
      action: WorkflowBypassStudioAction,
      state: StudioRootState
    ) => {
      const siteId = getActiveSiteFromStore(state.sites?.active);
      if (!siteId || payload.crafterwfBypassAcknowledged || interceptingRef.current) {
        return;
      }
      const paths = extractContentPaths(payload, state);
      if (!paths.length) {
        return;
      }
      const interceptKey = `${kind}:${paths.join('|')}:${action}`;
      if (clearedWithoutViolationKeys.current.has(interceptKey)) {
        return;
      }

      interceptingRef.current = true;
      pendingStudioDialog.current = { kind, payload };
      if (kind === 'publish') {
        dispatch(closePublishDialog());
      } else {
        dispatch(closeRejectDialog());
      }

      setChecking(true);
      setDialogOpen(true);
      setViolations([]);

      trackSubscription(
        checkWorkflowBypass(siteId, paths, action).subscribe({
          next(response) {
            interceptingRef.current = false;
            setChecking(false);
            const result = parseBypassCheckResult(response);
            const pending = pendingStudioDialog.current;
            if (!result?.requiresAcknowledgement || !result.violations?.length) {
              setDialogOpen(false);
              clearedWithoutViolationKeys.current.add(interceptKey);
              pendingStudioDialog.current = null;
              if (pending) {
                restoreStudioDialog(pending);
              }
              return;
            }
            setStudioAction(action);
            setAllowUiBypass(result.allowUiBypass === true);
            setViolations(result.violations);
          },
          error(e) {
            interceptingRef.current = false;
            setChecking(false);
            setDialogOpen(false);
            console.error('[crafterwf] Workflow bypass check failed', e);
            const pending = pendingStudioDialog.current;
            pendingStudioDialog.current = null;
            if (pending) {
              restoreStudioDialog(pending);
            }
          }
        })
      );
    },
    [dispatch, restoreStudioDialog, trackSubscription]
  );

  useEffect(() => {
    const store = getStudioStore();
    if (!store) {
      return undefined;
    }

    const evaluateDialogs = () => {
      const state = store.getState() as StudioRootState;
      const publishDialog = state.dialogs?.publish;
      const rejectDialog = state.dialogs?.reject;

      if (!publishDialog?.open) {
        if (publishWasSubmittingRef.current) {
          const siteId = getActiveSiteFromStore(state.sites?.active);
          recordCompletedBypass('publish', siteId);
          recordCompletedBypass('request_publish', siteId);
        } else if (!interceptingRef.current && !dialogOpen) {
          pendingBypassRecord.current = null;
        }
        publishWasSubmittingRef.current = false;
        handledPublishFingerprint.current = null;
        if (!rejectDialog?.open) {
          clearedWithoutViolationKeys.current.clear();
        }
      } else if (publishDialog.crafterwfBypassAcknowledged) {
        handledPublishFingerprint.current = null;
      } else {
        if (publishDialog.isSubmitting) {
          publishWasSubmittingRef.current = true;
        }
        const fingerprint = dialogFingerprint('publish', publishDialog);
        if (handledPublishFingerprint.current !== fingerprint) {
          handledPublishFingerprint.current = fingerprint;
          interceptDialog('publish', publishDialog, resolvePublishAction(publishDialog), state);
        }
      }

      if (!rejectDialog?.open) {
        if (rejectWasSubmittingRef.current) {
          const siteId = getActiveSiteFromStore(state.sites?.active);
          recordCompletedBypass('reject', siteId);
        } else if (!interceptingRef.current && !dialogOpen) {
          pendingBypassRecord.current = null;
        }
        rejectWasSubmittingRef.current = false;
        handledRejectFingerprint.current = null;
        if (!publishDialog?.open) {
          clearedWithoutViolationKeys.current.clear();
        }
      } else if (rejectDialog.crafterwfBypassAcknowledged) {
        handledRejectFingerprint.current = null;
      } else {
        if (rejectDialog.isSubmitting) {
          rejectWasSubmittingRef.current = true;
        }
        const fingerprint = dialogFingerprint('reject', rejectDialog);
        if (handledRejectFingerprint.current !== fingerprint) {
          handledRejectFingerprint.current = fingerprint;
          interceptDialog('reject', rejectDialog, 'reject', state);
        }
      }
    };

    evaluateDialogs();
    return store.subscribe(evaluateDialogs);
  }, [dialogOpen, interceptDialog, recordCompletedBypass]);

  const handleConfirm = () => {
    const siteId = getActiveSiteFromStore();
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
      checking={checking}
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
