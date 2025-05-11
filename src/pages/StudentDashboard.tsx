
import { BookOpen, Clock, CalendarDays, BookText } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/card-stat";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to your student dashboard</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Attendance"
            value="92%"
            icon={Clock}
            trend="up"
            trendValue="2% from last month"
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Courses"
            value="8"
            icon={BookOpen}
            description="Active courses"
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Assignments"
            value="3"
            icon={BookText}
            description="Due this week"
            trend="down"
            trendValue="2 less than last week"
            iconColor="bg-amber-100 text-amber-600"
          />
          <StatCard
            title="Upcoming"
            value="2"
            icon={CalendarDays}
            description="Exams this month"
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm font-medium">86%</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Science</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">English</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">History</span>
                  <span className="text-sm font-medium">81%</span>
                </div>
                <Progress value={81} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Geography</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UpcomingEvents />
          <RecentActivities />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
