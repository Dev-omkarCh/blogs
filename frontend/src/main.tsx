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
import AppInitializer from './components/AppInitializer.tsx';

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
  }
  ,
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>

    <Provider store={store}>
      <AppInitializer>
        <RouterProvider router={routes} />
      </AppInitializer>
    </Provider>
    <Toaster
      position='bottom-right'
    />
  </>
  // </StrictMode>,
)
