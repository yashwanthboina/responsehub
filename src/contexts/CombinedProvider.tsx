
import React from "react";
import { EventProvider } from "./EventContext";
import { FeedbackProvider } from "./FeedbackContext";
import { initializeStorage } from "@/utils/storageUtils";

// Initialize storage with mock data if needed
initializeStorage();

export const CombinedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EventProvider>
      <FeedbackProvider>
        {children}
      </FeedbackProvider>
    </EventProvider>
  );
};
