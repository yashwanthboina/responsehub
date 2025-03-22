
import { Event, Feedback, MOCK_EVENTS, MOCK_FEEDBACK } from "@/types/eventTypes";

const EVENTS_STORAGE_KEY = "feedbackflow_events";
const FEEDBACK_STORAGE_KEY = "feedbackflow_feedback";
const STORAGE_INITIALIZED_KEY = "feedbackflow_initialized";

// Initialize storage with mock data if not already initialized
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_INITIALIZED_KEY)) {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(MOCK_EVENTS));
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(MOCK_FEEDBACK));
    localStorage.setItem(STORAGE_INITIALIZED_KEY, "true");
    console.log("Storage initialized with mock data");
  }
};

// Load events from localStorage
export const loadEvents = (): Event[] => {
  const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
  return storedEvents ? JSON.parse(storedEvents) : [];
};

// Save events to localStorage
export const saveEvents = (events: Event[]) => {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
};

// Load feedback from localStorage
export const loadFeedback = (): Feedback[] => {
  const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  return storedFeedback ? JSON.parse(storedFeedback) : [];
};

// Save feedback to localStorage
export const saveFeedback = (feedback: Feedback[]) => {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
};
