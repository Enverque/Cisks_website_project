import { fileURLToPath } from "url";
import path from "path";
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import verifyAdminRouter from './routes/verifyAdmin.js';
import connectDB from './Database/connection.js';
await connectDB();

// Import middlewares
import upload from './middleware/upload.js';
import verifyAdmin from './middleware/adminAuth.js';

// Import routes
import issueBookRouter from './routes/issueBook.js';
import latestEventsRouter from './routes/latestEvents.js';
import updatedEventsRouter from './routes/updatedEvents.js';
import carouselEventsRouter from './routes/carouselEvents.js';
import galleryEventsRouter from './routes/galleryEvents.js';
import programEventsRouter from './routes/programEvents.js';
import newbookEventsRouter from './routes/newbookEvents.js';
import booktitleEventsRouter from './routes/booktitleEvents.js';
import homesliderEventsRouter from './routes/homesliderEvents.js';
import allEventsRouter from './routes/allEvents.js';
import booksCollectionRouter from './routes/booksCollection.js';
import userBooksRouter from './routes/userBooks.js';
import checkAuthRouter from './routes/checkAuth.js';
import checkDueBooksRouter from './routes/checkDueBooks.js';
import adminPanelRouter from './routes/adminPanel.js';
import googleAuthRouter from './routes/googleAuth.js'; // ✅ NEW

// Import models and utilities
import transporter from './config/mailer.js';
import checkDueBooks from "./config/checkDueBooks.js";
import Event from './models/Events.js';
import Students from "./models/Reg_students.js";
import Books_collection from './models/Books_collection.js';
import IssueModel from "./models/Issue.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cron from 'node-cron'; 
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const Port = process.env.PORT || 3000;  
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://cisks.iiti.ac.in", "http://localhost:5173"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Static files
app.use('/events', express.static(path.join(__dirname, '../public/events')));

// Mount routers
app.use('/api/latest-events', latestEventsRouter);
app.use('/api/updated-events', updatedEventsRouter);
app.use('/api/carousel-events', carouselEventsRouter);
app.use('/api/gallery-events', galleryEventsRouter);
app.use("/api/program-events", programEventsRouter);
app.use('/api/newbook-events', newbookEventsRouter);
app.use('/api/booktitle-events', booktitleEventsRouter);
app.use('/api/homeslider-events', homesliderEventsRouter);
app.use('/api/events', allEventsRouter);
app.use("/api/Books_collection", booksCollectionRouter);
app.use('/api/user', userBooksRouter);
app.use('/api/check-auth', checkAuthRouter);
app.use('/api/verify-admin', verifyAdminRouter);
app.use('/api/check-due-books', checkDueBooksRouter);
app.use('/api/AdminPanel', adminPanelRouter);
app.use('/api/issueBook', issueBookRouter);
app.use('/api/auth', googleAuthRouter); //  NEW Google Auth Route

const Staticpath = path.join(__dirname, "../dist");
app.use(express.static(Staticpath));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err.name === 'MulterError') {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

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

// Password validation function
const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    errors: { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar }
  };
};

// Domain validation function
const isValidDomain = (email) => {
  return email.toLowerCase().trim().endsWith('@iiti.ac.in');
};

const isValidStudentId = (email) => {
  const studentIdPattern = /^[a-z]+\d+@iiti\.ac\.in$/i;
  return studentIdPattern.test(email.toLowerCase().trim());
};

const isValidAdminEmail = (email) => {
  const adminEmailPattern = /^[a-z]+@iiti\.ac\.in$/i;
  return adminEmailPattern.test(email.toLowerCase().trim());
};

// Events endpoints
app.post('/api/events', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) throw new Error("No file received");

    const { title, content, category, date } = req.body;
    const imagePath = req.file.path;
    const publicId = req.file.public_id;

    const newEvent = new Event({ 
      title, 
      content,
      category,
      date,
      imagePath,
      publicId
    });

    await newEvent.save();
    res.status(201).json({ 
      success: true,
      event: newEvent,
      imageUrl: imagePath
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.publicId) {
      try {
        await cloudinary.uploader.destroy(event.publicId);
        console.log(`Deleted image from Cloudinary: ${event.publicId}`);
      } catch (cloudErr) {
        console.error('Cloudinary deletion error:', cloudErr);
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event and image deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// OTP endpoints
const otpStore = {};
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = generateOTP();
    otpStore[email] = { 
      otp, 
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

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

    const stored = otpStore[email];
    
    if (!stored) {
      return res.status(400).json({ error: "No OTP found for this email" });
    }
    
    if (Date.now() > stored.expires) {
      delete otpStore[email];
      return res.status(400).json({ error: "OTP has expired" });
    }
    
    if (stored.otp == otp) {
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

// Registration endpoint
// Add this to your main.js - Replace the existing /api/Register endpoint

app.post("/api/Register", async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    
    if (!name || !username || !password || !role) {
      return res.status(400).json({ Message: "All fields are required" });
    }

    if (!name.trim()) {
      return res.status(400).json({ Message: "Name cannot be empty" });
    }

    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ Message: "Invalid role. Must be 'student' or 'admin'" });
    }
    
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Validate @iiti.ac.in domain
    if (!isValidDomain(trimmedUsername)) {
      return res.status(403).json({ 
        Message: "Only @iiti.ac.in email addresses are allowed" 
      });
    }

    // Validate format based on role
    if (role === 'student' && !isValidStudentId(trimmedUsername)) {
      return res.status(400).json({ 
        Message: "Invalid student ID format. Student IDs must contain letters followed by digits (e.g., che230008016@iiti.ac.in)" 
      });
    }

    if (role === 'admin' && !isValidAdminEmail(trimmedUsername)) {
      return res.status(400).json({ 
        Message: "Invalid admin email format. Admin emails must contain only letters before @ (e.g., admin@iiti.ac.in)" 
      });
    }

    // Validate password strength
    const passwordValidation = validatePassword(trimmedPassword);
    if (!passwordValidation.isValid) {
      const missingCriteria = [];
      if (!passwordValidation.errors.minLength) missingCriteria.push("at least 8 characters");
      if (!passwordValidation.errors.hasUpperCase) missingCriteria.push("one uppercase letter");
      if (!passwordValidation.errors.hasLowerCase) missingCriteria.push("one lowercase letter");
      if (!passwordValidation.errors.hasNumber) missingCriteria.push("one number");
      if (!passwordValidation.errors.hasSpecialChar) missingCriteria.push("one special character");
      
      return res.status(400).json({ 
        Message: `Password must contain: ${missingCriteria.join(", ")}`
      });
    }

    const existingUser = await Students.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ Message: "User already exists with this email" });
    }

    const newUser = new Students({ 
      name: name.trim(), 
      username: trimmedUsername, 
      password: trimmedPassword,
      role: role,
      isAdmin: role === 'admin',
      isGoogleAuth: false,
      loginAttempts: 0,
      lockUntil: null
    });
    
    await newUser.save();
    res.status(200).json({ Message: "Registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ Message: "Server error" });
  }
});

// Login endpoint
app.post("/api/Login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    if (!username || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validate @iiti.ac.in domain
    if (!isValidDomain(trimmedUsername)) {
      return res.status(403).json({ 
        error: "Only @iiti.ac.in email addresses are allowed" 
      });
    }

    // Validate format based on role
    if (role === 'student' && !isValidStudentId(trimmedUsername)) {
      return res.status(400).json({ 
        error: "Invalid student ID format. Use: prefix + digits (e.g., che230008016@iiti.ac.in)" 
      });
    }

    if (role === 'admin' && !isValidAdminEmail(trimmedUsername)) {
      return res.status(400).json({ 
        error: "Invalid admin email format. Use: name only (e.g., admin@iiti.ac.in)" 
      });
    }

    // Find user
    const user = await Students.findOne({ 
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') }
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if account is locked
    if (user.isLocked) {
      const lockTimeRemaining = Math.ceil((user.lockUntil - Date.now()) / (1000 * 60 * 60));
      return res.status(423).json({ 
        error: `Account is locked due to too many failed login attempts. Try again in ${lockTimeRemaining} hours.` 
      });
    }

    // Verify role matches
    if (user.role !== role) {
      // Increment attempts for role mismatch too
      await user.incLoginAttempts();
      return res.status(403).json({ 
        error: `This account is registered as ${user.role}, not ${role}. Please select the correct role.` 
      });
    }

    // Check if user registered with Google
    if (user.isGoogleAuth && !user.password) {
      return res.status(400).json({ 
        error: "This account uses Google Sign-In. Please login with Google." 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      // Calculate remaining attempts
      const attemptsLeft = 5 - (user.loginAttempts + 1);
      
      if (attemptsLeft <= 0) {
        return res.status(401).json({ 
          error: "Too many failed attempts. Your account has been locked for 7 hours.",
          attemptsLeft: 0
        });
      }
      
      return res.status(401).json({ 
        error: "Invalid password",
        attemptsLeft: attemptsLeft
      });
    }

    // Password is correct - reset login attempts
    if (user.loginAttempts > 0 || user.lockUntil) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    const isAdmin = user.role === 'admin';
    const tokenExpiration = isAdmin ? '10m' : '15d'; 
    const maxAge = isAdmin ? 10 * 60 * 1000 : 15 * 24 * 60 * 60 * 1000; 
    
    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username, 
        role: user.role,
        isAdmin: isAdmin 
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiration }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge,
    });

    res.status(200).json({ 
      message: "Login successful!",
      role: user.role,
      isAdmin: isAdmin,
      redirectTo: isAdmin ? "/AdminDashboard" : "/StudentDashboard",
      sessionDuration: isAdmin ? "10 minutes" : "15 days"
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
});

// Book issue endpoint
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
    const dueDate = new Date(issueDate.getTime() + 10 * 24 * 60 * 60 * 1000);

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
        issueDate: issueDate.toDateString(),
        dueDate: dueDate.toDateString(),
      }
    });
  } catch (error) {
    console.error('Issue book error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message
    });
  }
});

// Return book endpoint
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
      message: 'Book returned successfully!',
      returnedBook: user.issuedBooks.find(b => b.bookId.toString() === bookId)
    });
  } catch (error) {
    console.error('Return error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user books
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

// Logout endpoint
app.post("/api/Logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Logged out successfully" });
});

// Reset password endpoint
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    const passwordValidation = validatePassword(newPassword.trim());
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        error: "Password must contain at least 8 characters, uppercase, lowercase, number, and special character" 
      });
    }

    const user = await Students.findOne({ username: email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isGoogleAuth && !user.password) {
      return res.status(400).json({ 
        error: "This account uses Google Sign-In and cannot reset password this way" 
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Students.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ error: "Server error during reset" });
  }
});

// Catch-all route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});