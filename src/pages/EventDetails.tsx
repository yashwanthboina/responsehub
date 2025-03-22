
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Calendar, MapPin, User, MessageSquare, X } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import RatingStars from "@/components/common/RatingStars";
import FeedbackItem from "@/components/common/FeedbackItem";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, getEventFeedback, submitFeedback } = useEvents();
  const { user, isAuthenticated } = useAuth();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const event = getEvent(id || "");
  const eventFeedback = getEventFeedback(id || "");
  
  // Redirect if event doesn't exist
  if (!event) {
    navigate("/events");
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };
  
  const getStatusLabel = () => {
    switch (event.status) {
      case "active":
        return "Active";
      case "upcoming":
        return `Starts ${formatDistanceToNow(new Date(event.startDate), { addSuffix: true })}`;
      case "completed":
        return `Ended ${formatDistanceToNow(new Date(event.endDate), { addSuffix: true })}`;
      case "archived":
        return "Archived";
      default:
        return "";
    }
  };
  
  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    
    if (comment.trim() === "") {
      toast.error("Please provide a comment");
      return;
    }
    
    if (!isAuthenticated && guestName.trim() === "") {
      toast.error("Please provide your name");
      return;
    }
    
    submitFeedback({
      eventId: event.id,
      userId: isAuthenticated ? user?.id : null,
      userName: isAuthenticated ? user?.username : guestName,
      rating,
      comment,
      isAnonymous,
    });
    
    setFeedbackSubmitted(true);
    setShowFeedbackForm(false);
    
    // Reset form
    setRating(5);
    setComment("");
    setIsAnonymous(false);
    setGuestName("");
  };
  
  const toggleFeedbackForm = () => {
    if (feedbackSubmitted) {
      toast.info("You've already submitted feedback for this event");
      return;
    }
    setShowFeedbackForm(!showFeedbackForm);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/events")}
            className="mb-4"
          >
            ← Back to Events
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2">
              <div className="glass-panel rounded-lg overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <img
                    src={event.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white">
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {event.title}
                      </h1>
                      <div className="flex items-center text-sm">
                        <div className="px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
                          {getStatusLabel()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar size={18} className="mr-2" />
                      <div>
                        <div>{formatDate(event.startDate)}</div>
                        <div className="text-sm text-gray-500">
                          {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin size={18} className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User size={18} className="mr-2" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
                    {event.description}
                  </p>

                  {event.status === "active" && (
                    <Button 
                      onClick={toggleFeedbackForm}
                      disabled={feedbackSubmitted}
                      className={feedbackSubmitted ? "opacity-70" : ""}
                    >
                      <MessageSquare size={16} className="mr-2" />
                      {feedbackSubmitted ? "Feedback Submitted" : "Submit Feedback"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="lg:col-span-1">
              <div className="glass-panel rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Event Feedback</h2>
                
                {event.feedbackCount > 0 ? (
                  <div className="flex items-center mb-4">
                    <RatingStars rating={event.averageRating} size="lg" />
                    <span className="ml-2 text-2xl font-semibold">
                      {event.averageRating.toFixed(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({event.feedbackCount} {event.feedbackCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">
                    No feedback yet. Be the first to provide feedback!
                  </p>
                )}
                
                {event.status === "active" && !feedbackSubmitted && (
                  <Button 
                    onClick={toggleFeedbackForm}
                    className="w-full md:w-auto"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Submit Feedback
                  </Button>
                )}
              </div>

              {eventFeedback.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Recent Feedback</h2>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {eventFeedback.map((feedback) => (
                      <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FeedbackItem feedback={feedback} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showFeedbackForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFeedbackForm(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold">Submit Feedback</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFeedbackForm(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Your Rating
                  </label>
                  <RatingStars
                    rating={rating}
                    size="lg"
                    interactive
                    onChange={setRating}
                  />
                </div>

                {!isAuthenticated && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      placeholder="Enter your name"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Your Feedback
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this event..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                  />
                  <label
                    htmlFor="anonymous"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Submit anonymously
                  </label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFeedbackForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitFeedback}>
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default EventDetails;
