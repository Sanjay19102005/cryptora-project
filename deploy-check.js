#!/usr/bin/env node

/**
 * CRYPTORA Deployment Checker
 * Validates deployment configuration before deploying
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} exists`, 'green');
    return true;
  } else {
    log(`❌ ${description} missing`, 'red');
    return false;
  }
}

function checkEnvVariable(filePath, varName, description, shouldNotBe = []) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const line = lines.find(l => l.trim().startsWith(varName));
    
    if (!line) {
      log(`❌ ${description}: ${varName} not found in ${filePath}`, 'red');
      return false;
    }
    
    const value = line.split('=')[1]?.trim();
    
    if (!value || value === '') {
      log(`❌ ${description}: ${varName} is empty`, 'red');
      return false;
    }
    
    // Check if value contains placeholder text
    for (const invalid of shouldNotBe) {
      if (value.includes(invalid)) {
        log(`⚠️  ${description}: ${varName} contains placeholder "${invalid}"`, 'yellow');
        log(`   Current value: ${value}`, 'yellow');
        return false;
      }
    }
    
    log(`✅ ${description}: ${varName} is set`, 'green');
    return true;
  } catch (error) {
    log(`❌ Error reading ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('\n' + '='.repeat(60), 'cyan');
  log('🔍 CRYPTORA DEPLOYMENT CHECKER', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');
  
  let allGood = true;
  
  // Check frontend build
  log('📦 FRONTEND BUILD', 'blue');
  const distExists = checkFile(path.join(__dirname, 'dist'), 'dist/ directory');
  const distIndexExists = checkFile(path.join(__dirname, 'dist', 'index.html'), 'dist/index.html');
  
  if (!distExists || !distIndexExists) {
    log('   Run: npm run build', 'yellow');
    allGood = false;
  }
  
  console.log('');
  
  // Check backend .env
  log('🔧 BACKEND CONFIGURATION', 'blue');
  const backendEnvPath = path.join(__dirname, 'backend', '.env');
  const backendEnvExists = checkFile(backendEnvPath, 'backend/.env');
  
  if (backendEnvExists) {
    const mongoValid = checkEnvVariable(
      backendEnvPath,
      'MONGODB_URI',
      'Backend MongoDB URI',
      ['localhost', '127.0.0.1', '<username>', '<password>', 'your-']
    );
    
    if (!mongoValid) {
      log('   ⚠️  Set up MongoDB Atlas: https://cloud.mongodb.com', 'yellow');
      log('   ⚠️  Update backend/.env with your Atlas connection string', 'yellow');
      allGood = false;
    }
  } else {
    allGood = false;
  }
  
  console.log('');
  
  // Check frontend .env.production
  log('🔧 FRONTEND CONFIGURATION', 'blue');
  const frontendEnvPath = path.join(__dirname, '.env.production');
  const frontendEnvExists = checkFile(frontendEnvPath, '.env.production');
  
  if (frontendEnvExists) {
    const apiUrlValid = checkEnvVariable(
      frontendEnvPath,
      'VITE_API_URL',
      'Frontend API URL',
      ['your-backend-url', 'localhost']
    );
    
    if (!apiUrlValid) {
      log('   ⚠️  Deploy backend to Render first', 'yellow');
      log('   ⚠️  Then update .env.production with Render URL', 'yellow');
      allGood = false;
    }
  } else {
    allGood = false;
  }
  
  console.log('');
  log('='.repeat(60), 'cyan');
  
  if (allGood) {
    log('\n✅ ALL CHECKS PASSED! Ready to deploy!', 'green');
    log('\n📝 Next Steps:', 'cyan');
    log('1. Deploy backend to Render (if not already done)', 'white');
    log('2. Update .env.production with Render backend URL', 'white');
    log('3. Rebuild frontend: npm run build', 'white');
    log('4. Deploy frontend: vercel --prod', 'white');
  } else {
    log('\n❌ CHECKS FAILED - Please fix the issues above', 'red');
    log('\n📖 See FINAL_DEPLOYMENT_INSTRUCTIONS.md for detailed steps', 'yellow');
  }
  
  log('='.repeat(60) + '\n', 'cyan');
}

main().catch(console.error);
