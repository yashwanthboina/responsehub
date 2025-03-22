
// Event entity type
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

// Feedback entity type
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

// Mock data for initial application state
export const MOCK_EVENTS: Event[] = [
  {
    id: "event_1",
    title: "Annual Developer Conference",
    description: "Join us for a full day of sessions about the latest tech trends and best practices in web development.",
    status: "active",
    startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    endDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    location: "Tech Center, San Francisco",
    organizer: "WebDev Community",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    feedbackCount: 0,
    averageRating: 0,
  },
  {
    id: "event_2",
    title: "UX/UI Design Workshop",
    description: "A hands-on workshop focusing on the latest design patterns and user experience techniques.",
    status: "upcoming",
    startDate: new Date(Date.now() + 604800000).toISOString(), // Next week
    endDate: new Date(Date.now() + 691200000).toISOString(), // Next week + 1 day
    location: "Design Hub, New York",
    organizer: "UI Designers Guild",
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
    feedbackCount: 0,
    averageRating: 0,
  },
  {
    id: "event_3",
    title: "Mobile App Development Bootcamp",
    description: "An intensive three-day bootcamp for mobile developers looking to level up their skills.",
    status: "completed",
    startDate: new Date(Date.now() - 1209600000).toISOString(), // Two weeks ago
    endDate: new Date(Date.now() - 1036800000).toISOString(), // Two weeks ago + 2 days
    location: "Innovation Campus, Austin",
    organizer: "MobileDev Academy",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    feedbackCount: 12,
    averageRating: 4.5,
  }
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "feedback_1",
    eventId: "event_3",
    userId: "user_1",
    userName: "John Smith",
    rating: 5,
    comment: "Absolutely loved the bootcamp! The instructors were knowledgeable and the content was cutting-edge.",
    timestamp: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    isAnonymous: false,
  },
  {
    id: "feedback_2",
    eventId: "event_3",
    userId: "user_2",
    userName: "Alice Johnson",
    rating: 4,
    comment: "Very informative sessions. Would have loved more hands-on workshops, but overall a great experience.",
    timestamp: new Date(Date.now() - 950400000).toISOString(), // 11 days ago
    isAnonymous: false,
  },
  {
    id: "feedback_3",
    eventId: "event_3",
    userId: null,
    userName: "Anonymous Attendee",
    rating: 4,
    comment: "Great content but the venue was a bit crowded. Looking forward to future events!",
    timestamp: new Date(Date.now() - 1036800000).toISOString(), // 12 days ago
    isAnonymous: true,
  }
];
