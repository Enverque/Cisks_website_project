import express from 'express';
import Event from '../models/Events.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ category: 'latest' }).sort({ date: -1 }).limit(5);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
