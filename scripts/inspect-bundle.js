const fs = require('fs');
const content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('render') && (l.includes('function') || l.includes('const') || l.includes('class')) || l.includes('/* ===')) {
    console.log(`${i+1}: ${l.trim().substring(0, 90)}`);
  }
});

