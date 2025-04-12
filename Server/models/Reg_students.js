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
  dueDate: Date, // <-- Added dueDate to schedule reminder
  returned: {
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
  issuedBooks: [issuedBookSchema]
});

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Students = mongoose.model("Register", studentSchema);
export default Students;