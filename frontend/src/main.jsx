import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/Home.jsx'
import Patients from './components/Patients.jsx'
import Doctors from './components/Docters.jsx'
import MedicalRecords from './components/MedicalRecord.jsx'
import Appointments from './components/Appointments.jsx'
import Dashboard from './components/Dashboard.jsx'
import SigninForm from './components/SigninForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import Search from './components/Search.jsx'
const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/dashboard/patients',
        element: <Patients/>,
      },
      {
        path: '/dashboard/doctors',
        element: <Doctors/>,
      },
      {
        path: '/dashboard/medicalrecords',
        element: <MedicalRecords/>,
      },
      {
        path: '/dashboard/appointments',
        element: <Appointments/>,
      },
      {
        path:'/auth/signin',
        element:<SigninForm/>,
      },
      {
        path:'/auth/signup',
        element:<SignupForm/>,
      },
      {
        path:'/patient',
        element:<Search/>,
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
