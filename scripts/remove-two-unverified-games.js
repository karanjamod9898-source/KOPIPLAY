const fs = require('fs');
const { execSync } = require('child_process');

const targetIds = ['rise-up-air-balloon-04', 'counter-war-10'];

// 1. Update data/games.json
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const initialCount = games.length;
const filteredGames = games.filter(g => !targetIds.includes(g.id));
console.log(`games.json: ${initialCount} -> ${filteredGames.length}`);

fs.writeFileSync('data/games.json', JSON.stringify(filteredGames, null, 2) + '\n');

// 2. Update data/catalogData.js
const catalogJsContent = `// KipoPlay Game Catalog - Auto-generated and verified
// Brand: KipoPlay (https://kipo.in)
window.KIPO_CATALOG = window.NEXUS_CATALOG = ${JSON.stringify(filteredGames, null, 2)};
`;
fs.writeFileSync('data/catalogData.js', catalogJsContent);
console.log('catalogData.js updated.');

// 3. Rebuild sitemap
execSync('node scripts/build-sitemap.js', { stdio: 'inherit' });

// 4. Rebuild bundle
execSync('node scripts/build-complete-bundle.js', { stdio: 'inherit' });

// 5. Update reports/YELLOW_GAMES_LICENSE_REVIEW.md
let yellowReport = fs.readFileSync('reports/YELLOW_GAMES_LICENSE_REVIEW.md', 'utf8');
const removalNote = `
> [!IMPORTANT]
> **REMOVED FROM CATALOG (November 2, 2026):**
> The two unverified outlier games have been completely removed from the KipoPlay active catalog:
> 1. \`rise-up-air-balloon-04\` (Rise Up Air Balloon) – Famobi affiliate-restricted embed without direct commercial license.
> 2. \`counter-war-10\` (Counter War) – ActionGamesHub consumer portal embed without verified syndication agreement.
> Active catalog is now **187 games** (6 GREEN, 181 YELLOW).
`;

if (!yellowReport.includes('REMOVED FROM CATALOG (November 2, 2026)')) {
  yellowReport = yellowReport.replace('## 1. Executive Summary & Audit Context', '## 1. Executive Summary & Audit Context\n' + removalNote);
  // Also update table statuses for these two
  yellowReport = yellowReport.replace(/\|\s*(\d+)\s*\|\s*\*\*Rise Up Air Balloon\*\*<br>`\(rise-up-air-balloon-04\)`[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|\s*\*\*([^*]+)\*\*\s*\|/, 
    '| $1 | ~~Rise Up Air Balloon~~<br>`(rise-up-air-balloon-04)` | Adventure | **Famobi GmbH** | REMOVED | NON-TRANSFERABLE | REPLACED LOCAL SVG | None (Removed) | **REMOVED** |');
  yellowReport = yellowReport.replace(/\|\s*(\d+)\s*\|\s*\*\*Counter War\*\*<br>`\(counter-war-10\)`[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|\s*\*\*([^*]+)\*\*\s*\|/, 
    '| $1 | ~~Counter War~~<br>`(counter-war-10)` | Action | **ActionGamesHub** | REMOVED | NON-TRANSFERABLE | REPLACED LOCAL SVG | None (Removed) | **REMOVED** |');
  fs.writeFileSync('reports/YELLOW_GAMES_LICENSE_REVIEW.md', yellowReport, 'utf8');
  console.log('Updated reports/YELLOW_GAMES_LICENSE_REVIEW.md');
}

// 6. Update reports/COPYRIGHT_AUDIT.md
let copyAudit = fs.readFileSync('reports/COPYRIGHT_AUDIT.md', 'utf8');
const copyNote = `
> [!NOTE]
> **CATALOG CLEANUP UPDATE (November 2, 2026):**
> \`rise-up-air-balloon-04\` (Famobi) and \`counter-war-10\` (ActionGamesHub) have been removed from the active catalog due to lack of verified B2B/syndication distribution licenses. Total catalog size: **187 games**.
`;
if (!copyAudit.includes('CATALOG CLEANUP UPDATE (November 2, 2026)')) {
  copyAudit = copyAudit.replace('## 1. Executive Summary & Legal Transaction Risk Overview', '## 1. Executive Summary & Legal Transaction Risk Overview\n' + copyNote);
  fs.writeFileSync('reports/COPYRIGHT_AUDIT.md', copyAudit, 'utf8');
  console.log('Updated reports/COPYRIGHT_AUDIT.md');
}

console.log('All updates applied successfully!');

