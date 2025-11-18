// Replace your existing routes/googleAuth.js

import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import Students from '../models/Reg_students.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const isValidDomain = (email) => {
  return email.toLowerCase().trim().endsWith('@iiti.ac.in');
};

const isValidStudentId = (email) => {
  const studentIdPattern = /^[a-z]+\d+@iiti\.ac\.in$/i;
  return studentIdPattern.test(email.toLowerCase().trim());
};

const isValidAdminEmail = (email) => {
  const adminEmailPattern = /^[a-z]+@iiti\.ac\.in$/i;
  return adminEmailPattern.test(email.toLowerCase().trim());
};

router.post('/google', async (req, res) => {
  try {
    const { token, email, name, picture, role } = req.body;

    if (!token || !email || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!isValidDomain(email)) {
      return res.status(403).json({ 
        error: 'Only @iiti.ac.in email addresses are allowed' 
      });
    }

    // Validate email format based on role
    if (role === 'student' && !isValidStudentId(email)) {
      return res.status(400).json({ 
        error: 'Invalid student ID format. Student IDs must contain letters followed by digits' 
      });
    }

    if (role === 'admin' && !isValidAdminEmail(email)) {
      return res.status(400).json({ 
        error: 'Invalid admin email format. Admin emails must contain only letters' 
      });
    }

    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (verifyError) {
      console.error('Token verification error:', verifyError);
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const googleEmail = payload.email;
    const googleId = payload.sub;

    if (!isValidDomain(googleEmail)) {
      return res.status(403).json({ 
        error: 'Only Institute email addresses are allowed' 
      });
    }

    let user = await Students.findOne({ 
      $or: [
        { username: googleEmail },
        { googleId: googleId }
      ]
    });

    if (!user) {
      // Create new user with specified role
      user = new Students({
        name: name || payload.name,
        username: googleEmail,
        email: googleEmail,
        googleId: googleId,
        profilePicture: picture || payload.picture,
        isGoogleAuth: true,
        isVerified: true,
        role: role,
        isAdmin: role === 'admin',
        loginAttempts: 0,
        lockUntil: null,
        lastLogin: new Date()
      });
      
      await user.save();
      console.log('New Google user created:', user.username, 'Role:', user.role);
    } else {
      // Check if existing user's role matches
      if (user.role !== role) {
        return res.status(403).json({ 
          error: `This account is registered as ${user.role}. Please select the correct role.` 
        });
      }

      // Check if account is locked
      if (user.isLocked) {
        const lockTimeRemaining = Math.ceil((user.lockUntil - Date.now()) / (1000 * 60 * 60));
        return res.status(423).json({ 
          error: `Account is locked due to too many failed login attempts. Try again in ${lockTimeRemaining} hours.` 
        });
      }

      // Update existing user
      if (!user.googleId) {
        user.googleId = googleId;
        user.isGoogleAuth = true;
        user.profilePicture = picture || payload.picture || user.profilePicture;
      }
      
      // Reset login attempts on successful Google login
      if (user.loginAttempts > 0 || user.lockUntil) {
        await user.resetLoginAttempts();
      }
      
      user.lastLogin = new Date();
      await user.save();
      console.log('Existing user logged in via Google:', user.username);
    }

    const isAdmin = user.role === 'admin';
    const tokenExpiration = isAdmin ? '10m' : '15d';
    const maxAge = isAdmin ? 10 * 60 * 1000 : 15 * 24 * 60 * 60 * 1000;

    const jwtToken = jwt.sign(
      { 
        id: user._id,
        username: user.username,
        role: user.role,
        isAdmin: isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiration }
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: maxAge
    });

    res.status(200).json({
      message: 'Login successful',
      name: user.name,
      username: user.username,
      role: user.role,
      isAdmin: isAdmin,
      profilePicture: user.profilePicture,
      redirectTo: isAdmin ? '/AdminDashboard' : '/StudentDashboard',
      sessionDuration: isAdmin ? '10 minutes' : '15 days'
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;