
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PromotionHistory from "@/components/promotion/PromotionHistory";
import PromotionRules from "@/components/promotion/PromotionRules";

// Mock student data for demonstration
const mockStudents = [
  { id: "1", name: "Aiden Parker", rollNumber: "2023001", currentClass: "9", currentSection: "A", resultStatus: "Pass" },
  { id: "2", name: "Bella Johnson", rollNumber: "2023002", currentClass: "9", currentSection: "A", resultStatus: "Pass" },
  { id: "3", name: "Carlos Rodriguez", rollNumber: "2023003", currentClass: "9", currentSection: "A", resultStatus: "Fail" },
  { id: "4", name: "Diana Kim", rollNumber: "2023004", currentClass: "9", currentSection: "A", resultStatus: "Pass" },
  { id: "5", name: "Ethan Williams", rollNumber: "2023005", currentClass: "9", currentSection: "A", resultStatus: "Pass" },
  { id: "6", name: "Fatima Ali", rollNumber: "2023006", currentClass: "9", currentSection: "A", resultStatus: "TC" },
  { id: "7", name: "Gabriel Chen", rollNumber: "2023007", currentClass: "9", currentSection: "A", resultStatus: "Pass" },
  { id: "8", name: "Hannah Lee", rollNumber: "2023008", currentClass: "9", currentSection: "A", resultStatus: "Dropout" },
];

const ClassPromotionManagement = () => {
  const [currentAcademicYear, setCurrentAcademicYear] = useState("2024-25");
  const [targetAcademicYear, setTargetAcademicYear] = useState("2025-26");
  const [selectedClass, setSelectedClass] = useState("9");
  const [selectedSection, setSelectedSection] = useState("A");
  const [targetClass, setTargetClass] = useState("10");
  const [targetSection, setTargetSection] = useState("A");
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("promotion");

  // Handle select all students checkbox
  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(student => student.id));
    }
  };

  // Handle individual student selection
  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Apply auto-promotion rules
  const applyAutoRules = () => {
    const promotableStudentIds = students
      .filter(student => student.resultStatus === "Pass")
      .map(student => student.id);
    
    setSelectedStudents(promotableStudentIds);
    toast.success("Auto-promotion rules applied");
  };

  // Preview promotions before finalizing
  const reviewPromotions = () => {
    if (selectedStudents.length === 0) {
      toast.error("No students selected for promotion");
      return;
    }
    
    setIsReviewing(true);
  };

  // Finalize the promotions
  const finalizePromotions = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const promotedCount = selectedStudents.length;
      
      toast.success(`${promotedCount} students promoted successfully`, {
        description: `From Class ${selectedClass}-${selectedSection} to Class ${targetClass}-${targetSection}`
      });
      
      setIsLoading(false);
      setIsReviewing(false);
      setSelectedStudents([]);
      
      // Reset the selection after successful promotion
      setActiveTab("history");
    }, 1500);
  };

  // Cancel the promotion review
  const cancelReview = () => {
    setIsReviewing(false);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Class Promotion Management</h1>
          <p className="text-muted-foreground">Manage student promotions to the next academic year</p>
        </div>

        <Tabs defaultValue="promotion" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="promotion">Promotion Dashboard</TabsTrigger>
            <TabsTrigger value="rules">Promotion Rules</TabsTrigger>
            <TabsTrigger value="history">Promotion History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="promotion" className="space-y-6 mt-4">
            {isReviewing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Review Promotions</CardTitle>
                  <CardDescription>
                    Verify student promotions before finalizing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">From:</p>
                      <p>Class {selectedClass}-{selectedSection} ({currentAcademicYear})</p>
                    </div>
                    <div>
                      <p className="font-medium">To:</p>
                      <p>Class {targetClass}-{targetSection} ({targetAcademicYear})</p>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Current Class</TableHead>
                        <TableHead>New Class</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students
                        .filter(student => selectedStudents.includes(student.id))
                        .map(student => (
                          <TableRow key={student.id}>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>Class {student.currentClass}-{student.currentSection}</TableCell>
                            <TableCell>Class {targetClass}-{targetSection}</TableCell>
                            <TableCell>
                              {student.resultStatus === "Pass" ? (
                                <span className="text-green-600 font-medium">Promote</span>
                              ) : student.resultStatus === "Fail" ? (
                                <span className="text-red-600 font-medium">Retain</span>
                              ) : (
                                <span className="text-amber-600 font-medium">{student.resultStatus}</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={cancelReview}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={finalizePromotions} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Finalize Promotions"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Select Academic Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-year">Current Academic Year</Label>
                        <Select 
                          value={currentAcademicYear} 
                          onValueChange={setCurrentAcademicYear}
                        >
                          <SelectTrigger id="current-year">
                            <SelectValue placeholder="Select academic year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2023-24">2023-24</SelectItem>
                            <SelectItem value="2024-25">2024-25</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="target-year">Target Academic Year</Label>
                        <Select 
                          value={targetAcademicYear} 
                          onValueChange={setTargetAcademicYear}
                        >
                          <SelectTrigger id="target-year">
                            <SelectValue placeholder="Select academic year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-25">2024-25</SelectItem>
                            <SelectItem value="2025-26">2025-26</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Select Class & Section</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-class">Current Class</Label>
                          <Select 
                            value={selectedClass} 
                            onValueChange={setSelectedClass}
                          >
                            <SelectTrigger id="current-class">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(12)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  Class {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="current-section">Current Section</Label>
                          <Select 
                            value={selectedSection} 
                            onValueChange={setSelectedSection}
                          >
                            <SelectTrigger id="current-section">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">Section A</SelectItem>
                              <SelectItem value="B">Section B</SelectItem>
                              <SelectItem value="C">Section C</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="target-class">Target Class</Label>
                          <Select 
                            value={targetClass} 
                            onValueChange={setTargetClass}
                          >
                            <SelectTrigger id="target-class">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(12)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  Class {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="target-section">Target Section</Label>
                          <Select 
                            value={targetSection} 
                            onValueChange={setTargetSection}
                          >
                            <SelectTrigger id="target-section">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">Section A</SelectItem>
                              <SelectItem value="B">Section B</SelectItem>
                              <SelectItem value="C">Section C</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Student List</CardTitle>
                      <CardDescription>
                        Students from Class {selectedClass}-{selectedSection}
                      </CardDescription>
                    </div>
                    <Button onClick={applyAutoRules} variant="outline">
                      Apply Auto Rules
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">
                              <Checkbox 
                                checked={selectedStudents.length === students.length} 
                                onCheckedChange={handleSelectAll}
                              />
                            </TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Current Class</TableHead>
                            <TableHead>Result Status</TableHead>
                            <TableHead>Promotion Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map(student => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <Checkbox 
                                  checked={selectedStudents.includes(student.id)} 
                                  onCheckedChange={() => handleSelectStudent(student.id)}
                                />
                              </TableCell>
                              <TableCell>{student.rollNumber}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>Class {student.currentClass}-{student.currentSection}</TableCell>
                              <TableCell>
                                <span 
                                  className={
                                    student.resultStatus === "Pass" ? "text-green-600 font-medium" :
                                    student.resultStatus === "Fail" ? "text-red-600 font-medium" :
                                    "text-amber-600 font-medium"
                                  }
                                >
                                  {student.resultStatus}
                                </span>
                              </TableCell>
                              <TableCell>
                                {selectedStudents.includes(student.id) ? (
                                  <span className="text-blue-600 font-medium">To be promoted</span>
                                ) : (
                                  <span className="text-gray-500">Not selected</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      {selectedStudents.length} of {students.length} students selected for promotion
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button 
                        onClick={reviewPromotions} 
                        disabled={selectedStudents.length === 0}
                      >
                        Review & Promote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-6 mt-4">
            <PromotionRules />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6 mt-4">
            <PromotionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClassPromotionManagement;
