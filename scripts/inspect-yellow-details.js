const fs = require('fs');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const audit = fs.readFileSync('reports/COPYRIGHT_AUDIT.md', 'utf8');

const rowRegex = /\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*\s*\(`([^`]+)`\)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/g;

const auditMap = new Map();
let match;
while ((match = rowRegex.exec(audit)) !== null) {
  const [_, title, id, category, dev, embedVer, comm, permReq, remRec, status] = match;
  auditMap.set(id.trim(), {
    title: title.trim(),
    id: id.trim(),
    category: category.trim(),
    dev: dev.trim(),
    embedVer: embedVer.trim(),
    comm: comm.trim(),
    permReq: permReq.trim(),
    remRec: remRec.trim(),
    status: status.trim()
  });
}

const yellowGames = [];
for (const g of games) {
  const aud = auditMap.get(g.id);
  const isGreen = aud && aud.status.includes('GREEN');
  if (!isGreen) {
    yellowGames.push({ g, aud });
  }
}

console.log('Total Yellow Games to review:', yellowGames.length);

// Let's inspect the providers
const byProvider = {};
for (const item of yellowGames) {
  const g = item.g;
  let prov = 'Other';
  if (g.gameUrl.includes('htmlgames.com')) prov = 'HTMLGames / Zygomatic B.V.';
  else if (g.gameUrl.includes('gamedistribution.com')) prov = 'GameDistribution / Azerion B.V.';
  else if (g.gameUrl.includes('gamemonetize')) prov = 'GameMonetize Inc.';
  else if (g.gameUrl.includes('famobi')) prov = 'Famobi GmbH';
  else if (g.gameUrl.includes('actiongameshub')) prov = 'ActionGamesHub';
  else if (g.gameUrl.startsWith('games/')) prov = 'Local KipoPlay In-House';

  byProvider[prov] = (byProvider[prov] || 0) + 1;
}

console.log('Provider breakdown:', byProvider);

