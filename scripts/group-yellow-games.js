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

const yellowList = [];
const greenList = [];

for (const g of games) {
  const aud = auditMap.get(g.id);
  const isGreen = aud && aud.status.includes('GREEN');
  if (isGreen) {
    greenList.push(g);
  } else {
    yellowList.push({
      game: g,
      audit: aud
    });
  }
}

console.log(`Remaining Games: ${games.length} (Green: ${greenList.length}, Yellow: ${yellowList.length})`);

// Let's group yellow games by provider / source category:
const groups = {};
for (const item of yellowList) {
  const g = item.game;
  let providerGroup = 'Unknown';
  if (g.gameUrl.includes('htmlgames.com')) {
    providerGroup = 'HTMLGames (Zygomatic B.V.)';
  } else if (g.gameUrl.includes('gamedistribution.com')) {
    providerGroup = 'GameDistribution (Azerion B.V.)';
  } else if (g.gameUrl.includes('gamemonetize.co')) {
    providerGroup = 'GameMonetize Inc.';
  } else if (g.gameUrl.includes('famobi.com')) {
    providerGroup = 'Famobi GmbH';
  } else if (g.gameUrl.includes('actiongameshub.com')) {
    providerGroup = 'ActionGamesHub';
  } else if (g.gameUrl.includes('cleverapps.top')) {
    providerGroup = 'Clever Apps Pte. Ltd.';
  } else if (g.gameUrl.startsWith('games/')) {
    providerGroup = 'Local Arcade (KipoPlay In-House)';
  } else {
    providerGroup = 'Other External: ' + g.gameUrl;
  }

  groups[providerGroup] = (groups[providerGroup] || []);
  groups[providerGroup].push(item);
}

for (const [grp, items] of Object.entries(groups)) {
  console.log(`- ${grp}: ${items.length} games`);
}

