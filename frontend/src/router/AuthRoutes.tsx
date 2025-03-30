import Login from "@/pages/auth/login/page";
import Register from "@/pages/auth/register/page";
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
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ]
  },
];

export default AuthRoutes;