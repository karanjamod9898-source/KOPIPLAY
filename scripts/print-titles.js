const fs = require('fs');
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

games.forEach((g, i) => {
  console.log(`${i + 1}. [${g.id}] "${g.title}"`);
});

