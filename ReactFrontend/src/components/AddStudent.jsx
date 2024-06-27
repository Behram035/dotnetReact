import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isActive, setIsActive] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = { name, email, phone, isActive };

    axios.post('http://localhost:5299/api/Student/AddStudent', newStudent)
      .then(() => {
        toast.success('Student added successfully!');
        history('/');
      })
      .catch(error => {
        console.error("There was an error adding the student!", error);
        toast.error('Failed to add Student.');
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add Student</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input type="text" id="name" className="border border-gray-300 rounded px-3 py-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input type="email" id="email" className="border border-gray-300 rounded px-3 py-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
          <input type="text" id="phone" className="border border-gray-300 rounded px-3 py-2 w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="active">
            <input type="checkbox" id="active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="mr-2 leading-tight" />
            Active
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;

