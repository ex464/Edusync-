
import { BookOpen, BookText, Users, CalendarDays } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/card-stat";
import ChartSection from "@/components/dashboard/ChartSection";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { useLanguage } from "@/components/language/LanguageProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const TeacherDashboard = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
          <p className="text-muted-foreground mt-1">{t("welcome")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="My Classes"
            value="6"
            icon={BookOpen}
            description="Active classes"
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="My Students"
            value={isMobile ? "142" : "142"}
            icon={Users}
            description="Across all classes"
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Assignments"
            value="8"
            icon={BookText}
            description="Pending review"
            trend="up"
            trendValue="3 new submissions"
            iconColor="bg-amber-100 text-amber-600"
          />
          <StatCard
            title="This Week"
            value="12"
            icon={CalendarDays}
            description="Scheduled classes"
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

export default TeacherDashboard;
