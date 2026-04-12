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
import {
  KailendarView,
  KAILENDAR_VIEWS,
  KAILENDAR_VIEWS_ARR,
} from "../../utils/constants";
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
        <select
          className={styles.viewSelector}
          value={view}
          onChange={(e) => setView(e.target.value as KailendarView)}
        >
          {KAILENDAR_VIEWS_ARR.filter(
            (v) => v != KAILENDAR_VIEWS.MONTH_MINI,
          ).map((v) => (
            <option key={v} value={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </option>
          ))}
        </select>
        <button className={styles.navButton} onClick={goToPrev}>
          {"<"}
        </button>
        <button className={styles.todayButton} onClick={goToToday}>
          Today
        </button>
        <button className={styles.navButton} onClick={goToNext}>
          {">"}
        </button>
      </div>
    </div>
  );
}
