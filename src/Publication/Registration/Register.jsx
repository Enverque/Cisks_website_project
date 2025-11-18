import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("student");
  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPasswordHints, setShowPasswordHints] = useState(false);

  const API_BASE = "https://cisksbackend1-0.onrender.com";

  const validatePassword = (password) => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const isPasswordStrong = () => {
    return Object.values(passwordStrength).every(criteria => criteria === true);
  };

  const isValidDomain = (email) => {
    return email.toLowerCase().trim().endsWith('@iiti.ac.in');
  };

  // Validate student ID format
  const isValidStudentId = (email) => {
    const studentIdPattern = /^[a-z]+\d+@iiti\.ac\.in$/i;
    return studentIdPattern.test(email.toLowerCase().trim());
  };

  // Validate admin email format
  const isValidAdminEmail = (email) => {
    const adminEmailPattern = /^[a-z]+@iiti\.ac\.in$/i;
    return adminEmailPattern.test(email.toLowerCase().trim());
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formdata.name.trim()) {
      toast.error("Name is required");
      setIsLoading(false);
      return;
    }

    if (!isValidDomain(formdata.username)) {
      toast.error("Only @iiti.ac.in email addresses are allowed");
      setIsLoading(false);
      return;
    }

    // Validate based on role
    if (role === "student" && !isValidStudentId(formdata.username)) {
      toast.error("Invalid student ID format. Use: prefix + digits (e.g., che230008016@iiti.ac.in)");
      setIsLoading(false);
      return;
    }

    if (role === "admin" && !isValidAdminEmail(formdata.username)) {
      toast.error("Invalid admin email format. Use: name only (e.g., admin@iiti.ac.in)");
      setIsLoading(false);
      return;
    }

    if (!isPasswordStrong()) {
      toast.error("Please create a stronger password meeting all criteria");
      setShowPasswordHints(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/Register`, {
        ...formdata,
        role: role
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/Login"), 2000);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        error.response?.data?.Message || 
        error.response?.data?.error || 
        "Registration failed! Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      if (!isValidDomain(decoded.email)) {
        toast.error("Only @iiti.ac.in email addresses are allowed");
        setIsLoading(false);
        return;
      }

      // Validate based on selected role
      if (role === "student" && !isValidStudentId(decoded.email)) {
        toast.error("This Google account is not a valid student ID");
        setIsLoading(false);
        return;
      }

      if (role === "admin" && !isValidAdminEmail(decoded.email)) {
        toast.error("This Google account is not a valid admin email");
        setIsLoading(false);
        return;
      }
      
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          role: role
        }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Welcome ${data.name}!`);
        setTimeout(() => {
          if (data.role === 'admin') {
            navigate('/AdminDashboard');
          } else {
            navigate('/StudentDashboard');
          }
        }, 1500);
      } else {
        toast.error(data.error || "Google signup failed");
      }
    } catch (err) {
      console.error("Error during Google signup:", err);
      toast.error("Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed.");
  };

  return (
    <div className="Registration container">
      <h2>Register as:</h2>
      
      {/* Role Selection */}
      <div className="role-selection">
        <div className="role-buttons">
          <button
            type="button"
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
            disabled={isLoading}
          >
            Student
          </button>
          <button
            type="button"
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
            disabled={isLoading}
          >
            Admin
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="Userdetail">
          <label htmlFor="name">Name</label> 
          <input 
            type="text" 
            id="name" 
            placeholder="Enter Your Name"
            name="name" 
            onChange={handlechange}
            value={formdata.name}
            disabled={isLoading}
            required 
          />
        </div>

        <div className="Userdetail">
          <label htmlFor="username">
            {role === 'student' ? 'Student ID' : 'Admin Email'}
          </label>
          <input
            type="email"
            id="username"
            value={formdata.username}
            onChange={handlechange}
            placeholder={
              role === 'student' 
                ? 'Enter your Institute Id' 
                : 'Enter Admin Id'
            }
            name="username"
            disabled={isLoading}
            required
          />
          <span className="input-hint">
            {role === 'student' 
              ? 'please register with your Institute Id' 
              : 'please Enter Admin Id'}
          </span>
        </div>

        <div className="Userpassword">
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Create a strong password"
              name="password"
              disabled={isLoading}
              onFocus={() => setShowPasswordHints(true)}
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555"
              }}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>
          
          {showPasswordHints && formdata.password && (
            <div className="password-requirements">
              <p className="requirements-title">Password must contain:</p>
              <ul className="requirements-list">
                <li className={passwordStrength.hasMinLength ? 'valid' : 'invalid'}>
                  {passwordStrength.hasMinLength ? '✓' : '✗'} At least 8 characters
                </li>
                <li className={passwordStrength.hasUpperCase ? 'valid' : 'invalid'}>
                  {passwordStrength.hasUpperCase ? '✓' : '✗'} One uppercase letter (A-Z)
                </li>
                <li className={passwordStrength.hasLowerCase ? 'valid' : 'invalid'}>
                  {passwordStrength.hasLowerCase ? '✓' : '✗'} One lowercase letter (a-z)
                </li>
                <li className={passwordStrength.hasNumber ? 'valid' : 'invalid'}>
                  {passwordStrength.hasNumber ? '✓' : '✗'} One number (0-9)
                </li>
                <li className={passwordStrength.hasSpecialChar ? 'valid' : 'invalid'}>
                  {passwordStrength.hasSpecialChar ? '✓' : '✗'} One special character (!@#$%^&*)
                </li>
              </ul>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="Register-btn" 
          disabled={isLoading || !isPasswordStrong()}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
            width="100%"
          />
        </div>
      </form>

      <div className="back-button-container">
        <button 
          className="back-button"
          onClick={() => window.history.back()}
          aria-label="Go back"
          disabled={isLoading}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Register;