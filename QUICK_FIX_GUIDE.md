# 🚨 Quick Fix Guide - Network Error

## Problem
Getting "Network error. Please check your connection." on Sign In and Sign Up pages.

## Solution Steps

### 1. Start Backend Server

**Open Terminal 1:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📡 API endpoints available at http://localhost:5000/api
```

### 2. Verify Backend is Running

Open browser and go to: http://localhost:5000/api/health

You should see:
```json
{"status":"OK","message":"CRYPTORA Backend is running"}
```

### 3. Start Frontend Server

**Open Terminal 2:**
```bash
npm run dev
```

### 4. Test the Application

1. Go to http://localhost:3000
2. Try to sign up or login
3. Check browser console (F12) for any errors
4. Check backend console for API requests

## Common Issues

### Issue 1: Backend Not Running
**Symptom:** "Cannot connect to server" error

**Solution:**
- Make sure backend is running on port 5000
- Check if port 5000 is already in use
- Verify backend/.env file exists

### Issue 2: MongoDB Not Connected
**Symptom:** Backend starts but shows MongoDB error

**Solution:**
- Install MongoDB or use MongoDB Atlas
- Update MONGODB_URI in backend/.env
- Backend will work without MongoDB (development mode) but data won't persist

### Issue 3: CORS Error
**Symptom:** CORS policy error in browser console

**Solution:**
- Already fixed in backend/server.js
- Make sure CORS is configured correctly
- Restart backend server

### Issue 4: Email Not Sending
**Symptom:** Account created but no email received

**Solution:**
- Configure Gmail App Password in backend/.env
- Check EMAIL_USER and EMAIL_PASS
- For development, OTP will be logged in console if email fails

## Testing Checklist

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend server running on http://localhost:3000
- [ ] Can access http://localhost:5000/api/health
- [ ] No CORS errors in browser console
- [ ] Sign up creates account
- [ ] OTP email received (or logged in console)
- [ ] OTP verification works
- [ ] Login works after verification

## Debug Steps

1. **Check Backend Logs:**
   - Look for API requests in backend console
   - Check for error messages
   - Verify MongoDB connection status

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for API requests

3. **Check Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Try to sign up/login
   - Check if API requests are being made
   - Check response status codes

## Fixed Issues

✅ CORS configuration updated
✅ Better error handling in API service
✅ Response status checking
✅ MongoDB connection error handling
✅ Email service error handling
✅ Clear error messages for users

## Next Steps

1. Start backend server
2. Start frontend server
3. Test sign up flow
4. Test login flow
5. Verify OTP email (or check console for OTP)

