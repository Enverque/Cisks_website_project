import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import Students from '../models/Reg_students.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const isValidDomain = (email) => {
  return email.toLowerCase().trim().endsWith('@iiti.ac.in');
};

router.post('/google', async (req, res) => {
  try {
    const { token, email, name, picture } = req.body;

    if (!token || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidDomain(email)) {
      return res.status(403).json({ 
        error: 'Only @iiti.ac.in email addresses are allowed' 
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
        error: 'Only @iiti.ac.in email addresses are allowed' 
      });
    }

    let user = await Students.findOne({ 
      $or: [
        { username: googleEmail },
        { googleId: googleId }
      ]
    });

    if (!user) {
      user = new Students({
        name: name || payload.name,
        username: googleEmail,
        email: googleEmail,
        googleId: googleId,
        profilePicture: picture || payload.picture,
        isGoogleAuth: true,
        isVerified: true,
        isAdmin: false,
        lastLogin: new Date()
      });
      
      await user.save();
      console.log('New Google user created:', user.username);
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
        user.isGoogleAuth = true;
        user.profilePicture = picture || payload.picture || user.profilePicture;
      }
      user.lastLogin = new Date();
      await user.save();
      console.log('Existing user logged in via Google:', user.username);
    }

    const isAdmin = user.isAdmin || false;
    const tokenExpiration = isAdmin ? '10m' : '15d';
    const maxAge = isAdmin ? 10 * 60 * 1000 : 15 * 24 * 60 * 60 * 1000;

    const jwtToken = jwt.sign(
      { 
        id: user._id,
        username: user.username,
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
      isAdmin: isAdmin,
      profilePicture: user.profilePicture,
      redirectTo: isAdmin ? '/AdminPanel' : '/Books',
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