import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE = "https://cisksbackend1-0.onrender.com";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/check-auth`, { 
        withCredentials: true 
      });
      
      if (!res.data.valid) {
        toast.error("Please login to access dashboard");
        navigate('/Login');
        return;
      }

      // Check if user is student
      if (res.data.role !== 'student') {
        toast.error("Access denied. Students only.");
        navigate('/Login');
        return;
      }

      setUser(res.data);
      fetchIssuedBooks(res.data.userId);
    } catch (error) {
      console.error('Auth error:', error);
      toast.error("Authentication failed");
      navigate('/Login');
    } finally {
      setLoading(false);
    }
  };

  const fetchIssuedBooks = async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/api/user/${userId}/books`);
      
      if (response.ok) {
        const data = await response.json();
        const activeBooks = data.filter(book => !book.returned);
        setIssuedBooks(activeBooks);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
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
              <span className="user-role-badge">Student</span>
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
            <h3>Issued Books</h3>
            <p className="stat-number">{issuedBooks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Status</h3>
            <p className="stat-status">Active</p>
          </div>
        </div>

        <div className="section">
          <h2>My Issued Books</h2>
          {issuedBooks.length === 0 ? (
            <p className="no-books">No books currently issued</p>
          ) : (
            <div className="books-grid">
              {issuedBooks.map((book) => (
                <div key={book.bookId} className="book-card">
                  <h3>{book.Book_title}</h3>
                  <p><strong>Author:</strong> {book.Author}</p>
                  <p><strong>Category:</strong> {book.Category.join(", ")}</p>
                  <p><strong>Issued:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
                  <p><strong>Due:</strong> {new Date(book.dueDate).toLocaleDateString()}</p>
                  <span className={`status-badge ${book.status}`}>
                    {book.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={() => navigate('/BOOKS')} className="action-btn">
              Browse Books
            </button>
            <button onClick={() => navigate('/My_profile')} className="action-btn">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;