
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingExams from "@/components/exams/student/UpcomingExams";
import ExamResults from "@/components/exams/student/ExamResults";
import PerformanceGraph from "@/components/exams/student/PerformanceGraph";
import { toast } from "sonner";

const StudentExamDetails = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleDownloadAdmitCard = () => {
    toast.success("Admit card download started");
    // In a real implementation, this would trigger a file download
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">My Exams</h1>
          <button
            onClick={handleDownloadAdmitCard}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Download Admit Card
          </button>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="results">My Results</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <UpcomingExams />
          </TabsContent>
          
          <TabsContent value="results" className="mt-6">
            <ExamResults />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <PerformanceGraph />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentExamDetails;
