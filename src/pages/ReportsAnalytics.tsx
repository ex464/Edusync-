
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportsFilter from "@/components/reports/ReportsFilter";
import ReportTypeSelector from "@/components/reports/ReportTypeSelector";
import ReportVisualization from "@/components/reports/ReportVisualization";
import ReportInsights from "@/components/reports/ReportInsights";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

export type ReportType = "attendance" | "exam" | "fee" | "progress";

const ReportsAnalytics = () => {
  const [reportType, setReportType] = useState<ReportType>("attendance");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const { toast } = useToast();

  const handleExport = (format: "pdf" | "excel") => {
    toast({
      title: `Exporting ${reportType} report as ${format.toUpperCase()}`,
      description: "Your download will begin shortly.",
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <ReportsHeader onExport={handleExport} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <ReportsFilter 
                dateRange={dateRange}
                setDateRange={setDateRange}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedTeacher={selectedTeacher}
                setSelectedTeacher={setSelectedTeacher}
              />
              <ReportTypeSelector 
                reportType={reportType}
                setReportType={setReportType}
              />
              <ReportInsights reportType={reportType} />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <ReportVisualization 
              reportType={reportType} 
              dateRange={dateRange || {}}
              selectedClass={selectedClass}
              selectedTeacher={selectedTeacher}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsAnalytics;
