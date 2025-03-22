
import { Event, Feedback, MOCK_EVENTS, MOCK_FEEDBACK } from "@/types/eventTypes";

// Storage keys
const EVENTS_STORAGE_KEY = "feedbackflow_events";
const FEEDBACK_STORAGE_KEY = "feedbackflow_feedback";

// Load events from localStorage or use mock data
export const loadEvents = (): Event[] => {
  try {
    const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
    return storedEvents ? JSON.parse(storedEvents) : MOCK_EVENTS;
  } catch (error) {
    console.error("Error loading events from localStorage:", error);
    return MOCK_EVENTS;
  }
};

// Save events to localStorage
export const saveEvents = (events: Event[]): void => {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events to localStorage:", error);
  }
};

// Load feedback from localStorage or use mock data
export const loadFeedback = (): Feedback[] => {
  try {
    const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return storedFeedback ? JSON.parse(storedFeedback) : MOCK_FEEDBACK;
  } catch (error) {
    console.error("Error loading feedback from localStorage:", error);
    return MOCK_FEEDBACK;
  }
};

// Save feedback to localStorage
export const saveFeedback = (feedback: Feedback[]): void => {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
  } catch (error) {
    console.error("Error saving feedback to localStorage:", error);
  }
};

// Initialize storage with mock data if empty
export const initializeStorage = (): void => {
  if (!localStorage.getItem(EVENTS_STORAGE_KEY)) {
    saveEvents(MOCK_EVENTS);
  }
  
  if (!localStorage.getItem(FEEDBACK_STORAGE_KEY)) {
    saveFeedback(MOCK_FEEDBACK);
  }
};
