import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from '@mui/material';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { TASKS_UPDATED_EVENT } from '../api/taskApi';
import { CalendarEventActionsProvider, useCalendarEventActions } from './CalendarEventActions';
import { loadSiteCalendarEvents } from './loadSiteCalendarEvents';
import CalendarEventItem from './CalendarEventItem';
import { readCalendarViewMode, writeCalendarViewMode } from './calendarViewPreference';
import { calendarEventBorderColor, CalendarSourceIcon } from './calendarEventDisplay';
import { calendarEventRangeSx, resolveEventRangePosition, shouldShowEventTitle } from './calendarEventRangeStyles';
import { CALENDAR_UPDATED_EVENT, CalendarEvent } from '../types/calendarEvent';
import {
  eventsForDay,
  partitionEventsByDate
} from '../utils/calendarEventUtils';
import {
  CalendarViewMode,
  endOfWeek,
  formatCalendarDayHeading,
  formatCalendarDayLabel,
  formatCalendarMonthHeading,
  formatCalendarWeekHeading,
  getMonthGridDays,
  getWeekDayDates,
  isSameDay,
  isSameMonth,
  shiftAnchorDate,
  startOfDay,
  startOfWeek
} from '../utils/taskCalendarUtils';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function MonthCalendarEventChip({ event, day }: { event: CalendarEvent; day: Date }) {
  const { openEvent } = useCalendarEventActions();
  const rangePosition = resolveEventRangePosition(event, day);
  const showTitle = shouldShowEventTitle(rangePosition);

  return (
    <Tooltip title={event.title} placement="top">
      <Box
        component="button"
        type="button"
        aria-label={event.title}
        onClick={() => openEvent(event)}
        sx={[
          (theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: showTitle ? 0.35 : 0,
            minWidth: 0,
            width: '100%',
            px: 0.5,
            py: showTitle ? 0.2 : 0.45,
            borderRadius: 0.75,
            border: 0,
            bgcolor: event.complete ? 'action.hover' : 'background.default',
            borderLeft: `3px solid ${calendarEventBorderColor(theme, event)}`,
            cursor: 'pointer',
            font: 'inherit',
            textAlign: 'left',
            minHeight: showTitle ? undefined : 8,
            '&:hover': {
              bgcolor: 'action.selected'
            }
          }),
          (theme) => calendarEventRangeSx(theme, event, day, rangePosition)
        ]}
      >
        {showTitle && (
          <>
            <Box sx={{ color: 'text.secondary', display: 'flex', flexShrink: 0 }}>
              <CalendarSourceIcon event={event} fontSize="inherit" />
            </Box>
            <Typography
              variant="caption"
              noWrap
              sx={{
                minWidth: 0,
                textDecoration: event.complete ? 'line-through' : 'none',
                color: event.complete ? 'text.secondary' : 'text.primary'
              }}
            >
              {event.title}
            </Typography>
          </>
        )}
      </Box>
    </Tooltip>
  );
}

export interface SiteCalendarViewProps {
  /** Defaults to day view (today-focused). */
  defaultViewMode?: CalendarViewMode;
}

const SiteCalendarView = ({ defaultViewMode = 'day' }: SiteCalendarViewProps) => {
  const siteId = useActiveSiteId();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<CalendarViewMode>(() => readCalendarViewMode(undefined, defaultViewMode));
  const [anchorDate, setAnchorDate] = useState(() => startOfDay(new Date()));
  const [showUnscheduled, setShowUnscheduled] = useState(false);

  useEffect(() => {
    setViewMode(readCalendarViewMode(siteId, defaultViewMode));
  }, [siteId, defaultViewMode]);

  const loadEvents = useCallback(() => {
    if (!siteId) {
      setEvents([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    loadSiteCalendarEvents(siteId).subscribe({
      next(allEvents) {
        setEvents(allEvents);
        setLoading(false);
      },
      error(e) {
        console.error(e);
        setError('Unable to load calendar.');
        setEvents([]);
        setLoading(false);
      }
    });
  }, [siteId]);

  useEffect(() => {
    loadEvents();
    const handleUpdated = () => loadEvents();
    window.addEventListener(TASKS_UPDATED_EVENT, handleUpdated);
    window.addEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
    return () => {
      window.removeEventListener(TASKS_UPDATED_EVENT, handleUpdated);
      window.removeEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
    };
  }, [loadEvents]);

  const { scheduled, unscheduled } = useMemo(() => partitionEventsByDate(events), [events]);

  const heading = useMemo(() => {
    if (viewMode === 'day') {
      return formatCalendarDayHeading(anchorDate);
    }
    if (viewMode === 'week') {
      const weekStart = startOfWeek(anchorDate);
      return formatCalendarWeekHeading(weekStart, endOfWeek(anchorDate));
    }
    return formatCalendarMonthHeading(anchorDate);
  }, [anchorDate, viewMode]);

  const goToday = () => {
    setAnchorDate(startOfDay(new Date()));
  };

  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, value: CalendarViewMode | null) => {
    if (!value) {
      return;
    }
    setViewMode(value);
    writeCalendarViewMode(siteId, value);
  };

  const renderDayEvents = (day: Date, compact = false) => {
    const dayEvents = eventsForDay(scheduled, day);
    if (dayEvents.length === 0) {
      return compact ? null : (
        <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
          Nothing scheduled this day.
        </Typography>
      );
    }
    return (
      <Stack spacing={compact ? 0.5 : 0.75}>
        {dayEvents.map((event) => (
          <CalendarEventItem key={event.id} event={event} day={day} compact={compact} onChanged={loadEvents} />
        ))}
      </Stack>
    );
  };

  const renderDayView = () => renderDayEvents(anchorDate, false);

  const renderWeekView = () => {
    const days = getWeekDayDates(anchorDate);
    const today = startOfDay(new Date());
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: 0.75,
          minHeight: 0,
          flex: 1,
          overflow: 'hidden'
        }}
      >
        {days.map((day) => {
          const isToday = isSameDay(day, today);
          return (
            <Box
              key={day.toISOString()}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,
                border: 1,
                borderColor: isToday ? 'primary.main' : 'divider',
                borderRadius: 1,
                bgcolor: isToday ? 'action.selected' : 'background.paper',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ px: 0.75, py: 0.5, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
                <Typography variant="caption" fontWeight={700} sx={{ display: 'block' }}>
                  {formatCalendarDayLabel(day)}
                </Typography>
              </Box>
              <Box sx={{ p: 0.5, overflowY: 'auto', flex: 1, minHeight: 0 }}>{renderDayEvents(day, true)}</Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderMonthView = () => {
    const days = getMonthGridDays(anchorDate);
    const today = startOfDay(new Date());
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: 0.5,
            mb: 0.5,
            flexShrink: 0
          }}
        >
          {WEEKDAY_LABELS.map((label) => (
            <Typography
              key={label}
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 700, textAlign: 'center', py: 0.25 }}
            >
              {label}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gridAutoRows: 'minmax(88px, 1fr)',
            gap: 0.5,
            flex: 1,
            minHeight: 0,
            overflow: 'auto'
          }}
        >
          {days.map((day) => {
            const dayEvents = eventsForDay(scheduled, day);
            const inMonth = isSameMonth(day, anchorDate);
            const isToday = isSameDay(day, today);
            const visibleEvents = dayEvents.slice(0, 3);
            const hiddenCount = dayEvents.length - visibleEvents.length;
            return (
              <Box
                key={day.toISOString()}
                sx={{
                  border: 1,
                  borderColor: isToday ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  p: 0.5,
                  minWidth: 0,
                  bgcolor: isToday ? 'action.selected' : inMonth ? 'background.paper' : 'action.hover',
                  opacity: inMonth ? 1 : 0.72,
                  overflow: 'hidden'
                }}
              >
                <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 0.25 }}>
                  {day.getDate()}
                </Typography>
                <Stack spacing={0.35}>
                  {visibleEvents.map((event) => (
                    <MonthCalendarEventChip key={`${event.id}:${day.toISOString()}`} event={event} day={day} />
                  ))}
                  {hiddenCount > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ pl: 0.5 }}>
                      +{hiddenCount} more
                    </Typography>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  const unscheduledTasks = unscheduled.filter((event) => event.sourceId === 'task' && !event.complete);

  return (
    <CalendarEventActionsProvider onChanged={loadEvents}>
      <Stack spacing={1.25} sx={{ minWidth: 0, width: '100%', height: '100%', minHeight: 420 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ flexShrink: 0 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton
            size="small"
            aria-label="Previous period"
            onClick={() => setAnchorDate((current) => shiftAnchorDate(current, viewMode, -1))}
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <Button size="small" onClick={goToday} sx={{ minWidth: 0, px: 1 }}>
            Today
          </Button>
          <IconButton
            size="small"
            aria-label="Next period"
            onClick={() => setAnchorDate((current) => shiftAnchorDate(current, viewMode, 1))}
          >
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={viewMode}
          onChange={handleViewModeChange}
        >
          <ToggleButton value="day">Day</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, flexShrink: 0 }}>
        {heading}
      </Typography>

      <Box sx={{ flex: 1, minHeight: 280, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {loading && events.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ px: 0.5, py: 1 }}>
            {error}
          </Typography>
        ) : (
          <>
            {viewMode === 'day' && renderDayView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'month' && renderMonthView()}
          </>
        )}
      </Box>

      {unscheduledTasks.length > 0 && (
        <Box sx={{ flexShrink: 0, pt: 0.5, borderTop: 1, borderColor: 'divider' }}>
          <Button size="small" sx={{ px: 0.5, minWidth: 0, mb: 0.5 }} onClick={() => setShowUnscheduled((prev) => !prev)}>
            {showUnscheduled ? 'Hide' : 'Show'} unscheduled tasks ({unscheduledTasks.length})
          </Button>
          {showUnscheduled && (
            <Stack spacing={0.75} sx={{ maxHeight: 180, overflowY: 'auto' }}>
              {unscheduledTasks.map((event) => (
                <CalendarEventItem key={event.id} event={event} onChanged={loadEvents} />
              ))}
            </Stack>
          )}
        </Box>
      )}
      </Stack>
    </CalendarEventActionsProvider>
  );
};

export default SiteCalendarView;
