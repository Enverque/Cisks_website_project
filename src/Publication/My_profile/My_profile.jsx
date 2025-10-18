import React, { useEffect, useState } from "react";
import "./My_profile.css";
import { toast } from 'react-toastify';

function My_profile() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returningBookId, setReturningBookId] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchIssuedBooks = async () => {
    try {
      if (!userId) {
        toast.error("Please SignIn to view issued books");
        setLoading(false);
        return;
      }

      const response = await fetch(`https://cisksbackend1-0.onrender.com/api/user/${userId}/books`);
      
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to fetch books');
        setError(errorData.error || 'Failed to fetch books');
        setLoading(false);
        return;  // ✅ Add return
      }

      const data = await response.json();
      // Filter out returned books
      const activeBooks = data.filter(book => !book.returned);
      setIssuedBooks(activeBooks);
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      setReturningBookId(bookId);
      const response = await fetch('https://cisksbackend1-0.onrender.com/api/returnBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          bookId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to return book');
        return;
      }

      // Refresh the list after successful return
      const result = await response.json();
      await fetchIssuedBooks();
      toast.success('Book returned successfully!');
    } catch (error) {
      console.error('Return error:', error);
      toast.error(error.message);
    } finally {
      setReturningBookId(null);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, [userId]);

  if (loading) {
    return <div className="my-profile container">Loading issued books...</div>;
  }

  if (error) {
    return (
      <div className="my-profile container">
        <div className="error-message">{error}</div>
        <button onClick={() => window.history.back()} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="my-profile container">
    <div className="back-button-container">
        <button 
            className="back-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
        >
             Back
        </button>
    </div>
      <h2 className="Profile_issued_book">Issued Books</h2>
      

      {issuedBooks.length === 0 ? (
        <p>No books currently issued</p>
      ) : (
        <div className="issued-books-list">
          {issuedBooks.map((book) => {
            const timeString = book.issueTime;
            let formattedTime = timeString;

            if (timeString) {
              // Split into components
              const [time, modifier] = timeString.split(' ');
              const [hours, minutes, seconds] = time.split(':');
              
              // Format without seconds
              formattedTime = `${hours}:${minutes} ${modifier}`;
            }

            return (
              <div key={book.bookId} className="book-item">
                <div className="book-details">
                  <h3>{book.Book_title}</h3>
                  <p className="author">Author: {book.Author}</p>
                  <p className="Category">Category: {book.Category.join(",")}</p>
                  
                  <div className="meta-info">
                    <p>Issued on: {new Date(book.issueDate).toLocaleDateString('en-GB')}</p>
                    <p>At: {book.issueTime || 'Time not available'}</p>
                    <p className={`status ${book.status}`}>
                      Status: {book.status.toUpperCase()}
                    </p>
                  </div>
                  <button 
                    className="return-button"
                    onClick={() => handleReturn(book.bookId)}
                    disabled={returningBookId === book.bookId}
                  >
                    {returningBookId === book.bookId ? "Returning..." : "Return Book"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default My_profile;