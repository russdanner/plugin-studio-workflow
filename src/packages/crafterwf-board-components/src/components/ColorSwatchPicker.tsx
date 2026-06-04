import * as React from 'react';
import { useState } from 'react';

import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import { ColorSwatch, resolveStepColor } from '../colors';

export interface ColorSwatchPickerProps {
  label?: string;
  swatches: ColorSwatch[];
  value: string;
  onChange(value: string): void;
  /** Use step color resolver for preview ring; defaults to swatch hex */
  resolveColor?: (id: string) => string;
  size?: number;
  /** inline = always visible grid; menu = compact trigger + popover (default) */
  variant?: 'inline' | 'menu';
}

function SwatchButton({
  swatch,
  selected,
  resolveColor,
  size,
  onSelect
}: {
  swatch: ColorSwatch;
  selected: boolean;
  resolveColor: (id: string) => string;
  size: number;
  onSelect(): void;
}) {
  return (
    <Box
      component="button"
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={swatch.label}
      title={swatch.label}
      onClick={onSelect}
      sx={(theme) => ({
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: swatch.hex,
        boxShadow: selected
          ? `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${resolveColor(swatch.id)}`
          : `inset 0 0 0 1px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'}`,
        transition: theme.transitions.create(['box-shadow', 'transform'], { duration: 120 }),
        '&:hover': {
          transform: 'scale(1.08)'
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2
        }
      })}
    />
  );
}

const ColorSwatchPicker = ({
  label,
  swatches,
  value,
  onChange,
  resolveColor = resolveStepColor,
  size = 28,
  variant = 'menu'
}: ColorSwatchPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selected = swatches.find((swatch) => swatch.id === value) ?? swatches[0];
  const open = Boolean(anchorEl);

  const grid = (
    <Box
      role="radiogroup"
      aria-label={label || 'Color'}
      sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 320 }}
    >
      {swatches.map((swatch) => (
        <SwatchButton
          key={swatch.id}
          swatch={swatch}
          selected={value === swatch.id}
          resolveColor={resolveColor}
          size={size}
          onSelect={() => {
            onChange(swatch.id);
            setAnchorEl(null);
          }}
        />
      ))}
    </Box>
  );

  if (variant === 'inline') {
    return (
      <Stack spacing={0.75}>
        {label && (
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {label}
          </Typography>
        )}
        {grid}
      </Stack>
    );
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label ? `${label}: ${selected.label}` : selected.label}
        sx={{
          minWidth: 0,
          px: 1,
          py: 0.5,
          textTransform: 'none',
          gap: 0.75,
          flexShrink: 0
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            bgcolor: selected.hex,
            boxShadow: (theme) =>
              `inset 0 0 0 1px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'}`
          }}
        />
        {label && (
          <Typography variant="body2" component="span" color="text.secondary" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            {label}
          </Typography>
        )}
        <ArrowDropDownRoundedIcon fontSize="small" sx={{ color: 'text.secondary', ml: -0.25 }} />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { p: 1.5 } }}
      >
        {grid}
      </Popover>
    </>
  );
};

export default ColorSwatchPicker;
