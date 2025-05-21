import express from 'express';
import jwt from "jsonwebtoken";
import Students from "../models/Reg_students.js";

const router = express.Router();

router.get('/', async (req, res) => {

  const JWT_SECRET = process.env.JWT_SECRET;
  // console.log("JWT_SECRET Admin : ", JWT_SECRET);

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    const user = await Students.findById(decoded.id);
    
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
