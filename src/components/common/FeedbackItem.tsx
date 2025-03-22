
import React from "react";
import { formatDistanceToNow } from "date-fns";
import RatingStars from "./RatingStars";
import { Feedback } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackItemProps {
  feedback: Feedback;
  onDelete?: (id: string) => void;
  className?: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  feedback,
  onDelete,
  className = "",
}) => {
  const { isAdmin } = useAuth();
  const date = new Date(feedback.timestamp);

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4 ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mr-3">
            {feedback.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-medium">
              {feedback.userName}
              {feedback.isAnonymous && (
                <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                  Anonymous
                </span>
              )}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(date, { addSuffix: true })}
            </p>
          </div>
        </div>
        
        {isAdmin && onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            onClick={() => onDelete(feedback.id)}
          >
            <Trash size={16} />
          </Button>
        )}
      </div>
      
      <div className="mb-2">
        <RatingStars rating={feedback.rating} />
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {feedback.comment}
      </p>
    </div>
  );
};

export default FeedbackItem;
