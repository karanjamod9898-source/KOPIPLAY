const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// Replace all occurrences of KipoPlay with KopiPlay
content = content.replace(/KipoPlay/g, 'KopiPlay');
content = content.replace(/kipoplay/g, 'kopiplay');
content = content.replace(/Kipo/g, 'Kopi');
content = content.replace(/kipo/g, 'kopi');
// BUT restore kipo.in domains as required by constraint!
content = content.replace(/kopi\.in/g, 'kipo.in');

fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
console.log('Normalized all branding to KopiPlay in build-complete-bundle.js');

