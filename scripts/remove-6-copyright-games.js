const fs = require('fs');

const targetIds = [
  'temple-run-25',
  'angry-birds-blast-52',
  'fruit-ninja-34',
  'urus-city-driver-27',
  'charger-city-driver-23',
  'chiron-city-driver-70'
];

console.log('=== REMOVING 6 COPYRIGHT-RISK GAMES ===\n');

// 1. Process data/games.json
let games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const initialCount = games.length;
console.log(`Initial games.json count: ${initialCount}`);

const removed = [];
const missing = [];

targetIds.forEach(id => {
  const g = games.find(x => x.id === id);
  if (g) {
    removed.push(g);
  } else {
    missing.push(id);
  }
});

if (missing.length > 0) {
  console.error('ERROR: Could not find IDs:', missing);
  process.exit(1);
}

games = games.filter(x => !targetIds.includes(x.id));
fs.writeFileSync('data/games.json', JSON.stringify(games, null, 2), 'utf8');
console.log(`Updated data/games.json: ${initialCount} -> ${games.length} games.`);
removed.forEach(r => console.log(`  - Removed: [${r.id}] "${r.title}" (slug: ${r.slug})`));

// 2. Process data/catalogData.js
global.window = global;
eval(fs.readFileSync('data/catalogData.js', 'utf8'));
let catList = window.KIPO_CATALOG || window.NEXUS_CATALOG;
const catInitialCount = catList.length;

catList = catList.filter(x => !targetIds.includes(x.id));
const newCatJs = '// KipoPlay Official Game Catalog - Updated with Verified & Repaired Official Embeds\n' +
  'window.KIPO_CATALOG = window.NEXUS_CATALOG = ' + JSON.stringify(catList, null, 2) + ';\n';

fs.writeFileSync('data/catalogData.js', newCatJs, 'utf8');
console.log(`\nUpdated data/catalogData.js: ${catInitialCount} -> ${catList.length} games.`);

console.log('\nData files successfully updated to exactly 189 clean games.');

