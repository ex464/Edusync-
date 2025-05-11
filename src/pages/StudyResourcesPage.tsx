
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ResourcesHeader from "@/components/resources/ResourcesHeader";
import ResourceFilters from "@/components/resources/ResourceFilters";
import ResourcesList from "@/components/resources/ResourcesList";

const StudyResourcesPage = ({ role }: { role: "admin" | "teacher" | "student" }) => {
  const [activeSubject, setActiveSubject] = useState<string>("all");
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <ResourcesHeader 
          role={role}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <ResourceFilters 
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          activeType={activeType}
          setActiveType={setActiveType}
        />
        
        <ResourcesList 
          subject={activeSubject} 
          resourceType={activeType}
          searchQuery={searchQuery}
        />
      </div>
    </DashboardLayout>
  );
};

export default StudyResourcesPage;
