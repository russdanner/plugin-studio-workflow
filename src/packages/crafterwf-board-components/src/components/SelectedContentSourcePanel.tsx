import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Box, CircularProgress, Divider, Typography } from '@mui/material';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { fetchItemsByPath } from '@craftercms/studio-ui/services/content';

import AttachedContentItemRow from './AttachedContentItemRow';
import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
import { filterValidSandboxPaths } from '../utils/attachmentUtils';

export interface SelectedContentSourcePanelProps {
  selectedPaths: string[];
  onRemove(path: string): void;
}

const SelectedContentSourcePanel = ({ selectedPaths, onRemove }: SelectedContentSourcePanelProps) => {
  const siteId = useActiveSiteId();
  const [itemsByPath, setItemsByPath] = useState<Record<string, AttachedSandboxItem>>({});
  const [loading, setLoading] = useState(false);

  const pathsKey = useMemo(() => selectedPaths.slice().sort().join('\0'), [selectedPaths]);

  useEffect(() => {
    if (!siteId || selectedPaths.length === 0) {
      setItemsByPath({});
      setLoading(false);
      return;
    }

    const paths = filterValidSandboxPaths(selectedPaths);
    if (paths.length === 0) {
      setItemsByPath({});
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchItemsByPath(siteId, paths, { castAsDetailedItem: true }).subscribe({
      next(items) {
        const nextMap: Record<string, AttachedSandboxItem> = {};
        (items as AttachedSandboxItem[]).forEach((item) => {
          if (item?.path) {
            nextMap[item.path] = item;
          }
        });
        paths.forEach((path) => {
          if (!nextMap[path]) {
            nextMap[path] = { path } as AttachedSandboxItem;
          }
        });
        setItemsByPath(nextMap);
        setLoading(false);
      },
      error() {
        const fallback: Record<string, AttachedSandboxItem> = {};
        paths.forEach((path) => {
          fallback[path] = { path } as AttachedSandboxItem;
        });
        setItemsByPath(fallback);
        setLoading(false);
      }
    });
  }, [pathsKey, siteId, selectedPaths]);

  return (
    <Box
      sx={{
        width: { xs: '100%', md: 380 },
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        borderLeft: (theme) => ({ md: `1px solid ${theme.palette.divider}` }),
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ px: 2, py: 1.25, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Selected source
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {selectedPaths.length === 0
            ? 'Select content from search — use checkboxes to build your attach list'
            : `${selectedPaths.length} item${selectedPaths.length === 1 ? '' : 's'} selected — uncheck to remove`}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {loading && selectedPaths.length > 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : selectedPaths.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2 }}>
            No content selected yet.
          </Typography>
        ) : (
          selectedPaths.map((path, index) => (
            <React.Fragment key={path}>
              {index > 0 ? <Divider /> : null}
              <AttachedContentItemRow
                item={itemsByPath[path] ?? ({ path } as AttachedSandboxItem)}
                showSelectionCheckbox
                selectionChecked
                onSelectionChange={(checked) => {
                  if (!checked) {
                    onRemove(path);
                  }
                }}
                onRemove={() => onRemove(path)}
              />
            </React.Fragment>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SelectedContentSourcePanel;
