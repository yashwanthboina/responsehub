
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-6 h-6";
      case "md":
      default:
        return "w-5 h-5";
    }
  };

  const containerSizeClass = () => {
    switch (size) {
      case "sm":
        return "gap-0.5";
      case "lg":
        return "gap-2";
      case "md":
      default:
        return "gap-1";
    }
  };

  return (
    <div className={`flex ${containerSizeClass()} ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= (hoverRating || rating);

        return (
          <motion.div
            key={index}
            whileHover={interactive ? { scale: 1.2 } : undefined}
            whileTap={interactive ? { scale: 0.9 } : undefined}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            className={`${interactive ? "cursor-pointer" : ""}`}
          >
            <Star
              className={`${getSizeClass()} ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-gray-300"
              } transition-colors duration-200`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default RatingStars;
