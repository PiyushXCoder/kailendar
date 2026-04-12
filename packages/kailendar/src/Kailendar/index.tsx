import MiniMonthView from "./MiniMonthView";
import type { KailendarConfig } from "../utils/types";
import { KAILENDAR_VIEWS } from "../utils/constants";
import YearView from "./YearView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import CommonHeader from "../components/CommonHeader";

export type { KailendarConfig as KailendarProps };

export default function Kailendar({
  view,
  setView,
  showHeader = true,
  currentDate,
  setCurrentDate,
  getEvents = () => [],
}: KailendarConfig) {
  return (
    <div>
      {showHeader && (
        <CommonHeader
          view={view}
          setView={setView}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}

      {view === KAILENDAR_VIEWS.MONTH && (
        <MonthView
          currentDate={currentDate}
          getEvents={getEvents}
          onEventClick={(event) => {
            console.log("Clicked event:", event);
          }}
          onDayClick={(date) => {
            console.log("Clicked day:", date);
          }}
        />
      )}

      {view === KAILENDAR_VIEWS.WEEK && (
        <WeekView
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          getEvents={getEvents}
          showHeader={false}
          onEventClick={(event) => {
            console.log("Clicked event:", event);
          }}
          onTimeClick={(time) => {
            console.log("Clicked time:", time);
          }}
        />
      )}

      {view === KAILENDAR_VIEWS.DAY && (
        <DayView
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          getEvents={getEvents}
          showHeader={false}
          onTimeClick={(time) => {
            console.log("Clicked time:", time);
          }}
          onEventClick={(event) => {
            console.log("Clicked event:", event);
          }}
        />
      )}

      {view === KAILENDAR_VIEWS.YEAR && (
        <YearView
          currentDate={currentDate}
          onDayClick={(date) => {
            console.log("Clicked date:", date);
          }}
          getEvents={getEvents}
          selectedDate={currentDate}
          onSelectDate={setCurrentDate}
        />
      )}

      {view === KAILENDAR_VIEWS.MONTH_MINI && (
        <MiniMonthView
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onDayClick={(date) => {
            console.log("Clicked date:", date);
          }}
          getEvents={getEvents}
          selectedDate={currentDate}
          onSelectDate={setCurrentDate}
        />
      )}
    </div>
  );
}
