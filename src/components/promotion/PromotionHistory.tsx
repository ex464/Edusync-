
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

const promotionHistory = [
  {
    id: "1",
    date: "2024-03-15",
    academicYear: "2023-24",
    fromClass: "8-A",
    toClass: "9-A",
    studentsCount: 45,
    promotedBy: "Admin User"
  },
  {
    id: "2",
    date: "2024-03-16",
    academicYear: "2023-24",
    fromClass: "9-A",
    toClass: "10-A",
    studentsCount: 42,
    promotedBy: "Admin User"
  },
  {
    id: "3",
    date: "2024-03-16",
    academicYear: "2023-24",
    fromClass: "10-A",
    toClass: "11-A",
    studentsCount: 50,
    promotedBy: "Principal Smith"
  },
  {
    id: "4",
    date: "2024-03-17",
    academicYear: "2023-24",
    fromClass: "11-A",
    toClass: "12-A",
    studentsCount: 38,
    promotedBy: "Principal Smith"
  },
];

const PromotionHistory = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  const handleDownload = (id: string) => {
    toast.success("Promotion report is being downloaded", {
      description: "The file will be saved to your downloads folder"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotion History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Academic Year</TableHead>
              <TableHead>From Class</TableHead>
              <TableHead>To Class</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Promoted By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotionHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>{record.academicYear}</TableCell>
                <TableCell>Class {record.fromClass}</TableCell>
                <TableCell>Class {record.toClass}</TableCell>
                <TableCell>{record.studentsCount}</TableCell>
                <TableCell>{record.promotedBy}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDownload(record.id)}
                  >
                    <FileDown className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PromotionHistory;
