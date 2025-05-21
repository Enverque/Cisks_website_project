import express from 'express';
import Event from '../models/Events.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ category: 'carousel' }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error('[ERROR] /api/carousel-events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
