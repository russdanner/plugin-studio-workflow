import { CalendarEvent } from '../types/calendarEvent';
export declare function CalendarEventItem({ event, day, compact, onChanged }: {
    event: CalendarEvent;
    day?: Date;
    compact?: boolean;
    onChanged?: () => void;
}): JSX.Element;
export default CalendarEventItem;
