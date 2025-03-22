
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from './NavBar';
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // If mobile, sidebar is closed by default
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  
  // If not loading and not admin, redirect to home
  if (!loading && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const sidebarLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Event Management", path: "/admin/events", icon: <CalendarDays size={20} /> },
    { name: "Feedback Analytics", path: "/admin/analytics", icon: <BarChart3 size={20} /> },
    { name: "User Management", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <div className="flex flex-1 pt-[72px]">
        {/* Sidebar */}
        <motion.aside 
          className={`fixed inset-y-0 left-0 z-40 pt-[72px] bg-white dark:bg-gray-900 border-r border-gray-200/80 dark:border-gray-800/80 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
          style={{ 
            width: sidebarOpen ? (isMobile ? '85%' : '280px') : '0px',
            boxShadow: sidebarOpen && isMobile ? '0 0 15px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <div className="h-full overflow-y-auto scrollbar-thin">
            {/* Sidebar content */}
            <nav className="p-4 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Overlay when mobile sidebar is open */}
        {sidebarOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-30 pt-[72px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {/* Toggle sidebar button (always visible) */}
          <Button
            variant="outline"
            size="icon"
            className="mb-4 md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </Button>

          {/* Page content */}
          <div className={`transition-all duration-300`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
