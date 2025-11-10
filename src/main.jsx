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
import PrivateRoute from './Private/PrivateRout.jsx';
import AddTransactionPage from './Component/AddTranjection.jsx';
import MyTransactions from './Component/MyTransactions.jsx';
import Details from './Pages/Details.jsx';
import UpdateTransaction from './Pages/UpdateTransaction.jsx';






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
      },
      {
        path:'/add-transaction',
        element: (
          <PrivateRoute>
            <AddTransactionPage></AddTransactionPage>
          </PrivateRoute>
        ),
      },
      {
        path:'/my-transaction',
        element: (
          <PrivateRoute>
            <MyTransactions></MyTransactions>
          </PrivateRoute>
        )
      },
      {
        path:'/details/:id',
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        )
      },
      {
        path:'/transaction/:id',
        element:(
          <PrivateRoute>
            <UpdateTransaction></UpdateTransaction>
          </PrivateRoute>
        ),
       
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
