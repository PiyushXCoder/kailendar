import MiniMonthView from "./MiniMonthView";
import type { KailendarConfig } from "../utils/types";
import YearView from "./YearView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import CommonHeader from "../components/CommonHeader";

export type { KailendarConfig as KailendarProps };

export default function Kailendar(props: KailendarConfig) {
  return (
    <div>
      {props.showHeader && (
        <CommonHeader
          view={props.view}
          setView={props.setView}
          currentDate={props.currentDate}
          setCurrentDate={props.setCurrentDate}
        />
      )}

      <MonthView
        currentDate={props.currentDate}
        getEvents={props.getEvents}
        onEventClick={(event) => {
          console.log("Clicked event:", event);
        }}
        onDayClick={(date) => {
          console.log("Clicked day:", date);
        }}
      />

      <WeekView
        currentDate={props.currentDate}
        setCurrentDate={props.setCurrentDate}
        getEvents={props.getEvents}
        showHeader={false}
        onEventClick={(event) => {
          console.log("Clicked event:", event);
        }}
        onTimeClick={(time) => {
          console.log("Clicked time:", time);
        }}
      />

      <DayView
        currentDate={props.currentDate}
        setCurrentDate={props.setCurrentDate}
        getEvents={props.getEvents}
        onTimeClick={(time) => {
          console.log("Clicked time:", time);
        }}
        onEventClick={(event) => {
          console.log("Clicked event:", event);
        }}
      />

      {/* {props.view === "year" && ( */}
      <YearView
        currentDate={props.currentDate}
        onDayClick={(date) => {
          console.log("Clicked date:", date);
        }}
        getEvents={props.getEvents}
        selectedDate={props.currentDate}
        onSelectDate={props.setCurrentDate}
      />
      {/* )} */}

      {/* {props.view === "month-mini" && ( */}
      <MiniMonthView
        currentDate={props.currentDate}
        setCurrentDate={props.setCurrentDate}
        onDayClick={(date) => {
          console.log("Clicked date:", date);
        }}
        getEvents={props.getEvents}
        selectedDate={props.currentDate}
        onSelectDate={props.setCurrentDate}
      />
      {/* )} */}
    </div>
  );
}
