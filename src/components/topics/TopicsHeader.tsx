
import { BookOpen, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopicsHeaderProps {
  role: "admin" | "teacher" | "student";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TopicsHeader = ({ role, searchQuery, setSearchQuery }: TopicsHeaderProps) => {
  const canCreate = role === "admin" || role === "teacher";
  
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <BookOpen className="mr-2 h-6 w-6" />
          Study Topics
        </h1>
        <p className="text-muted-foreground">
          {role === "student" 
            ? "Browse and access subject materials uploaded by your teachers" 
            : "Manage and upload subject-wise study materials for students"}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        {canCreate && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload Topic
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopicsHeader;
