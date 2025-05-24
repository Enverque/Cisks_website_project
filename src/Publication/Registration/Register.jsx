import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { toast } from 'react-toastify';


function Register() {
  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
        const response = await axios.post("/api/Register", formdata);
    // ✅ Backend URL + port

      const result = response.data;

      if (response.status === 200) {
        toast.success("Registered successfully!");
      } else {
        toast.error(result.Message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        error.response?.data?.Message || "Something went wrong! Try again."
      );
    }
  };

  return (
    <>
      <div className="Registration container">
      
        <h2>Registration</h2>
      
        <form onSubmit={handleSubmit}>
        <div className="Userdetail">
            <label htmlFor="name">Name</label> 
            <input type="text" 
              id="name" 
              placeholder="Enter Your Name"
              name="name" 
              onChange={handlechange}
              value={formdata.name}
              required />
        </div>
          <div className="Userdetail">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={formdata.username}
              onChange={handlechange}
              placeholder="Enter Your Email"
              name="username"
              required
            />
          </div>
          <div className="Userpassword">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Enter password"
              name="password"
              required
            />
          </div>
          <button type="submit" className="Register-btn">
            Register
          </button>
        </form>
        <div className="back-button-container">
        <button 
            className="back-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
        >
             Back
        </button>
    </div>
      </div>
    </>
  );
}

export default Register;
