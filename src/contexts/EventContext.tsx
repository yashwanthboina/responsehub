
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Feedback {
  id: string;
  eventId: string;
  userId: string | null;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
  isAnonymous: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  status: "active" | "upcoming" | "completed" | "archived";
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  imageUrl?: string;
  feedbackCount: number;
  averageRating: number;
}

interface EventContextType {
  events: Event[];
  feedback: Feedback[];
  loading: boolean;
  createEvent: (event: Omit<Event, "id" | "feedbackCount" | "averageRating">) => void;
  updateEvent: (id: string, eventData: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
  submitFeedback: (feedback: Omit<Feedback, "id" | "timestamp">) => void;
  getEventFeedback: (eventId: string) => Feedback[];
  deleteFeedback: (id: string) => void;
}

// Mock data for events
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2023",
    description: "A premier technology conference featuring the latest innovations and industry trends.",
    status: "active",
    startDate: "2023-11-10T09:00:00Z",
    endDate: "2023-11-12T18:00:00Z",
    location: "San Francisco Convention Center",
    organizer: "TechEvents Inc.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    feedbackCount: 24,
    averageRating: 4.5,
  },
  {
    id: "2",
    title: "Design Summit",
    description: "An event dedicated to UI/UX design principles and creative thinking.",
    status: "upcoming",
    startDate: "2023-12-05T10:00:00Z",
    endDate: "2023-12-07T17:00:00Z",
    location: "New York Design Center",
    organizer: "Creative Minds Association",
    imageUrl: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1974&auto=format&fit=crop",
    feedbackCount: 0,
    averageRating: 0,
  },
  {
    id: "3",
    title: "Product Management Workshop",
    description: "Learn effective product management strategies from industry experts.",
    status: "completed",
    startDate: "2023-10-15T09:30:00Z",
    endDate: "2023-10-16T16:30:00Z",
    location: "Chicago Business Hub",
    organizer: "PM Professionals",
    imageUrl: "https://images.unsplash.com/photo-1539786774582-0707ec7a9dd9?q=80&w=1974&auto=format&fit=crop",
    feedbackCount: 35,
    averageRating: 4.2,
  },
  {
    id: "4",
    title: "Marketing Mastery Conference",
    description: "Discover the latest marketing strategies and networking opportunities.",
    status: "active",
    startDate: "2023-11-20T08:00:00Z",
    endDate: "2023-11-21T18:00:00Z",
    location: "Los Angeles Convention Center",
    organizer: "Marketing Pros Alliance",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
    feedbackCount: 12,
    averageRating: 3.9,
  },
  {
    id: "5",
    title: "AI & Machine Learning Summit",
    description: "Exploring the future of AI and its applications across industries.",
    status: "upcoming",
    startDate: "2024-01-10T09:00:00Z",
    endDate: "2024-01-12T17:00:00Z",
    location: "Seattle Tech Campus",
    organizer: "Future Tech Institute",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
    feedbackCount: 0,
    averageRating: 0,
  },
  {
    id: "6",
    title: "Entrepreneurship Forum",
    description: "Connect with successful entrepreneurs and venture capitalists.",
    status: "completed",
    startDate: "2023-09-25T10:00:00Z",
    endDate: "2023-09-27T16:00:00Z",
    location: "Boston Innovation Center",
    organizer: "Startup Foundation",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop",
    feedbackCount: 42,
    averageRating: 4.7,
  },
];

// Mock data for feedback
const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "1",
    eventId: "1",
    userId: "3",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Excellent event! The speakers were knowledgeable and the networking opportunities were valuable.",
    timestamp: "2023-11-10T15:23:00Z",
    isAnonymous: false,
  },
  {
    id: "2",
    eventId: "1",
    userId: null,
    userName: "Anonymous",
    rating: 4,
    comment: "Great content but the venue was a bit crowded.",
    timestamp: "2023-11-10T16:45:00Z",
    isAnonymous: true,
  },
  {
    id: "3",
    eventId: "1",
    userId: "4",
    userName: "Michael Chen",
    rating: 5,
    comment: "Fantastic organization and excellent topics. Looking forward to next year!",
    timestamp: "2023-11-11T09:12:00Z",
    isAnonymous: false,
  },
  {
    id: "4",
    eventId: "3",
    userId: "5",
    userName: "Emily Rodriguez",
    rating: 4,
    comment: "Very informative workshop. Would have liked more hands-on activities.",
    timestamp: "2023-10-15T14:30:00Z",
    isAnonymous: false,
  },
  {
    id: "5",
    eventId: "3",
    userId: null,
    userName: "Anonymous",
    rating: 3,
    comment: "Good information but presentation slides were hard to read.",
    timestamp: "2023-10-15T16:20:00Z",
    isAnonymous: true,
  },
  {
    id: "6",
    eventId: "6",
    userId: "6",
    userName: "David Kim",
    rating: 5,
    comment: "The most valuable networking event I've attended this year. Made several key connections.",
    timestamp: "2023-09-26T11:15:00Z",
    isAnonymous: false,
  },
];

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data with a delay to simulate API fetch
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Check local storage for existing data
        const storedEvents = localStorage.getItem("feedbackflow_events");
        const storedFeedback = localStorage.getItem("feedbackflow_feedback");
        
        if (storedEvents && storedFeedback) {
          setEvents(JSON.parse(storedEvents));
          setFeedback(JSON.parse(storedFeedback));
        } else {
          setEvents(MOCK_EVENTS);
          setFeedback(MOCK_FEEDBACK);
          
          // Store mock data in local storage
          localStorage.setItem("feedbackflow_events", JSON.stringify(MOCK_EVENTS));
          localStorage.setItem("feedbackflow_feedback", JSON.stringify(MOCK_FEEDBACK));
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load events data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Update local storage whenever events or feedback change
  useEffect(() => {
    if (!loading && events.length > 0) {
      localStorage.setItem("feedbackflow_events", JSON.stringify(events));
    }
  }, [events, loading]);

  useEffect(() => {
    if (!loading && feedback.length > 0) {
      localStorage.setItem("feedbackflow_feedback", JSON.stringify(feedback));
    }
  }, [feedback, loading]);

  // Event operations
  const createEvent = (eventData: Omit<Event, "id" | "feedbackCount" | "averageRating">) => {
    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}`,
      feedbackCount: 0,
      averageRating: 0,
    };
    
    setEvents((prev) => [...prev, newEvent]);
    toast.success(`Event "${newEvent.title}" created successfully!`);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...eventData } : event
      )
    );
    toast.success("Event updated successfully!");
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    // Also delete related feedback
    setFeedback((prev) => prev.filter((item) => item.eventId !== id));
    toast.success("Event deleted successfully!");
  };

  const getEvent = (id: string) => {
    return events.find((event) => event.id === id);
  };

  // Feedback operations
  const submitFeedback = (feedbackData: Omit<Feedback, "id" | "timestamp">) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setFeedback((prev) => [...prev, newFeedback]);
    
    // Update event stats
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === feedbackData.eventId) {
          const eventFeedback = [...feedback, newFeedback].filter(
            (f) => f.eventId === event.id
          );
          const totalRating = eventFeedback.reduce((sum, f) => sum + f.rating, 0);
          const averageRating = totalRating / eventFeedback.length;
          
          return {
            ...event,
            feedbackCount: eventFeedback.length,
            averageRating: parseFloat(averageRating.toFixed(1)),
          };
        }
        return event;
      })
    );
    
    toast.success("Feedback submitted successfully!");
  };

  const getEventFeedback = (eventId: string) => {
    return feedback.filter((item) => item.eventId === eventId);
  };

  const deleteFeedback = (id: string) => {
    const feedbackToDelete = feedback.find((f) => f.id === id);
    
    if (!feedbackToDelete) return;
    
    setFeedback((prev) => prev.filter((item) => item.id !== id));
    
    // Update event stats
    const eventId = feedbackToDelete.eventId;
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId) {
          const eventFeedback = feedback
            .filter((f) => f.id !== id)
            .filter((f) => f.eventId === event.id);
          
          const totalRating = eventFeedback.reduce((sum, f) => sum + f.rating, 0);
          const averageRating = eventFeedback.length
            ? totalRating / eventFeedback.length
            : 0;
          
          return {
            ...event,
            feedbackCount: eventFeedback.length,
            averageRating: parseFloat(averageRating.toFixed(1)),
          };
        }
        return event;
      })
    );
    
    toast.success("Feedback deleted successfully!");
  };

  const value = {
    events,
    feedback,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    submitFeedback,
    getEventFeedback,
    deleteFeedback,
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
