import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Box, CircularProgress, Stack, Tooltip, Typography } from '@mui/material';
import { fetchRolesInSite } from '@craftercms/studio-ui/services/users';

import { MentionUserRef } from '../../utils/mentionUtils';
import { UserAvatarLabel, userDisplayName } from '../users/studioUserDisplay';

export interface MentionHighlightProps {
  username: string;
  user?: MentionUserRef;
  siteId?: string | null;
}

function MentionProfileTooltip({
  user,
  roles,
  loading
}: {
  user: MentionUserRef;
  roles: string[] | null;
  loading: boolean;
}) {
  const fullName = userDisplayName(user);

  return (
    <Stack spacing={0.75} sx={{ py: 0.25, minWidth: 180, maxWidth: 280 }}>
      <UserAvatarLabel user={user} label={fullName} size={36} typographyVariant="body2" fontWeight={600} />
      <Typography variant="caption" color="text.secondary">
        @{user.username}
      </Typography>
      {loading ? (
        <CircularProgress size={14} sx={{ alignSelf: 'flex-start' }} />
      ) : roles?.length ? (
        <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
          {roles.join(', ')}
        </Typography>
      ) : (
        <Typography variant="caption" color="text.secondary">
          No roles on this site
        </Typography>
      )}
    </Stack>
  );
}

export function MentionHighlight({ username, user, siteId }: MentionHighlightProps) {
  const [roles, setRoles] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const rolesSubscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  useEffect(() => {
    return () => {
      rolesSubscriptionRef.current?.unsubscribe();
    };
  }, []);

  const loadRoles = useCallback(() => {
    if (!siteId || !user || roles !== null || loading) {
      return;
    }
    setLoading(true);
    rolesSubscriptionRef.current?.unsubscribe();
    rolesSubscriptionRef.current = fetchRolesInSite(user.username, siteId).subscribe({
      next(nextRoles) {
        setRoles(nextRoles ?? []);
        setLoading(false);
      },
      error() {
        setRoles([]);
        setLoading(false);
      }
    });
  }, [loading, roles, siteId, user]);

  if (!user) {
    return <>@{username}</>;
  }

  const displayName = userDisplayName(user);

  return (
    <Tooltip
      arrow
      placement="top"
      onOpen={loadRoles}
      title={<MentionProfileTooltip user={user} roles={roles} loading={loading} />}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 3,
            border: 1,
            borderColor: 'divider',
            p: 1,
            maxWidth: 300
          }
        }
      }}
    >
      <Box
        component="span"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          cursor: 'default'
        }}
      >
        {displayName}
      </Box>
    </Tooltip>
  );
}

export default MentionHighlight;
