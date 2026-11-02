const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, data: d }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

function head(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 4000 }, res => {
      resolve({ status: res.statusCode, type: res.headers['content-type'], len: res.headers['content-length'] });
    }).on('error', err => resolve({ error: err.message })).end();
  });
}

async function testExts() {
  const guid = 'da1111d4369f4cb08525d593fe515fa4';
  const exts = [
    `https://img.gamedistribution.com/${guid}-512x512.jpg`,
    `https://img.gamedistribution.com/${guid}-512x512.jpeg`,
    `https://img.gamedistribution.com/${guid}-512x384.jpg`,
    `https://img.gamedistribution.com/${guid}-512x384.jpeg`
  ];
  for (const u of exts) {
    console.log(u, await head(u));
  }
}
testExts();

