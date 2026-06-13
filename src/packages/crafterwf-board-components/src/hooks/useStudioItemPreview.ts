import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { useEnv } from '@craftercms/studio-ui/hooks/useEnv';
import { fetchSandboxItem } from '@craftercms/studio-ui/services/content';

import { isValidContentPath } from '../utils/attachmentUtils';
import { openContentInInspectMode, previewStudioItem, StudioPreviewItem } from '../utils/studioItemPreview';

export function useStudioItemPreview() {
  const dispatch = useDispatch();
  const site = useActiveSiteId();
  const { authoringBase, guestBase } = useEnv();

  const previewItem = useCallback(
    (item: StudioPreviewItem) => {
      if (!item?.path || !site) {
        return;
      }
      previewStudioItem(item, { dispatch, site, authoringBase, guestBase });
    },
    [authoringBase, dispatch, guestBase, site]
  );

  const previewPath = useCallback(
    (path: string, label?: string) => {
      if (!isValidContentPath(path) || !site) {
        return;
      }
      fetchSandboxItem(site, path, { castAsDetailedItem: true }).subscribe({
        next(sandboxItem) {
          previewStudioItem(sandboxItem as StudioPreviewItem, { dispatch, site, authoringBase, guestBase });
        },
        error() {
          previewStudioItem({ path, label: label || path }, { dispatch, site, authoringBase, guestBase });
        }
      });
    },
    [authoringBase, dispatch, guestBase, site]
  );

  const inspectPath = useCallback(
    (path: string, label?: string) => {
      if (!isValidContentPath(path) || !site) {
        return;
      }
      fetchSandboxItem(site, path, { castAsDetailedItem: true }).subscribe({
        next(sandboxItem) {
          openContentInInspectMode(sandboxItem as StudioPreviewItem, { dispatch, site, authoringBase, guestBase });
        },
        error() {
          openContentInInspectMode({ path, label: label || path }, { dispatch, site, authoringBase, guestBase });
        }
      });
    },
    [authoringBase, dispatch, guestBase, site]
  );

  const inspectItem = useCallback(
    (item: StudioPreviewItem) => {
      if (!item?.path || !site) {
        return;
      }
      openContentInInspectMode(item, { dispatch, site, authoringBase, guestBase });
    },
    [authoringBase, dispatch, guestBase, site]
  );

  return { previewItem, previewPath, inspectPath, inspectItem };
}

export default useStudioItemPreview;
