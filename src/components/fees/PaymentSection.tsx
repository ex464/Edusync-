
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface PaymentSectionProps {
  studentId: string;
}

interface FeeDetails {
  due_amount: number;
  payment_methods: string[];
}

// Mock data
const mockFeeDetails: FeeDetails = {
  due_amount: 12000,
  payment_methods: ["UPI", "Credit Card", "Net Banking", "Cheque"]
};

const PaymentSection = ({ studentId }: PaymentSectionProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: feeDetails, isLoading } = useQuery({
    queryKey: ['feeDetails', studentId],
    queryFn: async () => {
      // Since we don't have the actual table in Supabase yet, return mock data
      return mockFeeDetails;
    }
  });

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (feeDetails && paymentAmount > feeDetails.due_amount) {
      toast.error(`Amount exceeds the due amount of ₹${feeDetails.due_amount.toLocaleString()}`);
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment initiated successfully");
      setIsSubmitting(false);
      setPaymentMethod("");
      setAmount("");
    }, 1500);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/50 p-3 rounded">
            <span className="text-sm">Due Amount</span>
            <div className="flex items-center font-semibold">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>₹{feeDetails?.due_amount.toLocaleString() ?? 0}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {feeDetails?.payment_methods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <Button 
              className="w-full mt-4" 
              disabled={isSubmitting}
              onClick={handlePayment}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Now
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
