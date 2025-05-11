
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimetableSlot } from "./TimetableView";
import { Badge } from "@/components/ui/badge";

export interface TimetableCalendarViewProps {
  slots: TimetableSlot[];
  onToggleView: () => void;
  getTeacherName: (teacherId: string) => string;
  getClassName: (classId: string) => string;
}

const TimetableCalendarView: React.FC<TimetableCalendarViewProps> = ({ 
  slots,
  onToggleView,
  getTeacherName,
  getClassName
}) => {
  const today = new Date();
  
  // Format the slots for display in the calendar
  const formatSlots = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
    return slots.map(slot => {
      const dayIndex = days.indexOf(slot.dayOfWeek.toLowerCase());
      if (dayIndex === -1) return null;
      
      const slotDate = new Date(today);
      slotDate.setDate(today.getDate() - today.getDay() + dayIndex);
      
      return {
        ...slot,
        date: slotDate,
        display: (
          <div className="p-2 border-l-2 border-primary bg-primary/10 rounded-sm mb-1 text-xs">
            <div className="font-semibold">{slot.subject}</div>
            <div>{slot.startTime} - {slot.endTime}</div>
            <div>{getClassName(slot.class)}</div>
            <div>{getTeacherName(slot.teacher)}</div>
          </div>
        )
      };
    }).filter(Boolean);
  };
  
  // Group slots by date
  const groupSlotsByDate = () => {
    const formatted = formatSlots();
    const grouped: Record<string, any[]> = {};
    
    formatted?.forEach(slot => {
      if (!slot) return;
      
      const dateStr = slot.date.toDateString();
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(slot);
    });
    
    return grouped;
  };
  
  const groupedSlots = groupSlotsByDate();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Timetable Calendar View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3">
          <Calendar
            mode="range"
            selected={{
              from: today,
              to: today
            }}
            className="rounded-md border pointer-events-auto"
            components={{
              Day: ({ date, ...props }) => {
                // Standard JavaScript Date doesn't have toDate() - date is already a Date object
                const dateStr = date.toDateString();
                const daySlots = groupedSlots[dateStr];
                
                return (
                  <div {...props}>
                    <div>{date.getDate()}</div>
                    <div className="mt-1">
                      {daySlots?.map((slot, idx) => (
                        <React.Fragment key={slot.id}>{slot.display}</React.Fragment>
                      ))}
                    </div>
                  </div>
                )
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableCalendarView;
