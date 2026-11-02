const fs = require('fs');
let code = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

code = code.replace(/window\.NEXUS\.toggleFav\(\'\\\\\$(\\\$\{game\.slug\})\'/g, "window.NEXUS.toggleFav('$1'");
code = code.replace(/window\.NEXUS\.toggleFav\(\'\\\$(\\\$\{game\.slug\})\'/g, "window.NEXUS.toggleFav('$1'");

fs.writeFileSync('scripts/build-complete-bundle.js', code, 'utf8');
console.log('Fixed toggleFav escapes');

