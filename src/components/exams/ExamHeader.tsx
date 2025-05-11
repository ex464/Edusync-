
import { FileText, Plus, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExamHeaderProps {
  onAddExam: () => void;
  onGenerateHallTickets: () => void;
  onGenerateResults: () => void;
  isGeneratingHallTickets: boolean;
  isGeneratingResults: boolean;
}

const ExamHeader = ({
  onAddExam,
  onGenerateHallTickets,
  onGenerateResults,
  isGeneratingHallTickets,
  isGeneratingResults
}: ExamHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Exam Management</h1>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onAddExam}>
          <Plus className="mr-2 h-4 w-4" />
          Add Exam
        </Button>
        <Button variant="outline" onClick={onGenerateHallTickets} disabled={isGeneratingHallTickets}>
          <FileText className="mr-2 h-4 w-4" />
          {isGeneratingHallTickets ? "Generating..." : "Hall Tickets"}
        </Button>
        <Button variant="outline" onClick={onGenerateResults} disabled={isGeneratingResults}>
          <FileOutput className="mr-2 h-4 w-4" />
          {isGeneratingResults ? "Generating..." : "Generate Results"}
        </Button>
      </div>
    </div>
  );
};

export default ExamHeader;
