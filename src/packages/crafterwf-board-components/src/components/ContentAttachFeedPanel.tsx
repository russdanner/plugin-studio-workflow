import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { fetchItemsByPath } from '@craftercms/studio-ui/services/content';

import AttachedContentItemRow from './AttachedContentItemRow';
import type { AttachedSandboxItem } from '../types/CardDetailsRecord';
import { ContentAttachFeedEntry } from '../utils/contentAttachFeeds';

export interface ContentAttachFeedPanelProps {
  title: string;
  description: string;
  entries: ContentAttachFeedEntry[];
  loading: boolean;
  error?: string | null;
  selectedPaths: string[];
  onToggle(path: string, selected: boolean): void;
  onRefresh?(): void;
}

const ContentAttachFeedPanel = ({
  title,
  description,
  entries,
  loading,
  error,
  selectedPaths,
  onToggle,
  onRefresh
}: ContentAttachFeedPanelProps) => {
  const siteId = useActiveSiteId();
  const [itemsByPath, setItemsByPath] = useState<Record<string, AttachedSandboxItem>>({});

  const pathsKey = useMemo(() => entries.map((entry) => entry.path).join('\0'), [entries]);

  useEffect(() => {
    if (!siteId || entries.length === 0) {
      setItemsByPath({});
      return;
    }

    const paths = entries.map((entry) => entry.path);
    fetchItemsByPath(siteId, paths, { castAsDetailedItem: true }).subscribe({
      next(items) {
        const nextMap: Record<string, AttachedSandboxItem> = {};
        (items as AttachedSandboxItem[]).forEach((item) => {
          if (item?.path) {
            nextMap[item.path] = item;
          }
        });
        entries.forEach((entry) => {
          if (!nextMap[entry.path]) {
            nextMap[entry.path] = { path: entry.path, label: entry.label ?? undefined } as AttachedSandboxItem;
          }
        });
        setItemsByPath(nextMap);
      },
      error() {
        const fallback: Record<string, AttachedSandboxItem> = {};
        entries.forEach((entry) => {
          fallback[entry.path] = { path: entry.path, label: entry.label ?? undefined } as AttachedSandboxItem;
        });
        setItemsByPath(fallback);
      }
    });
  }, [pathsKey, siteId]);

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.25, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Box sx={{ minWidth: 0, pr: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {onRefresh ? (
          <Tooltip title="Refresh">
            <span>
              <IconButton size="small" aria-label="Refresh feed" onClick={onRefresh} disabled={loading}>
                <RefreshRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        ) : null}
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ px: 2, py: 2 }}>
            {error}
          </Typography>
        ) : entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2 }}>
            Nothing to show in this feed right now.
          </Typography>
        ) : (
          entries.map((entry, index) => {
            const selected = selectedPaths.includes(entry.path);
            return (
              <React.Fragment key={entry.path}>
                {index > 0 ? <Divider /> : null}
                <Box sx={{ px: 0.5 }}>
                  <AttachedContentItemRow
                    item={itemsByPath[entry.path] ?? ({ path: entry.path } as AttachedSandboxItem)}
                    showSelectionCheckbox
                    selectionChecked={selected}
                    onSelectionChange={(checked) => onToggle(entry.path, checked)}
                    showPath={false}
                  />
                  {entry.subtitle ? (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', pl: 5.5, pb: 0.75 }}>
                      {entry.subtitle}
                    </Typography>
                  ) : null}
                </Box>
              </React.Fragment>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default ContentAttachFeedPanel;
