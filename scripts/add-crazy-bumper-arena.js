const fs = require('fs');

const crazyBumperArena = {
  id: "crazy-bumper-arena",
  title: "Crazy Bumper Arena",
  slug: "crazy-bumper-arena",
  aliases: [
    "crazy-bumper-arena-3d",
    "bumper-car-battle",
    "bumper-cars-3d"
  ],
  category: "Arcade",
  thumbnail: "assets/images/games/crazy-bumper-arena.svg",
  fallbackThumbnail: "assets/images/games/default-game.svg",
  description: "Smash, bash, and dominate the battleground in Crazy Bumper Arena! Drive customized 3D bumper cars, slam into 5 AI rivals, collect nitro boosts and shields, outlast the match timer, and conquer all 5 vibrant arena battlegrounds!",
  gameUrl: "games/crazy-bumper-arena/index.html",
  embedAllowed: true,
  controls: "WASD or Arrow Keys to steer and accelerate. Spacebar to unleash collected Power-Ups (Nitro, Super Bumper, Shield, Magnet, Shockwave). Escape to pause.",
  featured: true,
  popular: true,
  new: true,
  badge: "NEW",
  technology: "WebGL / Three.js 3D",
  controlsType: "Keyboard, Mouse & Touch",
  tags: [
    "Arcade",
    "Racing",
    "3D",
    "Cars",
    "Battle",
    "Action",
    "Multiplayer",
    "Physics"
  ],
  developer: "KopiPlay Studios",
  instructions: "Choose your bumper car in the 3D garage. Navigate the arena, ram opponents with high-speed elastic collisions, and collect gold coins and mystery power-up orbs. Avoid getting your bumper armor destroyed before the match timer expires!",
  releaseDate: "2026-11-04",
  isAuthorized: true
};

// 1. Update data/games.json
const gamesJsonPath = 'data/games.json';
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
const existsInGames = games.some(g => g.slug === 'crazy-bumper-arena');
if (!existsInGames) {
  // Put at the very beginning of the catalog
  games.unshift(crazyBumperArena);
  fs.writeFileSync(gamesJsonPath, JSON.stringify(games, null, 2), 'utf8');
  console.log(`Updated data/games.json (Total games: ${games.length})`);
} else {
  console.log('Already exists in data/games.json');
}

// 2. Update data/catalogData.js
const catalogJsPath = 'data/catalogData.js';
let catalogJs = fs.readFileSync(catalogJsPath, 'utf8');
const searchHeader = 'window.KOPI_CATALOG = window.KIPO_CATALOG = window.NEXUS_CATALOG = [\n';
if (!catalogJs.includes('"slug": "crazy-bumper-arena"')) {
  const insertIdx = catalogJs.indexOf(searchHeader);
  if (insertIdx !== -1) {
    const formattedEntry = '  ' + JSON.stringify(crazyBumperArena, null, 4).split('\n').join('\n  ') + ',\n';
    catalogJs = catalogJs.slice(0, insertIdx + searchHeader.length) + formattedEntry + catalogJs.slice(insertIdx + searchHeader.length);
    fs.writeFileSync(catalogJsPath, catalogJs, 'utf8');
    console.log('Updated data/catalogData.js');
  }
} else {
  console.log('Already exists in data/catalogData.js');
}

// 3. Update js/bundle.js placeholders: 188+ -> 189+
const bundlePath = 'js/bundle.js';
if (fs.existsSync(bundlePath)) {
  let bundleCode = fs.readFileSync(bundlePath, 'utf8');
  bundleCode = bundleCode.replace(/188\+/g, '189+');
  fs.writeFileSync(bundlePath, bundleCode, 'utf8');
  console.log('Updated search placeholders in js/bundle.js to 189+');
}

// 4. Update index.html cache-buster: v=dark.3.7 -> v=dark.3.8
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml.replace(/v=dark\.3\.7/g, 'v=dark.3.8');
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('Updated index.html cache-buster to v=dark.3.8');
}

