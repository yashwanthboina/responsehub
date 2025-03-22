
// Define shared types for events and feedback
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

// Mock data for events
export const MOCK_EVENTS: Event[] = [
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
export const MOCK_FEEDBACK: Feedback[] = [
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
