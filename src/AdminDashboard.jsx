import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBooks: 0,
    issuedBooks: 0,
    lockedAccounts: 0
  });
  const [lockedUsers, setLockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE = "https://cisksbackend1-0.onrender.com";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/verify-admin`, { 
        withCredentials: true 
      });
      
      if (!res.data.valid) {
        toast.error("Access denied. Admins only.");
        navigate('/Login');
        return;
      }

      setUser(res.data);
      fetchStats();
      fetchLockedUsers();
    } catch (error) {
      console.error('Auth error:', error);
      toast.error("Authentication failed");
      navigate('/Login');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/AdminPanel/stats`, { 
        withCredentials: true 
      });
      if (res.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchLockedUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/AdminPanel/locked-users`, { 
        withCredentials: true 
      });
      if (res.data) {
        setLockedUsers(res.data);
      }
    } catch (error) {
      console.error('Error fetching locked users:', error);
    }
  };

  const handleUnlockUser = async (userId) => {
    try {
      await axios.post(
        `${API_BASE}/api/AdminPanel/unlock-user`, 
        { userId },
        { withCredentials: true }
      );
      toast.success("User unlocked successfully");
      fetchLockedUsers();
      fetchStats();
    } catch (error) {
      console.error('Error unlocking user:', error);
      toast.error("Failed to unlock user");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/api/Logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate('/Login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container admin">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            {user?.profilePicture && (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="profile-pic"
              />
            )}
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.username}</p>
              <span className="user-role-badge admin">Admin</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-number">{stats.totalStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Books</h3>
            <p className="stat-number">{stats.totalBooks}</p>
          </div>
          <div className="stat-card">
            <h3>Issued Books</h3>
            <p className="stat-number">{stats.issuedBooks}</p>
          </div>
          <div className="stat-card alert">
            <h3>Locked Accounts</h3>
            <p className="stat-number">{stats.lockedAccounts}</p>
          </div>
        </div>

        {lockedUsers.length > 0 && (
          <div className="section">
            <h2>Locked Accounts</h2>
            <div className="locked-users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Failed Attempts</th>
                    <th>Lock Expires</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lockedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.loginAttempts}</td>
                      <td>
                        {user.lockUntil ? 
                          new Date(user.lockUntil).toLocaleString() : 
                          'N/A'
                        }
                      </td>
                      <td>
                        <button
                          onClick={() => handleUnlockUser(user._id)}
                          className="unlock-btn"
                        >
                          Unlock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="quick-actions">
          <h2>Admin Actions</h2>
          <div className="action-buttons">
            <button 
              onClick={() => navigate('/AdminPanel')} 
              className="action-btn"
            >
              Manage Events
            </button>
            <button 
              onClick={() => navigate('/Books_collection')} 
              className="action-btn"
            >
              Manage Books
            </button>
            <button 
              onClick={() => navigate('/issued-books')} 
              className="action-btn"
            >
              View All Issued Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;