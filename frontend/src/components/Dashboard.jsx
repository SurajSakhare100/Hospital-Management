import { HiMiniUsers } from "react-icons/hi2";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { RiUserHeartFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { RiMedicineBottleLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import {Link} from 'react-router-dom'
import { useapi } from "../context/auth";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const {logout}=useapi();
    const navigate=useNavigate()
    
    const handle=()=>{
        logout()
        navigate('/auth/signin')
    }

    return (
        <>
            <aside className="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl rounded-r-xl" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium ">
                        <li>
                            <Link to={''} className="flex items-center p-2 text-gray-400 font-[550] rounded-lg  hover:text-[#6AB7A4] hover:bg-[#cff7eda8] group">
                               <AiOutlineHome className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={'/dashboard/patients'} className="flex items-center p-2 text-gray-400  font-[550] rounded-lg  hover:text-[#6AB7A4] hover:bg-[#cff7eda8]  group">
                                <HiMiniUsers className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>
                                <span className="flex-1 ms-3 whitespace-nowrap">Patient</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={'/dashboard/medicalrecords'} className="flex items-center p-2 text-gray-400 font-[550] rounded-lg  hover:text-[#6AB7A4] hover:bg-[#cff7eda8]  group">
                           
                            <HiOutlineUsers className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>

                                <span className="flex-1 ms-3 whitespace-nowrap">Medical Records</span>
                            </Link>
                        </li>
                       
                        <li>
                            <Link to={'/dashboard/doctors'} className="flex items-center p-2 text-gray-400 font-[550] rounded-lg  hover:text-[#6AB7A4] hover:bg-[#cff7eda8]  group">     
                            <RiUserHeartFill className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>
                                <span className="flex-1 ms-3 whitespace-nowrap">Docter</span>
                            </Link>
                        </li>
                        
                        <li>
                            <Link to={'/dashboard/appointments'} className="flex items-center p-2 text-gray-400 font-[550] rounded-lg  hover:text-[#6AB7A4] hover:bg-[#cff7eda8]  group">
                            <SlCalender className="flex-shrink-0 w-5 h-5 font-semibold text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>
                                <span className="flex-1 ms-3 whitespace-nowrap">Appointments</span>
                            </Link>
                        </li>
                        <li>
                           <div onClick={()=>{handle()}} className="flex cursor-pointer items-center p-2 text-gray-400 font-[550] transition duration-75 rounded-lg hover:text-[#6AB7A4] hover:bg-[#cff7eda8]   group">
                           <MdLogout className="flex-shrink-0 w-5 h-5 font-semibold text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>
                                <span className="flex-1 ms-3 whitespace-nowrap">log Out</span>
                           </div>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <Link to={''} className="flex items-center p-2 text-gray-400 font-[550] transition duration-75 rounded-lg hover:text-[#6AB7A4] hover:bg-[#cff7eda8]   group">
                            <RiMedicineBottleLine className="flex-shrink-0 w-5 h-5 font-semibold text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>
                                <span className="ms-3">Medicine</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={''} className="flex items-center p-2 text-gray-400 font-[550] transition duration-75 rounded-lg hover:text-[#6AB7A4] hover:bg-[#cff7eda8]   group">
                            
                            <MdOutlinePayments className="flex-shrink-0 w-5 h-5 font-semibold text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>

                                <span className="ms-3">Payments</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={''} className="flex items-center p-2 text-gray-400 font-[550] transition duration-75 rounded-lg hover:text-[#6AB7A4] hover:bg-[#cff7eda8]   group">
                            <FiSettings className="flex-shrink-0 w-5 h-5 font-semibold text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>

                                <span className="ms-3">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={''} className="flex items-center p-2 text-gray-400 font-[550] transition duration-75 rounded-lg hover:text-[#6AB7A4] hover:bg-[#cff7eda8]   group">
                            <BiHelpCircle className="flex-shrink-0 w-5 h-5 font-semibold text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]"/>

                                <span className="ms-3">Help</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )

}




