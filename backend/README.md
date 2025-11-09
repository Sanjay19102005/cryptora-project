# CRYPTORA Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- MongoDB connection string
- Email SMTP settings (Gmail recommended)

### 3. Gmail Setup (for OTP emails)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Use this password in `EMAIL_PASS` or `APP_PASSWORD` in `.env`

### 4. Start MongoDB
Make sure MongoDB is running:
```bash
# Windows (if installed as service)
net start MongoDB

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### 5. Run the Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST /api/users/signup
Create a new user account and send OTP email.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created. Please check your email for OTP.",
  "userId": "...",
  "emailSent": true
}
```

### POST /api/users/resend-otp
Resend OTP to user's email.

**Request:**
```json
{
  "email": "john@example.com"
}
```

### POST /api/auth/verify-otp
Verify OTP and activate account.

**Request:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### POST /api/auth/login
Login with username and password.

**Request:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

## Development Mode

If MongoDB is not available, the server will start in development mode without database. For production, ensure MongoDB is properly configured.

