import express from 'express';
import checkDueBooks from '../config/checkDueBooks.js';

const router = express.Router();
const API_KEY = process.env.API_KEY;

router.get('/', async (req, res) => {
  try {
    // Verify API Key for external requests
    if (req.headers['x-api-key'] !== API_KEY && !req.hostname.includes('localhost')) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await checkDueBooks();
    res.json(result);
  } catch (error) {
    console.error("Manual check error:", error);
    res.status(500).json({ error: "Server error during check" });
  }
});

export default router;
