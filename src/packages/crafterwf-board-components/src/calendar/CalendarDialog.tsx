import * as React from 'react';

import { Box } from '@mui/material';

import SiteCalendarView from './SiteCalendarView';

/** Content widget for Studio's SHOW_WIDGET_DIALOG shell. */
const CalendarDialog = () => (
  <Box
    sx={(theme) => ({
      width: '100%',
      minWidth: 0,
      boxSizing: 'border-box',
      px: theme.spacing(2.5),
      py: theme.spacing(2),
      minHeight: 480,
      height: 'min(65vh, 720px)',
      maxHeight: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column'
    })}
  >
    <SiteCalendarView defaultViewMode="day" />
  </Box>
);

export default CalendarDialog;
