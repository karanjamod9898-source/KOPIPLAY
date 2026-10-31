const fs = require('fs');
const https = require('https');
const http = require('http');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

function checkUrl(url) {
  return new Promise((resolve) => {
    if (url.startsWith('games/')) {
      // Local game
      const exists = fs.existsSync(url);
      return resolve({
        type: 'local',
        status: exists ? 200 : 404,
        xFrameOptions: null,
        csp: null,
        error: exists ? null : 'Local file missing'
      });
    }

    let parsed;
    try {
      parsed = new URL(url);
    } catch (e) {
      return resolve({ type: 'invalid_url', status: 0, error: 'Malformed URL: ' + e.message });
    }

    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.request(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Dest': 'iframe',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site'
      },
      timeout: 10000
    }, (res) => {
      // Consume a small amount of data to prevent socket hanging
      res.on('data', () => {});
      res.on('end', () => {
        resolve({
          type: 'remote',
          status: res.statusCode,
          location: res.headers.location || null,
          xFrameOptions: res.headers['x-frame-options'] || null,
          csp: res.headers['content-security-policy'] || null,
          accessControl: res.headers['access-control-allow-origin'] || null,
          contentType: res.headers['content-type'] || null,
          error: null
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ type: 'remote', status: 0, error: 'Request Timeout (10s)' });
    });

    req.on('error', (err) => {
      resolve({ type: 'remote', status: 0, error: err.message });
    });

    req.end();
  });
}

async function auditAll() {
  console.log(`Starting HTTP audit of ${games.length} games...`);
  const results = [];
  const concurrency = 10;
  
  for (let i = 0; i < games.length; i += concurrency) {
    const chunk = games.slice(i, i + concurrency);
    const chunkPromises = chunk.map(async (g, indexInChunk) => {
      const idx = i + indexInChunk;
      const res = await checkUrl(g.gameUrl);
      return {
        index: idx,
        id: g.id,
        title: g.title,
        slug: g.slug,
        category: g.category,
        currentUrl: g.gameUrl,
        ...res
      };
    });
    const chunkRes = await Promise.all(chunkPromises);
    results.push(...chunkRes);
    process.stdout.write(`Audited ${results.length}/${games.length} games...\r`);
  }

  console.log('\nAudit complete! Analyzing findings...');
  fs.writeFileSync('reports/raw_http_audit.json', JSON.stringify(results, null, 2));

  // Summary statistics
  const statusCounts = {};
  const xfoList = [];
  const cspList = [];
  const errorList = [];
  const redirectList = [];

  results.forEach(r => {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
    if (r.xFrameOptions) xfoList.push({ id: r.id, title: r.title, xfo: r.xFrameOptions, url: r.currentUrl });
    if (r.csp && r.csp.includes('frame-ancestors')) cspList.push({ id: r.id, title: r.title, csp: r.csp, url: r.currentUrl });
    if (r.error) errorList.push({ id: r.id, title: r.title, error: r.error, url: r.currentUrl });
    if (r.location) redirectList.push({ id: r.id, title: r.title, status: r.status, loc: r.location });
  });

  console.log('Status code distribution:', statusCounts);
  console.log('X-Frame-Options restrictions found:', xfoList.length, xfoList);
  console.log('CSP frame-ancestors restrictions found:', cspList.length, cspList);
  console.log('Network/timeout errors:', errorList.length, errorList);
  console.log('Redirects (301/302):', redirectList.length, redirectList.slice(0, 5));
}

if (!fs.existsSync('reports')) fs.mkdirSync('reports');
auditAll();

