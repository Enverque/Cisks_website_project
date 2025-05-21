import express from 'express';
import Students from '../models/Reg_students.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await Students.findById(req.params.userId)
      .select('issuedBooks -_id');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.issuedBooks);
  } catch (error) {
    console.error('Error fetching user books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
