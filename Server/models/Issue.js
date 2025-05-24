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
  Category: [Number], 
  issueDate: Date,    
  dueDate: Date       
}, {
  timestamps: true,
});

const IssueModel = mongoose.model('IssuedBook', issueSchema);
export default IssueModel;
