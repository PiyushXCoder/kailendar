import { startOfWeek, addDays, format, addWeeks, subWeeks } from "date-fns";
import NextIcon from "../../assets/next.svg?react";
import DayTimeline from "../../components/DayTimeline";
import { Event } from "../../utils/types";
import styles from "./styles.module.scss";
import TimeColumn from "../../components/TimeColumn";
import { HOUR_HEIGHT, START_HOUR, END_HOUR } from "../../utils/constants";

interface WeekViewProps {
  currentDate: Date;
  setCurrentDate?: (date: Date) => void;
  showHeader?: boolean;
  getEvents?: (start: Date, end: Date) => Event[];
  ghostEvent?: Event;
  onEventClick?: (event: Event) => void;
  onTimeClick?: (time: Date) => void;
}

export default function WeekView({
  currentDate,
  setCurrentDate,
  showHeader = true,
  getEvents,
  ghostEvent,
  onEventClick,
  onTimeClick,
}: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekEnd = addDays(weekStart, 6);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const goToPrevWeek = () =>
    setCurrentDate && setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () =>
    setCurrentDate && setCurrentDate(addWeeks(currentDate, 1));

  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i,
  );

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
              <NextIcon className={styles.navIcon} />
            </button>
            <span className={styles.weekRange}>
              {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
            </span>
            <button className={styles.navButton} onClick={goToNextWeek}>
              <NextIcon className={styles.navIcon} />
            </button>
          </div>
        </div>
      )}
      <div className={styles.content}>
        <div style={{ paddingTop: HOUR_HEIGHT }}>
          <TimeColumn hours={hours} />
        </div>
        {days.map((day) => (
          <DayTimeline
            key={day.toISOString()}
            currentDate={day}
            setCurrentDate={setCurrentDate}
            getEvents={getEvents}
            ghostEvent={ghostEvent}
            onEventClick={onEventClick}
            onTimeClick={onTimeClick}
            showHeader={true}
            showDateSwitchButtons={false}
            showTimeLabels={false}
            scrollable={false}
          />
        ))}
      </div>
    </div>
  );
}
