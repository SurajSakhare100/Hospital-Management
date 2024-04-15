import React from 'react'
import { BsBell } from "react-icons/bs";
import { useapi } from '../context/auth';
function Navbar() {
    const { login, status, data,email ,username} = useapi()
    console.log(email)
    const handle=()=>{
        console.log('object')
    }
    return (
        <div className='w-full pl-72 bg-[#F8F9FA] h-18 flex items-center justify-between shadow-md shadow-black pr-8 py-2'>
           <div className='w-full flex gap-4'>
            <form action="/patient" onSubmit={handle} className='flex gap-4 w-full'>
            <input type="text" className='w-1/2 rounded-xl border py-1 shadow-md pl-4' placeholder='Search patients' />
            <button className='bg-red-500 w-[100] rounded-xl px-6 py-1  text-white font-semibold shadow-lg'>Search</button>
            </form>
           </div>
           <div className='w-1/2 flex'>
                <p>Welcome ,{username}</p>
                </div>
            <div className='flex items-center gap-4'>
               
            <div className='w-10 h-10 rounded-full flex items-center justify-center border shadow-lg'>
                <BsBell className=''/>
            </div>
            <div className='shadow-xl w-9 h-9 rounded-full'>
                <img src="https://lh3.googleusercontent.com/proxy/Rn5I76quPNgFCQpfc6kgSaX3_x5lwX_BU7HHEpvLZPZt7JcuXdSMTYan7RfqFAmuEXOAk-eejxbDp2BiDaPTc6CY54dJYjE" className='rounded-full object-contain shadow-md' alt="" />
            </div>
            </div>
        </div>
    )
}

export default Navbar
