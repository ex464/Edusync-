import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/language/LanguageProvider";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentManagement from "./pages/StudentManagement";
import TeacherManagement from "./pages/TeacherManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import ExamManagement from "./pages/ExamManagement";
import FeeManagement from "./pages/FeeManagement";
import NotificationManagement from "./pages/NotificationManagement";
import TimetableManagement from "./pages/TimetableManagement";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import FeedbackSystem from "./pages/FeedbackSystem";
import CalendarPage from "./pages/CalendarPage";
import ActivitiesManagement from "./pages/ActivitiesManagement";
import StudyTopicsPage from "./pages/StudyTopicsPage";
import StudyResourcesPage from "./pages/StudyResourcesPage";
import StudentTimetablePage from "./pages/StudentTimetablePage";
import StudentExamDetails from "./pages/StudentExamDetails";
import NotFound from "./pages/NotFound";
import ClassPromotionManagement from "./pages/ClassPromotionManagement";
import FinanceSummary from "./pages/FinanceSummary";
import AdmissionManagement from "./pages/AdmissionManagement";
import StudentFees from "./pages/StudentFees";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    
                    {/* Dashboard Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/students" element={<StudentManagement />} />
                    <Route path="/admin/teachers" element={<TeacherManagement />} />
                    <Route path="/admin/attendance" element={<AttendanceManagement />} />
                    <Route path="/admin/exams" element={<ExamManagement />} />
                    <Route path="/admin/fees" element={<FeeManagement />} />
                    <Route path="/admin/timetable" element={<TimetableManagement role="admin" />} />
                    <Route path="/admin/reports" element={<ReportsAnalytics />} />
                    <Route path="/admin/notifications" element={<NotificationManagement role="admin" />} />
                    <Route path="/admin/feedback" element={<FeedbackSystem />} />
                    <Route path="/admin/calendar" element={<CalendarPage role="admin" />} />
                    <Route path="/admin/activities" element={<ActivitiesManagement role="admin" />} />
                    <Route path="/admin/topics" element={<StudyTopicsPage role="admin" />} />
                    <Route path="/admin/resources" element={<StudyResourcesPage role="admin" />} />
                    <Route path="/admin/finance" element={<FinanceSummary />} />
                    <Route path="/admin/admissions" element={<AdmissionManagement />} />
                    <Route path="/admin/profile" element={<ProfilePage role="admin" />} />
                    
                    <Route path="/teacher" element={<TeacherDashboard />} />
                    <Route path="/teacher/attendance" element={<AttendanceManagement />} />
                    <Route path="/teacher/exams" element={<ExamManagement />} />
                    <Route path="/teacher/timetable" element={<TimetableManagement role="teacher" />} />
                    <Route path="/teacher/notifications" element={<NotificationManagement role="teacher" />} />
                    <Route path="/teacher/feedback" element={<FeedbackSystem />} />
                    <Route path="/teacher/calendar" element={<CalendarPage role="teacher" />} />
                    <Route path="/teacher/activities" element={<ActivitiesManagement role="teacher" />} />
                    <Route path="/teacher/topics" element={<StudyTopicsPage role="teacher" />} />
                    <Route path="/teacher/resources" element={<StudyResourcesPage role="teacher" />} />
                    <Route path="/teacher/profile" element={<ProfilePage role="teacher" />} />
                    
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/student/notifications" element={<NotificationManagement role="student" />} />
                    <Route path="/student/feedback" element={<FeedbackSystem />} />
                    <Route path="/student/calendar" element={<CalendarPage role="student" />} />
                    <Route path="/student/activities" element={<ActivitiesManagement role="student" />} />
                    <Route path="/student/topics" element={<StudyTopicsPage role="student" />} />
                    <Route path="/student/resources" element={<StudyResourcesPage role="student" />} />
                    <Route path="/student/timetable" element={<StudentTimetablePage />} />
                    <Route path="/student/exams" element={<StudentExamDetails />} />
                    <Route path="/student/fees" element={<StudentFees />} />
                    <Route path="/student/profile" element={<ProfilePage role="student" />} />
                    
                    <Route path="/admin/class-promotion" element={<ClassPromotionManagement />} />
                    
                    {/* Redirect root to login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
