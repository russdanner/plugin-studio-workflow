/** Human-readable label for a Crafter content type path (e.g. /page/article → Article). */
export function formatContentTypeLabel(contentTypeId: string): string {
  const parts = contentTypeId.split('/').filter(Boolean);
  if (parts.length === 0) {
    return contentTypeId;
  }
  const namePart = parts[parts.length - 1].replace(/[-_]/g, ' ');
  const label = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  if (parts.length > 1) {
    const category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return `${label} (${category})`;
  }
  return label;
}
