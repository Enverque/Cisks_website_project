import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const issuedBookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books_collection",
    required: true
  },
  Book_title: String,
  Author: String,
  Category: {
    type: [Number],
    required: true,
  },
  issueDate: Date,
  issueTime: String,
  dueDate: Date,
  returned: {
    type: Boolean,
    default: false
  },
  reminderSent: { 
    type: Boolean, 
    default: false 
  },
  status: {
    type: String,
    default: "issued"
  }
});

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: function() {
      return !this.isGoogleAuth;
    }
  },
  // Role: student or admin
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  // Google OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  isGoogleAuth: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // Login attempt tracking
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  },
  // Existing fields
  issuedBooks: [issuedBookSchema],
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Virtual for checking if account is locked
studentSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to increment login attempts
studentSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, reset attempts
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  // Otherwise increment attempts
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 7 hours
  const maxAttempts = 5;
  const lockTime = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts on successful login
studentSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Method to compare passwords
studentSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

const Students = mongoose.model('Student', studentSchema, 'registers');
export default Students;