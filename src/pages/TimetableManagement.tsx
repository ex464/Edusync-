
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TimetableHeader from "@/components/timetable/TimetableHeader";
import TimetableSlotDialog from "@/components/timetable/TimetableSlotDialog";
import TimetableView, { TimetableSlot } from "@/components/timetable/TimetableView";
import TimetableCalendarView from "@/components/timetable/TimetableCalendarView";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Loader2, GraduationCap, School } from "lucide-react";

// Mock data for timetable slots
const initialSlots: TimetableSlot[] = [
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
    class: "class-2",
    teacher: "teacher-2",
    startTime: "09:00",
    endTime: "10:00",
    classroom: "Room 102",
  },
  {
    id: "3",
    dayOfWeek: "tuesday",
    subject: "science",
    class: "class-3",
    teacher: "teacher-3",
    startTime: "10:00",
    endTime: "11:00",
    classroom: "Room 103",
  },
  {
    id: "4",
    dayOfWeek: "wednesday",
    subject: "history",
    class: "class-4",
    teacher: "teacher-4",
    startTime: "11:00",
    endTime: "12:00",
    classroom: "Room 104",
  },
  {
    id: "5",
    dayOfWeek: "thursday",
    subject: "geography",
    class: "class-1",
    teacher: "teacher-5",
    startTime: "13:00",
    endTime: "14:00",
    classroom: "Room 105",
  },
];

// Mock data for teachers and classes
const mockTeachers = [
  { id: "teacher-1", name: "Dr. Sharma" },
  { id: "teacher-2", name: "Ms. Patel" },
  { id: "teacher-3", name: "Mr. Kumar" },
  { id: "teacher-4", name: "Mrs. Singh" },
  { id: "teacher-5", name: "Prof. Gupta" },
];

const mockClasses = [
  { id: "class-1", name: "Class 10-A" },
  { id: "class-2", name: "Class 10-B" },
  { id: "class-3", name: "Class 11-A" },
  { id: "class-4", name: "Class 11-B" },
];

interface TimetableManagementProps {
  role: "admin" | "teacher";
}

const TimetableManagement = ({ role }: TimetableManagementProps) => {
  const [slots, setSlots] = useState<TimetableSlot[]>(initialSlots);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarView, setIsCalendarView] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);
  const [viewType, setViewType] = useState<"all" | "teacher" | "class">("all");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const handleAddSlot = () => {
    setEditingSlot(null);
    setIsDialogOpen(true);
  };

  const handleEditSlot = (slot: TimetableSlot) => {
    setEditingSlot(slot);
    setIsDialogOpen(true);
  };

  const handleDeleteSlot = (id: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSlots((currentSlots) => currentSlots.filter((slot) => slot.id !== id));
      setIsLoading(false);
    }, 500);
  };

  const handleSaveSlot = (values: Omit<TimetableSlot, "id">) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingSlot) {
        // Update existing slot
        setSlots((currentSlots) =>
          currentSlots.map((slot) =>
            slot.id === editingSlot.id ? { ...values, id: slot.id } : slot
          )
        );
      } else {
        // Add new slot
        const newSlot: TimetableSlot = {
          ...values,
          id: uuidv4(),
        };
        
        setSlots((currentSlots) => [...currentSlots, newSlot]);
      }
      
      setIsLoading(false);
      setEditingSlot(null);
    }, 500);
  };

  const toggleView = () => {
    setIsCalendarView(!isCalendarView);
  };

  // Filter slots based on selected view type
  const filteredSlots = slots.filter(slot => {
    if (viewType === "all") return true;
    if (viewType === "teacher" && selectedTeacherId) return slot.teacher === selectedTeacherId;
    if (viewType === "class" && selectedClassId) return slot.class === selectedClassId;
    return true;
  });

  // Get teacher name by id
  const getTeacherName = (teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : teacherId;
  };

  // Get class name by id
  const getClassName = (classId: string) => {
    const classObj = mockClasses.find(c => c.id === classId);
    return classObj ? classObj.name : classId;
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <TimetableHeader onAddSlot={handleAddSlot} />

        <Tabs defaultValue="timetable" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="view-options">View Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timetable" className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Select value={viewType} onValueChange={(value) => setViewType(value as "all" | "teacher" | "class")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Timetables</SelectItem>
                    <SelectItem value="teacher">By Teacher</SelectItem>
                    <SelectItem value="class">By Class</SelectItem>
                  </SelectContent>
                </Select>
                
                {viewType === "teacher" && (
                  <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map(teacher => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {viewType === "class" && (
                  <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClasses.map(cls => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <Button 
                variant="outline" 
                onClick={toggleView}
                className="flex items-center gap-2"
              >
                <CalendarDays className="h-4 w-4" />
                {isCalendarView ? "Table View" : "Calendar View"}
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isCalendarView ? (
              <TimetableCalendarView 
                slots={filteredSlots} 
                onToggleView={toggleView}
                getTeacherName={getTeacherName}
                getClassName={getClassName}
              />
            ) : (
              <TimetableView
                slots={filteredSlots}
                onEditSlot={handleEditSlot}
                onDeleteSlot={handleDeleteSlot}
                getTeacherName={getTeacherName}
                getClassName={getClassName}
              />
            )}
          </TabsContent>
          
          <TabsContent value="view-options">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Teacher Timetables</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  View timetables for individual teachers showing their assigned classes, subjects, timings, and classroom details.
                </p>
                <div className="space-y-2">
                  {mockTeachers.map(teacher => (
                    <Button 
                      key={teacher.id} 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setViewType("teacher");
                        setSelectedTeacherId(teacher.id);
                      }}
                    >
                      {teacher.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-md p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Class Timetables</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  View timetables for individual classes showing assigned teachers, subjects, timings, and classroom details.
                </p>
                <div className="space-y-2">
                  {mockClasses.map(cls => (
                    <Button 
                      key={cls.id} 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setViewType("class");
                        setSelectedClassId(cls.id);
                      }}
                    >
                      {cls.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <TimetableSlotDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isEditing={!!editingSlot}
        defaultValues={editingSlot || undefined}
        onSave={handleSaveSlot}
        teachers={mockTeachers}
        classes={mockClasses}
      />
    </DashboardLayout>
  );
};

export default TimetableManagement;
