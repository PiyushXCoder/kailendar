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
    scrollable?: boolean;
    contentRef?: React.RefObject<HTMLDivElement | null>;
}
export default function DayTimeline({ currentDate, setCurrentDate, getEvents, ghostEvent, onEventClick, onTimeClick, showDateSwitchButtons, showTimeLabels, showHeader, scrollable, contentRef, }: DayTimelineProps): import("react/jsx-runtime").JSX.Element;
export {};
