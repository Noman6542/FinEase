import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Layouts/Root.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Provider/AuthProvider.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import MyProfile from './Pages/MyProfile.jsx';






const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path:'/forgot-password',
        Component:ForgotPassword
      },
      {
        path:'/my-profile',
        Component:MyProfile
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
