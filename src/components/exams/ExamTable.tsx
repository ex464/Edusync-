
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExamData } from "@/pages/ExamManagement";

interface ExamTableProps {
  exams: ExamData[];
  onEdit: (exam: ExamData) => void;
  onDelete: (id: string) => void;
  role: "admin" | "teacher" | "student";
}

const ExamTable = ({ exams, onEdit, onDelete, role }: ExamTableProps) => {
  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${mins > 0 ? `${mins}m` : ""}`.trim();
  };

  // Determine badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default">{status}</Badge>;
      case "ongoing":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "completed":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Determine badge color based on exam type
  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "online":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{type}</Badge>;
      case "offline":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Exam Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Pass/Total</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No exams found
              </TableCell>
            </TableRow>
          ) : (
            exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.subject}</TableCell>
                <TableCell>{exam.class}</TableCell>
                <TableCell>{format(new Date(exam.examDate), "PPP p")}</TableCell>
                <TableCell>{formatDuration(exam.duration)}</TableCell>
                <TableCell>{exam.passMarks}/{exam.totalMarks}</TableCell>
                <TableCell>{getExamTypeBadge(exam.examType)}</TableCell>
                <TableCell>{getStatusBadge(exam.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(exam)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {role === "admin" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(exam.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamTable;
