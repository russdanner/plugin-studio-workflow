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

import ContentAttachFeedPanel from './ContentAttachFeedPanel';
import SelectedContentSourcePanel from './SelectedContentSourcePanel';
import {
  ContentAttachFeedEntry,
  ContentAttachFeedId,
  excludeAttachedPaths,
  loadMyRecentActivityFeed,
  loadUnpublishedWorkFeed
} from '../utils/contentAttachFeeds';

export interface ContentSearchAttachDialogProps {
  open: boolean;
  onClose(): void;
  onAttach(paths: string[]): void;
  /** Paths already on the package — hidden from feeds. */
  attachedPaths?: string[];
}

const EMPTY_ATTACHED_PATHS: string[] = [];

function attachedPathsKey(paths: string[]): string {
  return paths.slice().sort().join('\0');
}

const ContentSearchAttachDialog = ({
  open,
  onClose,
  onAttach,
  attachedPaths = EMPTY_ATTACHED_PATHS
}: ContentSearchAttachDialogProps) => {
  const siteId = useActiveSiteId();
  const attachedPathsRef = useRef(attachedPaths);
  attachedPathsRef.current = attachedPaths;
  const stableAttachedPathsKey = attachedPathsKey(attachedPaths);
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

  const handleToggleFeed = useCallback((path: string, selected: boolean) => {
    handleSelect(path, selected);
  }, [handleSelect]);

  const handleRemove = useCallback((path: string) => {
    setSelectedPaths((current) => current.filter((entry) => entry !== path));
  }, []);

  const handleAttach = useCallback(() => {
    if (selectedPaths.length === 0) {
      return;
    }
    onAttach(selectedPaths);
    setSelectedPaths([]);
  }, [onAttach, selectedPaths]);

  const loadRecentFeed = useCallback(() => {
    if (!siteId) {
      setRecentEntries([]);
      return undefined;
    }
    setRecentLoading(true);
    setRecentError(null);
    return loadMyRecentActivityFeed(siteId).subscribe({
      next(entries) {
        setRecentEntries(excludeAttachedPaths(entries, attachedPathsRef.current));
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
        setUnpublishedEntries(excludeAttachedPaths(entries, attachedPathsRef.current));
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
  }, [activeTab, loadRecentFeed, loadUnpublishedFeed, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setRecentEntries((current) => excludeAttachedPaths(current, attachedPathsRef.current));
    setUnpublishedEntries((current) => excludeAttachedPaths(current, attachedPathsRef.current));
  }, [stableAttachedPathsKey, open]);

  const isSearchTab = activeTab === 'search';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      scroll="paper"
      disableRestoreFocus
      aria-labelledby="crafterwf-content-search-title"
      PaperProps={{
        sx: (theme) => ({
          width: 'min(96vw, 1280px)',
          maxWidth: `min(${theme.breakpoints.values.lg}px, calc(100vw - ${theme.spacing(4)}))`,
          height: 'min(92vh, 960px)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        })
      }}
    >
      <DialogTitle id="crafterwf-content-search-title" sx={{ pb: 0 }}>
        Add existing content
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 0,
          flex: 1,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
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
            {open ? (
              <Box
                hidden={activeTab !== 'search'}
                sx={{
                  flex: 1,
                  minHeight: 0,
                  minWidth: 0,
                  width: '100%',
                  display: activeTab === 'search' ? 'block' : 'none',
                  overflow: 'hidden',
                  '& > section': {
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    minWidth: 0
                  },
                  // Hide Studio select-mode Cancel/Accept footer; this dialog's Actions bar handles attach.
                  '& > section > section:last-of-type': {
                    display: 'none'
                  }
                }}
              >
                <Search embedded mode="select" onClose={handleClose} onSelect={handleSelect} />
              </Box>
            ) : null}

            {activeTab === 'recent' ? (
              <ContentAttachFeedPanel
                title="My recent activity"
                description="Pages and components you created or edited recently — select items to attach"
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
                description="Sandbox items not yet published — batch your finished work into this package"
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
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1.5, flexWrap: 'wrap', gap: 1 }}>
        {isSearchTab && selectedPaths.length > 0 ? (
          <Box sx={{ flex: 1, minWidth: 200, typography: 'body2', color: 'text.secondary' }}>
            {selectedPaths.length} item{selectedPaths.length === 1 ? '' : 's'} selected — use Attach to add to
            package
          </Box>
        ) : (
          <Box sx={{ flex: 1 }} />
        )}
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disabled={selectedPaths.length === 0} onClick={handleAttach}>
          Attach{selectedPaths.length > 0 ? ` (${selectedPaths.length})` : ''}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentSearchAttachDialog;
