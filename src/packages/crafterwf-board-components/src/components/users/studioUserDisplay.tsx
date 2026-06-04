import * as React from 'react';

import { Avatar, MenuItem, Stack, Typography } from '@mui/material';

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

function userInitials(user: StudioUserLike): string {
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();
  if (first && last) {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  }
  if (first) {
    return first.slice(0, 2).toUpperCase();
  }
  const username = user.username?.trim();
  return username ? username.slice(0, 2).toUpperCase() : '?';
}

function UserInitialsAvatar({
  user,
  size = 24
}: {
  user: StudioUserLike;
  size?: number;
}) {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: Math.max(10, Math.round(size * 0.42))
      }}
    >
      {userInitials(user)}
    </Avatar>
  );
}

export function userLabel(user: StudioUserLike): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return name ? `${name} (${user.username})` : user.username;
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
