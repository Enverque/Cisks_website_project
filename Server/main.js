import express from "express";
import path from "path";
import bcrypt from "bcryptjs";
import cors from "cors";
import { fileURLToPath } from "url";
import "./Database/connection.js";
import Books_collection from './models/Books_collection.js';
import Students from "./models/Reg_students.js";
import IssueModel  from "./models/issue.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cron from "node-cron";
import nodemailer from 'nodemailer';  // Changed from emailjs
import issueBookRouter from './routes/issueBook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = "yourSuperSecretKey";
const app = express();
const Port = process.env.PORT || 3000;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ciskslibrary@iiti.ac.in',
    pass: 'fdupbakyzrjnloky',
  },
  logger: true,
  debug: process.env.NODE_ENV !== 'production'
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


// Temporary storage for OTPs (Consider using a database in production)
const otpStore = {}; 

// Generate a random 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// Send OTP via Nodemailer
app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
      from: "CISKS Library <cisks@iiti.ac.in>",
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

// ✅ GET Books Collection
app.get("/api/Books_collection", async (req, res) => {
  try {
    const books = await Books_collection.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Register Route
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

// ✅ Login Route
app.post("/api/Login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const user = await Students.findOne({ username: trimmedUsername });
    if (!user) return res.status(404).send("User not found. Please register first.");

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) return res.status(401).send("Incorrect password");

    // Generate token
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



// ✅ Issue Book Route (with dueDate and returned)
// ✅ Corrected Issue Book Route
app.post('/api/issueBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Validation
    if (!userId || !bookId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Parallel database lookups
    const [student, book] = await Promise.all([
      Students.findById(userId),
      Books_collection.findById(bookId)
    ]);

    // Error handling
    if (!student) return res.status(404).json({ error: 'User not found' });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.Quantity <= 0) return res.status(400).json({ error: 'Book out of stock' });

    // Check existing issues
    const hasBook = student.issuedBooks.some(b => 
      b.bookId.toString() === bookId && !b.returned
    );
    if (hasBook) return res.status(400).json({ error: 'Book already issued' });

    // Date calculations
    const issueDate = new Date();
    const dueDate = new Date(issueDate.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 days

    // Create book data for Students collection
    const bookData = {
      bookId: book._id,
      Book_title: book.Book_title,
      Author: book.Author,
      Category: book.Category,
      issueDate: issueDate,

      dueDate: dueDate,
      returned: false,
      status: "issued"
    };

    // Create data for IssuedBooks collection
    const newIssuedBook = new IssueModel({
      userName: student.name,
      userId: student._id,       // Use ObjectId
      bookId: book._id,          // Use ObjectId
      title: book.Book_title,
      author: book.Author,
      Category: book.Category,   // Now matches array type
      issueDate: issueDate,
      dueDate: dueDate,          // Add dueDate
    });

    // Perform all database updates
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

// ✅ Return Book Route
// ✅ Return Book Route
app.post('/api/returnBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    // Update user's book status
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

    // Update book quantity
    await Books_collection.findByIdAndUpdate(
      bookId,
      { $inc: { Quantity: 1 } }
    );

    // Remove the returned book from the issuedBooks collection
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


// ✅ Auth Check Route
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

// ✅ Get User's Issued Books Route
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

// ✅ Logout Route
app.post("/api/Logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
});




// Updated Reset Password Route
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    // Find user by email (assuming username is email)
    const user = await Students.findOne({ username: email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Students.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ error: "Server error during reset" });
  }
});






// ✅ Cron Job  for Sending Emails Every 2min (Updated with Nodemailer)
cron.schedule('*/2 * * * *', async () => {
  console.log('Checking for due books...');
  const today = new Date();

  try {
    const students = await Students.find({ "issuedBooks.0": { $exists: true } });

    for (const student of students) {
      for (const book of student.issuedBooks) {
        if (!book.returned && book.dueDate <= today) {
          const mailOptions = {
            from: `CISKS Library System <${process.env.EMAIL_USER}>`,
            to: student.username, // Changed to use email field instead of username
            subject: 'Book Return Reminder',
            text: `Hi ${student.name},\n\nThis is a reminder to return the book "${book.Book_title}".\nIt was due on ${new Date(book.dueDate).toLocaleDateString('en-GB')}.\n\nPlease return it at your earliest convenience.\n\nThank you!\nRegards CISKS Team`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h3 style="color: #2c3e50;">Book Return Reminder</h3>
                <p>Hi ${student.name},</p>
                <p>This is a reminder to return the book <strong>"${book.Book_title}"</strong>.</p>
                <p>It is due on ${new Date(book.dueDate).toLocaleDateString('en-GB')}.</p>
                <p>Please return it at your earliest convenience. If you returned then ignore it.</p>
                <p style="margin-top: 30px;">Thank you!</p>
                <p>Regards CISKS Team </p>
              </div>
            `
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log(`Reminder email sent to ${student.username} for book "${book.Book_title}"`);
          } catch (emailError) {
            console.error(`Failed to send reminder to ${student.username}:`, emailError);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

// Serve React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Start Server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
