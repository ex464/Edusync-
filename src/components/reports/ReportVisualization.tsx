
import { ReportType } from "@/pages/ReportsAnalytics";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReportVisualizationProps {
  reportType: ReportType;
  dateRange: { from?: Date; to?: Date };
  selectedClass: string;
  selectedTeacher: string;
}

// Define specific data types for each report type
type AttendanceData = Array<{
  name: string;
  present: number;
  absent: number;
  late: number;
}>;

type ExamData = Array<{
  name: string;
  average: number;
  highest: number;
  lowest: number;
}>;

type FeeData = Array<{
  name: string;
  collected: number;
  pending: number;
}>;

type ProgressData = Array<{
  name: string;
  score: number;
}>;

// Union type for all possible report data
type ReportData = AttendanceData | ExamData | FeeData | ProgressData;

// Type for chart colors
type ChartColors = {
  present?: string;
  absent?: string;
  late?: string;
  average?: string;
  highest?: string;
  lowest?: string;
  collected?: string;
  pending?: string;
} | string[];

const ReportVisualization = ({
  reportType,
  dateRange,
  selectedClass,
  selectedTeacher
}: ReportVisualizationProps) => {
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  
  // Mock data generator with proper type annotations
  const getReportData = (): ReportData => {
    switch (reportType) {
      case "attendance":
        return [
          { name: "Jan", present: 85, absent: 15, late: 5 },
          { name: "Feb", present: 88, absent: 12, late: 3 },
          { name: "Mar", present: 90, absent: 10, late: 2 },
          { name: "Apr", present: 92, absent: 8, late: 4 },
          { name: "May", present: 87, absent: 13, late: 5 },
          { name: "Jun", present: 93, absent: 7, late: 3 }
        ] as AttendanceData;
      case "exam":
        return [
          { name: "Math", average: 78, highest: 98, lowest: 45 },
          { name: "Science", average: 82, highest: 95, lowest: 52 },
          { name: "English", average: 85, highest: 94, lowest: 60 },
          { name: "History", average: 75, highest: 92, lowest: 48 },
          { name: "Geography", average: 79, highest: 96, lowest: 51 }
        ] as ExamData;
      case "fee":
        return [
          { name: "Jan", collected: 85000, pending: 12000 },
          { name: "Feb", collected: 92000, pending: 8000 },
          { name: "Mar", collected: 88000, pending: 14000 },
          { name: "Apr", collected: 95000, pending: 5000 },
          { name: "May", collected: 93000, pending: 7000 },
          { name: "Jun", collected: 97000, pending: 3000 }
        ] as FeeData;
      case "progress":
        return [
          { name: "Term 1", score: 75 },
          { name: "Term 2", score: 80 },
          { name: "Term 3", score: 85 },
          { name: "Term 4", score: 92 }
        ] as ProgressData;
      default:
        return [] as ProgressData;
    }
  };

  const getChartColors = (): ChartColors => {
    switch (reportType) {
      case "attendance":
        return {
          present: "#4ade80",
          absent: "#f87171",
          late: "#fbbf24"
        };
      case "exam":
        return {
          average: "#60a5fa",
          highest: "#34d399",
          lowest: "#fb923c"
        };
      case "fee":
        return {
          collected: "#8b5cf6",
          pending: "#94a3b8"
        };
      case "progress":
        return ["#8b5cf6", "#60a5fa", "#34d399", "#f87171"];
      default:
        return {};
    }
  };

  const renderChart = () => {
    const data = getReportData();
    const colors = getChartColors();

    switch (reportType) {
      case "attendance": {
        const attendanceData = data as AttendanceData;
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill={(colors as any).present} />
              <Bar dataKey="absent" fill={(colors as any).absent} />
              <Bar dataKey="late" fill={(colors as any).late} />
            </BarChart>
          </ResponsiveContainer>
        );
      }
      case "exam": {
        const examData = data as ExamData;
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={examData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill={(colors as any).average} />
              <Bar dataKey="highest" fill={(colors as any).highest} />
              <Bar dataKey="lowest" fill={(colors as any).lowest} />
            </BarChart>
          </ResponsiveContainer>
        );
      }
      case "fee": {
        const feeData = data as FeeData;
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={feeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="collected" stroke={(colors as any).collected} activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke={(colors as any).pending} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      case "progress": {
        const progressData = data as ProgressData;
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8b5cf6" activeDot={{ r: 8 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      default:
        return null;
    }
  };

  const renderTable = () => {
    const data = getReportData();
    
    if (data.length === 0) {
      return <div>No data available</div>;
    }
    
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableHead key={key} className="capitalize">
                  {key}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {Object.entries(row).map(([key, value]) => (
                  <TableCell key={key}>
                    {typeof value === "number" ? value.toLocaleString() : String(value)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderTitle = () => {
    switch (reportType) {
      case "attendance":
        return "Attendance Report";
      case "exam":
        return "Exam Performance Report";
      case "fee":
        return "Fee Payment Report";
      case "progress":
        return "Student Progress Report";
      default:
        return "Report";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{renderTitle()}</h2>
          <div className="bg-muted rounded-md p-1">
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "chart" ? "bg-background shadow" : ""
              }`}
              onClick={() => setViewMode("chart")}
            >
              Chart
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "table" ? "bg-background shadow" : ""
              }`}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
          </div>
        </div>
        
        <div className="min-h-[400px]">
          {viewMode === "chart" ? renderChart() : renderTable()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportVisualization;
