
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, Plus, Edit, Trash2, Check, Lock, AlertCircle } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock user data
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "event_manager" | "attendee";
  status: "active" | "inactive";
  lastLogin: string | null;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@feedbackflow.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-11-01T09:30:00Z",
  },
  {
    id: "2",
    name: "Event Manager",
    email: "manager@feedbackflow.com",
    role: "event_manager",
    status: "active",
    lastLogin: "2023-11-05T14:20:00Z",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    role: "attendee",
    status: "active",
    lastLogin: "2023-10-28T11:45:00Z",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "attendee",
    status: "active",
    lastLogin: "2023-10-30T13:15:00Z",
  },
  {
    id: "5",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "event_manager",
    status: "active",
    lastLogin: "2023-11-03T10:10:00Z",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "attendee",
    status: "inactive",
    lastLogin: null,
  },
  {
    id: "7",
    name: "David Kim",
    email: "david@example.com",
    role: "attendee",
    status: "active",
    lastLogin: "2023-10-29T09:05:00Z",
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "attendee",
    password: "",
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    // Filter by role
    if (roleFilter !== "all" && user.role !== roleFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }
    
    // Filter by search term
    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select input changes
  const handleSelectChange = (name: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Open edit dialog
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Handle create user
  const handleCreateUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check for duplicate email
    if (users.some((user) => user.email === newUser.email)) {
      toast.error("A user with this email already exists");
      return;
    }
    
    // Create new user
    const newUserObj: User = {
      id: `user_${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as "admin" | "event_manager" | "attendee",
      status: "active",
      lastLogin: null,
    };
    
    setUsers((prev) => [...prev, newUserObj]);
    toast.success("User created successfully");
    setIsCreateDialogOpen(false);
  };

  // Handle update user
  const handleUpdateUser = () => {
    if (!selectedUser) return;
    
    // Validate form
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check for duplicate email (excluding current user)
    if (
      newUser.email !== selectedUser.email &&
      users.some((user) => user.email === newUser.email)
    ) {
      toast.error("A user with this email already exists");
      return;
    }
    
    // Update user
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role as "admin" | "event_manager" | "attendee",
            }
          : user
      )
    );
    
    toast.success("User updated successfully");
    setIsEditDialogOpen(false);
  };

  // Handle delete user
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    // Delete user
    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
    
    toast.success("User deleted successfully");
    setIsDeleteDialogOpen(false);
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "event_manager":
        return <Badge className="bg-blue-500">Event Manager</Badge>;
      case "attendee":
        return <Badge variant="outline">Attendee</Badge>;
      default:
        return null;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="border-gray-400 text-gray-400">Inactive</Badge>;
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Simple animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AdminLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user accounts and permissions
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0"
            onClick={() => {
              setNewUser({
                name: "",
                email: "",
                role: "attendee",
                password: "",
              });
              setIsCreateDialogOpen(true);
            }}
          >
            <Plus size={16} className="mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search users..."
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
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="event_manager">Event Manager</SelectItem>
                  <SelectItem value="attendee">Attendee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 min-w-[180px]">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                            className="h-8 px-2"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(user)}
                            className="h-8 px-2 text-red-500 hover:text-red-600 hover:border-red-200"
                            disabled={user.role === "admin" && users.filter(u => u.role === "admin").length === 1}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <p className="text-gray-500 dark:text-gray-400">No users found</p>
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

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update the user's information and role
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter user's name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter user's email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="event_manager">Event Manager</SelectItem>
                    <SelectItem value="attendee">Attendee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-password">
                  Password{" "}
                  <span className="text-xs text-gray-500">(Leave blank to keep unchanged)</span>
                </Label>
                <Input
                  id="edit-password"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleUpdateUser}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create User Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter user's name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter user's email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="event_manager">Event Manager</SelectItem>
                    <SelectItem value="attendee">Attendee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateUser}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {selectedUser && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                  <h3 className="font-medium flex items-center text-red-800 dark:text-red-300">
                    <AlertCircle size={18} className="mr-2" />
                    Warning
                  </h3>
                  <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                    You are about to delete the user: <span className="font-medium">{selectedUser.name}</span> 
                    ({selectedUser.email})
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
};

export default UserManagement;
