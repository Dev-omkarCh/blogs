import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogExplorer from './pages/Blogs';
import Template from './pages/Template';
import CreateBlog from './pages/CreateBlog';
import BlogView from './pages/BlogPage';
import PrivateRoute from './components/PrivateRoutes';
import DashboardSidebar from './components/dashboard/SideBar';
import TestComponent from './components/TestComponent';

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
        element: <PrivateRoute />,
        children: [
          {
            path: "/blog/create",
            element: <CreateBlog />
          },
        ]
      },
      {
        path: "/blog/template",
        element: <Template />
      },
      {
        path: "/blog/:id",
        element: <BlogView />
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
  {
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            element:
              (
                <DashboardSidebar>
                  <Dashboard />
                </DashboardSidebar>
              ),
          },
        ]
      },
  {
    path: '/blogs',
    element: <BlogExplorer />
  },
  {
    path: '/test',
    element: <TestComponent />
  }

]);

export default router;