import * as React from 'react';

import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { completeTask, notifyTasksUpdated, TASK_TARGET } from '../api/taskApi';
import { useCalendarEventActions } from './CalendarEventActions';
import { calendarEventBorderColor, CalendarSourceIcon } from './calendarEventDisplay';
import { calendarEventRangeSx, resolveEventRangePosition, shouldShowEventTitle } from './calendarEventRangeStyles';
import { getTaskFromCalendarEvent } from './taskCalendarSource';
import { CalendarEvent, notifyCalendarUpdated } from '../types/calendarEvent';
import { formatEventTime, isMultiDayEvent } from '../utils/calendarEventUtils';
import { formatCalendarDayHeading, parseCalendarDate } from '../utils/taskCalendarUtils';

export function CalendarEventItem({
  event,
  day,
  compact = false,
  onChanged
}: {
  event: CalendarEvent;
  day?: Date;
  compact?: boolean;
  onChanged?: () => void;
}) {
  const siteId = useActiveSiteId();
  const { openEvent } = useCalendarEventActions();
  const task = getTaskFromCalendarEvent(event);

  const handleComplete = (complete: boolean) => {
    if (!siteId || !task) {
      return;
    }
    completeTask(siteId, task.id, complete).subscribe({
      next() {
        notifyTasksUpdated();
        notifyCalendarUpdated();
        onChanged?.();
      },
      error(e) {
        console.error(e);
      }
    });
  };

  const handleOpen = () => {
    openEvent(event);
  };

  const rangePosition = day ? resolveEventRangePosition(event, day) : null;
  const showTitle = !day || shouldShowEventTitle(rangePosition);
  const multiDay = isMultiDayEvent(event);
  const scheduleLabel = (() => {
    if (!multiDay || compact) {
      return event.startsOn ? formatEventTime(event.startsOn) : '';
    }
    const start = parseCalendarDate(event.startsOn);
    const end = parseCalendarDate(event.endsOn);
    if (start && end) {
      return `${formatCalendarDayHeading(start)} – ${formatCalendarDayHeading(end)}`;
    }
    return '';
  })();

  return (
    <Box
      component="button"
      type="button"
      onClick={handleOpen}
      aria-label={showTitle ? event.title : undefined}
      sx={[
        (theme) => ({
          display: 'flex',
          alignItems: 'flex-start',
          gap: showTitle ? 0.5 : 0,
          px: compact ? 0.5 : 0.75,
          py: compact ? (showTitle ? 0.35 : 0.5) : showTitle ? 0.5 : 0.65,
          borderRadius: 1,
          border: rangePosition && rangePosition !== 'single' ? 0 : 1,
          borderColor: 'divider',
          borderLeftWidth: rangePosition && rangePosition !== 'single' ? 0 : 3,
          borderLeftColor: calendarEventBorderColor(theme, event),
          bgcolor: event.complete ? 'action.hover' : 'background.paper',
          opacity: event.archived ? 0.75 : 1,
          minWidth: 0,
          width: '100%',
          minHeight: showTitle ? undefined : compact ? 10 : 14,
          textAlign: 'left',
          cursor: 'pointer',
          font: 'inherit',
          '&:hover': {
            bgcolor: event.complete ? 'action.selected' : 'action.hover'
          }
        }),
        ...(day ? [(theme: Theme) => calendarEventRangeSx(theme, event, day, rangePosition)] : [])
      ]}
    >
      {task && showTitle && (
        <Checkbox
          size="small"
          checked={!!event.complete}
          disabled={!!event.archived}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            handleComplete(e.target.checked);
          }}
          sx={{ p: 0, mt: compact ? 0 : 0.1, flexShrink: 0 }}
        />
      )}
      <Box sx={{ minWidth: 0, flex: 1, display: showTitle ? 'block' : 'none' }}>
        <Stack direction="row" spacing={0.5} alignItems="flex-start" sx={{ mb: compact ? 0 : 0.25, minWidth: 0 }}>
          <Box sx={{ color: 'text.secondary', mt: compact ? 0.05 : 0.15, display: 'flex' }}>
            <CalendarSourceIcon event={event} fontSize={compact ? 'inherit' : 'small'} />
          </Box>
          <Typography
            variant={compact ? 'caption' : 'body2'}
            sx={{
              fontWeight: 600,
              wordBreak: 'break-word',
              textDecoration: event.complete ? 'line-through' : 'none',
              color: event.complete ? 'text.secondary' : 'text.primary',
              lineHeight: 1.3,
              minWidth: 0
            }}
          >
            {event.title}
          </Typography>
        </Stack>
        {!compact && scheduleLabel && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {scheduleLabel}
          </Typography>
        )}
        {task?.targetType === TASK_TARGET.WORKFLOW_PACKAGE && task.targetId && task.targetTitle && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25, wordBreak: 'break-word' }}>
            {task.targetTitle}
          </Typography>
        )}
        {!compact && event.subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {event.subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default CalendarEventItem;
