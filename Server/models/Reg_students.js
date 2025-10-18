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
      // Password required only if not using Google auth
      return !this.isGoogleAuth;
    }
  },
  // Google OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows null values to be non-unique
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

// Hash password before saving (only for non-Google users)
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

// Method to compare passwords
studentSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    return false; // Google auth users don't have passwords
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

const Students = mongoose.model('Student', studentSchema, 'registers');
export default Students;