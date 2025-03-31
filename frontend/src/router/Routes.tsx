import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingPage from "../pages/landing/page"
import AuthRoutes from "./AuthRoutes"
import UserRoutes from "./UserRoutes"

const routes = createBrowserRouter([
  {
    path: '',
    element: <LandingPage />,
  },
  ...AuthRoutes,
  ...UserRoutes,
]);

export default function RouterContainer() {
  return <RouterProvider router={routes} />;
}
