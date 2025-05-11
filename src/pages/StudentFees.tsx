
import DashboardLayout from "@/components/layout/DashboardLayout";
import FeesSummary from "@/components/fees/FeesSummary";
import FeeBreakdown from "@/components/fees/FeeBreakdown";
import PaymentSection from "@/components/fees/PaymentSection";
import PaymentHistory from "@/components/fees/PaymentHistory";
import { LateFeeNotice } from "@/components/fees/LateFeeNotice";
import { SupportSection } from "@/components/fees/SupportSection";
import { Separator } from "@/components/ui/separator";

export default function StudentFees() {
  // In a real app, you would get this ID from authentication context
  const studentId = "00000000-0000-0000-0000-000000000000"; // Placeholder student ID

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Fees & Payments</h1>
          <p className="text-muted-foreground">
            View your fees, make payments, and download receipts
          </p>
        </div>

        <FeesSummary studentId={studentId} />
        
        <Separator />
        
        <div className="grid gap-6 md:grid-cols-2">
          <FeeBreakdown studentId={studentId} />
          <PaymentSection studentId={studentId} />
        </div>
        
        <Separator />
        
        <PaymentHistory studentId={studentId} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <LateFeeNotice />
          <SupportSection />
        </div>
      </div>
    </DashboardLayout>
  );
}
