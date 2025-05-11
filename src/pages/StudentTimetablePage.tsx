
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StudentTimetableView from "@/components/timetable/StudentTimetableView";
import { Button } from "@/components/ui/button";
import { CalendarDays, Grid } from "lucide-react";

const StudentTimetablePage = () => {
  const [isCalendarView, setIsCalendarView] = useState(false);

  const toggleView = () => {
    setIsCalendarView(!isCalendarView);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Class Timetable</h1>
            <p className="text-muted-foreground">View your weekly class schedule</p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={toggleView}
              className="flex items-center gap-2"
            >
              {isCalendarView ? (
                <>
                  <Grid className="h-4 w-4" />
                  List View
                </>
              ) : (
                <>
                  <CalendarDays className="h-4 w-4" />
                  Calendar View
                </>
              )}
            </Button>
          </div>
        </div>

        <StudentTimetableView isCalendarView={isCalendarView} />
      </div>
    </DashboardLayout>
  );
};

export default StudentTimetablePage;
