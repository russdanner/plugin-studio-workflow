import { CalendarViewMode } from '../utils/taskCalendarUtils';
export interface SiteCalendarViewProps {
    /** Defaults to day view (today-focused). */
    defaultViewMode?: CalendarViewMode;
}
declare const SiteCalendarView: ({ defaultViewMode }: SiteCalendarViewProps) => JSX.Element;
export default SiteCalendarView;
