import { format } from "date-fns";
import styles from "./styles.module.scss";

interface TimeColumnProps {
  hours: number[];
}

export default function TimeColumn({ hours }: TimeColumnProps) {
  return (
    <div className={styles.timeColumn}>
      <div key={-1} className={styles.timeLabel}></div>
      {hours.slice(1).map((hour) => (
        <div key={hour} className={styles.timeLabel}>
          {format(new Date().setHours(hour, 0), "h a")}
        </div>
      ))}
    </div>
  );
}