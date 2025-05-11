
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const { isAuthenticated, user } = useAuth();

  // If already authenticated, redirect to the appropriate dashboard
  if (isAuthenticated && user) {
    const dashboardRoutes = {
      admin: "/admin",
      teacher: "/teacher",
      student: "/student"
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-lg shadow-md">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default Login;
