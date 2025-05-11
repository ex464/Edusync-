
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ActivityFormDialog from "./ActivityFormDialog";

interface ActivitiesHeaderProps {
  role: "admin" | "teacher" | "student";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  canCreate: boolean;
}

const ActivitiesHeader = ({ 
  role, 
  searchQuery, 
  setSearchQuery, 
  canCreate 
}: ActivitiesHeaderProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Extra-Curricular & Sports Activities</h1>
        <p className="text-muted-foreground">
          {role === "student" 
            ? "Discover and join activities happening at your school" 
            : "Manage school activities and track student participation"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search activities..."
            className="pl-8 w-full sm:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {canCreate && (
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Activity
          </Button>
        )}
      </div>

      {canCreate && (
        <ActivityFormDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      )}
    </div>
  );
};

export default ActivitiesHeader;
