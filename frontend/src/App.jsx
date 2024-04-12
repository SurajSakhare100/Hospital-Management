import React from 'react'
import Attendance from './components/Attendance'
import Home from './components/Home'
import {Outlet} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import PatientBox from './components/PatientBox'
import Navbar from './components/Navbar'
function App() {
  return (
    <div className=''>
      <Dashboard/>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
