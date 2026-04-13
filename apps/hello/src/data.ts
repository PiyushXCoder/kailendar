import type { Event } from "kailendar";

export const colors = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export const generateMockEvents = (): Event[] => [
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
