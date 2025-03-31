import { createBrowserRouter, RouterProvider } from "react-router-dom"
<<<<<<< HEAD:frontend/src/router/Routes.tsx
import LandingPage from "../pages/landing/page"
import AuthRoutes from "./AuthRoutes"
import UserRoutes from "./UserRoutes"
=======
import LandingPage from "../pages/landing"
>>>>>>> landing:frontend/src/router/Route.tsx

const routes = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />
  },
  ...AuthRoutes,
  ...UserRoutes,
]);

export default function RouterContainer() {
  return <RouterProvider router={routes} />
}
