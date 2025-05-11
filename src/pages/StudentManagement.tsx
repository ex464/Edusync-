import { useState, useEffect } from "react";
import { Search, Upload, UserPlus, Pencil, Trash2, Download } from "lucide-react";
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
import StudentForm from "@/components/students/StudentForm";
import { Badge } from "@/components/ui/badge";

// Mock student data
const initialStudents = [
  {
    id: "1",
    name: "John Smith",
    rollNumber: "2023001",
    class: "10",
    section: "A",
    parentContact: "+1234567890",
    email: "john.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    rollNumber: "2023002",
    class: "10",
    section: "B",
    parentContact: "+0987654321",
    email: "sarah.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Michael Brown",
    rollNumber: "2023003",
    class: "11",
    section: "A",
    parentContact: "+1122334455",
    email: "michael.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "4",
    name: "Emily Davis",
    rollNumber: "2023004",
    class: "11",
    section: "B",
    parentContact: "+5566778899",
    email: "emily.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "5",
    name: "David Wilson",
    rollNumber: "2023005",
    class: "12",
    section: "A",
    parentContact: "+1324354657",
    email: "david.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    rollNumber: "2023006",
    class: "9",
    section: "A",
    parentContact: "+9876543210",
    email: "jennifer.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
  },
  {
    id: "7",
    name: "Ryan Taylor",
    rollNumber: "2023007",
    class: "8",
    section: "B",
    parentContact: "+1231231234",
    email: "ryan.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
  },
  {
    id: "8",
    name: "Emma Miller",
    rollNumber: "2023008",
    class: "7",
    section: "A",
    parentContact: "+4564564567",
    email: "emma.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "9",
    name: "Alex Martin",
    rollNumber: "2023009",
    class: "6",
    section: "C",
    parentContact: "+7897897890",
    email: "alex.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "10",
    name: "Sophia Anderson",
    rollNumber: "2023010",
    class: "5",
    section: "B",
    parentContact: "+3213213214",
    email: "sophia.parent@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
];

const StudentManagement = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [classDistribution, setClassDistribution] = useState<{[key: string]: number}>({});
  const [sectionOptions, setSectionOptions] = useState<string[]>([]);

  // Calculate class distribution
  useEffect(() => {
    const distribution: {[key: string]: number} = {};
    const allClasses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    
    allClasses.forEach(cls => {
      distribution[cls] = students.filter(student => student.class === cls).length;
    });
    
    setClassDistribution(distribution);
  }, [students]);

  // Update section options based on selected class
  useEffect(() => {
    if (classFilter) {
      const sections = [...new Set(students
        .filter(student => student.class === classFilter)
        .map(student => student.section))];
      setSectionOptions(sections);
    } else {
      const allSections = [...new Set(students.map(student => student.section))];
      setSectionOptions(allSections);
    }
  }, [classFilter, students]);

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentContact.includes(searchQuery);
    
    const matchesClass = classFilter ? student.class === classFilter : true;
    const matchesSection = sectionFilter && sectionFilter !== "all" ? student.section === sectionFilter : true;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  const handleAddStudent = (newStudent: any) => {
    const studentWithId = {
      ...newStudent,
      id: `${Date.now()}`,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newStudent.name}`,
    };
    
    setStudents([...students, studentWithId]);
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  const handleEditStudent = (updatedStudent: any) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Success",
      description: "Student updated successfully",
    });
  };

  const handleDeleteStudent = () => {
    setStudents(students.filter(student => student.id !== currentStudent.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "Student deleted successfully",
    });
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
          description: "Students imported successfully",
        });
        setIsImportDialogOpen(false);
      }, 1500);
    }
  };

  const handleExportCSV = () => {
    toast({
      title: "Success",
      description: "Students data exported to CSV",
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <div className="flex gap-2">
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
              Add Student
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, roll number, or contact..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {Object.entries(classDistribution)
                  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                  .map(([cls, count]) => (
                    <SelectItem key={cls} value={cls}>
                      Class {cls} <Badge className="ml-2">{count}</Badge>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select 
              value={sectionFilter} 
              onValueChange={setSectionFilter}
              disabled={!classFilter && !sectionOptions.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sectionOptions.map(section => (
                  <SelectItem key={section} value={section}>Section {section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Students Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Class/Section</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <img
                          src={student.profilePicture}
                          alt={student.name}
                          className="aspect-square h-full w-full"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.class}-{student.section}</TableCell>
                    <TableCell>{student.parentContact}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentStudent(student);
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
                            setCurrentStudent(student);
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
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No students found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the details of the new student. All fields are required.
            </DialogDescription>
          </DialogHeader>
          
          <StudentForm 
            onSubmit={handleAddStudent} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      {currentStudent && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the details of the student.
              </DialogDescription>
            </DialogHeader>
            
            <StudentForm 
              student={currentStudent}
              onSubmit={handleEditStudent} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteStudent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import CSV Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Students from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file with student data. The file should have headers matching the required fields.
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

export default StudentManagement;
