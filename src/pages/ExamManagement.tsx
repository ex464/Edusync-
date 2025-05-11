
import { useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ExamHeader from "@/components/exams/ExamHeader";
import ExamTable from "@/components/exams/ExamTable";
import ExamFilters from "@/components/exams/ExamFilters";
import ExamFormDialog from "@/components/exams/ExamFormDialog";
import { useLocation } from "react-router-dom";

export type ExamData = {
  id: string;
  subject: string;
  examDate: Date;
  duration: number; // in minutes
  class: string;
  passMarks: number;
  totalMarks: number;
  examType: "online" | "offline";
  status: "upcoming" | "ongoing" | "completed";
};

const ExamManagement = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const role = isAdmin ? "admin" : "teacher";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);
  const [isGeneratingHallTickets, setIsGeneratingHallTickets] = useState(false);
  const [isGeneratingResults, setIsGeneratingResults] = useState(false);
  
  // Mock data for exams
  const [exams, setExams] = useState<ExamData[]>([
    {
      id: "1",
      subject: "Mathematics",
      examDate: new Date(2023, 11, 15, 10, 0),
      duration: 120,
      class: "12A",
      passMarks: 35,
      totalMarks: 100,
      examType: "offline",
      status: "upcoming"
    },
    {
      id: "2",
      subject: "Physics",
      examDate: new Date(2023, 11, 18, 9, 0),
      duration: 90,
      class: "12B",
      passMarks: 40,
      totalMarks: 100,
      examType: "online",
      status: "upcoming"
    },
    {
      id: "3",
      subject: "Chemistry",
      examDate: new Date(2023, 11, 20, 14, 0),
      duration: 90,
      class: "12A",
      passMarks: 33,
      totalMarks: 100,
      examType: "offline",
      status: "upcoming"
    }
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    subject: "",
    class: "",
    status: "",
    examType: ""
  });

  const handleAddExam = () => {
    setSelectedExam(null);
    setIsDialogOpen(true);
  };

  const handleEditExam = (exam: ExamData) => {
    setSelectedExam(exam);
    setIsDialogOpen(true);
  };

  const handleDeleteExam = (id: string) => {
    setExams(exams.filter(exam => exam.id !== id));
    toast.success("Exam deleted successfully");
  };

  const handleSaveExam = (exam: ExamData) => {
    if (selectedExam) {
      // Edit existing exam
      setExams(exams.map(e => e.id === exam.id ? exam : e));
      toast.success("Exam updated successfully");
    } else {
      // Add new exam with generated ID
      const newExam = { ...exam, id: Math.random().toString(36).substr(2, 9) };
      setExams([...exams, newExam]);
      toast.success("Exam added successfully");
    }
    setIsDialogOpen(false);
  };

  const handleGenerateHallTickets = () => {
    setIsGeneratingHallTickets(true);
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingHallTickets(false);
      toast.success("Hall tickets generated successfully");
    }, 1500);
  };

  const handleGenerateResults = () => {
    setIsGeneratingResults(true);
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingResults(false);
      toast.success("Results generated successfully");
    }, 2000);
  };

  const filteredExams = exams.filter(exam => {
    return (
      (filters.subject === "" || exam.subject.toLowerCase().includes(filters.subject.toLowerCase())) &&
      (filters.class === "" || filters.class === "all-classes" || exam.class === filters.class) &&
      (filters.status === "" || filters.status === "all-statuses" || exam.status === filters.status) &&
      (filters.examType === "" || filters.examType === "all-types" || exam.examType === filters.examType)
    );
  });

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <ExamHeader 
          onAddExam={handleAddExam}
          onGenerateHallTickets={handleGenerateHallTickets}
          onGenerateResults={handleGenerateResults}
          isGeneratingHallTickets={isGeneratingHallTickets}
          isGeneratingResults={isGeneratingResults}
        />
        
        <ExamFilters 
          filters={filters} 
          setFilters={setFilters}
        />
        
        <ExamTable 
          exams={filteredExams}
          onEdit={handleEditExam}
          onDelete={handleDeleteExam}
          role={role}
        />
        
        <ExamFormDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onSave={handleSaveExam}
          exam={selectedExam}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExamManagement;
