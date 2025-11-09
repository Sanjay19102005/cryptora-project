// Quick test script for API endpoints
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api';

async function testHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    console.log('✅ Health check:', data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testSignup() {
  try {
    const res = await fetch(`${API_BASE}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'test123'
      })
    });
    const data = await res.json();
    console.log('✅ Signup test:', data);
    return data;
  } catch (error) {
    console.error('❌ Signup test failed:', error.message);
    return null;
  }
}

async function testLogin() {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        password: 'test123'
      })
    });
    const data = await res.json();
    console.log('✅ Login test:', data);
    return data;
  } catch (error) {
    console.error('❌ Login test failed:', error.message);
    return null;
  }
}

// Run tests
console.log('Testing API endpoints...\n');
testHealth().then(() => {
  console.log('\n');
  testSignup().then(() => {
    console.log('\n');
    testLogin();
  });
});

