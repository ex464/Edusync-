
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ActivitiesHeader from "@/components/activities/ActivitiesHeader";
import ActivitiesTabs from "@/components/activities/ActivitiesTabs";
import ActivityList from "@/components/activities/ActivityList";
import { ActivityCategory } from "@/types/activities";

const ActivitiesManagement = ({ role }: { role: "admin" | "teacher" | "student" }) => {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>("sports");
  const [searchQuery, setSearchQuery] = useState("");

  const canCreate = role === "admin" || role === "teacher";

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <ActivitiesHeader 
          role={role}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          canCreate={canCreate}
        />
        
        <ActivitiesTabs 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <ActivityList 
          category={activeCategory}
          searchQuery={searchQuery}
          role={role}
        />
      </div>
    </DashboardLayout>
  );
};

export default ActivitiesManagement;
