
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Edit,
  Plus,
  Search,
  Trash2,
  X,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/contexts/EventContext";
import { Event } from "@/types/eventTypes";
import { format } from "date-fns";
import { toast } from "sonner";

const EventManagement: React.FC = () => {
  const { events, loading, createEvent, updateEvent, deleteEvent } = useEvents();
  
  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    status: "upcoming",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    imageUrl: "",
  });

  // Filter and search events
  const filteredEvents = events.filter((event) => {
    // Filter by status
    if (statusFilter !== "all" && event.status !== statusFilter) {
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

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select input changes
  const handleSelectChange = (name: string, value: string) => {
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Open create dialog
  const openCreateDialog = () => {
    setNewEvent({
      title: "",
      description: "",
      status: "upcoming",
      startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      location: "",
      organizer: "",
      imageUrl: "",
    });
    setIsCreateDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      status: event.status,
      startDate: format(new Date(event.startDate), "yyyy-MM-dd'T'HH:mm"),
      endDate: format(new Date(event.endDate), "yyyy-MM-dd'T'HH:mm"),
      location: event.location,
      organizer: event.organizer,
      imageUrl: event.imageUrl || "",
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  // Handle create event
  const handleCreateEvent = () => {
    // Validate form
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate || !newEvent.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create new event
    createEvent({
      title: newEvent.title,
      description: newEvent.description,
      status: newEvent.status as "active" | "upcoming" | "completed" | "archived",
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      location: newEvent.location,
      organizer: newEvent.organizer,
      imageUrl: newEvent.imageUrl,
    });

    // Close dialog
    setIsCreateDialogOpen(false);
  };

  // Handle update event
  const handleUpdateEvent = () => {
    if (!selectedEvent) return;

    // Validate form
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate || !newEvent.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Update event
    updateEvent(selectedEvent.id, {
      title: newEvent.title,
      description: newEvent.description,
      status: newEvent.status as "active" | "upcoming" | "completed" | "archived",
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      location: newEvent.location,
      organizer: newEvent.organizer,
      imageUrl: newEvent.imageUrl,
    });

    // Close dialog
    setIsEditDialogOpen(false);
  };

  // Handle delete event
  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    // Delete event
    deleteEvent(selectedEvent.id);

    // Close dialog
    setIsDeleteDialogOpen(false);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "archived":
        return <Badge variant="secondary" className="bg-gray-300">Archived</Badge>;
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy h:mm a");
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Event Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create, edit, and manage your events
            </p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={openCreateDialog}>
            <Plus size={16} className="mr-2" />
            Create Event
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search events..."
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

            <div className="flex items-center space-x-2 min-w-[180px]">
              <Filter size={16} className="text-gray-400" />
              <Select 
                value={statusFilter} 
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Loading state
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredEvents.length > 0 ? (
                  // Events list
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell>{formatDate(event.startDate)}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        {event.feedbackCount > 0 ? (
                          <span className="flex items-center">
                            {event.feedbackCount}{" "}
                            <small className="ml-1 text-gray-500">
                              ({event.averageRating.toFixed(1)}/5)
                            </small>
                          </span>
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(event)}
                            className="h-8 px-2"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(event)}
                            className="h-8 px-2 text-red-500 hover:text-red-600 hover:border-red-200"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // No events found
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No events found
                      </p>
                      {searchTerm && (
                        <Button
                          variant="link"
                          onClick={() => setSearchTerm("")}
                          className="mt-2"
                        >
                          Clear search
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Create Event Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Add a new event to your FeedbackFlow platform
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date & Time *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={newEvent.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date & Time *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={newEvent.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newEvent.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    name="organizer"
                    value={newEvent.organizer}
                    onChange={handleInputChange}
                    placeholder="Event organizer"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={newEvent.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL for event"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateEvent}>
                Create Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Event Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Update the details of your event
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Event Title *</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-startDate">Start Date & Time *</Label>
                  <Input
                    id="edit-startDate"
                    name="startDate"
                    type="datetime-local"
                    value={newEvent.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-endDate">End Date & Time *</Label>
                  <Input
                    id="edit-endDate"
                    name="endDate"
                    type="datetime-local"
                    value={newEvent.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-location">Location *</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={newEvent.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-organizer">Organizer</Label>
                  <Input
                    id="edit-organizer"
                    name="organizer"
                    value={newEvent.organizer}
                    onChange={handleInputChange}
                    placeholder="Event organizer"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-imageUrl">Image URL</Label>
                  <Input
                    id="edit-imageUrl"
                    name="imageUrl"
                    value={newEvent.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL for event"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleUpdateEvent}>
                Update Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Event Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this event? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                <h3 className="font-medium flex items-center text-red-800 dark:text-red-300">
                  <AlertCircle size={18} className="mr-2" />
                  Warning
                </h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                  {selectedEvent && selectedEvent.feedbackCount > 0 ? (
                    <>
                      This event has {selectedEvent.feedbackCount} feedback submissions. 
                      All feedback will be permanently deleted as well.
                    </>
                  ) : (
                    <>This will permanently delete the event and its data.</>
                  )}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteEvent}>
                Delete Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
};

export default EventManagement;
