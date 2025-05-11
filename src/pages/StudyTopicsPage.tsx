
import { useState } from "react";
import { SubjectType } from "@/types/topics";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TopicsHeader from "@/components/topics/TopicsHeader";
import SubjectTabs from "@/components/topics/SubjectTabs";
import TopicsList from "@/components/topics/TopicsList";

const StudyTopicsPage = ({ role }: { role: "admin" | "teacher" | "student" }) => {
  const [activeSubject, setActiveSubject] = useState<SubjectType>("mathematics");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <TopicsHeader 
          role={role}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <SubjectTabs 
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
        />
        
        <TopicsList subject={activeSubject} />
      </div>
    </DashboardLayout>
  );
};

export default StudyTopicsPage;
