
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function LateFeeNotice() {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Late Fee Warning</AlertTitle>
      <AlertDescription>
        A late fee of ₹50 per day will be charged after the due date. Please pay before the deadline to avoid additional charges.
      </AlertDescription>
    </Alert>
  );
}
