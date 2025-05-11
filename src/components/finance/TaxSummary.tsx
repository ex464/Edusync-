import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Percent,
  FileText,
  Download,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const taxData = [
  {
    id: 1,
    category: "GST - Goods and Services",
    taxableAmount: 120000,
    taxRate: 18,
    taxAmount: 21600,
    status: "Filed",
    dueDate: "2025-04-20",
  },
  {
    id: 2,
    category: "TDS - Staff Salaries",
    taxableAmount: 350000,
    taxRate: 10,
    taxAmount: 35000,
    status: "Pending",
    dueDate: "2025-04-30",
  },
  {
    id: 3,
    category: "Property Tax",
    taxableAmount: 200000,
    taxRate: 5,
    taxAmount: 10000,
    status: "Filed",
    dueDate: "2025-03-15",
  },
  {
    id: 4,
    category: "Professional Tax",
    taxableAmount: 85000,
    taxRate: 2.5,
    taxAmount: 2125,
    status: "Not Due",
    dueDate: "2025-05-15",
  },
];

const taxReports = [
  {
    id: 1,
    name: "Monthly GST Return",
    period: "March 2025",
    dueDate: "2025-04-20",
    status: "Ready to file",
  },
  {
    id: 2,
    name: "Quarterly TDS Return",
    period: "Jan-Mar 2025",
    dueDate: "2025-04-30",
    status: "Draft",
  },
  {
    id: 3,
    name: "Annual Tax Statement",
    period: "FY 2024-25",
    dueDate: "2025-07-31",
    status: "Not started",
  },
];

export function TaxSummary() {
  const [period, setPeriod] = useState<string>("current");

  const downloadTaxReport = (type: string) => {
    toast({
      title: `${type} downloaded`,
      description: "Tax report has been downloaded successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Filed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Not Due":
        return "bg-blue-100 text-blue-800";
      case "Ready to file":
        return "bg-purple-100 text-purple-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Not started":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tax Summary & Compliance</CardTitle>
          <CardDescription>Manage tax filings and compliance</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Period</SelectItem>
              <SelectItem value="previous">Previous Period</SelectItem>
              <SelectItem value="yearly">Yearly View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => downloadTaxReport("Tax Summary")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Tax Summary</TabsTrigger>
            <TabsTrigger value="reports">
              Reports & Filings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Table>
              <TableCaption>Tax Summary for April 2025</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Taxable Amount</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Tax Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxData.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell className="font-medium">{tax.category}</TableCell>
                    <TableCell className="text-right">₹{tax.taxableAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{tax.taxRate}%</TableCell>
                    <TableCell className="text-right">₹{tax.taxAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tax.status)}>
                        {tax.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {new Date(tax.dueDate) < new Date() && tax.status !== "Filed" ? (
                          <AlertCircle className="mr-1 h-4 w-4 text-destructive" />
                        ) : null}
                        {new Date(tax.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-muted/50">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">
                    ₹{taxData.reduce((sum, tax) => sum + tax.taxableAmount, 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                  <TableCell className="text-right">
                    ₹{taxData.reduce((sum, tax) => sum + tax.taxAmount, 0).toLocaleString()}
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="reports">
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{new Date(report.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadTaxReport(report.name)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => 
                              toast({
                                title: "Tax filing initiated",
                                description: `${report.name} filing process started.`
                              })
                            }
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="rounded-md border-2 border-dashed p-4 text-center">
                <Percent className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium text-lg">Need Tax Assistance?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our tax support team can help with compliance questions
                </p>
                <Button
                  variant="outline"
                  onClick={() => 
                    toast({
                      title: "Support requested",
                      description: "Tax support team will contact you shortly."
                    })
                  }
                >
                  Request Tax Support
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
