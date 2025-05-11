
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Link, Bell } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data for demonstration
const mockFeeData = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    totalFee: 25000,
    paidAmount: 20000,
    dueAmount: 5000,
    paymentDate: "2023-10-15",
    status: "partial",
  },
  {
    id: 2,
    studentName: "Diya Patel",
    totalFee: 25000,
    paidAmount: 25000,
    dueAmount: 0,
    paymentDate: "2023-10-12",
    status: "paid",
  },
  {
    id: 3,
    studentName: "Arjun Singh",
    totalFee: 25000,
    paidAmount: 0,
    dueAmount: 25000,
    paymentDate: "-",
    status: "unpaid",
  },
  {
    id: 4,
    studentName: "Ananya Desai",
    totalFee: 25000,
    paidAmount: 15000,
    dueAmount: 10000,
    paymentDate: "2023-09-30",
    status: "partial",
  },
  {
    id: 5,
    studentName: "Rohan Gupta",
    totalFee: 25000,
    paidAmount: 25000,
    dueAmount: 0,
    paymentDate: "2023-09-15",
    status: "paid",
  },
  {
    id: 6,
    studentName: "Ishaan Reddy",
    totalFee: 25000,
    paidAmount: 10000,
    dueAmount: 15000,
    paymentDate: "2023-09-05",
    status: "partial",
  },
];

const FeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFees = mockFeeData.filter(fee => 
    fee.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500";
      case "partial": return "bg-amber-500";
      case "unpaid": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleGeneratePaymentLink = (id: number) => {
    // In a real application, this would generate a payment link
    toast.success(`Payment link generated for student #${id}`);
  };

  const handleSendReminder = (id: number) => {
    // In a real application, this would send a payment reminder
    toast.success(`Payment reminder sent to student #${id}`);
  };

  const handleDownloadReceipt = (id: number) => {
    // In a real application, this would download a payment receipt
    toast.success(`Receipt downloaded for student #${id}`);
  };

  return (
    <DashboardLayout role="admin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Fee Management</h1>
              <p className="text-muted-foreground">
                Monitor and manage student fee collection
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search student..."
                className="w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Fees Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{mockFeeData.reduce((sum, fee) => sum + fee.paidAmount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{mockFeeData.reduce((sum, fee) => sum + fee.dueAmount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Students with Due Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockFeeData.filter(fee => fee.dueAmount > 0).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-right">Total Fee</TableHead>
                    <TableHead className="text-right">Paid Amount</TableHead>
                    <TableHead className="text-right">Due Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.length > 0 ? (
                    filteredFees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.studentName}</TableCell>
                        <TableCell className="text-right">₹{fee.totalFee.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{fee.paidAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{fee.dueAmount.toLocaleString()}</TableCell>
                        <TableCell>{fee.paymentDate}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${getStatusColor(fee.status)} text-white`}
                          >
                            {fee.status === "paid" ? "Paid" : 
                              fee.status === "partial" ? "Partial" : "Unpaid"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleGeneratePaymentLink(fee.id)}
                              title="Generate Payment Link"
                            >
                              <Link className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleSendReminder(fee.id)}
                              title="Send Reminder"
                              disabled={fee.status === "paid"}
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDownloadReceipt(fee.id)}
                              title="Download Receipt"
                              disabled={fee.status === "unpaid"}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No fee records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FeeManagement;
