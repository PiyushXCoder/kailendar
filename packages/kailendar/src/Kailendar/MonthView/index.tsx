import { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { Event } from "../../utils/types";
import styles from "./styles.module.scss";

interface MonthViewProps {
  currentDate: Date;
  getEvents?: (start: Date, end: Date) => Event[];
  onEventClick?: (event: Event) => void;
  onDayClick?: (date: Date) => void;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({
  currentDate,
  getEvents,
  onEventClick,
  onDayClick,
}: MonthViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const events = useMemo(() => {
    if (!getEvents) return [];
    return getEvents(calendarStart, calendarEnd);
  }, [getEvents, calendarStart, calendarEnd]);

  const getDayEvents = (day: Date) =>
    events
      .filter((e) => isSameDay(e.start, day))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className={styles.monthView}>
      <div className={styles.header}>
        {WEEK_DAYS.map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day) => {
          const dayEvents = getDayEvents(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={`${styles.dayCell} ${!isCurrentMonth ? styles.otherMonth : ""} ${isCurrentDay ? styles.today : ""}`}
              onClick={() => onDayClick && onDayClick(day)}
            >
              <div className={styles.dayNumber}>{format(day, "d")}</div>
              <div className={styles.events}>
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={styles.event}
                    style={{ backgroundColor: event.color || "#007bff" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick && onEventClick(event);
                    }}
                  >
                    <span className={styles.eventTitle}>{event.title}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className={styles.moreEvents}>
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}