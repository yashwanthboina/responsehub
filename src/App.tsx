
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CombinedProvider } from "@/contexts/CombinedProvider";

// Client Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import EventManagement from "./pages/admin/EventManagement";
import FeedbackAnalytics from "./pages/admin/FeedbackAnalytics";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CombinedProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Client Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/events" element={<EventManagement />} />
              <Route path="/admin/analytics" element={<FeedbackAnalytics />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/settings" element={<Settings />} />
              
              {/* Catch All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CombinedProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
