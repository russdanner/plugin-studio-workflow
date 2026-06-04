import * as React from 'react';

import { Box, Typography } from '@mui/material';
import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
import ItemTypeIcon from '@craftercms/studio-ui/components/ItemTypeIcon';
import ItemStateIcon from '@craftercms/studio-ui/components/ItemStateIcon';
import ItemPublishingTargetIcon from '@craftercms/studio-ui/components/ItemPublishingTargetIcon';
import { getSandboxItemStateLabel } from '../utils/sandboxItemStateLabel';
import { isInWorkflow } from '../utils/sandboxItemStateUtils';

export interface AttachedSandboxItemDisplayProps {
  item: AttachedSandboxItem;
  label: string;
  onClick?: () => void;
}

const rowSx = { display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 };
const iconWrapSx = { display: 'inline-flex', alignItems: 'center', flexShrink: 0, '& .MuiSvgIcon-root': { fontSize: '1.1rem' } };

const AttachedSandboxItemDisplay = ({ item, label, onClick }: AttachedSandboxItemDisplayProps) => {
  const inWorkflow = isInWorkflow(item.stateMap) || item.systemType === 'folder';
  const stateLabel = getSandboxItemStateLabel(item);

  return (
    <Box sx={{ minWidth: 0, py: 0.25 }}>
      <Box sx={rowSx}>
        <Box sx={iconWrapSx}>
          <ItemTypeIcon item={item} fontSize="small" />
        </Box>
        <Typography
          variant="body2"
          noWrap
          onClick={onClick}
          sx={(theme) => ({
            minWidth: 0,
            flex: 1,
            cursor: onClick ? 'pointer' : 'default',
            color: onClick
              ? theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main
              : 'text.primary',
            '&:hover': onClick ? { textDecoration: 'underline' } : undefined
          })}
        >
          {label}
        </Typography>
      </Box>
      {stateLabel ? (
        <Box sx={{ ...rowSx, pl: 0.25, mt: 0.25 }}>
          <Box sx={iconWrapSx}>
            {inWorkflow ? (
              <ItemStateIcon item={item} fontSize="small" displayTooltip={false} />
            ) : (
              <ItemPublishingTargetIcon item={item} fontSize="small" displayTooltip={false} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ minWidth: 0, flex: 1 }}>
            {stateLabel}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default AttachedSandboxItemDisplay;
