import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { HiMiniUsers } from "react-icons/hi2";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { RiBarChartGroupedFill, RiMedicineBottleFill, RiUserHeartFill } from "react-icons/ri";
import { SlCalender } from 'react-icons/sl';
import { RiBarChartGroupedLine } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";
function Home() {
  const [patients, setPatients] = useState([]);
  const [docters, setDocter] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [docterCount, setDocterCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [medicalCount, setMedicalCount] = useState(0);
  useEffect(() => {
    fetchPatientCount();
    fetchDocterCount();
    fetchAppointmentCount();
    fetchMedicalCount();
    fetchdocters();
  }, []);
  const fetchAppointmentCount = async () => {
    try {
      const response = await axios.get('/api/hospital/appointment/count');
      setAppointmentCount(response.data.count);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    }
  };
  const fetchPatientCount = async () => {
    try {
      const response = await axios.get('/api/hospital/patient/count');
      setPatientCount(response.data.count);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    }
  };
  const fetchMedicalCount = async () => {
    try {
      const response = await axios.get('/api/hospital/medicalrecord/count');
      setMedicalCount(response.data.count);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    }
  };

  const fetchDocterCount = async () => {
    try {
      const response = await axios.get('/api/hospital/doctor/count');
      setDocterCount(response.data.count);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    }
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/hospital/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  const fetchdocters = async () => {
    try {
      const response = await axios.get('/api/hospital/doctors');
      setDocter(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  return (
    <div className='pl-72 py-6 w-full h-full bg-[#F8F9FA]'>
      <div className='w-full flex gap-6'>
        <div className='shadow-lg border w-[282px] h-[160px] bg-white rounded-lg px-4 py-6 flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 rounded-md bg-[#cff7eda8] flex items-center justify-center'>
              <HiMiniUsers className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]" />
            </div>
            <p className='text-lg'>Patients</p>
          </div>
          <div className='w-full h-1/2 bg-[#d2d2d231] rounded-md py-2 px-2 flex items-center justify-between'>
            <h1 className='text-black text-3xl font-bold'>{patientCount}+</h1>
            <div className='flex relative'>
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]'/>
            </div>
          </div>
        </div>
        <div className='shadow-lg border w-[282px] bg-white h-[160px] rounded-lg px-4 py-6 flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 rounded-md bg-[#cff7eda8] flex items-center justify-center'>
              <RiUserHeartFill className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]" />
            </div>
            <p className='text-lg'>Docters</p>
          </div>
          <div className='w-full h-1/2 bg-[#d2d2d231] rounded-md py-2 px-2 flex justify-between items-center'>
            <h1 className='text-black text-3xl font-bold'>{docterCount}+</h1>
            <div className='flex relative'>
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]'/>
            </div>
          </div>
        </div>
        <div className='shadow-lg border w-[282px] h-[160px] bg-white rounded-lg px-4 py-6 flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 rounded-md bg-[#cff7eda8] flex items-center justify-center'>
              <SlCalender className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]" />
            </div>
            <p className='text-lg'>Appointment</p>
          </div>
          <div className='w-full h-1/2 bg-[#d2d2d231] rounded-md py-2 px-2 flex items-center justify-between'>
            <h1 className='text-black text-3xl font-bold'>{appointmentCount}+</h1>
            <div className='flex relative'>
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]'/>
            </div>
          </div>
        </div>

        <div className='shadow-lg border w-[282px] bg-white h-[160px] rounded-lg px-4 py-6 flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 rounded-md bg-[#cff7eda8] flex items-center justify-center'>
              <RiMedicineBottleFill className="flex-shrink-0 w-5 h-5 text-[#6AB7A4] transition duration-75  group-hover:text-[#6AB7A4]" />
            </div>
            <p className='text-lg'>Medial Records</p>
          </div>
          <div className='w-full h-1/2 bg-[#d2d2d231] rounded-md py-2 px-2 flex items-center justify-between'>
            <h1 className='text-black text-3xl font-bold'>{medicalCount}+</h1>
            <div className='flex relative'>
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]'/>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full py-8 flex gap-10'>

        <div className='w-1/2 border bg-white rounded-lg py-4 px-4 flex flex-col items-center shadow-lg shadow-green-100'>
          <h1 className='text-3xl text-green-600 text-center pb-4'>Patients</h1>
          {patients.map((patient) => (
            <li key={patient.patient_id} className='text-black px-6 py-2 my-2 border-b w-[500px] list-none'>

              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <div>
                    <img src="https://lh3.googleusercontent.com/proxy/Rn5I76quPNgFCQpfc6kgSaX3_x5lwX_BU7HHEpvLZPZt7JcuXdSMTYan7RfqFAmuEXOAk-eejxbDp2BiDaPTc6CY54dJYjE" width={35} height={35} className='rounded-full object-contain' alt="" />
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-md font-semibold text-green-800'>{patient.first_name} {patient.last_name}</p>
                    <p className='text-[12px] text-green-400'>{patient.address}</p>
                  </div>
                </div>
                <p className='cursor-pointer font-semibold'>{patient.patient_id}</p>
              </div>
            </li>

          ))}
        </div>
        <div className='w-1/2 border bg-white rounded-lg py-4 px-4 flex flex-col items-center shadow-lg shadow-green-100'>
          <h1 className='text-3xl text-green-600 text-center pb-4'>Docters</h1>
          {/* <div className='flex items-center justify-self-start gap-4'>
                <p className='text-md font-semibold text-green-800'>Docter ID</p>
                <p className='text-md font-semibold text-green-400'>Docter</p>
          </div> */}

          {docters.map((doctor) => (
            <li key={doctor.doctor_id} className='text-black px-6 py-2 my-2 border-b w-[500px] list-none'>

              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <div>
                    <img src="https://lh3.googleusercontent.com/proxy/Rn5I76quPNgFCQpfc6kgSaX3_x5lwX_BU7HHEpvLZPZt7JcuXdSMTYan7RfqFAmuEXOAk-eejxbDp2BiDaPTc6CY54dJYjE" width={35} height={35} className='rounded-full object-contain' alt="" />
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-md font-semibold text-green-800'>{doctor.first_name} {doctor.last_name}</p>
                    <p className='text-[12px] text-green-400'>{doctor.specialization}</p>
                  </div>
                </div>
                <p className='cursor-pointer font-semibold'>{doctor.doctor_id}</p>
              </div>
            </li>

          ))}
        </div>
        <div>

        </div>
      </div>
    </div >
  )
}

export default Home
