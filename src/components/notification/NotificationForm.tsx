
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, Calendar, Send, Clock } from "lucide-react";

const NotificationForm = () => {
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    recipientType: "all",
    priority: "medium",
    sendViaSMS: false,
    sendViaApp: true,
    sendViaEmail: false,
    scheduleFor: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNotificationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNotificationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setNotificationData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notificationData.title.trim() || !notificationData.message.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, this would send the notification or save as draft
    toast.success("Notification created successfully");
    console.log("Notification data:", notificationData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Create New Notification</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              name="title" 
              value={notificationData.title}
              onChange={handleInputChange}
              placeholder="Enter notification title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={notificationData.message}
              onChange={handleInputChange}
              placeholder="Enter notification message"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientType">Recipients</Label>
              <Select 
                value={notificationData.recipientType}
                onValueChange={(value) => handleSelectChange("recipientType", value)}
              >
                <SelectTrigger id="recipientType">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">All Students</SelectItem>
                  <SelectItem value="teachers">All Teachers</SelectItem>
                  <SelectItem value="parents">All Parents</SelectItem>
                  <SelectItem value="class">Specific Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={notificationData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Send Via</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sendViaApp" 
                  checked={notificationData.sendViaApp}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("sendViaApp", checked as boolean)
                  }
                />
                <Label htmlFor="sendViaApp" className="cursor-pointer">App Notification</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sendViaSMS" 
                  checked={notificationData.sendViaSMS}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("sendViaSMS", checked as boolean)
                  }
                />
                <Label htmlFor="sendViaSMS" className="cursor-pointer">SMS</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sendViaEmail" 
                  checked={notificationData.sendViaEmail}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("sendViaEmail", checked as boolean)
                  }
                />
                <Label htmlFor="sendViaEmail" className="cursor-pointer">Email</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scheduleFor">Schedule For (Optional)</Label>
            <Input 
              id="scheduleFor" 
              name="scheduleFor" 
              type="datetime-local"
              value={notificationData.scheduleFor}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">Leave empty to send immediately</p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Save as Draft</Button>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotificationForm;
