import React from "react";
import "./Library_book.css";
import books from "./Display_Books";
import { Link } from "react-router-dom";


function LibraryBook() {
  return (
    <div className="library-container">
      <h2 className="library_heading">Available Books In Library</h2>
      <div className="gallery_container">
        <div className="gallery-box">
          {books.map((book, index) => (
            <span key={book.id} style={{ "--i": index + 1 }}>
            <Link to="https://www.yaksha-prashna.in/show_egangotry" target="_blank" rel="noopener noreferrer">
                <img
                  src={book.image}
                  alt={book.title}
                  // Inline styles to ensure consistent behavior across images
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // this makes any image fit well
                    borderRadius: "12px",
                  }}
                />
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LibraryBook;
