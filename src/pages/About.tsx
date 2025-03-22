
import React from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";

const About: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 text-center">About FeedbackFlow</h1>
          
          <div className="glass-panel rounded-xl p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              At FeedbackFlow, we believe that great events are built on insightful feedback. Our mission is to empower event organizers with the tools they need to collect, analyze, and act on attendee feedback in real-time, creating more engaging and successful experiences.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We've built a platform that makes the feedback process seamless for both organizers and attendees, fostering a culture of continuous improvement in the events industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-3">For Event Organizers</h2>
              <p className="text-gray-700 dark:text-gray-300">
                FeedbackFlow provides powerful tools to gather and analyze attendee feedback, helping you make data-driven decisions for your current and future events. From real-time sentiment analysis to comprehensive reports, we give you everything you need to create exceptional experiences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-3">For Attendees</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We've designed an intuitive interface that makes it easy for attendees to share their thoughts and experiences. Your feedback matters, and FeedbackFlow ensures it reaches the right people so that future events can be even better.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel rounded-xl p-8 mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              FeedbackFlow was founded by a team of event professionals who experienced firsthand the challenges of collecting meaningful feedback. After struggling with paper forms, generic surveys, and disconnected tools, we decided to build the solution we always wanted.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Launched in 2023, FeedbackFlow has already helped hundreds of events improve their attendee experience through actionable insights and data-driven decisions.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Our team continues to innovate and enhance the platform based on user feedback, staying true to our own philosophy of continuous improvement.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you're an event organizer looking to enhance your feedback process or an attendee eager to share your experiences, we invite you to join the FeedbackFlow community.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/register"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Sign Up Today
              </a>
              <a
                href="/events"
                className="bg-white hover:bg-gray-100 text-primary border border-primary px-6 py-3 rounded-md font-medium transition-colors"
              >
                Explore Events
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default About;
