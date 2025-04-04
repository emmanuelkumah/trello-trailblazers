import AuthPage from "@/pages/auth/AuthPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthRoutes = [
  {
    path: "/auth",
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "register",
        element: <AuthPage />,
      },
      {
        path: "/auth/password-recovery",
        element: <ForgotPasswordPage />,
      },
    ],
  },
];

export default AuthRoutes;
