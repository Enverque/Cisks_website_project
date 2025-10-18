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
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPasswordHints, setShowPasswordHints] = useState(false);
    
    const API_BASE = "https://cisksbackend1-0.onrender.com";

    // Domain validation
    const isValidDomain = (email) => {
        return email.toLowerCase().trim().endsWith('@iiti.ac.in');
    };

    // Password strength checker
    const checkPasswordStrength = (password) => {
        return {
            hasMinLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    };

    const passwordStrength = checkPasswordStrength(newPassword);
    
    const isPasswordStrong = () => {
        return Object.values(passwordStrength).every(criteria => criteria === true);
    };

    const sendOTP = async () => {
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        if (!isValidDomain(email)) {
            toast.error("Only @iiti.ac.in email addresses are allowed");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE}/api/send-otp`, { email });
            setOtpSent(true);
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
        
        if (!isPasswordStrong()) {
            toast.error("Password does not meet all requirements");
            setShowPasswordHints(true);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE}/api/reset-password`, { 
                email, 
                newPassword 
            });
            
            if (response.data.message) {
                toast.success("Password reset successfully! Redirecting to login...");
                setTimeout(() => {
                    window.location = "/Login";
                }, 2000);
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
                    Enter your Institute email. We'll send you an OTP to reset your password.
                </p>
            )}
            {!otpSent ? (
                <>
                    <input
                        type="email"
                        placeholder="xyz@iiti.ac.in"
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
                        maxLength={4}
                    />
                    <button 
                        onClick={verifyOTP}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button 
                        onClick={() => {
                            setOtpSent(false);
                            setOtp("");
                        }}
                        className="resend-btn"
                        disabled={loading}
                    >
                        Resend OTP
                    </button>
                </>
            ) : (
                <>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setShowPasswordHints(true)}
                            disabled={loading}
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
                        
                        {showPasswordHints && newPassword && (
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
                        onClick={resetPassword}
                        disabled={loading || !isPasswordStrong()}
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