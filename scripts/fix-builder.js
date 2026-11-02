const fs = require('fs');

let code = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// We want the text in build-complete-bundle.js to literally be:
// onclick="window.NEXUS.toggleFav(\'${game.slug}\', event)"
// Note that in a JS template literal, \${game.slug} is evaluated as literal '${game.slug}'
code = code.replace(/window\.NEXUS\.toggleFav\([^\)]*game\.slug[^\)]*\)/g, "window.NEXUS.toggleFav('\\${game.slug}', event)");

fs.writeFileSync('scripts/build-complete-bundle.js', code, 'utf8');
console.log('Fixed build-complete-bundle.js');
