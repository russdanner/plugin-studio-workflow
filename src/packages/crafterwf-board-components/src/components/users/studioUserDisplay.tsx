import * as React from 'react';

import { Avatar, MenuItem, Stack, Typography } from '@mui/material';

import { contrastTextColor, getInitials, toColor } from '../../utils/userAvatarUtils';

export interface TaskAssigneeOption {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  label: string;
}

export interface StudioUserLike {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
}

function studioAvatarInitials(user: StudioUserLike): string {
  if (user.firstName?.trim() && user.lastName?.trim()) {
    return getInitials({ firstName: user.firstName, lastName: user.lastName });
  }
  return getInitials(user.username);
}

function UserInitialsAvatar({
  user,
  size = 24
}: {
  user: StudioUserLike;
  size?: number;
}) {
  const backgroundColor = toColor(user.username);

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: Math.max(10, Math.round(size * 0.42)),
        bgcolor: backgroundColor,
        color: contrastTextColor(backgroundColor)
      }}
    >
      {studioAvatarInitials(user)}
    </Avatar>
  );
}

export function userLabel(user: StudioUserLike): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return name ? `${name} (${user.username})` : user.username;
}

/** First and last name only; falls back to username. */
export function userDisplayName(user: StudioUserLike): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return name || user.username;
}

export function findAssigneeOption(
  options: TaskAssigneeOption[],
  id: number,
  username?: string
): TaskAssigneeOption | undefined {
  return options.find((option) => option.id === id) ?? options.find((option) => option.username === username);
}

export function resolveAssigneeLabel(
  assigneeId: number,
  assigneeUsername: string | undefined,
  options: TaskAssigneeOption[]
): string {
  const option = findAssigneeOption(options, assigneeId, assigneeUsername);
  if (option) {
    return option.label;
  }
  return assigneeUsername || `User #${assigneeId}`;
}

export function UserAvatarLabel({
  user,
  label,
  size = 24,
  typographyVariant = 'body2',
  fontWeight
}: {
  user: StudioUserLike;
  label?: string;
  size?: number;
  typographyVariant?: 'body2' | 'caption' | 'subtitle2';
  fontWeight?: number | string;
}) {
  const display = label ?? userLabel(user);
  return (
    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0 }}>
      <UserInitialsAvatar user={user} size={size} />
      <Typography variant={typographyVariant} fontWeight={fontWeight} noWrap sx={{ minWidth: 0 }}>
        {display}
      </Typography>
    </Stack>
  );
}

export function AssigneeMenuItem({ option }: { option: TaskAssigneeOption }) {
  return (
    <MenuItem value={option.id}>
      <UserAvatarLabel user={option} label={option.label} size={22} typographyVariant="body2" />
    </MenuItem>
  );
}

export function UserAvatarFromUsername({
  username,
  label,
  size = 22
}: {
  username: string;
  label?: string;
  size?: number;
}) {
  return <UserAvatarLabel user={{ username }} label={label ?? username} size={size} typographyVariant="caption" />;
}
