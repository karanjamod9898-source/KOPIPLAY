const fs = require('fs');

let raw = fs.readFileSync('data/games.json', 'utf8');
let games = JSON.parse(raw);
let updatedCount = 0;
games.forEach(g => {
  if (g.developer === 'NexusPlay Arcade') {
    g.developer = 'KipoPlay Arcade';
    updatedCount++;
  }
});
fs.writeFileSync('data/games.json', JSON.stringify(games, null, 2), 'utf8');
console.log(`Updated ${updatedCount} games in data/games.json. Total games: ${games.length}`);

let catData = fs.readFileSync('data/catalogData.js', 'utf8');
catData = catData.replace(/\/\/ NEXUSPLAY Official Game Catalog/g, '// KipoPlay Official Game Catalog');
catData = catData.replaceAll('"developer": "NexusPlay Arcade"', '"developer": "KipoPlay Arcade"');
if (!catData.includes('window.KIPO_CATALOG')) {
  catData = catData.replace('window.NEXUS_CATALOG = [', 'window.KIPO_CATALOG = window.NEXUS_CATALOG = [');
}
if (!catData.includes('window.KIPO_CATEGORIES')) {
  catData = catData.replace('window.NEXUS_CATEGORIES = [', 'window.KIPO_CATEGORIES = window.NEXUS_CATEGORIES = [');
}
fs.writeFileSync('data/catalogData.js', catData, 'utf8');
console.log('Updated data/catalogData.js successfully.');

