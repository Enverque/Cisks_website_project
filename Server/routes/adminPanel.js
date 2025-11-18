import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import verifyAdmin from '../middleware/adminAuth.js';
import Students from '../models/Reg_students.js';
import Books_collection from '../models/Books_collection.js';
import IssueModel from '../models/Issue.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Existing route - Serve admin panel HTML
router.get('/', verifyAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Get admin dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Verify admin token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && !decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // Get statistics
    const totalStudents = await Students.countDocuments({ role: 'student' });
    const totalAdmins = await Students.countDocuments({ role: 'admin' });
    const totalBooks = await Books_collection.countDocuments();
    const issuedBooks = await IssueModel.countDocuments();
    const lockedAccounts = await Students.countDocuments({
      lockUntil: { $gt: new Date() }
    });

    res.json({
      totalStudents,
      totalAdmins,
      totalBooks,
      issuedBooks,
      lockedAccounts
    });
  } catch (error) {
    console.error("Stats error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Get list of locked users
router.get('/locked-users', async (req, res) => {
  try {
    // Verify admin token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && !decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // Get locked users (accounts with lockUntil in the future)
    const lockedUsers = await Students.find({
      lockUntil: { $gt: new Date() }
    })
    .select('name username role loginAttempts lockUntil lastLogin createdAt')
    .sort({ lockUntil: -1 });

    res.json(lockedUsers);
  } catch (error) {
    console.error("Locked users error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Failed to fetch locked users" });
  }
});

// Unlock a user account
router.post('/unlock-user', async (req, res) => {
  try {
    const { userId } = req.body;

    // Verify admin token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && !decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find user
    const user = await Students.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is actually locked
    if (!user.lockUntil || user.lockUntil < new Date()) {
      return res.status(400).json({ error: "User account is not locked" });
    }

    // Reset login attempts using the model method
    await user.resetLoginAttempts();

    res.json({ 
      message: "User account unlocked successfully",
      user: {
        name: user.name,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Unlock error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    res.status(500).json({ error: "Failed to unlock user" });
  }
});

// Get all users (students and admins) - for admin management
router.get('/all-users', async (req, res) => {
  try {
    // Verify admin token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && !decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { role, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    const query = role ? { role } : {};

    // Get users with pagination
    const users = await Students.find(query)
      .select('name username role isAdmin loginAttempts lockUntil lastLogin createdAt issuedBooks')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Students.countDocuments(query);

    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasMore: skip + users.length < total
      }
    });
  } catch (error) {
    console.error("All users error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get user activity logs (recent logins, book issues, etc.)
router.get('/user-activity/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify admin token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && !decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // Get user details
    const user = await Students.findById(userId)
      .select('name username role loginAttempts lockUntil lastLogin createdAt issuedBooks');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user's book issue history
    const bookHistory = await IssueModel.find({ userId })
      .sort({ issueDate: -1 })
      .limit(10);

    res.json({
      user,
      bookHistory,
      stats: {
        totalBooksIssued: bookHistory.length,
        currentlyIssued: user.issuedBooks.filter(b => !b.returned).length,
        isLocked: user.lockUntil && user.lockUntil > new Date()
      }
    });
  } catch (error) {
    console.error("User activity error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Failed to fetch user activity" });
  }
});

export default router;