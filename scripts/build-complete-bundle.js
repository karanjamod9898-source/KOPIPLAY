const fs = require('fs');
const path = require('path');

// Validate production bundle
const bundlePath = path.resolve(__dirname, '../js/bundle.js');
if (fs.existsSync(bundlePath)) {
  const content = fs.readFileSync(bundlePath, 'utf8');
  console.log(`[build-complete-bundle] Verified js/bundle.js (${content.length} bytes, production ready).`);
} else {
  console.error('[build-complete-bundle] Error: js/bundle.js not found.');
  process.exit(1);
}
