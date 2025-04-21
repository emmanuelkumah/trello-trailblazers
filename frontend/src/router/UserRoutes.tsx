import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "@/pages/user/dashboard/page";
import UserLayout from "@/layout/userLayout";

const UserRoutes = [
  {
    path: "/user",
    element: (
      <Suspense>
        <UserLayout>
          <Outlet />
        </UserLayout>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ]
  }
]

export default UserRoutes;
