
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRange } from "react-day-picker";

interface ReportsFilterProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedTeacher: string;
  setSelectedTeacher: (value: string) => void;
}

const ReportsFilter = ({
  dateRange,
  setDateRange,
  selectedClass,
  setSelectedClass,
  selectedTeacher,
  setSelectedTeacher,
}: ReportsFilterProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Select date range</span>
                )}
                {(dateRange?.from || dateRange?.to) && (
                  <X 
                    className="ml-auto h-4 w-4 opacity-50 hover:opacity-100" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDateRange(undefined);
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Class</label>
          <Select
            value={selectedClass}
            onValueChange={setSelectedClass}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="class-1">Class 1</SelectItem>
              <SelectItem value="class-2">Class 2</SelectItem>
              <SelectItem value="class-3">Class 3</SelectItem>
              <SelectItem value="class-4">Class 4</SelectItem>
              <SelectItem value="class-5">Class 5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Teacher</label>
          <Select
            value={selectedTeacher}
            onValueChange={setSelectedTeacher}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              <SelectItem value="teacher-1">John Smith</SelectItem>
              <SelectItem value="teacher-2">Sara Johnson</SelectItem>
              <SelectItem value="teacher-3">Michael Brown</SelectItem>
              <SelectItem value="teacher-4">Emily Davis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsFilter;
