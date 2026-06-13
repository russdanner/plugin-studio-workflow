import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { filter } from 'rxjs/operators';
import { contentEvent } from '@craftercms/studio-ui/state/actions/system';
import { getHostToHostBus } from '@craftercms/studio-ui/utils/subjects';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { processWorkflowContentEvent } from '../../api/contentEventApi';
import { resolveBridgeEventType } from '../../utils/contentEventUtils';

const PREVIEW_PATH = '/studio/preview';
const DEDUPE_MS = 3000;

function isPreviewStudioShell(): boolean {
  return typeof window !== 'undefined' && window.location.pathname.startsWith(PREVIEW_PATH);
}

function dedupeKey(siteId: string, eventType: string, contentPath: string): string {
  return `${siteId}|${eventType}|${contentPath}`;
}

/**
 * Preview / in-context saves use Studio's preview content pipeline, which does not run
 * content-type controller.groovy lifecycle scripts. Bridge those saves to the plugin
 * content-event REST endpoint so workflow listeners still run.
 */
export function WorkflowContentEventBridge() {
  const siteId = useActiveSiteId();
  const username = useSelector((state: { user?: { username?: string } }) => state.user?.username ?? '');
  const itemsByPath = useSelector(
    (state: { content?: { itemsByPath?: Record<string, { contentTypeId?: string }> } }) =>
      state.content?.itemsByPath ?? {}
  );
  const itemsByPathRef = useRef(itemsByPath);
  itemsByPathRef.current = itemsByPath;
  const recentKeysRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!siteId || !username || !isPreviewStudioShell()) {
      return undefined;
    }

    const subscription = getHostToHostBus()
      .pipe(filter((event) => event.type === contentEvent.type))
      .subscribe(({ payload }) => {
        const targetPath = typeof payload?.targetPath === 'string' ? payload.targetPath.trim() : '';
        const eventSiteId = typeof payload?.siteId === 'string' ? payload.siteId.trim() : siteId;
        const eventUsername = payload?.user?.username?.trim() ?? '';

        if (!targetPath || eventSiteId !== siteId || eventUsername !== username) {
          return;
        }
        if (!targetPath.endsWith('.xml') && !targetPath.endsWith('.html')) {
          return;
        }

        const eventType = resolveBridgeEventType(payload ?? {});
        const key = dedupeKey(siteId, eventType, targetPath);
        const now = Date.now();
        const last = recentKeysRef.current.get(key) ?? 0;
        if (now - last < DEDUPE_MS) {
          return;
        }
        recentKeysRef.current.set(key, now);

        const contentType = itemsByPathRef.current[targetPath]?.contentTypeId?.trim();
        processWorkflowContentEvent(siteId, eventType, targetPath, contentType).subscribe({
          error(err: unknown) {
            // eslint-disable-next-line no-console
            console.warn('[crafterwf] Preview content-event bridge failed', targetPath, err);
          }
        });
      });

    return () => subscription.unsubscribe();
  }, [siteId, username]);

  return null;
}

export default WorkflowContentEventBridge;
