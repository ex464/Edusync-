
import { BookOpen, ExternalLink, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ResourcesHeaderProps {
  role: "admin" | "teacher" | "student";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ResourcesHeader = ({ role, searchQuery, setSearchQuery }: ResourcesHeaderProps) => {
  const canCreate = role === "admin" || role === "teacher";
  
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <BookOpen className="mr-2 h-6 w-6" />
          Study Resources
        </h1>
        <p className="text-muted-foreground">
          {role === "student" 
            ? "Access external learning resources shared by your teachers" 
            : "Add and manage external learning resources for students"}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-[200px] md:w-[260px]"
          />
        </div>
        
        {canCreate && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResourcesHeader;
