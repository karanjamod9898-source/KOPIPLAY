const https = require('https');

https.get('https://gamedistribution.com/games/merge-haven/', { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const m = d.match(/https:\/\/img\.gamedistribution\.com\/[^\s"'<>]+/gi) || [];
    console.log('Images:', m);
    const guidMatch = d.match(/[a-f0-9]{32}/g) || [];
    console.log('GUIDs found:', guidMatch.slice(0, 5));
  });
}).on('error', err => console.log('Error:', err.message));

