import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Calendar, Star } from "lucide-react";
import { Event } from "@/types/eventTypes";
import RatingStars from "./RatingStars";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, className = "" }) => {
  const eventStartDate = new Date(event.startDate);
  const eventEndDate = new Date(event.endDate);
  const now = new Date();
  
  const getStatusBadge = () => {
    switch (event.status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "archived":
        return <Badge variant="secondary" className="bg-gray-300 hover:bg-gray-400">Archived</Badge>;
      default:
        return null;
    }
  };
  
  const getTimeDescription = () => {
    if (event.status === "upcoming") {
      return `Starts ${formatDistanceToNow(eventStartDate, { addSuffix: true })}`;
    } else if (event.status === "active") {
      if (eventEndDate > now) {
        return `Ends ${formatDistanceToNow(eventEndDate, { addSuffix: true })}`;
      } else {
        return "Happening now";
      }
    } else if (event.status === "completed") {
      return `Ended ${formatDistanceToNow(eventEndDate, { addSuffix: true })}`;
    }
    return "";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className={`glass-card overflow-hidden rounded-lg ${className} hover-scale`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/events/${event.id}`}>
        <div className="relative">
          <img
            src={event.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"}
            alt={event.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            {getStatusBadge()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={16} className="mr-2" />
              <span>
                {formatDate(eventStartDate)}
                {event.endDate &&
                  eventStartDate.toDateString() !== eventEndDate.toDateString() &&
                  ` - ${formatDate(eventEndDate)}`}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={16} className="mr-2" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.feedbackCount > 0 && (
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <RatingStars rating={event.averageRating} size="sm" />
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    ({event.averageRating.toFixed(1)})
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {event.feedbackCount} reviews
                </span>
              </div>
            )}
            <div className="mt-2 text-xs text-primary font-medium">
              {getTimeDescription()}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
