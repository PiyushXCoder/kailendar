import { Event } from '../../utils/types';
interface DayTimelineProps {
    currentDate: Date;
    setCurrentDate?: (date: Date) => void;
    onTimeClick?: (time: Date) => void;
    onEventClick?: (event: Event) => void;
    getEvents?: (start: Date, end: Date) => Event[];
    ghostEvent?: Event;
    showDateSwitchButtons?: boolean;
    showTimeLabels?: boolean;
    showHeader?: boolean;
}
export default function DayTimeline({ currentDate, setCurrentDate, getEvents, ghostEvent, onEventClick, onTimeClick, showDateSwitchButtons, showTimeLabels, showHeader, }: DayTimelineProps): import("react/jsx-runtime").JSX.Element;
export {};
