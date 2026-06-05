import * as React from 'react';
import { useCallback, useState } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';

import Search from '@craftercms/studio-ui/components/Search';

import SelectedContentSourcePanel from './SelectedContentSourcePanel';

export interface ContentSearchAttachDialogProps {
  open: boolean;
  onClose(): void;
  onAttach(paths: string[]): void;
}

const ContentSearchAttachDialog = ({ open, onClose, onAttach }: ContentSearchAttachDialogProps) => {
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  const handleClose = useCallback(() => {
    setSelectedPaths([]);
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      scroll="paper"
      disableRestoreFocus
      aria-labelledby="crafterwf-content-search-title"
      PaperProps={{ sx: { height: 'min(85vh, 720px)', maxHeight: '85vh' } }}
    >
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
            overflow: 'hidden',
            '& > section:last-of-type': { display: 'none' }
          }}
        >
          <Search embedded mode="select" onClose={handleClose} onSelect={handleSelect} />
        </Box>
        <SelectedContentSourcePanel selectedPaths={selectedPaths} onRemove={handleRemove} />
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1.5 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disabled={selectedPaths.length === 0} onClick={handleAttach}>
          Attach{selectedPaths.length > 0 ? ` (${selectedPaths.length})` : ''}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentSearchAttachDialog;
