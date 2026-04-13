import { Kailendar, MiniMonthView, type Event, KAILENDAR_VIEWS } from "kailendar";
import { useState, useCallback } from "react";
import { format, addHours, startOfDay } from "date-fns";
import { colors, generateMockEvents } from "./data";
import "./styles.css";

type KailendarView = (typeof KAILENDAR_VIEWS)[keyof typeof KAILENDAR_VIEWS];

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (eventId: string) => void;
  isNew: boolean;
}

function EventModal({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
  isNew,
}: EventModalProps) {
  const [title, setTitle] = useState(event?.title || "");
  const [color, setColor] = useState(event?.color || colors[0]);
  const [startDate, setStartDate] = useState(event ? format(event.start, "yyyy-MM-dd") : "");
  const [startTime, setStartTime] = useState(event ? format(event.start, "HH:mm") : "");
  const [endDate, setEndDate] = useState(event ? format(event.end, "yyyy-MM-dd") : "");
  const [endTime, setEndTime] = useState(event ? format(event.end, "HH:mm") : "");

  if (!isOpen || !event) return null;

  const handleSave = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    onSave({
      ...event,
      title,
      color,
      start,
      end,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isNew ? "New Event" : "Edit Event"}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
            />
          </div>
          <div className="form-group">
            <label className="label">Color</label>
            <div className="color-picker">
              {colors.map((c) => (
                <button
                  key={c}
                  className="color-button"
                  style={{
                    backgroundColor: c,
                    border: color === c ? "3px solid #000" : "3px solid transparent",
                  }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="label">Start</label>
              <input
                className="input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className="input"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label">End</label>
              <input
                className="input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                className="input"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {!isNew && (
            <button
              className="button delete-button"
              onClick={() => {
                onDelete(event.id);
                onClose();
              }}
            >
              Delete
            </button>
          )}
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<KailendarView>(KAILENDAR_VIEWS.WEEK);
  const [events, setEvents] = useState<Event[]>(() => generateMockEvents());
  const [ghostEvent, setGhostEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);

  const getEvents = useCallback(
    (start: Date, end: Date): Event[] => {
      return events.filter(
        (event) => event.start >= start && event.start <= end
      );
    },
    [events]
  );

  const handleTimeClick = useCallback((time: Date) => {
    const endTime = addHours(time, 1);
    const newEvent: Event = {
      id: `temp-${Date.now()}`,
      title: "New Event",
      color: colors[0],
      start: time,
      end: endTime,
    };
    setGhostEvent(newEvent);
    setSelectedEvent(newEvent);
    setIsNewEvent(true);
    setIsModalOpen(true);
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    const dayStart = startOfDay(date);
    const startTime = new Date(dayStart.setHours(9, 0, 0, 0));
    const endTime = new Date(dayStart.setHours(10, 0, 0, 0));
    const newEvent: Event = {
      id: `temp-${Date.now()}`,
      title: "New Event",
      color: colors[0],
      start: startTime,
      end: endTime,
    };
    setGhostEvent(newEvent);
    setSelectedEvent(newEvent);
    setIsNewEvent(true);
    setIsModalOpen(true);
  }, []);

  const handleEventClick = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsNewEvent(false);
    setIsModalOpen(true);
  }, []);

  const handleSaveEvent = useCallback(
    (event: Event) => {
      if (isNewEvent) {
        const newEvent = {
          ...event,
          id: `${Date.now()}`,
        };
        setEvents((prev) => [...prev, newEvent]);
        setGhostEvent(null);
      } else {
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? event : e))
        );
      }
    },
    [isNewEvent]
  );

  const handleDeleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setGhostEvent(null);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setGhostEvent(null);
  }, []);

  return (
    <div className="app">
      <div className="sidebar">
        <button
          className="create-button"
          onClick={() => {
            const now = new Date();
            const startTime = new Date(now.setHours(9, 0, 0, 0));
            const endTime = new Date(now.setHours(10, 0, 0, 0));
            const newEvent: Event = {
              id: `temp-${Date.now()}`,
              title: "New Event",
              color: colors[0],
              start: startTime,
              end: endTime,
            };
            setGhostEvent(newEvent);
            setSelectedEvent(newEvent);
            setIsNewEvent(true);
            setIsModalOpen(true);
          }}
        >
          + Create
        </button>
        <MiniMonthView
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onDayClick={(date) => {
            setCurrentDate(date);
            setView(KAILENDAR_VIEWS.DAY);
          }}
          getEvents={getEvents}
          selectedDate={currentDate}
          onSelectDate={(date) => {
            setCurrentDate(date);
          }}
        />
      </div>
      <div className="main">
        <Kailendar
          view={view}
          setView={setView}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          getEvents={getEvents}
          ghostEvent={ghostEvent || undefined}
          onEventClick={handleEventClick}
          onTimeClick={handleTimeClick}
          onDayClick={handleDayClick}
          showHeader={true}
        />
      </div>
      <EventModal
        key={selectedEvent?.id || "new"}
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        isNew={isNewEvent}
      />
    </div>
  );
}

export default App;
