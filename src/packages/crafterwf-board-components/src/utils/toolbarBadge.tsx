import * as React from 'react';

import { Badge, BadgeProps } from '@mui/material';

export const TOOLBAR_BADGE_SX = {
  '& .MuiBadge-badge': {
    fontSize: '0.65rem',
    fontWeight: 600,
    minWidth: 16,
    height: 16,
    padding: '0 4px'
  }
} as const;

export interface ToolbarIconBadgeProps extends BadgeProps {
  count?: number;
}

export function ToolbarIconBadge({
  count = 0,
  color = 'error',
  max = 99,
  sx,
  children,
  ...rest
}: ToolbarIconBadgeProps) {
  if (count <= 0) {
    return <>{children}</>;
  }

  return (
    <Badge badgeContent={count} color={color} max={max} overlap="circular" sx={{ ...TOOLBAR_BADGE_SX, ...sx }} {...rest}>
      {children}
    </Badge>
  );
}
