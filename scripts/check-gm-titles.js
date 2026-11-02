const fs = require('fs');
const https = require('https');
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

const gmGames = games.filter(g => g.gameUrl.includes('gamemonetize'));

async function checkGame(g) {
  return new Promise((resolve) => {
    https.get(g.gameUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        resolve({
          id: g.id,
          title: g.title,
          url: g.gameUrl,
          statusCode: res.statusCode,
          htmlTitle: titleMatch ? titleMatch[1].trim() : 'N/A'
        });
      });
    }).on('error', (err) => {
      resolve({ id: g.id, title: g.title, url: g.gameUrl, statusCode: 'ERR', htmlTitle: err.message });
    }).on('timeout', () => {
      resolve({ id: g.id, title: g.title, url: g.gameUrl, statusCode: 'TIMEOUT', htmlTitle: 'TIMEOUT' });
    });
  });
}

async function run() {
  for (const g of gmGames) {
    const res = await checkGame(g);
    console.log(`[${res.id}] "${res.title}" -> HTML Title: "${res.htmlTitle}" (HTTP ${res.statusCode})`);
  }
}

run();

