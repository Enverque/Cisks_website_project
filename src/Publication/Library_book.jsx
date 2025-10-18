import React, { useState, useEffect } from "react";
import "./Library_book.css";
import axios from "axios"; 
import { Link } from "react-router-dom";

function LibraryBook() {
  const [books, setBooks] = useState([]); 


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://cisksbackend1-0.onrender.com/api/newbook-events'); 
        setBooks(response.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks(); 
  }, []); 

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
                    src={book.imagePath} 
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", 
                      borderRadius: "12px",
                    }}
                  />
                </Link>
              </span>
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryBook;
