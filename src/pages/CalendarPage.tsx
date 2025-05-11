
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarView from "@/components/calendar/CalendarView";
import EventDetailsSidebar from "@/components/calendar/EventDetailsSidebar";
import { useToast } from "@/hooks/use-toast";
import { CalendarEvent } from "@/types/calendar";

export type CalendarViewType = "month" | "week" | "day" | "agenda";

const CalendarPage = ({ role }: { role: "admin" | "teacher" | "student" }) => {
  const [viewType, setViewType] = useState<CalendarViewType>("month");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { toast } = useToast();

  const canEdit = role === "admin" || role === "teacher";

  const handleAddEvent = (event: Omit<CalendarEvent, "id">) => {
    // In a real app, this would make an API call to add the event
    toast({
      title: "Event Added",
      description: `${event.title} has been added to the calendar.`,
    });
  };

  const handleUpdateEvent = (event: CalendarEvent) => {
    // In a real app, this would make an API call to update the event
    toast({
      title: "Event Updated",
      description: `${event.title} has been updated.`,
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    // In a real app, this would make an API call to delete the event
    toast({
      title: "Event Deleted",
      description: "The event has been removed from the calendar.",
    });
    setSelectedEvent(null);
  };

  const handleExportCalendar = () => {
    toast({
      title: "Calendar Exported",
      description: "Your calendar has been exported to Google Calendar.",
    });
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <CalendarHeader 
          viewType={viewType}
          setViewType={setViewType}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          canEdit={canEdit}
          onAddEvent={handleAddEvent}
          onExportCalendar={handleExportCalendar}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CalendarView 
              viewType={viewType}
              selectedDate={selectedDate}
              onEventSelect={setSelectedEvent}
              canEdit={canEdit}
            />
          </div>
          
          <div className="lg:col-span-1">
            <EventDetailsSidebar 
              selectedEvent={selectedEvent}
              onClose={() => setSelectedEvent(null)}
              onUpdate={canEdit ? handleUpdateEvent : undefined}
              onDelete={canEdit ? handleDeleteEvent : undefined}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
