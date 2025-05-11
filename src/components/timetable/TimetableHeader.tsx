
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimetableHeaderProps {
  onAddSlot: () => void;
}

const TimetableHeader = ({ onAddSlot }: TimetableHeaderProps) => {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Timetable Management</h1>
        <p className="text-muted-foreground">Manage and organize class schedules</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Select
          defaultValue="all"
          onValueChange={(value) => setSelectedClass(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Class" />
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
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={onAddSlot} className="flex-1 sm:flex-none">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Slot
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimetableHeader;
