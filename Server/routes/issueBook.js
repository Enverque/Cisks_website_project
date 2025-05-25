import express from 'express';
import Books_collection from "../models/Books_collection.js";
import Students from '../models/Reg_students.js';
import IssueModel from "../models/Issue.js"; 


const router = express.Router();

// Enhanced Issue Book Route with Auto-Email
router.post('/issueBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Validate input
    if (!userId || !bookId) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId and bookId' 
      });
    }

    // Get user and book data
    const [student, book] = await Promise.all([
      Students.findById(userId),
      Books_collection.findById(bookId)
    ]);

    // Error handling
    if (!student) return res.status(404).json({ error: 'User not found' });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.Quantity < 1) return res.status(400).json({ error: 'Book out of stock' });

    // Check existing issues
    const hasBook = student.issuedBooks.some(b => 
      b.bookId.toString() === bookId && !b.returned
    );
    if (hasBook) return res.status(400).json({ error: 'Book already issued' });

    // Create issue record
    const issueDate = new Date();
    const dueDate = new Date(issueDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10din
    const issuedBook = {
      bookId: book._id,
      Book_title: book.Book_title,
      Author: book.Author,
      Category: book.Category, 
      issueDate: issueDate,
      dueDate:dueDate,
      returnDate: null,
      returned: false,
      reminderSent: false,
      status: "issued"
    };


    // Update database
    const [updatedStudent, updatedBook] = await Promise.all([
      Students.findByIdAndUpdate(
        userId,
        { $push: { issuedBooks: issuedBook } },
        { new: true }
      ),
      Books_collection.findByIdAndUpdate(
        bookId,
        { $inc: { Quantity: -1 } },
        { new: true }
      ),
      issuedBook.findByIdAndUpdate(
        userId,
        { $push: { issuedBooks: issuedBook } },
        { new: true }
      )
    ]);

    res.status(201).json({
      message: 'Book issued successfully',
      issuedBook: {
        ...issuedBook,
        issueDate: issueDate.toISOString(), // Standard format
        dueDate: dueDate.toISOString()
      },
      user: updatedStudent,
      book: updatedBook
    });

  } catch (error) {
    console.error('❌ Issue Book Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
});


router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      // Check if user exists
      const user = await Students.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update user's password
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password reset successfully" });
  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Quantity Update Route (unchanged)
router.post('/updateBookQuantity', async (req, res) => {
  const { bookId, change } = req.body;

  if (!bookId || typeof change !== 'number') {
    return res.status(400).json({ error: "Invalid data provided" });
  }

  try {
    const updatedBook = await Books_collection.findByIdAndUpdate(
      bookId,
      { $inc: { Quantity: change } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Quantity updated successfully", book: updatedBook });
  } catch (err) {
    console.error('Error updating quantity:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/issue-book", async (req, res) => {
  try {
    const { userName, userId, bookId, title, author, Category } = req.body;

    // Validate input
    if (!userName || !userId || !bookId || !title || !author || !Category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get current date and time
    const now = new Date();
    const issueDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    const issueTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // Create issue record
    const issuedBook = new IssueModel({
      userName,
      userId,
      bookId,
      title,
      author,
      Category,
      issueDate,
      issueTime, // Now properly formatted
    });

    // Save to database
    await issuedBook.save();

    res.status(201).json({ 
      message: "Book issued successfully", 
      issuedBook: {
        ...issuedBook._doc,
        issueTime // Ensure time is included in response
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get Issued Books Route
router.get('/issued-books', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const books = await IssueModel.find({ userId })
      .sort({ issueDate: -1 })
      .lean(); // Return plain JS objects

    // Add explicit time formatting
    const formattedBooks = books.map(book => ({
      ...book,
      issueTime: new Date(book.issueDate).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }));

    res.json(formattedBooks);
  } catch (error) {
    console.error('Error fetching issued books:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;