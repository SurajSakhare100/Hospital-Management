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
import { useapi } from '../context/auth';
function Home() {
  const [patients, setPatients] = useState([]);
  const [docters, setDocter] = useState([]);
  const [appointment, setappointment] = useState([]);
  const [medical, setmedical] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [docterCount, setDocterCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [medicalCount, setMedicalCount] = useState(0);
  const [doctorPatients, setDoctorPatients] = useState([]);
  const { status,auth } = useapi();
  useEffect(() => {
    fetchPatientCount();
    fetchDocterCount();
    fetchAppointmentCount();
    fetchMedicalCount();
    auth()
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
    fetchdocters();
    fetchappointment();
    fetchmedical();

  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/hospital/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  const fetchappointment = async () => {
    try {
      const response = await axios.get('/api/hospital/doctors');
      setappointment(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  const fetchmedical = async () => {
    try {
      const response = await axios.get('/api/hospital/medicalrecords');
      setmedical(response.data);
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

  const fetchdoctors_with_patients = async () => {
    try {
      const response = await axios.get('/api/hospital/doctors_with_patients');
      setDoctorPatients(response.data)
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }
  useEffect(() => {
    fetchdoctors_with_patients();
  }, []);

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
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]' />
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
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]' />
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
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]' />
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
              <IoStatsChartSharp className='text-4xl text-[#6AB7A4]' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full py-8  gap-10 flex'>
        <div className='w-1/2 flex flex-col gap-4'>
          <div className=' border bg-white rounded-lg py-4 px-4 flex flex-col items-center shadow-lg shadow-green-100'>
            <h1 className='text-3xl text-green-600 text-center pb-4'>Patients</h1>
            {patients.map((patient) => (
              <li key={patient.patient_id} className='text-black px-6 py-2 border-b w-[500px] list-none'>

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

        </div>
        <div className='w-1/2 h-fit border bg-white rounded-lg py-4 px-4 shadow-lg shadow-green-100'>
          <h1 className='text-3xl text-green-600 text-center pb-4'>Docters</h1>
          <div className='flex flex-col items-center'>
            {/* <div className='w-full flex items-center justify-self-start gap-4'>
            <p className='text-md font-semibold text-green-800'>Docter ID</p>
            <p className='text-md font-semibold text-green-400'>Docter</p>
          </div> */}
            {docters.map((doctor) => (
              <li key={doctor.doctor_id} className='text-black px-6 py-2 my-1 border-b w-[500px] list-none'>

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
        </div>
        <div>

        </div>

      </div>

      <div className='mr-10 bg-white rounded-lg border py-8 px-20 flex flex-col items-center shadow-lg shadow-green-100'>
        <h1 className='text-5xl text-green-600 text-center mb-8'>Appointment </h1>
        <table className='w-full h-fit border shadow-xl'>
          <thead className='w-full bg-[#41e68375] '>
            <tr className='w-full'>
              <th className='py-2 px-4 border border-black text-start w-1/8'>Sr. No.</th>
              <th className='py-2 px-4 border border-black text-start w-1/5'>Doctor Name</th>
              <th className='py-2 px-4 border border-black text-start w-1/6'>Patient Name</th>
              <th className='py-2 px-4 border border-black text-start w-1/4'>Appointment Date</th>
              <th className='py-2 px-4 border border-black text-start w-1/6'>Medical Problem</th>
              <th className='py-2 px-4 border border-black text-start w-1/8'>Status</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {doctorPatients.map((doctorPatient, index) => (
              <tr key={index} className='w-full'>
                <td className='py-2 px-4 w-1/8 border border-black'>{index + 1}</td>
                <td className='py-2 px-4 w-1/5 border border-black'>{doctorPatient.doctor_first_name} {doctorPatient.doctor_last_name}</td>
                <td className='py-2 px-4 w-1/6 border border-black'>{doctorPatient.patient_first_name} {doctorPatient.patient_last_name}</td>
                <td className='py-2 px-4 w-1/4 border border-black'>{doctorPatient.appointment_date}</td>
                <td className='py-2 px-4 w-1/8 border border-black'>{doctorPatient.status}</td>
                <td className='py-4 px-4 w-1/6 border border-black'>{doctorPatient.medical_problem}</td>
              </tr>
            ))}
          </tbody>
        </table>





      </div>
    </div>
  )
}

export default Home
