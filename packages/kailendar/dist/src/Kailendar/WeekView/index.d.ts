import { Event } from '../../utils/types';
interface WeekViewProps {
    currentDate: Date;
    setCurrentDate?: (date: Date) => void;
    showHeader?: boolean;
    getEvents?: (start: Date, end: Date) => Event[];
    ghostEvent?: Event;
    onEventClick?: (event: Event) => void;
    onTimeClick?: (time: Date) => void;
}
export default function WeekView({ currentDate, setCurrentDate, showHeader, getEvents, ghostEvent, onEventClick, onTimeClick, }: WeekViewProps): import("react/jsx-runtime").JSX.Element;
export {};
