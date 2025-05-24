import React, { useState } from "react";
import "./Forget_password.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

function Forget_password() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const API_BASE = "https://cisksbackend1-0.onrender.com";


    const sendOTP = async () => {
        if (!email.trim()) {
            toast.error("Please enter your Institute email");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await axios.post(`${API_BASE}/api/send-otp`, { email });
            setOtpSent(true); // Always set this to true on success
            toast.success("OTP has been sent to your email!");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp.trim() || otp.length !== 4) {
            toast.error("Please enter a valid 4-digit OTP");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await axios.post(`${API_BASE}/api/verify-otp`, { email, otp });
            if (response.data.message === "OTP verified successfully!") {
                setVerified(true);
                toast.success("OTP verified!");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        if (!newPassword.trim()) {
            toast.error("Please enter a new password");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await axios.post(`${API_BASE}/api/reset-password`, { 
                email, 
                newPassword 
            });
            
            if (response.data.message) {
                toast.success("Password reset successfully! You can now login with your new password.");
                setTimeout(() => {
                    window.location = "/Login";
                }, 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Forget_password">
            <h2>Password Reset</h2>
            {!otpSent && (
                <p className="instructions">
                    Enter your registered email address. We'll send you an OTP to reset your password.
                </p>
            )}
            {!otpSent ? (
                <>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        onClick={sendOTP}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </>
            ) : !verified ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter 4-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/, '').slice(0, 4))}
                        disabled={loading}
                    />
                    <button 
                        onClick={verifyOTP}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="password"
                        placeholder="Enter new password (min 6 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        onClick={resetPassword}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </>
            )}

            <p className="back-to-login">
                <Link to="/Login">Back to Login</Link>
            </p>
            
        
        </div>
    );
}

export default Forget_password;