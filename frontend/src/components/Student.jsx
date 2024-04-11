import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from 'autoprefixer';

function Patient() {
  const [patient, setpatient] = useState([]);
  const [newPatient, setNewPatient] = useState({ id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: "", address: "" });
  const [editingPatient, setEditingPatient] = useState(null);
  const [updatedPatient, setUpdatedPatient] = useState(
    { id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: "", address: "" });
  useEffect(() => {
    fetchpatient();
  }, []);
  const fetchpatient = async () => {
    try {
      const response = await axios.get('/api/hospital/patients');
      setpatient(response.data);
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  const addPatient = async () => {
    try {
      await axios.post('/api/hospital/patients', newPatient);
      fetchpatient();
      setNewPatient({ id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: "", address: "" });
    } catch (error) {
      console.error('Error adding Patient:', error);
    }
  };

  const updatePatient = async (id) => {
    try {
      await axios.put(`/api/hospital/patients${id}`, updatedPatient);
      fetchpatient();
      setEditingPatient(null);
      setUpdatedPatient({ id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', contact_number: "", address: "" });
    } catch (error) {
      console.error('Error updating Patient:', error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`/api/hospital/patients${id}`);
      fetchpatient();
    } catch (error) {
      console.error('Error deleting Patient:', error);
    }
  };

  const handleEdit = (Patient) => {
    setEditingPatient(Patient.id);
    setUpdatedPatient({ id: patient.patient_id, first_name: patient.first_name, last_name: patient.last_name, date_of_birth: patient.date_of_birth, gender: patient.gender, contact_number: patient.contact_number, address: patient.address });
  };

  return (
    <div className='w-full'>
      <h1 className='text-black text-3xl'>patient</h1>
      <ul className='flex gap-4 flex-wrap'>
        {patient.map((patient, index) => (
          <li key={index} className='text-black px-6 py-12 border rounded-xl w-[400px]'>
            {editingPatient === patient.id ? (
              <div className='flex flex-col gap-2 w-full'>
                <input className='border' type="number" value={updatedPatient.patient_id} onChange={e => setUpdatedPatient({ ...updatedPatient, patient_id: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.first_name} onChange={e => setUpdatedPatient({ ...updatedPatient, first_name: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.last_name} onChange={e => setUpdatedPatient({ ...updatedPatient, last_name: e.target.value })} />
                <input className='border' type="date" value={updatedPatient.date_of_birth} onChange={e => setUpdatedPatient({ ...updatedPatient, date_of_birth: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.gender} onChange={e => setUpdatedPatient({ ...updatedPatient, gender: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.contact_number} onChange={e => setUpdatedPatient({ ...updatedPatient, contact_number: e.target.value })} />
                <input className='border' type="text" value={updatedPatient.address} onChange={e => setUpdatedPatient({ ...updatedPatient, address: e.target.value })} />
                <div className='flex '>
                  <button className='bg-green-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => updatePatient(patient.id)}>Save</button>
                  <button className='bg-red-500 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => setEditingPatient(null)}>Cancel</button>
                </div>
              </div>
            ) : (

              <div className='flex flex-col gap-2 '>
                <p><span className='font-bold text-md'>patient_id:   </span>{patient.patient_id}</p>
                <p><span className='font-bold text-md'>first_name: </span>{patient.first_name}</p>
                <p><span className='font-bold text-md'>last_name:   </span>{patient.last_name}</p>
                <p><span className='font-bold text-md'>date of birth:  </span>{patient.date_of_birth}</p>
                <p><span className='font-bold text-md'>gender:  </span>{patient.gender}</p>
                <p><span className='font-bold text-md'>Contact No:  </span>{patient.contact_number}</p>
                <p><span className='font-bold text-md'>address:  </span>{patient.address}</p>
                <div className='flex justify-aroung'>
                  <button className='bg-red-500 w-1/2 rounded-lg px-4 py-1 mx-2 text-white font-semibold shadow-md' onClick={() => deletePatient(patient.id)}>Delete</button>
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
          <input className='border' type="number" value={newPatient.id} onChange={e => setNewPatient({ ...newPatient, id: e.target.value })} />
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

export default Patient;
