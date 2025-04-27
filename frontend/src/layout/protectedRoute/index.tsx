import useAuthStore from "@/store/useAuthStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user || !user.fullName) {
    return <Navigate to="/auth" replace />;
  } else {
    return children
  }
}
