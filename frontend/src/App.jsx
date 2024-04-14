import React from 'react'
import Home from './components/Home'
import {Outlet} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import UseAuth from './context/UseAuth'
function App() {
  return (
    <UseAuth className=''>
      <Dashboard/>
      <Navbar/>
      <Outlet/>
    </UseAuth>
  )
}

export default App
