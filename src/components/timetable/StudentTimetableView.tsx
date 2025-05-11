
import { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { TimetableSlot } from "./TimetableView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ListFilter } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Define the missing TIME_SLOTS constant
const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00"
];

const studentTimetableSlots: TimetableSlot[] = [
  {
    id: "1",
    dayOfWeek: "monday",
    subject: "mathematics",
    class: "class-1",
    teacher: "teacher-1",
    startTime: "08:00",
    endTime: "09:00",
    classroom: "Room 101",
  },
  {
    id: "2",
    dayOfWeek: "monday",
    subject: "english",
    class: "class-1",
    teacher: "teacher-2",
    startTime: "09:00",
    endTime: "10:00",
    classroom: "Room 102",
  },
  {
    id: "3",
    dayOfWeek: "monday",
    subject: "science",
    class: "class-1",
    teacher: "teacher-3",
    startTime: "10:00",
    endTime: "11:00",
    classroom: "Room 103",
  },
  {
    id: "4",
    dayOfWeek: "tuesday",
    subject: "history",
    class: "class-1",
    teacher: "teacher-4",
    startTime: "08:00",
    endTime: "09:00",
    classroom: "Room 104",
  },
  {
    id: "5",
    dayOfWeek: "tuesday",
    subject: "geography",
    class: "class-1",
    teacher: "teacher-5",
    startTime: "09:00",
    endTime: "10:00",
    classroom: "Room 105",
  },
  {
    id: "6",
    dayOfWeek: "wednesday",
    subject: "physics",
    class: "class-1",
    teacher: "teacher-3",
    startTime: "08:00",
    endTime: "09:00",
    classroom: "Room 106",
  },
  {
    id: "7",
    dayOfWeek: "wednesday",
    subject: "chemistry",
    class: "class-1",
    teacher: "teacher-3",
    startTime: "09:00", 
    endTime: "10:00",
    classroom: "Room 107",
  },
  {
    id: "8",
    dayOfWeek: "thursday",
    subject: "biology",
    class: "class-1",
    teacher: "teacher-3",
    startTime: "08:00",
    endTime: "09:00",
    classroom: "Room 108",
  },
  {
    id: "9",
    dayOfWeek: "thursday",
    subject: "arts",
    class: "class-1",
    teacher: "teacher-5",
    startTime: "09:00",
    endTime: "10:00",
    classroom: "Room 109",
  },
  {
    id: "10",
    dayOfWeek: "friday",
    subject: "physical education",
    class: "class-1",
    teacher: "teacher-4",
    startTime: "08:00",
    endTime: "09:00",
    classroom: "Room 110",
  },
  {
    id: "11",
    dayOfWeek: "friday",
    subject: "computer science",
    class: "class-1",
    teacher: "teacher-2",
    startTime: "09:00",
    endTime: "10:00",
    classroom: "Room 111",
  },
];

interface StudentTimetableViewProps {
  isCalendarView: boolean;
}

const StudentTimetableView = ({ isCalendarView }: StudentTimetableViewProps) => {
  const [activeDay, setActiveDay] = useState<string>(getCurrentDay());
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  function getCurrentDay(): string {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = new Date().getDay();
    return days[today];
  }
  
  function getCurrentTime(): string {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
  
  const isCurrentPeriod = (slot: TimetableSlot): boolean => {
    if (slot.dayOfWeek !== getCurrentDay()) return false;
    
    const now = currentTime;
    return slot.startTime <= now && now < slot.endTime;
  };
  
  // Add the missing findSlot function
  const findSlot = (day: string, time: string) => {
    return studentTimetableSlots.find(
      (slot) => slot.dayOfWeek === day && slot.startTime === time
    );
  };
  
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes || '00'} ${suffix}`;
  };
  
  const formatDayOfWeek = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  const getTeacherName = (teacherId: string): string => {
    const teacherMap: Record<string, string> = {
      'teacher-1': 'Ms. Johnson',
      'teacher-2': 'Mr. Smith',
      'teacher-3': 'Mrs. Davis',
      'teacher-4': 'Dr. Wilson',
      'teacher-5': 'Mr. Thompson'
    };
    
    return teacherMap[teacherId] || teacherId;
  };
  
  const downloadAsPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text("Class Timetable", 14, 15);
      
      doc.setFontSize(10);
      doc.text(`Generated on: ${format(new Date(), "PPP")}`, 14, 22);
      
      if (isCalendarView) {
        const headers = ["Time", ...days.map(formatDayOfWeek)];
        
        const TIME_SLOTS = [
          "08:00", "09:00", "10:00", "11:00", "12:00", 
          "13:00", "14:00", "15:00", "16:00"
        ];
        
        const rows = TIME_SLOTS.map(time => {
          const row = [formatTime(time)];
          
          days.forEach(day => {
            const slot = studentTimetableSlots.find(
              (slot) => slot.dayOfWeek === day && slot.startTime === time
            );
            
            if (slot) {
              row.push(`${slot.subject}\n(${getTeacherName(slot.teacher)})`);
            } else {
              row.push("-");
            }
          });
          
          return row;
        });
        
        autoTable(doc, {
          head: [headers],
          body: rows,
          startY: 30,
          styles: { fontSize: 8, cellPadding: 3 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          didDrawPage: (data) => {
            doc.setFontSize(8);
            doc.text("School Management System - Timetable", 14, doc.internal.pageSize.height - 10);
          }
        });
      } else {
        const headers = ["Period", "Subject", "Teacher", "Time"];
        
        const daySlots = (groupedByDay[activeDay] || [])
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
          
        const rows = daySlots.map((slot, index) => [
          (index + 1).toString(),
          slot.subject,
          getTeacherName(slot.teacher),
          `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`
        ]);
        
        if (rows.length === 0) {
          rows.push(["No classes scheduled", "", "", ""]);
        }
        
        autoTable(doc, {
          head: [headers],
          body: rows,
          startY: 30,
          styles: { fontSize: 10, cellPadding: 4 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          didDrawPage: (data) => {
            doc.setFontSize(12);
            doc.text(`Day: ${formatDayOfWeek(activeDay)}`, 14, 28);
            
            doc.setFontSize(8);
            doc.text("School Management System - Timetable", 14, doc.internal.pageSize.height - 10);
          }
        });
      }
      
      doc.save("class-timetable.pdf");
      toast.success("Timetable downloaded as PDF");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download timetable");
    }
  };
  
  const groupedByDay = studentTimetableSlots.reduce((acc, slot) => {
    const day = slot.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(slot);
    return acc;
  }, {} as Record<string, TimetableSlot[]>);
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  if (isCalendarView) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Weekly Schedule</h3>
          <Button onClick={downloadAsPDF} variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  {days.map(day => (
                    <TableHead key={day} className="min-w-[150px] text-center">
                      {formatDayOfWeek(day)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {TIME_SLOTS.map(time => (
                  <TableRow key={time}>
                    <TableCell className="font-medium text-center">
                      {formatTime(time)}
                    </TableCell>
                    {days.map(day => {
                      const slot = findSlot(day, time);
                      const isCurrent = slot && isCurrentPeriod(slot);
                      
                      return (
                        <TableCell 
                          key={`${day}-${time}`} 
                          className={`${slot ? "p-1" : ""} ${isCurrent ? "bg-primary/20" : ""}`}
                        >
                          {slot && (
                            <div className="p-2 rounded-md bg-card shadow-sm border">
                              <p className="font-medium capitalize">{slot.subject}</p>
                              <p className="text-xs text-muted-foreground">
                                {getTeacherName(slot.teacher)}
                              </p>
                              {isCurrent && (
                                <Badge variant="secondary" className="mt-1">Current</Badge>
                              )}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar">
          {days.map(day => (
            <Button
              key={day}
              variant={activeDay === day ? "default" : "outline"}
              onClick={() => setActiveDay(day)}
              className={`rounded-full px-4 ${
                getCurrentDay() === day ? "border-primary border-2" : ""
              }`}
            >
              {formatDayOfWeek(day)}
            </Button>
          ))}
        </div>
        
        <Button onClick={downloadAsPDF} variant="outline" size="sm" className="gap-1 whitespace-nowrap">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(groupedByDay[activeDay] || [])
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((slot, index) => {
                const isCurrent = isCurrentPeriod(slot);
                
                return (
                  <TableRow 
                    key={slot.id}
                    className={isCurrent ? "bg-primary/20" : ""}
                  >
                    <TableCell className="font-medium">
                      {index + 1}
                      {isCurrent && (
                        <Badge variant="secondary" className="ml-2">Current</Badge>
                      )}
                    </TableCell>
                    <TableCell className="capitalize">{slot.subject}</TableCell>
                    <TableCell>{getTeacherName(slot.teacher)}</TableCell>
                    <TableCell>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</TableCell>
                  </TableRow>
                );
              })}
            {(!groupedByDay[activeDay] || groupedByDay[activeDay].length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No classes scheduled for {formatDayOfWeek(activeDay)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentTimetableView;
