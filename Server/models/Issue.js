import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true 
  },
  bookId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books_collection",
    required: true 
  },
  title: String,
  author: String,
  Category: [Number], // Changed to array to match book collection
  issueDate: Date,    // Use proper Date type
  dueDate: Date       // Add this field for consistency
}, {
  timestamps: true,
});

const IssueModel = mongoose.model('IssuedBook', issueSchema);
export default IssueModel;
