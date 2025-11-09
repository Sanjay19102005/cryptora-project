# CRYPTORA - Complete Setup & Run Guide

## 🎯 Project Overview
**CRYPTORA** is a Cyber-Forensic Tool Simulation platform for mapping anonymous TOR paths. This is a full-stack web application with:
- **Frontend**: React + Vite + TailwindCSS (Port 3000)
- **Backend**: Node.js + Express + MongoDB (Port 5000)

---

## 📁 Project Structure
```
tnpolice/
├── backend/              # Backend API server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utilities (email, dev store)
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env             # Backend configuration
├── src/                 # Frontend source code
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── utils/          # Utilities (API, auth)
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── dist/               # Build output
├── package.json        # Frontend dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
└── START_SERVERS.bat   # Quick start script (Windows)
```

---

## ✅ Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (optional for development - app works without it)

---

## 🚀 Quick Start (Windows)

### Option 1: Double-click to Run
Simply double-click `START_SERVERS.bat` in the project root folder.
This will open two command windows:
1. Backend server on http://localhost:5000
2. Frontend server on http://localhost:3000

### Option 2: Manual Start

#### Step 1: Install Dependencies (First time only)
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### Step 2: Start Backend Server
Open a new terminal/command prompt:
```bash
cd backend
npm start
```
You should see:
```
🚀 CRYPTORA Backend Server
==================================================
📍 Server running on port 5000
📡 API endpoints available at /api
🔍 Health check: /api/health
🌍 Environment: development
==================================================
```

#### Step 3: Start Frontend Server
Open another terminal/command prompt:
```bash
npm run dev
```
You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

#### Step 4: Open in Browser
Navigate to: **http://localhost:3000**

---

## 🌐 API Endpoints

### Health Check
- **GET** `http://localhost:5000/api/health`

### User Authentication
- **POST** `/api/users/signup` - Create new account
- **POST** `/api/auth/login` - Login to account
- **POST** `/api/auth/verify-otp` - Verify OTP
- **POST** `/api/users/resend-otp` - Resend OTP

---

## 🔧 Configuration

### Backend Configuration (backend/.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cryptora
NODE_ENV=development

# Optional: Email configuration for OTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

### Frontend Configuration
- Vite dev server runs on port 3000
- Proxy configured to forward `/api` requests to backend (port 5000)
- No additional configuration needed

---

## 📱 Features

### Authentication Flow
1. **Sign Up** → Enter username, email, password
2. **Verification** → Enter 6-digit OTP (displayed in console in dev mode)
3. **Login** → Access dashboard with credentials

### Dashboard Features
- Topology Simulation
- Activity Correlation
- Probable Origin IP Detection
- Forensic Report Generation

---

## 🐛 Troubleshooting

### Port Already in Use
**Error**: "Port 5000 is already in use"

**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F
```

### Frontend Can't Connect to Backend
1. Make sure backend is running on port 5000
2. Check: http://localhost:5000/api/health
3. Verify CORS is not blocking (already configured)

### MongoDB Connection Failed
The app works WITHOUT MongoDB! It uses in-memory storage in development mode.
- OTPs are logged to console
- User data persists only while server is running

### Module Not Found Errors
```bash
# Reinstall dependencies
npm install
cd backend
npm install
```

---

## 📦 Build for Production

### Frontend Build
```bash
npm run build
```
Output: `dist/` folder

### Backend Build
No build required. Node.js runs directly.

---

## 🎨 Responsive Design
The application is fully responsive:
- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Adjusted spacing and components
- **Mobile**: Optimized for small screens with collapsible navigation

---

## 🔐 Development Mode Features
- In-memory user storage (no MongoDB required)
- OTP displayed in console
- Auto-restart on file changes (backend with `--watch`)
- Hot module replacement (frontend with Vite)

---

## 📝 Testing the Application

### 1. Sign Up Flow
1. Go to http://localhost:3000
2. Click "Sign Up" or navigate to signup page
3. Enter: username, email, password
4. Check console for OTP (6-digit code)
5. Go to verification page
6. Enter email and OTP
7. Account verified!

### 2. Login Flow
1. Go to login page
2. Enter username and password
3. Click "Access System"
4. Redirected to dashboard

### 3. API Testing
Test backend health:
```bash
curl http://localhost:5000/api/health
```

Test signup:
```bash
curl -X POST http://localhost:5000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

---

## 🛠️ Technology Stack

### Frontend
- React 18.2
- React Router 6.20
- Vite 5.0
- TailwindCSS 3.3
- Lucide Icons
- Recharts (for data visualization)

### Backend
- Node.js
- Express 4.18
- MongoDB (optional)
- Mongoose 8.0
- bcryptjs (password hashing)
- nodemailer (email OTP)
- CORS enabled

---

## 📞 Support
If you encounter any issues:
1. Check console for error messages
2. Verify both servers are running
3. Clear browser cache
4. Restart both servers

---

## 🎉 You're All Set!
The application should now be running on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Enjoy using CRYPTORA! 🚀🔐
