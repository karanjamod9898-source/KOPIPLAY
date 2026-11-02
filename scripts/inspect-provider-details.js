const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 8000 }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, data: d }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function inspectAll() {
  // 1. GameMonetize FAQ
  console.log('Inspecting GameMonetize FAQ...');
  const gm = await get('https://gamemonetize.com/faq');
  if (gm.data) {
    const qMatches = gm.data.match(/<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi) || [];
    console.log('GM FAQ Headings:', qMatches.slice(0, 15));
  }

  // 2. GameDistribution links
  console.log('Inspecting GameDistribution home...');
  const gd = await get('https://gamedistribution.com/');
  if (gd.data) {
    const links = gd.data.match(/href=["']([^"']*(?:term|legal|publish|developer|doc|faq|about|contact|policy)[^"']*)["']/gi) || [];
    console.log('GD Links:', [...new Set(links)]);
  }

  // 3. HTMLGames About
  console.log('Inspecting HTMLGames About...');
  const hgAbout = await get('https://www.htmlgames.com/about/');
  if (hgAbout.data) {
    const pMatches = hgAbout.data.match(/<p[^>]*>([^<]+)<\/p>/gi) || [];
    console.log('HTMLGames About text:', pMatches);
  }
}

inspectAll();

