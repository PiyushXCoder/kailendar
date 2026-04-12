import { startOfWeek, addDays, format, addWeeks, subWeeks } from "date-fns";
import DayTimeline from "../../components/DayTimeline";
import TimeColumn from "../../components/TimeColumn";
import { Event } from "../../utils/types";
import styles from "./styles.module.scss";

interface WeekViewProps {
  currentDate: Date;
  setCurrentDate?: (date: Date) => void;
  showHeader?: boolean;
  getEvents?: (start: Date, end: Date) => Event[];
  onEventClick?: (event: Event) => void;
  onTimeClick?: (time: Date) => void;
}

const DAYS_IN_WEEK = 7;
const START_HOUR = 0;
const END_HOUR = 24;

export default function WeekView({
  currentDate,
  setCurrentDate,
  showHeader = true,
  getEvents,
  onEventClick,
  onTimeClick,
}: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekEnd = addDays(weekStart, 6);
  const days = Array.from({ length: DAYS_IN_WEEK }, (_, i) =>
    addDays(weekStart, i),
  );
  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i,
  );

  const goToPrevWeek = () =>
    setCurrentDate && setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () =>
    setCurrentDate && setCurrentDate(addWeeks(currentDate, 1));

  return (
    <div className={styles.weekView}>
      {showHeader && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.monthYear}>
              {format(weekStart, "MMMM yyyy")}
            </span>
          </div>
          <div className={styles.navigation}>
            <button className={styles.navButton} onClick={goToPrevWeek}>
              {"<"}
            </button>
            <span className={styles.weekRange}>
              {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
            </span>
            <button className={styles.navButton} onClick={goToNextWeek}>
              {">"}
            </button>
          </div>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.timeColumnWrapper}>
          <TimeColumn hours={hours} />
        </div>
        <div className={styles.grid}>
          {days.map((day) => (
            <div key={day.toISOString()} className={styles.dayCell}>
              <DayTimeline
                currentDate={day}
                getEvents={getEvents}
                onEventClick={onEventClick}
                onTimeClick={onTimeClick}
                showDateSwitchButtons={false}
                showTimeLabels={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
