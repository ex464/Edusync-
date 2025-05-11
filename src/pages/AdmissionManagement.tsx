
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdmissionStats } from "@/components/admission/AdmissionStats";
import { AdmissionTable } from "@/components/admission/AdmissionTable";
import { Separator } from "@/components/ui/separator";

export default function AdmissionManagement() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admission Management</h1>
          <p className="text-muted-foreground">
            Manage student admissions and applications
          </p>
        </div>
        
        <AdmissionStats />
        
        <Separator />
        
        <AdmissionTable />
      </div>
    </DashboardLayout>
  );
}
