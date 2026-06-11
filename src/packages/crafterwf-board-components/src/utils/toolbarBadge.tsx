import * as React from 'react';

import { Badge, BadgeProps } from '@mui/material';

/** Shared toolbar badge styling (compact numeric badge). */
export const TOOLBAR_BADGE_SX = {
  '& .MuiBadge-badge': {
    fontSize: '0.65rem',
    fontWeight: 600,
    minWidth: 16,
    height: 16,
    padding: '0 4px',
    boxShadow: '0 0 0 2px var(--mui-palette-background-paper, #fff)'
  }
} as const;

const TOOLBAR_DOT_BADGE_SX = {
  '& .MuiBadge-badge': {
    minWidth: 8,
    width: 8,
    height: 8,
    padding: 0,
    fontSize: 0,
    lineHeight: 0,
    boxShadow: '0 0 0 2px var(--mui-palette-background-paper, #fff)'
  }
} as const;

export interface ToolbarIconBadgeProps extends Omit<BadgeProps, 'variant' | 'badgeContent'> {
  /** Activity that warrants a dot (open, unread, packages on page, etc.). */
  count?: number;
  /** When &gt; 0, shows a numeric badge with this value (overdue, @mentions, etc.). */
  overdueCount?: number;
}

function mergeDotBadgeSx(sx?: BadgeProps['sx']): BadgeProps['sx'] {
  const extra = sx as { '& .MuiBadge-badge'?: Record<string, unknown> } | undefined;
  return {
    ...sx,
    ...TOOLBAR_DOT_BADGE_SX,
    '& .MuiBadge-badge': {
      ...(extra?.['& .MuiBadge-badge'] ?? {}),
      ...TOOLBAR_DOT_BADGE_SX['& .MuiBadge-badge']
    }
  };
}

/**
 * Toolbar badge: dot when there is activity; numeric count only when overdueCount &gt; 0.
 */
export function ToolbarIconBadge({
  count = 0,
  overdueCount = 0,
  color = 'error',
  max = 99,
  sx,
  children,
  ...rest
}: ToolbarIconBadgeProps) {
  const hasNumeric = overdueCount > 0;
  const hasActivity = count > 0;

  if (!hasNumeric && !hasActivity) {
    return <>{children}</>;
  }

  if (hasNumeric) {
    return (
      <Badge
        badgeContent={overdueCount}
        color={color}
        max={max}
        overlap="circular"
        sx={{ ...TOOLBAR_BADGE_SX, ...sx }}
        {...rest}
      >
        {children}
      </Badge>
    );
  }

  return (
    <Badge variant="dot" color={color} overlap="circular" sx={mergeDotBadgeSx(sx)} {...rest}>
      {children}
    </Badge>
  );
}
