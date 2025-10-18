import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = "https://cisksbackend1-0.onrender.com";
  const queryParams = new URLSearchParams(location.search);
  const autoIssueBookId = queryParams.get("autoIssue");

  const isValidDomain = (email) => {
    return email.toLowerCase().trim().endsWith('@iiti.ac.in');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isValidDomain(username)) {
      toast.error("Only Institute email addresses are allowed");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Login successful!");
        
        if (data.isAdmin) {
          navigate('/AdminPanel');
        } else {
          navigate(autoIssueBookId ? `/BOOKS?autoIssue=${autoIssueBookId}` : '/BOOKS');
        }
      } else {
        if (res.status === 404 || data.error?.toLowerCase().includes("user not found")) {
          toast.error("User not found! Please register first.");
          setTimeout(() => navigate("/Register"), 2000);
        } else if (data.error?.includes("Google Sign-In")) {
          toast.error(data.error);
        } else {
          toast.error(data.error || "Login failed");
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Network error. Please try again.");
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
      
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture
        }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Welcome ${data.name}!`);
        
        if (data.isAdmin) {
          navigate('/AdminPanel');
        } else {
          navigate(autoIssueBookId ? `/BOOKS?autoIssue=${autoIssueBookId}` : '/BOOKS');
        }
      } else {
        toast.error(data.error || "Google login failed");
      }
    } catch (err) {
      console.error("Error during Google login:", err);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="login container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="Userdetail">
          <label htmlFor="username">Institute Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="xyz@iiti.ac.in"
            name="username"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="Userpassword">
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter password"
              name="password"
              required
              disabled={isLoading}
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
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="100%"
          />
        </div>

        <button type="button" className="Register-btn" disabled={isLoading}>
          <Link to="/Register">Register Now</Link>
        </button>

        <Link to="/Forget_password" className="forgot-password">
          Forgot Password?
        </Link>
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

export default Login;