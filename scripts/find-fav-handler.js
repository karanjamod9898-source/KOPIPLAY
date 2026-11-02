const fs = require('fs');

const b = fs.readFileSync('js/bundle.js', 'utf8');
const lines = b.split('\n');
lines.forEach((l, i) => {
  if (l.includes('favorites.push') || l.includes('favorites.filter') || l.includes('data-fav')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});

