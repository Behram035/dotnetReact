import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  // const [deletedStudent, setDeletedStudent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      await fetch('http://localhost:5299/api/Student/GetAllStudents')
            .then(response => response.json())
            .then(response => setStudents(response))
            .catch(error => console.error('Error fetching data:', error));

    };
    fetchData();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5299/api/Student/DeleteStudent/${id}`);
      const deletedStudent = students.filter(student => student.id === id);
      console.log(deletedStudent)
      setStudents(students.filter(student => student.id !== id)); 
        
      toast.success('Student Deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to Delete Student.');
    }
  };
  console.log(students)
  return (
  <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Students List</h1>
       <Link to="/addstudent" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">Add Student</Link>
       <ul>
         {students.map((student) => (
           <li key={student.id} className="border border-gray-300 p-4 mb-4 rounded">
            
             <p className="text-lg font-semibold">{student.name}</p>
             <p className="text-gray-600">{student.email}</p>
             <p className="text-gray-600">{student.phone}</p>
             <p>Active? <input type="checkbox" onChange={e => {}}   checked={student.isActive}/></p>
             <div className="mt-2">
               <Link to={`/editstudent/${student.id}`} className="text-blue-500 hover:text-blue-700 mr-2">Edit</Link>
               <button onClick={() => deleteStudent(student.id)} className="text-red-500 hover:text-red-700">Delete</button>
             </div>
           </li>
         ))}
       </ul>
     </div>)
};

export default ListStudents;
