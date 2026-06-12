import * as React from 'react';
import { CalendarEvent } from '../types/calendarEvent';
interface CalendarEventActionsContextValue {
    openEvent: (event: CalendarEvent) => void;
}
export declare function useCalendarEventActions(): CalendarEventActionsContextValue;
export declare function CalendarEventActionsProvider({ children, onChanged }: {
    children: React.ReactNode;
    onChanged?: () => void;
}): JSX.Element;
export {};
