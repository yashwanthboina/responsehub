
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className = "" }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <motion.main
        className={`flex-1 pt-[72px] ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gradient">FeedbackFlow</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time feedback platform for events and conferences.
                Collect, analyze, and improve with valuable insights.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Home</a></li>
                <li><a href="/events" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Events</a></li>
                <li><a href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Contact</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                info@feedbackflow.com
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                123 Feedback Street, San Francisco, CA 94107
              </p>
            </div>
          </div>
          <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} FeedbackFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
