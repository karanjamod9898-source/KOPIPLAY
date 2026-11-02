const fs = require('fs');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const audit = fs.readFileSync('reports/COPYRIGHT_AUDIT.md', 'utf8');

console.log('Total games currently in games.json:', games.length);

// Let's parse all games in COPYRIGHT_AUDIT.md table
// Rows match format: | index | **Title** (`id`) | category | developer | embed verified | commercial allowed | permission required | removal recommendation | classification |
const rowRegex = /\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*\s*\(`([^`]+)`\)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/g;

const auditMap = new Map();
let match;
while ((match = rowRegex.exec(audit)) !== null) {
  const [_, title, id, category, dev, embedVer, comm, permReq, remRec, status] = match;
  auditMap.set(id, {
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

console.log('Total games parsed from COPYRIGHT_AUDIT.md:', auditMap.size);

// Count current games by provider and status
const statusCounts = {};
const providerCounts = {};
const yellowGames = [];

for (const g of games) {
  const aud = auditMap.get(g.id);
  const status = aud ? (aud.status.includes('GREEN') ? 'GREEN' : (aud.status.includes('RED') ? 'RED' : 'YELLOW')) : 'UNKNOWN';
  statusCounts[status] = (statusCounts[status] || 0) + 1;

  const prov = g.provider || 'unknown';
  providerCounts[prov] = (providerCounts[prov] || 0) + 1;

  if (status === 'YELLOW') {
    yellowGames.push({
      game: g,
      audit: aud
    });
  }
}

console.log('Current status breakdown:', statusCounts);
console.log('Current provider breakdown:', providerCounts);
console.log('Total YELLOW games remaining:', yellowGames.length);

// Let's inspect provider breakdown of YELLOW games
const yellowByProvider = {};
for (const y of yellowGames) {
  const p = y.game.provider || 'unknown';
  yellowByProvider[p] = (yellowByProvider[p] || 0) + 1;
}
console.log('YELLOW breakdown by provider:', yellowByProvider);

