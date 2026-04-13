import { KailendarView } from "./constants.ts";

export interface Event {
  id: string;
  title: string;
  color: string;
  start: Date;
  end: Date;
  others?: Record<string, string | number | boolean | Date>;
  addEvent?: (event: Event) => void;
  updateEvent?: (event: Event) => void;
}

export interface KailendarConfig {
  view: KailendarView;
  setView: (view: KailendarView) => void;
  showHeader?: boolean;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  getEvents?: (start: Date, end: Date) => Event[];
  showViewSwitcher?: boolean;
  ghostEvent?: Event;
  onEventClick?: (event: Event) => void;
  onTimeClick?: (time: Date) => void;
  onDayClick?: (date: Date) => void;
}
