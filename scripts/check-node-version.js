const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const requiredVersion = fs.readFileSync(path.join(__dirname, '..', '.nvmrc'), 'utf8').trim();
const currentVersion = process.version.slice(1);

if (currentVersion !== requiredVersion) {
  console.error(`❌ Node.js version mismatch. Required: ${requiredVersion}, Current: ${currentVersion}`);
  console.log('\nTo fix this, run:');
  console.log(`nvm install ${requiredVersion}`);
  console.log(`nvm use ${requiredVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js version ${currentVersion} matches required version ${requiredVersion}`); 
