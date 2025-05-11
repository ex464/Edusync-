
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  AlertTriangle,
  Bell,
  Mail,
  MessageSquare,
  Settings,
  DollarSign,
  Calendar,
  Truck,
  ReceiptText,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface AlertSettings {
  budgetThreshold: number;
  paymentReminder: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  reportFrequency: string;
}

interface AlertItem {
  id: number;
  type: string;
  message: string;
  date: string;
  priority: "high" | "medium" | "low";
  icon: React.ReactNode;
}

const alertData: AlertItem[] = [
  {
    id: 1,
    type: "Budget Alert",
    message: "Transport budget has exceeded 90% of allocation",
    date: "2025-04-12",
    priority: "high",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    id: 2,
    type: "Payment Due",
    message: "Vendor payment of ₹15,000 due in 3 days",
    date: "2025-04-14",
    priority: "medium",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    id: 3,
    type: "Tax Filing",
    message: "GST filing due date approaching (April 20th)",
    date: "2025-04-11",
    priority: "high",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: 4,
    type: "Inventory",
    message: "Educational supplies running low, reorder recommended",
    date: "2025-04-10",
    priority: "low",
    icon: <Truck className="h-5 w-5" />,
  },
];

export function FinancialAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(alertData);
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<AlertSettings>({
    defaultValues: {
      budgetThreshold: 80,
      paymentReminder: 5,
      emailNotifications: true,
      smsNotifications: false,
      whatsappNotifications: true,
      reportFrequency: "weekly",
    },
  });

  const onSubmit = (data: AlertSettings) => {
    toast({
      title: "Alert settings updated",
      description: "Your notification preferences have been saved.",
    });
    setShowSettings(false);
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    toast({
      title: "Alert dismissed",
      description: "The alert has been removed from your list.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-100 border-red-500";
      case "medium":
        return "text-amber-500 bg-amber-100 border-amber-500";
      case "low":
        return "text-blue-500 bg-blue-100 border-blue-500";
      default:
        return "text-gray-500 bg-gray-100 border-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Financial Alerts & Notifications</CardTitle>
          <CardDescription>
            Stay informed about financial events and anomalies
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSettings ? (
          <Card className="border-dashed">
            <CardContent className="pt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="budgetThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Alert Threshold (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Alert when budget usage exceeds this percentage
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentReminder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Reminder (days before)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Send payment reminders these many days before due date
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Alerts
                            </FormLabel>
                            <FormDescription>
                              Receive alerts via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              SMS Alerts
                            </FormLabel>
                            <FormDescription>
                              Receive alerts via SMS
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsappNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp Alerts
                            </FormLabel>
                            <FormDescription>
                              Receive alerts via WhatsApp
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="reportFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Financial Report Frequency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How often you want to receive financial reports
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Save Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <>
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-md border p-4 flex items-start space-x-4 ${getPriorityColor(
                      alert.priority
                    )}`}
                  >
                    <div className="shrink-0">
                      {alert.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{alert.type}</p>
                        <Badge variant="outline">
                          {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                        </Badge>
                      </div>
                      <p>{alert.message}</p>
                      <p className="text-sm opacity-70">
                        {new Date(alert.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Active Alerts</h3>
                <p className="text-muted-foreground">
                  You're all caught up! No financial alerts at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
