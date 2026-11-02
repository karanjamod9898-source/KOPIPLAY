const fs = require('fs');
const http = require('http');
const https = require('https');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
console.log(`Starting automated URL/embed check for all ${games.length} games...`);

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      if (url.startsWith('games/')) {
        // Local game
        http.get(`http://127.0.0.1:8080/${url}`, res => {
          resolve({ status: res.statusCode, headers: res.headers, provider: 'Local First-Party' });
        }).on('error', err => resolve({ status: 0, error: err.message, provider: 'Local First-Party' }));
        return;
      }

      const client = url.startsWith('https') ? https : http;
      const u = new URL(url);
      const req = client.request({
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://kipo.in/'
        },
        timeout: 7000
      }, res => {
        const xFrame = res.headers['x-frame-options'];
        const csp = res.headers['content-security-policy'];
        res.resume(); // consume response
        resolve({
          status: res.statusCode,
          xFrame: xFrame || null,
          csp: csp ? csp.slice(0, 100) : null,
          headers: res.headers
        });
      });

      req.on('error', err => resolve({ status: 0, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'TIMEOUT' }); });
      req.end();
    } catch(e) {
      resolve({ status: 0, error: e.message });
    }
  });
}

async function run() {
  const results = [];
  const concurrency = 6;
  let index = 0;

  async function worker() {
    while (index < games.length) {
      const i = index++;
      const g = games[i];
      let prov = 'Unknown';
      if (g.gameUrl.startsWith('games/')) prov = 'KopiPlay Arcade (In-House)';
      else if (g.gameUrl.includes('htmlgames.com')) prov = 'HTMLGames (Zygomatic B.V.)';
      else if (g.gameUrl.includes('gamedistribution.com') || g.id === 'merge-haven-47') prov = 'GameDistribution (Azerion B.V.)';
      else if (g.gameUrl.includes('gamemonetize')) prov = 'GameMonetize Inc.';

      const res = await checkUrl(g.gameUrl);
      results.push({
        id: g.id,
        title: g.title,
        slug: g.slug,
        provider: prov,
        gameUrl: g.gameUrl,
        thumbnail: g.thumbnail,
        status: res.status,
        xFrame: res.xFrame,
        error: res.error || null
      });

      process.stdout.write(`Checked ${results.length}/${games.length}: ${g.title.slice(0, 25)} -> ${res.status}\r`);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log('\nAll 187 games tested.');
  fs.writeFileSync('scripts/qa-all-games-results.json', JSON.stringify(results, null, 2));

  // Analyze breakdown
  const statusCounts = {};
  const providerBreakdown = {};
  const blockedOrFailed = [];

  results.forEach(r => {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
    if (!providerBreakdown[r.provider]) providerBreakdown[r.provider] = { total: 0, ok: 0, failed: 0 };
    providerBreakdown[r.provider].total++;

    if (r.status >= 200 && r.status < 400 && (!r.xFrame || r.xFrame.toUpperCase() !== 'DENY')) {
      providerBreakdown[r.provider].ok++;
    } else {
      providerBreakdown[r.provider].failed++;
      blockedOrFailed.push(r);
    }
  });

  console.log('Status counts:', statusCounts);
  console.log('Provider breakdown:', providerBreakdown);
  console.log('Failed or blocked count:', blockedOrFailed.length);
  if (blockedOrFailed.length > 0) {
    console.log('Blocked/Failed games:', blockedOrFailed);
  }
}

run();

