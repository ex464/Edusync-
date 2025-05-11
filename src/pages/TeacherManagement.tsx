import { useState, useEffect } from "react";
import { Search, Upload, UserPlus, Pencil, Trash2, Download, FileText, Briefcase } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherForm from "@/components/teachers/TeacherForm";
import { Badge } from "@/components/ui/badge";

// Mock teacher data
const initialTeachers = [
  {
    id: "1",
    name: "Dr. John Smith",
    subject: "Mathematics",
    contactNumber: "+1234567890",
    email: "john.smith@example.com",
    salary: "$4,500",
    attendanceRate: "98%",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    additionalAssignments: ["School Timetable Coordinator", "Math Club Advisor"],
  },
  {
    id: "2",
    name: "Prof. Sarah Johnson",
    subject: "Physics",
    contactNumber: "+0987654321",
    email: "sarah.johnson@example.com",
    salary: "$4,800",
    attendanceRate: "95%",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    additionalAssignments: ["Science Fair Coordinator", "STEM Program Lead"],
  },
  {
    id: "3",
    name: "Ms. Michael Brown",
    subject: "English",
    contactNumber: "+1122334455",
    email: "michael.brown@example.com",
    salary: "$3,900",
    attendanceRate: "92%",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    additionalAssignments: ["Literary Magazine Editor", "Debate Team Coach"],
  },
  {
    id: "4",
    name: "Mrs. Emily Davis",
    subject: "Chemistry",
    contactNumber: "+5566778899",
    email: "emily.davis@example.com",
    salary: "$4,200",
    attendanceRate: "97%",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    additionalAssignments: ["Lab Safety Coordinator"],
  },
  {
    id: "5",
    name: "Mr. David Wilson",
    subject: "History",
    contactNumber: "+1324354657",
    email: "david.wilson@example.com",
    salary: "$3,800",
    attendanceRate: "94%",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    additionalAssignments: ["Field Trip Coordinator", "History Club Advisor"],
  },
];

// Mock payroll reports
const payrollReports = [
  {
    id: "pr001",
    month: "April 2025",
    status: "Processed",
    date: "2025-04-05",
    amount: "$24,500",
    teachers: 5,
  },
  {
    id: "pr002",
    month: "March 2025",
    status: "Processed",
    date: "2025-03-05",
    amount: "$24,200",
    teachers: 5,
  },
  {
    id: "pr003",
    month: "February 2025",
    status: "Processed",
    date: "2025-02-05",
    amount: "$23,900",
    teachers: 5,
  }
];

const TeacherManagement = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPayrollDialogOpen, setIsPayrollDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<any>(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("teachers");
  const [newAssignment, setNewAssignment] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.contactNumber.includes(searchQuery) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (teacher.additionalAssignments && teacher.additionalAssignments.some(
        assignment => assignment.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    const matchesSubject = subjectFilter ? teacher.subject === subjectFilter : true;
    
    return matchesSearch && matchesSubject;
  });

  const handleAddTeacher = (newTeacher: any) => {
    const teacherWithId = {
      ...newTeacher,
      id: `${Date.now()}`,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newTeacher.name}`,
      attendanceRate: "100%",
      additionalAssignments: [],
    };
    
    setTeachers([...teachers, teacherWithId]);
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Teacher added successfully",
    });
  };

  const handleEditTeacher = (updatedTeacher: any) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Success",
      description: "Teacher updated successfully",
    });
  };

  const handleDeleteTeacher = () => {
    setTeachers(teachers.filter(teacher => teacher.id !== currentTeacher.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "Teacher deleted successfully",
    });
  };

  const handleAddAssignment = () => {
    if (!newAssignment.trim()) {
      toast({
        title: "Error",
        description: "Assignment description cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    setTeachers(teachers.map(teacher => 
      teacher.id === currentTeacher.id
        ? {
            ...teacher,
            additionalAssignments: [
              ...(teacher.additionalAssignments || []),
              newAssignment
            ]
          }
        : teacher
    ));
    
    setNewAssignment("");
    setIsAssignmentDialogOpen(false);
    toast({
      title: "Success",
      description: "Assignment added successfully",
    });
  };

  const handleRemoveAssignment = (teacherId: string, assignmentIndex: number) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === teacherId
        ? {
            ...teacher,
            additionalAssignments: teacher.additionalAssignments.filter((_, index) => index !== assignmentIndex)
          }
        : teacher
    ));
    
    toast({
      title: "Success",
      description: "Assignment removed successfully",
    });
  };

  const handleGeneratePayroll = () => {
    toast({
      title: "Generating Payroll",
      description: "Payroll report is being generated...",
    });
    
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Payroll report generated successfully",
      });
      setIsPayrollDialogOpen(false);
      setActiveTab("payroll");
    }, 1500);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Processing CSV",
        description: "Your file is being processed...",
      });
      
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Teachers imported successfully",
        });
        setIsImportDialogOpen(false);
      }, 1500);
    }
  };

  const handleExportCSV = () => {
    toast({
      title: "Success",
      description: "Teachers data exported to CSV",
    });
  };

  const subjects = Array.from(new Set(teachers.map(teacher => teacher.subject)));

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Management</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsPayrollDialogOpen(true)} variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Generate Payroll
            </Button>
            <Button onClick={handleExportCSV} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={() => setIsImportDialogOpen(true)} variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="teachers">Teachers List</TabsTrigger>
            <TabsTrigger value="payroll">Payroll Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teachers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, subject, or contact..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Additional Assignments</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <Avatar className="h-9 w-9">
                            <img
                              src={teacher.profilePicture}
                              alt={teacher.name}
                              className="aspect-square h-full w-full"
                            />
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.additionalAssignments && teacher.additionalAssignments.map((assignment, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                {assignment}
                                <button 
                                  onClick={() => handleRemoveAssignment(teacher.id, index)}
                                  className="ml-1 text-xs hover:text-destructive"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0" 
                              onClick={() => {
                                setCurrentTeacher(teacher);
                                setIsAssignmentDialogOpen(true);
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{teacher.contactNumber}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>{teacher.salary}</TableCell>
                        <TableCell>{teacher.attendanceRate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setCurrentTeacher(teacher);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => {
                                setCurrentTeacher(teacher);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No teachers found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="payroll" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Payroll History</h2>
              <Button onClick={() => setIsPayrollDialogOpen(true)}>
                Generate New Payroll
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Date Generated</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Teachers Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.month}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.amount}</TableCell>
                      <TableCell>{report.teachers}</TableCell>
                      <TableCell>
                        <Badge className={report.status === "Processed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Enter the details of the new teacher. All fields are required.
            </DialogDescription>
          </DialogHeader>
          
          <TeacherForm 
            onSubmit={handleAddTeacher} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {currentTeacher && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
              <DialogDescription>
                Update the details of the teacher.
              </DialogDescription>
            </DialogHeader>
            
            <TeacherForm 
              teacher={currentTeacher}
              onSubmit={handleEditTeacher} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      {currentTeacher && (
        <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Additional Assignment</DialogTitle>
              <DialogDescription>
                Assign additional responsibilities to {currentTeacher.name}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="assignment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Assignment Description
                </label>
                <Textarea
                  id="assignment"
                  placeholder="Enter assignment details..."
                  value={newAssignment}
                  onChange={(e) => setNewAssignment(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment}>
                <Briefcase className="mr-2 h-4 w-4" />
                Add Assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this teacher? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeacher}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPayrollDialogOpen} onOpenChange={setIsPayrollDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Payroll Report</DialogTitle>
            <DialogDescription>
              Select the period for which you want to generate the payroll report.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="pay-period" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Pay Period
              </label>
              <Select defaultValue="current">
                <SelectTrigger id="pay-period">
                  <SelectValue placeholder="Select pay period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="previous">Previous Month</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="report-type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Report Type
              </label>
              <Select defaultValue="detailed">
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="individual">Individual Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPayrollDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGeneratePayroll}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Teachers from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file with teacher data. The file should have headers matching the required fields.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="csv-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              CSV File
            </label>
            <Input id="csv-upload" type="file" accept=".csv" onChange={handleImportCSV} />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TeacherManagement;
