import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";


const App = () => {
  const [students, setStudents] = useState([]);


  // Fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };


  // Add student and update list
  const addStudent = async (name, course) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/students", { name, course });
      fetchStudents(); // Refresh student list immediately
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
        backgroundColor: "#855160",
        color: "#000", 
      }}
    >
      <img
        src="/headerimage.jpg"
        alt="Student Recording System Logo"
        style={{
          width: "auto",
          height: "100px",
          marginBottom: "10px",
        }}
      />
      <h1 style={{ fontWeight: "bold" }}>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />

      <h2 style={{ marginTop: "20px" }}>Student List</h2>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ul
          style={{
            listStylePosition: "inside", 
            textAlign: "left", 
            padding: 0,
          }}
        >
          {students.map((student, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {student.name} - {student.course}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default App;


