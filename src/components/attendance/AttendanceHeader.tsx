
import { FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttendanceHeaderProps {
  isMarkingAttendance: boolean;
  setIsMarkingAttendance: (value: boolean) => void;
  handleGenerateReport: () => void;
  isGeneratingReport: boolean;
}

const AttendanceHeader = ({
  isMarkingAttendance,
  setIsMarkingAttendance,
  handleGenerateReport,
  isGeneratingReport
}: AttendanceHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
      <div className="flex gap-2">
        <Button
          variant={isMarkingAttendance ? "secondary" : "default"}
          onClick={() => setIsMarkingAttendance(!isMarkingAttendance)}
        >
          <Check className="mr-2 h-4 w-4" />
          {isMarkingAttendance ? "Finish Marking" : "Mark Attendance"}
        </Button>
        <Button variant="outline" onClick={handleGenerateReport} disabled={isGeneratingReport}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default AttendanceHeader;
