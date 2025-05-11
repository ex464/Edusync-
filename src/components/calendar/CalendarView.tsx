
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay,
  addDays,
  getHours,
  isToday,
  parse,
  startOfDay,
  endOfDay,
} from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarViewType } from "@/pages/CalendarPage";
import { CalendarEvent, EventType } from "@/types/calendar";

// Mock data for calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Final Math Exam",
    description: "Comprehensive exam covering all semester material",
    start: new Date(2023, 5, 15, 9, 0),
    end: new Date(2023, 5, 15, 11, 0),
    allDay: false,
    type: "exam",
    location: "Room 101",
    createdBy: {
      id: "teacher-1",
      name: "John Smith",
      role: "teacher"
    }
  },
  {
    id: "2",
    title: "Science Fair",
    description: "Annual science project presentation",
    start: new Date(2023, 5, 20, 14, 0),
    end: new Date(2023, 5, 20, 17, 0),
    allDay: false,
    type: "event",
    location: "Main Hall",
    createdBy: {
      id: "admin-1",
      name: "Admin User",
      role: "admin"
    }
  },
  {
    id: "3",
    title: "Summer Break",
    description: "School closed for summer vacation",
    start: new Date(2023, 6, 1),
    end: new Date(2023, 7, 31),
    allDay: true,
    type: "holiday",
    createdBy: {
      id: "admin-1",
      name: "Admin User",
      role: "admin"
    }
  },
  {
    id: "4",
    title: "Parent-Teacher Meeting",
    description: "Discuss student progress with parents",
    start: new Date(2023, 5, 25, 16, 30),
    end: new Date(2023, 5, 25, 19, 0),
    allDay: false,
    type: "meeting",
    location: "School Auditorium",
    createdBy: {
      id: "admin-1",
      name: "Admin User",
      role: "admin"
    }
  },
  {
    id: "5",
    title: "Sports Day",
    description: "Annual athletics competition",
    start: new Date(2023, 5, 30),
    end: new Date(2023, 5, 30),
    allDay: true,
    type: "event",
    location: "School Grounds",
    createdBy: {
      id: "teacher-2",
      name: "Sara Johnson",
      role: "teacher"
    }
  }
];

const getEventTypeStyles = (type: EventType) => {
  switch (type) {
    case "exam":
      return "bg-red-100 text-red-800 border-red-200";
    case "holiday":
      return "bg-green-100 text-green-800 border-green-200";
    case "meeting":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "class":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "event":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

interface CalendarViewProps {
  viewType: CalendarViewType;
  selectedDate: Date;
  onEventSelect: (event: CalendarEvent) => void;
  canEdit: boolean;
}

const CalendarView = ({
  viewType,
  selectedDate,
  onEventSelect,
  canEdit
}: CalendarViewProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  
  // In a real app, we would fetch events based on the date range
  useEffect(() => {
    // Simulate API call to get events
    setEvents(mockEvents);
  }, [selectedDate, viewType]);

  // Render month view
  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    
    // Group events by day
    const eventsByDay: Record<string, CalendarEvent[]> = {};
    events.forEach(event => {
      const eventDate = format(event.start, "yyyy-MM-dd");
      if (!eventsByDay[eventDate]) {
        eventsByDay[eventDate] = [];
      }
      eventsByDay[eventDate].push(event);
    });
    
    return (
      <div className="h-full">
        <div className="grid grid-cols-7 gap-px">
          {dayNames.map(day => (
            <div key={day} className="text-center py-2 font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-muted">
          {days.map(day => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayEvents = eventsByDay[dateKey] || [];
            
            return (
              <div
                key={day.toString()}
                className={cn(
                  "min-h-24 p-1.5 bg-card border border-muted",
                  !isSameMonth(day, monthStart) && "text-muted-foreground",
                  isToday(day) && "bg-accent/20"
                )}
              >
                <div className="text-right mb-1">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                      isToday(day) && "bg-primary text-primary-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "px-1.5 py-0.5 text-xs rounded truncate cursor-pointer",
                        getEventTypeStyles(event.type)
                      )}
                      onClick={() => onEventSelect(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      + {dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 7pm
    
    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 min-w-[800px]">
          {/* Time column */}
          <div className="col-span-1 border-r">
            <div className="h-12 border-b"></div>
            {hours.map(hour => (
              <div key={hour} className="h-20 border-b text-sm pl-2 pt-1 text-muted-foreground">
                {hour}:00
              </div>
            ))}
          </div>
          
          {/* Days columns */}
          {weekDays.map(day => (
            <div key={day.toString()} className="col-span-1 border-r">
              <div className={cn(
                "h-12 flex items-center justify-center border-b font-medium",
                isToday(day) && "bg-accent/20"
              )}>
                <div className="text-center">
                  <div>{format(day, "EEE")}</div>
                  <div className={cn(
                    "text-sm",
                    isToday(day) && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                  )}>
                    {format(day, "d")}
                  </div>
                </div>
              </div>
              
              {/* Hour cells */}
              {hours.map(hour => {
                const cellDate = new Date(day);
                cellDate.setHours(hour, 0, 0, 0);
                const nextHour = new Date(cellDate);
                nextHour.setHours(hour + 1);
                
                // Find events in this hour
                const hourEvents = events.filter(event => {
                  const eventStart = new Date(event.start);
                  return isSameDay(eventStart, day) && getHours(eventStart) === hour;
                });
                
                return (
                  <div key={`${day}-${hour}`} className="h-20 border-b relative">
                    {hourEvents.map(event => (
                      <div
                        key={event.id}
                        className={cn(
                          "absolute left-1 right-1 p-1 rounded text-xs overflow-hidden cursor-pointer",
                          getEventTypeStyles(event.type)
                        )}
                        style={{
                          top: "4px",
                          height: "calc(100% - 8px)"
                        }}
                        onClick={() => onEventSelect(event)}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div>{format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7am to 8pm
    
    return (
      <div className="grid grid-cols-1">
        <div className={cn(
          "text-center py-4 font-medium border-b",
          isToday(selectedDate) && "bg-accent/20"
        )}>
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </div>
        
        {hours.map(hour => {
          const cellDate = new Date(selectedDate);
          cellDate.setHours(hour, 0, 0, 0);
          const nextHour = new Date(cellDate);
          nextHour.setHours(hour + 1);
          
          // Find events in this hour
          const hourEvents = events.filter(event => {
            const eventStart = new Date(event.start);
            return isSameDay(eventStart, selectedDate) && getHours(eventStart) === hour;
          });
          
          return (
            <div key={hour} className="grid grid-cols-12 border-b">
              <div className="col-span-1 py-3 text-right pr-4 text-sm text-muted-foreground">
                {hour}:00
              </div>
              <div className="col-span-11 py-3 min-h-24 relative">
                {hourEvents.map(event => (
                  <div
                    key={event.id}
                    className={cn(
                      "absolute top-1 left-2 right-2 p-2 rounded text-sm overflow-hidden cursor-pointer",
                      getEventTypeStyles(event.type)
                    )}
                    style={{
                      height: "calc(100% - 8px)"
                    }}
                    onClick={() => onEventSelect(event)}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs">{format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}</div>
                    {event.location && <div className="text-xs">📍 {event.location}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render agenda view
  const renderAgendaView = () => {
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
    
    // Group by date
    const eventsByDate: Record<string, CalendarEvent[]> = {};
    sortedEvents.forEach(event => {
      const dateKey = format(event.start, "yyyy-MM-dd");
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    });
    
    return (
      <div className="space-y-6">
        {Object.entries(eventsByDate).map(([dateKey, dayEvents]) => {
          const date = parse(dateKey, "yyyy-MM-dd", new Date());
          
          return (
            <div key={dateKey}>
              <div className={cn(
                "py-2 px-4 font-medium border-b",
                isToday(date) && "bg-accent/20"
              )}>
                {format(date, "EEEE, MMMM d, yyyy")}
              </div>
              <div className="space-y-2 mt-2">
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    className={cn(
                      "p-3 rounded-md cursor-pointer",
                      getEventTypeStyles(event.type)
                    )}
                    onClick={() => onEventSelect(event)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs font-medium rounded-full px-2 py-1 bg-white/20">
                        {event.type}
                      </div>
                    </div>
                    <div className="text-sm mt-1">
                      {event.allDay ? (
                        "All day"
                      ) : (
                        `${format(event.start, "h:mm a")} - ${format(event.end, "h:mm a")}`
                      )}
                    </div>
                    {event.location && <div className="text-sm mt-1">📍 {event.location}</div>}
                    {event.description && (
                      <div className="text-sm mt-2 bg-white/20 p-2 rounded">
                        {event.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="overflow-auto h-[calc(100vh-240px)]">
      {viewType === "month" && renderMonthView()}
      {viewType === "week" && renderWeekView()}
      {viewType === "day" && renderDayView()}
      {viewType === "agenda" && renderAgendaView()}
    </Card>
  );
};

export default CalendarView;
