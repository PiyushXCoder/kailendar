import MonthMini from "../../components/MonthMini";
import styles from "./styles.module.scss";

interface YearViewProps {
  currentDate: Date;
  getEvents?: (start: Date, end: Date) => import("../../utils/types").Event[];
  ghostEvent?: import("../../utils/types").Event;
  onDayClick?: (date: Date) => void;
  onDayDoubleClick?: (date: Date) => void;
  selectedDate?: Date | null;
  onSelectDate?: (date: Date) => void;
}

export default function YearView({
  currentDate,
  getEvents,
  ghostEvent,
  onDayClick,
  onDayDoubleClick,
  selectedDate,
  onSelectDate,
}: YearViewProps) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentDate.getFullYear(), i, 1);
    return date;
  });

  return (
    <div className={styles.yearView}>
      {months.map((date) => (
        <MonthMini
          key={date.getMonth()}
          currentDate={date}
          showHeaderButtons={false}
          showYear={true}
          getEvents={getEvents}
          ghostEvent={ghostEvent}
          onDayClick={onDayClick}
          onDayDoubleClick={onDayDoubleClick}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />
      ))}
    </div>
  );
}