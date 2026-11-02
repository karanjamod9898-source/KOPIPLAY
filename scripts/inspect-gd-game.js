const https = require('https');

https.get('https://html5.gamedistribution.com/a186dc9ac7f548f884db8ff54df6dd9f/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const scripts = d.match(/https?:\/\/[^\s"'<>]+/gi) || [];
    console.log('Scripts/URLs in page:', scripts.slice(0, 15));
  });
});
