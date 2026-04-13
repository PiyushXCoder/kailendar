import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  subYears,
  addYears,
} from "date-fns";
import { KailendarView, KAILENDAR_VIEWS } from "../../utils/constants";
import ViewSwitcher from "../ViewSwitcher";
import NextIcon from "../../assets/next.svg?react";
import styles from "./styles.module.scss";

interface CommonHeaderProps {
  view: KailendarView;
  setView: (view: KailendarView) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export default function CommonHeader({
  view,
  setView,
  currentDate,
  setCurrentDate,
}: CommonHeaderProps) {
  const goToPrev = () => {
    switch (view) {
      case KAILENDAR_VIEWS.MONTH || KAILENDAR_VIEWS.MONTH_MINI:
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case KAILENDAR_VIEWS.WEEK:
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case KAILENDAR_VIEWS.DAY:
        setCurrentDate(subDays(currentDate, 1));
        break;
      case KAILENDAR_VIEWS.YEAR:
        setCurrentDate(subYears(currentDate, 1));
        break;
    }
  };

  const goToNext = () => {
    switch (view) {
      case KAILENDAR_VIEWS.MONTH || KAILENDAR_VIEWS.MONTH_MINI:
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case KAILENDAR_VIEWS.WEEK:
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case KAILENDAR_VIEWS.DAY:
        setCurrentDate(addDays(currentDate, 1));
        break;
      case KAILENDAR_VIEWS.YEAR:
        setCurrentDate(addYears(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getTitle = () => {
    switch (view) {
      case KAILENDAR_VIEWS.DAY:
        return format(currentDate, "EEEE, MMMM d, yyyy");
      default:
        return format(currentDate, "MMMM yyyy");
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.title}>{getTitle()}</div>
      </div>
      <div className={styles.navigation}>
        <ViewSwitcher
          view={view as "day" | "week" | "month" | "year"}
          onViewChange={(v) => setView(v as any)}
        />
        <button className={styles.navButton} onClick={goToPrev}>
          <NextIcon className={styles.navIcon} />
        </button>
        <button className={styles.todayButton} onClick={goToToday}>
          Today
        </button>
        <button className={styles.navButton} onClick={goToNext}>
          <NextIcon className={`${styles.navIcon} ${styles.nextIcon}`} />
        </button>
      </div>
    </div>
  );
}
