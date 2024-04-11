import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [status, setStatus] = useState('');
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students/data');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const markAttendance = async () => {
    try {
      await axios.post('/api/attendance/data', { student_id: selectedStudent.id, status });
      alert('Attendance marked successfully');
      setStatus('');
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div>
      <h1>Attendance System</h1>
      <select onChange={e => setSelectedStudent(JSON.parse(e.target.value))}>
        <option value="">Select Student</option>
        {students.map(student => (
          <option key={student.id} value={JSON.stringify(student)}>{student.id}</option>
        ))}
      </select>
      <br />
      <input type="radio" id="present" name="status" value="Present" checked={status === 'Present'} onChange={() => setStatus('Present')} />
      <label htmlFor="present">Present</label>
      <br />
      <input type="radio" id="absent" name="status" value="Absent" checked={status === 'Absent'} onChange={() => setStatus('Absent')} />
      <label htmlFor="absent">Absent</label>
      <br />
      <button onClick={markAttendance} disabled={!selectedStudent || !status}>Mark Attendance</button>
    </div>
  );
}

export default Attendance;
