
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (email === "admin@school.edu" && password === "password") {
        setUser({
          id: "admin-1",
          name: "Admin User",
          email: "admin@school.edu",
          role: "admin"
        });
        navigate("/admin");
        toast.success("Logged in as Administrator");
      } else if (email === "teacher@school.edu" && password === "password") {
        setUser({
          id: "teacher-1",
          name: "Teacher User",
          email: "teacher@school.edu",
          role: "teacher"
        });
        navigate("/teacher");
        toast.success("Logged in as Teacher");
      } else if (email === "student@school.edu" && password === "password") {
        setUser({
          id: "student-1",
          name: "Student User",
          email: "student@school.edu",
          role: "student"
        });
        navigate("/student");
        toast.success("Logged in as Student");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
    toast.info("You have been logged out");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
