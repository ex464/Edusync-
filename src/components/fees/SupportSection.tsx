
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Mail, Phone } from "lucide-react";

export function SupportSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
        <CardDescription>Contact our support team for assistance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat with Support
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Email Support
        </Button>
        <Button variant="outline" className="w-full">
          <Phone className="mr-2 h-4 w-4" />
          Call Support
        </Button>
      </CardContent>
    </Card>
  );
}
