
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  Settings,
  User,
  Book,
  Calendar,
  MessageSquare,
  FileText,
  LogOut,
  UserPlus,
  GraduationCap,
  DollarSign,
  Bell,
  Clock,
  BarChart,
  ThumbsUp,
  Backpack,
  FileQuestion,
  Presentation,
  Users,
  CalendarDays,
  BookOpen,
  IdCard,
  FileUp,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  role: "admin" | "teacher" | "student";
}

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ElementType;
  subLinks?: { title: string; href: string }[];
}

export default function Sidebar({ open, setOpen, role }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  const sidebarLinks: SidebarLink[] = [
    {
      title: "Dashboard",
      href: `/${role}`,
      icon: LayoutDashboard,
    },
  ];

  const adminLinks: SidebarLink[] = [
    {
      title: "Student Management",
      href: "/admin/students",
      icon: UserPlus,
      subLinks: [
        { title: "Class Promotion", href: "/admin/class-promotion" },
        { title: "Document Management", href: "/admin/student-documents" },
      ],
    },
    {
      title: "Teacher Management",
      href: "/admin/teachers",
      icon: GraduationCap,
    },
    {
      title: "Attendance Tracking",
      href: "/admin/attendance",
      icon: Calendar,
    },
    {
      title: "Exams",
      href: "/admin/exams",
      icon: FileQuestion,
    },
    {
      title: "Fee Management",
      href: "/admin/fees",
      icon: DollarSign,
    },
    {
      title: "Timetable",
      href: "/admin/timetable",
      icon: Clock,
    },
    {
      title: "Reports & Analytics",
      href: "/admin/reports",
      icon: BarChart,
    },
    {
      title: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      title: "Feedback",
      href: "/admin/feedback",
      icon: ThumbsUp,
    },
    {
      title: "Calendar",
      href: "/admin/calendar",
      icon: Calendar,
    },
    {
      title: "Activities",
      href: "/admin/activities",
      icon: Backpack,
    },
    {
      title: "Study Topics",
      href: "/admin/topics",
      icon: Book,
    },
    {
      title: "Study Resources",
      href: "/admin/resources",
      icon: Presentation,
    },
    {
      title: "Admissions",
      href: "/admin/admissions",
      icon: UserPlus,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Finance Summary",
      href: "/admin/finance",
      icon: DollarSign,
    },
    {
      title: "My Profile",
      href: "/admin/profile",
      icon: User,
    },
  ];

  const teacherLinks: SidebarLink[] = [
    {
      title: "Attendance",
      href: "/teacher/attendance",
      icon: Calendar,
    },
    {
      title: "Exams",
      href: "/teacher/exams",
      icon: FileQuestion,
    },
    {
      title: "Timetable",
      href: "/teacher/timetable",
      icon: Clock,
    },
    {
      title: "Notifications",
      href: "/teacher/notifications",
      icon: Bell,
    },
    {
      title: "Feedback",
      href: "/teacher/feedback",
      icon: ThumbsUp,
    },
    {
      title: "Calendar",
      href: "/teacher/calendar",
      icon: Calendar,
    },
    {
      title: "Activities",
      href: "/teacher/activities",
      icon: Backpack,
    },
    {
      title: "Study Topics",
      href: "/teacher/topics",
      icon: Book,
    },
    {
      title: "Study Resources",
      href: "/teacher/resources",
      icon: Presentation,
    },
    {
      title: "Communication",
      href: "/teacher/communication",
      icon: MessageSquare,
    },
    {
      title: "Reports",
      href: "/teacher/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/teacher/settings",
      icon: Settings,
    },
    {
      title: "My Profile",
      href: "/teacher/profile",
      icon: User,
    },
  ];

  const studentLinks: SidebarLink[] = [
    {
      title: "Notifications",
      href: "/student/notifications",
      icon: Bell,
    },
    {
      title: "Fees & Payments",
      href: "/student/fees",
      icon: DollarSign,
    },
    {
      title: "Feedback",
      href: "/student/feedback",
      icon: ThumbsUp,
    },
    {
      title: "Calendar",
      href: "/student/calendar",
      icon: Calendar,
    },
    {
      title: "Activities",
      href: "/student/activities",
      icon: Backpack,
    },
    {
      title: "Study Topics",
      href: "/student/topics",
      icon: Book,
    },
    {
      title: "Study Resources",
      href: "/student/resources",
      icon: Presentation,
    },
    {
      title: "Timetable",
      href: "/student/timetable",
      icon: Clock,
    },
    {
      title: "Exams",
      href: "/student/exams",
      icon: FileQuestion,
    },
    {
      title: "Subjects",
      href: "/student/subjects",
      icon: Book,
    },
    {
      title: "Attendance",
      href: "/student/attendance",
      icon: Calendar,
    },
    {
      title: "Communication",
      href: "/student/communication",
      icon: MessageSquare,
    },
    {
      title: "Documents",
      href: "/student/documents",
      icon: FileUp,
    },
    {
      title: "My Profile",
      href: "/student/profile",
      icon: User,
    },
    {
      title: "Student ID",
      href: "/student/id-card",
      icon: IdCard,
    },
  ];

  const renderLinks = () => {
    switch (role) {
      case "admin":
        return [...sidebarLinks, ...adminLinks];
      case "teacher":
        return [...sidebarLinks, ...teacherLinks];
      case "student":
        return [...sidebarLinks, ...studentLinks];
      default:
        return sidebarLinks;
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Handle click on menu item - close sidebar on both mobile and desktop
  const handleMenuItemClick = () => {
    // Always close sidebar when clicking a menu item
    setOpen(false);
  };

  // For desktop view - now using Sheet component for both mobile and desktop
  const renderSidebar = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-72 border-r pt-0 pb-4 pl-0 pr-2 z-50"
      >
        <SheetHeader className="pl-4 pr-6 pt-4">
          <SheetTitle className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold">EduSync</span>
          </SheetTitle>
          <SheetDescription>
            Manage your school operations efficiently.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col space-y-1 mt-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {renderLinks().map((link, index) => (
            <React.Fragment key={index}>
              <NavLink
                to={link.href}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground ${
                  location.pathname === link.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={handleMenuItemClick}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.title}</span>
              </NavLink>
              {link.subLinks && location.pathname === link.href && (
                <div className="ml-4 flex flex-col space-y-1">
                  {link.subLinks.map((subLink, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subLink.href}
                      className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground ${
                        location.pathname === subLink.href
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground"
                      }`}
                      onClick={handleMenuItemClick}
                    >
                      <span>{subLink.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-auto flex flex-col space-y-1">
          <Separator />
          <button
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return renderSidebar();
}
