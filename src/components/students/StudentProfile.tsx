
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare } from "lucide-react";
import StudentDocuments from "./StudentDocuments";
import FeeBreakdown from "../fees/FeeBreakdown";
import FeesSummary from "../fees/FeesSummary";

interface Document {
  id: string;
  name: string;
  type: string;
  file: File | string;
  dateUploaded?: string;
}

interface StudentProfileProps {
  student: {
    id: string;
    name: string;
    rollNumber: string;
    class: string;
    section: string;
    parentContact: string;
    email: string;
    profilePicture?: string;
    aadharNumber?: string;
    studentId?: string;
    documents?: Document[];
  };
  onEdit?: () => void;
  onViewDocument?: (doc: Document) => void;
  onEditDocument?: (doc: Document) => void;
  onDownloadDocument?: (doc: Document) => void;
}

const StudentProfile = ({ 
  student, 
  onEdit,
  onViewDocument,
  onEditDocument,
  onDownloadDocument
}: StudentProfileProps) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="relative pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                {student.profilePicture ? (
                  <img
                    src={student.profilePicture}
                    alt={student.name}
                    className="aspect-square h-full w-full"
                  />
                ) : (
                  <div className="bg-primary h-full w-full flex items-center justify-center text-white text-2xl">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-muted-foreground">Class {student.class}-{student.section}</p>
              </div>
            </div>
            {onEdit && (
              <Button variant="outline" size="icon" onClick={onEdit} className="absolute top-4 right-4">
                <PenSquare className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Roll Number</span>
                <span>{student.rollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Student ID</span>
                <span>{student.studentId || "Not assigned"}</span>
              </div>
              {student.aadharNumber && (
                <div className="flex justify-between">
                  <span className="font-medium">Aadhar Card</span>
                  <span>{student.aadharNumber}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Parent Contact</span>
                <span>{student.parentContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email</span>
                <span>{student.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="pt-4">
          <StudentDocuments 
            documents={student.documents || []} 
            onView={onViewDocument}
            onEdit={onEditDocument}
            onDownload={onDownloadDocument}
          />
        </TabsContent>
        <TabsContent value="fees" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <FeesSummary studentId={student.id} />
            </div>
            <div className="lg:col-span-2">
              <FeeBreakdown studentId={student.id} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="attendance" className="pt-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Attendance records will appear here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
