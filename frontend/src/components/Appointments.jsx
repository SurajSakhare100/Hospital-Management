import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ appointment_id: '', appointment_date: '', doctor_id: '', patient_id: '', status: '' });
  const [updatedAppointment, setupdatedAppointment] = useState({ appointment_id: '', appointment_date: '', doctor_id: '', patient_id: '', status: '' });
  const [editingAppointment, setEditingAppointment] = useState(null);
  console.log(updatedAppointment)
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
  const updateAppointment = async (id) => {
    try {
      await axios.put(`/api/hospital/appointments/${id}`, updatedAppointment);
      fetchAppointments();
      setEditingAppointment(null);
      setupdatedAppointment({ appointment_id: '', appointment_date: '', doctor_id: '', patient_id: '', status: '' });
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const addAppointment = async () => {
    try {
      await axios.post('/api/hospital/appointments', newAppointment);
      fetchAppointments();
      setNewAppointment({ id: '', date: '', doctor_id: '', patient_id: '', status: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/hospital/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting Appointment:', error);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment.appointment_id);
    setupdatedAppointment(
      { appointment_id: appointment.appointment_id, appointment_date: appointment.appointment_date, doctor_id: appointment.doctor_id, patient_id: appointment.patient_id, status: appointment.status })
  };

  return (
    <div className='w-full pl-72 pr-4 pt-2 bg-[#F8F9FA]'>
      <div className='w-full py-4 bg-white rounded-lg mb-4 shadow-lg'>
        <h2 className='text-black text-2xl text-center mb-3 font-semibold'>Add New Appointment</h2>
        <div className='w-full flex justify-center'>
          <div className='flex flex-col gap-2 w-1/2 text-black mb-4'>
            <input className='border px-2 py-1 rounded-md shadow-sm' type="date" value={newAppointment.appointment_date} onChange={e => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })} placeholder="Appoin" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newAppointment.patient_id} onChange={e => setNewAppointment({ ...newAppointment, patient_id: e.target.value })} placeholder="patient_id" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newAppointment.doctor_id} onChange={e => setNewAppointment({ ...newAppointment, doctor_id: e.target.value })} placeholder="Last Name" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newAppointment.status} onChange={e => setNewAppointment({ ...newAppointment, status: e.target.value })} placeholder="status" />
            <button className='bg-red-500 rounded-lg px-4 py-1  text-white font-semibold shadow-lg' onClick={() => addDoctor()}>Add Appointment</button>
          </div>
        </div>
      </div>
      <h1 className='text-black text-4xl text-center mb-4 font-semibold'>Appointments</h1>
      <div className='flex flex-wrap gap-4 pb-20 justify-center'>
        {appointments.map((appointment) => (
          <li key={appointment.appointment_id} className='text-black px-6 py-8 border rounded-xl w-[400px] list-none bg-white shadow-lg'>
            {editingAppointment !== appointment.appointment_id ? (
              <div className='flex flex-col gap-2 '>
                <div className='flex flex-col gap-2 mb-2'>

                  <p><span className='font-bold text-md'>Appointment ID:   </span>{appointment.appointment_id}</p>
                  <p><span className='font-bold text-md'>Appointment Date: </span>{appointment.appointment_date}</p>
                  <p><span className='font-bold text-md'>Patient Id:   </span>{appointment.patient_id}</p>
                  <p><span className='font-bold text-md'>Doctor Id:  </span>{appointment.doctor_id}</p>
                  <p><span className='font-bold text-md'>Status Number:  </span>{appointment.status}</p>
                </div>
                <div className='w-full flex justify-between gap-4'>
                  <button className='bg-red-500 w-1/2 rounded-lg px-4 py-1  text-white font-semibold shadow-xl' onClick={() => deleteAppointment(appointment.appointment_id)}>Delete</button>
                  <button className='bg-green-500 w-1/2 rounded-lg px-4 py-1  text-white font-semibold shadow-xl' onClick={() => handleEdit(appointment)}>Edit</button>
                </div>
              </div>
            ) :
              <div className='flex flex-col gap-2 w-full'>
                <input className='border' type="date" value={updatedAppointment.appointment_date} onChange={e => setupdatedAppointment({ ...updatedAppointment, appointment_date: e.target.value })} />
                <input className='border' type="text" value={updatedAppointment.patient_id} onChange={e => setupdatedAppointment({ ...updatedAppointment, patient_id: e.target.value })} />
                <input className='border' type="text" value={updatedAppointment.doctor_id} onChange={e => setupdatedAppointment({ ...updatedAppointment, doctor_id: e.target.value })} />
                <input className='border' type="text" value={updatedAppointment.status} onChange={e => setupdatedAppointment({ ...updatedAppointment, status: e.target.value })} />
                <div className='flex '>
                  <button className='bg-green-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => updateAppointment(appointment.appointment_id)}>Save</button>
                  <button className='bg-red-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => setEditingAppointment(null)}>Cancel</button>
                </div>
              </div>}

          </li>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
