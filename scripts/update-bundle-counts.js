const fs = require('fs');

let src = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

src = src.replaceAll(
  '<span class="live-dot"></span> ${catalog.length} Free Games Live',
  '<span class="live-dot"></span> \\${catalog.length} Free Games Live'
);

src = src.replaceAll(
  '<div class="stat-number">${catalog.length}</div>',
  '<div class="stat-number">\\${catalog.length}</div>'
);

fs.writeFileSync('scripts/build-complete-bundle.js', src, 'utf8');
console.log('Fixed escape in scripts/build-complete-bundle.js.');
