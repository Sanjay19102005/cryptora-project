import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { sendOTPEmail, generateOTP } from '../utils/emailService.js';
import { devStore } from '../utils/devStore.js';

const router = express.Router();

// Helper to check MongoDB connection
const checkMongoDB = () => {
  return mongoose.connection.readyState === 1;
};

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('📝 Signup request:', { username, email });

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username, email, and password' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Check MongoDB connection
    if (!checkMongoDB()) {
      console.warn('⚠️  MongoDB not connected - using development mode');
      
      // Check if user already exists in dev store
      const existingUser = devStore.findUser(username) || devStore.findUser(email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: existingUser.email === email 
            ? 'Email already exists' 
            : 'Username already exists' 
        });
      }
      
      // For development: store user in memory
      const otp = generateOTP();
      const userId = 'dev-' + Date.now();
      
      // Store user in dev store
      const devUser = devStore.addUser({
        id: userId,
        username,
        email,
        password
      });
      
      // Store OTP
      devStore.storeOTP(email, otp);
      
      console.log('📧 Development OTP for', email, ':', otp);
      console.log('👤 Development user created:', username);
      
      // Try to send email
      const emailResult = await sendOTPEmail(email, otp);
      
      return res.status(201).json({
        success: true,
        message: `Account created. OTP: ${otp} (Development mode - MongoDB not connected)`,
        userId: userId,
        emailSent: emailResult.success,
        otp: otp,
        development: true
      });
    }

    // Check if user exists
    let existingUser;
    try {
      existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error. Please check MongoDB connection.' 
      });
    }

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: existingUser.email === email 
          ? 'Email already exists' 
          : 'Username already exists' 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = new User({
      username,
      email,
      password,
      otp,
      otpExpires,
      isVerified: false
    });

    try {
      await user.save();
      console.log('✅ User created:', username);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create account. Database error.' 
      });
    }

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp);

    if (!emailResult.success) {
      // If email fails, still save user but log error
      console.error('Failed to send email, but user created:', emailResult.error);
      console.log('📧 OTP for development:', otp);
      return res.status(201).json({
        success: true,
        message: `Account created. OTP: ${otp} (Email not configured - check console)`,
        userId: user._id,
        emailSent: false,
        otp: otp
      });
    }

    console.log('✅ Email sent to:', email);
    res.status(201).json({
      success: true,
      message: 'Account created. Please check your email for OTP.',
      userId: user._id,
      emailSent: true
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email' 
      });
    }

    if (!checkMongoDB()) {
      // Check if user exists in dev store
      const user = devStore.findUser(email);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      if (user.isVerified) {
        return res.status(400).json({ 
          success: false, 
          message: 'Account already verified' 
        });
      }
      
      const otp = generateOTP();
      devStore.storeOTP(email, otp);
      
      console.log('📧 Development OTP (resend) for', email, ':', otp);
      const emailResult = await sendOTPEmail(email, otp);
      
      return res.json({
        success: true,
        message: `OTP: ${otp} (Development mode)`,
        emailSent: emailResult.success,
        otp: otp,
        development: true
      });
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
        message: 'User not found' 
      });
    }

    if (user.isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: 'Account already verified' 
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp);

    if (!emailResult.success) {
      console.log('📧 OTP for development:', otp);
      return res.json({
        success: true,
        message: `OTP resent. OTP: ${otp} (Email not configured - check console)`,
        emailSent: false,
        otp: otp
      });
    }

    res.json({
      success: true,
      message: 'OTP resent. Please check your email.',
      emailSent: true
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

export default router;
