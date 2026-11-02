const fs = require('fs');
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

const targetIds = [
  'temple-run-25',
  'angry-birds-blast-52',
  'fruit-ninja-34',
  'urus-city-driver-27',
  'charger-city-driver-23',
  'chiron-city-driver-70'
];

targetIds.forEach(id => {
  const found = games.find(g => g.id === id);
  if (found) {
    console.log(`FOUND: [${found.id}] "${found.title}" | Slug: ${found.slug} | URL: ${found.gameUrl}`);
  } else {
    console.log(`MISSING: ${id}`);
  }
});

