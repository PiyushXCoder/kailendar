export enum KAILENDAR_VIEWS {
  YEAR = "year",
  MONTH = "month",
  MONTH_MINI = "month-mini",
  WEEK = "week",
  DAY = "day",
}

export const KAILENDAR_VIEWS_ARR = Object.values(KAILENDAR_VIEWS);

export type KailendarView = (typeof KAILENDAR_VIEWS_ARR)[number];

export const DAYS_OF_WEEK = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

// Timeline constants
export const HOUR_HEIGHT = 60;
export const START_HOUR = 0;
export const END_HOUR = 24;
