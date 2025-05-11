
import { useState } from "react";
import { Search, Download, Calendar, Clock, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatCard } from "@/components/ui/card-stat";
import { toast } from "sonner";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

// Mock data for upcoming exams
const upcomingExams = [
  {
    id: "1",
    subject: "Mathematics",
    examDate: new Date(2023, 11, 15, 10, 0),
    duration: 120,
    totalMarks: 100,
    syllabus: [
      "Functions and Relations",
      "Limits and Continuity",
      "Differentiation",
      "Applications of Derivatives",
      "Integration"
    ]
  },
  {
    id: "2",
    subject: "Physics",
    examDate: new Date(2023, 11, 18, 9, 0),
    duration: 90,
    totalMarks: 100,
    syllabus: [
      "Mechanics",
      "Thermodynamics",
      "Electromagnetism",
      "Optics",
      "Modern Physics"
    ]
  },
  {
    id: "3",
    subject: "Chemistry",
    examDate: new Date(2023, 11, 20, 14, 0),
    duration: 90,
    totalMarks: 100,
    syllabus: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Biochemistry",
      "Analytical Chemistry"
    ]
  }
];

const UpcomingExams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExams = upcomingExams.filter(exam => 
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadSyllabus = (subject: string) => {
    toast.success(`${subject} syllabus download started`);
    // In a real implementation, this would trigger a file download
  };

  const totalExams = upcomingExams.length;
  const nearestExam = [...upcomingExams].sort((a, b) => a.examDate.getTime() - b.examDate.getTime())[0];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Upcoming Exams" 
          value={totalExams.toString()} 
          icon={Calendar}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatCard 
          title="Next Exam" 
          value={nearestExam.subject} 
          description={format(nearestExam.examDate, "PPP")}
          icon={Clock}
          iconColor="bg-orange-100 text-orange-600"
        />
        <StatCard 
          title="Total Marks at Stake" 
          value={(totalExams * 100).toString()} 
          icon={Award}
          iconColor="bg-green-100 text-green-600"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExams.length > 0 ? (
          filteredExams.map(exam => (
            <Card key={exam.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{exam.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(exam.examDate, "PPP")} at {format(exam.examDate, "p")}
                  </p>
                </div>
                <Badge>{exam.duration} minutes</Badge>
              </div>
              
              <div className="flex justify-between items-center text-sm mb-4">
                <span>Total Marks: {exam.totalMarks}</span>
                <button
                  onClick={() => handleDownloadSyllabus(exam.subject)}
                  className="flex items-center text-primary hover:underline"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Syllabus
                </button>
              </div>
              
              <Accordion type="single" collapsible>
                <AccordionItem value={`syllabus-${exam.id}`}>
                  <AccordionTrigger>Syllabus Topics</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {exam.syllabus.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))
        ) : (
          <p className="col-span-2 text-center py-8 text-muted-foreground">
            No exams found matching your search criteria
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingExams;
