import express from 'express';
import jwt from "jsonwebtoken";
import Students from "../models/Reg_students.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;
    
    console.log('🔍 VerifyAdmin - Cookie received:', !!token);
    
    if (!token) {
      return res.json({ 
        valid: false,
        error: "No token provided" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded for user ID:', decoded.id);
    
    const user = await Students.findById(decoded.id).select("-password");
    
    if (!user) {
      console.log('❌ User not found');
      return res.json({ 
        valid: false,
        error: "User not found" 
      });
    }

    // Check if user is admin
    if (user.role !== 'admin' && !user.isAdmin) {
      console.log('❌ User is not admin. Role:', user.role);
      return res.json({ 
        valid: false,
        error: "Admin access required" 
      });
    }

    console.log('✅ Admin verified:', user.username);

    // Return complete user data
    res.json({ 
      valid: true,
      userId: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      isAdmin: true,
      profilePicture: user.profilePicture || null
    });
    
  } catch (error) {
    console.error("❌ VerifyAdmin error:", error.message);
    res.json({ 
      valid: false,
      error: "Invalid token" 
    });
  }
});

export default router;