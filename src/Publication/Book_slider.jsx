import React from "react";
import "./Book_slider.css"; // Import your CSS file
import books from "./Display_Books";

const Book_slider = () => {
  // Reverse the books titles before joining them
  const reversedTitles = books
    .map((book) => book.title)
    .reverse()  // Reverse the titles array
    .join(" || ");

  return (
    <div className="Book_name_slider">
      <div className="book_slider_center">
        <div className="book_slider_box">
          <h3>{reversedTitles}</h3>
        </div>
      </div>
    </div>
  );
};

export default Book_slider;
