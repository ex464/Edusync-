
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserProfile from "@/components/profile/UserProfile";
import StudentProfile from "@/components/students/StudentProfile";
import { useToast } from "@/hooks/use-toast";

interface ProfilePageProps {
  role: "admin" | "teacher" | "student";
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {
  const { toast } = useToast();
  
  // Mock user data based on role
  const getMockUser = () => {
    switch (role) {
      case "admin":
        return {
          id: "admin-1",
          name: "Administrator",
          email: "admin@school.edu",
          role: "admin" as const,
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
          phone: "+1234567890",
          address: "123 School Street, City",
          qualification: "Masters in Education Administration",
          experience: "10 years",
          specialization: "School Management",
          bio: "Experienced administrator focused on improving educational standards."
        };
      
      case "teacher":
        return {
          id: "teacher-1",
          name: "Dr. Sharma",
          email: "sharma@school.edu",
          role: "teacher" as const,
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher",
          phone: "+0987654321",
          address: "456 College Road, City",
          qualification: "PhD in Mathematics",
          experience: "12 years",
          specialization: "Advanced Calculus",
          bio: "Passionate about making mathematics accessible to all students."
        };
        
      case "student":
        return {
          id: "student-1",
          name: "John Smith",
          email: "john.parent@school.edu",
          role: "student" as const,
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          studentId: "STU-241576",
          rollNumber: "2023001",
          class: "10",
          section: "A",
          parentContact: "+1234567890",
          aadharNumber: "123456789012",
          documents: [
            {
              id: "doc-1",
              name: "aadhar_card.jpg",
              type: "aadhar",
              file: "",
              dateUploaded: "2023-09-15"
            },
            {
              id: "doc-2",
              name: "birth_certificate.jpg",
              type: "birth",
              file: "",
              dateUploaded: "2023-09-15"
            }
          ]
        };
      
      default:
        return {
          id: "user-1",
          name: "User",
          email: "user@school.edu",
          role: role as "admin" | "teacher" | "student"
        };
    }
  };
  
  const user = getMockUser();
  
  const handleViewDocument = (doc: any) => {
    toast({
      title: "Document Viewer",
      description: `Viewing document: ${doc.name}`,
    });
  };
  
  const handleEditDocument = (doc: any) => {
    toast({
      title: "Edit Document",
      description: `Editing document: ${doc.name}`,
    });
  };
  
  const handleDownloadDocument = (doc: any) => {
    toast({
      title: "Download Started",
      description: `Downloading document: ${doc.name}`,
    });
  };
  
  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your account details and preferences</p>
        </div>
        
        {role === "student" ? (
          <StudentProfile 
            student={user as any} // Using type assertion to bypass the type check temporarily
            onEdit={() => {}}
            onViewDocument={handleViewDocument}
            onEditDocument={handleEditDocument}
            onDownloadDocument={handleDownloadDocument}
          />
        ) : (
          <UserProfile user={user} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
