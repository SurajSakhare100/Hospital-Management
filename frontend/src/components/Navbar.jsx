import React from 'react'
import { BsBell } from "react-icons/bs";
function Navbar() {
    return (
        <div className='w-full pl-72 bg-[#F8F9FA] h-18 flex items-center justify-between shadow-md shadow-black pr-8 py-2'>
            <input type="text" className='w-1/2 rounded-xl border py-1 shadow-md pl-4' placeholder='serch patients' />
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
