
import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const GeneralSettings: React.FC = () => {
  const [organizationName, setOrganizationName] = useState("FeedbackFlow");
  const [organizationEmail, setOrganizationEmail] = useState("info@feedbackflow.com");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("https://feedbackflow.com");

  const handleSaveSettings = () => {
    // In a real app, this would send the settings to a backend
    toast.success("General settings saved successfully");
  };

  return (
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
        <Button onClick={handleSaveSettings}>
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralSettings;
