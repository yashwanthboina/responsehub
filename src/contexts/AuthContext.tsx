
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "event_manager" | "attendee";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isEventManager: boolean;
  isAttendee: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@feedbackflow.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    username: "manager",
    email: "manager@feedbackflow.com",
    password: "manager123",
    role: "event_manager" as const,
  },
  {
    id: "3",
    username: "user",
    email: "user@feedbackflow.com",
    password: "user123",
    role: "attendee" as const,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem("feedbackflow_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Store user data without password
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("feedbackflow_user", JSON.stringify(userWithoutPassword));
        
        toast.success(`Welcome back, ${userWithoutPassword.username}!`);
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("feedbackflow_user");
    toast.success("Logged out successfully");
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        toast.error("Email already in use");
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        username,
        email,
        role: "attendee" as const,
      };
      
      // Update user state
      setUser(newUser);
      localStorage.setItem("feedbackflow_user", JSON.stringify(newUser));
      
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Computed properties for user roles
  const isAdmin = user?.role === "admin";
  const isEventManager = user?.role === "event_manager" || user?.role === "admin";
  const isAttendee = user?.role === "attendee";
  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    isAdmin,
    isEventManager,
    isAttendee,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
