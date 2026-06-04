export function resolveAttachmentLabel(item: Record<string, unknown> | string): string {
  if (typeof item === 'string') {
    return resolveAttachmentLabel({ path: item });
  }
  const candidates = [item.label, item.internalName, item.name, item['internal-name']];
  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      if (trimmed && trimmed !== 'undefined' && trimmed !== 'null') {
        return trimmed;
      }
    }
  }

  const path = item.path ?? item.uri ?? item.url;
  if (typeof path === 'string' && path.trim()) {
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] || path;
  }

  return 'Attachment';
}

export function isStaticAssetPath(path: string | undefined | null): boolean {
  return !!path?.startsWith('/static-assets/');
}

export function isValidContentPath(path: string | undefined | null): boolean {
  if (!path || !path.trim()) {
    return false;
  }
  const trimmed = path.trim();
  return trimmed !== 'undefined' && trimmed !== 'null';
}

export function extractContentPathFromAttachmentUrl(url: string): string | null {
  if (!url) {
    return null;
  }
  if (url.startsWith('/static-assets/')) {
    return url;
  }

  let working = url;
  try {
    if (url.includes('%')) {
      working = decodeURIComponent(url);
    }
  } catch (_error) {
    working = url;
  }

  const contentIdMarker = 'contentId=';
  const markerIndex = working.indexOf(contentIdMarker);
  if (markerIndex < 0) {
    const encodedMarker = 'contentId%3D';
    const encodedIndex = url.indexOf(encodedMarker);
    if (encodedIndex < 0) {
      return null;
    }
    let path = url.substring(encodedIndex + encodedMarker.length);
    const amp = path.indexOf('%26');
    if (amp >= 0) {
      path = path.substring(0, amp);
    }
    try {
      path = decodeURIComponent(path);
    } catch (_error) {
      // keep raw path
    }
    return path && path !== 'undefined' ? path : null;
  }

  let path = working.substring(markerIndex + contentIdMarker.length);
  const amp = path.indexOf('&');
  if (amp >= 0) {
    path = path.substring(0, amp);
  }
  try {
    path = decodeURIComponent(path);
  } catch (_error) {
    // keep raw path
  }
  return path && path !== 'undefined' ? path : null;
}

/** Returns the URL/path to use for display, preview, and linking. */
export function resolveAttachmentUrl(attachment: { url?: string }): string {
  const extracted = extractContentPathFromAttachmentUrl(attachment.url || '');
  if (extracted && isStaticAssetPath(extracted)) {
    return extracted;
  }
  if (extracted && isValidContentPath(extracted)) {
    return extracted;
  }
  return attachment.url || '#';
}

export function resolveAttachmentDisplayName(attachment: { name?: string; url?: string }): string {
  const name = attachment.name?.trim();
  if (name && name !== 'undefined' && name !== 'null') {
    return name;
  }

  const path = extractContentPathFromAttachmentUrl(attachment.url || '');
  if (path) {
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] || path;
  }

  return attachment.url || 'Attachment';
}

export function resolveAttachmentLinkUrl(attachment: { url?: string }): string {
  return resolveAttachmentUrl(attachment);
}
