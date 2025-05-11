import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, History, Trash2, Send } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationForm from "@/components/notification/NotificationForm";
import NotificationHistory from "@/components/notification/NotificationHistory";

// Mock data for demonstration
const mockNotifications = [
  {
    id: 1,
    title: "Fee Payment Reminder",
    message: "Last date for fee payment is 15th August",
    recipientType: "students",
    recipients: "Class 10",
    status: "sent",
    sentVia: ["app", "sms"],
    sentAt: "2023-08-01 10:30 AM",
    priority: "high"
  },
  {
    id: 2,
    title: "Exam Schedule Updated",
    message: "Science exam postponed to 25th August",
    recipientType: "students",
    recipients: "Class 8, Class 9",
    status: "sent",
    sentVia: ["app"],
    sentAt: "2023-08-02 11:45 AM",
    priority: "medium"
  },
  {
    id: 3,
    title: "Staff Meeting",
    message: "All teachers are requested to attend staff meeting on Friday",
    recipientType: "teachers",
    recipients: "All Teachers",
    status: "draft",
    sentVia: [],
    sentAt: "",
    priority: "low"
  },
  {
    id: 4,
    title: "School Closed Tomorrow",
    message: "Due to heavy rainfall, school will remain closed tomorrow",
    recipientType: "all",
    recipients: "All",
    status: "sent",
    sentVia: ["app", "sms", "email"],
    sentAt: "2023-08-03 08:15 AM",
    priority: "critical"
  },
  {
    id: 5,
    title: "Attendance Alert",
    message: "Student attendance below 75%. Please maintain regular attendance.",
    recipientType: "students",
    recipients: "Multiple Students",
    status: "scheduled",
    sentVia: ["app", "sms"],
    sentAt: "Scheduled for 2023-08-10",
    priority: "high"
  }
];

interface NotificationManagementProps {
  role: "admin" | "teacher" | "student";
}

const NotificationManagement = ({ role = "admin" }: NotificationManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredNotifications = mockNotifications.filter(notification => 
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-amber-500";
      case "medium": return "bg-blue-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-500";
      case "scheduled": return "bg-blue-500";
      case "draft": return "bg-gray-500";
      default: return "bg-gray-400";
    }
  };

  const handleDeleteNotification = (id: number) => {
    toast.success(`Notification #${id} deleted successfully`);
  };

  const handleSendNotification = (id: number) => {
    toast.success(`Notification #${id} sent successfully`);
  };

  const canSendNotification = () => {
    return role === "admin" || role === "teacher";
  };

  return (
    <DashboardLayout role={role as "admin" | "teacher" | "student"}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">
                {role === "admin" ? "Manage and send notifications to users" : 
                 role === "teacher" ? "Manage class notifications and alerts" : 
                 "View your notifications and alerts"}
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search notifications..."
                className="w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {canSendNotification() && (
                <Button className="whitespace-nowrap">
                  <Send className="mr-2 h-4 w-4" />
                  New Notification
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  All Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockNotifications.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Unread Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {role === "admin" || role === "teacher" ? "Sent Today" : "New Today"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Notifications</TabsTrigger>
              {(role === "admin" || role === "teacher") && (
                <>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </>
              )}
              {role === "student" && (
                <>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="fees">Fees</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                </>
              )}
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        {(role === "admin" || role === "teacher") && (
                          <TableHead>Recipients</TableHead>
                        )}
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent Via</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                          <TableRow key={notification.id}>
                            <TableCell className="font-medium">{notification.title}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{notification.message}</TableCell>
                            {(role === "admin" || role === "teacher") && (
                              <TableCell>{notification.recipients}</TableCell>
                            )}
                            <TableCell>
                              <Badge 
                                className={`${getPriorityColor(notification.priority)} text-white`}
                              >
                                {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={`${getStatusColor(notification.status)} text-white`}
                              >
                                {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {notification.sentVia.map((via, index) => (
                                  <Badge key={index} variant="outline" className="capitalize">
                                    {via}
                                  </Badge>
                                ))}
                                {notification.sentVia.length === 0 && "-"}
                              </div>
                            </TableCell>
                            <TableCell>{notification.sentAt || "-"}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {canSendNotification() && notification.status !== "sent" && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleSendNotification(notification.id)}
                                    title="Send Notification"
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => {}}
                                  title="View History"
                                >
                                  <History className="h-4 w-4" />
                                </Button>
                                {canSendNotification() && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    title="Delete Notification"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={role === "student" ? 7 : 8} className="text-center py-6 text-muted-foreground">
                            No notifications found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sent">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        {(role === "admin" || role === "teacher") && (
                          <TableHead>Recipients</TableHead>
                        )}
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent Via</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.filter(n => n.status === "sent").length > 0 ? (
                        filteredNotifications
                          .filter(n => n.status === "sent")
                          .map((notification) => (
                            <TableRow key={notification.id}>
                              <TableCell className="font-medium">{notification.title}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{notification.message}</TableCell>
                              {(role === "admin" || role === "teacher") && (
                                <TableCell>{notification.recipients}</TableCell>
                              )}
                              <TableCell>
                                <Badge 
                                  className={`${getPriorityColor(notification.priority)} text-white`}
                                >
                                  {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={`${getStatusColor(notification.status)} text-white`}
                                >
                                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  {notification.sentVia.map((via, index) => (
                                    <Badge key={index} variant="outline" className="capitalize">
                                      {via}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>{notification.sentAt}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {}}
                                    title="View History"
                                  >
                                    <History className="h-4 w-4" />
                                  </Button>
                                  {canSendNotification() && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handleDeleteNotification(notification.id)}
                                      title="Delete Notification"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={role === "student" ? 7 : 8} className="text-center py-6 text-muted-foreground">
                            No sent notifications found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="draft">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.filter(n => n.status === "draft").length > 0 ? (
                        filteredNotifications
                          .filter(n => n.status === "draft")
                          .map((notification) => (
                            <TableRow key={notification.id}>
                              <TableCell className="font-medium">{notification.title}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{notification.message}</TableCell>
                              <TableCell>{notification.recipients}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={`${getPriorityColor(notification.priority)} text-white`}
                                >
                                  {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={`${getStatusColor(notification.status)} text-white`}
                                >
                                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleSendNotification(notification.id)}
                                    title="Send Notification"
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    title="Delete Notification"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No draft notifications found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Scheduled For</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.filter(n => n.status === "scheduled").length > 0 ? (
                        filteredNotifications
                          .filter(n => n.status === "scheduled")
                          .map((notification) => (
                            <TableRow key={notification.id}>
                              <TableCell className="font-medium">{notification.title}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{notification.message}</TableCell>
                              <TableCell>{notification.recipients}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={`${getPriorityColor(notification.priority)} text-white`}
                                >
                                  {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={`${getStatusColor(notification.status)} text-white`}
                                >
                                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{notification.sentAt.replace('Scheduled for ', '')}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {}}
                                    title="View History"
                                  >
                                    <History className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    title="Delete Notification"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No scheduled notifications found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="academic">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No academic notifications found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fees">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No fee notifications found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="general">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No general notifications found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default NotificationManagement;
