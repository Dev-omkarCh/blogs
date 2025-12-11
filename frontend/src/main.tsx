import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleBlogPage from './Page/BlogPage.tsx';
import SignUpForm from './Page/Signup.tsx';
import Dashboard from './Page/Dashboard.tsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "*",
    element: <h1 className='text-black text-center mt-20 text-4xl w-screen'>404 - Page Not Found</h1>
  },
  {
    path: "/blog/:id",
    element: <SingleBlogPage />
  },
  {
    path: "/signup",
    element: <SignUpForm />
  }
  ,
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <RouterProvider router={routes} />
    <Toaster 
      position='bottom-right' 
    />
  </>
  // </StrictMode>,
)
