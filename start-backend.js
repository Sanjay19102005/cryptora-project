// Simple script to start backend server
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const backendDir = join(__dirname, 'backend');

console.log('🚀 Starting CRYPTORA Backend Server...');
console.log('📁 Backend directory:', backendDir);

const backend = spawn('npm', ['run', 'dev'], {
  cwd: backendDir,
  shell: true,
  stdio: 'inherit'
});

backend.on('error', (error) => {
  console.error('❌ Failed to start backend:', error);
});

backend.on('exit', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Stopping backend server...');
  backend.kill();
  process.exit();
});

