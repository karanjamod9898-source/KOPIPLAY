const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const robots = fs.readFileSync('robots.txt', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');

console.log('Manifest checks:');
console.log('  name:', manifest.name);
console.log('  short_name:', manifest.short_name);
console.log('  start_url:', manifest.start_url);
console.log('  icons exist:');
manifest.icons.forEach(i => {
  console.log('   ', i.src, '->', fs.existsSync(i.src));
});

console.log('\nRobots.txt checks:');
console.log(robots.trim());

console.log('\nSitemap checks:');
const sitemapUrlCount = (sitemap.match(/<loc>/g) || []).length;
console.log('  Total URLs in sitemap:', sitemapUrlCount);
console.log('  Sample URL:', sitemap.match(/<loc>[^<]+<\/loc>/)[0]);

console.log('\nIndex.html SEO checks:');
const titleMatch = index.match(/<title>([^<]+)<\/title>/);
console.log('  Title:', titleMatch ? titleMatch[1] : 'N/A');
const canonMatch = index.match(/<link rel="canonical" href="([^"]+)">/);
console.log('  Canonical:', canonMatch ? canonMatch[1] : 'N/A');
const ogTitleMatch = index.match(/<meta property="og:title" content="([^"]+)">/);
console.log('  OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'N/A');
const schemaMatch = index.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
if (schemaMatch) {
  const schemaObj = JSON.parse(schemaMatch[1]);
  console.log('  Schema name:', schemaObj.name);
  console.log('  Schema url:', schemaObj.url);
}

