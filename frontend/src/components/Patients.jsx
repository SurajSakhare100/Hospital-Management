import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ patient_id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: '', address: '' });
  const [editingPatient, setEditingPatient] = useState(null);
  const [updatedPatient, setUpdatedPatient] = useState({ patient_id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: '', address: '' });
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

  const addPatient = async () => {
    try {
      await axios.post('/api/hospital/patients', newPatient);
      fetchPatients();
      setNewPatient({ patient_id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: '', address: '' });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const updatePatient = async (id) => {
    try {
      console.log(updatedPatient)
      await axios.put(`/api/hospital/patients/${id}`, updatedPatient);
      fetchPatients();
      setEditingPatient(null);
      setUpdatedPatient({ patient_id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: '', address: '' });
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`/api/hospital/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient.patient_id);
    setUpdatedPatient({ ...patient });
  };

  return (
    <div className='w-full pl-72 bg-[#F8F9FA]'>
      <h1 className='text-black text-3xl'>Patients</h1>
      <ul className='flex gap-4 flex-wrap'>
        {patients.map((patient) => (
          <li key={patient.patient_id} className='text-black px-6 py-12 border rounded-xl w-[400px]'>
            {editingPatient === patient.patient_id ? (
              <div className='flex flex-col gap-2 w-full'>
                <input className='border' type="text" value={updatedPatient.first_name} onChange={e => setUpdatedPatient({ ...updatedPatient, first_name: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.last_name} onChange={e => setUpdatedPatient({ ...updatedPatient, last_name: e.target.value })} />
                <input className='border' type="date" value={updatedPatient.date_of_birth} onChange={e => setUpdatedPatient({ ...updatedPatient, date_of_birth: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.gender} onChange={e => setUpdatedPatient({ ...updatedPatient, gender: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.contact_number} onChange={e => setUpdatedPatient({ ...updatedPatient, contact_number: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.address} onChange={e => setUpdatedPatient({ ...updatedPatient, address: e.target.value })} />
                <div className='flex'>
                  <button className='bg-green-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => updatePatient(patient.patient_id)}>Save</button>
                  <button className='bg-red-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => setEditingPatient(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                <p><span className='font-bold text-md'>Patient ID: </span>{patient.patient_id}</p>
                <p><span className='font-bold text-md'>First Name: </span>{patient.first_name}</p>
                <p><span className='font-bold text-md'>Last Name: </span>{patient.last_name}</p>
                <p><span className='font-bold text-md'>Date of Birth: </span>{patient.date_of_birth}</p>
                <p><span className='font-bold text-md'>Gender: </span>{patient.gender}</p>
                <p><span className='font-bold text-md'>Contact Number: </span>{patient.contact_number}</p>
                <p><span className='font-bold text-md'>Address: </span>{patient.address}</p>
                <div className='flex justify-around'>
                  <button className='bg-red-500 w-1/2 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => deletePatient(patient.patient_id)}>Delete</button>
                  <button className='bg-green-500 w-1/2 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => handleEdit(patient)}>Edit</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div>
        <h2 className='text-black text-3xl'>Add New Patient</h2>
        <div className='flex flex-col gap-2 w-1/2 text-black'>
          <input className='border' type="number" value={newPatient.patient_id} onChange={e => setNewPatient({ ...newPatient, patient_id: e.target.value })} />
          <input className='border' type="text" value={newPatient.first_name} onChange={e => setNewPatient({ ...newPatient, first_name: e.target.value })} />
          <input className='border' type="text" value={newPatient.last_name} onChange={e => setNewPatient({ ...newPatient, last_name: e.target.value })} />
          <input className='border' type="date" value={newPatient.date_of_birth} onChange={e => setNewPatient({ ...newPatient, date_of_birth: e.target.value })} />
          <input className='border' type="text" value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })} />
          <input className='border' type="text" value={newPatient.contact_number} onChange={e => setNewPatient({ ...newPatient, contact_number: e.target.value })} />
          <input className='border' type="text" value={newPatient.address} onChange={e => setNewPatient({ ...newPatient, address: e.target.value })} />
        </div>
        <button className='bg-red-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={addPatient}>Add Patient</button>
      </div>
    </div>
  );
}

export default Patients;
