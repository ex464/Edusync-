
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// Define form schema with validations
const studentFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  rollNumber: z.string().min(4, "Roll number must be at least 4 characters"),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  parentContact: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  aadharNumber: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits").optional(),
});

type StudentFormData = z.infer<typeof studentFormSchema>;

// Document type
interface Document {
  id: string;
  name: string;
  type: string;
  file: File | string; // File for new uploads, string URL for existing
}

interface StudentFormProps {
  student?: {
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
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const StudentForm = ({ student, onSubmit, onCancel }: StudentFormProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [documents, setDocuments] = useState<Document[]>(student?.documents || []);
  const [profile, setProfile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | undefined>(
    student?.profilePicture
  );

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: student
      ? {
          name: student.name,
          rollNumber: student.rollNumber,
          class: student.class,
          section: student.section,
          parentContact: student.parentContact,
          email: student.email,
          aadharNumber: student.aadharNumber,
        }
      : {
          name: "",
          rollNumber: "",
          class: "",
          section: "",
          parentContact: "",
          email: "",
          aadharNumber: "",
        },
  });

  const handleSubmit = (data: StudentFormData) => {
    // Generate a unique student ID if it's a new student
    const studentId = student?.studentId || `STU-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Generate a default password for new students
    const password = student?.studentId ? undefined : `Pass${Math.floor(1000 + Math.random() * 9000)}`;
    
    if (student) {
      // If editing existing student
      onSubmit({ 
        ...student, 
        ...data, 
        documents, 
        ...(profile && { profilePicture: URL.createObjectURL(profile) }),
      });
    } else {
      // If adding new student
      onSubmit({ 
        ...data, 
        documents, 
        studentId,
        password,
        ...(profile && { profilePicture: URL.createObjectURL(profile) }),
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDoc: Document = {
      id: uuidv4(),
      name: file.name,
      type: docType,
      file: file,
    };

    setDocuments([...documents, newDoc]);
    event.target.value = ''; // Reset input
  };

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setProfile(file);
    setProfilePreview(URL.createObjectURL(file));
    event.target.value = ''; // Reset input
  };

  const removeDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="details">Student Details</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Photo</span>
                  )}
                </div>
                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />
                </label>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rollNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 2023001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aadharNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="12-digit Aadhar number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Class {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="parentContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. +1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. parent@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {student?.studentId && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-1">Student ID</p>
                <p className="text-sm bg-muted rounded p-2">{student.studentId}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {student ? "Update Student" : "Add Student"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="documents">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Aadhar Card</h3>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload Aadhar Card</p>
                    <label className="w-full">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "aadhar")}
                      />
                      <Button variant="outline" className="w-full">Select File</Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Birth Certificate</h3>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload Birth Certificate</p>
                    <label className="w-full">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "birth")}
                      />
                      <Button variant="outline" className="w-full">Select File</Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Other Certificates</h3>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload other certificates</p>
                    <label className="w-full">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "other")}
                      />
                      <Button variant="outline" className="w-full">Select File</Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {documents.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-4">Uploaded Documents</h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="icon" onClick={() => removeDocument(doc.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setActiveTab("details")}>
              Back to Details
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)}>
              {student ? "Update Student" : "Add Student"}
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StudentForm;
