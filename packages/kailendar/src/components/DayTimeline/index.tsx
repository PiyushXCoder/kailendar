import { useMemo, useState, useEffect } from "react";
import {
  format,
  startOfDay,
  differenceInMinutes,
  isSameDay,
  getHours,
  getMinutes,
  addDays,
} from "date-fns";
import styles from "./styles.module.scss";
import { Event } from "../../utils/types";

interface DayTimelineProps {
  currentDate: Date;
  setCurrentDate?: (date: Date) => void;
  onTimeClick?: (time: Date) => void;
  onEventClick?: (event: Event) => void;
  getEvents?: (start: Date, end: Date) => Event[];
}

const HOUR_HEIGHT = 60;
const START_HOUR = 0;
const END_HOUR = 24;

export default function DayTimeline({
  currentDate,
  setCurrentDate,
  getEvents,
  onEventClick,
  onTimeClick,
}: DayTimelineProps) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dayStart = startOfDay(currentDate);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const isCurrentDay = isSameDay(currentDate, now);
  const currentTimeTop = isCurrentDay
    ? ((getHours(now) * 60 + getMinutes(now)) / 60) * HOUR_HEIGHT
    : -1;

  const events = getEvents ? getEvents(dayStart, dayEnd) : [];
  const dayEvents = useMemo(
    () => events.filter((e) => isSameDay(e.start, currentDate)),
    [events, currentDate],
  );

  const eventPositions = useMemo(() => {
    const sorted = [...dayEvents].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    );
    const columns: Event[][] = [];

    for (const event of sorted) {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        const lastInColumn = columns[i][columns[i].length - 1];
        if (event.start.getTime() >= lastInColumn.end.getTime()) {
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
        (differenceInMinutes(event.start, dayStart) / 60) * HOUR_HEIGHT;
      const height = Math.max(
        30,
        (differenceInMinutes(event.end, event.start) / 60) * HOUR_HEIGHT,
      );
      return { event, width, left, top, height };
    });
  }, [dayEvents, dayStart]);

  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i,
  );

  return (
    <div className={styles.dayView}>
      <div className={styles.header}>
        <div className={styles.title}>{format(currentDate, "EEE d")}</div>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() => {
              setCurrentDate && setCurrentDate(addDays(currentDate, -1));
            }}
          >
            {"<"}
          </button>
          <button className={`${styles.navButton} ${styles.todayButton}`}>
            {format(currentDate, "EEE d")}
          </button>
          <button
            className={styles.navButton}
            onClick={() => {
              setCurrentDate && setCurrentDate(addDays(currentDate, 1));
            }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div
        className={styles.content}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const clickedHour = Math.floor(clickY / HOUR_HEIGHT);
          const clickedTime = new Date(dayStart);
          clickedTime.setHours(clickedHour, 0, 0, 0);
          onTimeClick && onTimeClick(clickedTime);
        }}
      >
        <div className={styles.timeColumn}>
          <div key={-1} className={styles.timeLabel}></div>
          {hours.slice(1).map((hour) => (
            <div key={hour} className={styles.timeLabel}>
              {format(new Date().setHours(hour, 0), "h a")}
            </div>
          ))}
        </div>
        <div className={styles.eventsColumn}>
          {hours.map((hour) => (
            <div key={hour} className={styles.hourSlot} />
          ))}
          {eventPositions.map(({ event, width, left, top, height }) => (
            <div
              key={event.id}
              className={styles.event}
              style={{
                top: `${top}px`,
                height: `${height}px`,
                width: `calc(${width}% - 20px)`,
                left: `calc(${left}% + 4px)`,
                backgroundColor: event.color || "#007bff",
                color: "#fff",
              }}
              onClick={() => onEventClick && onEventClick(event)}
            >
              <div className={styles.eventTitle}>{event.title}</div>
              <div className={styles.eventTime}>
                {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
              </div>
            </div>
          ))}
          {isCurrentDay && currentTimeTop >= 0 && (
            <div
              className={styles.currentTimeLine}
              style={{ top: `${currentTimeTop}px` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
