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
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  issuedBooks: [issuedBookSchema],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Students = mongoose.model('Student', studentSchema, 'registers');
export default Students;