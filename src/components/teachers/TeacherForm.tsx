
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
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

// Define the form schema with validation
const teacherFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  subject: z.string().min(1, "Subject is required"),
  contactNumber: z
    .string()
    .min(8, "Contact number must be at least 8 characters")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  salary: z.string().min(1, "Salary is required"),
});

type TeacherFormValues = z.infer<typeof teacherFormSchema>;

interface TeacherFormProps {
  teacher?: {
    id: string;
    name: string;
    subject: string;
    contactNumber: string;
    email: string;
    salary: string;
    attendanceRate?: string;
    profilePicture?: string;
    additionalAssignments?: string[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TeacherForm = ({ teacher, onSubmit, onCancel }: TeacherFormProps) => {
  // Sample subjects for the dropdown
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "History",
    "Geography",
    "Economics",
    "Physical Education",
    "Art",
    "Music",
  ];

  // Initialize form with default values or existing teacher data
  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: teacher
      ? {
          name: teacher.name,
          subject: teacher.subject,
          contactNumber: teacher.contactNumber,
          email: teacher.email,
          salary: teacher.salary,
        }
      : {
          name: "",
          subject: "",
          contactNumber: "",
          email: "",
          salary: "",
        },
  });

  const handleSubmit = (values: TeacherFormValues) => {
    // If editing, preserve the ID and other fields
    if (teacher) {
      onSubmit({
        ...values,
        id: teacher.id,
        profilePicture: teacher.profilePicture,
        attendanceRate: teacher.attendanceRate,
        additionalAssignments: teacher.additionalAssignments || [],
      });
    } else {
      onSubmit(values);
    }
  };

  // Format salary input to include $ sign
  const formatSalary = (value: string) => {
    if (!value) return "";
    
    // Remove non-numeric characters except decimal point
    let numericValue = value.replace(/[^0-9.]/g, "");
    
    // Format with commas for thousands
    const parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return "$" + parts.join(".");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Dr. John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
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
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormDescription>
                Include country code (e.g., +1 for US)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="teacher@school.edu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Monthly Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder="$4,500"
                  {...restField}
                  onChange={(e) => {
                    const formattedValue = formatSalary(e.target.value);
                    e.target.value = formattedValue;
                    onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {teacher ? "Update Teacher" : "Add Teacher"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeacherForm;
