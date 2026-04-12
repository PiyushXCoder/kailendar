import MiniMonthView from "./MiniMonthView";
import type { KailendarConfig } from "../utils/types";

export default function Kailendar(props: KailendarConfig) {
  return (
    <div>
      {props.view}

      <MiniMonthView
        currentDate={props.currentDate}
        setCurrentDate={props.setCurrentDate}
        onDayClick={(date) => {
          console.log("Clicked date:", date);
        }}
        getEvents={props.getEvents}
      />
    </div>
  );
}
