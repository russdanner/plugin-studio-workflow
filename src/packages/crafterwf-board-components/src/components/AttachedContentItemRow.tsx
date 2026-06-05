import * as React from 'react';
import { useDispatch } from 'react-redux';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import ItemTypeIcon from '@craftercms/studio-ui/components/ItemTypeIcon';
import ItemStateIcon from '@craftercms/studio-ui/components/ItemStateIcon';
import ItemPublishingTargetIcon from '@craftercms/studio-ui/components/ItemPublishingTargetIcon';

import useStudioItemPreview from '../hooks/useStudioItemPreview';
import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
import { getSandboxItemStateLabel } from '../utils/sandboxItemStateLabel';
import { isInWorkflow } from '../utils/sandboxItemStateUtils';
import {
  openStudioItemDependencies,
  openStudioItemHistory,
  resolveSandboxItemInternalName
} from '../utils/studioItemActions';

export interface AttachedContentItemRowProps {
  item: AttachedSandboxItem;
  onRemove?: () => void;
  showPath?: boolean;
}

const iconWrapSx = {
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  '& .MuiSvgIcon-root': { fontSize: '1.1rem' }
};

const AttachedContentItemRow = ({ item, onRemove, showPath = true }: AttachedContentItemRowProps) => {
  const dispatch = useDispatch();
  const { previewItem } = useStudioItemPreview();
  const internalName = resolveSandboxItemInternalName(item);
  const stateLabel = getSandboxItemStateLabel(item);
  const inWorkflow = isInWorkflow(item.stateMap) || item.systemType === 'folder';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        py: 0.75,
        px: 1,
        minWidth: 0
      }}
    >
      <Box sx={iconWrapSx}>
        <ItemTypeIcon item={item} fontSize="small" />
      </Box>

      <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={600} noWrap title={internalName}>
          {internalName}
        </Typography>

        {stateLabel ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
            <Box sx={iconWrapSx}>
              {inWorkflow ? (
                <ItemStateIcon item={item} fontSize="small" displayTooltip={false} />
              ) : (
                <ItemPublishingTargetIcon item={item} fontSize="small" displayTooltip={false} />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" noWrap title={stateLabel}>
              {stateLabel}
            </Typography>
          </Box>
        ) : null}

        {showPath && item.path ? (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
            title={item.path}
          >
            {item.path}
          </Typography>
        ) : null}
      </Stack>

      <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0, alignItems: 'center' }}>
        <Tooltip title="Preview">
          <IconButton size="small" aria-label="Preview item" onClick={() => previewItem(item)}>
            <VisibilityRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="History">
          <IconButton size="small" aria-label="View item history" onClick={() => openStudioItemHistory(dispatch, item)}>
            <HistoryRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Dependencies">
          <IconButton
            size="small"
            aria-label="View item dependencies"
            onClick={() => openStudioItemDependencies(dispatch, item)}
          >
            <AccountTreeOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {onRemove ? (
          <Tooltip title="Remove">
            <IconButton size="small" aria-label="Remove item" onClick={onRemove}>
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
    </Box>
  );
};

export default AttachedContentItemRow;
