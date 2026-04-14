interface YearViewProps {
    currentDate: Date;
    getEvents?: (start: Date, end: Date) => import('../../utils/types').Event[];
    ghostEvent?: import('../../utils/types').Event;
    onDayClick?: (date: Date) => void;
    onDayDoubleClick?: (date: Date) => void;
    selectedDate?: Date | null;
    onSelectDate?: (date: Date) => void;
}
export default function YearView({ currentDate, getEvents, ghostEvent, onDayClick, onDayDoubleClick, selectedDate, onSelectDate, }: YearViewProps): import("react/jsx-runtime").JSX.Element;
export {};
