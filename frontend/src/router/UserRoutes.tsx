import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "@/pages/user/dashboard/page";
import UserLayout from "@/layout/userLayout";
import EditProfileMobile from "@/pages/user/profile/mobile/edit";
import ChangePasswordMobile from "@/pages/user/profile/mobile/change-password";
import useDeviceSize from "@/hooks/useDeviceSize";
import DesktopProfile from "@/pages/user/profile/desktop/profile";
import MobileProfile from "@/pages/user/profile/mobile/profile";
import ProfileLayout from "@/layout/profileLayout";
import AllGroups from "@/pages/user/all-groups/page";
import GroupDisplay from "@/pages/user/groups/[slug]/page";

const UserRoutes = [
  {
    path: "/user",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserLayout>
          <Outlet />
        </UserLayout>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "all-groups",
        element: <AllGroups />
      },
      {
        path: "groups/:slug",
        element: <GroupDisplay />
      },
      {
        path: "profile",
        element: <ProfileLayout />, // Just renders the outlet
        children: [
          {
            index: true,
            element: <ProfileWithDevice />, // Conditionally renders the profile layout
          },
          {
            path: "edit",
            element: <EditProfileMobile />,
          },
          {
            path: "change-password",
            element: <ChangePasswordMobile />,
          },
        ],
      },
    ],
  },
];

// Component for conditional rendering based on screen size
function ProfileWithDevice() {
  const { isMobile } = useDeviceSize();
  return isMobile ? <MobileProfile /> : <DesktopProfile />;
}

export default UserRoutes;
