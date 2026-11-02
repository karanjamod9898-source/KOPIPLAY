const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data: data.slice(0, 1000) }));
    }).on('error', err => resolve({ error: err.message })).on('timeout', () => resolve({ error: 'timeout' }));
  });
}

async function testGM() {
  const tests = [
    'https://gamemonetize.com/rssfeed.php?format=json&num=10',
    'https://api.gamemonetize.com/feed.php?format=0&num=10',
    'https://img.gamemonetize.com/',
    'https://html5.gamemonetize.co/485gqzfrbzass7ig99juwrcb73d0286z/TemplateData/icon.png'
  ];
  for (const t of tests) {
    console.log('Testing', t);
    const r = await get(t);
    console.log(r.status || r.error, r.data ? r.data.slice(0, 150) : '');
  }
}
testGM();

