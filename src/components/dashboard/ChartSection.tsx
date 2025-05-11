
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample attendance data
const attendanceData = [
  { month: "Jan", present: 92, absent: 8 },
  { month: "Feb", present: 88, absent: 12 },
  { month: "Mar", present: 95, absent: 5 },
  { month: "Apr", present: 90, absent: 10 },
  { month: "May", present: 86, absent: 14 },
  { month: "Jun", present: 94, absent: 6 },
];

// Sample performance data
const performanceData = [
  { month: "Jan", science: 85, math: 78, english: 82 },
  { month: "Feb", science: 82, math: 80, english: 85 },
  { month: "Mar", science: 88, math: 84, english: 87 },
  { month: "Apr", science: 86, math: 88, english: 84 },
  { month: "May", science: 90, math: 86, english: 88 },
  { month: "Jun", science: 92, math: 90, english: 90 },
];

const ChartSection = () => {
  const [attendancePeriod, setAttendancePeriod] = useState("6months");
  const [performancePeriod, setPerformancePeriod] = useState("6months");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Attendance Overview</CardTitle>
            <CardDescription>Monthly attendance record</CardDescription>
          </div>
          <Select
            value={attendancePeriod}
            onValueChange={setAttendancePeriod}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="month" type="category" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="present" fill="rgba(34, 116, 215, 0.8)" radius={[0, 4, 4, 0]} minPointSize={2} barSize={16} name="Present" />
                <Bar dataKey="absent" fill="rgba(255, 90, 95, 0.6)" radius={[0, 4, 4, 0]} minPointSize={2} barSize={16} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Performance Trends</CardTitle>
            <CardDescription>Subject-wise performance</CardDescription>
          </div>
          <Select
            value={performancePeriod}
            onValueChange={setPerformancePeriod}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis domain={[40, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="science" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name="Science"
                />
                <Line 
                  type="monotone" 
                  dataKey="math" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name="Math"
                />
                <Line 
                  type="monotone" 
                  dataKey="english" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name="English"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
