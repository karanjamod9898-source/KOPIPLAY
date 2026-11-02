const fs = require('fs');
const content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes("handleRoute") || l.includes("favorites") || l.includes("recent")) {
    if (l.includes("case") || l.includes("function") || l.includes("renderAllGamesView")) {
      console.log(`${i+1}: ${l.trim().substring(0, 90)}`);
    }
  }
});

