# 🚀 CRYPTORA - Final Setup Instructions

## ✅ All Features Implemented

1. ✅ **Exact Logo Display** - Landing page supports logo images (PNG, JPG, SVG)
2. ✅ **OTP Email Verification** - Real email delivery via NodeMailer + Gmail SMTP
3. ✅ **Black Text Inputs** - All input fields have black text with dark gray placeholders
4. ✅ **Backend API** - Node.js + Express + MongoDB
5. ✅ **Full Authentication Flow** - Sign Up → OTP Email → Verify → Login

## 📋 Setup Steps

### Step 1: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB:
  ```bash
  # Windows
  net start MongoDB
  ```

**Option B: MongoDB Atlas (Recommended)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in `backend/.env`

### Step 3: Setup Gmail for OTP Emails

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "CRYPTORA" as the name
   - Copy the generated 16-character password

### Step 4: Configure Backend

Create `backend/.env` file:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/cryptora
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cryptora

# Server
PORT=5000

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=your-email@gmail.com
```

**⚠️ Important:** Use the 16-character App Password, NOT your regular Gmail password!

### Step 5: Add Logo Image

Place your logo image in the `public` folder with one of these names:
- `logo.png` (recommended)
- `cryptora-logo.png`
- `logo.svg`
- `cryptora-logo.svg`
- `logo.jpg`
- `cryptora-logo.jpg`

The landing page will automatically detect and display it. If no logo is found, it will show the text logo.

### Step 6: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 7: Test the Application

1. **Open Browser:** http://localhost:3000
2. **Test Sign Up:**
   - Click "Sign Up"
   - Enter username, email, password
   - Submit form
   - Check your email for OTP
3. **Test Verification:**
   - Enter email and OTP
   - Click "Verify Account"
4. **Test Login:**
   - Enter username and password
   - Click "Access System"
   - Should redirect to dashboard

## 🎯 Features

### Landing Page
- ✅ Displays logo image (if provided)
- ✅ Fallback to text logo
- ✅ Responsive design
- ✅ Neon blue theme
- ✅ Footer description

### Sign Up Page
- ✅ Black text in inputs
- ✅ Dark gray placeholders
- ✅ Light background for visibility
- ✅ Connects to backend API
- ✅ Sends OTP email

### Verification Page
- ✅ OTP input (6 digits)
- ✅ Black text
- ✅ Resend OTP button
- ✅ Email pre-filled from URL
- ✅ Connects to backend API

### Login Page
- ✅ Black text in inputs
- ✅ Sign Up modal
- ✅ Connects to backend API
- ✅ Checks verification status

## 🔧 Troubleshooting

### Email Not Sending

1. **Check App Password:**
   - Make sure you're using the 16-character App Password
   - Not your regular Gmail password

2. **Check .env file:**
   - Verify `EMAIL_USER` is correct
   - Verify `EMAIL_PASS` is the App Password
   - Check for typos

3. **Check Backend Logs:**
   - Look for error messages in backend console
   - Check if email service is verified

### MongoDB Connection Failed

1. **Local MongoDB:**
   - Make sure MongoDB service is running
   - Check connection string in `.env`

2. **MongoDB Atlas:**
   - Check IP whitelist (add 0.0.0.0/0 for testing)
   - Verify connection string
   - Check username and password

3. **Development Mode:**
   - Backend will run without MongoDB (with warnings)
   - Some features won't work without database

### Logo Not Showing

1. **Check File Location:**
   - Logo must be in `public` folder
   - Check file name matches supported names

2. **Check File Format:**
   - Supported: PNG, JPG, SVG
   - Check file extension

3. **Check Browser:**
   - Clear browser cache
   - Check browser console for errors

### Input Text Not Black

1. **Check CSS:**
   - Verify `bg-white/90` class is applied
   - Check if CSS is loading

2. **Check Browser:**
   - Clear browser cache
   - Check browser console

## 📁 Project Structure

```
cryptora/
├── public/              # Logo images go here
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── utils/         # API utilities
│   └── ...
├── backend/
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── utils/         # Email service
│   ├── server.js      # Express server
│   └── .env           # Environment variables
└── ...
```

## 🎉 Ready to Use!

Your CRYPTORA application is now fully set up with:
- ✅ Backend API with MongoDB
- ✅ OTP Email Verification
- ✅ Logo Display
- ✅ Black Input Text
- ✅ Full Authentication Flow

Start both servers and navigate to `http://localhost:3000` to see your application!

## 📧 Support

If you encounter any issues:
1. Check backend console logs
2. Check browser console logs
3. Verify MongoDB connection
4. Verify email configuration
5. Check network tab in browser DevTools

## 🔒 Security Notes

- ⚠️ Never commit `.env` file to git
- ⚠️ Use App Passwords, not regular passwords
- ⚠️ Use environment variables in production
- ⚠️ Enable HTTPS in production
- ⚠️ Use strong passwords for MongoDB

