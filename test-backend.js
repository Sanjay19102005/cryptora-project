// Test script to start and verify backend
import { spawn } from 'child_process';
import http from 'http';

console.log('🚀 Starting backend server test...');

const backend = spawn('node', ['backend/server.js'], {
  cwd: process.cwd(),
  shell: true,
  stdio: 'inherit'
});

// Wait for server to start
setTimeout(async () => {
  console.log('\n🧪 Testing backend endpoints...\n');
  
  // Test health endpoint
  testEndpoint('GET', '/api/health', null, (data) => {
    console.log('✅ Health check passed:', data);
  });
  
  // Test signup endpoint
  testEndpoint('POST', '/api/users/signup', {
    username: 'testuser',
    email: 'test@example.com',
    password: 'test123'
  }, (data) => {
    console.log('✅ Signup test:', data);
  });
  
}, 3000);

function testEndpoint(method, path, body, callback) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        callback(jsonData);
      } catch (e) {
        console.log('Response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`❌ ${method} ${path} failed:`, error.message);
  });

  if (body) {
    req.write(JSON.stringify(body));
  }
  
  req.end();
}

process.on('SIGINT', () => {
  console.log('\n🛑 Stopping backend...');
  backend.kill();
  process.exit();
});

