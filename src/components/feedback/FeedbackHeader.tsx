
import { useEffect, useState } from "react";

const FeedbackHeader = () => {
  const [userRole, setUserRole] = useState<string>("student");

  useEffect(() => {
    // In a real app, this would be from authentication
    const role = localStorage.getItem("userRole") || "student";
    setUserRole(role);
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold tracking-tight">School Feedback System</h1>
      {userRole === "admin" ? (
        <p className="text-muted-foreground">
          Review and respond to feedback from students and teachers
        </p>
      ) : (
        <p className="text-muted-foreground">
          Share your thoughts and suggestions to help us improve
        </p>
      )}
    </div>
  );
};

export default FeedbackHeader;
