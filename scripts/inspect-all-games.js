const fs = require('fs');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
console.log(`Loaded ${games.length} games.`);

games.forEach((g, i) => {
  console.log(`${i + 1}. [${g.id}] "${g.title}" (${g.category}) | Dev: ${g.developer} | URL: ${g.gameUrl}`);
});

