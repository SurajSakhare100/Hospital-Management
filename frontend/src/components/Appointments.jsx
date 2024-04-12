import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ id: '', date: '', doctor_id: '', patient_id: '' });
    console.log(appointments)
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/hospital/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const addAppointment = async () => {
    try {
      await axios.post('/api/hospital/appointments', newAppointment);
      fetchAppointments();
      setNewAppointment({ id: '', date: '', doctor_id: '', patient_id: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-black text-3xl'>Appointments</h1>
      {/* Render appointments list and add appointment form */}
    </div>
  );
}

export default Appointments;
