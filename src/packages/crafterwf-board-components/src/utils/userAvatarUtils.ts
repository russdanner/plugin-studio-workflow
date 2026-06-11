/** Matches @craftercms/studio-ui/utils/string (PersonAvatar / dashboard dashlets). */

export function getInitials(value: string): string;
export function getInitials(person: { firstName: string; lastName: string }): string;
export function getInitials(
  value: string | { firstName: string; lastName: string }
): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }
  const first = value.firstName?.charAt(0) || '';
  const last = value.lastName?.charAt(0) || '';
  return `${first}${last}`.toUpperCase();
}

export function toColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

/** Simple light/dark text pick for avatar backgrounds (matches dashboard intent). */
export function contrastTextColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) {
    return '#ffffff';
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#ffffff';
}
