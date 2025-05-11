
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NotificationHistoryProps {
  notificationId?: number;
}

// Mock data for demonstration
const mockHistoryData = [
  {
    id: 1,
    notificationId: 1,
    action: "created",
    timestamp: "2023-08-01 10:15 AM",
    user: "Admin",
    details: "Notification created"
  },
  {
    id: 2,
    notificationId: 1,
    action: "edited",
    timestamp: "2023-08-01 10:20 AM",
    user: "Admin",
    details: "Changed priority from Medium to High"
  },
  {
    id: 3,
    notificationId: 1,
    action: "sent",
    timestamp: "2023-08-01 10:30 AM",
    user: "System",
    details: "Sent to 120 recipients"
  },
  {
    id: 4,
    notificationId: 1,
    action: "delivered",
    timestamp: "2023-08-01 10:32 AM",
    user: "System",
    details: "Delivered to 118 recipients"
  },
  {
    id: 5,
    notificationId: 1,
    action: "read",
    timestamp: "2023-08-01 11:45 AM",
    user: "System",
    details: "Read by 85 recipients"
  },
  {
    id: 6,
    notificationId: 2,
    action: "created",
    timestamp: "2023-08-02 11:30 AM",
    user: "Teacher",
    details: "Notification created"
  },
  {
    id: 7,
    notificationId: 2,
    action: "sent",
    timestamp: "2023-08-02 11:45 AM",
    user: "System",
    details: "Sent to 60 recipients"
  }
];

const NotificationHistory = ({ notificationId }: NotificationHistoryProps) => {
  const historyData = notificationId
    ? mockHistoryData.filter(item => item.notificationId === notificationId)
    : mockHistoryData;

  const getActionBadge = (action: string) => {
    switch (action) {
      case "created":
        return <Badge className="bg-blue-500">Created</Badge>;
      case "edited":
        return <Badge className="bg-amber-500">Edited</Badge>;
      case "sent":
        return <Badge className="bg-green-500">Sent</Badge>;
      case "delivered":
        return <Badge className="bg-purple-500">Delivered</Badge>;
      case "read":
        return <Badge className="bg-teal-500">Read</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {notificationId 
            ? "Notification History" 
            : "Recent Notification Activity"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>By</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.length > 0 ? (
              historyData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{getActionBadge(item.action)}</TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NotificationHistory;
