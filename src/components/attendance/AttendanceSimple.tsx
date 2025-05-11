
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { format } from "date-fns";

// Types
interface Attendance {
  id: string;
  userId: string;
  date: string; // ISO string
  status: "present" | "absent";
}

interface User {
  id: string;
  name: string;
  role: "student" | "teacher";
  class?: string;
  section?: string;
}

interface AttendanceSimpleProps {
  role: "admin" | "teacher";
  initialAttendanceData?: Attendance[];
  users?: User[];
}

const AttendanceSimple: React.FC<AttendanceSimpleProps> = ({ 
  role, 
  initialAttendanceData = [],
  users = [] 
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [attendanceData, setAttendanceData] = useState<Attendance[]>(initialAttendanceData);
  
  // Mock classes and sections
  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const sections = ["A", "B", "C"];
  
  // Mock teachers or students if none are provided
  const mockUsers: User[] = users.length > 0 ? users : [
    { id: "1", name: "John Smith", role: "student", class: "10", section: "A" },
    { id: "2", name: "Sarah Johnson", role: "student", class: "10", section: "A" },
    { id: "3", name: "Michael Brown", role: "student", class: "10", section: "A" },
    { id: "4", name: "Emily Davis", role: "student", class: "10", section: "A" },
    { id: "5", name: "David Wilson", role: "student", class: "10", section: "A" },
    { id: "6", name: "Prof. Gupta", role: "teacher" },
    { id: "7", name: "Dr. Sharma", role: "teacher" },
    { id: "8", name: "Ms. Patel", role: "teacher" },
  ];
  
  // Filter users based on selection
  const filteredUsers = mockUsers.filter(user => {
    if (user.role !== userType) return false;
    
    if (userType === "student") {
      if (selectedClass && user.class !== selectedClass) return false;
      if (selectedSection && user.section !== selectedSection) return false;
    }
    
    return true;
  });
  
  // Get attendance for a user on the current date
  const getAttendance = (userId: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return attendanceData.find(att => att.userId === userId && att.date === dateStr);
  };
  
  // Mark attendance
  const markAttendance = (userId: string, status: "present" | "absent") => {
    const dateStr = format(date, "yyyy-MM-dd");
    const existingIndex = attendanceData.findIndex(
      att => att.userId === userId && att.date === dateStr
    );
    
    if (existingIndex >= 0) {
      // Update existing attendance
      const newData = [...attendanceData];
      newData[existingIndex] = { ...newData[existingIndex], status };
      setAttendanceData(newData);
    } else {
      // Add new attendance
      setAttendanceData([
        ...attendanceData,
        {
          id: `${userId}-${dateStr}`,
          userId,
          date: dateStr,
          status,
        }
      ]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">User Type</label>
              <Select
                value={userType}
                onValueChange={(value) => setUserType(value as "student" | "teacher")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {userType === "student" && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Class</label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Section</label>
                  <Select
                    value={selectedSection}
                    onValueChange={setSelectedSection}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sections</SelectItem>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>Section {section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {userType === "student" ? "Student Attendance" : "Teacher Attendance"} for {format(date, "PP")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {userType === "student" && (
                    <>
                      <TableHead>Class</TableHead>
                      <TableHead>Section</TableHead>
                    </>
                  )}
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={userType === "student" ? 5 : 3} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      No {userType}s found based on the selected criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    const attendance = getAttendance(user.id);
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        {userType === "student" && (
                          <>
                            <TableCell>Class {user.class}</TableCell>
                            <TableCell>Section {user.section}</TableCell>
                          </>
                        )}
                        <TableCell>
                          {attendance ? (
                            attendance.status === "present" ? (
                              <span className="inline-flex items-center text-green-600">
                                <Check className="mr-1 h-4 w-4" /> Present
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-red-600">
                                <X className="mr-1 h-4 w-4" /> Absent
                              </span>
                            )
                          ) : (
                            <span className="text-muted-foreground">Not marked</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={attendance?.status === "present" ? "default" : "outline"}
                              className="w-24"
                              onClick={() => markAttendance(user.id, "present")}
                            >
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant={attendance?.status === "absent" ? "destructive" : "outline"}
                              className="w-24"
                              onClick={() => markAttendance(user.id, "absent")}
                            >
                              Absent
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSimple;
