const fs = require('fs');

const b = fs.readFileSync('js/bundle.js', 'utf8');
const lines = b.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('case \'favorites\':') || lines[i].includes('renderFavorites')) {
    console.log(lines.slice(i, i + 35).join('\n'));
    break;
  }
}

