const https = require('https');

https.get('https://rss.gamemonetize.com/rssfeed.php?format=json&num=5', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const items = JSON.parse(d);
      console.log('Sample item from GameMonetize RSS feed:', items[0]);
    } catch(e) {
      console.log('Error parsing:', e.message, d.slice(0, 300));
    }
  });
});

