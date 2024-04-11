import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Student from './components/Student.jsx'
import Attendance from './components/Attendance.jsx'
import {createBrowserRouter,RouterProvider,Router} from 'react-router-dom'
import Home from './components/Home.jsx'
const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Student/>,
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
