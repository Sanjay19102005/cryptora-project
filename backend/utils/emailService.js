import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  const emailUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const emailPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.APP_PASSWORD;

  if (!emailUser || !emailPass) {
    console.warn('⚠️  Email credentials not configured. Email sending will fail.');
    console.warn('⚠️  Set EMAIL_USER and EMAIL_PASS (or APP_PASSWORD) in .env file');
    return null;
  }

  // Use Gmail SMTP or other email service
  // For Gmail, you need to enable "Less secure app access" or use App Password
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      rejectUnauthorized: false // For development only
    }
  });

  return transporter;
};

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.error('❌ Email transporter not configured');
      return { 
        success: false, 
        error: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env file' 
      };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'cryptora@example.com',
      to: email,
      subject: 'CRYPTORA - Email Verification OTP',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #0B1C2C;
              color: #ffffff;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #1a1a2e;
              border: 2px solid #00C3FF;
              border-radius: 10px;
              padding: 30px;
            }
            .logo {
              text-align: center;
              color: #00C3FF;
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .otp-box {
              background-color: #0B1C2C;
              border: 2px solid #00C3FF;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #00C3FF;
              letter-spacing: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">CRYPTORA</div>
            <h2>Email Verification</h2>
            <p>Thank you for signing up for CRYPTORA. Please use the following OTP to verify your email address:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
            <div class="footer">
              <p>© 2024 CRYPTORA | Cyber Forensics Platform</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        CRYPTORA - Email Verification
        
        Your OTP is: ${otp}
        
        This OTP will expire in 10 minutes.
        
        If you didn't request this verification, please ignore this email.
        
        © 2024 CRYPTORA
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Verify transporter (for testing)
export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server is ready');
    return true;
  } catch (error) {
    console.error('❌ Email server verification failed:', error);
    return false;
  }
};

