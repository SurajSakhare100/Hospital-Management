import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Attendance from './components/Attendance.jsx'
import {createBrowserRouter,RouterProvider,Router} from 'react-router-dom'
import Home from './components/Home.jsx'
import Patients from './components/Patients.jsx'
import Doctors from './components/Docters.jsx'
import MedicalRecords from './components/MedicalRecord.jsx'
import Appointments from './components/Appointments.jsx'
import Dashboard from './components/Dashboard.jsx'
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
        path: '/attendance',
        element: <Attendance/>,
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
