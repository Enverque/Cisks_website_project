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

// Import models and utilities
import transporter from './config/mailer.js';
import checkDueBooks from "./config/checkDueBooks.js";
import Event from './models/Events.js';
import Students from "./models/Reg_students.js";
import Books_collection from './models/Books_collection.js';
import IssueModel from "./models/issue.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cron from 'node-cron'; 



const app = express();
const Port = process.env.PORT || 3000;  
const JWT_SECRET = process.env.JWT_SECRET;
// console.log("JWT_SECRET Main: ", JWT_SECRET);




// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());


// Static files
app.use('/events', express.static(path.join(__dirname, '../public/events')));


// Mount routers
app.use('/api/latest-events', latestEventsRouter);
app.use('/api/updated-events',updatedEventsRouter);
app.use('/api/carousel-events',carouselEventsRouter);
app.use('/api/gallery-events', galleryEventsRouter);
app.use("/api/program-events", programEventsRouter);
app.use('/api/newbook-events',newbookEventsRouter);
app.use('/api/booktitle-events',booktitleEventsRouter);
app.use('/api/homeslider-events',homesliderEventsRouter);
app.use('/api/events', allEventsRouter);
app.use("/api/Books_collection",booksCollectionRouter);
app.use('/api/user',userBooksRouter);
app.use('/api/check-auth',checkAuthRouter);
app.use('/api/verify-admin', verifyAdminRouter);
app.use('/api/check-due-books',checkDueBooksRouter);
app.use('/AdminPanel',adminPanelRouter);
app.use('/api/issueBook', issueBookRouter);

const Staticpath = path.join(__dirname, "../dist");
app.use(express.static(Staticpath));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
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




app.post('/api/events', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, date } = req.body;
    const imagePath = req.file ? `/events/${req.file.filename}` : '';
    
    const newEvent = new Event({ 
      title, 
      content,
      category: category || 'general',
      date: date || Date.now(),
      imagePath 
    });
    
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Delete associated image file
    if (event.imagePath) {
      const imagePath = path.join(__dirname, '../public', event.imagePath);
      try {
        await fs.access(imagePath);
        await fs.unlink(imagePath);
        console.log(`Deleted image: ${imagePath}`);
      } catch (fileError) {
        console.error('Error deleting image file:', fileError);
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
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

    // Find user with case-insensitive search
    const user = await Students.findOne({ 
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') }
    });
    
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    // Determine expiration times based on admin status
    const isAdmin = user.isAdmin;
    const tokenExpiration = isAdmin ? '10m' : '30d'; // JWT expiration
    const maxAge = isAdmin ? 10 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000; // Cookie maxAge
    
    // Include isAdmin in the token payload
    const token = jwt.sign(
      { id: user._id, username: user.username,  isAdmin: user.isAdmin  },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiration }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: maxAge,
    });

    // Send admin status to frontend
    res.status(200).json({ 
      message: "Login successful!",
      isAdmin: user.isAdmin,
      redirectTo: user.isAdmin ? "/AdminPanel" : "/Books",
      sessionDuration: isAdmin ? "10 minutes" : "30 days"
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
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
});