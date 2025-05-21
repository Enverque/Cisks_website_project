import React, { useEffect, useState } from "react";
import "./Book_slider.css"; // Import your CSS file

function Book_slider() {
    const [index, setIndex] = useState(0);
    const [books, setBooks] = useState([]);

    // Fetch book titles from the backend API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/booktitle-events'); // Fetch book titles from backend
                const data = await response.json();
                setBooks(data); // Set the book titles in state
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]);
            }
        };

        fetchBooks(); // Call the function to fetch books
    }, []);

    // Reverse the books titles before joining them
    const reversedTitles = books
        .map((book) => book.title)
        .reverse()  // Reverse the titles array
        .join(" || ");

    if (books.length === 0) {
        return <div className="Book_name_slider">Loading books...</div>; // Show loading message while data is being fetched
    }

    return (
        <div className="Book_name_slider">
            <div className="book_slider_center">
                <div className="book_slider_box">
                    <h3>{reversedTitles}</h3>
                </div>
            </div>
        </div>
    );
}

export default Book_slider;
