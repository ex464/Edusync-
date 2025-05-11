
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Define types
interface PaymentRecord {
  id: string;
  amount: number;
  payment_method: string;
  payment_status: string;
  payment_date: string;
  receipt_url?: string;
}

interface PaymentHistoryProps {
  studentId: string;
}

// Mock data
const mockPaymentHistory: PaymentRecord[] = [
  {
    id: "1",
    amount: 15000,
    payment_method: "UPI",
    payment_status: "completed",
    payment_date: "2024-09-05",
    receipt_url: "#"
  },
  {
    id: "2",
    amount: 12000,
    payment_method: "Credit Card",
    payment_status: "completed",
    payment_date: "2024-07-15",
    receipt_url: "#"
  },
];

const PaymentHistory = ({ studentId }: PaymentHistoryProps) => {
  const { data: paymentRecords, isLoading } = useQuery({
    queryKey: ['paymentHistory', studentId],
    queryFn: async () => {
      // Since we don't have the actual table in Supabase yet, return mock data
      return mockPaymentHistory;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return <div>Loading payment history...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {paymentRecords && paymentRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{formatDate(record.payment_date)}</TableCell>
                  <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                  <TableCell>{record.payment_method}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      record.payment_status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {record.payment_status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {record.receipt_url && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Receipt
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No payment records</h3>
            <p className="text-muted-foreground mt-1">
              There are no payment records available yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
