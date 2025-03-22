
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const { user, isAuthenticated, isAdmin, isEventManager, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/", isPublic: true },
    { name: "Events", path: "/events", isPublic: true },
    { name: "Dashboard", path: "/admin/dashboard", isAdmin: true },
    { name: "Event Management", path: "/admin/events", isAdmin: true },
    { name: "Feedback Analytics", path: "/admin/analytics", isAdmin: true },
    { name: "About", path: "/about", isPublic: true },
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.isPublic) return true;
    if (link.isAdmin && isAdmin) return true;
    return false;
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:bg-black/50 dark:border-gray-800/50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <span className="text-2xl font-bold text-gradient">FeedbackFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-sm font-medium ${
                isActive(link.path)
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user?.username}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-[72px] left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-3 space-y-1 flex flex-col">
              {filteredLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-3 px-4 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-2 pb-3 space-y-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <div className="px-4 py-2">
                    <div className="text-sm font-medium">{user?.username}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-red-500" 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="pt-2 pb-3 space-y-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 text-sm font-medium bg-primary text-white rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
