
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16 md:py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[180px] font-bold text-gray-200 dark:text-gray-800">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search size={60} className="text-gray-400" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Events
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
