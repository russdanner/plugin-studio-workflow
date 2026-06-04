import * as React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';

import { getWorkflowPackage } from '../api/workflowApi';
import BoardCard from '../components/BoardCard';
import CardRecord from '../types/CardRecord';
import { CalendarEvent, notifyCalendarUpdated } from '../types/calendarEvent';
import { getPackageFromCalendarEvent } from './packageCalendarSource';
import { getTaskFromCalendarEvent } from './taskCalendarSource';
import TaskDetailDialog from './TaskDetailDialog';
import { WorkflowTask } from '../api/taskApi';

interface CalendarEventActionsContextValue {
  openEvent: (event: CalendarEvent) => void;
}

const CalendarEventActionsContext = createContext<CalendarEventActionsContextValue | null>(null);

export function useCalendarEventActions(): CalendarEventActionsContextValue {
  const context = useContext(CalendarEventActionsContext);
  if (!context) {
    throw new Error('useCalendarEventActions must be used within CalendarEventActionsProvider');
  }
  return context;
}

function workflowPackageToCardRecord(pkg: {
  id: string;
  title: string;
  description?: string;
  coverColor?: string;
  dueOn?: string;
}): CardRecord {
  return {
    id: pkg.id,
    name: pkg.title,
    desc: pkg.description || '',
    dueOn: pkg.dueOn,
    url: null,
    cover: { color: pkg.coverColor || 'blue' },
    badges: { attachments: 0, comments: 0 }
  };
}

export function CalendarEventActionsProvider({
  children,
  onChanged
}: {
  children: React.ReactNode;
  onChanged?: () => void;
}) {
  const siteId = useActiveSiteId();
  const [packageCard, setPackageCard] = useState<CardRecord | null>(null);
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [task, setTask] = useState<WorkflowTask | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const refreshCalendar = useCallback(() => {
    onChanged?.();
    notifyCalendarUpdated();
  }, [onChanged]);

  const openPackage = useCallback(
    (packageId: string) => {
      if (!siteId) {
        return;
      }
      getWorkflowPackage(siteId, packageId).subscribe({
        next(response) {
          const pkg = response.response?.result?.workflowPackage;
          if (!pkg?.id) {
            return;
          }
          setPackageCard(workflowPackageToCardRecord(pkg));
          setPackageDialogOpen(true);
        },
        error(e) {
          console.error(e);
        }
      });
    },
    [siteId]
  );

  const openEvent = useCallback(
    (event: CalendarEvent) => {
      const pkg = getPackageFromCalendarEvent(event);
      if (pkg?.id) {
        openPackage(pkg.id);
        return;
      }
      const taskEvent = getTaskFromCalendarEvent(event);
      if (taskEvent) {
        setTask(taskEvent);
        setTaskDialogOpen(true);
      }
    },
    [openPackage]
  );

  const openPackageFromTask = useCallback(
    (packageId: string) => {
      setTaskDialogOpen(false);
      setTask(null);
      openPackage(packageId);
    },
    [openPackage]
  );

  const contextValue = useMemo(() => ({ openEvent }), [openEvent]);

  return (
    <CalendarEventActionsContext.Provider value={contextValue}>
      {children}
      {packageCard && (
        <BoardCard
          dialogOnly
          card={packageCard}
          detailsOpen={packageDialogOpen}
          onDetailsClose={() => {
            setPackageDialogOpen(false);
            setPackageCard(null);
          }}
          onPackageChanged={refreshCalendar}
        />
      )}
      <TaskDetailDialog
        open={taskDialogOpen}
        task={task}
        onClose={() => {
          setTaskDialogOpen(false);
          setTask(null);
        }}
        onOpenPackage={openPackageFromTask}
        onChanged={refreshCalendar}
      />
    </CalendarEventActionsContext.Provider>
  );
}
