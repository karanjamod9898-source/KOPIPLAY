const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

content = content.replace(
  '<button class="ctrl-btn" onclick="window.NEXUS.shareGame',
  '<button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.shareGame'
);

content = content.replace(
  '<button class="ctrl-btn" onclick="window.NEXUS.reloadGame',
  '<button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.reloadGame'
);

content = content.replace(
  '<button class="ctrl-btn" onclick="window.NEXUS.toggleTheater',
  '<button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.toggleTheater'
);

content = content.replace(
  '<button class="ctrl-btn" onclick="window.NEXUS.openReport',
  '<button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.openReport'
);

fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
console.log('Added ctrl-icon-only to secondary buttons');

