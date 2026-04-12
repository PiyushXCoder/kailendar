import { Kailendar, type Event } from "kailendar";
import { useState } from "react";

const colors = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const mockEvents: Event[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Event ${i + 1}`,
    color: colors[i % colors.length],
    start: new Date(2026, 3, i + 1, 10, 0),
    end: new Date(2026, 3, i + 1, 11, 0),
  })),
  {
    id: "31",
    title: "Planning Session",
    color: "#ef4444",
    start: new Date(2026, 3, 12, 10, 0),
    end: new Date(2026, 3, 12, 12, 0),
  },
  {
    id: "32",
    title: "Design Review",
    color: "#8b5cf6",
    start: new Date(2026, 3, 12, 11, 0),
    end: new Date(2026, 3, 12, 13, 0),
  },
  {
    id: "33",
    title: "Team Sync",
    color: "#8b5cf6",
    start: new Date(2026, 3, 12, 15, 0),
    end: new Date(2026, 3, 12, 16, 0),
  },
  {
    id: "34",
    title: "Code Review",
    color: "#ec4899",
    start: new Date(2026, 3, 15, 11, 0),
    end: new Date(2026, 3, 15, 12, 0),
  },
  {
    id: "35",
    title: "Sprint Planning",
    color: "#10b981",
    start: new Date(2026, 3, 15, 14, 0),
    end: new Date(2026, 3, 15, 15, 0),
  },
];

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month-mini");

  const getEvents = (start: Date, end: Date): Event[] => {
    return mockEvents.filter(
      (event) => event.start >= start && event.start <= end,
    );
  };

  return (
    <div>
      <Kailendar
        view={view}
        setView={setView}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        getEvents={getEvents}
      />
    </div>
  );
}

export default App;
