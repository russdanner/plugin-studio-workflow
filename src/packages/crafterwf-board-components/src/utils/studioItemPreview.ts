import type { Dispatch } from 'redux';

import { showEditDialog, showPreviewDialog, updatePreviewDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { fetchGuestModel, setPreviewEditMode } from '@craftercms/studio-ui/state/actions/preview';
import { fetchContentXML } from '@craftercms/studio-ui/services/content';
import { getPreviewURLFromPath } from '@craftercms/studio-ui/utils/path';

export interface StudioPreviewItem {
  path: string;
  label?: string;
  name?: string;
  type?: string;
  systemType?: string;
  mimeType?: string;
}

export interface StudioPreviewContext {
  dispatch: Dispatch;
  site: string;
  authoringBase: string;
  guestBase: string;
}

function resolvePreviewType(item: StudioPreviewItem): string {
  if (item.type) {
    return item.type;
  }

  const mimeType = item.mimeType || '';
  if (mimeType.includes('audio/')) {
    return 'Audio';
  }
  if (mimeType.startsWith('image/')) {
    return 'Image';
  }
  if (mimeType.startsWith('video/')) {
    return 'Video';
  }
  if (mimeType === 'application/pdf') {
    return 'Pdf';
  }

  switch (item.systemType) {
    case 'page':
      return 'Page';
    case 'component':
    case 'taxonomy':
      return 'Component';
    case 'renderingTemplate':
      return 'Template';
    case 'script':
      return 'Groovy';
    default:
      return 'File';
  }
}

function resolveEditorMode(item: StudioPreviewItem): string {
  if (item.systemType === 'renderingTemplate') {
    return 'ftl';
  }
  if (item.systemType === 'script') {
    return 'groovy';
  }

  switch (item.mimeType) {
    case 'text/x-freemarker':
      return 'ftl';
    case 'text/x-groovy':
      return 'groovy';
    case 'application/javascript':
      return 'javascript';
    case 'text/css':
      return 'css';
    default:
      return 'txt';
  }
}

/**
 * Opens content in Studio preview with edit mode off (inspect / browse).
 */
export function openContentInInspectMode(item: StudioPreviewItem, context: StudioPreviewContext): void {
  const { dispatch } = context;
  const path = item.path;
  if (!path) {
    return;
  }

  dispatch(setPreviewEditMode({ editMode: false }));
  dispatch(fetchGuestModel({ path }));
}

/**
 * Opens the same preview dialog used by Studio Search (showPreviewDialog / showEditDialog).
 */
export function previewStudioItem(item: StudioPreviewItem, context: StudioPreviewContext): void {
  const { dispatch, site, authoringBase, guestBase } = context;
  const path = item.path;
  const title = item.label || item.name || path;
  let type = resolvePreviewType(item);

  if (item.mimeType?.includes('audio/')) {
    type = 'Audio';
  }

  switch (type) {
    case 'Image':
      dispatch(
        showPreviewDialog({
          type: 'image',
          title,
          url: path
        })
      );
      break;
    case 'Page':
      dispatch(
        showPreviewDialog({
          type: 'page',
          title,
          url: `${guestBase}${getPreviewURLFromPath(path)}?crafterCMSGuestDisabled=true`
        })
      );
      break;
    case 'Component':
    case 'Taxonomy':
      dispatch(showEditDialog({ site, path, authoringBase, readonly: true }));
      break;
    case 'Video':
      dispatch(
        showPreviewDialog({
          type: 'video',
          title,
          url: path
        })
      );
      break;
    case 'Audio':
      dispatch(
        showPreviewDialog({
          type: 'audio',
          title,
          url: path,
          mimeType: item.mimeType
        })
      );
      break;
    case 'Pdf':
      dispatch(
        showPreviewDialog({
          type: 'pdf',
          title,
          url: path
        })
      );
      break;
    default: {
      let mode = 'txt';
      if (type === 'Template') {
        mode = 'ftl';
      } else if (type === 'Groovy') {
        mode = 'groovy';
      } else if (type === 'JavaScript') {
        mode = 'javascript';
      } else if (type === 'CSS') {
        mode = 'css';
      } else {
        mode = resolveEditorMode(item);
      }

      dispatch(
        showPreviewDialog({
          type: 'editor',
          title,
          url: path,
          path,
          mode
        })
      );
      fetchContentXML(site, path).subscribe({
        next: (content) => {
          dispatch(
            updatePreviewDialog({
              content
            })
          );
        },
        error: (err) => {
          console.error('Failed to fetch content for preview:', err);
          dispatch(
            updatePreviewDialog({
              content: `// Error loading content: ${(err as Error)?.message || 'Unknown error'}`
            })
          );
        }
      });
      break;
    }
  }
}
