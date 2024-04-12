import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ doctor_id: '', first_name: '', last_name: '', specialization: '', contact_number: '' });
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [updatedDoctor, setUpdatedDoctor] = useState({ doctor_id: '', first_name: '', last_name: '', specialization: '', contact_number: '' });
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/hospital/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const addDoctor = async () => {
    try {
      await axios.post('/api/hospital/doctors', newDoctor);
      fetchDoctors();
      setNewDoctor({ doctor_id: '', first_name: '', last_name: '', specialization: '', contact_number: '' });
    } catch (error) {
      console.error('Error adding Doctor:', error);
    }
  };

  const updateDoctor = async (id) => {
    try {
      await axios.put(`/api/hospital/doctors/${id}`, updatedDoctor);
      fetchDoctors();
      setEditingDoctor(null);
      setUpdatedDoctor({ doctor_id: '', first_name: '', last_name: '', specialization: '', contact_number: '' });
    } catch (error) {
      console.error('Error updating Doctor:', error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`/api/hospital/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting Doctor:', error);
    }
  };
  

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor.doctor_id);
    setUpdatedDoctor({ doctor_id: doctor.doctor_id, first_name: doctor.first_name, last_name: doctor.last_name, specialization: doctor.specialization, contact_number: doctor.contact_number });
  };

  return (
    <div className='w-full pl-72 bg-[#F8F9FA]'>
      <h1 className='text-black text-3xl'>Doctors</h1>
      <ul className='flex gap-4 flex-wrap'>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id} className='text-black px-6 py-12 border rounded-xl w-[400px]'>
            {editingDoctor === doctor.doctor_id ? (
              <div className='flex flex-col gap-2 w-full'>
                <input className='border' type="text" value={updatedDoctor.first_name} onChange={e => setUpdatedDoctor({ ...updatedDoctor, first_name: e.target.value })} />
                <input className='border' type="text" value={updatedDoctor.last_name} onChange={e => setUpdatedDoctor({ ...updatedDoctor, last_name: e.target.value })} />
                <input className='border' type="text" value={updatedDoctor.specialization} onChange={e => setUpdatedDoctor({ ...updatedDoctor, specialization: e.target.value })} />
                <input className='border' type="text" value={updatedDoctor.contact_number} onChange={e => setUpdatedDoctor({ ...updatedDoctor, contact_number: e.target.value })} />
                <div className='flex '>
                  <button className='bg-green-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => updateDoctor(doctor.doctor_id)}>Save</button>
                  <button className='bg-red-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => setEditingDoctor(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-2 '>
                <p><span className='font-bold text-md'>Doctor ID:   </span>{doctor.doctor_id}</p>
                <p><span className='font-bold text-md'>First Name: </span>{doctor.first_name}</p>
                <p><span className='font-bold text-md'>Last Name:   </span>{doctor.last_name}</p>
                <p><span className='font-bold text-md'>Specialization:  </span>{doctor.specialization}</p>
                <p><span className='font-bold text-md'>Contact Number:  </span>{doctor.contact_number}</p>
                <div className='flex justify-aroung'>
                  <button className='bg-red-500 w-1/2 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => deleteDoctor(doctor.doctor_id)}>Delete</button>
                  <button className='bg-green-500 w-1/2 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => handleEdit(doctor)}>Edit</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div>
        <h2 className='text-black text-3xl'>Add New Doctor</h2>
        <div className='flex flex-col gap-2 w-1/2 text-black'>
          <input className='border' type="text" value={newDoctor.first_name} onChange={e => setNewDoctor({ ...newDoctor, first_name: e.target.value })} placeholder="First Name" />
          <input className='border' type="text" value={newDoctor.last_name} onChange={e => setNewDoctor({ ...newDoctor, last_name: e.target.value })} placeholder="Last Name" />
          <input className='border' type="text" value={newDoctor.specialization} onChange={e => setNewDoctor({ ...newDoctor, specialization: e.target.value })} placeholder="Specialization" />
          <input className='border' type="text" value={newDoctor.contact_number} onChange={e => setNewDoctor({ ...newDoctor, contact_number: e.target.value })} placeholder="Contact Number" />
        </div>
        <button className='bg-red-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={()=>addDoctor()}>Add Doctor</button>
      </div>
    </div>
  );
}

export default Doctors;
