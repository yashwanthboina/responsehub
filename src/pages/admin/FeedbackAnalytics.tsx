
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Filter,
  Search,
  Star,
  X,
  BarChart3,
  PieChart as PieChartIcon,
  Users,
  ListFilter,
  Trash2,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackItem from "@/components/common/FeedbackItem";
import { useEvents, Feedback } from "@/contexts/EventContext";
import { format, parseISO, startOfDay, isAfter, isBefore, isEqual } from "date-fns";
import { toast } from "sonner";

const FeedbackAnalytics: React.FC = () => {
  const { events, feedback, deleteFeedback } = useEvents();
  
  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [activeTab, setActiveTab] = useState("feedback");
  
  // Selected feedback for deletion
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Apply filters when dependencies change
  useEffect(() => {
    const filtered = feedback.filter((item) => {
      // Filter by event
      if (eventFilter !== "all" && item.eventId !== eventFilter) {
        return false;
      }
      
      // Filter by rating
      if (ratingFilter !== "all" && item.rating !== parseInt(ratingFilter)) {
        return false;
      }
      
      // Filter by date
      if (dateFilter === "custom") {
        if (startDate && endDate) {
          const itemDate = startOfDay(parseISO(item.timestamp));
          const filterStartDate = startOfDay(parseISO(startDate));
          const filterEndDate = startOfDay(parseISO(endDate));
          
          if (
            !(isAfter(itemDate, filterStartDate) || isEqual(itemDate, filterStartDate)) ||
            !(isBefore(itemDate, filterEndDate) || isEqual(itemDate, filterEndDate))
          ) {
            return false;
          }
        }
      } else if (dateFilter !== "all") {
        const today = new Date();
        const itemDate = new Date(item.timestamp);
        
        if (dateFilter === "last7days") {
          const lastWeek = new Date(today);
          lastWeek.setDate(today.getDate() - 7);
          if (itemDate < lastWeek) return false;
        } else if (dateFilter === "last30days") {
          const lastMonth = new Date(today);
          lastMonth.setDate(today.getDate() - 30);
          if (itemDate < lastMonth) return false;
        }
      }
      
      // Filter by search term
      if (searchTerm) {
        const event = events.find((e) => e.id === item.eventId);
        const searchFields = [
          item.userName.toLowerCase(),
          item.comment.toLowerCase(),
          event?.title.toLowerCase() || "",
        ];
        
        return searchFields.some((field) => field.includes(searchTerm.toLowerCase()));
      }
      
      return true;
    });
    
    setFilteredFeedback(filtered);
  }, [feedback, events, searchTerm, eventFilter, ratingFilter, dateFilter, startDate, endDate]);

  // Prepare data for charts
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const rating = i + 1;
    return {
      rating: rating.toString(),
      count: filteredFeedback.filter((item) => item.rating === rating).length,
    };
  });
  
  const eventRatings = events
    .filter((event) => {
      const eventFeedback = filteredFeedback.filter((item) => item.eventId === event.id);
      return eventFeedback.length > 0;
    })
    .map((event) => {
      const eventFeedback = filteredFeedback.filter((item) => item.eventId === event.id);
      const averageRating =
        eventFeedback.reduce((sum, item) => sum + item.rating, 0) / eventFeedback.length;
      
      return {
        event: event.title,
        averageRating: parseFloat(averageRating.toFixed(1)),
        count: eventFeedback.length,
      };
    });
  
  // Group feedback by date for timeline chart
  const feedbackTimeline = filteredFeedback.reduce<{ date: string; count: number }[]>((acc, item) => {
    const date = format(new Date(item.timestamp), "yyyy-MM-dd");
    const existing = acc.find((entry) => entry.date === date);
    
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    
    return acc;
  }, []).sort((a, b) => a.date.localeCompare(b.date));
  
  // Calculate stats
  const averageRating =
    filteredFeedback.length > 0
      ? filteredFeedback.reduce((sum, item) => sum + item.rating, 0) / filteredFeedback.length
      : 0;
      
  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setEventFilter("all");
    setRatingFilter("all");
    setDateFilter("all");
    setStartDate("");
    setEndDate("");
  };
  
  // Handle export to CSV
  const handleExportCSV = () => {
    if (filteredFeedback.length === 0) {
      toast.error("No feedback to export");
      return;
    }
    
    // Prepare CSV data
    const csvData = filteredFeedback.map((item) => {
      const event = events.find((e) => e.id === item.eventId);
      return {
        event: event?.title || "Unknown Event",
        date: format(new Date(item.timestamp), "yyyy-MM-dd HH:mm:ss"),
        userName: item.userName,
        isAnonymous: item.isAnonymous ? "Yes" : "No",
        rating: item.rating,
        comment: item.comment.replace(/"/g, '""'), // Escape quotes
      };
    });
    
    // Create CSV header
    const header = ["Event", "Date", "User", "Anonymous", "Rating", "Comment"];
    
    // Create CSV content
    const csvContent = [
      header.join(","),
      ...csvData.map((row) => [
        `"${row.event}"`,
        `"${row.date}"`,
        `"${row.userName}"`,
        `"${row.isAnonymous}"`,
        row.rating,
        `"${row.comment}"`,
      ].join(",")),
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `feedback_export_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Feedback exported to CSV");
  };

  // Open delete dialog
  const openDeleteDialog = (item: Feedback) => {
    setSelectedFeedback(item);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete feedback
  const handleDeleteFeedback = () => {
    if (!selectedFeedback) return;
    
    deleteFeedback(selectedFeedback.id);
    setIsDeleteDialogOpen(false);
  };

  // Simple animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Feedback Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Analyze and manage feedback across your events
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0"
            onClick={handleExportCSV}
            disabled={filteredFeedback.length === 0}
          >
            <Download size={16} className="mr-2" />
            Export to CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Feedback
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredFeedback.length}</div>
              <p className="text-xs text-gray-500">
                {feedback.length !== filteredFeedback.length
                  ? `Filtered from ${feedback.length} total`
                  : "Across all events"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-gray-500">Out of 5 stars</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Events with Feedback
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(filteredFeedback.map((item) => item.eventId)).size}
              </div>
              <p className="text-xs text-gray-500">
                Out of {events.length} total events
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Top Rating
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredFeedback.length > 0
                  ? ratingDistribution
                      .sort((a, b) => b.count - a.count)[0]
                      .rating
                  : "N/A"}
              </div>
              <p className="text-xs text-gray-500">Most common rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Feedback</CardTitle>
            <CardDescription>Narrow down feedback based on specific criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Input
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400"
                    onClick={() => setSearchTerm("")}
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-gray-400" />
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <ListFilter size={16} className="text-gray-400" />
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {dateFilter === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs: Feedback List / Analytics */}
        <Tabs defaultValue="feedback" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="feedback">Feedback List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Feedback List Tab */}
          <TabsContent value="feedback" className="space-y-6">
            {filteredFeedback.length > 0 ? (
              <div className="space-y-4">
                {filteredFeedback
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((item) => {
                    const event = events.find((e) => e.id === item.eventId);
                    return (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm font-medium rounded-t-lg flex justify-between items-center">
                          <span>{event?.title || "Unknown Event"}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-gray-500 hover:text-red-500"
                            onClick={() => openDeleteDialog(item)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <FeedbackItem feedback={item} />
                      </motion.div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Feedback Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchTerm || eventFilter !== "all" || ratingFilter !== "all" || dateFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "There is no feedback submitted yet."}
                </p>
                {(searchTerm || eventFilter !== "all" || ratingFilter !== "all" || dateFilter !== "all") && (
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rating Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>
                    Distribution of feedback ratings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratingDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="count" 
                          name="Count" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Feedback Timeline Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Timeline</CardTitle>
                  <CardDescription>
                    Feedback received over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={feedbackTimeline}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          name="Feedback Count" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Event Comparison Chart */}
              {eventRatings.length > 0 && (
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Event Comparison</CardTitle>
                    <CardDescription>
                      Average ratings across different events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={eventRatings} 
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 5]} />
                          <YAxis type="category" dataKey="event" width={150} />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            dataKey="averageRating" 
                            name="Average Rating" 
                            fill="hsl(var(--primary))" 
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Delete Feedback Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Feedback</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this feedback? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                <h3 className="font-medium flex items-center text-red-800 dark:text-red-300">
                  <AlertCircle size={18} className="mr-2" />
                  Warning
                </h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                  This will permanently delete the feedback.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteFeedback}>
                Delete Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
};

export default FeedbackAnalytics;
