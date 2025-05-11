
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, PieChart, FileText, UsersRound 
} from "lucide-react";
import { ReportType } from "@/pages/ReportsAnalytics";

interface ReportTypeSelectorProps {
  reportType: ReportType;
  setReportType: (type: ReportType) => void;
}

const ReportTypeSelector = ({ 
  reportType, 
  setReportType 
}: ReportTypeSelectorProps) => {
  
  const reportTypes = [
    {
      id: "attendance",
      icon: UsersRound,
      label: "Attendance",
      description: "Student attendance statistics and trends"
    },
    {
      id: "exam",
      icon: FileText,
      label: "Exam Performance",
      description: "Student academic performance metrics"
    },
    {
      id: "fee",
      icon: BarChart,
      label: "Fee Payment",
      description: "Payment collection status and history"
    },
    {
      id: "progress",
      icon: PieChart,
      label: "Student Progress",
      description: "Holistic student growth and development"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium">Report Type</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {reportTypes.map((type) => (
            <div 
              key={type.id}
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                reportType === type.id ? "bg-accent" : ""
              }`}
              onClick={() => setReportType(type.id as ReportType)}
            >
              <div className={`p-2 rounded-lg ${
                reportType === type.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}>
                <type.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{type.label}</h3>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTypeSelector;
