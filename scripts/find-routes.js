const fs = require('fs');

const b = fs.readFileSync('js/bundle.js', 'utf8');
const lines = b.split('\n');

lines.forEach((l, i) => {
  if (l.includes('favorites') && (l.includes('render') || l.includes('route') || l.includes('path') || l.includes('hash'))) {
    console.log(`${i + 1}: ${l.trim().slice(0, 100)}`);
  }
});

