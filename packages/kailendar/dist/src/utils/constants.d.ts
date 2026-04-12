export declare enum KAILENDAR_VIEWS {
    YEAR = "year",
    MONTH = "month",
    MONTH_MINI = "month-mini",
    WEEK = "week",
    DAY = "day"
}
export declare const KAILENDAR_VIEWS_ARR: KAILENDAR_VIEWS[];
export type KailendarView = (typeof KAILENDAR_VIEWS_ARR)[number];
export declare const DAYS_OF_WEEK: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
