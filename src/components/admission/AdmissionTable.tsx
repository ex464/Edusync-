
import { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, FileText, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ExportOptions } from "@/components/finance/ExportOptions";

interface Admission {
  id: string;
  student_name: string;
  parent_name: string;
  class_applied: string;
  status: 'pending' | 'under_review' | 'confirmed' | 'rejected';
  created_at: string;
  form_completed: boolean;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export function AdmissionTable() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search admissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <ExportOptions title="Export Admissions" />
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Parent Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Form Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table rows will be populated with data from Supabase */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
