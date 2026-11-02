const fs = require('fs');
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

const gmGames = games.filter(g => g.gameUrl.includes('gamemonetize'));
console.log(`Found ${gmGames.length} GameMonetize games:`);
gmGames.forEach((g, i) => {
  console.log(`${i + 1}. [${g.id}] "${g.title}" | Slug: ${g.slug} | URL: ${g.gameUrl}`);
});

