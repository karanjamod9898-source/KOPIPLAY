const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function run() {
  const gmId = '485gqzfrbzass7ig99juwrcb73d0286z';
  console.log('Testing GameMonetize HTML...');
  const res = await get(`https://html5.gamemonetize.co/${gmId}/`);
  console.log('Status:', res.status);
  if (res.data) {
    const lines = res.data.split('\n');
    const imgMatches = res.data.match(/https?:\/\/[^\s"'<>]+?\.(?:png|jpg|jpeg|webp)/gi) || [];
    console.log('Image URLs found in page:', imgMatches);
    const metaMatches = lines.filter(l => l.includes('image') || l.includes('thumb') || l.includes('icon'));
    console.log('Meta lines:', metaMatches.slice(0, 10));
  }
}
run();

