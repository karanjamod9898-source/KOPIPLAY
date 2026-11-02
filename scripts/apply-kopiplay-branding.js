const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\online game';

function updateFile(relPath, fn) {
  const fullPath = path.join(projectDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${relPath}`);
    return;
  }
  const oldContent = fs.readFileSync(fullPath, 'utf8');
  const newContent = fn(oldContent);
  if (oldContent !== newContent) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`Updated: ${relPath}`);
  } else {
    console.log(`No change: ${relPath}`);
  }
}

// 1. assets/images/logo.svg
updateFile('assets/images/logo.svg', content => {
  return content
    .replace(/id="nexus-grad"/g, 'id="kopi-grad"')
    .replace(/url\(#nexus-grad\)/g, 'url(#kopi-grad)')
    .replace(/<tspan fill="#FFFFFF">KIPO<\/tspan>/g, '<tspan fill="#FFFFFF">KOPI</tspan>');
});

// 2. assets/images/games/default-game.svg
updateFile('assets/images/games/default-game.svg', content => {
  return content.replace(/KIPOPLAY/g, 'KOPIPLAY');
});

// 3. manifest.json
updateFile('manifest.json', content => {
  return content
    .replace(/KipoPlay/g, 'KopiPlay')
    .replace(/kipoplay/g, 'kopiplay');
});

// 4. index.html
updateFile('index.html', content => {
  return content
    .replace(/<title>KipoPlay/g, '<title>KopiPlay')
    .replace(/content="KipoPlay – Play Free Online Games"/g, 'content="KopiPlay – Play Free Online Games"')
    .replace(/content="Discover KipoPlay/g, 'content="Discover KopiPlay')
    .replace(/kipoplay, kipo games/g, 'kopiplay, kopi games')
    .replace(/name="author" content="KipoPlay"/g, 'name="author" content="KopiPlay"')
    .replace(/content="KipoPlay – Play Free Online Games"/g, 'content="KopiPlay – Play Free Online Games"')
    .replace(/id="kipo-schema"/g, 'id="kopi-schema"')
    .replace(/"name": "KipoPlay"/g, '"name": "KopiPlay"')
    .replace(/"alternateName": "KipoPlay Online Games"/g, '"alternateName": "KopiPlay Online Games"')
    .replace(/"description": "KipoPlay/g, '"description": "KopiPlay');
});

// 5. 404.html
updateFile('404.html', content => {
  return content
    .replace(/KipoPlay - Redirecting/g, 'KopiPlay - Redirecting')
    .replace(/Return to KipoPlay/g, 'Return to KopiPlay');
});

// 6. data/games.json
updateFile('data/games.json', content => {
  const games = JSON.parse(content);
  let changed = 0;
  games.forEach(g => {
    if (g.developer === 'KipoPlay Arcade') {
      g.developer = 'KopiPlay Arcade';
      changed++;
    }
  });
  console.log(`Updated ${changed} developers in games.json`);
  return JSON.stringify(games, null, 2) + '\n';
});

// 7. data/catalogData.js
updateFile('data/catalogData.js', content => {
  const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
  return `// KopiPlay Game Catalog - Auto-generated and verified
// Brand: KopiPlay
window.KOPI_CATALOG = window.KIPO_CATALOG = window.NEXUS_CATALOG = ${JSON.stringify(games, null, 2)};
`;
});

// 8. js/app.js
updateFile('js/app.js', content => {
  return content
    .replace(/KipoPlay/g, 'KopiPlay')
    .replace(/kipoplay/g, 'kopiplay');
});

// 9. js/views/staticViews.js
updateFile('js/views/staticViews.js', content => {
  return content
    .replace(/KipoPlay/g, 'KopiPlay')
    .replace(/kipoplay/g, 'kopiplay');
});

// 10. js/components/*.js
const componentFiles = [
  'js/components/header.js',
  'js/components/footer.js',
  'js/components/hero.js',
  'js/components/toast.js',
  'js/components/adSlot.js',
  'js/components/gameCard.js'
];
componentFiles.forEach(f => {
  updateFile(f, content => {
    return content
      .replace(/KipoPlay/g, 'KopiPlay')
      .replace(/kipoplay/g, 'kopiplay');
  });
});

// 11. js/views/*.js
const viewFiles = [
  'js/views/allGamesView.js',
  'js/views/categoryView.js',
  'js/views/favoritesView.js',
  'js/views/gameView.js',
  'js/views/homeView.js',
  'js/views/notFoundView.js',
  'js/views/searchView.js'
];
viewFiles.forEach(f => {
  updateFile(f, content => {
    return content
      .replace(/KipoPlay/g, 'KopiPlay')
      .replace(/kipoplay/g, 'kopiplay');
  });
});

// 12. js/api.js & js/state.js
['js/api.js', 'js/state.js'].forEach(f => {
  updateFile(f, content => {
    return content
      .replace(/KipoPlay/g, 'KopiPlay')
      .replace(/kipoplay/g, 'kopiplay');
  });
});

// 13. CSS files headers
['css/main.css', 'css/components.css', 'css/player.css', 'css/responsive.css'].forEach(f => {
  updateFile(f, content => {
    return content
      .replace(/KipoPlay/g, 'KopiPlay')
      .replace(/kipoplay/g, 'kopiplay');
  });
});

// 14. Documentation files
['README.md', 'HOW_TO_ADD_GAMES.md'].forEach(f => {
  updateFile(f, content => {
    return content
      .replace(/KipoPlay/g, 'KopiPlay')
      .replace(/kipoplay/g, 'kopiplay')
      .replace(/NexusPlay/g, 'KopiPlay')
      .replace(/NEXUSPLAY/g, 'KopiPlay');
  });
});

console.log('Core files updated.');

