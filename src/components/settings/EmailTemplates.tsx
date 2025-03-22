
import React, { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const EmailTemplates: React.FC = () => {
  const [feedbackReceivedTemplate, setFeedbackReceivedTemplate] = useState(
    "Dear Admin,\n\nYou have received new feedback for event: {{event_name}}.\n\nRating: {{rating}}\nComment: {{comment}}\nSubmitted by: {{user_name}}\n\nRegards,\nFeedbackFlow Team"
  );
  const [weeklyDigestTemplate, setWeeklyDigestTemplate] = useState(
    "Dear Admin,\n\nHere is your weekly report for {{date_range}}.\n\nTotal Feedback: {{total_feedback}}\nAverage Rating: {{average_rating}}\n\nTop Events:\n{{top_events}}\n\nRegards,\nFeedbackFlow Team"
  );

  const handleSaveSettings = () => {
    toast.success("Email Template settings saved successfully");
  };

  return (
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
            Available variables: {"{"}{"{"}<span>event_name</span>{"}"}{"}"},  {"{"}{"{"}<span>rating</span>{"}"}{"}"},  {"{"}{"{"}<span>comment</span>{"}"}{"}"},  {"{"}{"{"}<span>user_name</span>{"}"}{"}"}
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
            Available variables: {"{"}{"{"}<span>date_range</span>{"}"}{"}"},  {"{"}{"{"}<span>total_feedback</span>{"}"}{"}"},  {"{"}{"{"}<span>average_rating</span>{"}"}{"}"},  {"{"}{"{"}<span>top_events</span>{"}"}{"}"}
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
        <Button onClick={handleSaveSettings}>
          <Mail size={16} className="mr-2" />
          Save Email Templates
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailTemplates;
