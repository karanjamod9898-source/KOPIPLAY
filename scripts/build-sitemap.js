const fs = require('fs');
const path = require('path');

global.window = global;
eval(fs.readFileSync(path.join(__dirname, '../data/catalogData.js'), 'utf8'));

const games = window.KOPI_CATALOG || window.KIPO_CATALOG || window.NEXUS_CATALOG || [];

const categorySlugs = [
  'shooting', 'action', 'adventure', 'racing', 'car', 'driving', 'sports',
  'football', 'puzzle', 'strategy', 'platform', 'multiplayer', 'arcade',
  'simulation', 'casual', 'kids-games', 'beauty', 'pool', 'board-games',
  'card-games', 'clicker', 'io-games'
];

const baseUrl = process.env.SITE_URL || 'https://kipo.in';

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static pages
const staticPages = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '#/games', changefreq: 'daily', priority: '0.9' },
  { path: '#/popular', changefreq: 'daily', priority: '0.9' },
  { path: '#/new', changefreq: 'daily', priority: '0.9' },
  { path: '#/favorites', changefreq: 'weekly', priority: '0.5' },
  { path: '#/recent', changefreq: 'weekly', priority: '0.5' },
  { path: '#/about', changefreq: 'monthly', priority: '0.6' },
  { path: '#/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '#/privacy', changefreq: 'monthly', priority: '0.5' },
  { path: '#/terms', changefreq: 'monthly', priority: '0.5' },
  { path: '#/dmca', changefreq: 'monthly', priority: '0.5' }
];

staticPages.forEach(p => {
  const loc = p.path ? `${baseUrl}/${p.path}` : `${baseUrl}/`;
  xml += `  <url><loc>${loc}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>\n`;
});

// Categories (all 22)
categorySlugs.forEach(slug => {
  xml += `  <url><loc>${baseUrl}/#/category/${slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
});

// All 200 Games
games.forEach(g => {
  const lastmod = g.releaseDate || '2026-10-31';
  xml += `  <url><loc>${baseUrl}/#/game/${g.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml successfully generated with ${staticPages.length + categorySlugs.length + games.length} URLs for ${baseUrl}.`);
