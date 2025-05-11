
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Download
} from "lucide-react";
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarViewType } from "@/pages/CalendarPage";
import { EventType } from "@/types/calendar";

interface CalendarHeaderProps {
  viewType: CalendarViewType;
  setViewType: (view: CalendarViewType) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  canEdit: boolean;
  onAddEvent: (event: any) => void;
  onExportCalendar: () => void;
}

const CalendarHeader = ({
  viewType,
  setViewType,
  selectedDate,
  setSelectedDate,
  canEdit,
  onAddEvent,
  onExportCalendar
}: CalendarHeaderProps) => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    allDay: false,
    type: "event" as EventType,
    location: "",
  });

  const navigatePrevious = () => {
    switch (viewType) {
      case "month":
        setSelectedDate(subMonths(selectedDate, 1));
        break;
      case "week":
        setSelectedDate(subWeeks(selectedDate, 1));
        break;
      case "day":
        setSelectedDate(subDays(selectedDate, 1));
        break;
      default:
        setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const navigateNext = () => {
    switch (viewType) {
      case "month":
        setSelectedDate(addMonths(selectedDate, 1));
        break;
      case "week":
        setSelectedDate(addWeeks(selectedDate, 1));
        break;
      case "day":
        setSelectedDate(addDays(selectedDate, 1));
        break;
      default:
        setSelectedDate(addMonths(selectedDate, 1));
    }
  };

  const handleAddEvent = () => {
    onAddEvent({
      ...newEvent,
      createdBy: {
        id: "current-user-id", // This would come from auth context in a real app
        name: "Current User", // This would come from auth context in a real app
        role: "admin", // This would come from auth context in a real app
      }
    });
    
    // Reset form
    setNewEvent({
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
      allDay: false,
      type: "event",
      location: "",
    });
    
    setIsAddEventOpen(false);
  };

  const getTitleByViewType = () => {
    switch (viewType) {
      case "month":
        return format(selectedDate, "MMMM yyyy");
      case "week":
        return `Week of ${format(selectedDate, "MMM d, yyyy")}`;
      case "day":
        return format(selectedDate, "EEEE, MMMM d, yyyy");
      case "agenda":
        return "Upcoming Events";
      default:
        return format(selectedDate, "MMMM yyyy");
    }
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Calendar</h1>
        <p className="text-muted-foreground">Manage and view school events</p>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        {canEdit && (
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="sm:w-auto flex">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select 
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent({ ...newEvent, type: value as EventType })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="start" className="text-right pt-2">Date</Label>
                  <div className="col-span-3">
                    <Calendar
                      mode="single"
                      selected={newEvent.start}
                      onSelect={(date) => date && setNewEvent({ ...newEvent, start: date, end: date })}
                      initialFocus
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <div></div>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Checkbox 
                      id="all-day" 
                      checked={newEvent.allDay}
                      onCheckedChange={(checked) => 
                        setNewEvent({ ...newEvent, allDay: checked === true })
                      }
                    />
                    <Label htmlFor="all-day">All day event</Label>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddEvent}>Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onExportCalendar}
          className="sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Sync with Google
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon"
            onClick={navigatePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-4 font-medium">
            {getTitleByViewType()}
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={navigateNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && setViewType(value as CalendarViewType)}>
          <ToggleGroupItem value="month" aria-label="Month view">
            Month
          </ToggleGroupItem>
          <ToggleGroupItem value="week" aria-label="Week view">
            Week
          </ToggleGroupItem>
          <ToggleGroupItem value="day" aria-label="Day view">
            Day
          </ToggleGroupItem>
          <ToggleGroupItem value="agenda" aria-label="Agenda view">
            Agenda
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default CalendarHeader;
