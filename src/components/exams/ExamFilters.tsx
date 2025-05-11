
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ExamFiltersProps {
  filters: {
    subject: string;
    class: string;
    status: string;
    examType: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    subject: string;
    class: string;
    status: string;
    examType: string;
  }>>;
}

const ExamFilters = ({ filters, setFilters }: ExamFiltersProps) => {
  const clearFilters = () => {
    setFilters({
      subject: "",
      class: "",
      status: "",
      examType: ""
    });
  };

  const hasActiveFilters = 
    filters.subject !== "" || 
    filters.class !== "" || 
    filters.status !== "" || 
    filters.examType !== "";

  return (
    <div className="rounded-md border p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Filters</h2>
          {hasActiveFilters && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-secondary/80"
              onClick={clearFilters}
            >
              Clear filters
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="subject-filter" className="text-sm font-medium">
              Subject
            </label>
            <Input
              id="subject-filter"
              placeholder="Filter by subject"
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="class-filter" className="text-sm font-medium">
              Class
            </label>
            <Select 
              value={filters.class} 
              onValueChange={(value) => setFilters({ ...filters, class: value })}
            >
              <SelectTrigger id="class-filter">
                <SelectValue placeholder="All classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-classes">All classes</SelectItem>
                <SelectItem value="12A">12A</SelectItem>
                <SelectItem value="12B">12B</SelectItem>
                <SelectItem value="11A">11A</SelectItem>
                <SelectItem value="11B">11B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status-filter" className="text-sm font-medium">
              Status
            </label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="exam-type-filter" className="text-sm font-medium">
              Type
            </label>
            <Select 
              value={filters.examType} 
              onValueChange={(value) => setFilters({ ...filters, examType: value })}
            >
              <SelectTrigger id="exam-type-filter">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All types</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamFilters;
