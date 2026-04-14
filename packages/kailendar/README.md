<p align="center">
  <img src="/docs/cover.png" alt="Kailendar logo" width="900" />
</p>

<h3 align="center">Kailendar</h3>
<p align="center">
  A flexible React calendar component library with multiple views.
</p>

## Overview

**Kailendar** is a React component library that provides a full-featured calendar with five views: **Day**, **Week**, **Month**, **Year**, and **Mini Month**. It ships a single top-level `<Kailendar />` component that handles view switching and navigation, as well as individual view components that can be used standalone.

The `apps/hello` directory contains a demo app that showcases all features of the library.

<p align="center">
  <a href="https://youtu.be/RciKavVdnpQ">
    <img src="/docs/youtube-thumbnail.png" alt="Kailendar demo video" width="400" />
  </a>
  <br>
  <i>Kailendar based calendar app preview</i> 
</p>

## Installation

```bash
npm install kailendar
```

Peer dependencies: `react >= 19.2.4` and `react-dom >= 19.2.4`.

## Quick Start

```tsx
import { Kailendar, KAILENDAR_VIEWS } from "kailendar";
import "kailendar/dist/style.css";
import { useState } from "react";

function App() {
  const [view, setView] = useState(KAILENDAR_VIEWS.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Kailendar
      view={view}
      setView={setView}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      getEvents={(start, end) =>
        myEvents.filter((e) => e.start >= start && e.start <= end)
      }
    />
  );
}
```

## Exports

| Export            | Description                                        |
| ----------------- | -------------------------------------------------- |
| `Kailendar`       | Main component with header and view switching      |
| `MonthView`       | Standalone month grid view                         |
| `WeekView`        | Standalone week timeline view                      |
| `DayView`         | Standalone day timeline view                       |
| `YearView`        | Standalone year overview (12 mini months)          |
| `MiniMonthView`   | Standalone mini month (sidebar style)              |
| `CommonHeader`    | Header with navigation and view switcher           |
| `KAILENDAR_VIEWS` | Enum: `year`, `month`, `month-mini`, `week`, `day` |
| `Event`           | Event interface                                    |
| `KailendarProps`  | Props type for the Kailendar component             |

## Kailendar Props

| Prop               | Type                                  | Default    | Description                                       |
| ------------------ | ------------------------------------- | ---------- | ------------------------------------------------- |
| `view`             | `KailendarView`                       | —          | Current calendar view (required)                  |
| `setView`          | `(view: KailendarView) => void`       | —          | View change handler (required)                    |
| `currentDate`      | `Date`                                | —          | The focused date (required)                       |
| `setCurrentDate`   | `(date: Date) => void`                | —          | Date change handler (required)                    |
| `getEvents`        | `(start: Date, end: Date) => Event[]` | `() => []` | Returns events in a date range                    |
| `showHeader`       | `boolean`                             | `true`     | Show navigation header                            |
| `ghostEvent`       | `Event`                               | —          | A provisional event to display (e.g. during drag) |
| `onEventClick`     | `(event: Event) => void`              | —          | Called when an event is clicked                   |
| `onTimeClick`      | `(time: Date) => void`                | —          | Called when a time slot is clicked (Day/Week)     |
| `onDayClick`       | `(date: Date) => void`                | —          | Called when a day is single-clicked               |
| `onDayDoubleClick` | `(date: Date) => void`                | —          | Called when a day is double-clicked               |

## Event Interface

```ts
interface Event {
  id: string;
  title: string;
  color: string;
  start: Date;
  end: Date;
  others?: Record<string, string | number | boolean | Date>;
}
```

## Standalone Views

Each view can be used independently with its own props:

```tsx
import {
  MonthView,
  WeekView,
  DayView,
  YearView,
  MiniMonthView,
} from "kailendar";
```

See the source for each view's prop interface — they all accept at minimum `currentDate` and `getEvents`, plus view-specific callbacks.

## Demo

```bash
pnpm hello
```

This starts the `hello` demo app where you can interact with all calendar views.
