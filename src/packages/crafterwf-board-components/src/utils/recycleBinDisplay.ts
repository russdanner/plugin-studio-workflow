const SANDBOX_STATE_LABELS: Record<string, string> = {
  new: 'New',
  modified: 'Modified',
  deleted: 'Deleted',
  locked: 'Locked',
  systemProcessing: 'System processing',
  submitted: 'Submitted',
  scheduled: 'Scheduled',
  publishing: 'Publishing',
  submittedToStaging: 'Submitted to staging',
  submittedToLive: 'Submitted to live',
  disabled: 'Disabled',
  staged: 'Staged',
  live: 'Live',
  unpublished: 'Unpublished'
};

export function formatRecycleBinDate(value?: string | null): string {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function formatRecycleBinUserDate(username?: string | null, date?: string | null): string {
  const who = username?.trim() || '—';
  const when = formatRecycleBinDate(date);
  return `${who} · ${when}`;
}

export function formatSandboxStateLabel(state?: string | null): string {
  if (!state?.trim()) {
    return '—';
  }
  return SANDBOX_STATE_LABELS[state] ?? state;
}

export function displayRecycleBinName(item: {
  internalName?: string | null;
  originalPath: string;
}): string {
  return item.internalName?.trim() || item.originalPath.split('/').filter(Boolean).pop() || item.originalPath;
}
