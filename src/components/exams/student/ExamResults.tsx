
import { useState } from "react";
import { Search, Printer, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data for exam results
const examResults = [
  {
    id: "1",
    subject: "Mathematics",
    examDate: new Date(2023, 9, 15),
    totalMarks: 100,
    marksObtained: 87,
    grade: "A",
    feedback: "Good analytical skills, but work on speed"
  },
  {
    id: "2",
    subject: "Physics",
    examDate: new Date(2023, 9, 18),
    totalMarks: 100,
    marksObtained: 72,
    grade: "B",
    feedback: "Conceptual understanding is good"
  },
  {
    id: "3",
    subject: "Chemistry",
    examDate: new Date(2023, 9, 20),
    totalMarks: 100,
    marksObtained: 91,
    grade: "A+",
    feedback: "Excellent work across all topics"
  },
  {
    id: "4",
    subject: "Biology",
    examDate: new Date(2023, 9, 22),
    totalMarks: 100,
    marksObtained: 68,
    grade: "B-",
    feedback: "Need to improve on diagrams and explanations"
  }
];

const ExamResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<string[]>([]);
  
  const filteredResults = examResults.filter(result => 
    result.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrintResults = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Exam Results", 14, 15);
    
    autoTable(doc, {
      head: [["Subject", "Date", "Marks", "Grade", "Feedback"]],
      body: examResults.map(result => [
        result.subject,
        format(result.examDate, "PPP"),
        `${result.marksObtained}/${result.totalMarks}`,
        result.grade,
        result.feedback
      ]),
      startY: 20,
    });
    
    doc.save("exam-results.pdf");
    toast.success("Results exported to PDF");
  };

  const handleSubmitFeedback = (id: string, isPositive: boolean) => {
    setFeedbackSubmitted(prev => [...prev, id]);
    toast.success(`Thank you for your ${isPositive ? 'positive' : 'improvement'} feedback`);
  };

  // Calculate average percentage score
  const averageScore = examResults.reduce((sum, result) => 
    sum + (result.marksObtained / result.totalMarks) * 100, 0) / examResults.length;
  
  // Find the best and worst subjects
  const sortedByMarks = [...examResults].sort((a, b) => b.marksObtained - a.marksObtained);
  const bestSubject = sortedByMarks[0];
  const worstSubject = sortedByMarks[sortedByMarks.length - 1];

  // Generate improvement tip
  const generateTip = () => {
    const improvement = bestSubject.marksObtained - worstSubject.marksObtained;
    if (improvement > 15) {
      return `You could improve your ${worstSubject.subject} score by ${improvement} points to match your best subject!`;
    } else {
      return "Your performance is quite consistent across subjects!";
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold mb-2">Smart Tips</h3>
        <p className="text-sm text-blue-700 mb-4">
          {generateTip()}
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span>Average Performance</span>
            <span className="font-medium">{averageScore.toFixed(1)}%</span>
          </div>
          <Progress value={averageScore} className="h-2" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        <Button onClick={handlePrintResults} variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length > 0 ? (
              filteredResults.map(result => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.subject}</TableCell>
                  <TableCell>{format(result.examDate, "PPP")}</TableCell>
                  <TableCell>{result.marksObtained}/{result.totalMarks}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                  <TableCell>
                    <div className="w-full max-w-24">
                      <Progress 
                        value={(result.marksObtained / result.totalMarks) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {feedbackSubmitted.includes(result.id) ? (
                      <span className="text-sm text-muted-foreground">Feedback submitted</span>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleSubmitFeedback(result.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleSubmitFeedback(result.id, false)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExamResults;
