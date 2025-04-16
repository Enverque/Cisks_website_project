import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import bcrypt from "bcryptjs";
import cors from "cors";
import { fileURLToPath } from "url";
import "./Database/connection.js";
import Books_collection from './models/Books_collection.js';
import Students from "./models/Reg_students.js";
import IssueModel from "./models/issue.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import issueBookRouter from './routes/issueBook.js';
import cron from 'node-cron'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET;
const API_KEY = process.env.API_KEY;

const app = express();
const Port = process.env.PORT || 3000;

// Updated Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 10
});

// Middleware setup
const Staticpath = path.join(__dirname, "../dist");
app.use(express.static(Staticpath));
app.use(cookieParser());
app.use('/api/issueBook', issueBookRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT"],
  credentials: true
}));

// Function to check due books and send reminders
async function checkDueBooks() {
  console.log('[CRON] Checking due books...');
  const now = new Date();
  
  try {
    const students = await Students.aggregate([
      { $unwind: "$issuedBooks" },
      {
        $match: {
          "issuedBooks.returned": false,
          "issuedBooks.reminderSent": false,
          "issuedBooks.dueDate": {
            $lte: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Books due within next minute
            $gt: now // But not overdue yet
          }
        }
      },
      { 
        $group: { 
          _id: "$_id", 
          issuedBooks: { $push: "$issuedBooks" }, 
          email: { $first: "$username" },
          name: { $first: "$name" } 
        }
      }
    ]);

    console.log(`[CRON] Found ${students.length} students with due books`);

    let sentCount = 0;
    for (const student of students) {
      for (const book of student.issuedBooks) {
        const timeRemaining = book.dueDate - now;
        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));        
        const mailOptions = {
          from: `CISKS Library <${process.env.EMAIL_USER}>`,
          to: student.email,
          subject: 'Book Due Date Reminder',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <div>Hi ${student.name},</div> 
              <p>This is a reminder that your book <strong>"${book.Book_title}"</strong> is due soon:</p>
              <ul>
                <li><strong>Due Date:</strong> ${new Date(book.dueDate).toLocaleString()}</li>
                <li><strong>Time Remaining:</strong> ${daysRemaining} days and ${hoursRemaining} hours</li>              
              </ul>
              <p>Please return or renew the book before the due date to avoid penalties.</p>
              <p style="margin-top: 30px; color: #666;">
                Best regards,<br>
                CISKS Library Team
              </p>
            </div>
          `
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`[CRON] Reminder sent to ${student.email} for book "${book.Book_title}"`);

          await Students.updateOne(
            { _id: student._id, "issuedBooks.bookId": book.bookId },
            { $set: { "issuedBooks.$.reminderSent": true } }
          );
          
          sentCount++;
        } catch (emailError) {
          console.error(`[CRON] Failed to send reminder to ${student.email}:`, emailError);
        }
      }
    }
    
    console.log(`[CRON] Sent ${sentCount} reminders in total`);
    return { success: true, remindersSent: sentCount };
  } catch (error) {
    console.error("[CRON] Error checking due books:", error);
    return { error: "Internal server error", details: error.message };
  }
}

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    console.log('[CRON] Running scheduled due date check...');
    const result = await checkDueBooks();
    console.log('[CRON] Check completed:', result);
  } catch (error) {
    console.error('[CRON] Scheduled check error:', error);
  }
});

const otpStore = {};
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
      from: `CISKS Library <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP for password reset is: ${otp}`,
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully!" });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/api/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    if (otpStore[email] && otpStore[email] == otp) {
      delete otpStore[email];
      res.json({ message: "OTP verified successfully!" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint for manual check of due books
app.get('/api/check-due-books', async (req, res) => {
  try {
    // Verify API Key for external requests
    if (req.headers['x-api-key'] !== API_KEY && !req.hostname.includes('localhost')) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await checkDueBooks();
    res.json(result);
  } catch (error) {
    console.error("Manual check error:", error);
    res.status(500).json({ error: "Server error during check" });
  }
});

app.get("/api/Books_collection", async (req, res) => {
  try {
    const books = await Books_collection.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/Register", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const existingUser = await Students.findOne({ username: trimmedUsername });
    if (existingUser) return res.status(400).json({ Message: "User already exists" });

    const newUser = new Students({ name, username: trimmedUsername, password: trimmedPassword });
    await newUser.save();
    res.status(200).json({ Message: "Registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ Message: "Server error" });
  }
});

app.post("/api/Login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const user = await Students.findOne({ username: trimmedUsername });
    if (!user) return res.status(404).send("User not found. Please register first.");

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) return res.status(401).send("Incorrect password");

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "30d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
});

app.post('/api/issueBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [student, book] = await Promise.all([
      Students.findById(userId),
      Books_collection.findById(bookId)
    ]);

    if (!student) return res.status(404).json({ error: 'User not found' });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.Quantity <= 0) return res.status(400).json({ error: 'Book out of stock' });

    const hasBook = student.issuedBooks.some(b => 
      b.bookId.toString() === bookId && !b.returned
    );
    if (hasBook) return res.status(400).json({ error: 'Book already issued' });

    const issueDate = new Date();
    const dueDate = new Date(issueDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 din 

    const bookData = {
      bookId: book._id,
      Book_title: book.Book_title,
      Author: book.Author,
      Category: book.Category,
      issueDate: issueDate,
      dueDate: dueDate,
      returned: false,
      reminderSent: false,
      status: "issued"
    };

    const newIssuedBook = new IssueModel({
      userName: student.name,
      userId: student._id,
      bookId: book._id,
      title: book.Book_title,
      author: book.Author,
      Category: book.Category,
      issueDate: issueDate,
      dueDate: dueDate,
    });

    await Promise.all([
      Books_collection.findByIdAndUpdate(bookId, { $inc: { Quantity: -1 } }),
      Students.findByIdAndUpdate(userId, { $push: { issuedBooks: bookData } }),
      newIssuedBook.save()
    ]);

    res.status(200).json({ 
      message: 'Book issued successfully!',
      issuedBook: {
        ...bookData,
        issueDate: issueDate.toDateString('en-GB'),
        dueDate: dueDate.toDateString('en-GB'),
      }
    });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.post('/api/returnBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    const user = await Students.findByIdAndUpdate(
      userId,
      {
        $set: {
          "issuedBooks.$[elem].returned": true,
          "issuedBooks.$[elem].status": "returned"
        }
      },
      {
        arrayFilters: [{ "elem.bookId": bookId }],
        new: true
      }
    );

    await Books_collection.findByIdAndUpdate(
      bookId,
      { $inc: { Quantity: 1 } }
    );

    await IssueModel.findOneAndDelete({ userId, bookId });

    res.status(200).json({
      message: 'Book returned successfully and removed from issuedBooks collection!',
      returnedBook: user.issuedBooks.find(b => b.bookId.toString() === bookId)
    });
  } catch (error) {
    console.error('Return error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/check-auth', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Students.findById(decoded.id).select("-password");
    if (!user) return res.json({ loggedIn: false });

    res.json({
      loggedIn: true,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        issuedBooks: user.issuedBooks
      }
    });
  } catch (error) {
    console.error("Check auth error:", error);
    res.json({ loggedIn: false });
  }
});

app.get('/api/user/:userId/books', async (req, res) => {
  try {
    const user = await Students.findById(req.params.userId)
      .select('issuedBooks -_id');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.issuedBooks);
  } catch (error) {
    console.error('Error fetching user books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/Logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
});

app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await Students.findOne({ username: email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Students.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ error: "Server error during reset" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
  console.log(`Cron job scheduled to check due books every minute`);
});