import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs
} from '@mui/material';

import Search from '@craftercms/studio-ui/components/Search';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import ContentAttachFeedPanel from '../ContentAttachFeedPanel';
import SelectedContentSourcePanel from '../SelectedContentSourcePanel';
import {
  ContentAttachFeedEntry,
  ContentAttachFeedId,
  excludeAttachedPaths,
  loadMyRecentActivityFeed,
  loadUnpublishedWorkFeed
} from '../../utils/contentAttachFeeds';

export interface RecycleBinSelectDialogProps {
  open: boolean;
  onClose(): void;
  onConfirm(paths: string[]): void;
  /** Paths already in recycle bin — hidden from feeds. */
  excludedPaths?: string[];
}

const EMPTY_EXCLUDED: string[] = [];

const RecycleBinSelectDialog = ({
  open,
  onClose,
  onConfirm,
  excludedPaths = EMPTY_EXCLUDED
}: RecycleBinSelectDialogProps) => {
  const siteId = useActiveSiteId();
  const excludedRef = useRef(excludedPaths);
  excludedRef.current = excludedPaths;
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<ContentAttachFeedId>('recent');

  const [recentEntries, setRecentEntries] = useState<ContentAttachFeedEntry[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState<string | null>(null);

  const [unpublishedEntries, setUnpublishedEntries] = useState<ContentAttachFeedEntry[]>([]);
  const [unpublishedLoading, setUnpublishedLoading] = useState(false);
  const [unpublishedError, setUnpublishedError] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setSelectedPaths([]);
    setActiveTab('recent');
    onClose();
  }, [onClose]);

  const handleSelect = useCallback((path: string, isSelected: boolean) => {
    setSelectedPaths((current) => {
      if (isSelected) {
        return current.includes(path) ? current : [...current, path];
      }
      return current.filter((entry) => entry !== path);
    });
  }, []);

  const handleToggleFeed = useCallback(
    (path: string, selected: boolean) => {
      handleSelect(path, selected);
    },
    [handleSelect]
  );

  const handleRemove = useCallback((path: string) => {
    setSelectedPaths((current) => current.filter((entry) => entry !== path));
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedPaths.length === 0) {
      return;
    }
    onConfirm(selectedPaths);
    setSelectedPaths([]);
  }, [onConfirm, selectedPaths]);

  const loadRecentFeed = useCallback(() => {
    if (!siteId) {
      setRecentEntries([]);
      return undefined;
    }
    setRecentLoading(true);
    setRecentError(null);
    return loadMyRecentActivityFeed(siteId).subscribe({
      next(entries) {
        setRecentEntries(excludeAttachedPaths(entries, excludedRef.current));
        setRecentLoading(false);
      },
      error() {
        setRecentError('Unable to load your recent activity.');
        setRecentEntries([]);
        setRecentLoading(false);
      }
    });
  }, [siteId]);

  const loadUnpublishedFeed = useCallback(() => {
    if (!siteId) {
      setUnpublishedEntries([]);
      return undefined;
    }
    setUnpublishedLoading(true);
    setUnpublishedError(null);
    return loadUnpublishedWorkFeed(siteId).subscribe({
      next(entries) {
        setUnpublishedEntries(excludeAttachedPaths(entries, excludedRef.current));
        setUnpublishedLoading(false);
      },
      error() {
        setUnpublishedError('Unable to load unpublished work.');
        setUnpublishedEntries([]);
        setUnpublishedLoading(false);
      }
    });
  }, [siteId]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (activeTab === 'recent') {
      const subscription = loadRecentFeed();
      return () => subscription?.unsubscribe();
    }
    if (activeTab === 'unpublished') {
      const subscription = loadUnpublishedFeed();
      return () => subscription?.unsubscribe();
    }
    return undefined;
  }, [activeTab, loadRecentFeed, loadUnpublishedFeed, open]);

  const isSearchTab = activeTab === 'search';

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" scroll="paper">
      <DialogTitle>Select items to put in recycle bin</DialogTitle>
      <DialogContent dividers sx={{ p: 0, display: 'flex', flexDirection: 'column', minHeight: 420 }}>
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              borderRight: (theme) => ({ md: `1px solid ${theme.palette.divider}` })
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, value: ContentAttachFeedId) => setActiveTab(value)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}`, flexShrink: 0 }}
            >
              <Tab value="recent" label="My recent activity" />
              <Tab value="unpublished" label="Unpublished work" />
              <Tab value="search" label="Search" />
            </Tabs>

            <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {open && activeTab === 'search' ? (
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 0,
                    minWidth: 0,
                    width: '100%',
                    overflow: 'hidden',
                    '& > section': { width: '100%', height: '100%', minHeight: 0, minWidth: 0 },
                    '& > section > section:last-of-type': { display: 'none' }
                  }}
                >
                  <Search embedded mode="select" onClose={handleClose} onSelect={handleSelect} />
                </Box>
              ) : null}

              {activeTab === 'recent' ? (
                <ContentAttachFeedPanel
                  title="My recent activity"
                  description="Select sandbox items to move to the recycle bin"
                  entries={recentEntries}
                  loading={recentLoading}
                  error={recentError}
                  selectedPaths={selectedPaths}
                  onToggle={handleToggleFeed}
                  onRefresh={loadRecentFeed}
                />
              ) : null}

              {activeTab === 'unpublished' ? (
                <ContentAttachFeedPanel
                  title="Unpublished work"
                  description="Select unpublished items to move to the recycle bin"
                  entries={unpublishedEntries}
                  loading={unpublishedLoading}
                  error={unpublishedError}
                  selectedPaths={selectedPaths}
                  onToggle={handleToggleFeed}
                  onRefresh={loadUnpublishedFeed}
                />
              ) : null}
            </Box>
          </Box>
          {!isSearchTab ? (
            <SelectedContentSourcePanel selectedPaths={selectedPaths} onRemove={handleRemove} />
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1.5 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={selectedPaths.length === 0}>
          Move to recycle bin ({selectedPaths.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecycleBinSelectDialog;
