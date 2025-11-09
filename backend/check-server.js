// Simple script to check if backend server is running
import fetch from 'node-fetch';

const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ Backend server is running:', data);
    return true;
  } catch (error) {
    console.error('❌ Backend server is not running:', error.message);
    console.log('💡 Please start the backend server with: cd backend && npm run dev');
    return false;
  }
};

checkServer();

