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
import TimeColumn from "../TimeColumn";
import { Event } from "../../utils/types";
import NextIcon from "../../assets/next.svg?react";
import { HOUR_HEIGHT, START_HOUR, END_HOUR } from "../../utils/constants";

interface DayTimelineProps {
  currentDate: Date;
  setCurrentDate?: (date: Date) => void;
  onTimeClick?: (time: Date) => void;
  onEventClick?: (event: Event) => void;
  getEvents?: (start: Date, end: Date) => Event[];
  ghostEvent?: Event;
  showDateSwitchButtons?: boolean;
  showTimeLabels?: boolean;
  showHeader?: boolean;
  scrollable?: boolean;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DayTimeline({
  currentDate,
  setCurrentDate,
  getEvents,
  ghostEvent,
  onEventClick,
  onTimeClick,
  showDateSwitchButtons = true,
  showTimeLabels = true,
  showHeader = true,
  scrollable = true,
  contentRef,
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

  const ghostEventForDay =
    ghostEvent && isSameDay(ghostEvent.start, currentDate) ? ghostEvent : null;

  const eventPositions = useMemo(() => {
    const allEvents = ghostEventForDay
      ? [
          ...dayEvents,
          { ...ghostEventForDay, id: `ghost-${ghostEventForDay.id}` },
        ]
      : dayEvents;
    const sorted = [...allEvents].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    );

    const maxOverlap = (event: Event) => {
      let max = 1;
      for (const other of sorted) {
        if (other === event) continue;
        const overlapStart = Math.max(event.start.getTime(), other.start.getTime());
        const overlapEnd = Math.min(event.end.getTime(), other.end.getTime());
        if (overlapStart < overlapEnd) {
          let count = 0;
          for (const e of sorted) {
            if (Math.max(event.start.getTime(), e.start.getTime()) < Math.min(event.end.getTime(), e.end.getTime())) {
              count++;
            }
          }
          max = Math.max(max, count);
          break;
        }
      }
      return max;
    };

    const getOverlapColumnIndex = (event: Event, totalColumns: number) => {
      if (totalColumns <= 1) return 0;
      const overlapping = sorted.filter(
        (e) =>
          Math.max(event.start.getTime(), e.start.getTime()) <
          Math.min(event.end.getTime(), e.end.getTime()),
      );
      overlapping.sort((a, b) => a.start.getTime() - b.start.getTime());
      return overlapping.indexOf(event);
    };

    return sorted.map((event) => {
      const totalColumns = maxOverlap(event);
      const columnIndex = getOverlapColumnIndex(event, totalColumns);
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
    <div className={styles.dayView} data-scrollable={scrollable}>
      {showHeader && (
        <div className={styles.header}>
          <div className={styles.title}>{format(currentDate, "EEE d")}</div>
          {showDateSwitchButtons && (
            <div className={styles.navigation}>
              <button
                className={styles.navButton}
                onClick={() => {
                  setCurrentDate && setCurrentDate(addDays(currentDate, -1));
                }}
              >
                <NextIcon className={styles.navIcon} />
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
                <NextIcon className={`${styles.navIcon} ${styles.nextIcon}`} />
              </button>
            </div>
          )}
        </div>
      )}
      <div
        ref={contentRef}
        className={styles.content}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const scrollTop = e.currentTarget.scrollTop;
          const clickY = e.clientY - rect.top + scrollTop;
          const clickedHour = Math.floor(clickY / HOUR_HEIGHT);
          const clickedTime = new Date(dayStart);
          clickedTime.setHours(clickedHour, 0, 0, 0);
          onTimeClick && onTimeClick(clickedTime);
        }}
      >
        {showTimeLabels && <TimeColumn hours={hours} />}
        <div className={styles.eventsColumn}>
          {hours.map((hour) => (
            <div key={hour} className={styles.hourSlot} />
          ))}
          {eventPositions.map(({ event, width, left, top, height }) => {
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
                  width: `calc(${width}% - 20px)`,
                  left: `calc(${left}% + 4px)`,
                  backgroundColor: displayEvent.color || "#007bff",
                  color: "#fff",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onEventClick && onEventClick(displayEvent);
                }}
              >
                <div className={styles.eventTitle}>{displayEvent.title}</div>
                <div className={styles.eventTime}>
                  {format(displayEvent.start, "h:mm a")} -{" "}
                  {format(displayEvent.end, "h:mm a")}
                </div>
              </div>
            );
          })}
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
