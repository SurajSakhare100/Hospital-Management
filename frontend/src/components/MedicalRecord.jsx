import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
function MedicalRecord() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [newMedicalRecords, setnewMedicalRecords] = useState({ record_id: '', date: '', doctor_id: '',patient_id:'',medical_problem:'', medication_prescribed: '', diagnosis: '' });
  const [updatedMedicalRecords, setupdatedMedicalRecords] = useState({ record_id: '', date: '', doctor_id: '',patient_id:'',medical_problem:'',  medication_prescribed: '', diagnosis: '' });
  const [editingMedicalRecords, setEditingMedicalRecords] = useState(null);
  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get('/api/hospital/medicalrecords');
      setMedicalRecords(response.data);
    } catch (error) {
      console.error('Error fetching MedicalRecords:', error);
    }
  };
  const updateMedicalRecords = async (id) => {
    try {
      await axios.put(`/api/hospital/medicalrecords/${id}`, updatedMedicalRecords);
      fetchMedicalRecords();
      setEditingMedicalRecords(null);
      setupdatedMedicalRecords({ record_id: '', date: '', doctor_id: '',patient_id:'',medical_problem:'', medication_prescribed: '', diagnosis: '' });
    } catch (error) {
      console.error('Error updating MedicalRecords:', error);
    }
  };

  const addMedicalRecords = async () => {
    try {
      await axios.post('/api/hospital/medicalrecords', newMedicalRecords);
      fetchMedicalRecords();
      setnewMedicalRecords({ record_id: '', date: '', doctor_id: '',patient_id:'',medical_problem:'',  medication_prescribed: '', diagnosis: '' });
    } catch (error) {
      console.error('Error adding MedicalRecords:', error);
    }
  };
  const deleteMedicalRecords = async (id) => {
    try {
      await axios.delete(`/api/hospital/medicalrecords/${id}`);
      fetchMedicalRecords();
    } catch (error) {
      console.error('Error deleting MedicalRecords:', error);
    }
  };

  const handleEdit = (medical) => {
    setEditingMedicalRecords(medical.record_id);
    setupdatedMedicalRecords({ record_id: medical.record_id, date:medical.date, doctor_id: medical.doctor_id,patient_id:medical.patient_id,medical_problem:medical.medical_problem,  medication_prescribed: medical.medication_prescribed, diagnosis: medical.diagnosis })
  };

  return (
    <div className='w-full pl-72 pr-4 pt-2 bg-[#F8F9FA]'>
      <div className='w-full py-4 bg-white rounded-lg mb-4 shadow-lg'>
        <h2 className='text-black text-2xl text-center mb-3 font-semibold'>Add New Medical Records</h2>
        <div className='w-full flex justify-center'>
          <div className='flex flex-col gap-2 w-1/2 text-black mb-4'>
            <input className='border px-2 py-1 rounded-md shadow-sm' type="date" value={newMedicalRecords.date} onChange={e => setnewMedicalRecords({ ...newMedicalRecords, date: e.target.value })} placeholder="date" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newMedicalRecords.patient_id} onChange={e => setnewMedicalRecords({ ...newMedicalRecords, patient_id: e.target.value })} placeholder="patient_id" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newMedicalRecords.doctor_id} onChange={e => setnewMedicalRecords({ ...newMedicalRecords, doctor_id: e.target.value })} placeholder="doctor id" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newMedicalRecords.medical_problem} onChange={e => setnewMedicalRecords({ ...newMedicalRecords, medical_problem: e.target.value })} placeholder="medical problem" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newMedicalRecords.medication_prescribed} onChange={e => setnewMedicalRecords({ ...newMedicalRecords, medication_prescribed: e.target.value })} placeholder="medication prescribed" />
            <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={newMedicalRecords.diagnosis} onChange={e => setnewMedicalRecords({ ...newMedicalRecords, diagnosis: e.target.value })} placeholder="diagnosis" />
            <button className='bg-red-500 rounded-lg px-4 py-1  text-white font-semibold shadow-lg' onClick={() => addMedicalRecords()}>Add MedicalRecords</button>
          </div>
        </div>
      </div>
      <h1 className='text-black text-4xl text-center mb-4 font-semibold'>MedicalRecords</h1>
      <div className='flex flex-wrap gap-4 pb-20 justify-center'>
        {medicalRecords.map((medicalRecord) => (
          <li key={medicalRecord.record_id} className='text-black px-6 py-8 border rounded-xl w-[400px] list-none bg-white shadow-lg'>
            {editingMedicalRecords !== medicalRecord.record_id ? (
              <div className='flex flex-col gap-2 '>
                <div className='flex flex-col gap-2 mb-2'>

                  <p><span className='font-bold text-md'>Medical Records ID:   </span>{medicalRecord.record_id}</p>
                  <p><span className='font-bold text-md'>Medical Records Date: </span>{medicalRecord.date}</p>
                  <p><span className='font-bold text-md'>Patient Id:   </span>{medicalRecord.patient_id}</p>
                  <p><span className='font-bold text-md'>Doctor Id:  </span>{medicalRecord.doctor_id}</p>
                  <p><span className='font-bold text-md'>medical problem:  </span>{medicalRecord.medical_problem}</p>
                  <p><span className='font-bold text-md'>medical prescribed:  </span>{medicalRecord.medication_prescribed}</p>
                  <p><span className='font-bold text-md'>diagnosis:  </span>{medicalRecord.diagnosis}</p>
                </div>
                <div className='w-full flex justify-between gap-4'>
                  <button className='bg-red-500 w-1/2 rounded-lg px-4 py-1  text-white font-semibold shadow-xl' onClick={() => deleteMedicalRecords(medicalRecord.record_id)}>Delete</button>
                  <button className='bg-green-500 w-1/2 rounded-lg px-4 py-1  text-white font-semibold shadow-xl' onClick={() => handleEdit(medicalRecord)}>Edit</button>
                </div>
              </div>
            ) :
              <div className='flex flex-col gap-2 w-full'>
                <input className='border px-2 py-1 rounded-md shadow-sm' type="date" value={updatedMedicalRecords.date} onChange={e => setupdatedMedicalRecords({ ...updatedMedicalRecords, date: e.target.value })} />
                <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={updatedMedicalRecords.patient_id} onChange={e => setupdatedMedicalRecords({ ...updatedMedicalRecords, patient_id: e.target.value })} />
                <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={updatedMedicalRecords.doctor_id} onChange={e => setupdatedMedicalRecords({ ...updatedMedicalRecords, doctor_id: e.target.value })} />
                <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={updatedMedicalRecords.medical_problem} onChange={e => setupdatedMedicalRecords({ ...updatedMedicalRecords, medical_problem: e.target.value })} />
                <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={updatedMedicalRecords.medication_prescribed} onChange={e => setupdatedMedicalRecords({ ...updatedMedicalRecords, medication_prescribed: e.target.value })} />
                <input className='border px-2 py-1 rounded-md shadow-sm' type="text" value={updatedMedicalRecords.diagnosis} onChange={e => setupdatedMedicalRecords({ ...updatedMedicalRecords, diagnosis: e.target.value })} />
                <div className='flex gap-4 '>
                  <button className=' bg-green-500 w-1/2 rounded-lg px-4 py-1  text-white font-semibold shadow-xl' onClick={() => updateMedicalRecords(medicalRecord.record_id)}>Save</button>
                  <button className=' bg-red-500 w-1/2 rounded-lg px-4 py-1  text-white font-semibold shadow-xl' onClick={() => setEditingMedicalRecords(null)}>Cancel</button>
                </div>
              </div>}

          </li>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecord;
