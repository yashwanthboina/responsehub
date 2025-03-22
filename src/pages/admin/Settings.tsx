
import React from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new component modules
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import EmailTemplates from "@/components/settings/EmailTemplates";
import BackupDataSettings from "@/components/settings/BackupDataSettings";

const Settings: React.FC = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your FeedbackFlow application settings
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="data">Backup & Data</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
            >
              <GeneralSettings />
            </motion.div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
            >
              <NotificationSettings />
            </motion.div>
          </TabsContent>

          {/* Email Templates */}
          <TabsContent value="templates">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
            >
              <EmailTemplates />
            </motion.div>
          </TabsContent>

          {/* Backup & Data Settings */}
          <TabsContent value="data">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
            >
              <BackupDataSettings />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default Settings;
