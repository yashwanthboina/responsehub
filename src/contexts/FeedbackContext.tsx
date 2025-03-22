
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Feedback } from "@/types/eventTypes";
import { loadFeedback, saveFeedback } from "@/utils/storageUtils";
import { useEvents } from "@/contexts/EventContext";

interface FeedbackContextType {
  feedback: Feedback[];
  loading: boolean;
  submitFeedback: (feedback: Omit<Feedback, "id" | "timestamp">) => void;
  getEventFeedback: (eventId: string) => Feedback[];
  deleteFeedback: (id: string) => void;
  deleteFeedbackByEventId: (eventId: string) => void;
  setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const { events, updateEvent } = useEvents();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const loadedFeedback = loadFeedback();
        setFeedback(loadedFeedback);
      } catch (error) {
        console.error("Error loading feedback data:", error);
        toast.error("Failed to load feedback data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && feedback.length > 0) {
      saveFeedback(feedback);
    }
  }, [feedback, loading]);

  const submitFeedback = (feedbackData: Omit<Feedback, "id" | "timestamp">) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setFeedback((prev) => [...prev, newFeedback]);
    
    const event = events.find(e => e.id === feedbackData.eventId);
    if (event) {
      const eventFeedback = [...feedback, newFeedback].filter(
        (f) => f.eventId === event.id
      );
      const totalRating = eventFeedback.reduce((sum, f) => sum + f.rating, 0);
      const averageRating = totalRating / eventFeedback.length;
      
      updateEvent(event.id, {
        feedbackCount: eventFeedback.length,
        averageRating: parseFloat(averageRating.toFixed(1)),
      });
    }
    
    toast.success("Feedback submitted successfully!");
  };

  const getEventFeedback = (eventId: string) => {
    return feedback.filter((item) => item.eventId === eventId);
  };

  const deleteFeedback = (id: string) => {
    const feedbackToDelete = feedback.find((f) => f.id === id);
    
    if (!feedbackToDelete) return;
    
    setFeedback((prev) => prev.filter((item) => item.id !== id));
    
    const eventId = feedbackToDelete.eventId;
    const event = events.find(e => e.id === eventId);
    
    if (event) {
      const eventFeedback = feedback
        .filter((f) => f.id !== id)
        .filter((f) => f.eventId === event.id);
      
      const totalRating = eventFeedback.reduce((sum, f) => sum + f.rating, 0);
      const averageRating = eventFeedback.length
        ? totalRating / eventFeedback.length
        : 0;
      
      updateEvent(event.id, {
        feedbackCount: eventFeedback.length,
        averageRating: parseFloat(averageRating.toFixed(1)),
      });
    }
    
    toast.success("Feedback deleted successfully!");
  };

  const deleteFeedbackByEventId = (eventId: string) => {
    setFeedback((prev) => prev.filter((item) => item.eventId !== eventId));
  };

  const value = {
    feedback,
    loading,
    submitFeedback,
    getEventFeedback,
    deleteFeedback,
    deleteFeedbackByEventId,
    setFeedback,
  };

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
};

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};
