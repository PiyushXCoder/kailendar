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
  ghostEvent?: Event;
  onEventClick?: (event: Event) => void;
  onDayClick?: (date: Date) => void;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({
  currentDate,
  getEvents,
  ghostEvent,
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

  const getDayEvents = (day: Date) => {
    const dayEvents = events
      .filter((e) => isSameDay(e.start, day))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    
    if (ghostEvent && isSameDay(ghostEvent.start, day)) {
      return [...dayEvents, { ...ghostEvent, id: `ghost-${ghostEvent.id}` }];
    }
    return dayEvents;
  };

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
          const ghostEventForDay = ghostEvent && isSameDay(ghostEvent.start, day) ? ghostEvent : null;
          const regularEvents = dayEvents.filter(e => !e.id.startsWith('ghost-'));
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
                {regularEvents.slice(0, ghostEventForDay ? 2 : 3).map((event) => (
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
                {ghostEventForDay && (
                  <div
                    key={`ghost-${ghostEventForDay.id}`}
                    className={`${styles.event} ${styles.ghostEvent}`}
                    style={{ backgroundColor: ghostEventForDay.color || "#007bff" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick && onEventClick(ghostEventForDay);
                    }}
                  >
                    <span className={styles.eventTitle}>{ghostEventForDay.title}</span>
                  </div>
                )}
                {regularEvents.length > (ghostEventForDay ? 2 : 3) && (
                  <div className={styles.moreEvents}>
                    +{regularEvents.length - (ghostEventForDay ? 2 : 3)} more
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