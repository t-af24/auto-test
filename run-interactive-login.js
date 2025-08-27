#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

console.log('🚀 Akiflow Interactive Login Test');
console.log('================================\n');

console.log('This script will run the interactive login test in headed mode.');
console.log('You will be prompted to enter the confirmation code when needed.\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Press Enter to start the test (or Ctrl+C to cancel)...', () => {
  rl.close();
  
  console.log('\n🧪 Starting Playwright test in headed mode...\n');
  
  try {
    // Run the interactive login test in headed mode
    execSync('npx playwright test tests/interactive-login.spec.ts --headed --project=chromium', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
});










