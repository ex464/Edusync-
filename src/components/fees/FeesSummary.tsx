
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeesSummaryProps {
  studentId: string;
}

interface FeeSummary {
  total_amount: number;
  paid_amount: number;
  due_amount: number;
  status: string;
  due_date: string;
}

// Mock data
const mockFeeSummary: FeeSummary = {
  total_amount: 39000,
  paid_amount: 27000,
  due_amount: 12000,
  status: "partially_paid",
  due_date: "2025-06-15",
};

const FeesSummary = ({ studentId }: FeesSummaryProps) => {
  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['feeSummary', studentId],
    queryFn: async () => {
      // Since we don't have the actual table in Supabase yet, return mock data
      return mockFeeSummary;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fees Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fees Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total Fees:</span>
          <span className="font-semibold">{summaryData?.total_amount ? `₹${summaryData.total_amount.toLocaleString()}` : 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Fees Paid:</span>
          <span className="font-semibold text-green-600">{summaryData?.paid_amount ? `₹${summaryData.paid_amount.toLocaleString()}` : 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Balance:</span>
          <span className="font-semibold text-amber-600">{summaryData?.due_amount ? `₹${summaryData.due_amount.toLocaleString()}` : 'N/A'}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeesSummary;
