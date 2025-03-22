
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Event } from "@/types/eventTypes";
import { loadEvents, saveEvents } from "@/utils/storageUtils";

interface EventContextType {
  events: Event[];
  loading: boolean;
  getEvent: (id: string) => Event | undefined;
  getEventFeedback: (eventId: string) => any[];
  createEvent: (event: Omit<Event, "id" | "feedbackCount" | "averageRating">) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Load events on initial mount
  useEffect(() => {
    // Simulate API fetch with a delay
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const loadedEvents = loadEvents();
        setEvents(loadedEvents);
      } catch (error) {
        console.error("Error loading event data:", error);
        toast.error("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Update local storage whenever events change
  useEffect(() => {
    if (!loading && events.length > 0) {
      saveEvents(events);
    }
  }, [events, loading]);

  // Get event by ID
  const getEvent = (id: string) => {
    return events.find((event) => event.id === id);
  };

  // Get feedback for a specific event - this is now delegated to FeedbackContext
  const getEventFeedback = (eventId: string) => {
    // This will be empty as the real implementation is in FeedbackContext
    return [];
  };

  // Create new event
  const createEvent = (eventData: Omit<Event, "id" | "feedbackCount" | "averageRating">) => {
    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}`,
      feedbackCount: 0,
      averageRating: 0,
    };
    
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    toast.success("Event created successfully!");
  };

  // Update existing event
  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, ...updates } : event
      )
    );
    
    toast.success("Event updated successfully!");
  };

  // Delete event
  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    // Note: deletion of related feedback is managed by FeedbackContext
    toast.success("Event deleted successfully!");
  };

  const value = {
    events,
    loading,
    getEvent,
    getEventFeedback,
    createEvent,
    updateEvent,
    deleteEvent,
    setEvents,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
