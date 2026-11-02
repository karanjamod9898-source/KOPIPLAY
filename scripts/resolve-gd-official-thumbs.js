const fs = require('fs');
const https = require('https');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
const lupzoGames = games.filter(g => (g.thumbnail && g.thumbnail.includes('lupzogames.com')) || (g.fallbackThumbnail && g.fallbackThumbnail.includes('lupzogames.com')));
const gdGames = lupzoGames.filter(g => g.gameUrl.includes('gamedistribution.com'));

console.log(`Checking ${gdGames.length} GameDistribution games...`);

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, html: d }));
    }).on('error', err => resolve({ error: err.message })).on('timeout', () => resolve({ error: 'timeout' }));
  });
}

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

async function run() {
  const resolved = [];

  for (let i = 0; i < gdGames.length; i++) {
    const g = gdGames[i];
    const m = g.gameUrl.match(/gamedistribution\.com\/([a-f0-9]+)\/?/);
    if (!m) {
      resolved.push({ id: g.id, title: g.title, status: 'NO_GUID' });
      continue;
    }
    const guid = m[1];
    const pageUrl = `https://html5.gamedistribution.com/${guid}/`;
    const res = await fetchHtml(pageUrl);
    
    let officialImg = null;
    if (res.html) {
      // Find img.gamedistribution.com in HTML
      const matches = res.html.match(/https:\/\/img\.gamedistribution\.com\/[^\s"'<>]+/gi) || [];
      for (const candidate of matches) {
        // Test if candidate works
        const h = await head(candidate);
        if (h.status === 200) {
          officialImg = candidate;
          break;
        }
      }

      // If not found in page, test common patterns
      if (!officialImg) {
        const patterns = [
          `https://img.gamedistribution.com/${guid}-512x512.jpg`,
          `https://img.gamedistribution.com/${guid}-512x512.jpeg`,
          `https://img.gamedistribution.com/${guid}-512x384.jpg`,
          `https://img.gamedistribution.com/${guid}-512x384.jpeg`,
          `https://img.gamedistribution.com/${guid}.jpg`
        ];
        for (const p of patterns) {
          const h = await head(p);
          if (h.status === 200) {
            officialImg = p;
            break;
          }
        }
      }
    }

    resolved.push({
      id: g.id,
      title: g.title,
      guid,
      officialImg,
      pageStatus: res.status
    });

    console.log(`[${i + 1}/${gdGames.length}] ${g.title} (${guid}) -> ${officialImg || 'NO_OFFICIAL_IMG'}`);
  }

  fs.writeFileSync('scripts/gd-resolved-thumbs.json', JSON.stringify(resolved, null, 2));
  console.log('Saved to scripts/gd-resolved-thumbs.json');
}

run();

