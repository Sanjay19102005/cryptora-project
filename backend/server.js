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
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"
  ],
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials: false,
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
// Also mount at /api to provide compatibility endpoints like /api/signup and /api/login
app.use('/api', userRoutes);
app.use('/api', authRoutes);

// Alias routes for external clients expecting different paths
app.post('/api/signin', (req, res) => res.redirect(307, '/api/auth/login'));
app.post('/api/verify', (req, res) => res.redirect(307, '/api/auth/verify-otp'));

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

// MongoDB connection - REQUIRED for production
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set');
  console.error('❌ Please set MONGODB_URI in your .env file or Render dashboard');
  console.error('❌ Example: mongodb+srv://username:password@cluster.mongodb.net/cryptora');
  process.exit(1);
}

// Validate that MONGODB_URI is not localhost
if (MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1')) {
  console.error('❌ MONGODB_URI cannot use localhost in production');
  console.error('❌ Please use MongoDB Atlas connection string');
  console.error('❌ Get one from: https://cloud.mongodb.com');
  process.exit(1);
}

// Connect to MongoDB first before starting server
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('');
    console.log('='.repeat(50));
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📊 Database: ${MONGODB_URI.split('@')[1]?.split('/')[0] || 'cryptora'}`);
    console.log('='.repeat(50));
    console.log('');
    
    // Start server only after MongoDB connection
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('🚀 CRYPTORA Backend Server');
      console.log('='.repeat(50));
      console.log(`📍 Server running on port ${PORT}`);
      console.log(`📡 API endpoints available at /api`);
      console.log(`🔍 Health check: /api/health`);
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
  })
  .catch((error) => {
    console.error('');
    console.error('='.repeat(50));
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('='.repeat(50));
    console.error('❌ Please check:');
    console.error('   1. MONGODB_URI is correct in .env or Render dashboard');
    console.error('   2. MongoDB Atlas cluster is running');
    console.error('   3. IP address is whitelisted (use 0.0.0.0/0 for all IPs)');
    console.error('   4. Database user credentials are correct');
    console.error('='.repeat(50));
    console.error('');
    process.exit(1);
  });

// Export connection status
export default app;
