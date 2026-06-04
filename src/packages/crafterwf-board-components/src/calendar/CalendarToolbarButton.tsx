import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { TASKS_UPDATED_EVENT } from '../api/taskApi';
import { loadSiteCalendarEvents } from './loadSiteCalendarEvents';
import { CALENDAR_UPDATED_EVENT } from '../types/calendarEvent';
import { countEventsOnDay } from '../utils/calendarEventUtils';
import { openCalendarDialog } from '../utils/openCalendarDialog';
import { startOfDay } from '../utils/taskCalendarUtils';

export function CalendarToolbarButton(props: Record<string, unknown>) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();
  const title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Calendar';
  const [todayCount, setTodayCount] = useState(0);

  const refreshTodayCount = useCallback(() => {
    if (!siteId) {
      setTodayCount(0);
      return;
    }
    loadSiteCalendarEvents(siteId).subscribe({
      next(events) {
        setTodayCount(countEventsOnDay(events, startOfDay(new Date())));
      },
      error(e) {
        console.error(e);
      }
    });
  }, [siteId]);

  useEffect(() => {
    refreshTodayCount();
    const intervalId = window.setInterval(refreshTodayCount, 60000);
    const handleUpdated = () => refreshTodayCount();
    window.addEventListener(TASKS_UPDATED_EVENT, handleUpdated);
    window.addEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(TASKS_UPDATED_EVENT, handleUpdated);
      window.removeEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
    };
  }, [refreshTodayCount]);

  const openCalendar = () => {
    openCalendarDialog(dispatch, title, siteId ?? undefined);
    refreshTodayCount();
  };

  return (
    <Tooltip title={title}>
      <span>
        <IconButton aria-label={title} size="large" {...props} onClick={openCalendar}>
          <Badge badgeContent={todayCount > 0 ? todayCount : undefined} color="primary" max={99}>
            <CalendarMonthRoundedIcon />
          </Badge>
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default CalendarToolbarButton;
