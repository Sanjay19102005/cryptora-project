import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CRYPTORA Backend is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'CRYPTORA Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      signup: 'POST /api/users/signup',
      login: 'POST /api/auth/login',
      verifyOTP: 'POST /api/auth/verify-otp',
      resendOTP: 'POST /api/users/resend-otp'
    }
  });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptora';

// Start server immediately
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('='.repeat(50));
  console.log('🚀 CRYPTORA Backend Server');
  console.log('='.repeat(50));
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log('');
  
  // Try to connect to MongoDB (non-blocking)
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 3000,
    socketTimeoutMS: 3000,
  })
    .then(() => {
      console.log('✅ Connected to MongoDB');
      console.log(`📊 Database: ${MONGODB_URI.split('@').pop() || MONGODB_URI}`);
    })
    .catch((error) => {
      console.warn('⚠️  MongoDB connection failed:', error.message);
      console.log('⚠️  Server running in development mode without database');
      console.log('⚠️  Note: Some features require MongoDB');
      console.log('⚠️  To enable MongoDB, ensure it is running and update MONGODB_URI in .env');
    });
  
  console.log('');
  console.log('='.repeat(50));
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.error(`   Please stop the process using port ${PORT} or change PORT in .env`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});

// Export connection status
export default app;
