const fs = require('fs');
const content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
const lines = content.split('\n');
for (let i = 1445; i <= 1520; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

