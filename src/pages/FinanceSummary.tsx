import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/card-stat";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Download,
  PlusCircle,
  FileText,
  ChevronRight,
  Printer,
  Send,
  BarChart3,
  PieChart,
  Mail,
  CalendarDays,
  ArrowDownUp,
  Filter,
} from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { BudgetModule } from "@/components/finance/BudgetModule";
import { TaxSummary } from "@/components/finance/TaxSummary";
import { FinancialAlerts } from "@/components/finance/FinancialAlerts";
import { ExportOptions } from "@/components/finance/ExportOptions";

const monthlyIncomeData = [
  { name: "Tuition Fees", value: 250000, color: "#8B5CF6" },
  { name: "Admission Fees", value: 50000, color: "#0EA5E9" },
  { name: "Transport Charges", value: 35000, color: "#F97316" },
  { name: "Hostel Fees", value: 85000, color: "#D946EF" },
  { name: "Donations", value: 25000, color: "#10B981" },
  { name: "Others", value: 5000, color: "#6B7280" },
];

const expenseData = [
  { name: "Staff Salaries", value: 150000, color: "#8B5CF6" },
  { name: "Electricity/Water", value: 25000, color: "#0EA5E9" },
  { name: "Maintenance", value: 15000, color: "#F97316" },
  { name: "Transport", value: 35000, color: "#D946EF" },
  { name: "Exam Materials", value: 10000, color: "#10B981" },
  { name: "Software", value: 8000, color: "#6B7280" },
  { name: "Events", value: 12000, color: "#EF4444" },
];

const expensesTableData = [
  {
    id: 1,
    date: "2025-04-03",
    category: "Staff Salary",
    amount: 75000,
    description: "March salary for teachers",
    paidTo: "UPI/Bank (Bulk)",
  },
  {
    id: 2,
    date: "2025-04-05",
    category: "Maintenance",
    amount: 3000,
    description: "Fan & lights replacement",
    paidTo: "Local Vendor",
  },
  {
    id: 3,
    date: "2025-04-08",
    category: "Electricity",
    amount: 12500,
    description: "Monthly electricity bill",
    paidTo: "Electricity Board",
  },
  {
    id: 4,
    date: "2025-04-10",
    category: "Transport",
    amount: 18000,
    description: "Fuel for school buses",
    paidTo: "Petrol Pump",
  },
  {
    id: 5,
    date: "2025-04-12",
    category: "Software",
    amount: 8000,
    description: "Google Workspace subscription",
    paidTo: "Google LLC",
  },
];

const duePaymentsData = [
  {
    id: 1,
    type: "Parent",
    name: "Mr. Sharma (10-A)",
    amount: 8000,
    dueDate: "2025-04-15",
    reminderStatus: "Pending",
  },
  {
    id: 2,
    type: "Vendor",
    name: "ABC Printers",
    amount: 12000,
    dueDate: "2025-04-12",
    reminderStatus: "Sent",
  },
  {
    id: 3,
    type: "Parent",
    name: "Mrs. Patel (8-B)",
    amount: 5500,
    dueDate: "2025-04-18",
    reminderStatus: "Pending",
  },
  {
    id: 4,
    type: "Parent",
    name: "Mr. Kumar (12-A)",
    amount: 10000,
    dueDate: "2025-04-10",
    reminderStatus: "Overdue",
  },
  {
    id: 5,
    type: "Vendor",
    name: "XYZ Stationery",
    amount: 7500,
    dueDate: "2025-04-20",
    reminderStatus: "Pending",
  },
];

const COLORS = ["#8B5CF6", "#0EA5E9", "#F97316", "#D946EF", "#10B981", "#6B7280", "#EF4444"];

interface ExpenseEntry {
  date: string;
  category: string;
  amount: number;
  description: string;
  paidTo: string;
}

const FinanceSummary = () => {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "budget" | "tax" | "alerts">("overview");
  
  const form = useForm<ExpenseEntry>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      category: "",
      amount: 0,
      description: "",
      paidTo: "",
    },
  });

  const onSubmit = (data: ExpenseEntry) => {
    // In a real app, this would save to a database
    toast({
      title: "Expense added",
      description: `₹${data.amount} added for ${data.category}`,
    });
    setIsAddExpenseOpen(false);
    form.reset();
  };

  const sendReminders = () => {
    toast({
      title: "Reminders sent",
      description: "Payment reminders have been sent to all pending dues.",
    });
  };

  const downloadReport = (type: string) => {
    toast({
      title: `${type} report downloaded`,
      description: "Your report has been downloaded successfully.",
    });
  };

  const filteredExpenses = selectedFilter === "all" 
    ? expensesTableData 
    : expensesTableData.filter(expense => expense.category === selectedFilter);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Finance Summary & Expense Tracker</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all financial activities of your institution
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={period} onValueChange={(value: "monthly" | "yearly") => setPeriod(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly View</SelectItem>
                <SelectItem value="yearly">Yearly View</SelectItem>
              </SelectContent>
            </Select>
            <ExportOptions 
              title="Export Finance Data"
              onExport={(format) => {
                downloadReport(`${period === "monthly" ? "Monthly" : "Yearly"} Financial Report (${format})`);
              }}
            />
          </div>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "overview" | "budget" | "tax" | "alerts")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget Planning</TabsTrigger>
            <TabsTrigger value="tax">Tax & Compliance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Income"
                value="₹3,50,000"
                description={period === "monthly" ? "April 2025" : "2025"}
                icon={TrendingUp}
                trend="up"
                trendValue="+12% from last month"
                iconColor="bg-green-100 text-green-700"
              />
              <StatCard
                title="Total Expenses"
                value="₹2,10,000"
                description={period === "monthly" ? "April 2025" : "2025"}
                icon={TrendingDown}
                trend="down"
                trendValue="-5% from last month"
                iconColor="bg-red-100 text-red-700"
              />
              <StatCard
                title="Net Profit"
                value="₹1,40,000"
                description={period === "monthly" ? "April 2025" : "2025"}
                icon={DollarSign}
                trend="up"
                trendValue="+8% from last month"
                iconColor="bg-blue-100 text-blue-700"
              />
              <StatCard
                title="Pending Dues"
                value="₹25,000"
                description="Requires attention"
                icon={AlertTriangle}
                trend="down"
                trendValue="5 new dues this month"
                iconColor="bg-orange-100 text-orange-700"
              />
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Income Breakdown</CardTitle>
                  <CardDescription>Visualization of income sources</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChartType("pie")}
                    className={chartType === "pie" ? "bg-primary text-primary-foreground" : ""}
                  >
                    <PieChart className="h-4 w-4 mr-1" />
                    Pie
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChartType("bar")}
                    className={chartType === "bar" ? "bg-primary text-primary-foreground" : ""}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Bar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    {chartType === "pie" ? (
                      <ChartContainer
                        config={{
                          "Tuition Fees": { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                          "Admission Fees": { theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
                          "Transport Charges": { theme: { light: "#F97316", dark: "#F97316" } },
                          "Hostel Fees": { theme: { light: "#D946EF", dark: "#D946EF" } },
                          "Donations": { theme: { light: "#10B981", dark: "#10B981" } },
                          "Others": { theme: { light: "#6B7280", dark: "#6B7280" } },
                        }}
                      >
                        <RechartsPieChart>
                          <Pie
                            data={monthlyIncomeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {monthlyIncomeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                        </RechartsPieChart>
                      </ChartContainer>
                    ) : (
                      <ChartContainer
                        config={{
                          "Tuition Fees": { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                          "Admission Fees": { theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
                          "Transport Charges": { theme: { light: "#F97316", dark: "#F97316" } },
                          "Hostel Fees": { theme: { light: "#D946EF", dark: "#D946EF" } },
                          "Donations": { theme: { light: "#10B981", dark: "#10B981" } },
                          "Others": { theme: { light: "#6B7280", dark: "#6B7280" } },
                        }}
                      >
                        <BarChart data={monthlyIncomeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="value" fill="#8884d8">
                            {monthlyIncomeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ChartContainer>
                    )}
                  </div>

                  <div className="h-80">
                    <h3 className="font-medium mb-2">Expense Breakdown</h3>
                    <ChartContainer
                      config={{
                        "Staff Salaries": { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                        "Electricity/Water": { theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
                        "Maintenance": { theme: { light: "#F97316", dark: "#F97316" } },
                        "Transport": { theme: { light: "#D946EF", dark: "#D946EF" } },
                        "Exam Materials": { theme: { light: "#10B981", dark: "#10B981" } },
                        "Software": { theme: { light: "#6B7280", dark: "#6B7280" } },
                        "Events": { theme: { light: "#EF4444", dark: "#EF4444" } },
                      }}
                    >
                      <RechartsPieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                      </RechartsPieChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Expense Tracker</CardTitle>
                  <CardDescription>Track all school expenses</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Staff Salary">Staff Salary</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Expense
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription>
                          Enter the details of the new expense. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Staff Salary">Staff Salary</SelectItem>
                                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                                    <SelectItem value="Electricity">Electricity</SelectItem>
                                    <SelectItem value="Transport">Transport</SelectItem>
                                    <SelectItem value="Exam Materials">Exam Materials</SelectItem>
                                    <SelectItem value="Software">Software</SelectItem>
                                    <SelectItem value="Events">Events</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount (₹)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="paidTo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Paid To</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit">Save Expense</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of recent expenses</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead className="hidden md:table-cell">Paid To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{expense.description}</TableCell>
                        <TableCell className="hidden md:table-cell">{expense.paidTo}</TableCell>
                      </TableRow>
                    ))}
                    {filteredExpenses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No expenses found for the selected filter.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Due Payments</CardTitle>
                    <CardDescription>Track all pending payments</CardDescription>
                  </div>
                  <Button onClick={sendReminders}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reminders
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {duePaymentsData.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>{payment.name}</TableCell>
                          <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                payment.reminderStatus === "Sent" 
                                  ? "outline" 
                                  : payment.reminderStatus === "Overdue" 
                                    ? "destructive" 
                                    : "default"
                              }
                            >
                              {payment.reminderStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Reports & Notes</CardTitle>
                  <CardDescription>Financial analysis and quick notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="reports">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="notes">Manual Entries</TabsTrigger>
                    </TabsList>
                    <TabsContent value="reports" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Available Reports</h3>
                        <div className="rounded-md border p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-primary" />
                                <span>Monthly Finance Report</span>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => downloadReport("Monthly")}>
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-primary" />
                                <span>Quarterly Tax Report</span>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => downloadReport("Quarterly")}>
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-primary" />
                                <span>Annual Financial Statement</span>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => downloadReport("Annual")}>
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="font-medium mt-4">AI Insights</h3>
                        <div className="rounded-md border bg-blue-50 p-4 space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="mt-0.5 text-blue-600">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-blue-800">You spent 10% more on electricity this month compared to last month.</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="mt-0.5 text-blue-600">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-blue-800">You can save ₹1,500/month if you reduce print cost by using digital report cards.</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="mt-0.5 text-blue-600">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-blue-800">Transport costs have increased by 8% this quarter. Consider route optimization.</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="notes" className="space-y-4 pt-4">
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">Add Quick Entry</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Entry Type</label>
                              <RadioGroup defaultValue="expense" className="flex flex-col space-y-1">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="expense" id="expense" />
                                  <label htmlFor="expense" className="text-sm">Expense</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="income" id="income" />
                                  <label htmlFor="income" className="text-sm">Income</label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Category</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="petty-cash">Petty Cash</SelectItem>
                                  <SelectItem value="emergency">Emergency</SelectItem>
                                  <SelectItem value="donation">Donation</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Amount (₹)</label>
                            <Input type="number" placeholder="Enter amount" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea placeholder="Briefly describe this entry" />
                          </div>
                          <Button className="w-full mt-2">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Entry
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetModule />
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <TaxSummary />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <FinancialAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FinanceSummary;
