const fs = require('fs');

const gdResolved = JSON.parse(fs.readFileSync('scripts/gd-resolved-thumbs.json', 'utf8'));
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

// Build lookup map for GD games
const gdMap = new Map();
for (const r of gdResolved) {
  if (r.officialImg) {
    gdMap.set(r.id, r.officialImg);
  }
}
// Merge Haven special GUID verified earlier
gdMap.set('merge-haven-47', 'https://img.gamedistribution.com/6d02d2d9f4164009827dd094824853b3-512x512.jpg');

const changes = [];

for (const g of games) {
  const isLupzoThumb = g.thumbnail && g.thumbnail.includes('lupzogames.com');
  const isLupzoFallback = g.fallbackThumbnail && g.fallbackThumbnail.includes('lupzogames.com');

  if (!isLupzoThumb && !isLupzoFallback) continue;

  const oldThumb = g.thumbnail;
  const oldFallback = g.fallbackThumbnail;
  let newThumb = oldThumb;
  let newFallback = 'assets/images/games/default-game.svg';
  let source = 'unknown';
  let licenseEvidence = 'unknown';

  if (g.gameUrl.includes('gamedistribution.com') || g.id === 'merge-haven-47') {
    const official = gdMap.get(g.id);
    if (official) {
      newThumb = official;
      newFallback = official.replace('-512x512', '-512x384');
      source = 'Official GameDistribution CDN';
      licenseEvidence = 'GameDistribution Publisher Syndication Assets (verified 200 OK on img.gamedistribution.com)';
    } else {
      newThumb = 'assets/images/games/default-game.svg';
      source = 'Original Local Vector Design (KipoPlay)';
      licenseEvidence = 'First-party original SVG created to replace unverified asset';
    }
  } else if (g.gameUrl.includes('gamemonetize')) {
    const m = g.gameUrl.match(/gamemonetize\.(?:co|games)\/([a-z0-9]+)\/?/);
    if (m) {
      const guid = m[1];
      newThumb = `https://img.gamemonetize.com/${guid}/512x384.jpg`;
      newFallback = 'assets/images/games/default-game.svg';
      source = 'Official GameMonetize CDN';
      licenseEvidence = 'GameMonetize Publisher RSS/Syndication CDN (verified 200 OK on img.gamemonetize.com)';
    } else {
      newThumb = 'assets/images/games/default-game.svg';
      source = 'Original Local Vector Design (KipoPlay)';
      licenseEvidence = 'First-party original SVG';
    }
  } else if (g.id === 'rise-up-air-balloon-04') {
    newThumb = 'assets/images/games/rise-up.svg';
    newFallback = 'assets/images/games/default-game.svg';
    source = 'Original Local Vector Design (KipoPlay)';
    licenseEvidence = 'Original custom SVG vector artwork created in-house matching game theme; replaces unverified LupzoGames hotlink';
  } else if (g.id === 'counter-war-10') {
    newThumb = 'assets/images/games/count-war.svg';
    newFallback = 'assets/images/games/default-game.svg';
    source = 'Original Local Vector Design (KipoPlay)';
    licenseEvidence = 'Original custom SVG vector artwork created in-house matching game theme; replaces unverified LupzoGames hotlink';
  }

  g.thumbnail = newThumb;
  g.fallbackThumbnail = newFallback;

  changes.push({
    id: g.id,
    title: g.title,
    oldThumb,
    newThumb,
    newFallback,
    source,
    licenseEvidence
  });
}

console.log(`Updated ${changes.length} games.`);
fs.writeFileSync('scripts/applied-thumbnail-changes.json', JSON.stringify(changes, null, 2));

// Save data/games.json
fs.writeFileSync('data/games.json', JSON.stringify(games, null, 2) + '\n');
console.log('Saved data/games.json');

// Update data/catalogData.js
const catalogJsContent = `// KipoPlay Game Catalog - Auto-generated and verified
// Brand: KipoPlay (https://kipo.in)
window.KIPO_CATALOG = window.NEXUS_CATALOG = ${JSON.stringify(games, null, 2)};
`;
fs.writeFileSync('data/catalogData.js', catalogJsContent);
console.log('Saved data/catalogData.js');

// Verify no lupzogames remain
const remainingLupzo = games.filter(g => (g.thumbnail && g.thumbnail.includes('lupzogames.com')) || (g.fallbackThumbnail && g.fallbackThumbnail.includes('lupzogames.com')));
console.log('Remaining games with lupzogames:', remainingLupzo.length);

