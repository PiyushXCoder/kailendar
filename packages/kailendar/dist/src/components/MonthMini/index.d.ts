import { Event } from '../../utils/types';
interface MonthMiniProps {
    currentDate: Date;
    setCurrentDate?: (date: Date) => void;
    showYear?: boolean;
    showHeaderButtons?: boolean;
    showHeader?: boolean;
    onDayClick?: (date: Date) => void;
    getEvents?: (start: Date, end: Date) => Event[];
    ghostEvent?: Event;
    selectedDate?: Date | null;
    onSelectDate?: (date: Date) => void;
}
export default function MonthMini({ currentDate, setCurrentDate, showHeaderButtons, showHeader, showYear, onDayClick, getEvents, ghostEvent, selectedDate: externalSelectedDate, onSelectDate, }: MonthMiniProps): import("react/jsx-runtime").JSX.Element;
export {};
