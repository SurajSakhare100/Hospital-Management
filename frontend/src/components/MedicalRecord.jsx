import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ id: '', patient_id: '', doctor_id: '', details: '' });

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get('/api/hospital/medical_records');
      setMedicalRecords(response.data);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  const addRecord = async () => {
    try {
      await axios.post('/api/hospital/medical_records', newRecord);
      fetchMedicalRecords();
      setNewRecord({ id: '', patient_id: '', doctor_id: '', details: '' });
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-black text-3xl'>Medical Records</h1>
      {/* Render medical records list and add record form */}
    </div>
  );
}

export default MedicalRecords;
