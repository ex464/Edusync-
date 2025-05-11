
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FileText, Download, Calendar, ListFilter, BarChart } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AttendanceHeader from "@/components/attendance/AttendanceHeader";
import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceActions from "@/components/attendance/AttendanceActions";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock attendance summary data
const attendanceSummary = {
  daily: {
    present: 85,
    absent: 15,
    late: 5,
    leaves: 3,
    total: 100,
  },
  weekly: {
    present: 82,
    absent: 18,
    late: 7,
    leaves: 4,
    total: 100,
  },
  monthly: {
    present: 80,
    absent: 20,
    late: 8,
    leaves: 5,
    total: 100,
  }
};

// Mock attendance reports
const attendanceReports = [
  {
    id: "AR001",
    name: "Class 10-A Daily Report",
    date: "2025-04-10",
    type: "Class",
    status: "Generated",
    format: "PDF"
  },
  {
    id: "AR002",
    name: "Teacher Weekly Report",
    date: "2025-04-07",
    type: "Teacher",
    status: "Generated",
    format: "Excel"
  },
  {
    id: "AR003",
    name: "School Monthly Report",
    date: "2025-04-01",
    type: "School",
    status: "Generated",
    format: "PDF"
  },
  {
    id: "AR004",
    name: "Absentee Report - April",
    date: "2025-04-05",
    type: "Absentee",
    status: "Generated",
    format: "PDF"
  }
];

const AttendanceManagement = () => {
  const location = useLocation();
  const role = location.pathname.includes("/admin") ? "admin" : "teacher";
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [isMarkingAttendance, setIsMarkingAttendance] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("attendance");
  const [reportType, setReportType] = useState<string>("daily");
  const [reportFor, setReportFor] = useState<string>("students");
  const [reportFormat, setReportFormat] = useState<string>("pdf");

  // Fetch attendance data based on filters
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockData = generateMockAttendanceData(selectedDate, selectedClass, selectedSection);
    setAttendanceData(mockData);
  }, [selectedDate, selectedClass, selectedSection]);

  const generateMockAttendanceData = (date: Date, classFilter: string, sectionFilter: string) => {
    // This would be replaced by actual API data in a real app
    const students = [
      { id: "1", name: "John Smith", class: "10", section: "A", rollNumber: "2023001" },
      { id: "2", name: "Sarah Johnson", class: "10", section: "B", rollNumber: "2023002" },
      { id: "3", name: "Michael Brown", class: "11", section: "A", rollNumber: "2023003" },
      { id: "4", name: "Emily Davis", class: "11", section: "B", rollNumber: "2023004" },
      { id: "5", name: "David Wilson", class: "12", section: "A", rollNumber: "2023005" },
    ];

    const statuses = ["present", "absent", "late"];
    
    return students
      .filter(student => 
        (classFilter === "all" || student.class === classFilter) && 
        (sectionFilter === "all" || student.section === sectionFilter)
      )
      .map(student => ({
        ...student,
        date: date.toISOString(),
        timeIn: new Date(date).setHours(8, Math.floor(Math.random() * 30), 0),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        markedBy: "Teacher Name",
        notes: ""
      }));
  };

  const handleMarkAttendance = (studentId: string, status: string) => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.id === studentId ? { ...item, status } : item
      )
    );
    
    toast({
      title: "Attendance Updated",
      description: `Student attendance marked as ${status}`,
    });
  };

  const handleBulkMarkAttendance = (status: string) => {
    setAttendanceData(prev => 
      prev.map(item => ({ ...item, status }))
    );
    
    toast({
      title: "Bulk Attendance Updated",
      description: `All students marked as ${status}`,
    });
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    
    // In a real app, this would generate and download a report
    setTimeout(() => {
      setIsGeneratingReport(false);
      setActiveTab("reports");
      toast({
        title: "Report Generated",
        description: "Attendance report has been generated successfully",
      });
    }, 1500);
  };

  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would download the report
    toast({
      title: "Downloading Report",
      description: `Report ${reportId} is being downloaded`,
    });
  };

  const handleParentNotification = (studentIds: string[]) => {
    // In a real app, this would send notifications to parents
    toast({
      title: "Notifications Sent",
      description: `Notifications sent to parents of ${studentIds.length} absent students`,
    });
  };

  const calculateAttendancePercentage = (status: string, type: 'daily' | 'weekly' | 'monthly' = 'daily') => {
    const data = attendanceSummary[type];
    return Math.round((data[status as keyof typeof data] / data.total) * 100);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
              <TabsTrigger value="summary">Attendance Summary</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              {activeTab === "attendance" && (
                <>
                  <Button
                    variant={isMarkingAttendance ? "default" : "outline"}
                    onClick={() => setIsMarkingAttendance(!isMarkingAttendance)}
                  >
                    {isMarkingAttendance ? "Finish Marking" : "Mark Attendance"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport}
                  >
                    {isGeneratingReport ? "Generating..." : "Generate Report"}
                  </Button>
                </>
              )}
              
              {activeTab === "reports" && (
                <Button onClick={() => setIsGeneratingReport(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="attendance" className="space-y-6">
            <AttendanceFilters
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
            
            <AttendanceTable 
              attendanceData={attendanceData}
              isMarkingAttendance={isMarkingAttendance} 
              handleMarkAttendance={handleMarkAttendance}
            />
            
            {isMarkingAttendance && (
              <AttendanceActions
                handleBulkMarkAttendance={handleBulkMarkAttendance}
                handleParentNotification={() => {
                  const absentStudents = attendanceData
                    .filter(student => student.status === "absent")
                    .map(student => student.id);
                  handleParentNotification(absentStudents);
                }}
              />
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={reportFor} onValueChange={setReportFor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="teachers">Teachers</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Summary
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Present</CardTitle>
                  <CardDescription>
                    {reportType.charAt(0).toUpperCase() + reportType.slice(1)} attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {calculateAttendancePercentage('present', reportType as any)}%
                  </div>
                  <p className="text-muted-foreground">
                    {attendanceSummary[reportType as keyof typeof attendanceSummary].present} out of 
                    {' '}{attendanceSummary[reportType as keyof typeof attendanceSummary].total}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Absent</CardTitle>
                  <CardDescription>
                    {reportType.charAt(0).toUpperCase() + reportType.slice(1)} absence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {calculateAttendancePercentage('absent', reportType as any)}%
                  </div>
                  <p className="text-muted-foreground">
                    {attendanceSummary[reportType as keyof typeof attendanceSummary].absent} out of 
                    {' '}{attendanceSummary[reportType as keyof typeof attendanceSummary].total}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Late</CardTitle>
                  <CardDescription>
                    {reportType.charAt(0).toUpperCase() + reportType.slice(1)} late arrivals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">
                    {calculateAttendancePercentage('late', reportType as any)}%
                  </div>
                  <p className="text-muted-foreground">
                    {attendanceSummary[reportType as keyof typeof attendanceSummary].late} out of 
                    {' '}{attendanceSummary[reportType as keyof typeof attendanceSummary].total}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">On Leave</CardTitle>
                  <CardDescription>
                    {reportType.charAt(0).toUpperCase() + reportType.slice(1)} approved leaves
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {calculateAttendancePercentage('leaves', reportType as any)}%
                  </div>
                  <p className="text-muted-foreground">
                    {attendanceSummary[reportType as keyof typeof attendanceSummary].leaves} out of 
                    {' '}{attendanceSummary[reportType as keyof typeof attendanceSummary].total}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>
                  View attendance patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2">Attendance trend charts would display here</p>
                    <p className="text-sm text-muted-foreground">Showing data for {reportType} period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            {isGeneratingReport ? (
              <Card>
                <CardHeader>
                  <CardTitle>Generate New Report</CardTitle>
                  <CardDescription>
                    Configure and generate attendance reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select defaultValue="daily" onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Report</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                          <SelectItem value="monthly">Monthly Report</SelectItem>
                          <SelectItem value="custom">Custom Period</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">User Type</label>
                      <Select defaultValue="students" onValueChange={setReportFor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="students">Students</SelectItem>
                          <SelectItem value="teachers">Teachers</SelectItem>
                          <SelectItem value="all">All Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Format</label>
                      <Select defaultValue="pdf" onValueChange={setReportFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Additional Options</label>
                      <Select defaultValue="detailed">
                        <SelectTrigger>
                          <SelectValue placeholder="Select detail level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detailed">Detailed Report</SelectItem>
                          <SelectItem value="summary">Summary Only</SelectItem>
                          <SelectItem value="charts">Include Charts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsGeneratingReport(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleGenerateReport}>
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Previous Reports</h2>
                  <Button onClick={() => setIsGeneratingReport(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate New Report
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Date Generated</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AttendanceManagement;
