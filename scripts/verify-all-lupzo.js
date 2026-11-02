const fs = require('fs');
const https = require('https');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const lupzoGames = games.filter(g => (g.thumbnail && g.thumbnail.includes('lupzogames.com')) || (g.fallbackThumbnail && g.fallbackThumbnail.includes('lupzogames.com')));

function head(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.request({
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 5000
      }, res => {
        resolve({ status: res.statusCode, type: res.headers['content-type'], len: res.headers['content-length'] });
      });
      req.on('error', err => resolve({ error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });
      req.end();
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

async function verifyAll() {
  console.log(`Auditing ${lupzoGames.length} LupzoGames thumbnails...`);
  const results = [];

  for (let i = 0; i < lupzoGames.length; i++) {
    const g = lupzoGames[i];
    let prov = 'unknown';
    let officialThumb = null;
    let fallbackThumb = null;
    let guid = null;

    if (g.gameUrl.includes('gamedistribution.com')) {
      prov = 'GameDistribution';
      const m = g.gameUrl.match(/gamedistribution\.com\/([a-f0-9]+)\/?/);
      if (m) {
        guid = m[1];
        const primary = `https://img.gamedistribution.com/${guid}-512x512.jpeg`;
        const secondary = `https://img.gamedistribution.com/${guid}-512x384.jpeg`;
        
        const h1 = await head(primary);
        if (h1.status === 200) {
          officialThumb = primary;
        } else {
          const h2 = await head(secondary);
          if (h2.status === 200) officialThumb = secondary;
        }

        const hFallback = await head(secondary);
        if (hFallback.status === 200) fallbackThumb = secondary;
      }
    } else if (g.gameUrl.includes('gamemonetize')) {
      prov = 'GameMonetize';
      const m = g.gameUrl.match(/gamemonetize\.(?:co|games)\/([a-z0-9]+)\/?/);
      if (m) {
        guid = m[1];
        const primary = `https://img.gamemonetize.com/${guid}/512x384.jpg`;
        const h1 = await head(primary);
        if (h1.status === 200) {
          officialThumb = primary;
        }
      }
    } else if (g.gameUrl.includes('famobi')) {
      prov = 'Famobi';
    } else if (g.gameUrl.includes('actiongameshub')) {
      prov = 'ActionGamesHub';
    }

    results.push({
      id: g.id,
      title: g.title,
      prov,
      guid,
      currentThumb: g.thumbnail,
      officialThumb,
      fallbackThumb
    });

    console.log(`[${i + 1}/${lupzoGames.length}] ${prov}: ${g.title} -> ${officialThumb ? 'FOUND (200 OK)' : 'NOT FOUND'}`);
  }

  fs.writeFileSync('scripts/lupzo-audit-results.json', JSON.stringify(results, null, 2));
  console.log('Saved to scripts/lupzo-audit-results.json');
}

verifyAll();

