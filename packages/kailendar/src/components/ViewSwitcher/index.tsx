import styles from "./styles.module.scss";

interface ViewSwitcherProps {
  view: "day" | "week" | "month" | "year";
  onViewChange: (view: "day" | "week" | "month" | "year") => void;
}

const VIEWS: { value: "day" | "week" | "month" | "year"; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

export default function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className={styles.viewSwitcher}>
      {VIEWS.map((v) => (
        <button
          key={v.value}
          className={`${styles.viewButton} ${view === v.value ? styles.active : ""}`}
          onClick={() => onViewChange(v.value)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}