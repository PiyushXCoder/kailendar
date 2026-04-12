import { Event } from '../../utils/types';
interface MonthViewProps {
    currentDate: Date;
    getEvents?: (start: Date, end: Date) => Event[];
    ghostEvent?: Event;
    onEventClick?: (event: Event) => void;
    onDayClick?: (date: Date) => void;
}
export default function MonthView({ currentDate, getEvents, ghostEvent, onEventClick, onDayClick, }: MonthViewProps): import("react/jsx-runtime").JSX.Element;
export {};
