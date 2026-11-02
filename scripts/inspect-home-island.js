const https = require('https');

https.get('https://html5.gamedistribution.com/da1111d4369f4cb08525d593fe515fa4/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = d.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'no title');
    const images = d.match(/https?:\/\/[^\s"'<>]+?\.(?:png|jpg|jpeg|webp)/gi) || [];
    console.log('Images in HTML:', images);
    const scripts = d.match(/https?:\/\/[^\s"'<>]+/gi) || [];
    console.log('URLs in HTML:', scripts.slice(0, 20));
  });
});

