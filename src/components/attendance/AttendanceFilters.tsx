
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AttendanceFiltersProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedSection: string;
  setSelectedSection: (value: string) => void;
}

const AttendanceFilters = ({
  selectedDate,
  setSelectedDate,
  selectedClass,
  setSelectedClass,
  selectedSection,
  setSelectedSection,
}: AttendanceFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="w-full sm:w-auto">
        <label className="text-sm font-medium mb-1 block">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full sm:w-auto">
        <label className="text-sm font-medium mb-1 block">Class</label>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
            <SelectItem value="11">Class 11</SelectItem>
            <SelectItem value="12">Class 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <label className="text-sm font-medium mb-1 block">Section</label>
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="A">Section A</SelectItem>
            <SelectItem value="B">Section B</SelectItem>
            <SelectItem value="C">Section C</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AttendanceFilters;
