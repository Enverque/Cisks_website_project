import express from 'express';
import jwt from "jsonwebtoken";
import Students from "../models/Reg_students.js";

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    const user = await Students.findById(decoded.id).select("-password");
    
    if (!user) return res.json({ loggedIn: false });

    res.json({
      loggedIn: true,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        issuedBooks: user.issuedBooks
      }
    });
  } catch (error) {
    console.error("Check auth error:", error);
    res.json({ loggedIn: false });
  }
});


export default router;
