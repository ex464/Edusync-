
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AttendanceActionsProps {
  handleBulkMarkAttendance: (status: string) => void;
  handleParentNotification: () => void;
}

const AttendanceActions = ({
  handleBulkMarkAttendance,
  handleParentNotification,
}: AttendanceActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
          <CardDescription>
            Mark all students with the same attendance status
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button 
            onClick={() => handleBulkMarkAttendance("present")}
            className="bg-green-500 hover:bg-green-600"
          >
            Mark All Present
          </Button>
          <Button 
            onClick={() => handleBulkMarkAttendance("absent")}
            className="bg-red-500 hover:bg-red-600"
          >
            Mark All Absent
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parent Notifications</CardTitle>
          <CardDescription>
            Send notifications to parents of absent students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={handleParentNotification}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notify Parents of Absent Students
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceActions;
