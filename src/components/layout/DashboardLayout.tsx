
import { ReactNode, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ChatSupport } from "@/components/chat/ChatSupport";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "admin" | "teacher" | "student";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  // Change default to false for all devices
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Close sidebar when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen} 
        role={role}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuButtonClick={() => setSidebarOpen(!sidebarOpen)} role={role} />
        
        <motion.main 
          ref={mainRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
      
      <ChatSupport />
    </div>
  );
};

export default DashboardLayout;
