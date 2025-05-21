import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import "./Book.css";
import Library_book from "./Library_book";
import Book_slider from "./Book_slider";
import { toast } from 'react-toastify';



function Book() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory , setSearchCategory] = useState("");
  const [issuedBooks, setIssuedBooks] = useState({});
  const location = useLocation();
  const navigate = useNavigate();


  
  // Fetch issued books from backend
  const fetchIssuedBooks = async () => {
    const userId = localStorage.getItem("userId");
  if (!userId) return;

  try {
    const response = await fetch(`/api/user/${userId}/books`);
    const data = await response.json();

    if (response.ok) {
      const issuedMap = {};
      data.forEach((book) => {
        // Only mark as issued if not returned
        if (!book.returned) {
          issuedMap[book.bookId] = {
            issued: true,
            dueDate: new Date(book.dueDate).toLocaleDateString('en-GB')
          };
        }
      });
      setIssuedBooks(issuedMap);
      localStorage.setItem("issuedBooks", JSON.stringify(issuedMap));
    }
  } catch (err) {
    console.error("Error fetching issued books:", err);
  }
};

// Add refresh functionality
const refreshIssuedBooks = async () => {
  await fetchIssuedBooks();
};
// Pass refresh function to My_profile component
// (You'll need to modify your routing/navigation to pass this prop)
<NavLink to="/My_profile" state={{ refreshIssuedBooks }}>
  Profile
</NavLink>

  // Persist issued books state
  useEffect(() => {
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
  }, [issuedBooks]);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/Books_collection");
        const data = await response.json();
        setAllBooks(data);
        setBooks([]);
      } catch (error) {
        console.log("Error fetching books", error);
      }
    };
    fetchBooks();
  }, []);

  // Handle auto-issue after login
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const autoIssueId = queryParams.get("autoIssue");

    if (autoIssueId && !issuedBooks[autoIssueId]?.issued) {
      handleIssueBook(autoIssueId);
      const bookElement = document.getElementById(`book-${autoIssueId}`);
      if (bookElement) {
        bookElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      navigate("/Books", { replace: true });
    }
  }, [location.search, issuedBooks, navigate]);

  // Issue book handler
  const handleIssueBook = async (bookId) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    const userId = localStorage.getItem("userId");


    if (!isLoggedIn) {
      toast.error("Please login first to issue the book!");
      navigate(`/Login?redirect=issueBook&autoIssue=${bookId}`);
      return;
    }

    const selectedBook = allBooks.find((book) => book._id === bookId);

    if (!selectedBook && !isLoggedIn) {
      toast.error("Book not found!");
      return;
    }

    if (selectedBook.Quantity < 1) {
      toast.error("This book is currently not available for issuing!");
      return;
    }

    if (issuedBooks[bookId]?.issued) {
      toast.error("This book is already issued!");
      return;
    }

    try {
      const response = await fetch('/api/issueBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          bookId
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(`Failed to issue book: ${result.error}`);
      } else {
        const dueDate = new Date(result.issuedBook.dueDate).toLocaleDateString('en-GB');
        toast.success(`Book issued successfully! Due Date: ${dueDate}`);
        setIssuedBooks(prev => ({
          ...prev,
          [bookId]: {
            issued: true,
            dueDate: dueDate
          }
        }));
      }
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  // Faster search by category number
  const handleAdvanceSearch = () => {
    if (searchCategory.trim() === "") {
      setBooks([]);
      return;
    }

    // Split input by commas and convert to numbers (e.g., "1,2" → [1, 2])
    const searchCategories = searchCategory
      .split(",")
      .map((c) => parseInt(c.trim(), 10));

    // Check if all parts are valid numbers
    if (searchCategories.some(isNaN)) {
      setBooks([]);
      return;
    }

    // Filter books where ALL categories are present
    const filtered = allBooks.filter((book) => {
      const bookCategories = book.Category.some(c => c >= 1 && c <= 16) 
        ? book.Category 
        : [17];
        
      return searchCategories.every((cat) => 
        bookCategories.includes(cat)
      );
    });

    setBooks(filtered);
  };

  // Trigger search when the category changes
  useEffect(() => {
    handleAdvanceSearch();
  }, [searchCategory]);


  
  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setBooks([]);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = allBooks.filter((book) =>
      (book.Book_title || "").toLowerCase().includes(searchTermLower) ||
      (book.Author || "").toLowerCase().includes(searchTermLower)
    );
    setBooks(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      handleAdvanceSearch();
    }
  };

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data.loggedIn) {
          localStorage.setItem("userLoggedIn", true);
          localStorage.setItem("userId", data.user.id);
          fetchIssuedBooks();
        } else {
          localStorage.removeItem("userLoggedIn");
          localStorage.removeItem("userId");
        }
      } catch (err) {
        toast.error("Auth check failed:", err);
      }
    };
    checkAuth();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/Logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out!");
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("issuedBooks");
        setIssuedBooks({});
        navigate("/Login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };



  return (
    <div className="Book container-fluid">
      <div className="Book_nav container">
          <div className="Search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter the Book/Author Name for search"
            />
            <button className="searchbtn" onClick={handleSearch}>
              <strong>Search</strong>
            </button>
          </div>

        <div className="searchCategory" >
          <select value={searchCategory} onChange={(err) => setSearchCategory(err.target.value)}>
            <option value="" disabled>Select a Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
            <option value="4">Category 4</option>
            <option value="5">Category 5</option>
            <option value="6">Category 6</option>
            <option value="7">Category 7</option>
            <option value="8">Category 8</option>
            <option value="9">Category 9</option>
            <option value="10">Category 10</option>
            <option value="11">Category 11</option>
            <option value="12">Category 12</option>
            <option value="13">Category 13</option>
            <option value="14">Category 14</option>
            <option value="15">Category 15</option>
            <option value="16">Category 16</option>
            <option value="17">Category 17</option>
          </select>
        </div>

        <div className="User">
          {localStorage.getItem("userLoggedIn") ? (
            <NavLink onClick={handleLogout}>Logout</NavLink>
          ) : (
            <NavLink to="/Login">Login</NavLink>
          )}
          <NavLink to="/My_profile">
            Profile
          </NavLink>
        </div>
      </div>

      <div className="book_list">
        {books.length > 0 &&
          books.map((book) => {
            const bookId = book._id;
            const isIssued = issuedBooks[bookId]?.issued;
            const dueDate = issuedBooks[bookId]?.dueDate;

             // Add category handling
            const hasValidCategory = book.Category.some(cat => cat >= 1 && cat <= 16);
            const displayedCategories = hasValidCategory ? book.Category : [17];


            return (
              <div key={bookId} id={`book-${bookId}`} className="book_item">
                <div>
                  <h5>{book.Book_title}</h5>
                  <p>Author: {book.Author}</p>
                  <p>Category: {book.Category && book.Category.length > 0 ? book.Category.join(", ") : "17"}</p>
                  <p>Quantity: {book.Quantity}</p>
                  <p>
                    Status:
                    {book.Quantity >= 1 ? (
                      <span className="badge bg-success"> Available</span>
                    ) : (
                      <span className="badge bg-danger"> Unavailable</span>
                    )}
                  </p>

                  <div className="Book_issue">
                    <div className="Issue">
                      <p>Book Issue Status:</p>
                      <button
                        type="button"
                        onClick={() => handleIssueBook(bookId)}
                        className="Want_book"
                        disabled={isIssued}
                      >
                        {isIssued ? `Issued` : "Issue Now"}
                      </button>
                    </div>
                  </div>
                </div>

                <img
                  src="https://m.media-amazon.com/images/I/61O5SsbL8HL.jpg"
                  alt="Book cover"
                />
              </div>
            );
          })}
      </div>

      <div className="middlepart container">
        <div className="content"  data-aos-delay="1000">
          <h1>CISKS library</h1>
          <p className="about_library">
              Welcome to the CISKS Library, a comprehensive knowledge hub designed 
              to support students, faculty, and researchers. Our library provides 
              access to a vast collection of physical resources to enhance learning.
          </p>
        </div>
        <img src="/Book_img/Book.png"  data-aos-delay="1100" alt="Book img" />
      </div>

      <Library_book />
      <Book_slider />
    </div>
  );
}

export default Book;