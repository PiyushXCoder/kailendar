import MiniMonthView from "./MiniMonthView";
import type { KailendarConfig } from "../utils/types";
import { KAILENDAR_VIEWS } from "../utils/constants";
import YearView from "./YearView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import CommonHeader from "../components/CommonHeader";
import styles from "./styles.module.scss";

export type { KailendarConfig as KailendarProps };

export default function Kailendar({
  view,
  setView,
  showHeader = true,
  currentDate,
  setCurrentDate,
  getEvents = () => [],
  ghostEvent,
  onEventClick,
  onTimeClick,
  onDayClick,
  onDayDoubleClick,
}: KailendarConfig) {
  return (
    <div className={styles.kailendar}>
      {showHeader && (
        <CommonHeader
          view={view}
          setView={setView}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}

      <div className={styles.content}>
        {view === KAILENDAR_VIEWS.MONTH && (
          <MonthView
            currentDate={currentDate}
            getEvents={getEvents}
            ghostEvent={ghostEvent}
            onEventClick={onEventClick}
            onDayClick={onDayClick}
            onDayDoubleClick={onDayDoubleClick}
          />
        )}

        {view === KAILENDAR_VIEWS.WEEK && (
          <WeekView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            getEvents={getEvents}
            ghostEvent={ghostEvent}
            showHeader={false}
            onEventClick={onEventClick}
            onTimeClick={onTimeClick}
          />
        )}

        {view === KAILENDAR_VIEWS.DAY && (
          <DayView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            getEvents={getEvents}
            ghostEvent={ghostEvent}
            showHeader={false}
            onTimeClick={onTimeClick}
            onEventClick={onEventClick}
          />
        )}

        {view === KAILENDAR_VIEWS.YEAR && (
          <YearView
            currentDate={currentDate}
            onDayClick={onDayClick}
            onDayDoubleClick={onDayDoubleClick}
            getEvents={getEvents}
            ghostEvent={ghostEvent}
            selectedDate={currentDate}
            onSelectDate={setCurrentDate}
          />
        )}

        {view === KAILENDAR_VIEWS.MONTH_MINI && (
          <MiniMonthView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onDayClick={onDayClick}
            getEvents={getEvents}
            ghostEvent={ghostEvent}
            selectedDate={currentDate}
            onSelectDate={setCurrentDate}
          />
        )}
      </div>
    </div>
  );
}
