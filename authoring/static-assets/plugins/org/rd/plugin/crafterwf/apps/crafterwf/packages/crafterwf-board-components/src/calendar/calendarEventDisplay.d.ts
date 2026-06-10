import { Theme } from '@mui/material/styles';
import { CalendarEvent } from '../types/calendarEvent';
export declare function calendarEventBorderColor(theme: Theme, event: CalendarEvent): string;
export declare function CalendarSourceIcon({ event, fontSize }: {
    event: CalendarEvent;
    fontSize?: 'inherit' | 'small' | 'medium';
}): JSX.Element;
