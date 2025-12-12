import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleBlogPage from './Page/BlogPage.tsx';
import SignUpForm from './Page/Signup.tsx';
import Dashboard from './Page/Dashboard.tsx';
import { store } from './app/store'
import { Provider } from 'react-redux'
import Login from './Page/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { setupInterceptors } from './lib/utils.ts';

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
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  
])

setupInterceptors();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>

    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
    <Toaster
      position='bottom-right'
    />
  </>
  // </StrictMode>,
)
