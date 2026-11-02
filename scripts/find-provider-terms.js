const https = require('https');

function follow(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location, data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function findUrls() {
  // 1. Follow gamedistribution redirect
  const gd = await follow('https://gamedistribution.com/terms/publisher');
  console.log('GD terms redirect:', gd.status, gd.location);
  if (gd.location) {
    const gd2 = await follow(gd.location.startsWith('http') ? gd.location : 'https://gamedistribution.com' + gd.location);
    console.log('GD terms page 2:', gd2.status, gd2.location);
  }

  // 2. HTMLGames footer links
  const hg = await follow('https://www.htmlgames.com/');
  console.log('HTMLGames home status:', hg.status);
  if (hg.data) {
    const links = hg.data.match(/href=["']([^"']*(?:term|legal|webmaster|privacy|about|contact|policy|free|embed)[^"']*)["']/gi) || [];
    console.log('HTMLGames relevant links:', [...new Set(links)]);
  }

  // 3. GameMonetize links
  const gm = await follow('https://gamemonetize.com/');
  if (gm.data) {
    const links = gm.data.match(/href=["']([^"']*(?:term|legal|policy|privacy|about|faq|doc)[^"']*)["']/gi) || [];
    console.log('GameMonetize relevant links:', [...new Set(links)]);
  }
}

findUrls();

