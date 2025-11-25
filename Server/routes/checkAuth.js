import express from 'express';
import jwt from "jsonwebtoken";
import Students from "../models/Reg_students.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;
    
    console.log('🔍 CheckAuth - Cookie received:', !!token);
    
    if (!token) {
      return res.json({ 
        valid: false,
        loggedIn: false 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded for user ID:', decoded.id);
    
    const user = await Students.findById(decoded.id).select("-password");
    
    if (!user) {
      console.log('❌ User not found in database');
      return res.json({ 
        valid: false,
        loggedIn: false 
      });
    }

    console.log('✅ User authenticated:', user.username, 'Role:', user.role);

    // Return BOTH formats for compatibility
    res.json({
      valid: true,
      loggedIn: true,
      userId: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      profilePicture: user.profilePicture || null,
      issuedBooks: user.issuedBooks || [],
      // Legacy format for auth.js
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        issuedBooks: user.issuedBooks || []
      }
    });
  } catch (error) {
    console.error("❌ Check auth error:", error.message);
    res.json({ 
      valid: false,
      loggedIn: false 
    });
  }
});

export default router;