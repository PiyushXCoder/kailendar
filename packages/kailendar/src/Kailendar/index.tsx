import MiniMonthView from "./MiniMonthView";
import type { KailendarConfig } from "../utils/types";
import YearView from "./YearView";
import { useState } from "react";

export type { KailendarConfig as KailendarProps };

export default function Kailendar(props: KailendarConfig) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      {/* {props.view === "year" && ( */}
      <YearView
        currentDate={props.currentDate}
        onDayClick={(date) => {
          console.log("Clicked date:", date);
        }}
        getEvents={props.getEvents}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
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
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      {/* )} */}
    </div>
  );
}
