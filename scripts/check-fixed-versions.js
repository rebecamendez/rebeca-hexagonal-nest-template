#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

function checkFixedVersions() {
  try {
    // Get all packages in the workspace
    const packages = JSON.parse(execSync('pnpm ls -r --json').toString());
    
    // Check each package's dependencies
    for (const pkg of packages) {
      const deps = {...pkg.dependencies,...pkg.devDependencies};

      // Check each dependency version
      for (const [name, version] of Object.entries(deps)) {
        // Skip if version is null, undefined or not a string
        if (!version || typeof version !== 'string') continue;
        
        if (version.startsWith('^') || version.startsWith('~') || version.startsWith('>') || version.startsWith('<')) {
          console.error(`❌ Found floating version in ${pkg.name}: ${name}@${version}`);
          process.exit(1);
        }
      }
    }

    console.log('✅ All package versions are fixed');
  } catch (error) {
    console.error('Error checking fixed versions:', error.message);
    process.exit(1);
  }
}

checkFixedVersions(); 
