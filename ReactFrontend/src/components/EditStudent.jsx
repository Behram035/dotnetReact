import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const history = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5299/api/Student/GetStudent/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStudent(data);
        toast.success("Find Student successfully!");
      })
      .catch(error => {
        console.log(error);
        toast.error("Data Fetching Error...")}
      )
      
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5299/api/Student/EditStudent`, student)
      .then(() => {
        // console.log(student);
        toast.success("Student Updated successfully!");
        history("/");
      })
      .catch((error) => {
        console.error("There was an error updating the student!", error);
        toast.error("Failed to update Student. Axios Post");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Student</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="id"
          >
            Id:
          </label>
          <input
            type="text"
            id="id"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={student.id}
            readOnly
          />
        </div>
      
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={student.phone}
            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="active"
          >
            <input
              type="checkbox"
              id="active"
              checked={student.isActive}
              onChange={(e) => setStudent({ ...student, isActive: e.target.checked })
              }
              className="mr-2 leading-tight"
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
