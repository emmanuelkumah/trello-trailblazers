import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "@/pages/user/dashboard/page";
import UserLayout from "@/layout/userLayout";
import AllGroups from "@/pages/user/all-groups/page";
import GroupDisplay from "@/pages/user/groups/[slug]/page";

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
      },
      {
        path: "all-groups",
        element: <AllGroups />
      },
      {
        path: "groups/:slug",
        element: <GroupDisplay />
      },
    ]
  }
]

export default UserRoutes;