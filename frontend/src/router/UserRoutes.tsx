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
  const { isDesktop } = useDeviceSize();
  return isDesktop ? <DesktopProfile /> : <MobileProfile />;
}

export default UserRoutes;
