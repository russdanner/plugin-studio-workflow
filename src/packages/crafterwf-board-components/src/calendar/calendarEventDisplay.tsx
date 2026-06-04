import * as React from 'react';
import { Theme } from '@mui/material/styles';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

import { CalendarEvent } from '../types/calendarEvent';

export function calendarEventBorderColor(theme: Theme, event: CalendarEvent): string {
  if (event.accentHex) {
    return event.accentHex;
  }
  const accent = event.accentColor ?? 'primary';
  return theme.palette[accent]?.main ?? theme.palette.primary.main;
}

export function CalendarSourceIcon({
  event,
  fontSize = 'small'
}: {
  event: CalendarEvent;
  fontSize?: 'inherit' | 'small' | 'medium';
}) {
  if (event.sourceId === 'package') {
    return <AccountTreeOutlinedIcon fontSize={fontSize} sx={{ flexShrink: 0 }} />;
  }
  return <TaskAltRoundedIcon fontSize={fontSize} sx={{ flexShrink: 0 }} />;
}
