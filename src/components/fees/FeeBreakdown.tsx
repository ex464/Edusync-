
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
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";

interface FeeCategory {
  id: string;
  name: string;
  amount: number;
  status: string;
}

interface FeeBreakdownProps {
  studentId: string;
}

// Mock data for fee categories
const mockFeeCategories: FeeCategory[] = [
  {
    id: "1",
    name: "Tuition Fee",
    amount: 25000,
    status: "paid",
  },
  {
    id: "2",
    name: "Library Fee",
    amount: 2000,
    status: "paid",
  },
  {
    id: "3",
    name: "Laboratory Fee",
    amount: 5000,
    status: "unpaid",
  },
  {
    id: "4",
    name: "Sports Fee",
    amount: 3000,
    status: "unpaid",
  },
  {
    id: "5",
    name: "Examination Fee",
    amount: 4000,
    status: "paid",
  },
];

const FeeBreakdown = ({ studentId }: FeeBreakdownProps) => {
  const { data: breakdownData, isLoading } = useQuery({
    queryKey: ['feeBreakdown', studentId],
    queryFn: async () => {
      // Since we don't have the actual table in Supabase yet, return mock data
      return mockFeeCategories;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Fee Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdownData && breakdownData.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.name}</TableCell>
                  <TableCell className="text-right">
                    ₹{fee.amount.toLocaleString() ?? 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {fee.status === 'paid' ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeBreakdown;
