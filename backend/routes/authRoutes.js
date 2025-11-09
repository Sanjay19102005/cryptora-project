import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { devStore } from '../utils/devStore.js';

const router = express.Router();

// Helper to check MongoDB connection
const checkMongoDB = () => {
  return mongoose.connection.readyState === 1;
};

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('🔐 Verify OTP request:', { email, otp });

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and OTP' 
      });
    }

    if (!checkMongoDB()) {
      // Development mode: check in-memory store
      if (devStore.verifyOTP(email, otp)) {
        // Mark as verified in dev store
        devStore.verifyUser(email);
        
        return res.json({
          success: true,
          message: 'Account verified successfully (Development mode)'
        });
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid OTP' 
        });
      }
    }

    let user;
    try {
      user = await User.findOne({ email });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error.' 
      });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Account not found.' 
      });
    }

    if (user.isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: 'Account already verified' 
      });
    }

    // Check if OTP is valid
    if (user.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }

    // Check if OTP expired
    if (user.otpExpires < new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP expired. Please request a new one.' 
      });
    }

    // Verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    console.log('✅ Account verified:', email);
    res.json({
      success: true,
      message: 'Account verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('🔑 Login request:', { username });

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username and password' 
      });
    }

    if (!checkMongoDB()) {
      // Development mode: check in-memory store
      const user = devStore.findUser(username);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Account not found.' 
        });
      }

      // Simple password check for development (in production, use hashed passwords)
      if (user.password !== password) {
        return res.status(401).json({ 
          success: false, 
          message: 'Incorrect password.' 
        });
      }

      if (!user.isVerified) {
        return res.status(403).json({ 
          success: false, 
          message: 'Account not verified.', 
          needsVerification: true,
          email: user.email
        });
      }

      console.log('✅ Login successful (dev mode):', username);
      return res.json({
        success: true,
        message: 'Login successful (Development mode)',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }

    let user;
    try {
      user = await User.findOne({ username });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error. Please check MongoDB connection.' 
      });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Account not found.' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password.' 
      });
    }

    // Check if verified
    if (!user.isVerified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account not verified.', 
        needsVerification: true,
        email: user.email
      });
    }

    console.log('✅ Login successful:', username);
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

export default router;
