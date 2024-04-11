import React from 'react'
import Student from './components/Student'
import Attendance from './components/Attendance'
import Home from './components/Home'
import {Outlet} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import PatientBox from './components/PatientBox'
function App() {
  return (
    <div className='w-full h-screen bg-[#F9F9FA] text-white flex '>
      {/* <Dashboard/> */}
      {/* <PatientBox/> */}
      <Outlet/>
    </div>
  )
}

export default App
