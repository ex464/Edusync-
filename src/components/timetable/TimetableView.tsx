
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

export interface TimetableSlot {
  id: string;
  dayOfWeek: string;
  subject: string;
  class: string;
  teacher: string;
  startTime: string;
  endTime: string;
  classroom: string; // Adding the classroom property that was missing
}

export interface TimetableViewProps {
  slots: TimetableSlot[];
  onEditSlot: (slot: TimetableSlot) => void;
  onDeleteSlot: (id: string) => void;
  getTeacherName: (teacherId: string) => string; // Add this prop
  getClassName: (classId: string) => string; // Add this prop
}

const TimetableView: React.FC<TimetableViewProps> = ({
  slots,
  onEditSlot,
  onDeleteSlot,
  getTeacherName,
  getClassName
}) => {
  // Group by day of the week
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Day</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Classroom</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No timetable slots found. Add your first slot to get started.
              </TableCell>
            </TableRow>
          ) : (
            slots.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell className="font-medium capitalize">
                  {slot.dayOfWeek}
                </TableCell>
                <TableCell className="capitalize">{slot.subject}</TableCell>
                <TableCell>
                  {slot.startTime} - {slot.endTime}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {getClassName(slot.class)}
                  </Badge>
                </TableCell>
                <TableCell>{getTeacherName(slot.teacher)}</TableCell>
                <TableCell>{slot.classroom}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEditSlot(slot)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => onDeleteSlot(slot.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TimetableView;
