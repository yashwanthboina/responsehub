
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import EventCard from "@/components/common/EventCard";
import { useEvents } from "@/contexts/EventContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";

const Events: React.FC = () => {
  const { events, loading } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Apply filters when events, searchTerm or tab changes
  useEffect(() => {
    const filtered = events.filter((event) => {
      // Filter by tab
      if (tab !== "all" && event.status !== tab) {
        return false;
      }
      
      // Filter by search term
      if (
        searchTerm &&
        !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      
      return true;
    });
    
    setFilteredEvents(filtered);
  }, [events, searchTerm, tab]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const staggerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and provide feedback for conferences and events.
          </p>
        </motion.div>

        <motion.div 
          className="mb-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={handleClearSearch}
              >
                <X size={16} />
              </Button>
            )}
            {!searchTerm && (
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="all" value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={tab} className="mt-0">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="glass-card animate-pulse rounded-lg h-72">
                      <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded-t-lg" />
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredEvents.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerAnimation}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredEvents.map((event) => (
                    <motion.div key={event.id} variants={itemAnimation}>
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No events found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {searchTerm 
                      ? "Try adjusting your search criteria." 
                      : "There are no events available in this category."}
                  </p>
                  {searchTerm && (
                    <Button onClick={handleClearSearch}>Clear Search</Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Events;
