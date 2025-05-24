import React, { useEffect, useState } from "react";
import "./Book_slider.css"; 

function Book_slider() {
    const [index, setIndex] = useState(0);
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/booktitle-events'); // Fetch book titles from backend
                const data = await response.json();
                setBooks(data); 
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]);
            }
        };

        fetchBooks(); 
    }, []);

   
    const reversedTitles = books
        .map((book) => book.title)
        .reverse() 
        .join(" || ");

    if (books.length === 0) {
        return <div className="Book_name_slider">Loading books...</div>; 
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
