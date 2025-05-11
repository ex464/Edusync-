
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FeedbackHeader from "@/components/feedback/FeedbackHeader";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import FeedbackList from "@/components/feedback/FeedbackList";
import FeedbackResponse from "@/components/feedback/FeedbackResponse";

const FeedbackSystem = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const userRole = localStorage.getItem("userRole") || "student"; // Default to student if not set
  
  return (
    <DashboardLayout role={userRole as "admin" | "teacher" | "student"}>
      <div className="space-y-6">
        <FeedbackHeader />
        
        {userRole === "admin" ? (
          <div className="grid grid-cols-1 gap-6">
            <FeedbackList 
              onSelectFeedback={(feedback) => {
                setSelectedFeedback(feedback);
                setIsResponseOpen(true);
              }} 
            />
            <FeedbackResponse 
              isOpen={isResponseOpen}
              onClose={() => setIsResponseOpen(false)}
              feedback={selectedFeedback}
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <FeedbackForm />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeedbackSystem;
