
import { Users, GraduationCap, CalendarDays, BookOpen } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/card-stat";
import ChartSection from "@/components/dashboard/ChartSection";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { useLanguage } from "@/components/language/LanguageProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
          <p className="text-muted-foreground mt-1">{t("welcome")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Total Students"
            value={isMobile ? "1.2k" : "1,248"}
            icon={GraduationCap}
            trend="up"
            trendValue="12% from last month"
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Total Teachers"
            value="76"
            icon={Users}
            trend="neutral"
            trendValue="Same as last month"
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Attendance Rate"
            value="92%"
            icon={CalendarDays}
            trend="down"
            trendValue="3% from last month"
            iconColor="bg-amber-100 text-amber-600"
          />
          <StatCard
            title="Active Courses"
            value="32"
            icon={BookOpen}
            trend="up"
            trendValue="4 new courses"
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        <ChartSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <RecentActivities />
          <UpcomingEvents />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
