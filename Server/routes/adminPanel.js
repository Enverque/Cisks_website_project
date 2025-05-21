import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import verifyAdmin from '../middleware/adminAuth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', verifyAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});


export default router;
