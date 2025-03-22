
// Event type definition
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  imageUrl?: string;
  status: "active" | "upcoming" | "completed" | "archived";
  feedbackCount: number;
  averageRating: number;
}

// Feedback type definition
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

// Mock events data
export const MOCK_EVENTS: Event[] = [
  {
    id: "event_1",
    title: "Annual Tech Conference 2023",
    description:
      "Join us for the biggest tech conference of the year. Featuring keynotes from industry leaders, hands-on workshops, and networking opportunities.",
    startDate: "2023-11-15T09:00:00",
    endDate: "2023-11-17T18:00:00",
    location: "San Francisco Convention Center",
    organizer: "TechEvents Inc.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    status: "completed",
    feedbackCount: 24,
    averageRating: 4.2,
  },
  {
    id: "event_2",
    title: "Product Management Workshop",
    description:
      "A hands-on workshop for product managers to enhance their skills in roadmapping, user research, and agile methodologies.",
    startDate: "2023-12-10T10:00:00",
    endDate: "2023-12-10T16:00:00",
    location: "Innovation Hub, New York",
    organizer: "PM Academy",
    imageUrl: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop",
    status: "active",
    feedbackCount: 12,
    averageRating: 4.7,
  },
  {
    id: "event_3",
    title: "Design Systems Symposium",
    description:
      "Explore the latest trends and best practices in design systems. Learn from leading design teams about building scalable and consistent user experiences.",
    startDate: "2024-01-20T09:30:00",
    endDate: "2024-01-21T17:00:00",
    location: "Design Center, Austin",
    organizer: "DesignOps Coalition",
    imageUrl: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1974&auto=format&fit=crop",
    status: "upcoming",
    feedbackCount: 0,
    averageRating: 0,
  },
  {
    id: "event_4",
    title: "AI & Machine Learning Summit",
    description:
      "Dive deep into the world of artificial intelligence and machine learning. Featuring talks on the latest research, practical applications, and ethical considerations.",
    startDate: "2023-12-05T09:00:00",
    endDate: "2023-12-07T18:00:00",
    location: "Tech Campus, Boston",
    organizer: "AI Research Institute",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    status: "active",
    feedbackCount: 8,
    averageRating: 4.5,
  },
  {
    id: "event_5",
    title: "Women in Tech Leadership Forum",
    description:
      "A forum dedicated to empowering women in technology leadership roles. Featuring keynotes, panel discussions, and networking opportunities.",
    startDate: "2024-02-15T10:00:00",
    endDate: "2024-02-16T17:00:00",
    location: "Leadership Center, Chicago",
    organizer: "Women in Tech Alliance",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop",
    status: "upcoming",
    feedbackCount: 0,
    averageRating: 0,
  },
  {
    id: "event_6",
    title: "Developer Experience Conference",
    description:
      "Focus on improving the developer experience within your organization. Learn about tools, processes, and practices that make developers more productive and happier.",
    startDate: "2023-11-03T09:00:00",
    endDate: "2023-11-04T18:00:00",
    location: "Developer Hub, Seattle",
    organizer: "DevX Community",
    imageUrl: "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?q=80&w=2068&auto=format&fit=crop",
    status: "completed",
    feedbackCount: 18,
    averageRating: 3.8,
  },
];

// Mock feedback data
export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "feedback_1",
    eventId: "event_1",
    userId: "user_1",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Excellent conference! The keynote speakers were inspiring and I learned a lot from the workshops.",
    timestamp: "2023-11-17T19:23:45",
    isAnonymous: false,
  },
  {
    id: "feedback_2",
    eventId: "event_1",
    userId: "user_2",
    userName: "Michael Chen",
    rating: 4,
    comment: "Great event overall. Would have appreciated more networking opportunities, but the content was top-notch.",
    timestamp: "2023-11-17T20:15:32",
    isAnonymous: false,
  },
  {
    id: "feedback_3",
    eventId: "event_1",
    userId: "user_3",
    userName: "Anonymous Attendee",
    rating: 3,
    comment: "The venue was too crowded and the Wi-Fi was spotty. Content was good but logistics need improvement.",
    timestamp: "2023-11-18T09:45:21",
    isAnonymous: true,
  },
  {
    id: "feedback_4",
    eventId: "event_2",
    userId: "user_4",
    userName: "Emily Rodriguez",
    rating: 5,
    comment: "This workshop transformed how I think about product management. Incredibly valuable exercises and discussions.",
    timestamp: "2023-12-10T17:12:05",
    isAnonymous: false,
  },
  {
    id: "feedback_5",
    eventId: "event_2",
    userId: "user_5",
    userName: "David Kim",
    rating: 4,
    comment: "Insightful workshop with practical takeaways. Would have liked more time for the roadmapping exercise.",
    timestamp: "2023-12-10T18:03:45",
    isAnonymous: false,
  },
  {
    id: "feedback_6",
    eventId: "event_4",
    userId: "user_6",
    userName: "Priya Patel",
    rating: 5,
    comment: "Amazing presentations on the latest AI research. The ethical AI panel was particularly thought-provoking.",
    timestamp: "2023-12-05T19:23:12",
    isAnonymous: false,
  },
  {
    id: "feedback_7",
    eventId: "event_4",
    userId: "user_7",
    userName: "Anonymous Participant",
    rating: 4,
    comment: "Great content but some sessions were too technical for beginners. Would suggest having tracks for different skill levels.",
    timestamp: "2023-12-06T10:17:33",
    isAnonymous: true,
  },
  {
    id: "feedback_8",
    eventId: "event_6",
    userId: "user_8",
    userName: "Jason Taylor",
    rating: 3,
    comment: "Some interesting discussions but the event felt disorganized. The tool demonstrations were valuable though.",
    timestamp: "2023-11-04T19:05:27",
    isAnonymous: false,
  },
];
