
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Bell, ExternalLink, Download, Upload, Database, Save } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings: React.FC = () => {
  // General Settings
  const [organizationName, setOrganizationName] = useState("FeedbackFlow");
  const [organizationEmail, setOrganizationEmail] = useState("info@feedbackflow.com");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("https://feedbackflow.com");
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newFeedbackNotifications, setNewFeedbackNotifications] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  
  // Email Templates
  const [feedbackReceivedTemplate, setFeedbackReceivedTemplate] = useState(
    "Dear Admin,\n\nYou have received new feedback for event: {{event_name}}.\n\nRating: {{rating}}\nComment: {{comment}}\nSubmitted by: {{user_name}}\n\nRegards,\nFeedbackFlow Team"
  );
  const [weeklyDigestTemplate, setWeeklyDigestTemplate] = useState(
    "Dear Admin,\n\nHere is your weekly report for {{date_range}}.\n\nTotal Feedback: {{total_feedback}}\nAverage Rating: {{average_rating}}\n\nTop Events:\n{{top_events}}\n\nRegards,\nFeedbackFlow Team"
  );
  
  // Backup & Data Settings
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("weekly");
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("1year");
  
  // Handle save settings
  const handleSaveSettings = (section: string) => {
    // In a real app, this would send the settings to a backend
    toast.success(`${section} settings saved successfully`);
  };
  
  // Handle import/export data
  const handleExportData = () => {
    // In a real app, this would trigger data export
    toast.success("Data export initiated. You will receive a download link shortly.");
  };
  
  const handleImportData = () => {
    // In a real app, this would open a file picker
    toast.info("Data import functionality would open a file picker in a real app");
  };
  
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
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Basic configuration for your FeedbackFlow application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organization-name">Organization Name</Label>
                      <Input
                        id="organization-name"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization-email">Organization Email</Label>
                      <Input
                        id="organization-email"
                        type="email"
                        value={organizationEmail}
                        onChange={(e) => setOrganizationEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="logo-url">Logo URL</Label>
                      <Input
                        id="logo-url"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website-url">Website URL</Label>
                      <Input
                        id="website-url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("General")}>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
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
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-feedback">New Feedback Alerts</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when new feedback is submitted
                        </p>
                      </div>
                      <Switch
                        id="new-feedback"
                        checked={newFeedbackNotifications}
                        onCheckedChange={setNewFeedbackNotifications}
                        disabled={!emailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="daily-digest">Daily Digest</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive a daily summary of all feedback
                        </p>
                      </div>
                      <Switch
                        id="daily-digest"
                        checked={dailyDigest}
                        onCheckedChange={setDailyDigest}
                        disabled={!emailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-report">Weekly Report</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive a weekly analytics report
                        </p>
                      </div>
                      <Switch
                        id="weekly-report"
                        checked={weeklyReport}
                        onCheckedChange={setWeeklyReport}
                        disabled={!emailNotifications}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("Notification")}>
                    <Bell size={16} className="mr-2" />
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
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
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>
                    Customize the email templates used for notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-received">New Feedback Notification</Label>
                    <Textarea
                      id="feedback-received"
                      value={feedbackReceivedTemplate}
                      onChange={(e) => setFeedbackReceivedTemplate(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Available variables: {{event_name}}, {{rating}}, {{comment}}, {{user_name}}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weekly-digest">Weekly Report Template</Label>
                    <Textarea
                      id="weekly-digest"
                      value={weeklyDigestTemplate}
                      onChange={(e) => setWeeklyDigestTemplate(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Available variables: {{date_range}}, {{total_feedback}}, {{average_rating}}, {{top_events}}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      Template Tips
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Keep your templates concise and clean. Use the available variables to personalize the content.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("Email Template")}>
                    <Mail size={16} className="mr-2" />
                    Save Email Templates
                  </Button>
                </CardFooter>
              </Card>
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
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Backup Settings</CardTitle>
                  <CardDescription>
                    Configure automatic backups and data retention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Regularly backup your data automatically
                      </p>
                    </div>
                    <Switch
                      id="auto-backup"
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <select
                      id="backup-frequency"
                      value={backupFrequency}
                      onChange={(e) => setBackupFrequency(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background"
                      disabled={!autoBackup}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention Period</Label>
                    <select
                      id="data-retention"
                      value={dataRetentionPeriod}
                      onChange={(e) => setDataRetentionPeriod(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background"
                    >
                      <option value="3months">3 Months</option>
                      <option value="6months">6 Months</option>
                      <option value="1year">1 Year</option>
                      <option value="forever">Forever (No Automatic Deletion)</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("Backup")}>
                    <Database size={16} className="mr-2" />
                    Save Backup Settings
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Import/Export</CardTitle>
                  <CardDescription>
                    Manually import or export your application data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Button onClick={handleExportData} variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                      <Download size={24} className="mb-2" />
                      <div className="text-center">
                        <h3 className="font-medium">Export Data</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Download all your data as a CSV/JSON file
                        </p>
                      </div>
                    </Button>
                    
                    <Button onClick={handleImportData} variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                      <Upload size={24} className="mb-2" />
                      <div className="text-center">
                        <h3 className="font-medium">Import Data</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Upload data from a CSV/JSON file
                        </p>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                    <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      Important Note
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      Importing data will merge with your existing data. Make sure to back up your current data before importing.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <ExternalLink size={14} className="inline mr-1" />
                    <a href="#" className="underline">
                      Learn more about data formats and importing
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default Settings;
