import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
function Home() {
  const [patients, setPatients] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [docterCount, setDocterCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  useEffect(() => {
    fetchPatientCount();
    fetchDocterCount();
    fetchAppointmentCount();
  }, []);
  console.log(patients)
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
  return (
    <div className='pl-72 py-6 w-full h-screen'>
      <div className='w-full flex gap-6'>
        <div className='shadow-lg border w-[260px] h-[160px] rounded-lg px-4 py-10'>
          <h1 className='text-black text-2xl'>Number of Patients: {patientCount}</h1>
        </div>
        <div className='shadow-lg border w-[260px] h-[160px] rounded-lg px-4 py-10'>
          <h1 className='text-black text-2xl'>Number of Docters: {docterCount}</h1>
        </div>
        <div className='shadow-lg border w-[260px] h-[160px] rounded-lg px-4 py-10'>
          <h1 className='text-black text-2xl'>Number of Appointment: {appointmentCount}</h1>
        </div>
      </div>
      <div className='w-full py-20 flex gap-10'>
       <div className='w-1/2 border rounded-lg py-4 px-4 flex flex-col items-center shadow-lg shadow-green-100'>
        <h1 className='text-3xl text-green-600 text-center pb-4'>Patients</h1>
       {patients.map((patient) => (
          <li key={patient.patient_id} className='text-black px-6 py-1 my-2 border rounded-xl w-[500px] list-none shadow-md'>

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
       <div className='w-1/2 border rounded-lg py-4 px-4 flex flex-col items-center shadow-lg shadow-green-100'>
        <h1 className='text-3xl text-green-600 text-center pb-4'>Patients</h1>
       {patients.map((patient) => (
          <li key={patient.patient_id} className='text-black px-6 py-1 my-2 border rounded-xl w-[500px] list-none shadow-md'>

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
        <div>

        </div>
      </div>
    </div>
  )
}

export default Home
