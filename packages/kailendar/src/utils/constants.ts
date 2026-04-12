export const KAILENDAR_VIEWS = [
  "year",
  "month",
  "month-mini",
  "week",
  "day",
] as const;

export type KailendarView = (typeof KAILENDAR_VIEWS)[number];

export const DAYS_OF_WEEK = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
