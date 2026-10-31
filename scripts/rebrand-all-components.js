const fs = require('fs');
const path = require('path');

// 1. js/api.js
let apiJs = fs.readFileSync('js/api.js', 'utf8');
apiJs = apiJs.replace('NEXUSPLAY - Data API Layer', 'KipoPlay - Data API Layer');
fs.writeFileSync('js/api.js', apiJs, 'utf8');
console.log('Updated js/api.js');

// 2. js/components/header.js
let headerJs = fs.readFileSync('js/components/header.js', 'utf8');
headerJs = headerJs.replace('NEXUSPLAY - Header', 'KipoPlay - Header');
headerJs = headerJs.replaceAll('NexusPlay Home', 'KipoPlay Home');
headerJs = headerJs.replaceAll('alt="NexusPlay"', 'alt="KipoPlay"');
fs.writeFileSync('js/components/header.js', headerJs, 'utf8');
console.log('Updated js/components/header.js');

// 3. js/components/hero.js
let heroJs = fs.readFileSync('js/components/hero.js', 'utf8');
heroJs = heroJs.replace('NEXUSPLAY - Hero', 'KipoPlay - Hero');
heroJs = heroJs.replaceAll('NexusPlay', 'KipoPlay');
fs.writeFileSync('js/components/hero.js', heroJs, 'utf8');
console.log('Updated js/components/hero.js');

// 4. js/components/gameCard.js
let gameCardJs = fs.readFileSync('js/components/gameCard.js', 'utf8');
gameCardJs = gameCardJs.replace('NEXUSPLAY - Game Card', 'KipoPlay - Game Card');
fs.writeFileSync('js/components/gameCard.js', gameCardJs, 'utf8');
console.log('Updated js/components/gameCard.js');

// 5. js/components/adSlot.js
let adSlotJs = fs.readFileSync('js/components/adSlot.js', 'utf8');
adSlotJs = adSlotJs.replace('NEXUSPLAY - Monetization', 'KipoPlay - Monetization');
fs.writeFileSync('js/components/adSlot.js', adSlotJs, 'utf8');
console.log('Updated js/components/adSlot.js');

// 6. js/components/toast.js
let toastJs = fs.readFileSync('js/components/toast.js', 'utf8');
toastJs = toastJs.replace('NEXUSPLAY - Toast', 'KipoPlay - Toast');
fs.writeFileSync('js/components/toast.js', toastJs, 'utf8');
console.log('Updated js/components/toast.js');

// 7. js/views/gameView.js
let gameViewJs = fs.readFileSync('js/views/gameView.js', 'utf8');
gameViewJs = gameViewJs.replace('NEXUSPLAY - Individual Game', 'KipoPlay - Individual Game');
gameViewJs = gameViewJs.replaceAll('NexusPlay portal', 'KipoPlay portal');
gameViewJs = gameViewJs.replaceAll('Nexus Certified Developer', 'Kipo Certified Developer');
gameViewJs = gameViewJs.replaceAll('NexusPlay', 'KipoPlay');
fs.writeFileSync('js/views/gameView.js', gameViewJs, 'utf8');
console.log('Updated js/views/gameView.js');

// 8. js/views/staticViews.js
let staticViewsJs = fs.readFileSync('js/views/staticViews.js', 'utf8');
staticViewsJs = staticViewsJs.replace('NEXUSPLAY - Static Pages', 'KipoPlay - Static Pages');
staticViewsJs = staticViewsJs.replaceAll('NexusPlay', 'KipoPlay');
staticViewsJs = staticViewsJs.replaceAll('NEXUSPLAY', 'KipoPlay');
fs.writeFileSync('js/views/staticViews.js', staticViewsJs, 'utf8');
console.log('Updated js/views/staticViews.js');

// 9. js/views other files
['allGamesView.js', 'categoryView.js', 'favoritesView.js', 'homeView.js', 'notFoundView.js', 'searchView.js'].forEach(file => {
  const filePath = path.join('js/views', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace('NEXUSPLAY -', 'KipoPlay -');
    content = content.replaceAll('NexusPlay', 'KipoPlay');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});

// 10. js/app.js
let appJs = fs.readFileSync('js/app.js', 'utf8');
appJs = appJs.replace('NEXUSPLAY - Main Application', 'KipoPlay - Main Application');
appJs = appJs.replaceAll('NexusPlay', 'KipoPlay');
appJs = appJs.replace(
  "setMeta('KipoPlay - Play Free HTML5 Games Online', 'Discover and play high quality HTML5 browser games for free. No downloads, instant gameplay.');",
  "setMeta('KipoPlay – Play Free Online Games', 'Discover KipoPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.');"
);
fs.writeFileSync('js/app.js', appJs, 'utf8');
console.log('Updated js/app.js');

// 11. CSS headers
['css/main.css', 'css/components.css', 'css/player.css', 'css/responsive.css'].forEach(f => {
  if (fs.existsSync(f)) {
    let css = fs.readFileSync(f, 'utf8');
    css = css.replace(/NEXUSPLAY/g, 'KipoPlay');
    css = css.replace(/NexusPlay/g, 'KipoPlay');
    fs.writeFileSync(f, css, 'utf8');
    console.log(`Updated ${f}`);
  }
});

// 12. README.md & HOW_TO_ADD_GAMES.md & server.ps1
if (fs.existsSync('README.md')) {
  let readme = fs.readFileSync('README.md', 'utf8');
  readme = readme.replace(/NEXUSPLAY/g, 'KipoPlay');
  readme = readme.replace(/NexusPlay/g, 'KipoPlay');
  readme = readme.replace(/nexusplay/g, 'kipoplay');
  readme = readme.replace(/https:\/\/nexusplay\.example\.com/g, 'https://kipo.in');
  fs.writeFileSync('README.md', readme, 'utf8');
  console.log('Updated README.md');
}

if (fs.existsSync('HOW_TO_ADD_GAMES.md')) {
  let doc = fs.readFileSync('HOW_TO_ADD_GAMES.md', 'utf8');
  doc = doc.replace(/NEXUSPLAY/g, 'KipoPlay');
  doc = doc.replace(/NexusPlay/g, 'KipoPlay');
  fs.writeFileSync('HOW_TO_ADD_GAMES.md', doc, 'utf8');
  console.log('Updated HOW_TO_ADD_GAMES.md');
}

if (fs.existsSync('server.ps1')) {
  let srv = fs.readFileSync('server.ps1', 'utf8');
  srv = srv.replace(/NEXUSPLAY/g, 'KIPO PLAY');
  srv = srv.replace(/NexusPlay/g, 'KipoPlay');
  fs.writeFileSync('server.ps1', srv, 'utf8');
  console.log('Updated server.ps1');
}

