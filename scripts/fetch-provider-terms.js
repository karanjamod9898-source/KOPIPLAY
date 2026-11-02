const https = require('https');

function fetchText(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 8000 }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => resolve({ error: err.message })).on('timeout', () => resolve({ error: 'timeout' }));
  });
}

async function inspectTerms() {
  const urls = [
    'https://www.htmlgames.com/terms-of-use/',
    'https://www.htmlgames.com/webmasters/',
    'https://gamedistribution.com/terms/publisher',
    'https://gamemonetize.com/terms',
    'https://gamemonetize.com/faq'
  ];

  for (const u of urls) {
    console.log('Fetching', u, '...');
    const res = await fetchText(u);
    console.log('Result for', u, '-> Status:', res.status || res.error, 'Length:', res.data ? res.data.length : 0);
    if (res.data) {
      // Extract title and relevant snippet
      const titleMatch = res.data.match(/<title>([^<]+)<\/title>/i);
      console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
    }
  }
}

inspectTerms();

