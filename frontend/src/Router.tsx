import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import Dashboard, { dashboardLoader } from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Shared UI like Navbars
    errorElement: <ErrorPage />, // Catch-all for crashes/404s
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        // This runs BEFORE the component renders!
        loader: dashboardLoader, 
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
]);

export default router;