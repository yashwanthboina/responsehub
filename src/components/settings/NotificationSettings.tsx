
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newFeedbackNotifications, setNewFeedbackNotifications] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  const handleSaveSettings = () => {
    toast.success("Notification settings saved successfully");
  };

  return (
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
        <Button onClick={handleSaveSettings}>
          <Bell size={16} className="mr-2" />
          Save Notification Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
