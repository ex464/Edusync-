
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AttendanceRecord {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  date: string;
  timeIn: number;
  status: string;
  markedBy: string;
  notes: string;
}

interface AttendanceTableProps {
  attendanceData: AttendanceRecord[];
  isMarkingAttendance: boolean;
  handleMarkAttendance: (studentId: string, status: string) => void;
}

const AttendanceTable = ({
  attendanceData,
  isMarkingAttendance,
  handleMarkAttendance,
}: AttendanceTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500 hover:bg-green-600">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-500 hover:bg-red-600">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Late</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Roll No.</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Time In</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Marked By</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.length > 0 ? (
            attendanceData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.rollNumber}</TableCell>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.class}-{record.section}</TableCell>
                <TableCell>
                  {record.timeIn ? format(new Date(record.timeIn), "h:mm a") : "Not Recorded"}
                </TableCell>
                <TableCell>
                  {isMarkingAttendance ? (
                    <Select
                      value={record.status || "unknown"}
                      onValueChange={(value) => handleMarkAttendance(record.id, value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    getStatusBadge(record.status)
                  )}
                </TableCell>
                <TableCell>{record.markedBy}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {record.notes || "No notes"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No attendance records found for the selected filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
