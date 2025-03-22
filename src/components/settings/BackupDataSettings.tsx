
import React, { useState } from "react";
import { Database, Download, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const BackupDataSettings: React.FC = () => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("weekly");
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("1year");

  const handleSaveSettings = () => {
    toast.success("Backup settings saved successfully");
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

  return (
    <>
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
          <Button onClick={handleSaveSettings}>
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
    </>
  );
};

export default BackupDataSettings;
