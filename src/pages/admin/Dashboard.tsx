
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  MessageSquare,
  TrendingUp,
  Users,
  Star,
  Activity,
  ArrowRight,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/contexts/EventContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import FeedbackItem from "@/components/common/FeedbackItem";

const Dashboard: React.FC = () => {
  const { events, feedback, loading } = useEvents();
  
  // Count events by status
  const activeEvents = events.filter(event => event.status === "active");
  const upcomingEvents = events.filter(event => event.status === "upcoming");
  const completedEvents = events.filter(event => event.status === "completed");
  
  // Get latest 3 feedback entries
  const latestFeedback = [...feedback]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);
  
  // Calculate stats
  const totalFeedback = feedback.length;
  const averageRating = totalFeedback > 0
    ? parseFloat((feedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback).toFixed(1))
    : 0;
  
  // Prepare data for pie chart
  const statusData = [
    { name: "Active", value: activeEvents.length, color: "#10b981" },
    { name: "Upcoming", value: upcomingEvents.length, color: "#3b82f6" },
    { name: "Completed", value: completedEvents.length, color: "#6b7280" },
  ];
  
  // Prepare data for rating distribution
  const ratingData = Array.from({ length: 5 }, (_, i) => {
    const rating = i + 1;
    return {
      rating: rating.toString(),
      count: feedback.filter(item => item.rating === rating).length,
    };
  });
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <Link to="/admin/events">
            <Button size="sm">
              <CalendarDays size={16} className="mr-2" />
              Manage Events
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Events",
              value: events.length,
              icon: <CalendarDays className="h-5 w-5 text-blue-500" />,
              description: "All time",
            },
            {
              title: "Active Events",
              value: activeEvents.length,
              icon: <Activity className="h-5 w-5 text-green-500" />,
              description: "Currently running",
            },
            {
              title: "Total Feedback",
              value: totalFeedback,
              icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
              description: "Across all events",
            },
            {
              title: "Average Rating",
              value: averageRating,
              icon: <Star className="h-5 w-5 text-yellow-500" />,
              description: "Out of 5 stars",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Events by Status</CardTitle>
                <CardDescription>
                  Distribution of events by their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => 
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>
                  Distribution of feedback ratings across all events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingData}>
                      <XAxis dataKey="rating" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="count" 
                        name="Feedback Count" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Latest Feedback */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex-row justify-between items-center pb-2">
              <div>
                <CardTitle>Latest Feedback</CardTitle>
                <CardDescription>
                  Most recent feedback from attendees
                </CardDescription>
              </div>
              <Link to="/admin/analytics">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse h-24" />
                  ))}
                </div>
              ) : latestFeedback.length > 0 ? (
                <div className="space-y-4">
                  {latestFeedback.map((item) => {
                    const event = events.find(e => e.id === item.eventId);
                    return (
                      <div key={item.id}>
                        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm font-medium rounded-t-lg">
                          {event?.title || "Unknown Event"}
                        </div>
                        <FeedbackItem feedback={item} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No feedback received yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;
