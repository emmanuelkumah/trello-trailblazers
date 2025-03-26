import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingPage from "../pages/landing/page"

const routes = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />
  }
])

export default function RouterContainer() {
  return <RouterProvider router={routes} />
}