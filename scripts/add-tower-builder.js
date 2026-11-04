const fs = require('fs');

const towerBuilder = {
  id: "tower-builder",
  title: "Tower Builder",
  slug: "tower-builder",
  aliases: [
    "tower-builder-3d",
    "tower-stack-3d"
  ],
  category: "Arcade",
  thumbnail: "assets/images/games/tower-builder.svg",
  fallbackThumbnail: "assets/images/games/default-game.svg",
  description: "Stack moving 3D blocks with precision timing to construct the tallest skyscraper. Slice overhangs, chain perfect placements, trigger combo multipliers, and reach the stratosphere in this addictive arcade classic!",
  gameUrl: "games/tower-builder/index.html",
  embedAllowed: true,
  controls: "Spacebar or Left Click / Touch Tap to drop the moving block. Align with the previous layer for perfect placement combos.",
  featured: true,
  popular: true,
  new: true,
  badge: "NEW",
  technology: "WebGL / Three.js 3D",
  controlsType: "Mouse, Touch & Keyboard",
  tags: [
    "Arcade",
    "3D",
    "Tower",
    "Stacking",
    "Physics",
    "Skill",
    "Casual"
  ],
  developer: "KopiPlay Studios",
  instructions: "Time your drops accurately as the moving 3D block slides across the tower. Any overhanging portion is sliced off by gravity. Consecutive perfect drops reward you with ascending musical chime combos and block size expansion!",
  releaseDate: "2026-11-04",
  isAuthorized: true
};

// 1. Update data/games.json
const gamesJsonPath = 'data/games.json';
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
// Check if already present
const existsInGames = games.some(g => g.slug === 'tower-builder');
if (!existsInGames) {
  // Insert at index 1 (right after neon-racer) or index 0
  games.unshift(towerBuilder);
  fs.writeFileSync(gamesJsonPath, JSON.stringify(games, null, 2), 'utf8');
  console.log(`Updated data/games.json (Total games: ${games.length})`);
}

// 2. Update data/catalogData.js
const catalogJsPath = 'data/catalogData.js';
let catalogJs = fs.readFileSync(catalogJsPath, 'utf8');
const searchHeader = 'window.KOPI_CATALOG = window.KIPO_CATALOG = window.NEXUS_CATALOG = [\n';
if (!catalogJs.includes('"slug": "tower-builder"')) {
  const insertIdx = catalogJs.indexOf(searchHeader);
  if (insertIdx !== -1) {
    const formattedEntry = '  ' + JSON.stringify(towerBuilder, null, 4).split('\n').join('\n  ') + ',\n';
    catalogJs = catalogJs.slice(0, insertIdx + searchHeader.length) + formattedEntry + catalogJs.slice(insertIdx + searchHeader.length);
    fs.writeFileSync(catalogJsPath, catalogJs, 'utf8');
    console.log('Updated data/catalogData.js with Tower Builder');
  }
}

