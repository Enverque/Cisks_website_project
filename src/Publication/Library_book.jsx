import React, { useState, useEffect } from "react";
import "./Library_book.css";
import axios from "axios"; // Import axios for API requests
import { Link } from "react-router-dom";

function LibraryBook() {
  const [books, setBooks] = useState([]); // State to hold books data

  // Fetch books from the backend API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/newbook-events'); // Fetch data from backend API
        setBooks(response.data); // Set the data to state
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks(); // Call the function to fetch books
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="library-container">
      <h2 className="library_heading">New Arrivals in the Library</h2>
      <div className="gallery_container">
        <div className="gallery-box">
          {/* Render books only if there are any */}
          {books.length > 0 ? (
            books.map((book, index) => (
              <span key={book.id} style={{ "--i": index + 1 }}>
                <Link to="https://www.yaksha-prashna.in/show_egangotry" target="_blank" rel="noopener noreferrer">
                  <img
                    src={book.imagePath} // Use imagePath from backend response
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // This makes any image fit well
                      borderRadius: "12px",
                    }}
                  />
                </Link>
              </span>
            ))
          ) : (
            <p>No books available</p> // If no books, show a message
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryBook;
