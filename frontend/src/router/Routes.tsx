import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import LandingPage from '../pages/landing';

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
