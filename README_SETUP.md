# CRYPTORA - Complete Setup Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Gmail account (for email OTP)
- npm or yarn

## 🚀 Quick Start

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB
  
  # Linux/Mac
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `backend/.env`

### 4. Setup Email (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Copy the generated password

### 5. Configure Backend

Create `backend/.env` file:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/cryptora

# Server
PORT=5000

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
EMAIL_FROM=your-email@gmail.com
```

### 6. Add Logo Image

Place your logo image in the `public` folder with one of these names:
- `logo.png`
- `cryptora-logo.png`
- `logo.svg`
- `cryptora-logo.svg`
- `logo.jpg`
- `cryptora-logo.jpg`

The landing page will automatically detect and display it.

### 7. Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### 8. Start Frontend Server

In a new terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Features

### ✅ Implemented Features

1. **Exact Logo Display**
   - Supports PNG, JPG, SVG formats
   - Responsive scaling
   - Automatic fallback to text logo

2. **OTP Email Verification**
   - Real email delivery via NodeMailer
   - Gmail SMTP integration
   - 6-digit OTP codes
   - 10-minute expiration
   - Resend OTP functionality

3. **Black Text Inputs**
   - All input fields have black text
   - Dark gray placeholders
   - Light background for visibility

4. **Full Authentication Flow**
   - Sign Up → OTP Email → Verify → Login
   - MongoDB database storage
   - Password hashing with bcrypt
   - Session management

## 📁 Project Structure

```
cryptora/
├── public/                 # Static files (logo goes here)
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── utils/             # Utilities (API, auth)
│   └── ...
├── backend/
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Backend utilities
│   └── server.js          # Express server
└── ...
```

## 🔌 API Endpoints

### POST /api/users/signup
Create account and send OTP email.

### POST /api/users/resend-otp
Resend OTP to user's email.

### POST /api/auth/verify-otp
Verify OTP and activate account.

### POST /api/auth/login
Login with username and password.

## 🐛 Troubleshooting

### Email Not Sending

1. Check Gmail App Password is correct
2. Verify 2-Factor Authentication is enabled
3. Check `.env` file configuration
4. Check backend console for errors

### MongoDB Connection Failed

1. Verify MongoDB is running
2. Check connection string in `.env`
3. For MongoDB Atlas, check IP whitelist
4. Backend will run in dev mode without DB (with warnings)

### Logo Not Showing

1. Verify logo file is in `public` folder
2. Check file name matches supported names
3. Check file format (PNG, JPG, SVG)
4. Clear browser cache

### Input Text Not Visible

1. Check if `bg-white/90` class is applied
2. Verify CSS is loading correctly
3. Check browser console for errors

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```env
MONGODB_URI=mongodb://localhost:27017/cryptora
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## 🚀 Production Build

### Build Frontend
```bash
npm run build
```

### Start Backend (Production)
```bash
cd backend
npm start
```

## 📧 Support

For issues or questions, check:
1. Backend console logs
2. Browser console logs
3. Network tab in browser DevTools
4. MongoDB connection status

## ✅ Testing Checklist

- [ ] Logo displays on landing page
- [ ] Sign up creates account
- [ ] OTP email is received
- [ ] OTP verification works
- [ ] Login works after verification
- [ ] Input text is black and visible
- [ ] All pages load without errors
- [ ] Responsive design works
- [ ] Backend API endpoints work
- [ ] MongoDB connection successful

## 🎉 Ready to Use!

Your CRYPTORA application is now set up and ready to use. Start both servers and navigate to `http://localhost:3000` to see the application.

