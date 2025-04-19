import type React from "react";
import { Navigate } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import useAuthStore from "@/store/useAuthStore";
import ForgotPasswordFlow from "@/components/auth/ForgotPassword";

const ForgotPasswordPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout
      title="Oops! You forgot it!,"
      subtitle="Getting your password should be easy. Just follow these steps"
    >
      <ForgotPasswordFlow />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
