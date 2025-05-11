
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSelector } from "@/components/language/LanguageSelector";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-background">
      <header className="p-4 flex justify-end space-x-2">
        <LanguageSelector />
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-screen-xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:flex flex-col justify-center items-center">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">EduSync School Management</h1>
                <p className="text-xl text-muted-foreground">
                  A comprehensive solution for educational institutions
                </p>
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p>Efficient student and teacher management</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p>Comprehensive attendance tracking</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p>Streamlined exam management</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:flex md:justify-end">
              {children}
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} EduSync School Management System. All rights reserved with Pratham.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
