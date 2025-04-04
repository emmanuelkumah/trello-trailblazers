import type React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/components/auth/AuthLayout";
import useAuthStore from "@/store/useAuthStore";

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AuthLayout
      title={activeTab === "login" ? "Hey Franklin," : "Divvy..."}
      subtitle={
        activeTab === "login"
          ? "Welcome back. Your next expense sharing is easier"
          : "You've never shared expenses this easy!"
      }
    >
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full mx-auto max-h-full p-6 overflow-y-auto"
      >
        <TabsList className="grid grid-cols-2 mb-8 mx-auto bg-gray-200 rounded-full gap-1 dark:bg-[#2D2D2D]">
          <TabsTrigger
            value="signup"
            className="cursor-pointer px-6 rounded-full text-black transition-all duration-300
               bg-gray-300 dark:bg-[#2D2D2D] dark:text-white data-[state=active]:shadow-md"
          >
            Sign Up
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="cursor-pointer px-6 rounded-full text-black transition-all duration-300
               bg-gray-300 dark:bg-[#2D2D2D] dark:text-white data-[state=active]:shadow-md"
          >
            Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <RegisterForm />
        </TabsContent>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default AuthPage;
