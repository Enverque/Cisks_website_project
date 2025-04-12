import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Extract redirect params if they exist (optional)
  const queryParams = new URLSearchParams(location.search);
  const autoIssueBookId = queryParams.get("autoIssue");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.text();
  
      if (res.ok) {
        // ✅ Successful Login
        localStorage.setItem("userLoggedIn", true);
  
        const queryParams = new URLSearchParams(window.location.search);
        const redirectAction = queryParams.get("redirect");
        const autoIssueId = queryParams.get("autoIssue");
  
        if (redirectAction === "issueBook" && autoIssueId) {
          window.location.href = `/Books?autoIssue=${autoIssueId}`;
        } else {
          window.location.href = "/Books";
        }
  
      } else {
        // ✅ If user not found
        if (res.status === 404 || data.toLowerCase().includes("user not found")) {
          toast.error("User not found! Redirecting to Register...");
          navigate("/Register");
        } else {
          // ✅ For other errors
          toast.error(" Login Failed: " + data);
        }
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      toast.error(" Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="login container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="Userdetail">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="Enter Your Email"
            name="username"
            required
          />
        </div>
        <div className="Userpassword">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>

        <button className="Register-btn">
          <a href="/Register">Register Now</a>
        </button>

        <a href="/Forget_password" className="forgot-password">
          Forgot Password?
        </a>

        {message && <p>{message}</p>}
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
  );
}

export default Login;
