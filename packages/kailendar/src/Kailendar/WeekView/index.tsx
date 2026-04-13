import { startOfWeek, addDays, format, addWeeks, subWeeks } from "date-fns";
import { useRef } from "react";
import NextIcon from "../../assets/next.svg?react";
import { Event } from "../../utils/types";
import styles from "./styles.module.scss";

interface WeekViewProps {
  currentDate: Date;
  setCurrentDate?: (date: Date) => void;
  showHeader?: boolean;
  getEvents?: (start: Date, end: Date) => Event[];
  ghostEvent?: Event;
  onEventClick?: (event: Event) => void;
  onTimeClick?: (time: Date) => void;
}

const DAYS_IN_WEEK = 7;
const START_HOUR = 0;
const END_HOUR = 24;
const HOUR_HEIGHT = 60;

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
  const days = Array.from({ length: DAYS_IN_WEEK }, (_, i) =>
    addDays(weekStart, i),
  );
  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeColumnRef = useRef<HTMLDivElement>(null);

  const goToPrevWeek = () =>
    setCurrentDate && setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () =>
    setCurrentDate && setCurrentDate(addWeeks(currentDate, 1));

  const handleScroll = () => {
    if (scrollRef.current && timeColumnRef.current) {
      timeColumnRef.current.scrollTop = scrollRef.current.scrollTop;
    }
  };

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
        <div className={styles.timeColumnWrapper} ref={timeColumnRef}>
          <div className={styles.timeColumn}>
            {hours.map((hour) => (
              <div key={hour} className={styles.timeLabel}>
                {format(new Date().setHours(hour, 0, 0, 0), "ha")}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.grid} ref={scrollRef} onScroll={handleScroll}>
          <div className={styles.daysHeader}>
            {days.map((day) => (
              <div key={day.toISOString()} className={styles.dayHeader}>
                <span className={styles.dayName}>{format(day, "EEE")}</span>
                <span className={styles.dayNumber}>{format(day, "d")}</span>
              </div>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {days.map((day) => (
              <div key={day.toISOString()} className={styles.dayCell}>
                <div className={styles.dayTimeline}>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className={styles.hourSlot}
                      onClick={(e) => {
                        const rect =
                          e.currentTarget.parentElement!.getBoundingClientRect();
                        const scrollTop = scrollRef.current?.scrollTop || 0;
                        const clickY = e.clientY - rect.top + scrollTop;
                        const clickedHour = Math.floor(clickY / HOUR_HEIGHT);
                        const clickedTime = new Date(day);
                        clickedTime.setHours(clickedHour, 0, 0, 0);
                        onTimeClick && onTimeClick(clickedTime);
                      }}
                    />
                  ))}
                  {(() => {
                    const dayStart = new Date(day);
                    dayStart.setHours(0, 0, 0, 0);
                    const dayEnd = new Date(day);
                    dayEnd.setDate(dayEnd.getDate() + 1);
                    const events = getEvents ? getEvents(dayStart, dayEnd) : [];
                    const dayEvents = events.filter((e) => {
                      const eventDate = new Date(e.start);
                      return eventDate.toDateString() === day.toDateString();
                    });

                    const ghostEventForDay =
                      ghostEvent &&
                      ghostEvent.start.toDateString() === day.toDateString()
                        ? ghostEvent
                        : null;

                    const allEvents = ghostEventForDay
                      ? [
                          ...dayEvents,
                          {
                            ...ghostEventForDay,
                            id: `ghost-${ghostEventForDay.id}`,
                          },
                        ]
                      : dayEvents;

                    const sorted = [...allEvents].sort(
                      (a, b) => a.start.getTime() - b.start.getTime(),
                    );
                    const columns: (typeof allEvents)[] = [];

                    for (const event of sorted) {
                      let placed = false;
                      for (let i = 0; i < columns.length; i++) {
                        const lastInColumn = columns[i][columns[i].length - 1];
                        if (
                          event.start.getTime() >= lastInColumn.end.getTime()
                        ) {
                          columns[i].push(event);
                          placed = true;
                          break;
                        }
                      }
                      if (!placed) {
                        columns.push([event]);
                      }
                    }

                    return sorted.map((event) => {
                      let columnIndex = 0;
                      for (let i = 0; i < columns.length; i++) {
                        if (columns[i].includes(event)) {
                          columnIndex = i;
                          break;
                        }
                      }
                      const totalColumns = columns.length;
                      const width = 100 / totalColumns;
                      const left = (columnIndex / totalColumns) * 100;
                      const top =
                        ((event.start.getHours() * 60 +
                          event.start.getMinutes()) /
                          60) *
                        HOUR_HEIGHT;
                      const height = Math.max(
                        30,
                        ((event.end.getHours() * 60 +
                          event.end.getMinutes() -
                          event.start.getHours() * 60 -
                          event.start.getMinutes()) /
                          60) *
                          HOUR_HEIGHT,
                      );
                      const isGhost = event.id.startsWith("ghost-");
                      const displayEvent =
                        isGhost && ghostEventForDay ? ghostEventForDay : event;

                      return (
                        <div
                          key={event.id}
                          className={`${styles.event} ${isGhost ? styles.ghostEvent : ""}`}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            width: `calc(${width}% - 4px)`,
                            left: `calc(${left}% + 2px)`,
                            backgroundColor: displayEvent.color || "#007bff",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick && onEventClick(displayEvent);
                          }}
                        >
                          <div className={styles.eventTitle}>
                            {displayEvent.title}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
