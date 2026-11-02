const fs = require('fs');
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

const carKeywords = ['driver', 'racing', 'car', 'drift', 'stunt', 'speed', 'moto', 'bike', 'truck'];

games.forEach(g => {
  const t = g.title.toLowerCase();
  if (carKeywords.some(k => t.includes(k))) {
    console.log(`[CAR/RACING] ID: ${g.id} | Title: "${g.title}" | Dev: ${g.developer}`);
  }
});

