import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameMonth,
  isToday,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import styles from "./styles.module.scss";
import { DAYS_OF_WEEK } from "../../utils/constants";
import NextIcon from "../../assets/next.svg?react";
import { useState } from "react";
import { Event } from "../../utils/types";

interface MonthMiniProps {
  currentDate: Date;
  setCurrentDate?: (date: Date) => void;
  showYear?: boolean;
  showHeaderButtons?: boolean;
  showHeader?: boolean;
  onDayClick?: (date: Date) => void;
  onDayDoubleClick?: (date: Date) => void;
  getEvents?: (start: Date, end: Date) => Event[];
  ghostEvent?: Event;
  selectedDate?: Date | null;
  onSelectDate?: (date: Date) => void;
}

export default function MonthMini({
  currentDate,
  setCurrentDate,
  showHeaderButtons = true,
  showHeader = true,
  showYear = true,
  onDayClick,
  onDayDoubleClick,
  getEvents,
  ghostEvent,
  selectedDate: externalSelectedDate,
  onSelectDate,
}: MonthMiniProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    currentDate,
  );
  const selectedDate =
    externalSelectedDate !== undefined
      ? externalSelectedDate
      : internalSelectedDate;

  const goToPrevMonth = () =>
    setCurrentDate && setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () =>
    setCurrentDate && setCurrentDate(addMonths(currentDate, 1));

  const events = getEvents ? getEvents(calendarStart, calendarEnd) : [];

  const getDayEvents = (day: Date) =>
    events
      .filter((event) => isSameDay(event.start, day))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className={styles.monthMini}>
      {showHeader && (
        <div className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.month}>{format(currentDate, "MMMM")}</div>
            {showYear && (
              <div className={styles.year}>{format(currentDate, "yyyy")}</div>
            )}
          </div>
          {showHeaderButtons && (
            <div className={styles.headerButtons}>
              <button className={styles.headerButton} onClick={goToPrevMonth}>
                <NextIcon className={styles.nextIcon} />
              </button>
              <button className={styles.headerButton} onClick={goToNextMonth}>
                <NextIcon className={styles.prevIcon} />
              </button>
            </div>
          )}
        </div>
      )}
      <div className={styles.days}>
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className={styles.dayName}>
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayEvents = getDayEvents(day);
          const hasGhostEvent = ghostEvent && isSameDay(ghostEvent.start, day);
          return (
            <div
              key={index}
              className={`${styles.day} ${
                isToday(day) ? styles.today : ""
              } ${!isSameMonth(day, currentDate) ? styles.otherMonth : ""} ${
                selectedDate && isSameDay(day, selectedDate)
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                if (onSelectDate) {
                  onSelectDate(day);
                } else {
                  setInternalSelectedDate(day);
                }
                onDayClick && onDayClick(day);
              }}
              onDoubleClick={() => onDayDoubleClick && onDayDoubleClick(day)}
            >
              <span>{format(day, "d")}</span>
              {(dayEvents.length > 0 || hasGhostEvent) && (
                <div className={styles.eventDots}>
                  {dayEvents.slice(0, hasGhostEvent ? 2 : 3).map((event, i) => (
                    <span
                      key={i}
                      className={styles.eventDot}
                      style={{
                        backgroundColor: (event as Event).color || "#f0fab6",
                      }}
                    />
                  ))}
                  {hasGhostEvent && (
                    <span
                      key="ghost"
                      className={`${styles.eventDot} ${styles.ghostDot}`}
                      style={{
                        backgroundColor: ghostEvent!.color || "#007bff",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
