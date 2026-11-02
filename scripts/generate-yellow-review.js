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

console.log('Count of yellow games:', yellowGames.length);

// Let's verify details for all yellow games
const summary = yellowGames.map(({ g, aud }, idx) => {
  let provider = 'Unknown';
  let dev = aud ? aud.dev : g.developer;
  let embedPermitted = 'NO';
  let commTransfer = 'NO';
  let thumbAuth = 'NO';
  let buyerReq = 'None';
  let action = 'REPLACE/REMOVE';
  let evidence = '';
  let missing = '';

  const isLupzoThumb = g.thumbnail && g.thumbnail.includes('lupzogames.com');
  const isHtmlGamesThumb = g.thumbnail && g.thumbnail.includes('htmlgames.com');
  const isLocalThumb = g.thumbnail && !g.thumbnail.startsWith('http');

  if (g.gameUrl.includes('htmlgames.com')) {
    provider = 'Zygomatic B.V. (HTMLGames.com)';
    dev = 'Zygomatic B.V. (Vianen, Netherlands)';
    embedPermitted = 'YES (Explicit webmaster syndication)';
    commTransfer = 'CONDITIONAL (Permitted on commercial sites, but in-game ad revenue belongs to Zygomatic; terms non-transferable without agreement)';
    thumbAuth = isHtmlGamesThumb ? 'YES (Official CDN syndication asset)' : 'NO';
    buyerReq = 'Must comply with Zygomatic Terms of Use, GDPR CMP, and not block in-game ads. No account required.';
    action = 'KEEP';
    evidence = 'HTMLGames.com offers official webmaster iframe embedding with embedded ads for public syndication.';
    missing = 'Commercial revenue-sharing license (Zygomatic retains ad revenue).';
  } else if (g.gameUrl.includes('gamedistribution.com')) {
    provider = 'GameDistribution (Azerion B.V.)';
    dev = aud ? aud.dev : 'Independent Developer / Azerion B.V.';
    embedPermitted = 'YES (Public HTML5 distribution player)';
    commTransfer = 'CONDITIONAL (Requires domain approval; publisher account is strictly non-transferable)';
    thumbAuth = isLupzoThumb ? 'NO (Unauthorized hotlink from lupzogames.com; official CDN asset is img.gamedistribution.com)' : (isLocalThumb ? 'YES' : 'UNVERIFIED');
    buyerReq = 'Buyer MUST create their own publisher account at publisher.gamedistribution.com and submit domain for approval to receive revenue.';
    action = 'KEEP (CONDITIONAL)';
    evidence = 'GameDistribution terms permit certified publishers to embed HTML5 games via official GUID iframes.';
    missing = 'Client publisher registration; domain whitelist approval; official thumbnail hosting.';
  } else if (g.gameUrl.includes('gamemonetize')) {
    provider = 'GameMonetize Inc.';
    dev = aud ? aud.dev : 'Independent Developer via GameMonetize';
    embedPermitted = 'YES (GameMonetize embed iframe)';
    commTransfer = 'CONDITIONAL (Permitted for commercial websites; ad revenue account is non-transferable)';
    thumbAuth = isLupzoThumb ? 'NO (Unauthorized hotlink from lupzogames.com)' : (isLocalThumb ? 'YES' : 'UNVERIFIED');
    buyerReq = 'Buyer MUST create their own GameMonetize account to replace game IDs and receive monetization payouts.';
    action = 'KEEP (CONDITIONAL)';
    evidence = 'GameMonetize FAQ and publisher agreement permit embedding games on third-party websites with revenue share.';
    missing = 'Client account setup; official thumbnail asset migration.';
  } else if (g.gameUrl.includes('famobi.com')) {
    provider = 'Famobi GmbH';
    dev = 'Famobi GmbH (Cologne, Germany)';
    embedPermitted = 'UNVERIFIED (Syndication requires active Famobi publisher contract)';
    commTransfer = 'NO (Famobi terms strictly prohibit unauthorized resale or unapproved transfer of partner affiliate IDs)';
    thumbAuth = isLupzoThumb ? 'NO (Unauthorized hotlink from lupzogames.com)' : 'UNVERIFIED';
    buyerReq = 'Buyer must execute a formal publisher agreement with Famobi GmbH.';
    action = 'GET PERMISSION';
    evidence = 'Game uses Famobi affiliate wrapper with hardcoded affiliate ID (A1000-10B0B).';
    missing = 'Direct commercial licensing agreement and transfer approval from Famobi.';
  } else if (g.gameUrl.includes('actiongameshub.com')) {
    provider = 'ActionGamesHub';
    dev = 'ActionGamesHub / 3rd Party Developer';
    embedPermitted = 'NO / UNVERIFIED (Direct consumer URL embedding without public syndication API)';
    commTransfer = 'NO (No verifiable commercial syndication license)';
    thumbAuth = isLupzoThumb ? 'NO (Unauthorized hotlink from lupzogames.com)' : 'UNVERIFIED';
    buyerReq = 'Separate syndication license required from ActionGamesHub.';
    action = 'REPLACE/REMOVE';
    evidence = 'Direct iframe embed of consumer site URL https://www.actiongameshub.com/games/counter-war/index.html.';
    missing = 'Written syndication permission or official partner embed contract.';
  } else if (g.id === 'neon-breakout-06') {
    provider = 'KipoPlay In-House (1st Party)';
    dev = 'KipoPlay Arcade';
    embedPermitted = 'YES (100% owned source code)';
    commTransfer = 'YES (Full IP and code transferable; trademark disclaimer on word "Breakout" recommended)';
    thumbAuth = 'YES (Original first-party SVG asset)';
    buyerReq = 'None (included in asset sale). Recommend renaming title to "Neon Breaker" in purchase agreement.';
    action = 'KEEP';
    evidence = 'Source code in games/neon-breakout/ is 100% vanilla JavaScript / HTML5 Canvas.';
    missing = 'Atari trademark clearance if sold under the name "Breakout".';
  }

  return {
    index: idx + 1,
    id: g.id,
    title: g.title,
    category: g.category,
    provider,
    dev,
    sourceUrl: g.gameUrl,
    thumbnailUrl: g.thumbnail,
    embedPermitted,
    commTransfer,
    thumbAuth,
    buyerReq,
    action,
    evidence,
    missing
  };
});

fs.writeFileSync('scripts/yellow-summary.json', JSON.stringify(summary, null, 2));
console.log('Saved yellow summary to scripts/yellow-summary.json');

