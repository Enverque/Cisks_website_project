import express from 'express';
import checkDueBooks from '../config/checkDueBooks.js';

const router = express.Router();
const API_KEY = process.env.API_KEY;
const NODE_ENV = process.env.NODE_ENV || 'production'; // Defaults to production 

router.get('/', async (req, res) => {
  try {
    // In production, always require API key for security
    if (NODE_ENV === 'production') {
      if (req.headers['x-api-key'] !== API_KEY) {
        return res.status(403).json({ error: "Unauthorized: Invalid API key" });
      }
    }
    

    const result = await checkDueBooks();
    res.json(result);
  } catch (error) {
    console.error("Manual check error:", error);
    res.status(500).json({ error: "Server error during check" });
  }
});

export default router;
