import express from 'express';
import Books_collection from '../models/Books_collection.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Books_collection.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
