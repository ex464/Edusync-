
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Clock,
  AlertCircle,
  ArrowUpCircle,
  CheckCircle,
  Coins,
  BarChart3,
  CalendarClock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample budget data
const budgetCategories = [
  {
    id: 1,
    name: "Staff Salaries",
    allocated: 180000,
    spent: 150000,
    remaining: 30000,
    status: "On Track",
    period: "April 2025",
    department: "Administration",
  },
  {
    id: 2,
    name: "Facilities & Maintenance",
    allocated: 50000,
    spent: 35000,
    remaining: 15000,
    status: "On Track",
    period: "April 2025",
    department: "Operations",
  },
  {
    id: 3,
    name: "Teaching Materials",
    allocated: 35000,
    spent: 32000,
    remaining: 3000,
    status: "At Risk",
    period: "April 2025",
    department: "Academic",
  },
  {
    id: 4,
    name: "Technology & Software",
    allocated: 25000,
    spent: 23000,
    remaining: 2000,
    status: "At Risk",
    period: "April 2025",
    department: "IT",
  },
  {
    id: 5,
    name: "Events & Activities",
    allocated: 30000,
    spent: 15000,
    remaining: 15000,
    status: "On Track",
    period: "April 2025",
    department: "Student Affairs",
  },
  {
    id: 6,
    name: "Transportation",
    allocated: 40000,
    spent: 38000,
    remaining: 2000,
    status: "At Risk",
    period: "April 2025",
    department: "Operations",
  },
];

// Sample budget periods
const budgetPeriods = [
  { value: "april-2025", label: "April 2025" },
  { value: "may-2025", label: "May 2025" },
  { value: "june-2025", label: "June 2025" },
  { value: "q2-2025", label: "Q2 2025" },
  { value: "h1-2025", label: "H1 2025" },
  { value: "fy-2025", label: "FY 2025-26" },
];

// Type for budget form
interface BudgetFormValues {
  category: string;
  amount: number;
  department: string;
  period: string;
  notes: string;
}

export function BudgetModule() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("april-2025");
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [categories, setCategories] = useState(budgetCategories);
  
  const form = useForm<BudgetFormValues>({
    defaultValues: {
      category: "",
      amount: 0,
      department: "",
      period: "april-2025",
      notes: "",
    },
  });

  const onSubmit = (data: BudgetFormValues) => {
    // In a real app, this would save to a database
    toast({
      title: "Budget allocated",
      description: `₹${data.amount} allocated for ${data.category}`,
    });
    setIsAddBudgetOpen(false);
    form.reset();
  };

  const formatPercentage = (spent: number, allocated: number) => {
    return Math.round((spent / allocated) * 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On Track":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "At Risk":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "Over Budget":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Budget Planning & Allocation</CardTitle>
          <CardDescription>Manage school budget allocations and track spending</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {budgetPeriods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Allocate New Budget</DialogTitle>
                <DialogDescription>
                  Set budget allocation for a department or category.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Category</FormLabel>
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
                            <SelectItem value="Staff Salaries">Staff Salaries</SelectItem>
                            <SelectItem value="Facilities & Maintenance">Facilities & Maintenance</SelectItem>
                            <SelectItem value="Teaching Materials">Teaching Materials</SelectItem>
                            <SelectItem value="Technology & Software">Technology & Software</SelectItem>
                            <SelectItem value="Events & Activities">Events & Activities</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Administration">Administration</SelectItem>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="Student Affairs">Student Affairs</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Period</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {budgetPeriods.map((period) => (
                              <SelectItem key={period.value} value={period.value}>
                                {period.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save Budget</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="departments">By Department</TabsTrigger>
            <TabsTrigger value="planning">Budget Planning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead className="hidden md:table-cell">Spent</TableHead>
                    <TableHead className="hidden md:table-cell">Remaining</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>₹{category.allocated.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">₹{category.spent.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">₹{category.remaining.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="w-full flex flex-col space-y-1">
                          <Progress value={formatPercentage(category.spent, category.allocated)} className="h-2" />
                          <span className="text-xs text-muted-foreground">
                            {formatPercentage(category.spent, category.allocated)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(category.status)}
                          <Badge className="ml-2" variant={
                            category.status === "On Track" 
                              ? "outline"
                              : category.status === "At Risk"
                                ? "default"
                                : "destructive"
                          }>
                            {category.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 text-blue-500 mr-2" />
                    <div className="text-2xl font-bold">
                      ₹{categories.reduce((sum, cat) => sum + cat.allocated, 0).toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-amber-500 mr-2" />
                    <div className="text-2xl font-bold">
                      ₹{categories.reduce((sum, cat) => sum + cat.spent, 0).toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 text-green-500 mr-2" />
                    <div className="text-2xl font-bold">
                      ₹{categories.reduce((sum, cat) => sum + cat.remaining, 0).toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-4">
            <div className="rounded-md border p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Department Budget View</h3>
              <p className="text-muted-foreground mb-4">
                This view is under development and will be available soon.
              </p>
              <Button variant="outline">Request Early Access</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="planning" className="space-y-4">
            <div className="rounded-md border p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Budget Planning Tools</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive budget planning tools are coming in the next update.
              </p>
              <Button variant="outline">Request Early Access</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
