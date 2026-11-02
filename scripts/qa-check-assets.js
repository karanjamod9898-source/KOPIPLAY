const fs = require('fs');
const path = require('path');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const missingAssets = [];

games.forEach(g => {
  // Check local thumbnail
  if (g.thumbnail && !g.thumbnail.startsWith('http')) {
    if (!fs.existsSync(g.thumbnail)) {
      missingAssets.push({ id: g.id, type: 'thumbnail', path: g.thumbnail });
    }
  }
  // Check local fallbackThumbnail
  if (g.fallbackThumbnail && !g.fallbackThumbnail.startsWith('http')) {
    if (!fs.existsSync(g.fallbackThumbnail)) {
      missingAssets.push({ id: g.id, type: 'fallbackThumbnail', path: g.fallbackThumbnail });
    }
  }
  // Check local gameUrl
  if (g.gameUrl && !g.gameUrl.startsWith('http')) {
    if (!fs.existsSync(g.gameUrl)) {
      missingAssets.push({ id: g.id, type: 'gameUrl', path: g.gameUrl });
    }
  }
});

console.log('Total local assets checked across 187 games.');
console.log('Missing assets count:', missingAssets.length);
if (missingAssets.length > 0) {
  console.log(missingAssets);
}

