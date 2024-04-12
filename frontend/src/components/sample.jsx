import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({ name: '', age: '', grade: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async () => {
    try {
      await axios.post('http://localhost:5000/api/students', newStudent);
      fetchStudents();
      setNewStudent({ name: '', age: '', grade: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, updatedStudent);
      fetchStudents();
      setEditingStudent(null);
      setUpdatedStudent({ name: '', age: '', grade: '' });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setUpdatedStudent({ name: student.name, age: student.age, grade: student.grade });
  };

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {editingStudent === student.id ? (
              <div>
                <input type="text" value={updatedStudent.name} onChange={e => setUpdatedStudent({ ...updatedStudent, name: e.target.value })} />
                <input type="text" value={updatedStudent.age} onChange={e => setUpdatedStudent({ ...updatedStudent, age: e.target.value })} />
                <input type="text" value={updatedStudent.grade} onChange={e => setUpdatedStudent({ ...updatedStudent, grade: e.target.value })} />
                <button onClick={() => updateStudent(student.id)}>Save</button>
                <button onClick={() => setEditingStudent(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {student.name}, Age: {student.age}, Grade: {student.grade}
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                <button onClick={() => handleEdit(student)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Student</h2>
      <input type="text" placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
      <input type="text" placeholder="Age" value={newStudent.age} onChange={e => setNewStudent({ ...newStudent, age: e.target.value })} />
      <input type="text" placeholder="Grade" value={newStudent.grade} onChange={e => setNewStudent({ ...newStudent, grade: e.target.value })} />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}

export default App;
