import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import Dashboard, { dashboardLoader } from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogExplorer from './pages/Blogs';
import Template from './pages/Template';
import CreateBlog from './pages/CreateBlog';
import BlogView from './pages/BlogPage';

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
      {
        path: "/blog/create",
        element: <CreateBlog />
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
    path: '/blogs',
    element: <BlogExplorer />
  }
]);

export default router;