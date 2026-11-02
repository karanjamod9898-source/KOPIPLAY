const fs = require('fs');
const path = require('path');

let bundleBuilder = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
bundleBuilder = bundleBuilder.replace(/\\\\\$\\\$\{game\.slug\}/g, '\\${game.slug}');
bundleBuilder = bundleBuilder.replace(/\\\\\$(\$\{game\.slug\})/g, '$1');
bundleBuilder = bundleBuilder.replace(/\\\$(\$\{game\.slug\})/g, '$1');
fs.writeFileSync('scripts/build-complete-bundle.js', bundleBuilder, 'utf8');

require(path.resolve('scripts/build-complete-bundle.js'));

let bundle = fs.readFileSync('js/bundle.js', 'utf8');
bundle = bundle.replace(/window\.NEXUS\.toggleFav\(\'\\\$(\$\{game\.slug\})\'/g, "window.NEXUS.toggleFav('$1'");
fs.writeFileSync('js/bundle.js', bundle, 'utf8');

console.log('Cleaned toggleFav in build script and bundle.js');
